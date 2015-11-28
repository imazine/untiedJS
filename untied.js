// 모든 문서 로딩이 끝난 후
window.addEventListener('load', function() {
	
	var
	eventNames =
	
	[ 'blur'
	, 'focus'
	, 'focusin'
	, 'focusout'
	, 'load'
	, 'resize'
	, 'scroll'
	, 'unload'
	, 'click'
	, 'dblclick'
	, 'mousedown'
	, 'mouseup'
	, 'mousemove'
	, 'mouseover'
	, 'mouseout'
	, 'mouseenter'
	, 'mouseleave'
	, 'change'
	, 'select'
	, 'submit'
	, 'keydown'
	, 'keypress'
	, 'keyup'
	, 'error'],
	
	eventNamesLength = eventNames.length,
	eventName,
	i;
	
	for (i = 0; i < eventNamesLength; i += 1) {
		eventName = eventNames[i];
		
		document.body.addEventListener(eventName, function(e) {
			
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
			
		}, false);
	}

}, false);
