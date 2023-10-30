
import { getMonth } from "./index"

describe('Date helper', () => {
  describe('When getMonth is called', () => {
    it("returns 'janvier' for date 2022-01-01", () => {
      // Arrange: Prepare the input date
      const date = new Date('2022-01-01');

      // Act: Call the getMonth function
      const result = getMonth(date);

      // Assert: Check if the result matches the expected value
      expect(result).toBe('janvier');
    });

    it("returns 'juillet' for date 2022-07-08", () => {
      // Arrange: Prepare the input date
      const date = new Date('2022-07-08');

      // Act: Call the getMonth function
      const result = getMonth(date);

      // Assert: Check if the result matches the expected value
      expect(result).toBe('juillet');
    });
  });
});
