
import LayoutAdmin from '../../../components/Layout/LayoutAdmin'
import { getBuyerProducts } from '../../../client/BuyerProduct'
import { useRouter } from 'next/router'
import { parseCookies } from '../../../utils/helper/HelperUtils'
import { CSVLink } from "react-csv";

const Laporan = ({
  dataBuyerProducts,
  bridegroom_call_name,
  bride_call_name
}) => {
  console.log("🚀 ~ file: index.js ~ line 13 ~ dataBuyerProducts", dataBuyerProducts)

  const router = useRouter()

  const onSubmit = async (
    buyerProductId,
    bridegroom_call_name,
    bride_call_name
  ) => {
    document.cookie = `bridegroom_call_name=${bridegroom_call_name}`
    document.cookie = `bride_call_name=${bride_call_name}`
    document.cookie = `buyerProductId=${buyerProductId}`
    router.push('/admin')
  }


  const headers = [
    { label: "Nama", key: "bridegroom_full_name" },
    { label: "No Hp", key: "handphone_wa" },
    { label: "Tanggal Nikah", key: "reception_date" },
  ]

  return (
    <LayoutAdmin mainClassName="dashboardTamu" user={bridegroom_call_name}>
      <div className="w-100 mb-8">
        <div className="projects">
          <div className="card">
            <div className="card_header">
              <h3>Filter</h3>

            </div>
            <div className="card_bodyFilter">
              <div>
                <label>Dari</label>
                <input type="date" />
              </div>
              <div>
                <label>Sampai</label>
                <input type="date" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-100">
        <div className="projects">
          <div className="card">
            <div className="card_header">
              <h3>Customer</h3>
              <div>
                <CSVLink
                  data={dataBuyerProducts}
                  filename={`Laporan-pemakaian-datengaja.csv`}
                  className="btn-green ml-2"
                  headers={headers}
                  target="_blank"
                  separator={";"}
                >
                  Export Excel
                </CSVLink>

              </div>
            </div>

            <div className="card_body">
              <table width="100%">
                <thead>
                  <tr>
                    <td>Nama</td>
                    <td>Nomor telepon</td>
                    <td>Total Harga</td>
                    <td>Status</td>
                    <td>married date</td>
                    <td>Aksi</td>
                  </tr>
                </thead>
                <tbody>
                  {dataBuyerProducts.map((v, i) => {

                    return (
                      <tr>
                        <td>{v.bridegroom_full_name}</td>
                        <td>
                          {v.handphone_wa}
                        </td>
                        <td>Gratis</td>
                        <td>
                          <span className="sticker sticker_present">
                            lunas
                          </span>
                        </td>
                        <td>{v.reception_date}</td>
                        <td>
                          <a className="w-100" target="_blank" onClick={() => onSubmit(v.id, v.bridegroom_call_name, v.bride_call_name)}>
                            <button className="btn-second px-4">Atur</button>
                          </a>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  )
}


export const getServerSideProps = async ({ req }) => {

  const cookie = parseCookies(req.headers.cookie)

  const { data: dataBuyerProducts } = await getBuyerProducts()

  return {
    props: {
      dataBuyerProducts,
      bridegroom_call_name: cookie['bridegroom_call_name'],
      bride_call_name: cookie['bride_call_name'],
    }
  }
}



export default Laporan;