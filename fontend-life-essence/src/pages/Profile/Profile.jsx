import React from 'react';
import { FaEdit, FaMapMarkerAlt } from 'react-icons/fa';
import { Container, SectionHeader, InfoSection, AddressSection, AddressCard } from './Style';
import { useNavigate } from 'react-router';



const Profile = () => {
  const navigate = useNavigate()
  return (
    <div style={{ backgroundColor: '#E8F3FF', width: '100%', height: '800px', margin: 'auto', display: 'flex' }}>
      <div style={{ width: '1000px', height: '700px', backgroundColor: '#FFFFFF', margin: 'auto', display: 'flex', flexDirection: 'column', border: '1.5px solid #000', borderRadius: '10px' }}>
        <div style={{ position: 'relative', height: '150px', width: '1000px', overflow: 'hidden', display: 'flex' }}>
          <div style={{ height: '150px', width: '150px', }}>
            <img
              style={{ borderRadius: '100%', height: '150px', width: '150px', objectFit: 'cover', padding: '20px' }}
              src="https://ss-images.saostar.vn/wp700/pc/1659626681742/saostar-9wzbz4t5kyt0y1tv.jpg"
              alt="Profile"
            />
          </div>
          <div style={{ width: '850px', height: '150px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' , gap: '10px'}}>
            <h1 style={{ margin: '0' }}>Nguyễn Tiến Mạnh</h1>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FaMapMarkerAlt style={{ fontSize: '20px',marginRight: '5px', color: '#333' }} />
              <h2 style={{ margin: '0'}}>Đà Nẵng, Việt Nam</h2>
            </div>
          </div>
        </div>
        <Container>
          <SectionHeader>
            <h1 style={{ fontWeight: 'bold' }}>Personal Info</h1>
            <button onClick={()=>navigate('/profile-upadate')} style={{ backgroundColor: '#ccc', border: 'none', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer', color: '#000', fontSize: '1em' }}>
              <FaEdit /> Edit
            </button>
          </SectionHeader>
          <InfoSection>
            <div style={{ width: '30%' }}>
              <h2 style={{ fontWeight: 'bold', fontSize: '1.5em' }}>UserName:</h2>
              <h2 style={{ fontWeight: 'bold', fontSize: '1.5em' }}>Phone Number:</h2>
              <h2 style={{ fontWeight: 'bold', fontSize: '1.5em' }}>Email:</h2>
              <h2 style={{ fontWeight: 'bold', fontSize: '1.5em' }}>Location:</h2>
              <h2 style={{ fontWeight: 'bold', fontSize: '1.5em' }}>Since Member:</h2>
            </div>
            <div style={{ width: '30%' }}>
              <h2 style={{ fontWeight: '400', fontSize: '1.5em' }}>Trần Khải Hoàng</h2>
              <h2 style={{ fontWeight: '400', fontSize: '1.5em' }}>0708146105</h2>
              <h2 style={{ fontWeight: '400', fontSize: '1.5em' }}>hoang2012@gmail.com</h2>
              <h2 style={{ fontWeight: '400', fontSize: '1.5em' }}>DaNang, VietNam</h2>
              <h2 style={{ fontWeight: '400', fontSize: '1.5em' }}>08 Dec, 2023</h2>
            </div>
          </InfoSection>

          <SectionHeader>
            <h1 style={{ fontWeight: 'bold' }}>Billing & Shipping Address</h1>
          </SectionHeader>

          <AddressSection>
            <div style={{ width: '100%', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid #000', borderRadius: '10px' }}>
              <AddressCard>
                <div style={{ display: 'flex', justifyContent: "space-between" }}>
                  <h3>HOME ADDRESS</h3>
                  <button style={{ backgroundColor: '#ccc', border: 'none', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer', color: '#000', fontSize: '1em' }}>
                    <FaEdit /> Edit
                  </button>
                </div>
                <p style={{ fontWeight: '400', fontSize: '1.3em' }}>Hoàng Trần</p>
                <p style={{ fontWeight: '400', fontSize: '1.3em' }}>78/10 Lê Thanh Nghị , Hoà Cường Bắc , Hải Châu , TP Đà Nẵng</p>
                <p style={{ fontWeight: '400', fontSize: '1.3em' }}>Phone (+78) 1234 56789</p>
              </AddressCard>
            </div>
            <div style={{ width: '100%', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid #000', borderRadius: '10px' }}>
              <AddressCard>
                <div style={{ display: 'flex', justifyContent: "space-between" }}>
                  <h3>SHIPPING ADDRESS</h3>
                  <button style={{ backgroundColor: '#ccc', border: 'none', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer', color: '#000', fontSize: '1em' }}>
                    <FaEdit /> Edit
                  </button>

                </div>
                <p style={{ fontWeight: '400', fontSize: '1.3em' }}>Hoàng Trần</p>
                <p style={{ fontWeight: '400', fontSize: '1.3em' }}>78/10 Lê Thanh Nghị , Hoà Cường Bắc , Hải Châu , TP Đà Nẵng</p>
                <p style={{ fontWeight: '400', fontSize: '1.3em' }}>Phone (+78) 1234 56789</p>
              </AddressCard>

            </div>
          </AddressSection>
        </Container>
      </div>
    </div>
  );
};
export default Profile;
