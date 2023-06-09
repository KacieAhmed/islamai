'use client'
import {
  useState
} from 'react'

export default function Home() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  async function createIndexAndEmbeddings() {
    try {
      const result = await fetch('/api/setup', {
        method: "POST"
      })
      const json = await result.json()
      console.log('result: ', json)
    } catch (err) {
      console.log('err:', err)
    }
  }
  async function sendQuery() {
    if (!query) return
    setResult('')
    setLoading(true)
    try {
      const result = await fetch('/api/read', {
        method: "POST",
        body: JSON.stringify(query)
      })
      const json = await result.json()
      setResult(json.data)
      setLoading(false)
    } catch (err) {
      console.log('err:', err)
      setLoading(false)
    }
  }
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <input className='text-black px-2 py-1' onChange={e => setQuery(e.target.value)} />
      <button className="px-7 py-1 rounded-2xl bg-white text-black mt-2 mb-2" onClick={sendQuery}>Ask Sheikh AI</button>
      {
        loading && <p>Asking AI ...</p>
      }
      {
        result && <p>{result}</p>
      }
      { /* consider removing this button from the UI once the embeddings are created ... */}
      <button onClick={createIndexAndEmbeddings}>Create index and embeddings</button>
      <div>
 
  <br />
  
</div>

      <p>Whitepaper: https://docs.google.com/document/d/1gcflM4p6w42e6KbxmaOddnKedhewJ3GzVTw-_ZjiNK4/edit?usp=sharing </p>
      <a>Made by:</a><a href="https://www.twitter.com/Haezurath" target="_blank" style={{ textDecoration: 'underline', color: 'blue' }}>Kacie Ahmed</a>



      
    </main>
  )
}
