import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layouts/Header';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
import axios from 'axios';

import './App.css';

class App extends React.Component {
  state = {
    todos: []
  }

  componentDidMount() {
    axios.get('https://jsonPlaceholder.typicode.com/todos?_limit=10').then(res => this.setState({ todos: res.data }))
  }

  // Delete a Todo
  delTodo = (id) => { // ... is spread operator
    axios.delete(`https://jsonPlaceholder.typicode.com/todos/${id}`)
    .then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] }));    
  }

  // Toggle Complete
  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo=>{
        if(todo.id === id){
          todo.completed = !todo.completed
        }
        
        return todo;
      }) 
    });
  }

  // Add Todo
  addTodo = (title) => {
    axios.post('https://jsonPlaceholder.typicode.com/todos', { 
      title, 
      completed: false 
    }).then(res => this.setState({ todos: [...this.state.todos, res.data] }));
    
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo} />
              </React.Fragment>
            )} />
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
