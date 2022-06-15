import React from "react";

const Magazines = (props) => {
  return (
    <div className="container">
      <div className="row">
        {props.magazines.map((mag) => (
          <div className="col-3">
            <div class="card" key={mag.index}>
              <div class="card-img">
                <img class="img-fluid" src={mag.image} alt=" img top" />
              </div>

              <div class="card-section"> magazine Name : {mag.name}</div>
              <div class="card-section">
                <h3> Magazine Edition: {mag.edition}</h3>
              </div>

              <div class="card-bottom">
                <h3> Price : {mag.price / 1000000000000000000}cUSD</h3>
              </div>
            </div>

            <div>
              <button
                type="button"
                class="btn btn-outline-dark"
                onClick={() => props.buyMagazine(mag.index)}
              >
                Buy Now
              </button>

              <button
                type="button"
                class="btn btn-outline-dark"
                onClick={() => props.unpublishMagazine(mag.index)}
              >
                unpublish Magazine
              </button>
            </div>
          </div>
        ))}
        ;
      </div>
    </div>
  );
};

export default Magazines;
