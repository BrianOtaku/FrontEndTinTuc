import React from 'react';
import { Button } from 'react-bootstrap';

const MyComponent: React.FC = () => {
    return (
        <div className="container">
            <h1 className="my-4">Hello, Bootstrap in React!</h1>
            <Button variant="primary">Click Me</Button>
        </div>
    );
}

export default MyComponent;