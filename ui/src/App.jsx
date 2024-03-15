import Container from '@mui/material/Container'
import { DropZone } from './components/DropZone'
import { useState } from 'react'

function App() {
  const [filesUploaded, setFilesUploaded] = useState(0)

  console.log(filesUploaded)

  return (
    <Container oi={filesUploaded} maxWidth='lg' sx={{p: 5}}>
      <DropZone />
    </Container>
  )
}

export default App
