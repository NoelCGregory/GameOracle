export class ResultsAggregator {
  constructor(private results: string[]) {}

  getAggregatedResult(): string | null {
    if (!this.results || this.results.length === 0) return null;

    const frequencyMap = new Map<string, number>();

    for (const result of this.results) {
      if (result) {
        // only count non-null results
        frequencyMap.set(result, (frequencyMap.get(result) || 0) + 1);
      }
    }

    if (frequencyMap.size === 0) return null;

    let mostFrequent: string | null = null;
    let highestCount = 0;

    frequencyMap.forEach((count, result) => {
      if (count > highestCount) {
        highestCount = count;
        mostFrequent = result;
      }
    });

    return mostFrequent;
  }
}
