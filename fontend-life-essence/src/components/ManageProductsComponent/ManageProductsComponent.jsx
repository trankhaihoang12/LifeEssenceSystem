import React, { useEffect, useState } from 'react';
import { Container, AddProduct, ExportButton, WrapperTableHeader, WrapperTableData, WrapperTableRow, WrapperTable, WrapperPagination, EditFormContainer, EditForm, EditFormButton, WarraperInput, RowWrapper, CancelButton, ButtonWrapper } from './Style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FaPen, FaTrash } from 'react-icons/fa';
import ModalComponent from '../ModalComponent/ModalComponent';
import * as ProductsService from '../../services/ProductsService'
import * as ManageService from '../../services/ManageService'

const ManageProductsComponent = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isEditing, setIsEditing] = useState(false); // Trạng thái cho form chỉnh sửa
    const [editProduct, setEditProduct] = useState({
        category_id: '',
        prod_name: '',
        prod_description: '',
        price: '',
        cost: '',
        quantity: '',
        prod_percent: '',
        best_seller: false,
        ratings: '',
        expiration_date: '',
        images: [],
    }
    ); // Dữ liệu sản phẩm cần chỉnh sửa
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({
        category_id: '',
        prod_name: '',
        prod_description: '',
        price: '',
        cost: '',
        quantity: '',
        prod_percent: '',
        best_seller: false,
        ratings: '',
        expiration_date: '',
        images: [],
    });

    const itemsPerPage = 10;
    const totalPages = Math.ceil(products.length / itemsPerPage);

    const getToken = () => {
        const storedUserData = localStorage.getItem('userData');
        const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;
        return parsedUserData ? parsedUserData.token : null;
    };

    useEffect(() => {
        // Lấy token từ localStorage
        const token = getToken();

        if (token) {
            // Gọi API với token lấy được từ localStorage
            const fetchProducts = async () => {
                try {
                    const fetchedProducts = await ManageService.getAllProducts(token); // Truyền token vào API
                    console.log("Dữ liệu API gửi lên:", fetchedProducts);
                    setProducts(fetchedProducts);
                } catch (error) {
                    console.error("Lỗi khi lấy danh sách sản phẩm:", error);
                }
            };

            fetchProducts();
        } else {
            console.error("Token không tồn tại trong localStorage.");
        }
    }, []);

    const handleAddProduct = async () => {
        // Kiểm tra tất cả các trường cần thiết
        const {
            prod_name,
            price,
            quantity,
            category_id,
            prod_description,
            cost,
            prod_percent,
            ratings,
            expiration_date,
            usage_instructions, benefits, origin, additional_info,
            images,
        } = newProduct;

        if (!prod_name || !price || !quantity || !category_id || !prod_description || !cost || !prod_percent || !ratings || !expiration_date || !usage_instructions || !benefits || !origin || !additional_info || !images.length === 0) {
            alert("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        const token = getToken();

        if (!token) {
            alert("Không tìm thấy token. Vui lòng đăng nhập lại.");
            return;
        }

        try {
            // Tạo FormData để gửi hình ảnh
            const formData = new FormData();
            formData.append("category_id", category_id);
            formData.append("prod_name", prod_name);
            formData.append("prod_description", prod_description);
            formData.append("price", price);
            formData.append("cost", cost);
            formData.append("quantity", quantity);
            formData.append("prod_percent", prod_percent);
            formData.append("best_seller", false);
            formData.append("ratings", ratings);
            formData.append("expiration_date", expiration_date);
            formData.append("usage_instructions", usage_instructions);
            formData.append("benefits", benefits);
            formData.append("origin", origin);
            formData.append("additional_info", additional_info);

            // Thêm các hình ảnh vào FormData
            images.forEach((image) => {
                formData.append("images", image);
            });

            // Gọi API để thêm sản phẩm
            const addedProduct = await ManageService.addProduct(formData, token);
            console.log("Sản phẩm đã thêm:", addedProduct);

            if (addedProduct && addedProduct.product && addedProduct.product.id) {
                setProducts(prevProducts => [...prevProducts, addedProduct.product]);

                // Reset form thông tin sản phẩm mới
                setNewProduct({
                    category_id: '',
                    prod_name: '',
                    prod_description: '',
                    price: '',
                    cost: '',
                    quantity: '',
                    prod_percent: '',
                    best_seller: false,
                    ratings: '',
                    expiration_date: '',
                    usage_instructions: '', 
                    benefits: '', 
                    origin: '', 
                    additional_info: '',
                    images: [],
                });
                // Đóng modal
                setIsModalOpen(false);

                // Hiển thị thông báo thành công
                alert("Thêm sản phẩm thành công!");
            } else {
                // Xử lý khi API không trả về dữ liệu hợp lệ
                throw new Error("API không trả về dữ liệu sản phẩm mới.");
            }
        } catch (error) {
            // Xử lý lỗi khi gọi API
            console.error("Lỗi khi thêm sản phẩm:", error);

            // Thông báo lỗi rõ ràng hơn
            alert(
                error.response?.data?.message ||
                "Có lỗi xảy ra khi thêm sản phẩm. Vui lòng thử lại."
            );
        }
    };

    useEffect(() => {
        if (isModalOpen) {
            const fetchCategories = async () => {
                const token = getToken()
                try {
                    setLoading(true); // Hiển thị loading
                    const data = await ManageService.getAllCategory(token);
                    console.log('data', data)
                    setCategories(data);
                } catch (err) {
                    setError(err.message || "Có lỗi xảy ra");
                } finally {
                    setLoading(false); // Dừng loading
                }
            };

            fetchCategories();
        }
    }, [isModalOpen]);

    const handleExport = () => {
        alert('Xuất file Excel');
    };

    const handleEdit = (product) => {
        if (!product) {
            console.error("Sản phẩm không hợp lệ.");
            return;
        }

        // Chuyển đổi đường dẫn ảnh, thay đổi \\ thành /
        const processedImages = (product.images || []).map((image) => {
            const imageUrl = image.url.replace(/\\/g, "/");
            return `http://localhost:4000/${imageUrl}`; // Hoặc bạn có thể dùng URL gốc của hình ảnh
        });

        // Cập nhật state để hiển thị hình ảnh trong form
        setEditProduct({
            ...product,
            images: processedImages,  // Cập nhật với các URL hình ảnh cũ
        });// Lưu sản phẩm cần chỉnh sửa
        setIsEditing(true); // Hiển thị form chỉnh sửa
    };
    const handleCancelEdit = () => {
        setIsEditing(false); // Đóng form chỉnh sửa
        setEditProduct(null); // Xóa dữ liệu sản phẩm đang chỉnh sửa
    };

    const handleDeleteProduct = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            const token = getToken();

            if (!token) {
                alert("Không tìm thấy token. Vui lòng đăng nhập lại.");
                return;
            }

            try {
                // Call the API to delete the product from the database
                await ManageService.deleteProduct(id, token);

                // If the API call is successful, remove the product from the state
                setProducts(products.filter(product => product.id !== id));
                setSelectedProducts(selectedProducts.filter(productId => productId !== id));

                alert("Sản phẩm đã bị xóa.");
            } catch (error) {
                console.error("Lỗi khi xóa sản phẩm:", error);
                alert("Có lỗi xảy ra khi xóa sản phẩm. Vui lòng thử lại.");
            }
        }
    };

    const handleUpdateProduct = async () => {
        const {
            prod_name,
            price,
            quantity,
            discount,
            category_id,
            prod_description,
            cost,
            prod_percent,
            ratings,
            expiration_date,
            images,
        } = editProduct;

        if (!prod_name || !price || !quantity || !discount || !category_id || !prod_description || !cost || !prod_percent || !ratings || !expiration_date) {
            alert("Vui lòng điền đầy đủ thông tin.");
            return;
        }

        const token = getToken();

        if (!token) {
            alert("Không tìm thấy token. Vui lòng đăng nhập lại.");
            return;
        }

        try {
            const formData = createFormData(editProduct);

            const updatedProduct = await ManageService.updateProduct(editProduct.id, formData, token);
            console.log("Sản phẩm đã cập nhật:", updatedProduct);

            if (updatedProduct && updatedProduct.product && updatedProduct.product.id) {
                // Cập nhật sản phẩm mà không cần tải lại trang
                setProducts(prevProducts => prevProducts.map(product =>
                    product.id === updatedProduct.product.id ? updatedProduct.product : product
                ));

                // Đóng form chỉnh sửa
                setIsEditing(false);
                resetEditProduct();

                // Hiển thị thông báo thành công
                alert("Cập nhật sản phẩm thành công!");
            } else {
                throw new Error("API không trả về dữ liệu sản phẩm đã cập nhật.");
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật sản phẩm:", error);
            alert(
                error.response?.data?.message || "Có lỗi xảy ra khi cập nhật sản phẩm. Vui lòng thử lại."
            );
        }
    };

    const createFormData = (product) => {
        const formData = new FormData();
        formData.append("category_id", product.category_id);
        formData.append("prod_name", product.prod_name);
        formData.append("prod_description", product.prod_description);
        formData.append("price", product.price);
        formData.append("cost", product.cost);
        formData.append("quantity", product.quantity);
        formData.append("discount", product.discount);
        formData.append("prod_percent", product.prod_percent);
        formData.append("best_seller", product.best_seller);
        formData.append("ratings", product.ratings);
        formData.append("expiration_date", product.expiration_date);

        product.images.forEach(image => {
            formData.append("images", image);
        });

        return formData;
    };

    const resetEditProduct = () => {
        setEditProduct({
            category_id: '',
            prod_name: '',
            prod_description: '',
            price: '',
            cost: '',
            quantity: '',
            discount: '',
            prod_percent: '',
            best_seller: false,
            ratings: '',
            expiration_date: '',
            images: [],
        });
    };



    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            setSelectedProducts(products.map(product => product.id));
        } else {
            setSelectedProducts([]);
        }
    };

    const handleSelectProduct = (productId) => {
        if (selectedProducts.includes(productId)) {
            setSelectedProducts(selectedProducts.filter(id => id !== productId));
        } else {
            setSelectedProducts([...selectedProducts, productId]);
        }
    };


    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        setNewProduct((prev) => ({
            ...prev,
            images: [...prev.images, ...files],
        }));
    };

    const handleImageUploadEdit = (event) => {
        const files = Array.from(event.target.files);  // Lấy mảng các file đã chọn
        if (files.length > 0) {
            setEditProduct({
                ...editProduct,
                images: [...editProduct.images, ...files]  // Thêm các hình ảnh mới vào mảng images
            });
        }
    };

    const handleRemoveImage = (index) => {
        const updatedImages = [...editProduct.images];
        updatedImages.splice(index, 1);  // Xóa ảnh tại index
        setEditProduct({
            ...editProduct,
            images: updatedImages,
        });
    };

    return (
        <Container>
            <h1>Product Management</h1>
            <AddProduct onClick={() => setIsModalOpen(true)}>
                <FontAwesomeIcon icon={faPlus} size="4x" />
            </AddProduct>
            <ExportButton onClick={handleExport}>
                Export Excel
            </ExportButton>
            {/* Modal thêm sản phẩm */}
            <ModalComponent
                title="Thêm sản phẩm mới"
                isOpen={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onAdd={handleAddProduct}
                width="950px"
                newProduct={newProduct}
                setNewProduct={setNewProduct}
            >
                <EditForm>
                    <select style={{width: '200px', padding: '7px', borderRadius: '5px'}}
                        value={newProduct.category_id}
                        onChange={(e) => setNewProduct({ ...newProduct, category_id: e.target.value })}
                    >
                        <option value="">-- Choose Category --</option>
                        {categories.map((category) => (
                            <option key={category.category_id} value={category.category_id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <label>Category_id:</label>
                    <WarraperInput
                        type="text"
                        value={newProduct.category_id}
                        onChange={(e) => setNewProduct({ ...newProduct, category_id: e.target.value })}
                    />
                    
                    <label>Tên sản phẩm:</label>
                    <WarraperInput
                        type="text"
                        value={newProduct.prod_name}
                        onChange={(e) => setNewProduct({ ...newProduct, prod_name: e.target.value })}
                    />
                    <label>Mô tả sản phẩm:</label>
                    <WarraperInput
                        type="text"
                        value={newProduct.prod_description}
                        onChange={(e) => setNewProduct({ ...newProduct, prod_description: e.target.value })}
                    />
                    <label>Giá:</label>
                    <WarraperInput
                        type="number"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    />
                    <label>Chi phí:</label>
                    <WarraperInput
                        type="number"
                        value={newProduct.cost}
                        onChange={(e) => setNewProduct({ ...newProduct, cost: e.target.value })}
                    />
                    <label>Số lượng:</label>
                    <WarraperInput
                        type="number"
                        value={newProduct.quantity}
                        onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                    />
                    <label>Giảm giá:</label>
                    <WarraperInput
                        type="number"
                        value={newProduct.discount}
                        onChange={(e) => setNewProduct({ ...newProduct, discount: e.target.value })}
                    />
                    <label>Tỷ lệ giảm giá:</label>
                    <WarraperInput
                        type="number"
                        value={newProduct.prod_percent}
                        onChange={(e) => setNewProduct({ ...newProduct, prod_percent: e.target.value })}
                    />
                    <label>Best Seller:</label>
                    <input
                        type="checkbox"
                        checked={newProduct.best_seller}
                        onChange={(e) => setNewProduct({ ...newProduct, best_seller: e.target.checked })}
                    />
                    <label>Đánh giá:</label>
                    <WarraperInput
                        type="number"
                        value={newProduct.ratings}
                        onChange={(e) => setNewProduct({ ...newProduct, ratings: e.target.value })}
                    />
                    <label>Hướng dẫn sử dụng:</label>
                    <WarraperInput
                        type="text"
                        value={newProduct.usage_instructions}
                        onChange={(e) => setNewProduct({ ...newProduct, usage_instructions: e.target.value })}
                    />
                    <label>Lợi ích:</label>
                    <WarraperInput
                        type="text"
                        value={newProduct.benefits}
                        onChange={(e) => setNewProduct({ ...newProduct, benefits: e.target.value })}
                    />
                    <label>Nguồn gốc:</label>
                    <WarraperInput
                        type="text"
                        value={newProduct.origin}
                        onChange={(e) => setNewProduct({ ...newProduct, origin: e.target.value })}
                    />
                    <label>Thông tin bổ sung:</label>
                    <WarraperInput
                        type="text"
                        value={newProduct.additional_info}
                        onChange={(e) => setNewProduct({ ...newProduct, additional_info: e.target.value })}
                    />
                    <label>Ngày hết hạn:</label>
                    <WarraperInput
                        type="date"
                        value={newProduct.expiration_date}
                        onChange={(e) => setNewProduct({ ...newProduct, expiration_date: e.target.value })}
                    />

                    <label>Hình ảnh:</label>
                    <input
                        type="file"
                        multiple
                        name="images"
                        onChange={handleImageUpload}
                    />
                    <div>
                        {newProduct.images.length > 0 && (
                            <div>
                                {newProduct.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={URL.createObjectURL(image)}  // Tạo URL tạm cho ảnh đã chọn
                                        alt={`product-preview-${index}`}
                                        style={{ width: "100px", margin: "10px" }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </EditForm>
            </ModalComponent>

            {/* Form chỉnh sửa sản phẩm */}
            {isEditing && (
                <EditFormContainer>
                    <EditForm>
                        <h2>Edit Product</h2>
                        <div>
                            <label>Name:</label>
                            <WarraperInput
                                type="text"
                                value={editProduct.prod_name}
                                onChange={(e) => setEditProduct({ ...editProduct, prod_name: e.target.value })}
                            />
                        </div>
                        <RowWrapper columns="1fr 1fr">
                            <div>
                                <label>Price:</label>
                                <WarraperInput
                                    type="number"
                                    value={editProduct.price}
                                    onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
                                />
                            </div>
                            <div>
                                <label>Quantity:</label>
                                <WarraperInput
                                    type="number"
                                    value={editProduct.quantity}
                                    onChange={(e) => setEditProduct({ ...editProduct, quantity: e.target.value })}
                                />
                            </div>
                            <div>
                                <label>Discount:</label>
                                <WarraperInput
                                    type="number"
                                    value={editProduct.discount}
                                    onChange={(e) => setEditProduct({ ...editProduct, discount: e.target.value })}
                                />
                            </div>

                            <div>
                                <label>Rating:</label>
                                <WarraperInput
                                    type="number"
                                    value={editProduct.ratings}
                                    onChange={(e) => setEditProduct({ ...editProduct, ratings: e.target.value })}
                                />
                            </div>
                            <div>
                                <label>Category:</label>
                                <WarraperInput
                                    type="text"
                                    value={editProduct.category_id}
                                    onChange={(e) => setEditProduct({ ...editProduct, category_id: e.target.value })}
                                />
                            </div>
                            <div>
                                <label>Discount Percent:</label>
                                <WarraperInput
                                    type="text"
                                    value={editProduct.prod_percent}
                                    onChange={(e) => setEditProduct({ ...editProduct, prod_percent: e.target.value })}
                                />
                            </div>
                            <div>
                                <label>Cost:</label>
                                <WarraperInput
                                    type="text"
                                    value={editProduct.cost}
                                    onChange={(e) => setEditProduct({ ...editProduct, cost: e.target.value })}
                                />
                            </div>
                            <div>
                                <label>Expiration Date:</label>
                                <WarraperInput
                                    type="date"
                                    value={editProduct.expiration_date}
                                    onChange={(e) => setEditProduct({ ...editProduct, expiration_date: e.target.value })}
                                />
                            </div>
                        </RowWrapper>
                        <div>
                            <label>Description:</label>
                            <WarraperInput
                                type="text"
                                value={editProduct.prod_description}
                                onChange={(e) => setEditProduct({ ...editProduct, prod_description: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Images:</label>
                            <div>
                                {Array.isArray(editProduct.images) && editProduct.images.length > 0 ? (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                        {editProduct.images.map((image, index) => {
                                            if (image instanceof File) {
                                                // Kiểm tra xem image có phải là đối tượng File không (là ảnh mới tải lên)
                                                return (
                                                    <div
                                                        key={index}
                                                        style={{
                                                            position: 'relative',
                                                            width: '120px',
                                                            height: '120px',
                                                            overflow: 'hidden',
                                                            borderRadius: '8px',
                                                            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                                                            marginBottom: '10px',
                                                        }}
                                                    >
                                                        <img
                                                            src={URL.createObjectURL(image)}  // Sử dụng URL.createObjectURL để tạo URL tạm thời
                                                            alt={`product-image-${index}`}
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                objectFit: 'cover',
                                                            }}
                                                        />
                                                        <button
                                                            style={{
                                                                position: 'absolute',
                                                                top: '5px',
                                                                right: '5px',
                                                                background: 'rgba(255, 0, 0, 0.7)',
                                                                color: 'white',
                                                                border: 'none',
                                                                borderRadius: '50%',
                                                                padding: '5px',
                                                                cursor: 'pointer',
                                                                fontSize: '14px',
                                                            }}
                                                            onClick={() => handleRemoveImage(index)}  // Xử lý xóa ảnh
                                                        >
                                                            X
                                                        </button>
                                                    </div>
                                                );
                                            } else if (typeof image === 'string') {
                                                // Nếu image là URL từ server (string), hiển thị ảnh
                                                return (
                                                    <div
                                                        key={index}
                                                        style={{
                                                            position: 'relative',
                                                            width: '120px',
                                                            height: '120px',
                                                            overflow: 'hidden',
                                                            borderRadius: '8px',
                                                            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                                                            marginBottom: '10px',
                                                        }}
                                                    >
                                                        <img
                                                            src={image}  // Đây là URL từ server
                                                            alt={`product-image-${index}`}
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                objectFit: 'cover',
                                                            }}
                                                        />
                                                        <button
                                                            style={{
                                                                position: 'absolute',
                                                                top: '5px',
                                                                right: '5px',
                                                                background: 'rgba(255, 0, 0, 0.7)',
                                                                color: 'white',
                                                                border: 'none',
                                                                borderRadius: '50%',
                                                                padding: '5px',
                                                                cursor: 'pointer',
                                                                fontSize: '14px',
                                                            }}
                                                            onClick={() => handleRemoveImage(index)}  // Xử lý xóa ảnh
                                                        >
                                                            X
                                                        </button>
                                                    </div>
                                                );
                                            } else {
                                                return null;  // Nếu không phải File và không phải URL hợp lệ
                                            }
                                        })}
                                    </div>
                                ) : (
                                    <p>Không có ảnh nào.</p>
                                )}
                            </div>



                            {/* Input chọn ảnh mới */}
                            <input
                                type="file"
                                multiple
                                name="images"
                                accept="image/*"
                                onChange={handleImageUploadEdit} // Xử lý tải ảnh lên
                                style={{ marginTop: '10px' }}
                            />
                        </div>
                        <ButtonWrapper>
                            <EditFormButton onClick={handleUpdateProduct}>Update</EditFormButton>
                            <CancelButton onClick={handleCancelEdit}>Cancel</CancelButton>
                        </ButtonWrapper>
                    </EditForm>
                </EditFormContainer>

            )}

            <WrapperTable>
                <thead>
                    <tr>
                        <WrapperTableHeader>
                            <input
                                type="checkbox"
                                checked={selectedProducts.length === products.length}
                                onChange={handleSelectAll}
                            />
                        </WrapperTableHeader>
                        <WrapperTableHeader>Product Name</WrapperTableHeader>
                        <WrapperTableHeader>Price</WrapperTableHeader>
                        <WrapperTableHeader>Rating</WrapperTableHeader>
                        <WrapperTableHeader>Category</WrapperTableHeader>
                        <WrapperTableHeader>Quantity</WrapperTableHeader>
                        <WrapperTableHeader>Actions</WrapperTableHeader>
                    </tr>
                </thead>
                <tbody>
                    {currentProducts.map(product => (
                        <WrapperTableRow key={product.id}>
                            <WrapperTableData>
                                <input
                                    type="checkbox"
                                    checked={selectedProducts.includes(product.id)}
                                    onChange={() => handleSelectProduct(product.id)}
                                />
                            </WrapperTableData>
                            <WrapperTableData>{product.prod_name}</WrapperTableData>
                            <WrapperTableData>{product.price}</WrapperTableData>
                            <WrapperTableData>{product.ratings}</WrapperTableData>
                            <WrapperTableData>{product.category_id}</WrapperTableData>
                            <WrapperTableData>{product.quantity}</WrapperTableData>
                            <WrapperTableData className="action-icons">
                                <FaPen onClick={() => handleEdit(product)} style={{ cursor: 'pointer', color: '#6366F1' }} />
                                <FaTrash onClick={() => handleDeleteProduct(product.id)} style={{ cursor: 'pointer', color: '#E53E3E', marginLeft: '8px' }} />
                            </WrapperTableData>
                        </WrapperTableRow>
                    ))}
                </tbody>
            </WrapperTable>
            <WrapperPagination>
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                <div className="page-number">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <span
                            key={i + 1}
                            onClick={() => handlePageChange(i + 1)}
                            className={currentPage === i + 1 ? 'active' : ''}
                        >
                            {i + 1}
                        </span>
                    ))}
                </div>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
            </WrapperPagination>
        </Container>
    );
};

export default ManageProductsComponent;
