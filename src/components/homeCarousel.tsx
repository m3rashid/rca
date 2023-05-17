import { Image, Typography } from 'antd';
import React from 'react';

export interface IHomeCarouselProps {
  title: string;
  url: string;
  content?: string;
}

const HomeCarousel: React.FC<IHomeCarouselProps> = ({
  title,
  url,
  content,
}) => {
  return (
    <>
      <div className='h-[350px] text-center relative'>
        <Image
          preview={false}
          src={url}
          alt={title}
          style={{ width: '100vw' }}
        />
        <div className='absolute z-50 bottom-0 left-0 w-full text-white text-left p-2 bg-opacity-30 bg-black'>
          <Typography.Title level={4} style={{ color: 'white' }}>
            {title}
          </Typography.Title>
          <Typography.Text style={{ color: 'white' }}>
            {content}
          </Typography.Text>
        </div>
      </div>
    </>
  );
};

export default HomeCarousel;
