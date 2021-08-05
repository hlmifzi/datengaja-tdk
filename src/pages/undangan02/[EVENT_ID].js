import Head from 'next/head'
import Design from '../../components/template/Design02/Design02'

const Design02 = ({
  EVENT_ID
}) => {

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Design />
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

export default Design02
