import { webcrypto } from 'node:crypto';

export const generateSecretHash = async (
  identifier: string,
  clientId: string,
  clientSecret: string,
): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(identifier + clientId);
  const key = await webcrypto.subtle.importKey(
    'raw',
    encoder.encode(clientSecret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const signature = await webcrypto.subtle.sign(
    'HMAC',
    key,
    data
  );

  return Buffer.from(signature).toString('base64');
};