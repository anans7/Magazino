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
      <div class="form-row">
        <input
          type="text"
          class="form-control"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image"
        />

        <input
          type="text"
          class="form-control mt-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />

        <input
          type="text"
          class="form-control mt-2"
          value={edition}
          onChange={(e) => setEdition(e.target.value)}
          placeholder="Edition"
        />

        <input
          type="text"
          class="form-control mt-2"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="price"
        />

        <button type="submit" class="btn btn-outline-dark">
          Add Magazine
        </button>
      </div>
    </form>
  );
};
export default NewMagazine;
