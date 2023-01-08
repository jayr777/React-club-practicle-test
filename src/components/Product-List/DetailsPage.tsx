import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  MDBBtn,
  MDBCol,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBRow,
  MDBRipple,
  MDBContainer,
} from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import {
  FaMapMarkerAlt,
  FaClock,
  FaRegCalendarAlt,
  FaArrowLeft,
} from "react-icons/fa";
import Moment from "react-moment";
import { RootState, AppDispatch } from "./../../store/index";
import { getProductList } from "../../store/Product/Actions";
import { connect, useSelector } from "react-redux";

let DetailsPage: React.FC = (props: any) => {
  var { id } = useParams();
  let [product, setProduct] = useState([]);
  
  useEffect(() => {
    const abortcontroller = new AbortController();
    props.getProductList();
    return () => {
      abortcontroller.abort();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const abortcontroller = new AbortController();
    if (
      props.productList.productList &&
      props.productList.productList.length > 0
    ) {
      let prod = props.productList.productList.filter((p: any) => {
        return p.club.id === id;
      });
      setProduct(prod);
    }

    return () => {
      abortcontroller.abort();
    };
    // eslint-disable-next-line
  }, [props.productList]);
  console.log(product);
  return (
    <MDBContainer className="my-5 mb-0">
      <MDBBtn
        className="mb-3 btn_grid"
        tag="a"
        onClick={() => (window.location.href = "/")}
      >
        <FaArrowLeft /> Back
      </MDBBtn>
      {product && product.length != 0 && (
        <MDBRow
          className="justify-content-center mb-3"
          key={product[0]["club"]["id"]}
        >
          <MDBCol md="12" xl="12" sm="12">
            <MDBCard className="shadow-0  rounded-3 mb-1 mt-0">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol md="5" lg="5" sm="12" className="mb-4 mb-lg-0">
                    <MDBRipple
                      rippleColor="light"
                      rippleTag="div"
                      className="bg-image rounded hover-zoom hover-overlay"
                    >
                      <MDBCardImage className="img-size" src={product[0]["club"]["coverUrl"]} />

                      <div
                        className="mask"
                        style={{
                          backgroundColor: "rgba(251, 251, 251, 0.15)",
                        }}
                      ></div>
                    </MDBRipple>
                  </MDBCol>
                  <MDBCol md="7" lg="7" sm="12" className="mt-2">
                    <h3>{product[0]["club"]["name"]}</h3>
                    <div className="d-flex flex-row">
                      <span>{product[0]["club"]["type"]}</span>
                    </div>
                    <div className="mt-1 mb-0 mt-3 small">
                      <span>
                        {" "}
                        <FaMapMarkerAlt />
                        &nbsp;&nbsp;
                        {product[0]["club"]["place"]}
                      </span>
                    </div>
                    <div className="mb-2 small">
                      <FaRegCalendarAlt /> &nbsp;첫 만남 날짜 :{" "}
                      <Moment
                        date={product[0]["club"]["meetings"][0]["startedAt"]}
                        format="DD/MM (ddd)"
                      />
                    </div>
                    <p className=" mb-4 mb-md-0">
                      <FaClock /> &nbsp;
                      <Moment
                        date={product[0]["club"]["meetings"][0]["startedAt"]}
                        format="HH:mm - "
                      />
                      <Moment
                        date={product[0]["club"]["meetings"][0]["endedAt"]}
                        format="HH:mm"
                      />
                    </p>
                    <p className="mt-3">
                      ~에 대한 : {product[0]["club"]["description"]}
                    </p>
                    <div className="d-flex ">
                      <p className="mr-30">
                        파트너 : {product[0]["partners"][0]["name"]}
                      </p>
                      <p className="mr-30">
                        지도자 :{product[0]["leaders"][0]["name"]}{" "}
                      </p>
                    </div>
                    <MDBBtn>{product[0]["price"]}</MDBBtn>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      )}
    </MDBContainer>
  );
};

const mapStateToProps = ({ product }: RootState) => ({
  productList: product,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getProductList: () => dispatch(getProductList()),
});

DetailsPage = connect(mapStateToProps, mapDispatchToProps)(DetailsPage);

export default DetailsPage;
