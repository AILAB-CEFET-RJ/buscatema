import './styles/App.css'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'

function App() {
  return (
    <Container maxWidth='lg' sx={{p: 5}}>
      <p>BuscaTema - Projeto e Construção de Sistemas</p>
      <Button variant="contained">consultar</Button>  
    </Container>
  )
}

export default App
