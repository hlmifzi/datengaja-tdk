import Head from 'next/head'
import Design01 from '../../components/template/Design01/Design01'

const Home = ({
  EVENT_ID
}) => {
  
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Design01 />
      </main>

      <footer>

      </footer>
    </div>
  )
}


export const getServerSideProps = async ({ params }) => {
  let { EVENT_ID } = params
  return {
    props: { EVENT_ID },
  };
}

export default Home
