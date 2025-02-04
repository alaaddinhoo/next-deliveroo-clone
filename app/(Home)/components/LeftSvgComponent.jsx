import * as React from "react"
export const SvgComponent = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={72}
    height={84}
    fill="none"
    
  >
    <path fill="url(#a)" d="M0 0h72v84H0z" />
    <defs>
      <pattern
        id="a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <use xlinkHref="#b" transform="scale(.00694 .00595)" />
      </pattern>
      <image
        xlinkHref="data:image/png;base64,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"
        id="b"
        width={144}
        height={168}
      />
    </defs>
  </svg>
)