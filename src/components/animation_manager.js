import gsap from 'gsap'
import { CustomEase } from 'gsap/dist/CustomEase'
import { MotionPathPlugin } from 'gsap/dist/MotionPathPlugin'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { createContext, useReducer } from 'react'

gsap.registerPlugin(useGSAP)
gsap.registerPlugin(CustomEase)
gsap.registerPlugin(MotionPathPlugin)
gsap.registerPlugin(ScrollTrigger)

export const AnimCtx = createContext({
  // Placeholder values
  setCurrent: (name) => {},
  isComplete: (name) => true,
  isCurrent: (name) => true,
  /**
   * 
   * @param {string} name 
   * @param {gsap.core.Timeline} tl 
   */
  bind: (name, tl) => {},
  current: '',
})

export const AnimManager = ({ children }) => {
  const initialState = {
    current: 'ball',
    completed: 1 ? [] : ['ball', 'logo', 'about', 'particle']
  }
  const [state, setState] = useReducer((state, updates) => ({ ...state, ...updates }), initialState)
  const am = {
    setCurrent(name) {
      setState({ current: name, completed: [...state.completed, state.current] })
    },
    isComplete(name) {
      return state.completed.includes(name)
    },
    isCurrent(name) {
      return state.current === name
    },
    bind(name, tl) {
      if (am.isComplete(name)) {
        tl.progress(1)
      } else if (am.isCurrent(name)) {
        tl.play()
      }
    },
    get current() {
      return state.current
    }
  }

  return (
    <AnimCtx.Provider value={am}>
      {children}
    </AnimCtx.Provider>
  )
}
