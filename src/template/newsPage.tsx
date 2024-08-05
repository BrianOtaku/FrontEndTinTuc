import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { fetchNewsByType } from '../API/apiNews';
import { useNavigate } from 'react-router-dom';

interface Data {
    id: number;
    title: string;
    linkDetail: string;
    imageUrl: string;
    description: string;
    content: string;
}

interface Props {
    type: string;
}

const NewsPage: React.FC<Props> = ({ type }) => {
    const [dataList, setDataList] = useState<Data[]>([]);
    const [currentItems, setCurrentItems] = useState<Data[]>([]);
    const [itemsPerPage] = useState<number>(10);
    const [page, setPage] = useState<number>(1);
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            const data = await fetchNewsByType(type);
            setDataList(data);
            setCurrentItems(data.slice(0, itemsPerPage));
        };

        getData();
    }, [type, itemsPerPage]);

    const handleItemClick = (id: number) => {
        navigate(`/news/${id}`);
    };

    const loadMore = () => {
        const nextPage = page + 1;
        const startIndex = (nextPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setCurrentItems(dataList.slice(0, endIndex));
        setPage(nextPage);
    };

    return (
        <Container className="home">
            <div className="news-page">
                <div className="news-list">
                    {currentItems.map((data) => (
                        <div key={data.id} className="gap-between-item">
                            <img src={data.imageUrl} alt={data.title} className="news-image" />
                            <div onClick={() => handleItemClick(data.id)}>
                                <h2 className="news-title">{data.title}</h2>
                                <p className="news-description">{data.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {currentItems.length < dataList.length && (
                    <div className="load-more">
                        <button onClick={loadMore} className="load-more-button">
                            Hiển thị thêm
                        </button>
                    </div>
                )}
            </div>
        </Container>
    );
};

export default NewsPage;
