import { useForm } from "react-hook-form";

const Reservation = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const handleCreateChargesSummary = () => {

    }
    return (
        <div className="pt-20">
            <div className="p-5">
                <form onSubmit={handleSubmit(handleCreateChargesSummary)} className="p-5 border">
                    <div>
                        <h1 className="text-2xl">Reservation Details</h1>
                        <div className="p-3 border w-96">
                            <label htmlFor="">Reservation ID</label>
                            <input type="text" {...register("userName", {
                                required: "*"
                            })} placeholder="Enter Name" className="w-full h-12 pl-3 mb-3 border" />
                            {errors.userName && <small className='relative ml-2 text-red-500 right-2'>{errors.userName?.message}</small>}

                            <label className="label"> <span className="label-text">Pickup Date</span></label>
                            <input type="date" {...register("date", {
                                required: "Required"
                            })} className="w-full h-12 pl-3 mb-3 border" />
                            {errors.date && <p className='text-red-500'>{errors.date.message}</p>}

                            <label className="label"> <span className="label-text">Return Date</span></label>
                            <input type="date" {...register("date", {
                                required: "Required"
                            })} className="w-full h-12 pl-3 border" />
                            {errors.date && <p className='text-red-500'>{errors.date.message}</p>}

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
                                    })} placeholder="Hour" defaultValue={0} className="h-12 pl-3 border w-28" />
                                </div>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Reservation;