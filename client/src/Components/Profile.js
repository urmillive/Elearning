import React, { useState, useContext } from 'react';
import { Button, Modal, Form } from "react-bootstrap";
import AuthContext from '../Contexts/authContext';
import swal from 'sweetalert'; // Import sweetalert

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
        formData.append("file", selectedImage); // Field name "file" as expected by server
        api.post("/profile/avatar", formData, { // Changed endpoint to /profile/avatar
            headers: { "Content-Type": "multipart/form-data" },
        }).then((res) =>
        {
            if (res.data && res.data.user) {
                setProfile(res.data.user);
                swal("Success!", "Profile picture updated.", "success")
                    .then(() => {
                        setShow(false); // Close modal after swal is dismissed
                    });
            } else if (res.data && res.data.profilePath) {
                setProfile(prevProfile => ({...prevProfile, profile: res.data.profilePath}));
                swal("Success!", "Profile picture updated.", "success")
                    .then(() => {
                        setShow(false); // Close modal after swal is dismissed
                    });
            } else {
                // Fallback if response structure is unexpected, still close modal
                setShow(false);
            }
        }).catch((err) =>
        {
            console.log(err)
        })
    }

    return (
        <>
            { profile != null ?
                <section className='dark:bg-slate-900'>
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
                                    <div className="card-body bg-slate-100 dark:bg-slate-900 text-slate-900 rounded">
                                        <div className="card-body text-center rounder">
                                            <img
                                                src={ profile.profile ? `${process.env.REACT_APP_API_URL}${profile.profile.startsWith('/') ? '' : '/'}${profile.profile}` : (profile.profilePicUrl || 'images/avtar.png') }
                                                alt="avatar"
                                                className="rounded-circle mx-auto h-44 w-44 object-cover" // Added object-cover
                                                onError={(e) => { e.target.onerror = null; e.target.src="/images/avtar.png"; }} // Fallback for broken image links
                                            />
                                        </div>
                                        <div className="text-center pb-2">
                                            <button onClick={ handleShow } className='bg-slate-300 text-slate-800 dark:bg-slate-300 px-5 py-2 rounded-pill'>
                                                Update Profile
                                            </button>
                                        </div>
                                        <hr />
                                        <div className='text-center'>
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <p className="mb-0 font-mono text-nowrap text-slate-800 font-bold dark:text-slate-400">Full Name</p>
                                                </div>
                                                <div className="col-sm-9">
                                                    <p className="text-muted mb-0">{ `${ profile.firstName } ${ profile.lastName } ` }</p>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <p className="mb-0 font-mono text-nowrap text-slate-800 font-bold dark:text-slate-400">Email</p>
                                                </div>
                                                <div className="col-sm-9">
                                                    <p className="text-muted mb-0">{ profile.email }</p>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <p className="mb-0 font-mono text-nowrap text-slate-800 font-bold dark:text-slate-400">Phone</p>
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
                                    <div className="card-body bg-slate-100 dark:bg-slate-900 text-slate-800 text-center rounded">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <p className="mb-0 text-nowrap font-mono text-nowrap text-slate-800 font-bold dark:text-slate-400">Total Purchased Courses</p>
                                            </div>
                                            <div className="col-sm-9">
                                                <p className="text-muted mb-0">{ profile.courses.length }</p>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row my-1 rounded">
                                            <div className="col-sm-3">
                                                <p className="mb-0 text-nowrap font-mono text-nowrap text-slate-800 font-bold dark:text-slate-400">Your Enrollments</p>
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
