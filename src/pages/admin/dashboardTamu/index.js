import Link from "next/link";
import LayoutAdmin from '../../../components/Layout/LayoutAdmin'
// import { getAnalytic } from '../../client/AdminApiServices'

const dashboardTamu = ({ data }) => {

  return (
    <LayoutAdmin mainClassName="dashboardTamu">
      <div className="cards">
        <div className="cards_single">
          <div>
            <h1>{data?.customers || 0}</h1>
            <span>Undangan</span>
          </div>
          <div>
            <span className="las la-users"></span>
          </div>
        </div>
        <div className="cards_single">
          <div>
            <h1>{data?.project || 0}</h1>
            <span>Bisa Hadir</span>
          </div>
          <div>
            <span className="las la-clipboard"></span>
          </div>
        </div>

        <div className="cards_single">
          <div>
            <h1>{data?.orders || 0}</h1>
            <span>Telah Hadir</span>
          </div>
          <div>
            <span className="las la-shopping-bag"></span>
          </div>
        </div>
      </div>

      <div className="recent_grid">
        <div className="projects">
          <div className="card">
            <div className="card_header">
              <h3>Recent Tamu</h3>
              <button> See All <span className="las la-arrow-right">
              </span></button>
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
                  <tr>
                    <td>Affiasca</td>
                    <td>Teman Kuliah Laki-laki</td>
                    <td>
                      <span className="sticker sticker_waiting">
                        Menunggu Konfirmasi
                      </span>
                    </td>
                    <td>11-07-21 16:00</td>

                  </tr>
                  <tr>
                    <td>Helmi Fauzi</td>
                    <td>Teman Kuliah Perempuan</td>
                    <td>
                      <span className="sticker sticker_confirm">
                        Akan Hadir
                      </span>

                    </td>
                    <td>11-07-21 16:00</td>

                  </tr>
                  <tr>
                    <td>Sulaiman</td>
                    <td>Temen SD laki-laki</td>
                    <td>
                      <span className="sticker sticker_cancel">
                        Berhalangan
                      </span>
                    </td>
                    <td>11-07-21 13:00</td>

                  </tr>
                  <tr>
                    <td>Sulaiman</td>
                    <td>Temen SD laki-laki</td>
                    <td>
                      <span className="sticker sticker_present">
                        Telah Hadir
                      </span>
                    </td>
                    <td>11-07-21 16:00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  )
}


// export const getServerSideProps = async () => {

//   const { data } = await getAnalytic()

//   return {
//     props: {
//       data
//     }
//   }
// }


export default dashboardTamu;