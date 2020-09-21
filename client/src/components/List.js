import React from 'react';
import Axios from 'axios';

class List extends React.Component
{
    state = {
        users:[]
    }

    getUsers = () =>{
        try {
            Axios.get('http://localhost:5000/users')
            .then(res => {
                this.setState({users:res.data});
                console.log(this.state.users);
            })
        } catch (err) {
            console.error(err.message);
        }
    }

    componentDidMount = () => {
        this.getUsers();
    }
    render()
    {
        return(
            <div>
                <table className="table mt-5 text-center borderless">
                    <thead>
                        <tr>
                            <th>User name</th>
                            <th>User email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.users.map(user=>(
                                <tr key={user.user_id}>
                                    <td>{user.user_name}</td>
                                    <td>{user.user_email}</td>
                                    
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        );
    }


}

export default List;
