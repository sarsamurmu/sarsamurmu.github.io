import Head from 'next/head';
import Script from 'next/script'
import { NameLogo, WelcomeText, BallAnimation, Leaves, About, Connect, GoodBye } from '@/components/animated_parts';
import s from '@/styles/home.module.scss'
import { BGText } from '@/components/bg_text';
import { AnimManager } from '@/components/animation_manager'
import { ScrollProgress } from '@/components/scroll_progress'
import { MetaHead } from '@/components/meta_head'

export default function Home() {
  return (
    <>
      <MetaHead />
      <Head>
        <style>{`
          body, html {
            background-color: #1a1a1a;
          }
        `}</style>
      </Head>

      <Script
        defer
        data-cf-beacon='{"token": "7fe33cbce8de46c7b6774063f5212122"}'
        src='https://static.cloudflareinsights.com/beacon.min.js' />

      <AnimManager>
        <BGText />
        <ScrollProgress />
        <main style={{ /* display: 'none' */ }}>
          <BallAnimation />
          <div className={s.container}>
            <div style={{
              display: 'flex',
              flexDirection: 'column'
            }}>
              <WelcomeText />
              <NameLogo />
            </div>
            <div className={s.content}>
              <About />
              <Connect />
              <GoodBye />
            </div>
          </div>
        </main>
        <Leaves />
      </AnimManager>
    </>
  );
}
