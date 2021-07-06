import React, { useState, useRef } from "react"
import { Link } from "react-router-dom"

export function SearchBar() {
  const [inputText, setInputText] = useState("")

  const click = useRef(null)

  function handleInput(e) {
    setInputText(e.target.value)
  }

  function searchBtn() {
    setInputText("")
  }

  function handleLink(e) {
    e.preventDefault()
    click.current.click()
  }
  return (
    <>
      <div className='input'>
        <form onSubmit={handleLink}>
          <input
            onChange={handleInput}
            value={inputText}
            placeholder="Search for shows and people"
            type="text"
          />
        </form>
        <Link ref={click} to={`/search/${inputText}`} onClick={searchBtn}>
          <div className='search-btn'>
            <i className='fas fa-search'></i>
          </div>
        </Link>

      </div>
    </>
  )
}
