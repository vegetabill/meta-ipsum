# meta-ipsum

Framework for building [Lorem Ipsum](https://en.wikipedia.org/wiki/Lorem_ipsum) generators using your own custom vocabularly.

## Example

```js
const { createGenerator } = require("meta-ipsum");

const vocab = new Set(["pomeranian", "papillon", "akita", "shiba inu"]);

const generator = createGenerator(vocab);

console.log(generator.sentence());
// Shiba inu papillon pomeranian akita shiba inu papillon akita pomeranian.
```

## Problem?

Report bugs or suggestions on [GitHub issues](https://github.com/vegetabill/meta-ipsum/issues)
