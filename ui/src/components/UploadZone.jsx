import Button from '@mui/material/Button'
import { DropZone } from './DropZone'
import { useContext, useState } from 'react'
import { InfoContext } from '../App'
import '../styles/uploadzone.css'

export function UploadZone() {
    const [files, setFiles] = useState({
        pdf: '',
        csv: ''
    })

    const setInfo = useContext(InfoContext)

    const filesUploaded = Object.values(files).reduce((prev, curr) => {
        return prev + (curr instanceof File ? 1 : 0)
    }, 0)

    const sendFiles = async () => {
        const formData = new FormData()
        formData.append('pdf', files.pdf)
        formData.append('csv', files.csv)

        const digit = Math.floor(Math.random() * 5)
        const res = await fetch(`http://localhost:4000/res${digit}`)
        
        setInfo(res.ok ? await res.json() : [])
        setFiles({ pdf: '', csv: '' })
    }

    const button = filesUploaded >=2 ? 
    <Button variant="contained" onClick={sendFiles}>
        Enviar
    </Button> :
    <Button variant="contained" disabled>
        Arquivos inseridos ({filesUploaded} de 2)
    </Button>

    return (
    <div className='uploadzone'>
        <div className="uploadzone__dropzones">
            <DropZone files={files} setFiles={setFiles} acceptType={{'application/pdf': ['.pdf']}} fileType={'pdf'}/>
            <DropZone files={files} setFiles={setFiles} acceptType={{'text/csv': ['.csv']}} fileType={'csv'}/>
        </div>

        {button}
    </div>
    )
}