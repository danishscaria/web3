/**
 * Validates required environment variables for the application
 * Throws an error with a descriptive message if any required variables are missing
 */
export function validateEnvironment(): void {
  const requiredEnvVars = [
    'NEXT_PUBLIC_FACTORY_ADDRESS',
    'NEXT_PUBLIC_SHARDEUM_RPC',
    'NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID'
  ];

  const missingEnvVars = requiredEnvVars.filter(
    varName => !process.env[varName]
  );

  if (missingEnvVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingEnvVars.join(', ')}\n` +
      'Please check your .env file or environment configuration.'
    );
  }

  // Validate factory address format
  const factoryAddress = process.env.NEXT_PUBLIC_FACTORY_ADDRESS;
  if (!/^0x[a-fA-F0-9]{40}$/.test(factoryAddress || '')) {
    throw new Error('NEXT_PUBLIC_FACTORY_ADDRESS is not a valid Ethereum address');
  }

  // Validate RPC URL format
  const rpcUrl = process.env.NEXT_PUBLIC_SHARDEUM_RPC;
  if (!rpcUrl?.startsWith('https://')) {
    throw new Error('NEXT_PUBLIC_SHARDEUM_RPC must be a valid HTTPS URL');
  }
}