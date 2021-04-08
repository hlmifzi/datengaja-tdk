import Layout from '../../components/Layout/Layout'
import Link from "next/link"
export default function Home() {
  return (
    <Layout>
      <div className="createInvitation container-fluid bg-grey-light p-section">
        <section className="createInvitation_container container">
          <div className="box-main">
            <div className="createInvitation_title">
              <h4>Mempelai Pria</h4>
            </div>
            <div className="createInvitation_content">
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
              <h4>Akun Admin</h4>
            </div>
            <div className="createInvitation_content">
              <div class="mb-3">
                <label htmlFor="exampleFormControlInput1" class="form-label">Email</label>
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Username Email" />
              </div>

              <div class="mb-3">
                <label htmlFor="exampleFormControlInput1" class="form-label">Nomor Handphone</label>
                <input type="number" class="form-control" id="exampleFormControlInput1" placeholder="Nomor Handphone" />
              </div>

              <div class="mb-3">
                <label htmlFor="exampleFormControlInput1" class="form-label">Password</label>
                <input type="password" class="form-control" id="exampleFormControlInput1" placeholder="Password" />
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

      </div>
    </Layout>
  )
}
