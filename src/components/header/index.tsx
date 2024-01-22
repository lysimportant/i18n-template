"use client"
import Image from 'next/image'
import React, { useState } from 'react';
import LNavigation from '@/ui/navigation/navigation';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import i18n from '@/i18n';
import { useRouter, usePathname } from 'next/navigation';


export default function CustomHeader() {
    const pageArr = [
        {
            path: "/",
            label: "homePage",
        },
        {
            path: "/product",
            label: "productCenterPage",
        },
        {
            path: "/information",
            label: "dataDownPage"
        },
        {
            path: "/technology",
            label: "technologyPage"
        },
        {
            path: "/contact",
            label: "contactPage"
        }
    ]
    const languages = [{
        label: "中文",
        value: "zh"
    }, {
        label: "English",
        value: "en"
    }, {
        label: "Русский",
        value: "ru"
    }]
    const path = usePathname()
    const [language, setLanguage] = useState("中文")
    function ToggleLaguage(item: any) {
        i18n!.changeLanguage(item.value)
        setLanguage(item.label)
    }
    const CallBackTggleLanguage = React.useCallback(ToggleLaguage, [])
    const { t } = useTranslation()
    const router = useRouter()

    return <header className=" h-52 overflow-hidden bg-white">
        <div className="h-10 items-center bg-gray-50 shadow">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                <div className='h-10 leading-10'>{t("Welcome")} </div>
                <ul className="flex gap-2">
                    <li>
                        <LNavigation>
                            {languages.map(item =>
                                <div
                                    onClick={() => CallBackTggleLanguage(item)}
                                    key={item.value}
                                    className='outline-0 px-10 py-3 hover:bg-gray-100'
                                >
                                    <span >{item.label}</span>
                                </div>
                            )}
                        </LNavigation>
                    </li>
                </ul>
            </div>
        </div>
        <div className="max-w-7xl flex justify-between h-24 items-center m-auto my-3">
            <div className='w-3/4'>
                <div className="flex items-center gap-1">
                    <span style={{ color: "rgb(26, 65, 153)" }} className="text-[32px] mr-2 font-bold">{t("company")}</span>
                    <Image priority className='w-auto h-auto' width={220} height={32} src="https://28399727.s21i.faiusr.com/4/ABUIABAEGAAgl8rmkAYouP6EgQUw1gE4IA.png" alt="logo" />
                </div>
                <h1 className="">{t("info")}</h1>
            </div>
            <div>
                <Image
                    className="float-left mx-2"
                    width={45}
                    height={32}
                    priority
                    src="https://16614059.s61i.faiusr.com/4/AD0Iq4X2BxAEGAAghsD71gUo7fjJhwIwLTgt.png"
                    alt=""
                ></Image>
                <div className="float-right">
                    <div className='text-gray-500 ml-2 text-sm'>{t("connect")}</div>
                    <div className='text-xl'>{t("tel")}</div>
                </div>
            </div>
        </div>
        <div 
            className='bg-blue-600'>
            <ul className='flex max-w-7xl mx-auto text-white'>
                {pageArr.map((item, index) => <li style={{ background: item.path == path ? "#13439d": ""}} key={item.path} className='px-12 py-3'>
                    <Link href={item.path}>{t(item.label)}</Link>
                </li>)}
            </ul>
        </div>
    </header>
}