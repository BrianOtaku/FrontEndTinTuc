import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchNews } from '../API/apiNews'; // Hoặc sử dụng fetchNews nếu bạn muốn lấy tất cả các tin
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
                    <h1>{newsItem.title}</h1>
                    <img src={newsItem.imageUrl} alt={newsItem.title} />
                    <p>{newsItem.description}</p>
                    <div dangerouslySetInnerHTML={{ __html: newsItem.content }} /> {/* Nếu nội dung có HTML */}
                    <div>
                        <CommentForPage newsId={id!} />
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default NewsDetail;
