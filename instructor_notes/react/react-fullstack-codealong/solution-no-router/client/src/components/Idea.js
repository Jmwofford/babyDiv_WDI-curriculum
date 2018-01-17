import React from 'react'

// Notice that our onChange and onBlur events are using some slightly new syntax:
// They are wrapping their callbacks in a higher-level function, so that we can
// pass the `Idea` into the callback function later on when the event is fired

const Idea = (props) => {
  return (
    <div>

      <input type="text"
             name="title"
             value={props.idea.title}
             onChange={(event) => props.handleChange(props.idea, event)}
             onBlur={() => {props.updateIdea(props.idea)}}/>

      <textarea name="description"
                value={props.idea.description}
                onChange={(event) => props.handleChange(props.idea, event)}
                onBlur={() => {props.updateIdea(props.idea)}}/>

      <button onClick={() => {props.deleteIdea(props.idea)}}>
        Delete Idea
      </button>

    </div>
  )
}

export default Idea