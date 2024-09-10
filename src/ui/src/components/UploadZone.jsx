import Button from '@mui/material/Button'
import { DropZone } from './DropZone'
import { useContext, useState } from 'react'
import { InfoContext } from '../App'
import '../styles/uploadzone.css'

export function UploadZone() {
    const [files, setFiles] = useState({
        csv1: '',  // Alterado para 'csv1'
        csv2: ''   // Alterado para 'csv2'
    })

    const setInfo = useContext(InfoContext)

    const filesUploaded = Object.values(files).reduce((prev, curr) => {
        return prev + (curr instanceof File ? 1 : 0)
    }, 0)

    const sendFiles = async () => {
        const formData = new FormData()
        formData.append('csv1', files.csv1)  // Usando a chave 'csv1'
        formData.append('csv2', files.csv2)  // Usando a chave 'csv2'

        const res = await fetch(`http://localhost:5000/upload`, {
            method: 'POST',
            body: formData
        })
        
        setInfo(res.ok ? await res.json() : [])
        setFiles({ csv1: '', csv2: '' })  // Resetando para as novas chaves
    }

    const button = filesUploaded >= 2 ? 
    <Button variant="contained" onClick={sendFiles}>
        enviar
    </Button> :
    <Button variant="contained" disabled>
        Arquivos inseridos ({filesUploaded} de 2)
    </Button>

    return (
    <div className='uploadzone'>
        <div className="uploadzone__dropzones">
            <DropZone files={files} setFiles={setFiles} acceptType={{'text/csv': ['.csv']}} fileType={'csv1'}/>  {/* Alterado para 'csv1' */}
            <DropZone files={files} setFiles={setFiles} acceptType={{'text/csv': ['.csv']}} fileType={'csv2'}/>  {/* Alterado para 'csv2' */}
        </div>

        {button}
    </div>
    )
}
