'use client';

import Link from 'next/link';

interface Campaign {
  id: string;
  address: string;
  title: string;
  description: string;
  creator: string;
  goal: string;
  pledged: string;
  deadline: string;
  finalized: boolean;
}

interface CampaignCardProps {
  campaign: Campaign;
}

export default function CampaignCard({ campaign }: CampaignCardProps) {
  const progress = Math.min(
    Math.round((parseFloat(campaign.pledged) / parseFloat(campaign.goal)) * 100),
    100
  );
  
  const isExpired = new Date(campaign.deadline) < new Date();
  const isSuccessful = parseFloat(campaign.pledged) >= parseFloat(campaign.goal);
  
  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Simple function to format time remaining instead of using date-fns
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

  return (
    <Link href={`/campaign/${campaign.address}`}>
      <div className="border rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full flex flex-col">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">{campaign.title}</h2>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
          {campaign.description}
        </p>
        
        <div className="mt-2 mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                isSuccessful ? 'bg-green-500' : 'bg-blue-500'
              }`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>{parseFloat(campaign.pledged)} SHM raised</span>
          <span>Goal: {campaign.goal} SHM</span>
        </div>
        
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
          <div className="text-xs text-gray-500">
            By {shortenAddress(campaign.creator)}
          </div>
          <div className="text-xs font-medium">
            {isExpired ? (
              <span className={isSuccessful ? "text-green-600" : "text-red-600"}>
                {isSuccessful ? "Successful" : "Failed"}
              </span>
            ) : (
              <span className="text-blue-600">
                {formatTimeRemaining(campaign.deadline)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}