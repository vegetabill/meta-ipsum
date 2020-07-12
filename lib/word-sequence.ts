import { randomizedIndices } from "./array-helpers";

/**
 * Infinite sequences of random words from the vocabulary.
 * All words will be used at least once before the cycles repeat.
 */
function* createWordSequence(words: Array<string>): Generator {
  let indices: Array<number> = [];

  while (true) {
    if (indices.length === 0) {
      indices = randomizedIndices(words.length);
    }
    const idx = indices.pop();

    if (idx === undefined) {
      throw new Error(`Ran out of words unexpectedly`);
    }
    yield words[idx];
  }
}

export default createWordSequence;
