"use client";

import Image from "next/image";
import {useTranslations} from "next-intl";
export default function LLayout({
  children,
  isShouImg,
  title,
  customCom
}: {
  children?: React.ReactNode;
  isShouImg?: boolean;
  title: string
  customCom?: () => React.ReactNode
}) {

  const t = useTranslations("home")
  return (
    <div className="llayout lg:w-3/4 sm:w-full flex mt-12 mx-auto">
      <nav className="w-1/6 text-white">
        <h1
          style={{ background: "rgb(36, 82, 167)" }}
          className="text-center shadow-xl text-xl font-semibold py-8"
        >
          {t("title")}
        </h1>
        {customCom && customCom()}
      </nav>
      <article className="flex-1 px-2">
        <div className="border h-full rounded">{children}</div>
      </article>
        {isShouImg && <div className="w-1/6 border h-full">
            <Image
                width={300}
                height={400}
                src="https://lianghj.top/api/uploads/76c78ea1-8f1e-5075-8cf9-01182c750df5.jpg"
                alt=""
            />
        </div>}
    </div>
  );
}
