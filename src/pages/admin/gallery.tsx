import Head from 'next/head';
import { NextPage } from 'next';
import React, { useState } from 'react';
import { IGallery } from 'rca/models/gallery';
import CustomTable from 'rca/components/table';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Form, Image, Input, TableProps, Upload } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';
import constants from 'rca/constants';
import AdminContainer from 'rca/components/adminContainer';
import { galleryAtom } from 'rca/utils/atoms';

const Gallery: NextPage = () => {
  const [imageUrl, setImageUrl] = useState<string | null>();
  const columns: TableProps<IGallery>['columns'] = [
    {
      title: 'Image',
      dataIndex: 'image',
      width: 80,
      align: 'center',
      render: (image, record) => (
        <Image
          preview
          width={50}
          height={50}
          src={image}
          alt={record.name}
          style={{ padding: 0 }}
        />
      ),
    },
    { title: 'Name', dataIndex: 'name' },
    { title: 'Details', dataIndex: 'description' },
  ];

  const handleImageChange = (info: UploadChangeParam<UploadFile<any>>) => {
    const { file, fileList } = info;
    if (fileList.length === 0) {
      setImageUrl(null);
      return;
    }

    // get file url to preview
    const url = URL.createObjectURL(file.originFileObj as Blob);
    setImageUrl(url);
    return file;
  };

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
                <Input />
              </Form.Item>

              <Form.Item
                label='Image'
                name='image'
                rules={[{ required: true, message: 'Please choose an image' }]}
              >
                {imageUrl ? (
                  <>
                    <CloseCircleOutlined
                      style={{
                        float: 'right',
                        marginBottom: 5,
                        fontSize: 25,
                        color: constants.dangerColor,
                      }}
                      onClick={() => setImageUrl(null)}
                    />
                    <Image src={imageUrl} />
                  </>
                ) : (
                  <Upload.Dragger
                    onChange={handleImageChange}
                    multiple={false}
                    style={{ padding: 10 }}
                  >
                    <p className='ant-upload-text'>
                      Click or drag file to this area to upload
                    </p>

                    <p className='ant-upload-hint'>
                      Choose a single image from your device
                    </p>
                  </Upload.Dragger>
                )}
              </Form.Item>

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
