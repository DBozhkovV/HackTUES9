import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function CreatePostForm() {
  const [text, setText] = useState('');
  const [picture, setPicture] = useState(null);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handlePictureChange = (event) => {
    setPicture(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // do something with the text and picture data (e.g., submit to a server)
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="post-text">
        <Form.Label>Post Text</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter post text"
          value={text}
          onChange={handleTextChange}
        />
      </Form.Group>
      <Form.Group controlId="post-picture">
        <Form.Label>Post Picture</Form.Label>
        <Form.Control type="file" onChange={handlePictureChange} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default CreatePostForm;
