import React from 'react';

const Spinner = () => {
  return (
    <div className="flex justify-center p-4">
      <div
        className="w-12 h-12 border-4 border-t-4 border-primary border-solid rounded-full animate-spin"
        style={{
          borderColor: 'rgba(0,0,0,0.1)',
          borderTopColor: '#ab202b',
        }}
      ></div>
    </div>
  );
};

export default Spinner;
