const { test, expect } = require('@playwright/test');

async function addItemByText(elements, textToClick) { // USING iterable $$  - const elements =  await page.$$('.card-body'); 
    for (const element of elements) {                 // must be after await page.waitForLoadState('networkidle') - on  new page
        await (await element.$('b')).textContent() === textToClick &&
            await (await element.$('.btn.w-10.rounded')).click();
    }
}

async function addItemByText2(elements, textToClick) { // USING non iterable locator()  - const elements = page.locator('.card-body') 
    for (let i = 0; i < await elements.count(); i++) {
        await elements.nth(i).locator('b').textContent() === textToClick &&
            await elements.nth(i).locator('.btn.w-10.rounded').click()
    }
}

async function elementsList(elements) { // USING non iterable locator()  - const elements = page.locator('.card-body') 
    let hashes = {}
    for (let i = 0; i < await elements.count(); i++) {
        hashes[await elements.nth(i).locator('b').textContent()] = await elements.nth(i).locator('.btn.w-10.rounded')
    }
    return hashes
}

// browser - fixture that confgured in config.js
test('browser context playwright test', async ({ browser }) => {
    const context = await browser.newContext() //// we can set plugins/proxy/cooks(frx: login cooks) to prepare browser instance
    const page = await context.newPage() // new page

    const elements = page.locator('.card-body');
    const allTitles = page.locator('.card-body b')


    await page.goto('https://rahulshettyacademy.com/client')
    await page.locator('#userEmail').type('qasthpark@gmail.com')
    await page.locator('#userPassword').type('!DJplaywright2023')
    await page.locator('[value = "Login"]').click() // [attribute = 'value']
    //WAITS service based/for rest calls app
    await page.waitForLoadState('networkidle') // wait for all calls have been made Network-Fetch/XHR tab 
    let allTitlesContent = await allTitles.allTextContents() // for ARRAY<element>
    console.log(allTitlesContent)

    //LOOP and click
    const textToClick = 'zara coat 3';
    await addItemByText2(elements, textToClick)
    console.log('HASHES: ', await elementsList(elements))
    await page.pause()
})


