import { useState } from 'react'
import Link from "next/link";
import LayoutAdmin from '../../../components/Layout/LayoutAdmin'
// import { getAnalytic } from '../../client/AdminApiServices'

const Laporan = ({ data }) => {
  const [value, onChange] = useState(new Date());

  return (
    <LayoutAdmin mainClassName="dashboardTamu">
      <div className="w-100 mb-8">
        <div className="projects">
          <div className="card">
            <div className="card_header">
              <h3>Filter</h3>

            </div>
            <div className="card_bodyFilter">
              <div>
                <label>Dari</label>
                <input type="date" />
              </div>
              <div>
                <label>Sampai</label>
                <input type="date" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-100">
        <div className="projects">
          <div className="card">
            <div className="card_header">
              <h3>Customer</h3>
              <div>
                <a href="/report_penjualan.xlsx" target="_blank" download>
                  <button className="btn-green ml-2"> Export Excel</button>
                </a>
              </div>
            </div>

            <div className="card_body">
              <table width="100%">
                <thead>
                  <tr>
                    <td>Nama</td>
                    <td>email</td>
                    <td>Nomor telepon</td>
                    <td>Total Harga</td>
                    <td>Status</td>
                    <td>married date</td>
                    <td>Aksi</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Affiasca</td>
                    <td>affiasca@gmail.com</td>
                    <td>
                      081281332312
                    </td>
                    <td>Gratis</td>
                    <td>
                      <span className="sticker sticker_present">
                        lunas
                      </span>
                    </td>
                    <td>11-09-21 16:00</td>
                    <td>
                      <Link href="/admin">
                        <a className="w-100" target="_blank">
                          <button className="btn-second px-4">Atur</button>
                        </a>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>Helmi Fauzi</td>
                    <td>helmi@happy5.co</td>
                    <td>
                      081281332312
                    </td>
                    <td>Gratis</td>
                    <td>
                      <span className="sticker sticker_present">
                        lunas
                      </span>
                    </td>
                    <td>11-15-21 20:00</td>
                    <td>
                      <Link href="/admin">
                        <a className="w-100" target="_blank">
                          <button className="btn-second px-4">Atur</button>
                        </a>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>Sulaiman</td>
                    <td>Sulaiman@gmail.com</td>
                    <td>
                      081281332312
                    </td>
                    <td>Gratis</td>
                    <td>
                      <span className="sticker sticker_present">
                        lunas
                      </span>
                    </td>
                    <td>11-11-21 20:00</td>
                    <td>
                      <Link href="/admin">
                        <a className="w-100" target="_blank">
                          <button className="btn-second px-4">Atur</button>
                        </a>
                      </Link>
                    </td>
                  </tr>

                  <tr>
                    <td>Iqbal</td>
                    <td>Iqbal@gmail.com</td>
                    <td>
                      081281332312
                    </td>
                    <td>Gratis</td>
                    <td>
                      <span className="sticker sticker_present">
                        lunas
                      </span>
                    </td>
                    <td>11-07-21 16:00</td>
                    <td>
                      <Link href="/admin">
                        <a className="w-100" target="_blank">
                          <button className="btn-second px-4">Atur</button>
                        </a>
                      </Link>
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


export default Laporan;