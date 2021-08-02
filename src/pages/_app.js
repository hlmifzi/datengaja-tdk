import moment from 'moment'
import '../scss/globals.scss'


function MyApp({ Component, pageProps }) {
  moment.updateLocale('en', {
    weekdays: [
      "Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"
    ],
    months: [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ]
  })
  return (
    <Component {...pageProps} />
  )
}

export default MyApp
