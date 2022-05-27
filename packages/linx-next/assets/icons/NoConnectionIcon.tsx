import * as React from "react"
import { SVGProps } from "react"

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={77}
    height={77}
    viewBox="0 0 77 77"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={38.5} cy={38.5} r={38.5} fill="#21242D" />
    <g clipPath="url(#clip0_29_540)">
      <path
        d="M22.458 22.4585L54.5413 54.5418"
        stroke="#F9F9F9"
        strokeWidth={3.08333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M38.5 50.1665H38.5146"
        stroke="#F9F9F9"
        strokeWidth={3.08333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M33.4404 44.4939C34.9209 43.442 36.692 42.877 38.5081 42.877C40.3242 42.877 42.0953 43.442 43.5758 44.4939"
        stroke="#F9F9F9"
        strokeWidth={3.08333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M45.3828 37.1294C46.5773 37.7124 47.6943 38.4423 48.7078 39.3023"
        stroke="#F9F9F9"
        strokeWidth={3.08333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28.292 39.3023C30.4534 37.4952 33.0547 36.2926 35.8316 35.8169"
        stroke="#F9F9F9"
        strokeWidth={3.08333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.0703 34.1253C25.0933 32.3372 27.4128 30.9158 29.9245 29.9253"
        stroke="#F9F9F9"
        strokeWidth={3.08333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M36.6191 28.3649C39.7435 28.1132 42.8865 28.4935 45.8607 29.4832C48.8348 30.4729 51.579 32.0517 53.9296 34.1254"
        stroke="#F9F9F9"
        strokeWidth={3.08333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_29_540">
        <rect
          width={35}
          height={35}
          fill="white"
          transform="translate(21 21)"
        />
      </clipPath>
    </defs>
  </svg>
)

export default SvgComponent
