const SkeletonActivityAddress = (props: any) => (
  <svg
    role="img"
    width="130"
    height="20"
    aria-labelledby="loading-aria-address"
    viewBox="0 0 130 20"
    preserveAspectRatio="none"
    {...props}
  >
    <title id="loading-aria-address">Loading...</title>
    <rect
      x="0"
      y="0"
      width="100%"
      height="100%"
      clipPath="url(#clip-path-address)"
      style={{ fill: 'url(#fill-address)' }}
    ></rect>
    <defs>
      <clipPath id="clip-path-address">
        <rect x="0" y="5" rx="3" ry="3" width="126" height="15" />
      </clipPath>
      <linearGradient id="fill-address">
        <stop offset="0.599964" stopColor="#053133" stopOpacity="1">
          <animate
            attributeName="offset"
            values="-2; -2; 1"
            keyTimes="0; 0.25; 1"
            dur="2s"
            repeatCount="indefinite"
          ></animate>
        </stop>
        <stop offset="1.59996" stopColor="#0f6567" stopOpacity="1">
          <animate
            attributeName="offset"
            values="-1; -1; 2"
            keyTimes="0; 0.25; 1"
            dur="2s"
            repeatCount="indefinite"
          ></animate>
        </stop>
        <stop offset="2.59996" stopColor="#053133" stopOpacity="1">
          <animate
            attributeName="offset"
            values="0; 0; 3"
            keyTimes="0; 0.25; 1"
            dur="2s"
            repeatCount="indefinite"
          ></animate>
        </stop>
      </linearGradient>
    </defs>
  </svg>
)
const SkeletonActivityTransactions = (props: any) => (
  <svg
    role="img"
    width="100"
    height="20"
    aria-labelledby="loading-aria-address"
    viewBox="0 0 130 20"
    preserveAspectRatio="none"
    {...props}
  >
    <title id="loading-aria-address">Loading...</title>
    <rect
      x="0"
      y="0"
      width="100%"
      height="100%"
      clipPath="url(#clip-path-address)"
      style={{ fill: 'url(#fill-address)' }}
    ></rect>
    <defs>
      <clipPath id="clip-path-address">
        <rect x="0" y="5" rx="3" ry="3" width="126" height="15" />
      </clipPath>
      <linearGradient id="fill-address">
        <stop offset="0.599964" stopColor="#053133" stopOpacity="1">
          <animate
            attributeName="offset"
            values="-2; -2; 1"
            keyTimes="0; 0.25; 1"
            dur="2s"
            repeatCount="indefinite"
          ></animate>
        </stop>
        <stop offset="1.59996" stopColor="#0f6567" stopOpacity="1">
          <animate
            attributeName="offset"
            values="-1; -1; 2"
            keyTimes="0; 0.25; 1"
            dur="2s"
            repeatCount="indefinite"
          ></animate>
        </stop>
        <stop offset="2.59996" stopColor="#053133" stopOpacity="1">
          <animate
            attributeName="offset"
            values="0; 0; 3"
            keyTimes="0; 0.25; 1"
            dur="2s"
            repeatCount="indefinite"
          ></animate>
        </stop>
      </linearGradient>
    </defs>
  </svg>
)

const SkeletonActivityChain = () => (
  <svg
    role="img"
    width="90"
    height="40"
    aria-labelledby="loading-aria-chain"
    viewBox="0 0 90 40"
    preserveAspectRatio="none"
  >
    <title id="loading-aria-chain">Loading...</title>
    <rect
      x="0"
      y="0"
      width="100%"
      height="100%"
      clipPath="url(#clip-path-chain)"
      style={{ fill: 'url(#fill-chain)' }}
    ></rect>
    <defs>
      <clipPath id="clip-path-chain">
        <rect x="6" y="1" rx="100" ry="100" width="32" height="32" />
        <rect x="27" y="1" rx="100" ry="100" width="32" height="32" />
        <rect x="50" y="1" rx="100" ry="100" width="32" height="32" />
      </clipPath>
      <linearGradient id="fill-chain">
        <stop offset="0.599964" stopColor="#053133" stopOpacity="1">
          <animate
            attributeName="offset"
            values="-2; -2; 1"
            keyTimes="0; 0.25; 1"
            dur="2s"
            repeatCount="indefinite"
          ></animate>
        </stop>
        <stop offset="1.59996" stopColor="#15888a" stopOpacity="1">
          <animate
            attributeName="offset"
            values="-1; -1; 2"
            keyTimes="0; 0.25; 1"
            dur="2s"
            repeatCount="indefinite"
          ></animate>
        </stop>
        <stop offset="2.59996" stopColor="#053133" stopOpacity="1">
          <animate
            attributeName="offset"
            values="0; 0; 3"
            keyTimes="0; 0.25; 1"
            dur="2s"
            repeatCount="indefinite"
          ></animate>
        </stop>
      </linearGradient>
    </defs>
  </svg>
)

