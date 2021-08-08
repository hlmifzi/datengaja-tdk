import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { getUser } from '../../client/User'
import Layout from '../../components/Layout/Layout'


export default function Home() {
  const router = useRouter()
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState(false)

  const onLogin = async query => {
    const { data } = await getUser({ params: query })

    if (data.length === 1) {
      document.cookie = `bridegroom_call_name=${data[0]?.bridegroom_call_name}`
      document.cookie = `bride_call_name=${data[0]?.bride_call_name}`
      document.cookie = `buyerProductId=${data[0]?.buyerProductId}`
      document.cookie = `isAdmin=${data[0]?.type}`
    } else {
      setError(true)
    }

    if (data[0]?.type === 'ADMIN') router.push('/admin/laporan')
    if (data[0]?.type === 'BUYER') router.push('/admin')
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit(onLogin)}>

        <section className="container-fluid login bg-grey-light">
          <div className="box-main">
            <div className="login_content">
              {error &&
                <div className="notif_failed">
                  <p>
                    Kombinasi Password Salah
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

              <div class="mb-3">
                <label htmlFor="password" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="Masukkan Password Anda"
                  required
                  {...register("password")}
                />
              </div>
            </div>
          </div>
          <div className="box-main">
            <div className="login_content">
              <button type="submit" class="btn btn-main">Masuk</button>
            </div>
          </div>
        </section>
      </form>
    </Layout>
  )
}
