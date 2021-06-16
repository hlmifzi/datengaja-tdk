import { useState } from 'react'

import Link from "next/link";

import LayoutAdmin from '../../../components/Layout/LayoutAdmin'
const BukuTamu = () => {
  const [state, setstate] = useState(false)
  const [hadir, setHadir] = useState("Akan Hadir")
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
                  <tr>
                    <td>Affiasca</td>
                    <td>Teman Kuliah Laki-laki</td>
                    <td>
                      <span className="sticker sticker_present">
                        Telah Hadir
                      </span>
                    </td>
                    <td>11-07-21 17:43</td>
                    <td>
                      <div className="d-flex">
                        <button className="btn-main px-8 ml-4 disabled">Hadir</button>
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
                    <td>11-07-21 16:00</td>
                    <td>
                      <div className="d-flex">
                        <button className="btn-main px-8 ml-4 disabled">Hadir</button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>Sulaiman</td>
                    <td>Temen SD laki-laki</td>
                    <td>
                      <span className={`${hadir === "akan hadir" ? "sticker_confirm" : "sticker_present  "} sticker`} >
                        {hadir}
                      </span>
                    </td>
                    <td>-</td>
                    <td>
                      <div className="d-flex" onClick={() => {
                        setstate(true)
                        setHadir("Telah Hadir")
                      }
                      }>
                        <button className={`${hadir === "Akan Hadir" ? "" : "disabled"} btn-main px-8 ml-4`}>Hadir</button>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td>Iqbal</td>
                    <td>Temen Mama Perempuan</td>
                    <td>
                      <span className="sticker sticker_present">
                        Telah Hadir
                      </span>
                    </td>
                    <td>11-07-21 16:00</td>
                    <td>
                      <div className="d-flex">
                        <button className="btn-main px-8 ml-4 disabled">Hadir</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {state &&
        <div className="popUp">
          <div className="popUp_background"></div>
          <div className="popUp_container d-flex flex-column">
            <i onClick={() => setstate(false)}>Tutup [x]</i>
            <div className="d-flex justify-content-center">
              <h3 className="text-center">Status Tamu Undangan Berhasil diubah menjadi <b>Hadir</b></h3>
            </div>
            <button onClick={() => setstate(false)} type="button" className="mt-4 btn btn-main">Kembali</button>
          </div>
        </div>
      }
    </LayoutAdmin>
  )
}

export default BukuTamu;