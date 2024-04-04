import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ScheduleDropdown from './ScheduleDropdown';
import useAuthToken from '../../hooks/useAuthToken';
import { URL } from '../../utils/constants';

interface Availability {
  id: string;
  time: string;
  is_available: boolean;
}

const GetAvailability: React.FC = () => {
  const [selectedScheduleId, setSelectedScheduleId] = useState<string>('');
  const [availabilites, setAvailabilities] = useState<Availability[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const token = useAuthToken();

  const createAvailability = async () => {
    try {
      await axios.post(
        `${URL}/availabilities`,
        {
          availabilities: {
            time: ['04:00 pm'],
            schedule_id: '6377bc79-F1d0-4792-9278-Fb9ebf496bd4',
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      // response.data.status && alert('Success: Schedule created successfully');
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    createAvailability();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (selectedScheduleId) {
      console.log(selectedScheduleId);
      fetchAvailabilities(selectedScheduleId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedScheduleId]);

  const fetchAvailabilities = async (scheduleId: string) => {
    try {
      console.log(scheduleId);
      setLoading(true);
      const response = await axios.get(
        `${URL}/schedules/${scheduleId}/availabilities`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = response.data;
      console.log(data.schedule);
      setAvailabilities(data.schedule.availabilities);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching schedules:', error);
      setLoading(false);
    }
  };

  const renderSchedules = () => {
    console.log(availabilites);
    return availabilites.map((availability) => (
      <li
        key={availability.id}
        style={{ color: availability.is_available ? 'green' : 'red' }}
      >
        {availability.time} - {availability.id}
      </li>
    ));
  };

  return (
    <div>
      <h1>Get Availability</h1>
      <div>
        <label>Select Schedule</label>
        <ScheduleDropdown onSelectSchedule={setSelectedScheduleId} />
      </div>
      {/* {selectedDoctorId && <p>Selected Doctor ID: {selectedDoctorId}</p>} */}
      <div className="schedules-container">
        {loading ? <p>Loading...</p> : renderSchedules()}
      </div>
    </div>
  );
};

export default GetAvailability;
