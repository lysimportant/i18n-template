"use client";
import LSwiper from "@/components/swiper";
import LLayout from "@/components/layout/layout";
import { useTranslation } from "react-i18next";
import { ListBulletIcon } from "@radix-ui/react-icons";
import ShowArticle from "@/components/article";
import { useEffect, useState } from "react";
import i18n from "@/i18n"
import Image from "next/image";
export default function App() {
  const { t } = useTranslation();
  const [lds, setLDS] = useState([])
  const custom = () => {
    return (
      <div>
        <ul style={{ backgroundColor: "rgb(2, 50, 87)" }}>
          <li className="py-5 px-8">{t("product-1")} </li>
          <li className="py-5 px-8">{t("product-2")} </li>
        </ul>
        <ShowArticle></ShowArticle>
      </div>
    );
  };
  function GetData() {
    fetch("http://localhost:8080/lds?language=" + i18n?.language).then(async res => {
      console.log("-=> ",);
      const data = await res.json()
      setLDS(data.data)
    })
  }
  i18n?.on("languageChanged", () => {
    GetData()
  })
  useEffect(() => {
    GetData()
  }, [])
  return (
    <main>
      <LSwiper></LSwiper>
      <LLayout customCom={custom} title="homeTitle" isShouImg>
        <div>
          <h2 className="text-xl font-semibold p-1 bg-gray-300/40">
            {t("product-1")}
          </h2>
          <ul className="flex items-center justify-center">
            {
              lds?.map((item: any) => {
                return <li key={item.ID} className="flex-1 text-center  h-56">
                <div className="h-3/4 ">
                  <Image
                  width={200}
                  height={80}
                  className="mx-auto"
                  src="https://28399727.s21i.faiusr.com/4/ABUIABAEGAAgx_iOkgYon8SwqQYwhRY4yxU!200x200.png.webp" 
                  alt="" />
                </div>
                <div className="">
                  <div>{item.product_name}</div>
                  <div>{t("product-type")}: {item.product_type}</div>
                </div>
              </li>
              })
            }
            <li className="flex-1 text-center bg-red-400 h-56">3</li>
          </ul>
        </div>
        <div className="mt-3">
          <h2 className="text-xl font-semibold p-1 bg-gray-300/40">
            {t("product-2")}
          </h2>
          <ul className="flex items-center justify-center">
            <li className="flex-1 text-center bg-red-200 h-56">1</li>
            <li className="flex-1 text-center bg-red-300 h-56">2</li>
            <li className="flex-1 text-center bg-red-400 h-56">3</li>
          </ul>
        </div>
      </LLayout>
      <div className="h-screen"></div>
    </main>
  );
}
