import { clickItemByTextNonIterable } from '../tests/utils';

class DashboardPage {
    
    constructor(page) {
        this.elements = page.locator('.card-body');
        this.title = page.locator('b')
        this.button = page.locator('.btn.w-10.rounded')
        this.allTitles = page.locator('.card-body b')
        this.cart = page.locator('[routerlink*="cart"]')
    }

    async navigateToCart() {
        await this.cart.click()
    }

    async addItemByText(text) {
        await this.allTitles.first().waitFor()
        let allTitlesContent = await this.allTitles.allTextContents() // for ARRAY<element>
        console.log(allTitlesContent) // !!! or fuck up
        await clickItemByTextNonIterable(this.elements, this.title, this.button, text)
    }
}

export default DashboardPage