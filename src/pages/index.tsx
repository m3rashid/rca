import Head from 'next/head';
import { Carousel, Typography } from 'antd';
import HomeCarousel, { IHomeCarouselProps } from 'rca/components/homeCarousel';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { IEvent } from '../models/event';
import { IGallery } from 'rca/models/gallery';
import axios from 'axios';
import EventsHome from 'rca/components/eventsHome';
import { useEffect, useState } from 'react';

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

      <Carousel autoplay arrows className='w-screen'>
        {gallery.map((item) => {
          return (
            <HomeCarousel
              key={item._id}
              title={item.name}
              url={item.image}
              content={item.description}
            />
          );
        })}
      </Carousel>

      <div className='m-3 md:m-5 mt-4 md:mt-6 flex items-center justify-center'>
        <Typography.Title level={2}>Upcoming Events</Typography.Title>
      </div>
      <div className='m-3 md:m-5 flex flex-col md:flex-row gap-4 flex-wrap'>
        {events.map((event) => (
          <EventsHome key={event._id} event={event} />
        ))}
      </div>
    </>
  );
};

// export const getStaticProps: GetStaticProps = async (context) => {
//   const promises: Array<Promise<any>> = [];
//   promises.push(axios.get('/api/admin/events'));
//   promises.push(axios.get('/api/admin/gallery'));

//   const [events, gallery] = await Promise.all(promises);

//   return {
//     props: {
//       events: events.data.error ? [] : events.data.data,
//       gallery: gallery.data.error ? [] : gallery.data.data,
//     },
//     revalidate: 10,
//   };
// };

export default Home;
