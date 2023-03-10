import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import CreatePostForm from '../components/CreatePostForm';
import Post from '../components/Post';
import '../styles/_posts.scss';

function Posts() {
  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  
  useEffect(() => {
    const getPosts = async () => {
      await axios.get(`https://localhost:7160/GetPosts`, { withCredentials: true })
          .then(response => {
              setPosts(response.data);
          })
          .catch(error => {
              console.error(error);
          })
    }
    getPosts();
  }, []);
  
  return (
    <div>
      <h1>Posts</h1>
      <Button variant="primary" onClick={handleShowModal}>
        Create Post
      </Button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreatePostForm />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* render list of posts here */}
      <div className='posts-container'>
        {posts.map((post) => (
            <Post key={post.id} post={post} />
        ))}
      </div>

    </div>
  );
}

export default Posts;
