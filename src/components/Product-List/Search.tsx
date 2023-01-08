import React from "react";
import { MDBContainer, MDBIcon, MDBBtn, MDBInput } from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { FaSearch } from "react-icons/fa";
import { SEARCH_SUCCESS } from "../../store/Product/Types";
import store from "../../store/index";

const Search = (props: any) => {
  // console.log(props)
  const searchData = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    if (e.target.value != "") {
      const filterRec = props.mainProductList.filter((product: any) => {
        console.log(product);
        return (
          product.price.toString().includes(e.target.value.toLowerCase()) ||
          product.partners[0].name
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          product.leaders[0].name
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          product.club.name
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          product.club.place
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          product.club.type
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          product.club.description
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
        );
      });
      store.dispatch({
        type: "SEARCH_SUCCESS",
        payload: filterRec,
      });
      console.log(props);
    } else {
        store.dispatch({
          type: "SEARCH_SUCCESS",
          payload: props.mainProductList,
        });
    }
    
  };

  return (
    <div className="position-relative">
      <MDBInput
        label="Search"
        id="form1"
        type="text"
        className="position-relative"
        autoComplete="off"
        onChange={(e) => searchData(e)}
      />
      {/* <MDBBtn className="search" onClick={searchData}>
        <FaSearch />
      </MDBBtn> */}
    </div>
  );
};

export default Search;
