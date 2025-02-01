export class Fraction {
  private numerator: number;
  private denominator: number;

  constructor(numerator: number = 0, denominator: number = 1) {
    if (denominator === 0) {
      throw new Error("Denominator cannot be zero");
    }
    this.numerator = numerator;
    this.denominator = denominator;
    this.reduce();
  }

  // Additional constructors as static factory methods
  public static fromWhole(whole: number): Fraction {
    return new Fraction(whole, 1);
  }

  public static fromString(fractionStr: string): Fraction {
    const [numerator, denominator] = fractionStr.split("/").map(Number);

    return new Fraction(numerator, denominator);
  }

  public static add(...fractions: Array<Fraction>): Fraction {
    if (fractions.length === 0) {
      return new Fraction(0, 1);
    }

    let result = fractions[0];
    for (let i = 1; i < fractions.length; i++) {
      const f = fractions[i];
      const newNumerator =
        result.numerator * f.denominator + f.numerator * result.denominator;
      const newDenominator = result.denominator * f.denominator;
      result = new Fraction(newNumerator, newDenominator);
    }

    return result;
  }

  public static multiply(...fractions: Array<Fraction>): Fraction {
    if (fractions.length === 0) {
      return new Fraction(1, 1);
    }

    let result = fractions[0];
    for (let i = 1; i < fractions.length; i++) {
      const f = fractions[i];
      const newNumerator = result.numerator * f.numerator;
      const newDenominator = result.denominator * f.denominator;
      result = new Fraction(newNumerator, newDenominator);
    }

    return result;
  }

  public reduce(): void {
    const gcd = Fraction.gcd(this.numerator, this.denominator);
    this.numerator = this.numerator / gcd;
    this.denominator = this.denominator / gcd;
    if (this.denominator < 0) {
      this.numerator = -this.numerator;
      this.denominator = -this.denominator;
    }
  }

  public subtract(other: Fraction): Fraction {
    const newNumerator =
      this.numerator * other.denominator - other.numerator * this.denominator;
    const newDenominator = this.denominator * other.denominator;

    return new Fraction(newNumerator, newDenominator);
  }

  public divide(other: Fraction): Fraction {
    if (other.numerator === 0) {
      throw new Error("Cannot divide by zero");
    }

    return new Fraction(
      this.numerator * other.denominator,
      this.denominator * other.numerator
    );
  }

  public toString(): string {
    return `${this.numerator}/${this.denominator}`;
  }

  public clone(): Fraction {
    return new Fraction(this.numerator, this.denominator);
  }

  private static gcd(a: number, b: number): number {
    return b === 0 ? Math.abs(a) : Fraction.gcd(b, a % b);
  }

  public static modifyEvenIndexedElements(fractions: Array<Fraction>): void {
    for (let i = 0; i < fractions.length - 1; i += 2) {
      fractions[i] = Fraction.add(fractions[i], fractions[i + 1]);
    }
  }
}
