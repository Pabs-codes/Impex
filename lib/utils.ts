export const categoryMenuList = [
  {
    id: 1,
    title: "Indu Sri",
    src: "/product categories/indusri.png",
    href: "/shop/smart-phones",
    subCategories: [
      { id:1, title:"adsd" },
      { id:2, title:"abjf" }
    ]
  },
  {
    id: 2,
    title: "Araliya",
    src: "/product categories/araliya.png",
    href: "/shop/tablets",
    subCategories: [
      { id:1, title:"adsd" }
    ]
  },
  {
    id: 3,
    title: "MD",
    src: "/product categories/md.png",
    href: "/shop/mouses",
    subCategories: [
      { id:1, title:"adsd" },
      { id:2, title:"abjf" },
      { id:2, title:"dvcd" }
    ]
  },
  {
    id: 4,
    title: "Maliban",
    src: "/product categories/maliban.png",
    href: "/shop/cameras"
  },
  {
    id: 5,
    title: "Larich",
    src: "/product categories/larich.png",
    href: "/shop/watches"
  },
  {
    id: 6,
    title: "Ceylon Fish",
    src: "/product categories/ceylonfish.png",
    href: "/shop/laptops"
  },
  {
    id: 7,
    title: "Dry Food Range",
    src: "/product categories/dryfood.png",
    href: "/shop/computers"
  },
  {
    id: 8,
    title: "ElephantHouse",
    src: "/product categories/elephanthouse.png",
    href: "/shop/printers"
  },
  {
    id: 9,
    title: "Lion Beer & Raga",
    src: "/product categories/lionbeer&raga.png",
    href: "/shop/earbuds"
  },
  {
    id: 10,
    title: "Ceylon Arrack & KingFisher",
    src: "/product categories/ceylonarrack&kingfisher.png",
    href: "/shop/headphones"
  },
  {
    id: 11,
    title: "Health Care",
    src: "/product categories/healthcare.png",
    href: "/shop/headphones"
  },
  {
    id: 12,
    title: "Amritha ",
    src: "/product categories/amritha.png",
    href: "/shop/headphones"
  },
  {
    id: 13,
    title: "Rice",
    src: "/product categories/rice.png",
    href: "/shop/headphones"
  },
  {
    id: 13,
    title: "Rice",
    src: "/product categories/rice.png",
    href: "/shop/headphones"
  },
];

export const incentives = [
  {
    name: "Free Shipping",
    description:
      "Our shipping is completely free and that is completely good for our customers.",
    imageSrc: "/shipping icon.png",
  },
  {
    name: "24/7 Customer Support",
    description:
      "Our support is working all day and night to answer any question you have.",
    imageSrc: "/support icon.png",
  },
  {
    name: "Fast Shopping Cart",
    description:
      "We have super fast shopping experience and you will enjoy it.",
    imageSrc: "/fast shopping icon.png",
  },
];

export const navigation = {
  sale: [
    { name: "Discounts", href: "#" },
    { name: "News", href: "#" },
    { name: "Register Discounts", href: "#" },
  ],
  about: [
    { name: "About Super Supply", href: "#" },
    { name: "Work With Us", href: "#" },
    { name: "Company Profile", href: "#" },
  ],
  buy: [
    { name: "Super Supply Loyalty Card", href: "#" },
    { name: "Terms Of Use", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Complaints", href: "#" },
    { name: "Partners", href: "#" },
  ],
  help: [
    { name: "Contact", href: "#" },
    { name: "How to Buy at Super Supply", href: "#" },
    { name: "FAQ", href: "#" },
  ],
};

export const isValidNameOrLastname = (input: string) => {
  // Simple name or lastname regex format check
  const regex = /^[a-zA-Z\s]+$/;
  return regex.test(input);
};

export const isValidEmailAddressFormat = (input: string) => {
  // simple email address format check
  const regex = /^\S+@\S+\.\S+$/;
  return regex.test(input);
};

export const isValidCardNumber = (input: string) => {
  // Remove all non-digit characters
  const cleanedInput = input.replace(/[^0-9]/g, "");
  // test for credit card number between 13 and 19 characters
  const regex = /^\d{13,19}$/;
  return regex.test(cleanedInput);
}

export const isValidCreditCardExpirationDate = (input: string) => {
  // simple expiration date format check
  const regex = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
  return regex.test(input);
};

export const isValidCreditCardCVVOrCVC = (input: string) => {
  // simple CVV or CVC format check
  const regex = /^[0-9]{3,4}$/;
  return regex.test(input);
};
