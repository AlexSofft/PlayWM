class OrdersPage {

    constructor(page) {
        this.page = page
        this.ordersTable = page.locator('tbody');
        this.rows = page.locator('tbody tr');
    }

    async checkOrder(orderID) {
        await this.ordersTable.waitFor()
        for (let i = 0; i < await this.rows.count(); i++) {
            let text = await this.rows.nth(i).locator('th').textContent()
            if (orderID.includes(text)) {
                console.log('ORDERID_TEXT :', text)
                await this.rows.nth(i).locator('text="View"').click()
                break;
            }
        }

    }
}

export default OrdersPage

