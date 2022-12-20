
import Head from 'next/head'
import Design01 from '../../components/template/Design01/Design01'
import Design02 from '../../components/template/Design02/Design02'
import { getBuyerProductsClientName, getInvitations } from '../../client/BuyerProduct'
import { getCategoriesByBuyerProductId } from '../../client/InvitationsCategories'
import { useRouter } from 'next/router'

const Undangan = ({
  dataBuyerProducts,
  dataInvitationCategory,
  invitations,
  product_id,
  EVENT_ID,
  invitationCategoryId
}) => {
  const router = useRouter()
  const productId = Number(router.query.design) ? Number(router.query.design) : product_id;

  return (
    <div>
      <Head>
        <title>Datengaja.id</title>
        <link rel="icon" href="../../resources/logo.png" />
      </Head>

      <main>
        {productId === 1 &&
          <Design01
            data={dataBuyerProducts}
            eventId={EVENT_ID}
            invitations={invitations}
            dataInvitationCategory={dataInvitationCategory}
            invitationCategoryId={invitationCategoryId}
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


export const getServerSideProps = async ({ params, query }) => {
  let { EVENT_ID } = params
  const guest = query?.kepada
  const splitParam = EVENT_ID.split("-")

  const { data: dataBuyerProducts } = await getBuyerProductsClientName(splitParam[1], splitParam[3])
  const { data: categoryID } = await getInvitations(dataBuyerProducts.id, {
    params: {
      invitation_name: guest
    },
  })
  const { data: invitations } = await getInvitations(dataBuyerProducts.id, {
    params: {
      category_id: categoryID?.[0]?.invitation_category_id
    },
  })
  const { data: dataInvitationCategory } = await getCategoriesByBuyerProductId(dataBuyerProducts.id)

  return {
    props: {
      dataBuyerProducts: dataBuyerProducts || [],
      dataInvitationCategory: dataInvitationCategory || [],
      invitations: invitations || [],
      EVENT_ID: EVENT_ID || null,
      product_id: dataBuyerProducts.product_id || null,
      invitationCategoryId: categoryID?.[0]?.invitation_category_id || null,
    },
  };
}

export default Undangan
