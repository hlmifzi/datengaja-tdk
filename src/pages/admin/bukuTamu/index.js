import Link from "next/link";

import LayoutAdmin from '../../../components/Layout/LayoutAdmin'
const BukuTamu = () => {

  return (
    <LayoutAdmin mainClassName="bukuTamu">
      <div className="admin_welcomeCards aturUndangan">
        <div className="admin_welcomeContent cards_single">
          <h5>Halo, Selamat datang di halaman <b>BUKU TAMU</b></h5>
          <p>Aduh udah ga zaman lagi pake buku tamu loh! <br /> Halaman ini penggantinya buku tamu yang akan dipakai <b>Hari-H</b> yang dashboardnya nanti bisa di tampilkan di hari H menggunakan monitor kamu</p>
          <div className="admin_welcomeFooter">
            <Link href="/undangan01/pernikahanAwan&Pelangi">
              <a target="_blank">
                <button className="btn-second">Lihat Undangan disini {">"}</button>
              </a>
            </Link>
          </div>
        </div>
      </div>

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
                      <span className="sticker sticker_confirm">
                        Akan Hadir
                      </span>
                    </td>
                    <td>
                      <div className="d-flex">
                        <button className="btn-main px-8 ml-4">Hadir</button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Helmi Fauzi</td>
                    <td>Teman Kuliah Perempuan</td>
                    <td>
                      <span className="sticker sticker_present">
                        Telah Hadir
                      </span>
                    </td>
                    <td>
                      <div className="d-flex">
                        <button className="btn-main px-8 ml-4">Hadir</button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Sulaiman</td>
                    <td>Temen SD laki-laki</td>
                    <td>
                      <span className="sticker sticker_confirm">
                        Akan Hadir
                      </span>
                    </td>
                    <td>
                      <div className="d-flex">
                        <button className="btn-main px-8 ml-4">Hadir</button>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td>Iqbal</td>
                    <td>Temen Mama Perempuan</td>
                    <td>
                      <span className="sticker sticker_confirm">
                        Akan Hadir
                      </span>
                    </td>
                    <td>
                      <div className="d-flex">
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

export default BukuTamu;