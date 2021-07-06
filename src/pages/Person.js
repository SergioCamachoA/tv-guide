import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import PropTypes from "prop-types"

export function Person() {
  const { id } = useParams()

  const [name, setName] = useState("")
  const [image, setImage] = useState({})
  const [gender, setGender] = useState("")
  const [castCredits, setCastCredits] = useState([])
  const [country, setCountry] = useState()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPerson() {
      let personInfo = await fetch(
        `https://api.tvmaze.com/people/${id}?embed=castcredits`
      )
        .then((res) => res.json())
        .catch((err) => console.log(err))
      passingDetails(personInfo)
      setLoading(false)
    }

    fetchPerson()
  }, [id])

  function passingDetails(info) {
    setName(info.name)
    setImage(info.image || undefined)
    setCastCredits(
      info._embedded.castcredits[0] ? info._embedded.castcredits : undefined
    )
    setGender(info.gender || undefined)
    setCountry(info.country || undefined)
  }

  return loading ? (
    <section>
      <h1 className="loading">Loading...</h1>
    </section>
  ) : (
    <div className="person">
      <Details
        name={name}
        image={image}
        castCredits={castCredits}
        gender={gender}
        country={country}
      />
    </div>
  )
}

function Details({ name, image, castCredits, gender, country }) {
  return (
    <>
      <div className="person-specs">
        <img className="poster-two" src={image.medium} alt={name} />
        <h2>{name}</h2>
        <h2>From: {country.name}</h2>
      </div>
      <div className="cast-credits">
        <h1>Starring in...</h1>
        <div className="credits-title">
          <h1>Show</h1>
          <h1>Character</h1>
        </div>
        {typeof castCredits === "string" ? (
          <h1>{castCredits}</h1>
        ) : (
          castCredits.map((credits, index) => {
            return <CastCredits key={index} credits={credits} gender={gender} />
          })
        )}
      </div>
    </>
  )
}

Details.propTypes = {
  image: PropTypes.object.isRequired,
}

Details.defaultProps = {
  image: {
    medium: "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png",
  },
  country: { name: "not confirmed" },
  castCredits: "info not available",
}

function CastCredits({ credits, gender }) {
  const showURL = credits._links.show.href
  const characterURL = credits._links.character.href
  const [creditsInfo, setCreditsInfo] = useState({})
  const [characterInfo, setCharacterInfo] = useState({})

  useEffect(() => {
    async function fetchShow() {
      let showInfo = await fetch(showURL)
        .then((res) => res.json())
        .catch((err) => console.log(err))

      setCreditsInfo(showInfo)
    }
    fetchShow()
  }, [showURL])
  useEffect(() => {
    async function fetchCharacter() {
      let showInfo = await fetch(characterURL)
        .then((res) => res.json())
        .catch((err) => console.log(err))

      setCharacterInfo(showInfo)
    }

    credits.self
      ? setCharacterInfo({
        name:
          gender === "Male"
            ? "as himself"
            : gender === "Female"
              ? "as herself"
              : "as themselves",
      })
      : fetchCharacter()
  }, [characterURL, credits.self, gender])

  return (
    // characterInfo === undefined ? (
    //   <h1>Hubo pedo mi bro</h1>
    // ) : (
    <>
      <div className="credits-pair">
        <Link to={`/show/${creditsInfo.id}/${creditsInfo.name}`}>
          <h2>{creditsInfo.name}</h2>
        </Link>
        <h2>{characterInfo.name}</h2>
      </div>
    </>
  )
}

CastCredits.defaultProps = {}
