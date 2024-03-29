/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
export default function LSwiper({
  children,
}: {
  children?: React.ReactNode;
  arr?: any[];
}) {
  const arr = [
    "https://images.wallpaperscraft.com/image/single/girl_grass_city_213102_2560x1440.jpg",
    "https://images.wallpaperscraft.com/image/single/girl_pier_river_1129622_2560x1440.jpg",
    "https://images.wallpaperscraft.com/image/single/girl_cute_train_1143644_2560x1440.jpg",
    "https://images.wallpaperscraft.com/image/single/girl_smile_bob_1136652_2560x1440.jpg",
  ];

  const [outerWidth, SetOuterWidth] = useState(0);
  function SetOuterWidthWhenWindowResize() {
    const SwiperContainer: HTMLDivElement =
      document.querySelector(".l_swiper")!;
    SetOuterWidth(SwiperContainer.offsetWidth);
    window.addEventListener("resize", () => {
      SetOuterWidth(SwiperContainer.offsetWidth);
    });
    return () => {
      window.removeEventListener("resize", () => { });
    };
  }
  useEffect(() => {
    const clear = SetOuterWidthWhenWindowResize();
    return () => {
      clear();
    };
  }, []);

  const [transition, SetTransition] = useState(true);
  const [currIndex, SetCurrIndex] = useState(1);

  const currIndexRef = useRef(currIndex);
  const [firstImgOffset, SetFirstImgOffset] = useState(false);
  const [lastImgOffset, SetLastImgOffset] = useState(false);

  const onChangeCurrentIndex = async (payload: number) => {
    let next = payload;

    if (next === arr.length + 1) {
      next = 0;
      SetLastImgOffset(true);
      SetTransition(false);
      SetCurrIndex(next);
      currIndexRef.current = next;

      requestAnimationFrame(async () => {
        SetTransition(true);
        SetCurrIndex(1);
        currIndexRef.current = 1;

        await waitContainerTransitionEnd();
        SetLastImgOffset(false);
      });
    } else if (next === 0) {
      next = arr.length + 1;
      SetFirstImgOffset(true);
      SetTransition(false);
      SetCurrIndex(next);
      currIndexRef.current = next;

      requestAnimationFrame(async () => {
        SetTransition(true);
        SetCurrIndex(arr.length);
        currIndexRef.current = arr.length;

        await waitContainerTransitionEnd();
        SetFirstImgOffset(false);
      });
    } else {
      SetTransition(true);
      SetCurrIndex(next);
      currIndexRef.current = next;
    }
  };

  async function waitContainerTransitionEnd() {
    const swiperContainerElement: HTMLDivElement | null = document.querySelector(
      ".l_swiper_container"
    );
    await new Promise((resolve) => {
      const onEnd = () => {
        resolve("");
        swiperContainerElement?.removeEventListener("transitionend", onEnd);
      };
      swiperContainerElement?.addEventListener("transitionend", onEnd);
    });
  }
  const isActive = useRef(true)
  const isMouseEnter = useRef(false);
  const lastNextTime = useRef(Date.now());
  const startNext = () => {
    requestAnimationFrame(() => {
      if (isMouseEnter.current) return;
      const now = Date.now();
      if (now - lastNextTime.current > 3000) {
        lastNextTime.current = now;
        onChangeCurrentIndex(currIndexRef.current + 1);
      }
      if(isActive.current) startNext();
    });
  };

  useEffect(() => {
    startNext();
    return () => {
      isActive.current = false
    }
  }, []); // 空数组表示只在组件挂载时执行一次

  return (
    <div
      className="l_swiper relative w-full overflow-hidden h-[500px]"
      onMouseEnter={() => {
        isMouseEnter.current = true;
      }}
      onMouseLeave={() => {
        isMouseEnter.current = false;
        startNext();
      }}
    >
      <div
        style={{
          width: outerWidth * arr.length,
          transform: `translateX(${outerWidth * (1 - currIndex)}px)`,
          transition: transition ? "transform .5s ease-in-out" : "none",
        }}
        className="clearfix flex l_swiper_container h-full"
      >
        {arr.map((src, index) => (
          <img
            key={index}
            className="w-full h-full object-cover"
            style={{
              width: outerWidth,
              transform:
                index === 0 && firstImgOffset
                  ? `translateX(${outerWidth * arr.length}px)`
                  : index === arr.length - 1 && lastImgOffset
                    ? `translateX(-${outerWidth * arr.length}px)`
                    : "",
            }}
            src={src}
            alt=""
          />
        ))}
      </div>

      <button
        className="bg-white/60 rounded-md transition-all hover:bg-white/95 absolute top-1/2 left-0 border block mx-3 px-3 py-3"
        onClick={() => {
          onChangeCurrentIndex(currIndex - 1);
        }}
      >
        <ArrowLeftIcon></ArrowLeftIcon>
      </button>
      <button
        className="bg-white/60 rounded-md transition-all hover:bg-white/95 absolute top-1/2 right-0 border block mx-3 px-3 py-3"
        onClick={() => {
          onChangeCurrentIndex(currIndex + 1);
        }}
      >
        <ArrowRightIcon></ArrowRightIcon>
      </button>

      <ul className="flex mx-auto absolute bottom-4 left-1/2 -translate-x-1/2">
        {arr.map((item, index) => (
          <li
            key={item}
            onClick={() => onChangeCurrentIndex(index + 1)}
            style={{
              background:
                currIndex - 1 == index ? "rgba(37, 99, 235, 0.8)" : "",
            }}
            className="bg-white/50 rounded-full mx-2 cursor-pointer w-6 h-1"
          ></li>
        ))}
      </ul>
    </div>
  );
}