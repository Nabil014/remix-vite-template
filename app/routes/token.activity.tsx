import ActivityCard from '~/components/token-activity'
import TokensTable from '~/components/token-table'
import VolumeChart from '~/components/volume-chart'
import WalletInteractions from '~/components/wallet-interactions'
import { NFTs } from '~/components/nft'
import { WalletTotals } from '~/components/wallet-totals'
import { Badges } from '~/components/badges'
import Footer from '~/components/footer'

export default function Index() {
  return (
    <div className="flex h-auto min-h-screen flex-col items-center bg-gradient-radial">
      <div className="w-full max-w-7xl space-y-6 p-10">
        <ActivityCard />
        <div className="flex w-full space-x-6">
          <VolumeChart />
          <TokensTable />
        </div>
        <div className="mt-24 flex w-full space-x-6">
          <WalletInteractions />
          <div className="w-1/2 space-y-6 mb-16">
            <NFTs />
            <WalletTotals />
            <Badges />
          </div>
        </div>
      <Footer/>
      </div>
    </div>
  )
}
