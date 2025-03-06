# End-to-End Tests with Playwright

This directory contains end-to-end tests for the Mindbox Todo application using Playwright.

## Overview

The E2E tests validate the application's functionality from a user's perspective, ensuring that all components work together correctly. These tests complement the unit tests by testing the application as a whole.

## Test Structure

- `pagination.spec.ts`: Tests for the pagination component functionality

## Running Tests

You can run the E2E tests using the following npm scripts:

```bash
# Run all E2E tests
npm run test:e2e

# Run E2E tests with UI mode
npm run test:e2e:ui

# Run E2E tests in debug mode
npm run test:e2e:debug
```

## CI/CD Integration

The E2E tests are integrated into the CI/CD pipeline in `.github/workflows/frontend_tests.yml`. They run after the unit tests and linting have passed.

## Writing New Tests

When writing new E2E tests:

1. Create a new `.spec.ts` file in this directory
2. Follow the Playwright test patterns
3. Focus on user flows and interactions
4. Keep tests independent of each other

## Best Practices

- Use page objects or component fixtures for reusable selectors
- Avoid flaky tests by using proper waiting mechanisms
- Test real user flows rather than implementation details
- Keep tests focused and independent
