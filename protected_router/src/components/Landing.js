import React,{useState,useEffect,} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const  Landing = (props) => {
  const url="https://reqres.in/api/users?page=2";
  const [users, setUsers] = useState([]);
  useEffect(() => {
   axios.get(url)
   .then(response=>{
     setUsers(response.data.data)
   })
  }, []);
  return (
    <div>
      {users && users.map((user)=>{
        return(
          <div className="user">
            {user.first_name}
          </div>
        )
      })
      }
      <button><Link to='/dashboard'>User Details</Link></button>
      <p>Logged in status: {props.user}</p>
      <button onClick={props.handleLogin}>Log In</button>
    </div>
  )
};
export default Landing;
