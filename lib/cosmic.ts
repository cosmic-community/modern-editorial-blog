import { createBucketClient } from '@cosmicjs/sdk';

// Initialize the Cosmic SDK client
export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG || 'swimstretch-production',
  readKey: process.env.COSMIC_READ_KEY || '',
  writeKey: process.env.COSMIC_WRITE_KEY || '',
});

// Helper to check for 404s
export function is404(error: unknown): boolean {
  return typeof error === 'object' && error !== null && 'status' in error && (error as any).status === 404;
}