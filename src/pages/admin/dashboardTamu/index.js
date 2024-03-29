import LayoutAdmin from '../../../components/Layout/LayoutAdmin'
// import { getAnalytic } from '../../client/AdminApiServices'
import { parseCookies, attendStatus } from '../../../utils/helper/HelperUtils'
import { getAllByBuyerProductId } from '../../../client/Invitations'
import { getAttendStatus } from '../../../client/Dashboard'
import Link from 'next/link'

const dashboardTamu = ({ data, qtyAttendStatus, bridegroom_call_name }) => {

  const totalUndangan = qtyAttendStatus.filter(v => v.attend_status === 'semua')[0]?.jumlah || 0
  const confirm = qtyAttendStatus.filter(v => v.attend_status === 'Akan Hadir')[0]?.jumlah || 0
  const attend = qtyAttendStatus.filter(v => v.attend_status === 'Telah Hadir')[0]?.jumlah || 0

  return (
    <LayoutAdmin mainClassName="dashboardTamu" user={bridegroom_call_name}>
      <div className="cards">
        <Link href="/admin/tamu" as={`/admin/tamu`}>
          <div className="cards_single pointer">
            <div>
              <h1>{totalUndangan}</h1>
              <span>Undangan</span>
            </div>
            <div>
              <span className="las la-users"></span>
            </div>
          </div>
        </Link>
        <Link href="/admin/tamu?attend_status=Akan Hadir" as={`/admin/tamu`}>
          <div className="cards_single pointer">
            <div>
              <h1>{confirm}</h1>
              <span>Bisa Hadir</span>
            </div>
            <div>
              <span className="las la-clipboard"></span>
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
              <span className="las la-shopping-bag"></span>
            </div>
          </div>
        </Link>
      </div>

      <div className="w-100 mt-16">
        <div className="projects">
          <div className="card">
            <div className="card_header">
              <h3>Recent Tamu</h3>
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
                  {data?.length > 0 ?
                    data?.map((v, i) => {
                      return (
                        <tr key={i}>
                          <td>{v.fullname}</td>
                          <td>{v.desc}</td>
                          <td>
                            <div className={`sticker ${attendStatus[v.attend_status]}`}>
                              {v.attend_status}
                            </div>
                          </td>
                          <td>{v.present_time || "Belum Hadir"}</td>
                        </tr>
                      )
                    }) :
                    <tr>
                      <td colSpan={8} className="text-center">
                        <h1>Tidak ada Tamu</h1>
                        <Link href="/admin/tamu/add" as={`/admin/tamu/add`}>
                          <button className="btn-main mt-2">Tambahkan Tamu</button>
                        </Link>
                      </td>
                      <td style={{ display: 'none' }}></td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  )
}

export const getServerSideProps = async ({ req }) => {

  const cookie = parseCookies(req.headers.cookie)

  const { data } = await getAllByBuyerProductId(cookie['buyerProductId'])
  const { data: qtyAttendStatus } = await getAttendStatus(cookie['buyerProductId'])


  return {
    props: {
      data: data || [],
      qtyAttendStatus: qtyAttendStatus || [],
      bridegroom_call_name: cookie['bridegroom_call_name']
    }
  }
}

export default dashboardTamu;