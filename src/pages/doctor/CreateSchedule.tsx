// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { URL } from '../../utils/constants';
// import useAuthToken from '../../hooks/useAuthToken';

// interface Doctor {
//   id: string;
//   first_name: string;
//   last_name: string;
// }

// interface Day {
//   day: string;
//   time: string[];
// }

// interface ScheduleFormData {
//   doctor: string;
//   days: Day[];
// }

// const SchedulePage: React.FC = () => {
//   const token = useAuthToken();
//   const [doctors, setDoctors] = useState<Doctor[]>([]);
//   const [selectedDoctor, setSelectedDoctor] = useState<string>('');
//   const [selectedDay, setSelectedDay] = useState<string>('');
//   const [slotDuration, setSlotDuration] = useState<number>(15);
//   const [startTime, setStartTime] = useState<string>('');
//   const [endTime, setEndTime] = useState<string>('');
//   const [schedule] = useState<ScheduleFormData>({
//     doctor: '',
//     days: [
//       { day: 'Sunday', time: [] },
//       { day: 'Monday', time: [] },
//       { day: 'Tuesday', time: [] },
//       { day: 'Wednesday', time: [] },
//       { day: 'Thursday', time: [] },
//       { day: 'Friday', time: [] },
//       { day: 'Saturday', time: [] },
//     ],
//   });

//   useEffect(() => {
//     fetchDoctors();
//   }, []);

//   const fetchDoctors = async () => {
//     try {
//       const response = await axios.get(`${URL}/doctors`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const data = response.data;
//       setDoctors(data.doctors);
//     } catch (error) {
//       console.error('Error fetching doctors:', error);
//     }
//   };

//   const handleDoctorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedDoctor(e.target.value);
//   };

//   const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedDay(e.target.value);
//   };

//   const handleSlotDurationChange = (duration: number) => {
//     setSlotDuration(duration);
//   };

//   const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setStartTime(e.target.value);
//   };

//   const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setEndTime(e.target.value);
//   };

//   const generateTimeSlots = () => {
//     const slots = [];
//     let currentTime = startTime;

