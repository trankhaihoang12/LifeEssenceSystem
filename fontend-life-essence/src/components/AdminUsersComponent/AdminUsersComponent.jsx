import React, { useState } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import { ExportButton, StatusBadge, WrapperButton, WrapperContainer, WrapperHeader, WrapperInput, WrapperPagination, WrapperTable, WrapperTableData, WrapperTableHeader, WrapperTableRow } from './Style';
import { LuSearch } from 'react-icons/lu';
import { EditFormContainer, EditForm, Input, EditFormButton, CancelButton } from './Style'; // Thêm vào các styled-component cho form chỉnh sửa

const AdminUsersComponnent = () => {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [showEditForm, setShowEditForm] = useState(false); // State để hiển thị form chỉnh sửa
    const [editUser, setEditUser] = useState(null); // Lưu thông tin người dùng đang chỉnh sửa

    const users = [
        { id: 1, name: 'Huynh Nhu', username: '@nhuhuynh', status: 'Paid', orders: 22, email: 'nhuhuynh@gmail.com', joinDate: '25/01/2023', country: 'Đà Nẵng' },
        { id: 2, name: 'Nguyen Manh', username: '@Manh123', status: 'Active', orders: 6, email: 'manh123@gmail.com', joinDate: '12/04/2024', country: 'Quảng Bình' },
        { id: 3, name: 'Nguyen Hoang', username: '@Hoang123', status: 'Pending', orders: 2, email: 'hoang123@gmail.com', joinDate: '16/07/2023', country: 'Hà Nội' },
        { id: 4, name: 'Mai Anh', username: '@MaiAnh', status: 'Active', orders: 8, email: 'maianh@gmail.com', joinDate: '20/11/2023', country: 'TP. HCM' },
        { id: 5, name: 'Linh Ngoc', username: '@LinhNgoc', status: 'Paid', orders: 15, email: 'linhngoc@gmail.com', joinDate: '10/02/2024', country: 'Cần Thơ' },
        { id: 6, name: 'Trang Tien', username: '@TrangTien', status: 'Active', orders: 5, email: 'trangtien@gmail.com', joinDate: '18/03/2023', country: 'Bình Dương' },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;
    const totalPages = Math.ceil(users.length / usersPerPage);

    const handleExport = () => {
        alert('Xuất file Excel');
    };

    const handleEdit = (user) => {
        setEditUser(user); // Lưu thông tin người dùng cần chỉnh sửa
        setShowEditForm(true); // Hiển thị form chỉnh sửa
    };

    const handleDelete = (id) => {
        alert(`Delete user with id: ${id}`);
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedUsers(users.map(user => user.id));
        } else {
            setSelectedUsers([]);
        }
    };

    const handleSelectUser = (id) => {
        setSelectedUsers(prevSelected => {
            if (prevSelected.includes(id)) {
                return prevSelected.filter(userId => userId !== id);
            } else {
                return [...prevSelected, id];
            }
        });
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const displayedUsers = users.slice(
        (currentPage - 1) * usersPerPage,
        currentPage * usersPerPage
    );

    const handleSaveEdit = () => {
        alert(`User with id ${editUser.id} updated.`);
        setShowEditForm(false); // Đóng form chỉnh sửa sau khi lưu
    };

    const handleCancelEdit = () => {
        setShowEditForm(false); // Đóng form nếu người dùng hủy
    };

    return (
        <WrapperContainer>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
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

            {/* Form chỉnh sửa người dùng */}
            {showEditForm && (
                <EditFormContainer>
                    <EditForm>
                        <h3>Edit User</h3>
                        <Input 
                            type="text" 
                            value={editUser?.name || ''} 
                            onChange={(e) => setEditUser({ ...editUser, name: e.target.value })} 
                            placeholder="Enter name" 
                        />
                        <Input 
                            type="text" 
                            value={editUser?.email || ''} 
                            onChange={(e) => setEditUser({ ...editUser, email: e.target.value })} 
                            placeholder="Enter email" 
                        />
                        {/* Các input khác tương tự */}
                        <div>
                            <EditFormButton onClick={handleSaveEdit}>Save</EditFormButton>
                            <CancelButton onClick={handleCancelEdit}>Cancel</CancelButton>
                        </div>
                    </EditForm>
                </EditFormContainer>
            )}

            <WrapperTable>
                <thead>
                    <tr>
                        <WrapperTableHeader>
                            <input
                                type="checkbox"
                                checked={selectedUsers.length === users.length}
                                onChange={handleSelectAll}
                            />
                        </WrapperTableHeader>
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
                            <WrapperTableData>
                                <input
                                    type="checkbox"
                                    checked={selectedUsers.includes(user.id)}
                                    onChange={() => handleSelectUser(user.id)}
                                />
                            </WrapperTableData>
                            <WrapperTableData>{user.name} <small>{user.username}</small></WrapperTableData>
                            <WrapperTableData><StatusBadge status={user.status}>{user.status}</StatusBadge></WrapperTableData>
                            <WrapperTableData>{user.orders}</WrapperTableData>
                            <WrapperTableData>{user.email}</WrapperTableData>
                            <WrapperTableData>{user.joinDate}</WrapperTableData>
                            <WrapperTableData>{user.country}</WrapperTableData>
                            <WrapperTableData>
                                <FaPen onClick={() => handleEdit(user)} style={{ cursor: 'pointer', color: '#6366F1' }} />
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
    );
};

export default AdminUsersComponnent;
