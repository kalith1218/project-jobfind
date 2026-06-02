import { useParams } from "react-router-dom";
import { useState } from "react";

import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function ApplyJobPage() {

    const { id } = useParams();

    const [message, setMessage] = useState("");

    async function applyJob() {

        try {

            await api.post(
                `/applications/apply/${id}/`,
                {
                    cover_letter:
                        "I am interested in this role."
                }
            );

            setMessage(
                "Application Submitted Successfully"
            );

        }
        catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Application Failed"
            );
        }
    }

    return (
        <>
            <Navbar />

           <div className="max-w-xl mx-auto mt-20 bg-white shadow-2xl rounded-2xl border p-8 text-center">

    <h2 className="text-3xl font-bold text-gray-800">
        Apply For This Job
    </h2>

    <p className="text-gray-500 mt-2">
        Submit your application in one click.
    </p>

    <button
        onClick={applyJob}
        className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
    >
        Apply Now
    </button>

    <p className="mt-4 text-green-600 font-medium">
        {message}
    </p>

</div>
        </>
    );
}