import Header from "../Header/Header"

const Layout = ({ children, className }) => {
  return (
    <>
      <Header />
      <main className={className}>
        {children}
      </main>

      <div className="layout_contactWA">
        <img src="icon/undangan-nikah-wa.png"></img>
      </div>

      <footer className="container-fluid bg-main p-section">
        <div className="container footer_inner">
          <div className="footer_brandDesc">
            <img
              src="icon/datengaja-white.png"
              alt="datengaja_icon"
              className="navbar_brand cursor-pointer"
            />
            <p> Jalan Serdang Baru RT 015 RW 004 Kelurahan serdang Kecamatan kemayoran Jakarta Pusat 1650</p>
          </div>

          <div className="footer_menu">
            <ul>
              <li>Beranda</li>
              <li>Buat Undangan</li>
              <li>Syarat Ketentuan</li>
            </ul>
          </div>
          <div className="footer_mediaSocial">
            <ul>
              <li>Instagram</li>
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Tiktok</li>
            </ul>
          </div>
          <div className="footer_mediaSocial">
            <ul>
              <li>Instagram</li>
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Tiktok</li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Layout
