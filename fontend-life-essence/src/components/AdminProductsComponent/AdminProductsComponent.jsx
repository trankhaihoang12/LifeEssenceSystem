import React, { useEffect, useState } from 'react';
import { Container, AddProduct, ExportButton, WrapperTableHeader, WrapperTableData, WrapperTableRow, WrapperTable, WrapperPagination, EditFormContainer, EditForm, EditFormButton, WarraperInput, RowWrapper, CancelButton, ButtonWrapper, TextArea } from './Style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FaPen, FaTrash } from 'react-icons/fa';
import ModalComponent from '../ModalComponent/ModalComponent';
import * as ProductsService from '../../services/ProductsService'
import * as AdminService from '../../services/AdminService'
import * as XLSX from 'xlsx';
import * as message from '../../components/MessageComponent/Message'

const AdminProductComponent = () => {
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
        usage_instructions: '',
        benefits: '',
        origin: '',
        additional_info: '',
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
        usage_instructions: '',
        benefits: '',
        origin: '',
        additional_info: '',
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
                    const fetchedProducts = await ProductsService.getAllProducts(token); // Truyền token vào API
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
            discount,
            ratings,
            expiration_date,
            usage_instructions, benefits, origin, additional_info,
            images,
        } = newProduct;

        if (!prod_name || !price || !quantity || !category_id || !prod_description || !cost || !ratings || !expiration_date || !usage_instructions || !benefits || !discount || !origin || !additional_info || !images.length === 0) {
            message.error("Please fill in all information.");
            return;
        }
        // Kiểm tra độ dài ký tự
        if (prod_name.length < 3 || prod_name.length > 50) {
            message.error("Product name must be between 3 and 50 characters.");
            return;
        }
        if (prod_description.length < 10 || prod_description.length > 200) {
            message.error(" Product description must be between 10 and 200 characters.");
            return;
        }

        // Kiểm tra kiểu dữ liệu và giá trị cho các trường số
        const numericFields = [
            { name: 'Giá', value: price },
            { name: 'Số lượng', value: quantity },
            { name: 'Chi phí', value: cost },
            { name: 'Giảm giá', value: discount },
            { name: 'Đánh giá', value: ratings },
        ];

        for (const field of numericFields) {
            if (isNaN(field.value)) {
                message.error(`${field.name} must be a valid number.`);
                return;
            }
            if (field.value < 0) {
                message.error(`${field.name} must not be less than 0.`);
                return;
            }
        }
        // Kiểm tra rating
        if (ratings < 1 || ratings > 5) {
            message.error("Rating must be between 1 and 5.");
            return;
        }

        if (discount < 0 || discount > 1) {
            message.error("Discount must be between 0 and 1.");
            return;
        }

        // Kiểm tra định dạng ngày tháng
        if (new Date(expiration_date) <= new Date()) {
            message.error("Expiry date must be greater than current date.");
            return;
        }
        // Kiểm tra độ dài cho usage_instructions, benefits, additional_info
        if (usage_instructions.length < 20 || usage_instructions.length > 500) {
            message.error("Instructions for use must be between 20 and 500 characters.");
            return;
        }
        if (benefits.length < 20 || benefits.length > 500) {
            message.error("Benefits must be between 20 and 500 characters.");
            return;
        }
        if (additional_info.length < 20 || additional_info.length > 500) {
            message.error("Additional information must be between 20 and 500 characters.");
            return;
        }


        // Kiểm tra kích thước và định dạng hình ảnh (nếu cần)
        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
        for (let image of images) {
            if (!validImageTypes.includes(image.type)) {
                message.error("Please select image in JPEG, PNG or GIF format.");
                return;
            }
            if (image.size > 5 * 1024 * 1024) { // Giới hạn kích thước hình ảnh là 5MB
                message.error("Image size must not exceed 5MB.");
                return;
            }
        }

        const token = getToken();

        if (!token) {
            message.error("Please login again.");
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
            formData.append("discount", discount);
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
            const addedProduct = await ProductsService.addProduct(formData, token);
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
                    discount: '',
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
                message.success("Product added successfully!");
            } else {
                // Xử lý khi API không trả về dữ liệu hợp lệ
                throw new Error("API không trả về dữ liệu sản phẩm mới.");
            }
        } catch (error) {
            // Xử lý lỗi khi gọi API
            console.error("Lỗi khi thêm sản phẩm:", error);

            // Thông báo lỗi rõ ràng hơn
            message.error(
                error.response?.data?.message ||
                "An error occurred while adding the product. Please try again."
            );
        }
    };

    useEffect(() => {
        if (isModalOpen) {
            const fetchCategories = async () => {
                const token = getToken()
                try {
                    setLoading(true); // Hiển thị loading
                    const data = await AdminService.getAllCategory(token);
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
        // Kiểm tra nếu không có sản phẩm
        if (products.length === 0) {
            message.error("There are no products to export.");
            return;
        }

        // Chuyển đổi mảng sản phẩm thành dữ liệu Excel (tạo sheet)
        const sheet = XLSX.utils.json_to_sheet(products.map(product => ({
            "Tên sản phẩm": product.prod_name,
            "Mô tả": product.prod_description,
            "Giá": product.price,
            "Số lượng": product.quantity,
            "Danh mục": product.category_name, // Giả sử bạn có thuộc tính category_name
            "Đánh giá": product.ratings,
            "Ngày hết hạn": product.expiration_date,
            "Giảm giá": product.prod_percent,
        })));

        // Tạo workbook từ sheet
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, sheet, "Sản phẩm");

        // Xuất file Excel
        XLSX.writeFile(wb, "Danh_sach_san_pham.xlsx");
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
        if (window.confirm('Are you sure you want to delete this product?')) {
            const token = getToken();

            if (!token) {
                message.error("Please login again.");
                return;
            }

            try {
                // Call the API to delete the product from the database
                await ProductsService.deleteProduct(id, token);

                // If the API call is successful, remove the product from the state
                setProducts(products.filter(product => product.id !== id));
                setSelectedProducts(selectedProducts.filter(productId => productId !== id));

                message.success("Product deleted successfully!");
            } catch (error) {
                console.error("Lỗi khi xóa sản phẩm:", error);
                message.error("An error occurred while deleting the product. Please try again.");
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
            ratings,
            expiration_date,
            usage_instructions,
            benefits,
            origin,
            additional_info,
            images,
        } = editProduct;

        if (!prod_name || !price || !quantity || !discount || !category_id || !prod_description || !cost || !ratings || !expiration_date || !usage_instructions || !benefits || !origin || !additional_info) {
            message.error("Please fill in all information.");
            return;
        }

        const token = getToken();

        if (!token) {
            message.error("Please login again.");
            return;
        }

        try {
            const formData = createFormData(editProduct);

            const updatedProduct = await ProductsService.updateProduct(editProduct.id, formData, token);
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
                message.success("Product update successful!");
            } else {
                throw new Error("API không trả về dữ liệu sản phẩm đã cập nhật.");
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật sản phẩm:", error);
            message.error(
                error.response?.data?.message || "An error occurred while updating the product. Please try again."
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
        formData.append("best_seller", product.best_seller);
        formData.append("ratings", product.ratings);
        formData.append("expiration_date", product.expiration_date);
        formData.append("usage_instructions", product.usage_instructions);
        formData.append("benefits", product.benefits);
        formData.append("origin", product.origin);
        formData.append("additional_info", product.additional_info);

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
            best_seller: false,
            ratings: '',
            expiration_date: '',
            usage_instructions: '',
            benefits: '',
            origin: '',
            additional_info: '',
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

    const handleRemoveNewImage = (index) => {
        const updatedImages = [...newProduct.images];
        updatedImages.splice(index, 1);  // Xóa ảnh tại index
        setNewProduct({
            ...newProduct,
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
                title="Add new product"
                isOpen={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onAdd={handleAddProduct}
                width="950px"
                newProduct={newProduct}
                setNewProduct={setNewProduct}
            >
                <EditForm>
                    <select style={{ width: '200px', padding: '7px', borderRadius: '5px' }}
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
                    <RowWrapper columns="1fr 1fr">
                        <div>
                            <label>Category_id:</label>
                            <WarraperInput
                                type="text"
                                value={newProduct.category_id}
                                onChange={(e) => setNewProduct({ ...newProduct, category_id: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Product Name:</label>
                            <WarraperInput
                                type="text"
                                value={newProduct.prod_name}
                                onChange={(e) => setNewProduct({ ...newProduct, prod_name: e.target.value })}
                            />
                        </div>
                    </RowWrapper>
                    <div>
                        <label>Product Descriprion:</label>
                        <WarraperInput
                            type="text"
                            value={newProduct.prod_description}
                            onChange={(e) => setNewProduct({ ...newProduct, prod_description: e.target.value })}
                        />
                    </div>
                    <RowWrapper columns="1fr 1fr">
                        <div>
                            <label>Price:</label>
                            <WarraperInput
                                type="number"
                                value={newProduct.price}
                                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Cost:</label>
                            <WarraperInput
                                type="number"
                                value={newProduct.cost}
                                onChange={(e) => setNewProduct({ ...newProduct, cost: e.target.value })}
                            />
                        </div>
                    </RowWrapper>
                    <RowWrapper columns="1fr 1fr">
                        <div>
                            <label>Quantity:</label>
                            <WarraperInput
                                type="number"
                                value={newProduct.quantity}
                                onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Discount:</label>
                            <WarraperInput
                                type="number"
                                value={newProduct.discount}
                                onChange={(e) => setNewProduct({ ...newProduct, discount: e.target.value })}
                            />
                        </div>
                    </RowWrapper>
                    <RowWrapper columns="1fr 1fr">
                        <div>
                            <label>Expiration Date:</label>
                            <WarraperInput
                                type="date"
                                value={newProduct.expiration_date}
                                onChange={(e) => setNewProduct({ ...newProduct, expiration_date: e.target.value })}
                            />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                            <label>Best Seller:</label>
                            <input
                                type="checkbox"
                                checked={newProduct.best_seller}
                                onChange={(e) => setNewProduct({ ...newProduct, best_seller: e.target.checked })}
                            />
                        </div>
                    </RowWrapper>
                    <RowWrapper columns="1fr 1fr">
                        <div>
                            <label>Ratings:</label>
                            <WarraperInput
                                type="number"
                                value={newProduct.ratings}
                                onChange={(e) => setNewProduct({ ...newProduct, ratings: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Origin:</label>
                            <WarraperInput
                                type="text"
                                value={newProduct.origin}
                                onChange={(e) => setNewProduct({ ...newProduct, origin: e.target.value })}
                            />
                        </div>
                    </RowWrapper>
                    <label>Usage Instructions:</label>
                    <TextArea
                        rows="3"
                        placeholder="write here"
                        value={newProduct.usage_instructions}
                        onChange={(e) => setNewProduct({ ...newProduct, usage_instructions: e.target.value })}
                        required
                    />

                    <label>Benefits:</label>
                    <TextArea
                        rows="3"
                        placeholder="write here"
                        value={newProduct.benefits}
                        onChange={(e) => setNewProduct({ ...newProduct, benefits: e.target.value })}
                        required
                    />
                    <label>Additional Info:</label>
                    <TextArea
                        rows="3"
                        placeholder="write here"
                        value={newProduct.additional_info}
                        onChange={(e) => setNewProduct({ ...newProduct, additional_info: e.target.value })}
                        required
                    />

                    <label>Images Product:</label>
                    <input
                        type="file"
                        multiple
                        name="images"
                        onChange={handleImageUpload}
                        id="file-upload"
                        style={{
                            display: 'none', // Ẩn input file gốc
                        }}
                    />
                    <div style={{ width: '200px', height: '50px', backgroundColor: '#f1f1f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <label htmlFor="file-upload" style={{
                            cursor: 'pointer',
                            backgroundColor: '#24AEB1',
                            color: '#fff',
                            padding: '10px 20px',
                            borderRadius: '4px',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            transition: 'background-color 0.3s ease'
                        }}>
                            Choose file
                        </label>
                    </div>

                    <span>{newProduct.images.length} file đã chọn</span>
                    <div>
                        {newProduct.images.length > 0 && (
                            <div>
                                {newProduct.images.map((image, index) => (
                                    <div key={index} style={{ position: 'relative', display: 'inline-block', margin: '10px' }}>
                                        <img
                                            src={URL.createObjectURL(image)} // Tạo URL tạm cho ảnh đã chọn
                                            alt={`product-preview-${index}`}
                                            style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                        />
                                        <button
                                            onClick={() => handleRemoveNewImage(index)} // Gọi hàm xóa ảnh
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
                                        >
                                            X
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </EditForm>
            </ModalComponent>

            {/* Form chỉnh sửa sản phẩm */}
            {isEditing && (
                <EditFormContainer style={{ overflowY: "auto" }}>
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
                            <label>Instructions for use:</label>
                            <WarraperInput
                                type="text"
                                value={editProduct.usage_instructions}
                                onChange={(e) => setEditProduct({ ...editProduct, usage_instructions: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Benefits:</label>
                            <WarraperInput
                                type="text"
                                value={editProduct.benefits}
                                onChange={(e) => setEditProduct({ ...editProduct, benefits: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Origin:</label>
                            <WarraperInput
                                type="text"
                                value={editProduct.origin}
                                onChange={(e) => setEditProduct({ ...editProduct, origin: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Additional_info:</label>
                            <WarraperInput
                                type="text"
                                value={editProduct.additional_info}
                                onChange={(e) => setEditProduct({ ...editProduct, additional_info: e.target.value })}
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

export default AdminProductComponent;
