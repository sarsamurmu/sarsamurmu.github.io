import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export const ScrollProgress = () => {
  const ref = useRef()
  useEffect(() => {
    const listener = () => {
      let percent =
        window.scrollY / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100
      percent = Math.round(percent * 100) / 100
      gsap.to(ref.current, { height: `${percent}%`, overwrite: true })
    }
    window.addEventListener('scroll', listener)

    return () => window.removeEventListener('scroll', listener)
  })

  return (
    <div ref={ref} style={{
      position: 'fixed',
      right: 0,
      top: 0,
      width: 5,
      height: 0,
      background: '#0006ff6e',
      zIndex: 2,
      borderRadius: '0 0 100px 100px'
    }} />
  )
}
