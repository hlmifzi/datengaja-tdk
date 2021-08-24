
import Head from 'next/head'
import Design01 from '../../components/template/Design01/Design01'
import Design02 from '../../components/template/Design02/Design02'
import { getBuyerProductsClientName, getInvitations } from '../../client/BuyerProduct'
import { getCategoriesByBuyerProductId } from '../../client/InvitationsCategories'
import { parseCookies } from '../../utils/helper/HelperUtils'
import { useRouter } from 'next/router'

const Undangan = ({
  dataBuyerProducts,
  dataInvitationCategory,
  invitations,
  product_id,
  EVENT_ID
}) => {
  const router = useRouter()
  const { design } = router.query
  const productId = design ? design : product_id
  console.log("🚀 ~ file: [EVENT_ID].js ~ line 20 ~ productId", productId)

  return (
    <div>
      <Head>
        <title>Datengaja.id</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {productId === 1 &&
          <Design01
            data={dataBuyerProducts}
            eventId={EVENT_ID}
            invitations={invitations}
            dataInvitationCategory={dataInvitationCategory}
          />
        }
        {productId === 2 &&
          <Design02
            data={dataBuyerProducts}
            eventId={EVENT_ID}
            invitations={invitations}
            dataInvitationCategory={dataInvitationCategory}
          />
        }

      </main>
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
      EVENT_ID: EVENT_ID || null,
      product_id: dataBuyerProducts.product_id
    },
  };
}

export default Undangan
