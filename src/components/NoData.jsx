import React from "react";

const NoData = ({imgSrc = '/image/nodata.png'}) => {
  return (
    <div className="d-flex justify-content-center">
      <img src={imgSrc} alt="" />
    </div>
  );
};

export default NoData;
