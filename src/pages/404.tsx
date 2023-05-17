import React from 'react';
import * as notFound from 'rca/animations/error-404.json';
import Lottie from 'react-lottie';

interface IProps {}

const NotFound: React.FC<IProps> = () => {
  return (
    <>
      <Lottie
        options={{
          animationData: notFound,
          autoplay: true,
          loop: true,
        }}
				height={700}
      />
    </>
  );
};

export default NotFound;
