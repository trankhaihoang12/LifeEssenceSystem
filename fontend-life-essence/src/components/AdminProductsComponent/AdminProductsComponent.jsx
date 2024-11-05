import React, { useState } from 'react';
import { Container, AddProduct, ExportButton, WrapperTableHeader, WrapperTableData, WrapperTableRow, WrapperTable, WrapperPagination } from './Style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus} from '@fortawesome/free-solid-svg-icons';
import { FaPen, FaTrash } from 'react-icons/fa';
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
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const handleAddProduct = () => {
        alert('Thêm sản phẩm');
    };
    const handleExport = () => {
        alert('Xuất file Excel');
    };
    const handleEdit = (id) => {
        alert(`Edit user with id: ${id}`);
    };
    const handleDelete = (id) => {
        alert(`Delete user with id: ${id}`);
    };
    const handleDeleteProduct = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            setProducts(products.filter(product => product.id !== id));
        }
    };
    const handleEditProduct = (id) => {
        alert(`Chỉnh sửa sản phẩm với ID: ${id}`);
    };
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    return (
        <Container>
            <h1>Product Management</h1>
            <AddProduct onClick={handleAddProduct}>
                <FontAwesomeIcon icon={faPlus} size="4x" />
            </AddProduct>
            <ExportButton onClick={handleExport}>
                Export Excel
            </ExportButton>
            <WrapperTable>
                <thead>
                    <tr>
                        <WrapperTableHeader><input type="checkbox" /></WrapperTableHeader>
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
                            <WrapperTableData><input type="checkbox" /></WrapperTableData>
                            <WrapperTableData>{product.name}</WrapperTableData>
                            <WrapperTableData>{product.price.toLocaleString()} đ</WrapperTableData>
                            <WrapperTableData>{product.rating}</WrapperTableData>
                            <WrapperTableData>{product.type}</WrapperTableData>
                            <WrapperTableData>{product.quantity}</WrapperTableData>
                            <WrapperTableData className="action-icons">
                                <FaPen onClick={() => handleEdit(product.id)} style={{ cursor: 'pointer', color: '#6366F1' }} />
                                <FaTrash onClick={() => handleDelete(product.id)} style={{ cursor: 'pointer', color: '#E53E3E', marginLeft: '8px' }} />
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