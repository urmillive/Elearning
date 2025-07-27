import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/BlogCard.css'; // We will create this CSS file next

const BlogCard = ({ blog }) => {
    if (!blog) {
        return null;
    }

    // Fallback for summary
    const displaySummary = blog.summary && blog.summary.length > 10 
        ? blog.summary.slice(0, 120) + (blog.summary.length > 120 ? "..." : "") 
        : "No summary available.";

    // Fallback for image - assuming you might add an imageUrl to your Blog model later
    const imageUrl = blog.imageUrl || "/images/i3.jpg"; // Default placeholder image

    // Fallback for author name
    const authorName = blog.creator && blog.creator.name ? blog.creator.name : "Anonymous";
    // Fallback for date - assuming createdAt exists
    const publicationDate = blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : "";


    return (
        <div className="blog-card h-100">
            <Link to={`/blog/${blog._id}`} className="blog-card-image-link">
                <img className="card-img-top" src={imageUrl} alt={blog.name} />
            </Link>
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{blog.name}</h5>
                <div className="blog-card-meta mb-2">
                    {authorName && <small className="text-muted">By {authorName}</small>}
                    {publicationDate && <small className="text-muted ms-2">| {publicationDate}</small>}
                </div>
                <p className="card-text flex-grow-1">{displaySummary}</p>
                <div className="mt-auto">
                    <Link to={`/blog/${blog._id}`} className="btn-read-more">
                        Read More 
                        <svg aria-hidden="true" className="w-4 h-4 ms-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;