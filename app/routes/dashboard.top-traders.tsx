import { useFetcher, useLoaderData } from '@remix-run/react'
import { json, type LoaderFunction } from '@remix-run/server-runtime'
import { useEffect, useState } from 'react'
import { ethers } from 'ethers';
import { Tabs } from '~/components/tabs';
import Moralis from 'moralis';
import { AnimatedTooltip } from "~/components/tooltip";

export const loader: LoaderFunction = async ({ request }: any) => {

  try {

    const res = await fetch('https://omni.icarus.tools/polygon/cush/topUsers',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( {
        params:  [
      {
        limit: 10, // El límite se establece aquí en 10
        offset: 0, // El primer resultado desde el cual quieres comenzar (puedes cambiar este valor según la paginación)
        sort_order: false // true para orden ascendente, false para descendente
      }
    ]
      })
    })

    const data:any = await  res.json()

    return json(data.result)
  } catch (error) {
    console.log(error)
  }
}

export default function TopProfitableTraders() {
  const [allUserSwaps, setAllUserSwaps] = useState([])
  const [loading, setLoading] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)

  const [holderWallet, setHolderWallet] = useState("")
  const fetcher = useFetcher();
/* 
   async function handleLoadSwaps(account) {
     console.log(account)
     setLoading(true)
     setAllUserSwaps([]);
      setHolderWallet(account)
      let data= await fetcher.load(`/api/getUserSwaps?account=${account}`);
      console.log(data)

  }
 */
  // Observa cambios en fetcher.data para actualizar el estado de swaps
  /* useEffect(() => {
    if (fetcher.data && !fetcher.data.error) {
      setLoading(false)
      console.log("fetcher.data "+JSON.stringify(fetcher.data))

      // Asumiendo que fetcher.data es un array de swaps
      setAllUserSwaps(fetcher.data);
      setShowModal(true); // Mostrar modal cuando los datos estén listos
    }
  }, [fetcher.data]) */;

  const tabs = [
    {
      title: "TOP TRADERS DEX",
      value: "tradersdex",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-[#1a1a1a] to-[#00f0ff]">
          <p className='mb-4 text-bold'>TOP TRADERS DEX</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "TOP TRADERS EXCHANGES",
      value: "holdersexchange",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-[#1a1a1a] to-[#00f0ff]">
          <p className='mb-4 text-bold'>TOP TRADERS EXCHANGES</p>
          <DummyContent2 />
        </div>
      ),
    },
  ];

  return (
    <div className=' mt-0 flex-row flex justify-start w-full'>
  <div className="h-[20rem] md:h-[70vh] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-[450px]  items-start justify-start ">
      <Tabs tabs={tabs} />
      
    </div>
           
    </div>
  )
}

