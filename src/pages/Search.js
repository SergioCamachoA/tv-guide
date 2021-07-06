import { useParams } from "react-router-dom"
import React from "react"
import { SearchResults } from "../components/SearchResults"

export function Search() {
    const { inputString } = useParams()
    console.log(inputString);
    return <>
        <SearchResults inputString={inputString} />
    </>
}