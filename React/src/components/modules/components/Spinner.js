import React from 'react';

export default () => {
  return (
    <div>
      <img
        src={"/static/spinner.gif"}
        style={{ width: '200px', margin: 'auto', display: 'block' }}
        alt="Loading..."
      />
    </div>
  );
};