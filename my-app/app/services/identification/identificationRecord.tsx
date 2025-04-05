// IdentificationRecord class implementing Identification
class IdentificationRecord implements Identification {
  private id: string = "";
  private result: string = "";
  private imageData?: string;
  private audioData?: string;
  private textData?: Record<string, any>;

  getId(): string {
    return this.id;
  }

  getResult(): string {
    return this.result;
  }
}
