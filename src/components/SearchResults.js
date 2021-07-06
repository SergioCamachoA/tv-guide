import { ShowsResults } from "../components/ShowsResults"
import { PeopleResults } from "../components/PeopleResults"
import { NoResults } from "../components/NoResults"
import React, { useEffect, useState } from "react"

export function SearchResults({ inputString }) {
  const [arrayPeople, setArrayPeople] = useState([])
  const [arrayShows, setArrayShows] = useState([])
  const [noResults, setNoResults] = useState(false)

  useEffect(() => {
    async function fetchShow() {
      let fetchedResult = await fetch(
        `https://api.tvmaze.com/search/shows?q=${inputString}`
      )
        .then((res) => res.json())
        .catch((err) => console.log(err))
      // console.log('shows', arrayShows);
      setArrayShows(fetchedResult)
    }

    async function fetchPeople() {
      let fetchedResult = await fetch(
        `https://api.tvmaze.com/search/people?q=${inputString}`
      )
        .then((res) => res.json())
        .catch((err) => console.log(err))
      if (fetchedResult.length === 0 && arrayShows.length === 0) {
        setNoResults(true)
      } else {
        setArrayPeople(fetchedResult)
        setNoResults(false)
      }
    }

    async function handleNoResult() {
      await fetchShow()
      fetchPeople()
    }

    handleNoResult()

  }, [inputString, arrayShows])

  return (
    <>
      {noResults ? (
        <NoResults inputString={inputString} />
      ) : (
        <div className={"search-results"}>
          <div className="shows-results">
            <h1>Shows</h1>
            {arrayShows.map((eachShow) => {
              return (
                <ShowsResults
                  key={eachShow.show.id}
                  eachShow={eachShow.show}
                  image={eachShow.show.image || undefined}
                />
              )
            })}
          </div>
          <div className="people-results">
            <h1>People</h1>
            {arrayPeople.map((eachPerson) => {
              return (
                <PeopleResults
                  key={eachPerson.person.id}
                  eachPerson={eachPerson.person}
                  image={eachPerson.person.image || undefined}
                />
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}
