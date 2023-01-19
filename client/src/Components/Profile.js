import React, { useState, useEffect } from 'react'
import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Profile = () =>
{

    return (
        <>
            <section style={ { backgroundColor: "#eee" } }>
                <div className="container-fluid py-5">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="card mb-4">
                                <div className="card-body text-center">
                                    <img
                                        src="images/avtar.png"
                                        alt="avatar"
                                        className="rounded-circle text-center"
                                        style={ { width: 150 } }
                                    />
                                    <h5 className="my-3">{ "username" }</h5>
                                    <p className="text-muted mb-1">Full Stack Developer</p>
                                    <p className="text-muted mb-4">Ahmadabad Gujarat</p>
                                </div>
                            </div>
                            <div className="card mb-4 mb-lg-0">
                                <div className="card-body p-0">
                                    <ul className="list-group list-group-flush rounded-3">
                                        <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                            <i
                                                className="fab fa-twitter fa-lg"
                                                style={ { color: "#55acee" } }
                                            />
                                            <p className="mb-0">Twitter Handle</p>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                            <i
                                                className="fab fa-instagram fa-lg"
                                                style={ { color: "#ac2bac" } }
                                            />
                                            <p className="mb-0">Instagram Handle</p>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                            <i
                                                className="fab fa-facebook-f fa-lg"
                                                style={ { color: "#3b5998" } }
                                            />
                                            <p className="mb-0">Facebook Handle</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <div>
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Full Name</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{ "urmil" }</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Email</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{ "urmil@gmail.com" }</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Phone</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{ "9665468465" }</p>
                                            </div>
                                        </div>
                                    </div>
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
