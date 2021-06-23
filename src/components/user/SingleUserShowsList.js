import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";

import UserNav from "./UserNav";
import Spinner from '../layout/Spinner';
import _ from "lodash";

import { getUserShows } from "../../functions/user";



const SingleUserShowsList = ({ match, history }) => {
    const [userShows, setUserShows] = useState([]);
    const [loading, setLoading] = useState(false); 

    const { user } = useSelector((state) => ({ ...state }));

    const { id } = match.params;
    
    useEffect(() => {
        loadSingleUserShows();
    }, []);

    const loadSingleUserShows = async () => {
        try {
            setLoading(true);
            const response = await getUserShows(id, user.token);
            setUserShows(response.data); 
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
                    <h4 className="text-danger">Table of Shows</h4>
                    {loading ? (
                        <Spinner />
                    ) : (
                        <>
                            <p>Total no. of Shows: <b>{userShows.length}</b></p>
                    
                            <table className="table table-bordered">
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Sl.No.</th>
                                        <th scope="col">Name of Show</th>                            
                                        <th scope="col">Watch Status</th>          
                                    </tr>
                                </thead>
                                <tbody>
                                    {userShows.map((u) => (
                                        <tr key={u._id}>
                                        {handleShowNumber()}
                                            <td>{n}</td>
                                            <td>{u.name}</td>
                                            <td>{u.watchStatus}</td>                              
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

export default SingleUserShowsList;