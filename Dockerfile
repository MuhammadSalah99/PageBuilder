# Build Stage
FROM node:18 AS build

# Set the working directory in the Docker image
WORKDIR /app

# Copy package.json and package-lock.json (or pnpm-lock.yaml) to Docker image
COPY package.json package-lock.json ./

# Install dependencies in the Docker image
RUN npm install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Build the application
RUN npm run build

# Production Stage: Setup the Nginx server
FROM nginx:alpine

# Copy the build output to replace the default nginx contents.
COPY --from=build /app/dist /usr/share/nginx/html

# Additionally, copy the SVG assets to the expected location
COPY --from=build /app/src/Panel/layers/assets /usr/share/nginx/html/src/Panel/layers/assets

# Expose port 80
EXPOSE 80

# Start Nginx and keep it running
CMD ["nginx", "-g", "daemon off;"]
