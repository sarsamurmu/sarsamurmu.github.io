import coverImg from '/assets/cover_image.png'
import faviconImg from '/assets/favicon.png'

export const MetaHead = () => {
  const description = `Sarsa's website`
  const siteName = 'Sarsa Murmu'
  const canonical = 'https://sarsamurmu.github.io'
  const brandImage = coverImg.src
  const favicon = faviconImg.src

  return (
    <>
      <title>{siteName}</title>
      <meta http-equiv='Content-Type' content='text/html; charset=UTF-8' />
      <meta name='mobile-web-app-capable' content='yes' />
      <meta name='viewport' content='width=device-width, initial-scale=1, minimum-scale=1' />
      <meta name='description' content={description} />
      <meta name='author' content='Sarsa Murmu' />
      <meta name='keywords' content='sarsamurmu, portfolio' />
      <meta property='og:site_name' content={siteName} />

      <meta property='og:type' content='portfolio' />
      <meta property='og:url' content={canonical} />
      <meta property='og:image' content={brandImage} />
      <meta property='og:description' content={description} />
      <meta property='og:site_name' content={siteName} />
      <meta property='og:locale' content='en_US' />
      <link rel='canonical' href={canonical} />

      <meta name='twitter:card' content='summary' />
      <meta name='twitter:creator' content='@sarsamurmu' />
      <meta name='twitter:site' content='@sarsamurmu' />
      <meta name='twitter:title' content={siteName} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image:src' content={brandImage} />

      <link rel='shortcut icon' href={favicon} />
      <link rel='apple-touch-icon' href={favicon} />
      <link rel='apple-touch-icon' sizes='192x192' href={favicon} />
      <link rel='apple-touch-icon-precomposed' href={favicon} />
      <meta name='msapplication-TileImage' content={favicon} />
      <link rel='icon' href={favicon} sizes='192x192' type='image/png' />
    </>
  )
}
