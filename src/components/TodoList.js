import React, { Component } from 'react'
import { IoIosClose, IoIosCheckmark } from 'react-icons/io'
import './TodoList.css'

const styleIcon = { 
    display: "block",
    color: "white", 
    cursor: "pointer"
};

export default class TodoList extends Component {
    render() {
        const { item, removeClick , doneClick } = this.props;
        return (
            <div className="todo-list">
                <div className={ !item.is_complete ? "todo-row row-" + this.props.index.toString() :"todo-row row-" + this.props.index.toString() + " todo-complete" }>
                    <div className="title-work">
                        <span>{item.title}</span>
                    </div>  
                    <div className="icon">
                        <div className="remove-icon">
                            <IoIosClose 
                                style={styleIcon}   
                                onClick={removeClick} 
                                size={30}
                            />
                        </div>
                        <div className="check-icon">
                            <IoIosCheckmark style={styleIcon} size={30} onClick={doneClick} />
                        </div>
                    </div>
                </div>
           </div>
        )
    }
}
