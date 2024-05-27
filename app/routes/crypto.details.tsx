import TokenInfo from '~/components/token-info';
import TokenDetails from '~/components/token-detail';
import LineChart from '~/components/line-chart';
import Footer from '~/components/footer';

export default function CryptoDetails() {
  return (
    <div className="bg-gradient-radial h-auto">
      <div className="flex flex-col items-center p-4 lg:items-start">
        <TokenInfo />
        <div className="mt-8 flex w-full flex-col lg:flex-row lg:items-start">
          <div className="w-full lg:w-1/3">
            <h3 className="text-[16px] font-semibold leading-[19.36px] text-[#F5F5F5] mb-4">Token Details</h3>
            <TokenDetails />
          </div>
          <div className="mt-8 w-full lg:mt-0 lg:w-2/3 lg:pl-8">
            <h3 className="text-[16px] font-semibold leading-[19.36px] text-[#F5F5F5] mb-4">Token Price Movement</h3>
            <LineChart />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
