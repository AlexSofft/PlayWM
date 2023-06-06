const { test, expect } = require('@playwright/test');

//browser - fixture that configured in config.js
// test('browser context playwright test', async ({ browser }) => {
//     const context = await browser.newContext() //// we can set plugins/proxy/cooks(frx: login cooks) to prepare browser instance
//     const page = await context.newPage() // new page
//     await page.goto('https://rahulshettyacademy.com/')

// })

test('page instance test check error message', async ({ page }) => {
    const username = page.locator('#username')
    const signIn = page.locator('[name="signin"]')
    const password = page.locator('[type="password"]')
    const cardTitle = page.locator('.card-title a') // .class tag 
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    // await expect(page).toHaveTitle('Google')
    await username.type('rahulshettyacadem')
    await password.type('learning')
    await signIn.click()
    //wait untill it shown up is embeded
    const errorMessage = await page.locator('[style*="block"]').textContent()
    expect(errorMessage).toEqual('Incorrect username/password.')
    await expect(page.locator('[style*="block"]')).toContainText('Incorrect')
    //type - fill (rewrigth the existing text)
    await username.fill('rahulshettyacademy')

    //guides autowaiting in DOC
    // console.log(await cardTitle.first().textContent()) // plaW waits for textContent() -> Not found error

    //WAITS no service oriented app / no network calls are made / data is directly comes from server
    await Promise.all([
        page.waitForNavigation(),
        signIn.click(),
    ])
    const allTitles = await cardTitle.allTextContents() // playW DON't wait allTextContents() -> returns [] no error
    console.log(allTitles)
})

test('dropdown and radio and checkbox and have attr', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')

    // dropdawn menu
    await page.locator('select.form-control').selectOption('Consultant')

    // radio button
    await page.locator('.radiotextsty').last().click()
    await page.locator('#okayBtn').click()
    expect(await page.locator('.radiotextsty').last().isChecked())

    // checkbox
    await page.locator('#terms').click()
    //action performed outside the brackets .toBeChecked()
    await expect(page.locator('#terms')).toBeChecked()
    await page.locator('#terms').uncheck()
    // action .isChecked() inside, toBeFalsy - just check if true
    expect(await page.locator('#terms').isChecked()).toBeFalsy()

    // check attr
    const documentLink = page.locator('[href*="documents-request"]')
    await expect(documentLink).toHaveAttribute('class', 'blinkingText')

    // await page.pause()
})

test.only('Child window handling', async ({ browser }) => {
    const context = await browser.newContext() //// we can set plugins/proxy/cooks(frx: login cooks) to prepare browser instance
    const page = await context.newPage() // new page 
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')

    //focus on the parent window
    const documentLink = page.locator('[href*="documents-request"]')
    await expect(documentLink).toHaveAttribute('class', 'blinkingText')

    //await documentLink.click() opens new tab SO:
    const [newPage] = await Promise.all([ // if two windows opened [newPage, newPage2]
        context.waitForEvent('page'),
        documentLink.click()
    ])

    // focus on the child window 
    const text = await newPage.textContent('.red')
    console.log('TXT: ', text)
    let domain = text.split('@')[1].split(' ')[0]
    console.log('DOMAIN: ', domain)

    // focus on the parent window 
    await page.locator('#username').type(domain)
      
    
    
    //FUCK UP
    await page.waitForSelector('#username');
    const fieldText = await page.inputValue('#username')
    console.log('LOL: ', fieldText)
    // let lol = await page.locator('#username').textContent()

    // await page.pause()
     expect(await page.locator('#username').inputValue()).toContain(domain)
     
    
    




})