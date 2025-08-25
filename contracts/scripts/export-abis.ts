import * as fs from 'fs';
import * as path from 'path';

// Paths
const artifactsDir = path.join(__dirname, '../artifacts/contracts');
const abiOutputDir = path.join(__dirname, '../../frontend/src/abi');

// Ensure the output directory exists
if (!fs.existsSync(abiOutputDir)) {
  fs.mkdirSync(abiOutputDir, { recursive: true });
}

// Contracts to export ABIs for
const contracts = [
  'CampaignFactory.sol/CampaignFactory',
  'Campaign.sol/Campaign'
];

// Export ABIs
contracts.forEach(contractPath => {
  const contractName = contractPath.split('/').pop();
  if (!contractName) return;
  
  const artifactPath = path.join(artifactsDir, `${contractPath}.json`);
  
  try {
    const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));
    const abi = artifact.abi;
    
    fs.writeFileSync(
      path.join(abiOutputDir, `${contractName}.json`),
      JSON.stringify(abi, null, 2)
    );
    
    console.log(`Exported ABI for ${contractName}`);
  } catch (error) {
    console.error(`Error exporting ABI for ${contractName}:`, error);
  }
});

console.log('ABI export complete!');