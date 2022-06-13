import React from "react";

import { useState } from "react";

const NewMagazine = (props) => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [edition, setEdition] = useState("");
  const [price, setPrice] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    if (!image || !name || !edition || !price) {
      alert("Please fill up the form");
      return;
    }
    props.addMagazine(image, name, edition, price);

    setImage("");
    setName("");
    setEdition("");
    setPrice("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="form-row container mb-3">
        <h3 className="fs-2 text-center">Add a magazine</h3>
        <input
          type="text"
          className="form-control"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image"
        />

        <input
          type="text"
          className="form-control mt-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />

        <input
          type="text"
          className="form-control mt-2"
          value={edition}
          onChange={(e) => setEdition(e.target.value)}
          placeholder="Edition"
        />

        <input
          type="text"
          className="form-control mt-2"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="price"
        />
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-outline-dark mt-3">
            Add Magazine
          </button>
        </div>
      </div>
    </form>
  );
};
export default NewMagazine;
