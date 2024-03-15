import React from 'react'
import { useDropzone } from 'react-dropzone'
import pdfImg from '../images/pdf-upload.png'
import '../styles/dropzone.css'

export function DropZone(props) {
    const onDrop = (acceptedFiles, fileRejections) => {
        if(acceptedFiles.length > 0) {
            console.log(props.oi)
        }
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
            <p>Arraste o pdf até aqui ou <span style={{textDecoration: 'underline', cursor: 'pointer'}}>clique para selecionar</span></p>
        }
    </div>
    )
}