import Link from "next/link";
import LayoutAdmin from '../../components/Layout/LayoutAdmin'
import { getBuyerProductsClientName } from '../../client/BuyerProduct'
import { parseCookies, attendStatus } from '../../utils/helper/HelperUtils'
import { getAttendStatus } from '../../client/Dashboard'
import { getAllByBuyerProductId } from '../../client/Invitations'
import { getCategoriesByBuyerProductIdQty } from '../../client/InvitationsCategories'


const Admin = ({
  data,
  invitations,
  category,
  qtyAttendStatus
}) => {

  const totalUndangan = qtyAttendStatus.filter(v => v.attend_status === 'semua')[0]?.jumlah || 0
  const confirm = qtyAttendStatus.filter(v => v.attend_status === 'Akan Hadir')[0]?.jumlah || 0
  const attend = qtyAttendStatus.filter(v => v.attend_status === 'Telah Hadir')[0]?.jumlah || 0
  const cancel = qtyAttendStatus.filter(v => v.attend_status === 'Berhalangan')[0]?.jumlah || 0

  return (
    <LayoutAdmin mainClassName="admin" user={data?.bridegroom_call_name}>
      <div className="admin_welcomeCards">
        <div className="admin_welcomeContent cards_single">
          <h5>Halo, Helmi Fauzi</h5>
          <p>Undanganmu sudah jadi loh, kamu bisa mengatur dan melihat undanganmu sekarang!</p>
          <div className="admin_welcomeFooter">
            <Link href={`/undangan0${data?.product_id}/pernikahan-${data?.bridegroom_call_name}-dan-${data?.bride_call_name}`}>
              <a target="_blank">
                <button className="btn-second">Lihat disini {">"}</button>
              </a>
            </Link>
            <Link href="/admin/aturUndangan" as={`/admin/aturUndangan`}>
              <button className="btn-second ml-2">Edit disini {">"}</button>
            </Link>
          </div>
        </div>
        <div className="cards_single pointer">
          <div>
            <h1>{totalUndangan}</h1>
            <span>Undangan</span>
            <Link href="/admin/tamu" as={`/admin/tamu`}>
              <button className="btn-main mt-2">Atur Tamu</button>
            </Link>
          </div>
          <div>
            <span className="las la-users"></span>
          </div>
        </div>
      </div>

      <div className="cards">
        <Link href="/admin/tamu?attend_status=Akan Hadir" as={`/admin/tamu`}>
          <div className="cards_single pointer">
            <div>
              <h1>{confirm}</h1>
              <span>Bisa Hadir</span>
            </div>
            <div>
              <span className="las la-users"></span>
            </div>
          </div>
        </Link>
        <Link href="/admin/tamu?attend_status=Telah Hadir" as={`/admin/tamu?attend_status=Telah Hadir`}>
          <div className="cards_single pointer">
            <div>
              <h1>{attend}</h1>
              <span>Telah Hadir</span>
            </div>
            <div>
              <span className="lab la-google-wallet"></span>
            </div>
          </div>
        </Link>

        <Link href="/admin/tamu?attend_status=Berhalangan" as={`/admin/tamu?attend_status=Berhalangan`}>
          <div className="cards_single pointer">
            <div>
              <h1>{cancel}</h1>
              <span>Berhalangan</span>
            </div>
            <div>
              <span className="las la-clipboard"></span>
            </div>
          </div>
        </Link>
      </div>

      <div className="recent_grid">
        <div className="projects">
          <div className="card">
            <div className="card_header">
              <h3>Recent Tamu</h3>
              <Link href="/admin/tamu" as={`/admin/tamu`}>
                <button> See All <span className="las la-arrow-right">
                </span></button>
              </Link>
            </div>
            <div className="card_body">
              <table width="100%">
                <thead>
                  <tr>
                    <td>Nama</td>
                    <td>Kategori</td>
                    <td>Status</td>
                    <td>Waktu</td>
                  </tr>
                </thead>
                <tbody>
                  {invitations.length > 0 ?
                    invitations.map((v, i) => {
                      if (i < 6)
                        return (
                          <tr key={i}>
                            <td>{v.fullname}</td>
                            <td>{v.desc}</td>
                            <td>
                              <div className={`sticker ${attendStatus[v.attend_status]}`}>
                                {v.attend_status}
                              </div>
                            </td>
                            <td>{v.present_time}</td>
                          </tr>
                        )
                    }) :
                    <tr>
                      <td colSpan={8} className="text-center">
                        <h1>Tidak ada data</h1>
                      </td>
                      <td style={{ display: 'none' }}></td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="customers">
          <div className="card">
            <div className="card_header">
              <h3>Kategori Tamu</h3>
            </div>
            <div className="card_body">
              {category.length > 0 ? category?.map((v, i) => {
                return (
                  <div key={i} className="customer">
                    <div className="info">
                      <div>
                        <h4>{v.desc}</h4>
                      </div>
                    </div>
                    <div className="contact">
                      {v.jumlah}
                    </div>
                  </div>
                )
              }) :
                <div>Tidak Ada Kategory</div>}
            </div>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  )
}

export const getServerSideProps = async ({ req }) => {

  const cookie = parseCookies(req.headers.cookie)

  const { data } = await getBuyerProductsClientName(cookie['bridegroom_call_name'] || "helmi", cookie['bride_call_name'] || "jannah")
  const { data: invitations } = await getAllByBuyerProductId(cookie['buyerProductId'])
  const { data: category } = await getCategoriesByBuyerProductIdQty(cookie['buyerProductId'])
  const { data: qtyAttendStatus } = await getAttendStatus(cookie['buyerProductId'])

  return {
    props: {
      data: data || null,
      invitations: invitations || null,
      category: category || [],
      qtyAttendStatus: qtyAttendStatus || null
    }
  }
}


export default Admin;