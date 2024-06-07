import React from 'react';

interface TableProps {
  data: Array<{ number: string, name: string, city: string, taxonomyDesc: string }>;
}

const Table: React.FC<TableProps> = ({ data }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Searchs</h1>

          <div className="overflow-y-auto max-h-100 max-w-[100%]">
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
                {data.map((item) => (
                  <tr key={item.number}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.number}
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
  );
};

export default Table;
