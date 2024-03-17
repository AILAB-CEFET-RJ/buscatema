import React from 'react'
import { useDropzone } from 'react-dropzone'
import pdfImg from '../images/pdf-upload.png'
import '../styles/dropzone.css'

export function DropZone(props) {
    const onDrop = async (acceptedFiles, fileRejections) => {
        if(acceptedFiles.length > 0) {
            const information = await sendPdf(acceptedFiles[0])
            props.setInfo(information)
        }
    }

    const sendPdf = async (file) => {
        const digit = Math.floor(Math.random() * 5)
        const res = await fetch(`http://localhost:4000/res${digit}`)

        return res.ok ? await res.json() : []
    }

    const {getRootProps, getInputProps, isDragActive} = useDropzone({accept: {'application/pdf': ['.pdf']}, multiple: false, onDrop})
    
    const dragStyle = {
        border: `2px dashed ${isDragActive ? '#3385ff' : '#555'}`,
        backgroundColor: isDragActive ? '#3385ff17' : '#fff'
    }

    return (
    <div className='dropzone' style={dragStyle} {...getRootProps()}>
        <input {...getInputProps()} />
        <img className='dropzone__pdf_img' src={pdfImg} alt="ícone de um arquivo pdf" />
        {
        isDragActive ?
            <p>Solte o pdf aqui...</p> :
            <p>Arraste o pdf até aqui ou <span className='dropzone__clique'>clique para selecionar</span></p>
        }
    </div>
    )
}