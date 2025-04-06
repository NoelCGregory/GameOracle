import GemniHandler from "../../API/GemniHandler";

// IdentificationRecord class implementing Identification
export default class ImageExpert implements IdentificationExpert {
  public st: string = "im";
  async getResult(imageUri: string): Promise<string> {
    console.log("expert", imageUri);
    let handler: GemniHandler = new GemniHandler();
    return await handler.request(imageUri);
  }
}
