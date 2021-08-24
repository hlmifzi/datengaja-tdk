import { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { postBuyerProduct } from '../../client/BuyerProduct'

const Home = () => {
  const router = useRouter()
  const [error, setError] = useState("")

  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async payload => {

    const totalErrorForm = Object.keys(errors).length
    const { data, error } = await postBuyerProduct(payload)

    if ((data && !error) && totalErrorForm === 0) {
      document.cookie = `bridegroom_call_name=${data.bridegroom_call_name}`
      document.cookie = `bride_call_name=${data.bride_call_name}`
      document.cookie = `buyerProductId=${data.id}`
      router.push('/admin')
    } else {
      setError(error?.meta.message)
    }
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="createInvitation container-fluid bg-grey-light p-section">
          <section className="createInvitation_container container">
            {error &&
              <div className="notif_failed mb-8">
                <p>
                  {error}
                </p>
              </div>
            }
            <div className="box-main">
              <div className="createInvitation_title">
                <h4>Akun Anda</h4>
              </div>
              <div className="createInvitation_content">
                <div class="mb-3">
                  <label htmlFor="exampleFormControlInput1 input_failedText" class="form-label">Email</label>
                  <input
                    type="email"
                    class={`form-control ${errors.email && "input_failed"}`}
                    placeholder="Username Email"
                    {...register("email", { required: true })}
                  />
                  {errors.email && <div className="input_failedText"> Wajib Diisi</div>}

                </div>

                <div class="mb-3">
                  <label htmlFor="exampleFormControlInput1" class="form-label">Nomor Handphone</label>
                  <input
                    type="number"
                    class={`form-control ${errors.phone && "input_failed"}`}
                    placeholder="Nomor Handphone ex: 81294923207"
                    {...register("phone", { required: true })}
                  />
                  {errors.phone && <div className="input_failedText"> Wajib Diisi</div>}
                </div>

                <div class="mb-3">
                  <label htmlFor="exampleFormControlInput1" class="form-label">Password</label>
                  <input
                    type="password"
                    class={`form-control ${errors.password && "input_failed"}`}
                    placeholder="Password"
                    {...register("password", { required: true })}
                  />
                  {errors.password && <div className="input_failedText">Wajib Diisi</div>}

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
                    class={`form-control ${errors.bridegroom_full_name && "input_failed"}`}
                    placeholder="Nama Mempelai Laki-Laki"
                    {...register("bridegroom_full_name", { required: true })}
                  />
                  {errors.bridegroom_full_name && <div className="input_failedText">Wajib Diisi</div>}
                </div>
                <div class="mb-3">
                  <label htmlFor="exampleFormControlInput1" class="form-label">Nama Panggilan</label>
                  <input
                    type="text"
                    class={`form-control ${errors.bridegroom_call_name && "input_failed"}`}
                    placeholder="Nama Panggilan Mempelai Laki-laki"
                    {...register("bridegroom_call_name", { required: true })}
                  />
                  {errors.bridegroom_call_name && <div className="input_failedText">Wajib Diisi</div>}
                </div>

                <div class="mb-3">
                  <label htmlFor="exampleFormControlInput1" class="form-label">Ayah</label>
                  <input
                    type="text"
                    class={`form-control ${errors.bridegroom_fathers && "input_failed"}`}
                    placeholder="Nama Ayah  Mempelai Laki-Laki"
                    {...register("bridegroom_fathers", { required: true })}
                  />
                  {errors.bridegroom_fathers && <div className="input_failedText">Wajib Diisi</div>}
                  {/* <div className="input_failedText">Harap mengisi data</div> */}
                </div>

                <div class="mb-3">
                  <label htmlFor="exampleFormControlInput1" class="form-label">Ibu</label>
                  <input
                    type="text"
                    class={`form-control ${errors.bridegroom_mother && "input_failed"}`}
                    placeholder="Nama Ibu  Mempelai Laki-Laki"
                    {...register("bridegroom_mother", { required: true })}
                  />
                  {errors.bridegroom_mother && <div className="input_failedText">Wajib Diisi</div>}
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
                    class={`form-control ${errors.bride_full_name && "input_failed"}`}
                    placeholder="Nama Mempelai Perempuan"
                    {...register("bride_full_name", { required: true })}
                  />
                  {errors.bride_full_name && <div className="input_failedText">Wajib Diisi</div>}
                </div>

                <div class="mb-3">
                  <label htmlFor="exampleFormControlInput1" class="form-label">Nama Panggilan</label>
                  <input
                    type="text"
                    class={`form-control ${errors.bride_call_name && "input_failed"}`}
                    placeholder="Nama Panggilan Mempelai Perempuan"
                    {...register("bride_call_name", { required: true })}
                  />
                  {errors.bride_call_name && <div className="input_failedText">Wajib Diisi</div>}
                </div>

                <div class="mb-3">
                  <label htmlFor="exampleFormControlInput1" class="form-label">Ayah</label>
                  <input
                    type="text"
                    class={`form-control ${errors.bride_woman_father && "input_failed"}`}
                    placeholder="Nama Ayah  Mempelai Perempuan"
                    {...register("bride_woman_father", { required: true })}
                  />
                  {errors.bride_woman_father && <div className="input_failedText">Wajib Diisi</div>}
                </div>

                <div class="mb-3">
                  <label htmlFor="exampleFormControlInput1" class="form-label">Ibu</label>
                  <input
                    type="text"
                    class={`form-control ${errors.bride_woman_mother && "input_failed"}`}
                    placeholder="Nama Ibu  Mempelai Perempuan"
                    {...register("bride_woman_mother", { required: true })}
                  />
                  {errors.bride_woman_mother && <div className="input_failedText">Wajib Diisi</div>}
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
                    class={`form-control ${errors.bride_date && "input_failed"}`}
                    placeholder="Nama Mempelai Perempuan"
                    {...register("bride_date", { required: true })}
                  />
                  {errors.bride_date && <div className="input_failedText">Wajib Diisi</div>}
                </div>

                <div class="d-flex-space-between mb-3">
                  <div className="w-50">
                    <label htmlFor="exampleFormControlInput1" class="form-label">Jam Mulai</label>
                    <input
                      type="time"
                      class={`form-control ${errors.bride_start_time && "input_failed"}`}
                      placeholder="Nama Ayah  Mempelai Perempuan"
                      {...register("bride_start_time", { required: true })}
                    />
                    {errors.bride_start_time && <div className="input_failedText">Wajib Diisi</div>}
                  </div>
                  <div className="ml-4 w-50">
                    <label htmlFor="exampleFormControlInput1" class="form-label">Jam Selesai</label>
                    <input
                      type="time"
                      class={`form-control ${errors.bride_end_time && "input_failed"}`}
                      placeholder="Nama Ibu  Mempelai Perempuan"
                      {...register("bride_end_time", { required: true })}
                    />
                    {errors.bride_end_time && <div className="input_failedText">Wajib Diisi</div>}
                  </div>
                </div>

                <div class="mb-3">
                  <label htmlFor="exampleFormControlInput1" class="form-label">Tempat Akad Berlangsung</label>
                  <textarea
                    class={`form-control ${errors.bride_location && "input_failed"}`}
                    placeholder="Alamat Pernikahan"
                    {...register("bride_location", { required: true })}
                  />
                  {errors.bride_location && <div className="input_failedText">Wajib Diisi</div>}
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
                    class={`form-control ${errors.reception_date && "input_failed"}`}
                    placeholder="Nama Mempelai Perempuan"
                    {...register("reception_date", { required: true })}
                  />
                  {errors.reception_date && <div className="input_failedText">Wajib Diisi</div>}
                </div>

                <div class="d-flex mb-3">
                  <div className="w-50">
                    <label htmlFor="exampleFormControlInput1" class="form-label">Jam Mulai</label>
                    <input
                      type="time"
                      class={`form-control ${errors.reception_start_time && "input_failed"}`}
                      placeholder="Nama Ayah  Mempelai Perempuan"
                      {...register("reception_start_time", { required: true })}
                    />
                    {errors.reception_start_time && <div className="input_failedText">Wajib Diisi</div>}
                  </div>
                  <div className="ml-4 w-50">
                    <label htmlFor="exampleFormControlInput1" class="form-label">Jam Selesai</label>
                    <input
                      type="time"
                      class={`form-control ${errors.reception_end_time && "input_failed"}`}
                      placeholder="Nama Ibu  Mempelai Perempuan"
                      {...register("reception_end_time", { required: true })}
                    />
                    {errors.reception_end_time && <div className="input_failedText">Wajib Diisi</div>}
                  </div>
                </div>

                <div class="mb-3">
                  <label htmlFor="exampleFormControlInput1" class="form-label">Tempat Resepsi Berlangsung</label>
                  <textarea
                    class={`form-control ${errors.reception_location && "input_failed"}`}
                    placeholder="Alamat Resepsi"
                    {...register("reception_location", { required: true })}
                  />
                  {errors.reception_location && <div className="input_failedText">Wajib Diisi</div>}
                </div>
              </div>
            </div>
          </section>
          <section className="createInvitation_container container">
            <div className="box-main">
              <div className="createInvitation_submit">
                <button type="submit" class="btn btn-main">Buat Undangan</button>
              </div>
            </div>
          </section>
        </div>
      </form>
    </Layout>
  )
}

export default Home
