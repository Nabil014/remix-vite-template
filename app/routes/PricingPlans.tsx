import React from 'react'
import ComparePlans from '~/components/ComparePlans'
import FAQ from '~/components/Faqs'
import Footer from '~/components/footer'

const PricingPlans = () => {
  return (
    <div className="mt-5 bg-gradient-radial py-16 text-white">
      <div className="container mx-auto px-4">
        <h1 className="mb-8 text-center text-[48px] font-black leading-[58.09px] tracking-wide text-[#F5F5F5]">
          Grow with CryptoGhost
        </h1>
        <p className="mb-12 text-center text-[20px] font-medium leading-[24.2px] text-[#F5F5F5]">
          From individual investors to crypto funds and global teams. Explore
          the best option for you.
        </p>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mt-20">
          {/* Free Plan */}
          <div className="mx-auto max-w-sm rounded-lg border border-[#04E6E6] bg-[#022527] p-6 text-white shadow-lg">
            <h2 className="mb-4 text-2xl font-semibold">Free</h2>
            <p className="mb-24 text-sm">
              Discover CryptoGhost’s core features. Dive into onchain data
              analytics, now more powerful than ever
            </p>
            <button className="mb-4 w-full rounded bg-[#00D8FF] py-2 font-semibold text-black transition duration-300 hover:bg-[#00B8E4]">
              Select plan
            </button>
            <hr className="my-6 border-t-2 border-[#00D8FF] sm:mt-20" />
            <h3 className="mb-4 mt-10 text-xl font-semibold">
              Our Free plan includes:
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                ✔️<span className="ml-2">Ai-powered Smart Search</span>
              </li>
              <li className="flex items-start">
                ✔️
                <span className="ml-2">
                  Basic onchain Signals on important market movements
                </span>
              </li>
              <li className="flex items-start">
                ✔️
                <span className="ml-2">
                  Basic wallet and entity analytics to understand token balances
                  and onchain activities
                </span>
              </li>
              <li className="flex items-start">
                ✔️
                <span className="ml-2">
                  Basic access to Token and NFT analytics
                </span>
              </li>
              <li className="flex items-start">
                ✔️
                <span className="ml-2">
                  Basic customizable features to personalize your CryptoGhost
                  experience
                </span>
              </li>
              <li className="flex items-start">
                ✔️
                <span className="ml-2">
                  Check multichain ecosystem performances, and insights into
                  various crypto protocols
                </span>
              </li>
              <li className="flex items-start">
                ✔️
                <span className="ml-2">
                  Manage your crypto assets across 45+ EVM and non-EVM chains
                  via CryptoGhost Portfolio
                </span>
              </li>
            </ul>
          </div>

          {/* Gold Plan */}
          <div className="mx-auto max-w-sm rounded-lg border border-[#04E6E6] bg-[#022527] p-6 text-white shadow-lg">
            <h2 className="mb-4 text-2xl font-semibold">Gold</h2>
            <p className="mb-12 text-sm">
              For active investors. Elevate your investments with labeled
              profiles and in-depth crypto analytics.
            </p>
            <div className="mb-6 text-4xl font-bold">
              $99<span className="text-lg font-normal"> / month</span>
            </div>
            <button className="mb-4 w-full rounded bg-[#00D8FF] py-2 font-semibold text-black transition duration-300 hover:bg-[#00B8E4]">
              Select plan
            </button>
            <hr className="my-6 border-t-2 border-[#00D8FF] sm:mt-20" />
            <h3 className="mb-4 mt-10 text-xl font-semibold">
              Everything in Free, plus:
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                ✔️
                <span className="ml-2">
                  CryptoGhost labels for 300M+ address across 10+ chains,
                  including Smart Money labels to identify top crypto players
                </span>
              </li>
              <li className="flex items-start">
                ✔️
                <span className="ml-2">
                  Insights on Smart Money trades, trends and activity
                </span>
              </li>
              <li className="flex items-start">
                ✔️
                <span className="ml-2">
                  Unlimited customizable features for the ultimate Cryptoghost
                  experience
                </span>
              </li>
              <li className="flex items-start">
                ✔️
                <span className="ml-2">
                  All onchain Signals on important market movements, and Signal
                  filters
                </span>
              </li>
              <li className="flex items-start">
                ✔️
                <span className="ml-2">
                  Advanced analytics on wallets, entities, labels and segments
                </span>
              </li>
              <li className="flex items-start">
                ✔️
                <span className="ml-2">
                  Advanced access to Token and NFT analytics
                </span>
              </li>
              <li className="flex items-start">
                ✔️
                <span className="ml-2">
                  Advanced customizable features to optimize your CryptoGhost
                  usage
                </span>
              </li>
              <li className="flex items-start">
                ✔️
                <span className="ml-2">
                  If you need more seats, contact us for a custom deal
                </span>
              </li>
            </ul>
          </div>

          {/* Diamond Plan */}
          <div className="mx-auto max-w-sm rounded-lg border border-[#04E6E6] bg-[#022527] p-6 text-white shadow-lg">
            <h2 className="mb-4 text-2xl font-semibold">Diamond</h2>
            <p className="mb-6 text-sm">
              For serious investors and funds. Get complete access to onchain
              analytics, exclusive alpha community, and institutional-grade
              research.
            </p>
            <div className="mb-6 text-4xl font-bold">
              $289<span className="text-lg font-normal"> / month</span>
            </div>
            <button className="mb-4 w-full rounded bg-[#00D8FF] py-2 font-semibold text-black transition duration-300 hover:bg-[#00B8E4]">
              Select plan
            </button>
            <button className="mb-6 w-full rounded border border-[#00D8FF] py-2 font-semibold text-[#00D8FF] transition duration-300 hover:bg-[#00D8FF] hover:text-black">
              or Request a demo
            </button>
            <hr className="my-6 border-t-2 border-[#00D8FF]" />
            <h3 className="mb-4 mt-10 text-xl font-semibold">
              Everything in Gold, plus:
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                ✔️
                <span className="ml-2">
                  Annual subscribers may apply to join Alpha Community
                </span>
              </li>
              <li className="flex items-start">
                ✔️
                <span className="ml-2">
                  Full access to all features for comprehensive insights and
                  analytics
                </span>
              </li>
              <li className="flex items-start">
                ✔️
                <span className="ml-2">
                  Unlimited customizable features for the ultimate Cryptoghost
                  experience
                </span>
              </li>
              <li className="flex items-start">
                ✔️
                <span className="ml-2">
                  Institutional-grade research for key crypto trends leveraging
                  onchain data
                </span>
              </li>
              <li className="flex items-start">
                ✔️<span className="ml-2">CSV downloads</span>
              </li>
              <li className="flex items-start">
                ✔️
                <span className="ml-2">
                  Early access to new product releases
                </span>
              </li>
              <li className="flex items-start">
                ✔️
                <span className="ml-2">Dedicated Customer Success Manager</span>
              </li>
              <li className="flex items-start">
                ✔️
                <span className="ml-2">
                  If you need more seats, contact us for a custom deal
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* New Section: Enterprise */}
        <div className="mt-16 rounded-lg border border-[#04E6E6] bg-[#022527] p-8 text-white">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-2xl font-semibold">Enterprise</h2>
              <p className="mb-8">
                For crypto teams or funds. Gather business and customer
                intelligence, boost ecosystem growth, or optimize investments
                using CryptoGhost Query.
              </p>
              <button className="w-full rounded bg-[#00D8FF] px-6 py-2 font-semibold text-black transition duration-300 hover:bg-[#00B8E4] md:w-auto">
                Contact us
              </button>
            </div>
            <div>
              <h3 className="mb-4 text-xl font-semibold">
                Solutions to meet the needs of top crypto teams:
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  ✔️
                  <span className="ml-2">
                    Accurate and comprehensive repository of blockchain data
                  </span>
                </li>
                <li className="flex items-start">
                  ✔️
                  <span className="ml-2">
                    Ready integrations for enterprise IT stack and workflow,
                    from python notebooks to database connectors
                  </span>
                </li>
                <li className="flex items-start">
                  ✔️
                  <span className="ml-2">
                    Enterprise-grade SLAs: Covering data freshness and accuracy
                    to query response and performance
                  </span>
                </li>
                <li className="flex items-start">
                  ✔️<span className="ml-2">Real-time portfolio APIs</span>
                </li>
                <li className="flex items-start">
                  ✔️
                  <span className="ml-2">
                    Third-party data (e.g. market data) to enrich analysis
                  </span>
                </li>
                <li className="flex items-start">
                  ✔️
                  <span className="ml-2">
                    Customized datasets: tailored to your team’s unique data
                    needs
                  </span>
                </li>
                <li className="flex items-start">
                  ✔️
                  <span className="ml-2">
                    Dedicated customer success support
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <ComparePlans />
        </div>
        <div className='mt-20'>
          <FAQ />
          <SalesSection/>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default PricingPlans


export const SalesSection = () => {
    return (
      <section className="mt-10 text-white py-16 px-4 md:px-8 flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <h1 className="font-inter font-extrabold text-[36px] md:text-[48px] leading-[58.09px] tracking-[0.06em] mb-4 text-[#F5F5F5]">
          Chart your path to success with CryptoGhost
          </h1>
          <h2 className="mt-10 font-inter font-light text-[20px] md:text-[32px] leading-[38.73px] tracking-[0.06em] mb-8 text-white">
          Gain onchain insights trusted by top investors and crypto teams
          </h2>
          <a href="#" className="inline-block bg-[#04E6E6] text-[#043234] font-inter font-semibold text-[16px] md:text-[20px] leading-[24.2px] px-[24px] py-[8px] rounded-[15px] transition duration-300 hover:bg-[#03cfcf]">
            Start for free →
          </a>
          <a href="#" className="inline-block bg-transparent text-[#04E6E6] font-inter font-semibold text-[16px] md:text-[20px] leading-[24.2px] px-[24px] py-[8px] rounded-[15px] transition duration-300 hover:bg-[#03cfcf] border border-[#04E6E6]">
            Contact sales →
          </a>
        </div>
      </section>
    );
  };
  