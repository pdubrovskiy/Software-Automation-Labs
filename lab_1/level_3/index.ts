import { IComparable } from "./interfaces/comparable.interface";

export class Student implements IComparable<Student> {
  constructor(private name: string, private course: number) {}

  public getName(): string {
    return this.name;
  }

  public getCourse(): number {
    return this.course;
  }

  public compareTo(other: Student): number {
    return this.course - other.course;
  }
}

export class StudentManager {
  public static printStudents(students: Array<Student>, course: number): void {
    students
      .filter((student) => student.getCourse() === course)
      .forEach((student) => console.log(student.getName()));
  }

  public static union(
    set1: Array<Student>,
    set2: Array<Student>
  ): Array<Student> {
    const unionSet = new Set<string>();
    const result: Array<Student> = [];

    [...set1, ...set2].forEach((student) => {
      const key = `${student.getName()}-${student.getCourse()}`;
      if (!unionSet.has(key)) {
        unionSet.add(key);
        result.push(student);
      }
    });

    return result;
  }

  public static intersect(
    set1: Array<Student>,
    set2: Array<Student>
  ): Array<Student> {
    const set1Map = new Map<string, Student>();
    const result: Array<Student> = [];

    set1.forEach((student) => {
      const key = `${student.getName()}-${student.getCourse()}`;
      set1Map.set(key, student);
    });

    set2.forEach((student) => {
      const key = `${student.getName()}-${student.getCourse()}`;
      if (set1Map.has(key)) {
        result.push(student);
      }
    });

    return result;
  }

  public static displaySet(students: Array<Student>): Array<string> {
    return students.map(
      (student) => `${student.getName()} (Course: ${student.getCourse()})`
    );
  }
}
