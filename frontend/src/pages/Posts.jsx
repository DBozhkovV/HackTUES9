import React, { useState } from 'react';
import { Modal, Row, Col, Button } from 'react-bootstrap';
import CreatePostForm from '../components/CreatePostForm';
import Post from '../components/Post';
import comments from '../data/comments.json';

import postsData from '../data/posts.json';

function Posts() {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const posts = JSON.parse(JSON.stringify(postsData));
   // create a deep copy of the posts array

  posts.forEach((post) => {
    post.comments = comments.filter((comment) => comment.postId === post.id);
    });

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
      <div className=''>
        {posts.map((post) => (
            <Post key={post.id} post={post} />
        ))}
      </div>

    </div>
  );
}

export default Posts;
