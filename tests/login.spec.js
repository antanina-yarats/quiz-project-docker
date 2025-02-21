import { test, expect } from '@playwright/test';

test('User can log in successfully', async ({ page }) => {
  
  await page.goto('http://localhost:7777/auth/login');
  await page.getByRole('textbox', { name: 'Email Address' }).fill('test2@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page).toHaveURL('http://localhost:7777/');
  const isNavbarCollapsed = await page.locator('.navbar-toggler').isVisible();
  if (isNavbarCollapsed) {
    await page.locator('.navbar-toggler').click();
    await page.waitForSelector('#navbarNav', { state: 'visible', timeout: 5000 });  
  }
  await page.waitForSelector('#userDropdown', { timeout: 5000 });
  await page.locator('#userDropdown').click();
  await page.waitForSelector('#userMenu', { state: 'visible', timeout: 5000 });
  await expect(page.locator('#logoutLink')).toBeVisible();
});
