import React from 'react';

interface StatisticsProps {
  value: number;
  title: string;
}

const Statistics: React.FC<StatisticsProps> = ({ value, title }) => {
  return (
    <div className='rounded-[20px] bg-grayDark text-white p-4  justify-between h-full  '>
      <h3 className='font-semibold text-[46px] leading-[1.1]'>
        {value}
      </h3>
      <p className='text-[20px] font-medium'>
        {title}
      </p>
    </div>
  );
};

export default Statistics;