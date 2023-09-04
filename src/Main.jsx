import React from 'react';
import Sidebar from './Sidebar';
import Display from './Display';

function Main(props) {

  const handleSearch = (query) => {
    console.log('Search query:', query);
  };

  return (
    <div className="App">
      <Sidebar/>
      <Display onSearch={handleSearch}/>
    </div>
  );
}

export default Main;

