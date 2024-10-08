import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import NotFound from "../pages/NotFound.tsx";
import Loading from "@/components/sections/Loading.tsx";

// Using Lazy loading for pages
const Home = lazy(() => import("../pages/Home.tsx"));
const Docs = lazy(() => import("../pages/Docs.tsx"));
const EarnFuel = lazy(() => import("../pages/EarnFuel.tsx"));
const EarnNeoX = lazy(() => import("../pages/EarnNeoX.tsx"));
const Portfolio = lazy(() => import("../pages/Portfolio.tsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Something went wrong.</div>,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/fuel",
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/neox",
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/docs",
        element: (
          <Suspense fallback={<Loading />}>
            <Docs />
          </Suspense>
        ),
      },
      {
        path: "/earn-fuel",
        element: (
          <Suspense fallback={<Loading />}>
            <EarnFuel />
          </Suspense>
        ),
      },
      {
        path: "/earn-neox",
        element: (
          <Suspense fallback={<Loading />}>
            <EarnNeoX />
          </Suspense>
        ),
      },
      {
        path: "/portfolio",
        element: (
          <Suspense fallback={<Loading />}>
            <Portfolio />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
