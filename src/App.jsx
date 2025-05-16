import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MapPage from './components/MapPage'

function App() {
  const [count, setCount] = useState(0)
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [installPrompt, setInstallPrompt] = useState(null)
  const [showMap, setShowMap] = useState(false)
  
  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setIsOnline(navigator.onLine)
    }
    
    window.addEventListener('online', handleOnlineStatusChange)
    window.addEventListener('offline', handleOnlineStatusChange)
    
    // Capture install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      setInstallPrompt(e)
    })
    
    return () => {
      window.removeEventListener('online', handleOnlineStatusChange)
      window.removeEventListener('offline', handleOnlineStatusChange)
    }
  }, [])
  
  const handleInstallClick = async () => {
    if (!installPrompt) return
    
    installPrompt.prompt()
    const choiceResult = await installPrompt.userChoice
    
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt')
    } else {
      console.log('User dismissed the install prompt')
    }
    
    setInstallPrompt(null)
  }
  
  // Handle navigation to map page
  const handleMapClick = () => {
    setShowMap(true)
  }
  
  // Handle going back to home
  const handleBackToHome = () => {
    setShowMap(false)
  }

  return (
    <>
      {showMap ? (
        <MapPage onBack={handleBackToHome} />
      ) : (
        <div className="app-container">
          <header>
            <div className="logos">
              <a href="https://vite.dev" target="_blank">
                <img src={viteLogo} className="logo" alt="Vite logo" />
              </a>
              <a href="https://react.dev" target="_blank">
                <img src={reactLogo} className="logo react" alt="React logo" />
              </a>
            </div>
            <h1>Progressive Web App Demo</h1>
            <div className={`connection-status ${isOnline ? 'online' : 'offline'}`}>
              {isOnline ? 'Online 🟢' : 'Offline 🔴'}
            </div>
          </header>
          
          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              Count is {count}
            </button>
            
            <button className="map-button" onClick={handleMapClick}>
              Open Map
            </button>
            
            {installPrompt ? (
              <button className="install-button" onClick={handleInstallClick}>
                Install App
              </button>
            ) : (
              <div className="install-instructions">
                <p>To install this app:</p>
                <ul>
                  <li>On Chrome/Edge: Look for the install icon in the address bar</li>
                  <li>On iOS: Tap the share icon and select "Add to Home Screen"</li>
                  <li>On Android: Tap the menu and select "Add to Home Screen"</li>
                </ul>
              </div>
            )}
            
            <div className="pwa-features">
              <h2>PWA Features:</h2>
              <ul>
                <li>✓ Works offline</li>
                <li>✓ Installable</li>
                <li>✓ App-like experience</li>
                <li>✓ Push notifications (configurable)</li>
                <li>✓ Map functionality</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default App
