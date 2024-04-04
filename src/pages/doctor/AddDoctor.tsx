import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { URL } from '../../utils/constants';
import { ApiResponse, Qualification, PaginationData } from '../../utils/types';
import useAuthToken from '../../hooks/useAuthToken';
import '../../styles/addDoctor.css';

interface DoctorFormData {
  first_name: string;
  password: string;
  password_confirmation: string;
  last_name: string;
  email: string;
  contact_number: string;
  qualifications: string[];
}
const initialFormData = {
  first_name: '',
  password: '',
  password_confirmation: '',
  last_name: '',
  email: '',
  contact_number: '',
  qualifications: [],
};

const RegisterDoctorForm: React.FC = () => {
  const [formData, setFormData] = useState<DoctorFormData>(initialFormData);
  const [qualifications, setQualifications] = useState<Qualification[]>([]);
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    items: 0,
    count: 0,
    from: 0,
    last: 0,
    next: null,
    pages: 0,
    to: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchData(1);
  }, []);

  const fetchData = async (page: number) => {
    try {
      setLoading(true);
      const response = await axios.get(`${URL}/qualifications?page=${page}`);
      const data: ApiResponse = response.data;
      setQualifications((prevQualifications) => [
        ...prevQualifications,
        ...data.qualifications,
      ]);
      setPagination(data.pagination);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleQualificationChange = (id: string) => {
    const index = formData.qualifications.indexOf(id);
    if (index === -1) {
      setFormData((prevData) => ({
        ...prevData,
        qualifications: [...prevData.qualifications, id],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        qualifications: prevData.qualifications.filter((q) => q !== id),
      }));
    }
  };

  const handleScroll = () => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      const { scrollTop, clientHeight, scrollHeight } = scrollContainer;
      if (
        scrollTop + clientHeight >= scrollHeight &&
        !loading &&
        pagination.next
      ) {
        fetchData(pagination.next);
      }
    }
  };

  const token = useAuthToken();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(formData.qualifications);
      const response = await axios.post(
        `${URL}/doctor`,
        { doctor: formData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('Doctor registered successfully:', response.data);
      setFormData(initialFormData);
      response.data.status && alert('Success: Doctor added successfully');
    } catch (error) {
      const message = error?.response?.data?.message;
      if (error.response.status === 422) {
        alert(message);
      } else if (error.response.status === 403) {
        alert(message);
      } else {
        alert('Error registering doctor');
      }
    }
  };

  return (
    <div className="dr-form-container">
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Contact Number:
          <input
            type="tel"
            name="contact_number"
            value={formData.contact_number}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Qualifications:
          <div
            className="qualification-checkboxes"
            style={{ padding: '20px 0', maxHeight: '280px', overflowY: 'auto' }}
            onScroll={handleScroll}
            ref={scrollContainerRef}
          >
            {qualifications.map((qualification) => (
              <label
                key={qualification.id}
                style={{
                  display: 'flex',
                }}
              >
                <input
                  type="checkbox"
                  checked={formData.qualifications.includes(qualification.id)}
                  onChange={() => handleQualificationChange(qualification.id)}
                  style={{ width: '30px' }}
                />
                <span>
                  {qualification.degree} - {qualification.description}
                </span>
              </label>
            ))}
          </div>
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Confirm Password:
          <input
            type="password"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Register Doctor</button>
      </form>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default RegisterDoctorForm;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { URL } from '../../utils/constants';
// import { ApiResponse, Qualification, PaginationData } from '../../utils/types';
// import Pagination from '../../components/Pagination';
// import useAuthToken from '../../hooks/useAuthToken';
// import '../../styles/addDoctor.css';

// interface DoctorFormData {
//   first_name: string;
//   password: string;
//   password_confirmation: string;
//   last_name: string;
//   email: string;
//   contact_number: string;
//   qualifications: string[];
// }

// const RegisterDoctorForm: React.FC = () => {
//   const initialFormData: DoctorFormData = {
//     first_name: '',
//     password: '',
//     password_confirmation: '',
//     last_name: '',
//     email: '',
//     contact_number: '',
//     qualifications: [],
//   };

//   const [formData, setFormData] = useState<DoctorFormData>(initialFormData);
//   const [qualifications, setQualifications] = useState<Qualification[]>([]);
//   const [pagination, setPagination] = useState<PaginationData>({
//     page: 1,
//     items: 0,
//     count: 0,
//     from: 0,
//     last: 0,
//     next: null,
//     pages: 0,
//     to: 0,
//   });

//   useEffect(() => {
//     fetchData(1);
//   }, []);

//   const fetchData = async (page: number) => {
//     try {
//       const response = await axios.get(`${URL}/qualifications?page=${page}`);
//       const data: ApiResponse = response.data;
//       setQualifications(data.qualifications);
//       setPagination(data.pagination);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleQualificationsChange = (
//     e: React.ChangeEvent<HTMLSelectElement>,
//   ) => {
//     const selectedOptions = Array.from(
//       e.target.selectedOptions,
//       (option) => option.value,
//     );
//     setFormData((prevData) => ({
//       ...prevData,
//       qualifications: selectedOptions,
//     }));
//   };

//   const handlePageChange = (pageNumber: number) => {
//     fetchData(pageNumber);
//   };

//   const token = useAuthToken();

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       console.log(formData.qualifications);
//       const response = await axios.post(
//         `${URL}/doctor`,
//         { doctor: formData },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );
//       console.log('Doctor registered successfully:', response.data);
//       setFormData(initialFormData);
//       response.data.status && alert('Success: Doctor added successfully');
//     } catch (error) {
//       const message = error?.response?.data?.message;
//       if (error.response.status == 422) {
//         alert(message);
//       } else if (error.response.status == 403) {
//         alert(message);
//       } else {
//         alert('Error registering doctor');
//       }
//     }
//   };

//   return (
//     <div className="dr-form-container">
//       <form onSubmit={handleSubmit}>
//         <label>
//           First Name:
//           <input
//             type="text"
//             name="first_name"
//             value={formData.first_name}
//             onChange={handleInputChange}
//           />
//         </label>
//         <label>
//           Last Name:
//           <input
//             type="text"
//             name="last_name"
//             value={formData.last_name}
//             onChange={handleInputChange}
//           />
//         </label>
//         <label>
//           Email:
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//           />
//         </label>
//         <label>
//           Contact Number:
//           <input
//             type="tel"
//             name="contact_number"
//             value={formData.contact_number}
//             onChange={handleInputChange}
//           />
//         </label>
//         <label>
//           Qualifications:
//           <select
//             multiple
//             name="qualifications"
//             value={formData.qualifications}
//             onChange={handleQualificationsChange}
//           >
//             {qualifications.map((qualification) => (
//               <option key={qualification.id} value={qualification.id}>
//                 {qualification.degree} - {qualification.description}
//               </option>
//             ))}
//           </select>
//           <Pagination
//             onPageChange={handlePageChange}
//             currentPage={pagination.page}
//             totalPages={pagination.pages}
//           />
//         </label>
//         <label>
//           Password:
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleInputChange}
//           />
//         </label>
//         <label>
//           Confirm Password:
//           <input
//             type="password"
//             name="password_confirmation"
//             value={formData.password_confirmation}
//             onChange={handleInputChange}
//           />
//         </label>
//         <br />
//         <button type="submit">Register Doctor</button>
//       </form>
//     </div>
//   );
// };

// export default RegisterDoctorForm;
