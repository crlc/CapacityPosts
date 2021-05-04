import './post.css';
import React from 'react';

export class PostForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: ''
        };
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({ [name]: value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { title, body } = this.state;
        if (!title) {
            return this.props.handleMessage('Title cannot be blank', true);
        } else if (!body) {
            return this.props.handleMessage('Post cannot be blank', true);
        }
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title,
                body,
                userId: 1,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => this.setState({//reset state
                title: '',
                body: ''
            }, this.props.handleAddPost(json)))//limitation of api: responds with duplicate post ids
            .catch(error => this.props.handleMessage(error.message, true));
    }

    render() {
        return (
            <form className='post' onSubmit={this.handleSubmit}>
                <label>Title: </label>
                <input name='title' value={this.state.title} onChange={this.handleChange} />
                <label>Post: </label>
                <textarea name='body' value={this.state.body} onChange={this.handleChange} rows='4' />
                <button type='submit'>Submit</button>
            </form>
        )
    }
}

const Post = (props) => {
    const handleDelete = () => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${props.id}`, {
            method: 'DELETE',
        })
            .then((response) => {
                response.status === 200 && props.handleDelete(props);
            })
            .catch(error => this.props.handleMessage(error.message, true));
    }
    return (
        <div className='post'>
            <div title='Delete post' className='remove' onClick={handleDelete}>+</div>
            <div className='post-title'><label>Title: </label>{props.title}</div>
            <div><label>Post: </label>{props.body}</div>
            <div className='user'>Name: {props.user ? props.user.name : props.userId}</div>
        </div>
    )
}

export default Post;
