# ShareLane Website Test Cases

## Registration Flow Tests (Implemented)

### TC001: Successful User Registration (Positive)
- **Precondition**: User is on the registration page
- **Steps**:
  1. Enter valid ZIP code (5 digits)
  2. Click 'Continue'
  3. Fill in all required fields with valid data:
     - First name: "test"
     - Last name: "test"
     - Email: "test@test.test"
     - Password: "12345"
     - Confirm password: "12345"
  4. Click 'Register'
- **Expected Result**: User is successfully registered and confirmation message is displayed
- **Implementation**: `testValidRegistration()`

### TC002: Empty ZIP Code Validation (Negative)
- **Precondition**: User is on the registration page
- **Steps**:
  1. Leave ZIP code field empty
  2. Click 'Continue'
- **Expected Result**: Error message "Oops, error on page. ZIP code should have 5 digits"
- **Implementation**: `testEmptyZipCode()`

### TC003: Invalid ZIP Code - Too Long (Negative)
- **Precondition**: User is on the registration page
- **Steps**:
  1. Enter "123456" (6 digits) in ZIP code field
  2. Click 'Continue'
- **Expected Result**: Error message about invalid ZIP code format
- **Implementation**: `testInvalidZipCode()`

### TC004: Valid ZIP Code Navigation (Positive)
- **Precondition**: User is on the registration page
- **Steps**:
  1. Enter "12345" in ZIP code field
  2. Click 'Continue'
- **Expected Result**: User is redirected to registration form page
- **Implementation**: `testValidZipCode()`

### TC005: Empty Registration Form Submission (Negative)
- **Precondition**: User is on the registration form (ZIP code validated)
- **Steps**:
  1. Leave all fields empty
  2. Click 'Register'
- **Expected Result**: Error message "Oops, error on page. Some of your fields have invalid data or email was previously used"
- **Implementation**: `testEmptyRegistration()`

### TC006: Invalid Email Format (Negative)
- **Precondition**: User is on the registration form (ZIP code validated)
- **Steps**:
  1. Fill all fields with valid data
  2. Enter invalid email "testtest.test" (without @)
  3. Click 'Register'
- **Expected Result**: Error message "Email address is not valid"
- **Implementation**: `testInvalidEmailFormat()`

### TC007: Missing First Name (Negative)
- **Precondition**: User is on the registration form (ZIP code validated)
- **Steps**:
  1. Fill all fields except first name
  2. Leave first name empty
  3. Click 'Register'
- **Expected Result**: Error message "First name is required"
- **Implementation**: `testRegistrationForm()` with test data index 2

### TC008: Password Mismatch (Negative)
- **Precondition**: User is on the registration form (ZIP code validated)
- **Steps**:
  1. Fill all fields with valid data
  2. Enter "pass123" in password field
  3. Enter "pass124" in confirm password field
  4. Click 'Register'
- **Expected Result**: Error message "Passwords don't match"
- **Implementation**: `testRegistrationForm()` with test data index 4

### TC009: Invalid ZIP Code - Too Short (Negative)
- **Precondition**: User is on the registration page
- **Steps**:
  1. Enter "1234" (4 digits) in ZIP code field
  2. Click 'Continue'
- **Expected Result**: Error message "Oops, error on page. ZIP code should have 5 digits"
- **Implementation**: `testRegistrationForm()` with test data index 1

### TC010: Complete Valid Registration Flow (Positive)
- **Precondition**: User is on the registration page
- **Steps**:
  1. Enter valid ZIP code "12345"
  2. Click 'Continue'
  3. Fill in registration form:
     - First name: "John"
     - Last name: "Doe"
     - Email: "john.doe@example.com"
     - Password: "password123"
     - Confirm password: "password123"
  4. Click 'Register'
- **Expected Result**: Account is successfully created with confirmation message
- **Implementation**: `testRegistrationForm()` with test data index 0

## Test Implementation Details

### Test Setup
- Each test starts with a clean browser session
- Navigation to registration page is handled in `setupTest()`
- Tests use explicit waits for element visibility
- Error messages are validated for exact text matches
- Success cases verify confirmation message presence

### Error Handling
- Comprehensive error message checking across multiple possible selectors
- Explicit waits for page transitions and element visibility
- Clear error messages for test failures
- Proper cleanup in tearDown

### Data Driven Testing
- Uses Jest's `it.each` for multiple test scenarios
- Structured test data in `RegistrationData` interface
- Reusable test methods for common functionality

## Future Test Cases (Not Implemented)

### Shopping Flow
- Add to cart functionality
- Quantity validation
- Search functionality
- Cart calculations
- Checkout process

### Authentication
- Login functionality
- Session management
- Cross-browser compatibility
