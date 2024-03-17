import Container from '@mui/material/Container'
import { DropZone } from './components/DropZone'
import { useState } from 'react'

function App() {
  const [info, setInfo] = useState([])

  return (
    <Container maxWidth='lg' sx={{p: 5}}>
      <DropZone setInfo={setInfo}/>

      <code style={{margin: '2rem', textAlign: 'center', display: 'block'}}>
        {
          info.length > 0 ? 
          info.map(item => <p>{`{ titulo: ${item.titulo} }`}</p>) :
          '[]'
        }  
      </code>
    </Container>
  )
}

export default App
