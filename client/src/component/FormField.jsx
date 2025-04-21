import React from 'react';

const FormField = ({
  label,
  placeholder,
  type = 'text',
  isMultiline = false,
  value,
  onChange,
}) => {
  const commonStyles =
    'px-4 py-3 bg-transparent border border-[#444] text-white text-sm placeholder-[#4b5264] rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500';

  return (
    <div className="flex flex-col w-full mb-6">
      {label && (
        <div className="mb-3">
          <span className="text-[#808191] text-sm">{label}</span>
        </div>
      )}

      {isMultiline ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={10}
          className={`${commonStyles} resize-none`}
          required
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          step="0.1"
          className={commonStyles}
          required
        />
      )}
    </div>
  );
};

export default FormField;
