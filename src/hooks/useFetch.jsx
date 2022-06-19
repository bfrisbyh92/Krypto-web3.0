import { useEffect, useState } from "react";

const APIKEY = process.env.REACT_APP_GIPHY_KEY;

const useFetch = ({ keyword }) => {
  const [gifUrl, setGifUrl] = useState("");

  const fetchGifs = async () => {
    try {
      const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&q=${keyword.split(" ").join("")}&limit=1`);
      const { data } = await response.json();
      console.log(data);

      setGifUrl(data[0]?.images?.downsized_medium.url);
    } catch (error) {
    setGifUrl("https://media2.giphy.com/media/lTRuG1F4VZ3LHMpXY2/200w.webp?cid=ecf05e47klh89u4rp7xer8ydd1peemdk1yugt8vgbkvyza7j&rid=200w.webp&ct=g")
         // ^^^ Set default gif ^^^ 
    //   setGifUrl("https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284");
    }
  };

  useEffect(() => {
    if (keyword) fetchGifs();
  }, [keyword]);

  return gifUrl;
};

export default useFetch;

            // setGifUrl("https://media2.giphy.com/media/lTRuG1F4VZ3LHMpXY2/200w.webp?cid=ecf05e47klh89u4rp7xer8ydd1peemdk1yugt8vgbkvyza7j&rid=200w.webp&ct=g")
