import React, { useEffect, useRef, useState } from "react";
import Banner from "./Banner";
import IntroduceLayout from "./IntroduceLayout";
import ImportantText from "./ImportantText";
import ExplainLayout from "./ExplainLayout";
import SelectLayout from "./SelectLayout";
import { useRecoilValue } from "recoil";
import userState from "./../../atoms/user";
import { notifyMe } from "../../components/alarm/Alarm";
import * as S from "./MainStyle";
import * as Api from "../../api/api";
import { useRecoilState } from "recoil";
const Main = () => {
  const [user, setUser] = useRecoilState(userState);
  const [alarmTiming, setAlarmTiming] = useState(0);
  const minutes = 60 * 1000;
  Api.get(`users/${user?.id}`).then((res) => {
    res.data.alert === 0 ? setAlarmTiming(0) : setAlarmTiming(res.data.timer);
  });
  useEffect(() => {
    console.log(alarmTiming);
    if (alarmTiming !== 0)
      setInterval(() => {
        notifyMe();
      }, alarmTiming * minutes);
  }, [alarmTiming]);

  const rootRef = useRef(null);
  const bannerRef = useRef(null);
  const introduceRef = useRef(null);
  const explainRefs = useRef([]);
  const selectRef = useRef(null);
  const handleLogin = () => {
    let jwtToken = sessionStorage.getItem("userToken");
    if (!jwtToken) {
      setUser(null);
    }
  };
  useEffect(() => {
    handleLogin();
  }, []);
  useEffect(() => {
    const options = {
      root: rootRef.current,
      rootMargin: "-120px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    }, options);

    if (bannerRef.current && introduceRef.current && selectRef.current) {
      observer.observe(bannerRef.current);
      observer.observe(introduceRef.current);
      observer.observe(selectRef.current);
    }
    observer.observe(explainRefs.current[0]);
    observer.observe(explainRefs.current[1]);
    observer.observe(explainRefs.current[2]);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <S.MainLayout>
      <Banner ref={bannerRef} />
      <IntroduceLayout ref={introduceRef} />
      <ImportantText />
      <ExplainLayout ref={explainRefs} />
      <SelectLayout ref={selectRef} />
    </S.MainLayout>
  );
};

export default Main;
