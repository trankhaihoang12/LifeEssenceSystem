import React, { useState } from 'react';
import { Container, AddProduct, ExportButton, ProductTable, Pagination } from './Style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';

const AdminProductComponent = () => {
    const [products, setProducts] = useState([
        { id: 1, name: "ManhNhiDeptrai", price: 150000, rating: 3.4, type: "Trắng da" },
        { id: 2, name: "Canxi & Vitamin D", price: 300000, rating: 3.4, type: "Canxi & Vitamin D" },
        { id: 3, name: "Mạnh đẹp", price: 100000, rating: 3.4, type: "Collagen" },
        { id: 4, name: "Hoàng Xấu", price: 300000, rating: 3.4, type: "Dầu cá Omega-3" },
        { id: 5, name: "Omega", price: 300000, rating: 3.4, type: "Giảm cân" },
        { id: 6, name: "Chết má", price: 300000, rating: 3.4, type: "Glucosamine" },
        { id: 7, name: "Nhìn gì", price: 300000, rating: 3.4, type: "Tăng chiều cao" },
        { id: 8, name: "Manhhhhhh", price: 300000, rating: 3.4, type: "Trắng da" },
        { id: 9, name: "Manhhhhhh", price: 300000, rating: 3.4, type: "Collagen" },
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
            <ProductTable className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col"><input type="checkbox" /></th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Rating</th>
                        <th scope="col">Category</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentProducts.map(product => (
                        <tr key={product.id}>
                            <td><input type="checkbox" /></td>
                            <td>{product.name}</td>
                            <td>{product.price.toLocaleString()} đ</td>
                            <td>{product.rating}</td>
                            <td>{product.type}</td>
                            <td className="action-icons">
                                <FontAwesomeIcon 
                                    icon={faPen} 
                                    className="text-warning me-2" 
                                    onClick={() => handleEditProduct(product.id)} 
                                />
                                <FontAwesomeIcon 
                                    icon={faTrash} 
                                    className="text-danger ms-2" 
                                    onClick={() => handleDeleteProduct(product.id)} 
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </ProductTable>
            <Pagination>
                <button 
                    onClick={() => handlePageChange(currentPage - 1)} 
                    disabled={currentPage === 1}
                    className="btn btn-secondary me-2"
                >
                    Previous
                </button>
                <div className="page-number">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <span
                            key={i + 1}
                            onClick={() => handlePageChange(i + 1)}
                            className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
                        >
                            {i + 1}
                        </span>
                    ))}
                </div>
                <button 
                    onClick={() => handlePageChange(currentPage + 1)} 
                    disabled={currentPage === totalPages}
                    className="btn btn-secondary ms-2"
                >
                    Next
                </button>
            </Pagination>
        </Container>
    );
};

export default AdminProductComponent;
