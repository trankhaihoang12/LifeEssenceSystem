import React, { useState } from 'react';
import {Container, Sidebar,Profile,Navigation,MainContent} from './Style';
import {FaUser,FaProductHunt,FaShoppingCart,FaFileInvoice,FaHistory,FaCog,FaSignOutAlt,FaTachometerAlt} from 'react-icons/fa';
import AdminDashboard from '../../components/AdminDashboard/AdminDashboard';
import AdminUsersComponnent from '../../components/AdminUsersComponnent/AdminUsersComponnent';
import AdminProductsComponent from '../../components/AdminProductsComponnent/AdminProductsComponent';
import AdminOrdersComponnent from '../../components/AdminOrdersComponnent/AdminOrdersComponnent';
import AdminInvoiceComponent from '../../components/AdminInvoiceComponent/AdminInvoiceComponent';
import AdminHistoryComponnent from '../../components/AdminHistoryComponnent/AdminHistoryComponnent';
import AdminSettingComponnent from '../../components/AdminSettingComponnent/AdminSettingComponnent';

const AdminPage = () => {
  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    alert("Bạn đã đăng xuất!"); // Thay thế bằng logic thực tế
  };
  const rootSubmenuKeys = ['dashboard','user', 'product', 'order','invoice', 'history', 'setting'];
  const [openKeys, setOpenKeys] = useState(['user']);
  const [keySelected, setKeySelected] = useState('dashboard');
  
  const renderPage = (key) => {
    switch (key) {
      case 'dashboard':
        return (
          <AdminDashboard/>
        )
      case 'user':
        return (
          <AdminUsersComponnent/>
        )
      case 'product':
        return (
          <AdminProductsComponent />
        )
      case 'order':
        return (
          <AdminOrdersComponnent />
        )
      case 'invoice':
        return (
          <AdminInvoiceComponent/>
        )
      case 'history':
        return (
          <AdminHistoryComponnent />
        )
      case 'setting':
        return (
          <AdminSettingComponnent />
        )
      default:
        return <></>
    }
  }

  const handleOnClick = ({ key }) => {
    setKeySelected(key)
  }


  

  return (
    <Container>
      {/* Sidebar */}
      <Sidebar>
        <Profile>
          <div className="avatar">A</div>
          <h2>VĂN LÂN</h2>
          <p>ADMIN</p>
        </Profile>

        <Navigation>
          <ul>
            <li onClick={() => handleOnClick({ key: 'dashboard' })}>
              <FaTachometerAlt /> Dashboard
            </li>
            <li onClick={() => handleOnClick({ key: 'user' })}>
              <FaUser /> User
            </li>
            <li onClick={() => handleOnClick({ key: 'product' })}>
              <FaProductHunt /> Products
            </li>
            <li onClick={() => handleOnClick({ key: 'order' })}>
              <FaShoppingCart /> Orders
            </li>
            <li onClick={() => handleOnClick({ key: 'invoice' })}>
              <FaFileInvoice /> Invoice
            </li>
            <li onClick={() => handleOnClick({ key: 'history' })}>
              <FaHistory /> History
            </li>
            <li onClick={() => handleOnClick({ key: 'setting' })}>
              <FaCog /> Settings
            </li>
            <li onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </li>
          </ul>
        </Navigation>


      </Sidebar>
      {/* Main Content */}


      <MainContent>
        {renderPage(keySelected)}
      </MainContent>


    </Container>
  );
};

export default AdminPage;
