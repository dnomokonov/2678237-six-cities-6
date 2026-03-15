import {MAX_RATING} from './const.ts';

export function getRatingPercent(rating : number) : string {
  return `${Math.round(rating) / MAX_RATING * 100}%`;
}
