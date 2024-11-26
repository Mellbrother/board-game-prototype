export interface Prototype {
  id: number;
  name: string;
  players: Player[];
}

export type AllPart = Part | Card | Hand | Deck;
export type AllPartKey = keyof Part | keyof Card | keyof Hand | keyof Deck;

export interface Part {
  id: number;
  type: string;
  prototypeId: number;
  name: string;
  description: string;
  color: string;
  position: { x: number; y: number };
  width: number;
  height: number;
  order: number; // @see https://www.figma.com/blog/realtime-editing-of-ordered-sequences/ , https://www.wantedly.com/companies/wantedly/post_articles/386188
}

export interface Card extends Part {
  isReversible: boolean;
}

export interface Hand extends Part {
  ownerId: string;
  cardIds: number[];
}

export interface Deck extends Part {
  cardIds: number[];
}

export interface Player {
  id: string;
  name: string;
}
