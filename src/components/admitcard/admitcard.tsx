export const AdmitCardTemplate = (props: any) => {
  return (
    //create a admit card template with attractive design
    /*
    
export interface IRegistration extends BaseModel {
  user: IUser; // ObjectId
  currentStep: number;
  gender: string;
  fatherName: string;
  motherName: string;
  dateOfBirth: Date; // also calculate age from this
  mobileNumber: string;
  phoneNumber?: string;
  permanentAddress: IAddress;
  correspondenceAddress: IAddress;
  education: Array<IEducation>;
  testCenter: ITestCenter; // ObjectId
  earlierCompetitiveExams: Array<IEarlierCompetitiveExams>;
  agreeToTerms: {
    informationIsCorrect: boolean;
    rightToChange: boolean;
  };

  // Static Assets
  photograph: string;
  signature: string;
  aadharCard: string;
  lastSemesterCertificate?: string;
}
    */

  

    <div className="flex flex-col min-h-screen py-2 max-w-screen-xl mx-auto gap-4">
      <div className="flex py-3 sm:max-w-xl sm:mx-auto justify-center items-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Jamia_Millia_Islamia_Logo.svg/1200px-Jamia_Millia_Islamia_Logo.svg.png"
          className=" w-20 h-20"
        />

        <div className="flex flex-col justify-center items-center">
          <h3 className="text-3xl font-semibold text-gray-700 ml-4">
            Jamia Millia Islamia
            <p className="text-sm font-semibold text-gray-700 ml-4 text-center">
              A Central University
            </p>
          </h3>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center">
        <h3 className="text-2xl font-semibold text-gray-700 ml-4">
          Admit Card (Jmi Centre for coaching & career planning test 2023)
        </h3>
      </div>

      {/* use the props to fill the details in the admit card template */}
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col justify-center items-center">
          <h3 className="text-xl font-semibold text-gray-700 ml-4">
            Name: {props.name}
          </h3>
          <h3 className="text-xl font-semibold text-gray-700 ml-4">
            Father's Name: {props.fatherName}
          </h3>
          <h3 className="text-xl font-semibold text-gray-700 ml-4">
            Sex: {props.motherName}
          </h3>
          <h3 className="text-xl font-semibold text-gray-700 ml-4">
            Category: {props.category}
          </h3>
          <h3 className="text-xl font-semibold text-gray-700 ml-4">
            Centre : {props.centre}
          </h3>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h3 className="text-xl font-semibold text-gray-700 ml-4">
            Roll No: {props.rollNo}
          </h3>
          <h3 className="text-xl font-semibold text-gray-700 ml-4">
            Date of Birth: {props.dob}
          </h3>
          <h3 className="text-xl font-semibold text-gray-700 ml-4">
            Date Of Exam: {props.dateOfExam}
          </h3>
          <h3 className="text-xl font-semibold text-gray-700 ml-4">
            Time Of Exam: {props.timeOfExam}
          </h3>
          <div className="flex flex-col justify-center items-center ">
            <div className="flex flex-row justify-center items-center gap-4 p-4 border-2 border-gray-400">
              <div className=" w-40 p-4">
                Affix your recent passport size photograph and it should match
                the uploaded photograpgh
              </div>
              <div className="flex flex-col justify-center items-center">
                <img src={props.photo} className=" w-40 h-40" />
              </div>
            </div>
            <span className="text-sm font-semibold text-gray-700 ml-4 text-center">
              Photograph affixed should match the uploaded photograph
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-around items-center">
        <div className="flex flex-col justify-center items-center">
          <img src={props.photo} className=" w-40 h-40" />
          <h3
            className="text-xl font-semibold text-gray-700 ml-4
          border-b-2 border-gray-400"
          >
            Signature
          </h3>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div
            className="
            w-full h-40
            bg-gray-200
          "
          ></div>
          <div className="flex flex-col justify-center items-center">
            <h3 className="text-lg font-semibold text-gray-700 ml-4">
              Candidate Signature
              <span className="text-sm font-semibold text-gray-700 ml-4 text-center">
                (To be signed in the presence of invigilator)
              </span>
            </h3>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div
            className="
            w-full h-40
            bg-gray-200
          "
          ></div>
          <div className="flex flex-col justify-center items-center">
            <h3 className="text-lg font-semibold text-gray-700 ml-4">
              Invigilator Signature
              <span className="text-sm font-semibold text-gray-700 ml-4 text-center">
                (To be signed in the presence of invigilator)
              </span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};
