import React, { useState, useEffect } from 'react';
import { Modal, Button, Form ,Card, Image} from 'react-bootstrap';
import Post from '../components/Post';
import '../styles/_posts.scss';
import axios from 'axios';
import { useNavigate } from 'react-router';


function Posts() {
  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState([]);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const navigate = useNavigate();

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
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post(`https://localhost:7160/AddPost`, {
      text: text,
      picture: picture,
    })
    .then(() => {
      navigate('/posts');
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handlePictureChange = (event) => {
    setPicture(event.target.files[0]);
  };

  return (
    <div className='post-frame'>
      <div className='post-header'>
        <h1>Posts</h1>
        <Button variant="primary" onClick={handleShowModal}>
          Create Post
        </Button>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="post-text">
              <Form.Label>Post Text</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter post text"
                onChange={(e) => handleTextChange(e)}
              />
            </Form.Group>
            <br/>
            <Form.Group controlId="post-picture">
              <Form.Label>Post Picture</Form.Label>
              <Form.Control type="file" onChange={(e) => handlePictureChange(e)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={(e) => handleSubmit(e)} variant="primary" type="submit">
            Submit
          </Button>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* render list of posts here */}
      <div className='posts-container'>
        {posts.map((post) => (
                <Card className="mb-3 custom-card">
                {<Image src={`https://dwc1e0311jht7.cloudfront.net/${post.key}`} alt="Post Image" style={{ maxWidth: "300px", maxHeight: "300px" }} fluid rounded />}
                <Card.Body className="custom-card-body">
                <Card.Text>{post.description}</Card.Text>

                </Card.Body>

              </Card>
        ))}
      </div>

    </div>
  );
}

export default Posts;
