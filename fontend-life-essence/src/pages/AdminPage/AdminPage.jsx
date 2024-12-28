import React, { useState } from 'react';
import { Container, Sidebar, Profile, Navigation, MainContent, } from './Style';
import AdminDashboard from '../../components/AdminDashboard/AdminDashboard';
import AdminUsersComponent from '../../components/AdminUsersComponent/AdminUsersComponent';
import AdminOrdersComponent from '../../components/AdminOrdersComponent/AdminOrdersComponent';
import AdminInvoiceComponent from '../../components/AdminInvoiceComponent/AdminInvoiceComponent';
import AdminHistoryComponent from '../../components/AdminHistoryComponent/AdminHistoryComponent';
import AdminSettingComponent from '../../components/AdminSettingComponent/AdminSettingComponent';
import AdminProductsComponent from '../../components/AdminProductsComponent/AdminProductsComponent';
import { FaUser, FaProductHunt, FaShoppingCart, FaFileInvoice, FaHistory, FaCog, FaSignOutAlt, FaTachometerAlt, FaAtlassian } from 'react-icons/fa';
import AdminBlogsComponnent from '../../components/AdminBlogsComponent/AdminBlogsComponent';
import { useNavigate } from 'react-router';
import * as message from '../../components/MessageComponent/Message';

const AdminPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  const handleSignOut = () => {
    localStorage.removeItem('userData');
    setUserData(null);
    navigate('/')
    message.success('Logout successfully')
  };

  const [keySelected, setKeySelected] = useState('dashboard');

  const renderPage = (key) => {
    switch (key) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'user':
        return <AdminUsersComponent />;
      case 'products':
        return <AdminProductsComponent />; // Render AdminProductsComponent
      case 'order':
        return <AdminOrdersComponent />;
      case 'blogs':
        return <AdminBlogsComponnent />;
      // case 'invoice':
      //   return <AdminInvoiceComponent />;
      // case 'history':
      //   return <AdminHistoryComponent />;
      case 'setting':
        return <AdminSettingComponent />;
      default:
        return null;
    }
  };

  const handleOnClick = (key) => {
    setKeySelected(key);
  };


  return (
    <Container>
      <Sidebar>
        <Profile>
          <div className="avatar">A</div>
          <h2>ADMIN</h2>
        </Profile>

        <Navigation>
          <ul>
            <li onClick={() => handleOnClick('dashboard')}><FaTachometerAlt /> Dashboard</li>
            <li onClick={() => handleOnClick('user')}><FaUser /> User</li>
            <li onClick={() => handleOnClick('products')}><FaProductHunt /> Products</li> {/* Giữ lại mục Products */}
            <li onClick={() => handleOnClick('order')}><FaShoppingCart /> Orders</li>
            <li onClick={() => handleOnClick('blogs')}><FaAtlassian /> Blogs</li>
            {/* <li onClick={() => handleOnClick('invoice')}><FaFileInvoice /> Invoice</li>
            <li onClick={() => handleOnClick('history')}><FaHistory /> History</li> */}
            <li onClick={() => handleOnClick('setting')}><FaCog /> Settings</li>
            <li onClick={handleSignOut}><FaSignOutAlt /> Logout</li>
          </ul>
        </Navigation>
      </Sidebar>

      <MainContent>
        {/* Render the selected page */}
        {renderPage(keySelected)}
      </MainContent>
    </Container>
  );
};


export default AdminPage;

