import ActivityCard from '~/components/token-activity';
import TokensTable from '~/components/token-table';
import VolumeChart from '~/components/volume-chart';
import WalletInteractions from '~/components/wallet-interactions';

export default function Index() {
  return (
    <div className="flex h-auto flex-col items-center bg-gradient-radial">
      <div className="w-full max-w-7xl p-10 space-y-6">
        <ActivityCard />
        <div className="flex w-full space-x-6">
          <VolumeChart />
          <TokensTable />
        </div>
        <div className="flex w-full h-auto mt-24">
          <WalletInteractions />
        </div>
      </div>
    </div>
  );
}
