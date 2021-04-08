import LayoutAdmin from '../../../components/Layout/LayoutAdmin'
// import { getAnalytic } from '../../client/AdminApiServices'

const BukuTamu = ({ data }) => {

  return (
    <LayoutAdmin mainClassName="bukuTamu">
      <div className="recent_grid">
        <div className="projects">
          <div className="card">
            <div className="card_header">
              <h3>Buku Tamu</h3>
            </div>

            <div className="card_body">
              <table width="100%">
                <thead>
                  <tr>
                    <td>Nama</td>
                    <td>Kategori</td>
                    <td>Status</td>
                    <td>Aksi</td>
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
                    <td>
                      <div className="d-flex">
                        <button className="btn-second px-4">Batal</button>
                        <button className="btn-main px-8 ml-4">Hadir</button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Helmi Fauzi</td>
                    <td>Teman Kuliah Perempuan</td>
                    <td>
                      <span className="status pink"></span>
                        Akan Hadir
                    </td>
                    <td>
                      <div className="d-flex">
                        <button className="btn-second px-4">Batal</button>
                        <button className="btn-main px-8 ml-4">Hadir</button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Sulaiman</td>
                    <td>Temen SD laki-laki</td>
                    <td>
                      <span className="status orange"></span>
                        Akan Hadir
                    </td>
                    <td>
                      <div className="d-flex">
                        <button className="btn-second px-4">Batal</button>
                        <button className="btn-main px-8 ml-4">Hadir</button>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td>Iqbal</td>
                    <td>Temen Mama Perempuan</td>
                    <td>
                      <span className="status purple"></span>
                      Akan Hadir
                    </td>
                    <td>
                      <div className="d-flex">
                        <button className="btn-second px-4">Batal</button>
                        <button className="btn-main px-8 ml-4">Hadir</button>
                      </div>
                    </td>
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


export default BukuTamu;