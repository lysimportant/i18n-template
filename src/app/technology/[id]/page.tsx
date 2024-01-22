"use client"
import React, { useState, useEffect } from 'react'
import {useParams, useRouter} from "next/navigation";
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'


import '@wangeditor/editor/dist/css/style.css'
import {fetcher} from "@/app/lib/utils";
import ShowArticle from "@/components/article";
import i18n from "@/i18n"; // 引入 css

export default function ArticleDetail () {
    const [editor, setEditor] = useState<IDomEditor | null>(null)   // TS 语法
    const [html, setHtml] = useState("")
    const [otherInfo, setOtherInfo] = useState({
        title: "",
        description: "",
        language: ""
    })
    const p = useParams()
    const r = useRouter()
    const editorConfig: Partial<IEditorConfig> = {    // TS 语法
        // const editorConfig = {                         // JS 语法
        placeholder: '请输入内容...',
        readOnly: true
    }
    i18n?.on("languageChanged", (e) => {
        console.log(e, otherInfo)
        if (otherInfo) {}
    })
    const getArticleDetail = async () => {
        const res = await fetcher("/article?id="+p.id)
        setOtherInfo({
            title: res.data.title,
            description: res.data.description,
            language: res.data.language
        })
        setHtml(res.data.content)
    }
    useEffect(() => {
        getArticleDetail()
    }, [])
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])
    return <div className="max-w-7xl mx-auto">
        <h1 className="text-center text-xl font-semibold my-6">{otherInfo.title}</h1>
       <div className="flex w-full">
           <div className="w-1/5 ">
               <ShowArticle></ShowArticle>
           </div>
           <Editor
               defaultConfig={editorConfig}
               value={html}
               onCreated={setEditor}
               style={{ minHeight: '500px', overflowY: 'hidden' }}

               onChange={editor => setHtml(editor.getHtml())}
               mode="default"
           />
       </div>
    </div>
}