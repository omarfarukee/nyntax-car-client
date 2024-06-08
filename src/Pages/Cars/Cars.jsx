import { useQuery } from "@tanstack/react-query";
import "./Cars.css"
import { IoIosSettings } from "react-icons/io";

const Cars = () => {

    const { data: allCars = [] } = useQuery({
        queryKey: ['allCars'],
        queryFn: async () => {
            const res = await fetch(`https://exam-server-7c41747804bf.herokuapp.com/carsList`);
            const data = await res.json();
            return data;
        }
    });
    // console.log(allCars?.data?.map(data => data?.rates?.weekly))
    return (
        <div className="pt-20 ">
        { !allCars?.data &&<div className="flex justify-center mt-5">
                <h1 className="text-8xl animate-spin"><IoIosSettings />
                </h1>
            </div>}
            <div className="p-2">
            {
                allCars?.data?.map(cars =>
                    <>
                    <div className="flex justify-center">
                        <div className="flex w-11/12 h-[500px] mb-3 shadow-xl rounded-lg font-bold">
                            <div className="car-pic">
                                <img src={cars?.imageURL} className="w-[500px] mt-40" alt="" />
                            </div>
                            <div key={cars?.id} className="p-10 mb-5">
                                <div className="flex gap-3 text-5xl font-bold uppercase">
                                    <h1>{cars?.make}</h1>
                                    <h1>{cars?.model}</h1>
                                    <h1>{cars?.year}</h1>
                                </div>
                                <div className="flex justify-between mt-5">
                                    <div>
                                       <h1 className="text-2xl font-bold text-orange-900 uppercase">features</h1>
                                    {cars?.features?.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                     </div>
                                    <div> 
                                    <h1 className="text-2xl font-bold text-orange-900 uppercase">TYPES</h1>
                                        <p>- {cars?.type}</p>
                                    </div>
                                </div>
                                <div>
                                <h1 className="mt-5 text-2xl font-bold text-orange-900 uppercase">Others</h1>
                                <h1>Seats: {cars?.seats}</h1>
                                <h1>Bags: {cars?.bags}</h1>
                                </div>
                                <div>
                                <h1 className="mt-5 text-2xl font-bold text-orange-900 uppercase">Rates</h1>
                                <h1>Hourly- {cars?.rates?.hourly} $</h1>
                                <h1>Daily- {cars?.rates?.daily} $</h1>
                                <h1>Weekly- {cars?.rates?.weekly} $</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                        

                    </>
                )
            }
        </div>
    </div>
    );
};

export default Cars;