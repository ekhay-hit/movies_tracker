import { useEffect } from "react";
export function useKey(key, action) {
  // useEffect used to close the selected movie when the button escape clicked in the Keyboard
  useEffect(
    function () {
      //function to call when open or remove eventlistner
      function callback(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
        }
      }
      // listening to the event listner
      document.addEventListener("keydown", callback);
      //this will be use to remove event listner so we do not have multiple even created and acumulated a as new movies were selected, so it cleaned up the evenListner as soon as the open selected movie is closed allways return this when an evenlistner excuted
      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [action, key]
  );
}
