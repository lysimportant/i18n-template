import i18n from '@/i18n';
import * as React from "react"
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion"
import { GlobeIcon } from "@radix-ui/react-icons"
import { useTranslation } from 'react-i18next';
const languages = [{
  label: "中文",
  value: "zh"
}, {
  label: "English",
  value: "en"
}, {
  label: "Русский",
  value: "be"
}]
export default function LDropDown({ children }: { children?: React.ReactNode }) {
  const [flagOpen, setFlag] = useState(false)
  const { t } = useTranslation()
  return <DropdownMenu.Root open={flagOpen} onOpenChange={setFlag}>
    <DropdownMenu.Trigger className='outline-0'>
      <div
        className='flex items-center gap-1'
      >
        <GlobeIcon></GlobeIcon>
        <span>{t("language")}</span>
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6H11L7.5 10.5L4 6Z" fill="currentColor"></path></svg>
      </div>
    </DropdownMenu.Trigger>
    <AnimatePresence>
      {
        flagOpen &&
        <DropdownMenu.Portal forceMount>
          <DropdownMenu.Content align='start' sideOffset={8}>
            <motion.div
              className='bg-white cursor-pointer backdrop-blur-sm rounded shadow-2xl origin-top-left'
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
             {children}
            </motion.div>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      }
    </AnimatePresence>
  </DropdownMenu.Root>
}