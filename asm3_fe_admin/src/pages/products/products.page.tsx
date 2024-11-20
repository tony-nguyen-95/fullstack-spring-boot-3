import React, { useEffect } from "react";
import {
  Pagination,
  ProductFilter,
  ProductForm,
  Sidebar,
} from "../../component";
import { observer } from "mobx-react";
import {
  productStore,
  IFormProduct,
  productFormStore,
  authStore,
} from "../../stores";
import { useNavigate } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faMultiply } from "@fortawesome/free-solid-svg-icons";
import { Loading } from "../../component/loading";

type Props = {};

// Helper functions
export const formatDateToDDMMYYYY = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const Products: React.FC<Props> = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    if (authStore.isLogin) {
      productStore.getProducts();
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="sb-nav-fixed relative">
      {productStore.loadingProject && <Loading />}

      <Sidebar />

      <div className="p-4 sm:ml-40">
        <div className="flex flex-wrap justify-between items-start">
          <div>
            <button
              type="button"
              onClick={() => {
                productFormStore.resetForm();
                productFormStore.setTypeOfForm("add");
              }}
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Add New Product
            </button>
          </div>
        </div>

        {productFormStore.typeOfForm && <ProductForm />}

        <ProductFilter />

        {!productStore.isOnFilter && <Pagination store={productStore} />}

        {productStore.isOnFilter && (
          <div className="text-lg text-center">Kết quả lọc:</div>
        )}

        <div className="relative overflow-x-auto mt-4">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-2 w-1/12">
                  No
                </th>
                <th scope="col" className="px-6 py-3 w-2/12">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 w-1/12">
                  Brand
                </th>
                <th scope="col" className="px-6 py-3 w-2/12">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 w-1/12">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 w-1/12">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 w-4/12">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {productStore.displayProduct.map((product, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {index + 1}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {product.name}
                  </th>
                  <td className="px-6 py-4">{product.brand}</td>
                  <td className="px-6 py-4">{product.price}</td>
                  <td className="px-6 py-4">{product.category}</td>

                  <td className="px-6 py-4">
                    {product.status === "available" ? (
                      <span className="text-green-500">
                        <FontAwesomeIcon icon={faCheck} size="2xl" />
                      </span>
                    ) : (
                      <span className="text-red-500">
                        <FontAwesomeIcon icon={faMultiply} size="2xl" />
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex flex-wrap gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          productFormStore.setTypeOfForm("update");

                          productFormStore.getDetailProduct(product.id || "");
                        }}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      >
                        Edit/Detail
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const updatedProduct = { ...product };
                          updatedProduct.status =
                            updatedProduct.status === "available"
                              ? "unavailable"
                              : "available";

                          productFormStore.setFormData(updatedProduct);
                          productFormStore.updateProduct();
                        }}
                        className="text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-yellow-600 dark:hover:bg-yellow-700 focus:outline-none dark:focus:ring-yellow-800"
                      >
                        Change status
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          Object.entries(product).forEach(([key, value]) => {
                            productFormStore.setField(
                              key as keyof IFormProduct,
                              value as IFormProduct[keyof IFormProduct]
                            );
                          });
                          productFormStore.setTypeOfForm("delete");
                        }}
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      >
                        Delete
                      </button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
});
