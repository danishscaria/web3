import { formatEther } from 'viem';

export function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString();
}

export function formatAmount(wei: bigint): string {
  return parseFloat(formatEther(wei)).toFixed(4);
}

export function calculateProgress(current: bigint, target: bigint): number {
  if (target === 0n) return 0;
  return Number((current * 100n) / target);
}

export function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}