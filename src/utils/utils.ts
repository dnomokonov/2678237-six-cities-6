import {MAX_RATING} from '../const.ts';

export function getRatingPercent(rating : number) : string {
  return `${Math.round(rating) / MAX_RATING * 100}%`;
}

export function formatDate(isoDate: string) : string {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-US', {month: 'long', year: 'numeric'});
}
