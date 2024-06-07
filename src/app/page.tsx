"use client";
import { useState, useEffect } from 'react';

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
    const fetchData = async () => {
      try {
        const response = await fetch('https://i6azlcvda7.execute-api.us-east-2.amazonaws.com/search/reference');
        const data = await response.json();

        const dataCountry: Country[] = data.input.countries;
        setCountries(dataCountry);

        const dataState: State[] = data.input.states;
        setStates(dataState);

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const transformString = (input: string): string => {
    let result = input.replace(/ /g, '_');

    result = result.replace(/&/g, '20join20');

    return result;
  }

  const handleSubmit = async (e: any) => {
    const URL_BASE = 'https://i6azlcvda7.execute-api.us-east-2.amazonaws.com';

    setSearchs([]);

    try {
      if (formData.organizationName.length > 0) {
        const name = transformString(formData.organizationName);
        const param = `?organizationName=${name}`;

        const response = await fetch(URL_BASE + '/search/clinics' + param + '&type=EE');
        const data = await response.json();

        setSearchs(data.input);
      }

      if (formData.name.length > 0) {
        const name = transformString(formData.name);
        const param = `?firstName=${name}`;

        const response = await fetch(URL_BASE + '/search/doctors' + param + '&type=EE');
        const data = await response.json();

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
          <label htmlFor="organizationName" className="block text-gray-700 font-bold mb-2">Organization Name</label>
          <input
            type="text"
            id="organizationName"
            name="organizationName"
            value={formData.organizationName}
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
            {countries.map((option) => (
              <option key={option.countryCode} value={option.countryCode}>
                {option.countryName}
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
            {states.map((option) => (
              <option key={option.stateCode} value={option.stateCode}>
                {option.stateName}
              </option>
            ))}
          </select>
          {/* {errors.option && <p className="text-red-500 text-xs mt-1">{errors.option}</p>} */}
        </div>
        <button type="button" onClick={handleSubmit} className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">Search</button>
      </form>

      {searchs.length > 0 && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Searchs</h1>

          <div className="overflow-y-auto max-h-80 max-w-[95%] mx-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Number
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Taxonomy
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    City
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {searchs.map((item) => (
                  <tr key={item.number}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.city}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.taxonomyDesc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  );
}
