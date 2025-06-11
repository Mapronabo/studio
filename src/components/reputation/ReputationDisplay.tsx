import type { AnalyzeProviderReputationOutput } from "@/ai/flows/analyze-provider-reputation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown, MessageSquareText } from 'lucide-react';

interface ReputationDisplayProps {
  analysis: AnalyzeProviderReputationOutput | null;
  isLoading: boolean;
}

export default function ReputationDisplay({ analysis, isLoading }: ReputationDisplayProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-headline flex items-center">
            <MessageSquareText className="mr-2 h-6 w-6 text-primary" />
            AI Reputation Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!analysis) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-headline flex items-center">
            <MessageSquareText className="mr-2 h-6 w-6 text-primary" />
            AI Reputation Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Reputation analysis not available.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-headline flex items-center">
           <MessageSquareText className="mr-2 h-6 w-6 text-primary" />
           AI Reputation Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold text-lg mb-2">Summary</h3>
          <p className="text-sm text-foreground">{analysis.reputationSummary}</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2 flex items-center">
            <ThumbsUp className="mr-2 h-5 w-5 text-green-500" />
            Strengths
          </h3>
          <p className="text-sm text-foreground">{analysis.strengths}</p>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-2 flex items-center">
            <ThumbsDown className="mr-2 h-5 w-5 text-red-500" />
            Weaknesses
          </h3>
          <p className="text-sm text-foreground">{analysis.weaknesses}</p>
        </div>
        <p className="text-xs text-muted-foreground italic text-center pt-2">
          Powered by AI analysis of customer reviews.
        </p>
      </CardContent>
    </Card>
  );
}
