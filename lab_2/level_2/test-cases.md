# ShareLane Website Test Cases

## Registration Flow

### TC001: Successful User Registration (Positive)
- **Precondition**: User is on the registration page
- **Steps**:
  1. Enter valid ZIP code (5 digits)
  2. Click 'Continue'
  3. Fill in all required fields with valid data:
     - First name: "John"
     - Last name: "Doe"
     - Email: "john.doe@example.com"
     - Password: "password123"
     - Confirm password: "password123"
  4. Click 'Register'
- **Expected Result**: User is successfully registered and redirected to confirmation page

### TC002: ZIP Code Validation - Data Driven (Negative)
- **Precondition**: User is on the registration page
- **Test Data**:
  - "1234" (4 digits)
  - "123456" (6 digits)
  - "abcde" (letters)
  - "12.34" (special characters)
  - "" (empty)
- **Steps**:
  1. Enter test data in ZIP code field
  2. Click 'Continue'
- **Expected Result**: Error message displayed for invalid ZIP code format

### TC003: Password Mismatch (Negative)
- **Precondition**: User is on the registration form
- **Steps**:
  1. Enter valid ZIP code
  2. Fill in all fields with valid data except:
     - Password: "password123"
     - Confirm password: "password124"
  3. Click 'Register'
- **Expected Result**: Error message about password mismatch

### TC004: Email Format Validation (Data Driven)
- **Precondition**: User is on the registration form
- **Test Data**:
  - "test@example.com" (valid)
  - "test.example.com" (no @)
  - "@example.com" (no local part)
  - "test@" (no domain)
  - "test@@example.com" (multiple @)
- **Steps**:
  1. Complete registration form with test email
  2. Click 'Register'
- **Expected Result**: Accept valid email, reject invalid formats

## Shopping Flow

### TC005: Add Book to Cart (Positive)
- **Precondition**: User is logged in
- **Steps**:
  1. Navigate to book listing
  2. Click on a book title
  3. Enter quantity: 1
  4. Click 'Add to Cart'
- **Expected Result**: Book successfully added to cart

### TC006: Quantity Validation (Data Driven)
- **Precondition**: User is on book details page
- **Test Data**:
  - "0" (zero)
  - "-1" (negative)
  - "999999" (very large)
  - "abc" (non-numeric)
  - "" (empty)
- **Steps**:
  1. Enter test quantity
  2. Click 'Add to Cart'
- **Expected Result**: Only accept valid positive integers

### TC007: Search Functionality (Positive)
- **Precondition**: User is on main page
- **Steps**:
  1. Enter valid book title in search field
  2. Click 'Search'
- **Expected Result**: Relevant search results displayed

### TC008: Shopping Cart Total Calculation
- **Precondition**: User has empty cart
- **Steps**:
  1. Add multiple books with different quantities
  2. Verify total calculation
  3. Update quantities
  4. Verify updated total
- **Expected Result**: Cart total correctly reflects items and quantities

### TC009: Checkout Process (Positive)
- **Precondition**: User is logged in with items in cart
- **Steps**:
  1. Go to shopping cart
  2. Click 'Proceed to Checkout'
  3. Fill in shipping information
  4. Confirm order
- **Expected Result**: Order successfully placed

### TC010: Login Authentication (Data Driven)
- **Precondition**: User is on login page
- **Test Data Combinations**:
  1. Valid email/Valid password
  2. Valid email/Invalid password
  3. Invalid email/Valid password
  4. Empty email/Empty password
- **Steps**:
  1. Enter email and password
  2. Click 'Login'
- **Expected Result**: Only valid credentials allow access

### TC011: Session Management
- **Precondition**: User is logged in
- **Steps**:
  1. Perform actions (add to cart, update profile)
  2. Leave site idle for 30 minutes
  3. Attempt to perform authenticated action
- **Expected Result**: Session expires after timeout

### TC012: Cross-browser Compatibility
- **Precondition**: Test environment setup
- **Test Browsers**:
  - Chrome
  - Firefox
  - Safari
  - Edge
- **Steps**:
  1. Execute core functions on each browser:
     - Registration
     - Login
     - Search
     - Cart operations
- **Expected Result**: Consistent behavior across browsers
