// *********************
// Role of the component: Filters on shop page
// Name of the component: Filters.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <Filters />
// Input parameters: no input parameters
// Output: stock, rating and price filter
// *********************

"use client";
import React, {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import {useRouter} from "next/navigation";
import {useSortStore} from "@/app/_zustand/sortStore";
import {usePaginationStore} from "@/app/_zustand/paginationStore";
import {convertCategoryNameToURLFriendly, formatCategoryName} from "@/utils/categoryFormating";
import axiosInstance from "@/utils/axios-instance";

interface InputCategory {
    inStock: { text: string, isChecked: boolean };
    outOfStock: { text: string, isChecked: boolean };
    priceFilter: { text: string, value: number };
    ratingFilter: { text: string, value: number };
    subCategories: { text: string, isChecked: boolean }[];
}

interface Category{
    id: string;
    name: string;
    subCategories: {id: string, name: string}[];
}

const Filters = () => {
    const pathname = usePathname();
    const {replace} = useRouter();

    // Extract current category from the URL slug
    const currentCategory = pathname.split("/shop/").pop() || 'default';
    const [subCategories, setSubCategories] = useState<{id:string,name:string}[]>([]);

    const {page} = usePaginationStore();
    const [inputCategory, setInputCategory] = useState<InputCategory>({
        inStock: {text: "instock", isChecked: true},
        outOfStock: {text: "outofstock", isChecked: true},
        priceFilter: {text: "price", value: 3000},
        ratingFilter: {text: "rating", value: 0},
        subCategories: subCategories.map((subCategory) => ({
            text: subCategory?.name,
            isChecked: false,
        })),
    });

    const {sortBy} = useSortStore();

    useEffect(() => {
        const fetchSubCategories = async () => {
            const response = await axiosInstance.get<Category>(`/categories/name/${currentCategory}`);
            setSubCategories(response.data.subCategories);
            setInputCategory(
                {
                    ...inputCategory,
                    subCategories: response.data.subCategories.map((subCategory) => ({
                        text: formatCategoryName(subCategory?.name || ''),
                        isChecked: false,
                    })),
                }
            )
        };
        fetchSubCategories()
    }, []);

    useEffect(() => {
        const params = new URLSearchParams();
        params.set("outOfStock", inputCategory.outOfStock.isChecked.toString());
        params.set("inStock", inputCategory.inStock.isChecked.toString());
        params.set("rating", inputCategory.ratingFilter.value.toString());
        params.set("price", inputCategory.priceFilter.value.toString());
        params.set("sort", sortBy);
        params.set("page", page.toString());
        // Add selected subcategories to params
        inputCategory.subCategories.forEach((subCategory) => {
            if (subCategory.isChecked) {
                params.append("subCategories", convertCategoryNameToURLFriendly(subCategory.text));
            }
        });
        replace(`${pathname}?${params}`);
    }, [inputCategory, sortBy, page]);

    const handleSubCategoryChange = (index: number) => {
        const newSubCategories = [...inputCategory.subCategories];
        newSubCategories[index].isChecked = !newSubCategories[index].isChecked;
        setInputCategory({
            ...inputCategory,
            subCategories: newSubCategories,
        });
    };

    return (
        <div>
            <h3 className="text-2xl mb-2">Filters</h3>
            <div className="divider"></div>
            <div className="flex flex-col gap-y-1">
                {inputCategory.subCategories.length !== 0 &&
                    <>
                        <h3 className="text-xl mb-2">Sub Categories</h3>
                        {inputCategory.subCategories.map((subCategory, index) => (
                            <div key={index} className="form-control">
                                <label className="cursor-pointer flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={subCategory.isChecked}
                                        onChange={() => handleSubCategoryChange(index)}
                                        className="checkbox"
                                    />
                                    <span className="label-text text-lg ml-2 text-black">
                                    {subCategory.text}
                                </span>
                                </label>
                            </div>
                        ))}

                        <div className="divider"></div>
                    </>
                }

                <h3 className="text-xl mb-2">Availability</h3>
                <div className="form-control">
                    <label className="cursor-pointer flex items-center">
                        <input
                            type="checkbox"
                            checked={inputCategory.inStock.isChecked}
                            onChange={() =>
                                setInputCategory({
                                    ...inputCategory,
                                    inStock: {
                                        text: "instock",
                                        isChecked: !inputCategory.inStock.isChecked,
                                    },
                                })
                            }
                            className="checkbox"
                        />
                        <span className="label-text text-lg ml-2 text-black">In stock</span>
                    </label>
                </div>

                <div className="form-control">
                    <label className="cursor-pointer flex items-center">
                        <input
                            type="checkbox"
                            checked={inputCategory.outOfStock.isChecked}
                            onChange={() =>
                                setInputCategory({
                                    ...inputCategory,
                                    outOfStock: {
                                        text: "outofstock",
                                        isChecked: !inputCategory.outOfStock.isChecked,
                                    },
                                })
                            }
                            className="checkbox"
                        />
                        <span className="label-text text-lg ml-2 text-black">
              Out of stock
            </span>
                    </label>
                </div>
            </div>

            <div className="divider"></div>
            <div className="flex flex-col gap-y-1">
                <h3 className="text-xl mb-2">Price</h3>
                <div>
                    <input
                        type="range"
                        min={0}
                        max={3000}
                        step={10}
                        value={inputCategory.priceFilter.value}
                        className="range"
                        onChange={(e) =>
                            setInputCategory({
                                ...inputCategory,
                                priceFilter: {
                                    text: "price",
                                    value: Number(e.target.value),
                                },
                            })
                        }
                    />
                    <span>{`Max price: $${inputCategory.priceFilter.value}`}</span>
                </div>
            </div>

            <div className="divider"></div>

            <div>
                <h3 className="text-xl mb-2">Minimum Rating:</h3>
                <input
                    type="range"
                    min={0}
                    max="5"
                    value={inputCategory.ratingFilter.value}
                    onChange={(e) =>
                        setInputCategory({
                            ...inputCategory,
                            ratingFilter: {text: "rating", value: Number(e.target.value)},
                        })
                    }
                    className="range range-info"
                    step="1"
                />
                <div className="w-full flex justify-between text-xs px-2">
                    <span>0</span>
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                </div>
            </div>
        </div>
    );
};

export default Filters;
