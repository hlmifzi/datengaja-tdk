export const parseCookies = (cookies) => {
  let cookie = {};
  cookies?.split(";").forEach(function (el) {
    let [k, v] = el.split('=');
    cookie[k.trim()] = v;
  })

  return cookie
}


export const attendStatus = {
  "Menunggu Konfirmasi": "sticker_waiting",
  "Akan Hadir": "sticker_confirm",
  "Berhalangan": "sticker_cancel",
  "Telah Hadir": "sticker_present",
}

export const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});
