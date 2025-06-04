"use client"
import React from 'react';
import { Rings } from 'react-loader-spinner'; // You can choose from different animations

const LoadingAnimation: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Rings
        height="100"
        width="100"
        color="#1976d2" // You can customize the color
        radius="6"
        wrapperStyle={{}}
        visible={true}
      />
    </div>
  );
};

export default LoadingAnimation;
