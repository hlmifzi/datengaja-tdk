import Link from "next/link";
import LayoutAdmin from '../../../components/Layout/LayoutAdmin'
// import { getAnalytic } from '../../client/AdminApiServices'

const Tamu = ({ data }) => {

  return (
    <LayoutAdmin mainClassName="tamu">
      <div className="admin_welcomeCards aturUndangan">
        <div className="admin_welcomeContent cards_single">
          <h5>Halo, Selamat datang di halaman <b>ATUR TAMU</b></h5>
          <p>Di halaman ini kamu dapat mengatur tamu yang akan diundang dan membagikannya</p>
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
              <h3>Tamu</h3>
              <div>
                <Link href="/admin/tamu/add">
                  <button> + Tambah</button>
                </Link>
                <a href="/report_tamu.xlsx" target="_blank" download>
                  <button className="btn-green ml-2"> Export Excel</button>
                </a>
              </div>
            </div>

            <div className="card_body">
              <table width="100%">
                <thead>
                  <tr>
                    <td>Nama</td>
                    <td>Kategori</td>
                    <td>Nomor telepon</td>
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
                      081281332312
                    </td>
                    <td>
                      <span className="sticker sticker_present">
                        Telah Hadir
                      </span>
                    </td>
                    <td>11-07-21 16:00</td>
                    <td>
                      <Link href="https://api.whatsapp.com/send?phone=6281294923207&text=Hallo%20Affiasca%0AKami%20Yang%20berbahagia%20mengundang%20bapak%2Fibu%20untuk%20menghadiri%20acara%20resepsi%20pernikahakn%20kami%20pada%20%0A%0Ahari%2Ftanggal%3A%20sabtu%2C%2023%20Oktober%202024%0Atempat%3A%20auditorium%20Bina%20Nusantara%0Apukul%3A%2016%3A00-%2019%3A00%20WIB%0A%0AMohon%20dapat%20konfirmasi%20di%20%0Ahttps%3A%2F%2Fwww.datengaja.id%2Fundangan01%2FpernikahanAwan%26Pelangi%3Fkepada%3DAffiasca%0Atak%20ada%20kesan%20tanpa%20kehadiranmu" >
                        <a className="w-100" target="_blank">
                          <button className="btn-second px-4">Bagikan ke WA</button>
                        </a>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>Helmi Fauzi</td>
                    <td>Teman Kuliah Perempuan</td>
                    <td>
                      081281332312
                    </td>
                    <td>
                      <span className="sticker sticker_confirm">
                        Akan Hadir
                      </span>
                    </td>
                    <td>-</td>
                    <td>
                      <Link href="https://api.whatsapp.com/send?phone=6281294923207&text=Hallo%20Helmi%0AKami%20Yang%20berbahagia%20mengundang%20bapak%2Fibu%20untuk%20menghadiri%20acara%20resepsi%20pernikahakn%20kami%20pada%20%0A%0Ahari%2Ftanggal%3A%20sabtu%2C%2023%20Oktober%202024%0Atempat%3A%20auditorium%20Bina%20Nusantara%0Apukul%3A%2016%3A00-%2019%3A00%20WIB%0A%0AMohon%20dapat%20konfirmasi%20di%20%0Ahttps%3A%2F%2Fwww.datengaja.id%2Fundangan01%2FpernikahanAwan%26Pelangi%3Fkepada%3DHelmi%0Atak%20ada%20kesan%20tanpa%20kehadiranmu" >
                        <a className="w-100" target="_blank">
                          <button className="btn-second px-4">Bagikan ke WA</button>
                        </a>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td>Sulaiman</td>
                    <td>Temen SD laki-laki</td>
                    <td>
                      081281332312
                    </td>
                    <td>
                      <span className="sticker sticker_confirm">
                        Akan Hadir
                      </span>
                    </td>
                    <td>-</td>
                    <td>
                      <Link href="https://api.whatsapp.com/send?phone=6281294923207&text=Hallo%20Sulaiman%0AKami%20Yang%20berbahagia%20mengundang%20bapak%2Fibu%20untuk%20menghadiri%20acara%20resepsi%20pernikahakn%20kami%20pada%20%0A%0Ahari%2Ftanggal%3A%20sabtu%2C%2023%20Oktober%202024%0Atempat%3A%20auditorium%20Bina%20Nusantara%0Apukul%3A%2016%3A00-%2019%3A00%20WIB%0A%0AMohon%20dapat%20konfirmasi%20di%20%0Ahttps%3A%2F%2Fwww.datengaja.id%2Fundangan01%2FpernikahanAwan%26Pelangi%3Fkepada%3DSulaiman%0Atak%20ada%20kesan%20tanpa%20kehadiranmu" >
                        <a className="w-100" target="_blank">
                          <button className="btn-second px-4">Bagikan ke WA</button>
                        </a>
                      </Link>
                    </td>
                  </tr>

                  <tr>
                    <td>Iqbal</td>
                    <td>Temen Mama Perempuan</td>
                    <td>
                      081281332312
                    </td>
                    <td>
                      <span className="sticker sticker_present">
                        Telah Hadir
                      </span>
                    </td>
                    <td>11-07-21 16:00</td>
                    <td>
                      <Link href="https://api.whatsapp.com/send?phone=6281294923207&text=Hallo%20Iqbal%0AKami%20Yang%20berbahagia%20mengundang%20bapak%2Fibu%20untuk%20menghadiri%20acara%20resepsi%20pernikahakn%20kami%20pada%20%0A%0Ahari%2Ftanggal%3A%20sabtu%2C%2023%20Oktober%202024%0Atempat%3A%20auditorium%20Bina%20Nusantara%0Apukul%3A%2016%3A00-%2019%3A00%20WIB%0A%0AMohon%20dapat%20konfirmasi%20di%20%0Ahttps%3A%2F%2Fwww.datengaja.id%2Fundangan01%2FpernikahanAwan%26Pelangi%3Fkepada%3DIqbal%0Atak%20ada%20kesan%20tanpa%20kehadiranmu" >
                        <a className="w-100" target="_blank">
                          <button className="btn-second px-4">Bagikan ke WA</button>
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


export default Tamu;