import { SkeletonActivityTransactions } from "./skeleton/skeletonActivity";

interface TransactionsProps {
  transactions: []
  loading: boolean
}
export const WalletTotals = ({transactions,loading}:TransactionsProps) => {
  return (
    <div className="bg-[#022527] p-6 rounded-2xl text-white border border-[#04E6E6] shadow-[inset_0px_4px_10px_0px_rgba(0,0,0,0.25)] w-[375px]">
      <div className="mb-4">
        <p className="text-[14px] font-semibold leading-[16.94px] text-[#F5F5F5] mb-2">Wallet Totals</p>
        <p className="text-[12px] leading-[14.52px] text-[#F5F5F5] opacity-50">All-time totals for this wallet</p>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="flex flex-col gap-y-1">
          <p className="text-[12px] font-bold leading-[14.52px] text-[#F5F5F5] opacity-50">Transactions</p>
          <p className="text-[14px] font-bold leading-[16.94px]  text-[#F5F5F5]">
            {loading ? <SkeletonActivityTransactions /> : transactions?.length}
          </p>
        </div>
        <div className="flex flex-col gap-y-1">
          <p className="text-[12px] font-bold leading-[14.52px] text-[#F5F5F5] opacity-50">Token Transfers</p>
          <p className="text-[14px] font-bold leading-[16.94px]  text-[#F5F5F5]">62024</p>
        </div>
        <div className="flex flex-col gap-y-1">
          <p className="text-[12px] font-bold leading-[14.52px] text-[#F5F5F5] opacity-50">NFT Transfer</p>
          <p className="text-[14px] font-bold leading-[16.94px]  text-[#F5F5F5]">70768</p>
        </div>
      </div>
    </div>
  );
};
