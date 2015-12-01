/**
 * UntiedJS 
 */

var UntiedJS = {};

(function() {

  var
  eventListenerMap = {},
  isReady = false;

  // 추적하고자 하는 이벤트 추가
  function watchEvent() {

    var
    argsLength = arguments.length,
    eventName,
    i;

    for (i = 0; i < argsLength; i += 1) {
      eventName = arguments[i];

      if (eventListenerMap[eventName] === undefined) {
        eventListenerMap[eventName] = [];
      }

      if (isReady === true) {
        attachEvent(eventName);
      }
    }
  }

  // 이벤트 제거
  function unwatchEvent() {

    var
    eventName,
    eventListeners,
    eventListener;

        for (eventName in arguments) {
            eventListeners = eventListenerMap[eventName];
            
            for (eventListener in eventListeners) {
                detachEvent(eventName, eventListeners[eventListener]);
            }
        }
  }

  // 이벤트 리스너 등록
  function attachEvent(eventName) {
        
    var eventListeners = eventListenerMap[eventName] || [];

    var eventListener = function(e) {

      var
      target = e.target,
      targets,
      eventName = e.type,
      funcName,
      funcNameSplits,
      funcNameSplitsLength,
      funcNameSplit,
      func = window,
      i;

      if (target === window) {
        targets = document.querySelectorAll('[data-' + eventName + ']');

        for (i = 0; i < targets.length; i += 1) {
          eventListener({
            target : targets[i],
            type : eventName
          });
        }
      }

      else {

        funcName = target.getAttribute('data-' + eventName);

        if (funcName !== null) {
          funcNameSplits = funcName.split('.');
          funcNameSplitsLength = funcNameSplits.length;

          for (i = 0; i < funcNameSplitsLength; i += 1) {
            funcNameSplit = funcNameSplits[i];
            func = func[funcNameSplit];
          }

          func(e);
        }
      }
    };

    if ('on' + eventName in window) {
      window.addEventListener(eventName, eventListener, false);
    } else {
      document.body.addEventListener(eventName, eventListener, false);
    }

    eventListeners.push(eventListener);
  }

  // 이벤트 리스너 제거
  function detachEvent(eventName, eventListener) {
    document.body.removeEventListener(eventName, eventListener, false);
  }

  // 모든 문서 로딩이 끝난 후
  window.addEventListener('load', function() {
    var eventNames = Object.getOwnPropertyNames(eventListenerMap), eventName;
        
    for (eventName in eventNames) {
      attachEvent(eventNames[eventName]);
    }

    isReady = true;
  }, false);

  UntiedJS.watchEvent = watchEvent;
  UntiedJS.unwatchEvent = unwatchEvent;

})();
