import React from 'react'
import TodoList from './components/TodoList'
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      todoList: [],
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
      this.setState ({
        todoList: is_complete_Work
      })
    }
  }

  handleChange = (e) => {
    let title = e.target.value;
    this.setState ({
      title: title
    })
  }

  handleKeyUp = e => {
    let { todoList } = this.state;
    let context = e.target.value;
    let newToDo = {
      id: Math.floor(Math.random() * 1000),
      title: context,
      is_complete: false
    };
    if(e.keyCode === 13) {
      if (todoList.length < 9) {
        todoList.unshift(newToDo);
        this.setState ({
          title: '',
          todoList: todoList
        })
      }
      else {
        window.alert('Làm xong hết chưa mà nhập tiếp ? Làm xong nốt đi rồi mở khóa cho nhập tiếp'); 
        e.preventDefault();
      }
    }
  }

  submit = e => {
    let { title, todoList }  = this.state;
    let newToDo = {
      id: Math.floor(Math.random() * 1000),
      title: title,
      is_complete: false
    }
    if (e) {
      if (todoList.length < 9) {
        todoList.unshift(newToDo);
        this.setState({
          title: '',
          todoList: todoList
        })    
      } else {
        window.alert('Làm xong hết chưa mà nhập tiếp ? Làm xong nốt đi rồi mở khóa cho nhập tiếp !'); 
        e.preventDefault();
      }
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
            <div className="input-work">
              <input type="text" value={title} className="todo-input" placeholder="Coding..." 
              onChange={this.handleChange} onKeyUp={this.handleKeyUp}
              />
              <button type="submit" 
              className="btn btn-submit"
              onClick={this.submit}
              >
                Submit 
              </button>       
            </div>
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
