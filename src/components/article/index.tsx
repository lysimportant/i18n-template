import {fetcher} from "@/app/lib/utils";
import i18n from "@/i18n";
import {useEffect, useState} from "react";
import {ChevronRightIcon, ListBulletIcon} from "@radix-ui/react-icons";
import {useTranslation} from "react-i18next";
import Link from 'next/link'
import { useParams, useRouter } from "next/navigation";

export default function ShowArticle (){
    const [data, setData] = useState<any[]>([])
    const p = useParams()
    const router = useRouter()
    const { t } = useTranslation()
    const getArticle = async () => {
        const res = await fetcher(`/article?language=${i18n?.language}&title=`)
        setData(res.data)
    }

    i18n?.on("languageChanged", async () => {
        if (p.id) {
            router.push("/technology")
        }
        await getArticle()
    })
    useEffect(() => {
        getArticle()
    }, [])
    return  <div className="bg-white shadow-sm text-black border">
        <div className='flex font-semibold items-center gap-2 p-1 bg-gray-300/40'>
            <ListBulletIcon className="font-bule"></ListBulletIcon>
            {t("technologyPage")}
        </div>
        <ul>
            {
                data.map(a => {
                    return <li key={a.ID} >
                       <Link href={`/technology/${a.ID}`} className="flex py-2 items-center cursor-pointer	">
                           <ChevronRightIcon style={{color: "red"}} className="ml-2"></ChevronRightIcon>
                           <div className="px-2 text-over text-sm">{a.title}</div>
                       </Link>
                    </li>
                })
            }
        </ul>
    </div>

}