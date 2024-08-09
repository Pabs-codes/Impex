"use client";
import { DashboardSidebar } from "@/components";
import axiosInstance from "@/utils/axios-instance";
import {
  convertCategoryNameToURLFriendly as convertSlugToURLFriendly,
  formatCategoryName
} from "@/utils/categoryFormating";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AddNewProduct = () => {
  const [product, setProduct] = useState<{
    title: string;
    price: number;
    manufacturer: string;
    inStock: number;
    mainImage: string;
    description: string;
    slug: string;
    categoryId: string;
    subCategoryID: string;
    imageFile: File | null;
  }>({
    title: "",
    price: 0,
    manufacturer: "",
    inStock: 1,
    mainImage: "",
    description: "",
    slug: "",
    categoryId: "",
    imageFile: null,
    subCategoryID: "",
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentSubCategories, setCurrentSubCategories] = useState<SubCategory[]>([]);

  const addProduct = async () => {
    if (
      product.title === "" ||
      product.manufacturer === "" ||
      product.description == "" ||
      product.slug === "" ||
        product.imageFile === null ||
        product.categoryId === "" ||
        product.price.toString() === "" ||
        product.mainImage === ""
    ) {
      toast.error("Please enter values in input fields");
      return;
    }

    // const requestOptions: any = {
    //   method: "post",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(product),
    // };
    // fetch(`http://localhost:3001/api/products`, requestOptions)
    //   .then((response) => {
    //     if (response.status === 201) {
    //       return response.json();
    //     } else {
    //       throw Error("There was an error while creating product");
    //     }
    //   })
    //   .then((data) => {
    //     toast.success("Product added successfully");
    //     setProduct({
    //       title: "",
    //       price: 0,
    //       manufacturer: "",
    //       inStock: 1,
    //       mainImage: "",
    //       description: "",
    //       slug: "",
    //       categoryId: "",
    //     });
    //   })
    //   .catch((error) => {
    //     toast.error("There was an error while creating product");
    //   });
    await uploadFile(product.imageFile);
    setProduct({ ...product, imageFile: null });
    axiosInstance.post("/products", product)
    .then(() => {
      toast.success("Product added successfully");
      setProduct({
        title: "",
        price: 0,
        manufacturer: "",
        inStock: 1,
        mainImage: "",
        description: "",
        slug: "",
        categoryId: "",
        imageFile: null,
        subCategoryID: "",
      });
    })
    .catch(() => {
      toast.error("There was an error while creating product");
    });
  };

  const uploadFile = async (file:File) => {
    const formData = new FormData();
    formData.append("uploadedFile", file);

    // try {
    //   const response = await // fetch("http://localhost:3001/api/main-image", {
    //     method: "POST",
    //     body: formData,
    //   });

    //   if (response.ok) {
    //     const data = await response.json();
    //   } else {
    //     console.error("File upload unsuccessfull");
    //   }
    // } catch (error) {
    //   console.error("Error happend while sending request:", error);
    // }
    axiosInstance.post("/main-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then(() => {
      console.log("File uploaded successfully");
    })
    .catch(() => {
      console.error("File upload unsuccessfull");
    });
  };

  const fetchCategories = async () => {
    // fetch(`http://localhost:3001/api/categories`)
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((data) => {
    //     setCategories(data);
    //     setProduct({
    //       title: "",
    //       price: 0,
    //       manufacturer: "",
    //       inStock: 1,
    //       mainImage: "",
    //       description: "",
    //       slug: "",
    //       categoryId: data[0]?.id,
    //     });
    //   });
    axiosInstance.get("/categories")
    .then((res) => {
      setCategories(res.data);
      setProduct({
        title: "",
        price: 0,
        manufacturer: "",
        inStock: 1,
        mainImage: "",
        description: "",
        slug: "",
        categoryId: res.data[0]?.id,
        imageFile: null,
        subCategoryID: ""
      });
    })
    .catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (product.categoryId) {
      setCurrentSubCategories(
        categories.find((c) => c.id === product.categoryId)?.subCategories || []
      )
    }
  }, [product.categoryId, categories]);

  return (
    <div className="bg-white flex justify-start max-w-screen-2xl mx-auto xl:h-full max-xl:flex-col max-xl:gap-y-5">
      <DashboardSidebar />
      <div className="flex flex-col gap-y-7 xl:ml-5 max-xl:px-5 w-full">
        <h1 className="text-3xl font-semibold">Add new product</h1>
        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Product name:</span>
            </div>
            <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                value={product?.title}
                onChange={(e) =>
                    setProduct({...product, title: e.target.value})
                }
            />
          </label>
        </div>

        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Product slug:</span>
            </div>
            <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                value={convertSlugToURLFriendly(product?.slug)}
                onChange={(e) =>
                    setProduct({
                      ...product,
                      slug: convertSlugToURLFriendly(e.target.value),
                    })
                }
            />
          </label>
        </div>

        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Category:</span>
            </div>
            <select
                className="select select-bordered"
                value={product?.categoryId}
                onChange={(e) =>
                    setProduct({...product, categoryId: e.target.value})
                }
            >
              {categories &&
                  categories.map((category) => (
                      <option key={category?.id} value={category?.id}>
                        {category?.name}
                      </option>
                  ))}
            </select>
          </label>
        </div>

        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Sub Category:</span>
            </div>
            <select
                className="select select-bordered"
                value={product?.subCategoryID}
                onChange={(e) =>
                    setProduct({...product, subCategoryID: e.target.value})
                }
            >
              <option value="">--- Empty ---</option>
              {currentSubCategories.length &&
                  currentSubCategories.map((category) => (
                      <option key={category?.id} value={category?.id}>
                        {formatCategoryName(category?.name)}
                      </option>
                  ))}
            </select>
          </label>
        </div>

        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Product price:</span>
            </div>
            <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                value={product?.price}
                onChange={(e) =>
                    setProduct({...product, price: Number(e.target.value)})
                }
            />
          </label>
        </div>
        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Manufacturer:</span>
            </div>
            <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                value={product?.manufacturer}
                onChange={(e) =>
                    setProduct({...product, manufacturer: e.target.value})
                }
            />
          </label>
        </div>
        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Is product in stock?</span>
            </div>
            <select
                className="select select-bordered"
                value={product?.inStock}
                onChange={(e) =>
                    setProduct({...product, inStock: Number(e.target.value)})
                }
            >
              <option value={1}>Yes</option>
              <option value={0}>No</option>
            </select>
          </label>
        </div>
        <div>
          <input
              type="file"
              className="file-input file-input-bordered file-input-lg w-full max-w-sm"
              onChange={(e) => {
                // uploadFile(e.target.files[0]);
                setProduct({
                  ...product,
                  mainImage: e.target.files?.[0].name || '',
                  imageFile: e.target.files?.[0] || null
                });
              }}
          />
          {product?.mainImage && (
              <Image
                  src={product.imageFile ? URL.createObjectURL(product.imageFile) : ''}
                  alt={product?.title}
                  className="w-auto h-auto"
                  width={100}
                  height={100}
              />
          )}
        </div>
        <div>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Product description:</span>
            </div>
            <textarea
                className="textarea textarea-bordered h-24"
                value={product?.description}
                onChange={(e) =>
                    setProduct({...product, description: e.target.value})
                }
            ></textarea>
          </label>
        </div>
        <div className="flex gap-x-2">
          <button
              onClick={addProduct}
              type="button"
              className="uppercase bg-blue-500 px-10 py-5 text-lg border border-gray-300 font-bold text-white shadow-sm hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2"
          >
            Add product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewProduct;
