import { useState } from 'react'
import axios from 'axios'

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState('')
  const [shortenedUrl, setShortenedUrl] = useState('')
  const [error, setError] = useState('')
  const [isTemporary, setIsTemporary] = useState(false)
  const [temporaryHoursInput, setTemporaryHoursInput] = useState(1)
  const [temporaryHoursDisplay, setTemporaryHoursDisplay] = useState(1)
  const [isIpLimited, setIsIpLimited] = useState(false)
  const [ipLimitCountInput, setIpLimitCountInput] = useState(1)
  const [ipLimitCountDisplay, setIpLimitCountDisplay] = useState(1)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setShortenedUrl('')

    try {
      const payload = { url: originalUrl }
      if (isTemporary) {
        payload.temporaryHours = temporaryHoursInput
        payload.isTemporary = isTemporary
        setTemporaryHoursDisplay(temporaryHoursInput)
      }
      if (isIpLimited) {
        payload.ipLimitCount = ipLimitCountInput
        payload.isIpLimited = isIpLimited
        setIpLimitCountDisplay(ipLimitCountInput)
      }
      const response = await axios.post('/api/shorten', payload)
      setShortenedUrl(response.data.shortUrl)
    } catch (err) {
      setError('Não foi possível encurtar a URL. Por favor, tente novamente.')
      console.error('Erro ao encurtar URL:', err)
    }
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Encurtador de URL</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="url"
          placeholder="Cole sua URL aqui"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          style={{ padding: '10px', borderRadius: '3px', border: '1px solid #ddd' }}
          required
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <input
            type="checkbox"
            id="temporary"
            checked={isTemporary}
            onChange={(e) => setIsTemporary(e.target.checked)}
          />
          <label htmlFor="temporary" style={{ fontSize: '0.9em' }}>Link temporário</label>
          {isTemporary && (
            <input
              type="number"
              id="temporaryHours"
              value={temporaryHoursInput}
              onChange={(e) => setTemporaryHoursInput(parseInt(e.target.value))}
              min="1"
              max="72"
              style={{ width: '60px', padding: '5px', borderRadius: '3px', border: '1px solid #ddd', marginLeft: '10px' }}
            />
          )}
          {isTemporary && <label htmlFor="temporaryHours" style={{ fontSize: '0.9em', marginLeft: '5px' }}>horas</label>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <input
            type="checkbox"
            id="ipLimited"
            checked={isIpLimited}
            onChange={(e) => setIsIpLimited(e.target.checked)}
          />
          <label htmlFor="ipLimited" style={{ fontSize: '0.9em' }}>Limitar acesso por IP</label>
          {isIpLimited && (
            <input
              type="number"
              id="ipLimitCount"
              value={ipLimitCountInput}
              onChange={(e) => setIpLimitCountInput(parseInt(e.target.value))}
              min="1"
              max="10"
              style={{ width: '60px', padding: '5px', borderRadius: '3px', border: '1px solid #ddd', marginLeft: '10px' }}
            />
          )}
          {isIpLimited && <label htmlFor="ipLimitCount" style={{ fontSize: '0.9em', marginLeft: '5px' }}>IPs</label>}
        </div>
        <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Encurtar</button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      {shortenedUrl && (
        <div style={{ marginTop: '20px', border: '1px solid #eee', padding: '15px', borderRadius: '3px', backgroundColor: '#f9f9f9' }}>
          <p><strong>URL Encurtada:</strong></p>
          <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">{shortenedUrl}</a>
          {isTemporary && <p style={{ color: 'orange', fontSize: '0.9em', marginTop: '5px' }}>Este é um link temporário, válido por {temporaryHoursDisplay} horas.</p>}
          {isIpLimited && <p style={{ color: 'purple', fontSize: '0.9em', marginTop: '5px' }}>Este link tem acesso limitado a {ipLimitCountDisplay} IPs.</p>}
        </div>
      )}
    </div>
  )
}