const { test, expect, request } = require('@playwright/test');
import POManager from '../pom/POManager';
const loginData = { userEmail: "qasthpark@gmail.com", userPassword: "!DJplaywright2023" }
let token;
let page = null
let poManager = null

test.describe('TC0001', async () => {
   

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext() //// we can set plugins/proxy/cooks(frx: login cooks) to prepare browser instance
        page = await context.newPage() // new page

        //API 
        const apiContext = await request.newContext()
        const loginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
            { data: loginData }
        )
        expect(loginResponse.ok()).toBeTruthy()
        const loginResponseJson = await loginResponse.json()
        token = loginResponseJson.token
        console.log('TOKEN: ' + token)
    })
    test.beforeEach(async () => {
    })

    test('browser context playwright test', async () => {
        await page.goto('https://rahulshettyacademy.com/client')

    })

})