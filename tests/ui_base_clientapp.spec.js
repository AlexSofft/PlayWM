const { test, expect } = require('@playwright/test');
import LoginPage from '../pom/LoginPage';
import DashboardPage from '../pom/DashboardPage';
import OrdersPage from '../pom/OrdersPage';
import PaymentPage from '../pom/PaymentPage';
import OrderPage from '../pom/OrderPage';

// const loginPage = undefined
// const dashboardPage = null
// const paymentPage = null
// const ordersPage = null
test.describe('TC0001', () => {
    let page = null
    let loginPage = null
    let dashboardPage = null
    let paymentPage = null
    let orderPage = null;
    let ordersPage = null

    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext() //// we can set plugins/proxy/cooks(frx: login cooks) to prepare browser instance
        page = await context.newPage() // new page
    })
    test.beforeEach(async () => {
        await page.goto('https://rahulshettyacademy.com/client')
    })

    test('browser context playwright test', async ({ browser }) => {
        const email = 'qasthpark@gmail.com'
        const password = '!DJplaywright2023'
        loginPage = new LoginPage(page)
        dashboardPage = new DashboardPage(page)
        paymentPage = new PaymentPage(page)
        orderPage = new OrderPage(page)
        ordersPage = new OrdersPage(page)
        // login
        await loginPage.validLogin(email, password)
        await page.waitForLoadState('networkidle') // wait for all calls have been made Network-Fetch/XHR tab GOVNO!!!!!
        //LOOP and add to cart page
        const zara = 'zara coat 3';
        const boots = 'adidas original';
        await dashboardPage.addItemByText(zara)
        await dashboardPage.addItemByText(boots)
        await dashboardPage.navigateToCart()
        //TODO: CartPage
        await page.locator('div li').first().waitFor() // div li only if more than 1 product in the cart
        await page.locator(`h3:has-text("${zara}")`).isVisible() // isVisible is not AUTOWAIT
        await page.locator('text="Checkout"').click()
        //DROPDOWN the country page
        // await page.locator('[placeholder*="Country"]').type('ind', { delay: 100 }) // type slowly to get suggestions dropdown
        // const dropdown = page.locator('.ta-results')
        // await dropdown.waitFor()
        // const dropOptions = dropdown.locator('button')
        // await selectDropOption(dropOptions, 'India')
        // await page.locator('.action__submit').click()
        await paymentPage.selectCountry('India')
        // ORDER info page
        // await page.waitForTimeout(1000)
        // const orderId = await page.locator('.em-spacer-1 .ng-star-inserted').first().textContent() // paren tag class - child tag class
        // console.log(orderId)
        // await page.locator('button[routerlink*="myorders"]').click()
        let orderID = await orderPage.submitOrder()
        // await orderPage.getOrderID()
        // const orderID = orderPage.getOrderID()
        //Orders list page
        // await page.locator('tbody').waitFor()
        // const rows = page.locator('tbody tr');
        // for (let i = 0; i < await rows.count(); i++) {
        //     let text = await rows.nth(i).locator('th').textContent()
        //     if (orderId.includes(text)) {
        //         console.log(text)
        //         await rows.nth(i).locator('text="View"').click()
        //         break;
        //     }
        // }
        await ordersPage.checkOrder(orderID)






        await page.pause()
    })

})


