import GemniHandler from "../../API/GemniHandler";

// IdentificationRecord class implementing Identification
export default class AudioExpert implements IdentificationExpert {
  async getResult(imageUri: string): Promise<string> {
    let handler: GemniHandler = new GemniHandler();
    return await handler.request(imageUri);
  }
}
