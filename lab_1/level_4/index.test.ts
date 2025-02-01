import { NumberStorage } from "./index";

describe("NumberStorage", () => {
  let storage: NumberStorage;

  beforeEach(() => {
    storage = new NumberStorage();
  });

  describe("add", () => {
    it("positive: should add a number to the storage", () => {
      storage.add(5);

      expect(storage.getNumbers()).toContain(5);
    });

    it("positive: should not add duplicate numbers", () => {
      storage.add(5);
      storage.add(5);

      expect(storage.getNumbers()).toHaveLength(1);
      expect(storage.getNumbers()).toContain(5);
    });
  });

  describe("remove", () => {
    it("positive: should remove an existing number", () => {
      storage.add(5);
      storage.remove(5);

      expect(storage.getNumbers()).not.toContain(5);
    });

    it("negative: should handle removing non-existent number", () => {
      storage.add(5);
      storage.remove(10);

      expect(storage.getNumbers()).toContain(5);
      expect(storage.getNumbers()).toHaveLength(1);
    });
  });

  describe("findClosest", () => {
    beforeEach(() => {
      storage.add(1);
      storage.add(5);
      storage.add(10);
    });

    it("positive: should find exact match when present", () => {
      const closest = storage.findClosest(5);

      expect(closest).toBe(5);
    });

    it("positive: should find closest number when no exact match", () => {
      const closest = storage.findClosest(4);

      expect(closest).toBe(5);
    });

    it("positive: should handle ties by returning one of the closest numbers", () => {
      storage.add(6);
      const closest = storage.findClosest(5.5);

      // Either 5 or 6 would be valid as they're equidistant from 5.5
      const distance = Math.abs(5.5 - (closest as number));
      expect(distance).toBe(0.5);
    });

    it("positive: should handle negative numbers", () => {
      storage.add(-5);
      const closest = storage.findClosest(-3);

      expect(closest).toBe(-5);
    });

    it("negative: should return null for empty storage", () => {
      const emptyStorage = new NumberStorage();
      const closest = emptyStorage.findClosest(5);

      expect(closest).toBeNull();
    });
  });

  describe("getNumbers", () => {
    it("positive: should return all numbers in storage", () => {
      storage.add(1);
      storage.add(2);
      storage.add(3);

      const numbers = storage.getNumbers();

      expect(numbers).toHaveLength(3);
      expect(numbers).toContain(1);
      expect(numbers).toContain(2);
      expect(numbers).toContain(3);
    });

    it("positive: should return empty array for empty storage", () => {
      const numbers = storage.getNumbers();

      expect(numbers).toHaveLength(0);
    });
  });
});
