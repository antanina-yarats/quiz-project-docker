import { test, expect } from '@playwright/test';

test('Registered user can access quiz', async({ page }) => {
    await page.goto('http://localhost:7777/auth/login');
    await page.getByRole('textbox', { name: 'Email Address'}).fill('test2@gmail.com');
    await page.getByRole('textbox', { name: 'Password'}).fill('123456');
    await page.getByRole('button', { name: 'Sign in'}).click();

    await expect(page).toHaveURL('http://localhost:7777/');

    const isNavBarCollapsed = await page.locator('.navbar-toggler').isVisible();
    if(isNavBarCollapsed) {
        await page.locator('.navbar-toggler').click();
        await page.waitForSelector('#navbarNav', { state: 'visible', timeout: 5000 });
    }

    await page.getByRole('link', { name: 'Quiz', exact: true }).click();
    await expect(page).toHaveURL('http://localhost:7777/quiz');

})

test('Unauthenticated user cannot access quiz', async ({ page }) => {
    await page.goto('http://localhost:7777/quiz');
    await expect(page). toHaveURL('http://localhost:7777/auth/login');
});