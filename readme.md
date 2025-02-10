# Playwright Common Library

A robust common library for Playwright automation framework that provides reusable keywords, utilities, and patterns for test automation. This library implements a two-level architecture that separates page-level and element-level operations for better maintainability and reusability.

## Table of Contents
- [Features](#features)
- [Architecture Design](#architecture-design)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Available Scripts](#available-scripts)
- [Data Value Patterns](#data-value-patterns)
- [Contributing](#contributing)
- [License](#license)

## Features

### Common Utilities
- Dynamic data generation (dates, IDs, names)
- Data value pattern handling (`<TODAY>`, `<UNIQUEID>`, etc.)
- Faker integration for test data

### Web Keywords (Element-Level)
- Element interactions (click, double click, right click)
- Form handling (input, select, checkbox)
- Element-level screenshots with HTML report integration
- Error handling and reporting

### Page Keywords (Page-Level)
- Navigation helpers
- Date selection
- Page-level screenshots
- Viewport capture

## Architecture Design

### Why Two-Level Architecture?

Our library implements a strategic separation between page-level and element-level operations through two main classes:

#### Page Keywords (PageKeywords.ts)
- **Scope**: Handles page-level operations requiring the `Page` object
- **Responsibilities**:
  - Navigation and URL handling
  - Page-level screenshots
  - Date selection
  - Browser context management
  - Multi-tab/window operations
  - Page-level state management

#### Element Keywords (WebKeywords.ts)
- **Scope**: Handles element-level operations using Locators
- **Responsibilities**:
  - Element interactions (click, type, select)
  - Form handling
  - Element validation
  - Element-level screenshots
  - Element state management

### Benefits of This Architecture

1. **Multi-Tab Support**
```typescript
// Element operations work across tabs
await webKeywords.click(elementInTab1, 'Button in Tab 1');
await webKeywords.click(elementInTab2, 'Button in Tab 2');

// Page operations handle context
await pageKeywords.navigateToUrl(newTab, 'https://example.com');
```

2. **Precise Error Handling**
```typescript
// Element-specific errors
try {
  await webKeywords.click(element, 'Submit Button');
} catch (error) {
  // Handle element error
}

// Page-level errors
try {
  await pageKeywords.navigateToUrl(page, 'https://example.com');
} catch (error) {
  // Handle navigation error
}
```

3. **Enhanced Reusability**
```typescript
// Element keywords work across pages
await webKeywords.click(headerLogo, 'Logo');
await webKeywords.enterText(searchBox, 'query', 'Search');

// Page keywords for context-specific operations
await pageKeywords.selectDate(page, dateSelector, '<TODAY>', 'Date Picker');
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/playwright-common-library.git
cd playwright-common-library
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## Project Structure

```
playwright-common-library/
├── src/
│   ├── utils/
│   │   └── CommonUtils.ts
│   ├── keywords/
│   │   ├── WebKeywords.ts
│   │   └── PageKeywords.ts
│   └── index.ts
├── tests/
│   ├── pages/
│   │   └── PlaywrightPage.ts
│   └── example.spec.ts
├── screenshots/
│   ├── elements/
│   ├── pages/
│   └── viewport/
└── [configuration files]
```

## Usage

### Common Utilities
```typescript
import { CommonUtils } from '../src';

const utils = new CommonUtils();

// Dynamic data generation
const todayDate = utils.dataValueHandler('<TODAY>');
const futureDate = utils.dataValueHandler('<TODAY+2>');
const uniqueId = utils.dataValueHandler('<UNIQUEID>');
const lastName = utils.dataValueHandler('<LASTNAME>');
```

### Web Keywords
```typescript
import { WebKeywords } from '../src';

const webKeywords = new WebKeywords();

// Click operations
await webKeywords.click(element, 'Submit Button');
await webKeywords.doubleClick(element, 'Image');
await webKeywords.rightClick(element, 'Context Menu');

// Form operations
await webKeywords.enterText(inputElement, 'Hello World', 'Greeting Input');
await webKeywords.selectByValue(selectElement, 'option1', 'Country Dropdown');
await webKeywords.setCheckbox(checkboxElement, true, 'Terms Checkbox');

// Screenshots
await webKeywords.captureElementScreenshot(element, 'button-state', 'Submit Button');
```

### Page Keywords
```typescript
import { PageKeywords } from '../src';

const pageKeywords = new PageKeywords();

// Navigation
await pageKeywords.navigateToUrl(page, 'https://example.com');

// Date selection
await pageKeywords.selectDate(page, '#datePicker', '<TODAY+5>', 'Future Date');

// Screenshots
await pageKeywords.capturePageScreenshot(page, 'landing-page', true);
```

### Complete Test Example
```typescript
test('user login flow', async ({ page }) => {
  // Page-level setup
  await pageKeywords.navigateToUrl(page, loginUrl);
  
  // Element-level interactions
  await webKeywords.enterText(usernameField, 'john.doe', 'Username');
  await webKeywords.enterText(passwordField, 'password123', 'Password');
  await webKeywords.click(loginButton, 'Login Button');
  
  // Page-level verification
  await pageKeywords.capturePageScreenshot(page, 'post-login');
});
```

## Available Scripts

- `npm run build` - Build the project
- `npm run clean` - Clean the build directory
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run test` - Run tests
- `npm run test:headed` - Run tests in headed mode
- `npm run test:ui` - Run tests with UI

## Data Value Patterns

| Pattern | Description | Example Output |
|---------|-------------|----------------|
| `<TODAY>` | Current date | 02/10/2025 |
| `<TODAY+n>` | Future date | 02/12/2025 |
| `<TODAY-n>` | Past date | 02/08/2025 |
| `<UNIQUEID>` | 12-digit unique ID | 123456789012 |
| `<UNIQUEIDn>` | n-digit unique ID | 1234567 (n=7) |
| `<FIRSTNAME>` | Random first name | John |
| `<LASTNAME>` | Random last name | Smith |
| `<DOB>` | Random date of birth | 05/15/1990 |
| `<DOB -nY>` | DOB n years ago | 05/15/2005 |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Playwright](https://playwright.dev/)
- [Faker](https://fakerjs.dev/)
- And all other dependencies that make this project possible