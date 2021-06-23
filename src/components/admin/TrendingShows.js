import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import AdminNav from "./AdminNav";
import Spinner from '../layout/Spinner';

import { toast } from "react-toastify";
import { DeleteOutlined } from "@ant-design/icons";

import {
  getTrendingShows,
  removeTrendingShow,
  createTrendingShow,
} from "../../functions/trendingShow";


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

    const loadAllTrendingShows = async () => {
      try {
        setLoading(true);
        const response = await getTrendingShows();
        setTrendingShows(response.data); 
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

        const response = await createTrendingShow(formData, user.token);
        loadAllTrendingShows(); 
        setName("");
        setImage("");
        toast.success(`"${response.data.name}" trending show is created`); 
        setLoading(false);  
    
      } catch (err) {
          toast.error("Create trending show err", err);
          setLoading(false);
      }  
    };

    const handleRemove = async (trendingShowId) => {
      try {
        if (window.confirm("Delete?")) {
          setLoading(true);
          const response = await removeTrendingShow(trendingShowId, user.token);                    
          loadAllTrendingShows(); 
          setLoading(false);
          toast.success(`Trending Show "${response.data.name}" deleted`);
        }

      } catch (err) {
          toast.error("Delete trending show err", err);
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
          <h4 className="text-danger">Trending Shows</h4>  
        
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
              <p>Total no. of Trending Shows: <b>{trendingShows.length}</b></p>
          
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
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default TrendingShows;