import React from 'react'
import { useDropzone } from 'react-dropzone'
import '../styles/dropzone.css'

export function DropZone({ request, setRequest, acceptType, fileType }) {
    const onDrop = async (acceptedRequest, fileRejections) => {
        if(acceptedRequest.length > 0) {
            let _request = {...request}
            _request[fileType] = acceptedRequest[0]

            setRequest(_request)
        }
    }

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: acceptType, 
        multiple: false, 
        disabled: Boolean(request[fileType]), 
        onDrop
    })
    
    const dinamicStyle = request[fileType] ? 
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
        request[fileType] ?
        <p><strong>{request[fileType].name}</strong></p> :
        isDragActive ?
            <p>Solte o {fileType} aqui...</p> :
            <p>Arraste o <strong>{fileType}</strong> até aqui ou <span className='dropzone__clique'>clique para selecionar</span></p>
        }
    </div>
    )
}