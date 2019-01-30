import React, { Component } from 'react'
import propTypes from 'prop-types';

export class TodoItem extends Component {
    getStyle = () => {
        return {
            background: '#f4f4f4',
            padding: '10px',
            borderBottom: '1px #ccc dotted',
            textDecoration: this.props.todo.completed ? 'line-through' : 'none'
        }
    }

    render() {
        const { id, title } = this.props.todo;
        return (
        <div style={this.getStyle()}>
            <p>
                <input type="checkbox" onChange={this.props.markComplete.bind(this, id)}/> {' '}
                { title }
            </p>
        </div>
        )
    }
}

// Proptypes requiring for this class to be passed in
TodoItem.propTypes = {
    todo: propTypes.object.isRequired
}

export default TodoItem
