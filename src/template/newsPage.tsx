import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { fetchNewsByType } from '../API/apiNews';

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
    const [selectedNewsId, setSelectedNewsId] = useState<number | null>(null);
    const [currentItems, setCurrentItems] = useState<Data[]>([]);
    const [itemsPerPage] = useState<number>(10);
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        const getData = async () => {
            const data = await fetchNewsByType(type);
            setDataList(data);
            setCurrentItems(data.slice(0, itemsPerPage));
        };

        getData();
    }, [type, itemsPerPage]); // Thêm itemsPerPage vào mảng phụ thuộc

    const handleTitleClick = (id: number) => {
        if (selectedNewsId === id) {
            setSelectedNewsId(null);
        } else {
            setSelectedNewsId(id);
        }
    };

    const loadMore = () => {
        const nextPage = page + 1;
        const startIndex = (nextPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setCurrentItems(dataList.slice(0, endIndex));
        setPage(nextPage);
    };

    return (
        <Container className="news-page">
            <div>
                {/* Danh sách dữ liệu */}
                <div className="news-list">
                    {currentItems.map((data) => (
                        <div key={data.id} className="gap-between-item">
                            <h2 className="news-title" onClick={() => handleTitleClick(data.id)}>{data.title}</h2>
                            <a href={data.linkDetail} target="_blank" rel="noopener noreferrer" className="news-link">
                                <img src={data.imageUrl} alt={data.title} className="news-image" />
                            </a>
                            <p className="news-description">{data.description}</p>
                        </div>
                    ))}
                </div>

                {/* Vùng hiển thị nội dung của mục tin tức */}
                {/* {selectedNewsId && (
                    <div className="news-content">
                        {dataList.find((data) => data.id === selectedNewsId)?.content}
                    </div>
                )} */}

                {/* Nút Load More */}
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
