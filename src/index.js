import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const root = document.querySelector('#root');

class App extends Component{
    constructor(){
        super();
        this.state = {
            users: [],
            laptops: [],
            hash: "",
        }
    }
    async componentDidMount(){

        const hash = window.location.hash.slice(1);
        this.setState({ hash })

        let response = await axios.get('/api/users');
        const users = response.data;
        this.setState({ users });

        response = await axios.get(`/api/laptops`);
        const laptops = response.data;
        this.setState({ laptops })

        window.addEventListener('hashchange', ()=>{
            const hash = window.location.hash.slice(1);
            this.setState({ hash })
        })
    }

    render(){
        const { users, laptops, hash } = this.state;
        const user = users.find( user => user.id === +hash)
        const laptop = laptops.find( laptop => laptop.userId === +hash)
        console.log(user)
        console.log(laptop)
        if(!user || !laptop){
            return null
        }
 
        return(
            <ul>
            {
                users.map( user => {
                return <li key={ user.id }> <a href={`#${user.id}`}>
                   { user.name }
                   </a>
                   </li>
                })
            }
            
            {`${user.name} has a ${laptop.name} laptop`}

            {/* {
                laptops.map( laptop => {
                return <li key={ laptop.id }> 
                   { laptop.name }
                   </li>
                })
            } */}
            </ul>

        )
    }
}

ReactDOM.render(
    <App />, root
);



