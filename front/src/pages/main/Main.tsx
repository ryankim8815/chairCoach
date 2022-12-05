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

  // const rootRef = useRef(null); 
  const domRef = useRef([]);

  useEffect(()=>{
    // let options = {
    //   root: rootRef.current,
    //   rootMargin: '0px',
    //   threshold: 1.0
    // }

    let observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry  => {
        console.log(entry.boundingClientRect);
        if(entry.isIntersecting){
          console.log(entry.target);
          entry.target.classList.add('active');
        }
      });
    });

    observer.observe(domRef.current[0]);
    observer.observe(domRef.current[1]);
    observer.observe(domRef.current[2]);
    observer.observe(domRef.current[3]);
    observer.observe(domRef.current[4]);
    observer.observe(domRef.current[5]);
  }, []);

  return (
    <S.MainLayout /* ref={rootRef} */>
      <Banner ref={domRef} />
      <IntroduceLayout ref={domRef} />
      <ImportantText/>
      <ExplainLayout ref={domRef} />
      <SelectLayout ref={domRef} />
    </S.MainLayout>
  );
};

export default Main;
