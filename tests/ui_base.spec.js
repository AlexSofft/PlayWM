const { test } = require('@playwright/test');

//browser - fixture that configured in config.js
test('browser context playwright test', async ({ browser }) => {
    const context = await browser.newContext() //// we can set plugins/proxy/cooks(frx: login cooks) to prepare browser instance
    const page = await context.newPage() // new page
    await page.goto('')
})

test('first', async ({ page }) => {
    //newContext() - like new instance(incognito: no cookies). Pass plugins/proxy/cooks(frx: login cooks) to prepare browser instance. 
        const context = await browser.newContext() 
        const page = await context.newPage() // new page
        await page.goto('')
    })