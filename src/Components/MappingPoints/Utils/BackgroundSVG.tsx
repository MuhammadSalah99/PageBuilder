interface BackgroundProps {
  rotation: string;
}

function BackgroundSVG({ rotation }: BackgroundProps) {
  return (
    <svg
      style={{ opacity: 0.6, position: "absolute", width: "432.3px", height: "326.4px", transform: rotation }}
      xmlns="http://www.w3.org/2000/svg"
      width="441"
      height="336"
      viewBox="0 0 441 336"
      fill="none"
    >
      <g filter="url(#filter0_d_333_1010)">
        <path
          d="M406.602 0.688477H59.1705C42.6978 0.688477 29.3435 14.0428 29.3435 30.5161V54.8606L6.96026 67.4618C3.35167 69.4931 3.1594 74.6185 6.6048 76.915L29.3435 92.0704V297.242C29.3435 313.715 42.6978 327.069 59.1705 327.069H406.602C423.075 327.069 436.429 313.715 436.429 297.242V30.5161C436.429 14.0428 423.075 0.688477 406.602 0.688477Z"
          fill="#F44343"
        />
        <path
          d="M29.5887 55.2963L29.8435 55.1529V54.8606V30.5161C29.8435 14.3189 42.9739 1.18848 59.1705 1.18848H406.602C422.799 1.18848 435.929 14.3189 435.929 30.5161V297.242C435.929 313.439 422.799 326.569 406.602 326.569H59.1705C42.9739 326.569 29.8435 313.439 29.8435 297.242V92.0704V91.8027L29.6208 91.6543L6.88212 76.499C3.74713 74.4093 3.92215 69.7458 7.20552 67.8976L6.96026 67.4618L7.20555 67.8975L29.5887 55.2963Z"
          stroke="black"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_333_1010"
          x="0.133301"
          y="0.688477"
          width="440.296"
          height="334.381"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_333_1010" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_333_1010" result="shape" />
        </filter>
      </defs>
    </svg>
  );
}

export default BackgroundSVG;
