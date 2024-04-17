import Container from '@mui/material/Container'
import { UploadZone } from './components/UploadZone'
import { ThemeCard } from './components/ThemeCard'
import './styles/dropzone.css'
import { createContext, useState } from 'react'

export const InfoContext = createContext()

export default function App() {
    const [info, setInfo] = useState([])

    const setOrderedInfo = (info) => { 
        const orderedInfo = info.sort((a, b) => b.likeliness - a.likeliness)
        setInfo(orderedInfo);
    };

    return (
    <InfoContext.Provider value={setOrderedInfo}>
        <Container maxWidth="lg" sx={{ p: 5 }}>
            <UploadZone/>

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