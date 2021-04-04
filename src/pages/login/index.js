import Layout from '../../components/Layout/Layout'
export default function Home() {
  return (
    <Layout>
      <section className="container-fluid login bg-grey-light">
        <div className="box-main">

          <div className="login_content">
            <div class="mb-3">
              <label htmlFor="username" class="form-label">Username</label>
              <input type="text" class="form-control" id="username" placeholder="Masukkan Username Anda" />
            </div>

            <div class="mb-3">
              <label htmlFor="password" class="form-label">Password</label>
              <input type="password" class="form-control" id="password" placeholder="Masukkan Password Anda" />
            </div>

            {/* <div class="login_forgotPassword mb-3 text-right">
              <label><small>Lupa Password ?</small></label>
            </div> */}
          </div>
        </div>
        <div className="box-main">
          <div className="login_content">
            <button type="button" class="btn btn-main">Masuk</button>
          </div>
        </div>

      </section>
    </Layout>
  )
}
