import React, { useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const OffcanvasComponent: React.FC = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className='hidden-container'>
                <Button variant="outline-dark" onClick={handleShow} className='hiddenside'>
                    <FontAwesomeIcon icon={faBars} className='offcanvas-icon' />
                </Button>
                <Offcanvas show={show} onHide={handleClose} placement="end" scroll={true} backdrop={true}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        Some content for the offcanvas goes here.
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
        </>
    );
};

export default OffcanvasComponent;
