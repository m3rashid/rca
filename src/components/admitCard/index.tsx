'use client';

import dayjs from 'dayjs';
import { IRegistration } from 'rca/models/registration';

export interface IProfileProps {
  data: IRegistration & {
    timeOfExam: string;
    dateOfExam: string;
  };
  printContainerRef: React.MutableRefObject<null>;
}

const AdmitCardTemplate: React.FC<IProfileProps> = ({
  printContainerRef,
  data: props,
}) => {
  if (!props) return null;

  return (
    <div
      ref={printContainerRef}
      className='min-h-screen py-2 max-w-screen-xl mx-auto gap-4'
    >
      <div className='flex py-3 sm:max-w-xl sm:mx-auto justify-center items-center'>
        <img
          src='https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Jamia_Millia_Islamia_Logo.svg/1200px-Jamia_Millia_Islamia_Logo.svg.png'
          className=' w-20 h-20'
        />

        <div className='flex flex-col justify-center items-center'>
          <h3 className='text-3xl mb-0 font-semibold text-gray-700 ml-4'>
            Jamia Millia Islamia
          </h3>
          <p className='text-sm font-semibold text-gray-700 text-center'>
            A Central University
          </p>
        </div>
      </div>

      <div className='flex flex-col justify-center items-center'>
        <h3 className='text-2xl font-semibold text-gray-700'>Admit Card</h3>
        <h4 className='text-xl font-semibold text-gray-500'>
          (JMI RCA - Centre for coaching & career planning test 2023)
        </h4>
      </div>

      <div className='flex flex-row justify-between items-center mb-10'>
        <div className='flex flex-col justify-center'>
          <h3 className='text-xl font-semibold text-gray-700 ml-4'>
            Name: {props.user?.name}
          </h3>
          <h3 className='text-xl font-semibold text-gray-700 ml-4'>
            Father's Name: {props.fatherName}
          </h3>
          <h3 className='text-xl font-semibold text-gray-700 ml-4'>
            Sex: {props.motherName}
          </h3>
          <h3 className='text-xl font-semibold text-gray-700 ml-4'>
            Category: {props.category}
          </h3>
          <h3 className='text-xl font-semibold text-gray-700 ml-4'>
            Centre : {props.testCenter?.address}
          </h3>
        </div>
        <div className='flex flex-col justify-center'>
          <h3 className='text-xl font-semibold text-gray-700 ml-4'>
            Roll No: {props.rollNumber}
          </h3>
          <h3 className='text-xl font-semibold text-gray-700 ml-4'>
            Date of Birth: {dayjs(props.dateOfBirth).format('DD/MM/YYYY')}
          </h3>
          <h3 className='text-xl font-semibold text-gray-700 ml-4'>
            Date Of Exam: {props.dateOfExam}
          </h3>
          <h3 className='text-xl font-semibold text-gray-700 ml-4'>
            Time Of Exam: {props.timeOfExam}
          </h3>
          <div className='flex flex-col justify-center items-center '>
            <div className='flex flex-row justify-center items-center gap-4 p-4 border-2 border-gray-400'>
              <div className=' w-40 p-4'>
                Affix your recent passport size photograph and it should match
                the uploaded photograph
              </div>
              <div className='flex flex-col justify-center items-center'>
                <img src={props.photograph} className=' w-40 h-40' />
              </div>
            </div>
            <span className='text-sm font-semibold text-gray-700 ml-4 text-center'>
              Photograph affixed should match the uploaded photograph
            </span>
          </div>
        </div>
      </div>
      <div className='flex flex-row justify-around items-center'>
        <div className='flex flex-col justify-center items-center'>
          <img src={props.signature} className=' w-40 h-40' />
          <h3
            className='text-xl font-semibold text-gray-700 ml-4
          border-b-2 border-gray-400'
          >
            Signature
          </h3>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <div
            className='
            w-full h-40
            bg-gray-200
          '
          ></div>
          <div className='flex flex-col justify-center items-center'>
            <h3 className='text-lg font-semibold text-gray-700 ml-4'>
              Candidate Signature
              <span className='text-sm font-semibold text-gray-700 ml-4 text-center'>
                (To be signed in the presence of invigilator)
              </span>
            </h3>
          </div>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <div
            className='
            w-full h-40
            bg-gray-200
          '
          ></div>
          <div className='flex flex-col justify-center items-center'>
            <h3 className='text-lg font-semibold text-gray-700 ml-4'>
              Invigilator Signature
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmitCardTemplate;
