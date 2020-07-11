export interface Vocabulary {
  nouns: Array<string>;
  adjectives: Array<string>;
  verbs: Array<string>;
}

const exampleVocabulary: Vocabulary = {
  nouns: ["banana", "orange", "apple"],
  adjectives: ["slippery", "peeled"],
  verbs: ["nibble", "scarf", "peel"],
};

export default exampleVocabulary;
