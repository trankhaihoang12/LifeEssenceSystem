import React from 'react'
import { FaGoogle, FaTwitter } from 'react-icons/fa';
import { RiCameraFill, RiFacebookFill } from "react-icons/ri";
import { LuSearch } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa6";
import { TiShoppingCart } from 'react-icons/ti';
import Logo from '../../assets/images/Logo_Essence.png'
import { WrapperButton, WrapperHeaderOn, WrapperHeaderUnder, WrapperInput, WrapperItem, WrapperLogo } from './Style';


const HeaderComponent = () => {

  return (
    <div>
      <WrapperHeaderOn>
        <div style={{ alignItems: 'center', fontSize: '13px', color: '#fff' }}>
          Free Shipping for all Order of $99
        </div>
        <div style={{ display: 'flex', width: '200px', justifyContent: 'space-between' }}>
          <RiFacebookFill style={{ color: 'white', width: '25px', height: '25px' }} />
          <FaGoogle style={{ color: 'white', width: '23px', height: '23px' }} />
          <FaTwitter style={{ color: 'white', width: '23px', height: '23px' }} />
          <RiCameraFill style={{ color: 'white', width: '25px', height: '25px' }} />
        </div>
      </WrapperHeaderOn>

      <WrapperHeaderUnder>

        <div style={{ display: 'flex', width: '70%' }}>
          <WrapperLogo src={Logo} alt="Logo" />
          <div style={{ height: '75px' }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '20px', width: '750px', height: '44px' }}>
              <WrapperInput type="text" placeholder="Tìm kiếm..." />
              <WrapperButton>
                <span style={{ fontSize: '20px', color: '#fff' }}><LuSearch /></span>
              </WrapperButton>
            </div>
            <WrapperItem>
              <span>Home +</span>
              <span>Shop +</span>
              <span>Blog +</span>
              <span>On Sale +</span>
              <span>Contract +</span>
            </WrapperItem>
          </div>
        </div>

        <div style={{ display: 'flex', width: '220px', gap: '20px' }}>
          <div style={{ fontSize: '15px', fontWeight: 'bold' }}>SIGN IN / SIGN UP</div>
          <div style={{ display: 'flex', gap: '10px' }} >
            <FaRegHeart style={{ fontSize: '25px' }} />
            <TiShoppingCart style={{ fontSize: '25px' }} />
          </div>
        </div>
      </WrapperHeaderUnder>

    </div>


  )
}


export default HeaderComponent