export interface LoremIpsumGenerator {
  title: (wordCount?: number) => string;
  sentence: (wordCount?: number) => string;
  paragraph: (sentenceCount?: number) => string;
  paragraphs: (count: number) => Array<string>;
}

export interface Range {
  readonly min: number;
  readonly max: number;
}

export interface GeneratorOptions {
  sentenceWordRange: Range;
  paragraphSentenceRange: Range;
  titleWordRange: Range;
}
