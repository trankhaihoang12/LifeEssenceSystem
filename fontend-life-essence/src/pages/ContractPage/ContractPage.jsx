import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import emailjs from "@emailjs/browser";
import * as message from '../../components/MessageComponent/Message'


// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

// Styled Components
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: linear-gradient(135deg, #ff9a9e, #fad0c4, #fbc2eb);
  font-family: 'Arial', sans-serif;
  color: #333;
  padding-bottom: 50px;
`;

const Banner = styled.div`
  width: 100%;
  height: 300px;
  background: url('https://source.unsplash.com/1600x900/?nature,contact') center/cover no-repeat;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.7);
  animation: ${fadeIn} 1s ease-out;

  h1 {
    font-size: 3.5rem;
    margin: 0;
    animation: ${slideIn} 1s ease-out;
  }

  p {
    font-size: 1.2rem;
    margin-top: 10px;
    animation: ${slideIn} 1.5s ease-out;
  }
`;

const ContactContainer = styled.div`
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
  max-width: 1200px;
  width: 90%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin-top: -50px;
  animation: ${fadeIn} 1s ease-out;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px;
  text-align: center;

  @media (min-width: 768px) {
    flex-direction: row;
    text-align: left;
  }
`;

const LeftSection = styled.div`
  flex: 1;
  padding: 20px;
`;

const RightSection = styled.div`
  flex: 1;
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: #6e8efb;
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 30px;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 15px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: box-shadow 0.3s ease;

  &:focus {
    box-shadow: 0px 0px 5px #6e8efb;
    outline: none;
  }
`;

const Textarea = styled.textarea`
  padding: 15px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: box-shadow 0.3s ease;

  &:focus {
    box-shadow: 0px 0px 5px #6e8efb;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 15px 20px;
  font-size: 1rem;
  background-color: #6e8efb;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #4e6efb;
    transform: scale(1.05);
  }
`;

const MapContainer = styled.div`
  height: 400px;
  width: 100%;
  border-top: 1px solid #eee;

  @media (min-width: 768px) {
    border-top: none;
    border-left: 1px solid #eee;
  }
`;

// Google Maps Configuration
const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 10.762622, // Hồ Chí Minh
  lng: 106.660172,
};

const ContractPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  console.log('process.env.REACT_APP_EMAILJS_SERVICE_ID2', process.env.REACT_APP_EMAILJS_TEMPLATE_ID2)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID, 
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID2, 
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log("Message sent: ", result.text);
          message.success("Your message has been sent successfully!");
        },
        (error) => {
          console.error("Error sending message: ", error);
          alert("Failed to send your message. Please try again.");
        }
      );
  };

  const center = {
    lat: 16.066416, // Vĩ độ
    lng: 108.189513, // Kinh độ
  };

  const mapContainerStyle = {
    width: "100%",
    height: "100%",
  };

  return (
    <Wrapper>
      <Banner>
        <div>
          <h1 style={{ fontSize: '35px', textAlign: 'center' }}>Contact Us</h1>
          <p style={{ fontSize: '20px', textAlign: 'center' }}>For support and advice today!</p>
        </div>
      </Banner>
      <ContactContainer>
        <ContentWrapper>
          <LeftSection>
            <Title>Contact us</Title>
            <Subtitle>
              Please leave a message if you need assistance. We are always ready to help you find the most suitable dietary supplement product.
            </Subtitle>
            <ContactForm onSubmit={handleSubmit}>
              <Input
                type="text"
                placeholder="Full name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Textarea
                placeholder="Your message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
              />
              <Button type="submit">Send message</Button>
            </ContactForm>
          </LeftSection>
          <RightSection>
            <MapContainer>
              <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={center}
                  zoom={15}
                >
                  <Marker position={center} />
                </GoogleMap>
              </LoadScript>
            </MapContainer>
          </RightSection>
        </ContentWrapper>
      </ContactContainer>
    </Wrapper>
  );
};

export default ContractPage;
