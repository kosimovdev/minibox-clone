import { useState, useRef } from "react";
import Counter from "../Counter";

import useProductApi from "../../../service/product/useProductApi";
import {Trash} from "../../../components/CardIcons";
import { ToastContainer, toast } from 'react-toastify';

const CartItem = ({ item, getProductCart, check }) => {
  const [count, setCount] = useState(1);

  const deleteCart = (id) => {
      useProductApi.deleteCartProduct(id).then((res) => {
      toast.success("Deleted!", { autoClose: 1000 });
      getProductCart();
  
    });
  };
  return (
    <div className="flex items-center border-t-[1px] py-[20px] justify-between">
      <ToastContainer />
      <div className="flex items-center">
        <div>
          {
            check ? <input type="checkbox" checked/> : <input type="checkbox" />
          }
          
        </div>
        <div className="w-[120px] h-[120px] ml-[10px] mr-[15px]">
          <img
            src={`https://image.minibox.uz${item?.images[0]}`}
            alt=""
            className="object-contain w-full h-full"
          />
        </div>
        <div className="flex flex-col justify-between h-[120px]">
          <h3 className="text-[18px] font-semibold">{item?.name}</h3>
          <div className="flex items-start justify-between min-w-[450px] w-full  h-[65px]">
            <div className="flex flex-col justify-end  h-[65px]">
              <p className="text-gray-600 text-[13px]">
                Ja'mi qolgan:{" "}
                <span className="text-black font-semibold">{item?.count}</span>{" "}
                ta
              </p>
              <p className="text-gray-600 text-[13px]">
                Sotuvchi:{" "}
                <span className="text-black font-semibold">Sunnatbek</span>
              </p>
              {item?.colors.length > 0 && (
                <div className="flex items-center">
                  <span className="text-gray-600 text-[13px]">Ranglari:</span>
                  {item.colors.map((v, index) => (
                    <div
                      key={index}
                      style={{ backgroundColor: v.name }}
                      className={`w-[12px] h-[12px] rounded-full m-[2px]`}
                    ></div>
                  ))}
                </div>
              )}
            </div>
            <Counter setCount={setCount} count={count} />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <button onClick={() => deleteCart(item.id)} title="Delete item" className="flex items-center gap-x-2 text-lg font-['InterMedium'] hover:text-indigo-400 mb-2 mr-3">
          <Trash/>
          {/*<span>Yo'q qilish</span>*/}
          </button>
        <p className="text-white bg-green-500 px-1 text-[13px] mb-3 rounded-md">
          10% chegirma
        </p>
        <h1 className="text-[18px]">
          <strong>
            {String(item?.price * count - item?.price * count * 0.1).replace(
              /\B(?=(\d{3})+(?!\d))/g,
              "."
            )}{" "}
          </strong>
          so'm
        </h1>
        <del className="text-gray-500 text-[15px]">
          {String(item?.price * count).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
          so'm
        </del>
      </div>
    </div>
  );
};

export default CartItem;
