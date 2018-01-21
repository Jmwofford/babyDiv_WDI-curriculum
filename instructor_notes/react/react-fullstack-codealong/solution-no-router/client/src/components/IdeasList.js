import React from 'react'
import Idea from './Idea'

const IdeasList = (props) => {

  // We are receiving all of the methods each Idea needs as props
  // inside of this component, so we can pass these directly down again
  // by "spreading" the props into each Idea component (using the "spread
  // operator" or `...`

  // We'll pass the `idea` along as well.

  return (
    <div>
      {
        props.ideas.map((idea) => {
          return (
            <Idea idea={idea} {...props} key={idea._id}/>
          )
        })
      }
    </div>
  )
}

export default IdeasList