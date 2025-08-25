'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAccount, useContractRead, useContractWrite, useWaitForTransaction } from 'wagmi';
import { formatEther, parseEther } from 'viem';
import { readContract } from '@wagmi/core';
import { formatAmount, formatDate, calculateProgress, shortenAddress } from '@/lib/format';
import Progress from '@/components/Progress';
import campaignABI from '@/abi/Campaign.json';

export default function CampaignDetail() {
  const params = useParams();
  const router = useRouter();
  const { address: userAddress, isConnected } = useAccount();
  
  const campaignAddress = params.address as string;
  
  const [pledgeAmount, setPledgeAmount] = useState('');
  const [unpledgeAmount, setUnpledgeAmount] = useState('');
  const [userPledge, setUserPledge] = useState<bigint>(BigInt(0));
  const [isLoading, setIsLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Campaign details
  const { data: campaignData, refetch: refetchCampaign } = useContractRead({
    address: campaignAddress as `0x${string}`,
    abi: campaignABI,
    functionName: 'getCampaignDetails',
    watch: true,
  });

  // User pledge
  useEffect(() => {
    const fetchUserPledge = async () => {
      if (isConnected && userAddress) {
        try {
          const pledge = await readContract({
            address: campaignAddress as `0x${string}`,
            abi: campaignABI,
            functionName: 'pledges',
            args: [userAddress],
          });
          setUserPledge(pledge as bigint);
        } catch (error) {
          console.error('Error fetching user pledge:', error);
        }
      }
    };

    fetchUserPledge();
  }, [campaignAddress, userAddress, isConnected, refreshTrigger]);

  // Pledge funds
  const { write: pledge, data: pledgeData } = useContractWrite({
    address: campaignAddress as `0x${string}`,
    abi: campaignABI,
    functionName: 'pledge',
  });

  const { isLoading: isPledgeLoading, isSuccess: isPledgeSuccess } = useWaitForTransaction({
    hash: pledgeData?.hash,
  });

  // Unpledge funds
  const { write: unpledge, data: unpledgeData } = useContractWrite({
    address: campaignAddress as `0x${string}`,
    abi: campaignABI,
    functionName: 'unpledge',
  });

  const { isLoading: isUnpledgeLoading, isSuccess: isUnpledgeSuccess } = useWaitForTransaction({
    hash: unpledgeData?.hash,
  });

  // Finalize campaign
  const { write: finalize, data: finalizeData } = useContractWrite({
    address: campaignAddress as `0x${string}`,
    abi: campaignABI,
    functionName: 'finalize',
  });

  const { isLoading: isFinalizeLoading, isSuccess: isFinalizeSuccess } = useWaitForTransaction({
    hash: finalizeData?.hash,
  });

  // Withdraw funds (for creator)
  const { write: withdrawFunds, data: withdrawData } = useContractWrite({
    address: campaignAddress as `0x${string}`,
    abi: campaignABI,
    functionName: 'withdrawFunds',
  });

  const { isLoading: isWithdrawLoading, isSuccess: isWithdrawSuccess } = useWaitForTransaction({
    hash: withdrawData?.hash,
  });

  // Claim refund (for backers if campaign failed)
  const { write: claimRefund, data: claimRefundData } = useContractWrite({
    address: campaignAddress as `0x${string}`,
    abi: campaignABI,
    functionName: 'claimRefund',
  });

  const { isLoading: isClaimRefundLoading, isSuccess: isClaimRefundSuccess } = useWaitForTransaction({
    hash: claimRefundData?.hash,
  });

  // Handle successful transactions
  useEffect(() => {
    if (isPledgeSuccess || isUnpledgeSuccess || isFinalizeSuccess || isWithdrawSuccess || isClaimRefundSuccess) {
      refetchCampaign();
      setRefreshTrigger(prev => prev + 1);
      setPledgeAmount('');
      setUnpledgeAmount('');
    }
  }, [isPledgeSuccess, isUnpledgeSuccess, isFinalizeSuccess, isWithdrawSuccess, isClaimRefundSuccess, refetchCampaign]);

  // Handle pledge submission
  const handlePledge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    if (!pledgeAmount || parseFloat(pledgeAmount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    try {
      const amountInWei = parseEther(pledgeAmount);
      pledge({ value: amountInWei });
    } catch (error) {
      console.error('Error pledging funds:', error);
      alert('Failed to pledge funds. Please try again.');
    }
  };

  // Handle unpledge submission
  const handleUnpledge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    if (!unpledgeAmount || parseFloat(unpledgeAmount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    try {
      const amountInWei = parseEther(unpledgeAmount);
      unpledge({ args: [amountInWei] });
    } catch (error) {
      console.error('Error unpledging funds:', error);
      alert('Failed to unpledge funds. Please try again.');
    }
  };

  // Extract campaign details
  const campaignDetails = campaignData ? {
    creator: campaignData[0] as string,
    title: campaignData[1] as string,
    description: campaignData[2] as string,
    target: campaignData[3] as bigint,
    deadline: campaignData[4] as bigint,
    amountCollected: campaignData[5] as bigint,
    image: campaignData[6] as string,
    isFinalized: campaignData[7] as boolean,
  } : null;

  // Calculate campaign status
  const now = Math.floor(Date.now() / 1000);
  const isEnded = campaignDetails ? Number(campaignDetails.deadline) < now : false;
  const isSuccessful = campaignDetails ? campaignDetails.amountCollected >= campaignDetails.target : false;
  const progress = campaignDetails ? calculateProgress(campaignDetails.amountCollected, campaignDetails.target) : 0;
  const isCreator = campaignDetails && userAddress ? campaignDetails.creator.toLowerCase() === userAddress.toLowerCase() : false;
  const canWithdraw = isCreator && isEnded && isSuccessful && campaignDetails?.isFinalized;
  const canClaimRefund = isEnded && !isSuccessful && campaignDetails?.isFinalized && userPledge > BigInt(0);
  const canFinalize = isEnded && !campaignDetails?.isFinalized;
  const canPledge = !isEnded && !campaignDetails?.isFinalized;

  if (!campaignDetails) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Loading campaign details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => router.push('/')}
        className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
      >
        <span>← Back to campaigns</span>
      </button>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Campaign Header */}
        <div className="relative h-64 bg-gray-200">
          <img
            src={campaignDetails.image || 'https://via.placeholder.com/800x400?text=No+Image'}
            alt={campaignDetails.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/800x400?text=Error+Loading+Image';
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <h1 className="text-3xl font-bold text-white">{campaignDetails.title}</h1>
            <p className="text-white/80">Created by: {shortenAddress(campaignDetails.creator)}</p>
          </div>
        </div>

        {/* Campaign Status */}
        <div className="p-6 border-b">
          <div className="flex flex-wrap justify-between items-center mb-4">
            <div>
              <span className="text-2xl font-bold">{formatAmount(campaignDetails.amountCollected)} SHM</span>
              <span className="text-gray-500 ml-2">of {formatAmount(campaignDetails.target)} SHM goal</span>
            </div>
            <div className="flex space-x-2">
              <span className={`px-3 py-1 rounded-full text-sm ${
                isEnded ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
              }`}>
                {isEnded ? 'Ended' : 'Active'}
              </span>
              {campaignDetails.isFinalized && (
                <span className={`px-3 py-1 rounded-full text-sm ${
                  isSuccessful ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {isSuccessful ? 'Successful' : 'Failed'}
                </span>
              )}
            </div>
          </div>

          <Progress percent={progress} />
          
          <div className="mt-4 flex justify-between text-sm text-gray-500">
            <span>Ends on: {formatDate(Number(campaignDetails.deadline))}</span>
            {isEnded ? (
              <span>{campaignDetails.isFinalized ? 'Campaign finalized' : 'Awaiting finalization'}</span>
            ) : (
              <span>Time remaining: {Math.max(0, Math.floor((Number(campaignDetails.deadline) - now) / 86400))} days</span>
            )}
          </div>
        </div>

        {/* Campaign Description */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold mb-4">About this campaign</h2>
          <p className="whitespace-pre-line">{campaignDetails.description}</p>
        </div>

        {/* User Actions */}
        <div className="p-6">
          {isConnected ? (
            <div className="space-y-6">
              {/* User Pledge Info */}
              {userPledge > BigInt(0) && (
                <div className="bg-blue-50 p-4 rounded-md">
                  <p className="font-medium">Your contribution: {formatAmount(userPledge)} SHM</p>
                </div>
              )}

              {/* Pledge Form */}
              {canPledge && (
                <div className="border rounded-md p-4">
                  <h3 className="text-lg font-medium mb-3">Support this campaign</h3>
                  <form onSubmit={handlePledge} className="flex space-x-2">
                    <div className="flex-1">
                      <input
                        type="number"
                        value={pledgeAmount}
                        onChange={(e) => setPledgeAmount(e.target.value)}
                        placeholder="Amount in SHM"
                        className="w-full px-3 py-2 border rounded-md"
                        step="0.01"
                        min="0"
                        disabled={isPledgeLoading}
                      />
                    </div>
                    <button
                      type="submit"
                      className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors ${
                        isPledgeLoading ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                      disabled={isPledgeLoading}
                    >
                      {isPledgeLoading ? 'Processing...' : 'Pledge'}
                    </button>
                  </form>
                </div>
              )}

              {/* Unpledge Form */}
              {canPledge && userPledge > BigInt(0) && (
                <div className="border rounded-md p-4">
                  <h3 className="text-lg font-medium mb-3">Withdraw your support</h3>
                  <form onSubmit={handleUnpledge} className="flex space-x-2">
                    <div className="flex-1">
                      <input
                        type="number"
                        value={unpledgeAmount}
                        onChange={(e) => setUnpledgeAmount(e.target.value)}
                        placeholder="Amount in SHM"
                        className="w-full px-3 py-2 border rounded-md"
                        step="0.01"
                        min="0"
                        max={parseFloat(formatEther(userPledge))}
                        disabled={isUnpledgeLoading}
                      />
                    </div>
                    <button
                      type="submit"
                      className={`px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors ${
                        isUnpledgeLoading ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                      disabled={isUnpledgeLoading}
                    >
                      {isUnpledgeLoading ? 'Processing...' : 'Unpledge'}
                    </button>
                  </form>
                </div>
              )}

              {/* Finalize Campaign */}
              {canFinalize && (
                <div className="border rounded-md p-4">
                  <h3 className="text-lg font-medium mb-3">Finalize Campaign</h3>
                  <p className="text-gray-600 mb-3">
                    This campaign has ended and needs to be finalized before funds can be withdrawn or refunded.
                  </p>
                  <button
                    onClick={() => finalize()}
                    className={`px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors ${
                      isFinalizeLoading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                    disabled={isFinalizeLoading}
                  >
                    {isFinalizeLoading ? 'Processing...' : 'Finalize Campaign'}
                  </button>
                </div>
              )}

              {/* Withdraw Funds (Creator) */}
              {canWithdraw && (
                <div className="border rounded-md p-4 bg-green-50">
                  <h3 className="text-lg font-medium mb-3">Withdraw Funds</h3>
                  <p className="text-gray-600 mb-3">
                    Congratulations! Your campaign was successful. You can now withdraw the pledged funds.
                  </p>
                  <button
                    onClick={() => withdrawFunds()}
                    className={`px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors ${
                      isWithdrawLoading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                    disabled={isWithdrawLoading}
                  >
                    {isWithdrawLoading ? 'Processing...' : 'Withdraw Funds'}
                  </button>
                </div>
              )}

              {/* Claim Refund */}
              {canClaimRefund && (
                <div className="border rounded-md p-4 bg-yellow-50">
                  <h3 className="text-lg font-medium mb-3">Claim Refund</h3>
                  <p className="text-gray-600 mb-3">
                    This campaign did not reach its funding goal. You can claim a refund of your pledged amount.
                  </p>
                  <button
                    onClick={() => claimRefund()}
                    className={`px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors ${
                      isClaimRefundLoading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                    disabled={isClaimRefundLoading}
                  >
                    {isClaimRefundLoading ? 'Processing...' : 'Claim Refund'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-md">
              <p className="text-gray-600 mb-4">Connect your wallet to interact with this campaign</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}