"use client";
import {DashboardSidebar} from "@/components";
import React, {useState} from "react";
import toast from "react-hot-toast";
import {convertCategoryNameToURLFriendly} from "@/utils/categoryFormating";
import axiosInstance from "@/utils/axios-instance";
import Image from "next/image";
import SubCategoryEdit from "@/components/SubCategoryEdit";

const DashboardNewCategoryPage = () => {
    const [categoryInput, setCategoryInput] = useState({
        name: "",
    });

    const [image, setImage] = useState<File | null>(null);
    const [subCategories, setSubCategories] = useState<{ id: string, name: string }[]>([]);

    const addNewCategory = () => {
        if (categoryInput.name.length > 0 && image) {
            // const requestOptions = {
            //   method: "post",
            //   headers: { "Content-Type": "application/json" },
            //   body: JSON.stringify({
            //     name: convertCategoryNameToURLFriendly(categoryInput.name),
            //   }),
            // };
            // // sending API request for creating new cateogry
            // fetch(`http://localhost:3001/api/categories`, requestOptions)
            //   .then((response) => {
            //     if (response.status === 201) {
            //       return response.json();
            //     } else {
            //       throw Error("There was an error while creating category");
            //     }
            //   })
            //   .then((data) => {
            //     toast.success("Category added successfully");
            //     setCategoryInput({
            //       name: "",
            //     });
            //   })
            //   .catch((error) => {
            //     toast.error("There was an error while creating category");
            //   });
            const subCatsStr = JSON.stringify(subCategories.map((subCategory) => ({
                id: '',
                name: convertCategoryNameToURLFriendly(subCategory.name)
            })) || []);
            const formData = new FormData();
            formData.append("name", convertCategoryNameToURLFriendly(categoryInput.name));
            formData.append("image", image!);
            formData.append("subCategories", subCatsStr);
            axiosInstance.post("/categories", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                .then(() => {
                    toast.success("Category added successfully");
                    setCategoryInput({
                        name: "",
                    });
                    setSubCategories([]);
                    setImage(null);
                })
                .catch(() => {
                    toast.error("There was an error while creating category");
                });
        } else {
            toast.error("You need to enter all values to add a category");
        }
    };
    return (
        <div className="bg-white flex justify-start max-w-screen-2xl mx-auto xl:h-full max-xl:flex-col max-xl:gap-y-5">
            <DashboardSidebar/>
            <div className="flex flex-col gap-y-7 xl:pl-5 max-xl:px-5 w-full">
                <h1 className="text-3xl font-semibold">Add new category</h1>
                <div className="grid grid-cols-2 gap-10">
                    <div className="form-control">
                        <div className="label">
                            <span className="label-text">Category name:</span>
                        </div>
                        <input
                            type="text"
                            className="input input-bordered"
                            value={categoryInput.name}
                            onChange={(e) =>
                                setCategoryInput({...categoryInput, name: e.target.value})
                            }
                        />
                        <div className="label mt-3">
                            <span className="label-text">Category image:</span>
                        </div>
                        <div className="input input-bordered h-auto py-4">
                            <Image
                                src={image ? URL.createObjectURL(image) : ''}
                                className="object-cover border-2 border-gray-300 rounded-lg mb-3 bg-gray-300"
                                width={160}
                                height={160}
                                alt={''}
                            />
                            <input
                                type="file"
                                onChange={(e) => setImage(e.target.files![0])}
                            />
                        </div>

                    </div>
                    <div>
                        <div className="label">
                            <span className="label-text">Sub Categories:</span>
                        </div>
                        <SubCategoryEdit subCategories={subCategories} setSubCategories={setSubCategories}/>
                    </div>
                </div>

                <div className="flex gap-x-2">
                    <button
                        type="button"
                        className="uppercase bg-blue-500 px-10 py-5 text-lg border border-gray-300 font-bold text-white shadow-sm hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2"
                        onClick={addNewCategory}
                    >
                        Create category
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashboardNewCategoryPage;
