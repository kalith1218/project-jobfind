import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function JobListPage() {

    async function fetchJobs() {

        try {

            const res = await api.get("/jobs/");

            setJobs(res.data);

        }
        catch (error) {

            console.log(error);
        }
    }


    const [jobs, setJobs] = useState([]);

    useEffect(() => {

        fetchJobs();

    }, []);

    
    return (
        <>
            <Navbar />

            <div className="max-w-7xl mx-auto p-6">

    <h2 className="text-4xl font-bold text-gray-800 mb-8">
        Find Your Dream Job
    </h2>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {jobs.map(job => (

            <div
                key={job.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 border p-6"
            >

                <h3 className="text-xl font-bold text-gray-800">
                    {job.title}
                </h3>

                <p className="mt-2 text-gray-600">
                    {job.company}
                </p>

                <p className="text-gray-500">
                    📍 {job.location}
                </p>

                <p className="mt-2 text-green-600 font-semibold">
                    ₹ {job.salary_range}
                </p>

                <Link
                    to={`/apply/${job.id}`}
                    className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
                >
                    Apply Now
                </Link>

            </div>

        ))}

    </div>

</div>
        </>
    );
}