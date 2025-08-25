'use client';

import { useState } from 'react';
import Link from 'next/link';
import CampaignCard from '../components/CampaignCard';

// Mock data for initial development
const mockCampaigns = [
  {
    id: '1',
    address: '0x1234567890123456789012345678901234567890',
    title: 'Decentralized Social Media Platform',
    description: 'Building a censorship-resistant social media platform on blockchain',
    creator: '0xabcdef1234567890abcdef1234567890abcdef12',
    goal: '50',
    pledged: '32.5',
    deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days from now
    finalized: false,
  },
  {
    id: '2',
    address: '0x0987654321098765432109876543210987654321',
    title: 'NFT Marketplace for Independent Artists',
    description: 'Creating a fair marketplace for artists to sell their digital creations',
    creator: '0xfedcba0987654321fedcba0987654321fedcba09',
    goal: '100',
    pledged: '87.2',
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
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
    deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(), // 21 days from now
    finalized: false,
  },
];

export default function Home() {
  const [showEnded, setShowEnded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Crowdfunding Campaigns</h1>
        <div className="flex items-center space-x-2">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={showEnded}
              onChange={() => setShowEnded(!showEnded)}
              className="mr-2 h-4 w-4"
            />
            <span>Show ended campaigns</span>
          </label>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
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
      ) : mockCampaigns.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900">No campaigns found</h3>
          <p className="mt-1 text-gray-500">Be the first to create a campaign!</p>
          <div className="mt-6">
            <Link
              href="/create"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              Create Campaign
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}