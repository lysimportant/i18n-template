"use client";
import LSwiper from "@/components/swiper";
import LLayout from "@/components/layout/layout";
import Link from "next/link";
import ShowArticle from "@/components/article";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import {useTranslations} from "next-intl";
import {useParams} from "next/navigation";
export default function App() {
  const [lds, setLDS] = useState([]);
  const t = useTranslations("home")
    const params = useParams()
  const custom = () => {
    return (
      <div>
        <ul style={{ backgroundColor: "rgb(2, 50, 87)" }}>
          <li className="py-5 px-8 cursor-pointer">
            <Link href={`/${params.lang}/inductive`}>{t("first-product")}</Link>
          </li>
          <li className="py-5 px-8 cursor-pointer">
            <Link  href={`/${params.lang}/capacitive`} >{t("second-product")}</Link>
          </li>
          <li className="py-5 px-8 cursor-pointer">
            <Link  href={`/${params.lang}/photoelectric`} >{t("third-product")}</Link>
          </li>
        </ul>
        <ShowArticle></ShowArticle>
      </div>
    );
  };
  function GetData() {
    fetch("http://lianghj.top:60012/lds?language="+params.lang).then(
      async (res) => {
        const data = await res.json();
        setLDS(data.data);
      }
    );
  }
  useEffect(() => {
    GetData();
  }, []);
  return (
    <main>
      <LSwiper></LSwiper>
      <LLayout customCom={custom} title="homeTitle" isShouImg>
        <div>
          <h2 className="text-xl font-semibold p-1 bg-gray-300/40">
            {t("first-product")}
          </h2>

          <ul className="flex items-center justify-center">
            {lds?.map((item: any) => {
              return (
                <li key={item.ID} className="flex-1 text-center  h-56">
                  <div className="h-3/4">
                    <Image
                      width={200}
                      height={80}
                      className="mx-auto"
                      src="https://28399727.s21i.faiusr.com/4/ABUIABAEGAAgx_iOkgYon8SwqQYwhRY4yxU!200x200.png.webp"
                      alt=""
                    />
                  </div>
                  <div className="">
                    <div>{item.product_name}</div>
                    <div>
                      {t("product-type")}: {item.product_type}
                    </div>
                  </div>
                </li>
              );
            })}
            <li className="flex-1 text-center bg-red-400 h-56">3</li>
          </ul>
        </div>
        <div className="mt-3">
          <h2 className="text-xl font-semibold p-1 bg-gray-300/40">
            {t("second-product")}
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
