import React, { useState } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import apiInstance from "../../utils/axios";
import Toast from "../../plugin/Toast";

function CreatePassword() {
    return (
        <>
            <Header />
            <section className="container d-flex flex-column vh-100" style={{ marginTop: "150px" }}>
                <div className="row align-items-center justify-content-center g-0 h-lg-100 py-8">
                    <div className="col-lg-5 col-md-8 py-8 py-xl-0">
                        <div className="card shadow">
                            <div className="card-body p-6">
                                <div className="mb-4">
                                    <h1 className="mb-1 fw-bold">Create New Password</h1>
                                    <span>Choose a new password for your account</span>
                                </div>
                                <form className="needs-validation" onSubmit={handlePasswordSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">
                                            Enter New Password
                                        </label>
                                        <input type="password" className="form-control" placeholder="**************" required onChange={(e) => setPassword(e.target.value)} />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">
                                            Confirm New Password
                                        </label>
                                        <input type="password" className="form-control" placeholder="**************" required onChange={(e) => setConfirmPassword(e.target.value)} />
                                    </div>

                                    <div>
                                        <div className="d-grid">
                                          
                                                <button disabled className="btn btn-primary">
                                                    Processing <i className="fas fa-spinner fa-spin"></i>
                                                </button>
                                           
                                                <button type="submit" className="btn btn-primary">
                                                    Save New Password <i className="fas fa-check-circle"></i>
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

export default CreatePassword;
