import React from 'react';
import image from "../../../assets/cat-2.jpg"

const RecentOrders = () => {
    return (
       

<div class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
    <table class="w-full text-sm text-left rtl:text-right text-body">
        <thead class="text-sm text-body  bg-primary text-white border-b rounded-base border-default">
            <tr>
               
                <th scope="col" class="px-6 py-3 font-medium">
                    Product name
                </th>
                <th scope="col" class="px-6 py-3 font-medium">
                    
                </th>
                <th scope="col" class="px-6 py-3 font-medium">
                    Category
                </th>
                <th scope="col" class="px-6 py-3 font-medium">
                    Price
                </th>
                <th scope="col" class="px-6 py-3 font-medium">
                    Status
                </th>
            </tr>
        </thead>
        <tbody className='mt-5'>
            <tr class="bg-neutral-primary border-b border-default">
                <td scope="row" class="px-6 py-4 font-medium text-heading whitespace-nowrap">
                    <div className='flex  items-center'>
                      <img src={image}  alt="image" className='w-10 h-10'/>
                      <h1>Khallad Dous</h1>
                    </div>
                </td>
               <td class="px-6 py-4">
                    
                </td>
                <td class="px-6 py-4">
                    Laptop
                </td>
              
                <td class="px-6 py-4">
                    231
                </td>
                <td class="px-6 py-4">
                    231
                </td>
              
            </tr>
           
           
        </tbody>
    </table>
</div>

    );
};

export default RecentOrders;