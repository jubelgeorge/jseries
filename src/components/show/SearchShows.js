import React, { useEffect, useState } from "react";

import Spinner from '../layout/Spinner';
import _ from "lodash";
import {ShowCardMultiple} from "./ShowCard";

import { SearchOutlined } from "@ant-design/icons";
import { Radio, Space } from 'antd';

import { getSearchShows } from "../../functions/show";



const SearchShows = () => {
  const [text, setText] = useState("");
  const [searchRadioOption, setSearchRadioOption] = useState("multiple");
  const [loading, setLoading] = useState(false);
  const [shows, setShows] = useState([]);
      
  useEffect(() => {
    if(searchRadioOption==="multiple") {
      const delayed = setTimeout(() => {
        loadSearchShows({ queryMultiple: text })
      }, 300);
      return () => clearTimeout(delayed);
    }
  }, [text]);

  const loadSearchShows = async (arg) => {
    try {

      if(text === "") {
        setLoading(false);
      }

      // getSearchShows(arg)
      //   .then((res) => {
      //     setLoading(false);
      //     setShows(res.data);
          
      //     if(searchRadioOption==="single" || searchRadioOption==="imdb") {
      //       setIMDB(res.data.externals.imdb);          
      //     }
      //   });

      const response = await getSearchShows(arg);
      setShows(response.data);
      setLoading(false);  
  
    } catch (err) {
      console.log(err);
    }      
  }
  
  const handleChange = (e) => {
    setText(e.target.value);
    setShows([]); 
    setLoading(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loadSearchShows();
    setLoading(true);
  };    

  const onRadioButtonChange = (e) => {
    setSearchRadioOption(e.target.value);
    setShows([]);
  };
  

  return (    
    <div className="container-fluid">
      <div className="row p-3">
        <div className="col-md-3 pt-2">
          <h4>Search for Shows</h4>
          <hr /> 
          <Radio.Group onChange={onRadioButtonChange} value={searchRadioOption}>
                  <Space direction="vertical">
                    <Radio value="multiple">Multiple Searches</Radio>
                  </Space>
            </Radio.Group>         
        </div>

        <div className="col-md-9 pt-2">
          <div className="container-fluid" style={{marginLeft: "-10px", marginTop: "-8px"}}>
            <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
              <input
                onChange={handleChange}
                type="search"
                value={text}
                className="form-control mr-sm-2"
                placeholder="Search"
              />
              <SearchOutlined onClick={handleSubmit} style={{ cursor: "pointer" }} />
            </form>
          </div>
          <br />
          <h4 className="text-danger">Shows</h4>
          {shows.length < 1 && <p>No shows found</p>}
          {loading ? (
              <Spinner />
            ) : (
              <>
                {searchRadioOption === "multiple" &&
                  <div className="row pb-5">
                    {shows.map((s) => (
                      <div key={s.show.id} className="col-md-4 mt-3">
                        <ShowCardMultiple show={s}  />
                      </div>
                    ))}
                  </div>            
                }
              </>
          )}         
          
        </div>
      </div>
    </div>
  );
};

export default SearchShows;