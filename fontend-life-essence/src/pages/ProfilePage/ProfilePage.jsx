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
} from './Style';
import { useNavigate } from 'react-router';
import * as OrderService from '../../services/OrderService'
import * as UserService from '../../services/UserService'

const ProfilePage = () => {
    const [selectedSection, setSelectedSection] = useState('accountInfo');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);  // Trạng thái loading
    const [error, setError] = useState(null);  // Trạng thái lỗi
    const ordersPerPage = 4;
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [editMode, setEditMode] = useState(false);  // Trạng thái chỉnh sửa
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');


    const getToken = () => {
        const storedUserData = localStorage.getItem('userData');
        const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;
        return parsedUserData?.token;
    };
    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        console.log('storedUserData', storedUserData)
        if (storedUserData) {
            const parsedData = JSON.parse(storedUserData);
            setUserData(parsedData);
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
                console.log('réu', result)
                setOrders(result);
            } catch {
                setError('Error fetching orders');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (!userData) {
        return <div>Loading...</div>;
    }


    const handleSave = async () => {
        const token = getToken();
        try {
            // Gửi thông tin mới đến API
            const updatedUser = await UserService.updateUserInfo(
                { name, phone, default_address: address },
                token
            );

            // Cập nhật `userData` với thông tin mới từ API
            setUserData((prevData) => ({
                ...prevData,
                user: {
                    ...prevData.user,
                    name: updatedUser.name,
                    phone: updatedUser.phone,
                    default_address: updatedUser.default_address,
                },
            }));

            alert('Profile updated successfully!');
            setEditMode(false); // Tắt chế độ chỉnh sửa
        } catch (error) {
            console.error(error);
            alert('Failed to update profile');
        }
    };

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            alert('New passwords do not match!');
            return;
        }
        if (newPassword.length < 8) {
            alert('Password must be at least 8 characters long.');
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
            console.log('first, ', response)
            alert(response.message || 'Password updated successfully!');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || 'Failed to change password');
        }
    };
    const handleSignOut = () => {
        // Xóa dữ liệu user khỏi state và localStorage
        localStorage.removeItem('userData');
        setUserData(null); // Reset state người dùng
        setSelectedSection(null); // Về trạng thái ban đầu
        navigate('/'); // Điều hướng đến trang đăng nhập
    };

    const renderContent = () => {
        switch (selectedSection) {
            case 'accountInfo':
                return (
                    <ContentBody>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '50px', width: '700px' }}>
                                {/* Profile Image */}
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR--APtc5Nnz3w43NQTVrDCon1p33k9xWBgGg&s" // Placeholder image URL
                                    alt="Profile"
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        borderRadius: '50%',
                                        margin: '0 30px',
                                        border: '2px solid #ccc',
                                    }}
                                />

                                {/* Account Information */}
                                <div style={{ display: 'flex', flexDirection: 'column', width: '400px' }}>
                                    <p><strong>Name:</strong> {editMode ? <input type="text" value={name} onChange={(e) => setName(e.target.value)} /> : userData.user.name}</p>
                                    <p><strong>Email:</strong> {userData.user.email}</p>
                                    <p><strong>Phone:</strong> {editMode ? <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} /> : userData.user.phone}</p>
                                    <p ><strong>Since Member:</strong> {userData.user.createdAt}</p>
                                    <p><strong>Address:</strong> {editMode ? <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} /> : userData.user.default_address}</p>
                                </div>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end', // Pushes the button to the right
                                    alignItems: 'center',
                                    width: '100%', // Full-width container
                                }}
                            >
                                {editMode ? (
                                    <div onClick={handleSave} style={{
                                        width: '70px',
                                        height: '35px',
                                        backgroundColor: '#24AEB1',
                                        color: '#fff',
                                        borderRadius: '5px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                    }}
                                        onMouseEnter={(e) => {
                                            e.target.style.backgroundColor = '#1B8D8F'; // Darker hover color
                                            e.target.style.transform = 'scale(1.05)'; // Slight zoom
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.backgroundColor = '#24AEB1'; // Reset color
                                            e.target.style.transform = 'scale(1)'; // Reset zoom
                                        }}
                                    >
                                        Save</div>
                                ) : (
                                    <div
                                        style={{
                                            width: '70px',
                                            height: '35px',
                                            backgroundColor: '#24AEB1',
                                            color: '#fff',
                                            borderRadius: '5px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.backgroundColor = '#1B8D8F'; // Darker hover color
                                            e.target.style.transform = 'scale(1.05)'; // Slight zoom
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.backgroundColor = '#24AEB1'; // Reset color
                                            e.target.style.transform = 'scale(1)'; // Reset zoom
                                        }}
                                        onClick={() => setEditMode(true)}  // Placeholder action
                                    >
                                        Edit
                                    </div>
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
                                {orders.map(order => (
                                    <tr key={order.orderId}>
                                        <td>{order.orderId}</td>
                                        <td>{order.createdAt}</td>
                                        <td>{order.status}</td>
                                        <td>{order.paymentMethods}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </OrderTable>
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
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '15px',
                                    }}
                                >
                                    <div style={{ textAlign: 'left' }}>
                                        <label style={{
                                            fontSize: '14px',
                                            fontWeight: '500',
                                            color: '#555'
                                        }}>
                                            Current Password
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="Enter your current password"
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            required
                                            style={{
                                                width: '100%',
                                                padding: '6px',
                                                marginTop: '5px',
                                                border: '1px solid #ddd',
                                                borderRadius: '5px',
                                                fontSize: '14px',
                                            }}
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
                                        <input
                                            type="password"
                                            placeholder="Enter a new password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            required
                                            style={{
                                                width: '100%',
                                                padding: '6px',
                                                marginTop: '5px',
                                                border: '1px solid #ddd',
                                                borderRadius: '5px',
                                                fontSize: '14px',
                                            }}
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
                                        <input
                                            type="password"
                                            placeholder="Re-enter your new password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                            style={{
                                                width: '100%',
                                                padding: '6px',
                                                marginTop: '5px',
                                                border: '1px solid #ddd',
                                                borderRadius: '5px',
                                                fontSize: '14px',
                                            }}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        style={{
                                            padding: '10px 2px',
                                            backgroundColor: '#24AEB1',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                            fontWeight: 'bold',
                                            fontSize: '16px',
                                        }}
                                    >
                                        Update Password
                                    </button>
                                </form>
                            </div>
                        </div>
                    </ContentBody>
                );

            case 'addressBook':
                return (
                    <ContentBody>
                        <p >{userData.user.default_address}</p>
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
                    <div style={{ display: 'flex', width: '700px', height: '300px', alignItems: 'center', }}>
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
