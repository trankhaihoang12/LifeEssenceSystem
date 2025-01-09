import React, { useEffect, useState } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import { ExportButton, StatusBadge, WrapperButton, WrapperContainer, WrapperHeader, WrapperInput, WrapperPagination, WrapperTable, WrapperTableData, WrapperTableHeader, WrapperTableRow } from './Style';
import { LuSearch } from 'react-icons/lu';
import { EditFormContainer, EditForm, Input, EditFormButton, CancelButton } from './Style'; // Thêm vào các styled-component cho form chỉnh sửa
import * as UserService from '../../services/UserService'
import * as XLSX from 'xlsx'; 
import * as message from '../../components/MessageComponent/Message'


const AdminUsersComponnent = () => {
    const [users , setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [showEditForm, setShowEditForm] = useState(false); // State để hiển thị form chỉnh sửa
    const [editUser, setEditUser] = useState(null); // Lưu thông tin người dùng đang chỉnh sửa

    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;
    const totalPages = Math.ceil(users.length / usersPerPage);

    const getToken = () => {
        const storedUserData = localStorage.getItem('userData');
        console.log(storedUserData)
        const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;
        return parsedUserData ? parsedUserData.token : null;
    };
useEffect(() => {
    const token = getToken();

    if (token) {
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await UserService.getAllUser(token);
                console.log("Dữ liệu API trả về:", fetchedUsers);

                // Chỉ đặt state khi fetchedUsers.data là mảng
                if (Array.isArray(fetchedUsers.data)) {
                    const currentUser = JSON.parse(localStorage.getItem('userData'));
                    const currentUserId = currentUser?.user?.id;
                    console.log('currentUserId', currentUserId)

                    // Kiểm tra nếu có currentUserId và lọc bỏ chính mình khỏi danh sách
                    const filteredUsers = fetchedUsers.data.filter(user => user.id !== currentUserId);
                    setUsers(filteredUsers);  // Cập nhật lại state
                } else {
                    console.error("Dữ liệu API không phải là mảng:", fetchedUsers.data);
                    setUsers([]); // Đặt thành mảng rỗng nếu có lỗi
                }
            } catch (error) {
                console.error("Lỗi khi lấy danh sách người dùng:", error);
                setUsers([]); // Đặt thành mảng rỗng nếu có lỗi
            }
        };

        fetchUsers();
    } else {
        console.error("Không tìm thấy token trong localStorage.");
    }
}, []);


    const handleExport = () => {
        if (users.length === 0) {
            message.error("No users to export.");
            return;
        }

        // Chuyển đổi danh sách người dùng thành dữ liệu Excel (tạo sheet)
        const sheet = XLSX.utils.json_to_sheet(users.map(user => ({
            "Tên người dùng": user.username,  // Giả sử bạn có thuộc tính username
            "Email": user.email,              // Giả sử bạn có thuộc tính email
            "Số điện thoại": user.phone,     // Giả sử bạn có thuộc tính phone
            "Ngày tạo": user.created_at,     // Giả sử bạn có thuộc tính created_at
            "Trạng thái": user.status ? "Kích hoạt" : "Chưa kích hoạt", // Giả sử bạn có thuộc tính status
        })));

        // Tạo workbook từ sheet
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, sheet, "Người dùng");

        // Xuất file Excel
        XLSX.writeFile(wb, "Danh_sach_nguoi_dung.xlsx");
    };

    const handleEdit = (user) => {
        setEditUser(user); // Lưu thông tin người dùng cần chỉnh sửa
        setShowEditForm(true); // Hiển thị form chỉnh sửa
    };

    const handleDelete = async (id) => {
        const token = getToken(); // Lấy token từ localStorage
        if (!token) {
            console.error("Token không tồn tại, không thể xóa user.");
            return;
        }

        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                // Gọi API deleteUser từ UserService
                const response = await UserService.deleteUser(id, token);
                console.log("Xóa thành công:", response);

                // Cập nhật lại danh sách người dùng sau khi xóa
                setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
                message.success("User has been successfully deleted!");
            } catch (error) {
                console.error("Lỗi khi xóa người dùng:", error);
                message.error("An error occurred while deleting the user.");
            }
        }
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

    const handleSaveEdit = async () => {
        const token = getToken(); // Lấy token từ localStorage
        if (!token) {
            console.error("Token không tồn tại, không thể cập nhật user.");
            return;
        }

        try {
            // Gọi API updateUser từ UserService
            const updatedUser = await UserService.updateUser(editUser.id, editUser, token);
            

            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === editUser.id ? { ...user, ...updatedUser.user } : user
                )
            );


            setShowEditForm(false); // Đóng form chỉnh sửa
            setEditUser(null); // Xóa thông tin user đang chỉnh sửa
        } catch (error) {
            console.error("Lỗi khi cập nhật user:", error);
        }
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
                            type="email"
                            value={editUser?.email || ''}
                            onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                            placeholder="Enter email"
                        />
                        <Input
                            type="text"
                            value={editUser?.phone || ''}
                            onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })}
                            placeholder="Enter phone number"
                        />
                        <Input
                            type="text"
                            value={editUser?.default_address || ''}
                            onChange={(e) => setEditUser({ ...editUser, default_address: e.target.value })}
                            placeholder="Enter address"
                        />
                        <div>
                            <label htmlFor="role">Role</label>
                            <select
                                id="role"
                                value={editUser?.role || ''}
                                onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    marginBottom: '15px',
                                    borderRadius: '5px',
                                    border: '1px solid #ccc',
                                }}
                            >
                                <option value="">Select Role</option>
                                <option value="user">User</option>
                                <option value="manager">Manager</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

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
                        <WrapperTableHeader>Phone</WrapperTableHeader>
                        <WrapperTableHeader>Email </WrapperTableHeader>
                        <WrapperTableHeader>Role </WrapperTableHeader>
                        <WrapperTableHeader>Join On</WrapperTableHeader>
                        <WrapperTableHeader>Address</WrapperTableHeader>
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
                            <WrapperTableData>{user.name}</WrapperTableData>
                            <WrapperTableData><StatusBadge status={user.status}>{user.status}</StatusBadge></WrapperTableData>
                            <WrapperTableData>{user.phone}</WrapperTableData>
                            <WrapperTableData>{user.email}</WrapperTableData>
                            <WrapperTableData>{user.role}</WrapperTableData>
                            <WrapperTableData>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</WrapperTableData>
                            <WrapperTableData>{user.default_address}</WrapperTableData>
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
