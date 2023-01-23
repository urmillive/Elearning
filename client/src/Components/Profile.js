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
                                    <div className="card-body bg-slate-300">
                                        <div className="card-body text-center rounder">
                                            <img
                                                src="images/avtar.png"
                                                alt="avatar"
                                                className="rounded-circle img-fluid mx-auto"
                                            />
                                        </div>
                                        <hr />
                                        <div>
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <p className="mb-0 text-slate-900">Full Name</p>
                                                </div>
                                                <div className="col-sm-9">
                                                    <p className="text-muted mb-0">{ `${ profile.user.firstName } ${ profile.user.lastName } ` }</p>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <p className="mb-0 text-slate-900">Email</p>
                                                </div>
                                                <div className="col-sm-9">
                                                    <p className="text-muted mb-0">{ profile.user.email }</p>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <p className="mb-0 text-slate-900">Phone</p>
                                                </div>
                                                <div className="col-sm-9">
                                                    <p className="text-muted mb-0">{ profile.user.contactNumber }</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="card mb-4">
                                    <div className="card-body text-center bg-slate-300 rounded">
                                        <h1>hello world!</h1>
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
