import s from '@/styles/home.module.scss'
import Image from 'next/image';
import fight_fill from '/assets/fight_fill.svg'
import fight_outline from '/assets/fight_outline.svg'

export const BGText = () => {
  const len = 20
  const base = {
    'aria-hidden': 'true',
    loading: 'eager',
    alt: '',
    priority: true
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden'
    }}>
      <div className={s.bgContainer}>
        {Array(len).fill(0).map((_, idx) => <Image src={fight_outline} {...base} key={'prev_'+idx} />)}
        <Image src={fight_fill} {...base} key='main' />
        {Array(len).fill(0).map((_, idx) => <Image src={fight_outline} {...base} key={'next_' + idx} />)}
      </div>
      <div className={s.grid} />
      <div className={s.smallGrid} />
    </div>
  )
}
