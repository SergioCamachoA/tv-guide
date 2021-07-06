import React from "react";

export function NoResults({ inputString }) {
    return (
        <div className="no-results">
            <h1 className="h1-home one">oops!</h1>
            <h1 className="h1-home two">nothing found with</h1>
            <h1 className="h1-home three">
                <span>{inputString}</span>
            </h1>
            <h1 className="h1-home four">try with something else</h1>
        </div>
    )
}