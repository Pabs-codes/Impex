import {prisma} from "../utills/db.js";
import * as fs from "node:fs";

async function createCategory(request, response) {
    try {
        const {name, subCategories} = request.body;
        const image = request.files.image;
        await image.mv(`../public/product categories/${image.name}`, (error) => {
            if (error) {
                console.error("Error uploading image:", error);
                return response.status(500).json({error: "Error uploading image"});
            }
        });

        const subCats = [];
        JSON.parse(subCategories || '[]').forEach(subCategory => {
            subCats.push({name: subCategory.name});
        });

        const category = await prisma.category.create({
            data: {
                name,
                image: {
                    create: {
                        image: image.name
                    },
                },
                subCategories: {
                    createMany: {
                        data: subCats
                    }
                }
            },
        });
        return response.status(201).json(category);
    } catch (error) {
        console.error("Error creating category:", error);
        return response.status(500).json({error: "Error creating category"});
    }
}

async function updateCategory(request, response) {
    try {
        const {id} = request.params;
        const {name, subCategories} = request.body;

        const existingCategory = await prisma.category.findUnique({
            where: {
                id: id,
            },
            include: {
                image: true
            }
        });

        if (!existingCategory) {
            return response.status(404).json({error: "Category not found"});
        }


        const categoryData = {name};
        const image = request?.files?.image;
        if (image) {
            if (existingCategory.image) {
                await prisma.image.delete({
                    where: {
                        imageID: existingCategory.image.imageID
                    }
                });

                fs.unlink(`../public/product categories/${existingCategory.image.image}`, (error) => {
                    if (error) {
                        console.error("Error deleting image:", error);
                        return response.status(500).json({error: "Error deleting image"});
                    }
                });
            }

            await image.mv(`../public/product categories/${image.name}`, (error) => {
                if (error) {
                    console.error("Error uploading image:", error);
                    return response.status(500).json({error: "Error uploading image"});
                }
            });

            categoryData.image = {
                create: {
                    image: image.name
                }
            }
        }

        const subCats = JSON.parse(subCategories || '[]');

        if (subCats.length > 0) {
            for (const sc of subCats) {
                if (!sc.name){
                    await prisma.subCategory.delete({
                        where: {
                            id: sc.id
                        }
                    });
                }
                else{
                    await prisma.subCategory.upsert({
                        where: {
                            id: sc.id
                        },
                        update: {
                            name: sc.name,
                            category:{
                                connect: {
                                    id: id
                                }
                            }
                        },
                        create: {
                            name: sc.name,
                            category: {
                                connect: {
                                    id: id
                                }
                            }
                        }
                    });
                }
            }
        }

        const category = await prisma.category.update({
            where: {
                id,
            },
            data: categoryData,
            include: {
                image: true,
                subCategories: true
            }
        });

        return response.status(200).json(category);

    } catch (error) {
        console.error("Error updating category:", error);
        return response.status(500).json({error: "Error updating category"});
    }
}

async function deleteCategory(request, response) {
    try {
        const {id} = request.params;
        const category = await prisma.category.delete({
            where: {
                id: id,
            },
            include: {
                image: true
            }
        });

        if (category.image) {
            fs.unlink(`../public/product categories/${category.image.image}`, (error) => {
                if (error) {
                    console.error("Error deleting image:", error);
                    return response.status(500).json({error: "Error deleting image"});
                }
            });
        }

        return response.status(204).send();
    } catch (error) {
        console.log(error);
        return response.status(500).json({error: "Error deleting category"});
    }
}

async function getCategory(request, response) {
    const {id} = request.params;
    const category = await prisma.category.findUnique({
        where: {
            id: id,
        },
        include: {
            image: {
                select: {
                    image: true
                }
            },
            subCategories: true
        }
    });
    if (!category) {
        return response.status(404).json({error: "Category not found"});
    }
    return response.status(200).json(category);
}

async function getCategoryByName(request, response) {
    const {name} = request.params;
    const category = await prisma.category.findUnique({
        where: {
            name: name,
        },
        include: {
            image: {
                select: {
                    image: true
                }
            },
            subCategories: true
        }
    });
    if (!category) {
        return response.status(404).json({error: "Category not found"});
    }
    return response.status(200).json(category);
}

async function getAllCategories(request, response) {
    try {
        const categories = await prisma.category.findMany({
            include: {
                image: {
                    select: {
                        image: true
                    }
                },
                subCategories: true
            }
        });
        return response.json(categories);
    } catch (error) {
        return response.status(500).json({error: "Error fetching categories"});
    }
}

export {
    createCategory,
    updateCategory,
    deleteCategory,
    getCategory,
    getAllCategories,
    getCategoryByName,
}
