// src/ai/flows/analyze-provider-reputation.ts
'use server';

/**
 * @fileOverview Analyzes the reputation of a service provider based on user reviews.
 *
 * - analyzeProviderReputation - A function that analyzes a provider's reputation based on reviews.
 * - AnalyzeProviderReputationInput - The input type for the analyzeProviderReputation function.
 * - AnalyzeProviderReputationOutput - The return type for the analyzeProviderReputation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeProviderReputationInputSchema = z.object({
  reviews: z
    .string()
    .describe('A list of reviews for the service provider.'),
});
export type AnalyzeProviderReputationInput = z.infer<typeof AnalyzeProviderReputationInputSchema>;

const AnalyzeProviderReputationOutputSchema = z.object({
  reputationSummary: z
    .string()
    .describe('A summary of the service provider reputation based on the reviews.'),
  strengths: z.string().describe('Key strengths of the service provider.'),
  weaknesses: z.string().describe('Key weaknesses of the service provider.'),
});
export type AnalyzeProviderReputationOutput = z.infer<typeof AnalyzeProviderReputationOutputSchema>;

export async function analyzeProviderReputation(
  input: AnalyzeProviderReputationInput
): Promise<AnalyzeProviderReputationOutput> {
  return analyzeProviderReputationFlow(input);
}

const reputationPrompt = ai.definePrompt({
  name: 'reputationPrompt',
  input: {schema: AnalyzeProviderReputationInputSchema},
  output: {schema: AnalyzeProviderReputationOutputSchema},
  prompt: `You are an AI assistant specializing in analyzing service provider reputations.

  Based on the customer reviews provided, generate a reputation summary, identify key strengths, and identify key weaknesses of the service provider.

  Reviews: {{{reviews}}}
  `,
});

const analyzeProviderReputationFlow = ai.defineFlow(
  {
    name: 'analyzeProviderReputationFlow',
    inputSchema: AnalyzeProviderReputationInputSchema,
    outputSchema: AnalyzeProviderReputationOutputSchema,
  },
  async input => {
    const {output} = await reputationPrompt(input);
    return output!;
  }
);
