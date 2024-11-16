import React from 'react';
import { Container, Title, Card, Label, Input, Button } from './Style';
import { IoCameraOutline } from 'react-icons/io5';

const ProfileUpdate = () => {
  return (

    <Container>
      <Title style={{ marginLeft: '120px' }}>My Profile</Title>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', height: '160px', width: '160px', overflow: 'hidden', marginBottom: '10px' }}>
              <img
                style={{ borderRadius: '100%', height: '150px', width: '150px', objectFit: 'cover' }}
                src="https://ss-images.saostar.vn/wp700/pc/1659626681742/saostar-9wzbz4t5kyt0y1tv.jpg"
                alt="Profile"
              />
              <IoCameraOutline
                style={{ position: 'absolute', bottom: '5px', right: '15px', color: '#000', fontSize: '35px', borderRadius: '50%', padding: '5px' }}
              />
            </div>
          </div>
          <div style={{ backgroundColor: '#EEEEEE', width: '1200px' }}>
            <Card>
              <h1 style={{ fontWeight: 'bold', fontSize: '25px' }}>General Information</h1>
              <svg width="100%" height="40">
                <line x1="10" y1="10" x2="100% " y2="10" stroke="black" strokeWidth="1" />
              </svg>
              <div style={{ display: 'flex', justifyContent: "space-around" }}>
                <div style={{ width: '500px' }}>
                  <Label>First Name  <span style={{ color: 'red' }}>*</span></Label>
                  <Input type="text" />
                </div>
                <div style={{ width: '500px' }}>
                  <Label>Last Name  <span style={{ color: 'red' }}>*</span></Label>
                  <Input type="text" />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: "space-around" }}>
                <div style={{ width: '500px' }}>
                  <Label>Username  <span style={{ color: 'red' }}>*</span></Label>
                  <Input type="text" />
                </div>
                <div style={{ width: '500px' }}>
                  <Label>Phone  <span style={{ color: 'red' }}>*</span></Label>
                  <Input type="text" />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: "space-around" }}>
                <div style={{ width: '500px' }}>
                  <Label>Email  <span style={{ color: 'red' }}>*</span></Label>
                  <Input type="email" />
                </div>
                <div style={{ width: '500px' }}>
                  <Label>Date of Birth  <span style={{ color: 'red' }}>*</span></Label>
                  <Input type="date" />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                <div style={{ marginRight: '10px' }}>
                  <Button>Update Profile</Button>
                </div>
              </div>

            </Card>

            <Card>
              <h1 style={{ fontWeight: 'bold', fontSize: '25px' }}>Default Address</h1>
              <svg width="100%" height="40">
                <line x1="10" y1="10" x2="100% " y2="10" stroke="black" strokeWidth="1" />
              </svg>
              <div style={{ display: 'flex', justifyContent: "space-around" }}>
                <div style={{ width: '350px' }}>
                  <Label>Address  <span style={{ color: 'red' }}>*</span></Label>
                  <Input type="text" />
                </div>
                <div style={{ width: '350px' }}>
                  <Label>District  <span style={{ color: 'red' }}>*</span></Label>
                  <Input type="text" />
                </div>
                <div style={{ width: '350px' }}>
                  <Label>City  <span style={{ color: 'red' }}>*</span></Label>
                  <Input type="text" />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                <div style={{ marginRight: '10px' }}>
                  <Button>Update Address</Button>
                </div>
              </div>
            </Card>
            <Card>
              <h1 style={{ fontWeight: 'bold', fontSize: '25px' }}>Password</h1>
              <svg width="100%" height="40">
                <line x1="10" y1="10" x2="100% " y2="10" stroke="black" strokeWidth="1" />
              </svg>
              <div style={{ display: 'flex', justifyContent: "space-around" }}>
              <div style={{ width: '400px' }}>
                  <Label>Current Password  <span style={{ color: 'red' }}>*</span></Label>
                <Input type="password" />
              </div>
              <div style={{ width: '400px' }}>
                
              </div>
              </div>
              <div style={{ display: 'flex', justifyContent: "space-around" }}>
                <div style={{ width: '400px' }}>
                  <Label>New Password  <span style={{ color: 'red' }}>*</span></Label>
                  <Input type="password" />
                </div>
                <div style={{ width: '400px' }}>
                  <Label>Confirm New Password  <span style={{ color: 'red' }}>*</span></Label>
                  <Input type="password" />
                </div>
              </div>
              <p>Note: You can skip if you do not need to change your password.</p>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                <div style={{ marginRight: '10px' }}>
                  <Button>Update Password</Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProfileUpdate;
