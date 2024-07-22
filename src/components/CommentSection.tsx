import React, { useState } from 'react';
import { Form, Button, ListGroup, Container } from 'react-bootstrap';

interface Comment {
    username: string;
    text: string;
}

const CommentSection: React.FC = () => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [username, setUsername] = useState<string>('');
    const [comment, setComment] = useState<string>('');

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (username && comment) {
            setComments([...comments, { username, text: comment }]);
            setUsername('');
            setComment('');
        }
    };

    return (
        <Container className="comment-section">
            <h2>Comments</h2>
            <Form onSubmit={handleCommentSubmit}>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formComment">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter your comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </Form.Group>
                <Button variant="outline-dark" type="submit" className="mt-2">
                    Submit
                </Button>
            </Form>
            <ListGroup className="mt-3">
                {comments.map((comment, index) => (
                    <ListGroup.Item key={index}>
                        <strong>{comment.username}</strong>: {comment.text}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
};

export default CommentSection;
