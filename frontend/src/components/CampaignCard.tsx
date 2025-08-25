import Link from 'next/link';
import { formatAmount, formatDate, calculateProgress } from '@/lib/format';
import Progress from './Progress';

interface CampaignCardProps {
  address: string;
  title: string;
  description: string;
  target: bigint;
  deadline: bigint;
  amountCollected: bigint;
  image: string;
}

export default function CampaignCard({
  address,
  title,
  description,
  target,
  deadline,
  amountCollected,
  image,
}: CampaignCardProps) {
  const progress = calculateProgress(amountCollected, target);
  const isExpired = Date.now() / 1000 > Number(deadline);

  return (
    <div className="border rounded-lg overflow-hidden shadow-md bg-white">
      <div className="h-48 overflow-hidden">
        <img 
          src={image || 'https://via.placeholder.com/400x200?text=No+Image'} 
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/400x200?text=Error+Loading+Image';
          }}
        />
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2 truncate">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        
        <div className="mb-4">
          <Progress percent={progress} />
          <div className="flex justify-between mt-1 text-sm">
            <span>{formatAmount(amountCollected)} SHM</span>
            <span>{formatAmount(target)} SHM</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">
            Ends: {formatDate(Number(deadline))}
          </span>
          <span className={`text-sm px-2 py-1 rounded ${
            isExpired ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
          }`}>
            {isExpired ? 'Ended' : 'Active'}
          </span>
        </div>
        
        <Link 
          href={`/campaign/${address}`}
          className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors"
        >
          View Campaign
        </Link>
      </div>
    </div>
  );
}