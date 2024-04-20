import Container from '@mui/material/Container'
import { UploadZone } from './components/UploadZone'
import { ThemeCard } from './components/ThemeCard'
import './styles/dropzone.css'
import { createContext, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export const InfoContext = createContext()

export default function App() {
    const [info, setInfo] = useState([])

    const setOrderedInfo = (info) => { 
        const orderedInfo = info.sort((a, b) => b.likeliness - a.likeliness)
        setInfo(orderedInfo);
    };

    return (
    <InfoContext.Provider value={setOrderedInfo}>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                FindTema
                </Typography>
            </Toolbar>
        </AppBar>

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