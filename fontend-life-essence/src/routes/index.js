import AdminPage from '../pages/AdminPage/AdminPage';
import DetailsProductPage from "../pages/DetailsProductPage/DetailsProductPage";
import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import Wishlist from "../pages/WishlistPage/Wishlist";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import ProfileUpdate from '../pages/ProfileUpdate/ProfileUpdate';
import MyOrderPage from '../pages/MyOrderPage/MyOrderPage';
import DetailsBlogPage from '../pages/BlogsPage/DetailsBlogs';
import OrderSuccess from '../pages/OrderSuccess/OrderSuccess';
import DetailsOrderPage from '../pages/DetailsOrderPage/DetailsOrderPage';
import Feedback from "../pages/Feedback/Feedback";
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import BlogsPost from '../pages/BlogsPost/BlogsPost';
import ManagePage from '../pages/ManagePage/ManagePage';
import ResetPasswordForm from '../pages/ResetPasswordForm/ResetPasswordForm';
import ContractPage from '../pages/ContractPage/ContractPage';
import UnderConstruction from '../pages/UnderConstructionPage/UnderConstructionPage';

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
        path: '/products/:categoryId?', // `categoryId` có thể có hoặc không
        page: ProductsPage,
        isShowHeader: true,
        isShowFooter: true
    },
    {
        path: '/products', // Đường dẫn cho tìm kiếm
        page: ProductsPage,
        isShowHeader: true,
        isShowFooter: true
    },
        
    {
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
        page: ProfilePage,
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
        path: '/dashboard/admin',
        page: AdminPage,
    },
    {
        path: '/dashboard/manager',
        page: ManagePage,
    },
    {
        path: '/wishlist',
        page: Wishlist,
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
        path: '/blogs',
        isShowHeader: true,
        page: DetailsBlogPage,
        isShowFooter: true
    },
    {
        path: '/order-success',
        page: OrderSuccess,
        isShowHeader: true,
        isShowFooter: true
    },
    {
        path: '/details-order/:orderId',
        page: DetailsOrderPage,
        isShowHeader: true,
        isShowFooter: true
    },

    {
        path: '*',
        page: NotFoundPage
    
    },

    {
        path: '/feedback/:orderId',
        page: Feedback,
        isShowHeader: true,
        isShowFooter: true
    },
    {
        path: '/contract',
        page: ContractPage,
        isShowHeader: true,
        isShowFooter: true
    },

    {
        path: '/blogs-post/:blogId',
        page: BlogsPost,
        isShowHeader: true,
        isShowFooter: true
    },
    {
        path: '/reset-password/:token',
        page: ResetPasswordForm,
    },
    {
        path: '/page-contruction',
        page: UnderConstruction,
    }
];
