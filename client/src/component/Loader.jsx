


import React from 'react';
import { loader } from '../assets';

const Loader = () => {
  return (
    <section className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-70">
      <div className="animate-spin w-20 h-20 mb-6">
        <img src={loader} alt="Loading..." className="w-full h-full object-contain" />
      </div>
      <div className="text-center">
        <h2 className="text-xl font-bold text-white mb-1">Loading in progress...</h2>
        <p className="text-white text-sm">Hang tight</p>
      </div>
    </section>
  );
};

export default Loader;

