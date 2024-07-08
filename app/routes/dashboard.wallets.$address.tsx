import { useEffect, useState } from 'react'
import { useLoaderData } from '@remix-run/react'
import { json, type LoaderFunction } from '@remix-run/server-runtime'
import { Badges } from '~/components/badges'
import Footer from '~/components/footer'
import { NFTs } from '~/components/nft'
import ActivityCard from '~/components/token-activity'
import TokensTable from '~/components/token-table'
import VolumeChart from '~/components/volume-chart'
import WalletInteractions from '~/components/wallet-interactions'
import { WalletTotals } from '~/components/wallet-totals'

export const loader: LoaderFunction = async ({ params }) => {
  const { address } = params
  return json({ address })
}

type AddressProps = {
  address: string
}

export default function Index() {
  const [walletData, setWalletData] = useState<any>(null)
  const [weeklyActivity, setWeeklyActivity] = useState<{
    [key: string]: number
  }>({})
  const [walletInteractionsData, setWalletInteractionsData] = useState<{
    [key: string]: number
  }>({})
  const [walletUniqueSent, setWalletUniqueSent] = useState<[]>([])
  const [walletUniqueReceived, setWalletUniqueReceived] = useState<[]>([])
  const [tokensWallet, setTokensWallet] = useState<[]>([])
  const [transactions, setTransactions] = useState<[]>([])
  const [loading, setLoading] = useState(true)
  const { address } = useLoaderData<AddressProps>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/walletOverview?address=${address}`)
        const data = await response.json()
        setWalletData(data)
        const responseTokensWallet = await fetch(`/api/wallet/tokens?wallet=${address}`)
        const dataTokensWallet = await responseTokensWallet.json()
        setTokensWallet(dataTokensWallet?.verified_tokens)

        const activityResponse = await fetch(`/api/wallet/activity/${address}`)
        const activityData = await activityResponse.json()
        setWeeklyActivity(activityData.weeklyActivity)
        setWalletInteractionsData(activityData.interactionCounts)
        setWalletUniqueSent(activityData.uniqueAddressesSentTo)
        setWalletUniqueReceived(activityData.uniqueAddressesReceivedFrom)
        setTransactions(activityData.transactions)
      } catch (error) {
        setWalletData([])
        setTokensWallet([])
        setWeeklyActivity({})
        setWalletInteractionsData({})
        setWalletUniqueSent([])
        setWalletUniqueReceived([])
        setTransactions([])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [address])

  return (
    <div className="flex h-auto min-h-screen flex-col items-center bg-gradient-radial">
      <div className="flex w-full max-w-7xl flex-col gap-y-6  p-10">
        <ActivityCard
          walletData={walletData}
          address={address}
          loading={loading}
        />
        <div className="flex flex-col items-center lg:justify-between lg:flex-row">
          <VolumeChart weeklyActivity={weeklyActivity} />
          <TokensTable walletTokens={tokensWallet} loading={loading} />
        </div>
        <div className=" flex w-full flex-wrap items-center justify-around gap-x-3 lg:items-start">
          <WalletInteractions
            walletInteractionsData={walletInteractionsData}
            walletUniqueSent={walletUniqueSent}
            walletUniqueReceived={walletUniqueReceived}
            loading={loading}
          />
          <div className="mb-12 flex flex-col gap-y-6 ">
            <NFTs />
            <WalletTotals transactions={transactions} loading={loading} />
            <Badges />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}
