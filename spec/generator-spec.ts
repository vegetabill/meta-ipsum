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

  const randomLength = () =>
    chance.natural({ min: 1, max: vocab.size * 2 + 1 });

  describe("paragraphs()", () => {
    it("should produce specified number of paragraphs", () => {
      const paragraphs = generator.paragraphs(3);
      expect(paragraphs.length).toEqual(3);
      paragraphs.forEach((para) => {
        para.split(" ").forEach((word) => {
          const normalizedWord = word.replace(".", "").toLowerCase();
          expect(vocab.has(normalizedWord)).toBeTrue();
        });
      });
    });
  });

  describe("paragraph()", () => {
    const { min, max } = defaultOptions.paragraphSentenceRange;

    it(`should produce between ${min} and ${max} sentences`, () => {
      const paragraph = generator.paragraph();
      const sentences = paragraph.split(". ");
      expect(sentences.length).toBeGreaterThanOrEqual(min);
      expect(sentences.length).toBeLessThanOrEqual(max);
    });

    it("should generate specified number of sentences", () => {
      const sentenceCount = randomLength();
      const paragraph = generator.paragraph(sentenceCount);
      const sentences = paragraph.split(". ");
      expect(sentences.length).toEqual(sentenceCount);
    });
  });

  describe("sentence()", () => {
    it("should produce exactly the word count specified", () => {
      const sentence = generator.sentence(4);
      const words = sentence.split(" ");
      expect(words.length).toBe(4);
    });

    it("should capitalize the initial word", () => {
      const sentence = generator.sentence();
      const [first, ...rest] = sentence.split(" ");
      expect(isCapitalized(first)).toBeTrue();
    });

    it("should contain all words from the vocab", () => {
      const sentence = generator.sentence(vocab.size);
      const words = new Set(
        sentence
          .replace(".", "")
          .split(" ")
          .map((s) => s.toLowerCase())
      );
      expect(words).toEqual(vocab);
    });

    const { min, max } = defaultOptions.sentenceWordRange;

    it(`should produce between ${min} and ${max} words`, () => {
      const sentence = generator.sentence();
      const wordCount = sentence.split(" ").length;
      expect(wordCount).toBeGreaterThanOrEqual(min);
      expect(wordCount).toBeLessThanOrEqual(max);
    });
  });

  describe("title()", () => {
    it("should produce capitalized words", () => {
      const title = generator.title();
      const words = title.split(" ");
      words.forEach((word) => {
        expect(isCapitalized(word)).toBeTrue();
      });
    });

    it("should produce specified length", () => {
      const title = generator.title(vocab.size);
      const words = title.split(" ");
      expect(words.length).toEqual(vocab.size);
      words.forEach((word) => {
        expect(vocab.has(word.toLowerCase()));
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
