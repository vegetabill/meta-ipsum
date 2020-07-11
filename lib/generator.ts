import createWordSequence from "./word-sequence";

export function createGenerator(
  vocabulary: Array<string>,
  options?: GeneratorOptions
): LoremIpsumGenerator {
  const opts = {
    ...defaultOptions,
    ...options,
  };

  if (!vocabulary || vocabulary.length < 2) {
    throw new Error(`Vocabulary too small: length ${vocabulary.length}`);
  }

  const sequence = createWordSequence(vocabulary);

  const word = () => {
    const result = sequence.next();
    if (result.done) {
      throw new Error("Sequence unexpectedly finished");
    }
    return result.value as string;
  };

  const capitalize = (s: string): string =>
    `${s.substr(0, 1).toUpperCase()}${s.substring(1)}`;

  function title(count?: number): string {
    return `The ${capitalize(word())}`;
  }

  const sentenceWordLength = (): number => {
    return opts.sentenceWordRange.min;
  };

  function sentence(): string {
    return (
      [
        capitalize(word()),
        ...new Array(sentenceWordLength()).fill("").map(word),
      ].join(" ") + "."
    );
  }

  function paragraph(sentenceCount: number = 3): string {
    return new Array(sentenceCount).fill("").map(sentence).join(" ");
  }

  function paragraphs(count?: number): Array<string> {
    return new Array(count).fill("").map(paragraph);
  }

  return {
    title,
    sentence,
    paragraph,
    paragraphs,
  };
}

export interface LoremIpsumGenerator {
  title: (count?: number) => string;
  sentence: () => string;
  paragraph: (sentenceCount?: number) => string;
  paragraphs: (count?: number) => Array<string>;
}

export interface Range {
  min: number;
  max: number;
}

export interface GeneratorOptions {
  sentenceWordRange: Range;
  paragraphSentenceRange: Range;
}

const defaultOptions: GeneratorOptions = {
  sentenceWordRange: { min: 5, max: 10 },
  paragraphSentenceRange: { min: 3, max: 7 },
};
