import Container from '@mui/material/Container'
import { DropZone } from './components/DropZone'
import { ThemeCard } from './components/ThemeCard'
import { useState } from 'react'

function App() {
  const [info, setInfo] = useState([]);

  return (
    <Container maxWidth="lg" sx={{ p: 5 }}>
      <DropZone setInfo={setInfo} />

      <div style={{ marginTop: '32px' }}>
        {info.length > 0
          ? info.map((item) => <ThemeCard key={item.id} themeId={item.id} text={item.content}/>)
          : ''}
      </div>
    </Container>
  )
}

export default App
