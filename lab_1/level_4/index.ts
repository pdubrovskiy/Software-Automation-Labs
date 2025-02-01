export class NumberStorage {
  private numbers: Set<number>;

  constructor() {
    this.numbers = new Set<number>();
  }

  public add(number: number): void {
    this.numbers.add(number);
  }

  public remove(number: number): void {
    this.numbers.delete(number);
  }

  public findClosest(target: number): number | null {
    if (this.numbers.size === 0) {
      return null;
    }

    let closestNumber = Array.from(this.numbers)[0];
    let minDifference = Math.abs(target - closestNumber);

    for (const num of this.numbers) {
      const currentDifference = Math.abs(target - num);
      if (currentDifference < minDifference) {
        minDifference = currentDifference;
        closestNumber = num;
      }
    }

    return closestNumber;
  }

  public getNumbers(): Array<number> {
    return Array.from(this.numbers);
  }
}
