// Contact.js
import React, { useState } from 'react';
import NavBar from './NavBar';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can perform any necessary form submission logic here
        // For now, let's just clear the form and set the submitted state to true
        setFormData({
            name: '',
            email: '',
            message: ''
        });
        setSubmitted(true);
    };

    return (
        <div>
            <NavBar />
            <div className="contact-container">
                <div className="contact-content">
                    <h2>Contact Us</h2>
                    {submitted ? (
                        <p className="thank-you-message">Thank you for your feedback!</p>
                    ) : (
                        <>
                            <p>If you have any questions or inquiries, feel free to reach out to us using the information below:</p>

                            <div className="contact-info">
                                <p><strong>Email:</strong> info@flatmed.com</p>
                                <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                                <p><strong>Address:</strong> 123 Medical Street, Cityville, MD 12345</p>
                            </div>

                            <p>Alternatively, you can use the contact form below:</p>

                            <form className="contact-form" onSubmit={handleSubmit}>
                                <label htmlFor="name">Your Name:</label>
                                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

                                <label htmlFor="email">Your Email:</label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

                                <label htmlFor="message">Your Message:</label>
                                <textarea id="message" name="message" rows="4" value={formData.message} onChange={handleChange} required></textarea>

                                <button type="submit">Submit</button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Contact;
