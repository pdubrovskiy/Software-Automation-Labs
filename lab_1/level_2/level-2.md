# User Authentication Validator

## Overview

Create a static method that validates user authentication data with the following parameters:
- `login`
- `password`
- `confirmPassword`

## Requirements

### Login Requirements
- Must contain only Latin letters, numbers, and underscores
- Length must be less than 20 characters
- If requirements are not met, throw `WrongLoginException`

### Password Requirements
- Must contain only Latin letters, numbers, and underscores
- Length must be less than 20 characters
- `password` must match `confirmPassword`
- If requirements are not met, throw `WrongPasswordException`

## Custom Exceptions

Create two custom exception classes:
1. `WrongLoginException`
2. `WrongPasswordException`

Each exception class should have:
- Default constructor
- Constructor that accepts an error message and passes it to the parent Exception class

## Method Implementation

- Exception handling should be done within the method
- Use multiple catch blocks for different exceptions
- Return `true` if all validations pass, `false` otherwise
