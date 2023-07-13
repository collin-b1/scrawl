import Game from "./game";
import Player from "./player";

export default class Room {
  private players: [Player];
  private admin: Player;
  private game: Game;

  constructor(admin: Player) {
    this.players = [admin];
    this.admin = admin;
    this.game = new Game();
  }
}
