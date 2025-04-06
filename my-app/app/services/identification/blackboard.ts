import { ResultsAggregator } from "./ResultsAggregator";
import AudioExpert from "./experts/audioExpert";
import ImageExpert from "./experts/imageExpert";
import TextExpert from "./experts/textExpert";

export class BlackBoard {
  public expertMap: Map<string, IdentificationExpert> = new Map();

  attach(key: string, expert: IdentificationExpert): void {
    this.expertMap.set(key, expert);
  }
  async requestIdentification(identification: any): Promise<string | null> {
    const results: string[] = [];
    console.log("---");
    console.log(identification);
    console.log(this.expertMap);

    // let y = await t.getResult(identification["imageUri"]);
    // console.log(y);

    let promises: any[] = [];

    for (const [key, expert] of this.expertMap.entries()) {
      const input = identification[key];
      if (!input) continue;
      console.log(key, input);

      promises.push(expert.getResult(input));
    }

    const expertResults = await Promise.all(promises);
    const filteredResults = expertResults.filter(
      (result) => result != null || result.length > 0
    );
    console.log("-------");
    console.log(filteredResults);

    // Aggregate
    const aggregator = new ResultsAggregator(filteredResults);
    return aggregator.getAggregatedResult();
  }
}
