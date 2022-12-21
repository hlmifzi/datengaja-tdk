import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophoneSlash,
  faMusic,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import SEO from "../../SEO";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { putInvitation } from "../../../client/Invitations";
import { getInvitations } from "../../../client/BuyerProduct";

const Design01 = ({
  data,
  invitations,
  dataInvitationCategory,
  eventId,
  invitationCategoryId,
}) => {
  const router = useRouter();

  const guest = router?.query?.kepada?.replace(/-/g, " ") || "Nama Tamu";
  const guestGeneral = router?.query?.to?.replace(/-/g, " ") || false;
  const guestId = invitations.filter(
    (v) => v.fullname === router?.query?.kepada
  )[0]?.id;
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [dataInvitations, setDataInvitations] = useState(invitations);
  const { register, handleSubmit } = useForm();

  const countDate = new Date(data.reception_date).getTime();

  const timeToEvent = () => {
    const now = new Date().getTime();
    const gap = countDate - now;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const d = Math.floor(gap / day);
    const h = Math.floor((gap % day) / hour);
    const m = Math.floor((gap % hour) / minute);
    const s = Math.floor((gap % minute) / second);

    document.getElementById("day").innerText = d;
    document.getElementById("hour").innerText = h;
    document.getElementById("minute").innerText = m;
    document.getElementById("second").innerText = s;
  };

  const onSubmitConfirmation = async (payload) => {
    const { data: postUpdateData, error } = await putInvitation(guestId, payload);
    const { data: invitations } = await getInvitations(data?.id, {
      params: {
        category_id: invitationCategoryId,
      },
    });
    if (error) {
        console.error("terjadi kesalahan")
    } else {
      setDataInvitations(invitations);
      setShowGiftModal(payload.attend_status);
    }
  };

  const onSearch = async (query) => {
    delete query["attend_status"];
    const { data: dataInvitations } = await getInvitations(data.id, {
      params: query,
    });
    if (dataInvitations) setDataInvitations(dataInvitations);
    else setDataInvitations([]);
  };

  const attendStatus = {
    "Menunggu Konfirmasi": "sticker_waiting",
    "Akan Hadir": "sticker_confirm",
    Berhalangan: "sticker_cancel",
    "Telah Hadir": "sticker_present",
  };

  useEffect(() => {
    setInterval(() => {
      timeToEvent();
    }, 1000);
  }, []);

  return (
    <div className="design01__container">
      <SEO
        title={eventId}
        description={`undangan/${eventId}?kepada=${guest}`}
        image={data?.bride_couple_img}
      />
      {/* <audio src="/music/barakallah.mp3" id="audio" autoPlay  /> */}
      {/* <div className="bgsoundmp3-container">
          <div className="unmute-sound d-none">
              <FontAwesomeIcon icon={faMicrophoneSlash} size='1x' color='#000' />
          </div>
          <div className="mute-sound d-block">
              <FontAwesomeIcon icon={faMusic} size='1x' color='#000' />
          </div>
      </div> */}

      <nav className="main-nav">
        <div className="container">
          <a href="#home">
            <img src="/icon/loving-home.png" />
            <span>Home</span>
          </a>
          <a href="#couple">
            <img src="/icon/wedding-rings.png" />
            <span>Couple</span>
          </a>
          <div className="bgsound-container">
            <iframe
              id="audio"
              width="350"
              height="200"
              src="https://www.youtube.com/embed/fA9lWWuOJfU?autoplay=1&loop=1&playlist=fA9lWWuOJfU&rel=0&showinfo=0&color=white&iv_load_policy=3"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            />
          </div>
          <a href="#event">
            <img src="/icon/wedding-day.png" />
            <span>Event</span>
          </a>
          <a href="#invitations">
            <img src="/icon/wedding-video.png" />
            <span>Tamu</span>
          </a>
        </div>
      </nav>

      <div className="container">
        <section className="guest-section text-center">
          <img
            src={data?.bride_couple_img.replace("'", "")}
            className="circle-img"
          />
          <p>
            Kepada Yth. <br /> Bapak/Ibu/Saudara/i
          </p>
          <h2 className="font-segoe-ui text-capitalize">
            {guestGeneral || guest}
          </h2>
        </section>
      </div>

      <div
        className="banner"
        style={{
          backgroundImage: `linear-gradient(to bottom,rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(${data?.background1})`,
        }}
        id="home"
      >
        <div className="shape-top">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 283.5 27.8"
            preserveAspectRatio="none"
          >
            <path
              className="shape-fill"
              d="M283.5,9.7c0,0-7.3,4.3-14,4.6c-6.8,0.3-12.6,0-20.9-1.5c-11.3-2-33.1-10.1-44.7-5.7	s-12.1,4.6-18,7.4c-6.6,3.2-20,9.6-36.6,9.3C131.6,23.5,99.5,7.2,86.3,8c-1.4,0.1-6.6,0.8-10.5,2c-3.8,1.2-9.4,3.8-17,4.7	c-3.2,0.4-8.3,1.1-14.2,0.9c-1.5-0.1-6.3-0.4-12-1.6c-5.7-1.2-11-3.1-15.8-3.7C6.5,9.2,0,10.8,0,10.8V0h283.5V9.7z M260.8,11.3	c-0.7-1-2-0.4-4.3-0.4c-2.3,0-6.1-1.2-5.8-1.1c0.3,0.1,3.1,1.5,6,1.9C259.7,12.2,261.4,12.3,260.8,11.3z M242.4,8.6	c0,0-2.4-0.2-5.6-0.9c-3.2-0.8-10.3-2.8-15.1-3.5c-8.2-1.1-15.8,0-15.1,0.1c0.8,0.1,9.6-0.6,17.6,1.1c3.3,0.7,9.3,2.2,12.4,2.7	C239.9,8.7,242.4,8.6,242.4,8.6z M185.2,8.5c1.7-0.7-13.3,4.7-18.5,6.1c-2.1,0.6-6.2,1.6-10,2c-3.9,0.4-8.9,0.4-8.8,0.5	c0,0.2,5.8,0.8,11.2,0c5.4-0.8,5.2-1.1,7.6-1.6C170.5,14.7,183.5,9.2,185.2,8.5z M199.1,6.9c0.2,0-0.8-0.4-4.8,1.1	c-4,1.5-6.7,3.5-6.9,3.7c-0.2,0.1,3.5-1.8,6.6-3C197,7.5,199,6.9,199.1,6.9z M283,6c-0.1,0.1-1.9,1.1-4.8,2.5s-6.9,2.8-6.7,2.7	c0.2,0,3.5-0.6,7.4-2.5C282.8,6.8,283.1,5.9,283,6z M31.3,11.6c0.1-0.2-1.9-0.2-4.5-1.2s-5.4-1.6-7.8-2C15,7.6,7.3,8.5,7.7,8.6	C8,8.7,15.9,8.3,20.2,9.3c2.2,0.5,2.4,0.5,5.7,1.6S31.2,11.9,31.3,11.6z M73,9.2c0.4-0.1,3.5-1.6,8.4-2.6c4.9-1.1,8.9-0.5,8.9-0.8	c0-0.3-1-0.9-6.2-0.3S72.6,9.3,73,9.2z M71.6,6.7C71.8,6.8,75,5.4,77.3,5c2.3-0.3,1.9-0.5,1.9-0.6c0-0.1-1.1-0.2-2.7,0.2	C74.8,5.1,71.4,6.6,71.6,6.7z M93.6,4.4c0.1,0.2,3.5,0.8,5.6,1.8c2.1,1,1.8,0.6,1.9,0.5c0.1-0.1-0.8-0.8-2.4-1.3	C97.1,4.8,93.5,4.2,93.6,4.4z M65.4,11.1c-0.1,0.3,0.3,0.5,1.9-0.2s2.6-1.3,2.2-1.2s-0.9,0.4-2.5,0.8C65.3,10.9,65.5,10.8,65.4,11.1	z M34.5,12.4c-0.2,0,2.1,0.8,3.3,0.9c1.2,0.1,2,0.1,2-0.2c0-0.3-0.1-0.5-1.6-0.4C36.6,12.8,34.7,12.4,34.5,12.4z M152.2,21.1	c-0.1,0.1-2.4-0.3-7.5-0.3c-5,0-13.6-2.4-17.2-3.5c-3.6-1.1,10,3.9,16.5,4.1C150.5,21.6,152.3,21,152.2,21.1z"
            ></path>
            <path
              className="shape-fill"
              d="M269.6,18c-0.1-0.1-4.6,0.3-7.2,0c-7.3-0.7-17-3.2-16.6-2.9c0.4,0.3,13.7,3.1,17,3.3	C267.7,18.8,269.7,18,269.6,18z"
            ></path>
            <path
              className="shape-fill"
              d="M227.4,9.8c-0.2-0.1-4.5-1-9.5-1.2c-5-0.2-12.7,0.6-12.3,0.5c0.3-0.1,5.9-1.8,13.3-1.2	S227.6,9.9,227.4,9.8z"
            ></path>
            <path
              className="shape-fill"
              d="M204.5,13.4c-0.1-0.1,2-1,3.2-1.1c1.2-0.1,2,0,2,0.3c0,0.3-0.1,0.5-1.6,0.4	C206.4,12.9,204.6,13.5,204.5,13.4z"
            ></path>
            <path
              className="shape-fill"
              d="M201,10.6c0-0.1-4.4,1.2-6.3,2.2c-1.9,0.9-6.2,3.1-6.1,3.1c0.1,0.1,4.2-1.6,6.3-2.6	S201,10.7,201,10.6z"
            ></path>
            <path
              className="shape-fill"
              d="M154.5,26.7c-0.1-0.1-4.6,0.3-7.2,0c-7.3-0.7-17-3.2-16.6-2.9c0.4,0.3,13.7,3.1,17,3.3	C152.6,27.5,154.6,26.8,154.5,26.7z"
            ></path>
            <path
              className="shape-fill"
              d="M41.9,19.3c0,0,1.2-0.3,2.9-0.1c1.7,0.2,5.8,0.9,8.2,0.7c4.2-0.4,7.4-2.7,7-2.6	c-0.4,0-4.3,2.2-8.6,1.9c-1.8-0.1-5.1-0.5-6.7-0.4S41.9,19.3,41.9,19.3z"
            ></path>
            <path
              className="shape-fill"
              d="M75.5,12.6c0.2,0.1,2-0.8,4.3-1.1c2.3-0.2,2.1-0.3,2.1-0.5c0-0.1-1.8-0.4-3.4,0	C76.9,11.5,75.3,12.5,75.5,12.6z"
            ></path>
            <path
              className="shape-fill"
              d="M15.6,13.2c0-0.1,4.3,0,6.7,0.5c2.4,0.5,5,1.9,5,2c0,0.1-2.7-0.8-5.1-1.4	C19.9,13.7,15.7,13.3,15.6,13.2z"
            ></path>
          </svg>
        </div>
        <img src="/img/gif_ourwedding_wh.gif" className="ourWedding_img" />
        <h1 className="font-dancing-script text-center">
          {data.bride_call_name} <br />& <br /> {data.bridegroom_call_name}{" "}
        </h1>
        <div className="countdown">
          <p>WAKTU MENUJU ACARA</p>
          <div className="countdown-container">
            <div id="day">NA</div>
            <div id="hour">NA</div>
            <div id="minute">NA</div>
            <div id="second">NA</div>
          </div>
        </div>
        <p className="save-theDate-text">
          - {moment(new Date(data.reception_date)).format("LL")} -
        </p>
        <button
          className="save-theDate-button d-flex cursor-pointer"
          onClick={() =>
            window.open(
              "https://calendar.google.com/calendar/u/0/r/eventedit?text=Acara+Pernikahan+Jannah+dan+Helmi&details&dates=20230128T090000/20230128T160000&location=SMK%20Negeri%2026%20Jakarta,%20Jl.%20Balai%20Pustaka%20Baru%20I%20No.2,%20RT.2/RW.7,%20Rawamangun,%20Kec.%20Pulo%20Gadung,%20Kota%20Jakarta%20Timur,%20Daerah%20Khusus%20Ibukota%20Jakarta%2013220,%20Indonesia",
              "_blank"
            )
          }
        >
          <FontAwesomeIcon
            icon={faCalendarAlt}
            width={20}
            style={{ marginRight: "8px" }}
            color="#fff"
          />
          <p>Simpan Tanggal</p>
        </button>
        <div className="shape-bottom">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 283.5 27.8"
            preserveAspectRatio="none"
          >
            <path
              className="shape-fill"
              d="M283.5,9.7c0,0-7.3,4.3-14,4.6c-6.8,0.3-12.6,0-20.9-1.5c-11.3-2-33.1-10.1-44.7-5.7	s-12.1,4.6-18,7.4c-6.6,3.2-20,9.6-36.6,9.3C131.6,23.5,99.5,7.2,86.3,8c-1.4,0.1-6.6,0.8-10.5,2c-3.8,1.2-9.4,3.8-17,4.7	c-3.2,0.4-8.3,1.1-14.2,0.9c-1.5-0.1-6.3-0.4-12-1.6c-5.7-1.2-11-3.1-15.8-3.7C6.5,9.2,0,10.8,0,10.8V0h283.5V9.7z M260.8,11.3	c-0.7-1-2-0.4-4.3-0.4c-2.3,0-6.1-1.2-5.8-1.1c0.3,0.1,3.1,1.5,6,1.9C259.7,12.2,261.4,12.3,260.8,11.3z M242.4,8.6	c0,0-2.4-0.2-5.6-0.9c-3.2-0.8-10.3-2.8-15.1-3.5c-8.2-1.1-15.8,0-15.1,0.1c0.8,0.1,9.6-0.6,17.6,1.1c3.3,0.7,9.3,2.2,12.4,2.7	C239.9,8.7,242.4,8.6,242.4,8.6z M185.2,8.5c1.7-0.7-13.3,4.7-18.5,6.1c-2.1,0.6-6.2,1.6-10,2c-3.9,0.4-8.9,0.4-8.8,0.5	c0,0.2,5.8,0.8,11.2,0c5.4-0.8,5.2-1.1,7.6-1.6C170.5,14.7,183.5,9.2,185.2,8.5z M199.1,6.9c0.2,0-0.8-0.4-4.8,1.1	c-4,1.5-6.7,3.5-6.9,3.7c-0.2,0.1,3.5-1.8,6.6-3C197,7.5,199,6.9,199.1,6.9z M283,6c-0.1,0.1-1.9,1.1-4.8,2.5s-6.9,2.8-6.7,2.7	c0.2,0,3.5-0.6,7.4-2.5C282.8,6.8,283.1,5.9,283,6z M31.3,11.6c0.1-0.2-1.9-0.2-4.5-1.2s-5.4-1.6-7.8-2C15,7.6,7.3,8.5,7.7,8.6	C8,8.7,15.9,8.3,20.2,9.3c2.2,0.5,2.4,0.5,5.7,1.6S31.2,11.9,31.3,11.6z M73,9.2c0.4-0.1,3.5-1.6,8.4-2.6c4.9-1.1,8.9-0.5,8.9-0.8	c0-0.3-1-0.9-6.2-0.3S72.6,9.3,73,9.2z M71.6,6.7C71.8,6.8,75,5.4,77.3,5c2.3-0.3,1.9-0.5,1.9-0.6c0-0.1-1.1-0.2-2.7,0.2	C74.8,5.1,71.4,6.6,71.6,6.7z M93.6,4.4c0.1,0.2,3.5,0.8,5.6,1.8c2.1,1,1.8,0.6,1.9,0.5c0.1-0.1-0.8-0.8-2.4-1.3	C97.1,4.8,93.5,4.2,93.6,4.4z M65.4,11.1c-0.1,0.3,0.3,0.5,1.9-0.2s2.6-1.3,2.2-1.2s-0.9,0.4-2.5,0.8C65.3,10.9,65.5,10.8,65.4,11.1	z M34.5,12.4c-0.2,0,2.1,0.8,3.3,0.9c1.2,0.1,2,0.1,2-0.2c0-0.3-0.1-0.5-1.6-0.4C36.6,12.8,34.7,12.4,34.5,12.4z M152.2,21.1	c-0.1,0.1-2.4-0.3-7.5-0.3c-5,0-13.6-2.4-17.2-3.5c-3.6-1.1,10,3.9,16.5,4.1C150.5,21.6,152.3,21,152.2,21.1z"
            ></path>
            <path
              className="shape-fill"
              d="M269.6,18c-0.1-0.1-4.6,0.3-7.2,0c-7.3-0.7-17-3.2-16.6-2.9c0.4,0.3,13.7,3.1,17,3.3	C267.7,18.8,269.7,18,269.6,18z"
            ></path>
            <path
              className="shape-fill"
              d="M227.4,9.8c-0.2-0.1-4.5-1-9.5-1.2c-5-0.2-12.7,0.6-12.3,0.5c0.3-0.1,5.9-1.8,13.3-1.2	S227.6,9.9,227.4,9.8z"
            ></path>
            <path
              className="shape-fill"
              d="M204.5,13.4c-0.1-0.1,2-1,3.2-1.1c1.2-0.1,2,0,2,0.3c0,0.3-0.1,0.5-1.6,0.4	C206.4,12.9,204.6,13.5,204.5,13.4z"
            ></path>
            <path
              className="shape-fill"
              d="M201,10.6c0-0.1-4.4,1.2-6.3,2.2c-1.9,0.9-6.2,3.1-6.1,3.1c0.1,0.1,4.2-1.6,6.3-2.6	S201,10.7,201,10.6z"
            ></path>
            <path
              className="shape-fill"
              d="M154.5,26.7c-0.1-0.1-4.6,0.3-7.2,0c-7.3-0.7-17-3.2-16.6-2.9c0.4,0.3,13.7,3.1,17,3.3	C152.6,27.5,154.6,26.8,154.5,26.7z"
            ></path>
            <path
              className="shape-fill"
              d="M41.9,19.3c0,0,1.2-0.3,2.9-0.1c1.7,0.2,5.8,0.9,8.2,0.7c4.2-0.4,7.4-2.7,7-2.6	c-0.4,0-4.3,2.2-8.6,1.9c-1.8-0.1-5.1-0.5-6.7-0.4S41.9,19.3,41.9,19.3z"
            ></path>
            <path
              className="shape-fill"
              d="M75.5,12.6c0.2,0.1,2-0.8,4.3-1.1c2.3-0.2,2.1-0.3,2.1-0.5c0-0.1-1.8-0.4-3.4,0	C76.9,11.5,75.3,12.5,75.5,12.6z"
            ></path>
            <path
              className="shape-fill"
              d="M15.6,13.2c0-0.1,4.3,0,6.7,0.5c2.4,0.5,5,1.9,5,2c0,0.1-2.7-0.8-5.1-1.4	C19.9,13.7,15.7,13.3,15.6,13.2z"
            ></path>
          </svg>
        </div>
      </div>

      <div className="container" id="couple">
        <section className="just-married text-center">
          <img src="/img/gif_Just-Married.gif" />
          <div className="one">
            <b className="font-dancing-script bismillah_text d-block">
              Bismillaahirrahmaanirrahiim
            </b>
            <b>Assalamu`alaikum Warahmatullaahi Wabarakaatuh</b>
            <p className="text-opening">
              Maha Suci Allah yang telah menciptakan makhluk-Nya
              berpasang-pasangan. Ya Allah semoga ridho-Mu tercurah mengiringi
              pernikahan kami:
            </p>
          </div>
          <div className="three">
            <img src={data.bride_img} className="circle-img" />
            <h2>{data.bride_full_name}</h2>
            <p>
              Putri dari <b>Bpk. {data.bride_woman_father}</b> &{" "}
              <b>Ibu {data.bride_woman_mother}</b>
            </p>
          </div>
          <p>Dengan</p>
          <div className="two">
            <img src={data.bridegroom_img} className="circle-img" />
            <h2>{data.bridegroom_full_name}</h2>
            <p>
              Putra dari <b>Bpk. {data.bridegroom_fathers}</b> &{" "}
              <b>Ibu {data.bridegroom_mother}</b>
            </p>
          </div>
        </section>
      </div>
      <div
        className="banner save-the-date text-center"
        id="event"
        style={{
          backgroundImage: `linear-gradient(to bottom,rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(${data.background2})`,
        }}
      >
        <div className="shape-top">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 283.5 27.8"
            preserveAspectRatio="none"
          >
            <path
              className="shape-fill"
              d="M283.5,9.7c0,0-7.3,4.3-14,4.6c-6.8,0.3-12.6,0-20.9-1.5c-11.3-2-33.1-10.1-44.7-5.7	s-12.1,4.6-18,7.4c-6.6,3.2-20,9.6-36.6,9.3C131.6,23.5,99.5,7.2,86.3,8c-1.4,0.1-6.6,0.8-10.5,2c-3.8,1.2-9.4,3.8-17,4.7	c-3.2,0.4-8.3,1.1-14.2,0.9c-1.5-0.1-6.3-0.4-12-1.6c-5.7-1.2-11-3.1-15.8-3.7C6.5,9.2,0,10.8,0,10.8V0h283.5V9.7z M260.8,11.3	c-0.7-1-2-0.4-4.3-0.4c-2.3,0-6.1-1.2-5.8-1.1c0.3,0.1,3.1,1.5,6,1.9C259.7,12.2,261.4,12.3,260.8,11.3z M242.4,8.6	c0,0-2.4-0.2-5.6-0.9c-3.2-0.8-10.3-2.8-15.1-3.5c-8.2-1.1-15.8,0-15.1,0.1c0.8,0.1,9.6-0.6,17.6,1.1c3.3,0.7,9.3,2.2,12.4,2.7	C239.9,8.7,242.4,8.6,242.4,8.6z M185.2,8.5c1.7-0.7-13.3,4.7-18.5,6.1c-2.1,0.6-6.2,1.6-10,2c-3.9,0.4-8.9,0.4-8.8,0.5	c0,0.2,5.8,0.8,11.2,0c5.4-0.8,5.2-1.1,7.6-1.6C170.5,14.7,183.5,9.2,185.2,8.5z M199.1,6.9c0.2,0-0.8-0.4-4.8,1.1	c-4,1.5-6.7,3.5-6.9,3.7c-0.2,0.1,3.5-1.8,6.6-3C197,7.5,199,6.9,199.1,6.9z M283,6c-0.1,0.1-1.9,1.1-4.8,2.5s-6.9,2.8-6.7,2.7	c0.2,0,3.5-0.6,7.4-2.5C282.8,6.8,283.1,5.9,283,6z M31.3,11.6c0.1-0.2-1.9-0.2-4.5-1.2s-5.4-1.6-7.8-2C15,7.6,7.3,8.5,7.7,8.6	C8,8.7,15.9,8.3,20.2,9.3c2.2,0.5,2.4,0.5,5.7,1.6S31.2,11.9,31.3,11.6z M73,9.2c0.4-0.1,3.5-1.6,8.4-2.6c4.9-1.1,8.9-0.5,8.9-0.8	c0-0.3-1-0.9-6.2-0.3S72.6,9.3,73,9.2z M71.6,6.7C71.8,6.8,75,5.4,77.3,5c2.3-0.3,1.9-0.5,1.9-0.6c0-0.1-1.1-0.2-2.7,0.2	C74.8,5.1,71.4,6.6,71.6,6.7z M93.6,4.4c0.1,0.2,3.5,0.8,5.6,1.8c2.1,1,1.8,0.6,1.9,0.5c0.1-0.1-0.8-0.8-2.4-1.3	C97.1,4.8,93.5,4.2,93.6,4.4z M65.4,11.1c-0.1,0.3,0.3,0.5,1.9-0.2s2.6-1.3,2.2-1.2s-0.9,0.4-2.5,0.8C65.3,10.9,65.5,10.8,65.4,11.1	z M34.5,12.4c-0.2,0,2.1,0.8,3.3,0.9c1.2,0.1,2,0.1,2-0.2c0-0.3-0.1-0.5-1.6-0.4C36.6,12.8,34.7,12.4,34.5,12.4z M152.2,21.1	c-0.1,0.1-2.4-0.3-7.5-0.3c-5,0-13.6-2.4-17.2-3.5c-3.6-1.1,10,3.9,16.5,4.1C150.5,21.6,152.3,21,152.2,21.1z"
            ></path>
            <path
              className="shape-fill"
              d="M269.6,18c-0.1-0.1-4.6,0.3-7.2,0c-7.3-0.7-17-3.2-16.6-2.9c0.4,0.3,13.7,3.1,17,3.3	C267.7,18.8,269.7,18,269.6,18z"
            ></path>
            <path
              className="shape-fill"
              d="M227.4,9.8c-0.2-0.1-4.5-1-9.5-1.2c-5-0.2-12.7,0.6-12.3,0.5c0.3-0.1,5.9-1.8,13.3-1.2	S227.6,9.9,227.4,9.8z"
            ></path>
            <path
              className="shape-fill"
              d="M204.5,13.4c-0.1-0.1,2-1,3.2-1.1c1.2-0.1,2,0,2,0.3c0,0.3-0.1,0.5-1.6,0.4	C206.4,12.9,204.6,13.5,204.5,13.4z"
            ></path>
            <path
              className="shape-fill"
              d="M201,10.6c0-0.1-4.4,1.2-6.3,2.2c-1.9,0.9-6.2,3.1-6.1,3.1c0.1,0.1,4.2-1.6,6.3-2.6	S201,10.7,201,10.6z"
            ></path>
            <path
              className="shape-fill"
              d="M154.5,26.7c-0.1-0.1-4.6,0.3-7.2,0c-7.3-0.7-17-3.2-16.6-2.9c0.4,0.3,13.7,3.1,17,3.3	C152.6,27.5,154.6,26.8,154.5,26.7z"
            ></path>
            <path
              className="shape-fill"
              d="M41.9,19.3c0,0,1.2-0.3,2.9-0.1c1.7,0.2,5.8,0.9,8.2,0.7c4.2-0.4,7.4-2.7,7-2.6	c-0.4,0-4.3,2.2-8.6,1.9c-1.8-0.1-5.1-0.5-6.7-0.4S41.9,19.3,41.9,19.3z"
            ></path>
            <path
              className="shape-fill"
              d="M75.5,12.6c0.2,0.1,2-0.8,4.3-1.1c2.3-0.2,2.1-0.3,2.1-0.5c0-0.1-1.8-0.4-3.4,0	C76.9,11.5,75.3,12.5,75.5,12.6z"
            ></path>
            <path
              className="shape-fill"
              d="M15.6,13.2c0-0.1,4.3,0,6.7,0.5c2.4,0.5,5,1.9,5,2c0,0.1-2.7-0.8-5.1-1.4	C19.9,13.7,15.7,13.3,15.6,13.2z"
            ></path>
          </svg>
        </div>

        <div className="container save-the-date-container">
          <img src="/img/gif_Save-The-Date.gif" className="save-the-date-gif" />
          <p>
            Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta'ala, kami
            mengundang Bapak/Ibu/Saudara/i, untuk menghadiri <br /> Resepsi
            Pernikahan kami.
          </p>
          <div className="date">
            <div className="card">
              <div className="card-header">
                <img src="/icon/wedding-rings-white.png" />
                <h3 className="font-dancing-script">Akad Pernikahan</h3>
              </div>
              <div className="card-body">
                <ul>
                  <li>
                    <i className="far fa-calendar-alt"></i>
                    <p>{moment(data.bride_date).format("LL")}</p>
                  </li>
                  <li>
                    <i className="far fa-clock"></i>
                    <p>
                      Pukul {data.bride_start_time} WIB s.d{" "}
                      {data.bride_end_time + " WIB" || "selesai"}
                    </p>
                  </li>
                  <li>
                    <i className="fas fa-map-marker-alt"></i>
                    <p>{data.bride_location}</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <img src="/icon/wedding-rings-white.png" />
                <h3 className="font-dancing-script">Resepsi Pernikahan</h3>
              </div>
              <div className="card-body">
                <ul>
                  <li>
                    <i className="far fa-calendar-alt"></i>
                    <b className="reception_date">
                      {moment(data.reception_date).format("LL")}
                    </b>
                  </li>
                  <li>
                    <i className="far fa-clock"></i>
                    <p>
                      Pukul {data.reception_start_time} WIB s.d{" "}
                      {data.reception_end_time + " WIB" || "selesai"}
                    </p>
                  </li>
                  <li>
                    <i className="fas fa-map-marker-alt"></i>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data.reception_location,
                      }}
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="map">
            <div
              className="map_iframe"
              dangerouslySetInnerHTML={{
                __html: data.reception_location_google_maps,
              }}
            />
          </div>
        </div>
        <div className="shape-bottom">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 283.5 27.8"
            preserveAspectRatio="none"
          >
            <path
              className="shape-fill"
              d="M283.5,9.7c0,0-7.3,4.3-14,4.6c-6.8,0.3-12.6,0-20.9-1.5c-11.3-2-33.1-10.1-44.7-5.7	s-12.1,4.6-18,7.4c-6.6,3.2-20,9.6-36.6,9.3C131.6,23.5,99.5,7.2,86.3,8c-1.4,0.1-6.6,0.8-10.5,2c-3.8,1.2-9.4,3.8-17,4.7	c-3.2,0.4-8.3,1.1-14.2,0.9c-1.5-0.1-6.3-0.4-12-1.6c-5.7-1.2-11-3.1-15.8-3.7C6.5,9.2,0,10.8,0,10.8V0h283.5V9.7z M260.8,11.3	c-0.7-1-2-0.4-4.3-0.4c-2.3,0-6.1-1.2-5.8-1.1c0.3,0.1,3.1,1.5,6,1.9C259.7,12.2,261.4,12.3,260.8,11.3z M242.4,8.6	c0,0-2.4-0.2-5.6-0.9c-3.2-0.8-10.3-2.8-15.1-3.5c-8.2-1.1-15.8,0-15.1,0.1c0.8,0.1,9.6-0.6,17.6,1.1c3.3,0.7,9.3,2.2,12.4,2.7	C239.9,8.7,242.4,8.6,242.4,8.6z M185.2,8.5c1.7-0.7-13.3,4.7-18.5,6.1c-2.1,0.6-6.2,1.6-10,2c-3.9,0.4-8.9,0.4-8.8,0.5	c0,0.2,5.8,0.8,11.2,0c5.4-0.8,5.2-1.1,7.6-1.6C170.5,14.7,183.5,9.2,185.2,8.5z M199.1,6.9c0.2,0-0.8-0.4-4.8,1.1	c-4,1.5-6.7,3.5-6.9,3.7c-0.2,0.1,3.5-1.8,6.6-3C197,7.5,199,6.9,199.1,6.9z M283,6c-0.1,0.1-1.9,1.1-4.8,2.5s-6.9,2.8-6.7,2.7	c0.2,0,3.5-0.6,7.4-2.5C282.8,6.8,283.1,5.9,283,6z M31.3,11.6c0.1-0.2-1.9-0.2-4.5-1.2s-5.4-1.6-7.8-2C15,7.6,7.3,8.5,7.7,8.6	C8,8.7,15.9,8.3,20.2,9.3c2.2,0.5,2.4,0.5,5.7,1.6S31.2,11.9,31.3,11.6z M73,9.2c0.4-0.1,3.5-1.6,8.4-2.6c4.9-1.1,8.9-0.5,8.9-0.8	c0-0.3-1-0.9-6.2-0.3S72.6,9.3,73,9.2z M71.6,6.7C71.8,6.8,75,5.4,77.3,5c2.3-0.3,1.9-0.5,1.9-0.6c0-0.1-1.1-0.2-2.7,0.2	C74.8,5.1,71.4,6.6,71.6,6.7z M93.6,4.4c0.1,0.2,3.5,0.8,5.6,1.8c2.1,1,1.8,0.6,1.9,0.5c0.1-0.1-0.8-0.8-2.4-1.3	C97.1,4.8,93.5,4.2,93.6,4.4z M65.4,11.1c-0.1,0.3,0.3,0.5,1.9-0.2s2.6-1.3,2.2-1.2s-0.9,0.4-2.5,0.8C65.3,10.9,65.5,10.8,65.4,11.1	z M34.5,12.4c-0.2,0,2.1,0.8,3.3,0.9c1.2,0.1,2,0.1,2-0.2c0-0.3-0.1-0.5-1.6-0.4C36.6,12.8,34.7,12.4,34.5,12.4z M152.2,21.1	c-0.1,0.1-2.4-0.3-7.5-0.3c-5,0-13.6-2.4-17.2-3.5c-3.6-1.1,10,3.9,16.5,4.1C150.5,21.6,152.3,21,152.2,21.1z"
            ></path>
            <path
              className="shape-fill"
              d="M269.6,18c-0.1-0.1-4.6,0.3-7.2,0c-7.3-0.7-17-3.2-16.6-2.9c0.4,0.3,13.7,3.1,17,3.3	C267.7,18.8,269.7,18,269.6,18z"
            ></path>
            <path
              className="shape-fill"
              d="M227.4,9.8c-0.2-0.1-4.5-1-9.5-1.2c-5-0.2-12.7,0.6-12.3,0.5c0.3-0.1,5.9-1.8,13.3-1.2	S227.6,9.9,227.4,9.8z"
            ></path>
            <path
              className="shape-fill"
              d="M204.5,13.4c-0.1-0.1,2-1,3.2-1.1c1.2-0.1,2,0,2,0.3c0,0.3-0.1,0.5-1.6,0.4	C206.4,12.9,204.6,13.5,204.5,13.4z"
            ></path>
            <path
              className="shape-fill"
              d="M201,10.6c0-0.1-4.4,1.2-6.3,2.2c-1.9,0.9-6.2,3.1-6.1,3.1c0.1,0.1,4.2-1.6,6.3-2.6	S201,10.7,201,10.6z"
            ></path>
            <path
              className="shape-fill"
              d="M154.5,26.7c-0.1-0.1-4.6,0.3-7.2,0c-7.3-0.7-17-3.2-16.6-2.9c0.4,0.3,13.7,3.1,17,3.3	C152.6,27.5,154.6,26.8,154.5,26.7z"
            ></path>
            <path
              className="shape-fill"
              d="M41.9,19.3c0,0,1.2-0.3,2.9-0.1c1.7,0.2,5.8,0.9,8.2,0.7c4.2-0.4,7.4-2.7,7-2.6	c-0.4,0-4.3,2.2-8.6,1.9c-1.8-0.1-5.1-0.5-6.7-0.4S41.9,19.3,41.9,19.3z"
            ></path>
            <path
              className="shape-fill"
              d="M75.5,12.6c0.2,0.1,2-0.8,4.3-1.1c2.3-0.2,2.1-0.3,2.1-0.5c0-0.1-1.8-0.4-3.4,0	C76.9,11.5,75.3,12.5,75.5,12.6z"
            ></path>
            <path
              className="shape-fill"
              d="M15.6,13.2c0-0.1,4.3,0,6.7,0.5c2.4,0.5,5,1.9,5,2c0,0.1-2.7-0.8-5.1-1.4	C19.9,13.7,15.7,13.3,15.6,13.2z"
            ></path>
          </svg>
        </div>
      </div>

      <section className="gallery" id="gallery">
        <div className="container">
          <h2 className="title">Gallery</h2>
          <p className="text-center">
            Momen Bahagia {data.bridegroom_call_name} dan {data.bride_call_name}
          </p>
          <div className="galleryContainer">
            {data?.gallery?.split("|")?.map((v, i) => (
              <a key={i} href={v} target="__blank">
                <img src={v} />
              </a>
            ))}
          </div>
          <iframe
            style={{
              width: "100%",
              height: "515px",
              maxHeight: "60vw",
              maxWidth: "calc(100vw - 16px)",
            }}
            src="https://www.youtube.com/embed/y8GYhpIPOeA"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
        </div>
      </section>

      {(data.live_streaming_ig || data.live_streaming_zoom) && (
        <section className="liveStreaming">
          <div className="container">
            <div className="text-center">
              <h2 className="title">Live Streaming pernikahan kami</h2>
            </div>

            <div className="liveStreaming_body">
              <div className="d-flex">
                {data.live_streaming_zoom && (
                  <div className="liveStreaming_instagramContainer">
                    <img
                      src="/img/zoomIcon.png"
                      className="liveStreaming_zoomIcon"
                      alt="zoomIcon"
                    />
                    <button className="btn liveStreaming_buttonZoom">
                      Live Via Zoom
                    </button>
                  </div>
                )}
                {data.live_streaming_ig && (
                  <div className="liveStreaming_instagramContainer">
                    <img
                      src="/img/instgramIcon.jpg"
                      className="liveStreaming_instagramIcon"
                      alt="zoomIcon"
                    />
                    <button className="btn liveStreaming_buttonInstagram">
                      Live Via Instagram
                    </button>
                  </div>
                )}
              </div>
              <br />
              {data.live_streaming_zoom && (
                <>
                  <p>Meeting ID: {data.live_streaming_zoom_meeting_id}</p>
                  <p>Password: {data.live_streaming_zoom_password}</p>
                </>
              )}
              {data.live_streaming_ig_account && (
                <p>instagram: @{data.live_streaming_ig_account}</p>
              )}
            </div>
          </div>
        </section>
      )}
      <section className="contact">
        <div className="container">
          <div className="text-center">
            <h2 className="title">Do'a Pernikahan</h2>
            <h3>
              Barakallahu laka, wa baraka 'alaika wa jama'a bainakuma fii khair.
            </h3>
            <p className="mb-32">
              “Semoga Allah memberkahimu ketika bahagia dan ketika susah <br />
              dan mengumpulkan kalian berdua dalam kebaikan.” <br />
              (HR. Abu Daud, no. 2130; Tirmidzi, no. 1091.)
            </p>
          </div>

          {!guestGeneral && (
            <>
              <div className="text-center" id="invitations">
                <h2 className="title">
                  Konfirmasi Kehadiran beserta Ucapan Selamat & Do'a untuk
                </h2>
                <p>
                  {data.bridegroom_call_name} & {data.bride_call_name}
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmitConfirmation)}>
                <div className="d-flex">
                  <div className="form-control border-0 user_name">
                    <input type="text" value={guest} disabled />
                  </div>
                  <div className="user_statusChoose">
                    <div className="input-group">
                      <select
                        className="custom-select"
                        {...register("attend_status")}
                      >
                        <option selected>Pilih Status</option>
                        <option value="Akan Hadir">Akan Hadir</option>
                        <option value="Berhalangan">Behalangan</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-control border-0">
                  <textarea
                    placeholder="Ucapan Do'a & Harapan"
                    {...register("greetings")}
                  />
                </div>
                <button type="submit" className="btn" disabled={!data.id}>
                  Konfirmasi
                </button>
              </form>
              <form onSubmit={handleSubmit(onSearch)}>
                <div className="user_search">
                  <div className="input-group">
                    <select
                      className="custom-select"
                      id="inputGroupSelect04"
                      {...register("category_id")}
                    >
                      <option value="">Cari Kategori</option>
                      {dataInvitationCategory
                        ?.filter((v) => v.id === invitationCategoryId)
                        ?.map((v, i) => {
                          return (
                            <option value={v.id} key={i} selected>
                              {v.desc}{" "}
                              {v.time_start !== "00:00:00" &&
                              v.time_end !== "00:00:00"
                                ? `(${v?.session} : ${v.time_start} - ${v.time_end})`
                                : ""}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <input
                    type="text"
                    className="form-control user_searchName"
                    placeholder="Cari Nama Tamu"
                    aria-describedby="basic-addon2"
                    {...register("invitation_name")}
                  />
                  <button type="submit" class="btn user_btnSearch">
                    Cari
                  </button>
                </div>
              </form>
              <div className="comment">
                {dataInvitations?.length > 0 ? (
                  dataInvitations?.map((v, i) => {
                    return (
                      <div className="comment-user" key={i}>
                        <div className="comment-body">
                          <div className="user">
                            <div className="user_status">
                              <div>
                                <div className="text-capitalize">
                                  {v?.fullname?.replace(/-/g, " ")}
                                </div>
                                <span className="user_category">
                                  {v.desc}
                                  {/* {v.time_start && v.time_end && (
                                  <b>
                                    ({v.desc} ({v.time_start || "-"}-
                                    {v.time_end || "-"} WIB))
                                  </b>
                                )} */}
                                </span>
                              </div>
                            </div>
                            <div
                              className={`sticker ${
                                attendStatus[v.attend_status]
                              }`}
                            >
                              {v.attend_status}
                            </div>
                          </div>
                          <p>{v.greetings || "Belum memberikan ucapan"}</p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div>
                    <h3>Tidak Ada Data</h3>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <div className="text-center gift_onlineContainer">
          <h2 className="title">Tanda Kasih Online</h2>
          <p>
            Terima Kasih! Telah mengkonfirmasi kehadiran di acara pernikahan
            kami.
          </p>
          <div className="giftOnlinePage_container">
            <img className="gift_img" src={data.rekening_qr_img} alt="image" />
            <div className="gift_thankYouTextPage">
              <br />
              <p>
                Tanpa mengurangi rasa hormat, bagi Anda yang ingin memberikan
                tanda kasih secara online untuk kami dapat melalui
                <br />
                <b>
                  <div dangerouslySetInnerHTML={{ __html: data.rekening }} />
                </b>
              </p>
              <Link
                target="_blank"
                href={`https://api.whatsapp.com/send?phone=62${data.phone}&text=Hallo%20saya%2C%20m`}
              >
                <button className="btn gift_sendTransferBtnPage">
                  Kirim Bukti Transfer
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="text-center">
        Copyright 2022, All Right reserved datengaja
      </footer>

      {showGiftModal === "Berhalangan" && (
        <div className="popUp">
          <div className="popUp_background"></div>
          <div className="popUp_absenContainer sm:flex-col">
            <i
              onClick={() => {
                setShowGiftModal(false);
              }}
            >
              Tutup [x]
            </i>
            <img
              className="gift_img h-auto"
              src={data.rekening_qr_img}
              alt="image"
            />
            <div className="gift_thankYouText">
              <h3>Terima Kasih!</h3>
              <p>Telah mengkonfirmasi kehadiran di acara pernikahan kami.</p>
              <br />
              <p>
                Tanpa mengurangi rasa hormat, bagi Anda yang ingin memberikan
                tanda kasih untuk kami dapat melalui
                <br />
                <b>
                  <div dangerouslySetInnerHTML={{ __html: data.rekening }} />
                </b>
              </p>
              <Link
                href={`https://api.whatsapp.com/send?phone=62${data.phone}&text=Hallo%20saya%2C%20maaf%20helmi%20ga%20bisa%20hadir%20dikarenakan......`}
              >
                <button className="btn gift_sendTransferBtn">
                  Kirim Bukti Transfer
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
      {showGiftModal === "Akan Hadir" && (
        <div className="popUp">
          <div className="popUp_background"></div>
          <div className="popUp_container">
            <i
              onClick={() => {
                setShowGiftModal(false);
              }}
            >
              Tutup [x]
            </i>
            <div className="gift_thankYouTextHadir">
              <img
                src={data?.bride_couple_img.replace("'", "")}
                className="circle-img"
              />
              <h3>Terima Kasih!</h3>
              <br />
              <p>Telah bersedia hadir di acara pernikahan kami.</p>
              <br />
              <p>
                Tiada Kesan Tanpa Kehadiranmu <b>{guest}</b>
                <br />
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Design01;
