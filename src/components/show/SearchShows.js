import React, { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Menu, Slider, Checkbox, Radio } from "antd";
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
  DownOutlined
} from "@ant-design/icons";

import {ShowCardMultiple, ShowCardSingleIMDB} from "./ShowCard";

import { getSearchShows } from "../../functions/show";

import Spinner from '../layout/Spinner';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const { SubMenu, Item } = Menu;


const SearchShows = ({ match }) => {
  const [text, setText] = useState("");
  const [selectedDropdown, setSelectedDropdown] = useState("multiple");
  const [loading, setLoading] = useState(false);
  const [shows, setShows] = useState([]);
    
  useEffect(() => {
    if(selectedDropdown==="multiple") {
      const delayed = setTimeout(() => {
        loadSearchShows({ queryMultiple: text })
      }, 300);
      return () => clearTimeout(delayed);
    }
    else if(selectedDropdown==="single") {
      const delayed = setTimeout(() => {
        loadSearchShows({ querySingle: text })
      }, 700);
      return () => clearTimeout(delayed);
    }
    else if(selectedDropdown==="imdb") {
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
        console.log("RES",res.data);
        setLoading(false);
        setShows(res.data);
      });
  }
  
  const handleChange = (e) => {
    setText(e.target.value);
    setLoading(true);
    setShows([]); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(text);
    setLoading(true);
    loadSearchShows();
  };    
  
  const handleDropdown = (e) => {
    setSelectedDropdown(e.value); 
    setShows([]);     
  };

  const options = [
    { value: 'multiple', label: 'Multiple Searches' },
    { value: 'single', label: 'Single Search' },
    { value: 'imdb', label: 'Search by IMDB' },
  ];
  const defaultOption = options[0];

  return (    
    <div className="container-fluid">
      <div className="row p-3">
        <div className="col-md-3 pt-2">
          {selectedDropdown === "single" && <h3>Single</h3>}
          {selectedDropdown === "multiple" && <h3>multiple</h3>}
          {selectedDropdown === "imdb" && <h3>imdb</h3>}
          <h4>Search/Filter</h4>
          <hr />

          <Menu
            defaultOpenKeys={["1", "2", "3", "4", "5", "6", "7"]}
            mode="inline"
          >

            {/* category */}
            <SubMenu
              key="2"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Categories
                </span>
              }
            >
              <div style={{ maringTop: "-10px" }}>Show Categories</div>
            </SubMenu>

            {/* shipping */}
            <SubMenu
              key="7"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Shipping
                </span>
              }
            >
              <div style={{ maringTop: "-10px" }} className="pr-5">
                Show Shipping
              </div>
            </SubMenu>
          </Menu>
        </div>


        <div className="col-md-9 pt-2">
          <div className="container-fluid">

          <Dropdown options={options} onChange={handleDropdown} value={selectedDropdown} placeholder="Select an option" />
          
          {/* <select id = "dropdown">
              <option value="N/A">Multiple Seaches</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
          </select> */}

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

          
          {selectedDropdown === "multiple" &&
            <div className="row pb-5">
              {shows.map((s) => (
                <div key={s.show.id} className="col-md-4 mt-3">
                  <ShowCardMultiple show={s} />
                </div>
              ))}
            </div>            
          }

          {selectedDropdown === "single" &&
            <div className="row pb-5">            
              <ShowCardSingleIMDB show={shows} />
            </div>
          } 
          
        </div>
      </div>
    </div>
  );
};

export default SearchShows;

