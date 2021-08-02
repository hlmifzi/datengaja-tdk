import Layout from '../../components/Layout/Layout'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'


export default function Home() {
  const router = useRouter()
  const { register, handleSubmit, watch, formState: { errors } } = useForm()

  const onSubmit = async payload => {
    document.cookie = `bridegroom_call_name=helmi`
    document.cookie = `bride_call_name=jannah`
    document.cookie = `buyerProductId=1`
    router.push('/admin')
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)}>

        <section className="container-fluid login bg-grey-light">
          <div className="box-main">
            <div className="login_content">
              {/* <div className="notif_failed">
              <p>
                Kombinasi Password Salah
              </p>
            </div> */}
              <div class="mb-3">
                <label htmlFor="username" class="form-label">Email</label>
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  placeholder="Masukkan Email Anda"
                  {...register("username")}
                />
              </div>

              <div class="mb-3">
                <label htmlFor="password" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="Masukkan Password Anda"
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
