import React from "react"

const Logo = (
  <svg
    name="logo"
    width="100%"
    height="100%"
    viewBox="0 0 512 512"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="2.28882e-05"
      y="-1.14441e-05"
      width="512"
      height="512"
      rx="256"
      fill="#070D58"
      fillOpacity="0.5"
    />
    <rect x="213" y="106" width="85" height="300" rx="6" fill="#5865F2" />
    <rect
      x="106"
      y="298"
      width="85"
      height="300"
      rx="6"
      transform="rotate(-90 106 298)"
      fill="#5865F2"
    />
    <path
      d="M512 256C512 397.385 397.385 512 256 512C114.615 512 0 397.385 0 256C0 114.615 114.615 0 256 0C397.385 0 512 114.615 512 256ZM38.4 256C38.4 376.177 135.823 473.6 256 473.6C376.177 473.6 473.6 376.177 473.6 256C473.6 135.823 376.177 38.4 256 38.4C135.823 38.4 38.4 135.823 38.4 256Z"
      fill="#5865F2"
    />
  </svg>
)

export const monochromeLogo = Logo
export const darkLogo = Logo
export const lightLogo = Logo
