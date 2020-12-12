import Head from 'next/head'
import Design01 from '../components/template/Design01/Design01'
export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main >
        <Design01 />
      </main>

      <footer>

      </footer>
    </div>
  )
}
