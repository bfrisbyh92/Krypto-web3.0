import { useEffect, useState } from "react"

const API_KEY = process.env.REACT_APP_GIPHY_KEY

const useFetch = ({ keyword }) => {
  const [gifUrl, setGifUrl] = useState("")

  console.log(keyword)
  console.log(API_KEY)
  // ^^^ Need to make sure the keyword is coming in correctly ^^^

  const fetchGifs = () => {
      fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword/*.split(" ").join("")*/}&limit=1`)
        .then((res) => res.json())
          .then(({ data }) => {
            console.log(data, data[0], data.data)
            setGifUrl(data[0]?.images?.downsized_medium?.url)
            })
            .catch((error) => {
              console.log(error)
              setGifUrl("https://media1.giphy.com/media/ho0xXatV7b3Fo1ZRXN/200w.webp?cid=ecf05e47ef7gbvupfdtfdvxur718rqutpce46sspjo2jcpcy&rid=200w.webp&ct=g")
            })
  }
  // ^^^ Refactored to Promises because it feels cleaner ^^^ 

  useEffect(() => {
    if (keyword) fetchGifs()
  }, [keyword])

  return gifUrl
};

export default useFetch;

  // const fetchGifs = async () => {
  //   try {
  //     const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&q=${keyword.split(" ").join("")}&limit=1`);
  //     const { data } = await response.json()
  //     console.log(data);

  //     setGifUrl(data[0]?.images?.downsized_medium.url);
  //   } catch (error) {
  //       console.log(error);
  //       setGifUrl("https://media1.giphy.com/media/ho0xXatV7b3Fo1ZRXN/200w.webp?cid=ecf05e47ef7gbvupfdtfdvxur718rqutpce46sspjo2jcpcy&rid=200w.webp&ct=g")
  //        // ^^^ Set default gif ^^^ 
  //     //setGifUrl("https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284");
  //   }
  // };

  // ^^^ Old code same custom hook ^^^



