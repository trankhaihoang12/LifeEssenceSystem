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
import ProfileUpdate from '../pages/ProfileUpdate/ProfileUpdate';


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
        // isShowHeader: true,
        // isShowFooter: true
    },
    {
        path: '/signUp',
        page: SignUpPage,
        // isShowHeader: true,
        // isShowFooter: true
    },
    {
        path: '/resetPassword',
        page: ResetPassword,
        // isShowHeader: true,
        // isShowFooter: true
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
        path: '/details-product',
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
        path: '/profile-upadate',
        page: ProfileUpdate,
        isShowHeader: true,
        isShowFooter: true

    },
    {
        path: '/admin',
        page: AdminPage,


    },
    {

        path: '/wishlist',
        page: Wishlist,
        isShowHeader: true,
        isShowFooter: true
    },
    {
        path: '*',
        page: NotFoundPage
    },
];