import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { productFilterStore, productStore } from "../../stores";
import { Link } from "react-router-dom";
import { DOMAIN } from "../../apis";

export const ListProductFillter: React.FC = observer(() => {
  useEffect(() => {
    if (!productStore.products) {
      productStore.getProducts();
    }
  }, []);

  return (
    <div className="mt-10">
      <div className="flex flex-wrap gap-12 items-center">
        {productFilterStore.filteredProducts &&
          productFilterStore.filteredProducts.map((each) => (
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
                  <div className="underline text-white text-lg">MUA NGAY</div>
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
    </div>
  );
});
