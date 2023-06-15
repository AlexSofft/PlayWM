class CartPage {

    constructor(page) {
        this.ancor = page.locator('div li') // div li only if more than 1 product in the cart
        this.item = (zara) => page.locator(`h3:has-text("${zara}")`) // isVisible is not AUTOWAIT
        this.checkoutButton = page.locator('text="Checkout"')

    }

    async checkout(item) {
        await this.ancor.first().waitFor()
        await this.item(item).isVisible()
        await this.checkoutButton.click()
    }
}

export default CartPage