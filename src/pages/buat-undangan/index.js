import Layout from '../../components/Layout/Layout'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { postBuyerProduct } from '../../client/BuyerProduct'

const Home = () => {
  const router = useRouter()
  const { register, handleSubmit, watch, formState: { errors } } = useForm()

  const onSubmit = async payload => {
    const { data, error } = await postBuyerProduct(payload)

    if (!error) {
      document.cookie = `bridegroom_call_name=${data.bridegroom_call_name}`
      document.cookie = `bride_call_name=${data.bride_call_name}`
      document.cookie = `buyerProductId=${data.id}`
      router.push('/admin')
    }
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="createInvitation container-fluid bg-grey-light p-section">
          <section className="createInvitation_container container">
            <div className="box-main">
              <div className="createInvitation_title">
                <h4>Akun Admin</h4>
              </div>
              <div className="createInvitation_content">
                <div class="mb-3">
                  <label htmlFor="exampleFormControlInput1" class="form-label">Email</label>
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Username Email"
                    {...register("email")}
                  />
                  {/* <span className="input_failedText">Format email salah</span> */}
                </div>

                <div class="mb-3">
                  <label htmlFor="exampleFormControlInput1" class="form-label">Nomor Handphone</label>
                  <input
                    type="number"
                    class="form-control"
                    placeholder="Nomor Handphone"
                    {...register("phone")}
                  />
                </div>

                <div class="mb-3">
                  <label htmlFor="exampleFormControlInput1" class="form-label">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Password"
                    {...register("password")}
                  />
                  {/* <span className="input_failedText">Kata sandi harus mengandung huruf (kecil & besar) dan angka. Sedikitnya 6 karakter</span> */}
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
                  <label htmlFor="exampleFormControlInput1" class="form-label">Nama Lengkap</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Nama Mempelai Laki-Laki"
                    {...register("bridegroom_full_name")}
                  />
                </div>
                <div class="mb-3">
                  <label htmlFor="exampleFormControlInput1" class="form-label">Nama Panggilan</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Nama Panggilan Mempelai Laki-laki"
                    {...register("bridegroom_call_name")}
                  />
                </div>

                <div class="mb-3">
                  <label htmlFor="exampleFormControlInput1" class="form-label">Ayah</label>
                  <input
                    type="text"
                    class="form-control"

                    placeholder="Nama Ayah  Mempelai Laki-Laki"
                    {...register("bridegroom_fathers")}
                  />
                  {/* <span className="input_failedText">Harap mengisi data</span> */}
                </div>

                <div class="mb-3">
                  <label htmlFor="exampleFormControlInput1" class="form-label">Ibu</label>
                  <input
                    type="text"
                    class="form-control"

                    placeholder="Nama Ibu  Mempelai Laki-Laki"
                    {...register("bridegroom_mother")}
                  />
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
                  <input
                    type="text"
                    class="form-control"

                    placeholder="Nama Mempelai Perempuan"
                    {...register("bride_full_name")}
                  />
                </div>

                <div class="mb-3">
                  <label htmlFor="exampleFormControlInput1" class="form-label">Nama Panggilan</label>
                  <input
                    type="text"
                    class="form-control"

                    placeholder="Nama Panggilan Mempelai Perempuan"
                    {...register("bride_call_name")}
                  />
                </div>

                <div class="mb-3">
                  <label htmlFor="exampleFormControlInput1" class="form-label">Ayah</label>
                  <input
                    type="text"
                    class="form-control"

                    placeholder="Nama Ayah  Mempelai Perempuan"
                    {...register("bride_woman_father")}
                  />
                </div>

                <div class="mb-3">
                  <label htmlFor="exampleFormControlInput1" class="form-label">Ibu</label>
                  <input
                    type="text"
                    class="form-control"

                    placeholder="Nama Ibu  Mempelai Perempuan"
                    {...register("bride_woman_mother")}
                  />
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
                  <input
                    type="date"
                    class="form-control"

                    placeholder="Nama Mempelai Perempuan"
                    {...register("bride_date")}
                  />
                </div>

                <div class="d-flex-space-between mb-3">
                  <div className="w-50">
                    <label htmlFor="exampleFormControlInput1" class="form-label">Jam Mulai</label>
                    <input
                      type="time"
                      class="form-control"

                      placeholder="Nama Ayah  Mempelai Perempuan"
                      {...register("bride_start_time")}
                    />
                  </div>
                  <div className="ml-4 w-50">
                    <label htmlFor="exampleFormControlInput1" class="form-label">Jam Selesai</label>
                    <input
                      type="time"
                      class="form-control"

                      placeholder="Nama Ibu  Mempelai Perempuan"
                      {...register("bride_end_time")}
                    />
                  </div>
                </div>

                <div class="mb-3">
                  <label htmlFor="exampleFormControlInput1" class="form-label">Tempat Akad Berlangsung</label>
                  <textarea
                    class="form-control"

                    placeholder="Alamat Pernikahan"
                    {...register("bride_location")}
                  />
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
                  <input
                    type="date"
                    class="form-control"

                    placeholder="Nama Mempelai Perempuan"
                    {...register("reception_date")}
                  />
                </div>

                <div class="d-flex mb-3">
                  <div className="w-50">
                    <label htmlFor="exampleFormControlInput1" class="form-label">Jam Mulai</label>
                    <input
                      type="time"
                      class="form-control"

                      placeholder="Nama Ayah  Mempelai Perempuan"
                      {...register("reception_start_time")}
                    />
                  </div>
                  <div className="ml-4 w-50">
                    <label htmlFor="exampleFormControlInput1" class="form-label">Jam Selesai</label>
                    <input
                      type="time"
                      class="form-control"

                      placeholder="Nama Ibu  Mempelai Perempuan"
                      {...register("reception_end_time")}
                    />
                  </div>
                </div>

                <div class="mb-3">
                  <label htmlFor="exampleFormControlInput1" class="form-label">Tempat Resepsi Berlangsung</label>
                  <textarea
                    class="form-control"

                    placeholder="Alamat Resepsi"
                    {...register("reception_location")}
                  />
                </div>
              </div>
            </div>
          </section>
          <section className="createInvitation_container container">
            <div className="box-main">
              <div className="createInvitation_submit">
                {/* <Link href="/admin" as={`/admin`}> */}
                <button type="submit" class="btn btn-main">Buat Undangan</button>
                {/* </Link> */}
              </div>
            </div>
          </section>
        </div>
      </form>
    </Layout>
  )
}

export default Home
