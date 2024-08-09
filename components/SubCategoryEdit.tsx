"use client"

import React, {FC, useState} from "react";
import {Table} from "flowbite-react";
import toast from "react-hot-toast";
import {formatCategoryName} from "@/utils/categoryFormating";

interface SubCategoryEditProps {
    subCategories: { id: string, name: string }[];
    setSubCategories: (subCategories: { id: string, name: string }[]) => void;
}

const SubCategoryEdit: FC<SubCategoryEditProps> = ({subCategories, setSubCategories}) => {
    const [input, setInput] = useState<string>('')
    const [selectedSubCategory, setSelectedSubCategory] = useState<{ id: string, name: string } | null>(null);

    return (
        <div className="input input-bordered h-auto py-4">
            {subCategories.length ?
                <Table className="-z-10" striped>
                    <Table.Head>
                            <Table.HeadCell>ID</Table.HeadCell>
                            <Table.HeadCell>Name</Table.HeadCell>
                            <Table.HeadCell>Actions</Table.HeadCell>
                    </Table.Head>
                    <Table.Body>
                        {subCategories.map((subCategory, index) => subCategory.name && (
                            <Table.Row key={index}>
                                <Table.Cell align="center">{index + 1}</Table.Cell>
                                <Table.Cell align="center">{formatCategoryName(subCategory.name)}</Table.Cell>
                                <Table.Cell align="center">
                                    <button
                                        className="text-blue-500 hover:text-blue-900 font-bold"
                                        onClick={() => {
                                            setSelectedSubCategory(subCategory);
                                            setInput(subCategory.name);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="ml-5 text-red-500 hover:text-red-700 font-bold"
                                        onClick={() => {
                                            const filteredSubCategories = subCategories.filter((subCat) => subCat.name !== subCategory.name);
                                            if (subCategory.id) {
                                                filteredSubCategories.push({id: subCategory.id, name: ''});
                                            }
                                            setSubCategories(filteredSubCategories);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table> :
                <p className="text-black text-center">No sub categories available</p>}
            <div className="flex gap-5 mt-8">
                <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Enter new sub category"
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value);
                    }}
                />
                <button
                    className="text-white px-8 bg-blue-700 rounded-lg hover:bg-blue-800 disabled:bg-gray-300"
                    onClick={() => {
                        if (selectedSubCategory) {
                            const updatedSubCategories = subCategories.map((subCategory) => {
                                if (subCategory.name === selectedSubCategory.name) {
                                    return {id: selectedSubCategory.id, name: input};
                                }
                                return subCategory;
                            });
                            setSubCategories(updatedSubCategories);
                            setSelectedSubCategory(null);
                            setInput('');
                        }
                        else if (subCategories.some((subCategory) => subCategory.name === input)) {
                            toast.error('Sub category already exists');
                            return;
                        }
                        else {
                            setSubCategories([...subCategories, {id: '', name: input}]);
                            setInput('');
                        }
                    }}
                    disabled={!input}
                >
                    {selectedSubCategory ? 'Update' : 'Add'}
                </button>
                <button
                    className="text-white px-8 bg-red-700 rounded-lg hover:bg-red-800"
                    onClick={() => {
                        setSelectedSubCategory(null);
                        setInput('');
                    }}
                    hidden={!selectedSubCategory}
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default SubCategoryEdit;