import React from "react";
import { Footer, Header, ListProducts } from "../../views";
import shoe from "../../assets/slider-img-1.png";
import text from "../../assets/text.png";
import { observer } from "mobx-react";
import { Pagination } from "../../component";
import { productStore } from "../../stores";

type Props = {};

export const Home: React.FC<Props> = observer(({}: Props) => {
  return (
    <>
      <Header />

      <main className="mb-8">
        {!productStore.isOnSearch && (
          <div className="bg-orange-400 h-[calc(100svh-7.5rem)]">
            <div className="mx-auto relative flex items-center justify-center h-full overflow-hidden">
              <img src={text} alt="text" />
              <img
                src={shoe}
                alt="shoe"
                className="animate-float absolute right-0 bottom-0"
              />
            </div>
          </div>
        )}
        <div className="py-24 flex flex-col justify-center">
          <ListProducts />
        </div>
      </main>

      <Footer />
    </>
  );
});
