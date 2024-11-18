import AdminPage from '../pages/AdminPage/AdminPage';
import DetailsProductPage from "../pages/DetailsProductPage/DetailsProductPage";
import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import Wishlist from "../pages/WishlistPage/Wishlist";
import Profile from '../pages/Profile/Profile';
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import DetailsOrderPage from "../pages/DetailsOrderPage/DetailsOrderPage";
import MyOrderPage from "../pages/MyOrderPage/MyOrderPage";

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true,
        isShowFooter: true
    },
    {
        path: '/signIn',
        page: SignInPage,
        // Không hiển thị Header và Footer
    },
    {
        path: '/signUp',
        page: SignUpPage,
        // Không hiển thị Header và Footer
    },
    {
        path: '/resetPassword',
        page: ResetPassword,
        // Không hiển thị Header và Footer
    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true,
        isShowFooter: true
    },
    {
        path: '/products',
        page: ProductsPage,
        isShowHeader: true,
        isShowFooter: true
    },
    {
        // Đổi thành `/details-product/:id` để nhận `id` sản phẩm từ URL
        path: '/details-product/:id',
        page: DetailsProductPage,
        isShowHeader: true,
        isShowFooter: true
    },
    {
        path: '/payment',
        page: PaymentPage,
        isShowHeader: true,
        isShowFooter: true
    },
    {
        path: '/profile-user',
        page: Profile,
        isShowHeader: true,
        isShowFooter: true
    },
    {
        path: '/admin',
        page: AdminPage,
        // Không hiển thị Header và Footer cho trang Admin
    },
    {
        path: '/wishlist',
        page: Wishlist,
        isShowHeader: true,
        isShowFooter: true
    },
    {
        // Đổi thành `/details-order/:id` để nhận `id` của đơn hàng từ URL
        path: '/details-order/:id',
        page: DetailsOrderPage,
        isShowHeader: true,
        isShowFooter: true
    },
    {
        path: '/my-order',
        page: MyOrderPage,
        isShowHeader: true,
        isShowFooter: true
    },
    {
        path: '*',
        page: NotFoundPage
    }
];
