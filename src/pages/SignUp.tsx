import React, { useState } from 'react';
import { Form, Button, Container, InputGroup, FormControl } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Handle sign up logic here
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        console.log('Email:', email);
        console.log('Username:', username);
        console.log('Password:', password);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <Container className="signup-container">
            <h1>Sign Up</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email address:</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
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
                        <Button variant="outline-secondary" onClick={toggleShowPassword} className='showButtonSignUp'>
                            {showPassword ? "Hide" : "Show"}
                        </Button>
                    </InputGroup>
                </Form.Group>
                <Form.Group controlId="formConfirmPassword">
                    <Form.Label>Confirm Password:</Form.Label>
                    <InputGroup>
                        <FormControl
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <Button variant="outline-secondary" onClick={toggleShowConfirmPassword} className='showButtonSignUp'>
                            {showConfirmPassword ? "Hide" : "Show"}
                        </Button>
                    </InputGroup>
                </Form.Group>
                <Button variant="dark" type="submit" className="w-100 mt-3">
                    Sign Up
                </Button>
                <div className="textSignUp">
                    <div>Already have an account? </div>
                    <Button variant="link" onClick={() => navigate('/login')} className='SignInLink'>
                        Sign In
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default SignUp;
