import React, { useState, useEffect, useContext } from 'react'
import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import AuthContext from '../contexts/authContext';

const Profile = () =>
{
    const { profile } = useContext(AuthContext);
    return (
        <>
            { profile != null ?
                <section>
                    <div className="container py-5">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="card mb-4">
                                    <div className="card-body bg-slate-900 text-white rounded">
                                        <div className="card-body text-center rounder">
                                            <img
                                                src="images/avtar.png"
                                                alt="avatar"
                                                className="rounded-circle img-fluid mx-auto"
                                            />
                                        </div>
                                        <hr />
                                        <div className='text-center'>
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <p className="mb-0 text-white">Full Name</p>
                                                </div>
                                                <div className="col-sm-9">
                                                    <p className="text-muted mb-0">{ `${ profile.user.firstName } ${ profile.user.lastName } ` }</p>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <p className="mb-0 text-white">Email</p>
                                                </div>
                                                <div className="col-sm-9">
                                                    <p className="text-muted mb-0">{ profile.user.email }</p>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <p className="mb-0 text-white">Phone</p>
                                                </div>
                                                <div className="col-sm-9">
                                                    <p className="text-muted mb-0">{ profile.user.contactNumber }</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <div className="card mb-4">
                                    <div className="card-body bg-slate-900 text-white text-center rounded">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Total Purchased Courses</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{ profile.courses.items.length }</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row my-1 rounded">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Your Enrollments</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{ profile.courses.items }</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                : "loading..." }
        </>
    )
}

export default Profile;
