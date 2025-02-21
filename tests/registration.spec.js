import { test, expect } from '@playwright/test';

test('User can register successfully', async ({ page }) => {
  await page.goto('http://localhost:7777/auth/register');
  await page.getByRole('textbox', { name: 'Email Address' }).fill(`test${Date.now()}@test.com`);
  await page.getByRole('textbox', { name: 'Password', exact: true }).fill('12345678');
  await page.getByRole('textbox', { name: 'Confirm Password' }).fill('12345678');
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(page).toHaveURL(/auth\/login/);
});


