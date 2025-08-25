'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';

// Update the time formatting function here too
const formatTimeRemaining = (deadline: string) => {
  const now = new Date();
  const deadlineDate = new Date(deadline);
  const diffMs = deadlineDate.getTime() - now.getTime();
  
  if (diffMs <= 0) return "Ended";
  
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  if (diffDays > 0) {
    return `${diffDays}d ${diffHours}h left`;
  } else {
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${diffHours}h ${diffMinutes}m left`;
  }
};

// Mock data for development
const mockCampaign = {
  address: '0x1234567890123456789012345678901234567890',
  title: 'Decentralized Social Media Platform',
  description: 'Building a censorship-resistant social media platform on blockchain. This platform aims to give users full control over their data and content, while ensuring freedom of speech and resistance to censorship. The funds will be used for development, security audits, and initial hosting costs.',
  creator: '0xabcdef1234567890abcdef1234567890abcdef12',
  goal: '50',
  pledged: '32.5',
  backers: 24,
  deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
  finalized: false,
};

export default function CampaignDetail() {
  const params = useParams();
  const address = params.address as string;
  
  const [pledgeAmount, setPledgeAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Calculate derived values
  const progress = Math.min(
    Math.round((parseFloat(mockCampaign.pledged) / parseFloat(mockCampaign.goal)) * 100),
    100
  );
  const isExpired = new Date(mockCampaign.deadline) < new Date();
  const isSuccessful = parseFloat(mockCampaign.pledged) >= parseFloat(mockCampaign.goal);
  const timeLeft = formatDistanceToNow(new Date(mockCampaign.deadline), { addSuffix: true });
  
  // Mock user state
  const isConnected = true;
  const isCreator = false;
  const userHasPledged = true;
  
  const shortenAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };
  
  const handlePledge = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pledgeAmount || parseFloat(pledgeAmount) <= 0) return;
    
    setIsSubmitting(true);
    // Simulate transaction
    setTimeout(() => {
      setIsSubmitting(false);
      setPledgeAmount('');
      alert(`Successfully pledged ${pledgeAmount} SHM`);
    }, 2000);
  };
  
  const handleFinalize = async () => {
    setIsSubmitting(true);
    // Simulate transaction
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Campaign finalized successfully');
    }, 2000);
  };
  
  const handleRefund = async () => {
    setIsSubmitting(true);
    // Simulate transaction
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Refund processed successfully');
    }, 2000);
  };
  
  const handleUnpledge = async () => {
    setIsSubmitting(true);
    // Simulate transaction
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Unpledged successfully');
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
        <h1 className="text-3xl font-bold mb-2">{mockCampaign.title}</h1>
        
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <span>Created by </span>
          <button 
            className="ml-1 font-medium hover:text-blue-600"
            onClick={() => {
              navigator.clipboard.writeText(mockCampaign.creator);
              alert('Creator address copied to clipboard');
            }}
          >
            {shortenAddress(mockCampaign.creator)}
          </button>
          <span className="mx-2">•</span>
          <a 
            href={`https://explorer-unstable.shardeum.org/address/${address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            View on Explorer
          </a>
        </div>
        
        <p className="text-gray-700 mb-8 whitespace-pre-line">
          {mockCampaign.description}
        </p>
        
        <div className="border-t border-b py-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-gray-500">Pledged</div>
              <div className="text-2xl font-bold">{mockCampaign.pledged} SHM</div>
              <div className="text-sm text-gray-500">of {mockCampaign.goal} SHM goal</div>
            </div>
            
            <div>
              <div className="text-sm text-gray-500">Backers</div>
              <div className="text-2xl font-bold">{mockCampaign.backers}</div>
            </div>
            
            <div>
              <div className="text-sm text-gray-500">Time {isExpired ? 'Ended' : 'Remaining'}</div>
              <div className="text-2xl font-bold">
                {isExpired ? 'Ended' : timeLeft}
              </div>
              <div className="text-sm text-gray-500">
                {new Date(mockCampaign.deadline).toLocaleDateString()}
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${
                  isSuccessful ? 'bg-green-500' : 'bg-blue-500'
                }`}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          
          <div className="mt-2 text-sm">
            {isExpired ? (
              <span className={isSuccessful ? "text-green-600" : "text-red-600"}>
                {isSuccessful ? "Campaign was successful!" : "Campaign did not reach its goal."}
              </span>
            ) : (
              <span className="text-gray-600">
                Campaign ends {timeLeft}
              </span>
            )}
          </div>
        </div>
        
        {isConnected && (
          <div className="space-y-6">
            {!isExpired && (
              <form onSubmit={handlePledge} className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Pledge to this campaign</h3>
                <div className="flex gap-2">
                  <div className="flex-grow">
                    <div className="relative">
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={pledgeAmount}
                        onChange={(e) => setPledgeAmount(e.target.value)}
                        placeholder="Amount"
                        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        disabled={isSubmitting}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <span className="text-gray-500">SHM</span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                    disabled={!pledgeAmount || parseFloat(pledgeAmount) <= 0 || isSubmitting}
                  >
                    {isSubmitting ? 'Processing...' : 'Pledge'}
                  </button>
                </div>
              </form>
            )}
            
            {userHasPledged && !isExpired && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Manage your pledge</h3>
                <button
                  onClick={handleUnpledge}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Unpledge'}
                </button>
              </div>
            )}
            
            {isExpired && isSuccessful && isCreator && !mockCampaign.finalized && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Finalize Campaign</h3>
                <p className="text-sm text-gray-600 mb-4">
                  As the creator, you can now finalize this campaign to withdraw the funds.
                </p>
                <button
                  onClick={handleFinalize}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Finalize Campaign'}
                </button>
              </div>
            )}
            
            {isExpired && !isSuccessful && userHasPledged && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Get Refund</h3>
                <p className="text-sm text-gray-600 mb-4">
                  This campaign did not reach its goal. You can claim a refund for your pledge.
                </p>
                <button
                  onClick={handleRefund}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Claim Refund'}
                </button>
              </div>
            )}
          </div>
        )}
        
        {!isConnected && (
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <p className="text-lg mb-4">Connect your wallet to interact with this campaign</p>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Connect Wallet
            </button>
          </div>
        )}
      </div>
    </div>
  );
}