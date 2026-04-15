# Playwright BDD - Login Automation

A BDD (Behavior-Driven Development) test automation framework using **Playwright** and **playwright-bdd** with the **Page Object Model** pattern.

## Project Structure

```
├── features/
│   └── login.feature          # Gherkin feature files
├── fixtures/
│   └── fixtures.ts            # Custom test fixtures (Page Object injection)
├── pages/
│   └── loginpage.ts           # Page Object classes
├── steps/
│   └── login.steps.ts         # Step definitions
├── playwright.config.ts       # Playwright + BDD configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies and scripts
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Git](https://git-scm.com/)

## Step-by-Step Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/Siva-tst/Playwright-BDD.git
cd Playwright-BDD
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Install Playwright Browsers

```bash
npx playwright install
```

### Step 4: Run the Tests

```bash
npm test
```

This runs two commands:
1. `bddgen` — Generates Playwright test files from `.feature` files
2. `playwright test` — Executes the generated tests

## How It Works

### 1. Write Feature Files (Gherkin)

Define your test scenarios in plain English using Gherkin syntax in the `features/` folder:

```gherkin
Feature: Login functionality

  Scenario: Successful login
    Given I navigate to the login page
    When I enter username and password
    And I click on login button
    Then I should see the shop page
```

### 2. Create Page Objects

Page Object classes encapsulate page interactions in the `pages/` folder:

```typescript
// pages/loginpage.ts
export class LoginPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  }

  async login(username: string, password: string) {
    await this.page.locator('#username').fill(username);
    await this.page.locator('#password').fill(password);
  }

  async clickLogin() {
    await this.page.locator('#signInBtn').click();
  }
}
```

### 3. Define Fixtures

Custom fixtures inject Page Objects into step definitions via `fixtures/`:

```typescript
// fixtures/fixtures.ts
import { test as base } from 'playwright-bdd';
import { createBdd } from 'playwright-bdd';
import { LoginPage } from '../pages/loginpage';

export const test = base.extend<{ loginPage: LoginPage }>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

export const { Given, When, Then } = createBdd(test);
```

### 4. Implement Step Definitions

Map Gherkin steps to code in the `steps/` folder:

```typescript
// steps/login.steps.ts
import { Given, When, Then } from '../fixtures/fixtures';

Given('I navigate to the login page', async ({ loginPage }) => {
  await loginPage.navigate();
});

When('I enter username and password', async ({ loginPage }) => {
  await loginPage.login('rahulshettyacademy', 'Learning@830$3mK2');
});

When('I click on login button', async ({ loginPage }) => {
  await loginPage.clickLogin();
});

Then('I should see the shop page', async ({ loginPage }) => {
  // Login successful
});
```

### 5. Configure Playwright + BDD

The `playwright.config.ts` ties everything together:

```typescript
import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
  features: 'features/*.feature',
  steps: ['steps/*.ts', 'fixtures/*.ts'],
});

export default defineConfig({
  testDir,
  use: {
    headless: false,
    browserName: 'chromium',
  },
});
```

## Useful Commands

| Command                        | Description                          |
| ------------------------------ | ------------------------------------ |
| `npm test`                     | Generate and run all BDD tests       |
| `npx bddgen`                  | Generate test files from features    |
| `npx playwright test`         | Run generated Playwright tests       |
| `npx playwright test --headed`| Run tests in headed (visible) mode   |
| `npx playwright show-report`  | Open the HTML test report            |

## Tech Stack

- **Playwright** — Browser automation
- **playwright-bdd** — BDD layer for Playwright (Gherkin support)
- **TypeScript** — Type-safe step definitions and page objects

Stash2
Siva main branch testing
