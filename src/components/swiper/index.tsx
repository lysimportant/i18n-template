"use client"
import { useEffect, useRef, useState } from "react"
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons'
let timer: any = null
export default function LSwiper({ children }: { children?: React.ReactNode, arr?: any[] }) {
  const arr = [
    "https://images.wallpaperscraft.com/image/single/girl_grass_city_213102_2560x1440.jpg",
    "https://images.wallpaperscraft.com/image/single/girl_pier_river_1129622_2560x1440.jpg",
    "https://images.wallpaperscraft.com/image/single/girl_cute_train_1143644_2560x1440.jpg",
    "https://images.wallpaperscraft.com/image/single/girl_smile_bob_1136652_2560x1440.jpg"
  ];
  const currIndex = useRef(1)
  const [look, SetLook] = useState(false)
  const ToggleCurrIndexClick = (payload: number) => {
    if (look) {
      return;
    }
    SetLook(true)
    const SwiperContainer: HTMLDivElement = document.querySelector(".l_swiper_container")!
    const index = currIndex.current + payload
    SwiperContainer.style.transition = "all .3s"
    // 加数 下一个
    currIndex.current = (index);
    if (index > arr.length) {
      setTimeout(() => {
        SwiperContainer.style.transition = "none"
        currIndex.current = (1)
      }, 300)
    } else if (index <= 0) {
      setTimeout(() => {
        SwiperContainer.style.transition = "none"
        currIndex.current = (arr.length)
      }, 300)
    }
    setTimeout(() => {
      SetLook(false)
    }, 500)
  }

  function ControllerAutoPlaySwiperClick() {
    timer = setInterval(() => {
      ToggleCurrIndexClick(1)
    }, 2500)
    return () => {
      clearInterval(timer)
    }
  }
  useEffect(() => {
    const clear = ControllerAutoPlaySwiperClick()
    return () => {
      clear()
    }
  }, [])
  return <div className="l_swiper relative">
    <div
      style={{
        width: window.innerWidth * arr.length + "%",
        transform: `translateX(-${window.innerWidth * currIndex.current}px)`,
        transition: "all .3s"
      }}
      onMouseEnter={() => clearInterval(timer)}
      onMouseLeave={() => ControllerAutoPlaySwiperClick()}
      className="clearfix flex l_swiper_container h-96">
      <img
        style={{ width: window.innerWidth }}
        className="w-full object-cover"
        src={arr[arr.length - 1]}
        alt="" />
      {
        arr.map(src =>
          <img
            key={src}
            style={{ width: window.innerWidth }}
            className="w-full object-cover"
            src={src}
            alt="" />)
      }
      <img
        style={{ width: window.innerWidth }}
        className="w-full object-cover"
        src={arr[0]}
        alt="" />
    </div>
    <button className="bg-white/60 rounded-md transition-all hover:bg-white/95 absolute top-1/2 left-0 border block mx-3 px-3 py-3"
      onClick={() => {
        ToggleCurrIndexClick(-1)
      }}>
      <ArrowLeftIcon></ArrowLeftIcon>
    </button>
    <button className="bg-white/60 rounded-md transition-all hover:bg-white/95 absolute top-1/2 right-0 border block mx-3 px-3 py-3"
      onClick={() => {
        ToggleCurrIndexClick(1)
      }}>
      <ArrowRightIcon></ArrowRightIcon>
    </button>
    <ul className="flex mx-auto absolute bottom-4 left-1/2 -translate-x-1/2">
      {arr.map((item, index) =>
        <li
          key={item}
          onClick={() => ToggleCurrIndexClick(index)}
          style={{
            padding: currIndex.current - 1 == index ? "6px 8px" : "4px 6px",
            background: currIndex.current - 1 == index ? "rgba(37, 99, 235, 0.8)" : ""
          }}
          className="bg-white/50 rounded-full mx-2">
        </li>)}
    </ul>
  </div>
}