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
            src="icon/datengaja-white.png"
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
            <li>
              <a href="">
                <span className="las la-users"></span>
                <span>Customers</span>
              </a>
            </li>
            <Link href="/admin/projects" as={`/admin/projects`}>
              <li>
                <a href="">
                  <span className="las la-clipboard-list"></span>
                  <span>Projects</span>
                </a>
              </li>
            </Link>
            <li>
              <a href="">
                <span className="las la-shopping-bag"></span>
                <span>Orders</span>
              </a>
            </li>
            <li>
              <a href="">
                <span className="las la-receipt"></span>
                <span>Inventory</span>
              </a>
            </li>
            <li>
              <a href="">
                <span className="las la-user-circle"></span>
                <span>Accounts</span>
              </a>
            </li>
            <li>
              <a href="">
                <span className="las la-clipboard-list"></span>
                <span>Tasks</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
export default Sidebar;