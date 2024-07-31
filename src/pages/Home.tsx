import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { fetchNews } from '../API/apiNews';
import Aside from './Aside';

interface Data {
    id: number;
    title: string;
    linkDetail: string;
    imageUrl: string;
    description: string;
    content: string;
}

const Home: React.FC = () => {
    const [dataList, setDataList] = useState<Data[]>([]);
    const [selectedNewsId, setSelectedNewsId] = useState<number | null>(null);

    useEffect(() => {
        const getData = async () => {
            const data = await fetchNews();
            setDataList(data);
        };

        getData();
    }, []);

    const handleTitleClick = (id: number) => {
        if (selectedNewsId === id) {
            setSelectedNewsId(null);
        } else {
            setSelectedNewsId(id);
        }
    };

    return (
        <Container className="home">
            <div className="homeandaside">
                <ul className="news-list">
                    {dataList.map((data) => (
                        <li key={data.id} className="news-item">
                            <h2 className="news-title" onClick={() => handleTitleClick(data.id)}>{data.title}</h2>
                            <a href={data.linkDetail} target="_blank" rel="noopener noreferrer" className="news-link">
                                <img src={data.imageUrl} alt={data.title} className="news-image" />
                            </a>
                            <p className="news-description">{data.description}</p>
                        </li>
                    ))}
                </ul>
                {selectedNewsId && (
                    <div className="news-content Normal">
                        {dataList.find((data) => data.id === selectedNewsId)?.content}
                    </div>
                )}
            </div>
            <div className="side-content">
                <Aside />
            </div>
        </Container>
    );
};

export default Home;
