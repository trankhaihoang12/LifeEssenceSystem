import React from 'react';
import { FaEdit } from 'react-icons/fa';
import {
  Container,
  SectionHeader,
  InfoSection,
  AddressSection,
  AddressCard
} from './Style';

const Profile = () => {
  return (
    <Container>
      <SectionHeader>
        <h1>Personal Info</h1>
        <button>
          <FaEdit /> Edit
        </button>
      </SectionHeader>
      <InfoSection>
        <div>
          <h2>UserName: Trần Khải Hoàng </h2>
          <h2>Phone Number: 0708146105 </h2>
          <h2>Email : hoang2012@gmail.com </h2>
          <h2>Location: DaNang, VietNam </h2>
          <h2>Since Member: 08 Dec, 2023 </h2>
        </div>
      </InfoSection>
    
      <SectionHeader>
        <h1>Billing & Shipping Address</h1>
      </SectionHeader>
    
      <AddressSection>
<div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid #000', borderRadius: '20px'}}>
<AddressCard>
          <div style={{display: 'flex', gap: '30px'}}>
          <h3>HOME ADDRESS</h3>
          <button>
            <FaEdit /> Edit
          </button>
          </div>
          <p>Hoàng Trần</p>
          <p>78/10 Lê Thanh Nghị , Hoà Cường Bắc , Hải Châu , TP Đà Nẵng</p>
          <p>Phone (+78) 1234 56789</p>
        </AddressCard>
</div>
<div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid #000', borderRadius: '20px'}}>
        <AddressCard>
        <div style={{display: 'flex', gap: '30px', marginTop: '5px'}}>
          <h3>SHIPPING ADDRESS</h3>
          <button>
            <FaEdit /> Edit
          </button>

        </div>
          <p>Hoàng Trần</p>
          <p>78/10 Lê Thanh Nghị , Hoà Cường Bắc , Hải Châu , TP Đà Nẵng</p>
          <p>Phone (+78) 1234 56789</p>
        </AddressCard>

</div>
      </AddressSection>
    </Container>
  );
};

export default Profile;