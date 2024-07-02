import dividerDesktop from './assets/images/pattern-divider-desktop.svg'
import dividerMobile from './assets/images/pattern-divider-mobile.svg'
import dice from './assets/images/icon-dice.svg'
import { useState, useEffect } from 'react'

function App () {
  const [widthWindow, setWidthWindow] = useState(window.innerWidth)
  const [advice, setAdvice] = useState()
  const [idAdvice, setIdAdvice] = useState(1)

  const API_ADVICE = `https://api.adviceslip.com/advice/${idAdvice}`

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max)
  }

  const changeAdvice = () => {
    setIdAdvice(getRandomInt(100))
    console.log(idAdvice)
  }

  useEffect(() => {
    const handleResize = () => {
      setWidthWindow(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    fetch(API_ADVICE)
      .then(response => response.json())
      .then(data => {
        setAdvice(data.slip)
      })
  }, [API_ADVICE])

  return (
    <main>
      <h1>Advice #{advice && advice.id}</h1>
      <h2>
        "{advice && advice.advice}"
      </h2>
      <img
        id='separador'
        src={widthWindow <= 480 ? dividerMobile : dividerDesktop}
        alt='divider'
      />
      <button onClick={changeAdvice}>
        <img src={dice} alt='dice' />
      </button>
    </main>
  )
}

export default App
