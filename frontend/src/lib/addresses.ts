export const FACTORY_ADDRESS = process.env.NEXT_PUBLIC_FACTORY_ADDRESS as string;

if (!FACTORY_ADDRESS) {
  console.warn('NEXT_PUBLIC_FACTORY_ADDRESS is not set in .env file');
}