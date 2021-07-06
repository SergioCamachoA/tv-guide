import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

export function ShowsResults({ eachShow, image }) {
  const { name, id } = eachShow

  return (
    <div className="item-container">
      <img src={image.medium} alt={name} className="poster"></img>
      <div className="specs">
        <h2>{name}</h2>
        <Link className="more-info" to={`/show/${id}/${name}`}>
          More info
        </Link>
      </div>
    </div>
  )
}

ShowsResults.propTypes = {
  image: PropTypes.object.isRequired,
}

ShowsResults.defaultProps = {
  image: {
    medium: "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png",
  },
}
