export class ResultsAggregator {
  constructor(private results: string[]) {}

  getAggregatedResult(): string | null {
    console.log("Result Aggre");
    console.log(this.results);
    // Just return the first non-null game name as a basic example
    for (const result of this.results) {
      const name = result;
      if (name) return name;
    }
    return null;
  }
}
