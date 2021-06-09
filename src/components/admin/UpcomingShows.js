import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { DeleteOutlined } from "@ant-design/icons";
import {
    getUpcomingShows,
    removeUpcomingShow,
    createUpcomingShow,
} from "../../functions/upcomingShow";

import AdminNav from "./AdminNav";

import Spinner from '../layout/Spinner';


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

    const loadAllUpcomingShows = () => {
        getUpcomingShows()
        .then((res) =>{
            //console.log(res);
            setUpcomingShows(res.data);
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        
        formData.append('name', name);

        setLoading(true);

        createUpcomingShow(formData, user.token)
        .then((res) => {
            setLoading(false);
            loadAllUpcomingShows(); // load all coupons
            setName("");
            setImage("");
            toast.success(`"${res.data.name}" upcoming show is created`);
        })
        .catch((err) => console.log("create upcoming show err", err));
    };

    const handleRemove = (upcomingShowId) => {
        console.log(upcomingShowId);
        if (window.confirm("Delete?")) {
        setLoading(true);
        removeUpcomingShow(upcomingShowId, user.token)
            .then((res) => {
            loadAllUpcomingShows(); // load all upcoming shows
            setLoading(false);
            toast.error(`Upcoming Show "${res.data.name}" deleted`);
            })
            .catch((err) => console.log(err));
        }
    };    

    
    return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
        {loading ? (
            <Spinner />
            ) : (
            <h4 className="text-danger">Upcoming Shows</h4>
        )}  
        
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

        <h4>{upcomingShows.length} Upcoming Shows</h4>
        
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

        </div>
      </div>
    </div>
  );
};

export default UpcomingShows;
