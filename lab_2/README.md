# Automated Tests for The Internet Website

## Overview

Write automated tests for The Internet website (https://the-internet.herokuapp.com) using TestNG and Selenium WebDriver. The tests should cover the following features:

- Basic Authentication
- Dropdown
- Dynamic Controls
- Exit Intent
- Form Authentication
- Frames
- JQuery UI Menus
- JavaScript Alerts
- Multiple Windows

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

- Basic Authentication tests:
```bash
npm run test:auth
```

- Dropdown tests:
```bash
npm run test:dropdown
```

- Dynamic Controls tests:
```bash
npm run test:dynamic-controls
```

- Exit Intent tests:
```bash
npm run test:exit-intent
```

- Form Authentication tests:
```bash
npm run test:form-auth
```

- Frames tests:
```bash
npm run test:frames
```

- JQuery UI Menu tests:
```bash
npm run test:jquery-menu
```

- JavaScript Alerts tests:
```bash
npm run test:js-alerts
```

- Multiple Windows tests:
```bash
npm run test:multiple-windows
```

## Test Structure

The tests are organized by feature in the following directory structure:

```
src/
  tests/
    auth/
    dropdown/
    dynamicControls/
    exitIntent/
    formAuth/
    frames/
    jqueryMenu/
    jsAlerts/
    multipleWindows/
  utils/
    test-setup.ts
```

Each test suite focuses on testing specific functionality of The Internet website, using Selenium WebDriver for browser automation and Jest as the testing framework. 