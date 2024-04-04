import { useNavigate } from 'react-router-dom';

const DoctorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="">
      <h1>DoctorPage</h1>
      <br />
      <button onClick={() => navigate('/addQualification')}>
        Create Qualification
      </button>
      <button onClick={() => navigate('/viewQualification')}>
        View Qualifications
      </button>
      <br />
      <br />
      <button onClick={() => navigate('/addDoctor')}>Create Doctor</button>
      <button onClick={() => navigate('/viewDoctors')}>View Doctor</button>
      <br />
      <br />
      {/* <button onClick={() => navigate('/createSchedule')}>
        Create Schedule
      </button> */}
      <button onClick={() => navigate('/getSchedule')}>Get Schedule</button>
      <button onClick={() => navigate('/getAvailability')}>
        Get Availability
      </button>
    </div>
  );
};

export default DoctorPage;
