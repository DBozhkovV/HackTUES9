import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";

const Comments = ({ comments }) => {
  const [showAll, setShowAll] = useState(false);

  const visibleComments = showAll ? comments : comments.slice(0, 2);


  const handleShowAll = () => {
    setShowAll(true);
  };

  const handleReturn = () => {
    setShowAll(false);
  };

  return (
    <div>
      {visibleComments.map((comment) => (
        <Card key={comment.id} className="my-3">
          <Card.Body>
            <Card.Title>{comment.author}</Card.Title>
            <Card.Text>{comment.content}</Card.Text>
          </Card.Body>
          {comment.imageUrl && (
            <Card.Img variant="bottom" src={comment.imageUrl} />
          )}
        </Card>
      ))}
      {comments.length > 2 && !showAll && (
        <Button variant="primary" onClick={handleShowAll}>
          View All Comments
        </Button>
      )}
      {showAll && (
        <Button variant="primary" onClick={handleReturn}>
          Hide Comments
        </Button>
      )}
    </div>
  );
};

export default Comments;
