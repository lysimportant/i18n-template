/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
let timer: any = null;
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
      window.removeEventListener("resize", () => {});
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
  const [firstImgOffset, SetFirstImgOffest] = useState(false);
  const [lastImgOffset, SetLastImgOffest] = useState(false);

  const onClickIndexButton = async (payload: number) => {
    console.log("onToggleCurrIndexClick", payload, currIndexRef.current);
    let next = currIndexRef.current + payload;

    if (next === arr.length + 1) {
      next = 0;
      SetLastImgOffest(true);
      SetTransition(false);
      SetCurrIndex(next);
      currIndexRef.current = next;

      requestAnimationFrame(async () => {
        SetTransition(true);
        SetCurrIndex(1);
        currIndexRef.current = 1;

        await waitContainerTransitionEnd();
        SetLastImgOffest(false);
      });
    } else if (next === 0) {
      next = arr.length + 1;
      SetFirstImgOffest(true);
      SetTransition(false);
      SetCurrIndex(next);
      currIndexRef.current = next;

      requestAnimationFrame(async () => {
        SetTransition(true);
        SetCurrIndex(arr.length);
        currIndexRef.current = arr.length;

        await waitContainerTransitionEnd();
        SetFirstImgOffest(false);
      });
    } else {
      SetTransition(true);
      SetCurrIndex(next);
      currIndexRef.current = next;
    }
  };

  const onClickIndexIndicator = (payload: number) => {
    const diff = payload + 1 - currIndexRef.current;
    if (diff === 0) return;
    else if (diff > 0) {
      for (let i = 0; i < diff; i++) {
        onClickIndexButton(1);
      }
    } else {
      for (let i = 0; i < -diff; i++) {
        onClickIndexButton(-1);
      }
    }
  };

  async function waitContainerTransitionEnd() {
    const swiperContainerElement: HTMLDivElement = document.querySelector(
      ".l_swiper_container"
    )!;
    await new Promise((resolve) => {
      const onEnd = () => {
        console.log("onEnd");
        resolve("");
        swiperContainerElement.removeEventListener("transitionend", onEnd);
      };
      swiperContainerElement.addEventListener("transitionend", onEnd);
    });
  }

  const isMouseEnter = useRef(false);
  const lastNextTime = useRef(Date.now());
  const startNext = () => {
    requestAnimationFrame(() => {
      if (isMouseEnter.current) return;
      const now = Date.now();
      if (now - lastNextTime.current > 3000) {
        lastNextTime.current = now;
        onClickIndexButton(1);
      }
      startNext();
    });
  };

  useEffect(() => {
    startNext();
  }, []); // 空数组表示只在组件挂载时执行一次

  return (
    <>
      <div
        className="l_swiper relative w-full overflow-hidden"
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
            transition: transition ? "transform .3s ease-in-out" : "none",
          }}
          className="clearfix flex l_swiper_container h-96"
        >
          {arr.map((src, index) => (
            <img
              key={src}
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
            onClickIndexButton(-1);
          }}
        >
          <ArrowLeftIcon></ArrowLeftIcon>
        </button>
        <button
          className="bg-white/60 rounded-md transition-all hover:bg-white/95 absolute top-1/2 right-0 border block mx-3 px-3 py-3"
          onClick={() => {
            onClickIndexButton(1);
          }}
        >
          <ArrowRightIcon></ArrowRightIcon>
        </button>

        <ul className="flex mx-auto absolute bottom-4 left-1/2 -translate-x-1/2">
          {arr.map((item, index) => (
            <li
              key={item}
              onClick={() => onClickIndexIndicator(index)}
              style={{
                padding: currIndex - 1 == index ? "6px 8px" : "4px 6px",
                background:
                  currIndex - 1 == index ? "rgba(37, 99, 235, 0.8)" : "",
              }}
              className="bg-white/50 rounded-full mx-2"
            ></li>
          ))}
        </ul>
      </div>
      <div>{outerWidth}</div>
      <div>{currIndex}</div>
      <div>{transition ? "true" : "false"}</div>
    </>
  );
}
