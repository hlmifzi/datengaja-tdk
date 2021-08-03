import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import SEO from '../../SEO'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophoneSlash, faMusic } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
const Design01 = () => {
    const { query } = useRouter()
    const guest = query.kepada || "Nama Tamu"
    const [showGiftModal, setShowGiftModal] = useState(false)

    const countDate = new Date('Maret 11, 2021 00:00:00').getTime();

    // const timeToEvent = () => {
    //     const now = new Date().getTime();
    //     const gap = countDate - now;

    //     const second = 1000;
    //     const minute = second * 60;
    //     const hour = minute * 60;
    //     const day = hour * 24;

    //     const d = Math.floor(gap / day);
    //     const h = Math.floor((gap % day) / hour);
    //     const m = Math.floor((gap % hour) / minute);
    //     const s = Math.floor((gap % minute) / second);

    //     document.getElementById('day').innerText = d;
    //     document.getElementById('hour').innerText = h;
    //     document.getElementById('minute').innerText = m;
    //     document.getElementById('second').innerText = s;
    // }

    useEffect(() => {
        // setInterval(() => {
        //     timeToEvent();
        // }, 1000);

        const muteSound = document.querySelector('.mute-sound');
        const unMuteSound = document.querySelector('.unmute-sound');

        muteSound.addEventListener('click', () => {
            muteSound.classList.replace('d-block', 'd-none');
            unMuteSound.classList.replace('d-none', 'd-block');
            document.getElementById('audio').pause();
        });

        unMuteSound.addEventListener('click', () => {
            unMuteSound.classList.replace('d-block', 'd-none');
            muteSound.classList.replace('d-none', 'd-block');
            document.getElementById('audio').play();
        });
    }, [])

    return (
        <div className="design01__container">
            <SEO
                title="pernikahanAwan&Pelangi"
                description="undangan01/pernikahanAwan&Pelangi?kepada=sheila"
                image="/img/pernikahanHelmiJannah/profileHelmiJannah.jpg"
            />
            <audio src="/music/1.mp3" id="audio"></audio>
            <div className="bgsound-container">
                <div className="unmute-sound d-block">
                    <FontAwesomeIcon icon={faMicrophoneSlash} size='1x' color='#000' />
                </div>
                <div className="mute-sound d-none">
                    <FontAwesomeIcon icon={faMusic} size='1x' color='#000' />
                </div>
            </div>


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
                    <a href="#event">
                        <img src="/icon/wedding-day.png" />
                        <span>Event</span>
                    </a>
                    <a href="#gallery">
                        <img src="/icon/wedding-video.png" />
                        <span>Gallery</span>
                    </a>
                    <a href="#story">
                        <img src="/icon/conversation.png" />
                        <span>Gift</span>
                    </a>
                </div>
            </nav>

            <div className="container">
                <section className="guest-section text-center">
                    <img src="/img/pernikahanHelmiJannah/profileHelmiJannah.jpg" className="circle-img" />
                    <p>Kepada Yth. <br /> Bapak/Ibu/Saudara/i</p>
                    <h2 className="font-segoe-ui text-capitalize">{guest}</h2>
                </section>
            </div>

            <div className="banner" id="home">
                <div className="shape-top">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 283.5 27.8" preserveAspectRatio="none">
                        <path className="shape-fill" d="M283.5,9.7c0,0-7.3,4.3-14,4.6c-6.8,0.3-12.6,0-20.9-1.5c-11.3-2-33.1-10.1-44.7-5.7	s-12.1,4.6-18,7.4c-6.6,3.2-20,9.6-36.6,9.3C131.6,23.5,99.5,7.2,86.3,8c-1.4,0.1-6.6,0.8-10.5,2c-3.8,1.2-9.4,3.8-17,4.7	c-3.2,0.4-8.3,1.1-14.2,0.9c-1.5-0.1-6.3-0.4-12-1.6c-5.7-1.2-11-3.1-15.8-3.7C6.5,9.2,0,10.8,0,10.8V0h283.5V9.7z M260.8,11.3	c-0.7-1-2-0.4-4.3-0.4c-2.3,0-6.1-1.2-5.8-1.1c0.3,0.1,3.1,1.5,6,1.9C259.7,12.2,261.4,12.3,260.8,11.3z M242.4,8.6	c0,0-2.4-0.2-5.6-0.9c-3.2-0.8-10.3-2.8-15.1-3.5c-8.2-1.1-15.8,0-15.1,0.1c0.8,0.1,9.6-0.6,17.6,1.1c3.3,0.7,9.3,2.2,12.4,2.7	C239.9,8.7,242.4,8.6,242.4,8.6z M185.2,8.5c1.7-0.7-13.3,4.7-18.5,6.1c-2.1,0.6-6.2,1.6-10,2c-3.9,0.4-8.9,0.4-8.8,0.5	c0,0.2,5.8,0.8,11.2,0c5.4-0.8,5.2-1.1,7.6-1.6C170.5,14.7,183.5,9.2,185.2,8.5z M199.1,6.9c0.2,0-0.8-0.4-4.8,1.1	c-4,1.5-6.7,3.5-6.9,3.7c-0.2,0.1,3.5-1.8,6.6-3C197,7.5,199,6.9,199.1,6.9z M283,6c-0.1,0.1-1.9,1.1-4.8,2.5s-6.9,2.8-6.7,2.7	c0.2,0,3.5-0.6,7.4-2.5C282.8,6.8,283.1,5.9,283,6z M31.3,11.6c0.1-0.2-1.9-0.2-4.5-1.2s-5.4-1.6-7.8-2C15,7.6,7.3,8.5,7.7,8.6	C8,8.7,15.9,8.3,20.2,9.3c2.2,0.5,2.4,0.5,5.7,1.6S31.2,11.9,31.3,11.6z M73,9.2c0.4-0.1,3.5-1.6,8.4-2.6c4.9-1.1,8.9-0.5,8.9-0.8	c0-0.3-1-0.9-6.2-0.3S72.6,9.3,73,9.2z M71.6,6.7C71.8,6.8,75,5.4,77.3,5c2.3-0.3,1.9-0.5,1.9-0.6c0-0.1-1.1-0.2-2.7,0.2	C74.8,5.1,71.4,6.6,71.6,6.7z M93.6,4.4c0.1,0.2,3.5,0.8,5.6,1.8c2.1,1,1.8,0.6,1.9,0.5c0.1-0.1-0.8-0.8-2.4-1.3	C97.1,4.8,93.5,4.2,93.6,4.4z M65.4,11.1c-0.1,0.3,0.3,0.5,1.9-0.2s2.6-1.3,2.2-1.2s-0.9,0.4-2.5,0.8C65.3,10.9,65.5,10.8,65.4,11.1	z M34.5,12.4c-0.2,0,2.1,0.8,3.3,0.9c1.2,0.1,2,0.1,2-0.2c0-0.3-0.1-0.5-1.6-0.4C36.6,12.8,34.7,12.4,34.5,12.4z M152.2,21.1	c-0.1,0.1-2.4-0.3-7.5-0.3c-5,0-13.6-2.4-17.2-3.5c-3.6-1.1,10,3.9,16.5,4.1C150.5,21.6,152.3,21,152.2,21.1z"></path>
                        <path className="shape-fill" d="M269.6,18c-0.1-0.1-4.6,0.3-7.2,0c-7.3-0.7-17-3.2-16.6-2.9c0.4,0.3,13.7,3.1,17,3.3	C267.7,18.8,269.7,18,269.6,18z"></path>
                        <path className="shape-fill" d="M227.4,9.8c-0.2-0.1-4.5-1-9.5-1.2c-5-0.2-12.7,0.6-12.3,0.5c0.3-0.1,5.9-1.8,13.3-1.2	S227.6,9.9,227.4,9.8z"></path>
                        <path className="shape-fill" d="M204.5,13.4c-0.1-0.1,2-1,3.2-1.1c1.2-0.1,2,0,2,0.3c0,0.3-0.1,0.5-1.6,0.4	C206.4,12.9,204.6,13.5,204.5,13.4z"></path>
                        <path className="shape-fill" d="M201,10.6c0-0.1-4.4,1.2-6.3,2.2c-1.9,0.9-6.2,3.1-6.1,3.1c0.1,0.1,4.2-1.6,6.3-2.6	S201,10.7,201,10.6z"></path>
                        <path className="shape-fill" d="M154.5,26.7c-0.1-0.1-4.6,0.3-7.2,0c-7.3-0.7-17-3.2-16.6-2.9c0.4,0.3,13.7,3.1,17,3.3	C152.6,27.5,154.6,26.8,154.5,26.7z"></path>
                        <path className="shape-fill" d="M41.9,19.3c0,0,1.2-0.3,2.9-0.1c1.7,0.2,5.8,0.9,8.2,0.7c4.2-0.4,7.4-2.7,7-2.6	c-0.4,0-4.3,2.2-8.6,1.9c-1.8-0.1-5.1-0.5-6.7-0.4S41.9,19.3,41.9,19.3z"></path>
                        <path className="shape-fill" d="M75.5,12.6c0.2,0.1,2-0.8,4.3-1.1c2.3-0.2,2.1-0.3,2.1-0.5c0-0.1-1.8-0.4-3.4,0	C76.9,11.5,75.3,12.5,75.5,12.6z"></path>
                        <path className="shape-fill" d="M15.6,13.2c0-0.1,4.3,0,6.7,0.5c2.4,0.5,5,1.9,5,2c0,0.1-2.7-0.8-5.1-1.4	C19.9,13.7,15.7,13.3,15.6,13.2z"></path>
                    </svg>
                </div>
                <img src="/img/gif_ourwedding_wh.gif" />
                <h1 className="font-dancing-script">Helmi & Jannah</h1>
                <p>- SABTU, 26 DESEMBER 2021 -</p>
                <div className="shape-bottom">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 283.5 27.8" preserveAspectRatio="none">
                        <path className="shape-fill" d="M283.5,9.7c0,0-7.3,4.3-14,4.6c-6.8,0.3-12.6,0-20.9-1.5c-11.3-2-33.1-10.1-44.7-5.7	s-12.1,4.6-18,7.4c-6.6,3.2-20,9.6-36.6,9.3C131.6,23.5,99.5,7.2,86.3,8c-1.4,0.1-6.6,0.8-10.5,2c-3.8,1.2-9.4,3.8-17,4.7	c-3.2,0.4-8.3,1.1-14.2,0.9c-1.5-0.1-6.3-0.4-12-1.6c-5.7-1.2-11-3.1-15.8-3.7C6.5,9.2,0,10.8,0,10.8V0h283.5V9.7z M260.8,11.3	c-0.7-1-2-0.4-4.3-0.4c-2.3,0-6.1-1.2-5.8-1.1c0.3,0.1,3.1,1.5,6,1.9C259.7,12.2,261.4,12.3,260.8,11.3z M242.4,8.6	c0,0-2.4-0.2-5.6-0.9c-3.2-0.8-10.3-2.8-15.1-3.5c-8.2-1.1-15.8,0-15.1,0.1c0.8,0.1,9.6-0.6,17.6,1.1c3.3,0.7,9.3,2.2,12.4,2.7	C239.9,8.7,242.4,8.6,242.4,8.6z M185.2,8.5c1.7-0.7-13.3,4.7-18.5,6.1c-2.1,0.6-6.2,1.6-10,2c-3.9,0.4-8.9,0.4-8.8,0.5	c0,0.2,5.8,0.8,11.2,0c5.4-0.8,5.2-1.1,7.6-1.6C170.5,14.7,183.5,9.2,185.2,8.5z M199.1,6.9c0.2,0-0.8-0.4-4.8,1.1	c-4,1.5-6.7,3.5-6.9,3.7c-0.2,0.1,3.5-1.8,6.6-3C197,7.5,199,6.9,199.1,6.9z M283,6c-0.1,0.1-1.9,1.1-4.8,2.5s-6.9,2.8-6.7,2.7	c0.2,0,3.5-0.6,7.4-2.5C282.8,6.8,283.1,5.9,283,6z M31.3,11.6c0.1-0.2-1.9-0.2-4.5-1.2s-5.4-1.6-7.8-2C15,7.6,7.3,8.5,7.7,8.6	C8,8.7,15.9,8.3,20.2,9.3c2.2,0.5,2.4,0.5,5.7,1.6S31.2,11.9,31.3,11.6z M73,9.2c0.4-0.1,3.5-1.6,8.4-2.6c4.9-1.1,8.9-0.5,8.9-0.8	c0-0.3-1-0.9-6.2-0.3S72.6,9.3,73,9.2z M71.6,6.7C71.8,6.8,75,5.4,77.3,5c2.3-0.3,1.9-0.5,1.9-0.6c0-0.1-1.1-0.2-2.7,0.2	C74.8,5.1,71.4,6.6,71.6,6.7z M93.6,4.4c0.1,0.2,3.5,0.8,5.6,1.8c2.1,1,1.8,0.6,1.9,0.5c0.1-0.1-0.8-0.8-2.4-1.3	C97.1,4.8,93.5,4.2,93.6,4.4z M65.4,11.1c-0.1,0.3,0.3,0.5,1.9-0.2s2.6-1.3,2.2-1.2s-0.9,0.4-2.5,0.8C65.3,10.9,65.5,10.8,65.4,11.1	z M34.5,12.4c-0.2,0,2.1,0.8,3.3,0.9c1.2,0.1,2,0.1,2-0.2c0-0.3-0.1-0.5-1.6-0.4C36.6,12.8,34.7,12.4,34.5,12.4z M152.2,21.1	c-0.1,0.1-2.4-0.3-7.5-0.3c-5,0-13.6-2.4-17.2-3.5c-3.6-1.1,10,3.9,16.5,4.1C150.5,21.6,152.3,21,152.2,21.1z"></path>
                        <path className="shape-fill" d="M269.6,18c-0.1-0.1-4.6,0.3-7.2,0c-7.3-0.7-17-3.2-16.6-2.9c0.4,0.3,13.7,3.1,17,3.3	C267.7,18.8,269.7,18,269.6,18z"></path>
                        <path className="shape-fill" d="M227.4,9.8c-0.2-0.1-4.5-1-9.5-1.2c-5-0.2-12.7,0.6-12.3,0.5c0.3-0.1,5.9-1.8,13.3-1.2	S227.6,9.9,227.4,9.8z"></path>
                        <path className="shape-fill" d="M204.5,13.4c-0.1-0.1,2-1,3.2-1.1c1.2-0.1,2,0,2,0.3c0,0.3-0.1,0.5-1.6,0.4	C206.4,12.9,204.6,13.5,204.5,13.4z"></path>
                        <path className="shape-fill" d="M201,10.6c0-0.1-4.4,1.2-6.3,2.2c-1.9,0.9-6.2,3.1-6.1,3.1c0.1,0.1,4.2-1.6,6.3-2.6	S201,10.7,201,10.6z"></path>
                        <path className="shape-fill" d="M154.5,26.7c-0.1-0.1-4.6,0.3-7.2,0c-7.3-0.7-17-3.2-16.6-2.9c0.4,0.3,13.7,3.1,17,3.3	C152.6,27.5,154.6,26.8,154.5,26.7z"></path>
                        <path className="shape-fill" d="M41.9,19.3c0,0,1.2-0.3,2.9-0.1c1.7,0.2,5.8,0.9,8.2,0.7c4.2-0.4,7.4-2.7,7-2.6	c-0.4,0-4.3,2.2-8.6,1.9c-1.8-0.1-5.1-0.5-6.7-0.4S41.9,19.3,41.9,19.3z"></path>
                        <path className="shape-fill" d="M75.5,12.6c0.2,0.1,2-0.8,4.3-1.1c2.3-0.2,2.1-0.3,2.1-0.5c0-0.1-1.8-0.4-3.4,0	C76.9,11.5,75.3,12.5,75.5,12.6z"></path>
                        <path className="shape-fill" d="M15.6,13.2c0-0.1,4.3,0,6.7,0.5c2.4,0.5,5,1.9,5,2c0,0.1-2.7-0.8-5.1-1.4	C19.9,13.7,15.7,13.3,15.6,13.2z"></path>
                    </svg>
                </div>
            </div>

            <div className="container" id="couple">
                <section className="just-married text-center">
                    <img src="/img/gif_Just-Married.gif" />
                    <div className="one">
                        <p className="font-dancing-script">Bismillaahirrahmaanirrahiim</p>
                        <p>Assalamu`alaikum Warahmatullaahi Wabarakaatuh</p>
                        <p>Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. Ya Allah semoga ridho-Mu tercurah mengiringi pernikahan kami:</p>
                    </div>
                    <div className="two">
                        <img src="/img/pernikahanHelmiJannah/helmi.jpg" className="profile_image" />
                        <h2>Helmi Fauzi</h2>
                        <p>Putra dari Bpk. Lukman Efendi & Ibu Endang Dwi Nolowati</p>
                    </div>
                    <p>dan</p>
                    <div className="three">
                        <img src="/img/pernikahanHelmiJannah/jannah.jpg" className="profile_image" />
                        <h2>Siti Nur Jannah</h2>
                        <p>Putri dari Bpk. Abdul Halim & Ibu Hj. Maemunah</p>
                    </div>
                </section>
            </div>


            <div className="banner save-the-date text-center" id="event">
                <div className="shape-top">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 283.5 27.8" preserveAspectRatio="none">
                        <path className="shape-fill" d="M283.5,9.7c0,0-7.3,4.3-14,4.6c-6.8,0.3-12.6,0-20.9-1.5c-11.3-2-33.1-10.1-44.7-5.7	s-12.1,4.6-18,7.4c-6.6,3.2-20,9.6-36.6,9.3C131.6,23.5,99.5,7.2,86.3,8c-1.4,0.1-6.6,0.8-10.5,2c-3.8,1.2-9.4,3.8-17,4.7	c-3.2,0.4-8.3,1.1-14.2,0.9c-1.5-0.1-6.3-0.4-12-1.6c-5.7-1.2-11-3.1-15.8-3.7C6.5,9.2,0,10.8,0,10.8V0h283.5V9.7z M260.8,11.3	c-0.7-1-2-0.4-4.3-0.4c-2.3,0-6.1-1.2-5.8-1.1c0.3,0.1,3.1,1.5,6,1.9C259.7,12.2,261.4,12.3,260.8,11.3z M242.4,8.6	c0,0-2.4-0.2-5.6-0.9c-3.2-0.8-10.3-2.8-15.1-3.5c-8.2-1.1-15.8,0-15.1,0.1c0.8,0.1,9.6-0.6,17.6,1.1c3.3,0.7,9.3,2.2,12.4,2.7	C239.9,8.7,242.4,8.6,242.4,8.6z M185.2,8.5c1.7-0.7-13.3,4.7-18.5,6.1c-2.1,0.6-6.2,1.6-10,2c-3.9,0.4-8.9,0.4-8.8,0.5	c0,0.2,5.8,0.8,11.2,0c5.4-0.8,5.2-1.1,7.6-1.6C170.5,14.7,183.5,9.2,185.2,8.5z M199.1,6.9c0.2,0-0.8-0.4-4.8,1.1	c-4,1.5-6.7,3.5-6.9,3.7c-0.2,0.1,3.5-1.8,6.6-3C197,7.5,199,6.9,199.1,6.9z M283,6c-0.1,0.1-1.9,1.1-4.8,2.5s-6.9,2.8-6.7,2.7	c0.2,0,3.5-0.6,7.4-2.5C282.8,6.8,283.1,5.9,283,6z M31.3,11.6c0.1-0.2-1.9-0.2-4.5-1.2s-5.4-1.6-7.8-2C15,7.6,7.3,8.5,7.7,8.6	C8,8.7,15.9,8.3,20.2,9.3c2.2,0.5,2.4,0.5,5.7,1.6S31.2,11.9,31.3,11.6z M73,9.2c0.4-0.1,3.5-1.6,8.4-2.6c4.9-1.1,8.9-0.5,8.9-0.8	c0-0.3-1-0.9-6.2-0.3S72.6,9.3,73,9.2z M71.6,6.7C71.8,6.8,75,5.4,77.3,5c2.3-0.3,1.9-0.5,1.9-0.6c0-0.1-1.1-0.2-2.7,0.2	C74.8,5.1,71.4,6.6,71.6,6.7z M93.6,4.4c0.1,0.2,3.5,0.8,5.6,1.8c2.1,1,1.8,0.6,1.9,0.5c0.1-0.1-0.8-0.8-2.4-1.3	C97.1,4.8,93.5,4.2,93.6,4.4z M65.4,11.1c-0.1,0.3,0.3,0.5,1.9-0.2s2.6-1.3,2.2-1.2s-0.9,0.4-2.5,0.8C65.3,10.9,65.5,10.8,65.4,11.1	z M34.5,12.4c-0.2,0,2.1,0.8,3.3,0.9c1.2,0.1,2,0.1,2-0.2c0-0.3-0.1-0.5-1.6-0.4C36.6,12.8,34.7,12.4,34.5,12.4z M152.2,21.1	c-0.1,0.1-2.4-0.3-7.5-0.3c-5,0-13.6-2.4-17.2-3.5c-3.6-1.1,10,3.9,16.5,4.1C150.5,21.6,152.3,21,152.2,21.1z"></path>
                        <path className="shape-fill" d="M269.6,18c-0.1-0.1-4.6,0.3-7.2,0c-7.3-0.7-17-3.2-16.6-2.9c0.4,0.3,13.7,3.1,17,3.3	C267.7,18.8,269.7,18,269.6,18z"></path>
                        <path className="shape-fill" d="M227.4,9.8c-0.2-0.1-4.5-1-9.5-1.2c-5-0.2-12.7,0.6-12.3,0.5c0.3-0.1,5.9-1.8,13.3-1.2	S227.6,9.9,227.4,9.8z"></path>
                        <path className="shape-fill" d="M204.5,13.4c-0.1-0.1,2-1,3.2-1.1c1.2-0.1,2,0,2,0.3c0,0.3-0.1,0.5-1.6,0.4	C206.4,12.9,204.6,13.5,204.5,13.4z"></path>
                        <path className="shape-fill" d="M201,10.6c0-0.1-4.4,1.2-6.3,2.2c-1.9,0.9-6.2,3.1-6.1,3.1c0.1,0.1,4.2-1.6,6.3-2.6	S201,10.7,201,10.6z"></path>
                        <path className="shape-fill" d="M154.5,26.7c-0.1-0.1-4.6,0.3-7.2,0c-7.3-0.7-17-3.2-16.6-2.9c0.4,0.3,13.7,3.1,17,3.3	C152.6,27.5,154.6,26.8,154.5,26.7z"></path>
                        <path className="shape-fill" d="M41.9,19.3c0,0,1.2-0.3,2.9-0.1c1.7,0.2,5.8,0.9,8.2,0.7c4.2-0.4,7.4-2.7,7-2.6	c-0.4,0-4.3,2.2-8.6,1.9c-1.8-0.1-5.1-0.5-6.7-0.4S41.9,19.3,41.9,19.3z"></path>
                        <path className="shape-fill" d="M75.5,12.6c0.2,0.1,2-0.8,4.3-1.1c2.3-0.2,2.1-0.3,2.1-0.5c0-0.1-1.8-0.4-3.4,0	C76.9,11.5,75.3,12.5,75.5,12.6z"></path>
                        <path className="shape-fill" d="M15.6,13.2c0-0.1,4.3,0,6.7,0.5c2.4,0.5,5,1.9,5,2c0,0.1-2.7-0.8-5.1-1.4	C19.9,13.7,15.7,13.3,15.6,13.2z"></path>
                    </svg>
                </div>

                <div className="container">
                    <img src="/img/gif_Save-The-Date.gif" className="save-the-date-gif" />
                    <p>Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta'ala, kami mengundang Bapak/Ibu/Saudara/i, untuk menghadiri <br /> Resepsi Pernikahan kami.</p>
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
                                        <p>Sabtu, 20 Juni 2020</p>
                                    </li>
                                    <li>
                                        <i className="far fa-clock"></i>
                                        <p>Pukul 08.00 s.d Selesai</p>
                                    </li>
                                    <li>
                                        <i className="fas fa-map-marker-alt"></i>
                                        <p>AUDITORIUM MASJID ASSALAM, Jalan Raya Bojongsari No.5, Gunung Putri, Citeureup, Bogor, Jawa Barat</p>
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
                                        <p>Sabtu, 20 Juni 2020</p>
                                    </li>
                                    <li>
                                        <i className="far fa-clock"></i>
                                        <p>Pukul 08.00 s.d Selesai</p>
                                    </li>
                                    <li>
                                        <i className="fas fa-map-marker-alt"></i>
                                        <p>AUDITORIUM MASJID ASSALAM, Jalan Raya Bojongsari No.5, Gunung Putri, Citeureup, Bogor, Jawa Barat lorem10</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="countdown">
                        <p>WAKTU MENUJU ACARA</p>
                        <div className="countdown-container">
                            <div id="day">NA</div>
                            <div id="hour">NA</div>
                            <div id="minute">NA</div>
                            <div id="second">NA</div>
                        </div>
                    </div>
                    <div className="map">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.90778136347146!2d106.8865811!3d-6.19431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f49532b5b715%3A0xa4012b68ec698d4e!2sSMK%20Negeri%2026%20Jakarta!5e0!3m2!1sid!2sid!4v1591424770986!5m2!1sid!2sid" frameBorder="0" style={{ border: '0' }} allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
                    </div>
                    <a href="https://www.google.com/maps/place/SMK+Negeri+26+Jkt,+Jl.+Balai+Pustaka+Baru+I,+RT.2%2FRW.7,+Rawamangun,+Kec.+Pulo+Gadung,+Kota+Jakarta+Timur,+Daerah+Khusus+Ibukota+Jakarta+13220/@-6.194295,106.886581,20z/data=!4m2!3m1!1s0x2e69f49532b5b715:0xa4012b68ec698d4e?hl=id&gl=ID" target="__blank" className="btn">Buka Map</a>
                </div>
                <div className="shape-bottom">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 283.5 27.8" preserveAspectRatio="none">
                        <path className="shape-fill" d="M283.5,9.7c0,0-7.3,4.3-14,4.6c-6.8,0.3-12.6,0-20.9-1.5c-11.3-2-33.1-10.1-44.7-5.7	s-12.1,4.6-18,7.4c-6.6,3.2-20,9.6-36.6,9.3C131.6,23.5,99.5,7.2,86.3,8c-1.4,0.1-6.6,0.8-10.5,2c-3.8,1.2-9.4,3.8-17,4.7	c-3.2,0.4-8.3,1.1-14.2,0.9c-1.5-0.1-6.3-0.4-12-1.6c-5.7-1.2-11-3.1-15.8-3.7C6.5,9.2,0,10.8,0,10.8V0h283.5V9.7z M260.8,11.3	c-0.7-1-2-0.4-4.3-0.4c-2.3,0-6.1-1.2-5.8-1.1c0.3,0.1,3.1,1.5,6,1.9C259.7,12.2,261.4,12.3,260.8,11.3z M242.4,8.6	c0,0-2.4-0.2-5.6-0.9c-3.2-0.8-10.3-2.8-15.1-3.5c-8.2-1.1-15.8,0-15.1,0.1c0.8,0.1,9.6-0.6,17.6,1.1c3.3,0.7,9.3,2.2,12.4,2.7	C239.9,8.7,242.4,8.6,242.4,8.6z M185.2,8.5c1.7-0.7-13.3,4.7-18.5,6.1c-2.1,0.6-6.2,1.6-10,2c-3.9,0.4-8.9,0.4-8.8,0.5	c0,0.2,5.8,0.8,11.2,0c5.4-0.8,5.2-1.1,7.6-1.6C170.5,14.7,183.5,9.2,185.2,8.5z M199.1,6.9c0.2,0-0.8-0.4-4.8,1.1	c-4,1.5-6.7,3.5-6.9,3.7c-0.2,0.1,3.5-1.8,6.6-3C197,7.5,199,6.9,199.1,6.9z M283,6c-0.1,0.1-1.9,1.1-4.8,2.5s-6.9,2.8-6.7,2.7	c0.2,0,3.5-0.6,7.4-2.5C282.8,6.8,283.1,5.9,283,6z M31.3,11.6c0.1-0.2-1.9-0.2-4.5-1.2s-5.4-1.6-7.8-2C15,7.6,7.3,8.5,7.7,8.6	C8,8.7,15.9,8.3,20.2,9.3c2.2,0.5,2.4,0.5,5.7,1.6S31.2,11.9,31.3,11.6z M73,9.2c0.4-0.1,3.5-1.6,8.4-2.6c4.9-1.1,8.9-0.5,8.9-0.8	c0-0.3-1-0.9-6.2-0.3S72.6,9.3,73,9.2z M71.6,6.7C71.8,6.8,75,5.4,77.3,5c2.3-0.3,1.9-0.5,1.9-0.6c0-0.1-1.1-0.2-2.7,0.2	C74.8,5.1,71.4,6.6,71.6,6.7z M93.6,4.4c0.1,0.2,3.5,0.8,5.6,1.8c2.1,1,1.8,0.6,1.9,0.5c0.1-0.1-0.8-0.8-2.4-1.3	C97.1,4.8,93.5,4.2,93.6,4.4z M65.4,11.1c-0.1,0.3,0.3,0.5,1.9-0.2s2.6-1.3,2.2-1.2s-0.9,0.4-2.5,0.8C65.3,10.9,65.5,10.8,65.4,11.1	z M34.5,12.4c-0.2,0,2.1,0.8,3.3,0.9c1.2,0.1,2,0.1,2-0.2c0-0.3-0.1-0.5-1.6-0.4C36.6,12.8,34.7,12.4,34.5,12.4z M152.2,21.1	c-0.1,0.1-2.4-0.3-7.5-0.3c-5,0-13.6-2.4-17.2-3.5c-3.6-1.1,10,3.9,16.5,4.1C150.5,21.6,152.3,21,152.2,21.1z"></path>
                        <path className="shape-fill" d="M269.6,18c-0.1-0.1-4.6,0.3-7.2,0c-7.3-0.7-17-3.2-16.6-2.9c0.4,0.3,13.7,3.1,17,3.3	C267.7,18.8,269.7,18,269.6,18z"></path>
                        <path className="shape-fill" d="M227.4,9.8c-0.2-0.1-4.5-1-9.5-1.2c-5-0.2-12.7,0.6-12.3,0.5c0.3-0.1,5.9-1.8,13.3-1.2	S227.6,9.9,227.4,9.8z"></path>
                        <path className="shape-fill" d="M204.5,13.4c-0.1-0.1,2-1,3.2-1.1c1.2-0.1,2,0,2,0.3c0,0.3-0.1,0.5-1.6,0.4	C206.4,12.9,204.6,13.5,204.5,13.4z"></path>
                        <path className="shape-fill" d="M201,10.6c0-0.1-4.4,1.2-6.3,2.2c-1.9,0.9-6.2,3.1-6.1,3.1c0.1,0.1,4.2-1.6,6.3-2.6	S201,10.7,201,10.6z"></path>
                        <path className="shape-fill" d="M154.5,26.7c-0.1-0.1-4.6,0.3-7.2,0c-7.3-0.7-17-3.2-16.6-2.9c0.4,0.3,13.7,3.1,17,3.3	C152.6,27.5,154.6,26.8,154.5,26.7z"></path>
                        <path className="shape-fill" d="M41.9,19.3c0,0,1.2-0.3,2.9-0.1c1.7,0.2,5.8,0.9,8.2,0.7c4.2-0.4,7.4-2.7,7-2.6	c-0.4,0-4.3,2.2-8.6,1.9c-1.8-0.1-5.1-0.5-6.7-0.4S41.9,19.3,41.9,19.3z"></path>
                        <path className="shape-fill" d="M75.5,12.6c0.2,0.1,2-0.8,4.3-1.1c2.3-0.2,2.1-0.3,2.1-0.5c0-0.1-1.8-0.4-3.4,0	C76.9,11.5,75.3,12.5,75.5,12.6z"></path>
                        <path className="shape-fill" d="M15.6,13.2c0-0.1,4.3,0,6.7,0.5c2.4,0.5,5,1.9,5,2c0,0.1-2.7-0.8-5.1-1.4	C19.9,13.7,15.7,13.3,15.6,13.2z"></path>
                    </svg>
                </div>
            </div>

            <section className="gallery" id="gallery">
                <div className="container">
                    <h2 className="title">Gallery</h2>
                    <p className="text-center">Momen Bahagia Awan dan Pelangi</p>
                    <a href="/img/2.jpeg" target="__blank"><img src="/img/2.jpeg" /></a>
                    <a href="/img/7.jpeg" target="__blank"><img src="/img/7.jpeg" /></a>
                    <a href="/img/5.jpeg" target="__blank"><img src="/img/5.jpeg" /></a>
                    <a href="/img/6.jpeg" target="__blank"><img src="/img/6.jpeg" /></a>
                </div>
            </section>
            <section className="liveStreaming">
                <div className="container">
                    <div className="text-center">
                        <h2 className="title">Live Streaming pernikahan kami</h2>
                    </div>

                    <div className="liveStreaming_body">
                        <div className="d-flex">
                            <div className="liveStreaming_instagramContainer">
                                <img src="/img/zoomIcon.png" className="liveStreaming_zoomIcon" alt="zoomIcon" />
                                <button className="btn liveStreaming_buttonZoom">Live Via Zoom</button>
                            </div>
                            <div className="liveStreaming_instagramContainer">
                                <img src="/img/instgramIcon.jpg" className="liveStreaming_instagramIcon" alt="zoomIcon" />
                                <button className="btn liveStreaming_buttonInstagram">Live Via Instagram</button>
                            </div>
                        </div><br />
                        <p>Meeting ID: 123 123 12 312</p>
                        <p>Password: 12342</p>
                        <p>instagram: @hlmifzi</p>
                    </div>
                </div>
            </section>

            {showGiftModal &&
                <div className="popUp">
                    <div className="popUp_background"></div>
                    <div className="popUp_container">
                        <i onClick={() => setShowGiftModal(false)}>Tutup [x]</i>
                        <img className="gift_img" src="/img/qrcode.jpeg" alt="image" />
                        <div className="gift_thankYouText">
                            <h3>Terima Kasih!</h3>
                            <p>Telah mengkonfirmasi kehadiran di acara pernikahan kami.</p><br />
                            <p>Tanpa mengurangi rasa hormat, bagi Anda yang ingin memberikan tanda kasih untuk kami dapat melalui<br />
                                <b>BCA: 0940894832</b><br />
                                <b>BSI: 0912013123</b>
                            </p>
                            <Link href="https://api.whatsapp.com/send?phone=6281294923207&text=Hallo%20Helmi%2C%20maaf%20helmi%20ga%20bisa%20hadir%20dikarenakan%20sedang%20di%20luar%20kota.%20kirim%20salam%20tempel%20aja%20yaaa.">
                                <button className="btn gift_sendTransferBtn">Kirim Bukti Transfer</button>
                            </Link>
                        </div>
                    </div>
                </div>
            }


            <section className="contact">
                <div className="container">
                    <div className="text-center">
                        <h2 className="title">Konfirmasi Kehadiran beserta Ucapan Selamat & Do'a untuk</h2>
                        <p>Awan & Pelangi</p>
                    </div>

                    <form>
                        <div className="d-flex">
                            <div className="form-control border-0 user_name">
                                <input type="text" onChange={() => { }} value={guest} />
                            </div>
                            <div className="user_statusChoose">
                                <div className="input-group">
                                    <select className="custom-select" id="inputGroupSelect04">
                                        <option selected>Pilih Status</option>
                                        <option value="1">Akan Hadir</option>
                                        <option value="2">Behalangan</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-control border-0 user_qtyPartner">
                                <input type="number" placeholder="jumlah yang akan diajak (istri/anak/pasangan)"></input>
                            </div>
                        </div>
                        <div className="form-control border-0">
                            <textarea placeholder="Ucapan Do'a & Harapan"></textarea>
                        </div>
                        <button type="button" onClick={() => setShowGiftModal(true)} className="btn">Kirim</button>
                    </form>

                    <div className="user_search">
                        <div className="input-group">
                            <select className="custom-select" id="inputGroupSelect04">
                                <option selected>Cari Kategori</option>
                                <option value="1">Temen Ayah Laki Laki (sesi II (14:00-16:00 WIB))</option>
                                <option value="2">Temen SD Perempuan (sesi II (12:00-14:00 WIB))</option>
                                <option value="3">Temen SMK Laki-laki (sesi I (10:00-12:00 WIB))</option>
                            </select>
                        </div>
                        <input type="text" class="form-control user_searchName" placeholder="Cari Nama Tamu" aria-describedby="basic-addon2" />
                        <button type="button" class="btn user_btnSearch">Cari</button>
                    </div>
                    <div className="comment">

                        <div className="comment-user">
                            <div className="comment-body">
                                <div className="user">
                                    <div className="user_status">
                                        <div>
                                            <div>Cholis</div>
                                            <span className="user_category">Temen Ayah Laki Laki  <b>(sesi II (14:00-16:00 WIB))</b></span>
                                        </div>
                                    </div>
                                    <div className="sticker sticker_waiting">Menunggu Konfirmasi</div>
                                </div>
                                <p>Lorem ipsum dolor sit, amet</p>
                            </div>
                        </div>
                        <div className="comment-user">
                            <div className="comment-body">
                                <div className="user">
                                    <div className="user_status">
                                        <div>Affiasca</div>
                                        <span className="user_category">Temen SD Perempuan  <b>(sesi II (12:00-14:00 WIB))</b></span>
                                    </div>
                                    <div className="sticker sticker_confirm">Akan Hadir</div>
                                </div>
                                <p>Lorem ipsum dolor sit, amet</p>
                            </div>
                        </div>
                        <div className="comment-user">
                            <div className="comment-body">
                                <div className="user">
                                    <div className="user_status">
                                        <div>Rian</div>
                                        <span className="user_category">Temen SMK Laki-laki  <b>(sesi I (10:00-12:00 WIB))</b></span>
                                    </div>
                                    <div className="sticker sticker_cancel">Berhalangan</div>
                                </div>
                                <p>Lorem ipsum dolor sit, amet</p>
                            </div>
                        </div>
                        <div className="comment-user">
                            <div className="comment-body">
                                <div className="user">
                                    <div className="user_status">
                                        <div>Sheila</div>
                                        <span className="user_category">Temen Kuliah Laki-laki <b>(sesi I (10:00-12:00 WIB))</b></span>
                                    </div>
                                    <div className="sticker sticker_present">Telah Hadir</div>
                                </div>
                                <p>Lorem ipsum dolor sit, amet</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="text-center">
                Copyright 2020
            </footer>
        </div>
    )
}

Design01.propTypes = {

}

export default Design01