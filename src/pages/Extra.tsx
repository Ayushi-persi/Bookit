import React from 'react';
import axios from 'axios';

const Extra = () => {
  const getData = async () => {
    // const productData = await axios.get("https://dummyjson.com/products");
    const productData = await axios.get(
      'https://shopit-products.onrender.com/products',
    );
    console.log(productData.data);
  };
  const getOneData = async (id: number) => {
    // const productData = await axios.get(`https://dummyjson.com/products/${id}`);
    const productData = await axios.get(
      `https://shopit-products.onrender.com/products/${id}`,
    );
    console.log(productData.data);
  };
  const searchData = async (query: string) => {
    const productData = await axios.get(
      `https://shopit-products.onrender.com/products/search?q=${query}`,
    );
    console.log(productData.data.products);
  };
  const updateData = async () => {
    const productData = await axios.post(
      'https://shopit-products.onrender.com/products',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image:
            'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQcBxGDYo-0SAc6Rv0yYYla3f9EmBPlQWI0MMkiJR4JGhPBsbmtiLt9RKtrNPFJOY6sCfcc9PPVIbxRrbLyaa9d21jMNlSQX_pWlqZpNN2SMf7l0umnIrcXKABA1sGJ&usqp=CAE',
          price: '1499',
          brand: 'Adidas',
          discount: '12',
          title: 'New',
          gender: 'Men',
          id: 12,
        }),
      },
    );
    console.log(productData.data);
  };
  const deleteData = async (id: number) => {
    const productData = await axios.delete(
      `https://shopit-products.onrender.com/products/${id}`,
    );
    console.log(productData.data);
  };
  return (
    <div>
      <button onClick={getData}>Get Data</button>
      <button onClick={() => getOneData(2)}>Get One Data</button>
      <button onClick={() => searchData('new')}>Search Data</button>
      <button onClick={updateData}>Update Data</button>
      <button onClick={() => deleteData(12)}>Delete Data</button>
    </div>
  );
};

export default Extra;
