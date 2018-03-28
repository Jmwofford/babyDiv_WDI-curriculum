import React, { Component } from 'react'
import data from '../data.json'
import AddTodo from './AddTodo'
import { List, Icon } from 'semantic-ui-react'

class Todos extends Component {
  state = {
    todos: data.todos,
    newTodo: ''
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ newTodo: value })
  }

  addTodo = (e) => {
    e.preventDefault()
    const newTodos = [ ...this.state.todos, {
      id: this.state.todos.length + 1,
      task: this.state.newTodo,
      completed: false
    } ]

    this.setState({
      todos: newTodos,
      newTodo: ''
    })
  }

  deleteTodo = (index) => {
    const newTodos = [ ...this.state.todos ]
    newTodos.splice(index, 1)
    this.setState({ todos: newTodos })
  }

  render () {
    return (
      <div>
        <h1>Todos</h1>
        <AddTodo newTodo={this.state.newTodo} handleChange={this.handleChange} addTodo={this.addTodo}/>
        <List divided relaxed>
          {this.state.todos.map((todo, index) => {
            return (
              <List.Item key={index}>
                <List.Content floated='left'>
                  <List.Header>{todo.task}</List.Header>
                </List.Content>
                <List.Content floated='right'>
                  <Icon onClick={() => this.deleteTodo(index)} name="delete"></Icon>
                </List.Content>
              </List.Item>
            )
          })}
        </List>
      </div>
    )
  }
}

export default Todos
