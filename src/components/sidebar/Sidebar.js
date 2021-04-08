import Link from "next/link";

const Sidebar = () => {
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
                <a href="" className="active">
                  <span className="las la-igloo"></span>
                  <span>DashBoard</span>
                </a>
              </li>
            </Link>
            <Link href="/admin/dashboardTamu" as={`/admin/dashboard-tamu`}>
              <li>
                <a href="">
                  <span className="las la-igloo"></span>
                  <span>DashBoard Tamu</span>
                </a>
              </li>
            </Link>
            <Link href="/admin/bukuTamu" as={`/admin/buku-tamu`}>
              <li>
                <a href="">
                  <span className="las la-clipboard-list"></span>
                  <span>Buku Tamu</span>
                </a>
              </li>
            </Link>
            <Link href="/admin/tamu" as={`/admin/tamu`}>
              <li>
                <a href="">
                  <span className="las la-users"></span>
                  <span>Atur Tamu</span>
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