import Layout from '../../../components/Layout/LayoutAdmin'
import Link from "next/link"
export default function add() {
  return (
    <Layout>
      <div className="createInvitation container-fluid p-section">
        <section className="createInvitation_container container">
          <div className="box-main">
            <div className="createInvitation_title">
              <h4>Undangan #1</h4>
            </div>
            <div className="createInvitation_content">
              <div class="mb-3">
                <label htmlFor="exampleFormControlInput1" class="form-label">Nama Undangan</label>
                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Nama Mempelai Laki-Laki" />
              </div>


              <div class="user_addGuestCategory mb-3">
                <label htmlFor="exampleFormControlInput1" class="form-label">Kategori</label>
                <div className="input-group">
                  <select className="custom-select" id="kategori_invitation">
                    <option selected>Cari Kategori</option>
                    <option value="1">Temen Ayah Laki Laki (sesi II (14:00-16:00 WIB))</option>
                    <option value="2">Temen SD Perempuan (sesi II (12:00-14:00 WIB))</option>
                    <option value="3">Temen SMK Laki-laki (sesi I (10:00-12:00 WIB))</option>

                  </select>
                  <button type="button" class="btn btn-main">+ Kategori</button>
                </div>
              </div>

              <div class="mb-3">
                <label htmlFor="exampleFormControlInput1" class="form-label">Nomor Telepon</label>
                <input type="number" class="form-control" id="exampleFormControlInput1" placeholder="0812 1293 2121" />
              </div>

            </div>
          </div>
        </section>

        <section className="createInvitation_container container">
          <div className="box-main">
            <div className="createInvitation_submit">
              <Link href="/admin" as={`/admin`}>
                <button type="button" class="btn btn-main">+ Tambah</button>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  )
}
