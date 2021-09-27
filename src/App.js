import React from 'react'
import TodoList from './components/TodoList'
import IdleTimer from 'react-idle-timer'
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.idleTimer = null
    this.handleOnAction = this.handleOnAction.bind(this)
    this.handleOnActive = this.handleOnActive.bind(this)
    this.handleOnIdle = this.handleOnIdle.bind(this)

    if (localStorage.getItem('todoList') === null) {
      this.state = {
        title: '',
        todoList: []
      }
    } else {
      let getlcStorage = localStorage.getItem('todoList');
      this.state = {
        title: '',
        todoList: JSON.parse(getlcStorage)
      }
    }
  }

  addStorage = newToDo => {
      if (localStorage.getItem('todoList') === null) {
        localStorage.setItem('todoList', JSON.stringify([newToDo]));
      } else {
        let lcStorage = localStorage.getItem('todoList');
        let data = JSON.parse(lcStorage);
        data.unshift(newToDo);
        localStorage.setItem('todoList', JSON.stringify(data));
      }
  }

  removeWork = (item) => {
    return () => {
      const { todoList } = this.state;
      let index = todoList.indexOf(item)
      todoList.splice(index, 1);

      // Remove change complete work in Local Storage
      localStorage.setItem('todoList', JSON.stringify(todoList));

      // Set state again
      this.setState({ 
        todoList: todoList
      });
    }
  }

  doneWork = (item) => {
    return () => {
      const { todoList } = this.state;
      let is_complete_Work = todoList.filter((val) => {
        if (val.id === item.id) {
          val.is_complete = !val.is_complete;
        }
        return item;
      })
      // Save change complete work in Local Storage
      localStorage.setItem('todoList', JSON.stringify(todoList));

      // Set state again
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

  handleKeyUp = (e) => {
    if(e.keyCode === 13) {
      let { todoList } = this.state;
      let context = e.target.value;
      let newToDo = {
        id: Math.floor(Math.random() * 1000),
        title: context,
        is_complete: false
      };
      if (this.state.title.trim().length === 0) {
        e.preventDefault();
      } else {
          if (todoList.length < 9) {
            // PUT data to localStorage
            this.addStorage(newToDo);

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
  }

  submit = e => {
    let { title, todoList }  = this.state;
    let newToDo = {
      id: Math.floor(Math.random() * 1000),
      title: title,
      is_complete: false
    }

    if (e && this.state.title.trim().length === 0) {
      e.preventDefault();
    } else {
      if (todoList.length < 9) {
        // Add data to local storage
        this.addStorage(newToDo);

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

  handleOnAction (event) {
  }

  handleOnActive (event) {
  }

  handleOnIdle (event) {
    window.alert("Có vẻ bạn đang chờ một điều gì đấy! Hãy cho tôi biết khi nào bạn đã sẵn sàng nhé")
  }

  render() {
    const { todoList, title } = this.state
    return (
      <div className="App">
          <IdleTimer
            ref={ref => { this.idleTimer = ref }}
            timeout={1000 * 60 * 10}
            onActive={this.handleOnActive}
            onIdle={this.handleOnIdle}
            onAction={this.handleOnAction}
            debounce={250}
          />
          <div className="title-text">
            <div className="icon-title">
              <img src="https://img.icons8.com/color/48/000000/todo-list--v2.gif" width="30" height="30" alt="GIF"/>
            </div>
            <h3>
              What's the plan for today ?
            </h3>
          </div>
          <div className="form-input">
            <div className="input-work">
              <input type="text" value={title} className="todo-input" placeholder="Type here..." 
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
              todoList.map((item, index) => {
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
