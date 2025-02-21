import { test, expect } from '@playwright/test';

test('User can add a question with options', async ({ page }) => {
  
  await page.goto('http://localhost:7777/auth/login');
  
  await page.getByRole('textbox', { name: 'Email Address' }).fill('test2@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page).toHaveURL('http://localhost:7777/');

  await page.getByRole('link', { name: 'View Topics' }).click();
  await page.getByRole('link', { name: 'Open Topic' }).first().click();
  await page.getByRole('link', { name: 'Add a Question' }).click();

  await page.locator('#questionText').fill('What is Playwright?');
  await page.locator('#option1').fill('A Testing Framework');
  await page.locator('#addOptionButton').click();
  const newOptionLocator = page.locator('input[name="options[]"]').last();
  await newOptionLocator.waitFor({ timeout: 5000 });
  await newOptionLocator.fill('A Game Engine');
  await page.locator('#correct1').check(); 
  await page.locator('#saveQuestionBtn').click();
  await expect(page.getByText('What is Playwright?')).toBeVisible();
});
