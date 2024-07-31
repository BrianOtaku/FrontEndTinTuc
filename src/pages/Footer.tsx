import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-column">
                    <h3>Liên Hệ:</h3>
                    <div className="contact-item">
                        <FontAwesomeIcon icon={faFacebookSquare} className='icon' />
                        <a href="https://www.facebook.com/nguyentambao" target="_blank" rel="noopener noreferrer">
                            Nguyễn Tâm Bảo
                        </a>
                    </div>
                    <div className="contact-item">
                        <FontAwesomeIcon icon={faFacebookSquare} className='icon' />
                        <a href="https://www.facebook.com/Raycrop" target="_blank" rel="noopener noreferrer">
                            Nguyễn Quốc Khánh
                        </a>
                    </div>
                    <div className="contact-item">
                        <FontAwesomeIcon icon={faFacebookSquare} className='icon' />
                        <a href="https://www.facebook.com/profile.php?id=100012529452762&locale=vi_VN" target="_blank" rel="noopener noreferrer">
                            Nguyễn Phúc Đỉnh
                        </a>
                    </div>
                </div>
                <div className="footer-column">
                    <h3>Column 2</h3>
                    <p>Content for column 2</p>
                </div>
                <div className="footer-column">
                    <h3>Column 3</h3>
                    <p>Content for column 3</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
