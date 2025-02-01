import { Student, StudentManager } from "./index";

describe("Student", () => {
  let student: Student;
  let student1: Student;
  let student2: Student;

  beforeEach(() => {
    student = new Student("John Doe", 2);
    student1 = new Student("John", 2);
    student2 = new Student("Jane", 3);
  });

  describe("getName", () => {
    it("positive: should return correct student name", () => {
      const name = student.getName();

      expect(name).toBe("John Doe");
    });

    it("negative: should return empty name for empty string input", () => {
      const emptyStudent = new Student("", 1);
      const name = emptyStudent.getName();

      expect(name).toBe("");
    });
  });

  describe("getCourse", () => {
    it("positive: should return correct course number", () => {
      const course = student.getCourse();

      expect(course).toBe(2);
    });

    it("negative: should handle invalid course number", () => {
      const invalidStudent = new Student("Test", -1);
      const course = invalidStudent.getCourse();

      expect(course).toBe(-1);
    });
  });

  describe("compareTo", () => {
    it("positive: should correctly compare students with different courses", () => {
      const compareResult = student1.compareTo(student2);

      expect(compareResult).toBeLessThan(0);
    });

    it("negative: should handle comparison with same course", () => {
      const sameStudent = new Student("Jane", 2);
      const compareResult = student1.compareTo(sameStudent);

      expect(compareResult).toBe(0);
    });
  });
});

describe("StudentManager", () => {
  let students: Array<Student>;
  let consoleSpy: jest.SpyInstance;
  let set1: Array<Student>;
  let set2: Array<Student>;

  beforeAll(() => {
    consoleSpy = jest.spyOn(console, "log").mockImplementation();
  });

  afterAll(() => {
    consoleSpy.mockRestore();
  });

  beforeEach(() => {
    students = [
      new Student("John", 1),
      new Student("Jane", 2),
      new Student("Bob", 2),
      new Student("Alice", 3),
    ];

    set1 = [new Student("John", 1), new Student("Jane", 2)];
    set2 = [new Student("Jane", 2), new Student("Bob", 3)];

    consoleSpy.mockClear();
  });

  describe("printStudents", () => {
    it("positive: should print names of students in specified course", () => {
      StudentManager.printStudents(students, 2);

      expect(consoleSpy).toHaveBeenCalledTimes(2);
      expect(consoleSpy).toHaveBeenNthCalledWith(1, "Jane");
      expect(consoleSpy).toHaveBeenNthCalledWith(2, "Bob");
    });

    it("negative: should not print anything if no students in course", () => {
      StudentManager.printStudents(students, 5);

      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });

  describe("union", () => {
    it("positive: should combine two sets without duplicates", () => {
      const result = StudentManager.union(set1, set2);
      const displayedResult = StudentManager.displaySet(result);

      expect(displayedResult).toEqual(
        expect.arrayContaining([
          "John (Course: 1)",
          "Jane (Course: 2)",
          "Bob (Course: 3)",
        ])
      );
    });

    it("negative: should handle empty sets", () => {
      const result = StudentManager.union([], []);

      expect(result).toHaveLength(0);
    });
  });

  describe("intersect", () => {
    it("positive: should find common students between sets", () => {
      const result = StudentManager.intersect(set1, set2);
      const displayedResult = StudentManager.displaySet(result);

      expect(displayedResult).toEqual(["Jane (Course: 2)"]);
    });

    it("negative: should return empty array for sets with no common elements", () => {
      const uniqueSet = [new Student("Unique", 4)];
      const result = StudentManager.intersect(set1, uniqueSet);

      expect(result).toHaveLength(0);
    });
  });

  describe("displaySet", () => {
    it("positive: should format student information correctly", () => {
      const student = new Student("John", 2);
      const result = StudentManager.displaySet([student]);

      expect(result).toEqual(["John (Course: 2)"]);
    });

    it("negative: should handle empty set", () => {
      const result = StudentManager.displaySet([]);

      expect(result).toEqual([]);
    });
  });
});
