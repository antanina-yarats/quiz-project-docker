import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ path: "./project.env"});

test('Admin can create a topic', async ({ page }) => {
  
  await page.goto('http://localhost:7777/auth/login');
  await page.getByRole('textbox', { name: 'Email Address' }).fill(process.env.ADMIN_EMAIL);
  await page.getByRole('textbox', { name: 'Password' }).fill(process.env.ADMIN_PASSWORD);

  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page).toHaveURL('http://localhost:7777/');
  await page.locator('#navbarTopicsLink').click();
  await page.waitForSelector('[name="topicName"]', { state: 'visible', timeout: 5000 });
  await page.locator('#topicName').fill('Test Topic');
  await page.getByRole('button', { name: 'Add Topic' }).click();
  await expect(page.getByText('Test Topic')).toBeVisible();
});
