const { test, expect } = require('@playwright/test');

// browser - fixture that configured in config.js
test('browser context playwright test', async ({ browser }) => {
    const context = await browser.newContext() //// we can set plugins/proxy/cooks(frx: login cooks) to prepare browser instance
    const page = await context.newPage() // new page
    await page.goto('https://rahulshettyacademy.com/client')
    await page.locator('#userEmail').type('qasthpark@gmail.com')
    await page.locator('#userPassword').type('!DJplaywright2023')
    await page.locator('[value = "Login"]').click() // [attribute = 'value']
    // await page.pause()

    // const firstTitle = await page.locator('.card-body b').first().textContent()
    //WAITS service based/for rest calls app
    await page.waitForLoadState('networkidle') // wait for all calls have been made Network-Fetch/XHR tab 
    const allTitles = await page.locator('.card-body b').allTextContents() // for ARRAY<element>
    console.log(allTitles)

})


