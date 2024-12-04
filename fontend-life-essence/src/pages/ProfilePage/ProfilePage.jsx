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
import * as message from '../../components/MessageComponent/Message'

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



    const getToken = () => {
        const storedUserData = localStorage.getItem('userData');
        const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;
        return parsedUserData?.token;
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

    if (!userData) {
        return <div>Loading...</div>;
    }

    const handleSave = async () => {
        const token = getToken();
        try {
            const updatedUser = await UserService.updateUserInfo(
                { name, phone, default_address: address },
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
    };

    // Pagination logic
    const totalPages = Math.ceil(orders.length / ordersPerPage);
    const currentOrders = orders.slice(
        (currentPage - 1) * ordersPerPage,
        currentPage * ordersPerPage
    );

    // Render pagination buttons
    const renderPagination = () => (
        <div className="pagination-container" style={{marginTop: '40px', display: 'flex', justifyContent: 'space-around'}}>
            <button
                style={{ backgroundColor: '#24AEB1', cursor: 'pointer'}}
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
                                    <p><strong>Since Member:</strong> {userData.user.createdAt ? new Date(userData.user.createdAt).toLocaleDateString() : 'N/A'}</p>
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
                        <div style={{width: '100%'}}>
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
