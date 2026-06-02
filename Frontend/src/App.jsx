import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import JobListPage from "./pages/JobListPage";

import CandidateDashboard from "./pages/CandidateDashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import ApplyJobPage from "./pages/ApplyJobPage";

import ProtectedRoute from "./components/ProtectedRoute";

function App(){

    return(

        <BrowserRouter>

        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
    {/* Routes */}

    <Routes>

                <Route
                    path="/login"
                    element={<LoginPage />}
                />

                <Route
                    path="/register"
                    element={<RegisterPage />}
                />

                <Route
                    path="/jobs"
                    element={
                        <ProtectedRoute>
                            <JobListPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                     path="/apply/:id"
                     element={
                        <ProtectedRoute>
                          <ApplyJobPage />
                        </ProtectedRoute>
                     }
                />

                <Route
                   path="/candidate-dashboard"
                   element={
                      <ProtectedRoute>
                        <CandidateDashboard />
                      </ProtectedRoute>
                    }
                 />

                <Route
                   path="/employer-dashboard"
                   element={
                     <ProtectedRoute>
                       <EmployerDashboard />
                     </ProtectedRoute>
                    }
                  />

            </Routes>
       </div> 

            

        </BrowserRouter>
    );
}

export default App;