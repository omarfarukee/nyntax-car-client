import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { IoIosSettings } from "react-icons/io";


const ChargesSummary = () => {
    const { addToast } = useToasts();
    const { data: allChargesSummary = [], refetch } = useQuery({
        queryKey: ['allChargesSummary'],
        queryFn: async () => {
            const res = await fetch(`https://nyntax-car-server.vercel.app/api/chargesSummary/Fetch`);
            const data = await res.json();
            return data;
        }
    });

    const handleDeleteRequest = async (id) => {
        try {
            const response = await fetch(`https://nyntax-car-server.vercel.app/api/charge/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json();
            console.log(result);
            if (result?.acknowledged === true ) {
                alert("Are you sure you want to delete?");
                addToast('deleted done', { appearance: 'success' });
                refetch();
            } else {
                addToast('Deletion failed', { appearance: 'error' });
            }

        } catch (error) {
            console.error('Error deleting request:', error);
            addToast('Failed to delete request', { appearance: 'error' });
        }
    };
    
    console.log(allChargesSummary?.data?.length)
    return (
        <div className="pt-20">
           { !allChargesSummary?.data &&<div className="flex justify-center mt-5">
                <h1 className="text-8xl animate-spin"><IoIosSettings />
                </h1>
            </div>}
            <div className="p-5">
                {
                    allChargesSummary?.data?.map(charge =>
                        <> <div className="flex justify-center">

                            <div className="w-8/12 border h-[510px] mb-3 p-3">
                                <div className="flex text-center">
                                    <h1 className="border w-60">Customer Email</h1>
                                    <h1 className="border w-52">Charges</h1>
                                    <h1 className="w-24 border">Unit</h1>
                                    <h1 className="border w-36">Rate</h1>
                                    <h1 className="w-40 border">Total</h1>
                                </div>
                                <div className="flex border-b-2">
                                    <h1 className="flex items-center justify-center border w-60 h-[127px]">{charge?.email}</h1>
                                    <div className="w-52">
                                        <h1 className="flex justify-center p-2 text-center border">Hourly</h1>
                                        <h1 className="flex justify-center p-2 text-center border">Daily</h1>
                                        <h1 className="flex justify-center p-2 text-center border">Weekly</h1>
                                        <h1 className="flex justify-center p-2 text-center border">{charge?.additionalCharges[0]?.name ? charge?.additionalCharges[0]?.name : "N/A"}</h1>
                                        <h1 className="flex justify-center p-2 text-center border">{charge?.additionalCharges[1]?.name ? charge?.additionalCharges[1]?.name : "N/A"}</h1>
                                        <h1 className="flex justify-center p-2 text-center border">{charge?.additionalCharges[2]?.name ? charge?.additionalCharges[2]?.name : "N/A"}</h1>
                                    </div>

                                    <div className="w-24">
                                        <h1 className="flex justify-center p-2 text-center border">{charge?.duration_hourly}</h1>
                                        <h1 className="flex justify-center p-2 text-center border">{charge?.duration_daily}</h1>
                                        <h1 className="flex justify-center p-2 text-center border">{charge?.duration_weekly}</h1>
                                        <h1 className="flex justify-center p-2 text-center border">-</h1>
                                        <h1 className="flex justify-center p-2 text-center border">-</h1>
                                        <h1 className="flex justify-center p-2 text-center border">-</h1>
                                    </div>
                                    <div className="w-36">
                                        <h1 className="flex justify-center p-2 text-center border">{charge?.hourly_rate}.00 $</h1>
                                        <h1 className="flex justify-center p-2 text-center border">{charge?.daily_rate}.00 $</h1>
                                        <h1 className="flex justify-center p-2 text-center border">{charge?.weekly_rate}.00 $</h1>
                                        <h1 className="flex justify-center p-2 text-center border">{charge?.additionalCharges[0]?.value ? `${charge?.additionalCharges[0]?.value === 11.5 ? `${charge?.additionalCharges[0]?.value} %`:`${charge?.additionalCharges[0]?.value} $`}` : "0.0 $"}</h1>
                                        <h1 className="flex justify-center p-2 text-center border">{charge?.additionalCharges[1]?.value ? `${charge?.additionalCharges[1]?.value === 11.5 ? `${charge?.additionalCharges[1]?.value} %`:`${charge?.additionalCharges[1]?.value} $`}` : "0.0 $"}</h1>
                                        <h1 className="flex justify-center p-2 text-center border">{charge?.additionalCharges[2]?.value ? `${charge?.additionalCharges[2]?.value === 11.5 ? `${charge?.additionalCharges[2]?.value} %`:`${charge?.additionalCharges[2]?.value} $`}` : "0.0 $"}</h1>
                                    </div>
                                    <div className="w-40">
                                        <h1 className="flex justify-center p-2 text-center border">{charge?.hourly_charged_total}.00 $</h1>
                                        <h1 className="flex justify-center p-2 text-center border">{charge?.daily_charged_total}.00 $</h1>
                                        <h1 className="flex justify-center p-2 text-center border">{charge?.weekly_charged_total}.00 $</h1>
                                        <div className="border h-[140px]">
                                        <h1 className="flex justify-center text-center">{charge?.additionalCharges[0]?.value ? `${charge?.additionalCharges[0]?.value === 11.5 ? `${charge?.additionalCharges[0]?.value} %`:`${charge?.additionalCharges[0]?.value} $`}` : "0.0 $"}</h1>
                                        <h1 className="flex justify-center text-center ">{charge?.additionalCharges[1]?.value ? `${charge?.additionalCharges[1]?.value === 11.5 ? `${charge?.additionalCharges[1]?.value} %`:`${charge?.additionalCharges[1]?.value} $`}` : "0.0 $"}</h1>
                                        <h1 className="flex justify-center text-center">{charge?.additionalCharges[2]?.value ? `${charge?.additionalCharges[2]?.value === 11.5 ? `${charge?.additionalCharges[2]?.value} %`:`${charge?.additionalCharges[2]?.value} $`}` : "0.0 $"}</h1>
                                        <h1 className="flex justify-center text-center">discount: {charge?.discount} $</h1>
                                            <small className="flex justify-center text-center ">Rental tax amount</small>
                                            <h1 className="flex justify-center text-center">{charge?.tax}$</h1>
                                            
                                        </div>       
                                    </div>
                                </div>
                                <div className="flex justify-between p-5 mt-5 font-bold border">
                                    <h1 className="">Grand Total: </h1>
                                    <h1 className="">{charge?.grandTotal} $</h1>
                                </div>
                                <div className="mt-5">
                                  <NavLink to={`/recit/${encodeURIComponent(charge?._id)}`}><button className="w-40 p-2 bg-blue-300 border rounded">See Receipt</button></NavLink>  
                                </div>
                                <div className="mt-2">
                                    <button onClick={() => handleDeleteRequest(charge?._id)} className="w-40 p-2 bg-red-300 border rounded">Delete</button>
                                </div>
                            </div>
                        </div>
                        </>)
                }
            </div>
            
        </div>
    );
};

export default ChargesSummary;