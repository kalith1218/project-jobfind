import { useEffect, useState } from "react";

import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function CandidateDashboard() {

    async function fetchApplications() {

        try {

            const res =
                await api.get(
                    "/applications/my/"
                );

            setApplications(res.data);

        }
        catch (error) {

            console.log(error);
        }
    }




    const [applications, setApplications] =
        useState([]);

    useEffect(() => {

        fetchApplications();

    }, []);

    
    return (
        <>
            <Navbar />

            <div className="max-w-6xl mx-auto p-6">

    <h2 className="text-4xl font-bold text-gray-800">
        My Applications
    </h2>

    <div className="mt-8 grid md:grid-cols-2 gap-6">

        {applications.map(app => (

            <div
                key={app.id}
                className="bg-white shadow-lg rounded-xl border p-5 hover:shadow-xl transition"
            >

                <h3 className="text-xl font-semibold text-gray-800">
                    {app.job_title}
                </h3>

                <p className="mt-3 text-gray-600">
                    Status:
                    <span className="ml-2 font-semibold text-blue-600">
                        {app.status}
                    </span>
                </p>

            </div>

        ))}

    </div>

</div>
        </>
    );
}