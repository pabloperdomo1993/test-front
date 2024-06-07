"use client";
import { useState, useEffect } from 'react';
import Table from './components/table';
import { getData } from './services/api';
import { transformString } from './utils/utils';

interface Country {
  countryCode: string;
  countryName: string;
}

interface State {
  stateCode: string;
  stateName: string;
}

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    organizationName: '',
    country: '',
    state: ''
  });
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [searchs, setSearchs] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getData('/search/reference');

      const dataCountry: Country[] = data.input.countries;
      setCountries(dataCountry);

      const dataState: State[] = data.input.states;
      setStates(dataState);

    } catch (error) {
      console.error(error);
    }
  };
  
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {

    setSearchs([]);

    try {
      if (formData.organizationName.length > 0) {
        const name = transformString(formData.organizationName);
        const param = `?organizationName=${name}`;
  
        const data = await getData('/search/clinics' + param + '&type=EE');
        setSearchs(data.input);
      }
  
      if (formData.name.length > 0) {
        const name = transformString(formData.name);
        const param = `?firstName=${name}`;
  
        const data = await getData('/search/doctors' + param + '&type=EE');
        setSearchs(data.input);
      }
      
    } catch (error) {
      console.error(error);
    }
  };

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
        </div>

        <div className="mb-4">
          <label htmlFor="organizationName" className="block text-gray-700 font-bold mb-2">Organization Name</label>
          <input
            type="text"
            id="organizationName"
            name="organizationName"
            value={formData.organizationName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
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
            {countries.map((option) => (
              <option key={option.countryCode} value={option.countryCode}>
                {option.countryName}
              </option>
            ))}
          </select>
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
            {states.map((option) => (
              <option key={option.stateCode} value={option.stateCode}>
                {option.stateName}
              </option>
            ))}
          </select>
        </div>
        <button type="button" onClick={handleSubmit} className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">Search</button>
      </form>

      {searchs.length > 0 && (
         <Table data={searchs} />
      )}
    </main>
  );
}
