import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import PropTypes from "prop-types"

export function Show() {
  const { id } = useParams()

  const [image, setImage] = useState()
  const [name, setName] = useState()
  const [summary, setSummary] = useState("")
  const [seasons, setSeasons] = useState([])
  const [episodes, setEpisodes] = useState([])
  const [cast, setCast] = useState([])
  const [banner, setBanner] = useState()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchShow() {
      let showInfo = await fetch(
        `https://api.tvmaze.com/shows/${id}?embed[]=images&embed[]=cast&embed[]=seasons&embed[]=episodes`
      )
        .then((res) => res.json())
        .catch((err) => console.log(err))

      passingDetails(showInfo)
      setLoading(false)
    }

    fetchShow()
  }, [id])

  function passingDetails(info) {
    setImage(info.image || undefined)
    setName(info.name)
    setSummary(
      info.summary ? info.summary.replace(/(<([^>]+)>)/gi, "") : undefined
    )
    setSeasons(info._embedded.seasons)
    setEpisodes(info._embedded.episodes)
    setCast(info._embedded.cast)
    setBanner(info._embedded.images[0] ? info._embedded.images : undefined)
  }
  return loading ? (
    <section>
      <h1 className="loading">Loading...</h1>
    </section>
  ) : (
    <section>
      <div className="inner-section-two">
        <FirstBlock
          name={name}
          image={image}
          summary={summary}
          banner={banner}
        />
      </div>
      <div className="inner-section-one">
        <ThirdBlock cast={cast} />
        <SecondBlock seasons={seasons} episodes={episodes} />
      </div>
    </section>
  )
}

function FirstBlock({ image, name, summary, banner }) {
  let imageResult

  function resolveImage(image, banner) {
    if (banner === undefined) {
      imageResult = image.medium
    } else {
      const found = banner.find((el) => el.type === "background")
      found === undefined
        ? (imageResult = image.medium)
        : (imageResult = found.resolutions.original.url)
    }
  }

  resolveImage(image, banner)
  const scrollUp = () => {
    const summ = document.querySelector(".summary")
    summ.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <div className="first-block">
      <h1 className="show-name">{name}</h1>
      <div className="show-specs">
        <img
          onMouseLeave={scrollUp}
          src={imageResult}
          alt="poster"
          className={imageResult === image.medium ? "poster-two" : "banner-two"}
        />
        <h2 className="summary">{summary || "no description available"}</h2>
      </div>
    </div>
  )
}

FirstBlock.propTypes = {
  image: PropTypes.object.isRequired,
}

FirstBlock.defaultProps = {
  image: {
    medium: "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png",
  },
}

function SecondBlock({ seasons, episodes }) {
  let arr = []
  seasons.map((el) => arr.push(el.id))

  return (
    <div className="second-block">
      {seasons.map((eachSeason, index) => {
        const scrollTop = () => {
          let pincheDeste = document.querySelector(`.pinche${arr[index]}`)
          pincheDeste.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          })
        }

        return (
          <div
            className={`season pinche${arr[index]}`}
            onMouseLeave={scrollTop}
            key={eachSeason.id}
          >
            <h2 className="season-title">Season {eachSeason.number}</h2>
            {episodes.map((eachEpisode) => {
              return (
                eachEpisode.season === eachSeason.number && (
                  <h3 key={eachEpisode.id} className="each-episode">
                    {eachEpisode.name}
                  </h3>
                )
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

function ThirdBlock({ cast }) {
  return (
    <div className="third-block">
      <div className="block-title">
        <h1>Character</h1>
        <h1>Interpreter</h1>
      </div>
      {/* <h1>Third Block</h1> */}
      {cast.map((each, index) => {
        return (
          <div key={index} className="pair">
            <Character
              name={each.character.name}
              image={each.character.image || undefined}
            />
            <Interpreter
              name={each.person.name}
              image={each.person.image || undefined}
              id={each.person.id}
            />
          </div>
        )
      })}
    </div>
  )
}

function Character({ name, image }) {
  return (
    <div className="characters">
      <h2>{name}</h2>
      <img className="poster-three" src={image.medium} alt="" />
    </div>
  )
}

Character.defaultProps = {
  image: {
    medium: "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png",
  },
}

function Interpreter({ name, image, id }) {
  return (
    <div className="cast">
      <Link to={`/person/${id}/${name}`}>
        <h2>{name}</h2>
      </Link>

      <Link to={`/person/${id}/${name}`}>
        <img className="poster-three" src={image.medium} alt="" />
      </Link>
    </div>
  )
}

Interpreter.defaultProps = {
  image: {
    medium: "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png",
  },
}
