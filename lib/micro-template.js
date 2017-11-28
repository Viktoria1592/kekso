function template (id, data) {
	var me = arguments.callee; if (!me.cache) me.cache = {};
	if (!me.cache[id]) me.cache[id] = (function () {
		var name = id, string = /^[\w\-]+$/.test(id) ? document.getElementById(id).innerHTML : (name = '(string)', id); // no warnings
		var body =
			"var map = { '&' : '&amp;', '<' : '&lt;', '>' : '&gt;' };" +
			"var ret = ''; with (stash) { ret += '"  +
				string.
				replace(/'/g, '\\x27').
				replace(/^\s*|\s*$/g, '').
				replace(/\n/g, "\\n';\nret += '").
				replace(/<%=raw(.+?)%>/g, "' + ($1) + '").
				replace(/<%=(.+?)%>/g, "' + escapeHTML($1) + '").
				replace(/<%(.+?)%>/g, "'; $1; ret += '") +
			"'; } return ret;" +
			"//@ sourceURL=" + id + "\n" +
			"function escapeHTML (string) { return string.replace(/[&<>]/g, function (_) { return map[_] }); };";
		return new Function("stash", body);
	})();
	return data ? me.cache[id](data) : me.cache[id];
}

window.onload = function () {
	var t = template('tmpl1');
	console.log(t({
		isFoo : !!1,
		foobar : 'foo<b>ar',
		foobaz : 'foo<b>az',
		html : '<b>html</b>'
	}));
	console.log(t({
		isFoo : !!0,
		foobar : 'foo<b>ar',
		foobaz : 'foo<b>az',
		html : '<b>html</b>'
	}));
	console.log(t({
	}));
};