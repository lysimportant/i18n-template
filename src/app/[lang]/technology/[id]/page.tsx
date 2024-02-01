"use client"
import React, { useState, useEffect } from 'react'
import {useParams, useRouter} from "next/navigation";
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import '@wangeditor/editor/dist/css/style.css'
import ShowArticle from "@/components/article";

export default function ArticleDetail () {
    const [editor, setEditor] = useState<IDomEditor | null>(null)   // TS 语法
    const [html, setHtml] = useState("")
    const [otherInfo, setOtherInfo] = useState({
        title: "",
        description: "",
        language: ""
    })
    const params = useParams()
    const router = useRouter()
    const editorConfig: Partial<IEditorConfig> = {
        placeholder: '请输入内容...',
        readOnly: true
    }
    const getArticleDetail = async () => {
        // const res = await fetcher("/article?id="+p.id)

        let res = await fetch("http://lianghj.top:60012/article?id="+params.id)
        const {data} = await res.json()
        // if (params.lang != data.language) {
        //     console.log("=> params.lang != data.language ", params.lang != data.language)
        //     router.push(`/${params.lang}/technology`)
        //     return
        // }
        setOtherInfo({
            title: data.title,
            description: data.description,
            language: data.language
        })
        setHtml(data.content)
    }
    useEffect(() => {
        console.log("=> technology")
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