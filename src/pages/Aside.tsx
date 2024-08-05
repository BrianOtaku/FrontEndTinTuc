import React from 'react';
import CommentSection from '../components/CommentSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

const Aside: React.FC = () => {
    return (
        <div>
            <h2>
                <FontAwesomeIcon icon={faUsers} aria-hidden="true" style={{ marginRight: '10px' }} />
                Diễn đàn
            </h2>
            <CommentSection />
        </div>
    );
};

export default Aside;
