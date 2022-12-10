import alarmImage from "../../assets/img/result1.png";
import logo from "../../assets/img/logo.svg";
export function notifyMe() {
  const sendNotification = () => {
    var notification = new Notification("CHAIR COACH", {
      icon: alarmImage,
      body: "Time to Stretching!",
      requireInteraction: true,
      image: logo,
    });
  };
  // push alaram 가능한지 체크
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // 승인되었다면
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    sendNotification();
  }

  // 승인안되어있는경우
  else if (Notification.permission !== "denied") {
    Notification.requestPermission(function (permission) {
      // 승인하면,보냄.
      if (permission === "granted") {
        sendNotification();
      }
    });
  }
}
