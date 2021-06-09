import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import { EyeOutlined, PlusOutlined } from "@ant-design/icons";
import pic from "../../img/tvseries.jpg";
import { Link } from "react-router-dom";
//import { showAverage } from "../../functions/rating";
//import _ from "lodash";
//import { useSelector, useDispatch } from "react-redux";

const { Meta } = Card;

export const ShowCardMultiple = ({ show }) => {
  const [tooltip, setTooltip] = useState("Click to add");
  
  // destructure
  const show1 = show.show;

  if(show1.image === null)
    var image = pic;
  else 
    var image = show1.image.original;
  
  const { url, name, premiered } = show1;
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
          <Link to={'/'}>
            <EyeOutlined className="text-warning" /> <br /> View Show
          </Link>,
          <Tooltip title={tooltip}>
            
          <PlusOutlined className="text-danger" /> <br /> Add to List
              
            
          </Tooltip>,
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

export const ShowCardSingleIMDB = ({ show }) => {
  const [tooltip, setTooltip] = useState("Click to add");
      
  const { url, name, premiered } = show;
  //console.log(show);
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
          <Link to={'/'}>
            <EyeOutlined className="text-warning" /> <br /> View Show
          </Link>,
          <Tooltip title={tooltip}>
            
          <PlusOutlined className="text-danger" /> <br /> Add to List
              
            
          </Tooltip>,
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


