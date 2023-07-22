interface PlayerTypes {
  id: number;
  displayName: string;
  score: number;
  admin?: boolean;
}

export interface PlayerList extends Array<PlayerTypes> {}

export default PlayerTypes;
