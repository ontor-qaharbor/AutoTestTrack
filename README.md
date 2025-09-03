# AutoTestTrack

## Overview

AutoTestTrack is an automated testing framework built with Playwright for modern web application testing. This project provides a structured foundation for creating, managing, and executing end-to-end tests with comprehensive tracking and reporting capabilities.

## Project Purpose

The AutoTestTrack project is designed to:
- Provide automated testing capabilities for web applications
- Implement best practices for test automation using Playwright
- Enable comprehensive test tracking and reporting
- Support cross-browser testing scenarios
- Facilitate continuous integration and deployment workflows

## Key Features

- **Cross-Browser Testing**: Support for Chromium, Firefox, and WebKit browsers
- **Modern Test Framework**: Built on Playwright's robust testing capabilities
- **Test Tracking**: Comprehensive test result tracking and reporting
- **Easy Setup**: Minimal configuration required to get started
- **Scalable Architecture**: Designed to grow with your testing needs

## Technology Stack

- **Testing Framework**: [Playwright](https://playwright.dev/) v1.53.1
- **Runtime**: Node.js
- **Package Manager**: npm
- **Test Runner**: Playwright Test Runner

## Project Structure

```
AutoTestTrack/
├── node_modules/           # Dependencies
├── test-results/          # Test execution results
│   └── .last-run.json    # Last test run metadata
├── tests/                 # Test files directory (empty - ready for your tests)
├── package.json          # Project configuration
├── package-lock.json     # Dependency lock file
└── README.md             # This documentation
```

## Prerequisites

Before running this project, ensure you have:

- Node.js (version 14 or higher)
- npm (Node Package Manager)
- Git (for version control)

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ontor-qaharbor/AutoTestTrack.git
   cd AutoTestTrack
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

## Usage

### Running Tests

Currently, the project has no test files. To run tests once you create them:

```bash
# Run all tests
npx playwright test

# Run tests in headed mode (visible browser)
npx playwright test --headed

# Run tests in a specific browser
npx playwright test --project=chromium

# Run tests with UI mode
npx playwright test --ui
```

### Creating Your First Test

Create a test file in the `tests/` directory:

```javascript
// tests/example.spec.js
import { test, expect } from '@playwright/test';

test('basic test example', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);
});
```

### Configuration

To customize Playwright behavior, create a `playwright.config.js` file:

```javascript
// playwright.config.js
module.exports = {
  testDir: './tests',
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
};
```

## Test Organization

### Recommended Structure

```
tests/
├── e2e/                   # End-to-end tests
│   ├── login.spec.js
│   ├── navigation.spec.js
│   └── checkout.spec.js
├── integration/           # Integration tests
│   ├── api.spec.js
│   └── database.spec.js
├── components/           # Component tests
│   ├── header.spec.js
│   └── footer.spec.js
├── fixtures/             # Test data and fixtures
│   ├── users.json
│   └── products.json
└── utils/                # Test utilities
    ├── helpers.js
    └── constants.js
```

## Best Practices

### Test Writing Guidelines

1. **Use descriptive test names**: Tests should clearly describe what they verify
2. **Follow AAA pattern**: Arrange, Act, Assert
3. **Keep tests independent**: Each test should be able to run in isolation
4. **Use Page Object Model**: For complex applications, organize page interactions
5. **Handle async operations**: Use proper await statements for async operations

### Example Test Pattern

```javascript
import { test, expect } from '@playwright/test';

test.describe('User Authentication', () => {
  test.beforeEach(async ({ page }) => {
    // Setup before each test
    await page.goto('/login');
  });

  test('should login with valid credentials', async ({ page }) => {
    // Arrange
    const email = 'user@example.com';
    const password = 'password123';

    // Act
    await page.fill('[data-testid="email"]', email);
    await page.fill('[data-testid="password"]', password);
    await page.click('[data-testid="login-button"]');

    // Assert
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('[data-testid="user-name"]')).toBeVisible();
  });
});
```

## Reporting

Playwright provides several reporting options:

- **HTML Report**: Comprehensive visual reports
- **JSON Report**: Machine-readable test results
- **JUnit Report**: For CI/CD integration
- **Custom Reports**: Build your own reporting solution

To generate reports:

```bash
npx playwright test --reporter=html
npx playwright test --reporter=json
npx playwright test --reporter=junit
```

## CI/CD Integration

### GitHub Actions Example

```yaml
# .github/workflows/tests.yml
name: Playwright Tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: '18'
    - name: Install dependencies
      run: npm ci
    - name: Install Playwright browsers
      run: npx playwright install --with-deps
    - name: Run tests
      run: npx playwright test
    - name: Upload test results
      uses: actions/upload-artifact@v3
      if: always()
      with:
        name: playwright-report
        path: playwright-report/
```

## Development Workflow

1. **Write Tests**: Create test files in the `tests/` directory
2. **Run Locally**: Execute tests during development
3. **Debug**: Use Playwright's debugging tools
4. **Commit**: Push changes to version control
5. **CI/CD**: Automated testing in pipelines
6. **Review**: Analyze test results and reports

## Debugging

Playwright offers powerful debugging capabilities:

```bash
# Debug mode
npx playwright test --debug

# Headed mode for visual debugging
npx playwright test --headed

# Slow motion for better observation
npx playwright test --headed --slowMo=1000

# Record tests interactively
npx playwright codegen
```

## Contributing

To contribute to this project:

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## Support and Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright GitHub Repository](https://github.com/microsoft/playwright)
- [Best Practices Guide](https://playwright.dev/docs/best-practices)
- [API Reference](https://playwright.dev/docs/api/class-playwright)

## Current Status

**Project State**: Initial setup complete
- ✅ Playwright framework installed
- ✅ Basic project structure created
- ✅ Dependencies configured
- ⏳ Test files to be added
- ⏳ Configuration to be customized based on needs

## License

This project is configured for automated testing purposes. Please ensure compliance with your organization's testing and development policies.

## Contact

For questions or support regarding this testing framework, please refer to the project's issue tracker or contact the development team.

---

**Getting Started**: Begin by creating your first test file in the `tests/` directory and running `npx playwright test` to see the framework in action!