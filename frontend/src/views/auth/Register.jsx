import React, { useState } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth";
import register from  '../../utils/auth';


function Register() {
  const [bioData,setBioData] = useState({full_name:"",email:"",password:"",password2:''});
  const [isLoading,setIsLoading] = useState(false)
  const navigate=useNavigate();

  const handleBioDataChange = (event)=>{
    setBioData({
        ...bioData,
        [event.target.name]:event.target.value,
    })
  }
  const handleRegister  = (async = (e)=>{
    e.preventDefault();
    setIsLoading(true);

    const {error} = register()
  })
    return (
        <>
            <Header />
            <section className="container d-flex flex-column vh-100" style={{ marginTop: "150px" }}>
                <div className="row align-items-center justify-content-center g-0 h-lg-100 py-8">
                    <div className="col-lg-5 col-md-8 py-8 py-xl-0">
                        <div className="card shadow">
                            <div className="card-body p-6">
                                <div className="mb-4">
                                    <h1 className="mb-1 fw-bold">Sign up</h1>
                                    <span>
                                        Already have an account?
                                        <Link to="/login/" className="ms-1">
                                            Sign In
                                        </Link>
                                    </span>
                                </div>
                                {/* Form */}
                                <form className="needs-validation">
                                    {/* Username */}
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">
                                            Full Name
                                        </label>
                                        <input type="text" value="" id="full_name" className="form-control" name="full_name" placeholder="John Doe" required="" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">
                                            Email Address
                                        </label>
                                        <input type="email" value="" id="email" className="form-control" name="email" placeholder="johndoe@gmail.com" required="" />
                                    </div>

                                    {/* Password */}
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">
                                            Password
                                        </label>
                                        <input type="password" value="" id="password" className="form-control" name="password" placeholder="**************" required="" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">
                                            Confirm Password
                                        </label>
                                        <input type="password" value="" id="password" className="form-control" name="password2" placeholder="**************" required="" />
                                    </div>
                                    <div>
                                        <div className="d-grid">
                                            <button className="btn btn-primary w-100" type="submit">

                                                        <span className="mr-2 ">Processing...</span>
                                                        <i className="fas fa-spinner fa-spin" />
                                                        <span className="mr-2">Sign Up</span>
                                                        <i className="fas fa-user-plus" />
                                               
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Register;
