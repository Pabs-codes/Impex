// // *********************
// // Role of the component: Category wrapper that will contain title and category items
// // Name of the component: CategoryMenu.tsx
// // Developer: Aleksandar Kuzmanovic
// // Version: 1.0
// // Component call: <CategoryMenu />
// // Input parameters: no input parameters
// // Output: section title and category items
// // *********************

// import React from "react";
// import CategoryItem from "./CategoryItem";
// import Image from "next/image";
// import { categoryMenuList } from "@/lib/utils";
// import Heading from "./Heading";

// const CategoryMenu = () => {
//   return (
//     <div className="py-10 bg-gradient-to-l from-[#8ABA40] to-[#27af5e]">
//       <Heading title="BROWSE CATEGORIES" />
//       <div className="max-w-screen-2xl mx-auto py-10 gap-x-5 px-16 max-md:px-10 gap-y-5 grid grid-cols-7 max-lg:grid-cols-3 max-md:grid-cols-2 max-[450px]:grid-cols-1">
//         {categoryMenuList.map((item) => (
//           <CategoryItem title={item.title} key={item.id} href={item.href}>
//             <Image src={item.src} width={128} height={128} alt={item.title} />
//           </CategoryItem>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CategoryMenu;

import React from "react";
import CategoryItem from "./CategoryItem";
import Image from "next/image";
// import { categoryMenuList } from "@/lib/utils";
import Heading from "./Heading";
import axiosInstance from "@/utils/axios-instance";
import {formatCategoryName} from "@/utils/categoryFormating";

interface CategoryMenuProps {
    id: string;
    name: string;
    image?: {
        image?: string;
    },
    href?: string;
}

const CategoryMenu = async () => {
    const categoryMenuList:CategoryMenuProps[] = await axiosInstance.get("/categories")
        .then((response) => response.data)
        .catch((error) => {
            console.log(error);
            return [];
        });

  return (
    <div className="py-10 bg-gradient-to-l from-[#8ABA40] to-[#27af5e] ">
      <Heading title="BROWSE CATEGORIES" />

      {/* Dropdown for mobile screens  */}
      <div className="block sm:hidden px-10 p-10">
        <select className="w-full py-2 px-4 rounded">
          <option value="">Select a category</option>
          {categoryMenuList.map((item) => (
            <option key={item.id} value={item.id || ""}>{formatCategoryName(item.name)}</option>
          ))}
        </select>
      </div>

      {/* Horizontal scroll for mobile screens */} 
      {/* fix the visible line !!!!!!!!!!!!!!!!!!!! */}
      <div className="md:hidden px-10 py-5 overflow-x-auto whitespace-nowrap">
        {categoryMenuList.map((item) => (
          <div key={item.id} className="inline-block mr-4">
              <CategoryItem title={formatCategoryName(item.name)} key={item.id} href={item.href || ""}>
                  <Image src={'/product categories/'+item.image?.image} width={128} height={128} alt={item.name} />
              </CategoryItem>
          </div>
        ))}
      </div>

      {/* Grid for larger screens */}
      <div className="hidden md:grid max-w-screen-2xl mx-auto py-10 gap-x-5 px-16 grid-cols-7 max-md:px-10 gap-y-5 ">
      {/* <div className="max-w-screen-2xl mx-auto py-10 gap-x-5 px-16 max-md:px-10 gap-y-5 grid grid-cols-7"> */}
        {categoryMenuList.map((item) => (
          <CategoryItem title={formatCategoryName(item.name)} key={item.id} href={'/shop/'+item.name}>
            <Image src={'/product categories/'+item.image?.image} width={128} height={128} alt={item.name} />
          </CategoryItem>
        ))}
      </div>
    </div>
  );
};

export default CategoryMenu;
