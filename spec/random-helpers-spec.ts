import { randomWithin } from "../lib/random-helpers";

function repeatTimes(times: number, cb: Function) {
  let counter = 1;
  while (counter <= times) {
    cb();
    counter++;
  }
}

describe("random-helpers", () => {
  describe("randomWithin(range)", () => {
    it("should always return random numbers within the range", () => {
      const range = {
        min: 3,
        max: 10,
      };
      repeatTimes(100, () => {
        const number = randomWithin(range);
        expect(number).toBeGreaterThanOrEqual(range.min);
        expect(number).toBeLessThanOrEqual(range.max);
      });
    });
  });
});
