import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
} from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";

import GridButtons from "./GridButtons";
import Search from "./Search";
import Grid from "./Grid";
import List from "./List";

import { RootState, AppDispatch } from "./../../store/index";
import { getProductList } from "../../store/Product/Actions";
import { connect } from "react-redux";

let ProductList: React.FC = (props: any) => {
  const [listType, setListType] = useState("grid");

  useEffect(() => {
    const abortcontroller = new AbortController();
    props.getProductList();
    return () => {
      abortcontroller.abort();
    };
    // eslint-disable-next-line
  }, []);

  let productList = props.productList;

  return (
    <>
      <MDBContainer className="my-5 mb-0">
        <MDBRow>
          <MDBCol md="8" lg="8" sm="12" className="mb-2 mb-lg-0">
            <GridButtons listType={listType} setListType={setListType} />
          </MDBCol>
          <MDBCol md="4" lg="4" sm="12" className="mb-2 mb-lg-0">
            <Search {...productList} />
          </MDBCol>
        </MDBRow>
        <MDBRow className="my-5 mb-0">
          <MDBCol>
            <h4>View All Clubs</h4>
          </MDBCol>
          <hr />
        </MDBRow>
      </MDBContainer>
      <MDBContainer>
        {productList &&
          productList.length > 0 &&
          (listType == "grid" ? (
            <Grid {...productList} />
          ) : (
            <List {...productList} />
          ))}
      </MDBContainer>
    </>
  );
};

const mapStateToProps = ({ product }: RootState) => ({
  productList: product,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getProductList: () => dispatch(getProductList()),
});

ProductList = connect(mapStateToProps, mapDispatchToProps)(ProductList);

export default ProductList;
