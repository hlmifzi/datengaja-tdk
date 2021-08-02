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
  dataInvitation
}) => {
  const [showAddCategory, setShowAddCategory] = useState(false)
  const { register, handleSubmit } = useForm()
  const router = useRouter()

  const handleAdd = async (payload) => {
    const { data, error } = await postInvitation({
      ...payload,
      buyerProductId,
      phone_wa: `62${payload.phone_wa}`,
      attend_status: 'Menunggu Konfirmasi'
    })
    if (data) router.push('/admin/tamu')
    else alert(error.error.errors[0].message)
  }

  const handleUpdate = async (payload) => {
    const { data, error } = await putInvitation(dataInvitation.id, {
      ...payload,
      buyerProductId,
      phone_wa: `62${payload.phone_wa}`,
      status: `TIDAK AKTIF`,
    })
    if (data) router.push('/admin/tamu')
    else alert(error.error.errors[0].message)
  }

  const onSubmit = async (payload) => {
    if (!dataInvitation) handleAdd(payload)
    else handleUpdate(payload)
  }

  const onSubmitCategory = async (payload) => {
    const { error } = await postInvitationCategory({
      ...payload,
      buyerProductId
    })

    if (!error) setShowAddCategory(false)
  }

  return (
    <Layout>
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
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Nama Panggilan"
                    defaultValue={dataInvitation && dataInvitation?.fullname}
                    {...register("fullname")}
                  />
                </div>
                <div class="user_addGuestCategory mb-3">
                  <label htmlFor="exampleFormControlInput1" class="form-label">Kategori</label>
                  <div className="input-group">
                    <select
                      className="custom-select"
                      id="kategori_invitation"
                      {...register("invitation_category_id")}
                    >
                      <option selected>Cari Kategori</option>
                      {data.map((v, i) => {
                        return (
                          <option
                            value={v.id}
                            selected={dataInvitation && dataInvitation?.invitation_category_id === v.id}
                          >{v.desc} ({v?.session} (14:00-16:00 WIB))
                          </option>
                        )
                      })}
                    </select>
                    <button onClick={() => setShowAddCategory(true)} type="button" class="btn btn-main">Kategori</button>
                  </div>
                </div>
                <div class="mb-3">
                  <label htmlFor="exampleFormControlInput1" class="form-label">Nomor Telepon</label>
                  <input
                    type="number"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="812 1293 2121"
                    defaultValue={dataInvitation && dataInvitation?.phone_wa}
                    {...register("phone_wa")}
                  />
                </div>
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
        <form onSubmit={handleSubmit(onSubmitCategory)}>
          <div className="popUp">
            <div className="popUp_background"></div>
            <div className="popUp_container d-flex flex-column ">
              <i onClick={() => setShowAddCategory(false)}>Tutup [x]</i>
              <div class="mb-3">
                <label htmlFor="exampleFormControlInput1" class="form-label">Kategori</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="ex: Temen Ayah Laki Laki"
                  {...register("desc")}
                />
              </div>
              <div class="mb-3">
                <label htmlFor="exampleFormControlInput1" class="form-label">Sesi</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="ex: sesi I "
                  {...register("session")}
                />
              </div>
              <div className="w-100 d-flex">
                <div className=" w-50">
                  <label htmlFor="exampleFormControlInput1" class="form-label">Jam Mulai</label>
                  <input
                    type="time"
                    class="form-control"
                    id="exampleFormControlInput1"
                    {...register("time_start")}
                  />
                  <small>*kosongkan jika tidak ada pembagian waktu pada tamu</small>
                </div>
                <div className="ml-4 w-50">
                  <label htmlFor="exampleFormControlInput1" class="form-label">Jam Selesai</label>
                  <input
                    type="time"
                    class="form-control"
                    id="exampleFormControlInput1"
                    {...register("time_end")}
                  />
                  <small>*kosongkan jika tidak ada pembagian waktu pada tamu</small>
                </div>
              </div>
              <button type="submit" className="mt-4 btn btn-main">Simpan</button>
            </div>
          </div>
        </form>
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
      data,
      dataInvitation,
      id: query.id || null,
      bridegroom_call_name: cookie['bridegroom_call_name'],
      bride_call_name: cookie['bride_call_name'],
      buyerProductId: cookie['buyerProductId'],
    }
  }
}

export default add