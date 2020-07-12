import Chance from "chance";
import { createGenerator, defaultOptions } from "../lib/generator";
import { LoremIpsumGenerator } from "../lib/types";

const chance = new Chance();

const isCapitalized = (str: string): boolean => {
  if (!str) {
    return false;
  }
  return str.substr(0, 1) === str.substr(0, 1).toUpperCase();
};

describe("Lorem Ipsum Generator", () => {
  let vocab: Set<string>;
  let generator: LoremIpsumGenerator;

  beforeEach(() => {
    vocab = new Set();
    while (vocab.size < 7) {
      vocab.add(chance.word());
    }
    generator = createGenerator(vocab);
  });

  describe("title()", () => {
    it("should produce capitalized words", () => {
      const title = generator.title();
      const words = title.split(/\b/);
      words.forEach((word) => {
        expect(isCapitalized(word)).toBeTrue();
      });
    });

    const { min, max } = defaultOptions.titleWordRange;

    it(`should produce between ${min} and ${max} words`, () => {
      const title = generator.title();
      const wordCount = title.split(" ").length;
      expect(wordCount).toBeGreaterThanOrEqual(min);
      expect(wordCount).toBeLessThanOrEqual(max);
    });
  });
});
