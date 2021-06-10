import Layout from '../components/Layout/Layout'
import { LazyLoadComponent } from "react-lazy-load-image-component";
import Link from "next/link"
export default function Home() {

  return (
    <Layout className="home">
      <section className="container home_create p-section">
        <div className="home_promotionWord" >
          <h1>Buat Undangan Nikah online <span>mudah</span> dan <span>cepat</span> secara <span>GRATIS</span>!</h1>
          <Link href="/buat-undangan" as={`/buat-undangan`}>
            <button className="btn-main">Buat Sekarang</button>
          </Link>
        </div>
        <img src="img/undangan-nikah-home1.png" />
      </section>

      <LazyLoadComponent>
        <section className="container-fluid p-section home_template">
          <img src="img/undangan-nikah-online-design-keren.png" />
          <div className="home_promotionTemplate" >
            <h1>Gak perlu mikirin design, kami menyediakan banyak <span>Design Keren</span> yang bebas anda pilih</h1>
          </div>
        </section>
      </LazyLoadComponent>

      <LazyLoadComponent>
        <section className="home_portofolio">
          <div className="text-center">
            <h2>Klien yang telah menggunakan jasa kami</h2>
          </div>

          <div className="home_portofolioContent p-section">
            <div class="home_portofolioCard">
              <h5 class="card-title">Helmi & Jannah</h5>
              <img class="card-img-top" src="/img/design01.png" alt="Card image cap" />
              <div class="card-body  text-center">
                <h5 class="card-title line-through">Rp 200,000 - 400,000</h5>
                <h5 class="card-title c_main font-weight-bold">GRATIS</h5>
                <Link href="/undangan01" as={`/undangan01`}>
                  <button href="#" class="btn-main">Lihat Demo</button>
                </Link>
              </div>
            </div>
            <div class="home_portofolioCard">
              <h5 class="card-title">Sulaiman dan Aisyah</h5>
              <img class="card-img-top" src="/img/design02.png" alt="Card image cap" />
              <div class="card-body text-center">
                <h5 class="card-title line-through">Rp 200,000 - 400,000</h5>
                <h5 class="card-title c_main font-weight-bold">GRATIS</h5>
                <Link href="/undangan01" as={`/undangan01`}>
                  <button href="#" class="btn-main">Lihat Demo</button>
                </Link>
              </div>
            </div>
            <div class="home_portofolioCard">
              <h5 class="card-title">Josua & Martina</h5>
              <img class="card-img-top" src="/img/design01.png" alt="Card image cap" />
              <div class="card-body  text-center">
                <h5 class="card-title line-through">Rp 200,000 - 400,000</h5>
                <h5 class="card-title c_main font-weight-bold">GRATIS</h5>
                <Link href="/undangan01" as={`/undangan01`}>
                  <button href="#" class="btn-main">Lihat Demo</button>
                </Link>
              </div>
            </div>
            <div class="home_portofolioCard">
              <h5 class="card-title">Helmi dan Jannah</h5>
              <img class="card-img-top" src="/img/design02.png" alt="Card image cap" />
              <div class="card-body text-center">
                <h5 class="card-title line-through">Rp 200,000 - 400,000</h5>
                <h5 class="card-title c_main font-weight-bold">GRATIS</h5>
                <Link href="/undangan02" as={`/undangan02`}>
                  <button href="#" class="btn-main">Lihat Demo</button>
                </Link>
              </div>
            </div>
            <div class="home_portofolioCard">
              <h5 class="card-title">Awan & Pelangi</h5>
              <img class="card-img-top" src="/img/design01.png" alt="Card image cap" />
              <div class="card-body  text-center">
                <h5 class="card-title line-through">Rp 200,000 - 400,000</h5>
                <h5 class="card-title c_main font-weight-bold">GRATIS</h5>
                <Link href="/undangan01" as={`/undangan01`}>
                  <button href="#" class="btn-main">Lihat Demo</button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </LazyLoadComponent>

      <LazyLoadComponent>
        <section className="container-fluid home_createInvitation bg-grey-light p-section">
          <h2>
            Buat undangan nikah online Anda hanya dalam 1 menit
        </h2>
          <Link href="/buat-undangan" as={`/buat-undangan`}>
            <button className="btn-main">Buat Undangan Sekarang</button>
          </Link>
        </section>
      </LazyLoadComponent>

    </Layout >
  )
}
