import React from 'react';
import CartList from './CartList';
import Loader from '../Components/Loader/Loader';

const CartDetails = ({data,title,isPending,refetch}) => {
    return (
         <div>
            <h1 className="text-2xl text-center font-semibold mt-5">
              Cart Details
            </h1>{" "}
            <hr classNamep="h-1 bg-primary mb-3" />
            {data?.data[0] ? (
              <div className="overflow-x-auto flex justify-center items-center">
                {isPending ? (
                  <Loader display={``} />
                ) : (
                  <table className="table">
                    {/* head */}
                    <thead>
                      <tr>
                        <th className="text-center">Image</th>
                        <th className="text-center">Name</th>
                        <th className="text-center">Price</th>
                        <th className="text-center">Qty Color</th>
                        <th className="text-center">Total Price</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.data.map((cart) => (
                        <CartList
                          key={cart._id}
                          cart={cart}
                          refetch={refetch}
                        />
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            ) : (
              <Loader />
            )}
          </div>
    );
};

export default CartDetails;