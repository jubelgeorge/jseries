import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import UserNav from "./UserNav";
import Spinner from '../layout/Spinner';

import { getUsers } from "../../functions/user";



const UserTableShows = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false); 

    const { user } = useSelector((state) => ({ ...state }));
    
    useEffect(() => {
        loadAllUsers();    
    }, []);
    
    const loadAllUsers = async () => {
        try {
            setLoading(true);      
            const response = await getUsers(user.token); 
            
            const resultantUsersWithoutLoggedInUser = response.data.filter(u => {
                return u.email != user.email
            })
            setUsers(resultantUsersWithoutLoggedInUser);        
            setLoading(false); 
      
        } catch (err) {
              console.log(err);
        }     
    }  
    
    let n = 0;
    const handleShowNumber = () => {
        n+=1;
    } 
    
    
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className="col-md-10">
                    <h4 className="text-danger">Table of Users</h4>
                    {loading ? (
                        <Spinner />
                        ) : (
                        <>
                            <p>No. of Users: <b>{users.length}</b></p>

                            <table className="table table-bordered">
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Sl.No.</th>
                                        <th scope="col">Name of User</th>                            
                                        <th scope="col">See Show List</th>                
                                    </tr>
                                </thead>
                                <tbody>
                                {users.map((u) => (
                                    <tr key={u._id}>
                                        {handleShowNumber()}
                                        <td>{n}</td>
                                        <td>{u.name}</td>
                                        <td>
                                            <Link to ={`/user/${u._id}`}>Click here to see the list</Link>
                                        </td>                                         
                                    </tr>                            
                                ))}
                                </tbody>
                            </table>
                        </>
                    )}                                    
                        
                </div>
            </div>
        </div>
    );
};

export default UserTableShows;