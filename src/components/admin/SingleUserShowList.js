import React, {useState, useEffect} from "react";
import { useSelector} from "react-redux";

import AdminNav from "./AdminNav";
import Spinner from '../layout/Spinner';

import { DeleteOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import _ from "lodash";

import { getUserShows, removeUserShow } from "../../functions/admin";


const SingleUserShowList = ({ match, history }) => {
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

    const handleRemoveUserShowFromList = async (u) => {
        try {
            setLoading(true);
        //     const showId = u._id;
        //     if(window.confirm("Delete show?")){
        //     removeUserShow(id, showId, user.token)
        //         .then((res) => {
        //         getUserShows(id, user.token)
        //             .then((res1) =>{
        //             //setLoading(false);
        //             setUserShows(res1.data);        
        //         })
            
        //       toast.success(`"${res.data.name}" show is removed!`);
        //     })
        //     .catch((err) => console.log("Remove show err", err));
        //  }   

            const showId = u._id;
            if(window.confirm("Delete show?")){
                const response1 = await removeUserShow(id, showId, user.token);
                const response2 = await getUserShows(id, user.token);
                setUserShows(response2.data);
                setLoading(false);
                toast.success(`"${response1.data.name}" show is removed!`);
            } 

        } catch (err) {
            toast.error("Remove show error", err);
            setLoading(false);
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
                    <AdminNav />
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
                                    <th scope="col">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {userShows.map((u) => (
                                    <tr key={u._id}>
                                    {handleShowNumber()}
                                        <td>{n}</td>
                                        <td>{u.name}</td>
                                        <td>{u.watchStatus}</td>                              
                                        <td>
                                            <a onClick={(e => handleRemoveUserShowFromList(u))}>
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

export default SingleUserShowList;