const SkeletonTokenTable = () => (
  <svg
    role="img"
    width="370"
    height="100"
    aria-labelledby="loading-aria-token-table"
    viewBox="0 0 476 100"
    preserveAspectRatio="none"
  >
    <title id="loading-aria-token-table">Loading...</title>
    <rect
      x="0"
      y="0"
      width="100%"
      height="100%"
      clipPath="url(#clip-path-token-table)"
      style={{ fill: 'url(#fill-token-table)' }}
    ></rect>
    <defs>
      <clipPath id="clip-path-token-table">
        <rect x="40" y="16" rx="3" ry="3" width="60" height="9" />
        <circle cx="18" cy="21" r="11" />
        <rect x="130" y="16" rx="3" ry="3" width="60" height="9" />
        <rect x="215" y="16" rx="3" ry="3" width="60" height="9" />
        <rect x="41" y="49" rx="3" ry="3" width="60" height="9" />
        <circle cx="18" cy="54" r="11" />
        <rect x="130" y="49" rx="3" ry="3" width="60" height="9" />
        <rect x="216" y="50" rx="3" ry="3" width="60" height="9" />
        <rect x="40" y="81" rx="3" ry="3" width="60" height="9" />
        <circle cx="18" cy="86" r="11" />
        <rect x="130" y="80" rx="3" ry="3" width="60" height="9" />
        <rect x="216" y="79" rx="3" ry="3" width="60" height="9" />
      </clipPath>
      <linearGradient id="fill-token-table">
        <stop offset="0.599964" stopColor="#053133" stopOpacity="1">
          <animate
            attributeName="offset"
            values="-2; -2; 1"
            keyTimes="0; 0.25; 1"
            dur="2s"
            repeatCount="indefinite"
          ></animate>
        </stop>
        <stop offset="1.59996" stopColor="#15888a" stopOpacity="1">
          <animate
            attributeName="offset"
            values="-1; -1; 2"
            keyTimes="0; 0.25; 1"
            dur="2s"
            repeatCount="indefinite"
          ></animate>
        </stop>
        <stop offset="2.59996" stopColor="#053133" stopOpacity="1">
          <animate
            attributeName="offset"
            values="0; 0; 3"
            keyTimes="0; 0.25; 1"
            dur="2s"
            repeatCount="indefinite"
          ></animate>
        </stop>
      </linearGradient>
    </defs>
  </svg>
)

const SkeletonWalletInteractions = () => (
  <svg
    role="img"
    width="440"
    height="170"
    aria-labelledby="loading-aria-wallet-interactions"
    viewBox="0 0 533 170"
    preserveAspectRatio="none"
  >
    <title id="loading-aria-wallet-interactions">Loading...</title>
    <rect
      x="0"
      y="0"
      width="100%"
      height="100%"
      clipPath="url(#clip-path-wallet-interactions)"
      style={{ fill: 'url(#fill-wallet-interactions)' }}
    ></rect>
    <defs>
      <clipPath id="clip-path-wallet-interactions">
        <rect x="1" y="3" rx="3" ry="3" width="272" height="16" />
        <rect x="499" y="4" rx="3" ry="3" width="24" height="14" />
        <rect x="499" y="28" rx="3" ry="3" width="24" height="14" />
        <rect x="500" y="51" rx="3" ry="3" width="24" height="14" />
        <rect x="1" y="26" rx="3" ry="3" width="272" height="16" />
        <rect x="1" y="49" rx="3" ry="3" width="272" height="16" />
        <rect x="1" y="70" rx="3" ry="3" width="272" height="16" />
        <rect x="500" y="72" rx="3" ry="3" width="24" height="14" />
        <rect x="500" y="93" rx="3" ry="3" width="24" height="14" />
        <rect x="500" y="115" rx="3" ry="3" width="24" height="14" />
        <rect x="1" y="90" rx="3" ry="3" width="272" height="16" />
        <rect x="1" y="112" rx="3" ry="3" width="272" height="16" />
        <rect x="1" y="133" rx="3" ry="3" width="272" height="16" />
        <rect x="500" y="135" rx="3" ry="3" width="24" height="14" />
      </clipPath>
      <linearGradient id="fill-wallet-interactions">
        <stop offset="0.599964" stopColor="#053133" stopOpacity="1">
          <animate
            attributeName="offset"
            values="-2; -2; 1"
            keyTimes="0; 0.25; 1"
            dur="2s"
            repeatCount="indefinite"
          ></animate>
        </stop>
        <stop offset="1.59996" stopColor="#15888a" stopOpacity="1">
          <animate
            attributeName="offset"
            values="-1; -1; 2"
            keyTimes="0; 0.25; 1"
            dur="2s"
            repeatCount="indefinite"
          ></animate>
        </stop>
        <stop offset="2.59996" stopColor="#053133" stopOpacity="1">
          <animate
            attributeName="offset"
            values="0; 0; 3"
            keyTimes="0; 0.25; 1"
            dur="2s"
            repeatCount="indefinite"
          ></animate>
        </stop>
      </linearGradient>
    </defs>
  </svg>
)

export { SkeletonActivityAddress, SkeletonActivityChain, SkeletonActivityTransactions,SkeletonTokenTable, SkeletonWalletInteractions }