const DummyContent = () => {
  const info: any = useLoaderData()
  console.log("info "+JSON.stringify(info))
  return (  <table className='h-full w-full divide-y divide-gray-200 dark:divide-neutral-700'>
    <thead className='bg-transparent w-full dark:bg-neutral-800'>
      <tr>
        <th
          scope='col'
          className='ps-6 lg:ps-3 pe-6 py-3 text-center'
        >
          <div className='flex items-center gap-x-2'>
            <span className='text-xs font-semibold uppercase tracking-wide text-white dark:text-neutral-200'>
              Address
            </span>
          </div>
        </th>

       

        <th
          scope='col'
          className='px-8 py-3 text-start'
        >
          <div className='flex items-center gap-x-2'>
            <span className='text-xs font-semibold uppercase tracking-wide text-white dark:text-neutral-200'>
              Volume
            </span>
          </div>
        </th>
        <th
          scope='col'
          className='px-8 py-3 text-start'
        >
          <div className='flex items-center gap-x-2'>
            <span className='text-xs pl-2 font-semibold uppercase tracking-wide text-white dark:text-neutral-200'>
              Swaps
            </span>
          </div>
        </th>

       
      </tr>
      
    </thead>

    <tbody  className='divide-y divide-gray-200 dark:divide-neutral-700'>
      {info.map((user: any, index: number) => (
        <tr
        onClick={async ()=>{
     
           
        }}
          key={index}
        >
          <td className='size-px '>
            <div className='ps-6 lg:ps-3 pe-6 py-3'>
              <div className='flex items-center gap-x-3'>
                <div className='grow pl-1'>
                  <span className='block text-sm font-semibold text-white dark:text-neutral-200'>
                    {`${user.account.substring(0, 4)}...${user.account.substring(user.account.length - 4)}`}
                  </span>
                </div>
              </div>
            </div>
          </td>

          <td className='h-px w-30 '>
            <div className='px-1 pl-8 py-0'>
              <span className='block text-sm font-semibold text-white dark:text-neutral-200'>
                {user.volume.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })+"$"}
              </span>
            </div>
          </td>
          <td className='h-px w-30 '>
            <div className='px-6 pl-10 py-0'>
              <span className=' block text-sm font-semibold text-white dark:text-neutral-200'>
                {user.swaps}
              </span>
            </div>
          </td>
          <td className='h-px w-30 '>
            <div className='px-2  py-0'>
            <div className="flex flex-row items-center justify-center mb-10 w-full">
    </div>
    

            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  );
};

const DummyContent2 = () => {
  const info: any = useLoaderData()
  console.log("info "+JSON.stringify(info))
  return (  <table className='h-full w-full divide-y divide-gray-200 dark:divide-neutral-700'>
    <thead className='bg-transparent w-full dark:bg-neutral-800'>
      <tr>
        <th
          scope='col'
          className='ps-6 lg:ps-3 pe-6 py-3 text-center'
        >
          <div className='flex items-center gap-x-2'>
            <span className='text-xs font-semibold uppercase tracking-wide text-white dark:text-neutral-200'>
              Address
            </span>
          </div>
        </th>

       

        <th
          scope='col'
          className='px-8 py-3 text-start'
        >
          <div className='flex items-center gap-x-2'>
            <span className='text-xs font-semibold uppercase tracking-wide text-white dark:text-neutral-200'>
              Volume
            </span>
          </div>
        </th>
        <th
          scope='col'
          className='px-8 py-3 text-start'
        >
          <div className='flex items-center gap-x-2'>
            <span className='text-xs pl-2 font-semibold uppercase tracking-wide text-white dark:text-neutral-200'>
              Swaps
            </span>
          </div>
        </th>

       
      </tr>
      
    </thead>

    <tbody  className='divide-y divide-gray-200 dark:divide-neutral-700'>
      {info.map((user: any, index: number) => (
        <tr
        onClick={async ()=>{
     
           
        }}
          key={index}
        >
          <td className='size-px '>
            <div className='ps-6 lg:ps-3 pe-6 py-3'>
              <div className='flex items-center gap-x-3'>
                <div className='grow pl-1'>
                  <span className='block text-sm font-semibold text-white dark:text-neutral-200'>
                    {`${user.account.substring(0, 4)}...${user.account.substring(user.account.length - 4)}`}
                  </span>
                </div>
              </div>
            </div>
          </td>

          <td className='h-px w-30 '>
            <div className='px-1 pl-8 py-0'>
              <span className='block text-sm font-semibold text-white dark:text-neutral-200'>
                {user.volume.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })+"$"}
              </span>
            </div>
          </td>
          <td className='h-px w-30 '>
            <div className='px-6 pl-10 py-0'>
              <span className=' block text-sm font-semibold text-white dark:text-neutral-200'>
                {user.swaps}
              </span>
            </div>
          </td>
          <td className='h-px w-30 '>
            <div className='px-2  py-0'>
            <div className="flex flex-row items-center justify-center mb-10 w-full">
    </div>
    

            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  );
};