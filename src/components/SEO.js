import Head from 'next/head'

const SEO = ({
  title = "The Wedding of Jannah &amp; Helmi",
  description = "28 Januari 2023",
  keywords,
  image = "https://ibb.co/XLJybQw",
  url = "http://datengaja.online/undangan/pernikahan-Helmi-dan-Jannah",
  hideFromSearchEngine,
  children
}) => (
  <Head>
    	<meta charset="utf-8" />	
			<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		  <meta property="og:type" content="article" /> 
		
    {hideFromSearchEngine && (
      <meta name="robots" content="noindex, nofollow"></meta>
    )}
    {title && (
      <>
        <title>{title}</title>
        <meta property="og:title" content={title} key="ogtitle" />
        <meta property="twitter:title" content={title} key="twittertitle" ></meta>
      </>
    )}
    {description && (
      <>
        <meta name="description" content={description}></meta>
        <meta property="og:description" content={description} key="ogdescription" />
        <meta property="twitter:description" content={description} key="twitterdescription"></meta>
      </>
    )}
    {image && (
      <>
        <meta property="og:image" content={image} key="ogimage" />
        <meta property="twitter:image" content={image} key="twitterimage" />
        <meta property="twitter:card" content="summary" />
      </>
    )}
    {url && (
      <>
        <meta property="og:url" content={url} key="ogurl" />
        <meta property="twitter:url" content={url} key="twitterurl" />
      </>
    )}
    {keywords && <meta name="keyword" content={keywords}></meta>}
    <link rel="manifest" href="/manifest.json" />
		
    {children}
  </Head>
);

export default SEO;
