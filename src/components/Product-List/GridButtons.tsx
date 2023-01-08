import React from "react";
import { MDBContainer, MDBIcon, MDBBtn } from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { FaThLarge, FaBars } from "react-icons/fa";

interface ChildProps {
  listType: string;
  setListType: React.Dispatch<React.SetStateAction<string>>;
}

const GridButtons = ({ listType, setListType }: ChildProps) => {

  return (
    <div className="d-flex">
      <MDBBtn
        style={{ marginRight: 5 }}
        tag="a"
        className={listType == "grid" ? "btn_grid active" : "btn_grid"}
        onClick={() => setListType("grid")}
      >
        <FaThLarge />
      </MDBBtn>
      <MDBBtn
        tag="a"
        className={listType == "list" ? "btn_grid active" : "btn_grid"}
        onClick={() => setListType("list")}
      >
        <FaBars />
      </MDBBtn>
    </div> );
};

export default GridButtons;