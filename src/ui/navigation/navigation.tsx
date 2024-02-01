"use client";
import * as React from "react"
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion"
import { GlobeIcon } from "@radix-ui/react-icons"
import {useTranslations} from "next-intl";

export default function LNavigation({ children }: { children?: React.ReactNode }) {
  const [flagOpen, setFlag] = useState(false)
  const t = useTranslations("header")

  return <NavigationMenu.Root onValueChange={(v) => {
    if (v) {
      setFlag(true)
    } else {
      setFlag(false)
    }
  }}>
    <NavigationMenu.List>
      <NavigationMenu.Item>
        <NavigationMenu.Trigger className='outline-0'>
          <div
            className='flex items-center gap-1'
          >
            <GlobeIcon></GlobeIcon>
            <span>{t("language")}</span>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6H11L7.5 10.5L4 6Z" fill="currentColor"></path></svg>
          </div>
        </NavigationMenu.Trigger>
        <AnimatePresence>
          {
            flagOpen &&
            <NavigationMenu.Content forceMount>
              <motion.div
                className='bg-white cursor-pointer backdrop-blur-sm rounded shadow-2xl origin-top-left absolute'
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
              {children}
              </motion.div>
            </NavigationMenu.Content>
          }
        </AnimatePresence>
      </NavigationMenu.Item>
    </NavigationMenu.List>
  </NavigationMenu.Root>
}