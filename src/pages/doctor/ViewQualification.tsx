import React, { useState, useEffect } from 'react';
import { URL } from '../../utils/constants';
import { ApiResponse, Qualification, PaginationData } from '../../utils/types';
import Pagination from '../../components/Pagination';
import axios from 'axios';

const App: React.FC = () => {
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

  useEffect(() => {
    fetchData(1);
  }, []);

  const fetchData = async (page: number) => {
    try {
      const response = await axios.get(`${URL}/qualifications?page=${page}`);
      const data: ApiResponse = response.data;
      setQualifications(data.qualifications);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    fetchData(pageNumber);
  };

  return (
    <div className="App">
      <h1>Qualifications</h1>
      <table>
        <thead>
          <tr>
            <th>Degree</th>
            <th>Description</th>
          </tr>
        </thead>
        {qualifications.map((qual) => (
          <tr key={qual.id}>
            <td> {qual.degree}</td>
            <td>{qual.description}</td>
          </tr>
        ))}
      </table>
      <Pagination
        onPageChange={handlePageChange}
        currentPage={pagination.page}
        totalPages={pagination.pages}
      />
    </div>
  );
};

export default App;
