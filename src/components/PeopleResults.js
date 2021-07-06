import React from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

export function PeopleResults({ eachPerson, image }) {
  const { name, id } = eachPerson

  return (
    <div className="item-container" key={id}>
      <img src={image.medium} alt={name} className="poster"></img>
      <div className="specs">
        <h2>{name}</h2>
        <Link
          className='more-info'
          to={`/person/${id}/${name}`}>More info</Link>
      </div>
    </div>
  )
}

PeopleResults.propTypes = {
  image: PropTypes.object.isRequired,
}

PeopleResults.defaultProps = {
  image: {
    medium: "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png",
  },
}
