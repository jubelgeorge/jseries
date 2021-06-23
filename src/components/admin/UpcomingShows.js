import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import AdminNav from "./AdminNav";
import Spinner from '../layout/Spinner';

import { toast } from "react-toastify";
import { DeleteOutlined } from "@ant-design/icons";

import {
  getUpcomingShows,
  removeUpcomingShow,
  createUpcomingShow,
} from "../../functions/upcomingShow";


const UpcomingShows = () => {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [loading,setLoading] = useState(false);
    const [upcomingShows, setUpcomingShows] = useState([]);

    // redux
    const { user } = useSelector((state) => ({ ...state }));
    
    useEffect(() => {
        loadAllUpcomingShows();
    }, []);

    const loadAllUpcomingShows = async () => {
      try {
        setLoading(true);

        // getTrendingShows()
        // .then((res) =>{
        //     //console.log(res);
        //     setTrendingShows(res.data);
        // })

        const response = await getUpcomingShows();
        setUpcomingShows(response.data); 
        setLoading(false);  
    
      } catch (err) {
          console.log(err);
      }  
    }

    const handleSubmit = async (e) => {
      try {
        setLoading(true);

        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        
        formData.append('name', name);   

        // createTrendingShow(formData, user.token)
        // .then((res) => {
        //     setLoading(false);
        //     loadAllTrendingShows(); 
        //     setName("");
        //     setImage("");
        //     toast.success(`"${res.data.name}" trending show is created`);
        // })
        // .catch((err) => console.log("create trending show err", err));

        const response = await createUpcomingShow(formData, user.token);
        loadAllUpcomingShows(); 
        setName("");
        setImage("");
        toast.success(`"${response.data.name}" upcoming show is created`); 
        setLoading(false);  
    
      } catch (err) {
          toast.error("Create upcoming show err", err);
          setLoading(false);
      }  
    };

    const handleRemove = async (upcomingShowId) => {
      try {
        // if (window.confirm("Delete?")) {
        //   setLoading(true);
        //   removeTrendingShow(trendingShowId, user.token)
        //       .then((res) => {
        //       loadAllTrendingShows(); // load all trending shows
        //       setLoading(false);
        //       toast.error(`Trending Show "${res.data.name}" deleted`);
        //       })
        //       .catch((err) => console.log(err));
        // }

        if (window.confirm("Delete?")) {
          setLoading(true);
          const response = await removeUpcomingShow(upcomingShowId, user.token);                    
          loadAllUpcomingShows();
          setLoading(false);
          toast.success(`Upcoming Show "${response.data.name}" deleted`);
        }

      } catch (err) {
          toast.error("Delete upcoming show err", err);
          setLoading(false);
      } 
    };    

    
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>
          <div className="col-md-10">
            <h4 className="text-danger">Upcoming Shows</h4>            
          
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
                <div className="form-group">
                  <label className="text-muted">Show Name</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    autoFocus
                    required
                  />
                </div>          
                <input 
                    type="file" 
                    className="form-control"
                    accept=".png, .jpg, .jpeg"
                    name="image"
                    //value={image}
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <br />

                <button className="btn btn-outline-primary">Save</button>
            </form>

            <br />

            {loading ? (
              <Spinner />
            ) : (
              <>
                <p>Total no. of Upcoming Shows: <b>{upcomingShows.length}</b></p>
            
                <table className="table table-bordered">
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Image</th>                
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {upcomingShows.map((u) => (
                        <tr key={u._id}>
                          <td>{u.name}</td>
                          <td>
                            <img 
                                src={`/uploads/${u.image}`} 
                                style={{ height: "100px", width: "100px", objectFit: "fit" }}
                                className="p-1"
                            />
                          </td>                 
                          <td>
                            <DeleteOutlined
                              onClick={() => handleRemove(u._id)}
                              className="text-danger pointer"
                            />
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

export default UpcomingShows;