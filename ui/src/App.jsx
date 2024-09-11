import { createContext, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
import { UploadZone } from './components/UploadZone';
import { ThemeCard } from './components/ThemeCard';
import './styles/dropzone.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export const GlobalContext = createContext();

export default function App() {
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    return (
        <GlobalContext.Provider value={{ setResult, setLoading, progress, setProgress }}>
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

                {
                    loading ? 
                        <>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box sx={{ width: '100%', mr: 1 }}>
                                    <LinearProgress variant="determinate" value={progress}/>
                                </Box>
                                <Box sx={{ minWidth: 35 }}>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {`${Math.round(progress)}%`}
                                    </Typography>
                                </Box>
                            </Box>

                            <Stack spacing={4} sx={{marginTop: '5rem'}}>
                                <Skeleton variant="rounded" width="100%" height={120} />
                                <Skeleton variant="rounded" width="100%" height={120} />
                                <Skeleton variant="rounded" width="100%" height={120} />
                                <Skeleton variant="rounded" width="100%" height={120} />
                                <Skeleton variant="rounded" width="100%" height={120} />
                                <Skeleton variant="rounded" width="100%" height={120} />
                            </Stack>
                        </>
                    :
                    ''
                }


                <div style={{ marginTop: '32px' }}>
                    {
                        result.length > 0 ?
                        result.map((tema) => (
                            <ThemeCard key={tema.id} themeId={tema.id} 
                            similarity={tema.similaridade} />
                        ))
                        : ''
                    }
                </div>
            </Container>
        </GlobalContext.Provider>
    );
}
