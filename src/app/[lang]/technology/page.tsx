"use client"
import LLayout from '@/components/layout/layout'
import { ListBulletIcon } from "@radix-ui/react-icons"
import ShowArticle from "@/components/article";
import {useTranslations} from "next-intl";
import {useParams} from "next/navigation";
export default  function Technology() {
  const t = useTranslations("technology")
  const custom = () => {
    return<div
        style={{ backgroundColor: "rgb(2, 50, 87)" }}
        className='flex items-center justify-center py-3'
    >
      {t("title")}
    </div>
  }

  return <div>
    <LLayout customCom={custom} title="technologyTitle">
      <ShowArticle></ShowArticle>
    </LLayout>
  </div>
}
