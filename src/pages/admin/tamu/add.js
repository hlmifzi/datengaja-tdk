import { useState } from 'react'
import Layout from '../../../components/Layout/LayoutAdmin'
import Link from "next/link"
export default function add() {
  const [showAddCategory, setShowAddCategory] = useState(false)

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
                  <button onClick={() => setShowAddCategory(true)} type="button" class="btn btn-main">+ Kategori</button>
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
                <button type="button" class="btn btn-main">Simpan</button>
              </Link>
            </div>
          </div>
        </section>
      </div>

      {showAddCategory &&
        <div className="popUp">
          <div className="popUp_background"></div>
          <div className="popUp_container d-flex flex-column ">
            <i onClick={() => setShowAddCategory(false)}>Tutup [x]</i>
            <div class="mb-3">
              <label htmlFor="exampleFormControlInput1" class="form-label">Kategori</label>
              <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="ex: Temen Ayah Laki Laki" />
            </div>
            <div class="mb-3">
              <label htmlFor="exampleFormControlInput1" class="form-label">Sesi</label>
              <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="ex: sesi I " />
            </div>
            <div className="w-100 d-flex">
              <div className=" w-50">
                <label htmlFor="exampleFormControlInput1" class="form-label">Jam Mulai</label>
                <input type="time" class="form-control" id="exampleFormControlInput1" placeholder="Nama Ayah  Mempelai Perempuan" />
              </div>
              <div className="ml-4 w-50">
                <label htmlFor="exampleFormControlInput1" class="form-label">Jam Selesai</label>
                <input type="time" class="form-control" id="exampleFormControlInput1" placeholder="Nama Ibu  Mempelai Perempuan" />
              </div>
            </div>
          </div>
        </div>
      }
    </Layout>
  )
}
