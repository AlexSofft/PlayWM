const { test, expect } = require('@playwright/test');
import LoginPage from '../pom/LoginPage';

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

async function addItemByTextNonIterable(elements, text, button, textToClick) { // USING non iterable locator()  - const elements = page.locator('.card-body') 
    for (let i = 0; i < await elements.count(); i++) {
        // console.log(await elements.nth(i).locator(text).textContent())
        textToClick.includes(await elements.nth(i).locator(text).textContent()) &&
            await elements.nth(i).locator(button).click()
    }
}


async function selectDropOption(dropOptions, textToClick) {
    for (let i = 0; i < await dropOptions.count(); i++) {
        (await dropOptions.nth(i).textContent()).trim() === textToClick &&
            await dropOptions.nth(i).click()
        // break; NOT WORK WITH DROPDOWN
    }
}

// browser - fixture that confgured in config.js
test('browser context playwright test', async ({ browser }) => {
    const context = await browser.newContext() //// we can set plugins/proxy/cooks(frx: login cooks) to prepare browser instance
    const page = await context.newPage() // new page

   
    const elements = page.locator('.card-body');
    const allTitles = page.locator('.card-body b')
    await page.goto('https://rahulshettyacademy.com/client')

    
    const loginPage = new LoginPage(page)
    const email = 'qasthpark@gmail.com'
    const password = '!DJplaywright2023'
    await loginPage.validLogin(email, password)

    await page.waitForLoadState('networkidle') // wait for all calls have been made Network-Fetch/XHR tab GOVNO!!!!!
    await page.waitForTimeout(1000)
    await allTitles.first().waitFor()
   

    let allTitlesContent = await allTitles.allTextContents() // for ARRAY<element>
    console.log(allTitlesContent) // !!! or fuck up
    //LOOP and add to cart
    const zara = 'zara coat 3';
    const boots = 'adidas original';
    await addItemByTextNonIterable(elements, 'b', '.btn.w-10.rounded', zara)
    await addItemByTextNonIterable(elements, 'b', '.btn.w-10.rounded', boots)

    await page.locator('[routerlink*="cart"]').click()
    await page.locator('div li').first().waitFor() // div li only if more than 1 product in the cart
    await page.locator(`h3:has-text("${zara}")`).isVisible() // isVisible is not AUTOWAIT
    await page.locator('text="Checkout"').click()

    //DROPDOWN the country
    await page.locator('[placeholder*="Country"]').type('ind', { delay: 100 }) // type slowly to get suggestions dropdown
    const dropdown = page.locator('.ta-results')
    await dropdown.waitFor()
    const dropOptions = dropdown.locator('button')
    await selectDropOption(dropOptions, 'India')
    await page.locator('.action__submit').click()

    await page.waitForTimeout(1000)
    const orderId = await page.locator('.em-spacer-1 .ng-star-inserted').first().textContent() // paren tag class - child tag class
    console.log(orderId)
    await page.locator('button[routerlink*="myorders"]').click()

    await page.locator('tbody').waitFor()
    const rows = page.locator('tbody tr');
    await addItemByTextNonIterable(rows, 'th', 'text="View"', orderId) // LOOP
    // for (let i = 0; i < await rows.count(); i++) {
    //     let text = await rows.nth(i).locator('th').textContent()
    //     if (orderId.includes(text)) {
    //         console.log(text)
    //         await rows.nth(i).locator('text="View"').click()
    //         break;
    //     }
    // }




    await page.pause()
})


