import { Range } from "./types";

export function randomWithin(range: Range): number {
  return Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
}
