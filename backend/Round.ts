import RoundState from "./models/enums";

class Round {
  word: string;
  state: RoundState;
  public constructor() {
    this.word = "Round";
    this.state = RoundState.none;
  }

  startRound() {
    this.state = RoundState.running;
    setTimeout(() => {
      this.endRound();
    }, 60000);
  }
  endRound() {
    this.state = RoundState.end;
  }
}
export default Round;
