
const Manifest = () => <></>;
export default Manifest;

export async function getServerSideProps({ req, res }) {

  const body = `
    {
      "name": "datengaja",
      "short_name": "datengaja",
      "icons": [
        {
          "src": "${`https://thumbor.sirclocdn.xyz/unsafe/192x192/filters:format(png)/`}",
          "sizes": "192x192",
          "type": "image/png"
        }
      ],
      "theme_color": "#FFFFFF",
      "background_color": "#FFFFFF",
      "start_url": "/",
      "display": "standalone",
      "orientation": "portrait"
    }
  `.trim();

  res.writeHead(200, {
    "Content-Length": Buffer.byteLength(body),
    "Content-Type": "application/json",
  });
  res.write(body);
  res.end();

  return { props: {} };
}