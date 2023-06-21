import { selectDropOption } from '../tests/utils';

class PaymentPage {

    constructor(page) {
        this.countries = page.locator('[placeholder*="Country"]')// type slowly to get suggestions dropdown
        this.dropdown = page.locator('.ta-results')
        this.dropOptions = this.dropdown.locator('button')
        this.submit = page.locator('.action__submit')
    }

    async selectCountry(letters, text) {
        await this.countries.type(letters, { delay: 100 })
        await this.dropdown.waitFor()
        await selectDropOption(this.dropOptions, text)
        await this.submit.click()
    }
}

export default PaymentPage