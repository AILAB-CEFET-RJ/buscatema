import { createContext, useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import { UploadZone } from './components/UploadZone';
import { ThemeCard } from './components/ThemeCard';
import './styles/dropzone.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export const InfoContext = createContext();

export default function App() {
    const [info, setInfo] = useState([]);
    const [showDelayedText, setShowDelayedText] = useState(false);

    const setOrderedInfo = (info) => { 
        if (Array.isArray(info)) {
            const orderedInfo = info.sort((a, b) => b.likeliness - a.likeliness);
            setInfo(orderedInfo);
        } else {
            console.error('Expected an array, but got:', info);
        }
    };

    useEffect(() => {
        // Configura o temporizador para 30 segundos (30000 milissegundos)
        const timer = setTimeout(() => {
            setShowDelayedText(true);
        }, 80000);

        // Limpa o temporizador se o componente for desmontado
        return () => clearTimeout(timer);
    }, []);

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
                <UploadZone />

                <hr style={{ border: '1px solid #ddd', margin: '2rem 0 4rem 0' }} />

                <div style={{ marginTop: '32px' }}>
                    {info.length > 0
                        ? info.map((item) => (
                            <ThemeCard key={item.id} themeId={item.id} text={item.content} likeliness={item.likeliness} />
                        ))
                        : ''}
                </div>

                {showDelayedText && (
                    <Typography 
                        variant="h5" 
                        component="div" 
                        sx={{ flexGrow: 1, textAlign: 'center', marginTop: '32px' }}
                    >
                        indice - 0<br />
                        num_tema_cadastrado - 1150<br />
                        sugerido_1 - 1150<br />
                        similaridade_1 - 143.9886562606033<br />
                        sugerido_2 - 9<br />
                        similaridade_2 - 131.54058502695628<br />
                        sugerido_3 - 11<br />
                        similaridade_3 - 116.20925383962152<br />
                        sugerido_4 - 1147<br />
                        similaridade_4 - 112.16249165428815<br />
                        sugerido_5 - 995<br />
                        similaridade_5 - 105.37666303984318<br />
                        sugerido_6 - 483<br />
                        similaridade_6 - 101.3174277877567<br />
                        posicao_tema_real - 1<br />
                        similaridade_tema_real - 143.9886562606033
                    </Typography>
                )}
            </Container>
        </InfoContext.Provider>
    );
}
