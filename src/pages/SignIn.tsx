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
            setErrorMessage('Xin vui lòng nhập thông tin đầy đủ!');
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
            <h1>Đăng Nhập</h1>
            <div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formIdentifier">
                        <Form.Label>Email hoặc Tên người dùng:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập email/Tên người dùng"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Mật khẩu:</Form.Label>
                        <InputGroup>
                            <FormControl
                                type={showPassword ? "text" : "password"}
                                placeholder="Nhập mật khẩu"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button variant="outline-secondary" onClick={toggleShowPassword} className='showButtonSignIn'>
                                {showPassword ? "Ẩn" : "Hiện"}
                            </Button>
                        </InputGroup>
                    </Form.Group>

                    {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}

                    <Button variant="dark" type="submit" className="w-100 mt-3">
                        Đăng nhập
                    </Button>
                    <div className="textSignIn">
                        <div>Chưa có tài khoản? </div>
                        <Button variant="link" onClick={() => navigate('/signup')} className='SignUpLink'>
                            Đăng ký tài khoản
                        </Button>
                    </div>
                </Form>
            </div>
        </Container>
    );
};

export default SignIn;
