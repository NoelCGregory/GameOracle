export class GameResult {
  constructor(public gameName: string) {}

  getGameName(): string {
    return this.gameName;
  }
}
