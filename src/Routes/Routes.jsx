
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../Home/Home';
import Reservation from '../Pages/Reservation/Reservation';
import Cars from '../Pages/Cars/Cars';
import ChargesSummary from '../Pages/ChargesSummary/ChargesSummary';
import RecitPage from '../Pages/Recit/RecitPage';



const routes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/reservation',
                element: <Reservation />,
            },
            {
                path: '/cars',
                element: <Cars />,
            },
            {
                path: '/chargesSummary',
                element: <ChargesSummary />,
            },
            {
                path: '/recit/:id',
                element: <RecitPage/>,
                loader:async ({params}) =>{
                    return fetch(`https://nyntax-car-server.vercel.app/api/chargeSummary/${params?.id}`)
                }
            },
        ],
    }
]);

export default routes;
