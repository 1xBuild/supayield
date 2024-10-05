import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import NotFound from "../pages/NotFound.tsx";

// Using Lazy loading for pages
const Home = lazy(() => import("../pages/Home.tsx"))

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <div>Something went wrong.</div>,
        children: [
            {
                path: "/",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Home />
                    </Suspense>
                ),
            },
        ]
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

const Router = () => {
    return <RouterProvider router={router} />;
};

export default Router