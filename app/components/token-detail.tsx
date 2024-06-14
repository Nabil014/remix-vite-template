const TokenDetails = (tokenData:any) => {

  console.log(tokenData)
  function calculateYearsFromCreatedAt(createdAt: string): any {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();
  
    const yearsDifference = currentDate.getFullYear() - createdDate.getFullYear();
  
    // Restar un año si el aniversario aún no ha pasado este año
    const hasBirthdayPassed =
      currentDate.getMonth() > createdDate.getMonth() ||
      (currentDate.getMonth() === createdDate.getMonth() && currentDate.getDate() >= createdDate.getDate());
  
    return hasBirthdayPassed}
    return (
      <div className="w-[340px] h-full p-4 rounded-[30px] bg-transparent text-[#F5F5F5] space-y-4">
        <div>
          <div className="flex justify-between py-2 border-b border-[#04E6E6]">
            <span className="text-[10px] font-normal leading-[12.1px] w-[160px] text-[#F5F5F580]">Total Supply</span>
            <span className="text-[10px] font-bold leading-[12.1px] w-[68px] text-right">{tokenData?.tokenData?.tokenMetadata.total_supply_formatted}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-[#04E6E6]">
            <span className="text-[10px] font-normal leading-[12.1px] w-[160px] text-[#F5F5F580]">Fully Diluted Valuation</span>
            <span className="text-[10px] font-bold leading-[12.1px] text-right">{"$"+tokenData?.tokenData?.tokenMetadata?.fully_diluted_valuation}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-[#04E6E6]">
            <span className="text-[10px] font-normal leading-[12.1px] w-[160px] text-[#F5F5F580]">Date Created</span>
            <span className="text-[10px] font-bold leading-[12.1px] text-right">{tokenData?.tokenData?.tokenMetadata?.created_at}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-[#04E6E6]">
            <span className="text-[10px] font-normal leading-[12.1px] w-[160px] text-[#F5F5F580]">Token Address</span>
            <span className="text-[10px] font-bold leading-[12.1px] text-right">{tokenData?.tokenData?.tokenMetadata?.address}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-[#04E6E6]">
            <span className="text-[10px] font-normal leading-[12.1px] w-[160px] text-[#F5F5F580]">Name</span>
            <span className="text-[10px] font-bold leading-[12.1px] text-right">{tokenData?.tokenData?.tokenMetadata?.name}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-[#04E6E6]">
            <span className="text-[10px] font-normal leading-[12.1px] w-[160px] text-[#F5F5F580]">Symbol</span>
            <span className="text-[10px] font-bold leading-[12.1px] text-right">{tokenData?.tokenData?.tokenMetadata?.symbol}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-[10px] font-normal leading-[12.1px] w-[160px] text-[#F5F5F580]">Decimals</span>
            <span className="text-[10px] font-bold leading-[12.1px] text-right">{tokenData?.tokenData?.tokenMetadata?.decimals}</span>
          </div>
        </div>
      </div>
    );
  };
  
  export default TokenDetails;
  