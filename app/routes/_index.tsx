import { Navigate, useNavigate } from '@remix-run/react';
import React from 'react';
import Footer from '~/components/footer';

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
];

const Features = () => {
  return (
    <div className="w-full mt-20 md:mt-40 items-center rounded-lg p-5 md:w-1/2">
      <div className="grid grid-cols-1 gap-5">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-start space-x-4 transform transition duration-500 hover:scale-105 hover:bg-opacity-50 hover:bg-teal-700 p-4 rounded-lg"
          >
            <div className="text-[20px] text-[#04E6E6] animate-pulse">{feature.icon}</div>
            <div>
              <h3 className="text-[20px] font-bold text-[#00E7D9]">
                {feature.title}
              </h3>
              <p className="mt-2 text-[14px] text-[#F5F5F5]">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const HeroSection = () => {
  return (
    <section className="flex w-full items-center justify-center px-4 py-16 text-white md:w-1/2 md:px-8">
      <div className="mx-auto max-w-xl text-left animate-fade-in">
        <h1 className="font-inter mb-4 text-[36px] md:text-[48px] font-extrabold leading-tight text-[#F5F5F5]">
          10X Your insights, not your workload
        </h1>
        <p className="font-inter text-[14px] md:text-[16px] text-[#F5F5F5]">
          We bring together everything that the most ambitious crypto investors
          and teams need to make critical decisions. Use data that no one else
          has, however you like, on one single platform.
        </p>
      </div>
    </section>
  );
};

const VerifySection = () => {
  return (
    <section className="mt-20 md:mt-40 text-white py-16 px-4 md:px-8 flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
        <h1 className="font-inter font-extrabold text-[48px] leading-[58.09px] tracking-[0.06em] mb-4 text-[#F5F5F5]">
          Got a Hunch? <span className="text-teal-400">Verify it!</span>
        </h1>
        <p className="font-inter font-normal text-[14px] leading-[16.94px] tracking-[0.06em] mb-6 text-[#F5F5F5]">
          Know who or what each wallet is. Top investor or rug puller. Hot project or not. Now you can really see who is doing what CryptoGhost's labels. Leverage the superpowers of transparency.
        </p>
        <a href="#" className="inline-block bg-[#0C3131] text-[#04E6E6] font-inter font-semibold text-[14px] leading-[16.94px] tracking-[0.06em] px-10 py-3 rounded-[20px] transition duration-300 hover:bg-[#0A2525]">
          See how traced outflows from FTX before the crash
        </a>
      </div>
    </section>
  );
};

export const SalesSection = () => {
  return (
    <section className="mt-20 md:mt-40 text-white py-16 px-4 md:px-8 flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
        <h1 className="font-inter font-extrabold text-[36px] md:text-[48px] leading-[58.09px] tracking-[0.06em] mb-4 text-[#F5F5F5]">
          CryptoGhost query for crypto teams:
        </h1>
        <h2 className="font-inter font-extrabold text-[24px] md:text-[32px] leading-[38.73px] tracking-[0.06em] mb-8 text-[#04E6E6]">
          The most powerful blockchain data platform
        </h2>
        <a href="#" className="inline-block bg-[#04E6E6] text-[#043234] font-inter font-semibold text-[16px] md:text-[20px] leading-[24.2px] px-[24px] py-[8px] rounded-[15px] transition duration-300 hover:bg-[#03cfcf]">
          Contact sales →
        </a>
      </div>
    </section>
  );
};

const intelligenceSections = [
  {
    title: 'Business Intelligence',
    description: 'Benchmark your market share against competitors across different user segments. Go beyond superficial metrics like web traffic by analyzing crypto and NFT investors\' on-chain activities and asset holdings.',
  },
  {
    title: 'Customer Intelligence',
    description: 'Get a clear view of your customers on-chain, their usage of other products and services, and your performance across different customer segments compared to competitors. Develop strategies for customized products, services, and offerings to attract and retain more customers.',
  },
  {
    title: 'Ecosystem Growth',
    description: 'Gain insight into your ecosystem, including user activities, overall performance, and user segments. Evaluate your ecosystem\'s success against others. Develop strategies to drive new users and grow your chain.',
  },
  {
    title: 'Investment',
    description: 'Get access to Nansen’s underlying data, including our proprietary indicators, to test your investment and trading strategies. Integrate Nansen Query in your data pipeline.',
  },
];

const IntelligenceSection = () => {
  return (
    <section className="text-white mt-20 md:mt-40">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-fade-in-up">
        {intelligenceSections.map((section, index) => (
          <div
            key={index}
            className="border border-[#04E6E6] rounded-3xl p-4 transition duration-500 transform hover:scale-105 hover:bg-opacity-50 hover:bg-teal-700"
          >
            <h3 className="font-inter font-semibold text-[20px] leading-[24.2px] mb-4 text-[#F5F5F5]">
              {section.title}
            </h3>
            <p className="font-inter font-normal text-[12px] leading-[14.52px] text-[#F5F5F5]">
              {section.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

const AnalyticsSection = () => {
  return (
    <section className="mt-20 md:mt-40 text-white py-16 px-4 md:px-8 flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center animate-fade-in">
        <h1 className="font-inter font-extrabold text-[36px] md:text-[48px] leading-[58.09px] tracking-[0.06em] mb-4 text-[#F5F5F5]">
          See forward with CryptoGhost <br /> Blockchain Analytics
        </h1>
        <p className="font-inter font-normal text-[14px] leading-[16.94px] tracking-[0.06em] mb-8 text-[#F5F5F5]">
          Looking for new possibilities? Discover them now
        </p>
        <div className="flex justify-center space-x-4">
          <a href="/register" className="inline-block bg-[#04E6E6] text-[#043234] font-inter font-semibold text-[16px] leading-[24.2px] px-[24px] py-[12px] rounded-[15px] transition duration-300 hover:bg-[#03cfcf]">
            Start for free →
          </a>
          <a href="#" className="inline-block border border-[#04E6E6] text-[#04E6E6] font-inter font-semibold text-[16px] leading-[24.2px] px-[24px] py-[12px] rounded-[15px] transition duration-300 hover:bg-[#04E6E6] hover:text-[#043234]">
            Contact sales →
          </a>
        </div>
      </div>
    </section>
  );
};

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
];

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
];

const BlockchainDataBanner = () => {
  return (
    <div className="mt-20 md:mt-40 p-10 text-white">
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto text-left">
        <h2 className="w-full text-center md:w-1/2 text-3xl font-extrabold text-white sm:text-4xl mb-4 md:mb-0 animate-fade-in-left">
          The backbone for blockchain data
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-around w-full md:w-1/2 animate-fade-in-right">
          <div className="text-center mb-4 md:mb-0">
            <span className="block text-4xl font-bold text-teal-400">
              300M+
            </span>
            <span className="block text-center">Labelled addresses</span>
          </div>
          <div className="hidden md:block mx-4 h-12 border-l-2 border-teal-400"></div>
          <div className="text-center mb-4 md:mb-0">
            <span className="block text-4xl font-bold text-teal-400">95%</span>
            <span className="block text-center">Of all onchain TVL</span>
          </div>
          <div className="hidden md:block mx-4 h-12 border-l-2 border-teal-400"></div>
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
  );
};

const OnchainDataPlatform = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/register');
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gradient-radial px-4 mt-16">
      <div className="mt-10 flex w-full max-w-full flex-col items-center justify-center px-4">
        <div className="mb-16 w-full max-w-xl space-y-8 rounded-lg p-4 text-center">
          <div className="inline-flex items-center rounded-full border border-teal-400 bg-transparent px-3 py-1 text-white transition duration-300 hover:border-teal-500 hover:bg-teal-500 hover:text-black animate-fade-in">
            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
            <span className="text-white">Crypto</span>{' '}
            <span className="ml-1 text-teal-400">Ghost</span>{' '}
            <span className="ml-1 text-white">is now available</span>
            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7-7l7 7-7 7"></path>
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl animate-fade-in-up">
            Onchain Data Platform Trusted by the Best
          </h1>
          <p className="mx-auto text-lg text-gray-300 md:text-xl animate-fade-in-up">
            Empowering crypto investors with deep insights to make informed decisions.
          </p>
          <div className="mt-8 flex flex-wrap justify-center space-x-4">
            <button
              className="mb-2 flex items-center rounded-full bg-teal-400 px-4 py-2 text-black transition duration-300 hover:bg-teal-500 md:mb-0 animate-fade-in-up"
              onClick={handleClick}
            >
              Start for free
              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7-7l7 7-7 7"></path>
              </svg>
            </button>
            <button className="flex items-center rounded-full border border-teal-400 bg-transparent px-4 py-2 text-teal-400 transition duration-300 hover:border-teal-500 hover:bg-teal-500 hover:text-black animate-fade-in-up">
              Explore Pricing
              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7-7l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="w-full text-center text-white mt-20">
          <div className="mb-4 flex flex-wrap items-center justify-around bg-gradient-to-r from-[#022527] to-[#08858D] animate-fade-in">
            {logosTop.map((logo) => (
              <div className="rounded p-2" key={logo.alt}>
                <img src={logo.src} alt={logo.alt} className="mx-2 my-4 h-6" />
              </div>
            ))}
          </div>
          <div className="my-8 flex items-center justify-center">
            <div className="h-[1px] flex-grow bg-gradient-to-r from-[#028080] to-[#04E6E6]"></div>
            <p className="mx-4 text-lg md:text-xl animate-fade-in-up">
              The smartest investors and crypto teams use CryptoGhost to win
            </p>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-[#028080] to-[#04E6E6]"></div>
          </div>
          <div className="flex flex-wrap items-center justify-around bg-gradient-to-r from-[#022527] to-[#08858D] animate-fade-in">
            {logosBottom.map((logo) => (
              <div className="rounded p-2" key={logo.alt}>
                <img src={logo.src} alt={logo.alt} className="mx-2 my-4 h-6" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <BlockchainDataBanner />
      <div className="flex flex-col md:flex-row w-full">
        <Features />
        <HeroSection />
      </div>
      <VerifySection />
      <SalesSection />
      <IntelligenceSection />
      <AnalyticsSection />
      <Footer />
    </div>
  );
};

export default OnchainDataPlatform;