import AdminPage from "../pages/AdminPage/AdminPage";
import DetailsProductPage from "../pages/DetailsProductPage/DetailsProductPage";
import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true,
        isShowFooter: true
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
        path: '/admin',
        page:  AdminPage,

    },
    {
        path: '*',
        page: NotFoundPage
    },
];