import React, { Component } from 'react'
import { CgPlayListRemove, CgPlayListCheck } from 'react-icons/cg'
import './TodoList.css'

const styleIcon = { 
    display: "block",
    color: "white", 
    fontSize: "25px",
    cursor: "pointer"
};

export default class TodoList extends Component {

    render() {
        const { item, removeClick , doneClick } = this.props;
        return (
            <div className="todo-list">
                <div className="todo-row">
                    <div className="title-work">
                        <span>{item.title}</span>
                    </div>
                    <div className="icon">
                        <div className="remove-icon">
                            <CgPlayListRemove 
                                style={styleIcon}   
                                onClick={removeClick} 
                            />
                        </div>
                        <div className="check-icon">
                            <CgPlayListCheck style={styleIcon} onClick={doneClick}/>
                        </div>
                    </div>
                </div>
           </div>
        )
    }
}
