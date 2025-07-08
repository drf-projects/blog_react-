import { useState, useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { Link, useParams } from "react-router-dom";

function Category() {

    return (
        <div>
            <Header />
            <section className="p-0">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <a href="#" className="d-block card-img-flash">
                                <img src="assets/images/adv-3.png" alt="" />
                            </a>
                            <h2 className="text-start d-block mt-1">
                                <i className="bi bi-grid-fill"></i>
                            </h2>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pt-4 pb-0 mt-4">
                <div className="container">
                    <div className="row">
                            <div className="col-sm-6 col-lg-3">
                                <div className="card mb-4">
                                    <div className="card-fold position-relative">
                                        <img className="card-img" style={{ width: "100%", height: "160px", objectFit: "cover" }} src="" alt="" />
                                    </div>
                                    <div className="card-body px-3 pt-3">
                                        <h4 className="card-title">
                                            <Link to="#" className="btn-link text-reset stretched-link fw-bold text-decoration-none">
                                              
                                            </Link>
                                        </h4>
                                        <ul className="mt-3 list-style-none" style={{ listStyle: "none" }}>
                                            <li>
                                                <a href="#" className="text-dark text-decoration-none">
                                                    <i className="fas fa-user"></i> 
                                                </a>
                                            </li>
                                            <li className="mt-2">
                                                <i className="fas fa-calendar"></i>
                                            </li>
                                            <li className="mt-2">
                                                <i className="fas fa-eye"></i> Views
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        
                    </div>

                    <nav className="d-flex mt-5">
                        <ul className="pagination">
                            <li className="">
                                <button className="page-link me-1">
                                    <i className="ci-arrow-left me-2" />
                                    Previous
                                </button>
                            </li>
                        </ul>
                        <ul className="pagination">
                            
                                <li className="">
                                    <button className="page-link">
                                        number
                                    </button>
                                </li>
                        
                        </ul>

                        <ul className="pagination">
                            <li className="">
                                <button className="page-link ms-1">
                                    Next
                                    <i className="ci-arrow-right ms-3" />
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default Category;
