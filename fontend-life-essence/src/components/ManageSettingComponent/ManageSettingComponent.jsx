import React, { useEffect, useState } from 'react';
import { FaUser, FaCreditCard, FaLock, FaBell, FaMoneyBillWave, FaMobileAlt, FaPaypal, FaAtom, FaTrash } from 'react-icons/fa';
import { TbCategory } from "react-icons/tb";
import * as AdminService from '../../services/ManageService'
import {Container,Row,
    Col,
    Sidebar,
    NavLink,
    Content,
    ProfileCard,
    PersonalInfo,
    PaymentMethod,
    PaymentButton,
    Method,
    ChangePasswordForm,
    Input,
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ApplicationNotifications, // Import the new styled component
    TableHeader,
    TableCell
} from './Style';
import * as message from '../MessageComponent/Message'


function ManageSettingComponent() {
    const [activeContent, setActiveContent] = useState('personalInfo');
    const [isAddingPaymentMethod, setIsAddingPaymentMethod] = useState(false);
    const [paymentMethodName, setPaymentMethodName] = useState('');
    const [userData, setUserData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [couponDetails, setCouponDetails] = useState({ code: '', coupons_percent: '', start_date: '', expiration: '', product_id: '' });
    const [categoryData, setCategoryData] = useState({ category_id: '', name: '', description: '', slug: '' });
    const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
    const [showAddCouponForm, setShowAddCouponForm] = useState(false);
    const [categories, setCategories] = useState([]);
    const [personalInfo, setPersonalInfo] = useState({ name: '', email: '', phone: '' });
    const [products, setProducts] = useState([]);
    const [notificationSettings, setNotificationSettings] = useState({
        exclusiveOffers: false,
        dailyMessages: false,
        weeklySummary: false,
        newsUpdates: false,
        bestTrips: false,
        userResearch: false,
        commentsNotifications: 'doNotNotify',
    });
    const [coupons, setCoupons] = useState([]);

    const getToken = () => {
        const storedUserData = localStorage.getItem('userData');
        const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;
        return parsedUserData ? parsedUserData.token : null;
    };

    useEffect(() => {
        const fetchCategories = async () => {
            const token = getToken();
            try {
                const result = await AdminService.getAllCategory(token); // Gọi hàm lấy danh mục
                setCategories(result); // Cập nhật danh sách danh mục
            } catch (error) {
                console.error('Có lỗi xảy ra khi lấy danh mục:', error);
            }
        };
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            const parsedUserData = JSON.parse(storedUserData);
            console.log('parsedUserData', parsedUserData)
            setPersonalInfo({
                name: parsedUserData.user.name || '',
                email: parsedUserData.user.email || '',
                phone: parsedUserData.user.phone || '',
                default_address: parsedUserData.user.default_address || '',
                createdAt: parsedUserData.user.createdAt || '',
                role: parsedUserData.user.role || '',
                avatar: parsedUserData.user.avatar || '',
            });
        }

        fetchCategories();
    }, []);


    const handleAddCategory = async () => {
        const token = getToken();
        try {
            const result = await AdminService.addCategory(token, categoryData);
            message.success('Add Category successfully!');
            setCategoryData({ category_id: '', name: '', description: '', slug: '' }); // Reset form
            setCategories([...categories, result]);
            setShowAddCategoryForm(false); 
        } catch (error) {
            message.error('Error');
        }
    };
    const handleDeleteCategory = async (category_id) => {
        const token = getToken();
        try {
            await AdminService.deleteCategory(token, category_id);
            message.success('Danh mục đã được xóa thành công.');
            setCategories(categories.filter(category => category.category_id !== category_id)); // Cập nhật danh sách
        } catch (error) {
            message.error('Có lỗi xảy ra khi xóa danh mục.');
        }
    };

    const showContent = (contentId) => {
        setActiveContent(contentId);
    };

    const handleAddPaymentMethod = () => {
        alert(`Payment Method Added: ${paymentMethodName}`);
        setIsModalOpen(false);
    };

    const handleSaveSettings = () => {
        alert("Settings Saved!");
    };

    const handleNotificationChange = (event) => {
        const { name, type, checked, value } = event.target;
        if (type === 'checkbox') {
            setNotificationSettings({
                ...notificationSettings,
                [name]: checked,
            });
        } else if (type === 'radio') {
            setNotificationSettings({
                ...notificationSettings,
                commentsNotifications: value,
            });
        }
    };

    useEffect(() => {
        const fetchCoupons = async () => {
            const token = getToken();
            try {
                const allCoupons = await AdminService.getAllCoupons(token);
                console.log('all', allCoupons)
                setCoupons(allCoupons);
            } catch (error) {
                console.error('Error fetching coupons:', error);
            }
        };

        fetchCoupons();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            const token = getToken();
            try {
                const allProducts = await AdminService.getAllProducts(token);
                setProducts(allProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleAddCoupon = async () => {
        const token = getToken();

        // Kiểm tra các trường dữ liệu
        if (!couponDetails.code || !couponDetails.coupons_percent || !couponDetails.start_date || !couponDetails.expiration || !couponDetails.product_id) {
            message.error('Vui lòng điền đầy đủ tất cả các trường.');
            return;
        }
        // Kiểm tra giá trị phần trăm
        const couponsPercent = Number(couponDetails.coupons_percent);
        if (isNaN(couponsPercent) || couponsPercent < 0 || couponsPercent > 100) {
            message.error('Giá trị phần trăm không hợp lệ. Vui lòng nhập số từ 0 đến 100.');
            return;
        }

        // Kiểm tra ngày bắt đầu và ngày hết hạn
        const startDate = new Date(couponDetails.start_date);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // Đặt giờ, phút, giây, mili giây bằng 0

        if (startDate < currentDate) {
            message.error('Ngày bắt đầu không được nhỏ hơn ngày hiện tại.');
            return;
        }

        if (new Date(couponDetails.expiration) <= new Date(couponDetails.start_date)) {
            message.error('Ngày hết hạn phải lớn hơn ngày bắt đầu.');
            return;
        }

        const newCoupon = {
            code: couponDetails.code,
            coupons_percent: Number(couponDetails.coupons_percent), // Chuyển đổi sang số
            start_date: couponDetails.start_date,
            end_date: couponDetails.expiration,
            product_id: couponDetails.product_id,
        };

        try {
            const addedCoupon = await AdminService.addCoupon(token, newCoupon);
            message.success('add coupon successfilly !')

            // Reset form và cập nhật danh sách coupon
            setCouponDetails({ code: '', coupons_percent: '', start_date: '', expiration: '', product_id: '' });
            setCoupons([...coupons, addedCoupon]);
            setShowAddCouponForm(false);
        } catch (error) {
            console.error('Error adding coupon:', error.response.data);
            alert(`Lỗi: ${error.response.data.message || 'Có lỗi xảy ra'}`);
        }
    };



    // Handle deleting a coupon
    const handleDeleteCoupon = async (couponId) => {
        const token = getToken();
        try {
            await AdminService.deleteCoupon(token, couponId);
            setCoupons((prevCoupons) => prevCoupons.filter(coupon => coupon.id !== couponId));  // Remove the deleted coupon from the list
            message.success('Delete Coupon Successfully!');
        } catch (error) {
            message.error('Error deleting coupon!');
        }
    };
    return (
        <Container fluid>
            <Row>
                <Col md={3}>
                    <Sidebar className="sidebar">
                        <nav className="nav flex-column">
                            <NavLink onClick={() => showContent('personalInfo')} active={activeContent === 'personalInfo'}>
                                <FaUser />_Personal Info
                            </NavLink>
                            <NavLink onClick={() => showContent('addCoupon')} active={activeContent === 'addCoupon'}>
                                <FaAtom /> Add Coupon
                            </NavLink>
                            <NavLink onClick={() => showContent('addCategory')} active={activeContent === 'addCategory'}>
                                <TbCategory /> Add Category
                            </NavLink>
                            <NavLink onClick={() => showContent('paymentMethod')} active={activeContent === 'paymentMethod'}>
                                <FaCreditCard /> Payment Method
                            </NavLink>
                            <NavLink onClick={() => showContent('changePassword')} active={activeContent === 'changePassword'}>
                                <FaLock /> Change Password
                            </NavLink>
                            <NavLink onClick={() => showContent('applicationNotifications')} active={activeContent === 'applicationNotifications'}>

                                <FaBell /> Application Notifications
                            </NavLink>
                        </nav>
                    </Sidebar>
                </Col>
                <Col md={9}>
                    <Content>
                        {activeContent === 'personalInfo' && (
                            <div id="personalInfo" className="content-section">
                                <ProfileCard className="profile-card text-center">
                                    <img
                                        src={personalInfo.avatar || "https://via.placeholder.com/100"}

                                        alt="Profile picture of a person"
                                    />
                                    <h5>{personalInfo?.name}</h5>
                                    <p>I am {personalInfo.role}</p>
                                </ProfileCard>
                                <PersonalInfo>
                                    <h5>Personal Information</h5>
                                    <p><strong>Full Name :</strong> {personalInfo.name}</p>
                                    <p><strong>Date of Birth:</strong> 01/01/2003</p>
                                    <p><strong>About:</strong> Hát hay</p>
                                    <p><strong>Email:</strong> {personalInfo.email}</p>
                                    <p><strong>Phone:</strong> {personalInfo.phone}</p>
                                    <p><strong>Address:</strong> {personalInfo.default_address}</p>
                                    <p><strong>Join now:</strong> {new Date(personalInfo.createdAt).toLocaleDateString('en-US', {year: 'numeric',month: 'long',day: 'numeric'})}</p>
                                    <p><strong>Country:</strong> Việt Nam</p>
                                </PersonalInfo>
                            </div>
                        )}
                        {activeContent === 'addCoupon' && !showAddCouponForm && (
                            <div id="addCoupon" className="content-section">
                                <h1>Danh sách Coupon</h1>
                                <table className="coupon-table">
                                    <thead>
                                        <tr>
                                            <TableHeader>Mã Coupon</TableHeader>
                                            <TableHeader>Giảm Giá (%)</TableHeader>
                                            <TableHeader>Ngày Bắt Đầu</TableHeader>
                                            <TableHeader>Ngày Hết Hạn</TableHeader>
                                            <TableHeader>Hành Động</TableHeader>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {coupons.map(coupon => (
                                            <tr key={coupon.id}>
                                                <TableCell>{coupon.code}</TableCell>
                                                <TableCell>{coupon.coupons_percent}</TableCell>
                                                <TableCell>{new Date(coupon.start_date).toLocaleDateString()}</TableCell>
                                                <TableCell>{new Date(coupon.end_date).toLocaleDateString()}</TableCell>
                                                <TableCell>
                                                    <FaTrash onClick={() => handleDeleteCoupon(coupon.id)} style={{ fontSize: '14px', color: 'red', cursor: 'pointer' }} />
                                                </TableCell>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                                    <Button onClick={() => setShowAddCouponForm(true)}>Thêm Coupon</Button>
                                </div>
                            </div>
                        )}

                        {activeContent === 'addCoupon' && showAddCouponForm && (
                            <div id="addCouponForm" className="content-section">
                                <h1>Thêm Coupon Mới</h1>
                                <form onSubmit={(e) => { e.preventDefault(); handleAddCoupon(); }}>
                                    <Input
                                        type="text"
                                        placeholder="Mã Coupon"
                                        value={couponDetails.code}
                                        onChange={(e) => setCouponDetails({ ...couponDetails, code: e.target.value })}
                                        required
                                    />
                                    <Input
                                        type="number"
                                        placeholder="Giảm Giá (%)"
                                        value={couponDetails.coupons_percent}
                                        onChange={(e) => setCouponDetails({ ...couponDetails, coupons_percent: e.target.value })}
                                        required
                                    />
                                    <Input
                                        type="date"
                                        placeholder="Ngày Bắt Đầu"
                                        value={couponDetails.start_date}
                                        onChange={(e) => setCouponDetails({ ...couponDetails, start_date: e.target.value })}
                                        required
                                    />

                                    <Input
                                        type="date"
                                        placeholder="Ngày Hết Hạn"
                                        value={couponDetails.expiration}
                                        onChange={(e) => setCouponDetails({ ...couponDetails, expiration: e.target.value })}
                                        required
                                    />
                                    <select
                                        value={couponDetails.product_id}
                                        onChange={(e) => setCouponDetails({ ...couponDetails, product_id: e.target.value })}
                                        required
                                    >
                                        <option value="">Chọn Sản Phẩm</option>
                                        {products.map(product => (
                                            <option key={product.id} value={product.id}>
                                                {product.prod_name}
                                            </option>
                                        ))}
                                    </select>
                                    <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', marginTop: '20px' }}>
                                        <Button type="submit">Thêm Coupon</Button>
                                        <Button type="button" onClick={() => setShowAddCouponForm(false)}>Hủy</Button>
                                    </div>
                                </form>
                            </div>
                        )}
                        
                        {activeContent === 'addCategory' && !showAddCategoryForm && (
                            <div id="addCategory" className="content-section">
                                <h1>Danh sách danh mục</h1>
                                <table className="category-table">
                                    <thead>
                                        <tr>
                                            <TableHeader>ID</TableHeader>
                                            <TableHeader>Tên Danh Mục</TableHeader>
                                            <TableHeader>Mô Tả</TableHeader>
                                            <TableHeader>Slug</TableHeader>
                                            <TableHeader>Hành Động</TableHeader>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories.map(category => (
                                            <tr key={category.category_id}>
                                                <TableCell>{category.category_id}</TableCell>
                                                <TableCell>{category.name}</TableCell>
                                                <TableCell>{category.description}</TableCell>
                                                <TableCell>{category.slug}</TableCell>
                                                <TableCell>
                                                        <FaTrash onClick={() => handleDeleteCategory(category.category_id)} style={{fontSize: '14px', color: 'red', cursor: 'pointer'}} />
                                                </TableCell>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div style={{marginTop: '20px', display: 'flex', justifyContent: 'center'}}>
                                    <Button onClick={() => setShowAddCategoryForm(true)}>Thêm Danh Mục</Button>
                                </div>
                            </div>
                        )}
                        
                        {activeContent === 'addCategory' && showAddCategoryForm && (
                            <div id="addCategoryForm" className="content-section">
                                <h1>Thêm danh mục mới</h1>
                                <form onSubmit={(e) => { e.preventDefault(); handleAddCategory(); }}>
                                    <Input
                                        type="text"
                                        placeholder="Category ID"
                                        value={categoryData.category_id}
                                        onChange={(e) => setCategoryData({ ...categoryData, category_id: e.target.value })}
                                        required
                                    />
                                    <Input
                                        type="text"
                                        placeholder="Category Name"
                                        value={categoryData.name}
                                        onChange={(e) => setCategoryData({ ...categoryData, name: e.target.value })}
                                        required
                                    />
                                    <Input
                                        type="text"
                                        placeholder="Description"
                                        value={categoryData.description}
                                        onChange={(e) => setCategoryData({ ...categoryData, description: e.target.value })}
                                    />
                                    <Input
                                        type="text"
                                        placeholder="Slug"
                                        value={categoryData.slug}
                                        onChange={(e) => setCategoryData({ ...categoryData, slug: e.target.value })}
                                    />
                                    <div style={{display: 'flex', flexDirection: 'row', gap: '10px', marginTop: '20px'}}>
                                        <Button type="submit">Thêm Danh Mục</Button>
                                        <Button type="button" onClick={() => setShowAddCategoryForm(false)}>Hủy</Button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {activeContent === 'paymentMethod' && (
                            <PaymentMethod id="paymentMethod">
                                <h5>Payment Method</h5>
                                <PaymentButton onClick={() => setIsModalOpen(true)}>
                                    Add a payment method
                                </PaymentButton>
                                <Method>
                                    <span><FaMoneyBillWave /> Cash on Delivery</span>
                                    <Button>Manage</Button>
                                </Method>
                                <Method>
                                    <span><FaMobileAlt /> VN Pay Account</span>
                                    <Button>Manage</Button>
                                </Method>
                                <Method>
                                    <span><FaPaypal /> PayPal Account</span>
                                    <Button>Manage</Button>
                                </Method>
                            </PaymentMethod>
                        )}

                        
                        {activeContent === 'changePassword' && (
                            <ChangePasswordForm id="changePassword">

                                <h5>Change Password</h5>
                                <form>
                                    <Input type="password" id="oldPassword" placeholder="Old password*" required />
                                    <Input type="password" id="newPassword" placeholder="New password*" required />
                                    <Input type="password" id="confirmNewPassword" placeholder="Confirm new password*" required />
                                    <Button type="submit">Change Password</Button>
                                </form>
                            </ChangePasswordForm>
                        )}
                        {activeContent === 'applicationNotifications' && (
                            <ApplicationNotifications id="applicationNotifications">
                                <h5>By Email:</h5>
                                <h6>Receive the latest news, update, and industry tutorials for us.</h6>
                                <label>
                                    <input 
                                        type="checkbox" 
                                        name="exclusiveOffers" 
                                        checked={notificationSettings.exclusiveOffers} 
                                        onChange={handleNotificationChange} 
                                    />
                                    Exclusive product offers
                                    <p>Used or owned by only one person or group, and not shared with anyone else.</p>
                                </label>
                                <label>
                                    <input 
                                        type="checkbox" 
                                        name="dailyMessages" 
                                        checked={notificationSettings.dailyMessages} 
                                        onChange={handleNotificationChange} 
                                    />
                                    Daily Messages
                                    <p>Today is hard, tomorrow will be worse, but the day after tomorrow will be sunshine.</p>
                                </label>
                                <label>
                                    <input 
                                        type="checkbox" 
                                        name="weeklySummary" 
                                        checked={notificationSettings.weeklySummary} 
                                        onChange={handleNotificationChange} 
                                    />
                                    Weekly activity summary
                                    <p>Open the activity app on the watch and scroll down to the bottom and tap on "Weekly Summary".</p>
                                </label>
                                <h5>Notification from Us</h5>
                                <h6>Receive the latest news, update, and industry tutorials for us:</h6>
                                <label>
                                    <input 
                                        type="checkbox" 
                                        name="newsUpdates" 
                                        checked={notificationSettings.newsUpdates} 
                                        onChange={handleNotificationChange} 
                                    />
                                    News & Updates
                                    <p>Receive the latest news, updates, and industry tutorials for us.</p>
                                </label>
                                <label>
                                    <input 
                                        type="checkbox" 
                                        name="bestTrips" 
                                        checked={notificationSettings.bestTrips} 
                                        onChange={handleNotificationChange} 
                                    />
                                    Best Trips
                                    <p>Receive the latest news, updates, and industry tutorials for us.</p>
                                </label>
                                <label>
                                    <input 
                                        type="checkbox" 
                                        name="userResearch" 
                                        checked={notificationSettings.userResearch} 
                                        onChange={handleNotificationChange} 
                                    />
                                    User Research
                                    <p>Receive the latest news, updates, and industry tutorials for us.</p>
                                </label>

                                <h5>Comments:</h5>
                                <h6>Receive the latest news, update, and industry tutorials for us.</h6>
                                <label>
                                    <input 
                                        type="radio" 
                                        name="commentsNotifications" 
                                        value="doNotNotify" 
                                        checked={notificationSettings.commentsNotifications === 'doNotNotify'} 
                                        onChange={handleNotificationChange} 
                                    />
                                    Do not notify me
                                </label>
                                <label>
                                    <input 
                                        type="radio" 
                                        name="commentsNotifications" 
                                        value="mentionsOnly" 
                                        checked={notificationSettings.commentsNotifications === 'mentionsOnly'} 
                                        onChange={handleNotificationChange} 
                                    />
                                    Mentions only
                                </label>
                                <label>
                                    <input 
                                        type="radio" 
                                        name="commentsNotifications" 
                                        value="allComments" 
                                        checked={notificationSettings.commentsNotifications === 'allComments'} 
                                        onChange={handleNotificationChange} 
                                    />
                                    All comments
                                </label>

                                <Button onClick={handleSaveSettings}>Save Settings</Button>
                            </ApplicationNotifications>
                        )}
                    </Content>
                </Col>
            </Row>

            {isModalOpen && (
                <Modal>
                    <ModalContent>
                        <ModalHeader>Add Payment Method</ModalHeader>
                        <ModalBody>
                            <Input
                                type="text"
                                placeholder="Enter payment method name"
                                value={paymentMethodName}
                                onChange={(e) => setPaymentMethodName(e.target.value)}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={handleAddPaymentMethod}>Add</Button>
                            <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
        </Container>
    );
}

export default ManageSettingComponent;
