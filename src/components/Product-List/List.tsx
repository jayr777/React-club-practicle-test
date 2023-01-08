import React, { useEffect, useState } from "react";
import {
  MDBIcon,
  MDBBtn,
  MDBCol,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBRow,
  MDBRipple,
} from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { FaMapMarkerAlt, FaClock, FaRegCalendarAlt } from "react-icons/fa";
import Moment from "react-moment";
import InfiniteScroll from "react-infinite-scroll-component";

const List: React.FC = (props: any) => {
  console.log(props);

  let [products, setProducts] = useState([]);
  let [start, setStart] = useState(0);
  let [length, setLength] = useState(12);

  useEffect(() => {
    
    const abortcontroller = new AbortController();
    if (props.productList && props.productList.length > 0) {
      // set first 12 data to products
      setProducts(
        props.productList.slice(start, length).map((item: any) => {
          return item;
        })
      );
    }
    else {
      setProducts([]);
    }

    return () => {
      abortcontroller.abort();
    };
    // eslint-disable-next-line
  }, [props.productList]);

  var fetchMoreData = () => {
    console.log("fetchMoreData");
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    var from = start + length;
    var to = from + length;
    var data = props.productList.slice(from, to).map((item: any) => {
      return item;
    });

    setTimeout(() => {
      setProducts(products.concat(data));
    }, 1500);
  };
  console.log(products);
  return (
    <>
      {products && products.length > 0 && (
        <InfiniteScroll
          className="overflow"
          hasMore={true}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          dataLength={props.productList.length}
          next={fetchMoreData}
        >
          {products.map((product: any, i: number) => {
            return (
              <a
                href={`/${product.club.id}/details`}
                className="row justify-content-center mb-3"
                key={product.club.id}
              >
                <MDBCol md="12" xl="12" sm="12">
                  <MDBCard className="shadow-0 border rounded-3 mb-1 mt-0">
                    <MDBCardBody>
                      <MDBRow>
                        <MDBCol md="12" lg="3" className="mb-4 mb-lg-0">
                          <MDBRipple
                            rippleColor="light"
                            rippleTag="div"
                            className="bg-image rounded hover-zoom hover-overlay"
                          >
                            <MDBCardImage src={product.club.coverUrl} fluid />
                            <div
                              className="mask"
                              style={{
                                backgroundColor: "rgba(251, 251, 251, 0.15)",
                              }}
                            ></div>
                          </MDBRipple>
                        </MDBCol>
                        <MDBCol md="9" className="mt-2">
                          <h5 className="color-gray">{product.club.name}</h5>
                          <div className="d-flex flex-row">
                            <span className="desc color-gray">
                              {product.club.description}
                            </span>
                          </div>
                          <div className="mt-1 mb-0 text-muted small">
                            <span>
                              {" "}
                              <FaMapMarkerAlt />
                              &nbsp;&nbsp;
                              {product.club.place}
                            </span>
                          </div>
                          <div className="mb-2 text-muted small">
                            <FaRegCalendarAlt /> &nbsp;첫 만남 날짜 :{" "}
                            <Moment
                              date={product.club.meetings[0].startedAt}
                              format="DD/MM (ddd)"
                            />
                          </div>
                          <p className="text-muted mb-4 mb-md-0">
                            <FaClock /> &nbsp;
                            <Moment
                              date={product.club.meetings[0].startedAt}
                              format="HH:mm - "
                            />
                            <Moment
                              date={product.club.meetings[0].endedAt}
                              format="HH:mm"
                            />
                          </p>
                        </MDBCol>
                      </MDBRow>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </a>
            );
          })}
        </InfiniteScroll>
      )}
    </>
  );
};

export default List;
