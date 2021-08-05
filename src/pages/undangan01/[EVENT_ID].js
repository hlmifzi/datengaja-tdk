import Head from 'next/head'
import Design01 from '../../components/template/Design01/Design01'
import { getBuyerProductsClientName, getInvitations } from '../../client/BuyerProduct'

const Home = ({
  dataBuyerProducts,
  invitations,
  EVENT_ID
}) => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Design01
          data={dataBuyerProducts}
          eventId={EVENT_ID}
          invitations={invitations}
        />
      </main>
    </div>
  )
}


export const getServerSideProps = async ({ params }) => {
  let { EVENT_ID } = params
  const splitParam = EVENT_ID.split("-")
  const { data: dataBuyerProducts } = await getBuyerProductsClientName(splitParam[1], splitParam[3])
  const { data: invitations } = await getInvitations(dataBuyerProducts.id)

  return {
    props: {
      dataBuyerProducts,
      invitations,
      EVENT_ID
    },
  };
}

export default Home
