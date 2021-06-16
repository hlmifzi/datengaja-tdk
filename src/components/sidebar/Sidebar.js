import Link from "next/link"
import { useRouter } from 'next/router'

const Sidebar = () => {
  const router = useRouter()

  const getIsActive = (url) => `${router.pathname === url && 'active'}`

  return (
    <>
      <link rel="stylesheet" href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css"></link>
      <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1" />
      <input type="checkbox" id="nav-toggle" />
      <div className="sidebar">
        <div className="sidebar_brand">
          <img
            src="/icon/datengaja-white.png"
            alt="datengaja_icon"
            className="navbar_brand cursor-pointer"
          />
        </div>

        <div className="sidebar_menu">
          <ul>
            <Link href="/admin" as={`/admin`}>
              <li>
                <a href="" className={getIsActive("/admin")}>
                  <span className="las la-igloo"></span>
                  <span>DashBoard Utama</span>
                </a>
              </li>
            </Link>
            <Link href="/admin/dashboardTamu" as={`/admin/dashboardTamu`}>
              <li>
                <a href="" className={getIsActive("/admin/dashboardTamu")}>
                  <span className="las la-igloo"></span>
                  <span>DashBoard Tamu</span>
                </a>
              </li>
            </Link>
            <Link href="/admin/aturUndangan" as={`/admin/aturUndangan`}>
              <li>
                <a href="" className={getIsActive("/admin/aturUndangan")}>
                  <span className="las la-clipboard-list"></span>
                  <span>Atur Undangan</span>
                </a>
              </li>
            </Link>
            <Link href="/admin/tamu" as={`/admin/tamu`}>
              <li>
                <a href="" className={getIsActive("/admin/tamu")}>
                  <span className="las la-users"></span>
                  <span>Atur Tamu</span>
                </a>
              </li>
            </Link>
            <Link href="/admin/bukuTamu" as={`/admin/bukuTamu`}>
              <li>
                <a href="" className={getIsActive("/admin/bukuTamu")}>
                  <span className="las la-clipboard-list"></span>
                  <span>Buku Tamu</span>
                </a>
              </li>
            </Link>
            <Link href="/admin/laporan" as={`/admin/laporan`}>
              <li>
                <a href="" className={getIsActive("/admin/laporan")}>
                  <span className="las la-clipboard-list"></span>
                  <span>Laporan Penjualan</span>
                </a>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </>
  )
}
export default Sidebar;