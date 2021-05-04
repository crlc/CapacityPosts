import React from 'react';
import Post, { PostForm } from './post';
import Banner from './banner';

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            message: '',
            error: false,
            users: {}
        };
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/posts')//get posts
            .then((response) => response.json())
            .then((json) => this.setState({ posts: json }))
            .catch(error => this.handleMessage(error.message, true));

        fetch('https://jsonplaceholder.typicode.com/users')//get users for id mapping
            .then((response) => response.json())
            .then((json) => {
                const users = {};
                json.forEach(user => {
                    users[user.id] = user;
                });
                this.setState({ users });
            })
            .catch(error => this.handleMessage(error.message, true));
    }

    handleAddPost = (post) => {
        this.setState({
            posts: this.state.posts.concat(post)
        }, this.handleMessage('Successfully posted'));
    }

    handleDelete = (removedPost) => {
        const posts = this.state.posts.filter(post => post.id !== removedPost.id)
        this.setState({
            posts
        }, this.handleMessage(`Successfully deleted post: ${removedPost.title}`));
    }

    handleMessage = (message, error = false) => {
        let x = document.getElementById("banner");
        let className = `show ${error ? 'error' : 'success'}`;
        x.className = className;
        setTimeout(function () {
            x.className = x.className.replace(className, "");
        }, 5000);
        this.setState({ message, error });
    }

    render() {
        // const {posts, }
        return (
            <div>Welcome to Capacity Posts
                <Banner message={this.state.message} error={this.state.error} />
                <PostForm handleAddPost={this.handleAddPost} handleMessage={this.handleMessage} />
                {this.state.posts.map(post => <Post key={post.id} {...post} user={this.state.users[post.userId]} handleDelete={this.handleDelete} />)}
            </div>
        );
    }
}

export default Container;