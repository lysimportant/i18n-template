"use client"
import LLayout from '@/components/layout/layout'
import { useTranslation } from 'react-i18next'
import { ListBulletIcon } from "@radix-ui/react-icons"
import ShowArticle from "@/components/article";
export default  function Technology() {
  const { t } = useTranslation()
  const custom = () => {
    return<div
        style={{ backgroundColor: "rgb(2, 50, 87)" }}
        className='flex items-center justify-center py-3'
    >
        {t("technologyPage")}
    </div>
  }

  return <div>
    <LLayout customCom={custom} title="technologyTitle">
      <ShowArticle></ShowArticle>
    </LLayout>
  </div>
}
