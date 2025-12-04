import React from 'react'

export default function Crop({children, className}: {children: React.ReactNode, className?: string}) {
  return (
    <div className={`${className} mt-[20vh] p-4 lg:p-8 max-w-7xl mx-auto`}>
      {children}
    </div>
  );
}
