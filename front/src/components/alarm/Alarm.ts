import React from "react";
import styled from "styled-components";
import kakao from "../../assets/img/kakaoIcon.png";
import result1 from "../../assets/img/result1.png";
import logo from "../../assets/img/logo.svg";
export function notifyMe() {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification("CHAIR COACH", {
      icon: result1,
      body: "Time to Stretching!",
      requireInteraction: true,
      image: logo,
    });
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification("CHAIR COACH", {
          icon: result1,
          body: "Time to Stretching!",
          requireInteraction: true,
          image: logo,
        });
      }
    });
  }
}
