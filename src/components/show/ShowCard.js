import React, { useState } from "react";

import { Card } from "antd";
import { EyeOutlined, PlusOutlined } from "@ant-design/icons";
import pic from "../../img/tvseries.jpg";
import { Link } from "react-router-dom";

const { Meta } = Card;


export const ShowCardMultiple = ({ show }) => {

  // destructure
  const show1 = show.show;

  if(show1.image === null)
    var image = pic;
  else 
    var image = show1.image.original;
  
  const { externals, url, name, premiered } = show1;
  const {imdb} = externals;   

  return (
    <>      
      <Card
        cover={
          <img
            src={image && image.length ? image : pic}
            style={{ height: "250px", objectFit: "fit" }}
            className="p-1"
          />
        }
        actions={[
          <Link to={`/show/${imdb}`}>
            <EyeOutlined className="text-warning" /> <br /> View Show
          </Link>          
        ]}
      >
        <Meta
          title={`${name} - ${premiered}`}
          description={`${url}`}
        />
      </Card>
    </>
  );
};

export const ShowCardSingleIMDB = ({ show, IMDB }) => {
  const [tooltip, setTooltip] = useState("Click to add");
      
  const { id, url, name, premiered } = show;
  const imdb = IMDB;
  console.log(imdb);
  
  return (
    <>      
      <Card
        cover={
          <img
            src={show.image && show.image.length && show.image.original ? show.image.original : pic}
            style={{ height: "250px", width:"250px", objectFit: "fit" }}
            className="p-1"
          />
        }
        actions={[
          <Link to={`/show/${imdb}`}>
            <EyeOutlined className="text-warning" /> <br /> View Show
          </Link>          
        ]}
      >
        <Meta
          title={`${name} - ${premiered}`}
          description={`${url}`}
        />
      </Card>
    </>
  );
};


