'use server';
/**
 * @fileOverview An AI assistant for answering frequently asked questions about the SPY HACKS 2026 event.
 *
 * - faqAssistant - A function that handles user questions about the hackathon.
 * - FAQAssistantInput - The input type for the faqAssistant function.
 * - FAQAssistantOutput - The return type for the faqAssistant function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const FAQAssistantInputSchema = z.object({
  question: z.string().describe('The user\'s question about the hackathon.'),
});
export type FAQAssistantInput = z.infer<typeof FAQAssistantInputSchema>;

const FAQAssistantOutputSchema = z.object({
  answer: z
    .string()
    .describe("The AI assistant's answer to the user's question."),
});
export type FAQAssistantOutput = z.infer<typeof FAQAssistantOutputSchema>;

export async function faqAssistant(input: FAQAssistantInput): Promise<FAQAssistantOutput> {
  return faqAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'faqAssistantPrompt',
  input: { schema: FAQAssistantInputSchema },
  output: { schema: FAQAssistantOutputSchema },
  prompt: `You are an AI assistant for SPY HACKS 2026, a hackathon organized by the SPY (Stevens.py) Club. Your goal is to provide instant, accurate, and helpful answers to participant questions about the event.
If you don't have specific information for dynamic details like exact dates, venue, or the full schedule, instruct the user to check the official SPY HACKS 2026 website for the most up-to-date information. The website will also contain registration links, sponsor information, and other resources.

SPY HACKS 2026 is an annual hackathon focusing on innovation and technology. It encourages participants to build creative projects over a set period. The theme for this year's hackathon is inspired by 'spy' and 'tech' concepts.

User's Question: {{{question}}}`,
});

const faqAssistantFlow = ai.defineFlow(
  {
    name: 'faqAssistantFlow',
    inputSchema: FAQAssistantInputSchema,
    outputSchema: FAQAssistantOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
