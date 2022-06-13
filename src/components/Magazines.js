import React from "react";

const Magazines = (props) => {
  return (
    <div className="container">
      <div className="d-flex flex-wrap">
        {props.magazines.map((mag) => (
          <div className="mx-2 my-2" key={mag.index}>
            <div className="card" style={{ width: "18rem" }}>
              <img
                className="card-img-top"
                src={mag.image}
                alt=" img top"
                style={{ maxHeight: "20rem" }}
              />
              <div className="card-body">
                <h5 className="card-title">{mag.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Magazine Edition: {mag.edition}
                </h6>
                <p className="card-text">
                  Price : {mag.price / 1000000000000000000}cUSD
                </p>
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  onClick={() => props.buyMagazine(mag.index)}
                >
                  Buy Now
                </button>
                <button
                  type="button"
                  className="btn btn-outline-dark mt-3"
                  onClick={() => props.unpublishMagazine(mag.index)}
                >
                  unpublish Magazine
                </button>
              </div>
            </div>
          </div>
        ))}
        ;
      </div>
    </div>
  );
};

export default Magazines;
