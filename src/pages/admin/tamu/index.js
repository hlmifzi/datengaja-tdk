import { useState, useEffect } from 'react'
import Link from "next/link"
import moment from 'moment'
import LayoutAdmin from '../../../components/Layout/LayoutAdmin'
import { getAllByBuyerProductId, deleteInvitation } from '../../../client/Invitations'
import { getBuyerProductsClientName } from '../../../client/BuyerProduct'
import { parseCookies, attendStatus } from '../../../utils/helper/HelperUtils'
import { CSVLink } from "react-csv";
import { useRouter } from "next/router"
import { getInvitations } from '../../../client/BuyerProduct'
import absoluteUrl from 'next-absolute-url'
import { useForm } from 'react-hook-form'
import { getCategoriesByBuyerProductId } from '../../../client/InvitationsCategories'


const Tamu = ({
  data,
  dataBuyerProduct,
  dataInvitationCategory,
  bridegroom_call_name,
  bride_call_name,
  hostname
}) => {

  const router = useRouter()
  const [modalSuccessDelete, setModalSuccessDelete] = useState(false)
  const [dataInvitations, setDataInvitations] = useState(data)
  const { register, handleSubmit } = useForm()

  const handleDelete = async (id) => {
    const { data } = await deleteInvitation(id)
    if (data) {
      setModalSuccessDelete(true)
    } else {
      alert(error.error.errors[0].message)
    }
  }


  const headers = [
    { label: "Nama", key: "fullname" },
    { label: "Kategori", key: "desc" },
    { label: "No Hp", key: "phone_wa" },
    { label: "Status", key: "attend_status" },
    { label: "Ucapan dan Doa", key: "greetings" },
  ]

  const handleGetInvitationByQuery = async (query) => {
    const { data: dataInvitations } = await getInvitations(dataBuyerProduct.id, { params: query })
    if (dataInvitations) setDataInvitations(dataInvitations)
    else setDataInvitations([])
  }


  useEffect(() => {
    const totalQuery = Object.keys(router?.query)
    console.log("🚀 ~ file: index.js ~ line 52 ~ useEffect ~ totalQuery", totalQuery)
    if (totalQuery.length > 0) handleGetInvitationByQuery(router?.query)

  }, [router?.query])

  return (
    <LayoutAdmin mainClassName="tamu" user={dataBuyerProduct?.bridegroom_call_name}>
      <div className="admin_welcomeCards aturUndangan">
        <div className="admin_welcomeContent cards_single">
          <h5>Halo, Selamat datang di halaman <b>ATUR TAMU</b></h5>
          <p>Di halaman ini kamu dapat mengatur tamu yang akan diundang dan membagikannya</p>
          <div className="admin_welcomeFooter">
            <Link href={`/undangan01/pernikahan-${bridegroom_call_name}-dan-${bride_call_name}`}>
              <a target="_blank">
                <button className="btn-second">Lihat disini {">"}</button>
              </a>
            </Link>
          </div>
        </div>
      </div>

      <div className="w-100 mb-8">
        <div className="projects">
          <div className="card">
            <div className="card_header">
              <h3>Filter</h3>
            </div>
            <form onSubmit={handleSubmit(handleGetInvitationByQuery)}>
              <div className="card_bodyFilter">
                <div className="user_search">
                  <div className="input-group">
                    <select
                      className="custom-select"
                      id="inputGroupSelect04"
                      {...register("category_id")}
                    >
                      <option value="" selected>Cari Kategori</option>

                      {dataInvitationCategory?.map((v, i) => {
                        return (
                          <option
                            value={v.id}
                            key={i}
                          >
                            {v.desc} {v.time_start !== "00:00:00" && v.time_end !== "00:00:00" ? `(${v?.session} : ${v.time_start} - ${v.time_end})` : ""}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                  <input
                    type="text"
                    class="form-control user_searchName"
                    placeholder="Cari Nama Tamu" aria-describedby="basic-addon2"
                    {...register("invitation_name")}
                  />
                  <button type="submit" className="btn-green ml-4">Cari</button>
                </div>

              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="w-100">
        <div className="projects">
          <div className="card">
            <div className="card_header">
              <h3>Tamu</h3>
              <div className="d-flex">
                <Link href="/admin/tamu/add">
                  <button className="btn-main"> + Tambah</button>
                </Link>
                <CSVLink
                  data={data}
                  filename={`Undangan-${bridegroom_call_name}-dan-${bride_call_name}.csv`}
                  className="btn-green ml-2 mt-4"
                  headers={headers}
                  target="_blank"
                  separator={";"}
                >
                  Export Excel
                </CSVLink>
              </div>
            </div>

            <div className="card_body">
              <table width="100%">
                <thead>
                  <tr>
                    <td>Nama</td>
                    <td>Kategori</td>
                    <td>Nomor telepon</td>
                    <td>Ucapan & Doa</td>
                    <td>Status</td>
                    <td>Kehadiran</td>
                    <td>Update Terakhir</td>
                    <td>Aksi</td>
                    <td>Share</td>
                  </tr>
                </thead>
                <tbody>
                  {dataInvitations.length > 0 ?
                    dataInvitations.map((v, i) => {
                      return (
                        <tr key={i}>
                          <td>{v.fullname}</td>
                          <td>{v.desc}</td>
                          <td>
                            {v.phone_wa}
                          </td>
                          <td>
                            {v.greetings}
                          </td>
                          <td>
                            <div className={`sticker ${attendStatus[v.attend_status]}`}>
                              {v.attend_status}
                            </div>
                          </td>
                          <td>{v.present_time || 'Belum Hadir'}</td>
                          <td>{moment(v.updated_at).format('LLLL')}</td>
                          <td>
                            <button
                              className="btn-blue px-4"
                              onClick={() => router.push(`/admin/tamu/add/?id=${v.id}`)}
                            >
                              Ubah
                            </button>
                            <br />
                            <button
                              onClick={() => handleDelete(v.id)}
                              className="btn-main px-4"
                            >
                              Delete
                            </button>
                          </td>
                          <td>
                            <Link href={`
                            https://api.whatsapp.com/send?phone=${v.phone_wa}&text=Hallo%20${v.fullname}%0AKami%20Yang%20berbahagia%20mengundang%20bapak%2Fibu%20untuk%20menghadiri%20acara%20resepsi%20pernikahan%20kami%20pada%20%0A%0Ahari%2Ftanggal%3A%20${moment(dataBuyerProduct?.bride_date).format('LL')}%0Atempat%3A%20${dataBuyerProduct?.reception_location}%0APukul:%20${dataBuyerProduct?.reception_start_time} s.d ${dataBuyerProduct?.reception_end_time || 'selesai'}%0A%0AMohon%20dapat%20konfirmasi%20di%20%0A${hostname}%2Fundangan0${data.product_id}%2Fpernikahan-${bridegroom_call_name}-dan-${bride_call_name}%3Fkepada=${v.fullname}%0ATak%20ada%20kesan%20tanpa%20kehadiranmu`} >
                              <a className="w-100" target="_blank">
                                <button className="btn-second px-4">Bagikan ke WA</button>
                              </a>
                            </Link>
                          </td>
                        </tr>
                      )
                    }) :
                    <tr>
                      <td colSpan={8} className="text-center">
                        <h1>Tidak ada data</h1>
                      </td>
                      <td style={{ display: 'none' }}></td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {modalSuccessDelete &&
        <div className="popUp">
          <div className="popUp_background"></div>
          <div className="popUp_container d-flex flex-column ">
            <h2>Berhasil Delete Data</h2>
            <button onClick={() => {
              router.push("/admin/tamu")
              setModalSuccessDelete(false)
            }}
              type="button" className="mt-4 btn btn-main">Kembali</button>
          </div>
        </div>
      }
    </LayoutAdmin >
  )
}

export const getServerSideProps = async ({ req }) => {

  const cookie = parseCookies(req.headers.cookie)

  const { data } = await getAllByBuyerProductId(cookie['buyerProductId'])
  const { origin: hostname } = absoluteUrl(req)
  const { data: dataInvitationCategory } = await getCategoriesByBuyerProductId(cookie['buyerProductId'])
  const { data: dataBuyerProduct } = await getBuyerProductsClientName(cookie['bridegroom_call_name'].trim() || "helmi", cookie['bride_call_name'].trim() || "jannah")


  return {
    props: {
      data: data || null,
      hostname,
      dataBuyerProduct,
      dataInvitationCategory,
      bridegroom_call_name: cookie['bridegroom_call_name'],
      bride_call_name: cookie['bride_call_name'],
    }
  }
}

export default Tamu;