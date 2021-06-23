import React from "react";
import { Link } from "react-router-dom";

import pic from "../../img/tvseries.jpg";

import { Card } from "antd";
import { EyeOutlined } from "@ant-design/icons";

const { Meta } = Card;



export const ShowCardMultiple = ({ show }) => {

  // destructure
  const show1 = show.show;

  if(show1.image === null)
    var image = pic;
  else 
    var image = show1.image.original;
  
  const { externals, name, premiered } = show1;
  const {imdb} = externals;   

  return (
    <>      
      {imdb ? 
        <Card
          cover={
            <img
              src={image && image.length ? image : pic}
              style={{ height: "300px", objectFit: "fit" }}
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
            title={`${name}`}
            description={`${premiered}`}
          />
        </Card>
        :
          <Card
          cover={
            <img
              src={image && image.length ? image : pic}
              style={{ height: "300px", objectFit: "fit" }}
              className="p-1"
            />
          }
          actions={[
            <p>Cannot View Show</p>      
          ]}
        >
          <Meta
            title={`${name}`}
            description={`${premiered}`}
          />
        </Card>
      }
    </>
  );
};