//     while (currentTime <= endTime) {
//       console.log(currentTime);
//       slots.push(currentTime);
//       const [hours, minutes] = currentTime.split(':').map(Number);
//       currentTime = new Date(
//         0,
//         0,
//         0,
//         hours,
//         minutes + slotDuration,
//       ).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
//     }
//     console.log(slots);
//     return slots;
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const dayIndex = schedule.days.findIndex(
//       (day) => day.day.toLowerCase() === selectedDay.toLowerCase(),
//     );
//     if (dayIndex === -1) {
//       console.error('Invalid day selected');
//       return;
//     }

//     const timeSlots = generateTimeSlots();
//     const updatedSchedule = { ...schedule };
//     updatedSchedule.days[dayIndex].time = timeSlots;
//     console.log(updatedSchedule);
//     try {
//       const response = await axios.post(
//         `${URL}/schedules`,
//         { schedule: updatedSchedule },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );
//       console.log('Schedule saved:', response.data);
//     } catch (error) {
//       console.error('Error saving schedule:', error);
//     }
//   };

//   return (
//     <div className="schedule-page">
//       <h2>Schedule Page</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Select Doctor:
//           <select value={selectedDoctor} onChange={handleDoctorChange}>
//             <option value="">Select Doctor</option>
//             {doctors.map((doctor) => (
//               <option key={doctor.id} value={doctor.id}>
//                 {doctor.first_name} {doctor.last_name}
//               </option>
//             ))}
//           </select>
//         </label>
//         <br />
//         <br />
//         <label>
//           Select Day:
//           <select value={selectedDay} onChange={handleDayChange}>
//             <option value="">Select Day</option>
//             {schedule.days.map((day) => (
//               <option key={day.day} value={day.day}>
//                 {day.day}
//               </option>
//             ))}
//           </select>
//         </label>
//         <label>
//           Slot Duration:
//           <select
//             onChange={(e) => handleSlotDurationChange(parseInt(e.target.value))}
//           >
//             <option value="15">15 min</option>
//             <option value="30">30 min</option>
//             <option value="45">45 min</option>
//             <option value="60">60 min</option>
//           </select>
//         </label>
//         <label>
//           Start Time:
//           <input
//             type="time"
//             value={startTime}
//             onChange={handleStartTimeChange}
//           />
//         </label>
//         <label>
//           End Time:
//           <input type="time" value={endTime} onChange={handleEndTimeChange} />
//         </label>
//         <button type="submit">Save Schedule</button>
//       </form>
//     </div>
//   );
// };

// export default SchedulePage;

// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import { URL } from '../../utils/constants';
// // import useAuthToken from '../../hooks/useAuthToken';

// // interface Doctor {
// //   id: string;
// //   first_name: string;
// //   last_name: string;
// // }

// // interface Day {
// //   day: string;
// //   time: string[];
// // }

// // interface ScheduleFormData {
// //   doctor: string;
// //   days: Day[];
// // }

// // const SchedulePage: React.FC = () => {
// //   const token = useAuthToken();
// //   const [doctors, setDoctors] = useState<Doctor[]>([]);
// //   const [selectedDoctor, setSelectedDoctor] = useState<string>('');
// //   const [schedule, setSchedule] = useState<ScheduleFormData>({
// //     doctor: '',
// //     days: [
// //       { day: 'Sunday', time: [] },
// //       { day: 'Monday', time: [] },
// //       { day: 'Tuesday', time: [] },
// //       { day: 'Wednesday', time: [] },
// //       { day: 'Thursday', time: [] },
// //       { day: 'Friday', time: [] },
// //       { day: 'Saturday', time: [] },
// //     ],
// //   });

// //   useEffect(() => {
// //     fetchDoctors();
// //   }, []);

// //   const fetchDoctors = async () => {
// //     try {
// //       const response = await axios.get(`${URL}/doctors`, {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });
// //       const data = response.data;
// //       setDoctors(data.doctors);
// //     } catch (error) {
// //       console.error('Error fetching doctors:', error);
// //     }
// //   };

// //   const handleDoctorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
// //     setSelectedDoctor(e.target.value);
// //   };

// //   const handleDayTimeChange = (
// //     dayIndex: number,
// //     timeIndex: number,
// //     e: React.ChangeEvent<HTMLInputElement>,
// //   ) => {
// //     const updatedSchedule = { ...schedule };
// //     updatedSchedule.days[dayIndex].time[timeIndex] = e.target.value;
// //     setSchedule(updatedSchedule);
// //   };

// //   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
// //     e.preventDefault();
// //     try {
// //       const response = await axios.post(
// //         `${URL}/schedules`,
// //         { schedule },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         },
// //       );
// //       console.log('Schedule saved:', response.data);
// //       // Add any further handling or redirection logic upon successful submission
// //     } catch (error) {
// //       console.error('Error saving schedule:', error);
// //     }
// //   };

// //   return (
// //     <div className="schedule-page">
// //       <h2>Schedule Page</h2>
// //       <form onSubmit={handleSubmit}>
// //         <label>
// //           Select Doctor:
// //           <select value={selectedDoctor} onChange={handleDoctorChange}>
// //             <option value="">Select Doctor</option>
// //             {doctors.map((doctor) => (
// //               <option key={doctor.id} value={doctor.id}>
// //                 {doctor.first_name} {doctor.last_name}
// //               </option>
// //             ))}
// //           </select>
// //         </label>
// //         <div className="days-time-container">
// //           {schedule.days.map((day, dayIndex) => (
// //             <div key={dayIndex} className="day-time">
// //               <h3>{day.day}</h3>
// //               {day.time.map((time, timeIndex) => (
// //                 <label key={timeIndex}>
// //                   <input
// //                     type="text"
// //                     value={time}
// //                     onChange={(e) =>
// //                       handleDayTimeChange(dayIndex, timeIndex, e)
// //                     }
// //                   />
// //                 </label>
// //               ))}
// //             </div>
// //           ))}
// //         </div>
// //         <button type="submit">Save Schedule</button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default SchedulePage;
