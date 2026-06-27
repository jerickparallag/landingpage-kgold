import { GoogleGenerativeAI } from '@google/generative-ai';
import { buildFullSiteKnowledge } from './fullSiteKnowledge';
import type { IBotResponse } from '../src/bot/types';

export interface IChatHistoryItem {
  role: 'user' | 'assistant';
  content: string;
}

export interface IChatRequestBody {
  message: string;
  history?: IChatHistoryItem[];
}

const DEFAULT_MODEL = 'gemini-2.5-flash';

function getSystemInstruction(): string {
  const knowledge = buildFullSiteKnowledge();

  return `You are the KGOLD Concierge — a knowledgeable AI assistant for KGOLD Beauty Essentials, a Filipino beauty and wellness brand.

YOUR JOB:
- Answer questions conversationally, like Gemini or a premium brand expert — directly in the chat.
- Use the OFFICIAL SITE KNOWLEDGE below as your primary source. You should know this content thoroughly: mission, vision, values, products, careers, contact, FAQ, and brand story.
- When asked "What is the vision of KGOLD?" or similar, answer with the actual vision text — do NOT just say "visit the about page."
- When asked about mission, values, leadership, products, careers, or locations — explain clearly in 2–5 sentences (more if needed).

NAVIGATION (only when explicitly requested):
- If the visitor asks to GO somewhere ("take me to careers", "where is the about page", "open contact") — briefly confirm and mention you can guide them there.
- Do NOT append navigation links or "click here" for pure information questions.
- Page paths: About /about, Mission /about#mission, Careers /careers, Contact /contact, Collections /#categories.

VOICE:
- Polished English by default. Warm, confident, luxury concierge tone — not robotic.
- Match Tagalog when the user writes in Tagalog.

RULES:
- Answer ONLY from the knowledge below for KGOLD facts. Do not invent products, prices, or policies.
- If something is truly not in the knowledge base, say so politely and suggest hello@kgoldbeauty.com.
- No medical or skin-treatment advice. No guaranteed results.
- No online ordering on this website — mention TikTok Shop, Shopee, Lazada for purchases.

OFFICIAL SITE KNOWLEDGE:
${knowledge}`;
}

function getApiKey(): string {
  const key = process.env.GEMINI_API_KEY?.trim();
  if (!key) {
    throw new Error('GEMINI_API_KEY is not configured on the server.');
  }
  return key;
}

function getModelName(): string {
  return process.env.GEMINI_MODEL?.trim() || DEFAULT_MODEL;
}

function buildContents(message: string, history: IChatHistoryItem[] = []) {
  const recentHistory = history.slice(-10);

  return [
    ...recentHistory.map((item) => ({
      role: item.role === 'assistant' ? ('model' as const) : ('user' as const),
      parts: [{ text: item.content }],
    })),
    { role: 'user' as const, parts: [{ text: message }] },
  ];
}

export async function handleChatRequest(body: IChatRequestBody): Promise<IBotResponse> {
  const message = body.message?.trim();
  if (!message) {
    return { content: 'Please enter a question so I can help.' };
  }

  const genAI = new GoogleGenerativeAI(getApiKey());
  const model = genAI.getGenerativeModel({
    model: getModelName(),
    systemInstruction: getSystemInstruction(),
  });

  const result = await model.generateContent({
    contents: buildContents(message, body.history ?? []),
  });

  const text = result.response.text().trim();
  if (!text) {
    throw new Error('Empty response from Gemini.');
  }

  return { content: text };
}

export function createChatMiddleware() {
  return async (
    req: { method?: string; on: (event: string, cb: (chunk: Buffer) => void) => void },
    res: {
      statusCode: number;
      setHeader: (name: string, value: string) => void;
      end: (body: string) => void;
    },
    next: () => void,
  ) => {
    if (req.method !== 'POST') {
      next();
      return;
    }

    try {
      const chunks: Buffer[] = [];
      req.on('data', (chunk: Buffer) => chunks.push(chunk));
      req.on('end', async () => {
        try {
          const body = JSON.parse(Buffer.concat(chunks).toString('utf8')) as IChatRequestBody;
          const response = await handleChatRequest(body);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(response));
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Chat request failed.';
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: message }));
        }
      });
    } catch {
      next();
    }
  };
}
