import React, { useEffect, useState } from 'react'
import { AddToCartText, AddToCartWrapper, Card, CardContent, CartButton, CartIcon, Category, FavoriteButton, ImageWrapper, Price, ProductImage, ProductTitle, RatingWrapper } from './Style'
import { Modal, Rate } from 'antd'
import { useNavigate } from 'react-router';
import * as ProductsService from '../../services/ProductsService'
import * as OrderService from '../../services/OrderService'
import * as FavortitesService from '../../services/FavoriteService';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux/slides/cartSlice';
import * as message from '../../components/MessageComponent/Message'
import { Heart } from 'lucide-react';
import { addToFavorites } from '../../redux/slides/favoriteSlice';

const CardComponent = ({ product }) => {
    const [productData, setProductData] = useState(null); // Đổi tên state
    const [selectedImage, setSelectedImage] = useState(''); // Lưu trữ hình ảnh được chọn
    const [error, setError] = useState(null); // State để lưu lỗi
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { items: favorites } = useSelector((state) => state.favorites);
    const productImage = productData?.images?.length > 0 ? productData.images[0].url : null;

    const getToken = () => {
        const storedUserData = localStorage.getItem('userData');
        const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;
        return parsedUserData?.token || null;
    };
    const getUserId = () => {
        const storedUserData = localStorage.getItem('userData');
        const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;
        return parsedUserData?.user?.id;
    };

    const handleDetailsProduct = () => {
        if (product) navigate(`/details-product/${product.id}`);
    };

    const handleAddToCart = async () => {
        const token = getToken();

        if (!token) {
            Modal.confirm({
                title: 'Bạn chưa đăng nhập',
                content: 'Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng. Bạn có muốn chuyển đến trang đăng nhập không?',
                okText: 'Đồng ý',
                cancelText: 'Hủy',
                onOk: () => navigate('/signIn'), // Đường dẫn đến trang đăng nhập của bạn
            });
            return;
        }
        try {
            // Gọi API thêm sản phẩm vào giỏ
            const response = await OrderService.addToCart(product.id, 1, token); // quantity mặc định 1
            dispatch(addItem(product));
            message.success('Sản phẩm đã được thêm vào giỏ hàng!');
        } catch (err) {
            message.error('Không thể thêm sản phẩm vào giỏ hàng.');
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            if (product && product.id) {
                try {
                    const data = await ProductsService.getProductById(product.id);
                    setProductData(data.data); // Lưu dữ liệu sản phẩm
                    // Đặt hình ảnh mặc định là hình đầu tiên
                    if (data.data?.images?.length > 0) {
                        setSelectedImage(data.data.images[0].url);
                    }
                } catch (err) {
                    console.error('Không thể lấy chi tiết sản phẩm:', err);
                }
            }
        };

        fetchProduct();
    }, [product?.id]); // Chỉ chạy lại khi product.id thay đổi

    
    const handleAddToFavorite = async () => {
        const token = getToken();

        if (!token) {
            Modal.confirm({
                title: 'Bạn chưa đăng nhập',
                content: 'Bạn cần đăng nhập để thêm sản phẩm vào danh sách yêu thích. Bạn có muốn chuyển đến trang đăng nhập không?',
                okText: 'Đồng ý',
                cancelText: 'Hủy',
                onOk: () => navigate('/signIn'),
            });
            return;
        }

        try {
            const userId = getUserId();
            await dispatch(addToFavorites({ userId, productId: product.id, token })); // Gọi API thêm vào yêu thích
            message.success('Sản phẩm đã được thêm vào danh sách yêu thích.');
        } catch (err) {
            console.error('Add to favorite error:', err);
            message.error('Không thể thêm sản phẩm vào danh sách yêu thích.');
        }
    };
    
    if (!productData) return null; // Không render gì khi chưa có dữ liệu
    const rating = product?.ratings ? Number(product?.ratings) : 0;

    return (
        <Card>
            <ImageWrapper onClick={handleDetailsProduct}>
                {/* Kiểm tra nếu có ảnh, nếu có thì hiển thị, nếu không thì hiển thị một ảnh mặc định */}
                {productImage ? (
                    <ProductImage src={`http://localhost:4000/${productImage}`} alt={product.prod_name} />
                ) : (
                    <ProductImage src="path/to/default-image.jpg" alt="Default product image" />
                )}
            </ImageWrapper>
            <CardContent>
                <Category>{product.category_id || 'Uncategorized'}</Category>
                <ProductTitle>{product.prod_name}</ProductTitle>
                <RatingWrapper>
                    <Rate allowHalf value={rating} style={{ fontSize: '10px' }} />
                </RatingWrapper>
                <Price>${product.price || 'N/A'}</Price>
                <AddToCartWrapper>
                    <CartButton>
                        <CartIcon />
                    </CartButton>
                    <AddToCartText onClick={handleAddToCart}>ADD TO CART</AddToCartText>
                </AddToCartWrapper>
            </CardContent>
            <FavoriteButton onClick={handleAddToFavorite}>
                <Heart />
            </FavoriteButton>
        </Card>
    )
}

export default CardComponent