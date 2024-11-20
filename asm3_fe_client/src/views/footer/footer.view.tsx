import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-24  px-12">
      <div className="flex flex-wrap">
        <div className="flex">
          <div>
            <h3 className="text-2xl font-semibold uppercase">
              Thông Tin Liên Hệ
            </h3>
            <ul className="text-gray-400 mt-4 flex flex-col gap-2">
              <li>Đ/C: 170A Đ. Lâm Văn Bền, Tân Quy, Quận 7</li>
              <li>Hồ Chí Minh, Việt Nam</li>
              <li>Email: contact@gota.com</li>
              <li>SĐT: +84900000000</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
