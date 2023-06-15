import LoginPage from './LoginPage';
import DashboardPage from './DashboardPage';
import PaymentPage from './PaymentPage';
import CartPage from './CartPage';
import OrderPage from './OrderPage';
import OrdersPage from './OrdersPage';

class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.paymentPage = new PaymentPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.orderPage = new OrderPage(this.page);
        this.ordersPage = new OrdersPage(this.page);
    }

    getLoginPage() {
        return this.loginPage;
    }
    getDashboardPage() {
        return this.dashboardPage;
    }
    getPaymentPage() {
        return this.paymentPage;
    }
    getCartPage() {
        return this.cartPage;
    }
    getOrderPage() {
        return this.orderPage;
    }
    getOrdersPage() {
        return this.ordersPage;
    }

}

export default POManager