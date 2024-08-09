"use client";
import { SectionTitle } from "@/components";
import { useProductStore } from "../_zustand/store";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { isValidCardNumber, isValidCreditCardCVVOrCVC, isValidCreditCardExpirationDate, isValidEmailAddressFormat, isValidNameOrLastname } from "@/lib/utils";
import axiosInstance from "@/utils/axios-instance";

const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [checkoutForm, setCheckoutForm] = useState({
    name: "",
    lastname: "",
    phone: "",
    email: "",
    cardName: "",
    cardNumber: "",
    expirationDate: "",
    cvc: "",
    company: "",
    adress: "",
    apartment: "",
    city: "",
    country: "",
    postalCode: "",
    orderNotice: "",
    bankAccountNumber: "",
    bankName: "",
    paypalEmail: "",
  });
  const { products, total, clearCart } = useProductStore();
  const router = useRouter();

  const makePurchase = async () => {
    if (
      checkoutForm.name.length > 0 &&
      checkoutForm.lastname.length > 0 &&
      checkoutForm.phone.length > 0 &&
      checkoutForm.email.length > 0 &&
      checkoutForm.company.length > 0 &&
      checkoutForm.adress.length > 0 &&
      checkoutForm.apartment.length > 0 &&
      checkoutForm.city.length > 0 &&
      checkoutForm.country.length > 0 &&
      checkoutForm.postalCode.length > 0
    ) {
      if (!isValidNameOrLastname(checkoutForm.name)) {
        toast.error("You entered invalid format for name");
        return;
      }

      if (!isValidNameOrLastname(checkoutForm.lastname)) {
        toast.error("You entered invalid format for lastname");
        return;
      }

      if (!isValidEmailAddressFormat(checkoutForm.email)) {
        toast.error("You entered invalid format for email address");
        return;
      }

      if (paymentMethod === "card") {
        if (!isValidNameOrLastname(checkoutForm.cardName)) {
          toast.error("You entered invalid format for card name");
          return;
        }

        if (!isValidCardNumber(checkoutForm.cardNumber)) {
          toast.error("You entered invalid format for credit card number");
          return;
        }

        if (!isValidCreditCardExpirationDate(checkoutForm.expirationDate)) {
          toast.error(
            "You entered invalid format for credit card expiration date"
          );
          return;
        }

        if (!isValidCreditCardCVVOrCVC(checkoutForm.cvc)) {
          toast.error("You entered invalid format for credit card CVC or CVV");
          return;
        }
      }

      axiosInstance.post("/orders", {
        name: checkoutForm.name,
        lastname: checkoutForm.lastname,
        phone: checkoutForm.phone,
        email: checkoutForm.email,
        company: checkoutForm.company,
        adress: checkoutForm.adress,
        apartment: checkoutForm.apartment,
        postalCode: checkoutForm.postalCode,
        status: "processing",
        total: total,
        city: checkoutForm.city,
        country: checkoutForm.country,
        orderNotice: checkoutForm.orderNotice,
        paymentMethod: paymentMethod,
      })
      .then((res) => {
        const orderId: string = res.data.id;
        for (let i = 0; i < products.length; i++) {
          let productId: string = products[i].id;
          addOrderProduct(orderId, productId, products[i].amount);
        }
      })
      .then(() => {
        setCheckoutForm({
          name: "",
          lastname: "",
          phone: "",
          email: "",
          cardName: "",
          cardNumber: "",
          expirationDate: "",
          cvc: "",
          company: "",
          adress: "",
          apartment: "",
          city: "",
          country: "",
          postalCode: "",
          orderNotice: "",
          bankAccountNumber: "",
          bankName: "",
          paypalEmail: "",
        });
        clearCart();
        toast.success("Order created successfully");
        setTimeout(() => {
          router.push("/");
        }, 1000);
      })
      .catch(() => {
        toast.error("There was an error while creating order");
      });
    } else {
      toast.error("You need to enter values in the required input fields");
    }
  };

  const addOrderProduct = async (
    orderId: string,
    productId: string,
    productQuantity: number
  ) => {
    axiosInstance.post("/order-product", {
      customerOrderId: orderId,
      productId: productId,
      quantity: productQuantity,
    })
    .then(() => {
      toast.success("Order product added successfully");
    })
    .catch(() => {
      toast.error("There was an error while adding order product");
    });
  };

  useEffect(() => {
    if (products.length === 0) {
      toast.error("You don't have items in your cart");
      router.push("/cart");
    }
  }, []);

  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case "card":
        return (
          <div className="mt-6 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4">
            <div className="col-span-3 sm:col-span-4">
              <label htmlFor="name-on-card" className="block text-sm font-medium text-gray-700">
                Name on card
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="name-on-card"
                  name="name-on-card"
                  autoComplete="cc-name"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={checkoutForm.cardName}
                  onChange={(e) =>
                    setCheckoutForm({
                      ...checkoutForm,
                      cardName: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="col-span-3 sm:col-span-4">
              <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                Card number
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="card-number"
                  name="card-number"
                  autoComplete="cc-number"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={checkoutForm.cardNumber}
                  onChange={(e) =>
                    setCheckoutForm({
                      ...checkoutForm,
                      cardNumber: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="col-span-2 sm:col-span-3">
              <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700">
                Expiration date (MM/YY)
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="expiration-date"
                  id="expiration-date"
                  autoComplete="cc-exp"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={checkoutForm.expirationDate}
                  onChange={(e) =>
                    setCheckoutForm({
                      ...checkoutForm,
                      expirationDate: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div>
              <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
                CVC or CVV
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="cvc"
                  id="cvc"
                  autoComplete="csc"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={checkoutForm.cvc}
                  onChange={(e) =>
                    setCheckoutForm({
                      ...checkoutForm,
                      cvc: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
        );
      case "bank":
        return (
          <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
            <div>
              <label htmlFor="bank-name" className="block text-sm font-medium text-gray-700">
                Bank Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="bank-name"
                  name="bank-name"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={checkoutForm.bankName}
                  onChange={(e) =>
                    setCheckoutForm({
                      ...checkoutForm,
                      bankName: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div>
              <label htmlFor="account-number" className="block text-sm font-medium text-gray-700">
                Account Number
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="account-number"
                  name="account-number"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={checkoutForm.bankAccountNumber}
                  onChange={(e) =>
                    setCheckoutForm({
                      ...checkoutForm,
                      bankAccountNumber: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
        );
      case "cod":
        return (
          <div className="mt-6">
            <p className="text-sm text-gray-500">
              You will pay for your order upon delivery. Please have the exact amount ready.
            </p>
          </div>
        );
      case "paypal":
        return (
          <div className="mt-6">
            <label htmlFor="paypal-email" className="block text-sm font-medium text-gray-700">
              PayPal Email
            </label>
            <div className="mt-1">
              <input
                type="email"
                id="paypal-email"
                name="paypal-email"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={checkoutForm.paypalEmail}
                onChange={(e) =>
                  setCheckoutForm({
                    ...checkoutForm,
                    paypalEmail: e.target.value,
                  })
                }
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white">
      <SectionTitle title="Checkout" path="Home | Cart | Checkout" />
      <div className="hidden h-full w-1/2 bg-white lg:block" aria-hidden="true" />
      <div className="hidden h-full w-1/2 bg-gray-50 lg:block" aria-hidden="true" />

      <main className="relative mx-auto grid max-w-screen-2xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 xl:gap-x-48">
        <h1 className="sr-only">Order information</h1>

        <section aria-labelledby="summary-heading" className="bg-gray-50 px-4 pb-10 pt-16 sm:px-6 lg:col-start-2 lg:row-start-1 lg:bg-transparent lg:px-0 lg:pb-16">
          {/* Order summary section (unchanged) */}
        </section>

        <form className="px-4 pt-16 sm:px-6 lg:col-start-1 lg:row-start-1 lg:px-0">
          <div className="mx-auto max-w-lg lg:max-w-none">
            <section aria-labelledby="contact-info-heading">
              <h2 id="contact-info-heading" className="text-lg font-medium text-gray-900">
                Contact information
              </h2>
              {/* Contact information fields (unchanged) */}
            </section>

            <section aria-labelledby="payment-heading" className="mt-10">
              <h2 id="payment-heading" className="text-lg font-medium text-gray-900">
                Payment details
              </h2>

              <div className="mt-6">
                <div className="flex space-x-4">
                  {["card", "bank", "cod", "paypal"].map((method) => (
                    <button
                      key={method}
                      type="button"
                      className={`px-4 py-2 text-sm font-medium rounded-md ${
                        paymentMethod === method
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                      onClick={() => setPaymentMethod(method)}
                    >
                      {method === "card" && "Card Payment"}
                      {method === "bank" && "Bank Transfer"}
                      {method === "cod" && "Cash on Delivery"}
                      {method === "paypal" && "PayPal"}
                    </button>
                  ))}
                </div>
              </div>

              {renderPaymentForm()}
            </section>

            <section aria-labelledby="shipping-heading" className="mt-10">
  <h2 id="shipping-heading" className="text-lg font-medium text-gray-900">
    Shipping address
  </h2>

  <div className="mt-6">
    <label htmlFor="company-input" className="block text-sm font-medium text-gray-700">
      Company (Optional)
    </label>
    <div className="mt-1">
      <input
        value={checkoutForm.company}
        onChange={(e) => setCheckoutForm({ ...checkoutForm, company: e.target.value })}
        type="text"
        id="company-input"
        name="company-input"
        autoComplete="organization"
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
      />
    </div>
  </div>

  <div className="mt-6">
    <label htmlFor="address-input" className="block text-sm font-medium text-gray-700">
      Address
    </label>
    <div className="mt-1">
      <input
                value={checkoutForm.address}
                onChange={(e) => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
                type="text"
                id="address-input"
                name="address-input"
                autoComplete="street-address"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
        
          <div className="mt-6">
            <label htmlFor="apartment-input" className="block text-sm font-medium text-gray-700">
              Apartment, suite, etc. (Optional)
            </label>
            <div className="mt-1">
              <input
                value={checkoutForm.apartment}
                onChange={(e) => setCheckoutForm({ ...checkoutForm, apartment: e.target.value })}
                type="text"
                id="apartment-input"
                name="apartment-input"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
        
          <div className="mt-6">
            <label htmlFor="city-input" className="block text-sm font-medium text-gray-700">
              City
            </label>
            <div className="mt-1">
              <input
                value={checkoutForm.city}
                onChange={(e) => setCheckoutForm({ ...checkoutForm, city: e.target.value })}
                type="text"
                id="city-input"
                name="city-input"
                autoComplete="address-level2"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
        
          <div className="mt-6">
            <label htmlFor="state-input" className="block text-sm font-medium text-gray-700">
              State / Province
            </label>
            <div className="mt-1">
              <input
                value={checkoutForm.state}
                onChange={(e) => setCheckoutForm({ ...checkoutForm, state: e.target.value })}
                type="text"
                id="state-input"
                name="state-input"
                autoComplete="address-level1"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
        
          <div className="mt-6">
            <label htmlFor="postal-code-input" className="block text-sm font-medium text-gray-700">
              Postal code
            </label>
            <div className="mt-1">
              <input
                value={checkoutForm.postalCode}
                onChange={(e) => setCheckoutForm({ ...checkoutForm, postalCode: e.target.value })}
                type="text"
                id="postal-code-input"
                name="postal-code-input"
                autoComplete="postal-code"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
        
          <div className="mt-6">
            <label htmlFor="country-input" className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <div className="mt-1">
              <select
                value={checkoutForm.country}
                onChange={(e) => setCheckoutForm({ ...checkoutForm, country: e.target.value })}
                id="country-input"
                name="country-input"
                autoComplete="country"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="">Select a country</option>
                <option value="USA">United States</option>
                <option value="CAN">Canada</option>
                <option value="UK">United Kingdom</option>
             
              </select>
            </div>
          </div>
        </section>
        


            <div className="mt-10 border-t border-gray-200 pt-6 ml-0">
              <button
                type="button"
                onClick={makePurchase}
                className="w-full rounded-md border border-transparent bg-blue-500 px-20 py-2 text-lg font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-gray-50 sm:order-last"
              >
                Place Order
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CheckoutPage;