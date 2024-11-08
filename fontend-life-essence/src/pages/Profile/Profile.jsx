import React from 'react';
import { Container, Title, Card, Label, Input, Button } from './Style';
import { IoCameraOutline } from 'react-icons/io5';

const Profile = () => {
  return (

    <Container>
      <Title style={{ marginLeft: '120px' }}>My Profile</Title>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', height: '160px', width: '160px', overflow: 'hidden', marginBottom: '10px' }}>
              <img
                style={{ borderRadius: '100%', height: '160px', width: '160px', objectFit: 'cover' }}
                src="https://ss-images.saostar.vn/wp700/pc/1659626681742/saostar-9wzbz4t5kyt0y1tv.jpg"
                alt="Profile"
              />
              <IoCameraOutline
                style={{ position: 'absolute', bottom: '5px', right: '5px', color: '#000', fontSize: '35px', borderRadius: '50%', padding: '5px' }}
              />
            </div>
          </div>
          <Card>
            <div>
            <h1>General Information</h1>
            <div style={{ display: 'flex', justifyContent: "space-around" , gap: '70px'}}>
              <div style={{ width: '70%' }}>
                <Label>First Name</Label>
                <Input type="text" />
              </div>
              <div style={{ width: '70%' }}>
                <Label>Last Name</Label>
                <Input type="text" />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: "space-around" , gap: '70px'}}>
              <div style={{ width: '70%' }}>
                <Label>Username</Label>
                <Input type="text" />
              </div>
              <div style={{ width: '70%' }}>
                <Label>Phone</Label>
                <Input type="text" />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: "space-around" , gap: '70px'}}>
              <div style={{ width: '70%' }}>
                <Label>Email</Label>
                <Input type="email" />
              </div>
              <div style={{ width: '70%' }}>
                <Label>Date of Birth</Label>
                <Input type="date" />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
              <div style={{ marginRight: '10px' }}>
                <Button>Update Profile</Button>
              </div>
            </div>
            </div>
          </Card>

          <Card>
            <h2>Default Address</h2>
            <Label>Address</Label>
            <Input type="text" />
            <Label>District</Label>
            <Input type="text" />
            <Label>City</Label>
            <Input type="text" />
            <Button>Update Address</Button>
          </Card>
          <Card>
            <h2>Password</h2>
            <Label>Current Password</Label>
            <Input type="password" />
            <Label>New Password</Label>
            <Input type="password" />
            <Label>Confirm New Password</Label>
            <Input type="password" />
            <p>Note: You can skip if you do not need to change your password.</p>
            <Button>Update Password</Button>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default Profile;
