import * as React from 'react';

const SvgComponent = (props) => (
  <svg
    width={22}
    height={22}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        d="M8.25 17.417c-4.583 1.375-4.583-2.292-6.417-2.75m12.834 5.5v-3.548a3.088 3.088 0 0 0-.862-2.392c2.878-.321 5.904-1.412 5.904-6.417 0-1.28-.493-2.51-1.375-3.438A4.647 4.647 0 0 0 18.25.917s-1.082-.321-3.584 1.356a12.265 12.265 0 0 0-6.417 0C5.748.596 4.666.917 4.666.917a4.647 4.647 0 0 0-.083 3.455 4.987 4.987 0 0 0-1.375 3.465c0 4.969 3.026 6.06 5.904 6.417a3.088 3.088 0 0 0-.862 2.365v3.548"
        stroke="#F9F9F9"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h22v22H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default SvgComponent;
