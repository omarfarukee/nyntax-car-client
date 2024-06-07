
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../Home/Home';
import Reservation from '../Pages/Reservation/Reservation';
import Cars from '../Pages/Cars/Cars';



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
        ],
    }
]);

export default routes;
