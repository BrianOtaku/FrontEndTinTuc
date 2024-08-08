import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { fetchNews } from '../API/apiNews';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Aside from './Aside';

interface Data {
    id: number;
    title: string;
    linkDetail: string;
    imageUrl: string | null;
    description: string;
    content: string;
}

const Home: React.FC = () => {
    const [dataList, setDataList] = useState<Data[]>([]);
    const [currentItems, setCurrentItems] = useState<Data[]>([]);
    const [itemsPerPage] = useState<number>(10);
    const [page, setPage] = useState<number>(1);
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            const data = await fetchNews();
            setDataList(data);
            setCurrentItems(data.slice(0, itemsPerPage)); // Chỉ hiển thị 10 mục đầu tiên
        };

        getData();
    }, [itemsPerPage]);

    const loadMore = () => {
        const nextPage = page + 1;
        const startIndex = (nextPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        // Chỉ lấy dữ liệu từ dataList và không tải lại từ API
        setCurrentItems(dataList.slice(0, endIndex));
        setPage(nextPage);
    };

    const handleItemClick = (id: number) => {
        navigate(`/news/${id}`);
    };

    return (
        <Container className="home">
            <div className="homeandaside">
                <h1>
                    <FontAwesomeIcon icon={faNewspaper} aria-hidden="true" style={{ marginRight: '10px' }} />
                    Tin tức mới gần đây:
                </h1>
                <div className="news-list">
                    {currentItems.map((data) => {
                        // Kiểm tra nếu imageUrl không phải là null và bắt đầu bằng "data:"
                        const imageUrl = data.imageUrl && data.imageUrl.startsWith('data:')
                            ? 'https://via.placeholder.com/175' // URL của hình ảnh mặc định
                            : data.imageUrl || 'https://via.placeholder.com/175'; // Hình ảnh mặc định nếu imageUrl là null

                        return (
                            <div key={data.id} className="gap-between-item">
                                <img src={imageUrl} alt={data.title} className="news-image" />
                                <div onClick={() => handleItemClick(data.id)}>
                                    <h2 className="news-title">{data.title}</h2>
                                    <p className="news-description">{data.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

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
