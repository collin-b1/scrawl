import { Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";

export default class Player {
  private name: string;
  private uuid: string;
  private score: number;

  constructor(name: string) {
    this.name = name;
    this.uuid = uuidv4();
    this.score = 0;
  }

  getScore() {
    return this.score;
  }

  setScore(score: number) {
    this.score = score;
  }

  getId() {
    return this.uuid;
  }

  getScoreboardInfo() {
    return {
      name: this.name,
      score: this.score,
    };
  }
}
