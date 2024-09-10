import React from 'react'
import { useDropzone } from 'react-dropzone'
import pdfImg from '../images/pdf-upload.png'
import '../styles/dropzone.css'

export function DropZone({ files, setFiles, acceptType, fileType }) {
    const onDrop = async (acceptedFiles, fileRejections) => {
        if(acceptedFiles.length > 0) {
            let _files = {...files}
            _files[fileType] = acceptedFiles[0]

            setFiles(_files)
        }
    }

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: acceptType, 
        multiple: false, 
        disabled: Boolean(files[fileType]), 
        onDrop
    })
    
    const dinamicStyle = files[fileType] ? 
    {
        border: `2px solid #555`,
        backgroundColor: '#fff' 
    } :
    {
        border: `2px dashed ${isDragActive ? '#3385ff' : '#555'}`,
        backgroundColor: isDragActive ? '#3385ff17' : '#fff'
    }

    return (
    <div className='dropzone' style={dinamicStyle} {...getRootProps()}>
        <input {...getInputProps()} />
        {
        files[fileType] ?
        <p><strong>{files[fileType].name}</strong></p> :
        isDragActive ?
            <p>Solte o {fileType} aqui...</p> :
            <p>Arraste o <strong>{fileType}</strong> até aqui ou <span className='dropzone__clique'>clique para selecionar</span></p>
        }
    </div>
    )
}