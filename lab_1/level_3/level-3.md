# Student Management System

## Overview

Create a class **Student** that manages student information with the following functionality:
- Get student name via `getName()`
- Get student course via `getCourse()`

## Core Operations

### Student Filtering
Implement method `printStudents(LinkedList students, int course)` that:
- Takes a list of students and course number
- Prints names of students enrolled in the specified course

### Set Operations
Implement methods for working with student sets:
- `union(LinkedList set1, LinkedList set2)`: combines two sets of students
- `intersect(LinkedList set1, LinkedList set2)`: finds common students between two sets

## Sorting Implementation

Implement the `Comparable` interface to enable sorting students by course number:
- Students should be sortable by their course number
- Implementation should be compatible with `TreeSet`

## Testing Requirements

1. Create at least 10 Student objects for testing
2. Add students to a LinkedList
3. Test the filtering method with different course numbers
4. Create and test set operations with pre-filled sets
5. Implement a helper method to display set elements
6. Verify sorting functionality using TreeSet
