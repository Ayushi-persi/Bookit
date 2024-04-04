import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { URL } from '../../utils/constants';
import {
  Schedule,
  ScheduleApiResponse,
  PaginationData,
} from '../../utils/types';
import useAuthToken from '../../hooks/useAuthToken';
import '../../styles/addDoctor.css';

interface ScheduleDropdownProps {
  onSelectSchedule: (scheduleId: string) => void;
}

const ScheduleDropdown: React.FC<ScheduleDropdownProps> = ({
  onSelectSchedule,
}) => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
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

  const token = useAuthToken();

  useEffect(() => {
    fetchData(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async (page: number) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${URL}/doctors/8ddf07cf-50b5-48ce-aba0-7887b26208d5/schedules?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response);
      const data: ScheduleApiResponse = response.data;
      setSchedules((prevSchedules) => [...prevSchedules, ...data.schedules]);
      setPagination(data.pagination);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
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

  const handleScheduleSelect = (id: string) => {
    onSelectSchedule(id);
  };

  return (
    <div
      className="dr-form-container"
      style={{ maxHeight: '150px', overflowY: 'auto', cursor: 'pointer' }}
      onScroll={handleScroll}
      ref={scrollContainerRef}
    >
      {schedules.map((schedule) => (
        <div
          key={schedule.id}
          onClick={() => handleScheduleSelect(schedule.id)}
        >
          <span>
            {schedule.date} {schedule.id}
          </span>
        </div>
      ))}
      {loading && <p className="loading-indicator">Loading...</p>}
      {!loading && pagination.next && (
        <p className="load-more">Scroll to load more</p>
      )}
    </div>
  );
};

export default ScheduleDropdown;
