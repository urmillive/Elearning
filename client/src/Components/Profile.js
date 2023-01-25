import React, { useState, useEffect, useContext } from 'react'
import { Button, Modal, Form } from "react-bootstrap";
import AuthContext from '../contexts/authContext';

const Profile = () =>
{
    const { profile, setProfile, api } = useContext(AuthContext);
    const [ selectedImage, setSelectedImage ] = useState(null);
    const [ show, setShow ] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const updateImage = (e) =>
    {
        const formData = new FormData();
        formData.append("file", selectedImage);
        console.log(selectedImage)
        api.post("/profile", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        }).then((res) =>
        {
            console.log(res.data);
            setProfile(res.data.user);
            setShow(false);
        }).catch((err) =>
        {
            console.log(err)
        })
    }

    return (
        <>
            { profile != null ?
                <section>
                    <Modal show={ show } onHide={ handleClose }>
                        <Modal.Header closeButton>
                            <Modal.Title>Upload Photo</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Upload Image</Form.Label>
                                    <Form.Control type="file" placeholder="Enter email"
                                        onChange={ (event) =>
                                        {
                                            setSelectedImage(event.target.files[ 0 ]);
                                        } } />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={ handleClose }>
                                Close
                            </Button>
                            <Button variant="primary" onClick={ updateImage }>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>


                    <div className="container py-5">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="card mb-4">
                                    <div className="card-body bg-slate-900 text-white rounded">
                                        <div className="card-body text-center rounder">
                                            <img
                                                src={ profile.profile != "" ? process.env.REACT_APP_API_URL + "/" + profile.profile : 'images/avtar.png' }
                                                alt="avatar"
                                                className="rounded-circle mx-auto h-44 w-44"
                                            />
                                        </div>
                                        <div className="text-center pb-2">
                                            <button onClick={ handleShow } className='bg-slate-500 px-5 py-2 rounded-pill'>
                                                Update Profile
                                            </button>
                                        </div>
                                        <hr />
                                        <div className='text-center'>
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <p className="mb-0 text-white">Full Name</p>
                                                </div>
                                                <div className="col-sm-9">
                                                    <p className="text-muted mb-0">{ `${ profile.firstName } ${ profile.lastName } ` }</p>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <p className="mb-0 text-white">Email</p>
                                                </div>
                                                <div className="col-sm-9">
                                                    <p className="text-muted mb-0">{ profile.email }</p>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <p className="mb-0 text-white">Phone</p>
                                                </div>
                                                <div className="col-sm-9">
                                                    <p className="text-muted mb-0">{ profile.contactNumber }</p>
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
                                                <p className="text-muted mb-0">{ profile.courses.length }</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row my-1 rounded">
                                            <div className="col-sm-3">
                                                <p className="mb-0">Your Enrollments</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{ profile.courses }</p>
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
