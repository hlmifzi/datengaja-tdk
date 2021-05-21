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
              <Link href="/admin/tamu/add">
                <button> + Tambah</button>
              </Link>
            </div>

            <div className="card_body">
              <table width="100%">
                <thead>
                  <tr>
                    <td>Nama</td>
                    <td>Kategori</td>
                    <td>Nomor telepon</td>
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
                      <Link href="https://api.whatsapp.com/send?phone=6281294923207&text=Hallo%Affiasca%0AKami%20Yang%20berbahagia%20mengundang%affiasca%20untuk%20menghadiri%20acara%20resepsi%20pernikahakn%20kami%20pada%20%0A%0Ahari%2Ftanggal%3A%20sabtu%2C%2023%20Oktober%202024%0Atempat%3A%20auditorium%20Bina%20Nusantara%0Apukul%3A%2016%3A00-%2019%3A00%0A%0Aanda%20dapat%20konfirmasi%20di%20%0Ahttps%3A%2F%2Fwww.datengaja.id%2Fundangan01%2FpernikahanAwan%26Pelangi%3Fkepada%affiasca%0Atak%20ada%20kesan%20tanpa%20kehadiranmu">
                        <a className="w-100" target="_blank">
                          <button className="btn-second px-4">Bagikan Undangan</button>
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
                      <Link href="https://api.whatsapp.com/send?phone=6281294923207&text=Hallo%Helmi%0AKami%20Yang%20berbahagia%20mengundang%Helmi%20untuk%20menghadiri%20acara%20resepsi%20pernikahakn%20kami%20pada%20%0A%0Ahari%2Ftanggal%3A%20sabtu%2C%2023%20Oktober%202024%0Atempat%3A%20auditorium%20Bina%20Nusantara%0Apukul%3A%2016%3A00-%2019%3A00%0A%0Aanda%20dapat%20konfirmasi%20di%20%0Ahttps%3A%2F%2Fwww.datengaja.id%2Fundangan01%2FpernikahanAwan%26Pelangi%3Fkepada%Helmi%0Atak%20ada%20kesan%20tanpa%20kehadiranmu">
                        <a className="w-100" target="_blank">
                          <button className="btn-second px-4">Bagikan Undangan</button>
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
                      <Link href="https://api.whatsapp.com/send?phone=6281294923207&text=Hallo%Sulaiman%0AKami%20Yang%20berbahagia%20mengundang%Sulaiman%20untuk%20menghadiri%20acara%20resepsi%20pernikahakn%20kami%20pada%20%0A%0Ahari%2Ftanggal%3A%20sabtu%2C%2023%20Oktober%202024%0Atempat%3A%20auditorium%20Bina%20Nusantara%0Apukul%3A%2016%3A00-%2019%3A00%0A%0Aanda%20dapat%20konfirmasi%20di%20%0Ahttps%3A%2F%2Fwww.datengaja.id%2Fundangan01%2FpernikahanAwan%26Pelangi%3Fkepada%Sulaiman%0Atak%20ada%20kesan%20tanpa%20kehadiranmu">
                        <a className="w-100" target="_blank">
                          <button className="btn-second px-4">Bagikan Undangan</button>
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
                      <Link href="https://api.whatsapp.com/send?phone=6281294923207&text=Hallo%Iqbal%0AKami%20Yang%20berbahagia%20mengundang%Iqbal%20untuk%20menghadiri%20acara%20resepsi%20pernikahakn%20kami%20pada%20%0A%0Ahari%2Ftanggal%3A%20sabtu%2C%2023%20Oktober%202024%0Atempat%3A%20auditorium%20Bina%20Nusantara%0Apukul%3A%2016%3A00-%2019%3A00%0A%0Aanda%20dapat%20konfirmasi%20di%20%0Ahttps%3A%2F%2Fwww.datengaja.id%2Fundangan01%2FpernikahanAwan%26Pelangi%3Fkepada%Iqbal%0Atak%20ada%20kesan%20tanpa%20kehadiranmu">
                        <a className="w-100" target="_blank">
                          <button className="btn-second px-4">Bagikan Undangan</button>
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