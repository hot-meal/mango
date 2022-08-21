/*
	mango.js
	A tiny javascript templating framework. ~400 bytes gzipped
*/

(function() {

	let templateRegex = /\{\{(([@!]?)(.+?))\}\}(([\s\S]+?)(\{\{:\1\}\}([\s\S]+?))?)\{\{\/\1\}\}/g,
		resultregex = /\{\{([=%])(.+?)\}\}/g;

	const mango = (template) => {
		this.mango = template;
	}

	const clean = (val) => {
		return new Option(val).innerHTML.replace(/"/g,"&quot;");
	}

	const expandValue = (vars, key) => {
		let parts = key.split('.');
		while (parts.length) {
			if (!(parts[0] in vars)) {
				return false;
			}
			vars = vars[parts.shift()];
		}
		return vars;
	}

	const render = (fragment, vars) => {
		return fragment
			.replace(templateRegex, function(_, __, meta, key, inner, if_true, has_else, if_false) {

				let val = expandValue(vars,key), temp = "", i;

				if (!val) {

					// if not
					if (meta == '!') {
						return render(inner, vars);
					}
					// for else
					if (has_else) {
						return render(if_false, vars);
					}

					return "";
				}

				if (!meta) {
					return render(if_true, vars);
				}

				if (meta == '@') {
					_ = vars._key;
					__ = vars._val;
					for (i in val) {
						if (val.hasOwnProperty(i)) {
							vars._key = i;
							vars._val = val[i];
							temp += render(inner, vars);
						}
					}
					vars._key = _;
					vars._val = __;
					return temp;
				}

			})
			.replace(resultregex, function(_, meta, key) {
				let val = expandValue(vars,key);

				if (val || val === 0) {
					return meta == '%' ? clean(val) : val;
				}
				return "";
			});
	}

	mango.prototype.render = function (vars) {
		return render(this.mango, vars);
	};

	window.mango = mango;

})();
