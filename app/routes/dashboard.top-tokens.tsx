import { useLoaderData } from '@remix-run/react'
import { LoaderFunction, json } from '@remix-run/server-runtime'

export const loader: LoaderFunction = async () => {
  try {
    const res = await fetch('https://omni.icarus.tools/polygon/cush/topPools', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fee_tiers: [1000],
        result_size: 30,
        sort_by: 'tvl_usd',
        sort_order: true,
      }),
    })
    const data = await res.json()
    console.log(data.result.pools.length)
    return json(data.result.pools)
  } catch (error) {
    console.log(error)
  }
}
export default function TopCoins() {
  const info: any = useLoaderData()
  console.log(info.length)
  return (
      <div className='flex flex-col'>
        <div className='overflow-x-auto'>
          <div className=' min-w-full inline-block align-middle'>
            <div className='bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-neutral-800 dark:border-neutral-700'>
              <div className='px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700'>
                <div>
                  <h2 className='text-xl font-semibold text-gray-800 dark:text-neutral-200'>
                    Top V3 Pools by chosen metrics and sort fields
                  </h2>
                  <p className='text-sm text-gray-600 dark:text-neutral-400'>
                    Descriptive summarys and metrics for each pool that matches
                    the given search criteria and sorting options.
                  </p>
                </div>
              </div>

              <table className='divide-y divide-gray-200 dark:divide-neutral-700'>
                <thead className='bg-gray-50 dark:bg-neutral-800'>
                  <tr>
                    <th
                      scope='col'
                      className='ps-6 lg:ps-3 pe-6 py-3 text-center'
                    >
                      <div className='flex items-center gap-x-2'>
                        <span className='text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200'>
                          Address
                        </span>
                      </div>
                    </th>

                    <th
                      scope='col'
                      className='px-6 py-3 text-start'
                    >
                      <div className='flex items-center gap-x-2'>
                        <span className='text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200'>
                          Name
                        </span>
                      </div>
                    </th>

                    <th
                      scope='col'
                      className='px-6 py-3 text-start'
                    >
                      <div className='flex items-center gap-x-2'>
                        <span className='text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200'>
                          Symbol
                        </span>
                      </div>
                    </th>

                    <th
                      scope='col'
                      className='px-6 py-3 text-start'
                    >
                      <div className='flex items-center gap-x-2'>
                        <span className='text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200'>
                          Price
                        </span>
                      </div>
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-start'
                    >
                      <div className='flex items-center gap-x-2'>
                        <span className='text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200'>
                          Volume Last 7 Days
                        </span>
                      </div>
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-start'
                    >
                      <div className='flex items-center gap-x-2'>
                        <span className='text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200'>
                          TVL
                        </span>
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody className='divide-y divide-gray-200 dark:divide-neutral-700'>
                  {info.map((coin: any, index: number) => (
                    <tr
                      onClick={async () => {
                        // Return the appropriate data based on your usage
                      }}
                      key={index}
                    >
                      <td className='size-px whitespace-nowrap'>
                        <div className='ps-6 lg:ps-3 pe-6 py-3'>
                          <div className='flex items-center gap-x-3'>
                            <div className='grow pl-4'>
                              <span className='block text-sm font-semibold text-gray-800 dark:text-neutral-200'>
                                {coin.address}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className='size-px whitespace-nowrap'>
                        <div className='ps-6 lg:ps-3 pe-6 py-3'>
                          <div className='flex items-center gap-x-3'>
                            <div className='grow pl-4'>
                              <span className='block text-sm font-semibold text-gray-800 dark:text-neutral-200'>
                                {coin.t1_name}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className='h-px w-72 whitespace-nowrap'>
                        <div className='px-6 py-3'>
                          <span className='block text-sm font-semibold text-gray-800 dark:text-neutral-200'>
                            {coin.t0_symbol}
                          </span>
                        </div>
                      </td>
                      <td className='h-px w-72 whitespace-nowrap'>
                        <div className='px-6 py-3'>
                          <span className='block text-sm font-semibold text-gray-800 dark:text-neutral-200'>
                            {coin.last_price}
                          </span>
                        </div>
                      </td>
                      <td className='h-px w-72 whitespace-nowrap'>
                        <div className='px-6 py-3'>
                          <span className='block text-sm font-semibold text-gray-800 dark:text-neutral-200'>
                            {coin.total_volume_7d_usd + ' USD'}
                          </span>
                        </div>
                      </td>
                      <td className='h-px w-72 whitespace-nowrap'>
                        <div className='px-6 py-3'>
                          <span className='block text-sm font-semibold text-gray-800 dark:text-neutral-200'>
                            {coin.t1_tvl_usd + ' USD'}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className='px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-neutral-700'>
                <div>
                  <p className='text-sm text-gray-600 dark:text-neutral-400'>
                    <span className='font-semibold text-gray-800 dark:text-neutral-200'>
                      {info.length}
                    </span>{' '}
                    results
                  </p>
                </div>

                <div>
                  <div className='inline-flex gap-x-2'>
                    <button
                      type='button'
                      className='py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800'
                    >
                      <svg
                        className='flex-shrink-0 size-4'
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        <path d='m15 18-6-6 6-6' />
                      </svg>
                      Prev
                    </button>

                    <button
                      type='button'
                      className='py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800'
                    >
                      Next
                      <svg
                        className='flex-shrink-0 size-4'
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        <path d='m9 18 6-6-6-6' />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
