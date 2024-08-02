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
    const [currentItems, setCurrentItems] = useState<Data[]>([]);
    const [itemsPerPage] = useState<number>(10);
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        const getData = async () => {
            const data = await fetchNews();
            setDataList(data);
            setCurrentItems(data.slice(0, itemsPerPage)); // Chỉ hiển thị 10 mục đầu tiên
        };

        getData();
    }, [itemsPerPage]);

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

        // Chỉ lấy dữ liệu từ dataList và không tải lại từ API
        setCurrentItems(dataList.slice(0, endIndex));
        setPage(nextPage);
    };

    return (
        <Container className="home">

            {/* Danh sách dữ liệu */}
            <div className="homeandaside">
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

            {/* Thẻ aside */}
            <div className="side-content">
                <Aside />
            </div>

        </Container>
    );
};

export default Home;
