import { expect } from '@playwright/test';
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