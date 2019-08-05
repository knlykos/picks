import { Team } from './team';

export interface TeamBet {
  id?: number;
  betId?: number;
  teamId?: number;
  team?: Team;
}
