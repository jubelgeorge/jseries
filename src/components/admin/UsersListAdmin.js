import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import AdminNav from "./AdminNav";
import Spinner from '../layout/Spinner';

import { DeleteOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import _ from "lodash";

import { getUsers, removeUser } from "../../functions/admin";


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
            const resultantUsersWithoutAdminUser = response.data.filter(u => {
                return u.role === 'subscriber'
            })
            setUsers(resultantUsersWithoutAdminUser);
            setLoading(false);  
        
        } catch (err) {
            console.log(err);
        }          
    } 

    const handleRemoveUserFromList = async (u) => {
        try {
            const userId = u._id;
    
            if (window.confirm("Delete?")) {
              setLoading(true);
              const response1 = await removeUser(userId, user.token);  
              loadAllUsers();
              setLoading(false);
              toast.success(`"${response1.data.name}" user is removed!`);
            }
    
        } catch (err) {
              toast.error("Delete upcoming show err", err);
              setLoading(false);
        }         
    };  

    let n = 0;
    const handleShowNumber = () => {
        n+=1;
    } 
    
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    <h4 className="text-danger">Table of Users</h4>
                    {loading ? (
                        <Spinner />
                    ) : (
                        <>
                            <p>Total no. of Users: <b>{users.length}</b></p>
                    
                            <table className="table table-bordered">
                                <thead className="thead-light">
                                <tr>
                                    <th scope="col">Sl.No.</th>
                                    <th scope="col">Name of User</th>                            
                                    <th scope="col">See Show List</th>                
                                    <th scope="col">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {users.map((u) => (
                                    <tr key={u._id}>
                                    {handleShowNumber()}
                                        <td>{n}</td>
                                        <td>{u.name}</td>
                                        <td>
                                            <Link to ={`/admin/user/${u._id}`}>Click here to see the list</Link>
                                        </td>                                         
                                        <td>
                                            <a onClick={(e => handleRemoveUserFromList(u))}>
                                                <DeleteOutlined className="text-danger" /> <br />
                                            </a> 
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