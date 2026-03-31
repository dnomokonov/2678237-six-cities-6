interface HasPrice {
  price: number;
}

interface HasRating {
  rating: number;
}

export function sortByPriceAsc<T extends HasPrice>(items: T[]): T[] {
  return items.toSorted((a, b) => a.price - b.price);
}

export function sortByPriceDesc<T extends HasPrice>(items: T[]) : T[] {
  return items.sort((a, b) => b.price - a.price);
}

export function sortByRatingDesc<T extends HasRating>(items : T[]) : T[] {
  return items.toSorted((a, b) => b.rating - a.rating);
}
