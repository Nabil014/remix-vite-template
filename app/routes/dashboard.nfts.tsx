import { motion } from "framer-motion";
import { AuroraBackground } from "~/components/aurora-background";
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card";
import { Link, json, useLoaderData } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/server-runtime";
import { InfiniteMovingCards } from "~/components/ui/infinite-moving-cards";
import { Highlight } from "~/components/hero-highlight";
import { InfiniteMovingCardsCollections } from "~/components/ui/infinite-moving-cards-collections";
import { GlareCard } from "~/components/ui/glare-card";
import { WobbleCard } from "~/components/ui/wobble-card";
import { AnimatedTooltip } from "~/components/ui/animated-tooltip";
export const loader: LoaderFunction = async () => {
  // Datos de seed
  const items = [
    {
      id: 1,
      title: "Item 1",
      description: "Description for Item 1",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      metadataLink: "https://twitter.com/mannupaaji"
    },
    {
      id: 2,
      title: "Item 2",
      description: "Description for Item 2",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      metadataLink: "https://twitter.com/mannupaaji"
    },
    // Añade más ítems aquí...
  ];

  return json({ items });
};
const cards = [
  {
    children: (
      <CardContainer className="inter-var h-full w-full">
        <CardBody className="bg-[#3b3b3b] relative group/card hover:shadow-2xl hover:shadow-blue-500/[0.3] dark:bg-black dark:border-gray-700 border-gray-600 w-auto h-full rounded-xl p-6 border flex flex-col items-center justify-center">
          <CardItem translateZ="50" className="text-xl font-bold text-white">
            Make things float in air
          </CardItem>
          <CardItem as="p" translateZ="60" className="text-gray-400 text-sm max-w-sm mt-2">
            Hover over this card to unleash the power of CSS perspective
          </CardItem>
          <CardItem translateZ="100" className="w-full mt-4">
            <img
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              height="1000"
              width="1000"
              className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          </CardItem>
          <div className="flex justify-between items-center mt-4 w-full">
            <CardItem
              translateZ={20}
              as={Link}
              href="https://twitter.com/mannupaaji"
              target="__blank"
              className="px-4 py-2 rounded-xl text-xs font-normal text-white"
            >
              Metadata →
            </CardItem>
            <CardItem translateZ={20} as="button" className="px-4 py-2 rounded-xl bg-[#FFD700] text-white text-xs font-bold">
              Offer Now
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    ),
    id: "1",
  },
  // Añade más tarjetas aquí
];

export default function Chatbot() {
  const items = useLoaderData();
  const people = [
    {
      id: 1,
      name: "John Doe",
      designation: "Software Engineer",
      image:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
    },
    {
      id: 2,
      name: "Robert Johnson",
      designation: "Product Manager",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 3,
      name: "Jane Smith",
      designation: "Data Scientist",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    },
  ];
  return (
    <div className=" flex flex-col items-center justify-center  ">
   
        <div className="flex mt-0  flex-col md:flex-row items-center justify-center gap-4 p-4 w-full h-[90vh]">
          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="flex-shrink-0 p-6 w-full md:w-1/2 lg:w-2/5 h-full flex items-center justify-center"
          >
            <CardContainer className="inter-var h-full w-full">
              <CardBody className="bg-[#3b3b3b] relative group/card hover:shadow-2xl hover:shadow-blue-500/[0.3] dark:bg-black dark:border-gray-700 border-gray-600 w-auto h-full rounded-xl p-6 border flex flex-col items-center justify-center">
                  
                 <div className="flex flex-row items-center justify-left mb-2 w-full">
      <AnimatedTooltip items={people} />
      
    </div>
    
                <CardItem translateZ="100" className="w-full mt-4">
                  <img
                    src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    height="1000"
                    width="1000"
                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt="thumbnail"
                  />
                </CardItem>
                
    <CardItem translateZ="50" className="text-xl font-bold mt-4 mb-4 text-white">
                  Make things float in air
                </CardItem> 
                <div className="flex justify-between items-center  w-full">
                  
                  <CardItem
                    translateZ={20}
                    as={Link}
                    href="https://twitter.com/mannupaaji"
                    target="__blank"
                    className="px-4 py-2 rounded-xl text-xs font-normal text-white"
                  >
                    Metadata →
                  </CardItem>
                  <CardItem translateZ={20} as="button" className="px-4 py-2 rounded-xl bg-[#FFD700] text-[#1a1a1a] text-xs font-bold">
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
              ease: "easeInOut",
            }}
            className="relative flex flex-col gap-4 items-center justify-center px-4 text-center md:text-left w-full md:w-1/2 lg:w-2/5 h-full"
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
        className="text-2xl px-4 md:text-3xl lg:text-4xl font-bold text-white dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-left"
      >
        <Highlight className="text-white px-4 dark:text-white">
       {" The Coolest Marketplace. "}
        </Highlight>
      </motion.h1>
      <div className="font-extralight text-gray-300 md:text-4xl py-4">
              "Stays On" embodies the relentless pursuit of innovation and the thrill of the unknown.
            </div>
            <div className="text-white text-sm text-left">
              178 minted • 100 per wallet • 7d 23h left
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <button>
      <GlareCard className="flex flex-col items-center justify-center">
        {"Mint Now"}
      </GlareCard></button>
    </div>
          </motion.div>
        </div>

        <InfiniteMovingCards direction="right" speed="slow" />
        <InfiniteMovingCardsCollections direction="right" speed="slow" />
        <div className="grid grid-cols-1  lg:grid-cols-3 gap-4 max-w-7xl mx-auto p-10">
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
        className=""
      >
        <div className="max-w-xs">
          <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Gippity AI powers the entire universe
          </h2>
          <p className="mt-4 text-left  text-base/6 text-neutral-200">
            With over 100,000 mothly active bot users, Gippity AI is the most
            popular AI platform for developers.
          </p>
        </div>
        <img
          src="/linear.webp"
          width={500}
          height={500}
          alt="linear demo image"
          className="absolute -right-4 lg:-right-[40%] grayscale filter -bottom-10 object-contain rounded-2xl"
        />
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 min-h-[300px]">
        <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          No shirt, no shoes, no weapons.
        </h2>
        <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
          If someone yells “stop!”, goes limp, or taps out, the fight is over.
        </p>
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
        <div className="max-w-sm">
          <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Signup for blazing-fast cutting-edge state of the art Gippity AI
            wrapper today!
          </h2>
          <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
            With over 100,000 mothly active bot users, Gippity AI is the most
            popular AI platform for developers.
          </p>
        </div>
        <img
          src="/linear.webp"
          width={500}
          height={500}
          alt="linear demo image"
          className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl"
        />
      </WobbleCard>
    </div>
    </div>
  );
}
