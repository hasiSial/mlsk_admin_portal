import React from 'react';
interface Props {
  children: React.ReactNode;
}

const Modalfooter = ({ children }: Props) => {
  return <div className="flex items-center justify-end py-4 bg-transparent border-t border-baseStroke rounded-b-2xl">{children}</div>;
};

export default Modalfooter;
