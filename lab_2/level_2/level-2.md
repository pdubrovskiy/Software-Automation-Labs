# Automated Tests for ShareLane Website

## Overview

Write automated tests for ShareLane website (https://www.sharelane.com/cgi-bin/main.py) using Selenium WebDriver. The test suite should include at least 10 test cases with a mix of:

- Data-driven tests
- Positive test scenarios
- Negative test scenarios

Note: The website contains intentional bugs for testing purposes.

## Prerequisites

- Node.js (v18 or higher)
- Chrome browser
- ChromeDriver

## Installation

1. Install dependencies:
```bash
npm install
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run individual test suites

- Registration tests:
```bash
npm run test:registration
```

- Login tests:
```bash
npm run test:login
```

- Shopping Cart tests:
```bash
npm run test:cart
```

- Search tests:
```bash
npm run test:search
```

## Test Structure

The tests are organized in the following directory structure:

```
src/
  tests/
    registration/
    login/
    cart/
    search/
  utils/
    test-setup.ts
    error-messages.ts
```

Each test suite is designed to test specific functionality of the ShareLane website, using Selenium WebDriver for browser automation. The architecture includes:

- Organized test structure by feature
- Multiple test runner files
- Custom error messages instead of system errors
- Proper test architecture and organization
- Data-driven test implementation
