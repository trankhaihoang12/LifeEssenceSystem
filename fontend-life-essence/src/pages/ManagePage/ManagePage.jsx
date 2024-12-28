import React, { useState } from 'react';
import {Container,Sidebar,Profile,Navigation,MainContent,} from './Style';
import {FaProductHunt, FaShoppingCart,FaCog, FaSignOutAlt, FaAtlassian } from 'react-icons/fa';
import ManageOrdersComponent from '../../components/ManageOrdersComponent/ManageOrdersComponent';
import ManageProductsComponent from '../../components/ManageProductsComponent/ManageProductsComponent';
import ManageBlogsComponnent from '../../components/ManageBlogsComponent/ManageBlogsComponent';
import ManageSettingComponent from '../../components/ManageSettingComponent/ManageSettingComponent';
import * as message from '../../components/MessageComponent/Message';
import { useNavigate } from 'react-router';


const ManagePage = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
  const handleLogout = () => {
     localStorage.removeItem('userData');
        setUserData(null);
        navigate('/')
        message.success('Logout successfully')
  };

  const [keySelected, setKeySelected] = useState('products');

  const renderPage = (key) => {
    switch (key) {
      case 'products':
        return <ManageProductsComponent />; // Render AdminProductsComponent
      case 'order':
        return <ManageOrdersComponent />;
      case 'blogs':
        return <ManageBlogsComponnent />;
      case 'setting':
        return <ManageSettingComponent />;
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
          <div className="avatar">M</div>
          <h2>MANAGER</h2>
        </Profile>

        <Navigation>
          <ul>
            <li onClick={() => handleOnClick('products')}><FaProductHunt /> Products</li> {/* Giữ lại mục Products */}
            <li onClick={() => handleOnClick('order')}><FaShoppingCart /> Orders</li>
            <li onClick={() => handleOnClick('blogs')}><FaAtlassian /> Blogs</li>
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


export default ManagePage;

