import React, { useEffect, useState } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { Link, useNavigate, useParams } from "react-router-dom";



function EditPost() {

    return (
        <>
  <Header />
    <section className="pt-5 pb-5">
        <div className="container">
            <div className="row mt-0 mt-md-4">
                <div className="col-lg-12 col-md-8 col-12">
                    <>
            <section className="py-4 py-lg-6 bg-primary rounded-3">
                <div className="container">
                    <div className="row">
                        <div className="offset-lg-1 col-lg-10 col-md-12 col-12">
                            <div className="d-lg-flex align-items-center justify-content-between">
                                <div className="mb-4 mb-lg-0">
                                    <h1 className="text-white mb-1">Update Blog Post</h1>
                                    <p className="mb-0 text-white lead">Use the article builder below to update your article.</p>
                                </div>
                                <div>
                                    <Link to="/instructor/posts/" className="btn" style={{ backgroundColor: "white" }}>
                                        {" "}
                                        <i className="fas fa-arrow-left"></i> Back to Posts
                                    </Link>
                                    <a href="instructor-posts.html" className="btn btn-dark ms-2">
                                        Save Changes <i className="fas fa-check-circle"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <form className="pb-8 mt-5">
                <div className="card mb-3">
                    {/* Basic Info Section */}
                    <div className="card-header border-bottom px-4 py-3">
                        <h4 className="mb-0">Basic Information</h4>
                    </div>
                    <div className="card-body">
                        <label htmlFor="postTHumbnail" className="form-label">
                            Preview
                        </label>
                        <img style={{ width: "100%", height: "330px", objectFit: "cover", borderRadius: "10px" }} className="mb-4" src="" alt="" />
                        <div className="mb-3">
                            <label htmlFor="postTHumbnail" className="form-label">
                                Thumbnail
                            </label>
                            <input name="image" id="postTHumbnail" className="form-control" type="file" />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Title</label>
                            <input value="" name="title" className="form-control" type="text" placeholder="" />
                            <small>Write a 60 character post title.</small>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Posts category</label>
                            <select name="category" value="" className="form-select">
                                <option value="">-------------</option>
                               
                                    <option value="">title</option>
                             
                            </select>
                            <small>Help people find your posts by choosing categories that represent your post.</small>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Post Description</label>
                            <textarea value="description" name="description" className="form-control" id="" cols="30" rows="10"></textarea>
                            <small>A brief summary of your posts.</small>
                        </div>
                        <label className="form-label">Tags</label>
                        <input value="" name="tags" className="form-control" type="text" placeholder="health, medicine, fitness" />

                        <div className="mb-3">
                            <label className="form-label">Status</label>
                            <select value="" name="status" className="form-select">
                                <option value="Active">Active</option>
                                <option value="Draft">Draft</option>
                                <option value="Disabled">Disabled</option>
                            </select>
                            <small>Help people find your posts by choosing categories that represent your post.</small>
                        </div>
                    </div>
                </div>
                
                    <button className="btn btn-lg btn-secondary w-100 mt-2" disabled>
                        Updating Post... <i className="fas fa-spinner fa-spin"></i>
                    </button>
               
                    <button className="btn btn-lg btn-success w-100 mt-2" type="submit">
                        Update Post <i className="fas fa-check-circle"></i>
                    </button>
               
            </form>
                    </>
                </div>
            </div>
        </div>
    </section>
 <Footer />
        </>
    );
}

export default EditPost;
