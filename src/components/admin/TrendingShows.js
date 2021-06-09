import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { DeleteOutlined } from "@ant-design/icons";
import {
    getTrendingShows,
    removeTrendingShow,
    createTrendingShow,
} from "../../functions/trendingShow";

import AdminNav from "./AdminNav";

import Spinner from '../layout/Spinner';


const TrendingShows = () => {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [loading,setLoading] = useState(false);
    const [trendingShows, setTrendingShows] = useState([]);

    // redux
    const { user } = useSelector((state) => ({ ...state }));
    
    useEffect(() => {
        loadAllTrendingShows();
    }, []);

    const loadAllTrendingShows = () => {
        getTrendingShows()
        .then((res) =>{
            //console.log(res);
            setTrendingShows(res.data);
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        
        formData.append('name', name);

        setLoading(true);

        createTrendingShow(formData, user.token)
        .then((res) => {
            setLoading(false);
            loadAllTrendingShows(); // load all coupons
            setName("");
            setImage("");
            toast.success(`"${res.data.name}" trending show is created`);
        })
        .catch((err) => console.log("create trending show err", err));
    };

    const handleRemove = (trendingShowId) => {
        console.log(trendingShowId);
        if (window.confirm("Delete?")) {
        setLoading(true);
        removeTrendingShow(trendingShowId, user.token)
            .then((res) => {
            loadAllTrendingShows(); // load all trending shows
            setLoading(false);
            toast.error(`Trending Show "${res.data.name}" deleted`);
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
            <h4 className="text-danger">Trending Shows</h4>
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

        <h4>{trendingShows.length} Trending Shows</h4>
        
        <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Image</th>                
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {trendingShows.map((t) => (
                <tr key={t._id}>
                  <td>{t.name}</td>
                  <td>
                    <img 
                        src={`/uploads/${t.image}`} 
                        style={{ height: "100px", width: "100px", objectFit: "fit" }}
                        className="p-1"
                    />
                  </td>                 
                  <td>
                    <DeleteOutlined
                      onClick={() => handleRemove(t._id)}
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

export default TrendingShows;
