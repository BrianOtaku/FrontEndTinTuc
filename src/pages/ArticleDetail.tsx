import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../API/axiosConfig';
import { Container, Row, Col, Button } from 'react-bootstrap';

interface Article {
    title: string;
    description: string;
    content: string;
    urlToImage: string;
}

const ArticleDetail: React.FC = () => {
    const { articleId } = useParams<{ articleId: string }>();
    const [article, setArticle] = useState<Article | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (articleId) {
            fetchArticle(articleId);
        }
    }, [articleId]);

    const fetchArticle = async (id: string) => {
        try {
            const response = await axios.get(`/top-headlines`, {
                params: {
                    country: 'us',
                    pageSize: 10,
                },
            });
            const foundArticle = response.data.articles.find((article: Article) => article.title === id);
            setArticle(foundArticle || null);
        } catch (error) {
            console.error('Error fetching article:', error);
        }
    };

    if (!articleId) {
        return <div>Article ID is required</div>;
    }

    return (
        <Container className="article-detail">
            {article ? (
                <>
                    <Row>
                        <Col xs={12}>
                            <h1>{article.title}</h1>
                            <img src={article.urlToImage} alt={article.title} className="img-fluid" />
                            <p>{article.content}</p>
                            <Button onClick={() => navigate(-1)} className="mt-3">
                                Back
                            </Button>
                        </Col>
                    </Row>
                </>
            ) : (
                <div>
                    <h1>Loading...</h1>
                </div>
            )}
        </Container>
    );
};

export default ArticleDetail;
