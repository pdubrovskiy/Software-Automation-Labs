import { Fraction } from "./index";

describe("Fraction", () => {
  describe("Constructor", () => {
    // Positive test
    test("creates fraction with given values", () => {
      const fraction = new Fraction(1, 2);
      expect(fraction.toString()).toBe("1/2");
    });

    // Negative test
    test("throws error when denominator is zero", () => {
      expect(() => new Fraction(1, 0)).toThrow("Denominator cannot be zero");
    });

    test("reduces fraction on creation", () => {
      const fraction = new Fraction(2, 4);
      expect(fraction.toString()).toBe("1/2");
    });

    test("handles negative numbers", () => {
      const fraction1 = new Fraction(-1, 2);
      const fraction2 = new Fraction(1, -2);
      const fraction3 = new Fraction(-1, -2);

      expect(fraction1.toString()).toBe("-1/2");
      expect(fraction2.toString()).toBe("-1/2");
      expect(fraction3.toString()).toBe("1/2");
    });
  });

  describe("Static Factory Methods", () => {
    describe("fromWhole", () => {
      // Positive test
      test("creates fraction from whole number", () => {
        const fraction = Fraction.fromWhole(5);
        expect(fraction.toString()).toBe("5/1");
      });

      // Negative test
      test("handles non-integer input", () => {
        const fraction = Fraction.fromWhole(5.5);
        expect(fraction.toString()).toBe("11/2"); // Decimal number should be converted to proper fraction
      });
    });

    describe("fromString", () => {
      // Positive test
      test("creates fraction from valid string", () => {
        const fraction = Fraction.fromString("3/4");
        expect(fraction.toString()).toBe("3/4");
      });

      // Negative test
      test("throws error for invalid string format", () => {
        expect(() => Fraction.fromString("invalid")).toThrow();
      });
    });

    test("creates and reduces fraction from string", () => {
      const fraction = Fraction.fromString("4/6");
      expect(fraction.toString()).toBe("2/3");
    });
  });

  describe("Arithmetic operations", () => {
    describe("add", () => {
      // Positive test
      test("adds two fractions correctly", () => {
        const f1 = new Fraction(1, 2);
        const f2 = new Fraction(1, 3);
        const result = Fraction.add(f1, f2);
        expect(result.toString()).toBe("5/6");
      });

      // Negative test
      test("handles addition with invalid fraction", () => {
        const f1 = new Fraction(1, 2);
        expect(() => Fraction.add(f1, undefined as any)).toThrow();
      });
    });

    test("adds multiple fractions", () => {
      const f1 = new Fraction(1, 2);
      const f2 = new Fraction(1, 3);
      const f3 = new Fraction(1, 4);
      const result = Fraction.add(f1, f2, f3);
      expect(result.toString()).toBe("13/12");
    });

    test("handles empty array in add", () => {
      const result = Fraction.add();
      expect(result.toString()).toBe("0/1");
    });

    describe("subtract", () => {
      // Positive test
      test("subtracts fractions correctly", () => {
        const f1 = new Fraction(3, 4);
        const f2 = new Fraction(1, 4);
        const result = f1.subtract(f2);
        expect(result.toString()).toBe("1/2");
      });

      // Negative test
      test("handles subtraction with invalid fraction", () => {
        const f1 = new Fraction(1, 2);
        expect(() => f1.subtract(undefined as any)).toThrow();
      });
    });

    describe("multiply", () => {
      // Positive test
      test("multiplies fractions correctly", () => {
        const f1 = new Fraction(1, 2);
        const f2 = new Fraction(2, 3);
        const result = Fraction.multiply(f1, f2);
        expect(result.toString()).toBe("1/3");
      });

      // Negative test
      test("handles multiplication with invalid fraction", () => {
        const f1 = new Fraction(1, 2);
        expect(() => Fraction.multiply(f1, undefined as any)).toThrow();
      });
    });

    test("multiplies multiple fractions", () => {
      const f1 = new Fraction(1, 2);
      const f2 = new Fraction(2, 3);
      const f3 = new Fraction(3, 4);
      const result = Fraction.multiply(f1, f2, f3);
      expect(result.toString()).toBe("1/4");
    });

    test("handles empty array in multiply", () => {
      const result = Fraction.multiply();
      expect(result.toString()).toBe("1/1");
    });

    describe("divide", () => {
      // Positive test
      test("divides fractions correctly", () => {
        const f1 = new Fraction(1, 2);
        const f2 = new Fraction(1, 4);
        const result = f1.divide(f2);
        expect(result.toString()).toBe("2/1");
      });

      // Negative test
      test("throws error when dividing by zero", () => {
        const f1 = new Fraction(1, 2);
        const f2 = new Fraction(0, 1);
        expect(() => f1.divide(f2)).toThrow("Cannot divide by zero");
      });
    });
  });

  describe("Array Operations", () => {
    describe("modifyEvenIndexedElements", () => {
      // Positive test
      test("modifies even-indexed elements correctly", () => {
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

      // Negative test
      test("handles empty array", () => {
        const fractions: Fraction[] = [];
        expect(() =>
          Fraction.modifyEvenIndexedElements(fractions)
        ).not.toThrow();
      });
    });

    test("handles array with odd length", () => {
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
      // Positive test
      test("clones fraction correctly", () => {
        const original = new Fraction(3, 4);
        const clone = original.clone();
        expect(clone.toString()).toBe("3/4");
      });

      // Negative test
      test("ensures clone is independent of original", () => {
        const original = new Fraction(3, 4);
        const clone = original.clone();
        original.divide(new Fraction(1, 2)); // Modify original
        expect(clone.toString()).toBe("3/4"); // Clone should remain unchanged
      });
    });
  });
});
