import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBRow,
} from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import Moment from "react-moment";
import { FaMapMarkerAlt, FaClock, FaRegCalendarAlt } from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";

const Grid: React.FC = (props: any) => {
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
    } else {
      setProducts([])
    }

    return () => {
      abortcontroller.abort();
    };
    // eslint-disable-next-line
  }, [props.productList]);

  var fetchMoreData = () => {
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
          <MDBRow className="my-5">
            {products.map((product: any, i: number) => {
              return (
                <a
                  href={`/${product.club.id}/details`}
                  className="col-md-12 col-lg-4 mb-4"
                  key={product.club.id}
                >
                  <MDBCard className="h-400px">
                    <MDBCardImage src={product.club.coverUrl} position="top" />
                    <MDBCardBody>
                      <div className="d-flex justify-content-between mb-1">
                        <strong className="mb-0">{product.club.name}</strong>
                      </div>
                      <div className="d-flex justify-content-between mb-1">
                        <p className="text-muted desc mb-0">
                          {product.club.description}
                        </p>
                      </div>

                      <div className="d-flex justify-content-between mb-2">
                        <p className="text-muted mb-0">
                          {" "}
                          <FaMapMarkerAlt />
                          &nbsp;&nbsp;
                          {product.club.place}
                        </p>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <p className="text-muted mb-0 ">
                          <FaRegCalendarAlt /> &nbsp;첫 만남 날짜 :{" "}
                          <Moment
                            date={product.club.meetings[0].startedAt}
                            format="DD/MM (ddd)"
                          />
                        </p>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <p className="text-muted mb-0 ">
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
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                </a>
              );
            })}
          </MDBRow>
        </InfiniteScroll>
      )}
    </>
  );
};

export default Grid;
