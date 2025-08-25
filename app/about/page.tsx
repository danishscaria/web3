'use client';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">About PayFi Kickstarter</h1>
      
      <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">What is PayFi Kickstarter?</h2>
        <p className="text-gray-700 mb-4">
          PayFi Kickstarter is a decentralized crowdfunding platform built on the Shardeum blockchain. 
          It allows creators to raise funds for their projects directly from supporters without 
          intermediaries, using smart contracts to ensure transparency and security.
        </p>
        <p className="text-gray-700 mb-4">
          Unlike traditional crowdfunding platforms, PayFi operates entirely on-chain, meaning all 
          transactions and campaign data are stored on the Shardeum blockchain, making them 
          transparent, immutable, and accessible to anyone.
        </p>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">How It Works</h2>
        <ol className="list-decimal list-inside space-y-4 text-gray-700">
          <li>
            <span className="font-medium">Create a Campaign</span>: Anyone can create a fundraising 
            campaign by setting a title, description, funding goal, and deadline.
          </li>
          <li>
            <span className="font-medium">Pledge Funds</span>: Supporters can pledge SHM (Shardeum's 
            native token) to campaigns they want to support.
          </li>
          <li>
            <span className="font-medium">Campaign Completion</span>: When the deadline is reached, 
            one of two things happens:
            <ul className="list-disc list-inside ml-6 mt-2">
              <li>
                If the campaign reached its goal, the creator can finalize the campaign and withdraw 
                the funds.
              </li>
              <li>
                If the campaign didn't reach its goal, backers can claim a refund of their pledged 
                amount.
              </li>
            </ul>
          </li>
        </ol>
      </div>
      
      <div id="faq" className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Frequently Asked Questions</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">What is Shardeum Unstablenet?</h3>
            <p className="text-gray-700">
              Shardeum Unstablenet is a testnet version of the Shardeum blockchain. It's used for 
              testing applications before they're deployed to the main Shardeum network. As a testnet, 
              the SHM tokens on Unstablenet have no real monetary value.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">How do I get SHM for testing?</h3>
            <p className="text-gray-700">
              You can get test SHM from the Shardeum Unstablenet faucet. Visit the 
              <a 
                href="https://faucet-unstable.shardeum.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline mx-1"
              >
                Shardeum Faucet
              </a>
              and follow the instructions to receive test tokens.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">What wallet should I use?</h3>
            <p className="text-gray-700">
              You can use MetaMask or any wallet that supports connecting to custom networks. You'll 
              need to add the Shardeum Unstablenet to your wallet with the following details:
            </p>
            <div className="mt-2 bg-gray-50 p-4 rounded-md">
              <p><strong>Network Name:</strong> Shardeum Unstablenet</p>
              <p><strong>RPC URL:</strong> https://api-unstable.shardeum.org</p>
              <p><strong>Chain ID:</strong> 8080</p>
              <p><strong>Currency Symbol:</strong> SHM</p>
              <p><strong>Block Explorer:</strong> https://explorer-unstable.shardeum.org</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Is this platform secure?</h3>
            <p className="text-gray-700">
              PayFi Kickstarter uses smart contracts that have been developed with security best 
              practices. However, as this is a testnet application, it's primarily for demonstration 
              purposes. We recommend not using real assets or sensitive information.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">I'm having technical issues. What should I do?</h3>
            <p className="text-gray-700">
              If you're experiencing technical issues, try the following:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 text-gray-700">
              <li>Make sure your wallet is connected to Shardeum Unstablenet</li>
              <li>Check that you have enough SHM for gas fees</li>
              <li>Try refreshing the page or reconnecting your wallet</li>
              <li>Clear your browser cache and try again</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}