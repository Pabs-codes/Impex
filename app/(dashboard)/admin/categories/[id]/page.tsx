"use client";
import { DashboardSidebar } from "@/components";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { formatCategoryName } from "@/utils/categoryFormating";
import { convertCategoryNameToURLFriendly } from "@/utils/categoryFormating";
import axiosInstance from "@/utils/axios-instance";
import Image from "next/image";
import SubCategoryEdit from "@/components/SubCategoryEdit";

interface DashboardSingleCategoryProps {
  params: { id: number };
}

const DashboardSingleCategory = ({
  params: { id },
}: DashboardSingleCategoryProps) => {
  const [categoryInput, setCategoryInput] = useState({
    name: "",
    image: "",
  });
  const router = useRouter();

  const [image, setImage] = useState<File | null>(null);
  const [subCategories, setSubCategories] = useState<{ id: string; name: string }[]>([]);

  const deleteCategory = async () => {
    // const requestOptions = {
    //   method: "DELETE",
    // };
    // sending API request for deleting a category
    // fetch(`http://localhost:3001/api/categories/${id}`, requestOptions)
    //   .then((response) => {
    //     if (response.status === 204) {
    //       toast.success("Category deleted successfully");
    //       router.push("/admin/categories");
    //     } else {
    //       throw Error("There was an error deleting a category");
    //     }
    //   })
    //   .catch((error) => {
    //     toast.error("There was an error deleting category");
    //   });
    axiosInstance.delete(`/categories/${id}`)
    .then(() => {
      toast.success("Category deleted successfully");
      router.push("/admin/categories");
    })
    .catch((err) => {
      toast.error("There was an error deleting category"+err);
    });
  };

  const updateCategory = async () => {
    if (categoryInput.name.length > 0 && (image || categoryInput.image)) {
      // const requestOptions = {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     name: convertCategoryNameToURLFriendly(categoryInput.name),
      //   }),
      // };
      // // sending API request for updating a category
      // fetch(`http://localhost:3001/api/categories/${id}`, requestOptions)
      //   .then((response) => {
      //     if (response.status === 200) {
      //       return response.json();
      //     } else {
      //       throw Error("Error updating a category");
      //     }
      //   })
      //   .then((data) => toast.success("Category successfully updated"))
      //   .catch((error) => {
      //     toast.error("There was an error while updating a category");
      //   });
      const subCatsStr = JSON.stringify(subCategories.map((subCategory) => ({
        id: subCategory.id || '',
        name: convertCategoryNameToURLFriendly(subCategory.name)
      })) || []);
      const formData = new FormData();
        formData.append("image", image!);
        formData.append("name", convertCategoryNameToURLFriendly(categoryInput.name));
        formData.append("subCategories", subCatsStr);
      axiosInstance.put(`/categories/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        toast.success("Category successfully updated");
      })
      .catch(() => {
        toast.error("There was an error while updating a category");
      });
    } else {
      toast.error("For updating a category you must enter all values");
      return;
    }
  };

  useEffect(() => {
    // sending API request for getting single categroy
    // fetch(`http://localhost:3001/api/categories/${id}`)
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((data) => {
    //     setCategoryInput({
    //       name: data?.name,
    //     });
    //   });
    axiosInstance.get(`/categories/${id}`)
    .then((res) => {
      setCategoryInput({
        name: res.data?.name,
        image: res.data?.image?.image,
      });

      setSubCategories(res.data?.subCategories || []);
    })
    .catch((err) => {
      toast.error("There was an error while fetching category"+err);
    });
  }, [id]);

  return (
    <div className="bg-white flex justify-start max-w-screen-2xl mx-auto xl:h-full max-xl:flex-col max-xl:gap-y-5">
      <DashboardSidebar />
      <div className="flex flex-col gap-y-7 xl:pl-5 max-xl:px-5 w-full">
        <h1 className="text-3xl font-semibold">Category details</h1>
        <div className="grid grid-cols-2 gap-8">
          <div className="form-control w-full max-w-lg">
            <div className="label">
              <span className="label-text">Category name:</span>
            </div>
            <input
                type="text"
                className="input input-bordered w-full"
                value={formatCategoryName(categoryInput.name)}
                onChange={(e) =>
                    setCategoryInput({...categoryInput, name: e.target.value})
                }
            />
            <div className="label">
              <span className="label-text w-full">Category image:</span>
            </div>
            <div className="input input-bordered h-auto py-4">
              <Image
                  src={image ? URL.createObjectURL(image) : '/product categories/' + categoryInput.image}
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
              <span className="label-text w-full">Sub Categories:</span>
            </div>
            <SubCategoryEdit subCategories={subCategories} setSubCategories={setSubCategories}/>
          </div>
        </div>

        <div className="flex gap-x-2 max-sm:flex-col">
          <button
              type="button"
              className="uppercase bg-blue-500 px-10 py-5 text-lg border border-gray-300 font-bold text-white shadow-sm hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2"
            onClick={updateCategory}
          >
            Update category
          </button>
          <button
            type="button"
            className="uppercase bg-red-600 px-10 py-5 text-lg border border-gray-300 font-bold text-white shadow-sm hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2"
            onClick={deleteCategory}
          >
            Delete category
          </button>
        </div>
        <p className="text-xl text-error max-sm:text-lg">
          Note: if you delete this category, you will delete all products
          associated with the category.
        </p>
      </div>
    </div>
  );
};

export default DashboardSingleCategory;
