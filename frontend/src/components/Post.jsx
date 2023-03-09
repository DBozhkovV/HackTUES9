import React, { useState } from 'react';
import { Card, Image, Button } from 'react-bootstrap';
import Comments from './Comments';

function Post(props) {
  const { author, text, imageUrl, createdAt } = props.post;
  const [likes, setLikes] = useState(0); // Initialize the likes state variable to 0

  const handleLike = () => {
    setLikes(likes + 1); // Update the likes state variable when the like button is clicked
  };

  return (
    <Card className="mb-3 custom-card">
      {imageUrl && <Image src={imageUrl} alt="Post Image" style={{ maxWidth: "300px", maxHeight: "300px" }} fluid rounded />}
      <Card.Body className="custom-card-body">
        <Card.Title>{author}</Card.Title>
        <Card.Text>{text}</Card.Text>
        <Card.Text>
          <small className="text-muted">{createdAt}</small>
        </Card.Text>
        <Button variant="primary" onClick={handleLike}>Like {likes}</Button>
      </Card.Body>
      <Comments comments={props.post.comments} />
    </Card>
  );
}

export default Post;
