import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchNewsByType } from '../API/apiNews';

interface Data {
    id: number;
    title: string;
    linkDetail: string;
    imageUrl: string;
    description: string;
    content: string;
}

const NewsDetailByType: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [newsItem, setNewsItem] = useState<Data | null>(null);
    const [allNews, setAllNews] = useState<Data[]>([]);
    const [type, setType] = useState<string>('');

    useEffect(() => {
        const getData = async () => {
            try {
                // Lấy tất cả tin tức theo loại
                const data = await fetchNewsByType(type);
                setAllNews(data);

                // Tìm tin tức cụ thể dựa trên ID
                const item = data.find(news => news.id.toString() === id);
                setNewsItem(item || null);
            } catch (error) {
                console.error('Error fetching news item:', error);
            }
        };

        if (type) {
            getData();
        }
    }, [id, type]);

    return (
        <div className="news-detail">
            {newsItem ? (
                <>
                    <h1>{newsItem.title}</h1>
                    <img src={newsItem.imageUrl} alt={newsItem.title} />
                    <p>{newsItem.description}</p>
                    <div dangerouslySetInnerHTML={{ __html: newsItem.content }} /> {/* Nếu nội dung có HTML */}
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default NewsDetailByType;
