import React from 'react';
import CommentSection from '../components/CommentSection';

const Aside: React.FC = () => {
    return (
        <div className="aside-container">
            <h2>Forum</h2>
            <CommentSection />
        </div>
    );
};

export default Aside;
