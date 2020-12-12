import { useState, useEffect } from "react";

const useEmoticon = () => {

  const [emoticon, setEmoticon] = useState(null);
  const fetchEmoticon = async () => {
    fetch('/emoticon.json')
      .then(res => res.json())
      .then(data => setEmoticon(data))
  }

  useEffect(() => {
   fetchEmoticon();
  }, [])

  return emoticon
}

export default useEmoticon;