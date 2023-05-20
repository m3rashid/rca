import React, { Fragment } from 'react';
import ImageUploader from 'rca/components/uploadImage';
import { IRegisterPayload } from 'rca/components/register/stepper';

interface IProps {
  payload: IRegisterPayload;
  setPayload: React.Dispatch<React.SetStateAction<IRegisterPayload>>;
}

const Uploads: React.FC<IProps> = ({ payload, setPayload }) => {
  const handleImageFile = async (name: string, imgUrl: string) => {
    if (!imgUrl) return;
    setPayload((prev) => ({ ...prev, [name]: imgUrl }));
  };

  return (
    <Fragment>
      <ImageUploader
        upload={true}
        label='Photograph'
        name='photograph'
        required
        handleImageUrl={(imgUrl) => handleImageFile('photograph', imgUrl)}
      />
      <ImageUploader
        upload={true}
        label='Aadhar Card'
        name='aadharCard'
        required
        handleImageUrl={(imgUrl) => handleImageFile('aadharCard', imgUrl)}
      />
      <ImageUploader
        upload={true}
        label='Signature'
        name='signature'
        required
        handleImageUrl={(imgUrl) => handleImageFile('signature', imgUrl)}
      />
      <ImageUploader
        upload={true}
        label='Last Semester Certificate'
        name='lastSemesterCertificate'
        handleImageUrl={(imgUrl) =>
          handleImageFile('lastSemesterCertificate', imgUrl)
        }
      />
    </Fragment>
  );
};

export default Uploads;
