import createWordSequence from "./word-sequence";
import { GeneratorOptions, LoremIpsumGenerator, Range } from "./types";
import { randomWithin } from "./random-helpers";

export function createGenerator(
  vocabulary: Set<string>,
  options?: GeneratorOptions
): LoremIpsumGenerator {
  const opts = {
    ...defaultOptions,
    ...options,
  };

  if (!vocabulary || vocabulary.size < 2) {
    throw new Error(`Vocabulary too small: size ${vocabulary.size}`);
  }

  const sequence = createWordSequence([...vocabulary]);

  const word = () => {
    const result = sequence.next();
    if (result.done) {
      throw new Error("Sequence unexpectedly finished");
    }
    return result.value as string;
  };

  const capitalize = (s: string): string =>
    `${s.substr(0, 1).toUpperCase()}${s.substring(1)}`;

  const capitalizedWord = (): string => capitalize(word());

  const emptyArray = (size: number): Array<string> => new Array(size).fill("");

  const templateBuilder = (range: Range) => {
    return (sizeOverride?: number) => {
      const size = sizeOverride ? sizeOverride : randomWithin(range);
      return new Array(size).fill("");
    };
  };

  const builders = {
    sentence: templateBuilder(opts.sentenceWordRange),
    title: templateBuilder(opts.titleWordRange),
    paragraph: templateBuilder(opts.paragraphSentenceRange),
  };

  const title = (count?: number): string =>
    builders.title(count).map(capitalizedWord).join(" ");

  const sentence = (wordCount?: number): string =>
    builders
      .sentence(wordCount)
      .map((_, idx) => (idx === 0 ? capitalizedWord() : word()))
      .join(" ") + ".";

  const paragraph = (sentenceCount?: number): string =>
    builders.paragraph(sentenceCount).map(sentence).join(" ");

  const paragraphs = (count: number): Array<string> =>
    emptyArray(count).map(() => paragraph());

  return {
    title,
    sentence,
    paragraph,
    paragraphs,
  };
}

export const defaultOptions: GeneratorOptions = {
  sentenceWordRange: { min: 3, max: 10 },
  paragraphSentenceRange: { min: 3, max: 8 },
  titleWordRange: { min: 1, max: 4 },
};
