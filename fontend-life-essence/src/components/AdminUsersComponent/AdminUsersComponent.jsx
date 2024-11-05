import React, { useState } from 'react'
import { FaPen, FaTrash } from 'react-icons/fa';
import { ExportButton, StatusBadge, WrapperButton, WrapperContainer, WrapperHeader, WrapperInput, WrapperPagination, WrapperTable, WrapperTableData, WrapperTableHeader, WrapperTableRow } from './Style';
import { LuSearch } from 'react-icons/lu';



const AdminUsersComponnent = () => {
    const users = [
        { id: 1, name: 'Huynh Nhu', username: '@nhuhuynh', status: 'Paid', orders: 22, email: 'nhuhuynh@gmail.com', joinDate: '25/01/2023', country: 'Đà Nẵng' },
        { id: 2, name: 'Nguyen Manh', username: '@Manh123', status: 'Active', orders: 6, email: 'manh123@gmail.com', joinDate: '12/04/2024', country: 'Quảng Bình' },
        { id: 1, name: 'Huynh Nhu', username: '@nhuhuynh', status: 'Paid', orders: 22, email: 'nhuhuynh@gmail.com', joinDate: '25/01/2023', country: 'Đà Nẵng' },
        { id: 2, name: 'Nguyen Manh', username: '@Manh123', status: 'Active', orders: 6, email: 'manh123@gmail.com', joinDate: '12/04/2024', country: 'Quảng Bình' },
        { id: 1, name: 'Huynh Nhu', username: '@nhuhuynh', status: 'Paid', orders: 22, email: 'nhuhuynh@gmail.com', joinDate: '25/01/2023', country: 'Đà Nẵng' },
        { id: 2, name: 'Nguyen Manh', username: '@Manh123', status: 'Active', orders: 6, email: 'manh123@gmail.com', joinDate: '12/04/2024', country: 'Quảng Bình' },

    ];


    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;
    const totalPages = Math.ceil(users.length / usersPerPage);

    const handleExport = () => {
        alert('Xuất file Excel');
    };

    const handleEdit = (id) => {
        alert(`Edit user with id: ${id}`);
    };

    const handleDelete = (id) => {
        alert(`Delete user with id: ${id}`);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const displayedUsers = users.slice(
        (currentPage - 1) * usersPerPage,
        currentPage * usersPerPage
    );
    return (
        <WrapperContainer>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '20px', width: '750px', height: '44px', marginBottom: '20px' }}>
                    <WrapperInput type="text" placeholder="Tìm kiếm..." />
                    <WrapperButton>
                        <span style={{ fontSize: '20px', color: '#fff' }}><LuSearch /></span>
                    </WrapperButton>
                </div>
            </div>
            <WrapperHeader>
                <h2>Users Management</h2>
                <span>{users.length} users</span>
            </WrapperHeader>
            <ExportButton onClick={handleExport}>
                Export Excel
            </ExportButton>
            <WrapperTable>
                <thead>
                    <tr>
                        <WrapperTableHeader><input type="checkbox" /></WrapperTableHeader>
                        <WrapperTableHeader>Name</WrapperTableHeader>
                        <WrapperTableHeader>Status</WrapperTableHeader>
                        <WrapperTableHeader>Order</WrapperTableHeader>
                        <WrapperTableHeader>Email address</WrapperTableHeader>
                        <WrapperTableHeader>Join On</WrapperTableHeader>
                        <WrapperTableHeader>Country</WrapperTableHeader>
                        <WrapperTableHeader>Actions</WrapperTableHeader>
                    </tr>
                </thead>
                <tbody>
                    {displayedUsers.map((user) => (
                        <WrapperTableRow key={user.id}>
                            <WrapperTableData><input type="checkbox" /></WrapperTableData>
                            <WrapperTableData>{user.name} <small>{user.username}</small></WrapperTableData>
                            <WrapperTableData><StatusBadge status={user.status}>{user.status}</StatusBadge></WrapperTableData>
                            <WrapperTableData>{user.orders}</WrapperTableData>
                            <WrapperTableData>{user.email}</WrapperTableData>
                            <WrapperTableData>{user.joinDate}</WrapperTableData>
                            <WrapperTableData>{user.country}</WrapperTableData>
                            <WrapperTableData>
                                <FaPen onClick={() => handleEdit(user.id)} style={{ cursor: 'pointer', color: '#6366F1' }} />
                                <FaTrash onClick={() => handleDelete(user.id)} style={{ cursor: 'pointer', color: '#E53E3E', marginLeft: '8px' }} />
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
        </WrapperContainer>
    )
}

export default AdminUsersComponnent