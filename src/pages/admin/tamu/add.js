import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { getCategoriesByBuyerProductId } from '../../../client/InvitationsCategories'
import { postInvitation, getInvitationById, putInvitation } from '../../../client/Invitations'
import { postInvitationCategory } from '../../../client/InvitationsCategories'
import { parseCookies } from '../../../utils/helper/HelperUtils'
import Layout from '../../../components/Layout/LayoutAdmin'

const add = ({
  data,
  buyerProductId,
  dataInvitation,
  bridegroom_call_name,
  prevUrl
}) => {

  const [showAddCategory, setShowAddCategory] = useState(false)
  const [notifUpdate, setNotifUpdate] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { register: registerCategory, handleSubmit: handleSubmitCategory } = useForm()
  const router = useRouter()

  let currentDate = new Date();
  let time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();

  const handleAdd = async (payload) => {
    const totalErrorForm = Object.keys(errors).length

    const { data, error } = await postInvitation({
      ...payload,
      buyerProductId,
      phone_wa: `62${payload.phone_wa}`,
      attend_status: 'Menunggu Konfirmasi'
    })
    if (data && totalErrorForm === 0) router.push('/admin/tamu')
    else alert(error.error.errors[0].message)
  }

  const handleUpdate = async (payload) => {
    const totalErrorForm = Object.keys(errors).length

    if (prevUrl.includes("admin/bukuTamu")) Object.assign(payload, { present_time: time });
    const { data, error } = await putInvitation(dataInvitation.id, {
      ...payload,
      buyerProductId,
      phone_wa: `62${payload.phone_wa}`,
    })
    if (data && totalErrorForm === 0) setNotifUpdate(true)
    else alert(error.error.errors[0].message)
  }

  const onSubmit = async (payload) => {
    if (dataInvitation.length < 1)
      handleAdd(payload)
    else
      handleUpdate(payload)
  }

  const onSubmitCategory = async (payload) => {
    const { error } = await postInvitationCategory({
      ...payload,
      buyerProductId
    })

    console.log("🚀 ~ file: add.js ~ line 61 ~ onSubmitCategory ~ error", error)
    if (!error) {
      router.push('/admin/tamu/add')
      setShowAddCategory(false)
    }
  }

  return (
    <Layout user={bridegroom_call_name}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="createInvitation container-fluid p-section">
          <section className="createInvitation_container container">
            <div className="box-main">
              <div className="createInvitation_title">
                <h4>Undangan #1</h4>
              </div>
              <div className="createInvitation_content">
                <div class="mb-3">
                  <label htmlFor="exampleFormControlInput1" class="form-label">Nama Undangan</label>
                  <input
                    type="text"
                    class={`form-control ${errors.fullname && "input_failed"}`}
                    id="exampleFormControlInput1"
                    placeholder="Nama Panggilan"
                    defaultValue={dataInvitation && dataInvitation?.fullname}
                    {...register("fullname", { required: true })}
                  />
                  {errors.fullname && <span className="input_failedText">Wajib Diisi</span>}
                </div>
                <div class="user_addGuestCategory mb-3">
                  <label htmlFor="exampleFormControlInput1" class="form-label">Kategori</label>
                  <div className="input-group">
                    <select
                      className="custom-select"
                      class={`form-control ${errors.invitation_category_id && "input_failed"}`}
                      id="kategori_invitation"
                      {...register("invitation_category_id", { required: true })}
                    >
                      <option value="">Cari Kategori</option>
                      {data?.map((v, i) => {
                        return (
                          <option
                            value={v.id}
                            key={i}
                            selected={dataInvitation && dataInvitation?.invitation_category_id === v.id}
                          >{v.desc} {v.time_start !== "00:00:00" && v.time_end !== "00:00:00" ? `(${v?.session} : ${v.time_start} - ${v.time_end})` : ""}
                          </option>
                        )
                      })}
                    </select>
                    <button onClick={() => setShowAddCategory(true)} type="button" class="btn btn-main"> + Kategori</button>
                  </div>
                  {errors.invitation_category_id && <span className="input_failedText">Wajib Diisi</span>}
                </div>
                <div class="mb-3">
                  <label htmlFor="exampleFormControlInput1" class="form-label">Nomor Telepon</label>
                  <input
                    type="number"
                    class={`form-control ${errors.phone_wa && "input_failed"}`}
                    id="exampleFormControlInput1"
                    placeholder="812 1293 2121"
                    defaultValue={dataInvitation && dataInvitation?.phone_wa}
                    {...register("phone_wa", { required: true })}
                  />
                  {errors.phone_wa && <span className="input_failedText">Wajib Diisi</span>}
                </div>
                {dataInvitation.length !== 0 &&
                  <div class="mb-3">
                    <label htmlFor="exampleFormControlInput1" class="form-label">Status Kehaditan</label>
                    <select
                      class={`form-control`}
                      {...register("attend_status")}
                      defaultValue={dataInvitation?.attend_status || "Menunggu Konfirmasi"}
                    >
                      <option value="" selected>Pilih Status</option>
                      <option value="Menunggu Konfirmasi">Menunggu Konfirmasi</option>
                      <option value="Akan Hadir">Akan Hadir</option>
                      <option value="Berhalangan">Behalangan</option>
                      <option value="Telah Hadir">Telah Hadir</option>
                    </select>
                  </div>
                }
              </div>
            </div>
          </section>
          <section className="createInvitation_container container">
            <div className="box-main">
              <div className="createInvitation_submit">
                <button type="submit" class="btn btn-main">Simpan</button>
              </div>
            </div>
          </section>
        </div>
      </form>

      {showAddCategory &&
        <form onSubmit={handleSubmitCategory(onSubmitCategory)}>
          <div className="popUp">
            <div className="popUp_background"></div>
            <div className="popUp_container d-flex flex-column ">
              <i onClick={() => setShowAddCategory(false)}>Tutup [x]</i>
              <div class="mb-3">
                <label htmlFor="exampleFormControlInput1" class="form-label">Kategori</label>
                <input
                  type="text"
                  class={`form-control`}
                  id="exampleFormControlInput1"
                  placeholder="ex: Temen Ayah Laki Laki"
                  {...registerCategory("desc")}
                />
              </div>
              <div class="mb-3">
                <label htmlFor="exampleFormControlInput1" class="form-label">Sesi</label>
                <input
                  type="text"
                  class={`form-control`}
                  id="exampleFormControlInput1"
                  placeholder="ex: sesi I "
                  {...registerCategory("session")}
                />
              </div>
              <div className="w-100 d-flex">
                <div className=" w-50">
                  <label htmlFor="exampleFormControlInput1" class="form-label">Jam Mulai</label>
                  <input
                    type="time"
                    class={`form-control`}
                    id="exampleFormControlInput1"
                    {...registerCategory("time_start")}
                  />
                  <small>*kosongkan jika tidak ada pembagian waktu pada tamu</small>
                </div>
                <div className="ml-4 w-50">
                  <label htmlFor="exampleFormControlInput1" class="form-label">Jam Selesai</label>
                  <input
                    type="time"
                    class={`form-control`}
                    id="exampleFormControlInput1"
                    {...registerCategory("time_end")}
                  />
                  <small>*kosongkan jika tidak ada pembagian waktu pada tamu</small>
                </div>
              </div>
              <button type="submit" className="mt-4 btn btn-main">Simpan</button>
            </div>
          </div>
        </form>
      }
      {notifUpdate &&
        <div className="popUp">
          <div className="popUp_background"></div>
          <div className="popUp_container d-flex flex-column">
            <i onClick={() => router.push(prevUrl)}>Tutup [x]</i>
            <div className="d-flex justify-content-center align-items-center flex-direction-column">
              <div className="popUp_checkList">
                <img src="/img/checkl.svg" />
              </div>
              <h3 className="text-center">Data Tamu Undangan Berhasil diubah</h3>
            </div>
            <button onClick={() => router.push(prevUrl)} type="button" className="mt-4 btn btn-main">Kembali</button>
          </div>
        </div>
      }
    </Layout>
  )
}


export const getServerSideProps = async ({ req, query }) => {

  const id = query.id
  let dataInvitation = null
  const cookie = parseCookies(req.headers.cookie)

  const { data } = await getCategoriesByBuyerProductId(cookie['buyerProductId'])

  if (id) {
    const { data } = await getInvitationById(id)
    dataInvitation = data
  }

  return {
    props: {
      data: data || [],
      dataInvitation: dataInvitation || [],
      id: query.id || null,
      bridegroom_call_name: cookie['bridegroom_call_name'] || null,
      bride_call_name: cookie['bride_call_name'] || null,
      buyerProductId: cookie['buyerProductId'] || null,
      prevUrl: req.headers.referer || null
    }
  }
}

export default add