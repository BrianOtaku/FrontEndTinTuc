import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { searchNews } from '../API/apiNews';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';

interface Data {
    id: number;
    title: string;
    linkDetail: string;
    imageUrl: string;
    description: string;
    content: string;
}

const SearchResults: React.FC = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query') || '';
    const [results, setResults] = useState<Data[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true);
            try {
                const data = await searchNews(query);
                setResults(data);
            } catch (error) {
                console.error('Error fetching search results:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [query]);



    return (
        <div>
            <h2 className='search-results-sentence'>
                <FontAwesomeIcon icon={faArrowCircleRight} />  Kết quả tìm kiếm cho: "{query}"
            </h2>
            <Container className="home">
                {loading ? (
                    <p>Loading...</p>
                ) : results.length === 0 ? (
                    <p>Không tìm thấy kết quả nào.</p>
                ) : (
                    <div className="news-list">
                        {results.map((result) => (
                            <div key={result.id} className="gap-between-item">
                                <div className="news-item" onClick={() => window.location.href = `/News/${result.id}`}>
                                    <h2 className='news-title'>{result.title}</h2>
                                    <a href={result.linkDetail} target="_blank" rel="noopener noreferrer">
                                        <img src={result.imageUrl} alt={result.title} className='news-image' />
                                    </a>
                                    <p className='news-description'>{result.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </div>
    );
};

export default SearchResults;
