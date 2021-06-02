import Link from "next/link"
import Header from "../Header/Header"

const Layout = ({ children, className }) => {
  return (
    <>
      <Header />
      <main className={className}>
        {children}
      </main>
      <Link href="https://api.whatsapp.com/send?phone=6281294923207&text=Hallo%20saya%20tertarik%20untuk%20membuat%20undangan%20online%20.%20Bolehkah%20saya%20bertanya%20sesuatu%2C%20terdapat%20kendala%20saat%20membuat%20undangannya">
        <div className="layout_contactWA">
          <img src="icon/undangan-nikah-wa.png"></img>
        </div>
      </Link>

      <footer className="container-fluid footer bg-main p-section">
        <div className="container footer_inner">
          <div className="footer_brandDesc">
            <img
              src="icon/datengaja-white.png"
              alt="datengaja_icon"
              className="navbar_brand cursor-pointer"
            />
            <p> Jalan Serdang Baru RT 015 RW 004 Kelurahan serdang Kecamatan kemayoran Jakarta Pusat 1650</p>
          </div>

          <div className="footer_options">
            <ul>
              <li>Menu</li>
              <li>Beranda</li>
              <li>Buat Undangan</li>
              <li>Harga</li>
              <li>Masuk</li>
            </ul>
          </div>
          <div className="footer_options">
            <ul>
              <li>Social Media</li>
              <li>Instagram</li>
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Tiktok</li>
            </ul>
          </div>
          <div className="footer_options">
            <ul>
              <li>Social Media</li>
              <li>Instagram</li>
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Tiktok</li>
            </ul>
          </div>
        </div>

        <div className="footer_copyright">
          copyright datengaja.id, all right reserved.
        </div>
      </footer>
    </>
  )
}

export default Layout
