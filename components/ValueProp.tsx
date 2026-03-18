
import React from 'react';
import { VALUE_PROPS } from '../constants';

const ValueProp: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 border-b border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        {VALUE_PROPS.map((prop) => (
          <div key={prop.id} className="flex flex-col items-center md:items-start gap-4">
            <div className="p-4 rounded-2xl bg-[#E1E8E0]">
              {prop.icon}
            </div>
            <h3 className="text-xl font-bold">{prop.title}</h3>
            <p className="text-gray-500 leading-relaxed text-sm">
              {prop.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ValueProp;
