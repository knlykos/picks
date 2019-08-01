export interface Bet {
  id?: number;
  title?: string;
  description?: string;
  event?: number;
  categoryId?: number;
  createdAt?: Date;
  createdBy?: number;
  siteId?: number;
  placeId?: number;
  eventUrl?: string;
  eventDate?: Date;
  teamOneId?: number;
  teamTwoId?: number;
}
