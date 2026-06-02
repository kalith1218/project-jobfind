import { useState } from "react";

import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function EmployerDashboard() {

    const [message, setMessage] =
        useState("");

    async function handleSubmit(e) {

        e.preventDefault();

        const formData =
            new FormData(e.target);

        const data =
            Object.fromEntries(formData);

        try {

            await api.post(
                "/jobs/create/",
                data
            );

            setMessage(
                "Job Created Successfully"
            );

            e.target.reset();

        }
        catch (error) {

            console.log(error.response?.data);

            setMessage(
                JSON.stringify(error.response?.data) ||
                "Failed To Create Job"
             );
         }
    }

    return (
        <>
            <Navbar />

              <div className="max-w-3xl mx-auto mt-10 bg-white shadow-2xl rounded-2xl p-8 border">

    <h2 className="text-3xl font-bold text-gray-800">
        Post New Job
    </h2>

    <form
        onSubmit={handleSubmit}
        className="space-y-4 mt-6"
    >

        <input
            name="title"
            placeholder="Job Title"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
        />

        <input
            name="company"
            placeholder="Company Name"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
        />

        <input
            name="location"
            placeholder="Location"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
        />

        <input
            name="salary_range"
            placeholder="Salary Range"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
        />

        <textarea
            name="description"
            placeholder="Job Description"
            rows="5"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
        />

        <input
            name="skills_required"
            placeholder="Skills Required"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
        />

        <select
            name="job_type"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
        >
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="internship">Internship</option>
            <option value="remote">Remote</option>
        </select>

        <button
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
        >
            Create Job
        </button>

    </form>

    <p className="mt-4 text-center text-green-600 font-medium">
        {message}
    </p>

</div>
        </>
    );
}