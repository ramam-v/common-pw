# Playwright Common Library

A robust common library for Playwright automation framework that provides reusable keywords, utilities, and patterns for test automation. This library implements a two-level architecture that separates page-level and element-level operations for better maintainability and reusability.

## Table of Contents
- [Features](#features)
- [Architecture Design](#architecture-design)
- [Project Setup](#project-setup)
- [Publishing Process](#publishing-process)
- [Consuming the Package](#consuming-the-package)
- [Usage Examples](#usage-examples)
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

### Benefits
1. **Multi-Tab Support**
   ```typescript
   // Element operations work across tabs
   await webKeywords.click(elementInTab1, 'Button in Tab 1');
   await webKeywords.click(elementInTab2, 'Button in Tab 2');
   ```

2. **Better Error Handling**
   ```typescript
   try {
     await webKeywords.click(element, 'Submit Button');
   } catch (error) {
     // Handle element-specific error
   }
   ```

## Project Setup

1. Clone the repository:
```bash
git clone https://github.com/ramam-v/common-pw.git
cd common-pw
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

4. Create required directories:
```bash
mkdir -p src/utils src/keywords screenshots/elements screenshots/pages screenshots/viewport
```

## Publishing Process

### First-Time Setup

1. Create a GitHub Personal Access Token (Classic):
   - Go to GitHub Settings → Developer Settings → Personal Access Tokens
   - Generate token with required permissions:
     - `repo`
     - `write:packages`
     - `read:packages`
     - `delete:packages`

2. Configure npm:
```bash
# Create .npmrc in project root
@ramam-v:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
always-auth=true
```

### Publishing Updates

1. Set your GitHub token:
```bash
export NODE_AUTH_TOKEN=your_github_token
```

2. Make and commit your changes:
```bash
# Stage your changes
git add .

# Commit your changes
git commit -m "Your changes"
```

3. Update the package version:
```bash
npm version patch  # for bug fixes (1.0.0 -> 1.0.1)
npm version minor  # for new features (1.0.0 -> 1.1.0)
npm version major  # for breaking changes (1.0.0 -> 2.0.0)
```

4. Build and publish:
```bash
# Build the package
npm run build

# Publish to GitHub Packages
npm publish
```

5. Push to GitHub:
```bash
git push --follow-tags
```

## Consuming the Package

Since this is a public package, any GitHub user can consume it by following these steps:

### First-Time Setup

1. Create a GitHub Personal Access Token:
   - Go to your GitHub Settings → Developer Settings → Personal Access Tokens → Tokens (classic)
   - Generate a new token with at least `read:packages` permission
   - Copy the token

2. Authenticate with GitHub Packages:
   Create `.npmrc` in your project root:
```plaintext
@ramam-v:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
always-auth=true
```

3. Add the environment variable:
```bash
# For Linux/Mac
export NODE_AUTH_TOKEN=your_github_token

# For Windows Command Prompt
set NODE_AUTH_TOKEN=your_github_token

# For Windows PowerShell
$env:NODE_AUTH_TOKEN="your_github_token"
```

### Installing the Package

1. Add the dependency to your project's package.json:
```json
{
  "dependencies": {
    "@ramam-v/common-pw": "^1.0.8"
  }
}
```

2. Install the package:
```bash
npm install
```

### Troubleshooting

1. Authentication Errors:
   - Ensure your GitHub token has `read:packages` permission
   - Verify your NODE_AUTH_TOKEN environment variable is set correctly
   - Check your .npmrc file is in the project root

2. Package Not Found:
   - Verify the package name and version in package.json
   - Clear npm cache: `npm cache clean --force`
   - Try installing with the exact version: `npm install @ramam-v/common-pw@1.0.8`

3. Import Errors:
   - Make sure you're using the correct import path
   - Check if TypeScript types are properly generated
   - Verify the package is listed in your node_modules

## Usage Examples

### Common Utilities
```typescript
import { CommonUtils } from '@ramam-v/common-pw';

const utils = new CommonUtils();
const todayDate = utils.dataValueHandler('<TODAY>');
const futureDate = utils.dataValueHandler('<TODAY+2>');
const uniqueId = utils.dataValueHandler('<UNIQUEID>');
```

### Web Keywords
```typescript
import { WebKeywords } from '@ramam-v/common-pw';

const webKeywords = new WebKeywords();

// Click operations
await webKeywords.click(element, 'Submit Button');
await webKeywords.doubleClick(element, 'Image');

// Form operations
await webKeywords.enterText(inputElement, 'Hello World', 'Greeting Input');
await webKeywords.selectByValue(selectElement, 'option1', 'Country Dropdown');
```

### Page Keywords
```typescript
import { PageKeywords } from '@ramam-v/common-pw';

const pageKeywords = new PageKeywords();

// Navigation
await pageKeywords.navigateToUrl(page, 'https://example.com');

// Screenshots
await pageKeywords.capturePageScreenshot(page, 'landing-page', true);
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
| `<UNIQUEIDn>` | n-digit unique ID | 1234567 |
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