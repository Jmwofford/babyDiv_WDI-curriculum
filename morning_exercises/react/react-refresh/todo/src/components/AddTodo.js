import React from 'react'
import { Form, Button, Input } from 'semantic-ui-react'

const AddTodo = (props) => {
  return (
    <Form onSubmit={props.addTodo}>
      <Input type="text" value={props.newTodo} onChange={props.handleChange}/>
      <Button primary type="submit">Add Todo</Button>
    </Form>
  )
}

export default AddTodo
