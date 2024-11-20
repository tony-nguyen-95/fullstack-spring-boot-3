import React from "react";
import { Footer, Header, ListProductFillter } from "../../views";
import { observer } from "mobx-react";
import {
  EBrand,
  ECategory,
  priceRangeFilter,
  productFilterStore,
  sizeList,
} from "../../stores";
import { IoMdClose } from "react-icons/io";

type Props = {};

export const Product: React.FC<Props> = observer(() => {
  return (
    <>
      <Header />

      <main className="mb-8 px-20 py-20">
        <div className="flex flex-wrap justify-between items-start w-full">
          {/* Filters */}
          <div className="mb-10 w-2/12">
            <h2 className="uppercase text-xl">Tìm theo</h2>
            <hr className="my-4" />
            {productFilterStore.listCriterias.length !== 0 && (
              <>
                <ul className="flex flex-wrap flex-col gap-2">
                  {productFilterStore.listCriterias.map((criteria) => (
                    <li
                      key={criteria.key}
                      onClick={() =>
                        productFilterStore.removelistCriterias(criteria.key)
                      }
                      className="hover:text-cyan-400 cursor-pointer flex justify-start items-center gap-2"
                    >
                      <IoMdClose />
                      {criteria.activeValue}
                    </li>
                  ))}
                </ul>
                <button
                  className="mt-4 text-sky-400"
                  onClick={() => productFilterStore.removeAllCriterias()}
                >
                  Loại bỏ tất cả lọc
                </button>
              </>
            )}

            {/* Category */}
            <div className="mt-8">
              <h2 className="uppercase text-xl border-b-gray border-b-[1px] mb-2 pb-2">
                Danh Mục
              </h2>
              <ul className="flex flex-col flex-wrap gap-1">
                {Object.values(ECategory).map((value) => (
                  <li key={value}>
                    <button
                      onClick={() =>
                        productFilterStore.contains("category", value)
                      }
                      className={
                        productFilterStore.activeValues.includes(value)
                          ? "text-cyan-400"
                          : "text-gray-400"
                      }
                    >
                      {value}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Brand */}
            <div className="mt-8">
              <h2 className="uppercase text-xl border-b-gray border-b-[1px] mb-2 pb-2">
                Thương hiệu
              </h2>
              <ul className="flex flex-col flex-wrap gap-1">
                {Object.values(EBrand).map((brand) => (
                  <li key={brand}>
                    <button
                      className={
                        productFilterStore.activeValues.includes(brand)
                          ? "text-cyan-400"
                          : "text-gray-400"
                      }
                      onClick={() =>
                        productFilterStore.contains("brand", brand)
                      }
                    >
                      {brand}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Size */}
            <div className="mt-8">
              <h2 className="uppercase text-xl border-b-gray border-b-[1px] mb-2 pb-2">
                Size
              </h2>
              <ul className="flex flex-wrap gap-2">
                {sizeList.map((size) => (
                  <li key={size}>
                    <button
                      className={`${
                        productFilterStore.activeValues.includes(size)
                          ? "bg-cyan-400 text-white"
                          : "bg-gray-100 text-gray-500"
                      } px-1.5 py-1 rounded border-[1px]`}
                      onClick={() => productFilterStore.availableSize(size)}
                    >
                      {size}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price */}
            <div className="mt-10">
              <h2 className="uppercase text-xl border-b-gray border-b-[1px] mb-2 pb-2">
                Mức Giá
              </h2>
              <ul className="flex flex-col flex-wrap gap-2">
                {priceRangeFilter.map((range, index) => (
                  <li key={index}>
                    <button
                      className={`${
                        productFilterStore.activeValues.includes(
                          `${range.min.toLocaleString()} đ-${range.max.toLocaleString()} đ`
                        )
                          ? "text-cyan-400"
                          : "text-gray-400"
                      } text-right w-full`}
                      onClick={() =>
                        productFilterStore.between(
                          "price",
                          range.min,
                          range.max
                        )
                      }
                    >
                      {range.min.toLocaleString()} đ -{" "}
                      {range.max.toLocaleString()} đ
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Result */}
          <div className="mb-10 w-9/12">
            <div className="flex flex-col justify-start items-start">
              <h1 className="text-3xl font-bold uppercase">
                Danh sách sản phẩm theo bộ lọc
              </h1>
            </div>
            <div className="mt-10 flex flex-col min-h-[584px] gap-8">
              <ListProductFillter />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
});
