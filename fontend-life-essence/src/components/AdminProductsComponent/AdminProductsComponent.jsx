import React, { useState } from 'react';
import { Container, AddProduct, ExportButton, WrapperTableHeader, WrapperTableData, WrapperTableRow, WrapperTable, WrapperPagination, EditFormContainer, EditForm, EditFormButton, WarraperInput } from './Style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FaPen, FaTrash } from 'react-icons/fa';
import ModalComponent from '../ModalComponent/ModalComponent';

const AdminProductComponent = () => {
    const [products, setProducts] = useState([
        { id: 1, name: "ManhNhiDeptrai", price: 150000, rating: 3.4, type: "Trắng da", quantity: '10' },
        { id: 2, name: "Canxi & Vitamin D", price: 300000, rating: 3.4, type: "Canxi & Vitamin D", quantity: '10' },
        { id: 3, name: "Mạnh đẹp", price: 100000, rating: 3.4, type: "Collagen", quantity: '10' },
        { id: 4, name: "Hoàng Xấu", price: 300000, rating: 3.4, type: "Dầu cá Omega-3", quantity: '10' },
        { id: 5, name: "Omega", price: 300000, rating: 3.4, type: "Giảm cân", quantity: '10' },
        { id: 6, name: "Chết má", price: 300000, rating: 3.4, type: "Glucosamine", quantity: '10' },
        { id: 7, name: "Nhìn gì", price: 300000, rating: 3.4, type: "Tăng chiều cao", quantity: '10' },
        { id: 8, name: "Manhhhhhh", price: 300000, rating: 3.4, type: "Trắng da", quantity: '10' },
        { id: 9, name: "Manhhhhhh", price: 300000, rating: 3.4, type: "Collagen", quantity: '10' },
    ]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isEditing, setIsEditing] = useState(false); // Trạng thái cho form chỉnh sửa
    const [editProduct, setEditProduct] = useState(null); // Dữ liệu sản phẩm cần chỉnh sửa
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [newProduct, setNewProduct] = useState({ name: '', price: '', rating: '', type: '', quantity: '' });

    const itemsPerPage = 5;
    const totalPages = Math.ceil(products.length / itemsPerPage);

    const handleAddProduct = () => {
        if (!newProduct.name || !newProduct.price || !newProduct.quantity) {
            alert("Vui lòng điền đầy đủ thông tin.");
            return;
        }
        setProducts([...products, { ...newProduct, id: Date.now() }]);
        setNewProduct({ name: '', price: '', rating: '', type: '', quantity: '' }); // Reset form
        setIsModalOpen(false); // Đóng modal
    };

    const handleExport = () => {
        alert('Xuất file Excel');
    };

    const handleEdit = (product) => {
        setEditProduct(product); // Lưu sản phẩm cần chỉnh sửa
        setIsEditing(true); // Hiển thị form chỉnh sửa
    };

    const handleDeleteProduct = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            setProducts(products.filter(product => product.id !== id));
            setSelectedProducts(selectedProducts.filter(productId => productId !== id));
        }
    };

    const handleUpdateProduct = () => {
        if (!editProduct.name || !editProduct.price || !editProduct.quantity) {
            alert("Vui lòng điền đầy đủ thông tin.");
            return;
        }
        // Cập nhật sản phẩm trong danh sách
        setProducts(products.map(product => (product.id === editProduct.id ? editProduct : product)));
        setIsEditing(false); // Ẩn form chỉnh sửa sau khi cập nhật
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
                title="Thêm Sản Phẩm"
                isOpen={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
            >
                <label>Tên Sản Phẩm:</label>
                <WarraperInput
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
                <label>Giá:</label>
                <WarraperInput
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                />
                <label>Số lượng:</label>
                <WarraperInput
                    type="number"
                    value={newProduct.quantity}
                    onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                />
                <label>Đánh giá:</label>
                <WarraperInput
                    type="number"
                    value={newProduct.rating}
                    onChange={(e) => setNewProduct({ ...newProduct, rating: e.target.value })}
                />
                <label>Loại:</label>
                <WarraperInput
                    type="text"
                    value={newProduct.type}
                    onChange={(e) => setNewProduct({ ...newProduct, type: e.target.value })}
                />
                <EditFormButton onClick={handleAddProduct}>Thêm Sản Phẩm</EditFormButton>
            </ModalComponent>

            {/* Form chỉnh sửa sản phẩm */}
            {isEditing && (
                <EditFormContainer>
                    <EditForm>
                        <h2>Edit Product</h2>
                        <label>Name:</label>
                        <WarraperInput
                            
                            type="text" 
                            value={editProduct.name} 
                            onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })} 
                        />
                        <label>Price:</label>
                        <WarraperInput 
                            type="number" 
                            value={editProduct.price} 
                            onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })} 
                        />
                        <label>Quantity:</label>
                        <WarraperInput 
                            type="number" 
                            value={editProduct.quantity} 
                            onChange={(e) => setEditProduct({ ...editProduct, quantity: e.target.value })} 
                        />
                        <label>Rating:</label>
                        <WarraperInput 
                            type="number" 
                            value={editProduct.rating} 
                            onChange={(e) => setEditProduct({ ...editProduct, rating: e.target.value })} 
                        />
                        <label>Category:</label>
                        <WarraperInput 
                            type="text" 
                            value={editProduct.type} 
                            onChange={(e) => setEditProduct({ ...editProduct, type: e.target.value })} 
                        />
                        <EditFormButton onClick={handleUpdateProduct}>Update</EditFormButton>
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
                            <WrapperTableData>{product.name}</WrapperTableData>
                            <WrapperTableData>{product.price.toLocaleString()} đ</WrapperTableData>
                            <WrapperTableData>{product.rating}</WrapperTableData>
                            <WrapperTableData>{product.type}</WrapperTableData>
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
