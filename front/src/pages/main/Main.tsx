import React, { useEffect, useRef } from "react";
import Banner from "./Banner";
import IntroduceLayout from "./IntroduceLayout";
import ImportantText from "./ImportantText";
import ExplainLayout from "./ExplainLayout";
import SelectLayout from "./SelectLayout";
import { notifyMe } from "../../components/alarm/Alarm";
import * as S from "./MainStyle";

const Main = () => {
  useEffect(() => {
    setInterval(() => {
      notifyMe();
    }, 1800000);
  }, []);

  const rootRef = useRef(null); 
  const bannerRef = useRef(null);
  const introduceRef = useRef(null);
  const explainRefs = useRef([]);
  const selectRef = useRef(null);

  useEffect(()=>{
    const options = {
      root: rootRef.current,
      rootMargin: '-130px',
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry  => {
        if(entry.isIntersecting){
          entry.target.classList.add('active');
        }
      });
    }, options);

    if(bannerRef.current && introduceRef.current && selectRef.current){
      observer.observe(bannerRef.current);
      observer.observe(introduceRef.current);
      observer.observe(selectRef.current);
    }
    observer.observe(explainRefs.current[0]);
    observer.observe(explainRefs.current[1]);
    observer.observe(explainRefs.current[2]);



    return () => {
      observer.disconnect();
    }
  }, []);

  return (
    <S.MainLayout>
      <Banner ref={bannerRef} />
      <IntroduceLayout ref={introduceRef} />
      <ImportantText/>
      <ExplainLayout ref={explainRefs} />
      <SelectLayout ref={selectRef} />
    </S.MainLayout>
  );
};

export default Main;
