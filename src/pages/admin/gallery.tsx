import React from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import { UploadFile } from 'antd/es/upload';
import { IGallery } from 'rca/models/gallery';
import { galleryAtom } from 'rca/utils/atoms';
import CustomTable from 'rca/components/table';
import { Form, Image, Input, TableProps } from 'antd';
import ImageUploader from 'rca/components/uploadImage';
import AdminContainer from 'rca/components/adminContainer';

const Gallery: NextPage = () => {
  const columns: TableProps<IGallery>['columns'] = [
    {
      title: 'Image',
      dataIndex: 'image',
      width: 110,
      align: 'center',
      render: (image, record) => (
        <Image
          preview
          width={80}
          height={80}
          src={image}
          alt={record.name}
          style={{ padding: 0 }}
        />
      ),
    },
    { title: 'Name', dataIndex: 'name' },
    { title: 'Details', dataIndex: 'description' },
  ];

  const handleImageUrl = (imgSrc: string) => {};

  return (
    <AdminContainer>
      <Head>
        <title>RCA | Gallery</title>
      </Head>

      <div className='m-4 bg-white rounded-md shadow-md'>
        <CustomTable<IGallery>
          tableTitle='Gallery'
          endpoint={{
            get: '/api/admin/gallery',
            post: '/api/admin/gallery',
            put: '/api/admin/gallery',
            delete: '/api/admin/gallery',
          }}
          scroll={{ x: 800 }}
          tableColumns={columns}
          addButtonLabel='Add Gallery'
          recoilAtom={galleryAtom}
          AddFormInner={
            <>
              <Form.Item
                label='Gallery Name'
                name='name'
                rules={[
                  { required: true, message: 'Please enter gallery name' },
                ]}
              >
                <Input size='large' />
              </Form.Item>

              <ImageUploader
                upload={false}
                label='Image'
                name='image'
                required
                handleImageUrl={handleImageUrl}
              />

              <Form.Item label='Details' name='description'>
                <Input.TextArea rows={4} />
              </Form.Item>
            </>
          }
        />
      </div>
    </AdminContainer>
  );
};

export default Gallery;
