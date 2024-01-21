# StoryMe Editor

## Description

This project contains the code for StoryMe Editor, Plugins and Components, to help our clients achieve thier branding and designing thier company goals.

## Table of Contents

- [Installation](#installation)
- [Project Structure](#project-structure)

## Installation 

1. Clone the repo:

```sh
git clone https://gitlab.cockerel.info/storymeplugins/editor.git
```
2. Install NPM packages:

### Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Version 18.x.x or higher
- **npm**: Version 9.x.x or higher

```sh
npm install 
```
or 
```sh 
pnpm install
```
The choice is up to you :D.

3. To run the project in dev moode:

```sh
npm run dev
```
or 
```sh
pnpm run dev
```
4. Open the code with you faviroute code editor and add your changes :D.


## Project Structure

This section provides an overview of the main directories and files in our project to help you get acquainted with how the codebase is organized.

### `src/`

The `src` directory contains all the source code for the project. Inside `src`, you will find two main subdirectories: `Components` and `Plugins`.

#### `Components/`

The `Components` directory houses all the reusable React components used throughout the project. Each component has its own directory named after the component. For example:

Example:

- `Components/`
  - `LabeledImage/`
    - `interfaces/`: TypeScript interface definitions for the LabeledImage component.
    - `styles/`: Styling files for the LabeledImage component.
    - `utilities/`: Utility functions for the LabeledImage component.
    - `LabeledImage.tsx`: The main React component file.
  - `ImageCard/`
    - `interfaces/`: TypeScript interface definitions for the ImageCard component.
    - `styles/`: Styling files for the ImageCard component.
    - `utilities/`: Utility functions for the ImageCard component.
    - `ImageCard.tsx`: The main React component file.


### Plugins
- `CustomAssetManager/`
  - `interfaces/`: Contains TypeScript interface definitions related to the plugin.
  - `styles/`: Holds styling files specific to the plugin.
  - `utilities/`: Includes utility functions and helpers specific to the plugin.
  - `CustomAssetManager.tsx`: The main plugin file.

This structure helps keep our project organized, ensuring that related files are grouped together and easy to find.




