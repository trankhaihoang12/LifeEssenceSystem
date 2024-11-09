import React, { useState } from 'react';
import { FaUser, FaCreditCard, FaLock, FaBell, FaMoneyBillWave, FaMobileAlt, FaPaypal } from 'react-icons/fa';
import {
    Container,
    Row,
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
    ApplicationNotifications // Import the new styled component
} from './Style';

function AdminSettingComponent() {
    const [activeContent, setActiveContent] = useState('paymentMethod');
    const [isAddingPaymentMethod, setIsAddingPaymentMethod] = useState(false);
    const [paymentMethodName, setPaymentMethodName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [notificationSettings, setNotificationSettings] = useState({
        exclusiveOffers: false,
        dailyMessages: false,
        weeklySummary: false,
        newsUpdates: false,
        bestTrips: false,
        userResearch: false,
        commentsNotifications: 'doNotNotify',
    });

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

    return (
        <Container fluid>
            <Row>
                <Col md={3}>
                    <Sidebar className="sidebar">
                        <nav className="nav flex-column">
                            <NavLink onClick={() => showContent('personalInfo')} active={activeContent === 'personalInfo'}>
                                <FaUser /> Personal Info
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
                                        src="https://storage.googleapis.com/a1aa/image/oaIxHgDva361HdGQS2Refj7MnUYF9X6RRRNhPVm8mGkdHHuTA.jpg"
                                        alt="Profile picture of a person"
                                    />
                                    <h5>VoVanLan</h5>
                                    <p>I am Singer</p>
                                </ProfileCard>
                                <PersonalInfo>
                                    <h5>Personal Information</h5>
                                    <p><strong>Full Name :</strong> Võ Văn Lân</p>
                                    <p><strong>Date of Birth:</strong> 01/01/2003</p>
                                    <p><strong>About:</strong> Hát hay</p>
                                    <p><strong>Email:</strong> vovanlan124@gmail.com</p>
                                    <p><strong>Phone:</strong> 0768557901</p>
                                    <p><strong>Address:</strong> 85 An Hải Bắc, Sơn Trà, Đà Nẵng</p>
                                    <p><strong>Country:</strong> Việt Nam</p>
                                </PersonalInfo>
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

export default AdminSettingComponent;
