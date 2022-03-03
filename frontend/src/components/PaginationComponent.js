import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Pagination } from 'react-bootstrap';
const PaginationComponent = ({ activePage, setPage, userId, fetchFrom }) => {
  const [availablePages, setAvailablePages] = useState(0);
  useEffect(() => {
    const allTArgets = async () => {
      const { data } = await axios.get(
        `api/${fetchFrom}/count/${userId}?accomplished=false`
      );

      if (data > process.env.REACT_APP_DOCUMENTS_PER_PAGE)
        setAvailablePages(
          Math.ceil((data * 1) / process.env.REACT_APP_DOCUMENTS_PER_PAGE)
        );
       
    };
    allTArgets();
  }, []);
  let active = activePage;
  let items = [];
  for (let number = 1; number <= availablePages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => setPage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }
  return (
    <div className="d-flex justify-content-center">
      <Pagination>{items}</Pagination>,
    </div>
  );
};

export default PaginationComponent;
