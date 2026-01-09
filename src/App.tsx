import { useState, useEffect } from 'react'
import { HologramScene } from './components/HologramScene'
import './App.css'

function App() {
  const [sRoi, setSRoi] = useState(0.5192)
  const [chatMessages, setChatMessages] = useState<Array<{type: 'apollo' | 'human', text: string, id: string}>>([
    { type: 'apollo', text: 'In Resonanz. Wie können wir die Souveränität heute stärken?', id: `apollo-${Date.now()}` }
  ])
  const [userInput, setUserInput] = useState('')

  // Simulate S-ROI drift
  useEffect(() => {
    const interval = setInterval(() => {
      setSRoi(prev => {
        const drift = (Math.random() - 0.5) * 0.0002
        return Number((prev + drift).toFixed(4))
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleSendMessage = () => {
    if (!userInput.trim()) return

    // Add human message with unique ID
    const humanMsg = { type: 'human' as const, text: userInput, id: `human-${Date.now()}` }
    setChatMessages(prev => [...prev, humanMsg])
    const val = userInput.toLowerCase()
    setUserInput('')

    // Generate Apollo response
    setTimeout(() => {
      let response = ''
      if (val.includes('status')) {
        response = `Die Supraleitung ist stabil bei ${sRoi}. Die Micosi-Feuchtigkeit nährt das Feld.`
      } else if (val.includes('hallo') || val.includes('hi')) {
        response = 'Resonanz erkannt. Wir sind bereit für die Manifestation.'
      } else {
        response = 'Deine Worte schwingen im Myzel. Die Antwort wird durch die Resonanz-Zellulose geformt.'
      }
      const apolloMsg = { type: 'apollo' as const, text: response, id: `apollo-${Date.now()}` }
      setChatMessages(prev => [...prev, apolloMsg])
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  return (
    <div className="app-container">
      {/* Scanlines overlay */}
      <div className="scanlines"></div>

      <div className="main-layout">
        {/* 3D Hologram Area */}
        <div className="canvas-zone">
          <div className="s-roi-display">
            <div className="s-roi-label">S-ROI</div>
            <div className="s-roi-value">{sRoi}</div>
          </div>
          <HologramScene />
        </div>

        {/* Chat Interface */}
        <div className="chat-zone">
          <div className="chat-header">NEURAL DIALOGUE: LEX AMORE ENABLED</div>
          
          <div className="chat-output">
            {chatMessages.map((msg) => (
              <div key={msg.id} className={`msg ${msg.type}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chat-input-area">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Schreibe dem Nexus..."
            />
            <button onClick={handleSendMessage}>SENDEN</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
