import { json, Link, useLoaderData } from '@remix-run/react'
import { type LoaderFunction } from '@remix-run/server-runtime'
import { motion } from 'framer-motion'
import { AuroraBackground } from '~/components/aurora-background'
import { Highlight } from '~/components/hero-highlight'
import { AnimatedTooltip } from '~/components/ui/animated-tooltip'
import { GlareCard } from '~/components/ui/glare-card'
import { InfiniteMovingCards } from '~/components/ui/infinite-moving-cards'
import { InfiniteMovingCardsCollections } from '~/components/ui/infinite-moving-cards-collections'
import { WobbleCard } from '~/components/ui/wobble-card'
import { CardBody, CardContainer, CardItem } from '../components/ui/3d-card'
export const loader: LoaderFunction = async () => {
  // Datos de seed
  const items = [
    {
      id: 1,
      title: 'Item 1',
      description: 'Description for Item 1',
      image:
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      metadataLink: 'https://twitter.com/mannupaaji',
    },
    {
      id: 2,
      title: 'Item 2',
      description: 'Description for Item 2',
      image:
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      metadataLink: 'https://twitter.com/mannupaaji',
    },
    // Añade más ítems aquí...
  ]

  return json({ items })
}
const cards = [
  {
    children: (
      <CardContainer className="inter-var h-full w-full">
        <CardBody className="group/card relative flex h-full w-auto flex-col items-center justify-center rounded-xl border border-gray-600 bg-[#3b3b3b] p-6 hover:shadow-2xl hover:shadow-blue-500/[0.3] dark:border-gray-700 dark:bg-black">
          <CardItem translateZ="50" className="text-xl font-bold text-white">
            Make things float in air
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="mt-2 max-w-sm text-sm text-gray-400"
          >
            Hover over this card to unleash the power of CSS perspective
          </CardItem>
          <CardItem translateZ="100" className="mt-4 w-full">
            <img
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              height="1000"
              width="1000"
              className="h-60 w-full rounded-xl object-cover group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          </CardItem>
          <div className="mt-4 flex w-full items-center justify-between">
            <CardItem
              translateZ={20}
              as={Link}
              href="https://twitter.com/mannupaaji"
              target="__blank"
              className="rounded-xl px-4 py-2 text-xs font-normal text-white"
            >
              Metadata →
            </CardItem>
            <CardItem
              translateZ={20}
              as="button"
              className="rounded-xl bg-[#FFD700] px-4 py-2 text-xs font-bold text-white"
            >
              Offer Now
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    ),
    id: '1',
  },
  // Añade más tarjetas aquí
]

