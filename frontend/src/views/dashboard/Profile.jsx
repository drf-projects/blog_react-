import React, { useState, useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { Link } from "react-router-dom";



function Profile() {
        
    return (
        <>
            <Header />
            <section className="pt-5 pb-5">
                <div className="container">
                    <div className="row mt-0 mt-md-4">
                        <div className="col-lg-12 col-md-8 col-12">
                            {/* Card */}
                            <div className="card">
                                {/* Card header */}
                                <div className="card-header">
                                    <h3 className="mb-0">Profile Details</h3>
                                    <p className="mb-0">You have full control to manage your own account setting.</p>
                                </div>
                                {/* Card body */}
                                <form className="card-body">
                                    <div className="d-lg-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center mb-4 mb-lg-0">
                                            <img
                                                src=""
                                                id="img-uploaded"
                                                className="avatar-xl rounded-circle"
                                                alt="avatar"
                                                style={{
                                                    width: "100px",
                                                    height: "100px",
                                                    borderRadius: "50%",
                                                    objectFit: "cover",
                                                }}
                                            />

                                            <div className="ms-3">
                                                <h4 className="mb-0">Your avatar</h4>
                                                <p className="mb-0">PNG or JPG no bigger than 800px wide and tall.</p>
                                                <input type="file" name="image" className="form-control mt-3" />
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="my-5" />
                                    <div>
                                        <h4 className="mb-0">Personal Details</h4>
                                        <p className="mb-4">Edit your personal information and address.</p>
                                        {/* Form */}
                                        <div className="row gx-3">
                                            {/* First name */}
                                            <div className="mb-3 col-12 col-md-12">
                                                <label className="form-label" htmlFor="fname">
                                                    Full Name
                                                </label>
                                                <input type="text" id="fname" className="form-control" placeholder="First Name" required="" name="full_name" value="" />
                                                <div className="invalid-feedback">Please enter first name.</div>
                                            </div>
                                            {/* Last name */}
                                            <div className="mb-3 col-12 col-md-12">
                                                <label className="form-label" htmlFor="lname">
                                                    About Me
                                                </label>
                                                <textarea name="about" id="" cols="30" value="" rows="5" className="form-control"></textarea>
                                            </div>
                                            {/* Country */}
                                            <div className="mb-3 col-12 col-md-12">
                                                <label className="form-label" htmlFor="editCountry">
                                                    Bio
                                                </label>
                                                <input type="text" id="bio" className="form-control" placeholder="Country" required="" value=""  name="bio" />
                                                <div className="invalid-feedback">Please choose country.</div>
                                            </div>
                                            {/* Country */}
                                            <div className="mb-3 col-12 col-md-12">
                                                <label className="form-label" htmlFor="editCountry">
                                                    Country
                                                </label>
                                                <input type="text" id="country" className="form-control" placeholder="Country" required="" value=""  name="country" />
                                                <div className="invalid-feedback">Please choose country.</div>
                                            </div>
                                            {/* Country */}
                                            <div className="mb-3 col-12 col-md-12">
                                                <label className="form-label" htmlFor="editCountry">
                                                    Facebook
                                                </label>
                                                <input type="text" id="facebook" className="form-control" placeholder="Country" required="" value="" name="facebook" />
                                            </div>
                                            {/* Country */}
                                            <div className="mb-3 col-12 col-md-12">
                                                <label className="form-label" htmlFor="editCountry">
                                                    Twitter
                                                </label>
                                                <input type="text" id="twitter" className="form-control" placeholder="Country" required="" value="" name="twitter" />
                                            </div>
                                            <div className="col-12">
                                                {/* Button */}
                                                <button className="btn btn-primary" type="submit">
                                                    Update Profile <i className="fas fa-check-circle"></i>
                                                </button>
                                            </div>
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

export default Profile;
