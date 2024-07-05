import { json, LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import Table from '~/components/table-list'
import Footer from '~/components/footer'

const API_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6Ijg5ZTJhNmI0LThlNjktNDY0Yi04MzYwLWNkZGI3OTEwNTRkNyIsIm9yZ0lkIjoiMTcyNTc5IiwidXNlcklkIjoiMTcyMjUwIiwidHlwZUlkIjoiYWE5Njk3MTMtMDhmNC00YThhLTgwZWYtNTNmNmUzNmY2NzQ5IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2OTczMzE1MTEsImV4cCI6NDg1MzA5MTUxMX0.xlAawKhVtgE1sMhUGs-afbJh4vEd-Erz8AEjoXoxzrU'
const baseURL = 'https://deep-index.moralis.io/api/v2.2'

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)
  const limit = parseInt(url.searchParams.get('limit') || '20', 10)
  const offset = parseInt(url.searchParams.get('offset') || '0', 10)

  try {
    const res = await fetch(
      'https://omni.icarus.tools/ethereum/cush/topUsers',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          params: [
            {
              limit,
              offset,
              sort_by: 'tx_4h',
              sort_order: false,
              fee_tiers: [0],
            },
          ],
        }),
      },
    )

    const data = await res.json()
    return json({ traders: data.result })
  } catch (error) {
    console.error(error)
    return json({ traders: [] })
  }
}

export default function Index() {
  const { traders } = useLoaderData()

  console.log(traders)

  const data = traders
    .map(trader => ({
      account: trader.account || null,
      volume: trader.volume || '0',
      swaps: trader.swaps || null,
      positions: trader.positions || 0,
    }))
    .sort((a, b) => b.swaps - a.swaps)

  const columns = [
    {
      key: 'account',
      label: 'Account',
      link: item => `/dashboard/account-details/${item.account}`,
      format: null,
    },
    { key: 'volume', label: 'Volume', link: null, format: val => `$${val}` },
    { key: 'swaps', label: 'Swaps', link: null, format: null },
    { key: 'positions', label: 'Positions', link: null, format: null },
  ]

  return (
    <div className="relative flex min-h-screen flex-col gap-8 overflow-hidden bg-gradient-radial from-[#043033] via-[#000D0E] to-[#000D0E] p-8">
      <div>
        <Table
          data={data}
          title="Top wallets by swaps"
          description="Top 10 traders by swaps."
          columns={columns}
        />
      </div>
      <Footer />
    </div>
  )
}
