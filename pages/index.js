import styles from '../styles/Home.module.css'
import {useState, useEffect, useRef} from "react"
import Image from 'next/image'
import desktopSep from "../assets/images/pattern-divider-desktop.svg"




export default function Home() {
  const [changer, setChange] = useState(false)
  const [advice, setAdvice] = useState({"slip": { "id": "", "advice": ""}})
  const refAdvice = useRef()


  const changeAdvice = () => refAdvice.current.classList.toggle("change")

  async function getAdvice(){
    try{
      changeAdvice()
      const response = await fetch("https://api.adviceslip.com/advice")
      const data = await response.json()
      setAdvice(data)
      setTimeout(changeAdvice, 1500)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    getAdvice()
  },[])

  useEffect(() => {
    getAdvice()
  },[changer])


  return (
    <main className={styles.container}>
      <h4>advice #{advice.slip.id}</h4>
      <p className={styles.advice} ref={refAdvice}>{advice.slip.advice}</p>
      <aside className={styles.bar}>
        <Image src={desktopSep} alt="alr" />
      </aside>
      <figure className={styles.dice} onClick={() => setChange(!changer)}>
      <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M20 0H4a4.005 4.005 0 0 0-4 4v16a4.005 4.005 0 0 0 4 4h16a4.005 4.005 0 0 0 4-4V4a4.005 4.005 0 0 0-4-4ZM7.5 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" fill="#202733"/></svg>
      </figure>
    </main>
  )
}
