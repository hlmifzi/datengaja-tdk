import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from "next/link"

const Header = () => {
  const router = useRouter()
  const [toogleMenu, setToogleMenu] = useState(false)

  const getIsActive = (url) => `${router.pathname === url && 'active'}`

  return (
    <nav className="navbar navbar-light bg-white" >
      <div className="navbar_container container">
        <Link href="/" as={`/`}>
          <img
            src="icon/datengaja.png"
            alt="datengaja_icon"
            className="navbar_brand cursor-pointer"
          />
        </Link>

        <div className="navbar_menuToogle">
          <input type="checkbox" onClick={() => setToogleMenu(!toogleMenu)} />
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={`navbar_menu d-flex ${toogleMenu && 'slide'}`}>
          {/* <Link href="/buat-undangan" as={`/buat-undangan`}>
            <div className={`navbar_menuItem ${getIsActive("/buat-undangan")}`}>
              Buat Undangan
            </div>
          </Link> */}
          {/* <Link href="/harga" as={`/harga`}>
            <div className={`navbar_menuItem ${getIsActive("/harga")}`}>
              Harga
            </div>
          </Link> */}
          <Link href="/login" as={`/login`}>
            <div className={`navbar_menuItem ${getIsActive("/login")}`}>
              Masuk
            </div>
          </Link>
        </div>
      </div>
    </nav >
  )
}

export default Header
