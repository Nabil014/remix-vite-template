const features = [
  {
    title: 'Analytics',
    description:
      'Surface alpha with a powerful no-code crypto analytics platform. Set up Smart Alerts to notify you of specific on-chain activities.',
    icon: '🔥',
  },
  {
    title: 'Query',
    description:
      'Programmatically access onchain data blazingly fast via CryptoGhost Query.',
    icon: '🔥',
  },
  {
    title: 'Research',
    description:
      'Learn professionally researched insights via Nansen Research Portal.',
    icon: '🔥',
  },
  {
    title: 'Portfolio',
    description:
      "Manage your personal or organization's holdings via CryptoGhost Portfolio.",
    icon: '🔥',
  },
]

const Features: React.FC = () => {
  return (
    <div className="w-1/2 items-start rounded-lg">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-1">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="text-[20px] text-[#04E6E6]">{feature.icon}</div>
            <div>
              <h3 className="text-[20px] font-bold text-[#00E7D9]">
                {feature.title}
              </h3>
              <p className="text-[#F5F5F5] text-[14px] mt-5">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// URLs de los logotipos proporcionados
const logosTop = [
  {
    src: 'https://cdn.prod.website-files.com/60118ca18674407b85935203/63fc65efad0fbf703f660c40_Group.svg',
    alt: 'Accel',
  },
  {
    src: 'https://cdn.prod.website-files.com/60118ca18674407b85935203/63fc65efa506caa3ad4823f0_Clip%20path%20group.svg',
    alt: 'a16z',
  },
  {
    src: 'https://cdn.prod.website-files.com/60118ca18674407b85935203/63fc65efb9bb103b341fa5cd_Clip%20path%20group-2.svg',
    alt: 'OpenSea',
  },
  {
    src: 'https://cdn.prod.website-files.com/60118ca18674407b85935203/63fc65efc1ef8e49e36f0d5e_Mask%20group.svg',
    alt: 'Coinbase',
  },
  {
    src: 'https://cdn.prod.website-files.com/60118ca18674407b85935203/63fc65eff87ebe7b363a9676_Group-2.svg',
    alt: 'Polygon',
  },
]

const logosBottom = [
  {
    src: 'https://cdn.prod.website-files.com/60118ca18674407b85935203/63fc65ef00930b089e506f34_Clip%20path%20group-3.svg',
    alt: 'Avalanche',
  },
  {
    src: 'https://cdn.prod.website-files.com/60118ca18674407b85935203/65007e42315b98f799fb32a6_consensys.svg',
    alt: 'Consensys',
  },
  {
    src: 'https://cdn.prod.website-files.com/60118ca18674407b85935203/6406e4ac190545e3e8be2e80_logo-Arbiscan%201.webp',
    alt: 'Arbiscan',
  },
  {
    src: 'https://cdn.prod.website-files.com/60118ca18674407b85935203/65007c4041e827213d6f0e5e_chainlink.svg',
    alt: 'Chainlink',
  },
  {
    src: 'https://cdn.prod.website-files.com/60118ca18674407b85935203/6406e4ac9e2c94b8d843e5f3_Group%201597411.webp',
    alt: 'Gauntlet',
  },
]

const BlockchainDataBanner = () => {
  return (
    <div className="mb-10 mt-10 p-10 text-white">
      <div className="flex max-w-7xl text-left">
        <h2 className="w-1/2 justify-center text-3xl font-extrabold text-white sm:text-4xl">
          The backbone for blockchain data
        </h2>
        <div className="flex items-center justify-between">
          <div className="text-center">
            <span className="block text-4xl font-bold text-teal-400">
              300M+
            </span>
            <span className="block text-center">Labelled addresses</span>
          </div>
          <div className="mx-4 h-12 border-l-2 border-teal-400"></div>
          <div className="text-center">
            <span className="block text-4xl font-bold text-teal-400">95%</span>
            <span className="block text-center">Of all onchain TVL</span>
          </div>
          <div className="mx-4 h-12 border-l-2 border-teal-400"></div>
          <div className="text-center">
            <span className="block text-4xl font-bold text-teal-400">
              500TB
            </span>
            <span className="block text-center">Data processed daily</span>
          </div>
        </div>
      </div>
      <p className="mt-4 text-center text-[14px] text-gray-300 opacity-80">
        Follow the Smart Money, see where funds are moving to, identify new
        projects or tokens, and trace transactions down to the most granular
        level.
      </p>
    </div>
  )
}

const OnchainDataPlatform = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-radial px-4">
      <div className="mt-10 flex w-full max-w-6xl flex-col items-center justify-center px-4">
        <div className="mb-16 w-full max-w-xl space-y-8 rounded-lg p-4 text-center">
          <div className="inline-flex items-center rounded-full border border-teal-400 bg-transparent px-3 py-1 text-white transition duration-300 hover:border-teal-500 hover:bg-teal-500 hover:text-black">
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              ></path>
            </svg>
            <span className="text-white">Crypto</span>{' '}
            <span className="ml-1 text-teal-400">Ghost</span>{' '}
            <span className="ml-1 text-white">is now available</span>
            <svg
              className="ml-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h14m-7-7l7 7-7 7"
              ></path>
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Onchain Data Platform Trusted by the Best
          </h1>
          <p className="mx-auto text-lg text-gray-300 md:text-xl">
            Empowering crypto investors with deep insights to make informed
            decisions.
          </p>
          <div className="mt-8 flex flex-wrap justify-center space-x-4">
            <button className="mb-2 flex items-center rounded-full bg-teal-400 px-4 py-2 text-black transition duration-300 hover:bg-teal-500 md:mb-0">
              Start for free
              <svg
                className="ml-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h14m-7-7l7 7-7 7"
                ></path>
              </svg>
            </button>
            <button className="flex items-center rounded-full border border-teal-400 bg-transparent px-4 py-2 text-teal-400 transition duration-300 hover:border-teal-500 hover:bg-teal-500 hover:text-black">
              Explore Pricing
              <svg
                className="ml-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h14m-7-7l7 7-7 7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="w-full text-center text-white">
          <div className="mb-4 flex flex-wrap items-center justify-around bg-gradient-to-r from-[#022527] to-[#08858D]">
            {logosTop.map(logo => (
              <div className="rounded p-2" key={logo.alt}>
                <img src={logo.src} alt={logo.alt} className="mx-2 my-4 h-6" />
              </div>
            ))}
          </div>
          <div className="my-8 flex items-center justify-center">
            <div className="h-[1px] flex-grow bg-gradient-to-r from-[#028080] to-[#04E6E6]"></div>
            <p className="mx-4 text-lg md:text-xl">
              The smartest investors and crypto teams use CryptoGhost to win
            </p>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-[#028080] to-[#04E6E6]"></div>
          </div>
          <div className="flex flex-wrap items-center justify-around bg-gradient-to-r from-[#022527] to-[#08858D]">
            {logosBottom.map(logo => (
              <div className="rounded p-2" key={logo.alt}>
                <img src={logo.src} alt={logo.alt} className="mx-2 my-4 h-6" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <BlockchainDataBanner />
      <div>
        <Features />
      </div>
    </div>
  )
}

export default OnchainDataPlatform
