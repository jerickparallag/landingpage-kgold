import { handleChatRequest, type IChatRequestBody } from '../server/chatApi';

interface IVercelRequest {
  method?: string;
  body?: unknown;
}

interface IVercelResponse {
  setHeader(name: string, value: string): void;
  status(code: number): IVercelResponse;
  json(body: unknown): void;
}

export default async function handler(req: IVercelRequest, res: IVercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = (
      typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    ) as IChatRequestBody;
    const response = await handleChatRequest(body);
    return res.status(200).json(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Chat request failed.';
    return res.status(500).json({ error: message });
  }
}
