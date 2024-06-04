"use client";
import Image from "next/image";
import styles from './page';
import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    country: '',
    state: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let tempErrors: any = {};
    if (!formData.name) tempErrors.name = 'Name is required';
    // if (!formData.email) {
    //   tempErrors.email = 'Email is required';
    // } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    //   tempErrors.email = 'Email is invalid';
    // }
    // if (!formData.message) tempErrors.message = 'Message is required';
    return tempErrors;
  };

  const handleSubmit = (e: any) => {
    // e.preventDefault();
    console.log('----', formData)
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      console.log('Form Data:', formData);
      // Aquí puedes enviar los datos a tu backend o API
      setFormData({
        name: '',
        lastName: '',
        country: '',
        state: ''
      });
    } else {
      setErrors(validationErrors);
    }
  };

  const options = [
    { name: 'Juan', id: 1 },
    { name: 'Maria', id: 2 },
    { name: 'Pedro', id: 3 }
  ];


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form className="max-w-lg mx-auto p-6 border border-gray-300 rounded-md bg-white">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
        {/* {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>} */}
      </div>
      <div className="mb-4">
        <label htmlFor="lastName" className="block text-gray-700 font-bold mb-2">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
        {/* {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>} */}
      </div>

      <div className="mb-4">
        <label htmlFor="country" className="block text-gray-700 font-bold mb-2">Country</label>
        <select
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="" disabled>Select a country</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
        {/* {errors.option && <p className="text-red-500 text-xs mt-1">{errors.option}</p>} */}
      </div>

      <div className="mb-4">
        <label htmlFor="state" className="block text-gray-700 font-bold mb-2">State</label>
        <select
          id="state"
          name="state"
          value={formData.state}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="" disabled>Select a state</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
        {/* {errors.option && <p className="text-red-500 text-xs mt-1">{errors.option}</p>} */}
      </div>
      <button type="button" onClick={handleSubmit} className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">Search</button>
    </form>

    </main>
  );
}