export default function Chatbot() {
  const items = useLoaderData()
  const people = [
    {
      id: 1,
      name: 'John Doe',
      designation: 'Software Engineer',
      image:
        'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80',
    },
    {
      id: 2,
      name: 'Robert Johnson',
      designation: 'Product Manager',
      image:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    },
    {
      id: 3,
      name: 'Jane Smith',
      designation: 'Data Scientist',
      image:
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    },
  ]
  const TRENDS_INFO = [
    {
      id: 1,
      name: 'John Doe',
      qty: '0,00 ETH',
      image:
        'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80',
    },
    {
      id: 2,
      name: 'Robert Johnson',
      qty: '0,00 ETH',
      image:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    },
    {
      id: 3,
      name: 'Jane Smith',
      qty: '0,00 ETH',
      image:
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    },
    {
      id: 4,
      name: 'John Doe',
      qty: '0,00 ETH',
      image:
        'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    },
    {
      id: 5,
      name: 'Robert Johnson',
      qty: '0,00 ETH',
      image:
        'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    },
    {
      id: 6,
      name: 'Jane Smith',
      qty: '0,00 ETH',
      image:
        'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    },
  ]
  const TOP_COLLECTIONS =[
    {
      id:1,
      image:'XXXXXXXXXXXX',
      name:'Nombre',
      min_price: '00,0 ETH',
      min_price_24hs:'+00,000',
      market_cap:'0,000,000,000.00',
      market_capitalization_24hs:'+00,000'
    },
    {
      id:2,
      image:'XXXXXXXXXXXX',
      name:'Nombre',
      min_price: '00,0 ETH',
      min_price_24hs:'+00,000',
      market_cap:'0,000,000,000.00',
      market_capitalization_24hs:'+00,000'
    },
    {
      id:3,
      image:'XXXXXXXXXXXX',
      name:'Nombre',
      min_price: '00,0 ETH',
      min_price_24hs:'+00,000',
      market_cap:'0,000,000,000.00',
      market_capitalization_24hs:'+00,000'
    },
    {
      id:4,
      image:'XXXXXXXXXXXX',
      name:'Nombre',
      min_price: '00,0 ETH',
      min_price_24hs:'+00,000',
      market_cap:'0,000,000,000.00',
      market_capitalization_24hs:'+00,000'
    },
  ]
  return (
    <>
      <div className=" flex flex-col items-center justify-center  ">
        <div className="mt-0 flex  h-[90vh] w-full flex-col items-center justify-center gap-4 p-4 md:flex-row">
          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: 'easeInOut',
            }}
            className="flex h-full w-full flex-shrink-0 items-center justify-center p-6 md:w-1/2 lg:w-2/5"
          >
            <CardContainer className="inter-var h-full w-full">
              <CardBody className="group/card relative flex h-full w-auto flex-col items-center justify-center rounded-xl border border-gray-600 bg-[#3b3b3b] p-6 hover:shadow-2xl hover:shadow-blue-500/[0.3] dark:border-gray-700 dark:bg-black">
                <div className="justify-left mb-2 flex w-full flex-row items-center">
                  <AnimatedTooltip items={people} />
                </div>

                <CardItem translateZ="100" className="mt-4 w-full">
                  <img
                    src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    height="1000"
                    width="1000"
                    className="h-60 w-full rounded-xl object-cover group-hover/card:shadow-xl"
                    alt="thumbnail"
                  />
                </CardItem>

                <CardItem
                  translateZ="50"
                  className="mb-4 mt-4 text-xl font-bold text-white"
                >
                  Make things float in air
                </CardItem>
                <div className="flex w-full items-center  justify-between">
                  <CardItem
                    translateZ={20}
                    as={Link}
                    href="https://twitter.com/mannupaaji"
                    target="__blank"
                    className="rounded-xl px-4 py-2 text-xs font-normal text-white"
                  >
                    Metadata →
                  </CardItem>
                  <CardItem
                    translateZ={20}
                    as="button"
                    className="rounded-xl bg-[#FFD700] px-4 py-2 text-xs font-bold text-[#1a1a1a]"
                  >
                    Offer Now
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          </motion.div>
          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: 'easeInOut',
            }}
            className="relative flex h-full w-full flex-col items-center justify-center gap-4 px-4 text-center md:w-1/2 md:text-left lg:w-2/5"
          >
            <motion.h1
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: [20, -5, 0],
              }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0.0, 0.2, 1],
              }}
              className="max-w-4xl px-4 text-left text-2xl font-bold leading-relaxed text-white dark:text-white md:text-3xl lg:text-4xl lg:leading-snug"
            >
              <Highlight className="px-4 text-lg text-white dark:text-white">
                {' The Coolest Marketplace. '}
              </Highlight>
            </motion.h1>
            <div className="py-4 font-extralight text-gray-300 md:text-4xl">
              "Stays On" embodies the relentless pursuit of innovation and the
              thrill of the unknown.
            </div>
            <div className="text-left text-sm text-white">
              178 minted • 100 per wallet • 7d 23h left
            </div>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
              <button>
                <GlareCard className="flex flex-col items-center justify-center">
                  {'Mint Now'}
                </GlareCard>
              </button>
            </div>
          </motion.div>
        </div>

        <InfiniteMovingCards direction="right" speed="slow" />
        <InfiniteMovingCardsCollections direction="right" speed="slow" />
        <div className="mx-auto grid  max-w-7xl grid-cols-1 gap-4 p-10 lg:grid-cols-3">
          <WobbleCard
            containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
            className=""
          >
            <div className="max-w-xs">
              <h2 className="text-balance text-left text-base font-semibold tracking-[-0.015em] text-white md:text-xl lg:text-3xl">
                Gippity AI powers the entire universe
              </h2>
              <p className="mt-4 text-left  text-base/6 text-neutral-200">
                With over 100,000 mothly active bot users, Gippity AI is the
                most popular AI platform for developers.
              </p>
            </div>
            <img
              src="/linear.webp"
              alt="linear demo "
              className="absolute -bottom-10 -right-4 rounded-2xl object-contain grayscale filter lg:-right-[40%]"
            />
          </WobbleCard>
          <WobbleCard containerClassName="col-span-1 min-h-[300px]">
            <h2 className="max-w-80  text-balance text-left text-base font-semibold tracking-[-0.015em] text-white md:text-xl lg:text-3xl">
              No shirt, no shoes, no weapons.
            </h2>
            <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
              If someone yells “stop!”, goes limp, or taps out, the fight is
              over.
            </p>
          </WobbleCard>
          <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
            <div className="max-w-sm">
              <h2 className="max-w-sm text-balance  text-left text-base font-semibold tracking-[-0.015em] text-white md:max-w-lg md:text-xl lg:text-3xl">
                Signup for blazing-fast cutting-edge state of the art Gippity AI
                wrapper today!
              </h2>
              <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
                With over 100,000 mothly active bot users, Gippity AI is the
                most popular AI platform for developers.
              </p>
            </div>
            <img
              src="/linear.webp"
              width={500}
              height={500}
              alt="linear demo "
              className="absolute -bottom-10 -right-10 rounded-2xl object-contain md:-right-[40%] lg:-right-[20%]"
            />
          </WobbleCard>
        </div>
      </div>
      <div className='max-w-[75vw] mx-auto flex flex-col gap-y-10 pb-14'>
        <section>
        <h3 className=" mb-7 text-2xl flex text-[#F5F5F5]">Trends</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TRENDS_INFO.map(item => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b border-[#04e6e62a] p-4"
            >
              <div className="flex w-full items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-10 w-10 rounded-lg"
                />
                <div className="ml-2 flex w-full min-w-[150px] md:min-w-[175px] lg:min-w-[300px] xl:min-w-[400px] justify-between">
                  <h4 className="text-lg font-medium text-[#F5F5F5]">{item.name}</h4>
                  <p className="text-sm text-[#F5F5F5]">{item.qty}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        </section>
        <section>
          <h3 className='mb-7 text-2xl flex text-[#F5F5F5]'>Top collections by market capitalization</h3>
          <div className="overflow-x-auto">
      <table className="min-w-full text-white">
        <thead>
          <tr>
            <th className="px-4 py-2 text-start text-sm font-medium">Recopilation</th>
            <th className="px-4 py-2 text-start text-sm">Min price</th>
            <th className="px-4 py-2 text-start text-sm">Min price 24h %</th>
            <th className="px-4 py-2 text-start text-sm">Market cap</th>
            <th className="px-4 py-2 text-start text-sm">Market capitalization 24h %</th>
          </tr>
        </thead>
        <tbody>
          {TOP_COLLECTIONS.map((collection) => (
            <tr key={collection.id} className='border-b border-[#04e6e62a]'>
              <td className="px-4 py-2 flex items-center">
                <img src={collection.image} alt={collection.name} className="w-8 h-8 mr-2" />
                <span className='text-sm text-[#F5F5F5]'>{collection.name}</span>
              </td>
              <td className="px-4 py-2 text-sm text-[#F5F5F5]">{collection.min_price}</td>
              <td className="px-4 py-2 text-sm  text-[#05FF00]">{collection.min_price_24hs}</td>
              <td className="px-4 py-2 text-sm text-[#F5F5F5]">{collection.market_cap}</td>
              <td className="px-4 py-2 text-sm  text-[#05FF00]  ">{collection.market_capitalization_24hs}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
        </section>
      </div>
    </>
  )
}
