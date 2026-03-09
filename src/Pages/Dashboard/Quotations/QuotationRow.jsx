import React from 'react';
import { Link } from 'react-router-dom';

const QuotationRow = ({quote,index}) => {
    return (
        <tr
                  key={quote.id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-medium text-gray-800">
                   {index +1}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {quote.email}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {quote.company}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {quote.vatNo}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {quote.phone}
                  </td>
                  <td className="px-6 py-4">
                    {quote.title}
                  </td>
                  <td className="px-6 py-4 text-center flex gap-3">
                    <Link to={`/dashboard/update-quotations/${quote._id}`}
                     
                      className="btn btn-xs btn-primary   transition text-sm"
                    >
                      view
                    </Link>

                    
                    <button className='btn btn-xs btn-error'>delete</button>
                  </td>
                </tr>
    );
};

export default QuotationRow;