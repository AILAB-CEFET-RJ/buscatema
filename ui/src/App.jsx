import Container from '@mui/material/Container'
import { UploadZone } from './components/UploadZone'
import { ThemeCard } from './components/ThemeCard'
import './styles/dropzone.css'
import { createContext, useState, useEffect } from 'react'

export const InfoContext = createContext()

export default function App() {
    const [info, setInfo] = useState([]);

    const fetchInfoFromBackend = async (formData) => {
        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setOrderedInfo(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleFileUpload = (pdfFile, csvFile) => {
        const formData = new FormData();
        formData.append('pdf', pdfFile);
        formData.append('csv', csvFile);
        fetchInfoFromBackend(formData);
    };

    useEffect(() => {
        fetchInfoFromBackend();
    }, []); 

    const setOrderedInfo = (info) => {
        if (Array.isArray(info)) {
            const orderedInfo = info.sort((a, b) => b.likeliness - a.likeliness)
            setInfo(orderedInfo);
        } else {
            console.error('Data received from backend is not an array');
        }
    };

    return (
    <InfoContext.Provider value={setOrderedInfo}>
        <Container maxWidth="lg" sx={{ p: 5 }}>
            <UploadZone onFileUpload={handleFileUpload} />

            <hr style={{border: '1px solid #ddd', margin: '2rem 0 4rem 0'}}/>

            <div style={{ marginTop: '32px' }}>
                {info.length > 0
                ? info.map((item) => <ThemeCard key={item.id} themeId={item.id} text={item.content} likeliness={item.likeliness}/>)
                : ''}
            </div>
        </Container>
    </InfoContext.Provider>
    )
}
