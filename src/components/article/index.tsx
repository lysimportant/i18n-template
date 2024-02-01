
import {useEffect, useState} from "react";
import {ChevronRightIcon, ListBulletIcon} from "@radix-ui/react-icons";

import Link from 'next/link'
import { useParams, useRouter, usePathname } from "next/navigation";
import {useTranslations} from "next-intl";

export default function ShowArticle (){
    const [data, setData] = useState<any[]>([])
    const { lang } = useParams()
    const t = useTranslations("technology")
    const getArticle = async () => {
        // 获取数据
        const res = await fetch(`http://lianghj.top:60012/article?language=${lang}&title=`)
        const {data} = await res.json()
        setData(data)
    }
    useEffect(() => {
        getArticle()
    }, [])
    return  <div className="bg-white shadow-sm text-black border">
        <div className='flex font-semibold items-center gap-2 p-1 bg-gray-300/40'>
            <ListBulletIcon className="font-bule"></ListBulletIcon>
            {t("title")}
        </div>

        <ul>
            {
                data.map(a => {
                    return <li key={a.ID} >
                       <Link href={`/${lang}/technology/${a.ID}`} className="flex py-2 items-center cursor-pointer	">
                           <ChevronRightIcon style={{color: "red"}} className="ml-2"></ChevronRightIcon>
                           <div className="px-2 text-over text-sm">{a.title}</div>
                       </Link>
                    </li>
                })
            }
        </ul>
    </div>

}