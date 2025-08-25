# PayFi Kickstarter — Shardeum Unstablenet (MVP)

A decentralized crowdfunding platform built on Shardeum Unstablenet. This project allows users to create campaigns, pledge funds, and manage crowdfunding campaigns in a fully decentralized manner.

## Features

- **Create Campaigns**: Any wallet can create a campaign with funding goal, deadline, and metadata
- **Pledge Funds**: Users can contribute SHM (native token) to campaigns
- **Withdraw/Unpledge**: Users can withdraw pledges before campaign deadline
- **Finalize Campaigns**: After deadline, campaigns can be finalized
- **Withdraw Funds**: Creators can withdraw funds if campaign is successful
- **Claim Refunds**: Backers can claim refunds if campaign fails
- **Wallet Integration**: MetaMask support with Shardeum Unstablenet

## Project Structure

- `contracts/` — Solidity smart contracts and deployment scripts
- `frontend/` — Next.js application with wagmi + viem for blockchain interaction

## Getting Started

### Prerequisites

- Node.js 18+ (recommended)
- npm or pnpm
- MetaMask wallet configured with Shardeum Unstablenet RPC: `https://api-unstable.shardeum.org`
- Test SHM tokens (available from Shardeum Discord faucet)

### Setup and Installation

1. Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd payfi-kickstarter
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
