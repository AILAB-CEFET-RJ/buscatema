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

    const [extractedText, setExtractedText] = useState({
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

        try {
            const response = await fetch('http://localhost:5000/upload', {
                method: 'POST',
                body: formData
            })
    
            if (response.ok) {
                const data = await response.json()
                console.log(data.message) // Exibe a mensagem do backend no console do navegador
                console.log(data.pdf_text) // Exibe o texto extraído do PDF no console do navegador
                console.log(data.csv_text) // Exibe o texto extraído do CSV no console do navegador
                setInfo(data) // Atualiza o estado com a resposta do backend, se necessário
                setExtractedText({
                    pdf: data.pdf_text,
                    csv: data.csv_text
                }) // Atualiza o estado com o texto extraído do PDF e do CSV
                setFiles({ pdf: '', csv: '' }) // Limpa os arquivos após o envio bem-sucedido
            } else {
                console.error('Erro ao enviar os arquivos:', response.statusText)
                // Trate o erro conforme necessário
            }
        } catch (error) {
            console.error('Erro ao enviar os arquivos:', error)
            // Trate o erro conforme necessário
        }
    }

    const button = filesUploaded >=2 ? 
    <Button variant="contained" onClick={sendFiles}>
        Enviar
    </Button> :
    <Button variant="contained" disabled>
        Arquivos inseridos ({filesUploaded} de 2)
    </Button>

    console.log('Extracted Text PDF:', extractedText.pdf); // Adiciona esta linha para depuração
    console.log('Extracted Text CSV:', extractedText.csv); // Adiciona esta linha para depuração

    return (
    <div className='uploadzone'>
        <div className="uploadzone__dropzones">
            <DropZone files={files} setFiles={setFiles} acceptType={{'application/pdf': ['.pdf']}} fileType={'pdf'}/>
            <DropZone files={files} setFiles={setFiles} acceptType={{'text/csv': ['.csv']}} fileType={'csv'}/>
        </div>

        {button}

        {/* Exibir o texto extraído do PDF */}
        {extractedText.pdf && <div>{extractedText.pdf}</div>}
        
        {/* Exibir o texto extraído do CSV */}
        {extractedText.csv && <div>{extractedText.csv}</div>}
    </div>
    )
}
