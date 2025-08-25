import { ethers } from "hardhat";

async function main() {
  console.log("Deploying CampaignFactory...");

  const CampaignFactory = await ethers.getContractFactory("CampaignFactory");
  const campaignFactory = await CampaignFactory.deploy();

  await campaignFactory.waitForDeployment();
  
  const address = await campaignFactory.getAddress();
  console.log(`CampaignFactory deployed to: ${address}`);
  
  // Save this address in your frontend .env file as NEXT_PUBLIC_FACTORY_ADDRESS
  console.log("\nDon't forget to:");
  console.log("1. Run 'node scripts/export-abis.ts' to copy ABIs to frontend");
  console.log(`2. Set NEXT_PUBLIC_FACTORY_ADDRESS=${address} in frontend/.env`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });