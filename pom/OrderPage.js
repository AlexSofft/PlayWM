class OrderPage {


    constructor(page) {
        // this.orderId = null
        this.page = page
        this.orderID = page.locator('.em-spacer-1 .ng-star-inserted')
        this.ordersButton = page.locator('button[routerlink*="myorders"]')
    }

    async submitOrder() {
        await this.page.waitForTimeout(1000)
        const orderId = this.orderID.first().textContent() // paren tag class - child tag class
        console.log(this.orderId)
        await this.ordersButton.click()
        return orderId
    }

    // async getOrderID() {
    //     return this.orderId
    // }
}

export default OrderPage

