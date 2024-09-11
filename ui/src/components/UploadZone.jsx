import Button from '@mui/material/Button'
import { DropZone } from './DropZone'
import { useContext, useState } from 'react'
import { GlobalContext } from '../App'
import '../styles/uploadzone.css'
import '../styles/inputnumber.css'

export function UploadZone() {
    const [request, setRequest] = useState({
        pdf: null,
        num_tema: null
    })

    const { setResult, setLoading, progress, setProgress } = useContext(GlobalContext)

    const enabled = request.pdf && request.pdf instanceof File &&
                    request.num_tema && Number(request.num_tema) && 
                    request.num_tema > 0

    const getUploadProgress = () => {
        fetch('http://localhost:5000/upload/progress')
        .then(res => res.json())
        .then(json => {
            if(json.progress < 100) {
                setProgress(json.progress)
                setTimeout(() => {
                    getUploadProgress()
                }, 2000)
            }
        })
    }

    const sendRequest = async () => {
        setLoading(true)
        setResult([])
        document.querySelector('#num_tema').value = ''

        const formData = new FormData()
        formData.append('pdf', request.pdf)
        formData.append('num_tema', request.num_tema)

        setRequest({ pdf: null, num_tema: null })

        setTimeout(() => {
            getUploadProgress()
        }, 2000);

        const res = await fetch(`http://localhost:5000/upload`, {
            method: 'POST',
            body: formData
        })

        let result = []
        const json = res.ok ? await res.json() : []

        if(json.hasOwnProperty('result'))
            result = json.result.sort((tema1, tema2) => tema2.similaridade - tema1.similaridade)
        
        setLoading(false)
        setResult(result)
    }

    return (
    <div className='uploadzone'>
        <div className="uploadzone__dropzones">
            <DropZone request={request} setRequest={setRequest} acceptType={{'text/pdf': ['.pdf']}} fileType={'pdf'}/>
        </div>

        <input id="num_tema" type="number" placeholder='Número do tema' 
                className='inputnumber' min='0'
                onKeyUp={e => {
                    const value = e.target.value
                    const _request = {...request}
                    _request.num_tema = value
                    setRequest(_request)
                }}/>

        <Button variant="contained" onClick={sendRequest} disabled={!enabled}>
            enviar
        </Button>
    </div>
    )
}
