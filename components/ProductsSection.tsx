// *********************
// Role of the component: products section intended to be on the home page
// Name of the component: ProductsSection.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <ProductsSection slug={slug} />
// Input parameters: no input parameters
// Output: products grid
// *********************

import React from "react";
import ProductItem from "./ProductItem";
import Heading from "./Heading";
import axiosInstance from "@/utils/axios-instance";

const ProductsSection = async () => {
  // sending API request for getting all products
  // const data = await // fetch("http://localhost:3001/api/products");
  // const products = await data.json();

  const products = await axiosInstance.get("/products")
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });


  return (
    <div className="bg-green-500 border-t-4 border-white">
      <div className="max-w-screen-2xl mx-auto pt-20">
        <Heading title="FEATURED PRODUCTS" />
        <div className="grid grid-cols-4 justify-items-center max-w-screen-2xl mx-auto py-10 gap-x-4 px-10 gap-y-16 max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
          {products?.length && products.map((product: Product) => (
            <ProductItem key={product.id} product={product} color="white" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsSection;
