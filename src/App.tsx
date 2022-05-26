import React, { useState, useEffect } from 'react';
import { Table } from './Table';
import { Response } from '../interfaces/api-response';

function App() {
  const [data, setData] = useState<Response>([]);

  useEffect(() => {
    fetch('/api/data')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  return (
    <div className="flex items-center justify-center">
      <Table data={data}></Table>
    </div>
  );
}

export default App;
