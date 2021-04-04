import LayoutAdmin from '../../components/Layout/LayoutAdmin'
import { getAnalytic } from '../../client/AdminApiServices'

const Admin = ({ data }) => {

  return (
    <LayoutAdmin>
      <div className="cards">
        <div className="cards_single">
          <div>
            <h1>{data.customers}</h1>
            <span>Customers</span>
          </div>
          <div>
            <span className="las la-users"></span>
          </div>
        </div>

        <div className="cards_single">
          <div>
            <h1>{data.project}</h1>
            <span>Project</span>
          </div>
          <div>
            <span className="las la-clipboard"></span>
          </div>
        </div>

        <div className="cards_single">
          <div>
            <h1>{data.orders}</h1>
            <span>Orders</span>
          </div>
          <div>
            <span className="las la-shopping-bag"></span>
          </div>
        </div>
        <div className="cards_single">
          <div>
            <h1>{data.income}</h1>
            <span>Income</span>
          </div>
          <div>
            <span className="lab la-google-wallet"></span>
          </div>
        </div>
      </div>

      <div className="recent_grid">
        <div className="projects">
          <div className="card">
            <div className="card_header">
              <h3>Recent Projects</h3>
              <button> See All <span className="las la-arrow-right">
              </span></button>
            </div>

            <div className="card_body">
              <table width="100%">
                <thead>
                  <tr>
                    <td>Project Title</td>
                    <td>UI Team</td>
                    <td>Status</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Ui/UX Design</td>
                    <td>UI Team</td>
                    <td>
                      <span className="status purple"></span>
                                                    review
                    </td>
                  </tr>
                  <tr>
                    <td>Web Development</td>
                    <td>Frontend</td>
                    <td>
                      <span className="status pink"></span>
                                                    in progress
                      </td>
                  </tr>
                  <tr>
                    <td>Ushpo app</td>
                    <td>Mobile Team</td>
                    <td>
                      <span className="status orange"></span>
                                                    pending
                       </td>
                  </tr>

                  <tr>
                    <td>Ui/UX Design</td>
                    <td>UI Team</td>
                    <td>
                      <span className="status purple"></span>
                                                    review
                      </td>
                  </tr>
                  <tr>
                    <td>Web Development</td>
                    <td>Frontend</td>
                    <td>
                      <span className="status pink"></span>
                                                    in progress
                       </td>
                  </tr>
                  <tr>
                    <td>Ushpo app</td>
                    <td>Mobile Team</td>
                    <td>
                      <span className="status orange"></span>
                        pending
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="customers">
          <div className="card">
            <div className="card_header">
              <h3>New customer</h3>
              <button> See All <span className="las la-arrow-right">
              </span></button>
            </div>

            <div className="card_body">
              <div className="customer">
                <div className="info">
                  <img src="img/2.jpg" width="40px" height="40px" alt="" />
                  <div>
                    <h4>Lewis S. Cunningham</h4>
                    <small>CEO Excerpt</small>
                  </div>
                </div>
                <div className="contact">
                  <span className="las la-user-circle"></span>
                  <span className="las la-comment"></span>
                  <span className="las la-phone"></span>
                </div>
              </div>
              <div className="customer">
                <div className="info">
                  <img src="pages/2.jpg" width="40px" height="40px" alt="" />
                  <div>
                    <h4>Lewis S. Cunningham</h4>
                    <small>CEO Excerpt</small>
                  </div>
                </div>
                <div className="contact">
                  <span className="las la-user-circle"></span>
                  <span className="las la-comment"></span>
                  <span className="las la-phone"></span>
                </div>
              </div>
              <div className="customer">
                <div className="info">
                  <img src="pages/2.jpg" width="40px" height="40px" alt="" />
                  <div>
                    <h4>Lewis S. Cunningham</h4>
                    <small>CEO Excerpt</small>
                  </div>
                </div>
                <div className="contact">
                  <span className="las la-user-circle"></span>
                  <span className="las la-comment"></span>
                  <span className="las la-phone"></span>
                </div>
              </div>
              <div className="customer">
                <div className="info">
                  <img src="pages/2.jpg" width="40px" height="40px" alt="" />
                  <div>
                    <h4>Lewis S. Cunningham</h4>
                    <small>CEO Excerpt</small>
                  </div>
                </div>
                <div className="contact">
                  <span className="las la-user-circle"></span>
                  <span className="las la-comment"></span>
                  <span className="las la-phone"></span>
                </div>
              </div>
              <div className="customer">
                <div className="info">
                  <img src="pages/2.jpg" width="40px" height="40px" alt="" />
                  <div>
                    <h4>Lewis S. Cunningham</h4>
                    <small>CEO Excerpt</small>
                  </div>
                </div>
                <div className="contact">
                  <div>
                    <span className="las la-user-circle"></span>
                    <span className="las la-comment"></span>
                    <span className="las la-phone"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  )
}


export const getServerSideProps = async () => {

  const { data } = await getAnalytic()

  return {
    props: {
      data
    }
  }
}


export default Admin;