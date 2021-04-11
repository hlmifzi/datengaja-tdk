import Link from "next/link";
import LayoutAdmin from '../../../components/Layout/LayoutAdmin'
// import { getAnalytic } from '../../client/AdminApiServices'

const Tamu = ({ data }) => {

  return (
    <LayoutAdmin mainClassName="tamu">
      <div className="admin_welcomeCards aturUndangan">
        <div className="admin_welcomeContent cards_single">
          <h5>Halo, Selamat datang di halaman <b>ATUR UNDANGAN</b></h5>
          <p>Di halaman ini kamu dapat mengatur content undangan kamu</p>
          <div className="admin_welcomeFooter">
            <Link href="/undangan01/pernikahanAwan&Pelangi">
              <a target="_blank">
                <button className="btn-second">Lihat Undangan disini {">"}</button>
              </a>
            </Link>
          </div>
        </div>
      </div>

      <section className="createInvitation_container container">
        <div className="box-main">
          <div className="createInvitation_title">
            <h4>Content Utama</h4>
          </div>
          <div className="createInvitation_content">
            <div class="mb-3">
              <label htmlFor="exampleFormControlInput1" class="form-label">Foto Cover</label>
              <input type="file" class="form-control" id="exampleFormControlInput1" placeholder="Nama Mempelai Laki-Laki" />
            </div>
            <div class="mb-3">
              <label htmlFor="exampleFormControlInput1" class="form-label">Backsound Lagu</label>
              <input type="file" class="form-control" id="exampleFormControlInput1" placeholder="Nama Mempelai Laki-Laki" />
            </div>
          </div>
        </div>
      </section>

      <section className="createInvitation_container container">
        <div className="box-main">
          <div className="createInvitation_title">
            <h4>Background image</h4>
          </div>
          <div className="createInvitation_content">
            <div class="mb-3">
              <label htmlFor="exampleFormControlInput1" class="form-label">Background section cover</label>
              <input type="file" class="form-control" id="exampleFormControlInput1" placeholder="Nama Mempelai Laki-Laki" />
            </div>
            <div class="mb-3">
              <label htmlFor="exampleFormControlInput1" class="form-label">Background Save the Date</label>
              <input type="file" class="form-control" id="exampleFormControlInput1" placeholder="Nama Mempelai Laki-Laki" />
            </div>
          </div>
        </div>
      </section>


      <section className="createInvitation_container container">
        <div className="box-main">
          <div className="createInvitation_title">
            <h4>Mempelai Pria</h4>
          </div>
          <div className="createInvitation_content">
            <div class="mb-3">
              <label htmlFor="exampleFormControlInput1" class="form-label">Foto</label>
              <input type="file" class="form-control" id="exampleFormControlInput1" placeholder="Foto Mempelai Laki-Laki" />
            </div>
            <div class="mb-3">
              <label htmlFor="exampleFormControlInput1" class="form-label">Nama</label>
              <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Nama Mempelai Laki-Laki" />
            </div>


            <div class="mb-3">
              <label htmlFor="exampleFormControlInput1" class="form-label">Nama Panggilan</label>
              <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Nama Panggilan Mempelai Laki-laki" />
            </div>

            <div class="mb-3">
              <label htmlFor="exampleFormControlInput1" class="form-label">Ayah</label>
              <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Nama Ayah  Mempelai Laki-Laki" />
            </div>

            <div class="mb-3">
              <label htmlFor="exampleFormControlInput1" class="form-label">Ibu</label>
              <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Nama Ibu  Mempelai Laki-Laki" />
            </div>
          </div>
        </div>
      </section>

      <section className="createInvitation_container container">

        <div className="box-main">
          <div className="createInvitation_title">
            <h4>Mempelai Perempuan</h4>
          </div>
          <div className="createInvitation_content">
            <div class="mb-3">
              <label htmlFor="exampleFormControlInput1" class="form-label">Foto</label>
              <input type="file" class="form-control" id="exampleFormControlInput1" placeholder="Foto Mempelai Perempuan" />
            </div>
            <div class="mb-3">
              <label htmlFor="exampleFormControlInput1" class="form-label">Nama Lengkap</label>
              <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Nama Mempelai Perempuan" />
            </div>

            <div class="mb-3">
              <label htmlFor="exampleFormControlInput1" class="form-label">Nama Panggilan</label>
              <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Nama Panggilan Mempelai Perempuan" />
            </div>

            <div class="mb-3">
              <label htmlFor="exampleFormControlInput1" class="form-label">Ayah</label>
              <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Nama Ayah  Mempelai Perempuan" />
            </div>

            <div class="mb-3">
              <label htmlFor="exampleFormControlInput1" class="form-label">Ibu</label>
              <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Nama Ibu  Mempelai Perempuan" />
            </div>
          </div>
        </div>
      </section>

      <section className="createInvitation_container container">
        <div className="box-main">
          <div className="createInvitation_title">
            <h4>Akad Pernikahan</h4>
          </div>
          <div className="createInvitation_content">
            <div class="mb-3">
              <label htmlFor="exampleFormControlInput1" class="form-label">Tanggal</label>
              <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="Nama Mempelai Perempuan" />
            </div>

            <div class="d-flex-space-between mb-3">
              <div className="w-50">
                <label htmlFor="exampleFormControlInput1" class="form-label">Jam Mulai</label>
                <input type="time" class="form-control" id="exampleFormControlInput1" placeholder="Nama Ayah  Mempelai Perempuan" />
              </div>
              <div className="ml-4 w-50">
                <label htmlFor="exampleFormControlInput1" class="form-label">Jam Selesai</label>
                <input type="time" class="form-control" id="exampleFormControlInput1" placeholder="Nama Ibu  Mempelai Perempuan" />
              </div>
            </div>

            <div class="mb-3">
              <label htmlFor="exampleFormControlInput1" class="form-label">Tempat Akad Berlangsung</label>
              <textarea class="form-control" id="exampleFormControlInput1" placeholder="Alamat Pernikahan" />
            </div>
          </div>
        </div>
      </section>

      <section className="createInvitation_container container">
        <div className="box-main">
          <div className="createInvitation_title">
            <h4>Resepsi</h4>
          </div>
          <div className="createInvitation_content">
            <div class="mb-3">
              <label htmlFor="exampleFormControlInput1" class="form-label">Tanggal</label>
              <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="Nama Mempelai Perempuan" />
            </div>

            <div class="d-flex mb-3">
              <div className="w-50">
                <label htmlFor="exampleFormControlInput1" class="form-label">Jam Mulai</label>
                <input type="time" class="form-control" id="exampleFormControlInput1" placeholder="Nama Ayah  Mempelai Perempuan" />
              </div>
              <div className="ml-4 w-50">
                <label htmlFor="exampleFormControlInput1" class="form-label">Jam Selesai</label>
                <input type="time" class="form-control" id="exampleFormControlInput1" placeholder="Nama Ibu  Mempelai Perempuan" />
              </div>
            </div>

            <div class="mb-3">
              <label htmlFor="exampleFormControlInput1" class="form-label">Tempat Resepsi Berlangsung</label>
              <textarea class="form-control" id="exampleFormControlInput1" placeholder="Alamat Resepsi" />
            </div>
          </div>
        </div>
      </section>

      <section className="createInvitation_container container">
        <div className="box-main">
          <div className="createInvitation_title">
            <h4>Gallery</h4>
          </div>
          <div className="createInvitation_content">
            <div class="mb-3">
              <label htmlFor="exampleFormControlInput1" class="form-label">Masukkan gallery kamu</label>
              <input type="file" class="form-control" id="exampleFormControlInput1" placeholder="Nama Mempelai Laki-Laki" />
            </div>
          </div>
        </div>
      </section>

      <section className="createInvitation_container container">
        <div className="box-main">
          <div className="createInvitation_submit">
            <Link href="/admin" as={`/admin`}>
              <button type="button" class="btn btn-main">Buat Undangan</button>
            </Link>
          </div>
        </div>
      </section>

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