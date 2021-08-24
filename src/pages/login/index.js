import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { getUser, updateUser } from '../../client/User'
import Layout from '../../components/Layout/Layout'


export default function Home() {
  const router = useRouter()
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [page, setPage] = useState("login")

  const onLogin = async query => {
    const { data, error } = await getUser({ params: query })

    if (data?.length === 1) {
      document.cookie = `bridegroom_call_name=${data[0]?.bridegroom_call_name}`
      document.cookie = `bride_call_name=${data[0]?.bride_call_name}`
      document.cookie = `buyerProductId=${data[0]?.buyerProductId}`
      document.cookie = `isAdmin=${data[0]?.type}`
      if (data[0]?.type === 'ADMIN') router.push('/admin/laporan')
      if (data[0]?.type === 'BUYER') router.push('/admin')
    } else {
      setSuccess(false)
      setError(error?.meta.message || "Kombinasi Password Salah")
    }
  }

  const onLUpdatePassword = async (payload) => {
    const { data, error } = await updateUser(payload)

    if (data) {
      setPage("login")
      setError(`Password dengan email ${payload.email} Berhasil di ubah`)
      setSuccess(true)
    } else {
      setSuccess(false)
      setError(error?.meta.message)
    }
  }

  return (
    <Layout>
      <form onSubmit={page === 'login' ? handleSubmit(onLogin) : handleSubmit(onLUpdatePassword)}>
        <section className="container-fluid login bg-grey-light">
          <div className="box-main">
            <div className="login_content">
              {error &&
                <div className={success ? "notif_success" : "notif_failed"}>
                  <p>
                    {error}
                  </p>
                </div>
              }
              <div class="mb-3">
                <label htmlFor="username" class="form-label">Email</label>
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  placeholder="Masukkan Email Anda"
                  required
                  {...register("email")}
                />
              </div>

              <div class="mb-4">
                <label htmlFor="password" class="form-label">{page === "login" ? "Password" : "New Password"}</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder={page === "login" ? "Masukkan Password Anda" : "Masukkan Password Baru Anda"}
                  required
                  {...register("password")}
                />
              </div>
              <div onClick={() => setPage(page === "login" ? "forgotPassword" : "login")}>
                <label htmlFor="password" class="form-label cursor-pointer"> {page === "login" ? "Lupa Password" : "Sudah Punya Akun"} ?</label>
              </div>
            </div>
          </div>
          <div className="box-main">
            <div className="login_content">
              <button type="submit" class="btn btn-main">{page === "login" ? "Masuk" : "Ubah Password"}</button>
            </div>
          </div>
        </section>
      </form>
    </Layout >
  )
}
