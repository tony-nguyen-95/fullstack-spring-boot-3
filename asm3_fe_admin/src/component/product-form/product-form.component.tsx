import React from "react";
import { observer } from "mobx-react";
import { EBrand, ECategory, productFormStore } from "../../stores";
import "react-quill/dist/quill.snow.css";
import { Editor } from "../editor";
import { DOMAIN } from "../../apis";
import { Loading } from "../loading";

type Props = {};

export const ProductForm: React.FC<Props> = observer(() => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, type, value } = e.target;

    if (type === "checkbox" || type === "radio") {
      productFormStore.setField(
        name as keyof typeof productFormStore.formData,
        (e.target as HTMLInputElement).checked ? "available" : "unavailable"
      );
    } else {
      productFormStore.setField(
        name as keyof typeof productFormStore.formData,
        value
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { name, description } = productFormStore.formData;

    if (productFormStore.typeOfForm === "update") {
      productFormStore.updateProduct();
    } else {
      if (
        description === "" ||
        name === "" ||
        productFormStore.fileNameImage === undefined
      ) {
        return productFormStore.setError(
          "Please fill these fields, except description!"
        );
      }
      productFormStore.submitAddForm();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      productFormStore.setFiles(event.target.files[0]);
    }
  };

  return (
    <div className="my-3 relative">
      {productFormStore.loadingForm && <Loading />}
      <h1 className="text-center my-4">
        {productFormStore.typeOfForm?.toUpperCase()} PRODUCT
      </h1>
      {productFormStore.typeOfForm === "delete" ? (
        <div className="w-full border-2 p-6 rounded-md flex flex-wrap">
          <h2>
            Are you sure you want to delete the product:{" "}
            {productFormStore.formData.name}?
          </h2>
          <div className="w-full flex flex-wrap justify-between">
            <button
              type="button"
              onClick={() => {
                productFormStore.resetForm();
              }}
              className="w-[48%] text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              CANCEL
            </button>
            <button
              type="button"
              onClick={() => {
                productFormStore.deleteProduct();
              }}
              className="w-[48%] text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              {productFormStore.typeOfForm?.toUpperCase()}
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="w-full border-2 p-6 rounded-md flex flex-wrap"
        >
          <div className="relative z-0 w-6/12 pr-4 mb-5 group text-left">
            <input
              type="text"
              name="name"
              id="name"
              className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none block p-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
              required
              value={productFormStore.formData.name}
              onChange={handleChange}
            />
            <label
              htmlFor="name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
            >
              Name (Ex: Nike AirForce)
            </label>
          </div>

          <div className="relative z-0 w-6/12 pr-4 mb-5 group text-left">
            <input
              type="number"
              name="price"
              id="price"
              className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none block p-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
              value={productFormStore.formData.price}
              onChange={handleChange}
              placeholder="Price"
            />
            <label
              htmlFor="price"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
            >
              Price (Ex: 1000000)
            </label>
          </div>

          <div className="relative z-0 w-6/12 pr-4 mb-5 group mt-6 text-left">
            <select
              id="brand-select"
              name="brand"
              value={productFormStore.formData.brand}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {Object.values(EBrand).map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
            <label
              htmlFor="type"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-8 top-3 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-placeholder-shown:top-2.5 peer-focus:scale-75 peer-focus:-translate-y-8"
            >
              Brand
            </label>
          </div>

          <div className="relative z-0 w-6/12 pr-4 mb-5 group mt-6 text-left">
            <select
              id="category-select"
              name="category"
              value={productFormStore.formData.category}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {Object.values(ECategory).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <label
              htmlFor="type"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-8 top-3 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-placeholder-shown:top-2.5 peer-focus:scale-75 peer-focus:-translate-y-8"
            >
              Category
            </label>
          </div>

          <div className="relative z-0 w-full pr-4 mb-8 group text-left">
            <label
              htmlFor="description"
              className="block text-sm text-gray-400"
            >
              Description
              <div className="flex flex-wrap gap-2 inset-0 text-gray-400 pointer-events-none p-3 whitespace-pre-wrap">
                <span>Ex: </span>
                <span>Giày cho đẳng cấp</span>
              </div>
            </label>
            <Editor />
          </div>
          <div className="relative z-0 w-[20%] pr-4 mb-5 group text-left">
            <input
              type="number"
              name="size_38_quantity"
              id="size_38_quantity"
              className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none block p-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
              value={productFormStore.formData.size_38_quantity}
              onChange={handleChange}
              placeholder="size_38_quantity"
            />
            <label
              htmlFor="size_38_quantity"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
            >
              Size 38 quantity (Ex: 10)
            </label>
          </div>
          <div className="relative z-0 w-[20%] pr-4 mb-5 group text-left">
            <input
              type="number"
              name="size_39_quantity"
              id="size_39_quantity"
              className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none block p-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
              value={productFormStore.formData.size_39_quantity}
              onChange={handleChange}
              placeholder="size_39_quantity"
            />
            <label
              htmlFor="size_39_quantity"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
            >
              Size 39 quantity (Ex: 10)
            </label>
          </div>
          <div className="relative z-0 w-[20%] pr-4 mb-5 group text-left">
            <input
              type="number"
              name="size_40_quantity"
              id="size_40_quantity"
              className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none block p-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
              value={productFormStore.formData.size_40_quantity}
              onChange={handleChange}
              placeholder="size_40_quantity"
            />
            <label
              htmlFor="size_40_quantity"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
            >
              Size 40 quantity (Ex: 10)
            </label>
          </div>
          <div className="relative z-0 w-[20%] pr-4 mb-5 group text-left">
            <input
              type="number"
              name="size_41_quantity"
              id="size_41_quantity"
              className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none block p-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
              value={productFormStore.formData.size_41_quantity}
              onChange={handleChange}
              placeholder="size_41_quantity"
            />
            <label
              htmlFor="size_41_quantity"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
            >
              Size 41 quantity (Ex: 10)
            </label>
          </div>
          <div className="relative z-0 w-[20%] pr-4 mb-5 group text-left">
            <input
              type="number"
              name="size_42_quantity"
              id="size_42_quantity"
              className="disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none block p-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              required
              value={productFormStore.formData.size_42_quantity}
              onChange={handleChange}
              placeholder="size_42_quantity"
            />
            <label
              htmlFor="size_42_quantity"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
            >
              Size 42 quantity (Ex: 10)
            </label>
          </div>

          {productFormStore.typeOfForm === "add" && (
            <div className="relative z-0 w-8/12 pr-4 mb-5 group text-left">
              <label
                htmlFor="description"
                className="block text-sm text-gray-400"
              >
                Select image for this product
              </label>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="border p-2 w-full"
              />
              {productFormStore.fileNameImage && (
                <div className="flex flex-wrap gap-1">
                  <h3>Selected Files: {productFormStore.fileNameImage.name}</h3>
                </div>
              )}
            </div>
          )}

          <div className="relative z-0 w-3/12 self-center pr-4 mt-4 mb-5 group text-left flex flex-wrap items-between gap-5">
            <div>
              <label
                htmlFor="isAvailable"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
              >
                Is Available:
              </label>
              <div>
                <input
                  type="checkbox"
                  id="isAvailable"
                  name="isAvailable"
                  checked={productFormStore.formData.status === "available"}
                  onChange={handleChange}
                />
                <label htmlFor="isAvailable">Is Available</label>
              </div>
            </div>
          </div>

          {productFormStore.typeOfForm === "update" && (
            <div className="relative z-0 w-6/12 pr-4 my-5 group text-left">
              <img
                className="w-48 h-auto"
                src={`${DOMAIN}${productFormStore.formData.imagePath}`}
                alt={""}
              />
            </div>
          )}

          <div className="w-full flex flex-wrap justify-between">
            <button
              type="button"
              onClick={() => {
                productFormStore.resetForm();
              }}
              className="w-[48%] text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="w-[48%] text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              {productFormStore.typeOfForm?.toUpperCase()}
            </button>
          </div>
        </form>
      )}
    </div>
  );
});
