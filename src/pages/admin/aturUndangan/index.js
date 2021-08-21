import { useState } from "react";
import Link from "next/link";
import LayoutAdmin from '../../../components/Layout/LayoutAdmin'
import { getByID } from '../../../client/BuyerProduct'
import { parseCookies, toBase64 } from '../../../utils/helper/HelperUtils'
import { useForm } from 'react-hook-form'
import { putBuyerProduct } from '../../../client/BuyerProduct'
import router from "next/router";


const AturUndangan = ({ data }) => {

  const { register, handleSubmit } = useForm()
  const buyerProductId = data.id

  const [notifUpdate, setNotifUpdate] = useState(false)
  const [bride_couple_img, setBride_couple_img] = useState(data.bride_couple_img || "")
  const [background1, setBackground1] = useState(data.background1 || "")
  const [background2, setBackground2] = useState(data.background2 || "")
  const [product_id, setProduct_id] = useState(data.product_id || "")
  const [bridegroom_img, setBridegroom_img] = useState(data.bridegroom_img || "")
  const [bride_img, setBride_img] = useState(data.bride_img || "")
  const [gallery, setGallery] = useState(data.gallery || "")
  const [rekening_qr_img, setRekening_qr_img] = useState(data.rekening_qr_img || "")
  const [reception_location_google_maps, setReception_location_google_maps] = useState(data.reception_location_google_maps || "")

  const onChangeFile = async (e) => {

    if (e.target.id === "gallery") {
      const galleries = document.querySelector(`#${e.target.id}`).files
      let galleriesStringSplit = ""

      for (let i = 0; i < galleries.length; i++) {
        if (i !== 0) galleriesStringSplit += "|"
        galleriesStringSplit += await toBase64(galleries[i])
      }

      setGallery(galleriesStringSplit)

    } else {
      const imageBase64 = await toBase64(document.querySelector(`#${e.target.id}`).files[0])

      if (e.target.id === "bride_couple_img") setBride_couple_img(imageBase64)
      if (e.target.id === "background1") setBackground1(imageBase64)
      if (e.target.id === "background2") setBackground2(imageBase64)
      if (e.target.id === "bridegroom_img") setBridegroom_img(imageBase64)
      if (e.target.id === "bride_img") setBride_img(imageBase64)
      if (e.target.id === "rekening_qr_img") setRekening_qr_img(imageBase64)
    }

  }


  const onUpdate = async (payload) => {

    const updatePayload = {
      ...payload,
      bride_couple_img: bride_couple_img,
      background1: background1,
      background2: background2,
      bridegroom_img: bridegroom_img,
      bride_img: bride_img,
      gallery: gallery,
      rekening_qr_img: rekening_qr_img,
      reception_location_google_maps: reception_location_google_maps,
      product_id: product_id
    }

    const { data } = await putBuyerProduct(buyerProductId, updatePayload)

    if (data) {
      setNotifUpdate(true)
    }
  }

  return (

    <LayoutAdmin mainClassName="tamu" user={data?.bridegroom_call_name}>
      <div className="admin_welcomeCards aturUndangan">
        <div className="admin_welcomeContent cards_single">
          <h5>Halo, Selamat datang di halaman <b>ATUR UNDANGAN</b></h5>
          <p>Di halaman ini kamu dapat mengatur content undangan kamu</p>
          <div className="admin_welcomeFooter">
            <Link href={`/undangan0${product_id}/pernikahan-${data?.bridegroom_call_name}-dan-${data?.bride_call_name}`}>
              <a target="_blank">
                <button className="btn-second">Lihat disini {">"}</button>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(onUpdate)}>
        <section className="createInvitation_container container">
          <div className="box-main">
            <div className="createInvitation_title">
              <h4>Content Utama</h4>
            </div>
            <div className="createInvitation_content">
              <div className="mb-3 d-flex justify-content-center flex-direction-column">
                {(data.bride_couple_img || bride_couple_img) &&
                  <img className="createInvitation_brideCoupleImg" src={`${bride_couple_img ? bride_couple_img : data.bride_couple_img}`} />
                }
                <div>
                  <label className="form-label">Foto Cover</label>
                  <input
                    type="file"
                    className="form-control"
                    id="bride_couple_img"
                    placeholder="Nama Mempelai Laki-Laki"
                    onChange={(e) => onChangeFile(e)}
                  />
                </div>
              </div>
              {/* <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Backsound Lagu</label>
                <input type="file" className="form-control" id="exampleFormControlInput1" placeholder="Nama Mempelai Laki-Laki" />
              </div> */}
            </div>
          </div>
        </section>

        <section className="createInvitation_container container">
          <div className="box-main">
            <div className="createInvitation_title">
              <h4>Background image</h4>
            </div>
            <div className="createInvitation_content">
              <div className="mb-3">
                {(data.background1 || background1) &&
                  <img className="createInvitation_brideCoupleImgSquare" src={background1 ? background1 : data.background1} />
                }
                <div>
                  <label htmlFor="exampleFormControlInput1" className="form-label">Background section cover</label>
                  <input
                    type="file"
                    className="form-control"
                    id="background1"
                    onChange={(e) => onChangeFile(e)}
                  />
                </div>
              </div>
              <div className="mb-3">
                {(data.background2 || background2) &&
                  <img className="createInvitation_brideCoupleImgSquare" src={background2 ? background2 : data.background2} />
                }
                <div>
                  <label htmlFor="exampleFormControlInput1" className="form-label">Background Save the Date</label>
                  <input
                    type="file"
                    className="form-control"
                    id="background2"
                    onChange={(e) => onChangeFile(e)}
                  />
                </div>
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

              <div className="mb-3 d-flex justify-content-center flex-direction-column">
                {(data.bridegroom_img || bridegroom_img) &&
                  <img className="createInvitation_brideCoupleImg mb-12" src={`${bridegroom_img ? bridegroom_img : data.bridegroom_img}`} />
                }
                <div className="d-flex justify-content-center flex-direction-column">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Foto</label>
                  <input
                    type="file"
                    className="form-control"
                    id="bridegroom_img"
                    placeholder="Foto Mempelai Pria"
                    onChange={(e) => onChangeFile(e)}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Nama Lengkap</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nama Mempelai Laki-Laki"
                  defaultValue={data.bridegroom_full_name}
                  {...register("bridegroom_full_full_name")}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Nama Panggilan</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nama Panggilan Mempelai Laki-laki"
                  defaultValue={data.bridegroom_call_name}
                  {...register("bridegroom_call_name")}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Ayah</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nama Ayah  Mempelai Laki-Laki"
                  defaultValue={data.bridegroom_fathers}
                  {...register("bridegroom_fathers")}
                />
                {/* <span className="input_failedText">Harap mengisi data</span> */}
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Ibu</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={data.bridegroom_mother}
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
              <div className="mb-3 d-flex justify-content-center flex-direction-column">
                {(data.bride_img || bride_img) &&
                  <img className="createInvitation_brideCoupleImg" src={`${bride_img ? bride_img : data.bride_img}`} />
                }
                <div>
                  <label htmlFor="exampleFormControlInput1" className="form-label">Foto</label>
                  <input
                    type="file"
                    className="form-control"
                    id="bride_img"
                    placeholder="Foto Mempelai Pria"
                    onChange={(e) => onChangeFile(e)}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Nama Lengkap</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nama Mempelai Perempuan"
                  defaultValue={data.bride_full_name}
                  {...register("bride_full_name")}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Nama Panggilan</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nama Panggilan Mempelai Perempuan"
                  defaultValue={data.bride_call_name}
                  {...register("bride_call_name")}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Ayah</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nama Ayah  Mempelai Perempuan"
                  defaultValue={data.bride_woman_father}
                  {...register("bride_woman_father")}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Ibu</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nama Ibu  Mempelai Perempuan"
                  defaultValue={data.bride_woman_mother}
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
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Tanggal</label>
                <input
                  type="date"
                  className="form-control"
                  placeholder="Tanggal Pernikahan"
                  defaultValue={data.bride_date}
                  {...register("bride_date")}
                />
              </div>

              <div className="d-flex-space-between mb-3">
                <div className="w-50">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Jam Mulai</label>
                  <input
                    type="time"
                    className="form-control"
                    placeholder="Nama Ayah  Mempelai Perempuan"
                    defaultValue={data.bride_start_time}
                    {...register("bride_start_time")}
                  />
                </div>
                <div className="ml-4 w-50">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Jam Selesai</label>
                  <input
                    type="time"
                    className="form-control"
                    placeholder="Nama Ibu  Mempelai Perempuan"
                    defaultValue={data.bride_end_time}
                    {...register("bride_end_time")}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Tempat Akad Berlangsung</label>
                <textarea
                  className="form-control"
                  placeholder="Alamat bride_location"
                  defaultValue={data.bride_location}
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
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Tanggal</label>
                <input
                  type="date"
                  className="form-control"
                  placeholder="Nama Mempelai Perempuan"
                  defaultValue={data.reception_date}
                  {...register("reception_date")}
                />
              </div>

              <div className="d-flex mb-3">
                <div className="w-50">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Jam Mulai</label>
                  <input
                    type="time"
                    className="form-control"
                    placeholder="Nama Ayah  Mempelai Perempuan"
                    defaultValue={data.reception_start_time}
                    {...register("reception_start_time")}
                  />
                </div>
                <div className="ml-4 w-50">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Jam Selesai</label>
                  <input
                    type="time"
                    className="form-control"
                    placeholder="Nama Ibu  Mempelai Perempuan"
                    defaultValue={data.reception_end_time}
                    {...register("reception_end_time")}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Tempat Resepsi Berlangsung</label>
                <textarea
                  className="form-control"
                  placeholder="Alamat Resepsi"
                  defaultValue={data.reception_location}
                  {...register("reception_location")}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Google Maps</label>
                <textarea
                  className="form-control"
                  placeholder="Alamat Resepsi"
                  defaultValue={data.reception_location_google_maps}
                  onChange={(e) => setReception_location_google_maps(e.target.value)}
                />
              </div>
              {data.reception_location_google_maps &&
                <div
                  className="w-50 mt-12"
                  dangerouslySetInnerHTML={{ __html: data.reception_location_google_maps }}
                />
              }

            </div>
          </div>
        </section>

        <section className="createInvitation_container container">
          <div className="box-main">
            <div className="createInvitation_title">
              <h4>Gallery</h4>
            </div>
            <div className="createInvitation_content">
              <div className="mb-3 d-flex justify-content-center flex-direction-column">
                {gallery.split("|").length > 0 &&
                  <div className="mb-12">
                    {gallery.split("|").map((v, i) => {
                      return (
                        <img key={i} className="createInvitation_brideCoupleImgSquare" src={`${v}`} />
                      )
                    })}
                  </div>
                }
                <div>
                  <label htmlFor="exampleFormControlInput1" className="form-label">Masukkan Gallery Kamu</label>
                  <input
                    type="file"
                    className="form-control"
                    id="gallery"
                    placeholder="Foto Mempelai Pria"
                    onChange={(e) => onChangeFile(e)}
                    multiple
                  />
                </div>
              </div>
            </div>
          </div>
        </section>


        <section className="createInvitation_container container">
          <div className="box-main">
            <div className="createInvitation_title">
              <h4>Live Streaming Zoom</h4>
            </div>
            <div className="createInvitation_content">
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Zoom Link</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Masukkan Link Streaming Zoom"
                  {...register("live_streaming_zoom")}
                  defaultValue={data.live_streaming_zoom}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Zoom ID</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Masukkan Link Streaming Zoom"
                  {...register("live_streaming_zoom_meeting_id")}
                  defaultValue={data.live_streaming_zoom_meeting_id}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Zoom Password</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Masukkan Link Streaming Zoom"
                  {...register("live_streaming_zoom_password")}
                  defaultValue={data.live_streaming_zoom_password}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="createInvitation_container container">
          <div className="box-main">
            <div className="createInvitation_title">
              <h4>Live Streaming Instagram</h4>
            </div>
            <div className="createInvitation_content">
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Instagram Link</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Masukkan Link Streaming akun instagram"
                  {...register("live_streaming_ig")}
                  defaultValue={data.live_streaming_ig}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Instagram Accout</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Masukkan Link Streaming akun instagram"
                  {...register("live_streaming_ig_account")}
                  defaultValue={data.live_streaming_ig_account}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="createInvitation_container container">
          <div className="box-main">
            <div className="createInvitation_title">
              <h4>Pilih Design</h4>
            </div>
            <div className="createInvitation_content createInvitation_chooseDesign">
              <div className="home_portofolioCard">
                <h5 className="card-title">Design 01</h5>
                <img className="card-img-top" src="/img/design01.png" alt="Card image cap" />
                <div className="card-body  text-center">
                  <h5 className="card-title line-through">Rp 200,000 - 400,000</h5>
                  <h5 className="card-title c_main font-weight-bold">GRATIS</h5>
                  <div className="createInvitation_chooseDesignWrapper" onClick={(e) => setProduct_id(1)}>
                    <input
                      type="radio"
                      id="age1"
                      name="productId"
                      value="1"
                      checked={product_id == 1}
                    />
                    <label className="btn-second">Pilih Design</label>
                  </div>
                  <Link href="/undangan01" as={`/undangan01`}>
                    <button href="#" className="btn-green mt-4">Live Preview</button>
                  </Link>
                </div>
              </div>
              <div className="home_portofolioCard">
                <h5 className="card-title">Design 02</h5>
                <img className="card-img-top" src="/img/design02.png" alt="Card image cap" />
                <div className="card-body  text-center">
                  <h5 className="card-title line-through">Rp 200,000 - 400,000</h5>
                  <h5 className="card-title c_main font-weight-bold">GRATIS</h5>
                  <div className="createInvitation_chooseDesignWrapper" onClick={(e) => setProduct_id(2)}>
                    <input
                      type="radio"
                      id="age1"
                      name="product_id"
                      value="2"
                      checked={product_id == 2}
                    />
                    <label className="btn-second">Pilih Design</label>
                  </div>
                  <Link href="/undangan02" as={`/undangan02`}>
                    <button href="#" className="btn-green mt-4">Live Preview</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="createInvitation_container container">
          <div className="box-main">
            <div className="createInvitation_title">
              <h4>Rekening</h4>
              <smal>* rekening akan muncul saat tamu mengkonfirmasi berhalangan untuk hadir</smal>
            </div>
            <div className="createInvitation_content">
              <div className="mb-12 d-flex flex-direction-column">
                <label htmlFor="exampleFormControlInput1" className="form-label">Rekening</label>
                <small>* boleh menaru lebih dari 1 rekening</small>
                <textarea
                  className="form-control"
                  placeholder="ex: BCA-09123123 a.n Helmi Fauzi"
                  defaultValue={data.rekening}
                  {...register("rekening")}
                />
              </div>
              <div className="mb-3 d-flex justify-content-center flex-direction-column">
                {rekening_qr_img &&
                  <img className="createInvitation_brideCoupleImgSquare ml-0 mr-0 mx-auto" src={`${rekening_qr_img}`} />
                }
                <div>
                  <label className="form-label">Foto Rekening / QR Code </label>
                  <input
                    type="file"
                    className="form-control"
                    id="rekening_qr_img"
                    placeholder="Nama Mempelai Laki-Laki"
                    onChange={(e) => onChangeFile(e)}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>


        <section className="createInvitation_container container">
          <div className="box-main">
            <div className="createInvitation_submit">
              <button type="submit" className="btn btn-main">Simpan Perubahan</button>
            </div>
          </div>
        </section>
      </form>


      {notifUpdate &&
        <div className="popUp">
          <div className="popUp_background"></div>
          <div className="popUp_container d-flex flex-column">
            <i onClick={() => router.reload()}>Tutup [x]</i>
            <div className="d-flex justify-content-center align-items-center flex-direction-column">
              <div className="popUp_checkList">
                <img src="/img/checkl.svg" />
              </div>
              <h3 className="text-center"> Undangan Berhasil diubah</h3>
            </div>
            <button onClick={() => router.reload()} type="button" className="mt-4 btn btn-main">Kembali</button>
          </div>
        </div>
      }
    </LayoutAdmin>
  )
}



export const getServerSideProps = async ({ req }) => {

  const cookie = parseCookies(req.headers.cookie)

  const { data } = await getByID(cookie['buyerProductId'])

  return {
    props: {
      data: data || []
    }
  }
}


export default AturUndangan;