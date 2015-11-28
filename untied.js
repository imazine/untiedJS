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
		argsLength = arguments.length,
		eventName,
		eventListeners,
		i, j;
		
		for (eventName in eventListenerMap) {
			if (eventListenerMap.hasOwnProperty(eventName) === true) {
				
				for (i = 0; i < argsLength; i += 1) {
					if (eventName === arguments[i]) {
						
						eventListeners = eventListenerMap[eventName];
						for (j = 0; j < eventListeners.length; j += 1) {
							detachEvent(eventName, eventListeners[j]);
						}
						
						delete eventListenerMap[eventName];
					}
				}
			}
		}
	}
	
	// 이벤트 리스너 등록
	function attachEvent(eventName) {
		
		var eventListener = function(e) {
			
			var
			target = e.target,
			eventName = e.type,
			funcName = target.getAttribute('data-' + eventName),
			funcNameSplits,
			funcNameSplitsLength,
			funcNameSplit,
			func = window,
			i;
			
			if (funcName !== null) {
				funcNameSplits = funcName.split('.');
				funcNameSplitsLength = funcNameSplits.length;
				
				for (i = 0; i < funcNameSplitsLength; i += 1) {
					funcNameSplit = funcNameSplits[i];
					func = func[funcNameSplit];
				}
				
				func(e);
			}
			
		};
		
		document.body.addEventListener(eventName, eventListener, false);
		
		eventListenerMap[eventName].push(eventListener);
	}
	
	// 이벤트 리스너 제거
	function detachEvent(eventName, eventListener) {
		document.body.removeEventListener(eventName, eventListener, false);
	}

	// 모든 문서 로딩이 끝난 후
	window.addEventListener('load', function() {
		
		for (eventName in eventListenerMap) {
			if (eventListenerMap.hasOwnProperty(eventName) === true) {
				attachEvent(eventName);
			}
		}
		
		isReady = true;
	}, false);
	
	UntiedJS.watchEvent = watchEvent;
	UntiedJS.unwatchEvent = unwatchEvent;

})();
