import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { productStore } from "../../stores";
import { Link } from "react-router-dom";
import { DOMAIN } from "../../apis";
import { Pagination } from "../../component";

export const ListProducts: React.FC = observer(() => {
  useEffect(() => {
    if (!productStore.products) {
      productStore.getProducts();
    }
  }, []);
  return (
    <div className="mx-auto">
      {!productStore.isOnSearch ? (
        <h2 className="text-4xl text-center font-semibold uppercase">
          Sản phẩm mới
        </h2>
      ) : (
        <h2 className="text-4xl text-center font-semibold uppercase">
          Kết quả tìm kiếm cho "{productStore.searchByProductName}"
        </h2>
      )}
      <div className="mt-10 mx-20">
        {!productStore.isOnSearch ? (
          <div className="flex flex-col flex-wrap gap-20 justify-center">
            <div className="flex flex-wrap gap-20 items-center justify-start">
              {productStore.paginatedProducts?.map((each) => (
                <Link
                  to={`/product/${each.id}`}
                  className="w-64 h-64 group"
                  key={each.id}
                >
                  <div className="relative aspect-square">
                    <img
                      className="group-hover:blur-sm transition-all object-cover size-full"
                      src={`${DOMAIN}${each.imagePath}`}
                      alt="shoe"
                    />
                    <span className="bg-sky-400 text-white px-2 py-px rounded-md uppercase top-2 left-2 absolute group-hover:opacity-0 transition-all">
                      đang bán
                    </span>
                    <div className="absolute inset-0 size-full flex justify-center items-center opacity-0 group-hover:opacity-100">
                      <div className="underline text-white text-lg">
                        MUA NGAY
                      </div>
                    </div>
                  </div>
                  <div className="py-4 text-center font-semibold">
                    <h4 className="text-lg">{each.name}</h4>
                    <div className="text-sky-500">
                      {each.price?.toLocaleString()} đ
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <Pagination />
          </div>
        ) : (
          <div className="flex flex-wrap gap-12 items-center justify-center">
            {productStore.products?.map((each) => {
              if (
                !each.name
                  ?.toLowerCase()
                  .includes(productStore.searchByProductName)
              )
                return null;

              return (
                <Link
                  to={`/product/${each.id}`}
                  className="w-64 h-64 group"
                  key={each.id}
                >
                  <div className="relative aspect-square">
                    <img
                      className="group-hover:blur-sm transition-all object-cover size-full"
                      src={`${DOMAIN}${each.imagePath}`}
                      alt="shoe"
                    />
                    <span className="bg-sky-400 text-white px-2 py-px rounded-md uppercase top-2 left-2 absolute group-hover:opacity-0 transition-all">
                      đang bán
                    </span>
                    <div className="absolute inset-0 size-full flex justify-center items-center opacity-0 group-hover:opacity-100">
                      <div className="underline text-white text-lg">
                        MUA NGAY
                      </div>
                    </div>
                  </div>
                  <div className="py-4 text-center font-semibold">
                    <h4 className="text-lg">{each.name}</h4>
                    <div className="text-sky-500">
                      {each.price?.toLocaleString()} đ
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
});
