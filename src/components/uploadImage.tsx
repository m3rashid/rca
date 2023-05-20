import React from 'react';
import { Form, Image, Upload } from 'antd';
import constants from 'rca/constants';
import { CloseCircleOutlined } from '@ant-design/icons';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';

interface IProps {
  handleImageUrl?: (imgSrc: string) => any;
  handleImageFile?: (file: UploadFile<any>) => any;
  name: string;
  label: string;
  required?: boolean;
}

const ImageUploader: React.FC<IProps> = ({
  handleImageUrl,
  handleImageFile,
  label,
  name,
  required,
}) => {
  const [imageUrl, setImageUrl] = React.useState<string | null>();

  const handleImageChange = (info: UploadChangeParam<UploadFile<any>>) => {
    const { file, fileList } = info;
    if (fileList.length === 0) {
      setImageUrl(null);
      return;
    }
    const url = URL.createObjectURL(file.originFileObj as Blob);
    setImageUrl(url);
    if (handleImageUrl) handleImageUrl(url);
    if (handleImageFile) handleImageFile(file);
    return file;
  };

  return (
    <>
      <Form.Item
        label={label}
        name={name}
        {...(required && {
          rules: [{ required: true, message: 'Please choose an image' }],
        })}
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
    </>
  );
};

export default ImageUploader;
