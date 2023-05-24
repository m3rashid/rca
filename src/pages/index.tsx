// import axios from 'axios';
import Head from 'next/head';
import { Button, Carousel, Typography } from 'antd';
// import { IEvent } from 'rca/models/event';
// import { Gallery, IGallery } from 'rca/models/gallery';
// import { useEffect, useState } from 'react';
import MainCarousel from 'rca/components/mainCarousel';
import Principles from 'rca/components/principles';
import UserHeader from 'rca/components/userHeader';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { uiAtom } from 'rca/utils/atoms';
// import HomeCarousel from 'rca/components/homeCarousel';

const Home = () => {
  const router = useRouter();
  const { isMobile } = useRecoilValue(uiAtom);

  // const [{ events, gallery }, setState] = useState<{
  //   events: IEvent[];
  //   gallery: IGallery[];
  // }>({ events: [], gallery: [] });

  // const getData = async () => {
  //   const promises: Array<Promise<any>> = [];
  //   promises.push(axios.get('/api/admin/events'));
  //   promises.push(axios.get('/api/admin/gallery'));

  //   const [allEvents, allGallery] = await Promise.all(promises);

  //   return {
  //     events: allEvents.data.error ? [] : allEvents.data.data,
  //     gallery: allGallery.data.error ? [] : allGallery.data.data,
  //   };
  // };

  // useEffect(() => {
  //   getData()
  //     .then((data) => setState(data))
  //     .catch(console.log);
  // }, []);

  return (
    <>
      <Head>
        <title>RCA - Shibli Residential Coaching Academy</title>
      </Head>

      <UserHeader>
        <Carousel autoplay arrows className='w-screen' dotPosition='top'>
          {[
            '/home1.jpeg',
            '/home2.jpeg',
            '/home3.jpeg',
            '/home4.jpeg',
            '/home5.jpeg',
            '/home6.jpeg',
          ].map((item) => {
            return <MainCarousel key={1} alt='carousel items' url={item} />;
          })}
        </Carousel>

        <div className='relative -top-[100px] flex items-center justify-center flex-col'>
          <Button
            size={isMobile ? 'middle' : 'large'}
            className='w-[250px] h-[60px]'
            type='primary'
            onClick={() => router.push('/exam/register')}
          >
            Register for Exam
          </Button>
          <Typography.Text className='block font-bold text-lg text-red-700 bg-white bg-opacity-40 rounded-md py-1 px-4 mt-2 backdrop:opacity-10'>
            You have to create account First
          </Typography.Text>
        </div>

        <Principles />

        {/* {gallery &&
          gallery.map((item) => {
            return (
              <HomeCarousel
                key={item._id}
                title={item.name}
                url={item.image}
                content={item.description}
              />
            );
          })} */}

        {/* <div className='m-3 md:m-5 mt-4 md:mt-6 flex items-center justify-center'>
        <Typography.Title level={2}>Upcoming Events</Typography.Title>
      </div>
      <div className='m-3 md:m-5 flex flex-col md:flex-row gap-4 flex-wrap'>
        {events.map((event) => (
          <EventsHome key={event._id} event={event} />
        ))}
      </div> */}
      </UserHeader>
    </>
  );
};

export default Home;

// export const getServerSideProps = async () => {
//   const gallery = await Gallery.find({}).lean();
//   return {
//     props: {
//       gallery: gallery || [],
//     },
//   };
// };
