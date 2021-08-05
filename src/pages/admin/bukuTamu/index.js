import { getBuyerProductsClientName } from '../../../client/BuyerProduct'
import { parseCookies, attendStatus } from '../../../utils/helper/HelperUtils'
import { getAllByBuyerProductId } from '../../../client/Invitations'
import Link from "next/link";
import LayoutAdmin from '../../../components/Layout/LayoutAdmin'
import router from "next/router"
import absoluteUrl from 'next-absolute-url'

const BukuTamu = ({
  data
}) => {
  return (
    <LayoutAdmin mainClassName="bukuTamu">
      <div className="admin_welcomeCards aturUndangan">
        <div className="admin_welcomeContent cards_single">
          <h5>Halo, Selamat datang di halaman <b>BUKU TAMU</b></h5>
          <p>Aduh udah ga zaman lagi pake buku tamu loh! <br /> Halaman ini penggantinya buku tamu yang akan dipakai <b>Hari-H</b> yang dashboardnya nanti bisa di tampilkan di hari H menggunakan monitor kamu</p>
          <div className="admin_welcomeFooter">
            <Link href={`/undangan01/pernikahan-${data?.bridegroom_call_name}-dan-${data?.bride_call_name}`}>
              <a target="_blank">
                <button className="btn-second">Lihat disini {">"}</button>
              </a>
            </Link>
          </div>
        </div>
      </div>

      <div className="w-100">
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
                    <td>Waktu</td>
                    <td>Aksi</td>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ?
                    data.map((v, i) => {
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
                          <td>
                            <button
                              className="btn-blue px-4"
                              onClick={() => router.push(`/admin/tamu/add/?id=${v.id}`)}
                            >
                              Ubah
                            </button>
                            <br />
                          </td>
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
      </div>


    </LayoutAdmin>
  )
}

export const getServerSideProps = async ({ req }) => {

  const cookie = parseCookies(req.headers.cookie)

  const { data } = await getAllByBuyerProductId(cookie['buyerProductId'])
  const { origin: hostname } = absoluteUrl(req)

  const { data: dataBuyerProduct } = await getBuyerProductsClientName(cookie['bridegroom_call_name'].trim() || "helmi", cookie['bride_call_name'].trim() || "jannah")


  return {
    props: {
      data: data || null,
      hostname,
      dataBuyerProduct,
      bridegroom_call_name: cookie['bridegroom_call_name'],
      bride_call_name: cookie['bride_call_name'],
    }
  }
}

export default BukuTamu;