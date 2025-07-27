import React, { useState, useContext } from 'react';
import AuthContext from '../Contexts/authContext'; // For API calls
import swal from 'sweetalert'; // For notifications

const Contact = () => {
    const { api, loading, setLoading } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.name.trim()) errors.name = "Name is required.";
        if (!formData.email.trim()) {
            errors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email address is invalid.";
        }
        if (!formData.subject.trim()) errors.subject = "Subject is required.";
        if (!formData.message.trim()) {
            errors.message = "Message is required.";
        } else if (formData.message.trim().length < 10) {
            errors.message = "Message must be at least 10 characters long.";
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            swal("Oops!", "Please correct the errors in the form.", "error");
            return;
        }

        setLoading(true);
        try {
            // Ensure your API endpoint is /api/contact as registered in app.js
            const response = await api.post('/api/contact', formData); 
            if (response.status === 200) {
                swal("Success!", response.data.message || "Your message has been sent successfully.", "success");
                setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
                setFormErrors({}); // Clear errors
            } else {
                swal("Error", response.data.message || "Could not send message. Please try again.", "error");
            }
        } catch (err) {
            console.error("Contact form submission error:", err.response || err.message || err);
            const errorMsg = err.response?.data?.message || "An error occurred while sending your message. Please try again.";
            const errorDetails = err.response?.data?.errors;
            
            if (errorDetails && Array.isArray(errorDetails)) {
                const serverFieldErrors = {};
                errorDetails.forEach(fieldError => {
                    // Ensure 'param' or 'path' is used based on your server validation response
                    const fieldName = fieldError.param || fieldError.path || (fieldError.location === 'body' ? fieldError.msg.split(' ')[0].toLowerCase() : 'general');
                    serverFieldErrors[fieldName] = fieldError.msg;
                });
                setFormErrors(serverFieldErrors);
                swal("Validation Error", "Please check the highlighted fields.", "error");
            } else {
                swal("Error", errorMsg, "error");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dark:bg-slate-900 flex-grow py-8 lg:py-16"> {/* Added py-8 lg:py-16 here */}
            <section> {/* Removed dark:bg-gray-900 from section as parent div handles it */}
                <div className="px-4 mx-auto max-w-screen-md">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Us</h2>
                    <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Got a technical issue? Want to send feedback? Need details about our Business plan? Let us know.</p>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your Name</label>
                            <input 
                                type="text" 
                                id="name" 
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`shadow-sm bg-gray-50 border ${formErrors.name ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light`} 
                                placeholder="John Doe" 
                            />
                            {formErrors.name && <p className="mt-1 text-xs text-red-500 dark:text-red-400">{formErrors.name}</p>}
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`shadow-sm bg-gray-50 border ${formErrors.email ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light`} 
                                placeholder="name@example.com" 
                            />
                            {formErrors.email && <p className="mt-1 text-xs text-red-500 dark:text-red-400">{formErrors.email}</p>}
                        </div>
                        <div>
                            <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
                            <input 
                                type="text" 
                                id="subject" 
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className={`block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border ${formErrors.subject ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light`} 
                                placeholder="Let us know how we can help you" 
                            />
                            {formErrors.subject && <p className="mt-1 text-xs text-red-500 dark:text-red-400">{formErrors.subject}</p>}
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your Message</label>
                            <textarea 
                                id="message" 
                                name="message"
                                rows="6" 
                                value={formData.message}
                                onChange={handleChange}
                                className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border ${formErrors.message ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`} 
                                placeholder="Leave a comment..."
                            ></textarea>
                            {formErrors.message && <p className="mt-1 text-xs text-red-500 dark:text-red-400">{formErrors.message}</p>}
                        </div>
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-blue-600 sm:w-fit hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800 disabled:opacity-50"
                        >
                            {loading ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Contact;
