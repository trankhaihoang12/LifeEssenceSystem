import React, { useState } from 'react';
import {
  Container,
  Sidebar,
  Profile,
  Navigation,
  MainContent,
} from './Style';
import AdminDashboard from '../../components/AdminDashboard/AdminDashboard';
import AdminUsersComponent from '../../components/AdminUsersComponent/AdminUsersComponent';
import AdminOrdersComponent from '../../components/AdminOrdersComponent/AdminOrdersComponent';
import AdminInvoiceComponent from '../../components/AdminInvoiceComponent/AdminInvoiceComponent';
import AdminHistoryComponent from '../../components/AdminHistoryComponent/AdminHistoryComponent';
import AdminSettingComponent from '../../components/AdminSettingComponent/AdminSettingComponent';
import AdminProductsComponent from '../../components/AdminProductsComponent/AdminProductsComponent'; // Import AdminProductsComponent
import { FaUser, FaProductHunt, FaShoppingCart, FaFileInvoice, FaHistory, FaCog, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa';

const AdminPage = () => {
  const handleLogout = () => {
    alert("Bạn đã đăng xuất!"); 
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
      case 'invoice':
        return <AdminInvoiceComponent />;
      case 'history':
        return <AdminHistoryComponent />;
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
          <h2>VĂN LÂN</h2>
          <p>ADMIN</p>
        </Profile>

        <Navigation>
          <ul>
            <li onClick={() => handleOnClick('dashboard')}><FaTachometerAlt /> Dashboard</li>
            <li onClick={() => handleOnClick('user')}><FaUser /> User</li>
            <li onClick={() => handleOnClick('products')}><FaProductHunt /> Products</li> {/* Giữ lại mục Products */}
            <li onClick={() => handleOnClick('order')}><FaShoppingCart /> Orders</li>
            <li onClick={() => handleOnClick('invoice')}><FaFileInvoice /> Invoice</li>
            <li onClick={() => handleOnClick('history')}><FaHistory /> History</li>
            <li onClick={() => handleOnClick('setting')}><FaCog /> Settings</li>
            <li onClick={handleLogout}><FaSignOutAlt /> Logout</li>
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
