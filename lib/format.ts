import { formatEther } from 'viem';

export function formatAmount(amount: bigint): string {
  return parseFloat(formatEther(amount)).toFixed(2);
}

export function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString();
}

export function calculateProgress(current: bigint, target: bigint): number {
  if (target === BigInt(0)) return 0;
  return Number((BigInt(100) * current) / target);
}

export function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}