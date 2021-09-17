import React from 'react'
import TodoList from './components/TodoList'
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      todoList: [
        { id: Math.floor(Math.random() * 100), title: 'Learn React', is_complete: false },
        { id: Math.floor(Math.random() * 100), title: 'Do CSS', is_complete: false },
        { id: Math.floor(Math.random() * 100), title: 'Coding Javascript', is_complete: false }
      ],
    }
  }

  removeWork = (item) => {
    return (event) => {
      const { todoList } = this.state;
      let index = todoList.indexOf(item)
      todoList.splice(index, 1);
      this.setState({ 
        todoList: todoList
      });
    }
  }

  doneWork = (item) => {
    return (event) => {
      const { todoList } = this.state;
      let is_complete_Work = todoList.filter((val) => {
        if (val.id === item.id) {
          val.is_complete = !val.is_complete;
        }
        return item;
      })
      this.setState({
        todoList: is_complete_Work
      })
    }
  }

  handleChange = (e) => {
    let title = e.target.value;
    this.setState({
      title: title
    })
  }

  handleKeyUp = (e) => {
    let { todoList } = this.state;
    let context = e.target.value;
    let newToDo = {
      id: Math.floor(Math.random() * 100),
      title: context,
      is_complete: false
    };
    if(e.keyCode === 13) {
      todoList.unshift(newToDo);
      this.setState({
        todoList: todoList
      })
    }
  }
  render() {
    const { todoList, title } = this.state
    return (
      <div className="App">
          <div className="title-text">
            <h3>
              What's the plan for today ?
            </h3>
          </div>
          <div className="form-input">
            <input type="text" value={title} className="todo-input" placeholder="Coding..." 
            onChange={this.handleChange} onKeyUp={this.handleKeyUp}
            />
            <button type="submit" 
            className="btn btn-submit" 
            >
              Submit 
            </button>
            {/* Component Todo - List */}
            {
              todoList.length && todoList.map((item, index) => {
                return <TodoList 
                item={item} 
                key={item.id} 
                index={index} 
                removeClick={this.removeWork(item)}
                doneClick = {this.doneWork(item)}
                />
              })
            }
          </div>
      </div>
    );
  }
}
