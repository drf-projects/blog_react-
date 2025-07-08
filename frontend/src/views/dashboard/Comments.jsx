import React, { useState, useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { Link } from "react-router-dom";



function Comments() {

    return (
        <>
<Header />
<section className="pt-5 pb-5">
    <div className="container">
    <div className="row mt-0 mt-md-4">
    <div className="col-lg-12 col-md-8 col-12">
        {/* Card */}
    <div className="card mb-4">
        {/* Card header */}
    <div className="card-header d-lg-flex align-items-center justify-content-between">
        <div className="mb-3 mb-lg-0">
            <h3 className="mb-0">Comments</h3>
            <span>You have full control to manage your own comments.</span>
        </div>
    </div>
        {/* Card body */}
<div className="card-body">
    {/* List group */}
    <ul className="list-group list-group-flush">
        {/* List group item */}
    
            <li className="list-group-item p-4 shadow rounded-3 mb-3">
                <div className="d-flex">
                    <img src="https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg" alt="avatar" className="rounded-circle avatar-lg" style={{ width: "70px", height: "70px", borderRadius: "50%", objectFit: "cover" }} />
                    <div className="ms-3 mt-2">
                        <div className="d-flex align-items-center justify-content-between">
                            <div>
                                <h4 className="mb-0">name</h4>
                                <span>date</span>
                            </div>
                        </div>
                        <div className="mt-2">
                            <p className="mt-2">
                                <span className="fw-bold me-2">
                                    Comment <i className="fas fa-arrow-right"></i>
                                </span>
                                comment
                            </p>
                            <p className="mt-2 d-flex">
                                <span className="fw-bold me-2">
                                    Response <i className="fas fa-arrow-right"></i>
                                </span>
                                <p className="text-danger">No Reply</p>
                            </p>
                            <p>
                                <button class="btn btn-outline-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                    Send Response
                                </button>
                            </p>
                            <div class="collapse" id="collapseExample">
                                <div class="card card-body">
                                    <div class="mb-3">
                                        <label for="exampleInputEmail1" class="form-label">
                                            Write Response
                                        </label>
                                        <textarea value="" name="" id="" cols="30" className="form-control" rows="4"></textarea>
                                    </div>

                                    <button type="submit" class="btn btn-primary">
                                        Send Response <i className="fas fa-paper-plane"> </i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>

    </ul>
</div>
    </div>
    </div>
    </div>
    </div>
</section>
<Footer />
        </>
    );
}

export default Comments;
