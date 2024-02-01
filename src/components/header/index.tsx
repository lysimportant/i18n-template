"use client"
import Image from 'next/image'
import React, { useState } from 'react';
import LNavigation from '@/ui/navigation/navigation';
import Link from 'next/link';
import {useRouter, usePathname, useParams} from 'next/navigation';
import {useTranslations} from "next-intl";

export default function CustomHeader({ lang }:{ lang: string } ) {
    const router = useRouter()
    const pageArr = [
        {
            path: "",
            label: "home-page",
        },
        {
            path: "/product",
            label: "product-center-page",
        },
        {
            path: "/information",
            label: "data-down-page"
        },
        {
            path: "/technology",
            label: "technology-page"
        },
        {
            path: "/contact",
            label: "contact-page"
        }
    ]
    const languages = [
    {
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

    const t = useTranslations("header")
    function ToggleLanguage(item: any) {
        console.log("item, path", item, path)
        // 第一种情况: 没有进入文章详情
        const basePath = path.replace(/(zh|en|ru)/, item.value)
        router.replace(basePath, {
            scroll: true
        })

        // console.log("Test ", item, path, basePath)
        // if (basePath.includes("technology")) {
        //     console.log("includes: technology")
        //     const fullPath = `/${item.value}/${basePath.split("/")[1]}`
        //     router.push(fullPath)
        //     return
        // }

    }
    const CallBackToggleLanguage = React.useCallback(ToggleLanguage, [])
    return <header className=" h-72 overflow-hidden bg-white">
        <div className="h-10 items-center bg-gray-50 shadow">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                <div className='h-10 leading-10'>
                    {t("welcome")}
                </div>
                <ul className="flex gap-2">
                    <li>
                        <LNavigation>
                            {languages.map(item =>
                                <div
                                    onClick={() => CallBackToggleLanguage(item)}
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
                    <span style={{ color: "rgb(26, 65, 153)" }} className="text-[32px] mr-2 font-bold">
                        {t("company")}
                    </span>
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
            className='bg-blue-600 h-24'>
            <ul className='flex max-w-7xl mx-auto text-white'>
                {pageArr.map((item, index) =>
                    <li style={{ background: `/${lang}${item.path}` == path ? "#13439d": ""}}
                        key={item.path}
                        className='px-12 py-3'
                    >
                    <Link href={`/${lang}${item.path}`}>
                        {t(item.label)}
                        <br/>
                        {`/${lang}${item.path}`}
                    </Link>

                </li>)}
            </ul>
        </div>
    </header>
}