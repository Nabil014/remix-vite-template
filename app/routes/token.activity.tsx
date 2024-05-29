import ActivityCard from '~/components/token-activity'
import TokensTable from '~/components/token-table'
import VolumeChart from '~/components/volume-chart'

export default function Index() {
  return (
    <div className="flex h-auto flex-col items-center bg-gradient-radial">
    <div className="w-full max-w-7xl space-y-6 p-10">
      <ActivityCard />
      <div className="flex">
        <VolumeChart  />
        <TokensTable  />
      </div>
    </div>
  </div>
  )
}
