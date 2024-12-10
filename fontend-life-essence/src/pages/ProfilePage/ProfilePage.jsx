import React, { useEffect, useState } from 'react';
import {
    Container,
    SectionHeader,
    ProfileContainer,
    Sidebar,
    SidebarHeader,
    SidebarItem,
    ContentSection,
    ContentTitle,
    ContentBody,
    OrderTable,
    EditButton,
    StyledPasswordInput,
    StyledButtonUpdatePass,
    EditAddressButton,
    DeleteAddressButton,
} from './Style';
import { useNavigate } from 'react-router';
import * as OrderService from '../../services/OrderService'
import * as UserService from '../../services/UserService'
import * as AddressService from '../../services/AddressService'
import * as message from '../../components/MessageComponent/Message'
import { FaCamera } from 'react-icons/fa';

// Hàm tiện ích để tái sử dụng kiểu nút
const buttonStyle = (bgColor) => ({
    padding: '5px',
    backgroundColor: bgColor,
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
});

const ProfilePage = () => {
    const [selectedSection, setSelectedSection] = useState('accountInfo');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);  // Trạng thái loading
    const [error, setError] = useState(null);  // Trạng thái lỗi
    const ordersPerPage = 5;
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [editMode, setEditMode] = useState(false);  // Trạng thái chỉnh sửa
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [avatar, setAvatar] = useState('');
    const [deliveryAddresses, setDeliveryAddresses] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editAddressId, setEditAddressId] = useState(null);
    const [newAddress, setNewAddress] = useState({
        detailAddress: '',
        province: '',
        district: '',
        ward: '',
    });
    const [editAddress, setEditAddress] = useState({
        detail_address: '',
        province: '',
        district: '',
        ward: '',
    });



    const getToken = () => {
        const storedUserData = localStorage.getItem('userData');
        const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;
        return parsedUserData?.token;
    };
    const getUserId = () => {
        const storedUserData = localStorage.getItem('userData');
        const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;
        return parsedUserData?.user?.id;
    };
    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            const parsedData = JSON.parse(storedUserData);
            setUserData(parsedData);
            setName(parsedData.user.name);
            setPhone(parsedData.user.phone);
            setAddress(parsedData.user.default_address);
        } else {
            navigate('/signIn');
        }
    }, [navigate]);

    useEffect(() => {
        const fetchOrders = async () => {
            const token = getToken();
            if (!token) {
                setError('User not authenticated');
                setLoading(false);
                return;
            }
            try {
                const result = await OrderService.getAllOrders(token);
                setOrders(result);
            } catch {
                setError('Error fetching orders');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    useEffect(() => {
        const fetchAddresses = async () => {
            const token = getToken(); // Lấy token từ hàm getToken() hoặc localStorage
            const userId = getUserId();
            if (!token || !userId) {
                console.error('Token or user ID is missing!');
                return;
            }

            try {
                const response = await AddressService.getAllDeliveryAddresses(userId, token);
                console.log('Fetched addresses for user ID:', userId);
                console.log('Fetched addresses for user ID:', response.data);
                setDeliveryAddresses(response.data);
            } catch (error) {
                console.error('Failed to fetch addresses:', error);
            }
        };

        fetchAddresses();
    }, []); // Run once on component mount


    if (!userData) {
        return <div>Loading...</div>;
    }

    const handleSave = async () => {
        const token = getToken();
        try {
            const updatedUser = await UserService.updateUserInfo(
                { name, phone, default_address: address, avatar, },
                token
            );

            // Cập nhật userData và local storage
            const newUserData = {
                ...userData,
                user: {
                    ...userData.user,
                    ...updatedUser.data,
                },
            };
            setUserData(newUserData);
            localStorage.setItem('userData', JSON.stringify(newUserData));
            message.success('Profile updated successfully!');
            setEditMode(false);
        } catch (error) {
            console.error(error);
            message.error('Failed to update profile');
        }
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0]; // Lấy file người dùng đã chọn
        if (!file) return;

        // Kiểm tra loại file
        const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!allowedTypes.includes(file.type)) {
            message.error("Invalid file type. Please upload an image (jpeg, png, gif).");
            return;
        }

        // Kiểm tra kích thước file (ví dụ: dưới 2MB)
        const maxSize = 2 * 1024 * 1024; // 2MB
        if (file.size > maxSize) {
            message.error("File size exceeds 2MB. Please upload a smaller file.");
            return;
        }

        // Chuyển file sang dạng URL hoặc base64 để xem trước
        const reader = new FileReader();
        reader.onload = () => {
            setAvatar(reader.result); // Lưu URL base64 vào state để hiển thị preview
        };
        reader.onerror = (err) => {
            console.error("Error reading file:", err);
            message.error("Failed to load image. Please try again.");
        };
        reader.readAsDataURL(file); // Đọc file và chuyển sang base64
    };

    const handleAddAddress = async () => {
        const token = getToken(); // Lấy token từ localStorage
        const userId = getUserId(); // Lấy userId từ localStorage
        if (!token) {
            alert("Bạn cần đăng nhập để thêm địa chỉ!");
            return;
        }

        try {
            // Chuẩn bị dữ liệu gửi lên backend
            const addressData = {
                user_id: userId, // Lấy user_id từ localStorage qua getUserId()
                detail_address: newAddress.detail_address,
                province: newAddress.province,
                district: newAddress.district,
                ward: newAddress.ward,
            };

            // Gửi yêu cầu thêm địa chỉ mới
            const response = await AddressService.addDeliveryAddress(addressData, token);
            console.log('first', response)

            // Kiểm tra phản hồi
            if (response && response.message === "Delivery address added successfully") {
                alert("Địa chỉ đã được thêm thành công!");
                // Cập nhật danh sách địa chỉ trong state (giả sử bạn có state deliveryAddresses)
                setDeliveryAddresses((prevAddresses) => [
                    ...prevAddresses,
                    response.data
                ]);
                // Reset form
                setNewAddress({
                    detail_address: "",
                    province: "",
                    district: "",
                    ward: "",
                });
                setShowAddForm(false); // Ẩn form sau khi thêm thành công
            } else {
                alert("Đã xảy ra lỗi khi thêm địa chỉ.");
            }
        } catch (error) {
            console.error("Error adding address:", error);
            alert("Đã xảy ra lỗi trong quá trình thêm địa chỉ.");
        }
    };

    // Bắt đầu chỉnh sửa địa chỉ
    const startEditAddress = (address) => {
        setEditAddressId(address.id);
        setEditAddress({
            detail_address: address.detail_address,
            province: address.province,
            district: address.district,
            ward: address.ward,
        });
    };
    // Lưu chỉnh sửa
    const saveEditAddress = async (addressId) => {
        const token = getToken();
        const userId = getUserId();
        try {
            const response = await AddressService.updateDeliveryAddress(userId, addressId, editAddress, token);
            console.log('response', response)
            if (response && response.message === "Delivery address updated successfully") {
                setDeliveryAddresses(prevAddresses =>
                    prevAddresses.map(address =>
                        address.id === addressId ? { ...address, ...editAddress } : address
                    )
                );
                alert("Địa chỉ đã được cập nhật thành công.");
                setEditAddressId(null);
            } else {
                alert('Cập nhật địa chỉ thất bại.');
            }
        } catch (error) {
            console.error('Error updating address:', error);
            alert('Đã xảy ra lỗi trong quá trình cập nhật.');
        }
    };


    // Hàm xử lý khi xóa địa chỉ
    const handleDeleteAddress = async (addressId) => {
        const token = getToken(); // Lấy token từ localStorage
        const userId = getUserId(); // Lấy userId từ localStorage

        if (!token) {
            alert("Bạn cần đăng nhập để xóa địa chỉ!");
            return;
        }

        try {
            // Gửi yêu cầu xóa địa chỉ
            const response = await AddressService.deleteDeliveryAddress(userId, addressId, token);
            console.log("Response from delete:", response);

            // Kiểm tra phản hồi từ backend
            // Kiểm tra phản hồi từ backend
            if (response && response.message === "Delivery address deleted successfully") {
                // Cập nhật lại danh sách địa chỉ sau khi xóa
                setDeliveryAddresses((prevAddresses) =>
                    prevAddresses.filter((address) => address.id !== addressId)
                );
                alert("Địa chỉ đã được xóa thành công.");
            } else {
                // Nếu phản hồi không thành công
                alert("Xóa địa chỉ thất bại.");
            }
        } catch (error) {
            // Xử lý lỗi nếu có
            console.error("Error deleting address:", error);
            alert("Đã xảy ra lỗi trong quá trình xóa địa chỉ.");
        }
    };

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            message.error('New passwords do not match!');
            return;
        }
        if (newPassword.length < 8) {
            message.error('Password must be at least 8 characters long.');
            return;
        }

        try {
            const token = getToken();
            const payload = {
                currentPassword,
                newPassword,
                confirmPassword,
            };
            const response = await UserService.changePassword(payload, token);
            message.success('Password updated successfully!');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.error(error);
            message.error('Failed to change password');
        }
    };

    const handleSignOut = () => {
        localStorage.removeItem('userData');
        setUserData(null);
        setSelectedSection(null);
        navigate('/');
        message.success('Logout successfully')
    };

    // Pagination logic
    const totalPages = Math.ceil(orders.length / ordersPerPage);
    const currentOrders = orders.slice(
        (currentPage - 1) * ordersPerPage,
        currentPage * ordersPerPage
    );

    // Render pagination buttons
    const renderPagination = () => (
        <div className="pagination-container" style={{ marginTop: '40px', display: 'flex', justifyContent: 'space-around' }}>
            <button
                style={{ backgroundColor: '#24AEB1', cursor: 'pointer' }}
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="pagination-button"
            >
                Previous
            </button>
            <span className="pagination-text">{currentPage} / {totalPages}</span>
            <button
                style={{ backgroundColor: '#24AEB1', cursor: 'pointer' }}
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="pagination-button"
            >
                Next
            </button>
        </div>
    );

    if (!userData) {
        return <div>Loading...</div>;
    }

    const renderContent = () => {
        switch (selectedSection) {
            // case 'accountInfo':
            //     return (
            //         <ContentBody>
            //             <div style={{ display: 'flex', flexDirection: 'column' }}>
            //                 <div style={{ display: 'flex', alignItems: 'center', gap: '50px', width: '700px' }}>
            //                     {/* Profile Image */}
            //                     <img
            //                         src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR--APtc5Nnz3w43NQTVrDCon1p33k9xWBgGg&s" // Placeholder image URL
            //                         alt="Profile"
            //                         style={{
            //                             width: '100px',
            //                             height: '100px',
            //                             borderRadius: '50%',
            //                             margin: '0 30px',
            //                             border: '2px solid #ccc',
            //                         }}
            //                     />

            //                     {/* Account Information */}
            //                     <div style={{ display: 'flex', flexDirection: 'column', width: '400px' }}>
            //                         <p><strong>Name:</strong> {editMode ? <input type="text" value={name} onChange={(e) => setName(e.target.value)} /> : userData.user.name}</p>
            //                         <p><strong>Email:</strong> {userData.user.email}</p>
            //                         <p><strong>Phone:</strong> {editMode ? <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} /> : userData.user.phone}</p>
            //                         <p><strong>Since Member:</strong> {userData.user.createdAt ? new Date(userData.user.createdAt).toLocaleDateString() : 'N/A'}</p>
            //                         <p><strong>Address:</strong> {editMode ? <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} /> : userData.user.default_address}</p>
            //                     </div>
            //                 </div>
            //                 <div style={{
            //                     display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '100%',
            //                 }}
            //                 >
            //                     {editMode ? (
            //                         < EditButton
            //                             onClick={handleSave}
            //                             onMouseEnter={(e) => {
            //                                 e.target.style.backgroundColor = '#1B8D8F'; // Darker hover color
            //                                 e.target.style.transform = 'scale(1.05)'; // Slight zoom
            //                             }}
            //                             onMouseLeave={(e) => {
            //                                 e.target.style.backgroundColor = '#24AEB1'; // Reset color
            //                                 e.target.style.transform = 'scale(1)'; // Reset zoom
            //                             }}
            //                         >
            //                             Save</EditButton>
            //                     ) : (
            //                         <EditButton
            //                             onMouseEnter={(e) => {
            //                                 e.target.style.backgroundColor = '#1B8D8F'; // Darker hover color
            //                                 e.target.style.transform = 'scale(1.05)'; // Slight zoom
            //                             }}
            //                             onMouseLeave={(e) => {
            //                                 e.target.style.backgroundColor = '#24AEB1'; // Reset color
            //                                 e.target.style.transform = 'scale(1)'; // Reset zoom
            //                             }}
            //                             onClick={() => setEditMode(true)}  // Placeholder action
            //                         >
            //                             Edit
            //                         </EditButton>
            //                     )}
            //                 </div>
            //             </div>
            //         </ContentBody>
            //     );

            case 'accountInfo':
                return (
                    <ContentBody>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '50px', width: '700px' }}>
                                {/* Profile Image */}
                                <div style={{ position: 'relative' }}>
                                    <img
                                        src={avatar || userData.user.avatar || "https://via.placeholder.com/100"} // Hiển thị avatar
                                        alt="Profile"
                                        style={{
                                            width: '100px',
                                            height: '100px',
                                            borderRadius: '50%',
                                            border: '2px solid #ccc',
                                            objectFit: 'cover',
                                        }}
                                    />
                                    {editMode && (
                                        <label
                                            htmlFor="avatarInput"
                                            style={{
                                                position: 'absolute',
                                                bottom: 0,
                                                right: 0,
                                                color: '#24AEB1',
                                                borderRadius: '50%',
                                                padding: '5px',
                                                cursor: 'pointer',
                                                fontSize: '12px',
                                            }}
                                        >
                                            <FaCamera style={{fontSize: '20px'}}/>
                                        </label>
                                    )}
                                    <input
                                        id="avatarInput"
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={handleAvatarChange}
                                    />
                                </div>

                                {/* Account Information */}
                                <div style={{ display: 'flex', flexDirection: 'column', width: '400px' }}>
                                    <p><strong>Name:</strong> {editMode ? <input type="text" value={name} onChange={(e) => setName(e.target.value)} /> : userData.user.name}</p>
                                    <p><strong>Email:</strong> {userData.user.email}</p>
                                    <p><strong>Phone:</strong> {editMode ? <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} /> : userData.user.phone}</p>
                                    <p><strong>Since Member:</strong> {userData.user.createdAt ? new Date(userData.user.createdAt).toLocaleDateString() : 'N/A'}</p>
                                    <p><strong>Address:</strong> {editMode ? <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} /> : userData.user.default_address}</p>
                                </div>
                            </div>
                            <div style={{
                                display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '100%',
                            }}
                            >
                                {editMode ? (
                                    <EditButton
                                        onClick={handleSave}
                                        onMouseEnter={(e) => {
                                            e.target.style.backgroundColor = '#1B8D8F'; // Darker hover color
                                            e.target.style.transform = 'scale(1.05)'; // Slight zoom
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.backgroundColor = '#24AEB1'; // Reset color
                                            e.target.style.transform = 'scale(1)'; // Reset zoom
                                        }}
                                    >
                                        Save
                                    </EditButton>
                                ) : (
                                    <EditButton
                                        onMouseEnter={(e) => {
                                            e.target.style.backgroundColor = '#1B8D8F'; // Darker hover color
                                            e.target.style.transform = 'scale(1.05)'; // Slight zoom
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.backgroundColor = '#24AEB1'; // Reset color
                                            e.target.style.transform = 'scale(1)'; // Reset zoom
                                        }}
                                        onClick={() => setEditMode(true)}
                                    >
                                        Edit
                                    </EditButton>
                                )}
                            </div>
                        </div>
                    </ContentBody>
                );
            case 'orders':
                return (
                    <ContentBody>
                        <OrderTable>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Payment Methods</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentOrders.map(order => (
                                    <tr key={order.orderId}>
                                        <td>{order.orderId}</td>
                                        <td>{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}</td>
                                        <td>{order.status}</td>
                                        <td>{order.paymentMethods}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </OrderTable>
                        <div style={{ width: '100%' }}>
                            {renderPagination()}
                        </div>
                    </ContentBody>
                );
            case 'changePassword':
                return (
                    <ContentBody>
                        <div style={{ display: 'flex', width: '700px', justifyContent: 'center', flexDirection: 'column' }}>
                            <div style={{ width: '500px', margin: '0 auto', textAlign: 'center' }}>
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleChangePassword();
                                    }}
                                    style={{ display: 'flex', flexDirection: 'column', gap: '15px', }}
                                >
                                    <div style={{ textAlign: 'left' }}>
                                        <label style={{ fontSize: '14px', fontWeight: '500', color: '#555' }}>
                                            Current Password
                                        </label>
                                        <StyledPasswordInput
                                            type="password"
                                            placeholder="Enter your current password"
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div style={{ textAlign: 'left' }}>
                                        <label style={{
                                            fontSize: '14px',
                                            fontWeight: '500',
                                            color: '#555'
                                        }}>
                                            New Password
                                        </label>
                                        <StyledPasswordInput
                                            type="password"
                                            placeholder="Enter a new password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div style={{ textAlign: 'left' }}>
                                        <label style={{
                                            fontSize: '14px',
                                            fontWeight: '500',
                                            color: '#555'
                                        }}>
                                            Confirm New Password
                                        </label>
                                        <StyledPasswordInput
                                            type="password"
                                            placeholder="Re-enter your new password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <StyledButtonUpdatePass type="submit">Update Password</StyledButtonUpdatePass>
                                </form>
                            </div>
                        </div>
                    </ContentBody>
                );
            case 'addressBook':
                return (
                    <ContentBody>
                        <div style={{ width: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '30px' }}>
                            {/* Danh sách địa chỉ */}
                            <div style={{ display: 'flex', justifyContent: 'space-around', width: '800px', gap: '10px' }}>
                                {!showAddForm && deliveryAddresses?.length > 0 ? (
                                    deliveryAddresses.map((address, index) => (
                                        <div
                                            key={address.id}
                                            style={{
                                                padding: '10px',
                                                width: '380px',
                                                border: '1px solid #ddd',
                                                borderRadius: '5px',
                                                backgroundColor: '#f9f9f9',
                                            }}
                                        >
                                            {editAddressId === address.id ? (
                                                <div>
                                                    <h3>Chỉnh Sửa Địa Chỉ</h3>
                                                    {["Địa chỉ chi tiết", "Tỉnh/Thành phố", "Quận/Huyện", "Phường/Xã"].map((label, index) => {
                                                        const fieldKeys = ["detail_address", "province", "district", "ward"];
                                                        const field = fieldKeys[index];

                                                        return (
                                                            <div key={field} style={{ marginBottom: '6px' }}>
                                                                <label
                                                                    htmlFor={field}
                                                                    style={{
                                                                        display: 'block',
                                                                        marginBottom: '5px',
                                                                        fontWeight: 'bold',
                                                                        fontSize: '12px',
                                                                    }}
                                                                >
                                                                    {label}:
                                                                </label>
                                                                <input
                                                                    id={field}
                                                                    type="text"
                                                                    value={editAddress[field]}
                                                                    onChange={(e) =>
                                                                        setEditAddress({ ...editAddress, [field]: e.target.value })
                                                                    }
                                                                    placeholder={`Nhập ${label.toLowerCase()}`}
                                                                    style={{
                                                                        border: '1px solid #ccc',
                                                                        borderRadius: '4px',
                                                                        width: '100%',
                                                                    }}
                                                                />
                                                            </div>
                                                        );
                                                    })}

                                                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between' }}>
                                                        <EditAddressButton onClick={() => setEditAddressId(null)} style={buttonStyle('#FF0000')}>
                                                            Hủy
                                                        </EditAddressButton>
                                                        <EditAddressButton onClick={() => saveEditAddress(address.id)}>
                                                            Lưu
                                                        </EditAddressButton>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div>
                                                    <p>
                                                        <strong>{`Address ${index + 1}:`}</strong> {address.detail_address}
                                                    </p>
                                                    <p>
                                                        <strong>Province:</strong> {address.province}
                                                    </p>
                                                    <p>
                                                        <strong>District:</strong> {address.district}
                                                    </p>
                                                    <p>
                                                        <strong>Ward:</strong> {address.ward}
                                                    </p>
                                                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between' }}>
                                                        <EditAddressButton onClick={() => startEditAddress(address)}>
                                                            Cập Nhật
                                                        </EditAddressButton>
                                                        <DeleteAddressButton onClick={() => handleDeleteAddress(address.id)}>
                                                            Xóa
                                                        </DeleteAddressButton>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    !showAddForm &&
                                    deliveryAddresses?.length === 0 && (
                                        <p style={{ textAlign: 'center', color: '#555' }}>
                                            Chưa có địa chỉ nào. Vui lòng thêm địa chỉ mới!
                                        </p>
                                    )
                                )}
                            </div>

                            {/* Nút Thêm Địa Chỉ */}
                            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                                <button
                                    onClick={() => setShowAddForm(!showAddForm)}
                                    disabled={deliveryAddresses.length >= 2}
                                    style={{
                                        padding: '10px',
                                        backgroundColor: deliveryAddresses.length >= 2 ? '#ccc' : '#24AEB1',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: deliveryAddresses.length >= 2 ? 'not-allowed' : 'pointer',
                                        fontWeight: 'bold',
                                        fontSize: '16px',
                                    }}
                                >
                                    {showAddForm ? 'Ẩn Form Thêm' : 'Thêm Địa Chỉ'}
                                </button>
                            </div>

                            {/* Form Thêm Địa Chỉ */}
                            {showAddForm && (
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleAddAddress();
                                    }}
                                    style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}
                                >
                                    <h3>Thêm Địa Chỉ Mới</h3>
                                    {["detail_address", "province", "district", "ward"].map((field) => (
                                        <input
                                            key={field}
                                            type="text"
                                            placeholder={`Nhập ${field}`}
                                            value={newAddress[field]}
                                            onChange={(e) => setNewAddress({ ...newAddress, [field]: e.target.value })}
                                            required
                                            style={{
                                                padding: '8px',
                                                border: '1px solid #ddd',
                                                borderRadius: '5px',
                                                fontSize: '14px',
                                            }}
                                        />
                                    ))}
                                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                        <button type="submit" style={buttonStyle('#24AEB1')}>
                                            Lưu Địa Chỉ
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </ContentBody>
                );





            case 'logout':
                handleSignOut();
                return null;
            default:
                return null;
        }
    };

    return (
        <Container>
            <SectionHeader>Home / Profile</SectionHeader>
            <ProfileContainer>
                <Sidebar>
                    <SidebarHeader>Welcome {userData.name}!</SidebarHeader>
                    {[
                        { id: 'accountInfo', label: 'Account Info' },
                        { id: 'orders', label: 'Your Orders' },
                        { id: 'changePassword', label: 'Change Password' },
                        { id: 'addressBook', label: 'Address Book ' },
                        { id: 'logout', label: 'Logout' },
                    ].map(({ id, label }) => (
                        <SidebarItem
                            key={id}
                            active={selectedSection === id}
                            onClick={() => setSelectedSection(id)}
                        >
                            <span>•</span> {label}
                        </SidebarItem>
                    ))}
                </Sidebar>
                <ContentSection>
                    {/* Title placed near the top */}
                    <ContentTitle style={{ marginTop: '10px', fontSize: '24px', fontWeight: 'bold', textAlign: 'left' }}>
                        {selectedSection === 'accountInfo' ? 'Account Info' :
                            selectedSection === 'orders' ? 'Your Orders' :
                                selectedSection === 'changePassword' ? 'Change Password' :
                                    selectedSection === 'addressBook' ? 'Address Book' : 'Logout'}
                    </ContentTitle>
                    <div style={{ display: 'flex', width: '800px', height: '300px', alignItems: 'center', }}>
                        <div style={{ marginTop: '20px' }}>
                            {renderContent()}
                        </div>
                    </div>
                </ContentSection>
            </ProfileContainer>
        </Container>
    );
};

export default ProfilePage;
