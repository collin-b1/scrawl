import Player from "./Player/Player";
import PlayerTypes, { PlayerList } from "./Player/PlayerTypes";

interface GamePanelProps {
  players: PlayerList;
}

const GamePanel = ({ players }: GamePanelProps) => {
  return (
    <div className="flex-1 rounded mr-2 p-2 bg-slate-700 sm:overflow-scroll">
      <h2 className="font-bold text-center mb-2">Players ({players.length})</h2>
      {players.map(player => (
        <Player
          key={player.id}
          id={player.id}
          displayName={player.displayName}
          score={player.score}
          admin={player.admin}
        />
      ))}
    </div>
  );
};

export default GamePanel;
