'use client';

import { useState } from 'react';
import CampaignCard from '../../components/CampaignCard';

// Mock data for development
const mockCreatedCampaigns = [
  {
    id: '1',
    address: '0x1234567890123456789012345678901234567890',
    title: 'Decentralized Social Media Platform',
    description: 'Building a censorship-resistant social media platform on blockchain',
    creator: '0xabcdef1234567890abcdef1234567890abcdef12',
    goal: '50',
    pledged: '32.5',
    deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    finalized: false,
  },
];

const mockBackedCampaigns = [
  {
    id: '2',
    address: '0x0987654321098765432109876543210987654321',
    title: 'NFT Marketplace for Independent Artists',
    description: 'Creating a fair marketplace for artists to sell their digital creations',
    creator: '0xfedcba0987654321fedcba0987654321fedcba09',
    goal: '100',
    pledged: '87.2',
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    finalized: false,
  },
  {
    id: '3',
    address: '0xaabbccddeeffaabbccddeeffaabbccddeeffaabb',
    title: 'DeFi Education Platform',
    description: 'Educational resources to help people understand decentralized finance',
    creator: '0x1122334455667788112233445566778811223344',
    goal: '75',
    pledged: '25.8',
    deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
    finalized: false,
  },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'created' | 'backed'>('created');
  const [showEnded, setShowEnded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock connected state
  const isConnected = true;
  const userAddress = '0xabcdef1234567890abcdef1234567890abcdef12';
  
  const shortenAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (!isConnected) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-900">Connect your wallet to view your profile</h3>
        <div className="mt-6">
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-gray-600 mt-2">
          Address: {shortenAddress(userAddress)}
        </p>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('created')}
              className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                activeTab === 'created'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Created by me ({mockCreatedCampaigns.length})
            </button>
            <button
              onClick={() => setActiveTab('backed')}
              className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                activeTab === 'backed'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Backed by me ({mockBackedCampaigns.length})
            </button>
          </nav>
        </div>
        
        <div className="p-4">
          <div className="flex justify-end mb-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={showEnded}
                onChange={() => setShowEnded(!showEnded)}
                className="mr-2 h-4 w-4"
              />
              <span className="text-sm text-gray-600">Show ended campaigns</span>
            </label>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="border rounded-lg p-6 bg-white shadow-sm animate-pulse">
                  <div className="h-7 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
                  <div className="h-2 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="flex justify-between mt-4">
                    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {activeTab === 'created' && (
                <>
                  {mockCreatedCampaigns.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {mockCreatedCampaigns.map((campaign) => (
                        <CampaignCard key={campaign.id} campaign={campaign} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">You haven't created any campaigns yet.</p>
                    </div>
                  )}
                </>
              )}
              
              {activeTab === 'backed' && (
                <>
                  {mockBackedCampaigns.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {mockBackedCampaigns.map((campaign) => (
                        <CampaignCard key={campaign.id} campaign={campaign} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">You haven't backed any campaigns yet.</p>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}