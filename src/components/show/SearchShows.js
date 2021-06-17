import React, { useEffect, useState } from "react";

import { SearchOutlined } from "@ant-design/icons";
import { Menu, Slider, Checkbox } from "antd";
import { Card, Radio, Input, Space } from 'antd';
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
  DownOutlined
} from "@ant-design/icons";

import {ShowCardMultiple, ShowCardSingleIMDB} from "./ShowCard";

import { getSearchShows } from "../../functions/show";

import Spinner from '../layout/Spinner';
import _ from "lodash";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const { SubMenu, Item } = Menu;



const SearchShows = ({ match }) => {
  const [text, setText] = useState("");
  const [selectedDropdown, setSelectedDropdown] = useState("multiple");
  const [searchRadioOption, setSearchRadioOption] = useState("multiple");
  const [loading, setLoading] = useState(false);
  const [shows, setShows] = useState([]);
  const [IMDB, setIMDB] = useState("");

      
  useEffect(() => {
    if(searchRadioOption==="multiple") {
      const delayed = setTimeout(() => {
        loadSearchShows({ queryMultiple: text })
      }, 300);
      return () => clearTimeout(delayed);
    }
    else if(searchRadioOption==="single") {
      const delayed = setTimeout(() => {
        loadSearchShows({ querySingle: text })
      }, 700);
      return () => clearTimeout(delayed);
    }
    else if(searchRadioOption==="imdb") {
      const delayed = setTimeout(() => {
        loadSearchShows({ queryIMDB: text })
      }, 700);
      return () => clearTimeout(delayed);
    }
  }, [text]);

  const loadSearchShows = (arg) => {
    //console.log(arg);    
    getSearchShows(arg)
      .then((res) => {
        //console.log("RES",res.data);
        setLoading(false);
        setShows(res.data);
        
        if(searchRadioOption==="single" || searchRadioOption==="imdb") {
          setIMDB(res.data.externals.imdb);          
        }
      });
  }
  
  const handleChange = (e) => {
    setText(e.target.value);
    setLoading(true);
    setShows([]);
    setIMDB(""); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(text);
    setLoading(true);
    loadSearchShows();
    setIMDB("");
  };    
  
  const handleDropdown = (e) => {
    setSelectedDropdown(e.value); 
    setShows([]);
    setIMDB("");     
  };

  const options = [
    { value: 'multiple', label: 'Multiple Searches' },
    { value: 'single', label: 'Single Search' },
    { value: 'imdb', label: 'Search by IMDB' },
  ];

  const onRadioButtonChange = (e) => {
    //console.log('radio checked', e.target.value);
    setSearchRadioOption(e.target.value);
    setShows([]);
    setIMDB(""); 
};
  

  return (    
    <div className="container-fluid">
      <div className="row p-3">
        <div className="col-md-3 pt-2">
          <h4>Search/Filter</h4>
          <hr /> 
          <Radio.Group onChange={onRadioButtonChange} value={searchRadioOption}>
                  <Space direction="vertical">
                    <Radio value="multiple">Multiple Searches</Radio>
                    <Radio value="single">Single Search</Radio>
                    <Radio value="imdb">Search by IMDB</Radio>
                  </Space>
            </Radio.Group>         
        </div>

        <div className="col-md-9 pt-2">
          <div className="container-fluid">
            {/* <Dropdown options={options} onChange={handleDropdown} value={selectedDropdown} placeholder="Select an option" /> */}
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

          {loading ? (
              <Spinner />
            ) : (
              <h4 className="text-danger">Shows</h4>
          )}          

          {shows.length < 1 && <p>No shows found</p>}

          
          {searchRadioOption === "multiple" &&
            <div className="row pb-5">
              {shows.map((s) => (
                <div key={s.show.id} className="col-md-4 mt-3">
                  <ShowCardMultiple show={s}  />
                </div>
              ))}
            </div>            
          }

          {searchRadioOption === "single" && 
            <div className="row pb-5">            
              <ShowCardSingleIMDB show={shows} IMDB={IMDB} />
            </div>
          }

          {/* {searchRadioOption === "imdb" && 
            <div className="row pb-5">            
              <ShowCardSingleIMDB show={shows} />
            </div>
          }  */}
          
        </div>
      </div>
    </div>
  );
};

export default SearchShows;

