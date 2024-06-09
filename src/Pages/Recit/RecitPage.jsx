
import { useLoaderData } from "react-router-dom";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import logo from "../../images/logo/6e06a82f-0f89-4bc7-8de6-476fe4e96936.jpg";


const RecitPage = () => {
    const data = useLoaderData();

    const handleDownloadRecit = () => {
        const input = document.getElementById('recit-content');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'PNG', 0, 0);
                pdf.save("recit.pdf");
            });
    };
    return (
        <div className="pt-20">
            <div className="flex justify-center mt-5">
                <button onClick={handleDownloadRecit} className="w-40 p-3 text-white bg-blue-600 rounded-md">
                    Download Receipt
                </button>
            </div>
            <div className="flex justify-center mt-5 mb-10">
                <div id="recit-content" className="w-3/5 border">
                    <div className="flex justify-center border-b-2">
                        <div className="flex flex-col items-center">
                              <img src={logo} alt="Logo" />
                              <h1 className="text-lg font-bold">Rent info</h1>
                        </div>
                      
                    </div>
                    <div className="p-4">
                        <div className="flex justify-between">
                            <div className="p-2 bg-gray-200 rounded-lg shadow-lg w-72">
                        <h1>Customer info :</h1>
                        <p>Name : {data?.first_name} {data?.last_name}</p>
                        <p>email :{data?.email}</p>
                        <p>phone :{data?.phone}</p>
                        </div>
                        <div className="p-2 bg-gray-200 rounded-lg shadow-lg w-72">
                        <h1>Car info :</h1>
                        <p>make & model : {data?.vehicle} {data?.vehicle_model}</p>
                        <p>Type : {data?.vehicle_type}</p>
                        <p>Pickup date : {data?.pick_date}</p>
                        <p>return date : {data?.return_date}</p>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">Reservation ID : {data?.reservation_id}</h1>
                            <h1 className="text-2xl font-bold">Car ID : {data?.vehicle_id}</h1>    
                        </div>
                        </div>
                        <div className="p-3 mt-3 rounded-lg bg-slate-200">
                            <h1 className="text-lg font-bold border-b-2">Charges Summary</h1>
                            <h1>weekly : unit-{data?.duration_weekly}, weekly total charge: {data?.weekly_charged_total} $</h1>
                            <h1>daily : unit-{data?.duration_daily} , daily total charge: {data?.daily_charged_total} $</h1>
                            <h1>week : unit-{data?.duration_hourly}, hourly total charge: {data?.hourly_charged_total} $</h1>
                            <h1>Renter tax: {data?.tax && data?.tax} $</h1>
                            <h1>discount : {data?.discount}</h1>
                            <h1>Total charge: {data?.grandTotal} $</h1>
                        </div>
        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecitPage;
