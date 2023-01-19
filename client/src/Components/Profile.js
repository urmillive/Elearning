import React, { useState, useEffect, useContext } from 'react'
import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import AuthContext from '../contexts/authContext';

const Profile = () =>
{
    const { user } = useContext(AuthContext);
    return (
        <>
            <section style={ { backgroundColor: "#eee" } }>
                <div className="container py-5">
                    <div className="row">
                        <div className="col-lg-9">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <div>
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Full Name</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{ `${ user.firstName } ${ user.lastName } ` }</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Email</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{ user.email }</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Phone</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{ user.mobile }</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="card mb-4">
                                <div className="card-body text-center">
                                    <h5 className="my-3"><span className='text-muted'>Purchased Courses : { user.cart }</span></h5>
                                    <h5 className="my-3"><span className='text-muted'>Enrollments : { user.cart }</span></h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Profile;
