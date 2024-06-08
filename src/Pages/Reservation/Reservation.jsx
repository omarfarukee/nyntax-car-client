import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";

const Reservation = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [additionalCharges, setAdditionalCharges] = useState([]);
    const { addToast } = useToasts();
    const handleCheckboxChange = (e) => {
        const { name, value, checked } = e.target;
        const parsedValue = parseFloat(value); // Ensure value is a number
        if (checked) {
            setAdditionalCharges([...additionalCharges, { name, value: parsedValue }]);
        } else {
            setAdditionalCharges(additionalCharges.filter(charge => charge.name !== name));
        }
    };
    const handleCreateChargesSummary = async (data) => {
        const fromData = {
            reservation_id: data.reservation_id,
            pick_date: data.pick_date,
            return_date: data.return_date,
            duration_weekly: parseInt(data.duration_weekly),
            duration_daily: parseInt(data.duration_daily),
            duration_hourly: parseInt(data.duration_hourly),
            discount: parseInt(data.discount),

            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            phone: data.phone,

            vehicle_id: data.vehicle_id,
            vehicle_type: data.vehicle_type,
            vehicle: data.vehicle,
            vehicle_model: data.vehicle_model,
            hourly_rate: parseInt(data.hourly_rate),
            weekly_rate: parseInt(data.weekly_rate),
            daily_rate: parseInt(data.daily_rate),
            additionalCharges
        }
        console.log(fromData)
        try {
            const response = await fetch('https://nyntax-car-server.vercel.app/api/create-chargeSummary', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(fromData)
            });

            const responseData = await response.json();
            console.log(responseData.user)
            if (responseData.success === true) {

                addToast('Charges Summary created succesfully', { appearance: 'success' })
                // reset();
            } else {
                addToast(`${responseData.message}`, { appearance: 'error' })

            }
        } catch (error) {
            console.error('Error creating', error);
        }
    }

    const { data: allCars = [] } = useQuery({
        queryKey: ['allCars'],
        queryFn: async () => {
            const res = await fetch(`https://exam-server-7c41747804bf.herokuapp.com/carsList`);
            const data = await res.json();
            return data;
        }
    });
    // console.log(allCars?.data?.map(data => data))
    return (
        <div className="pt-20">
            <div className="p-5">
                <form onSubmit={handleSubmit(handleCreateChargesSummary)} className="p-5 border">
                    <div className="flex justify-between gap-3">
                        <div>
                            <h1 className="text-2xl">Reservation Details</h1>
                            <div className="p-3 border w-96 h-[610px]">
                                <div className="mb-3">
                                    <label htmlFor="">Reservation ID</label>
                                    <input type="text" {...register("reservation_id", {
                                        required: "required",
                                    })} placeholder="Reservation ID" className="w-full h-12 pl-3 border" />
                                    {errors.reservation_id && <small className='text-red-500'>{errors.reservation_id?.message}</small>}
                                </div>
                                <div className="mb-3">
                                    <label className="label"> <span className="label-text">Pickup Date</span></label>
                                    <input type="date" {...register("pick_date", {
                                        required: "required",
                                    })} className="w-full h-12 pl-3 border" />
                                    {errors.pick_date && <small className='text-red-500'>{errors.pick_date?.message}</small>}
                                </div>
                                <div>
                                    <label className="label"> <span className="label-text">Return Date</span></label>
                                    <input type="date" {...register("return_date", {
                                        required: "required",
                                    })} className="w-full h-12 pl-3 border" />
                                    {errors.return_date && <small className='text-red-500'>{errors.return_date?.message}</small>}
                                </div>
                                <label htmlFor="" className="flex justify-center mt-3 text-lg border-b-2">Duration</label>
                                <div className="flex justify-between">
                                    <div>
                                        <label htmlFor="">Weekly</label>
                                        <input type="number" {...register("duration_weekly", {
                                        })} placeholder="week" defaultValue={0} className="h-12 pl-3 border w-28" />
                                    </div>

                                    <div>
                                        <label htmlFor="">Daily</label>
                                        <input type="number" {...register("duration_daily", {
                                        })} placeholder="Day" defaultValue={0} className="h-12 pl-3 border w-28" />
                                    </div>
                                    <div>
                                        <label htmlFor="">hourly</label>
                                        <input type="number" {...register("duration_hourly", {
                                        })} placeholder="Hour" defaultValue={0} className="h-12 pl-3 ml-3 border w-28" />
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <label htmlFor="" >Discount</label>
                                    <input type="text" {...register("discount", {
                                    })} placeholder="discount" defaultValue={0} className="w-full h-12 pl-3 mb-3 border" />
                                </div>



                            </div>
                        </div>

                        <div>
                            <h1 className="text-2xl">Customer Information</h1>
                            <div className="p-3 border w-96">
                                <div className="mb-3">
                                    <label htmlFor="">First Name</label>
                                    <input type="text" {...register("first_name", {
                                        required: "required",
                                    })} placeholder="First Name" className="w-full h-12 pl-3 border" />
                                    {errors.first_name && <small className='text-red-500'>{errors.first_name?.message}</small>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="">Last Name</label>
                                    <input type="text" {...register("last_name", {
                                        required: "required",
                                    })} placeholder="Last Name" className="w-full h-12 pl-3 border" />
                                    {errors.last_name && <small className='text-red-500'>{errors.last_name?.message}</small>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="">Email</label>
                                    <input type="email" {...register("email", {
                                        required: "required",
                                    })} placeholder="email" className="w-full h-12 pl-3 border" />
                                    {errors.email && <small className='text-red-500'>{errors.email?.message}</small>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="">Phone</label>
                                    <input type="text" {...register("phone", {
                                        required: "required",
                                    })} placeholder="phone" className="w-full h-12 pl-3 border" />
                                    {errors.email && <small className='text-red-500'>{errors.email?.message}</small>}
                                </div>

                            </div>
                            <div>
                                <h1 className="mt-2 text-2xl">Additional Charges</h1>
                                <div className="p-3 mt-1 border h-28 w-96">
                                    <div>
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="Collision Damage Waiver"
                                                value="9"
                                                onChange={handleCheckboxChange}
                                            />
                                            Collision Damage Waiver - $9.00
                                        </label>
                                    </div>
                                    <div>
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="Liability Insurance"
                                                value="15"
                                                onChange={handleCheckboxChange}
                                            />
                                            Liability Insurance - $15.00
                                        </label>
                                    </div>
                                    <div>
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="Rental Tax"
                                                value="11.5"
                                                onChange={handleCheckboxChange}
                                            />
                                            Rental Tax - 11.5%
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-2xl">Vehicle Information</h1>

                            <div className="p-3 border w-96 h-[610px]">
                                <div className="mb-2">
                                    <label htmlFor="">Vehicle ID</label>
                                    <select className="w-full h-12 border" {...register("vehicle_id", {
                                        required: "required",
                                    })}>
                                        {allCars?.data?.map(car => <><option value={car?.id}>{car?.id}</option></>)}
                                    </select>
                                    {errors.vehicle_id && <small className='text-red-500'>{errors.vehicle_id?.message}</small>}
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="">Vehicle Type</label>
                                    <select className="w-full h-12 border" {...register("vehicle_type", {
                                        required: "required",
                                    })}>
                                        {allCars?.data?.map(car => <><option value={car?.type}>{car?.type}</option></>)}
                                    </select>
                                    {errors.vehicle_Type && <small className='text-red-500'>{errors.vehicle_Type?.message}</small>}
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="">Vehicle Model</label>
                                    <select className="w-full h-12 border" {...register("vehicle_model", {
                                        required: "required",
                                    })}>
                                        {allCars?.data?.map(car => <><option value={car?.model}>{car?.model}</option></>)}
                                    </select>
                                    {errors.vehicle_model && <small className='text-red-500'>{errors.vehicle_model?.message}</small>}
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="">Vehicle</label>
                                    <select className="w-full h-12 border" {...register("vehicle", {
                                        required: "required",
                                    })}>
                                        {allCars?.data?.map(car => <><option value={car?.make}>{car?.make}</option></>)}
                                    </select>
                                    {errors.vehicle && <small className='text-red-500'>{errors.vehicle?.message}</small>}
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="">Selet Hourly Rate</label>
                                    <select className="w-full h-12 border" {...register("hourly_rate", {
                                        required: "required"
                                    })}>
                                        {allCars?.data?.map(car => <><option value={car?.rates?.hourly}>{car?.rates?.hourly} $</option></>)}
                                    </select>
                                    {errors.hourly_rate && <small className='text-red-500'>{errors.hourly_rate?.message}</small>}
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="">Selet Daily Rate</label>
                                    <select className="w-full h-12 border" {...register("daily_rate", {
                                        required: "required",
                                    })}>
                                        {allCars?.data?.map(car => <><option value={car?.rates?.daily}>{car?.rates?.daily} $</option></>)}
                                    </select>
                                    {errors.daily_rate && <small className='text-red-500'>{errors.daily_rate?.message}</small>}
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="">Selet weekly Rate</label>
                                    <select className="w-full h-12 border" {...register("weekly_rate", {
                                        required: "required",
                                    })}>
                                        {allCars?.data?.map(car => <><option value={car?.rates?.weekly}>{car?.rates?.weekly} $</option></>)}
                                    </select>
                                    {errors.weekly_rate && <small className='text-red-500'>{errors.weekly_rate?.message}</small>}
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <input className='p-2 mt-4 text-black bg-gray-300 cursor-pointer w-36 btn rounded-2xl' value="Submit" type="submit" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Reservation;