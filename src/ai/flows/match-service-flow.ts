
'use server';
/**
 * @fileOverview Matches user input to the most relevant service.
 *
 * - matchService - A function that takes user text and available services, and returns the ID of the best matching service.
 * - MatchServiceInput - The input type for the matchService function.
 * - MatchServiceOutput - The return type for the matchService function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ServiceSchema = z.object({
  id: z.string().describe('The unique identifier of the service.'),
  name: z.string().describe('The name of the service.'),
});

const MatchServiceInputSchema = z.object({
  userInputText: z
    .string()
    .describe('The text input from the user describing the service they need.'),
  availableServices: z
    .array(ServiceSchema)
    .describe('A list of available services with their IDs and names.'),
});
export type MatchServiceInput = z.infer<typeof MatchServiceInputSchema>;

const MatchServiceOutputSchema = z.object({
  matchedServiceId: z
    .string()
    .describe(
      'The ID of the service that best matches the user input. Responds with "NO_MATCH" if no service is a good fit.'
    ),
});
export type MatchServiceOutput = z.infer<typeof MatchServiceOutputSchema>;

export async function matchService(
  input: MatchServiceInput
): Promise<MatchServiceOutput> {
  // Handle empty input or services
  if (!input.userInputText.trim() || input.availableServices.length === 0) {
    return { matchedServiceId: 'NO_MATCH' };
  }
  return matchServiceFlow(input);
}

const serviceMatchingPrompt = ai.definePrompt({
  name: 'serviceMatchingPrompt',
  input: {schema: MatchServiceInputSchema},
  output: {schema: MatchServiceOutputSchema},
  prompt: `Eres un asistente inteligente que ayuda a los usuarios a encontrar el servicio adecuado.
Analiza la siguiente "Solicitud del usuario" y compárala con la "Lista de servicios disponibles".
Tu tarea es identificar el ID del servicio de la lista que mejor se corresponda semánticamente con la solicitud del usuario.

Considera sinónimos y la intención detrás de la solicitud. Por ejemplo, si el usuario dice "quiero cortarme el pelo", debería coincidir con "Peluquería". Si dice "necesito arreglar una tubería rota", debería coincidir con "Manitas" o un servicio similar si "Fontanería" no está disponible.

Responde ÚNICAMENTE con el ID del servicio que mejor coincida.
Si ningún servicio de la lista parece una buena coincidencia o la solicitud es demasiado vaga, responde con "NO_MATCH".

Solicitud del usuario:
{{{userInputText}}}

Lista de servicios disponibles (formato: ID - Nombre):
{{#each availableServices}}
- {{{this.id}}} - {{{this.name}}}
{{/each}}

ID del servicio coincidente:
`,
});

const matchServiceFlow = ai.defineFlow(
  {
    name: 'matchServiceFlow',
    inputSchema: MatchServiceInputSchema,
    outputSchema: MatchServiceOutputSchema,
  },
  async (input: MatchServiceInput) => {
    // Basic guard: if no input or no services, return NO_MATCH early.
    if (!input.userInputText.trim() || input.availableServices.length === 0) {
        return { matchedServiceId: 'NO_MATCH' };
    }
    const {output} = await serviceMatchingPrompt(input);
    return output || { matchedServiceId: 'NO_MATCH' }; // Ensure an output is always returned
  }
);
