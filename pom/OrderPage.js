class OrderPage {


    constructor(page) {
        // this.orderId = null
        this.page = page
        this.orderID = page.locator('.em-spacer-1 .ng-star-inserted')
        this.ordersButton = page.locator('button[routerlink*="myorders"]')
    }

    async submitOrderAndGetID() {
        await this.page.waitForTimeout(1000)
        const orderId = await this.orderID.first().textContent() // paren tag class - child tag class
        console.log('ORDERID: ', await orderId)
        await this.ordersButton.click()
        return orderId
    }

    // async getOrderID() {
    //     return this.orderId
    // }
}

export default OrderPage

