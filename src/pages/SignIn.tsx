import React, { useState } from 'react';
import { Form, Button, Container, InputGroup, FormControl } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SignIn: React.FC = () => {
    const [identifier, setIdentifier] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!identifier || !password) {
            setErrorMessage('Please fill out all fields.');
            return;
        }

        console.log('Identifier (Email/Username):', identifier);
        console.log('Password:', password);
        setErrorMessage('');
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Container className="signin-container">
            <h1>Sign In</h1>
            <div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formIdentifier">
                        <Form.Label>Email address or Username:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter email/username"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Password:</Form.Label>
                        <InputGroup>
                            <FormControl
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button variant="outline-secondary" onClick={toggleShowPassword} className='showButtonSignIn'>
                                {showPassword ? "Hide" : "Show"}
                            </Button>
                        </InputGroup>
                    </Form.Group>

                    {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}

                    <Button variant="dark" type="submit" className="w-100 mt-3">
                        Sign In
                    </Button>
                    <div className="textSignIn">
                        <div>Haven't signed up yet? </div>
                        <Button variant="link" onClick={() => navigate('/signup')} className='SignUpLink'>
                            Sign Up
                        </Button>
                    </div>
                </Form>
            </div>
        </Container>
    );
};

export default SignIn;
