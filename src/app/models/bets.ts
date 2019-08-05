import { TeamBet } from './team-bet';
import { Category } from './category';

export interface BetQuery {
  id?: number;
  title?: string;
  description?: string;
  categoryId?: number;
  createdAt?: Date;
  createdBy?: number;
  siteId?: number;
  placeId?: number;
  eventUrl?: string;
  eventId?: number;
  eventDate?: Date;
  team_bets?: Array<TeamBet>;
  category?: Array<Category>;
}

export interface BetMutation {
  id?: number;
  title?: string;
  description?: string;
  categoryId?: number;
  createdAt?: Date;
  createdBy?: number;
  siteId?: number;
  placeId?: number;
  eventUrl?: string;
  eventId?: number;
  eventDate?: Date;
  team_bets?: { data: TeamBet[] };
  category?: { data: Category[] };
}
