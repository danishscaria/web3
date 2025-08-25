'use client';

import './globals.css';
import { WagmiConfig } from 'wagmi';
import { config } from '../lib/wagmiConfig';
import Link from 'next/link';
import ConnectButton from '../components/ConnectButton';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <WagmiConfig config={config}>
          <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                  <div className="flex items-center">
                    <Link href="/" className="text-xl font-bold text-blue-600">
                      PayFi Kickstarter
                    </Link>
                    <span className="ml-2 text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded">
                      Shardeum Unstablenet
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Link 
                      href="/create" 
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                      Create Campaign
                    </Link>
                    <ConnectButton />
                  </div>
                </div>
              </div>
            </header>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
            <footer className="bg-white border-t mt-auto">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <p className="text-center text-gray-500 text-sm">
                  PayFi Kickstarter — Shardeum Unstablenet MVP
                </p>
              </div>
            </footer>
          </div>
        </WagmiConfig>
      </body>
    </html>
  );
}