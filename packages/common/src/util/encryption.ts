import { createHmac } from 'crypto';

export const generateSecretHash = (
  identifier: string,
  clientId: string,
  clientSecret: string,
): string => {
  return createHmac('sha256', clientSecret)
    .update(identifier + clientId)
    .digest('base64');
};