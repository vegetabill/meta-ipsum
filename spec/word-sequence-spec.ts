import createWordSequence from "../lib/word-sequence";
import Chance from "chance";

const chance = new Chance();

describe("word-sequence", () => {
  let vocab: Array<string>;
  let seq: Generator<unknown, any, unknown>;
  beforeEach(() => {
    vocab = new Array(3).fill("").map(() => chance.word());
    seq = createWordSequence(vocab);
  });
  describe("createWordSequence()", () => {
    it("should return a random word from the vocab", () => {
      const seq = createWordSequence(vocab);
      const word = seq.next().value as string;
      expect(vocab).toContain(word);
    });

    it("should return all words once before repeating", () => {
      const all = new Array(vocab.length).fill("").map(() => seq.next().value);
      expect(new Set(all)).toEqual(new Set(vocab));
    });

    it("should be iterable beyond the vocab length", () => {
      const all = new Array(vocab.length * 2 + 1)
        .fill("")
        .map(() => seq.next().value);
      expect(new Set(all)).toEqual(new Set(vocab));
    });
  });
});
