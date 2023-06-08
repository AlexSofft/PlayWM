const { test, expect } = require('@playwright/test');

async function addItemByTextIterable(elements, textToClick) { // USING iterable $$  - const elements =  await page.$$('.card-body'); 
    for (const element of elements) {                 // must be after await page.waitForLoadState('networkidle') - on  new page
        await (await element.$('b')).textContent() === textToClick &&
            await (await element.$('.btn.w-10.rounded')).click();
    }
}

async function elementsList(elements) { // USING non iterable locator()  - const elements = page.locator('.card-body') 
    let hashes = {}
    for (let i = 0; i < await elements.count(); i++) {
        hashes[await elements.nth(i).locator('b').textContent()] = await elements.nth(i).locator('.btn.w-10.rounded')
    }
    return hashes
}

async function addItemByTextNonIterable(elements, textToClick) { // USING non iterable locator()  - const elements = page.locator('.card-body') 
    for (let i = 0; i < await elements.count(); i++) {
        await elements.nth(i).locator('b').textContent() === textToClick &&
            await elements.nth(i).locator('.btn.w-10.rounded').click()
    }
}

async function selectDropOption(dropOptions, textToClick) { 
    for (let i = 0; i < await dropOptions.count(); i++) {
        (await dropOptions.nth(i).textContent()).trim() === textToClick &&
            await dropOptions.nth(i).click()
    }
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
    const productName = 'zara coat 3';
    const productName2 = 'adidas original';
    await addItemByTextNonIterable(elements, productName)
    await addItemByTextNonIterable(elements, productName2)

    await page.locator('[routerlink*="cart"]').click()
    await page.locator('div li').first().waitFor() // div li only if more than 1 product in the cart
    await page.locator(`h3:has-text("${productName}")`).isVisible() // isVisible is not AUTOWAIT
    await page.locator('text="Checkout"').click()

    //DROPDOWN
    await page.locator('[placeholder*="Country"]').type('ind', { delay: 100 }) // type slowly to get suggestions dropdown
    const dropdown = page.locator('.ta-results')
    await dropdown.waitFor()
    const dropOptions = dropdown.locator('button')
    await selectDropOption(dropOptions, 'India')













    await page.pause()
})


