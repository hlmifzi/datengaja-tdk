import Link from "next/link";
import LayoutAdmin from '../../components/Layout/LayoutAdmin'
// import { getAnalytic } from '../../client/AdminApiServices'

const Admin = ({ data }) => {

  return (
    <LayoutAdmin mainClassName="admin">
      <div className="admin_welcomeCards">
        <div className="admin_welcomeContent cards_single">
          <h5>Halo, Helmi Fauzi</h5>
          <p>Undanganmu kamu sudah jadi loh, kamu bisa mengatur dan melihat undanganmu sekarang!</p>
          <div className="admin_welcomeFooter">
            <Link href="/undangan01/pernikahanAwan&Pelangi">
              <a target="_blank">
                <button className="btn-second">Lihat disini {">"}</button>
              </a>
            </Link>
            <Link href="/admin/aturUndangan" as={`/admin/aturUndangan`}>
              <button className="btn-second ml-2">Edit disini {">"}</button>
            </Link>
          </div>
        </div>
        <div className="cards_single">
          <div>
            <h1>{data?.customers || 0}</h1>
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
        <div className="cards_single">
          <div>
            <h1>{data?.customers || 0}</h1>
            <span>Bisa Hadir</span>
          </div>
          <div>
            <span className="las la-users"></span>
          </div>
        </div>
        <div className="cards_single">
          <div>
            <h1>{data?.income || 0}</h1>
            <span>Telah Hadir</span>
          </div>
          <div>
            <span className="lab la-google-wallet"></span>
          </div>
        </div>
        <div className="cards_single">
          <div>
            <h1>{data?.project || 0}</h1>
            <span>Berhalangan</span>
          </div>
          <div>
            <span className="las la-clipboard"></span>
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
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Affiasca</td>
                    <td>Teman Kuliah Laki-laki</td>
                    <td>
                      <span className="status purple"></span>
                                                    Akan Hadir
                    </td>
                  </tr>
                  <tr>
                    <td>Helmi Fauzi</td>
                    <td>Teman Kuliah Perempuan</td>
                    <td>
                      <span className="status pink"></span>
                        Berhalangan
                    </td>
                  </tr>
                  <tr>
                    <td>Sulaiman</td>
                    <td>Temen SD laki-laki</td>
                    <td>
                      <span className="status orange"></span>
                        Telah Hadir
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="customers">
          <div className="card">
            <div className="card_header">
              <h3>Kategori Tamu</h3>
              <button> See All <span className="las la-arrow-right">
              </span></button>
            </div>

            <div className="card_body">
              <div className="customer">
                <div className="info">
                  <div>
                    <h4>Teman Kuliah Laki-laki</h4>
                  </div>
                </div>
                <div className="contact">
                  19
                </div>
              </div>
              <div className="customer">
                <div className="info">
                  <div>
                    <h4>Teman Kuliah Perempuan</h4>
                  </div>
                </div>
                <div className="contact">
                  40
                </div>
              </div>
              <div className="customer">
                <div className="info">
                  <div>
                    <h4>Temen SD laki-laki</h4>
                  </div>
                </div>
                <div className="contact">
                  5
                </div>
              </div>
              <div className="customer">
                <div className="info">
                  <div>
                    <h4>Teman Nongkrong Laki-laki</h4>
                  </div>
                </div>
                <div className="contact">
                  2
                </div>
              </div>
              <div className="customer">
                <div className="info">
                  <div>
                    <h4>Teman Mama Perempuan</h4>
                  </div>
                </div>
                <div className="contact">
                  <div>
                    50
                  </div>
                </div>
              </div>
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


export default Admin;