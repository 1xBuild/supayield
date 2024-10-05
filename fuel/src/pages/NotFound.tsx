import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate("/");
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/");
        },  5000); // 5s

        return () => clearTimeout(timer); // cleanup timer
    }, [navigate]);

    return (
        <div>
            <div>
                <h1>Page not found</h1>
                <p>Sorry, the page you're looking for doesn't exist.</p>
                <button onClick={handleGoBack}>Back to home page</button>
            </div>
        </div>
    );
};

export default NotFound;