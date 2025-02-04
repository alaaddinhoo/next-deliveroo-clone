import * as React from "react"
export const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={72}
    height={84}
    fill="none"
    {...props}
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