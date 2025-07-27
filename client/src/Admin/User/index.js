import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap"; // Added Spinner
import swal from 'sweetalert';
import AuthContext from "../../Contexts/authContext";

const AdminUserList = () => { // Renamed component for clarity
    const { api, loading, setLoading } = useContext(AuthContext); // Added loading and setLoading
    const [users, setUsers] = useState([]);

    const getAllUsers = async () => {
        setLoading(true);
        try {
            const res = await api.get("/user");
            if (res.data && res.data.users) {
                setUsers(res.data.users);
            } else {
                setUsers([]);
            }
        } catch (err) {
            console.error("Error fetching users:", err.message);
            setUsers([]);
            swal("Error", "Could not fetch users.", "error");
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = (userId) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this user!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then(async (willDelete) => {
            if (willDelete) {
                setLoading(true);
                try {
                    const res = await api.delete(`/user/${userId}`);
                    swal({
                        title: res.data.message,
                        icon: "success",
                    });
                    getAllUsers(); // Refresh the list
                } catch (err) {
                    console.error("Error deleting user:", err.message);
                    swal("Error", "Could not delete user.", "error");
                } finally {
                    setLoading(false);
                }
            }
        });
    };

    useEffect(() => {
        getAllUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // getAllUsers is stable due to useCallback or if it doesn't depend on changing props/state from parent

    if (loading && users.length === 0) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
                <Spinner animation="border" role="status" className="dark:text-white">
                    <span className="visually-hidden">Loading users...</span>
                </Spinner>
            </Container>
        );
    }

    return (
        <div className="dark:bg-slate-900 flex-grow py-5">
            <Container>
                <h2 className="text-center mb-5 display-5 dark:text-white">User Management</h2>
                {users.length === 0 && !loading ? (
                    <p className="text-center dark:text-slate-400">No users found.</p>
                ) : (
                    <Row>
                        <Col md={12}>
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left text-slate-900 dark:text-gray-400 dark:bg-slate-800 border-collapse">
                                    <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">#</th>
                                            <th scope="col" className="px-6 py-3">Avatar</th>
                                            <th scope="col" className="px-6 py-3">Name</th>
                                            <th scope="col" className="px-6 py-3">Email</th>
                                            <th scope="col" className="px-6 py-3">Phone</th>
                                            <th scope="col" className="px-6 py-3">Courses</th>
                                            <th scope="col" className="px-6 py-3">Admin</th>
                                            <th scope="col" className="px-6 py-3">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-center dark:text-slate-300">
                                        {users.map((user, index) => {
                                            const avatarSrc = user.profilePicUrl || user.profile || "/images/avtar.png";
                                            return (
                                                <tr key={user._id} className="border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700">
                                                    <td className="px-6 py-4 font-medium">{index + 1}</td>
                                                    <td className="px-6 py-4">
                                                        <img
                                                            src={avatarSrc}
                                                            alt={`${user.firstName} ${user.lastName}`}
                                                            className="w-10 h-10 rounded-full object-cover mx-auto"
                                                            onError={(e) => { e.target.onerror = null; e.target.src = "/images/avtar.png"; }}
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{`${user.firstName} ${user.lastName}`}</td>
                                                    <td className="px-6 py-4">{user.email}</td>
                                                    <td className="px-6 py-4">{user.contactNumber || 'N/A'}</td>
                                                    <td className="px-6 py-4">{user.courses?.length || 0}</td>
                                                    <td className="px-6 py-4">{user.isAdmin ? 'Yes' : 'No'}</td>
                                                    <td className="px-6 py-4">
                                                        <button 
                                                            className="font-medium rounded bg-red-600 px-3 py-2 text-white hover:bg-red-700 dark:hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50" 
                                                            onClick={() => { deleteUser(user._id); }}>
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </Col>
                    </Row>
                )}
            </Container>
        </div>
    );
};

export default AdminUserList; // Changed export name
