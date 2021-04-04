import Sidebar from '../sidebar/Sidebar'

const LayoutAdmin = ({ children }) => {
  return (
    <div className="admin">
      <Sidebar />
      <header>
        <h2>
          <label htmlFor="nav-toggle">
            <span className="las la-bars"></span>
          </label>
          Dashboard
        </h2>

        <div className="user_wrapper">
          <img src="img/2.jpg" width="40px" height="40px" alt="user" />
          <div>
            <h4>Helmi Fauzi</h4>
            <small>Super Admin</small>
          </div>
        </div>
      </header>
      <div className="main_content">
        <main>
          {children}
        </main>
      </div>
    </div>
  )
}

export default LayoutAdmin
