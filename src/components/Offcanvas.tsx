import React, { useEffect, useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSignOutAlt, faAddressCard, } from '@fortawesome/free-solid-svg-icons';
import { decodeToken } from '../API/axiosConfig';
import { getAccountById } from '../API/apiAccount';

const OffcanvasComponent: React.FC = () => {
    const [show, setShow] = useState(false);
    const [accountData, setAccountData] = useState<any>(null); // Thay đổi kiểu dữ liệu tùy thuộc vào cấu trúc Account

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = decodeToken(token);
            if (decoded && decoded.unique_name) {
                const userId = decoded.unique_name;
                if (typeof userId === 'string') {
                    getData(userId, token);
                }
            }
        }
    }, []);

    const getData = async (id: string, token: string) => {
        try {
            const accountData = await getAccountById(id, token);
            setAccountData(accountData);
            localStorage.setItem('name', accountData?.name ?? ''); // Đảm bảo giá trị không phải là undefined
            localStorage.setItem('userId', accountData?.id ?? '')
        } catch (error) {
            console.log(error);
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('userId')
        window.location.reload();
    }

    return (
        <>
            <div className='hidden-container'>
                <Button variant="outline-dark" onClick={handleShow} className='hiddenside'>
                    <FontAwesomeIcon icon={faBars} className='offcanvas-icon' />
                </Button>
                <Offcanvas show={show} onHide={handleClose} placement="end" scroll={true} backdrop={true} className='offcanvas-custom'>
                    <Offcanvas.Header closeButton closeVariant='white'>
                        <FontAwesomeIcon icon={faAddressCard} aria-hidden="true" className='user-icon' />
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        {accountData ? (
                            <div className='info'>
                                <p><strong>ID:</strong> {accountData.id}</p>
                                <p><strong>Email:</strong> {accountData.email}</p>
                                <p><strong>Name:</strong> {accountData.name}</p>
                                <Button variant="danger" onClick={handleLogout} className='sign-out-button'>
                                    <FontAwesomeIcon icon={faSignOutAlt} className='sign-out-icon' />Đăng xuất
                                </Button>
                            </div>
                        ) : (
                            <div>
                                <h3>Oops!...</h3>
                                <h5>Bạn chưa đăng nhập.</h5>
                            </div>
                        )}
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
        </>
    );
};

export default OffcanvasComponent;
