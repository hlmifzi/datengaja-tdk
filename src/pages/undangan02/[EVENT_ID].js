import Head from 'next/head'
import Design02 from '../../components/template/Design02/Design02'
import { getBuyerProductsClientName, getInvitations } from '../../client/BuyerProduct'
import { getCategoriesByBuyerProductId } from '../../client/InvitationsCategories'


const Undangan02 = ({
  dataBuyerProducts,
  dataInvitationCategory,
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
        <Design02
          data={dataBuyerProducts}
          eventId={EVENT_ID}
          invitations={invitations}
          dataInvitationCategory={dataInvitationCategory}
        />
      </main>

      <footer>

      </footer>
    </div>
  )
}


export const getServerSideProps = async ({ params }) => {
  let { EVENT_ID } = params
  const splitParam = EVENT_ID.split("-")
  const { data: dataBuyerProducts } = await getBuyerProductsClientName(splitParam[1], splitParam[3])
  const { data: invitations } = await getInvitations(dataBuyerProducts.id)
  const { data: dataInvitationCategory } = await getCategoriesByBuyerProductId(dataBuyerProducts.id)

  return {
    props: {
      dataBuyerProducts: dataBuyerProducts || [],
      dataInvitationCategory: dataInvitationCategory || [],
      invitations: invitations || [],
      EVENT_ID: EVENT_ID || null
    },
  };
}

export default Undangan02
