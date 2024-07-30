import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { fetchNews, updateNews } from '../API/apiNews';
import Aside from './Aside';

interface Data {
    id: number;
    title: string;
    content: string;
}

const Home: React.FC = () => {
    const [dataList, setDataList] = useState<Data[]>([]);
    const [editingData, setEditingData] = useState<Data | null>(null);

    useEffect(() => {
        const getData = async () => {
            const data = await fetchNews();
            setDataList(data);
            if (data.length > 0) {
                setEditingData(data[0]);
            }
        };

        getData();
    }, []);

    const handleUpdate = async () => {
        if (editingData && editingData.id) {
            const updatedData = await updateNews(editingData.id, editingData);
            setDataList(dataList.map(d => (d.id === updatedData.id ? updatedData : d)));
        }
    };

    return (
        <Container className="home">
            <div className='homeandaside'>
                <h1>News Data</h1>

                {/* Form để hiển thị và chỉnh sửa dữ liệu */}
                {editingData && (
                    <div>
                        <input
                            type="text"
                            placeholder="Title"
                            value={editingData.title}
                            onChange={(e) => setEditingData({ ...editingData, title: e.target.value })}
                        />
                        <textarea
                            placeholder="Content"
                            value={editingData.content}
                            onChange={(e) => setEditingData({ ...editingData, content: e.target.value })}
                        ></textarea>
                        <button onClick={handleUpdate}>Update</button>
                    </div>
                )}

                {/* Danh sách dữ liệu */}
                <ul>
                    {dataList.map((data) => (
                        <li key={data.id}>
                            <h2>{data.title}</h2>
                            <p>{data.content}</p>
                            <button onClick={() => setEditingData(data)}>Edit</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='side-content'>
                <Aside />
            </div>
        </Container>
    );
};

export default Home;
