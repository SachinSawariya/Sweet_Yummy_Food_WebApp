import React from 'react'
// import trash from '../trashImg.svg'
import Delete from '@material-ui/icons/Delete'

import { useCart, useDispatchCart } from '../components/ContextReducer'
export default function Cart() {

    let data = useCart();
    let dispatch = useDispatchCart();
    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3'> The cart is Empty!</div>
            </div>
        )
    }


    const handleCheckOut = async () => {
        let userEmail = localStorage.getItem("userEmail");
        if (userEmail) { // Check if userEmail is not null or empty
            try {
                const response = await fetch("http://localhost:5000/api/orderData", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        order_data: data,
                        email: userEmail,
                        order_date: new Date().toDateString()
                    })
                });

                if (response.status === 200) {
                    dispatch({ type: "DROP" });
                }
            } catch (error) {
                console.error(error);
            }
        }
        else {
            console.error("User email is missing or empty.");
        }

        alert("Your Order is Placed Now.")
    }

    let totalPrice = data.reduce((total, food) => total + food.price, 0)


    return (
        <div style={{maxHeight:'600px', overflow: 'auto'}}>
            <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
                <table className='table table-hover'>
                    <thead className='text-success fs-4'>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Quantity</th>
                            <th scope='col'>Option</th>
                            <th scope='col'>Amount</th>
                            <th scope='col'>X</th>
                        </tr>
                    </thead>
                    <tbody className='text-white'>

                        {data.map((food, index) => (
                            <tr key={index}>
                                <th scope='row'>{index + 1}</th>
                                <td>{food.name}</td>
                                <td>{food.qty}</td>
                                <td>{food.size}</td>
                                <td>{food.price}</td>
                             <td ><button type="button" className="btn p-0"><Delete onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td></tr>

                                // <td>
                                //     <button type='btn' className='btn d-flex' onClick={() => { dispatch({ type: "REMOVE", index: index }) }}>
                                //        <span>delete</span> <img src={trash} alt='delete' />
                                //     </button>
                                // </td>
                            // </tr>
                        ))}
                    </tbody>
                </table>
                <div className='fs-2'>Total Price : {totalPrice}</div>
                <div>
                    <button className='btn bg-success mt-5' onClick={handleCheckOut}>Check out</button>
                </div>

            </div>
        </div>
    )

}