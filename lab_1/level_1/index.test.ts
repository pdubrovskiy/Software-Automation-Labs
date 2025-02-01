import { Fraction } from "./index";

describe("Fraction", () => {
  let fraction: Fraction;
  let fraction1: Fraction;
  let fraction2: Fraction;
  let fraction3: Fraction;

  beforeEach(() => {
    fraction = new Fraction(1, 2);
    fraction1 = new Fraction(2, 4);
    fraction2 = new Fraction(-1, 2);
    fraction3 = new Fraction(1, -2);
  });

  describe("Constructor", () => {
    it("positive: creates fraction with given values", () => {
      expect(fraction.toString()).toBe("1/2");
    });

    it("negative: throws error when denominator is zero", () => {
      expect(() => new Fraction(1, 0)).toThrow("Denominator cannot be zero");
    });

    it("positive: reduces fraction on creation", () => {
      expect(fraction1.toString()).toBe("1/2");
    });

    it("positive: handles negative numbers", () => {
      expect(fraction2.toString()).toBe("-1/2");
      expect(fraction3.toString()).toBe("-1/2");
    });
  });

  describe("Static Factory Methods", () => {
    describe("fromWhole", () => {
      it("positive: creates fraction from whole number", () => {
        const fraction = Fraction.fromWhole(5);

        expect(fraction.toString()).toBe("5/1");
      });

      it("negative: handles non-integer input", () => {
        const fraction = Fraction.fromWhole(5.5);

        expect(fraction.toString()).toBe("11/2");
      });
    });

    describe("fromString", () => {
      it("positive: creates fraction from valid string", () => {
        const fraction = Fraction.fromString("3/4");

        expect(fraction.toString()).toBe("3/4");
      });

      it("negative: throws error for invalid string format", () => {
        expect(() => Fraction.fromString("invalid")).toThrow();
      });
    });

    it("positive: creates and reduces fraction from string", () => {
      const fraction = Fraction.fromString("4/6");

      expect(fraction.toString()).toBe("2/3");
    });
  });

  describe("Arithmetic operations", () => {
    describe("add", () => {
      it("positive: adds two fractions correctly", () => {
        const f1 = new Fraction(1, 2);
        const f2 = new Fraction(1, 3);
        const result = Fraction.add(f1, f2);

        expect(result.toString()).toBe("5/6");
      });

      it("negative: handles addition with invalid fraction", () => {
        const f1 = new Fraction(1, 2);

        expect(() => Fraction.add(f1, undefined as any)).toThrow();
      });
    });

    it("positive: adds multiple fractions", () => {
      const f1 = new Fraction(1, 2);
      const f2 = new Fraction(1, 3);
      const f3 = new Fraction(1, 4);
      const result = Fraction.add(f1, f2, f3);

      expect(result.toString()).toBe("13/12");
    });

    it("positive: handles empty array in add", () => {
      const result = Fraction.add();

      expect(result.toString()).toBe("0/1");
    });

    describe("subtract", () => {
      it("positive: subtracts fractions correctly", () => {
        const f1 = new Fraction(3, 4);
        const f2 = new Fraction(1, 4);
        const result = f1.subtract(f2);

        expect(result.toString()).toBe("1/2");
      });

      it("negative: handles subtraction with invalid fraction", () => {
        const f1 = new Fraction(1, 2);

        expect(() => f1.subtract(undefined as any)).toThrow();
      });
    });

    describe("multiply", () => {
      it("positive: multiplies fractions correctly", () => {
        const f1 = new Fraction(1, 2);
        const f2 = new Fraction(2, 3);
        const result = Fraction.multiply(f1, f2);

        expect(result.toString()).toBe("1/3");
      });

      it("negative: handles multiplication with invalid fraction", () => {
        const f1 = new Fraction(1, 2);

        expect(() => Fraction.multiply(f1, undefined as any)).toThrow();
      });
    });

    it("positive: multiplies multiple fractions", () => {
      const f1 = new Fraction(1, 2);
      const f2 = new Fraction(2, 3);
      const f3 = new Fraction(3, 4);
      const result = Fraction.multiply(f1, f2, f3);

      expect(result.toString()).toBe("1/4");
    });

    it("positive: handles empty array in multiply", () => {
      const result = Fraction.multiply();

      expect(result.toString()).toBe("1/1");
    });

    describe("divide", () => {
      it("positive: divides fractions correctly", () => {
        const f1 = new Fraction(1, 2);
        const f2 = new Fraction(1, 4);
        const result = f1.divide(f2);

        expect(result.toString()).toBe("2/1");
      });

      it("negative: throws error when dividing by zero", () => {
        const f1 = new Fraction(1, 2);
        const f2 = new Fraction(0, 1);

        expect(() => f1.divide(f2)).toThrow("Cannot divide by zero");
      });
    });
  });

  describe("Array Operations", () => {
    describe("modifyEvenIndexedElements", () => {
      it("positive: modifies even-indexed elements correctly", () => {
        const fractions = [
          new Fraction(1, 2),
          new Fraction(1, 3),
          new Fraction(1, 4),
          new Fraction(1, 5),
        ];
        Fraction.modifyEvenIndexedElements(fractions);

        expect(fractions[0].toString()).toBe("5/6");
        expect(fractions[2].toString()).toBe("9/20");
      });

      it("negative: handles empty array", () => {
        const fractions: Array<Fraction> = [];

        expect(() =>
          Fraction.modifyEvenIndexedElements(fractions)
        ).not.toThrow();
      });
    });

    it("positive: handles array with odd length", () => {
      const fractions = [
        new Fraction(1, 2),
        new Fraction(1, 3),
        new Fraction(1, 4),
      ];

      Fraction.modifyEvenIndexedElements(fractions);

      expect(fractions[0].toString()).toBe("5/6");
      expect(fractions[1].toString()).toBe("1/3");
      expect(fractions[2].toString()).toBe("1/4");
    });
  });

  describe("Utility Methods", () => {
    describe("clone", () => {
      it("positive: clones fraction correctly", () => {
        const original = new Fraction(3, 4);
        const clone = original.clone();

        expect(clone.toString()).toBe("3/4");
      });

      it("negative: ensures clone is independent of original", () => {
        const original = new Fraction(3, 4);
        const clone = original.clone();
        original.divide(new Fraction(1, 2)); // Modify original

        expect(clone.toString()).toBe("3/4"); // Clone should remain unchanged
      });
    });
  });
});
