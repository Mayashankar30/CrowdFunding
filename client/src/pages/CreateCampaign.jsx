



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { useStateContext } from '../context';
import { Loader, CustomButton, FormField } from '../component';
import { checkIfImage } from '../utils';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } = useStateContext();

  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: ''
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true);
        await createCampaign({
          ...form,
          target: ethers.utils.parseUnits(form.target, 18),
        });
        setIsLoading(false);
        navigate('/');
      } else {
        alert('Please enter a valid image URL');
        setForm({ ...form, image: '' });
      }
    });
  };

  return (
    <div className="min-h-screen w-full  px-6 py-16 flex justify-center items-start font-sans">
      {isLoading && <Loader />}

      <div className="w-full max-w-3xl bg-[#1e1f25] rounded-xl shadow-2xl px-8 sm:px-10 py-10 space-y-10 border border-[#2a2b31]">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">🚀 Launch a Campaign</h1>
          <p className="text-gray-400 mt-2 font-medium">Tell your story, set your goal, and inspire backers.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8 text-white">
          {/* Name and Title */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField
              label="Your Name"
              placeholder="Himanshu / Maya"
              type="text"
              value={form.name}
              onChange={(e) => handleFormFieldChange('name', e)}
            />
            <FormField
              label="Campaign Title"
              placeholder="It starts from here!"
              type="text"
              value={form.title}
              onChange={(e) => handleFormFieldChange('title', e)}
            />
          </div>

          {/* Description */}
          <FormField
            label="Campaign Story"
            placeholder="Write your campaign description..."
            isMultiline
            value={form.description}
            onChange={(e) => handleFormFieldChange('description', e)}
          />

          {/* Target and Deadline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormField
              label="Target (ETH)"
              placeholder="0.5"
              type="text"
              value={form.target}
              onChange={(e) => handleFormFieldChange('target', e)}
            />
            <FormField
              label="Deadline"
              placeholder="Select date"
              type="date"
              value={form.deadline}
              onChange={(e) => handleFormFieldChange('deadline', e)}
            />
          </div>

          {/* Image URL */}
          <FormField
            label="Campaign Image URL"
            placeholder="https://image-link.png"
            type="url"
            value={form.image}
            onChange={(e) => handleFormFieldChange('image', e)}
          />

          {/* Submit Button */}
          <div className="pt-4 flex justify-center">
            <CustomButton
              btnType="submit"
              title="Create Campaign"
              styles="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:brightness-110 text-white font-bold py-3 px-10 rounded-lg transition duration-300 shadow-lg"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCampaign;