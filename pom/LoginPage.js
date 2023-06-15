class LoginPage {
    constructor(page) {
        // this.page = page
        this.userEmail = page.locator('#userEmail')
        this.userPassword = page.locator('#userPassword')
        this.signInButton = page.locator('[value = "Login"]')
    }

    async validLogin(email, password) {
        await this.userEmail.type(email)
        await this.userPassword.type(password)
        await this.signInButton.click()
        // await this.page.waitForLoadState('networkidle')
    }
}

export default LoginPage