import React, { useState, useEffect } from 'react';
import './index.css';
import Note from './Note'; // Import the Note component

function Card(props) {
    const [post, setPost] = useState({ title: "", text: "" });
    const [posts, setPosts] = useState([]); // Local state to store posts
    const [modalOpen, setModalOpen] = useState(false); // State for modal visibility
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('https://test-0enh.onrender.com/api/posts'); // Adjust the URL as necessary
                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }
                const data = await response.json();
                setPosts(data); 
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, []);

    async function submitter(event) {
        event.preventDefault();
    
        // Create a new post without userId
        const newPost = {
            title: post.title,
            text: post.text
        };
    
        try {
            const response = await fetch('https://test-0enh.onrender.com/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPost),
            });
    
            if (!response.ok) {
                throw new Error('Fetching Failed');
            }
    
            const data = await response.json();
            console.log('Fetching Success:', data);
            
            setPosts(prevPosts => [...prevPosts, data.post]);
           
            setPost({ title: "", text: "" });
            setModalOpen(false);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    

    const handlePost = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setPost(prevValue => ({
            ...prevValue,
            [name]: value
        }));
    };

    return (
        <div className="card-container">
            <button className="add-button" onClick={() => setModalOpen(true)}>+</button>

            {modalOpen && (
                <div className="modal">
                    <form className="modal-content" onSubmit={submitter}>
                        <h1>Add Your Post</h1>
                        <input
                            value={post.title}
                            name="title"
                            className="finput"
                            onChange={handlePost}
                            placeholder="Enter your title"
                        />
                        <textarea
                            value={post.text}
                            name="text"
                            className="linput"
                            onChange={handlePost}
                            placeholder="Enter your text"
                        />
                        <button className="my-but" type="submit">Post</button>
                        <button className="close-button" onClick={() => setModalOpen(false)}>Close</button>
                    </form>
                </div>
            )}

            <div className="posts-container">
                <h2>Your Posts</h2>
                {posts.length > 0 ? (
                    posts.map((item) => (
                        <div key={item.id} className="note">
                            <h3>{item.title}</h3>
                            <p>{item.text}</p>
                        </div>
                    ))
                ) : (
                    <p>No posts available.</p>
                )}
            </div>
        </div>
    );
}

export default Card;