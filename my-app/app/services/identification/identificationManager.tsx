import { BlackBoard } from "./blackboard";
import AudioExpert from "./experts/audioExpert";
import ImageExpert from "./experts/imageExpert";
import TextExpert from "./experts/textExpert";

export class IdentificationManager {
  private blackboard = new BlackBoard();

  initializeExperts(): void {
    console.log("initiliazed experts", this);
    this.blackboard.attach("image", new ImageExpert());
    this.blackboard.attach("audio", new AudioExpert());
    this.blackboard.attach("text", new TextExpert());

    // this.blackboard.attach(new AudioExpert());
  }

  async submitIdentification(identification: any): Promise<string> {
    console.log("submited id", this);
    return await this.blackboard.requestIdentification(identification);
  }
}
