import axios from 'axios';
import Head from 'next/head';
import { Carousel } from 'antd';
import { IEvent } from 'rca/models/event';
import { IGallery } from 'rca/models/gallery';
import { useEffect, useState } from 'react';
import MainCarousel from 'rca/components/mainCarousel';
import Principles from 'rca/components/principles';
import UserHeader from 'rca/components/userHeader';

const Home = () => {
  const [{ events, gallery }, setState] = useState<{
    events: IEvent[];
    gallery: IGallery[];
  }>({ events: [], gallery: [] });

  const getData = async () => {
    const promises: Array<Promise<any>> = [];
    promises.push(axios.get('/api/admin/events'));
    promises.push(axios.get('/api/admin/gallery'));

    const [allEvents, allGallery] = await Promise.all(promises);

    return {
      events: allEvents.data.error ? [] : allEvents.data.data,
      gallery: allGallery.data.error ? [] : allGallery.data.data,
    };
  };

  useEffect(() => {
    getData()
      .then((data) => setState(data))
      .catch(console.log);
  }, []);

  return (
    <>
      <Head>
        <title>RCA - Residential Coaching Academy</title>
      </Head>

      <UserHeader>
        <Carousel autoplay arrows className='w-screen' dotPosition='top'>
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
          {[
            'https://static.theprint.in/wp-content/uploads/2019/06/UPSC-headquarters-1.jpeg?compress=true&quality=80&w=376&dpr=2.6',
            'https://static.theprint.in/wp-content/uploads/2021/02/UPSC.jpg',
            'https://english.cdn.zeenews.com/sites/default/files/styles/zm_700x400/public/2022/08/02/1072504-upsc.jpg?im=Resize=(1280,720)',
          ].map((item) => {
            return <MainCarousel key={1} alt='carousel items' url={item} />;
          })}
        </Carousel>

        <Principles />

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
