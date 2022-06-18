import * as React from 'react';
import { SVGProps } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 19 19" fill="none" {...props}>
    <path
      d="M9.4929 2V9.4929M9.4929 16.9858V9.4929M9.4929 9.4929H16.9858H2"
      stroke="#F9F9F9"
      strokeWidth="3.52607"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgComponent;
