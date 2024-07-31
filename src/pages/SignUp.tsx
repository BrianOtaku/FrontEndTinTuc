import React, { useState } from 'react';
import { Form, Button, Container, InputGroup, FormControl, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!email || !username || !password || !confirmPassword) {
            setErrorMessage('Xin vui lòng nhập thông tin đầy đủ!');
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage("Không trùng mật khẩu!");
            return;
        }

        setErrorMessage('');
        setShowModal(true);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        navigate('/login');
    };

    return (
        <Container className="signup-container">
            <h1>Đăng Ký</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername">
                    <Form.Label>Tên người dùng:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nhập tên người dùng"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label>Nhập địa chỉ Email:</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Nhập Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        <Button variant="outline-secondary" onClick={toggleShowPassword} className='showButtonSignUp'>
                            {showPassword ? "Ẩn" : "Hiện"}
                        </Button>
                    </InputGroup>
                </Form.Group>
                <Form.Group controlId="formConfirmPassword">
                    <Form.Label>Xác nhận lại mật khẩu:</Form.Label>
                    <InputGroup>
                        <FormControl
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Nhập mật khẩu"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <Button variant="outline-secondary" onClick={toggleShowConfirmPassword} className='showButtonSignUp'>
                            {showConfirmPassword ? "Ẩn" : "Hiện"}
                        </Button>
                    </InputGroup>
                </Form.Group>

                {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}

                <Button variant="dark" type="submit" className="w-100 mt-3">
                    Đăng ký
                </Button>
                <div className="textSignUp">
                    <div>Đã có sẵn tài khoản?</div>
                    <Button variant="link" onClick={() => navigate('/login')} className='SignInLink'>
                        Đăng nhập
                    </Button>
                </div>
            </Form>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Đăng ký thành công!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn đã đăng ký thành công! Xin vui lòng đăng nhập để tiếp tục.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseModal}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default SignUp;
