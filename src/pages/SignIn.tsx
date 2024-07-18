import React, { useState } from 'react';
import { Form, Button, Container, InputGroup, FormControl } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const SignIn: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Handle sign in logic here
        console.log('Email:', email);
        console.log('Password:', password);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Container className="signin-container">
            <h1>Sign In</h1>
            <div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <InputGroup>
                            <FormControl
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button variant="outline-secondary" onClick={toggleShowPassword} className='showButtonSignIn'>
                                {showPassword ? "Hide" : "Show"}
                            </Button>
                        </InputGroup>
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100 mt-3">
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
