import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchNews } from '../API/apiNews';
import CommentForPage from '../components/CommentForPage';

interface Data {
    id: number;
    title: string;
    linkDetail: string;
    imageUrl: string;
    description: string;
    content: string;
}

const NewsDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [newsItem, setNewsItem] = useState<Data | null>(null);

    useEffect(() => {
        const getNewsItem = async () => {
            try {
                const data = await fetchNews(); // Lấy tất cả tin tức rồi lọc
                const item = data.find(news => news.id.toString() === id);
                setNewsItem(item || null);
            } catch (error) {
                console.error('Error fetching news item:', error);
            }
        };

        getNewsItem();
    }, [id]);

    return (
        <div className="news-detail">
            {newsItem ? (
                <>
                    <h1 className="news-detail-title">{newsItem.title}</h1>
                    <img className="news-detail-image" src={newsItem.imageUrl && newsItem.imageUrl.startsWith('data:')
                            ? 'https://via.placeholder.com/300x175' // URL của hình ảnh mặc định
                            : newsItem.imageUrl || 'https://via.placeholder.com/300x175'} alt={newsItem.title} />
                    <p className="news-detail-description">{newsItem.description}</p>
                    <div className="news-detail-content" dangerouslySetInnerHTML={{ __html: newsItem.content }} />
                    <div className="comments-detail-section">
                        <CommentForPage newsId={id!} />
                    </div>
                </>
            ) : (
                <p className="loading-text">Loading...</p>
            )}
        </div>
    );
};

export default NewsDetail;
