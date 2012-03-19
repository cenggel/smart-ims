// JavaScript Document
var MooTools = {
    'version': '1.2.5',
    'build': '008d8f0f2fcc2044e54fdd3635341aaab274e757'
};
var Native = function(options) {
    options = options || {};
    var name = options.name;
    var legacy = options.legacy;
    var protect = options.protect;
    var methods = options.implement;
    var generics = options.generics;
    var initialize = options.initialize;
    var afterImplement = options.afterImplement || 
    function() {};
    var object = initialize || legacy;
    generics = generics !== false;
    object.constructor = Native;
    object.$family = {
        name: 'native'
    };
    if (legacy && initialize) object.prototype = legacy.prototype;
    object.prototype.constructor = object;
    if (name) {
        var family = name.toLowerCase();
        object.prototype.$family = {
            name: family
        };
        Native.typize(object, family);
    }
    var add = function(obj, name, method, force) {
        if (!protect || force || !obj.prototype[name]) obj.prototype[name] = method;
        if (generics) Native.genericize(obj, name, protect);
        afterImplement.call(obj, name, method);
        return obj;
    };
    object.alias = function(a1, a2, a3) {
        if (typeof a1 == 'string') {
            var pa1 = this.prototype[a1];
            if ((a1 = pa1)) return add(this, a2, a1, a3);
        }
        for (var a in a1) this.alias(a, a1[a], a2);
        return this;
    };
    object.implement = function(a1, a2, a3) {
        if (typeof a1 == 'string') return add(this, a1, a2, a3);
        for (var p in a1) add(this, p, a1[p], a2);
        return this;
    };
    if (methods) object.implement(methods);
    return object;
};
Native.genericize = function(object, property, check) {
    if ((!check || !object[property]) && typeof object.prototype[property] == 'function') object[property] = function() {
        var args = Array.prototype.slice.call(arguments);
        return object.prototype[property].apply(args.shift(), args);
    };
};
Native.implement = function(objects, properties) {
    for (var i = 0, l = objects.length; i < l; i++) objects[i].implement(properties);
};
Native.typize = function(object, family) {
    if (!object.type) object.type = function(item) {
        return ($type(item) === family);
    };
}; (function() {
    var natives = {
        'Array': Array,
        'Date': Date,
        'Function': Function,
        'Number': Number,
        'RegExp': RegExp,
        'String': String
    };
    for (var n in natives) new Native({
        name: n,
        initialize: natives[n],
        protect: true
    });
    var types = {
        'boolean': Boolean,
        'native': Native,
        'object': Object
    };
    for (var t in types) Native.typize(types[t], t);
    var generics = {
        'Array': ["concat", "indexOf", "join", "lastIndexOf", "pop", "push", "reverse", "shift", "slice", "sort", "splice", "toString", "unshift", "valueOf"],
        'String': ["charAt", "charCodeAt", "concat", "indexOf", "lastIndexOf", "match", "replace", "search", "slice", "split", "substr", "substring", "toLowerCase", "toUpperCase", "valueOf"]
    };
    for (var g in generics) {
        for (var i = generics[g].length; i--;) Native.genericize(natives[g], generics[g][i], true);
    }
})();
var Hash = new Native({
    name: 'Hash',
    initialize: function(object) {
        if ($type(object) == 'hash') object = $unlink(object.getClean());
        for (var key in object) this[key] = object[key];
        return this;
    }
});
Hash.implement({
    forEach: function(fn, bind) {
        for (var key in this) {
            if (this.hasOwnProperty(key)) fn.call(bind, this[key], key, this);
        }
    },
    getClean: function() {
        var clean = {};
        for (var key in this) {
            if (this.hasOwnProperty(key)) clean[key] = this[key];
        }
        return clean;
    },
    getLength: function() {
        var length = 0;
        for (var key in this) {
            if (this.hasOwnProperty(key)) length++;
        }
        return length;
    }
});
Hash.alias('forEach', 'each');
Array.implement({
    forEach: function(fn, bind) {
        for (var i = 0, l = this.length; i < l; i++) fn.call(bind, this[i], i, this);
    }
});
Array.alias('forEach', 'each');
function $A(iterable) {
    if (iterable.item) {
        var l = iterable.length,
        array = new Array(l);
        while (l--) array[l] = iterable[l];
        return array;
    }
    return Array.prototype.slice.call(iterable);
};
function $arguments(i) {
    return function() {
        return arguments[i];
    };
};
function $chk(obj) {
    return !! (obj || obj === 0);
};
function $clear(timer) {
    clearTimeout(timer);
    clearInterval(timer);
    return null;
};
function $defined(obj) {
    return (obj != undefined);
};
function $each(iterable, fn, bind) {
    var type = $type(iterable); ((type == 'arguments' || type == 'collection' || type == 'array') ? Array: Hash).each(iterable, fn, bind);
};
function $empty() {};
function $extend(original, extended) {
    for (var key in (extended || {})) original[key] = extended[key];
    return original;
};
function $H(object) {
    return new Hash(object);
};
function $lambda(value) {
    return ($type(value) == 'function') ? value: function() {
        return value;
    };
};
function $merge() {
    var args = Array.slice(arguments);
    args.unshift({});
    return $mixin.apply(null, args);
};
function $mixin(mix) {
    for (var i = 1, l = arguments.length; i < l; i++) {
        var object = arguments[i];
        if ($type(object) != 'object') continue;
        for (var key in object) {
            var op = object[key],
            mp = mix[key];
            mix[key] = (mp && $type(op) == 'object' && $type(mp) == 'object') ? $mixin(mp, op) : $unlink(op);
        }
    }
    return mix;
};
function $pick() {
    for (var i = 0, l = arguments.length; i < l; i++) {
        if (arguments[i] != undefined) return arguments[i];
    }
    return null;
};
function $random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
function $splat(obj) {
    var type = $type(obj);
    return (type) ? ((type != 'array' && type != 'arguments') ? [obj] : obj) : [];
};
var $time = Date.now || 
function() {
    return + new Date;
};
function $try() {
    for (var i = 0, l = arguments.length; i < l; i++) {
        try {
            return arguments[i]();
        } catch(e) {}
    }
    return null;
};
function $type(obj) {
    if (obj == undefined) return false;
    if (obj.$family) return (obj.$family.name == 'number' && !isFinite(obj)) ? false: obj.$family.name;
    if (obj.nodeName) {
        switch (obj.nodeType) {
        case 1:
            return 'element';
        case 3:
            return (/\S/).test(obj.nodeValue) ? 'textnode': 'whitespace';
        }
    } else if (typeof obj.length == 'number') {
        if (obj.callee) return 'arguments';
        else if (obj.item) return 'collection';
    }
    return typeof obj;
};
function $unlink(object) {
    var unlinked;
    switch ($type(object)) {
    case 'object':
        unlinked = {};
        for (var p in object) unlinked[p] = $unlink(object[p]);
        break;
    case 'hash':
        unlinked = new Hash(object);
        break;
    case 'array':
        unlinked = [];
        for (var i = 0, l = object.length; i < l; i++) unlinked[i] = $unlink(object[i]);
        break;
    default:
        return object;
    }
    return unlinked;
};
var Browser = $merge({
    Engine: {
        name: 'unknown',
        version: 0
    },
    Platform: {
        name: (window.orientation != undefined) ? 'ipod': (navigator.platform.match(/mac|win|linux/i) || ['other'])[0].toLowerCase()
    },
    Features: {
        xpath: !!(document.evaluate),
        air: !!(window.runtime),
        query: !!(document.querySelector)
    },
    Plugins: {},
    Engines: {
        presto: function() {
            return (!window.opera) ? false: ((arguments.callee.caller) ? 960: ((document.getElementsByClassName) ? 950: 925));
        },
        trident: function() {
            return (!window.ActiveXObject) ? false: ((window.XMLHttpRequest) ? ((document.querySelectorAll) ? 6: 5) : 4);
        },
        webkit: function() {
            return (navigator.taintEnabled) ? false: ((Browser.Features.xpath) ? ((Browser.Features.query) ? 525: 420) : 419);
        },
        gecko: function() {
            return (!document.getBoxObjectFor && window.mozInnerScreenX == null) ? false: ((document.getElementsByClassName) ? 19: 18);
        }
    }
},
Browser || {});
Browser.Platform[Browser.Platform.name] = true;
Browser.detect = function() {
    for (var engine in this.Engines) {
        var version = this.Engines[engine]();
        if (version) {
            this.Engine = {
                name: engine,
                version: version
            };
            this.Engine[engine] = this.Engine[engine + version] = true;
            break;
        }
    }
    return {
        name: engine,
        version: version
    };
};
Browser.detect();
Browser.Request = function() {
    return $try(function() {
        return new XMLHttpRequest();
    },
    function() {
        return new ActiveXObject('MSXML2.XMLHTTP');
    },
    function() {
        return new ActiveXObject('Microsoft.XMLHTTP');
    });
};
Browser.Features.xhr = !!(Browser.Request());
Browser.Plugins.Flash = (function() {
    var version = ($try(function() {
        return navigator.plugins['Shockwave Flash'].description;
    },
    function() {
        return new ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version');
    }) || '0 r0').match(/\d+/g);
    return {
        version: parseInt(version[0] || 0 + '.' + version[1], 10) || 0,
        build: parseInt(version[2], 10) || 0
    };
})();
function $exec(text) {
    if (!text) return text;
    if (window.execScript) {
        window.execScript(text);
    } else {
        var script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script[(Browser.Engine.webkit && Browser.Engine.version < 420) ? 'innerText': 'text'] = text;
        document.head.appendChild(script);
        document.head.removeChild(script);
    }
    return text;
};
Native.UID = 1;
var $uid = (Browser.Engine.trident) ? 
function(item) {
    return (item.uid || (item.uid = [Native.UID++]))[0];
}: function(item) {
    return item.uid || (item.uid = Native.UID++);
};
var Window = new Native({
    name: 'Window',
    legacy: (Browser.Engine.trident) ? null: window.Window,
    initialize: function(win) {
        $uid(win);
        if (!win.Element) {
            win.Element = $empty;
            if (Browser.Engine.webkit) win.document.createElement("iframe");
            win.Element.prototype = (Browser.Engine.webkit) ? window["[[DOMElement.prototype]]"] : {};
        }
        win.document.window = win;
        return $extend(win, Window.Prototype);
    },
    afterImplement: function(property, value) {
        window[property] = Window.Prototype[property] = value;
    }
});
Window.Prototype = {
    $family: {
        name: 'window'
    }
};
new Window(window);
var Document = new Native({
    name: 'Document',
    legacy: (Browser.Engine.trident) ? null: window.Document,
    initialize: function(doc) {
        $uid(doc);
        doc.head = doc.getElementsByTagName('head')[0];
        doc.html = doc.getElementsByTagName('html')[0];
        if (Browser.Engine.trident && Browser.Engine.version <= 4) $try(function() {
            doc.execCommand("BackgroundImageCache", false, true);
        });
        if (Browser.Engine.trident) doc.window.attachEvent('onunload', 
        function() {
            doc.window.detachEvent('onunload', arguments.callee);
            doc.head = doc.html = doc.window = null;
        });
        return $extend(doc, Document.Prototype);
    },
    afterImplement: function(property, value) {
        document[property] = Document.Prototype[property] = value;
    }
});
Document.Prototype = {
    $family: {
        name: 'document'
    }
};
new Document(document);
Array.implement({
    every: function(fn, bind) {
        for (var i = 0, l = this.length; i < l; i++) {
            if (!fn.call(bind, this[i], i, this)) return false;
        }
        return true;
    },
    filter: function(fn, bind) {
        var results = [];
        for (var i = 0, l = this.length; i < l; i++) {
            if (fn.call(bind, this[i], i, this)) results.push(this[i]);
        }
        return results;
    },
    clean: function() {
        return this.filter($defined);
    },
    indexOf: function(item, from) {
        var len = this.length;
        for (var i = (from < 0) ? Math.max(0, len + from) : from || 0; i < len; i++) {
            if (this[i] === item) return i;
        }
        return - 1;
    },
    map: function(fn, bind) {
        var results = [];
        for (var i = 0, l = this.length; i < l; i++) results[i] = fn.call(bind, this[i], i, this);
        return results;
    },
    some: function(fn, bind) {
        for (var i = 0, l = this.length; i < l; i++) {
            if (fn.call(bind, this[i], i, this)) return true;
        }
        return false;
    },
    associate: function(keys) {
        var obj = {},
        length = Math.min(this.length, keys.length);
        for (var i = 0; i < length; i++) obj[keys[i]] = this[i];
        return obj;
    },
    link: function(object) {
        var result = {};
        for (var i = 0, l = this.length; i < l; i++) {
            for (var key in object) {
                if (object[key](this[i])) {
                    result[key] = this[i];
                    delete object[key];
                    break;
                }
            }
        }
        return result;
    },
    contains: function(item, from) {
        return this.indexOf(item, from) != -1;
    },
    extend: function(array) {
        for (var i = 0, j = array.length; i < j; i++) this.push(array[i]);
        return this;
    },
    getLast: function() {
        return (this.length) ? this[this.length - 1] : null;
    },
    getRandom: function() {
        return (this.length) ? this[$random(0, this.length - 1)] : null;
    },
    include: function(item) {
        if (!this.contains(item)) this.push(item);
        return this;
    },
    combine: function(array) {
        for (var i = 0, l = array.length; i < l; i++) this.include(array[i]);
        return this;
    },
    erase: function(item) {
        for (var i = this.length; i--; i) {
            if (this[i] === item) this.splice(i, 1);
        }
        return this;
    },
    empty: function() {
        this.length = 0;
        return this;
    },
    flatten: function() {
        var array = [];
        for (var i = 0, l = this.length; i < l; i++) {
            var type = $type(this[i]);
            if (!type) continue;
            array = array.concat((type == 'array' || type == 'collection' || type == 'arguments') ? Array.flatten(this[i]) : this[i]);
        }
        return array;
    },
    hexToRgb: function(array) {
        if (this.length != 3) return null;
        var rgb = this.map(function(value) {
            if (value.length == 1) value += value;
            return value.toInt(16);
        });
        return (array) ? rgb: 'rgb(' + rgb + ')';
    },
    rgbToHex: function(array) {
        if (this.length < 3) return null;
        if (this.length == 4 && this[3] == 0 && !array) return 'transparent';
        var hex = [];
        for (var i = 0; i < 3; i++) {
            var bit = (this[i] - 0).toString(16);
            hex.push((bit.length == 1) ? '0' + bit: bit);
        }
        return (array) ? hex: '#' + hex.join('');
    }
});
try {
    delete Function.prototype.bind;
} catch(e) {}
Function.implement({
    extend: function(properties) {
        for (var property in properties) this[property] = properties[property];
        return this;
    },
    create: function(options) {
        var self = this;
        options = options || {};
        return function(event) {
            var args = options.arguments;
            args = (args != undefined) ? $splat(args) : Array.slice(arguments, (options.event) ? 1: 0);
            if (options.event) args = [event || window.event].extend(args);
            var returns = function() {
                return self.apply(options.bind || null, args);
            };
            if (options.delay) return setTimeout(returns, options.delay);
            if (options.periodical) return setInterval(returns, options.periodical);
            if (options.attempt) return $try(returns);
            return returns();
        };
    },
    run: function(args, bind) {
        return this.apply(bind, $splat(args));
    },
    pass: function(args, bind) {
        return this.create({
            bind: bind,
            arguments: args
        });
    },
    bind: function(bind, args) {
        return this.create({
            bind: bind,
            arguments: args
        });
    },
    bindWithEvent: function(bind, args) {
        return this.create({
            bind: bind,
            arguments: args,
            event: true
        });
    },
    attempt: function(args, bind) {
        return this.create({
            bind: bind,
            arguments: args,
            attempt: true
        })();
    },
    delay: function(delay, bind, args) {
        return this.create({
            bind: bind,
            arguments: args,
            delay: delay
        })();
    },
    periodical: function(periodical, bind, args) {
        return this.create({
            bind: bind,
            arguments: args,
            periodical: periodical
        })();
    }
});
Number.implement({
    limit: function(min, max) {
        return Math.min(max, Math.max(min, this));
    },
    round: function(precision) {
        precision = Math.pow(10, precision || 0);
        return Math.round(this * precision) / precision;
    },
    times: function(fn, bind) {
        for (var i = 0; i < this; i++) fn.call(bind, i, this);
    },
    toFloat: function() {
        return parseFloat(this);
    },
    toInt: function(base) {
        return parseInt(this, base || 10);
    }
});
Number.alias('times', 'each'); (function(math) {
    var methods = {};
    math.each(function(name) {
        if (!Number[name]) methods[name] = function() {
            return Math[name].apply(null, [this].concat($A(arguments)));
        };
    });
    Number.implement(methods);
})(['abs', 'acos', 'asin', 'atan', 'atan2', 'ceil', 'cos', 'exp', 'floor', 'log', 'max', 'min', 'pow', 'sin', 'sqrt', 'tan']);
String.implement({
    test: function(regex, params) {
        return ((typeof regex == 'string') ? new RegExp(regex, params) : regex).test(this);
    },
    contains: function(string, separator) {
        return (separator) ? (separator + this + separator).indexOf(separator + string + separator) > -1: this.indexOf(string) > -1;
    },
    trim: function() {
        return this.replace(/^\s+|\s+$/g, '');
    },
    clean: function() {
        return this.replace(/\s+/g, ' ').trim();
    },
    camelCase: function() {
        return this.replace(/-\D/g, 
        function(match) {
            return match.charAt(1).toUpperCase();
        });
    },
    hyphenate: function() {
        return this.replace(/[A-Z]/g, 
        function(match) {
            return ('-' + match.charAt(0).toLowerCase());
        });
    },
    capitalize: function() {
        return this.replace(/\b[a-z]/g, 
        function(match) {
            return match.toUpperCase();
        });
    },
    escapeRegExp: function() {
        return this.replace(/([-.*+?^${}()|[\]\/\\])/g, '\\$1');
    },
    toInt: function(base) {
        return parseInt(this, base || 10);
    },
    toFloat: function() {
        return parseFloat(this);
    },
    hexToRgb: function(array) {
        var hex = this.match(/^#?(\w{1,2})(\w{1,2})(\w{1,2})$/);
        return (hex) ? hex.slice(1).hexToRgb(array) : null;
    },
    rgbToHex: function(array) {
        var rgb = this.match(/\d{1,3}/g);
        return (rgb) ? rgb.rgbToHex(array) : null;
    },
    stripScripts: function(option) {
        var scripts = '';
        var text = this.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, 
        function() {
            scripts += arguments[1] + '\n';
            return '';
        });
        if (option === true) $exec(scripts);
        else if ($type(option) == 'function') option(scripts, text);
        return text;
    },
    substitute: function(object, regexp) {
        return this.replace(regexp || (/\\?\{([^{}]+)\}/g), 
        function(match, name) {
            if (match.charAt(0) == '\\') return match.slice(1);
            return (object[name] != undefined) ? object[name] : '';
        });
    }
});
Hash.implement({
    has: Object.prototype.hasOwnProperty,
    keyOf: function(value) {
        for (var key in this) {
            if (this.hasOwnProperty(key) && this[key] === value) return key;
        }
        return null;
    },
    hasValue: function(value) {
        return (Hash.keyOf(this, value) !== null);
    },
    extend: function(properties) {
        Hash.each(properties || {},
        function(value, key) {
            Hash.set(this, key, value);
        },
        this);
        return this;
    },
    combine: function(properties) {
        Hash.each(properties || {},
        function(value, key) {
            Hash.include(this, key, value);
        },
        this);
        return this;
    },
    erase: function(key) {
        if (this.hasOwnProperty(key)) delete this[key];
        return this;
    },
    get: function(key) {
        return (this.hasOwnProperty(key)) ? this[key] : null;
    },
    set: function(key, value) {
        if (!this[key] || this.hasOwnProperty(key)) this[key] = value;
        return this;
    },
    empty: function() {
        Hash.each(this, 
        function(value, key) {
            delete this[key];
        },
        this);
        return this;
    },
    include: function(key, value) {
        if (this[key] == undefined) this[key] = value;
        return this;
    },
    map: function(fn, bind) {
        var results = new Hash;
        Hash.each(this, 
        function(value, key) {
            results.set(key, fn.call(bind, value, key, this));
        },
        this);
        return results;
    },
    filter: function(fn, bind) {
        var results = new Hash;
        Hash.each(this, 
        function(value, key) {
            if (fn.call(bind, value, key, this)) results.set(key, value);
        },
        this);
        return results;
    },
    every: function(fn, bind) {
        for (var key in this) {
            if (this.hasOwnProperty(key) && !fn.call(bind, this[key], key)) return false;
        }
        return true;
    },
    some: function(fn, bind) {
        for (var key in this) {
            if (this.hasOwnProperty(key) && fn.call(bind, this[key], key)) return true;
        }
        return false;
    },
    getKeys: function() {
        var keys = [];
        Hash.each(this, 
        function(value, key) {
            keys.push(key);
        });
        return keys;
    },
    getValues: function() {
        var values = [];
        Hash.each(this, 
        function(value) {
            values.push(value);
        });
        return values;
    },
    toQueryString: function(base) {
        var queryString = [];
        Hash.each(this, 
        function(value, key) {
            if (base) key = base + '[' + key + ']';
            var result;
            switch ($type(value)) {
            case 'object':
                result = Hash.toQueryString(value, key);
                break;
            case 'array':
                var qs = {};
                value.each(function(val, i) {
                    qs[i] = val;
                });
                result = Hash.toQueryString(qs, key);
                break;
            default:
                result = key + '=' + encodeURIComponent(value);
            }
            if (value != undefined) queryString.push(result);
        });
        return queryString.join('&');
    }
});
Hash.alias({
    keyOf: 'indexOf',
    hasValue: 'contains'
});
var Event = new Native({
    name: 'Event',
    initialize: function(event, win) {
        win = win || window;
        var doc = win.document;
        event = event || win.event;
        if (event.$extended) return event;
        this.$extended = true;
        var type = event.type;
        var target = event.target || event.srcElement;
        while (target && target.nodeType == 3) target = target.parentNode;
        if (type.test(/key/)) {
            var code = event.which || event.keyCode;
            var key = Event.Keys.keyOf(code);
            if (type == 'keydown') {
                var fKey = code - 111;
                if (fKey > 0 && fKey < 13) key = 'f' + fKey;
            }
            key = key || String.fromCharCode(code).toLowerCase();
        } else if (type.match(/(click|mouse|menu)/i)) {
            doc = (!doc.compatMode || doc.compatMode == 'CSS1Compat') ? doc.html: doc.body;
            var page = {
                x: event.pageX || event.clientX + doc.scrollLeft,
                y: event.pageY || event.clientY + doc.scrollTop
            };
            var client = {
                x: (event.pageX) ? event.pageX - win.pageXOffset: event.clientX,
                y: (event.pageY) ? event.pageY - win.pageYOffset: event.clientY
            };
            if (type.match(/DOMMouseScroll|mousewheel/)) {
                var wheel = (event.wheelDelta) ? event.wheelDelta / 120: -(event.detail || 0) / 3;
            }
            var rightClick = (event.which == 3) || (event.button == 2);
            var related = null;
            if (type.match(/over|out/)) {
                switch (type) {
                case 'mouseover':
                    related = event.relatedTarget || event.fromElement;
                    break;
                case 'mouseout':
                    related = event.relatedTarget || event.toElement;
                }
                if (! (function() {
                    while (related && related.nodeType == 3) related = related.parentNode;
                    return true;
                }).create({
                    attempt: Browser.Engine.gecko
                })()) related = false;
            }
        }
        return $extend(this, {
            event: event,
            type: type,
            page: page,
            client: client,
            rightClick: rightClick,
            wheel: wheel,
            relatedTarget: related,
            target: target,
            code: code,
            key: key,
            shift: event.shiftKey,
            control: event.ctrlKey,
            alt: event.altKey,
            meta: event.metaKey
        });
    }
});
Event.Keys = new Hash({
    'enter': 13,
    'up': 38,
    'down': 40,
    'left': 37,
    'right': 39,
    'esc': 27,
    'space': 32,
    'backspace': 8,
    'tab': 9,
    'delete': 46
});
Event.implement({
    stop: function() {
        return this.stopPropagation().preventDefault();
    },
    stopPropagation: function() {
        if (this.event.stopPropagation) this.event.stopPropagation();
        else this.event.cancelBubble = true;
        return this;
    },
    preventDefault: function() {
        if (this.event.preventDefault) this.event.preventDefault();
        else this.event.returnValue = false;
        return this;
    }
});
function Class(params) {
    if (params instanceof Function) params = {
        initialize: params
    };
    var newClass = function() {
        Object.reset(this);
        if (newClass._prototyping) return this;
        this._current = $empty;
        var value = (this.initialize) ? this.initialize.apply(this, arguments) : this;
        delete this._current;
        delete this.caller;
        return value;
    }.extend(this);
    newClass.implement(params);
    newClass.constructor = Class;
    newClass.prototype.constructor = newClass;
    return newClass;
};
Function.prototype.protect = function() {
    this._protected = true;
    return this;
};
Object.reset = function(object, key) {
    if (key == null) {
        for (var p in object) Object.reset(object, p);
        return object;
    }
    delete object[key];
    switch ($type(object[key])) {
    case 'object':
        var F = function() {};
        F.prototype = object[key];
        var i = new F;
        object[key] = Object.reset(i);
        break;
    case 'array':
        object[key] = $unlink(object[key]);
        break;
    }
    return object;
};
new Native({
    name: 'Class',
    initialize: Class
}).extend({
    instantiate: function(F) {
        F._prototyping = true;
        var proto = new F;
        delete F._prototyping;
        return proto;
    },
    wrap: function(self, key, method) {
        if (method._origin) method = method._origin;
        return function() {
            if (method._protected && this._current == null) throw new Error('The method "' + key + '" cannot be called.');
            var caller = this.caller,
            current = this._current;
            this.caller = current;
            this._current = arguments.callee;
            var result = method.apply(this, arguments);
            this._current = current;
            this.caller = caller;
            return result;
        }.extend({
            _owner: self,
            _origin: method,
            _name: key
        });
    }
});
Class.implement({
    implement: function(key, value) {
        if ($type(key) == 'object') {
            for (var p in key) this.implement(p, key[p]);
            return this;
        }
        var mutator = Class.Mutators[key];
        if (mutator) {
            value = mutator.call(this, value);
            if (value == null) return this;
        }
        var proto = this.prototype;
        switch ($type(value)) {
        case 'function':
            if (value._hidden) return this;
            proto[key] = Class.wrap(this, key, value);
            break;
        case 'object':
            var previous = proto[key];
            if ($type(previous) == 'object') $mixin(previous, value);
            else proto[key] = $unlink(value);
            break;
        case 'array':
            proto[key] = $unlink(value);
            break;
        default:
            proto[key] = value;
        }
        return this;
    }
});
Class.Mutators = {
    Extends: function(parent) {
        this.parent = parent;
        this.prototype = Class.instantiate(parent);
        this.implement('parent', 
        function() {
            var name = this.caller._name,
            previous = this.caller._owner.parent.prototype[name];
            if (!previous) throw new Error('The method "' + name + '" has no parent.');
            return previous.apply(this, arguments);
        }.protect());
    },
    Implements: function(items) {
        $splat(items).each(function(item) {
            if (item instanceof Function) item = Class.instantiate(item);
            this.implement(item);
        },
        this);
    }
};
var Chain = new Class({
    $chain: [],
    chain: function() {
        this.$chain.extend(Array.flatten(arguments));
        return this;
    },
    callChain: function() {
        return (this.$chain.length) ? this.$chain.shift().apply(this, arguments) : false;
    },
    clearChain: function() {
        this.$chain.empty();
        return this;
    }
});
var Events = new Class({
    $events: {},
    addEvent: function(type, fn, internal) {
        type = Events.removeOn(type);
        if (fn != $empty) {
            this.$events[type] = this.$events[type] || [];
            this.$events[type].include(fn);
            if (internal) fn.internal = true;
        }
        return this;
    },
    addEvents: function(events) {
        for (var type in events) this.addEvent(type, events[type]);
        return this;
    },
    fireEvent: function(type, args, delay) {
        type = Events.removeOn(type);
        if (!this.$events || !this.$events[type]) return this;
        this.$events[type].each(function(fn) {
            fn.create({
                'bind': this,
                'delay': delay,
                'arguments': args
            })();
        },
        this);
        return this;
    },
    removeEvent: function(type, fn) {
        type = Events.removeOn(type);
        if (!this.$events[type]) return this;
        if (!fn.internal) this.$events[type].erase(fn);
        return this;
    },
    removeEvents: function(events) {
        var type;
        if ($type(events) == 'object') {
            for (type in events) this.removeEvent(type, events[type]);
            return this;
        }
        if (events) events = Events.removeOn(events);
        for (type in this.$events) {
            if (events && events != type) continue;
            var fns = this.$events[type];
            for (var i = fns.length; i--; i) this.removeEvent(type, fns[i]);
        }
        return this;
    }
});
Events.removeOn = function(string) {
    return string.replace(/^on([A-Z])/, 
    function(full, first) {
        return first.toLowerCase();
    });
};
var Options = new Class({
    setOptions: function() {
        this.options = $merge.run([this.options].extend(arguments));
        if (!this.addEvent) return this;
        for (var option in this.options) {
            if ($type(this.options[option]) != 'function' || !(/^on[A-Z]/).test(option)) continue;
            this.addEvent(option, this.options[option]);
            delete this.options[option];
        }
        return this;
    }
});
var Element = new Native({
    name: 'Element',
    legacy: window.Element,
    initialize: function(tag, props) {
        var konstructor = Element.Constructors.get(tag);
        if (konstructor) return konstructor(props);
        if (typeof tag == 'string') return document.newElement(tag, props);
        return document.id(tag).set(props);
    },
    afterImplement: function(key, value) {
        Element.Prototype[key] = value;
        if (Array[key]) return;
        Elements.implement(key, 
        function() {
            var items = [],
            elements = true;
            for (var i = 0, j = this.length; i < j; i++) {
                var returns = this[i][key].apply(this[i], arguments);
                items.push(returns);
                if (elements) elements = ($type(returns) == 'element');
            }
            return (elements) ? new Elements(items) : items;
        });
    }
});
Element.Prototype = {
    $family: {
        name: 'element'
    }
};
Element.Constructors = new Hash;
var IFrame = new Native({
    name: 'IFrame',
    generics: false,
    initialize: function() {
        var params = Array.link(arguments, {
            properties: Object.type,
            iframe: $defined
        });
        var props = params.properties || {};
        var iframe = document.id(params.iframe);
        var onload = props.onload || $empty;
        delete props.onload;
        props.id = props.name = $pick(props.id, props.name, iframe ? (iframe.id || iframe.name) : 'IFrame_' + $time());
        iframe = new Element(iframe || 'iframe', props);
        var onFrameLoad = function() {
            var host = $try(function() {
                return iframe.contentWindow.location.host;
            });
            if (!host || host == window.location.host) {}
        };
        var contentWindow = $try(function() {
            return iframe.contentWindow;
        }); ((contentWindow && contentWindow.document.body) || window.frames[props.id]) ? onFrameLoad() : iframe.addListener('load', onFrameLoad);
        return iframe;
    }
});
var Elements = new Native({
    initialize: function(elements, options) {
        options = $extend({
            ddup: true,
            cash: true
        },
        options);
        elements = elements || [];
        if (options.ddup || options.cash) {
            var uniques = {},
            returned = [];
            for (var i = 0, l = elements.length; i < l; i++) {
                var el = document.id(elements[i], !options.cash);
                if (options.ddup) {
                    if (uniques[el.uid]) continue;
                    uniques[el.uid] = true;
                }
                if (el) returned.push(el);
            }
            elements = returned;
        }
        return (options.cash) ? $extend(elements, this) : elements;
    }
});
Elements.implement({
    filter: function(filter, bind) {
        if (!filter) return this;
        return new Elements(Array.filter(this, (typeof filter == 'string') ? 
        function(item) {
            return item.match(filter);
        }: filter, bind));
    }
}); (function() {
    var createElementAcceptsHTML;
    try {
        var x = document.createElement('<input name=x>');
        createElementAcceptsHTML = (x.name == 'x');
    } catch(e) {}
    var escapeQuotes = function(html) {
        return ('' + html).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
    };
    Document.implement({
        newElement: function(tag, props) {
            if (props && props.checked != null) props.defaultChecked = props.checked;
            if (createElementAcceptsHTML && props) {
                tag = '<' + tag;
                if (props.name) tag += ' name="' + escapeQuotes(props.name) + '"';
                if (props.type) tag += ' type="' + escapeQuotes(props.type) + '"';
                tag += '>';
                delete props.name;
                delete props.type;
            }
            return this.id(this.createElement(tag)).set(props);
        },
        newTextNode: function(text) {
            return this.createTextNode(text);
        },
        getDocument: function() {
            return this;
        },
        getWindow: function() {
            return this.window;
        },
        id: (function() {
            var types = {
                string: function(id, nocash, doc) {
                    id = doc.getElementById(id);
                    return (id) ? types.element(id, nocash) : null;
                },
                element: function(el, nocash) {
                    $uid(el);
                    if (!nocash && !el.$family && !(/^object|embed$/i).test(el.tagName)) {
                        var proto = Element.Prototype;
                        for (var p in proto) el[p] = proto[p];
                    };
                    return el;
                },
                object: function(obj, nocash, doc) {
                    if (obj.toElement) return types.element(obj.toElement(doc), nocash);
                    return null;
                }
            };
            types.textnode = types.whitespace = types.window = types.document = $arguments(0);
            return function(el, nocash, doc) {
                if (el && el.$family && el.uid) return el;
                var type = $type(el);
                return (types[type]) ? types[type](el, nocash, doc || document) : null;
            };
        })()
    });
})();
if (window.$ == null) Window.implement({
    $: function(el, nc) {
        return document.id(el, nc, this.document);
    }
});
Window.implement({
    $$: function(selector) {
        if (arguments.length == 1 && typeof selector == 'string') return this.document.getElements(selector);
        var elements = [];
        var args = Array.flatten(arguments);
        for (var i = 0, l = args.length; i < l; i++) {
            var item = args[i];
            switch ($type(item)) {
            case 'element':
                elements.push(item);
                break;
            case 'string':
                elements.extend(this.document.getElements(item, true));
            }
        }
        return new Elements(elements);
    },
    getDocument: function() {
        return this.document;
    },
    getWindow: function() {
        return this;
    }
});
Native.implement([Element, Document], {
    getElement: function(selector, nocash) {
        return document.id(this.getElements(selector, true)[0] || null, nocash);
    },
    getElements: function(tags, nocash) {
        tags = tags.split(',');
        var elements = [];
        var ddup = (tags.length > 1);
        tags.each(function(tag) {
            var partial = this.getElementsByTagName(tag.trim()); (ddup) ? elements.extend(partial) : elements = partial;
        },
        this);
        return new Elements(elements, {
            ddup: ddup,
            cash: !nocash
        });
    }
}); (function() {
    var collected = {},
    storage = {};
    var props = {
        input: 'checked',
        option: 'selected',
        textarea: (Browser.Engine.webkit && Browser.Engine.version < 420) ? 'innerHTML': 'value'
    };
    var get = function(uid) {
        return (storage[uid] || (storage[uid] = {}));
    };
    var clean = function(item, retain) {
        if (!item) return;
        var uid = item.uid;
        if (retain !== true) retain = false;
        if (Browser.Engine.trident) {
            if (item.clearAttributes) {
                var clone = retain && item.cloneNode(false);
                item.clearAttributes();
                if (clone) item.mergeAttributes(clone);
            } else if (item.removeEvents) {
                item.removeEvents();
            }
            if ((/object/i).test(item.tagName)) {
                for (var p in item) {
                    if (typeof item[p] == 'function') item[p] = $empty;
                }
                Element.dispose(item);
            }
        }
        if (!uid) return;
        collected[uid] = storage[uid] = null;
    };
    var purge = function() {
        Hash.each(collected, clean);
        if (Browser.Engine.trident) $A(document.getElementsByTagName('object')).each(clean);
        if (window.CollectGarbage) CollectGarbage();
        collected = storage = null;
    };
    var walk = function(element, walk, start, match, all, nocash) {
        var el = element[start || walk];
        var elements = [];
        while (el) {
            if (el.nodeType == 1 && (!match || Element.match(el, match))) {
                if (!all) return document.id(el, nocash);
                elements.push(el);
            }
            el = el[walk];
        }
        return (all) ? new Elements(elements, {
            ddup: false,
            cash: !nocash
        }) : null;
    };
    var attributes = {
        'html': 'innerHTML',
        'class': 'className',
        'for': 'htmlFor',
        'defaultValue': 'defaultValue',
        'text': (Browser.Engine.trident || (Browser.Engine.webkit && Browser.Engine.version < 420)) ? 'innerText': 'textContent'
    };
    var bools = ['compact', 'nowrap', 'ismap', 'declare', 'noshade', 'checked', 'disabled', 'readonly', 'multiple', 'selected', 'noresize', 'defer'];
    var camels = ['value', 'type', 'defaultValue', 'accessKey', 'cellPadding', 'cellSpacing', 'colSpan', 'frameBorder', 'maxLength', 'readOnly', 'rowSpan', 'tabIndex', 'useMap'];
    bools = bools.associate(bools);
    Hash.extend(attributes, bools);
    Hash.extend(attributes, camels.associate(camels.map(String.toLowerCase)));
    var inserters = {
        before: function(context, element) {
            if (element.parentNode) element.parentNode.insertBefore(context, element);
        },
        after: function(context, element) {
            if (!element.parentNode) return;
            var next = element.nextSibling; (next) ? element.parentNode.insertBefore(context, next) : element.parentNode.appendChild(context);
        },
        bottom: function(context, element) {
            element.appendChild(context);
        },
        top: function(context, element) {
            var first = element.firstChild; (first) ? element.insertBefore(context, first) : element.appendChild(context);
        }
    };
    inserters.inside = inserters.bottom;
    Hash.each(inserters, 
    function(inserter, where) {
        where = where.capitalize();
        Element.implement('inject' + where, 
        function(el) {
            inserter(this, document.id(el, true));
            return this;
        });
        Element.implement('grab' + where, 
        function(el) {
            inserter(document.id(el, true), this);
            return this;
        });
    });
    Element.implement({
        set: function(prop, value) {
            switch ($type(prop)) {
            case 'object':
                for (var p in prop) this.set(p, prop[p]);
                break;
            case 'string':
                var property = Element.Properties.get(prop); (property && property.set) ? property.set.apply(this, Array.slice(arguments, 1)) : this.setProperty(prop, value);
            }
            return this;
        },
        get: function(prop) {
            var property = Element.Properties.get(prop);
            return (property && property.get) ? property.get.apply(this, Array.slice(arguments, 1)) : this.getProperty(prop);
        },
        erase: function(prop) {
            var property = Element.Properties.get(prop); (property && property.erase) ? property.erase.apply(this) : this.removeProperty(prop);
            return this;
        },
        setProperty: function(attribute, value) {
            var key = attributes[attribute];
            if (value == undefined) return this.removeProperty(attribute);
            if (key && bools[attribute]) value = !!value; (key) ? this[key] = value: this.setAttribute(attribute, '' + value);
            return this;
        },
        setProperties: function(attributes) {
            for (var attribute in attributes) this.setProperty(attribute, attributes[attribute]);
            return this;
        },
        getProperty: function(attribute) {
            var key = attributes[attribute];
            var value = (key) ? this[key] : this.getAttribute(attribute, 2);
            return (bools[attribute]) ? !!value: (key) ? value: value || null;
        },
        getProperties: function() {
            var args = $A(arguments);
            return args.map(this.getProperty, this).associate(args);
        },
        removeProperty: function(attribute) {
            var key = attributes[attribute]; (key) ? this[key] = (key && bools[attribute]) ? false: '': this.removeAttribute(attribute);
            return this;
        },
        removeProperties: function() {
            Array.each(arguments, this.removeProperty, this);
            return this;
        },
        hasClass: function(className) {
            return this.className.contains(className, ' ');
        },
        addClass: function(className) {
            if (!this.hasClass(className)) this.className = (this.className + ' ' + className).clean();
            return this;
        },
        removeClass: function(className) {
            this.className = this.className.replace(new RegExp('(^|\\s)' + className + '(?:\\s|$)'), '$1');
            return this;
        },
        toggleClass: function(className) {
            return this.hasClass(className) ? this.removeClass(className) : this.addClass(className);
        },
        adopt: function() {
            Array.flatten(arguments).each(function(element) {
                element = document.id(element, true);
                if (element) this.appendChild(element);
            },
            this);
            return this;
        },
        appendText: function(text, where) {
            return this.grab(this.getDocument().newTextNode(text), where);
        },
        grab: function(el, where) {
            inserters[where || 'bottom'](document.id(el, true), this);
            return this;
        },
        inject: function(el, where) {
            inserters[where || 'bottom'](this, document.id(el, true));
            return this;
        },
        replaces: function(el) {
            el = document.id(el, true);
            el.parentNode.replaceChild(this, el);
            return this;
        },
        wraps: function(el, where) {
            el = document.id(el, true);
            return this.replaces(el).grab(el, where);
        },
        getPrevious: function(match, nocash) {
            return walk(this, 'previousSibling', null, match, false, nocash);
        },
        getAllPrevious: function(match, nocash) {
            return walk(this, 'previousSibling', null, match, true, nocash);
        },
        getNext: function(match, nocash) {
            return walk(this, 'nextSibling', null, match, false, nocash);
        },
        getAllNext: function(match, nocash) {
            return walk(this, 'nextSibling', null, match, true, nocash);
        },
        getFirst: function(match, nocash) {
            return walk(this, 'nextSibling', 'firstChild', match, false, nocash);
        },
        getLast: function(match, nocash) {
            return walk(this, 'previousSibling', 'lastChild', match, false, nocash);
        },
        getParent: function(match, nocash) {
            return walk(this, 'parentNode', null, match, false, nocash);
        },
        getParents: function(match, nocash) {
            return walk(this, 'parentNode', null, match, true, nocash);
        },
        getSiblings: function(match, nocash) {
            return this.getParent().getChildren(match, nocash).erase(this);
        },
        getChildren: function(match, nocash) {
            return walk(this, 'nextSibling', 'firstChild', match, true, nocash);
        },
        getWindow: function() {
            return this.ownerDocument.window;
        },
        getDocument: function() {
            return this.ownerDocument;
        },
        getElementById: function(id, nocash) {
            var el = this.ownerDocument.getElementById(id);
            if (!el) return null;
            for (var parent = el.parentNode; parent != this; parent = parent.parentNode) {
                if (!parent) return null;
            }
            return document.id(el, nocash);
        },
        getSelected: function() {
            return new Elements($A(this.options).filter(function(option) {
                return option.selected;
            }));
        },
        getComputedStyle: function(property) {
            if (this.currentStyle) return this.currentStyle[property.camelCase()];
            var computed = this.getDocument().defaultView.getComputedStyle(this, null);
            return (computed) ? computed.getPropertyValue([property.hyphenate()]) : null;
        },
        toQueryString: function() {
            var queryString = [];
            this.getElements('input, select, textarea', true).each(function(el) {
                if (!el.name || el.disabled || el.type == 'submit' || el.type == 'reset' || el.type == 'file') return;
                var value = (el.tagName.toLowerCase() == 'select') ? Element.getSelected(el).map(function(opt) {
                    return opt.value;
                }) : ((el.type == 'radio' || el.type == 'checkbox') && !el.checked) ? null: el.value;
                $splat(value).each(function(val) {
                    if (typeof val != 'undefined') queryString.push(el.name + '=' + encodeURIComponent(val));
                });
            });
            return queryString.join('&');
        },
        clone: function(contents, keepid) {
            contents = contents !== false;
            var clone = this.cloneNode(contents);
            var clean = function(node, element) {
                if (!keepid) node.removeAttribute('id');
                if (Browser.Engine.trident) {
                    node.clearAttributes();
                    node.mergeAttributes(element);
                    node.removeAttribute('uid');
                    if (node.options) {
                        var no = node.options,
                        eo = element.options;
                        for (var j = no.length; j--;) no[j].selected = eo[j].selected;
                    }
                }
                var prop = props[element.tagName.toLowerCase()];
                if (prop && element[prop]) node[prop] = element[prop];
            };
            if (contents) {
                var ce = clone.getElementsByTagName('*'),
                te = this.getElementsByTagName('*');
                for (var i = ce.length; i--;) clean(ce[i], te[i]);
            }
            clean(clone, this);
            return document.id(clone);
        },
        destroy: function() {
            Element.empty(this);
            Element.dispose(this);
            clean(this, true);
            return null;
        },
        empty: function() {
            $A(this.childNodes).each(function(node) {
                Element.destroy(node);
            });
            return this;
        },
        dispose: function() {
            return (this.parentNode) ? this.parentNode.removeChild(this) : this;
        },
        hasChild: function(el) {
            el = document.id(el, true);
            if (!el) return false;
            if (Browser.Engine.webkit && Browser.Engine.version < 420) return $A(this.getElementsByTagName(el.tagName)).contains(el);
            return (this.contains) ? (this != el && this.contains(el)) : !!(this.compareDocumentPosition(el) & 16);
        },
        match: function(tag) {
            return (!tag || (tag == this) || (Element.get(this, 'tag') == tag));
        }
    });
    Native.implement([Element, Window, Document], {
        addListener: function(type, fn) {
            if (type == 'unload') {
                var old = fn,
                self = this;
                fn = function() {
                    self.removeListener('unload', fn);
                    old();
                };
            } else {
                collected[this.uid] = this;
            }
            if (this.addEventListener) this.addEventListener(type, fn, false);
            else this.attachEvent('on' + type, fn);
            return this;
        },
        removeListener: function(type, fn) {
            if (this.removeEventListener) this.removeEventListener(type, fn, false);
            else this.detachEvent('on' + type, fn);
            return this;
        },
        retrieve: function(property, dflt) {
            var storage = get(this.uid),
            prop = storage[property];
            if (dflt != undefined && prop == undefined) prop = storage[property] = dflt;
            return $pick(prop);
        },
        store: function(property, value) {
            var storage = get(this.uid);
            storage[property] = value;
            return this;
        },
        eliminate: function(property) {
            var storage = get(this.uid);
            delete storage[property];
            return this;
        }
    });
    window.addListener('unload', purge);
})();
Element.Properties = new Hash;
Element.Properties.style = {
    set: function(style) {
        this.style.cssText = style;
    },
    get: function() {
        return this.style.cssText;
    },
    erase: function() {
        this.style.cssText = '';
    }
};
Element.Properties.tag = {
    get: function() {
        return this.tagName.toLowerCase();
    }
};
Element.Properties.html = (function() {
    var wrapper = document.createElement('div');
    var translations = {
        table: [1, '<table>', '</table>'],
        select: [1, '<select>', '</select>'],
        tbody: [2, '<table><tbody>', '</tbody></table>'],
        tr: [3, '<table><tbody><tr>', '</tr></tbody></table>']
    };
    translations.thead = translations.tfoot = translations.tbody;
    var html = {
        set: function() {
            var html = Array.flatten(arguments).join('');
            var wrap = Browser.Engine.trident && translations[this.get('tag')];
            if (wrap) {
                var first = wrapper;
                first.innerHTML = wrap[1] + html + wrap[2];
                for (var i = wrap[0]; i--;) first = first.firstChild;
                this.empty().adopt(first.childNodes);
            } else {
                this.innerHTML = html;
            }
        }
    };
    html.erase = html.set;
    return html;
})();
if (Browser.Engine.webkit && Browser.Engine.version < 420) Element.Properties.text = {
    get: function() {
        if (this.innerText) return this.innerText;
        var temp = this.ownerDocument.newElement('div', {
            html: this.innerHTML
        }).inject(this.ownerDocument.body);
        var text = temp.innerText;
        temp.destroy();
        return text;
    }
};
Element.Properties.events = {
    set: function(events) {
        this.addEvents(events);
    }
};
Native.implement([Element, Window, Document], {
    addEvent: function(type, fn) {
        var events = this.retrieve('events', {});
        events[type] = events[type] || {
            'keys': [],
            'values': []
        };
        if (events[type].keys.contains(fn)) return this;
        events[type].keys.push(fn);
        var realType = type,
        custom = Element.Events.get(type),
        condition = fn,
        self = this;
        if (custom) {
            if (custom.onAdd) custom.onAdd.call(this, fn);
            if (custom.condition) {
                condition = function(event) {
                    if (custom.condition.call(this, event)) return fn.call(this, event);
                    return true;
                };
            }
            realType = custom.base || realType;
        }
        var defn = function() {
            return fn.call(self);
        };
        var nativeEvent = Element.NativeEvents[realType];
        if (nativeEvent) {
            if (nativeEvent == 2) {
                defn = function(event) {
                    event = new Event(event, self.getWindow());
                    if (condition.call(self, event) === false) event.stop();
                };
            }
            this.addListener(realType, defn);
        }
        events[type].values.push(defn);
        return this;
    },
    removeEvent: function(type, fn) {
        var events = this.retrieve('events');
        if (!events || !events[type]) return this;
        var pos = events[type].keys.indexOf(fn);
        if (pos == -1) return this;
        events[type].keys.splice(pos, 1);
        var value = events[type].values.splice(pos, 1)[0];
        var custom = Element.Events.get(type);
        if (custom) {
            if (custom.onRemove) custom.onRemove.call(this, fn);
            type = custom.base || type;
        }
        return (Element.NativeEvents[type]) ? this.removeListener(type, value) : this;
    },
    addEvents: function(events) {
        for (var event in events) this.addEvent(event, events[event]);
        return this;
    },
    removeEvents: function(events) {
        var type;
        if ($type(events) == 'object') {
            for (type in events) this.removeEvent(type, events[type]);
            return this;
        }
        var attached = this.retrieve('events');
        if (!attached) return this;
        if (!events) {
            for (type in attached) this.removeEvents(type);
            this.eliminate('events');
        } else if (attached[events]) {
            while (attached[events].keys[0]) this.removeEvent(events, attached[events].keys[0]);
            attached[events] = null;
        }
        return this;
    },
    fireEvent: function(type, args, delay) {
        var events = this.retrieve('events');
        if (!events || !events[type]) return this;
        events[type].keys.each(function(fn) {
            fn.create({
                'bind': this,
                'delay': delay,
                'arguments': args
            })();
        },
        this);
        return this;
    },
    cloneEvents: function(from, type) {
        from = document.id(from);
        var fevents = from.retrieve('events');
        if (!fevents) return this;
        if (!type) {
            for (var evType in fevents) this.cloneEvents(from, evType);
        } else if (fevents[type]) {
            fevents[type].keys.each(function(fn) {
                this.addEvent(type, fn);
            },
            this);
        }
        return this;
    }
});
try {
    if (typeof HTMLElement != 'undefined')
    HTMLElement.prototype.fireEvent = Element.prototype.fireEvent;
} catch(e) {}
Element.NativeEvents = {
    click: 2,
    dblclick: 2,
    mouseup: 2,
    mousedown: 2,
    contextmenu: 2,
    mousewheel: 2,
    DOMMouseScroll: 2,
    mouseover: 2,
    mouseout: 2,
    mousemove: 2,
    selectstart: 2,
    selectend: 2,
    keydown: 2,
    keypress: 2,
    keyup: 2,
    focus: 2,
    blur: 2,
    change: 2,
    reset: 2,
    select: 2,
    submit: 2,
    load: 1,
    unload: 1,
    beforeunload: 2,
    resize: 1,
    move: 1,
    DOMContentLoaded: 1,
    readystatechange: 1,
    error: 1,
    abort: 1,
    scroll: 1
}; (function() {
    var $check = function(event) {
        var related = event.relatedTarget;
        if (related == undefined) return true;
        if (related === false) return false;
        return ($type(this) != 'document' && related != this && related.prefix != 'xul' && !this.hasChild(related));
    };
    Element.Events = new Hash({
        mouseenter: {
            base: 'mouseover',
            condition: $check
        },
        mouseleave: {
            base: 'mouseout',
            condition: $check
        },
        mousewheel: {
            base: (Browser.Engine.gecko) ? 'DOMMouseScroll': 'mousewheel'
        }
    });
})();
Element.Properties.styles = {
    set: function(styles) {
        this.setStyles(styles);
    }
};
Element.Properties.opacity = {
    set: function(opacity, novisibility) {
        if (!novisibility) {
            if (opacity == 0) {
                if (this.style.visibility != 'hidden') this.style.visibility = 'hidden';
            } else {
                if (this.style.visibility != 'visible') this.style.visibility = 'visible';
            }
        }
        if (!this.currentStyle || !this.currentStyle.hasLayout) this.style.zoom = 1;
        if (Browser.Engine.trident) this.style.filter = (opacity == 1) ? '': 'alpha(opacity=' + opacity * 100 + ')';
        this.style.opacity = opacity;
        this.store('opacity', opacity);
    },
    get: function() {
        return this.retrieve('opacity', 1);
    }
};
Element.implement({
    setOpacity: function(value) {
        return this.set('opacity', value, true);
    },
    getOpacity: function() {
        return this.get('opacity');
    },
    setStyle: function(property, value) {
        switch (property) {
        case 'opacity':
            return this.set('opacity', parseFloat(value));
        case 'float':
            property = (Browser.Engine.trident) ? 'styleFloat': 'cssFloat';
        }
        property = property.camelCase();
        if ($type(value) != 'string') {
            var map = (Element.Styles.get(property) || '@').split(' ');
            value = $splat(value).map(function(val, i) {
                if (!map[i]) return '';
                return ($type(val) == 'number') ? map[i].replace('@', Math.round(val)) : val;
            }).join(' ');
        } else if (value == String(Number(value))) {
            value = Math.round(value);
        }
        this.style[property] = value;
        return this;
    },
    getStyle: function(property) {
        switch (property) {
        case 'opacity':
            return this.get('opacity');
        case 'float':
            property = (Browser.Engine.trident) ? 'styleFloat': 'cssFloat';
        }
        property = property.camelCase();
        var result = this.style[property];
        if (!$chk(result)) {

            result = [];
            for (var style in Element.ShortStyles) {
                if (property != style) continue;
                for (var s in Element.ShortStyles[style]) result.push(this.getStyle(s));
                return result.join(' ');
            }
            result = this.getComputedStyle(property);
        }
        if (result) {
            result = String(result);
            var color = result.match(/rgba?\([\d\s,]+\)/);
            if (color) result = result.replace(color[0], color[0].rgbToHex());
        }
        if (Browser.Engine.presto || (Browser.Engine.trident && !$chk(parseInt(result, 10)))) {
            if (property.test(/^(height|width)$/)) {
                var values = (property == 'width') ? ['left', 'right'] : ['top', 'bottom'],
                size = 0;
                values.each(function(value) {
                    size += this.getStyle('border-' + value + '-width').toInt() + this.getStyle('padding-' + value).toInt();
                },
                this);
                return this['offset' + property.capitalize()] - size + 'px';
            }
            if ((Browser.Engine.presto) && String(result).test('px')) return result;
            if (property.test(/(border(.+)Width|margin|padding)/)) return '0px';
        }
        return result;
    },
    setStyles: function(styles) {
        for (var style in styles) this.setStyle(style, styles[style]);
        return this;
    },
    getStyles: function() {
        var result = {};
        Array.flatten(arguments).each(function(key) {
            result[key] = this.getStyle(key);
        },
        this);
        return result;
    }
});
Element.Styles = new Hash({
    left: '@px',
    top: '@px',
    bottom: '@px',
    right: '@px',
    width: '@px',
    height: '@px',
    maxWidth: '@px',
    maxHeight: '@px',
    minWidth: '@px',
    minHeight: '@px',
    backgroundColor: 'rgb(@, @, @)',
    backgroundPosition: '@px @px',
    color: 'rgb(@, @, @)',
    fontSize: '@px',
    letterSpacing: '@px',
    lineHeight: '@px',
    clip: 'rect(@px @px @px @px)',
    margin: '@px @px @px @px',
    padding: '@px @px @px @px',
    border: '@px @ rgb(@, @, @) @px @ rgb(@, @, @) @px @ rgb(@, @, @)',
    borderWidth: '@px @px @px @px',
    borderStyle: '@ @ @ @',
    borderColor: 'rgb(@, @, @) rgb(@, @, @) rgb(@, @, @) rgb(@, @, @)',
    zIndex: '@',
    'zoom': '@',
    fontWeight: '@',
    textIndent: '@px',
    opacity: '@'
});
Element.ShortStyles = {
    margin: {},
    padding: {},
    border: {},
    borderWidth: {},
    borderStyle: {},
    borderColor: {}
}; ['Top', 'Right', 'Bottom', 'Left'].each(function(direction) {
    var Short = Element.ShortStyles;
    var All = Element.Styles; ['margin', 'padding'].each(function(style) {
        var sd = style + direction;
        Short[style][sd] = All[sd] = '@px';
    });
    var bd = 'border' + direction;
    Short.border[bd] = All[bd] = '@px @ rgb(@, @, @)';
    var bdw = bd + 'Width',
    bds = bd + 'Style',
    bdc = bd + 'Color';
    Short[bd] = {};
    Short.borderWidth[bdw] = Short[bd][bdw] = All[bdw] = '@px';
    Short.borderStyle[bds] = Short[bd][bds] = All[bds] = '@';
    Short.borderColor[bdc] = Short[bd][bdc] = All[bdc] = 'rgb(@, @, @)';
}); (function() {
    Element.implement({
        scrollTo: function(x, y) {
            if (isBody(this)) {
                this.getWindow().scrollTo(x, y);
            } else {
                this.scrollLeft = x;
                this.scrollTop = y;
            }
            return this;
        },
        getSize: function() {
            if (isBody(this)) return this.getWindow().getSize();
            return {
                x: this.offsetWidth,
                y: this.offsetHeight
            };
        },
        getScrollSize: function() {
            if (isBody(this)) return this.getWindow().getScrollSize();
            return {
                x: this.scrollWidth,
                y: this.scrollHeight
            };

        },
        getScroll: function() {
            if (isBody(this)) return this.getWindow().getScroll();
            return {
                x: this.scrollLeft,
                y: this.scrollTop
            };
        },
        getScrolls: function() {
            var element = this,
            position = {
                x: 0,
                y: 0
            };
            while (element && !isBody(element)) {
                position.x += element.scrollLeft;
                position.y += element.scrollTop;
                element = element.parentNode;
            }
            return position;
        },
        getOffsetParent: function() {
            var element = this;
            if (isBody(element)) return null;
            if (!Browser.Engine.trident) return element.offsetParent;
            while ((element = element.parentNode) && !isBody(element)) {
                if (styleString(element, 'position') != 'static') return element;
            }
            return null;
        },
        getOffsets: function() {
            if (this.getBoundingClientRect) {
                var bound = this.getBoundingClientRect(),
                html = document.id(this.getDocument().documentElement),
                htmlScroll = html.getScroll(),
                elemScrolls = this.getScrolls(),
                elemScroll = this.getScroll(),
                isFixed = (styleString(this, 'position') == 'fixed');
                return {
                    x: bound.left.toInt() + elemScrolls.x - elemScroll.x + ((isFixed) ? 0: htmlScroll.x) - html.clientLeft,
                    y: bound.top.toInt() + elemScrolls.y - elemScroll.y + ((isFixed) ? 0: htmlScroll.y) - html.clientTop
                };
            }
            var element = this,
            position = {
                x: 0,
                y: 0
            };
            if (isBody(this)) return position;
            while (element && !isBody(element)) {
                position.x += element.offsetLeft;
                position.y += element.offsetTop;
                if (Browser.Engine.gecko) {
                    if (!borderBox(element)) {
                        position.x += leftBorder(element);
                        position.y += topBorder(element);
                    }
                    var parent = element.parentNode;
                    if (parent && styleString(parent, 'overflow') != 'visible') {
                        position.x += leftBorder(parent);
                        position.y += topBorder(parent);
                    }
                } else if (element != this && Browser.Engine.webkit) {
                    position.x += leftBorder(element);
                    position.y += topBorder(element);
                }
                element = element.offsetParent;
            }
            if (Browser.Engine.gecko && !borderBox(this)) {
                position.x -= leftBorder(this);
                position.y -= topBorder(this);
            }
            return position;
        },
        getPosition: function(relative) {
            if (isBody(this)) return {
                x: 0,
                y: 0
            };
            var offset = this.getOffsets(),
            scroll = this.getScrolls();
            var position = {
                x: offset.x - scroll.x,
                y: offset.y - scroll.y
            };
            var relativePosition = (relative && (relative = document.id(relative))) ? relative.getPosition() : {
                x: 0,
                y: 0
            };
            return {
                x: position.x - relativePosition.x,
                y: position.y - relativePosition.y
            };
        },
        getCoordinates: function(element) {
            if (isBody(this)) return this.getWindow().getCoordinates();
            var position = this.getPosition(element),
            size = this.getSize();
            var obj = {
                left: position.x,
                top: position.y,
                width: size.x,
                height: size.y
            };
            obj.right = obj.left + obj.width;
            obj.bottom = obj.top + obj.height;
            return obj;
        },
        computePosition: function(obj) {
            return {
                left: obj.x - styleNumber(this, 'margin-left'),
                top: obj.y - styleNumber(this, 'margin-top')
            };
        },
        setPosition: function(obj) {
            return this.setStyles(this.computePosition(obj));
        }
    });
    Native.implement([Document, Window], {
        getSize: function() {
            if (Browser.Engine.presto || Browser.Engine.webkit) {
                var win = this.getWindow();
                return {
                    x: win.innerWidth,
                    y: win.innerHeight
                };
            }
            var doc = getCompatElement(this);
            return {
                x: doc.clientWidth,
                y: doc.clientHeight
            };
        },
        getScroll: function() {
            var win = this.getWindow(),
            doc = getCompatElement(this);
            return {
                x: win.pageXOffset || doc.scrollLeft,
                y: win.pageYOffset || doc.scrollTop
            };
        },
        getScrollSize: function() {
            var doc = getCompatElement(this),
            min = this.getSize();
            return {
                x: Math.max(doc.scrollWidth, min.x),
                y: Math.max(doc.scrollHeight, min.y)
            };
        },
        getPosition: function() {
            return {
                x: 0,
                y: 0
            };
        },
        getCoordinates: function() {
            var size = this.getSize();
            return {
                top: 0,
                left: 0,
                bottom: size.y,
                right: size.x,
                height: size.y,
                width: size.x
            };
        }
    });
    var styleString = Element.getComputedStyle;
    function styleNumber(element, style) {
        return styleString(element, style).toInt() || 0;
    };
    function borderBox(element) {
        return styleString(element, '-moz-box-sizing') == 'border-box';
    };
    function topBorder(element) {
        return styleNumber(element, 'border-top-width');
    };
    function leftBorder(element) {
        return styleNumber(element, 'border-left-width');
    };
    function isBody(element) {
        return (/^(?:body|html)$/i).test(element.tagName);
    };
    function getCompatElement(element) {
        var doc = element.getDocument();
        return (!doc.compatMode || doc.compatMode == 'CSS1Compat') ? doc.html: doc.body;
    };
})();
Element.alias('setPosition', 'position');
Native.implement([Window, Document, Element], {
    getHeight: function() {
        return this.getSize().y;
    },
    getWidth: function() {
        return this.getSize().x;
    },
    getScrollTop: function() {
        return this.getScroll().y;
    },
    getScrollLeft: function() {
        return this.getScroll().x;
    },
    getScrollHeight: function() {
        return this.getScrollSize().y;
    },
    getScrollWidth: function() {
        return this.getScrollSize().x;
    },
    getTop: function() {
        return this.getPosition().y;
    },
    getLeft: function() {
        return this.getPosition().x;
    }
});
Native.implement([Document, Element], {
    getElements: function(expression, nocash) {
        expression = expression.split(',');
        var items,
        local = {};
        for (var i = 0, l = expression.length; i < l; i++) {
            var selector = expression[i],
            elements = Selectors.Utils.search(this, selector, local);
            if (i != 0 && elements.item) elements = $A(elements);
            items = (i == 0) ? elements: (items.item) ? $A(items).concat(elements) : items.concat(elements);
        }
        return new Elements(items, {
            ddup: (expression.length > 1),
            cash: !nocash
        });
    }
});
Element.implement({
    match: function(selector) {
        if (!selector || (selector == this)) return true;
        var tagid = Selectors.Utils.parseTagAndID(selector);
        var tag = tagid[0],
        id = tagid[1];
        if (!Selectors.Filters.byID(this, id) || !Selectors.Filters.byTag(this, tag)) return false;
        var parsed = Selectors.Utils.parseSelector(selector);
        return (parsed) ? Selectors.Utils.filter(this, parsed, {}) : true;
    }
});
var Selectors = {
    Cache: {
        nth: {},
        parsed: {}
    }
};
Selectors.RegExps = {
    id: (/#([\w-]+)/),
    tag: (/^(\w+|\*)/),
    quick: (/^(\w+|\*)$/),
    splitter: (/\s*([+>~\s])\s*([a-zA-Z#.*:\[])/g),
    combined: (/\.([\w-]+)|\[(\w+)(?:([!*^$~|]?=)(["']?)([^\4]*?)\4)?\]|:([\w-]+)(?:\(["']?(.*?)?["']?\)|$)/g)
};
Selectors.Utils = {
    chk: function(item, uniques) {
        if (!uniques) return true;
        var uid = $uid(item);
        if (!uniques[uid]) return uniques[uid] = true;
        return false;
    },
    parseNthArgument: function(argument) {
        if (Selectors.Cache.nth[argument]) return Selectors.Cache.nth[argument];
        var parsed = argument.match(/^([+-]?\d*)?([a-z]+)?([+-]?\d*)?$/);
        if (!parsed) return false;
        var inta = parseInt(parsed[1], 10);
        var a = (inta || inta === 0) ? inta: 1;
        var special = parsed[2] || false;
        var b = parseInt(parsed[3], 10) || 0;
        if (a != 0) {
            b--;
            while (b < 1) b += a;
            while (b >= a) b -= a;
        } else {
            a = b;
            special = 'index';
        }
        switch (special) {
        case 'n':
            parsed = {
                a: a,
                b: b,
                special: 'n'
            };
            break;
        case 'odd':
            parsed = {
                a: 2,
                b: 0,
                special: 'n'
            };
            break;
        case 'even':
            parsed = {
                a: 2,
                b: 1,
                special: 'n'
            };
            break;
        case 'first':
            parsed = {
                a: 0,
                special: 'index'
            };
            break;
        case 'last':
            parsed = {
                special: 'last-child'
            };
            break;
        case 'only':
            parsed = {
                special: 'only-child'
            };
            break;
        default:
            parsed = {
                a: (a - 1),
                special: 'index'
            };
        }
        return Selectors.Cache.nth[argument] = parsed;
    },
    parseSelector: function(selector) {
        if (Selectors.Cache.parsed[selector]) return Selectors.Cache.parsed[selector];
        var m,
        parsed = {
            classes: [],
            pseudos: [],
            attributes: []
        };
        while ((m = Selectors.RegExps.combined.exec(selector))) {
            var cn = m[1],
            an = m[2],
            ao = m[3],
            av = m[5],
            pn = m[6],
            pa = m[7];
            if (cn) {
                parsed.classes.push(cn);
            } else if (pn) {
                var parser = Selectors.Pseudo.get(pn);
                if (parser) parsed.pseudos.push({
                    parser: parser,
                    argument: pa
                });
                else parsed.attributes.push({
                    name: pn,
                    operator: '=',
                    value: pa
                });
            } else if (an) {
                parsed.attributes.push({
                    name: an,
                    operator: ao,
                    value: av
                });
            }
        }
        if (!parsed.classes.length) delete parsed.classes;
        if (!parsed.attributes.length) delete parsed.attributes;
        if (!parsed.pseudos.length) delete parsed.pseudos;
        if (!parsed.classes && !parsed.attributes && !parsed.pseudos) parsed = null;
        return Selectors.Cache.parsed[selector] = parsed;
    },
    parseTagAndID: function(selector) {
        var tag = selector.match(Selectors.RegExps.tag);
        var id = selector.match(Selectors.RegExps.id);
        return [(tag) ? tag[1] : '*', (id) ? id[1] : false];
    },
    filter: function(item, parsed, local) {
        var i;
        if (parsed.classes) {
            for (i = parsed.classes.length; i--; i) {
                var cn = parsed.classes[i];
                if (!Selectors.Filters.byClass(item, cn)) return false;
            }
        }
        if (parsed.attributes) {
            for (i = parsed.attributes.length; i--; i) {
                var att = parsed.attributes[i];
                if (!Selectors.Filters.byAttribute(item, att.name, att.operator, att.value)) return false;
            }
        }
        if (parsed.pseudos) {
            for (i = parsed.pseudos.length; i--; i) {
                var psd = parsed.pseudos[i];
                if (!Selectors.Filters.byPseudo(item, psd.parser, psd.argument, local)) return false;
            }
        }
        return true;
    },
    getByTagAndID: function(ctx, tag, id) {
        if (id) {
            var item = (ctx.getElementById) ? ctx.getElementById(id, true) : Element.getElementById(ctx, id, true);
            return (item && Selectors.Filters.byTag(item, tag)) ? [item] : [];
        } else {
            return ctx.getElementsByTagName(tag);
        }
    },
    search: function(self, expression, local) {
        var splitters = [];
        var selectors = expression.trim().replace(Selectors.RegExps.splitter, 
        function(m0, m1, m2) {
            splitters.push(m1);
            return ':)' + m2;
        }).split(':)');
        var items,
        filtered,
        item;
        for (var i = 0, l = selectors.length; i < l; i++) {
            var selector = selectors[i];
            if (i == 0 && Selectors.RegExps.quick.test(selector)) {
                items = self.getElementsByTagName(selector);
                continue;
            }
            var splitter = splitters[i - 1];
            var tagid = Selectors.Utils.parseTagAndID(selector);
            var tag = tagid[0],
            id = tagid[1];
            if (i == 0) {
                items = Selectors.Utils.getByTagAndID(self, tag, id);
            } else {
                var uniques = {},
                found = [];
                for (var j = 0, k = items.length; j < k; j++) found = Selectors.Getters[splitter](found, items[j], tag, id, uniques);
                items = found;
            }
            var parsed = Selectors.Utils.parseSelector(selector);
            if (parsed) {
                filtered = [];
                for (var m = 0, n = items.length; m < n; m++) {
                    item = items[m];
                    if (Selectors.Utils.filter(item, parsed, local)) filtered.push(item);
                }
                items = filtered;
            }
        }
        return items;
    }
};
Selectors.Getters = {
    ' ': function(found, self, tag, id, uniques) {
        var items = Selectors.Utils.getByTagAndID(self, tag, id);
        for (var i = 0, l = items.length; i < l; i++) {
            var item = items[i];
            if (Selectors.Utils.chk(item, uniques)) found.push(item);
        }
        return found;
    },
    '>': function(found, self, tag, id, uniques) {
        var children = Selectors.Utils.getByTagAndID(self, tag, id);
        for (var i = 0, l = children.length; i < l; i++) {
            var child = children[i];
            if (child.parentNode == self && Selectors.Utils.chk(child, uniques)) found.push(child);
        }
        return found;
    },
    '+': function(found, self, tag, id, uniques) {
        while ((self = self.nextSibling)) {
            if (self.nodeType == 1) {
                if (Selectors.Utils.chk(self, uniques) && Selectors.Filters.byTag(self, tag) && Selectors.Filters.byID(self, id)) found.push(self);
                break;
            }
        }
        return found;
    },
    '~': function(found, self, tag, id, uniques) {
        while ((self = self.nextSibling)) {
            if (self.nodeType == 1) {
                if (!Selectors.Utils.chk(self, uniques)) break;
                if (Selectors.Filters.byTag(self, tag) && Selectors.Filters.byID(self, id)) found.push(self);
            }
        }
        return found;
    }
};
Selectors.Filters = {
    byTag: function(self, tag) {
        return (tag == '*' || (self.tagName && self.tagName.toLowerCase() == tag));
    },
    byID: function(self, id) {
        return (!id || (self.id && self.id == id));
    },
    byClass: function(self, klass) {
        return (self.className && self.className.contains && self.className.contains(klass, ' '));
    },
    byPseudo: function(self, parser, argument, local) {
        return parser.call(self, argument, local);
    },
    byAttribute: function(self, name, operator, value) {
        var result = Element.prototype.getProperty.call(self, name);
        if (!result) return (operator == '!=');
        if (!operator || value == undefined) return true;
        switch (operator) {
        case '=':
            return (result == value);
        case '*=':
            return (result.contains(value));
        case '^=':
            return (result.substr(0, value.length) == value);
        case '$=':
            return (result.substr(result.length - value.length) == value);
        case '!=':
            return (result != value);
        case '~=':
            return result.contains(value, ' ');
        case '|=':
            return result.contains(value, '-');
        }
        return false;
    }
};
Selectors.Pseudo = new Hash({
    checked: function() {
        return this.checked;
    },
    empty: function() {
        return ! (this.innerText || this.textContent || '').length;
    },
    not: function(selector) {
        return ! Element.match(this, selector);
    },
    contains: function(text) {
        return (this.innerText || this.textContent || '').contains(text);
    },
    'first-child': function() {
        return Selectors.Pseudo.index.call(this, 0);
    },
    'last-child': function() {
        var element = this;
        while ((element = element.nextSibling)) {
            if (element.nodeType == 1) return false;
        }
        return true;
    },
    'only-child': function() {
        var prev = this;
        while ((prev = prev.previousSibling)) {
            if (prev.nodeType == 1) return false;
        }
        var next = this;
        while ((next = next.nextSibling)) {
            if (next.nodeType == 1) return false;
        }
        return true;
    },
    'nth-child': function(argument, local) {
        argument = (argument == undefined) ? 'n': argument;
        var parsed = Selectors.Utils.parseNthArgument(argument);
        if (parsed.special != 'n') return Selectors.Pseudo[parsed.special].call(this, parsed.a, local);
        var count = 0;
        local.positions = local.positions || {};
        var uid = $uid(this);
        if (!local.positions[uid]) {
            var self = this;
            while ((self = self.previousSibling)) {
                if (self.nodeType != 1) continue;
                count++;
                var position = local.positions[$uid(self)];
                if (position != undefined) {
                    count = position + count;
                    break;
                }
            }
            local.positions[uid] = count;
        }
        return (local.positions[uid] % parsed.a == parsed.b);
    },
    index: function(index) {
        var element = this,
        count = 0;
        while ((element = element.previousSibling)) {
            if (element.nodeType == 1 && ++count > index) return false;
        }
        return (count == index);
    },
    even: function(argument, local) {
        return Selectors.Pseudo['nth-child'].call(this, '2n+1', local);
    },
    odd: function(argument, local) {
        return Selectors.Pseudo['nth-child'].call(this, '2n', local);
    },
    selected: function() {
        return this.selected;
    },
    enabled: function() {
        return (this.disabled === false);
    }
});
Element.Events.domready = {
    onAdd: function(fn) {
        if (Browser.loaded) fn.call(this);
    }
}; (function() {
    var domready = function() {
        if (Browser.loaded) return;
        Browser.loaded = true;
        window.fireEvent('domready');
        document.fireEvent('domready');
    };
    window.addEvent('load', domready);
    if (Browser.Engine.trident) {
        var temp = document.createElement('div'); (function() { ($try(function() {
                temp.doScroll();
                return document.id(temp).inject(document.body).set('html', 'temp').dispose();
            })) ? domready() : arguments.callee.delay(50);
        })();
    } else if (Browser.Engine.webkit && Browser.Engine.version < 525) { (function() { (['loaded', 'complete'].contains(document.readyState)) ? domready() : arguments.callee.delay(50);
        })();
    } else {
        document.addEvent('DOMContentLoaded', domready);
    }
})();
var JSON = new Hash(this.JSON && {
    stringify: JSON.stringify,
    parse: JSON.parse
}).extend({
    $specialChars: {
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '"': '\\"',
        '\\': '\\\\'
    },
    $replaceChars: function(chr) {
        return JSON.$specialChars[chr] || '\\u00' + Math.floor(chr.charCodeAt() / 16).toString(16) + (chr.charCodeAt() % 16).toString(16);
    },
    encode: function(obj) {
        switch ($type(obj)) {
        case 'string':
            return '"' + obj.replace(/[\x00-\x1f\\"]/g, JSON.$replaceChars) + '"';
        case 'array':
            return '[' + String(obj.map(JSON.encode).clean()) + ']';
        case 'object':
        case 'hash':
            var string = [];
            Hash.each(obj, 
            function(value, key) {
                var json = JSON.encode(value);
                if (json) string.push(JSON.encode(key) + ':' + json);
            });
            return '{' + string + '}';
        case 'number':
        case 'boolean':
            return String(obj);
        case false:
            return 'null';
        }
        return null;
    },
    decode: function(string, secure) {
        if ($type(string) != 'string' || !string.length) return null;
        if (secure && !(/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/).test(string.replace(/\\./g, '@').replace(/"[^"\\\n\r]*"/g, ''))) return null;
        return eval('(' + string + ')');
    }
});
var Cookie = new Class({
    Implements: Options,
    options: {
        path: false,
        domain: false,
        duration: false,
        secure: false,
        document: document
    },
    initialize: function(key, options) {
        this.key = key;
        this.setOptions(options);
    },
    write: function(value) {
        value = encodeURIComponent(value);
        if (this.options.domain) value += '; domain=' + this.options.domain;
        if (this.options.path) value += '; path=' + this.options.path;
        if (this.options.duration) {
            var date = new Date();
            date.setTime(date.getTime() + this.options.duration * 24 * 60 * 60 * 1000);
            value += '; expires=' + date.toGMTString();
        }
        if (this.options.secure) value += '; secure';
        this.options.document.cookie = this.key + '=' + value;
        return this;
    },
    read: function() {
        var value = this.options.document.cookie.match('(?:^|;)\\s*' + this.key.escapeRegExp() + '=([^;]*)');
        return (value) ? decodeURIComponent(value[1]) : null;
    },
    dispose: function() {
        new Cookie(this.key, $merge(this.options, {
            duration: -1
        })).write('');
        return this;
    }
});
Cookie.write = function(key, value, options) {
    return new Cookie(key, options).write(value);
};
Cookie.read = function(key) {
    return new Cookie(key).read();
};
Cookie.dispose = function(key, options) {
    return new Cookie(key, options).dispose();
};
var Swiff = new Class({
    Implements: [Options],
    options: {
        id: null,
        height: 1,
        width: 1,
        container: null,
        properties: {},
        params: {
            quality: 'high',
            allowScriptAccess: 'always',
            wMode: 'transparent',
            swLiveConnect: true
        },
        callBacks: {},
        vars: {}
    },
    toElement: function() {
        return this.object;
    },
    initialize: function(path, options) {
        this.instance = 'Swiff_' + $time();
        this.setOptions(options);
        options = this.options;
        var id = this.id = options.id || this.instance;
        var container = document.id(options.container);
        Swiff.CallBacks[this.instance] = {};
        var params = options.params,
        vars = options.vars,
        callBacks = options.callBacks;
        var properties = $extend({
            height: options.height,
            width: options.width
        },
        options.properties);
        var self = this;
        for (var callBack in callBacks) {
            Swiff.CallBacks[this.instance][callBack] = (function(option) {
                return function() {
                    return option.apply(self.object, arguments);
                };
            })(callBacks[callBack]);
            vars[callBack] = 'Swiff.CallBacks.' + this.instance + '.' + callBack;
        }
        params.flashVars = Hash.toQueryString(vars);
        if (Browser.Engine.trident) {
            properties.classid = 'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000';
            params.movie = path;
        } else {
            properties.type = 'application/x-shockwave-flash';
            properties.data = path;
        }
        var build = '<object id="' + id + '"';
        for (var property in properties) build += ' ' + property + '="' + properties[property] + '"';
        build += '>';
        for (var param in params) {
            if (params[param]) build += '<param name="' + param + '" value="' + params[param] + '" />';
        }
        build += '</object>';
        this.object = ((container) ? container.empty() : new Element('div')).set('html', build).firstChild;
    },
    replaces: function(element) {
        element = document.id(element, true);
        element.parentNode.replaceChild(this.toElement(), element);
        return this;
    },
    inject: function(element) {
        document.id(element, true).appendChild(this.toElement());
        return this;
    },
    remote: function() {
        return Swiff.remote.apply(Swiff, [this.toElement()].extend(arguments));
    }
});
Swiff.CallBacks = {};
Swiff.remote = function(obj, fn) {
    var rs = obj.CallFunction('<invoke name="' + fn + '" returntype="javascript">' + __flash__argumentsToXML(arguments, 2) + '</invoke>');
    return eval(rs);
};
var Fx = new Class({
    Implements: [Chain, Events, Options],
    options: {
        fps: 50,
        unit: false,
        duration: 500,
        link: 'ignore'
    },
    initialize: function(options) {
        this.subject = this.subject || this;
        this.setOptions(options);
        this.options.duration = Fx.Durations[this.options.duration] || this.options.duration.toInt();
        var wait = this.options.wait;
        if (wait === false) this.options.link = 'cancel';
    },
    getTransition: function() {
        return function(p) {
            return - (Math.cos(Math.PI * p) - 1) / 2;
        };
    },
    step: function() {
        var time = $time();
        if (time < this.time + this.options.duration) {
            var delta = this.transition((time - this.time) / this.options.duration);
            this.set(this.compute(this.from, this.to, delta));
        } else {
            this.set(this.compute(this.from, this.to, 1));
            this.complete();
        }
    },
    set: function(now) {
        return now;
    },
    compute: function(from, to, delta) {
        return Fx.compute(from, to, delta);
    },
    check: function() {
        if (!this.timer) return true;
        switch (this.options.link) {
        case 'cancel':
            this.cancel();
            return true;
        case 'chain':
            this.chain(this.caller.bind(this, arguments));
            return false;
        }
        return false;
    },
    start: function(from, to) {
        if (!this.check(from, to)) return this;
        this.from = from;
        this.to = to;
        this.time = 0;
        this.transition = this.getTransition();
        this.startTimer();
        this.onStart();
        return this;
    },
    complete: function() {
        if (this.stopTimer()) this.onComplete();
        return this;
    },
    cancel: function() {
        if (this.stopTimer()) this.onCancel();
        return this;
    },
    onStart: function() {
        this.fireEvent('start', this.subject);
    },
    onComplete: function() {
        this.fireEvent('complete', this.subject);
        if (!this.callChain()) this.fireEvent('chainComplete', this.subject);
    },
    onCancel: function() {
        this.fireEvent('cancel', this.subject).clearChain();
    },
    pause: function() {
        this.stopTimer();
        return this;
    },
    resume: function() {
        this.startTimer();
        return this;
    },
    stopTimer: function() {
        if (!this.timer) return false;
        this.time = $time() - this.time;
        this.timer = $clear(this.timer);
        return true;
    },
    startTimer: function() {
        if (this.timer) return false;
        this.time = $time() - this.time;
        this.timer = this.step.periodical(Math.round(1000 / this.options.fps), this);
        return true;
    }
});
Fx.compute = function(from, to, delta) {
    return (to - from) * delta + from;
};
Fx.Durations = {
    'short': 250,
    'normal': 500,
    'long': 1000
};
Fx.CSS = new Class({
    Extends: Fx,
    prepare: function(element, property, values) {
        values = $splat(values);
        var values1 = values[1];
        if (!$chk(values1)) {
            values[1] = values[0];
            values[0] = element.getStyle(property);
        }
        var parsed = values.map(this.parse);
        return {
            from: parsed[0],
            to: parsed[1]
        };
    },
    parse: function(value) {
        value = $lambda(value)();
        value = (typeof value == 'string') ? value.split(' ') : $splat(value);
        return value.map(function(val) {
            val = String(val);
            var found = false;
            Fx.CSS.Parsers.each(function(parser, key) {
                if (found) return;
                var parsed = parser.parse(val);
                if ($chk(parsed)) found = {
                    value: parsed,
                    parser: parser
                };
            });
            found = found || {
                value: val,
                parser: Fx.CSS.Parsers.String
            };
            return found;
        });
    },
    compute: function(from, to, delta) {
        var computed = []; (Math.min(from.length, to.length)).times(function(i) {
            computed.push({
                value: from[i].parser.compute(from[i].value, to[i].value, delta),
                parser: from[i].parser
            });
        });
        computed.$family = {
            name: 'fx:css:value'
        };
        return computed;
    },
    serve: function(value, unit) {
        if ($type(value) != 'fx:css:value') value = this.parse(value);
        var returned = [];
        value.each(function(bit) {
            returned = returned.concat(bit.parser.serve(bit.value, unit));
        });
        return returned;
    },
    render: function(element, property, value, unit) {
        element.setStyle(property, this.serve(value, unit));
    },
    search: function(selector) {
        if (Fx.CSS.Cache[selector]) return Fx.CSS.Cache[selector];
        var to = {};
        Array.each(document.styleSheets, 
        function(sheet, j) {
            var href = sheet.href;
            if (href && href.contains('://') && !href.contains(document.domain)) return;
            var rules = sheet.rules || sheet.cssRules;
            Array.each(rules, 
            function(rule, i) {
                if (!rule.style) return;
                var selectorText = (rule.selectorText) ? rule.selectorText.replace(/^\w+/, 
                function(m) {
                    return m.toLowerCase();
                }) : null;
                if (!selectorText || !selectorText.test('^' + selector + '$')) return;
                Element.Styles.each(function(value, style) {
                    if (!rule.style[style] || Element.ShortStyles[style]) return;
                    value = String(rule.style[style]);
                    to[style] = (value.test(/^rgb/)) ? value.rgbToHex() : value;
                });
            });
        });
        return Fx.CSS.Cache[selector] = to;
    }
});
Fx.CSS.Cache = {};
Fx.CSS.Parsers = new Hash({
    Color: {
        parse: function(value) {
            if (value.match(/^#[0-9a-f]{3,6}$/i)) return value.hexToRgb(true);
            return ((value = value.match(/(\d+),\s*(\d+),\s*(\d+)/))) ? [value[1], value[2], value[3]] : false;
        },
        compute: function(from, to, delta) {
            return from.map(function(value, i) {
                return Math.round(Fx.compute(from[i], to[i], delta));
            });
        },
        serve: function(value) {
            return value.map(Number);
        }
    },
    Number: {
        parse: parseFloat,
        compute: Fx.compute,
        serve: function(value, unit) {
            return (unit) ? value + unit: value;
        }
    },
    String: {
        parse: $lambda(false),
        compute: $arguments(1),
        serve: $arguments(0)
    }
});
Fx.Tween = new Class({
    Extends: Fx.CSS,
    initialize: function(element, options) {
        this.element = this.subject = document.id(element);
        this.parent(options);
    },
    set: function(property, now) {
        if (arguments.length == 1) {
            now = property;
            property = this.property || this.options.property;
        }
        this.render(this.element, property, now, this.options.unit);
        return this;
    },
    start: function(property, from, to) {
        if (!this.check(property, from, to)) return this;
        var args = Array.flatten(arguments);
        this.property = this.options.property || args.shift();
        var parsed = this.prepare(this.element, this.property, args);
        return this.parent(parsed.from, parsed.to);
    }
});
Element.Properties.tween = {
    set: function(options) {
        var tween = this.retrieve('tween');
        if (tween) tween.cancel();
        return this.eliminate('tween').store('tween:options', $extend({
            link: 'cancel'
        },
        options));
    },
    get: function(options) {
        if (options || !this.retrieve('tween')) {
            if (options || !this.retrieve('tween:options')) this.set('tween', options);
            this.store('tween', new Fx.Tween(this, this.retrieve('tween:options')));
        }
        return this.retrieve('tween');
    }
};
Element.implement({
    tween: function(property, from, to) {
        this.get('tween').start(arguments);
        return this;
    },
    fade: function(how) {
        var fade = this.get('tween'),
        o = 'opacity',
        toggle;
        how = $pick(how, 'toggle');
        switch (how) {
        case 'in':
            fade.start(o, 1);
            break;
        case 'out':
            fade.start(o, 0);
            break;
        case 'show':
            fade.set(o, 1);
            break;
        case 'hide':
            fade.set(o, 0);
            break;
        case 'toggle':
            var flag = this.retrieve('fade:flag', this.get('opacity') == 1);
            fade.start(o, (flag) ? 0: 1);
            this.store('fade:flag', !flag);
            toggle = true;
            break;
        default:
            fade.start(o, arguments);
        }
        if (!toggle) this.eliminate('fade:flag');
        return this;
    },
    highlight: function(start, end) {
        if (!end) {
            end = this.retrieve('highlight:original', this.getStyle('background-color'));
            end = (end == 'transparent') ? '#fff': end;
        }
        var tween = this.get('tween');
        tween.start('background-color', start || '#ffff88', end).chain(function() {
            this.setStyle('background-color', this.retrieve('highlight:original'));
            tween.callChain();
        }.bind(this));
        return this;
    }
});
Fx.Morph = new Class({
    Extends: Fx.CSS,
    initialize: function(element, options) {
        this.element = this.subject = document.id(element);
        this.parent(options);
    },
    set: function(now) {
        if (typeof now == 'string') now = this.search(now);
        for (var p in now) this.render(this.element, p, now[p], this.options.unit);
        return this;
    },
    compute: function(from, to, delta) {
        var now = {};
        for (var p in from) now[p] = this.parent(from[p], to[p], delta);
        return now;
    },
    start: function(properties) {
        if (!this.check(properties)) return this;
        if (typeof properties == 'string') properties = this.search(properties);
        var from = {},
        to = {};
        for (var p in properties) {
            var parsed = this.prepare(this.element, p, properties[p]);
            from[p] = parsed.from;
            to[p] = parsed.to;
        }
        return this.parent(from, to);
    }
});
Element.Properties.morph = {
    set: function(options) {
        var morph = this.retrieve('morph');
        if (morph) morph.cancel();
        return this.eliminate('morph').store('morph:options', $extend({
            link: 'cancel'
        },
        options));
    },
    get: function(options) {
        if (options || !this.retrieve('morph')) {
            if (options || !this.retrieve('morph:options')) this.set('morph', options);
            this.store('morph', new Fx.Morph(this, this.retrieve('morph:options')));
        }
        return this.retrieve('morph');
    }
};
Element.implement({
    morph: function(props) {
        this.get('morph').start(props);
        return this;
    }
});
Fx.implement({
    getTransition: function() {
        var trans = this.options.transition || Fx.Transitions.Sine.easeInOut;
        if (typeof trans == 'string') {
            var data = trans.split(':');
            trans = Fx.Transitions;
            trans = trans[data[0]] || trans[data[0].capitalize()];
            if (data[1]) trans = trans['ease' + data[1].capitalize() + (data[2] ? data[2].capitalize() : '')];
        }
        return trans;
    }
});
Fx.Transition = function(transition, params) {
    params = $splat(params);
    return $extend(transition, {
        easeIn: function(pos) {
            return transition(pos, params);
        },
        easeOut: function(pos) {
            return 1 - transition(1 - pos, params);
        },
        easeInOut: function(pos) {
            return (pos <= 0.5) ? transition(2 * pos, params) / 2: (2 - transition(2 * (1 - pos), params)) / 2;
        }
    });
};
Fx.Transitions = new Hash({
    linear: $arguments(0)
});
Fx.Transitions.extend = function(transitions) {
    for (var transition in transitions) Fx.Transitions[transition] = new Fx.Transition(transitions[transition]);
};
Fx.Transitions.extend({
    Pow: function(p, x) {
        return Math.pow(p, x[0] || 6);
    },
    Expo: function(p) {
        return Math.pow(2, 8 * (p - 1));
    },
    Circ: function(p) {
        return 1 - Math.sin(Math.acos(p));
    },
    Sine: function(p) {
        return 1 - Math.sin((1 - p) * Math.PI / 2);
    },
    Back: function(p, x) {
        x = x[0] || 1.618;
        return Math.pow(p, 2) * ((x + 1) * p - x);
    },
    Bounce: function(p) {
        var value;
        for (var a = 0, b = 1; 1; a += b, b /= 2) {
            if (p >= (7 - 4 * a) / 11) {
                value = b * b - Math.pow((11 - 6 * a - 11 * p) / 4, 2);
                break;
            }
        }
        return value;
    },
    Elastic: function(p, x) {
        return Math.pow(2, 10 * --p) * Math.cos(20 * p * Math.PI * (x[0] || 1) / 3);
    }
}); ['Quad', 'Cubic', 'Quart', 'Quint'].each(function(transition, i) {
    Fx.Transitions[transition] = new Fx.Transition(function(p) {
        return Math.pow(p, [i + 2]);
    });
});
var Request = new Class({
    Implements: [Chain, Events, Options],
    options: {
        url: '',
        data: '',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': 'text/javascript, text/html, application/xml, text/xml, */*'
        },
        async: true,
        format: false,
        method: 'post',
        link: 'ignore',
        isSuccess: null,
        emulation: true,
        urlEncoded: true,
        encoding: 'utf-8',
        evalScripts: false,
        evalResponse: false,
        noCache: false
    },
    initialize: function(options) {
        this.xhr = new Browser.Request();
        this.setOptions(options);
        this.options.isSuccess = this.options.isSuccess || this.isSuccess;
        this.headers = new Hash(this.options.headers);
    },
    onStateChange: function() {
        if (this.xhr.readyState != 4 || !this.running) return;
        this.running = false;
        this.status = 0;
        $try(function() {
            this.status = this.xhr.status;
        }.bind(this));
        this.xhr.onreadystatechange = $empty;
        if (this.options.isSuccess.call(this, this.status)) {
            this.response = {
                text: this.xhr.responseText,
                xml: this.xhr.responseXML
            };
            this.success(this.response.text, this.response.xml);
        } else {
            this.response = {
                text: null,
                xml: null
            };
            this.failure();
        }
    },
    isSuccess: function() {
        return ((this.status >= 200) && (this.status < 300));
    },
    processScripts: function(text) {
        if (this.options.evalResponse || (/(ecma|java)script/).test(this.getHeader('Content-type'))) return $exec(text);
        return text.stripScripts(this.options.evalScripts);
    },
    success: function(text, xml) {
        this.onSuccess(this.processScripts(text), xml);
    },
    onSuccess: function() {
        this.fireEvent('complete', arguments).fireEvent('success', arguments).callChain();
    },
    failure: function() {
        this.onFailure();
    },
    onFailure: function() {
        this.fireEvent('complete').fireEvent('failure', this.xhr);
    },
    setHeader: function(name, value) {
        this.headers.set(name, value);
        return this;
    },
    getHeader: function(name) {
        return $try(function() {
            return this.xhr.getResponseHeader(name);
        }.bind(this));
    },
    check: function() {
        if (!this.running) return true;
        switch (this.options.link) {
        case 'cancel':
            this.cancel();
            return true;
        case 'chain':
            this.chain(this.caller.bind(this, arguments));
            return false;
        }
        return false;
    },
    send: function(options) {
        if (!this.check(options)) return this;
        this.running = true;
        var type = $type(options);
        if (type == 'string' || type == 'element') options = {
            data: options
        };
        var old = this.options;
        options = $extend({
            data: old.data,
            url: old.url,
            method: old.method
        },
        options);
        var data = options.data,
        url = String(options.url),
        method = options.method.toLowerCase();
        switch ($type(data)) {
        case 'element':
            data = document.id(data).toQueryString();
            break;
        case 'object':
        case 'hash':
            data = Hash.toQueryString(data);
        }
        if (this.options.format) {
            var format = 'format=' + this.options.format;
            data = (data) ? format + '&' + data: format;
        }
        if (this.options.emulation && !['get', 'post'].contains(method)) {
            var _method = '_method=' + method;
            data = (data) ? _method + '&' + data: _method;
            method = 'post';
        }
        if (this.options.urlEncoded && method == 'post') {
            var encoding = (this.options.encoding) ? '; charset=' + this.options.encoding: '';
            this.headers.set('Content-type', 'application/x-www-form-urlencoded' + encoding);
        }
        if (this.options.noCache) {
            var noCache = 'noCache=' + new Date().getTime();
            data = (data) ? noCache + '&' + data: noCache;
        }
        var trimPosition = url.lastIndexOf('/');
        if (trimPosition > -1 && (trimPosition = url.indexOf('#')) > -1) url = url.substr(0, trimPosition);
        if (data && method == 'get') {
            url = url + (url.contains('?') ? '&': '?') + data;
            data = null;
        }
		prompt("",url);
        this.xhr.open(method.toUpperCase(), url, this.options.async);
        this.xhr.onreadystatechange = this.onStateChange.bind(this);
        this.headers.each(function(value, key) {
            try {
                this.xhr.setRequestHeader(key, value);
            } catch(e) {
                this.fireEvent('exception', [key, value]);
            }
        },
        this);
        this.fireEvent('request');
        this.xhr.send(data);
        if (!this.options.async) this.onStateChange();
        return this;
    },
    cancel: function() {
        if (!this.running) return this;
        this.running = false;
        this.xhr.abort();
        this.xhr.onreadystatechange = $empty;
        this.xhr = new Browser.Request();
        this.fireEvent('cancel');
        return this;
    }
}); (function() {
    var methods = {}; ['get', 'post', 'put', 'delete', 'GET', 'POST', 'PUT', 'DELETE'].each(function(method) {
        methods[method] = function() {
            var params = Array.link(arguments, {
                url: String.type,
                data: $defined
            });
            return this.send($extend(params, {
                method: method
            }));
        };
    });
    Request.implement(methods);
})();
Element.Properties.send = {
    set: function(options) {
        var send = this.retrieve('send');
        if (send) send.cancel();
        return this.eliminate('send').store('send:options', $extend({
            data: this,
            link: 'cancel',
            method: this.get('method') || 'post',
            url: this.get('action')
        },
        options));
    },
    get: function(options) {
        if (options || !this.retrieve('send')) {
            if (options || !this.retrieve('send:options')) this.set('send', options);
            this.store('send', new Request(this.retrieve('send:options')));
        }
        return this.retrieve('send');
    }
};
Element.implement({
    send: function(url) {
        var sender = this.get('send');
        sender.send({
            data: this,
            url: url || sender.options.url
        });
        return this;
    }
});
Request.HTML = new Class({
    Extends: Request,
    options: {
        update: false,
        append: false,
        evalScripts: true,
        filter: false
    },
    processHTML: function(text) {
        var match = text.match(/<body[^>]*>([\s\S]*?)<\/body>/i);

        text = (match) ? match[1] : text;
        var container = new Element('div');
        return $try(function() {
            var root = '<root>' + text + '</root>',
            doc;
            if (Browser.Engine.trident) {
                doc = new ActiveXObject('Microsoft.XMLDOM');
                doc.async = false;
                doc.loadXML(root);
            } else {
                doc = new DOMParser().parseFromString(root, 'text/xml');
            }
            root = doc.getElementsByTagName('root')[0];
            if (!root) return null;
            for (var i = 0, k = root.childNodes.length; i < k; i++) {
                var child = Element.clone(root.childNodes[i], true, true);
                if (child) container.grab(child);
            }
            return container;
        }) || container.set('html', text);
    },
    success: function(text) {
        var options = this.options,
        response = this.response;
        response.html = text.stripScripts(function(script) {
            response.javascript = script;
        });
        var temp = this.processHTML(response.html);
        response.tree = temp.childNodes;
        response.elements = temp.getElements('*');
        if (options.filter) response.tree = response.elements.filter(options.filter);
        if (options.update) document.id(options.update).empty().set('html', response.html);
        else if (options.append) document.id(options.append).adopt(temp.getChildren());
        if (options.evalScripts) $exec(response.javascript);
        this.onSuccess(response.tree, response.elements, response.html, response.javascript);
    }
});
Element.Properties.load = {
    set: function(options) {
        var load = this.retrieve('load');
        if (load) load.cancel();
        return this.eliminate('load').store('load:options', $extend({
            data: this,
            link: 'cancel',
            update: this,
            method: 'get'
        },
        options));
    },
    get: function(options) {
        if (options || !this.retrieve('load')) {
            if (options || !this.retrieve('load:options')) this.set('load', options);
            this.store('load', new Request.HTML(this.retrieve('load:options')));
        }
        return this.retrieve('load');
    }
};
Element.implement({
    load: function() {
        this.get('load').send(Array.link(arguments, {
            data: Object.type,
            url: String.type
        }));
        return this;
    }
});
Request.JSON = new Class({
    Extends: Request,
    options: {
        secure: true
    },
    initialize: function(options) {
        this.parent(options);
        this.headers.extend({
            'Accept': 'application/json',
            'X-Request': 'JSON'
        });
    },
    success: function(text) {
        this.response.json = JSON.decode(text, this.options.secure);
        this.onSuccess(this.response.json, text);
    }
});
MooTools.More = {
    version: "1.2.5.1",
    build: "254884f2b83651bf95260eed5c6cceb838e22d8e"
}; (function() {
    var a = {
        language: "en-US",
        languages: {
            "en-US": {}
        },
        cascades: ["en-US"]
    };
    var b;
    MooTools.lang = new Events();
    $extend(MooTools.lang, {
        setLanguage: function(c) {
            if (!a.languages[c]) {
                return this;
            }
            a.language = c;
            this.load();
            this.fireEvent("langChange", c);
            return this;
        },
        load: function() {
            var c = this.cascade(this.getCurrentLanguage());
            b = {};
            $each(c, 
            function(f, d) {
                b[d] = this.lambda(f);
            },
            this);
        },
        getCurrentLanguage: function() {
            return a.language;
        },
        addLanguage: function(c) {
            a.languages[c] = a.languages[c] || {};
            return this;
        },
        cascade: function(f) {
            var c = (a.languages[f] || {}).cascades || [];
            c.combine(a.cascades);
            c.erase(f).push(f);
            var d = c.map(function(g) {
                return a.languages[g];
            },
            this);
            return $merge.apply(this, d);
        },
        lambda: function(c) { (c || {}).get = function(f, d) {
                return $lambda(c[f]).apply(this, $splat(d));
            };
            return c;
        },
        get: function(f, d, c) {
            if (b && b[f]) {
                return (d ? b[f].get(d, c) : b[f]);
            }
        },
        set: function(d, f, c) {
            this.addLanguage(d);
            langData = a.languages[d];
            if (!langData[f]) {
                langData[f] = {};
            }
            $extend(langData[f], c);
            if (d == this.getCurrentLanguage()) {
                this.load();
                this.fireEvent("langChange", d);
            }
            return this;
        },
        list: function() {
            return Hash.getKeys(a.languages);
        }
    });
})(); (function() {
    var c = this;
    var b = function() {
        if (c.console && console.log) {
            try {
                console.log.apply(console, arguments);
            } catch(d) {
                console.log(Array.slice(arguments));
            }
        } else {
            Log.logged.push(arguments);
        }
        return this;
    };
    var a = function() {
        this.logged.push(arguments);
        return this;
    };
    this.Log = new Class({
        logged: [],
        log: a,
        resetLog: function() {
            this.logged.empty();
            return this;
        },
        enableLog: function() {
            this.log = b;
            this.logged.each(function(d) {
                this.log.apply(this, d);
            },
            this);
            return this.resetLog();
        },
        disableLog: function() {
            this.log = a;
            return this;
        }
    });
    Log.extend(new Log).enableLog();
    Log.logger = function() {
        return this.log.apply(this, arguments);
    };
})();
Class.refactor = function(b, a) {
    $each(a, 
    function(f, d) {
        var c = b.prototype[d];
        if (c && (c = c._origin ? c._origin: c) && typeof f == "function") {
            b.implement(d, 
            function() {
                var g = this.previous;
                this.previous = c;
                var h = f.apply(this, arguments);
                this.previous = g;
                return h;
            });
        } else {
            b.implement(d, f);
        }
    });
    return b;
};
Class.Mutators.Binds = function(a) {
    return a;
};
Class.Mutators.initialize = function(a) {
    return function() {
        $splat(this.Binds).each(function(b) {
            var c = this[b];
            if (c) {
                this[b] = c.bind(this);
            }
        },
        this);
        return a.apply(this, arguments);
    };
};
Class.Occlude = new Class({
    occlude: function(c, b) {
        b = document.id(b || this.element);
        var a = b.retrieve(c || this.property);
        if (a && !$defined(this.occluded)) {
            return this.occluded = a;
        }
        this.occluded = false;
        b.store(c || this.property, this);
        return this.occluded;
    }
}); (function() {
    var a = {
        wait: function(b) {
            return this.chain(function() {
                this.callChain.delay($pick(b, 500), this);
            }.bind(this));
        }
    };
    Chain.implement(a);
    if (window.Fx) {
        Fx.implement(a); ["Css", "Tween", "Elements"].each(function(b) {
            if (Fx[b]) {
                Fx[b].implement(a);
            }
        });
    }
    Element.implement({
        chains: function(b) {
            $splat($pick(b, ["tween", "morph", "reveal"])).each(function(c) {
                c = this.get(c);
                if (!c) {
                    return;
                }
                c.setOptions({
                    link: "chain"
                });
            },
            this);
            return this;
        },
        pauseFx: function(c, b) {
            this.chains(b).get($pick(b, "tween")).wait(c);
            return this;
        }
    });
})();
Array.implement({
    min: function() {
        return Math.min.apply(null, this);
    },
    max: function() {
        return Math.max.apply(null, this);
    },
    average: function() {
        return this.length ? this.sum() / this.length: 0;
    },
    sum: function() {
        var a = 0,
        b = this.length;
        if (b) {
            do {
                a += this[--b];
            }
            while (b);
        }
        return a;
    },
    unique: function() {
        return [].combine(this);
    },
    shuffle: function() {
        for (var b = this.length; b && --b;) {
            var a = this[b],
            c = Math.floor(Math.random() * (b + 1));
            this[b] = this[c];
            this[c] = a;
        }
        return this;
    }
}); (function() {
    var j = this.Date;
    if (!j.now) {
        j.now = $time;
    }
    j.Methods = {
        ms: "Milliseconds",
        year: "FullYear",
        min: "Minutes",
        mo: "Month",
        sec: "Seconds",
        hr: "Hours"
    }; ["Date", "Day", "FullYear", "Hours", "Milliseconds", "Minutes", "Month", "Seconds", "Time", "TimezoneOffset", "Week", "Timezone", "GMTOffset", "DayOfYear", "LastMonth", "LastDayOfMonth", "UTCDate", "UTCDay", "UTCFullYear", "AMPM", "Ordinal", "UTCHours", "UTCMilliseconds", "UTCMinutes", "UTCMonth", "UTCSeconds", "UTCMilliseconds"].each(function(q) {
        j.Methods[q.toLowerCase()] = q;
    });
    var d = function(r, q) {
        return new Array(q - String(r).length + 1).join("0") + r;
    };
    j.implement({
        set: function(t, r) {
            switch ($type(t)) {
            case "object":
                for (var s in t) {
                    this.set(s, t[s]);
                }
                break;
            case "string":
                t = t.toLowerCase();
                var q = j.Methods;
                if (q[t]) {
                    this["set" + q[t]](r);
                }
            }
            return this;
        },
        get: function(r) {
            r = r.toLowerCase();
            var q = j.Methods;
            if (q[r]) {
                return this["get" + q[r]]();
            }
            return null;
        },
        clone: function() {
            return new j(this.get("time"));
        },
        increment: function(q, s) {
            q = q || "day";
            s = $pick(s, 1);
            switch (q) {
            case "year":
                return this.increment("month", s * 12);
            case "month":
                var r = this.get("date");
                this.set("date", 1).set("mo", this.get("mo") + s);
                return this.set("date", r.min(this.get("lastdayofmonth")));
            case "week":
                return this.increment("day", s * 7);
            case "day":
                return this.set("date", this.get("date") + s);
            }
            if (!j.units[q]) {
                throw new Error(q + " is not a supported interval");
            }
            return this.set("time", this.get("time") + s * j.units[q]());
        },
        decrement: function(q, r) {
            return this.increment(q, -1 * $pick(r, 1));
        },
        isLeapYear: function() {
            return j.isLeapYear(this.get("year"));
        },
        clearTime: function() {
            return this.set({
                hr: 0,
                min: 0,
                sec: 0,
                ms: 0
            });
        },
        diff: function(r, q) {
            if ($type(r) == "string") {
                r = j.parse(r);
            }
            return ((r - this) / j.units[q || "day"](3, 3)).round();
        },
        getLastDayOfMonth: function() {
            return j.daysInMonth(this.get("mo"), this.get("year"));
        },
        getDayOfYear: function() {
            return (j.UTC(this.get("year"), this.get("mo"), this.get("date") + 1) - j.UTC(this.get("year"), 0, 1)) / j.units.day();
        },
        getWeek: function() {
            return (this.get("dayofyear") / 7).ceil();
        },
        getOrdinal: function(q) {
            return j.getMsg("ordinal", q || this.get("date"));
        },
        getTimezone: function() {
            return this.toString().replace(/^.*? ([A-Z]{3}).[0-9]{4}.*$/, "$1").replace(/^.*?\(([A-Z])[a-z]+ ([A-Z])[a-z]+ ([A-Z])[a-z]+\)$/, "$1$2$3");
        },
        getGMTOffset: function() {
            var q = this.get("timezoneOffset");
            return ((q > 0) ? "-": "+") + d((q.abs() / 60).floor(), 2) + d(q % 60, 2);
        },
        setAMPM: function(q) {
            q = q.toUpperCase();
            var r = this.get("hr");
            if (r > 11 && q == "AM") {
                return this.decrement("hour", 12);
            } else {
                if (r < 12 && q == "PM") {
                    return this.increment("hour", 12);
                }
            }
            return this;
        },
        getAMPM: function() {
            return (this.get("hr") < 12) ? "AM": "PM";
        },
        parse: function(q) {
            this.set("time", j.parse(q));
            return this;
        },
        isValid: function(q) {
            return ! isNaN((q || this).valueOf());
        },
        format: function(q) {
            if (!this.isValid()) {
                return "invalid date";
            }
            q = q || "%x %X";
            q = l[q.toLowerCase()] || q;
            var r = this;
            return q.replace(/%([a-z%])/gi, 
            function(t, s) {
                switch (s) {
                case "a":
                    return j.getMsg("days")[r.get("day")].substr(0, 3);
                case "A":
                    return j.getMsg("days")[r.get("day")];
                case "b":
                    return j.getMsg("months")[r.get("month")].substr(0, 3);
                case "B":
                    return j.getMsg("months")[r.get("month")];
                case "c":
                    return r.toString();
                case "d":
                    return d(r.get("date"), 2);
                case "D":
                    return r.get("date");
                case "e":
                    return r.get("date");
                case "H":
                    return d(r.get("hr"), 2);
                case "I":
                    return ((r.get("hr") % 12) || 12);
                case "j":
                    return d(r.get("dayofyear"), 3);
                case "m":
                    return d((r.get("mo") + 1), 2);
                case "M":
                    return d(r.get("min"), 2);
                case "o":
                    return r.get("ordinal");
                case "p":
                    return j.getMsg(r.get("ampm"));
                case "s":
                    return Math.round(r / 1000);
                case "S":
                    return d(r.get("seconds"), 2);
                case "U":
                    return d(r.get("week"), 2);
                case "w":
                    return r.get("day");
                case "x":
                    return r.format(j.getMsg("shortDate"));
                case "X":
                    return r.format(j.getMsg("shortTime"));
                case "y":
                    return r.get("year").toString().substr(2);
                case "Y":
                    return r.get("year");
                case "T":
                    return r.get("GMTOffset");
                case "Z":
                    return r.get("Timezone");
                case "z":
                    return d(r.get("ms"), 3);
                }
                return s;
            });
        },
        toISOString: function() {
            return this.format("iso8601");
        }
    });
    j.alias("toISOString", "toJSON");
    j.alias("diff", "compare");
    j.alias("format", "strftime");
    var l = {
        db: "%Y-%m-%d %H:%M:%S",
        compact: "%Y%m%dT%H%M%S",
        iso8601: "%Y-%m-%dT%H:%M:%S%T",
        rfc822: "%a, %d %b %Y %H:%M:%S %Z",
        "short": "%d %b %H:%M",
        "long": "%B %d, %Y %H:%M"
    };
    var h = [];
    var f = j.parse;
    var o = function(t, v, s) {
        var r = -1;
        var u = j.getMsg(t + "s");
        switch ($type(v)) {
        case "object":
            r = u[v.get(t)];
            break;
        case "number":
            r = u[v];
            if (!r) {
                throw new Error("Invalid " + t + " index: " + v);
            }
            break;
        case "string":
            var q = u.filter(function(w) {
                return this.test(w);
            },
            new RegExp("^" + v, "i"));
            if (!q.length) {
                throw new Error("Invalid " + t + " string");
            }
            if (q.length > 1) {
                throw new Error("Ambiguous " + t);
            }
            r = q[0];
        }
        return (s) ? u.indexOf(r) : r;
    };
    j.extend({
        getMsg: function(r, q) {
            return MooTools.lang.get("Date", r, q);
        },
        units: {
            ms: $lambda(1),
            second: $lambda(1000),
            minute: $lambda(60000),
            hour: $lambda(3600000),
            day: $lambda(86400000),
            week: $lambda(608400000),
            month: function(r, q) {
                var s = new j;
                return j.daysInMonth($pick(r, s.get("mo")), $pick(q, s.get("year"))) * 86400000;
            },
            year: function(q) {
                q = q || new j().get("year");
                return j.isLeapYear(q) ? 31622400000: 31536000000;
            }
        },
        daysInMonth: function(r, q) {
            return [31, j.isLeapYear(q) ? 29: 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][r];
        },
        isLeapYear: function(q) {
            return ((q % 4 === 0) && (q % 100 !== 0)) || (q % 400 === 0);
        },
        parse: function(s) {
            var r = $type(s);
            if (r == "number") {
                return new j(s);
            }
            if (r != "string") {
                return s;
            }
            s = s.clean();
            if (!s.length) {
                return null;
            }
            var q;
            h.some(function(u) {
                var t = u.re.exec(s);
                return (t) ? (q = u.handler(t)) : false;
            });
            return q || new j(f(s));
        },
        parseDay: function(q, r) {
            return o("day", q, r);
        },
        parseMonth: function(r, q) {
            return o("month", r, q);
        },
        parseUTC: function(r) {
            var q = new j(r);
            var s = j.UTC(q.get("year"), q.get("mo"), q.get("date"), q.get("hr"), q.get("min"), q.get("sec"), q.get("ms"));
            return new j(s);
        },
        orderIndex: function(q) {
            return j.getMsg("dateOrder").indexOf(q) + 1;
        },
        defineFormat: function(q, r) {
            l[q] = r;
        },
        defineFormats: function(q) {
            for (var r in q) {
                j.defineFormat(r, q[r]);
            }
        },
        parsePatterns: h,
        defineParser: function(q) {
            h.push((q.re && q.handler) ? q: m(q));
        },
        defineParsers: function() {
            Array.flatten(arguments).each(j.defineParser);
        },
        define2DigitYearStart: function(q) {
            i = q % 100;
            n = q - i;
        }
    });
    var n = 1900;
    var i = 70;
    var k = function(q) {
        return new RegExp("(?:" + j.getMsg(q).map(function(r) {
            return r.substr(0, 3);

        }).join("|") + ")[a-z]*");
    };
    var a = function(q) {
        switch (q) {
        case "x":
            return ((j.orderIndex("month") == 1) ? "%m[-./]%d": "%d[-./]%m") + "([-./]%y)?";
        case "X":
            return "%H([.:]%M)?([.:]%S([.:]%s)?)? ?%p? ?%T?";
        }
        return null;
    };
    var p = {
        d: /[0-2]?[0-9]|3[01]/,
        H: /[01]?[0-9]|2[0-3]/,
        I: /0?[1-9]|1[0-2]/,
        M: /[0-5]?\d/,
        s: /\d+/,
        o: /[a-z]*/,
        p: /[ap]\.?m\.?/,
        y: /\d{2}|\d{4}/,
        Y: /\d{4}/,
        T: /Z|[+-]\d{2}(?::?\d{2})?/
    };
    p.m = p.I;
    p.S = p.M;
    var c;
    var b = function(q) {
        c = q;
        p.a = p.A = k("days");
        p.b = p.B = k("months");
        h.each(function(s, r) {
            if (s.format) {
                h[r] = m(s.format);
            }
        });
    };
    var m = function(s) {
        if (!c) {
            return {
                format: s
            };
        }
        var q = [];
        var r = (s.source || s).replace(/%([a-z])/gi, 
        function(u, t) {
            return a(t) || u;
        }).replace(/\((?!\?)/g, "(?:").replace(/ (?!\?|\*)/g, ",? ").replace(/%([a-z%])/gi, 
        function(u, t) {
            var v = p[t];
            if (!v) {
                return t;
            }
            q.push(t);
            return "(" + v.source + ")";
        }).replace(/\[a-z\]/gi, "[a-z\\u00c0-\\uffff]");
        return {
            format: s,
            re: new RegExp("^" + r + "$", "i"),
            handler: function(w) {
                w = w.slice(1).associate(q);
                var t = new j().clearTime(),
                v = w.y || w.Y;
                if (v != null) {
                    g.call(t, "y", v);
                }
                if ("d" in w) {
                    g.call(t, "d", 1);
                }
                if ("m" in w || "b" in w || "B" in w) {
                    g.call(t, "m", 1);
                }
                for (var u in w) {
                    g.call(t, u, w[u]);
                }
                return t;
            }
        };
    };
    var g = function(q, r) {
        if (!r) {
            return this;
        }
        switch (q) {
        case "a":
        case "A":
            return this.set("day", j.parseDay(r, true));
        case "b":
        case "B":
            return this.set("mo", j.parseMonth(r, true));
        case "d":
            return this.set("date", r);
        case "H":
        case "I":
            return this.set("hr", r);
        case "m":
            return this.set("mo", r - 1);
        case "M":
            return this.set("min", r);
        case "p":
            return this.set("ampm", r.replace(/\./g, ""));
        case "S":
            return this.set("sec", r);
        case "s":
            return this.set("ms", ("0." + r) * 1000);
        case "w":
            return this.set("day", r);
        case "Y":
            return this.set("year", r);
        case "y":
            r = +r;
            if (r < 100) {
                r += n + (r < i ? 100: 0);
            }
            return this.set("year", r);
        case "T":
            if (r == "Z") {
                r = "+00";
            }
            var s = r.match(/([+-])(\d{2}):?(\d{2})?/);
            s = (s[1] + "1") * (s[2] * 60 + ( + s[3] || 0)) + this.getTimezoneOffset();
            return this.set("time", this - s * 60000);
        }
        return this;
    };
    j.defineParsers("%Y([-./]%m([-./]%d((T| )%X)?)?)?", "%Y%m%d(T%H(%M%S?)?)?", "%x( %X)?", "%d%o( %b( %Y)?)?( %X)?", "%b( %d%o)?( %Y)?( %X)?", "%Y %b( %d%o( %X)?)?", "%o %b %d %X %T %Y");
    MooTools.lang.addEvent("langChange", 
    function(q) {
        if (MooTools.lang.get("Date")) {
            b(q);
        }
    }).fireEvent("langChange", MooTools.lang.getCurrentLanguage());
})();
Date.implement({
    timeDiffInWords: function(a) {
        return Date.distanceOfTimeInWords(this, a || new Date);
    },
    timeDiff: function(h, b) {
        if (h == null) {
            h = new Date;
        }
        var g = ((h - this) / 1000).toInt();
        if (!g) {
            return "0s";
        }
        var a = {
            s: 60,
            m: 60,
            h: 24,
            d: 365,
            y: 0
        };
        var f,
        d = [];
        for (var c in a) {
            if (!g) {
                break;
            }
            if ((f = a[c])) {
                d.unshift((g % f) + c);
                g = (g / f).toInt();
            } else {
                d.unshift(g + c);
            }
        }
        return d.join(b || ":");
    }
});
Date.alias("timeDiffInWords", "timeAgoInWords");
Date.extend({
    distanceOfTimeInWords: function(b, a) {
        return Date.getTimePhrase(((a - b) / 1000).toInt());
    },
    getTimePhrase: function(g) {
        var d = (g < 0) ? "Until": "Ago";
        if (g < 0) {
            g *= -1;
        }
        var b = {
            minute: 60,
            hour: 60,
            day: 24,
            week: 7,
            month: 52 / 12,
            year: 12,
            eon: Infinity
        };
        var f = "lessThanMinute";
        for (var c in b) {
            var a = b[c];
            if (g < 1.5 * a) {
                if (g > 0.75 * a) {
                    f = c;
                }
                break;
            }
            g /= a;
            f = c + "s";
        }
        return Date.getMsg(f + d, g).substitute({
            delta: g.round()
        });
    }
});
Date.defineParsers({
    re: /^(?:tod|tom|yes)/i,
    handler: function(a) {
        var b = new Date().clearTime();
        switch (a[0]) {
        case "tom":
            return b.increment();
        case "yes":
            return b.decrement();
        default:
            return b;
        }
    }
},
{
    re: /^(next|last) ([a-z]+)$/i,
    handler: function(f) {
        var g = new Date().clearTime();
        var b = g.getDay();
        var c = Date.parseDay(f[2], true);
        var a = c - b;
        if (c <= b) {
            a += 7;
        }
        if (f[1] == "last") {
            a -= 7;
        }
        return g.set("date", g.getDate() + a);
    }
});
Hash.implement({
    getFromPath: function(a) {
        var b = this.getClean();
        a.replace(/\[([^\]]+)\]|\.([^.[]+)|[^[.]+/g, 
        function(c) {
            if (!b) {
                return null;
            }
            var d = arguments[2] || arguments[1] || arguments[0];
            b = (d in b) ? b[d] : null;
            return c;
        });
        return b;
    },
    cleanValues: function(a) {
        a = a || $defined;
        this.each(function(c, b) {
            if (!a(c)) {
                this.erase(b);
            }
        },
        this);
        return this;
    },
    run: function() {
        var a = arguments;
        this.each(function(c, b) {
            if ($type(c) == "function") {
                c.run(a);
            }
        });
    }
}); (function() {
    var c = {
        a: "[àáâãäåăą]",
        A: "[ÀÁÂÃÄÅĂĄ]",
        c: "[ćčç]",
        C: "[ĆČÇ]",
        d: "[ďđ]",
        D: "[ĎÐ]",
        e: "[èéêëěę]",
        E: "[ÈÉÊËĚĘ]",
        g: "[ğ]",
        G: "[Ğ]",
        i: "[ìíîï]",
        I: "[ÌÍÎÏ]",
        l: "[ĺľł]",
        L: "[ĹĽŁ]",
        n: "[ñňń]",
        N: "[ÑŇŃ]",
        o: "[òóôõöøő]",
        O: "[ÒÓÔÕÖØ]",
        r: "[řŕ]",
        R: "[ŘŔ]",
        s: "[ššş]",
        S: "[ŠŞŚ]",
        t: "[ťţ]",
        T: "[ŤŢ]",
        ue: "[ü]",
        UE: "[Ü]",
        u: "[ùúûůµ]",
        U: "[ÙÚÛŮ]",
        y: "[ÿý]",
        Y: "[ŸÝ]",
        z: "[žźż]",
        Z: "[ŽŹŻ]",
        th: "[þ]",
        TH: "[Þ]",
        dh: "[ð]",
        DH: "[Ð]",
        ss: "[ß]",
        oe: "[œ]",
        OE: "[Œ]",
        ae: "[æ]",
        AE: "[Æ]"
    },
    b = {
        " ": "[\xa0\u2002\u2003\u2009]",
        "*": "[\xb7]",
        "'": "[\u2018\u2019]",
        '"': "[\u201c\u201d]",
        "...": "[\u2026]",
        "-": "[\u2013]",
        "--": "[\u2014]",
        "&raquo;": "[\uFFFD]"
    };
    function a(g, h) {
        var f = g;
        for (key in h) {
            f = f.replace(new RegExp(h[key], "g"), key);
        }
        return f;
    }
    function d(f, g) {
        f = f || "";
        var h = g ? "<" + f + "(?!\\w)[^>]*>([\\s\\S]*?)</" + f + "(?!\\w)>": "</?" + f + "([^>]+)?>";
        reg = new RegExp(h, "gi");
        return reg;
    }
    String.implement({
        standardize: function() {
            return a(this, c);
        },
        repeat: function(f) {
            return new Array(f + 1).join(this);
        },
        pad: function(g, i, f) {
            if (this.length >= g) {
                return this;
            }
            var h = (i == null ? " ": "" + i).repeat(g - this.length).substr(0, g - this.length);
            if (!f || f == "right") {
                return this + h;
            }
            if (f == "left") {
                return h + this;
            }
            return h.substr(0, (h.length / 2).floor()) + this + h.substr(0, (h.length / 2).ceil());
        },
        getTags: function(f, g) {
            return this.match(d(f, g)) || [];
        },
        stripTags: function(f, g) {
            return this.replace(d(f, g), "");
        },
        tidy: function() {
            return a(this, b);
        }
    });
})();
String.implement({
    parseQueryString: function(d, a) {
        if (d == null) {
            d = true;
        }
        if (a == null) {
            a = true;
        }
        var c = this.split(/[&;]/),
        b = {};
        if (c.length) {
            c.each(function(j) {
                var f = j.indexOf("="),
                g = f < 0 ? [""] : j.substr(0, f).match(/([^\]\[]+|(\B)(?=\]))/g),
                h = a ? decodeURIComponent(j.substr(f + 1)) : j.substr(f + 1),
                i = b;
                g.each(function(l, k) {
                    if (d) {
                        l = decodeURIComponent(l);
                    }
                    var m = i[l];
                    if (k < g.length - 1) {
                        i = i[l] = m || {};
                    } else {
                        if ($type(m) == "array") {
                            m.push(h);
                        } else {
                            i[l] = $defined(m) ? [m, h] : h;
                        }
                    }
                });
            });
        }
        return b;
    },
    cleanQueryString: function(a) {
        return this.split("&").filter(function(f) {
            var b = f.indexOf("="),
            c = b < 0 ? "": f.substr(0, b),
            d = f.substr(b + 1);
            return a ? a.run([c, d]) : $chk(d);
        }).join("&");
    }
});
var URI = new Class({
    Implements: Options,
    options: {},
    regex: /^(?:(\w+):)?(?:\/\/(?:(?:([^:@\/]*):?([^:@\/]*))?@)?([^:\/?#]*)(?::(\d*))?)?(\.\.?$|(?:[^?#\/]*\/)*)([^?#]*)(?:\?([^#]*))?(?:#(.*))?/,
    parts: ["scheme", "user", "password", "host", "port", "directory", "file", "query", "fragment"],
    schemes: {
        http: 80,
        https: 443,
        ftp: 21,
        rtsp: 554,
        mms: 1755,
        file: 0
    },
    initialize: function(b, a) {
        this.setOptions(a);
        var c = this.options.base || URI.base;
        if (!b) {
            b = c;
        }
        if (b && b.parsed) {
            this.parsed = $unlink(b.parsed);
        } else {
            this.set("value", b.href || b.toString(), c ? new URI(c) : false);
        }
    },
    parse: function(c, b) {
        var a = c.match(this.regex);
        if (!a) {
            return false;
        }
        a.shift();
        return this.merge(a.associate(this.parts), b);
    },
    merge: function(b, a) {
        if ((!b || !b.scheme) && (!a || !a.scheme)) {
            return false;
        }
        if (a) {
            this.parts.every(function(c) {
                if (b[c]) {
                    return false;
                }
                b[c] = a[c] || "";
                return true;
            });
        }
        b.port = b.port || this.schemes[b.scheme.toLowerCase()];
        b.directory = b.directory ? this.parseDirectory(b.directory, a ? a.directory: "") : "/";
        return b;
    },
    parseDirectory: function(b, c) {
        b = (b.substr(0, 1) == "/" ? "": (c || "/")) + b;
        if (!b.test(URI.regs.directoryDot)) {
            return b;
        }
        var a = [];
        b.replace(URI.regs.endSlash, "").split("/").each(function(d) {
            if (d == ".." && a.length > 0) {
                a.pop();
            } else {
                if (d != ".") {
                    a.push(d);
                }
            }
        });
        return a.join("/") + "/";
    },
    combine: function(a) {
        return a.value || a.scheme + "://" + (a.user ? a.user + (a.password ? ":" + a.password: "") + "@": "") + (a.host || "") + (a.port && a.port != this.schemes[a.scheme] ? ":" + a.port: "") + (a.directory || "/") + (a.file || "") + (a.query ? "?" + a.query: "") + (a.fragment ? "#" + a.fragment: "");
    },
    set: function(b, d, c) {
        if (b == "value") {
            var a = d.match(URI.regs.scheme);
            if (a) {
                a = a[1];
            }
            if (a && !$defined(this.schemes[a.toLowerCase()])) {
                this.parsed = {
                    scheme: a,
                    value: d
                };
            } else {
                this.parsed = this.parse(d, (c || this).parsed) || (a ? {
                    scheme: a,
                    value: d
                }: {
                    value: d
                });
            }
        } else {
            if (b == "data") {
                this.setData(d);
            } else {
                this.parsed[b] = d;
            }
        }
        return this;
    },
    get: function(a, b) {
        switch (a) {
        case "value":
            return this.combine(this.parsed, b ? b.parsed: false);
        case "data":
            return this.getData();
        }
        return this.parsed[a] || "";
    },
    go: function() {
        document.location.href = this.toString();
    },
    toURI: function() {
        return this;
    },
    getData: function(c, b) {
        var a = this.get(b || "query");
        if (!$chk(a)) {
            return c ? null: {};
        }
        var d = a.parseQueryString();
        return c ? d[c] : d;
    },
    setData: function(a, c, b) {
        if (typeof a == "string") {
            data = this.getData();
            data[arguments[0]] = arguments[1];
            a = data;
        } else {
            if (c) {
                a = $merge(this.getData(), a);
            }
        }
        return this.set(b || "query", Hash.toQueryString(a));
    },
    clearData: function(a) {
        return this.set(a || "query", "");
    }
});
URI.prototype.toString = URI.prototype.valueOf = function() {
    return this.get("value");
};
URI.regs = {
    endSlash: /\/$/,
    scheme: /^(\w+):/,
    directoryDot: /\.\/|\.$/
};
URI.base = new URI(document.getElements("base[href]", true).getLast(), {
    base: document.location
});
String.implement({
    toURI: function(a) {
        return new URI(this, a);
    }
});
URI = Class.refactor(URI, {
    combine: function(g, f) {
        if (!f || g.scheme != f.scheme || g.host != f.host || g.port != f.port) {
            return this.previous.apply(this, arguments);
        }
        var a = g.file + (g.query ? "?" + g.query: "") + (g.fragment ? "#" + g.fragment: "");
        if (!f.directory) {
            return (g.directory || (g.file ? "": "./")) + a;
        }
        var d = f.directory.split("/"),
        c = g.directory.split("/"),
        h = "",
        j;
        var b = 0;
        for (j = 0; j < d.length && j < c.length && d[j] == c[j]; j++) {}
        for (b = 0; b < d.length - j - 1; b++) {
            h += "../";
        }
        for (b = j; b < c.length - 1; b++) {
            h += c[b] + "/";
        }
        return (h || (g.file ? "": "./")) + a;
    },
    toAbsolute: function(a) {
        a = new URI(a);
        if (a) {
            a.set("directory", "").set("file", "");
        }
        return this.toRelative(a);
    },
    toRelative: function(a) {
        return this.get("value", new URI(a));
    }
});
Element.implement({
    tidy: function() {
        this.set("value", this.get("value").tidy());
    },
    getTextInRange: function(b, a) {
        return this.get("value").substring(b, a);
    },
    getSelectedText: function() {
        if (this.setSelectionRange) {
            return this.getTextInRange(this.getSelectionStart(), this.getSelectionEnd());
        }
        return document.selection.createRange().text;
    },
    getSelectedRange: function() {
        if ($defined(this.selectionStart)) {
            return {
                start: this.selectionStart,
                end: this.selectionEnd
            };
        }
        var f = {
            start: 0,
            end: 0
        };
        var a = this.getDocument().selection.createRange();
        if (!a || a.parentElement() != this) {
            return f;
        }
        var c = a.duplicate();
        if (this.type == "text") {
            f.start = 0 - c.moveStart("character", -100000);
            f.end = f.start + a.text.length;
        } else {
            var b = this.get("value");
            var d = b.length;
            c.moveToElementText(this);
            c.setEndPoint("StartToEnd", a);
            if (c.text.length) {
                d -= b.match(/[\n\r]*$/)[0].length;
            }
            f.end = d - c.text.length;
            c.setEndPoint("StartToStart", a);
            f.start = d - c.text.length;
        }
        return f;
    },
    getSelectionStart: function() {
        return this.getSelectedRange().start;
    },
    getSelectionEnd: function() {
        return this.getSelectedRange().end;
    },
    setCaretPosition: function(a) {
        if (a == "end") {
            a = this.get("value").length;
        }
        this.selectRange(a, a);
        return this;
    },
    getCaretPosition: function() {
        return this.getSelectedRange().start;
    },
    selectRange: function(f, a) {
        if (this.setSelectionRange) {
            this.focus();
            this.setSelectionRange(f, a);
        } else {
            var c = this.get("value");
            var d = c.substr(f, a - f).replace(/\r/g, "").length;
            f = c.substr(0, f).replace(/\r/g, "").length;
            var b = this.createTextRange();
            b.collapse(true);
            b.moveEnd("character", f + d);
            b.moveStart("character", f);
            b.select();
        }
        return this;
    },
    insertAtCursor: function(b, a) {
        var d = this.getSelectedRange();
        var c = this.get("value");
        this.set("value", c.substring(0, d.start) + b + c.substring(d.end, c.length));
        if ($pick(a, true)) {
            this.selectRange(d.start, d.start + b.length);
        } else {
            this.setCaretPosition(d.start + b.length);
        }
        return this;
    },
    insertAroundCursor: function(b, a) {
        b = $extend({
            before: "",
            defaultMiddle: "",
            after: ""
        },
        b);
        var c = this.getSelectedText() || b.defaultMiddle;
        var h = this.getSelectedRange();
        var g = this.get("value");
        if (h.start == h.end) {
            this.set("value", g.substring(0, h.start) + b.before + c + b.after + g.substring(h.end, g.length));
            this.selectRange(h.start + b.before.length, h.end + b.before.length + c.length);
        } else {
            var d = g.substring(h.start, h.end);
            this.set("value", g.substring(0, h.start) + b.before + d + b.after + g.substring(h.end, g.length));
            var f = h.start + b.before.length;
            if ($pick(a, true)) {
                this.selectRange(f, f + d.length);
            } else {
                this.setCaretPosition(f + g.length);
            }
        }
        return this;
    }
});
Elements.from = function(f, d) {
    if ($pick(d, true)) {
        f = f.stripScripts();
    }
    var b,
    c = f.match(/^\s*<(t[dhr]|tbody|tfoot|thead)/i);
    if (c) {
        b = new Element("table");
        var a = c[1].toLowerCase();
        if (["td", "th", "tr"].contains(a)) {
            b = new Element("tbody").inject(b);
            if (a != "tr") {
                b = new Element("tr").inject(b);
            }
        }
    }
    return (b || new Element("div")).set("html", f).getChildren();
}; (function(d, f) {
    var c = /(.*?):relay\(((?:\(.*?\)|.)+)\)$/,
    b = /[+>~\s]/,
    g = function(h) {
        var i = h.match(c);
        return ! i ? {
            event: h
        }: {
            event: i[1],
            selector: i[2]
        };
    },
    a = function(n, h) {
        var l = n.target;
        if (b.test(h = h.trim())) {
            var k = this.getElements(h);
            for (var j = k.length; j--;) {
                var m = k[j];
                if (l == m || m.hasChild(l)) {
                    return m;
                }
            }
        } else {
            for (; l && l != this; l = l.parentNode) {
                if (Element.match(l, h)) {
                    return document.id(l);
                }
            }
        }
        return null;
    };
    Element.implement({
        addEvent: function(l, k) {
            var j = g(l);
            if (j.selector) {
                var i = this.retrieve("delegation:_delegateMonitors", {});
                if (!i[l]) {
                    var h = function(n) {
                        var m = a.call(this, n, j.selector);
                        if (m) {
                            this.fireEvent(l, [n, m], 0, m);
                        }
                    }.bind(this);
                    i[l] = h;
                    d.call(this, j.event, h);
                }
            }
            return d.apply(this, arguments);
        },
        removeEvent: function(l, k) {
            var j = g(l);
            if (j.selector) {
                var i = this.retrieve("events");
                if (!i || !i[l] || (k && !i[l].keys.contains(k))) {
                    return this;
                }
                if (k) {
                    f.apply(this, [l, k]);
                } else {
                    f.apply(this, l);
                }
                i = this.retrieve("events");
                if (i && i[l] && i[l].keys.length == 0) {
                    var h = this.retrieve("delegation:_delegateMonitors", {});
                    f.apply(this, [j.event, h[l]]);
                    delete h[l];
                }
                return this;
            }
            return f.apply(this, arguments);
        },
        fireEvent: function(l, i, h, n) {
            var j = this.retrieve("events");
            var m,
            k;
            if (i) {
                m = i[0];
                k = i[1];
            }
            if (!j || !j[l]) {
                return this;
            }
            j[l].keys.each(function(o) {
                o.create({
                    bind: n || this,
                    delay: h,
                    arguments: i
                })();
            },
            this);
            return this;
        }
    });
})(Element.prototype.addEvent, Element.prototype.removeEvent);
try {
    if (typeof HTMLElement != "undefined") {
        HTMLElement.prototype.fireEvent = Element.prototype.fireEvent;
    }
} catch(e) {}
Element.implement({
    measure: function(f) {
        var h = function(i) {
            return !! (!i || i.offsetHeight || i.offsetWidth);
        };
        if (h(this)) {
            return f.apply(this);
        }
        var d = this.getParent(),
        g = [],
        b = [];
        while (!h(d) && d != document.body) {
            b.push(d.expose());
            d = d.getParent();
        }
        var c = this.expose();
        var a = f.apply(this);
        c();
        b.each(function(i) {
            i();
        });
        return a;
    },
    expose: function() {
        if (this.getStyle("display") != "none") {
            return $empty;
        }
        var a = this.style.cssText;
        this.setStyles({
            display: "block",
            position: "absolute",
            visibility: "hidden"
        });
        return function() {
            this.style.cssText = a;
        }.bind(this);
    },
    getDimensions: function(a) {
        a = $merge({
            computeSize: false
        },
        a);
        var f = {};
        var d = function(h, g) {
            return (g.computeSize) ? h.getComputedSize(g) : h.getSize();
        };
        var b = this.getParent("body");
        if (b && this.getStyle("display") == "none") {
            f = this.measure(function() {
                return d(this, a);
            });
        } else {
            if (b) {
                try {
                    f = d(this, a);
                } catch(c) {}
            } else {
                f = {
                    x: 0,
                    y: 0
                };
            }
        }
        return $chk(f.x) ? $extend(f, {
            width: f.x,
            height: f.y
        }) : $extend(f, {
            x: f.width,
            y: f.height
        });
    },
    getComputedSize: function(a) {
        if (a && a.plains) {
            a.planes = a.plains;
        }
        a = $merge({
            styles: ["padding", "border"],
            planes: {
                height: ["top", "bottom"],
                width: ["left", "right"]
            },
            mode: "both"
        },
        a);
        var c = {
            width: 0,
            height: 0
        };
        switch (a.mode) {
        case "vertical":
            delete c.width;
            delete a.planes.width;
            break;
        case "horizontal":
            delete c.height;
            delete a.planes.height;
            break;
        }
        var b = [];
        $each(a.planes, 
        function(g, h) {
            g.each(function(i) {
                a.styles.each(function(j) {
                    b.push((j == "border") ? j + "-" + i + "-width": j + "-" + i);
                });
            });
        });
        var f = {};
        b.each(function(g) {
            f[g] = this.getComputedStyle(g);
        },
        this);
        var d = [];
        $each(a.planes, 
        function(g, h) {
            var i = h.capitalize();
            c["total" + i] = c["computed" + i] = 0;
            g.each(function(j) {
                c["computed" + j.capitalize()] = 0;
                b.each(function(l, k) {
                    if (l.test(j)) {
                        f[l] = f[l].toInt() || 0;
                        c["total" + i] = c["total" + i] + f[l];
                        c["computed" + j.capitalize()] = c["computed" + j.capitalize()] + f[l];
                    }
                    if (l.test(j) && h != l && (l.test("border") || l.test("padding")) && !d.contains(l)) {
                        d.push(l);
                        c["computed" + i] = c["computed" + i] - f[l];
                    }
                });
            });
        }); ["Width", "Height"].each(function(h) {
            var g = h.toLowerCase();
            if (!$chk(c[g])) {
                return;
            }
            c[g] = c[g] + this["offset" + h] + c["computed" + h];
            c["total" + h] = c[g] + c["total" + h];
            delete c["computed" + h];
        },
        this);
        return $extend(f, c);
    }
}); (function() {
    var a = false,
    b = false;
    var c = function() {
        var d = new Element("div").setStyles({
            position: "fixed",
            top: 0,
            right: 0
        }).inject(document.body);
        a = (d.offsetTop === 0);
        d.dispose();
        b = true;
    };
    Element.implement({
        pin: function(i, g) {
            if (!b) {
                c();
            }
            if (this.getStyle("display") == "none") {
                return this;
            }
            var k,
            l = window.getScroll();
            if (i !== false) {
                k = this.getPosition(a ? document.body: this.getOffsetParent());
                if (!this.retrieve("pin:_pinned")) {
                    var h = {
                        top: k.y - l.y,
                        left: k.x - l.x
                    };
                    if (a && !g) {
                        this.setStyle("position", "fixed").setStyles(h);
                    } else {
                        var m = this.getOffsetParent(),
                        j = this.getPosition(m),
                        n = this.getStyles("left", "top");
                        if (m && n.left == "auto" || n.top == "auto") {
                            this.setPosition(j);
                        }
                        if (this.getStyle("position") == "static") {
                            this.setStyle("position", "absolute");
                        }
                        j = {
                            x: n.left.toInt() - l.x,
                            y: n.top.toInt() - l.y
                        };
                        var f = function() {
                            if (!this.retrieve("pin:_pinned")) {
                                return;
                            }
                            var o = window.getScroll();
                            this.setStyles({
                                left: j.x + o.x,
                                top: j.y + o.y
                            });
                        }.bind(this);
                        this.store("pin:_scrollFixer", f);
                        window.addEvent("scroll", f);
                    }
                    this.store("pin:_pinned", true);
                }
            } else {
                if (!this.retrieve("pin:_pinned")) {
                    return this;
                }
                var m = this.getParent(),
                d = (m.getComputedStyle("position") != "static" ? m: m.getOffsetParent());
                k = this.getPosition(d);
                this.store("pin:_pinned", false);
                var f = this.retrieve("pin:_scrollFixer");
                if (!f) {
                    this.setStyles({
                        position: "absolute",
                        top: k.y + l.y,
                        left: k.x + l.x
                    });
                } else {
                    this.store("pin:_scrollFixer", null);
                    window.removeEvent("scroll", f);
                }
                this.removeClass("isPinned");
            }
            return this;
        },
        unpin: function() {
            return this.pin(false);
        },
        togglepin: function() {
            return this.pin(!this.retrieve("pin:_pinned"));
        }
    });
})(); (function() {
    var a = Element.prototype.position;
    Element.implement({
        position: function(h) {
            if (h && ($defined(h.x) || $defined(h.y))) {
                return a ? a.apply(this, arguments) : this;
            }
            $each(h || {},
            function(w, u) {
                if (!$defined(w)) {
                    delete h[u];
                }
            });
            h = $merge({
                relativeTo: document.body,
                position: {
                    x: "center",
                    y: "center"
                },
                edge: false,
                offset: {
                    x: 0,
                    y: 0
                },
                returnPos: false,
                relFixedPosition: false,
                ignoreMargins: false,
                ignoreScroll: false,
                allowNegative: false
            },
            h);
            var s = {
                x: 0,
                y: 0
            },
            f = false;
            var c = this.measure(function() {
                return document.id(this.getOffsetParent());
            });
            if (c && c != this.getDocument().body) {
                s = c.measure(function() {
                    return this.getPosition();
                });
                f = c != document.id(h.relativeTo);
                h.offset.x = h.offset.x - s.x;
                h.offset.y = h.offset.y - s.y;
            }
            var t = function(u) {
                if ($type(u) != "string") {
                    return u;
                }
                u = u.toLowerCase();
                var v = {};
                if (u.test("left")) {
                    v.x = "left";
                } else {
                    if (u.test("right")) {
                        v.x = "right";
                    } else {
                        v.x = "center";
                    }
                }
                if (u.test("upper") || u.test("top")) {
                    v.y = "top";
                } else {
                    if (u.test("bottom")) {
                        v.y = "bottom";
                    } else {
                        v.y = "center";
                    }
                }
                return v;
            };
            h.edge = t(h.edge);
            h.position = t(h.position);
            if (!h.edge) {
                if (h.position.x == "center" && h.position.y == "center") {
                    h.edge = {
                        x: "center",
                        y: "center"
                    };
                } else {
                    h.edge = {
                        x: "left",
                        y: "top"
                    };
                }
            }
            this.setStyle("position", "absolute");
            var g = document.id(h.relativeTo) || document.body,
            d = g == document.body ? window.getScroll() : g.getPosition(),
            m = d.y,
            i = d.x;
            var o = this.getDimensions({
                computeSize: true,
                styles: ["padding", "border", "margin"]
            });
            var k = {},
            p = h.offset.y,
            r = h.offset.x,
            l = window.getSize();
            switch (h.position.x) {
            case "left":
                k.x = i + r;
                break;
            case "right":
                k.x = i + r + g.offsetWidth;
                break;
            default:
                k.x = i + ((g == document.body ? l.x: g.offsetWidth) / 2) + r;
                break;
            }
            switch (h.position.y) {
            case "top":
                k.y = m + p;
                break;
            case "bottom":
                k.y = m + p + g.offsetHeight;
                break;
            default:
                k.y = m + ((g == document.body ? l.y: g.offsetHeight) / 2) + p;
                break;
            }
            if (h.edge) {
                var b = {};
                switch (h.edge.x) {
                case "left":
                    b.x = 0;
                    break;
                case "right":
                    b.x = -o.x - o.computedRight - o.computedLeft;
                    break;
                default:
                    b.x = -(o.totalWidth / 2);
                    break;
                }
                switch (h.edge.y) {
                case "top":
                    b.y = 0;
                    break;
                case "bottom":
                    b.y = -o.y - o.computedTop - o.computedBottom;
                    break;
                default:
                    b.y = -(o.totalHeight / 2);
                    break;
                }
                k.x += b.x;
                k.y += b.y;
            }
            k = {
                left: ((k.x >= 0 || f || h.allowNegative) ? k.x: 0).toInt(),
                top: ((k.y >= 0 || f || h.allowNegative) ? k.y: 0).toInt()
            };
            var j = {
                left: "x",
                top: "y"
            }; ["minimum", "maximum"].each(function(u) { ["left", "top"].each(function(v) {
                    var w = h[u] ? h[u][j[v]] : null;
                    if (w != null && ((u == "minimum") ? k[v] < w: k[v] > w)) {
                        k[v] = w;
                    }
                });
            });
            if (g.getStyle("position") == "fixed" || h.relFixedPosition) {
                var n = window.getScroll();
                k.top += n.y;
                k.left += n.x;
            }
            var q = g.getScroll();
            if (h.ignoreScroll) {
                k.top -= q.y;
                k.left -= q.x;
            } else {
                k.top += q.y;
                k.left += q.x;
            }
            if (h.ignoreMargins) {
                k.left += (h.edge.x == "right" ? o["margin-right"] : h.edge.x == "center" ? -o["margin-left"] + ((o["margin-right"] + o["margin-left"]) / 2) : -o["margin-left"]);
                k.top += (h.edge.y == "bottom" ? o["margin-bottom"] : h.edge.y == "center" ? -o["margin-top"] + ((o["margin-bottom"] + o["margin-top"]) / 2) : -o["margin-top"]);
            }
            k.left = Math.ceil(k.left);
            k.top = Math.ceil(k.top);
            if (h.returnPos) {
                return k;
            } else {
                this.setStyles(k);
            }
            return this;
        }
    });
})();
Element.implement({
    isDisplayed: function() {
        return this.getStyle("display") != "none";
    },
    isVisible: function() {
        var a = this.offsetWidth,
        b = this.offsetHeight;
        return (a == 0 && b == 0) ? false: (a > 0 && b > 0) ? true: this.style.display != "none";
    },
    toggle: function() {
        return this[this.isDisplayed() ? "hide": "show"]();
    },
    hide: function() {
        var b;
        try {
            b = this.getStyle("display");
        } catch(a) {}
        if (b == "none") {
            return this;
        }
        return this.store("element:_originalDisplay", b || "").setStyle("display", "none");
    },
    show: function(a) {
        if (!a && this.isDisplayed()) {
            return this;
        }
        a = a || this.retrieve("element:_originalDisplay") || "block";
        return this.setStyle("display", (a == "none") ? "block": a);
    },
    swapClass: function(a, b) {
        return this.removeClass(a).addClass(b);
    }
});
Document.implement({
    clearSelection: function() {
        if (document.selection && document.selection.empty) {
            document.selection.empty();
        } else {
            if (window.getSelection) {
                var a = window.getSelection();
                if (a && a.removeAllRanges) {
                    a.removeAllRanges();
                }
            }
        }
    }
});
if (!window.Form) {
    window.Form = {};
} (function() {
    Form.Request = new Class({
        Binds: ["onSubmit", "onFormValidate"],
        Implements: [Options, Events, Class.Occlude],
        options: {
            requestOptions: {
                evalScripts: true,
                useSpinner: true,
                emulation: false,
                link: "ignore"
            },
            sendButtonClicked: true,
            extraData: {},
            resetForm: true
        },
        property: "form.request",
        initialize: function(b, c, a) {
            this.element = document.id(b);
            if (this.occlude()) {
                return this.occluded;
            }
            this.update = document.id(c);
            this.setOptions(a);
            this.makeRequest();
            if (this.options.resetForm) {
                this.request.addEvent("success", 
                function() {
                    $try(function() {
                        this.element.reset();
                    }.bind(this));
                    if (window.OverText) {
                        OverText.update();
                    }
                }.bind(this));
            }
            this.attach();
        },
        toElement: function() {
            return this.element;
        },
        makeRequest: function() {
            this.request = new Request.HTML($merge({
                update: this.update,
                emulation: false,
                spinnerTarget: this.element,
                method: this.element.get("method") || "post"
            },
            this.options.requestOptions)).addEvents({
                success: function(b, d, c, a) { ["complete", "success"].each(function(f) {
                        this.fireEvent(f, [this.update, b, d, c, a]);
                    },
                    this);
                }.bind(this),
                failure: function() {
                    this.fireEvent("complete", arguments).fireEvent("failure", arguments);
                }.bind(this),
                exception: function() {
                    this.fireEvent("failure", arguments);
                }.bind(this)
            });
        },
        attach: function(a) {
            a = $pick(a, true);
            method = a ? "addEvent": "removeEvent";
            this.element[method]("click:relay(button, input[type=submit])", this.saveClickedButton.bind(this));
            var b = this.element.retrieve("validator");
            if (b) {
                b[method]("onFormValidate", this.onFormValidate);
            } else {
                this.element[method]("submit", this.onSubmit);
            }
        },
        detach: function() {
            this.attach(false);
            return this;
        },
        enable: function() {
            this.attach();
            return this;
        },
        disable: function() {
            this.detach();
            return this;
        },
        onFormValidate: function(b, a, d) {
            if (!d) {
                return;
            }
            var c = this.element.retrieve("validator");
            if (b || (c && !c.options.stopOnFailure)) {
                if (d && d.stop) {
                    d.stop();
                }
                this.send();
            }
        },
        onSubmit: function(b) {
            var a = this.element.retrieve("validator");
            if (a) {
                this.element.removeEvent("submit", this.onSubmit);
                a.addEvent("onFormValidate", this.onFormValidate);
                this.element.validate();
                return;
            }
            if (b) {
                b.stop();
            }
            this.send();
        },
        saveClickedButton: function(a, b) {
            if (!this.options.sendButtonClicked) {
                return;
            }
            if (!b.get("name")) {
                return;
            }
            this.options.extraData[b.get("name")] = b.get("value") || true;
            this.clickedCleaner = function() {
                delete this.options.extraData[b.get("name")];
                this.clickedCleaner = $empty;
            }.bind(this);
        },
        clickedCleaner: $empty,
        send: function() {
            var b = this.element.toQueryString().trim();
            var a = $H(this.options.extraData).toQueryString();
            if (b) {
                b += "&" + a;
            } else {
                b = a;
            }
            this.fireEvent("send", [this.element, b.parseQueryString()]);
            this.request.send({
                data: b,
                url: this.element.get("action")
            });
            this.clickedCleaner();
            return this;
        }
    });
    Element.Properties.formRequest = {
        set: function() {
            var a = Array.link(arguments, {
                options: Object.type,
                update: Element.type,
                updateId: String.type
            });
            var c = a.update || a.updateId;
            var b = this.retrieve("form.request");
            if (c) {
                if (b) {
                    b.update = document.id(c);
                }
                this.store("form.request:update", c);
            }
            if (a.options) {
                if (b) {
                    b.setOptions(a.options);
                }
                this.store("form.request:options", a.options);
            }
            return this;
        },
        get: function() {
            var a = Array.link(arguments, {
                options: Object.type,
                update: Element.type,
                updateId: String.type
            });
            var b = a.update || a.updateId;
            if (a.options || b || !this.retrieve("form.request")) {
                if (a.options || !this.retrieve("form.request:options")) {
                    this.set("form.request", a.options);
                }
                if (b) {
                    this.set("form.request", b);
                }
                this.store("form.request", new Form.Request(this, this.retrieve("form.request:update"), this.retrieve("form.request:options")));
            }
            return this.retrieve("form.request");
        }
    };
    Element.implement({
        formUpdate: function(b, a) {
            this.get("formRequest", b, a).send();
            return this;
        }
    });
})();
Form.Request.Append = new Class({
    Extends: Form.Request,
    options: {
        useReveal: true,
        revealOptions: {},
        inject: "bottom"
    },
    makeRequest: function() {
        this.request = new Request.HTML($merge({
            url: this.element.get("action"),
            method: this.element.get("method") || "post",
            spinnerTarget: this.element
        },
        this.options.requestOptions, {
            evalScripts: false
        })).addEvents({
            success: function(b, h, g, a) {
                var c;
                var d = Elements.from(g);
                if (d.length == 1) {
                    c = d[0];
                } else {
                    c = new Element("div", {
                        styles: {
                            display: "none"
                        }
                    }).adopt(d);
                }
                c.inject(this.update, this.options.inject);
                if (this.options.requestOptions.evalScripts) {
                    $exec(a);
                }
                this.fireEvent("beforeEffect", c);
                var f = function() {
                    this.fireEvent("success", [c, this.update, b, h, g, a]);
                }.bind(this);
                if (this.options.useReveal) {
                    c.get("reveal", this.options.revealOptions).chain(f);
                    c.reveal();
                } else {
                    f();
                }
            }.bind(this),
            failure: function(a) {
                this.fireEvent("failure", a);
            }.bind(this)
        });
    }
});
if (!window.Form) {
    window.Form = {};
}
var InputValidator = new Class({
    Implements: [Options],
    options: {
        errorMsg: "Validation failed.",
        test: function(a) {
            return true;
        }
    },
    initialize: function(b, a) {
        this.setOptions(a);
        this.className = b;
    },
    test: function(b, a) {
        if (document.id(b)) {
            return this.options.test(document.id(b), a || this.getProps(b));
        } else {
            return false;
        }
    },
    getError: function(c, a) {
        var b = this.options.errorMsg;
        if ($type(b) == "function") {
            b = b(document.id(c), a || this.getProps(c));
        }
        return b;
    },
    getProps: function(a) {
        if (!document.id(a)) {
            return {};
        }
        return a.get("validatorProps");
    }
});
Element.Properties.validatorProps = {
    set: function(a) {
        return this.eliminate("validatorProps").store("validatorProps", a);
    },
    get: function(a) {
        if (a) {
            this.set(a);
        }
        if (this.retrieve("validatorProps")) {
            return this.retrieve("validatorProps");
        }
        if (this.getProperty("validatorProps")) {
            try {
                this.store("validatorProps", JSON.decode(this.getProperty("validatorProps")));
            } catch(c) {
                return {};
            }
        } else {
            var b = this.get("class").split(" ").filter(function(d) {
                return d.test(":");
            });
            if (!b.length) {
                this.store("validatorProps", {});
            } else {
                a = {};
                b.each(function(d) {
                    var f = d.split(":");
                    if (f[1]) {
                        try {
                            a[f[0]] = JSON.decode(f[1]);
                        } catch(g) {}
                    }
                });
                this.store("validatorProps", a);
            }
        }
        return this.retrieve("validatorProps");
    }
};
Form.Validator = new Class({
    Implements: [Options, Events],
    Binds: ["onSubmit"],
    options: {
        fieldSelectors: "input, select, textarea",
        ignoreHidden: true,
        ignoreDisabled: true,
        useTitles: false,
        evaluateOnSubmit: true,
        evaluateFieldsOnBlur: true,
        evaluateFieldsOnChange: true,
        serial: true,
        stopOnFailure: true,
        warningPrefix: function() {
            return Form.Validator.getMsg("warningPrefix") || "Warning: ";
        },
        errorPrefix: function() {
            return Form.Validator.getMsg("errorPrefix") || "Error: ";
        }
    },
    initialize: function(b, a) {
        this.setOptions(a);
        this.element = document.id(b);
        this.element.store("validator", this);
        this.warningPrefix = $lambda(this.options.warningPrefix)();
        this.errorPrefix = $lambda(this.options.errorPrefix)();
        if (this.options.evaluateOnSubmit) {
            this.element.addEvent("submit", this.onSubmit);
        }
        if (this.options.evaluateFieldsOnBlur || this.options.evaluateFieldsOnChange) {
            this.watchFields(this.getFields());
        }
    },
    toElement: function() {
        return this.element;
    },
    getFields: function() {
        return (this.fields = this.element.getElements(this.options.fieldSelectors));
    },
    watchFields: function(a) {
        a.each(function(b) {
            if (this.options.evaluateFieldsOnBlur) {
                b.addEvent("blur", this.validationMonitor.pass([b, false], this));
            }
            if (this.options.evaluateFieldsOnChange) {
                b.addEvent("change", this.validationMonitor.pass([b, true], this));
            }
        },
        this);
    },
    validationMonitor: function() {
        $clear(this.timer);
        this.timer = this.validateField.delay(50, this, arguments);
    },
    onSubmit: function(a) {
        if (!this.validate(a) && a) {
            a.preventDefault();
        } else {
            this.reset();
        }
    },
    reset: function() {
        this.getFields().each(this.resetField, this);
        return this;
    },
    validate: function(b) {
        var a = this.getFields().map(function(c) {
            return this.validateField(c, true);
        },
        this).every(function(c) {
            return c;
        });
        this.fireEvent("formValidate", [a, this.element, b]);
        if (this.options.stopOnFailure && !a && b) {
            b.preventDefault();
        }
        return a;
    },
    validateField: function(j, a) {
        if (this.paused) {
            return true;
        }
        j = document.id(j);
        var d = !j.hasClass("validation-failed");
        var g,
        i;
        if (this.options.serial && !a) {
            g = this.element.getElement(".validation-failed");
            i = this.element.getElement(".warning");
        }
        if (j && (!g || a || j.hasClass("validation-failed") || (g && !this.options.serial))) {
            var c = j.className.split(" ").some(function(k) {
                return this.getValidator(k);
            },
            this);
            var h = [];
            j.className.split(" ").each(function(k) {
                if (k && !this.test(k, j)) {
                    h.include(k);
                }
            },
            this);
            d = h.length === 0;
            if (c && !j.hasClass("warnOnly")) {
                if (d) {
                    j.addClass("validation-passed").removeClass("validation-failed");
                    this.fireEvent("elementPass", j);
                } else {
                    j.addClass("validation-failed").removeClass("validation-passed");
                    this.fireEvent("elementFail", [j, h]);
                }
            }
            if (!i) {
                var f = j.className.split(" ").some(function(k) {
                    if (k.test("^warn-") || j.hasClass("warnOnly")) {
                        return this.getValidator(k.replace(/^warn-/, ""));
                    } else {
                        return null;
                    }
                },
                this);
                j.removeClass("warning");
                var b = j.className.split(" ").map(function(k) {
                    if (k.test("^warn-") || j.hasClass("warnOnly")) {
                        return this.test(k.replace(/^warn-/, ""), j, true);
                    } else {
                        return null;
                    }
                },
                this);
            }
        }
        return d;
    },
    test: function(b, d, f) {
        d = document.id(d);
        if ((this.options.ignoreHidden && !d.isVisible()) || (this.options.ignoreDisabled && d.get("disabled"))) {
            return true;
        }
        var a = this.getValidator(b);
        f = $pick(f, false);
        if (d.hasClass("warnOnly")) {
            f = true;
        }
        var c = d.hasClass("ignoreValidation") || (a ? a.test(d) : true);
        if (a && d.isVisible()) {
            this.fireEvent("elementValidate", [c, d, b, f]);
        }
        if (f) {
            return true;
        }
        return c;
    },
    resetField: function(a) {
        a = document.id(a);
        if (a) {
            a.className.split(" ").each(function(b) {
                if (b.test("^warn-")) {
                    b = b.replace(/^warn-/, "");
                }
                a.removeClass("validation-failed");
                a.removeClass("warning");
                a.removeClass("validation-passed");
            },
            this);
        }
        return this;
    },
    stop: function() {
        this.paused = true;
        return this;
    },
    start: function() {
        this.paused = false;
        return this;
    },
    ignoreField: function(a, b) {
        a = document.id(a);
        if (a) {
            this.enforceField(a);
            if (b) {
                a.addClass("warnOnly");
            } else {
                a.addClass("ignoreValidation");
            }
        }
        return this;
    },
    enforceField: function(a) {
        a = document.id(a);
        if (a) {
            a.removeClass("warnOnly").removeClass("ignoreValidation");
        }
        return this;
    }
});
Form.Validator.getMsg = function(a) {
    return MooTools.lang.get("Form.Validator", a);
};
Form.Validator.adders = {
    validators: {},
    add: function(b, a) {
        this.validators[b] = new InputValidator(b, a);
        if (!this.initialize) {
            this.implement({
                validators: this.validators
            });
        }
    },
    addAllThese: function(a) {
        $A(a).each(function(b) {
            this.add(b[0], b[1]);
        },
        this);
    },
    getValidator: function(a) {
        return this.validators[a.split(":")[0]];
    }
};
$extend(Form.Validator, Form.Validator.adders);
Form.Validator.implement(Form.Validator.adders);
Form.Validator.add("IsEmpty", {
    errorMsg: false,
    test: function(a) {
        if (a.type == "select-one" || a.type == "select") {
            return ! (a.selectedIndex >= 0 && a.options[a.selectedIndex].value != "");
        } else {
            return ((a.get("value") == null) || (a.get("value").length == 0));
        }
    }
});
Form.Validator.addAllThese([["required", {
    errorMsg: function() {
        return Form.Validator.getMsg("required");
    },
    test: function(a) {
        return ! Form.Validator.getValidator("IsEmpty").test(a);
    }
}], ["minLength", {
    errorMsg: function(a, b) {
        if ($type(b.minLength)) {
            return Form.Validator.getMsg("minLength").substitute({
                minLength: b.minLength,
                length: a.get("value").length
            });
        } else {
            return "";
        }
    },
    test: function(a, b) {
        if ($type(b.minLength)) {
            return (a.get("value").length >= $pick(b.minLength, 0));
        } else {
            return true;
        }
    }
}], ["maxLength", {
    errorMsg: function(a, b) {
        if ($type(b.maxLength)) {
            return Form.Validator.getMsg("maxLength").substitute({
                maxLength: b.maxLength,
                length: a.get("value").length
            });
        } else {
            return "";
        }
    },
    test: function(a, b) {
        return (a.get("value").length <= $pick(b.maxLength, 10000));
    }
}], ["validate-integer", {
    errorMsg: Form.Validator.getMsg.pass("integer"),
    test: function(a) {
        return Form.Validator.getValidator("IsEmpty").test(a) || (/^(-?[1-9]\d*|0)$/).test(a.get("value"));
    }
}], ["validate-numeric", {
    errorMsg: Form.Validator.getMsg.pass("numeric"),
    test: function(a) {
        return Form.Validator.getValidator("IsEmpty").test(a) || (/^-?(?:0$0(?=\d*\.)|[1-9]|0)\d*(\.\d+)?$/).test(a.get("value"));
    }
}], ["validate-digits", {
    errorMsg: Form.Validator.getMsg.pass("digits"),
    test: function(a) {
        return Form.Validator.getValidator("IsEmpty").test(a) || (/^[\d() .:\-\+#]+$/.test(a.get("value")));
    }
}], ["validate-alpha", {
    errorMsg: Form.Validator.getMsg.pass("alpha"),
    test: function(a) {
        return Form.Validator.getValidator("IsEmpty").test(a) || (/^[a-zA-Z]+$/).test(a.get("value"));
    }
}], ["validate-alphanum", {
    errorMsg: Form.Validator.getMsg.pass("alphanum"),
    test: function(a) {
        return Form.Validator.getValidator("IsEmpty").test(a) || !(/\W/).test(a.get("value"));
    }
}], ["validate-date", {
    errorMsg: function(a, b) {
        if (Date.parse) {
            var c = b.dateFormat || "%x";
            return Form.Validator.getMsg("dateSuchAs").substitute({
                date: new Date().format(c)
            });
        } else {
            return Form.Validator.getMsg("dateInFormatMDY");
        }
    },
    test: function(a, b) {
        if (Form.Validator.getValidator("IsEmpty").test(a)) {
            return true;
        }
        var h;
        if (Date.parse) {
            var g = b.dateFormat || "%x";
            h = Date.parse(a.get("value"));
            var f = h.format(g);
            if (f != "invalid date") {
                a.set("value", f);
            }
            return ! isNaN(h);
        } else {
            var c = /^(\d{2})\/(\d{2})\/(\d{4})$/;
            if (!c.test(a.get("value"))) {
                return false;
            }
            h = new Date(a.get("value").replace(c, "$1/$2/$3"));
            return (parseInt(RegExp.$1, 10) == (1 + h.getMonth())) && (parseInt(RegExp.$2, 10) == h.getDate()) && (parseInt(RegExp.$3, 10) == h.getFullYear());
        }
    }
}], ["validate-email", {
    errorMsg: Form.Validator.getMsg.pass("email"),
    test: function(a) {
        return Form.Validator.getValidator("IsEmpty").test(a) || (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(a.get("value"));
    }
}], ["validate-url", {
    errorMsg: Form.Validator.getMsg.pass("url"),
    test: function(a) {
        return Form.Validator.getValidator("IsEmpty").test(a) || (/^(https?|ftp|rmtp|mms):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i).test(a.get("value"));
    }
}], ["validate-currency-dollar", {
    errorMsg: Form.Validator.getMsg.pass("currencyDollar"),
    test: function(a) {
        return Form.Validator.getValidator("IsEmpty").test(a) || (/^\$?\-?([1-9]{1}[0-9]{0,2}(\,[0-9]{3})*(\.[0-9]{0,2})?|[1-9]{1}\d*(\.[0-9]{0,2})?|0(\.[0-9]{0,2})?|(\.[0-9]{1,2})?)$/).test(a.get("value"));
    }
}], ["validate-one-required", {
    errorMsg: Form.Validator.getMsg.pass("oneRequired"),
    test: function(a, b) {
        var c = document.id(b["validate-one-required"]) || a.getParent(b["validate-one-required"]);
        return c.getElements("input").some(function(d) {
            if (["checkbox", "radio"].contains(d.get("type"))) {
                return d.get("checked");
            }
            return d.get("value");
        });
    }
}]]);
Element.Properties.validator = {
    set: function(a) {
        var b = this.retrieve("validator");
        if (b) {
            b.setOptions(a);
        }
        return this.store("validator:options", a);
    },
    get: function(a) {
        if (a || !this.retrieve("validator")) {
            if (a || !this.retrieve("validator:options")) {
                this.set("validator", a);
            }
            this.store("validator", new Form.Validator(this, this.retrieve("validator:options")));
        }
        return this.retrieve("validator");
    }
};
Element.implement({
    validate: function(a) {
        if (a) {
            this.set("validator", a);
        }
        return this.get("validator", a).validate();
    }
});
var FormValidator = Form.Validator;
Form.Validator.Inline = new Class({
    Extends: Form.Validator,
    options: {
        showError: function(a) {
            if (a.reveal) {
                a.reveal();
            } else {
                a.setStyle("display", "block");
            }
        },
        hideError: function(a) {
            if (a.dissolve) {
                a.dissolve();
            } else {
                a.setStyle("display", "none");
            }
        },
        scrollToErrorsOnSubmit: true,
        scrollToErrorsOnBlur: false,
        scrollToErrorsOnChange: false,
        scrollFxOptions: {
            transition: "quad:out",
            offset: {
                y: -20
            }
        }
    },
    initialize: function(b, a) {
        this.parent(b, a);
        this.addEvent("onElementValidate", 
        function(h, g, f, i) {
            var d = this.getValidator(f);
            if (!h && d.getError(g)) {
                if (i) {
                    g.addClass("warning");
                }
                var c = this.makeAdvice(f, g, d.getError(g), i);
                this.insertAdvice(c, g);
                this.showAdvice(f, g);
            } else {
                this.hideAdvice(f, g);
            }
        });
    },
    makeAdvice: function(d, g, c, h) {
        var f = (h) ? this.warningPrefix: this.errorPrefix;
        f += (this.options.useTitles) ? g.title || c: c;
        var a = (h) ? "warning-advice": "validation-advice";
        var b = this.getAdvice(d, g);
        if (b) {
            b = b.set("html", f);
        } else {
            b = new Element("div", {
                html: f,
                styles: {
                    display: "none"
                },
                id: "advice-" + d.split(":")[0] + "-" + this.getFieldId(g)
            }).addClass(a);
        }
        g.store("advice-" + d, b);
        return b;
    },
    getFieldId: function(a) {
        return a.id ? a.id: a.id = "input_" + a.name;
    },
    showAdvice: function(b, c) {
        var a = this.getAdvice(b, c);
        if (a && !c.retrieve(this.getPropName(b)) && (a.getStyle("display") == "none" || a.getStyle("visiblity") == "hidden" || a.getStyle("opacity") == 0)) {
            c.store(this.getPropName(b), true);
            this.options.showError(a);
            this.fireEvent("showAdvice", [c, a, b]);
        }
    },
    hideAdvice: function(b, c) {
        var a = this.getAdvice(b, c);
        if (a && c.retrieve(this.getPropName(b))) {
            c.store(this.getPropName(b), false);
            this.options.hideError(a);
            this.fireEvent("hideAdvice", [c, a, b]);
        }
    },
    getPropName: function(a) {
        return "advice" + a;
    },
    resetField: function(a) {
        a = document.id(a);
        if (!a) {
            return this;
        }
        this.parent(a);
        a.className.split(" ").each(function(b) {
            this.hideAdvice(b, a);
        },
        this);
        return this;
    },
    getAllAdviceMessages: function(d, c) {
        var b = [];
        if (d.hasClass("ignoreValidation") && !c) {
            return b;
        }
        var a = d.className.split(" ").some(function(h) {
            var f = h.test("^warn-") || d.hasClass("warnOnly");
            if (f) {
                h = h.replace(/^warn-/, "");
            }
            var g = this.getValidator(h);
            if (!g) {
                return;
            }
            b.push({
                message: g.getError(d),
                warnOnly: f,
                passed: g.test(),
                validator: g
            });
        },
        this);
        return b;
    },
    getAdvice: function(a, b) {
        return b.retrieve("advice-" + a);
    },
    insertAdvice: function(a, c) {
        var b = c.get("validatorProps");
        if (!b.msgPos || !document.id(b.msgPos)) {
            if (c.type.toLowerCase() == "radio") {
                c.getParent().adopt(a);
            } else {
                a.inject(document.id(c), "after");
            }
        } else {
            document.id(b.msgPos).grab(a);
        }
    },
    validateField: function(h, g, b) {
        var a = this.parent(h, g);
        if (((this.options.scrollToErrorsOnSubmit && b === undefined) || b) && !a) {
            var c = document.id(this).getElement(".validation-failed");
            var d = document.id(this).getParent();
            while (d != document.body && d.getScrollSize().y == d.getSize().y) {
                d = d.getParent();
            }
            var f = d.retrieve("fvScroller");
            if (!f && window.Fx && Fx.Scroll) {
                f = new Fx.Scroll(d, this.options.scrollFxOptions);
                d.store("fvScroller", f);
            }
            if (c) {
                if (f) {
                    f.toElement(c);
                } else {
                    d.scrollTo(d.getScroll().x, c.getPosition(d).y - 20);
                }
            }
        }
        return a;
    },
    watchFields: function(a) {
        a.each(function(b) {
            if (this.options.evaluateFieldsOnBlur) {
                b.addEvent("blur", this.validationMonitor.pass([b, false, this.options.scrollToErrorsOnBlur], this));
            }
            if (this.options.evaluateFieldsOnChange) {
                b.addEvent("change", this.validationMonitor.pass([b, true, this.options.scrollToErrorsOnChange], this));
            }
        },
        this);
    }
});
Form.Validator.addAllThese([["validate-enforce-oncheck", {
    test: function(a, b) {
        var c = a.getParent("form").retrieve("validator");
        if (!c) {
            return true;
        } (b.toEnforce || document.id(b.enforceChildrenOf).getElements("input, select, textarea")).map(function(d) {
            if (a.checked) {
                c.enforceField(d);
            } else {
                c.ignoreField(d);
                c.resetField(d);
            }
        });
        return true;
    }
}], ["validate-ignore-oncheck", {
    test: function(a, b) {
        var c = a.getParent("form").retrieve("validator");
        if (!c) {
            return true;
        } (b.toIgnore || document.id(b.ignoreChildrenOf).getElements("input, select, textarea")).each(function(d) {
            if (a.checked) {
                c.ignoreField(d);
                c.resetField(d);
            } else {
                c.enforceField(d);
            }
        });
        return true;
    }
}], ["validate-nospace", {
    errorMsg: function() {
        return Form.Validator.getMsg("noSpace");
    },
    test: function(a, b) {
        return ! a.get("value").test(/\s/);
    }
}], ["validate-toggle-oncheck", {
    test: function(b, c) {
        var d = b.getParent("form").retrieve("validator");
        if (!d) {
            return true;
        }
        var a = c.toToggle || document.id(c.toToggleChildrenOf).getElements("input, select, textarea");
        if (!b.checked) {
            a.each(function(f) {
                d.ignoreField(f);
                d.resetField(f);
            });
        } else {
            a.each(function(f) {
                d.enforceField(f);
            });
        }
        return true;
    }
}], ["validate-reqchk-bynode", {
    errorMsg: function() {
        return Form.Validator.getMsg("reqChkByNode");
    },
    test: function(a, b) {
        return (document.id(b.nodeId).getElements(b.selector || "input[type=checkbox], input[type=radio]")).some(function(c) {
            return c.checked;
        });
    }
}], ["validate-required-check", {
    errorMsg: function(a, b) {
        return b.useTitle ? a.get("title") : Form.Validator.getMsg("requiredChk");
    },
    test: function(a, b) {
        return !! a.checked;
    }
}], ["validate-reqchk-byname", {
    errorMsg: function(a, b) {
        return Form.Validator.getMsg("reqChkByName").substitute({
            label: b.label || a.get("type")
        });
    },
    test: function(b, d) {
        var c = d.groupName || b.get("name");
        var a = $$(document.getElementsByName(c)).some(function(h, g) {
            return h.checked;
        });
        var f = b.getParent("form").retrieve("validator");
        if (a && f) {
            f.resetField(b);
        }
        return a;
    }
}], ["validate-match", {
    errorMsg: function(a, b) {
        return Form.Validator.getMsg("match").substitute({
            matchName: b.matchName || document.id(b.matchInput).get("name")
        });
    },
    test: function(b, c) {
        var d = b.get("value");
        var a = document.id(c.matchInput) && document.id(c.matchInput).get("value");
        return d && a ? d == a: true;
    }
}], ["validate-after-date", {
    errorMsg: function(a, b) {
        return Form.Validator.getMsg("afterDate").substitute({
            label: b.afterLabel || (b.afterElement ? Form.Validator.getMsg("startDate") : Form.Validator.getMsg("currentDate"))
        });
    },
    test: function(b, c) {
        var d = document.id(c.afterElement) ? Date.parse(document.id(c.afterElement).get("value")) : new Date();
        var a = Date.parse(b.get("value"));
        return a && d ? a >= d: true;
    }
}], ["validate-before-date", {
    errorMsg: function(a, b) {
        return Form.Validator.getMsg("beforeDate").substitute({
            label: b.beforeLabel || (b.beforeElement ? Form.Validator.getMsg("endDate") : Form.Validator.getMsg("currentDate"))
        });
    },
    test: function(b, c) {
        var d = Date.parse(b.get("value"));
        var a = document.id(c.beforeElement) ? Date.parse(document.id(c.beforeElement).get("value")) : new Date();
        return a && d ? a >= d: true;
    }
}], ["validate-custom-required", {
    errorMsg: function() {
        return Form.Validator.getMsg("required");
    },
    test: function(a, b) {
        return a.get("value") != b.emptyValue;
    }
}], ["validate-same-month", {
    errorMsg: function(a, b) {
        var c = document.id(b.sameMonthAs) && document.id(b.sameMonthAs).get("value");
        var d = a.get("value");
        if (d != "") {
            return Form.Validator.getMsg(c ? "sameMonth": "startMonth");
        }
    },
    test: function(a, b) {
        var d = Date.parse(a.get("value"));
        var c = Date.parse(document.id(b.sameMonthAs) && document.id(b.sameMonthAs).get("value"));
        return d && c ? d.format("%B") == c.format("%B") : true;
    }
}], ["validate-cc-num", {
    errorMsg: function(a) {
        var b = a.get("value").replace(/[^0-9]/g, "");
        return Form.Validator.getMsg("creditcard").substitute({
            length: b.length
        });
    },
    test: function(c) {
        if (Form.Validator.getValidator("IsEmpty").test(c)) {
            return true;
        }
        var h = c.get("value");
        h = h.replace(/[^0-9]/g, "");
        var a = false;
        if (h.test(/^4[0-9]{12}([0-9]{3})?$/)) {
            a = "Visa";
        } else {
            if (h.test(/^5[1-5]([0-9]{14})$/)) {
                a = "Master Card";
            } else {
                if (h.test(/^3[47][0-9]{13}$/)) {
                    a = "American Express";
                } else {
                    if (h.test(/^6011[0-9]{12}$/)) {
                        a = "Discover";
                    }
                }
            }
        }
        if (a) {
            var d = 0;
            var f = 0;
            for (var b = h.length - 1; b >= 0; --b) {
                f = h.charAt(b).toInt();
                if (f == 0) {
                    continue;
                }
                if ((h.length - b) % 2 == 0) {
                    f += f;
                }
                if (f > 9) {
                    f = f.toString().charAt(0).toInt() + f.toString().charAt(1).toInt();
                }
                d += f;
            }
            if ((d % 10) == 0) {
                return true;
            }
        }
        var g = "";
        while (h != "") {
            g += " " + h.substr(0, 4);
            h = h.substr(4);
        }
        c.getParent("form").retrieve("validator").ignoreField(c);
        c.set("value", g.clean());
        c.getParent("form").retrieve("validator").enforceField(c);
        return false;
    }
}]]);
var OverText = new Class({
    Implements: [Options, Events, Class.Occlude],
    Binds: ["reposition", "assert", "focus", "hide"],
    options: {
        element: "label",
        positionOptions: {
            position: "upperLeft",
            edge: "upperLeft",
            offset: {
                x: 4,
                y: 2
            }
        },
        poll: false,
        pollInterval: 250,
        wrap: false
    },
    property: "OverText",
    initialize: function(b, a) {
        this.element = document.id(b);
        if (this.occlude()) {
            return this.occluded;
        }
        this.setOptions(a);
        this.attach(this.element);
        OverText.instances.push(this);
        if (this.options.poll) {
            this.poll();
        }
        return this;
    },
    toElement: function() {
        return this.element;
    },
    attach: function() {
        var a = this.options.textOverride || this.element.get("alt") || this.element.get("title");
        if (!a) {
            return;
        }
        this.text = new Element(this.options.element, {
            "class": "overTxtLabel",
            styles: {
                lineHeight: "normal",
                position: "absolute",
                cursor: "text"
            },
            html: a,
            events: {
                click: this.hide.pass(this.options.element == "label", this)
            }
        }).inject(this.element, "after");
        if (this.options.element == "label") {
            if (!this.element.get("id")) {
                this.element.set("id", "input_" + new Date().getTime());
            }
            this.text.set("for", this.element.get("id"));
        }
        if (this.options.wrap) {
            this.textHolder = new Element("div", {
                styles: {
                    lineHeight: "normal",
                    position: "relative"
                },
                "class": "overTxtWrapper"
            }).adopt(this.text).inject(this.element, "before");
        }
        return this.enable();
    },
    destroy: function() {
        this.element.eliminate("OverTextDiv").eliminate("OverText");
        this.disable();
        if (this.text) {
            this.text.destroy();
        }
        if (this.textHolder) {
            this.textHolder.destroy();
        }
        return this;
    },
    disable: function() {
        this.element.removeEvents({
            focus: this.focus,
            blur: this.assert,
            change: this.assert
        });
        window.removeEvent("resize", this.reposition);
        this.hide(true, true);
        return this;
    },
    enable: function() {
        this.element.addEvents({
            focus: this.focus,
            blur: this.assert,
            change: this.assert
        });
        window.addEvent("resize", this.reposition);
        this.assert(true);
        this.reposition();
        return this;
    },
    wrap: function() {
        if (this.options.element == "label") {
            if (!this.element.get("id")) {
                this.element.set("id", "input_" + new Date().getTime());
            }
            this.text.set("for", this.element.get("id"));
        }
    },
    startPolling: function() {
        this.pollingPaused = false;
        return this.poll();
    },
    poll: function(a) {
        if (this.poller && !a) {
            return this;
        }
        var b = function() {
            if (!this.pollingPaused) {
                this.assert(true);
            }
        }.bind(this);
        if (a) {
            $clear(this.poller);
        } else {
            this.poller = b.periodical(this.options.pollInterval, this);
        }
        return this;
    },
    stopPolling: function() {
        this.pollingPaused = true;
        return this.poll(true);
    },
    focus: function() {
        if (this.text && (!this.text.isDisplayed() || this.element.get("disabled"))) {
            return;
        }
        this.hide();
    },
    hide: function(c, a) {
        if (this.text && (this.text.isDisplayed() && (!this.element.get("disabled") || a))) {
            this.text.hide();
            this.fireEvent("textHide", [this.text, this.element]);
            this.pollingPaused = true;
            if (!c) {
                try {
                    this.element.fireEvent("focus");
                    this.element.focus();
                } catch(b) {}
            }
        }
        return this;
    },
    show: function() {
        if (this.text && !this.text.isDisplayed()) {
            this.text.show();
            this.reposition();
            this.fireEvent("textShow", [this.text, this.element]);
            this.pollingPaused = false;
        }
        return this;
    },
    assert: function(a) {
        this[this.test() ? "show": "hide"](a);
    },
    test: function() {
        var a = this.element.get("value");
        return ! a;
    },
    reposition: function() {
        this.assert(true);
        if (!this.element.isVisible()) {
            return this.stopPolling().hide();
        }
        if (this.text && this.test()) {
            this.text.position($merge(this.options.positionOptions, {
                relativeTo: this.element
            }));
        }
        return this;
    }
});
OverText.instances = [];
$extend(OverText, {
    each: function(a) {
        return OverText.instances.map(function(c, b) {
            if (c.element && c.text) {
                return a.apply(OverText, [c, b]);
            }
            return null;
        });
    },
    update: function() {
        return OverText.each(function(a) {
            return a.reposition();
        });
    },
    hideAll: function() {
        return OverText.each(function(a) {
            return a.hide(true, true);
        });
    },
    showAll: function() {
        return OverText.each(function(a) {
            return a.show();
        });
    }
});
if (window.Fx && Fx.Reveal) {
    Fx.Reveal.implement({
        hideInputs: Browser.Engine.trident ? "select, input, textarea, object, embed, .overTxtLabel": false
    });
}
Fx.Elements = new Class({
    Extends: Fx.CSS,
    initialize: function(b, a) {
        this.elements = this.subject = $$(b);
        this.parent(a);
    },
    compute: function(h, j, k) {
        var c = {};
        for (var d in h) {
            var a = h[d],
            f = j[d],
            g = c[d] = {};
            for (var b in a) {
                g[b] = this.parent(a[b], f[b], k);
            }
        }
        return c;
    },
    set: function(b) {
        for (var c in b) {
            if (!this.elements[c]) {
                continue;
            }
            var a = b[c];
            for (var d in a) {
                this.render(this.elements[c], d, a[d], this.options.unit);
            }
        }
        return this;
    },
    start: function(c) {
        if (!this.check(c)) {
            return this;
        }
        var j = {},
        k = {};
        for (var d in c) {
            if (!this.elements[d]) {
                continue;
            }
            var g = c[d],
            a = j[d] = {},
            h = k[d] = {};
            for (var b in g) {
                var f = this.prepare(this.elements[d], b, g[b]);
                a[b] = f.from;
                h[b] = f.to;
            }
        }
        return this.parent(j, k);
    }
});
Fx.Accordion = new Class({
    Extends: Fx.Elements,
    options: {
        fixedHeight: false,
        fixedWidth: false,
        display: 0,
        show: false,
        height: true,
        width: false,
        opacity: true,
        alwaysHide: false,
        trigger: "click",
        initialDisplayFx: true,
        returnHeightToAuto: true
    },
    initialize: function() {
        var c = Array.link(arguments, {
            container: Element.type,
            options: Object.type,
            togglers: $defined,
            elements: $defined
        });
        this.parent(c.elements, c.options);
        this.togglers = $$(c.togglers);
        this.previous = -1;
        this.internalChain = new Chain();
        if (this.options.alwaysHide) {
            this.options.wait = true;
        }
        if ($chk(this.options.show)) {
            this.options.display = false;
            this.previous = this.options.show;
        }
        if (this.options.start) {
            this.options.display = false;
            this.options.show = false;
        }
        this.effects = {};
        if (this.options.opacity) {
            this.effects.opacity = "fullOpacity";
        }
        if (this.options.width) {
            this.effects.width = this.options.fixedWidth ? "fullWidth": "offsetWidth";
        }
        if (this.options.height) {
            this.effects.height = this.options.fixedHeight ? "fullHeight": "scrollHeight";
        }
        for (var b = 0, a = this.togglers.length; b < a; b++) {
            this.addSection(this.togglers[b], this.elements[b]);
        }
        this.elements.each(function(f, d) {
            if (this.options.show === d) {
                this.fireEvent("active", [this.togglers[d], f]);
            } else {
                for (var g in this.effects) {
                    f.setStyle(g, 0);
                }
            }
        },
        this);
        if ($chk(this.options.display) || this.options.initialDisplayFx === false) {
            this.display(this.options.display, this.options.initialDisplayFx);
        }
        if (this.options.fixedHeight !== false) {
            this.options.returnHeightToAuto = false;
        }
        this.addEvent("complete", this.internalChain.callChain.bind(this.internalChain));
    },
    addSection: function(f, c) {
        f = document.id(f);
        c = document.id(c);
        var g = this.togglers.contains(f);
        this.togglers.include(f);
        this.elements.include(c);
        var a = this.togglers.indexOf(f);
        var b = this.display.bind(this, a);
        f.store("accordion:display", b);
        f.addEvent(this.options.trigger, b);
        if (this.options.height) {
            c.setStyles({
                "padding-top": 0,
                "border-top": "none",
                "padding-bottom": 0,
                "border-bottom": "none"
            });
        }
        if (this.options.width) {
            c.setStyles({
                "padding-left": 0,
                "border-left": "none",
                "padding-right": 0,
                "border-right": "none"
            });
        }
        c.fullOpacity = 1;
        if (this.options.fixedWidth) {
            c.fullWidth = this.options.fixedWidth;
        }
        if (this.options.fixedHeight) {
            c.fullHeight = this.options.fixedHeight;
        }
        c.setStyle("overflow", "hidden");
        if (!g) {
            for (var d in this.effects) {
                c.setStyle(d, 0);
            }
        }
        return this;
    },
    removeSection: function(f, b) {
        var a = this.togglers.indexOf(f);
        var c = this.elements[a];
        var d = function() {
            this.togglers.erase(f);
            this.elements.erase(c);
            this.detach(f);
        }.bind(this);
        if (this.now == a || b != undefined) {
            this.display($pick(b, a - 1 >= 0 ? a - 1: 0)).chain(d);
        } else {
            d();
        }
        return this;
    },
    detach: function(b) {
        var a = function(c) {
            c.removeEvent(this.options.trigger, c.retrieve("accordion:display"));
        }.bind(this);
        if (!b) {
            this.togglers.each(a);
        } else {
            a(b);
        }
        return this;
    },
    display: function(a, b) {
        if (!this.check(a, b)) {
            return this;
        }
        b = $pick(b, true);
        a = ($type(a) == "element") ? this.elements.indexOf(a) : a;
        if (a == this.previous && !this.options.alwaysHide) {
            return this;
        }
        if (this.options.returnHeightToAuto) {
            var d = this.elements[this.previous];
            if (d && !this.selfHidden) {
                for (var c in this.effects) {
                    d.setStyle(c, d[this.effects[c]]);
                }
            }
        }
        if ((this.timer && this.options.wait) || (a === this.previous && !this.options.alwaysHide)) {
            return this;
        }
        this.previous = a;
        var f = {};
        this.elements.each(function(j, h) {
            f[h] = {};
            var g;
            if (h != a) {
                g = true;
            } else {
                if (this.options.alwaysHide && ((j.offsetHeight > 0 && this.options.height) || j.offsetWidth > 0 && this.options.width)) {
                    g = true;
                    this.selfHidden = true;
                }
            }
            this.fireEvent(g ? "background": "active", [this.togglers[h], j]);
            for (var k in this.effects) {
                f[h][k] = g ? 0: j[this.effects[k]];
            }
        },
        this);
        this.internalChain.clearChain();
        this.internalChain.chain(function() {
            if (this.options.returnHeightToAuto && !this.selfHidden) {
                var g = this.elements[a];
                if (g) {
                    g.setStyle("height", "auto");
                }
            }
        }.bind(this));
        return b ? this.start(f) : this.set(f);
    }
});
var Accordion = new Class({
    Extends: Fx.Accordion,
    initialize: function() {
        this.parent.apply(this, arguments);
        var a = Array.link(arguments, {
            container: Element.type
        });
        this.container = a.container;
    },
    addSection: function(c, b, f) {
        c = document.id(c);
        b = document.id(b);
        var d = this.togglers.contains(c);
        var a = this.togglers.length;
        if (a && (!d || f)) {
            f = $pick(f, a - 1);
            c.inject(this.togglers[f], "before");
            b.inject(c, "after");
        } else {
            if (this.container && !d) {
                c.inject(this.container);
                b.inject(this.container);
            }
        }
        return this.parent.apply(this, arguments);
    }
});
Fx.Move = new Class({
    Extends: Fx.Morph,
    options: {
        relativeTo: document.body,
        position: "center",
        edge: false,
        offset: {
            x: 0,
            y: 0
        }
    },
    start: function(a) {
        var b = this.element,
        c = b.getStyles("top", "left");
        if (c.top == "auto" || c.left == "auto") {
            b.setPosition(b.getPosition(b.getOffsetParent()));
        }
        return this.parent(b.position($merge(this.options, a, {
            returnPos: true
        })));
    }
});
Element.Properties.move = {
    set: function(a) {
        var b = this.retrieve("move");
        if (b) {
            b.cancel();
        }
        return this.eliminate("move").store("move:options", $extend({
            link: "cancel"
        },
        a));
    },
    get: function(a) {
        if (a || !this.retrieve("move")) {
            if (a || !this.retrieve("move:options")) {
                this.set("move", a);
            }
            this.store("move", new Fx.Move(this, this.retrieve("move:options")));
        }
        return this.retrieve("move");
    }
};
Element.implement({
    move: function(a) {
        this.get("move").start(a);
        return this;
    }
});
Fx.Reveal = new Class({
    Extends: Fx.Morph,
    options: {
        link: "cancel",
        styles: ["padding", "border", "margin"],
        transitionOpacity: !Browser.Engine.trident4,
        mode: "vertical",
        display: function() {
            return this.element.get("tag") != "tr" ? "block": "table-row";
        },
        hideInputs: Browser.Engine.trident ? "select, input, textarea, object, embed": false,
        opacity: 1
    },
    dissolve: function() {
        try {
            if (!this.hiding && !this.showing) {
                if (this.element.getStyle("display") != "none") {
                    this.hiding = true;
                    this.showing = false;
                    this.hidden = true;
                    this.cssText = this.element.style.cssText;
                    var d = this.element.getComputedSize({
                        styles: this.options.styles,
                        mode: this.options.mode
                    });
                    this.element.setStyle("display", $lambda(this.options.display).apply(this));
                    if (this.options.transitionOpacity) {
                        d.opacity = this.options.opacity;
                    }
                    var b = {};
                    $each(d, 
                    function(g, f) {
                        b[f] = [g, 0];
                    },
                    this);
                    this.element.setStyle("overflow", "hidden");
                    var a = this.options.hideInputs ? this.element.getElements(this.options.hideInputs) : null;
                    this.$chain.unshift(function() {
                        if (this.hidden) {
                            this.hiding = false;
                            $each(d, 
                            function(g, f) {
                                d[f] = g;
                            },
                            this);
                            this.element.style.cssText = this.cssText;
                            this.element.setStyle("display", "none");
                            if (a) {
                                a.setStyle("visibility", "visible");
                            }
                        }
                        this.fireEvent("hide", this.element);
                        this.callChain();
                    }.bind(this));
                    if (a) {
                        a.setStyle("visibility", "hidden");
                    }
                    this.start(b);
                } else {
                    this.callChain.delay(10, this);
                    this.fireEvent("complete", this.element);
                    this.fireEvent("hide", this.element);
                }
            } else {
                if (this.options.link == "chain") {
                    this.chain(this.dissolve.bind(this));
                } else {
                    if (this.options.link == "cancel" && !this.hiding) {
                        this.cancel();
                        this.dissolve();
                    }
                }
            }
        } catch(c) {
            this.hiding = false;
            this.element.setStyle("display", "none");
            this.callChain.delay(10, this);
            this.fireEvent("complete", this.element);
            this.fireEvent("hide", this.element);
        }
        return this;
    },
    reveal: function() {
        try {
            if (!this.showing && !this.hiding) {
                if (this.element.getStyle("display") == "none") {
                    this.showing = true;
                    this.hiding = this.hidden = false;
                    var d;
                    this.cssText = this.element.style.cssText;
                    this.element.measure(function() {
                        d = this.element.getComputedSize({
                            styles: this.options.styles,
                            mode: this.options.mode
                        });
                    }.bind(this));
                    $each(d, 
                    function(g, f) {
                        d[f] = g;
                    });
                    if ($chk(this.options.heightOverride)) {
                        d.height = this.options.heightOverride.toInt();
                    }
                    if ($chk(this.options.widthOverride)) {
                        d.width = this.options.widthOverride.toInt();
                    }
                    if (this.options.transitionOpacity) {
                        this.element.setStyle("opacity", 0);
                        d.opacity = this.options.opacity;
                    }
                    var b = {
                        height: 0,
                        display: $lambda(this.options.display).apply(this)
                    };
                    $each(d, 
                    function(g, f) {
                        b[f] = 0;
                    });
                    this.element.setStyles($merge(b, {
                        overflow: "hidden"
                    }));
                    var a = this.options.hideInputs ? this.element.getElements(this.options.hideInputs) : null;
                    if (a) {
                        a.setStyle("visibility", "hidden");
                    }
                    this.start(d);
                    this.$chain.unshift(function() {
                        this.element.style.cssText = this.cssText;
                        this.element.setStyle("display", $lambda(this.options.display).apply(this));
                        if (!this.hidden) {
                            this.showing = false;
                        }
                        if (a) {
                            a.setStyle("visibility", "visible");
                        }
                        this.callChain();
                        this.fireEvent("show", this.element);
                    }.bind(this));
                } else {
                    this.callChain();
                    this.fireEvent("complete", this.element);
                    this.fireEvent("show", this.element);
                }
            } else {
                if (this.options.link == "chain") {
                    this.chain(this.reveal.bind(this));
                } else {
                    if (this.options.link == "cancel" && !this.showing) {
                        this.cancel();
                        this.reveal();
                    }
                }
            }
        } catch(c) {
            this.element.setStyles({
                display: $lambda(this.options.display).apply(this),
                visiblity: "visible",
                opacity: this.options.opacity
            });
            this.showing = false;
            this.callChain.delay(10, this);
            this.fireEvent("complete", this.element);
            this.fireEvent("show", this.element);
        }
        return this;
    },
    toggle: function() {
        if (this.element.getStyle("display") == "none") {
            this.reveal();
        } else {
            this.dissolve();
        }
        return this;
    },
    cancel: function() {
        this.parent.apply(this, arguments);
        this.element.style.cssText = this.cssText;
        this.hiding = false;
        this.showing = false;
        return this;
    }
});
Element.Properties.reveal = {
    set: function(a) {
        var b = this.retrieve("reveal");
        if (b) {
            b.cancel();
        }
        return this.eliminate("reveal").store("reveal:options", a);
    },
    get: function(a) {
        if (a || !this.retrieve("reveal")) {
            if (a || !this.retrieve("reveal:options")) {
                this.set("reveal", a);
            }
            this.store("reveal", new Fx.Reveal(this, this.retrieve("reveal:options")));
        }
        return this.retrieve("reveal");
    }
};
Element.Properties.dissolve = Element.Properties.reveal;
Element.implement({
    reveal: function(a) {
        this.get("reveal", a).reveal();
        return this;
    },
    dissolve: function(a) {
        this.get("reveal", a).dissolve();
        return this;
    },
    nix: function() {
        var a = Array.link(arguments, {
            destroy: Boolean.type,
            options: Object.type
        });
        this.get("reveal", a.options).dissolve().chain(function() {
            this[a.destroy ? "destroy": "dispose"]();
        }.bind(this));
        return this;
    },
    wink: function() {
        var b = Array.link(arguments, {
            duration: Number.type,
            options: Object.type
        });
        var a = this.get("reveal", b.options);
        a.reveal().chain(function() { (function() {
                a.dissolve();
            }).delay(b.duration || 2000);
        });
    }
});
Fx.Scroll = new Class({
    Extends: Fx,
    options: {
        offset: {
            x: 0,
            y: 0
        },
        wheelStops: true
    },
    initialize: function(b, a) {
        this.element = this.subject = document.id(b);
        this.parent(a);
        var d = this.cancel.bind(this, false);
        if ($type(this.element) != "element") {
            this.element = document.id(this.element.getDocument().body);
        }
        var c = this.element;
        if (this.options.wheelStops) {
            this.addEvent("start", 
            function() {
                c.addEvent("mousewheel", d);
            },
            true);
            this.addEvent("complete", 
            function() {
                c.removeEvent("mousewheel", d);
            },
            true);
        }
    },
    set: function() {
        var a = Array.flatten(arguments);
        if (Browser.Engine.gecko) {
            a = [Math.round(a[0]), Math.round(a[1])];
        }
        this.element.scrollTo(a[0] + this.options.offset.x, a[1] + this.options.offset.y);
    },
    compute: function(c, b, a) {
        return [0, 1].map(function(d) {
            return Fx.compute(c[d], b[d], a);
        });
    },
    start: function(c, h) {
        if (!this.check(c, h)) {
            return this;
        }
        var f = this.element.getScrollSize(),
        b = this.element.getScroll(),
        d = {
            x: c,
            y: h
        };
        for (var g in d) {
            var a = f[g];
            if ($chk(d[g])) {
                d[g] = ($type(d[g]) == "number") ? d[g] : a;
            } else {
                d[g] = b[g];
            }
            d[g] += this.options.offset[g];
        }
        return this.parent([b.x, b.y], [d.x, d.y]);
    },
    toTop: function() {
        return this.start(false, 0);
    },
    toLeft: function() {
        return this.start(0, false);
    },
    toRight: function() {
        return this.start("right", false);
    },
    toBottom: function() {
        return this.start(false, "bottom");
    },
    toElement: function(b) {
        var a = document.id(b).getPosition(this.element);
        return this.start(a.x, a.y);
    },
    scrollIntoView: function(c, f, d) {
        f = f ? $splat(f) : ["x", "y"];
        var i = {};
        c = document.id(c);
        var g = c.getPosition(this.element);
        var j = c.getSize();
        var h = this.element.getScroll();
        var a = this.element.getSize();
        var b = {
            x: g.x + j.x,
            y: g.y + j.y
        }; ["x", "y"].each(function(k) {
            if (f.contains(k)) {
                if (b[k] > h[k] + a[k]) {
                    i[k] = b[k] - a[k];
                }
                if (g[k] < h[k]) {
                    i[k] = g[k];
                }
            }
            if (i[k] == null) {
                i[k] = h[k];
            }
            if (d && d[k]) {
                i[k] = i[k] + d[k];
            }
        },
        this);
        if (i.x != h.x || i.y != h.y) {
            this.start(i.x, i.y);
        }
        return this;
    },
    scrollToCenter: function(c, f, d) {
        f = f ? $splat(f) : ["x", "y"];
        c = $(c);
        var i = {},
        g = c.getPosition(this.element),
        j = c.getSize(),
        h = this.element.getScroll(),
        a = this.element.getSize(),
        b = {
            x: g.x + j.x,
            y: g.y + j.y
        }; ["x", "y"].each(function(k) {
            if (f.contains(k)) {
                i[k] = g[k] - (a[k] - j[k]) / 2;
            }
            if (i[k] == null) {
                i[k] = h[k];
            }
            if (d && d[k]) {
                i[k] = i[k] + d[k];
            }
        },
        this);
        if (i.x != h.x || i.y != h.y) {
            this.start(i.x, i.y);
        }
        return this;
    }
});
Fx.Slide = new Class({
    Extends: Fx,
    options: {
        mode: "vertical",
        wrapper: false,
        hideOverflow: true,
        resetHeight: false
    },
    initialize: function(b, a) {
        this.addEvent("complete", 
        function() {
            this.open = (this.wrapper["offset" + this.layout.capitalize()] != 0);
            if (this.open && this.options.resetHeight) {
                this.wrapper.setStyle("height", "");
            }
            if (this.open && Browser.Engine.webkit419) {
                this.element.dispose().inject(this.wrapper);
            }
        },
        true);
        this.element = this.subject = document.id(b);
        this.parent(a);
        var d = this.element.retrieve("wrapper");
        var c = this.element.getStyles("margin", "position", "overflow");
        if (this.options.hideOverflow) {
            c = $extend(c, {
                overflow: "hidden"
            });
        }
        if (this.options.wrapper) {
            d = document.id(this.options.wrapper).setStyles(c);
        }
        this.wrapper = d || new Element("div", {
            styles: c
        }).wraps(this.element);
        this.element.store("wrapper", this.wrapper).setStyle("margin", 0);
        this.now = [];
        this.open = true;
    },
    vertical: function() {
        this.margin = "margin-top";
        this.layout = "height";
        this.offset = this.element.offsetHeight;
    },
    horizontal: function() {
        this.margin = "margin-left";
        this.layout = "width";
        this.offset = this.element.offsetWidth;
    },
    set: function(a) {
        this.element.setStyle(this.margin, a[0]);
        this.wrapper.setStyle(this.layout, a[1]);
        return this;
    },
    compute: function(c, b, a) {
        return [0, 1].map(function(d) {
            return Fx.compute(c[d], b[d], a);
        });
    },
    start: function(b, f) {
        if (!this.check(b, f)) {
            return this;
        }
        this[f || this.options.mode]();
        var d = this.element.getStyle(this.margin).toInt();
        var c = this.wrapper.getStyle(this.layout).toInt();
        var a = [[d, c], [0, this.offset]];
        var h = [[d, c], [ - this.offset, 0]];
        var g;
        switch (b) {
        case "in":
            g = a;
            break;
        case "out":
            g = h;
            break;
        case "toggle":
            g = (c == 0) ? a: h;
        }
        return this.parent(g[0], g[1]);
    },
    slideIn: function(a) {
        return this.start("in", a);
    },
    slideOut: function(a) {
        return this.start("out", a);
    },
    hide: function(a) {
        this[a || this.options.mode]();
        this.open = false;
        return this.set([ - this.offset, 0]);
    },
    show: function(a) {
        this[a || this.options.mode]();
        this.open = true;
        return this.set([0, this.offset]);
    },
    toggle: function(a) {
        return this.start("toggle", a);
    }
});
Element.Properties.slide = {
    set: function(b) {
        var a = this.retrieve("slide");
        if (a) {
            a.cancel();
        }
        return this.eliminate("slide").store("slide:options", $extend({
            link: "cancel"
        },
        b));
    },
    get: function(a) {
        if (a || !this.retrieve("slide")) {
            if (a || !this.retrieve("slide:options")) {
                this.set("slide", a);
            }
            this.store("slide", new Fx.Slide(this, this.retrieve("slide:options")));
        }
        return this.retrieve("slide");
    }
};
Element.implement({
    slide: function(d, f) {
        d = d || "toggle";
        var b = this.get("slide"),
        a;
        switch (d) {
        case "hide":
            b.hide(f);
            break;
        case "show":
            b.show(f);
            break;
        case "toggle":
            var c = this.retrieve("slide:flag", b.open);
            b[c ? "slideOut": "slideIn"](f);
            this.store("slide:flag", !c);
            a = true;
            break;
        default:
            b.start(d, f);
        }
        if (!a) {
            this.eliminate("slide:flag");
        }
        return this;
    }
});
var SmoothScroll = Fx.SmoothScroll = new Class({
    Extends: Fx.Scroll,
    initialize: function(b, c) {
        c = c || document;
        this.doc = c.getDocument();
        var d = c.getWindow();
        this.parent(this.doc, b);
        this.links = $$(this.options.links || this.doc.links);
        var a = d.location.href.match(/^[^#]*/)[0] + "#";
        this.links.each(function(g) {
            if (g.href.indexOf(a) != 0) {
                return;
            }
            var f = g.href.substr(a.length);
            if (f) {
                this.useLink(g, f);
            }
        },
        this);
        if (!Browser.Engine.webkit419) {
            this.addEvent("complete", 
            function() {
                d.location.hash = this.anchor;
            },
            true);
        }
    },
    useLink: function(c, a) {
        var b;
        c.addEvent("click", 
        function(d) {
            if (b !== false && !b) {
                b = document.id(a) || this.doc.getElement("a[name=" + a + "]");
            }
            if (b) {
                d.preventDefault();
                this.anchor = a;
                this.toElement(b).chain(function() {
                    this.fireEvent("scrolledTo", [c, b]);
                }.bind(this));
                c.blur();
            }
        }.bind(this));
    }
});
Fx.Sort = new Class({
    Extends: Fx.Elements,
    options: {
        mode: "vertical"
    },
    initialize: function(b, a) {
        this.parent(b, a);
        this.elements.each(function(c) {
            if (c.getStyle("position") == "static") {
                c.setStyle("position", "relative");
            }
        });
        this.setDefaultOrder();
    },
    setDefaultOrder: function() {
        this.currentOrder = this.elements.map(function(b, a) {
            return a;
        });
    },
    sort: function(f) {
        if ($type(f) != "array") {
            return false;
        }
        var j = 0,
        a = 0,
        c = {},
        i = {},
        d = this.options.mode == "vertical";
        var g = this.elements.map(function(n, l) {
            var m = n.getComputedSize({
                styles: ["border", "padding", "margin"]
            });
            var o;
            if (d) {
                o = {
                    top: j,
                    margin: m["margin-top"],
                    height: m.totalHeight
                };
                j += o.height - m["margin-top"];
            } else {
                o = {
                    left: a,
                    margin: m["margin-left"],
                    width: m.totalWidth
                };
                a += o.width;
            }
            var k = d ? "top": "left";
            i[l] = {};
            var p = n.getStyle(k).toInt();
            i[l][k] = p || 0;
            return o;
        },
        this);
        this.set(i);
        f = f.map(function(k) {
            return k.toInt();
        });
        if (f.length != this.elements.length) {
            this.currentOrder.each(function(k) {
                if (!f.contains(k)) {
                    f.push(k);
                }
            });
            if (f.length > this.elements.length) {
                f.splice(this.elements.length - 1, f.length - this.elements.length);
            }
        }
        var b = j = a = 0;
        f.each(function(m, k) {
            var l = {};
            if (d) {
                l.top = j - g[m].top - b;
                j += g[m].height;
            } else {
                l.left = a - g[m].left;
                a += g[m].width;
            }
            b = b + g[m].margin;
            c[m] = l;
        },
        this);
        var h = {};
        $A(f).sort().each(function(k) {
            h[k] = c[k];
        });
        this.start(h);
        this.currentOrder = f;
        return this;
    },
    rearrangeDOM: function(a) {
        a = a || this.currentOrder;
        var b = this.elements[0].getParent();
        var c = [];
        this.elements.setStyle("opacity", 0);
        a.each(function(d) {
            c.push(this.elements[d].inject(b).setStyles({
                top: 0,
                left: 0
            }));
        },
        this);
        this.elements.setStyle("opacity", 1);
        this.elements = $$(c);
        this.setDefaultOrder();
        return this;
    },
    getDefaultOrder: function() {
        return this.elements.map(function(b, a) {
            return a;
        });
    },
    forward: function() {
        return this.sort(this.getDefaultOrder());
    },
    backward: function() {
        return this.sort(this.getDefaultOrder().reverse());
    },
    reverse: function() {
        return this.sort(this.currentOrder.reverse());
    },
    sortByElements: function(a) {
        return this.sort(a.map(function(b) {
            return this.elements.indexOf(b);
        },
        this));
    },
    swap: function(c, b) {
        if ($type(c) == "element") {
            c = this.elements.indexOf(c);
        }
        if ($type(b) == "element") {
            b = this.elements.indexOf(b);
        }
        var a = $A(this.currentOrder);
        a[this.currentOrder.indexOf(c)] = b;
        a[this.currentOrder.indexOf(b)] = c;
        return this.sort(a);
    }
});
var Drag = new Class({
    Implements: [Events, Options],
    options: {
        snap: 6,
        unit: "px",
        grid: false,
        style: true,
        limit: false,
        handle: false,
        invert: false,
        preventDefault: false,
        stopPropagation: false,
        modifiers: {
            x: "left",
            y: "top"
        }
    },
    initialize: function() {
        var b = Array.link(arguments, {
            options: Object.type,
            element: $defined
        });
        this.element = document.id(b.element);
        this.document = this.element.getDocument();
        this.setOptions(b.options || {});
        var a = $type(this.options.handle);
        this.handles = ((a == "array" || a == "collection") ? $$(this.options.handle) : document.id(this.options.handle)) || this.element;
        this.mouse = {
            now: {},
            pos: {}
        };
        this.value = {
            start: {},
            now: {}
        };
        this.selection = (Browser.Engine.trident) ? "selectstart": "mousedown";
        this.bound = {
            start: this.start.bind(this),
            check: this.check.bind(this),
            drag: this.drag.bind(this),
            stop: this.stop.bind(this),
            cancel: this.cancel.bind(this),
            eventStop: $lambda(false)
        };
        this.attach();
    },
    attach: function() {
        this.handles.addEvent("mousedown", this.bound.start);
        return this;
    },
    detach: function() {
        this.handles.removeEvent("mousedown", this.bound.start);
        return this;
    },
    start: function(f) {
        if (f.rightClick) {
            return;
        }
        if (this.options.preventDefault) {
            f.preventDefault();
        }
        if (this.options.stopPropagation) {
            f.stopPropagation();
        }
        this.mouse.start = f.page;
        this.fireEvent("beforeStart", this.element);
        var a = this.options.limit;
        this.limit = {
            x: [],
            y: []
        };
        var d = this.element.getStyles("left", "right", "top", "bottom");
        this._invert = {
            x: this.options.modifiers.x == "left" && d.left == "auto" && !isNaN(d.right.toInt()) && (this.options.modifiers.x = "right"),
            y: this.options.modifiers.y == "top" && d.top == "auto" && !isNaN(d.bottom.toInt()) && (this.options.modifiers.y = "bottom")
        };
        var h,
        g;
        for (h in this.options.modifiers) {
            if (!this.options.modifiers[h]) {
                continue;
            }
            var c = this.element.getStyle(this.options.modifiers[h]);
            if (c && !c.match(/px$/)) {
                if (!g) {
                    g = this.element.getCoordinates(this.element.getOffsetParent());
                }
                c = g[this.options.modifiers[h]];
            }
            if (this.options.style) {
                this.value.now[h] = (c || 0).toInt();
            } else {
                this.value.now[h] = this.element[this.options.modifiers[h]];
            }
            if (this.options.invert) {
                this.value.now[h] *= -1;
            }
            if (this._invert[h]) {
                this.value.now[h] *= -1;
            }
            this.mouse.pos[h] = f.page[h] - this.value.now[h];
            if (a && a[h]) {
                for (var b = 2; b--; b) {
                    if ($chk(a[h][b])) {
                        this.limit[h][b] = $lambda(a[h][b])();
                    }
                }
            }
        }
        if ($type(this.options.grid) == "number") {
            this.options.grid = {
                x: this.options.grid,
                y: this.options.grid
            };
        }
        this.document.addEvents({
            mousemove: this.bound.check,
            mouseup: this.bound.cancel
        });
        this.document.addEvent(this.selection, this.bound.eventStop);
    },
    check: function(a) {
        if (this.options.preventDefault) {
            a.preventDefault();
        }
        var b = Math.round(Math.sqrt(Math.pow(a.page.x - this.mouse.start.x, 2) + Math.pow(a.page.y - this.mouse.start.y, 2)));
        if (b > this.options.snap) {
            this.cancel();
            this.document.addEvents({
                mousemove: this.bound.drag,
                mouseup: this.bound.stop
            });
            this.fireEvent("start", [this.element, a]).fireEvent("snap", this.element);
        }
    },
    drag: function(a) {
        if (this.options.preventDefault) {
            a.preventDefault();
        }
        this.mouse.now = a.page;
        for (var b in this.options.modifiers) {
            if (!this.options.modifiers[b]) {
                continue;
            }
            this.value.now[b] = this.mouse.now[b] - this.mouse.pos[b];
            if (this.options.invert) {
                this.value.now[b] *= -1;
            }
            if (this._invert[b]) {
                this.value.now[b] *= -1;
            }
            if (this.options.limit && this.limit[b]) {
                if ($chk(this.limit[b][1]) && (this.value.now[b] > this.limit[b][1])) {
                    this.value.now[b] = this.limit[b][1];
                } else {
                    if ($chk(this.limit[b][0]) && (this.value.now[b] < this.limit[b][0])) {
                        this.value.now[b] = this.limit[b][0];
                    }
                }
            }
            if (this.options.grid[b]) {
                this.value.now[b] -= ((this.value.now[b] - (this.limit[b][0] || 0)) % this.options.grid[b]);
            }
            if (this.options.style) {
                this.element.setStyle(this.options.modifiers[b], this.value.now[b] + this.options.unit);
            } else {
                this.element[this.options.modifiers[b]] = this.value.now[b];
            }
        }
        this.fireEvent("drag", [this.element, a]);
    },
    cancel: function(a) {
        this.document.removeEvent("mousemove", this.bound.check);
        this.document.removeEvent("mouseup", this.bound.cancel);
        if (a) {
            this.document.removeEvent(this.selection, this.bound.eventStop);
            this.fireEvent("cancel", this.element);
        }
    },
    stop: function(a) {
        this.document.removeEvent(this.selection, this.bound.eventStop);
        this.document.removeEvent("mousemove", this.bound.drag);
        this.document.removeEvent("mouseup", this.bound.stop);
        if (a) {
            this.fireEvent("complete", [this.element, a]);
        }
    }
});
Element.implement({
    makeResizable: function(a) {
        var b = new Drag(this, $merge({
            modifiers: {
                x: "width",
                y: "height"
            }
        },
        a));
        this.store("resizer", b);
        return b.addEvent("drag", 
        function() {
            this.fireEvent("resize", b);
        }.bind(this));
    }
});
Drag.Move = new Class({
    Extends: Drag,
    options: {
        droppables: [],
        container: false,
        precalculate: false,
        includeMargins: true,
        checkDroppables: true
    },
    initialize: function(b, a) {
        this.parent(b, a);
        b = this.element;
        this.droppables = $$(this.options.droppables);
        this.container = document.id(this.options.container);
        if (this.container && $type(this.container) != "element") {
            this.container = document.id(this.container.getDocument().body);
        }
        if (this.options.style) {
            if (this.options.modifiers.x == "left" && this.options.modifiers.y == "top") {
                var g,
                c = document.id(b.getOffsetParent());
                if (c) {
                    g = c.getStyles("border-top-width", "border-left-width");
                }
                var d = b.getStyles("left", "top");
                if (c && (d.left == "auto" || d.top == "auto")) {
                    var f = b.getPosition(c);
                    f.x = f.x - (g["border-left-width"] ? g["border-left-width"].toInt() : 0);
                    f.y = f.y - (g["border-top-width"] ? g["border-top-width"].toInt() : 0);
                    b.setPosition(f);
                }
            }
            if (b.getStyle("position") == "static") {
                b.setStyle("position", "absolute");
            }
        }
        this.addEvent("start", this.checkDroppables, true);
        this.overed = null;
    },
    start: function(a) {
        if (this.container) {
            this.options.limit = this.calculateLimit();
        }
        if (this.options.precalculate) {
            this.positions = this.droppables.map(function(b) {
                return b.getCoordinates();
            });
        }
        this.parent(a);
    },
    calculateLimit: function() {
        var d = document.id(this.element.getOffsetParent()) || document.body,
        i = this.container.getCoordinates(d),
        h = {},
        c = {},
        b = {},
        k = {},
        g = {},
        m = {}; ["top", "right", "bottom", "left"].each(function(q) {
            h[q] = this.container.getStyle("border-" + q).toInt();
            b[q] = this.element.getStyle("border-" + q).toInt();
            c[q] = this.element.getStyle("margin-" + q).toInt();
            k[q] = this.container.getStyle("margin-" + q).toInt();
            m[q] = d.getStyle("padding-" + q).toInt();
            g[q] = d.getStyle("border-" + q).toInt();
        },
        this);
        var f = this.element.offsetWidth + c.left + c.right,
        p = this.element.offsetHeight + c.top + c.bottom,
        j = 0,
        l = 0,
        o = i.right - h.right - f,
        a = i.bottom - h.bottom - p;
        if (this.options.includeMargins) {
            j += c.left;
            l += c.top;
        } else {
            o += c.right;
            a += c.bottom;
        }
        if (this.element.getStyle("position") == "relative") {
            var n = this.element.getCoordinates(d);
            n.left -= this.element.getStyle("left").toInt();
            n.top -= this.element.getStyle("top").toInt();
            j += h.left - n.left;
            l += h.top - n.top;
            o += c.left - n.left;
            a += c.top - n.top;
            if (this.container != d) {
                j += k.left + m.left;
                l += (Browser.Engine.trident4 ? 0: k.top) + m.top;
            }
        } else {
            j -= c.left;
            l -= c.top;
            if (this.container == d) {
                o -= h.left;
                a -= h.top;
            } else {
                j += i.left + h.left - g.left;
                l += i.top + h.top - g.top;
                o -= g.left;
                a -= g.top;
            }
        }
        return {
            x: [j, o],
            y: [l, a]
        };
    },
    checkAgainst: function(c, b) {
        c = (this.positions) ? this.positions[b] : c.getCoordinates();
        var a = this.mouse.now;
        return (a.x > c.left && a.x < c.right && a.y < c.bottom && a.y > c.top);
    },
    checkDroppables: function() {
        var a = this.droppables.filter(this.checkAgainst, this).getLast();
        if (this.overed != a) {
            if (this.overed) {
                this.fireEvent("leave", [this.element, this.overed]);
            }
            if (a) {
                this.fireEvent("enter", [this.element, a]);
            }
            this.overed = a;
        }
    },
    drag: function(a) {
        this.parent(a);
        if (this.options.checkDroppables && this.droppables.length) {
            this.checkDroppables();
        }
    },
    stop: function(a) {
        this.checkDroppables();
        this.fireEvent("drop", [this.element, this.overed, a]);
        this.overed = null;
        return this.parent(a);
    }
});
Element.implement({
    makeDraggable: function(a) {
        var b = new Drag.Move(this, a);
        this.store("dragger", b);
        return b;
    }
});
var Slider = new Class({
    Implements: [Events, Options],
    Binds: ["clickedElement", "draggedKnob", "scrolledElement"],
    options: {
        onTick: function(a) {
            if (this.options.snap) {
                a = this.toPosition(this.step);
            }
            this.knob.setStyle(this.property, a);
        },
        initialStep: 0,
        snap: false,
        offset: 0,
        range: false,
        wheel: false,
        steps: 100,
        mode: "horizontal"
    },
    initialize: function(g, a, f) {
        this.setOptions(f);
        this.element = document.id(g);
        this.knob = document.id(a);
        this.previousChange = this.previousEnd = this.step = -1;
        var h,
        b = {},
        d = {
            x: false,
            y: false
        };
        switch (this.options.mode) {
        case "vertical":
            this.axis = "y";
            this.property = "top";
            h = "offsetHeight";
            break;
        case "horizontal":
            this.axis = "x";
            this.property = "left";
            h = "offsetWidth";
        }
        this.full = this.element.measure(function() {
            this.half = this.knob[h] / 2;
            return this.element[h] - this.knob[h] + (this.options.offset * 2);
        }.bind(this));
        this.setRange(this.options.range);
        this.knob.setStyle("position", "relative").setStyle(this.property, -this.options.offset);
        d[this.axis] = this.property;
        b[this.axis] = [ - this.options.offset, this.full - this.options.offset];
        var c = {
            snap: 0,
            limit: b,
            modifiers: d,
            onDrag: this.draggedKnob,
            onStart: this.draggedKnob,
            onBeforeStart: (function() {
                this.isDragging = true;
            }).bind(this),
            onCancel: function() {
                this.isDragging = false;
            }.bind(this),
            onComplete: function() {
                this.isDragging = false;
                this.draggedKnob();
                this.end();
            }.bind(this)
        };
        if (this.options.snap) {
            c.grid = Math.ceil(this.stepWidth);
            c.limit[this.axis][1] = this.full;
        }
        this.drag = new Drag(this.knob, c);
        this.attach();
        if (this.options.initialStep != null) {
            this.set(this.options.initialStep);
        }
    },
    attach: function() {
        this.element.addEvent("mousedown", this.clickedElement);
        if (this.options.wheel) {
            this.element.addEvent("mousewheel", this.scrolledElement);
        }
        this.drag.attach();
        return this;
    },
    detach: function() {
        this.element.removeEvent("mousedown", this.clickedElement);
        this.element.removeEvent("mousewheel", this.scrolledElement);
        this.drag.detach();
        return this;
    },
    set: function(a) {
        if (! ((this.range > 0) ^ (a < this.min))) {
            a = this.min;
        }
        if (! ((this.range > 0) ^ (a > this.max))) {
            a = this.max;
        }
        this.step = Math.round(a);
        this.checkStep();
        this.fireEvent("tick", this.toPosition(this.step));
        this.end();
        return this;
    },
    setRange: function(a, b) {
        this.min = $pick(a[0], 0);
        this.max = $pick(a[1], this.options.steps);
        this.range = this.max - this.min;
        this.steps = this.options.steps || this.full;
        this.stepSize = Math.abs(this.range) / this.steps;
        this.stepWidth = this.stepSize * this.full / Math.abs(this.range);
        this.set($pick(b, this.step).floor(this.min).max(this.max));
        return this;
    },
    clickedElement: function(c) {
        if (this.isDragging || c.target == this.knob) {
            return;
        }
        var b = this.range < 0 ? -1: 1;
        var a = c.page[this.axis] - this.element.getPosition()[this.axis] - this.half;
        a = a.limit( - this.options.offset, this.full - this.options.offset);
        this.step = Math.round(this.min + b * this.toStep(a));
        this.checkStep();
        this.fireEvent("tick", a);
        this.end();
    },
    scrolledElement: function(a) {
        var b = (this.options.mode == "horizontal") ? (a.wheel < 0) : (a.wheel > 0);
        this.set(b ? this.step - this.stepSize: this.step + this.stepSize);
        a.stop();
    },
    draggedKnob: function() {
        var b = this.range < 0 ? -1: 1;
        var a = this.drag.value.now[this.axis];
        a = a.limit( - this.options.offset, this.full - this.options.offset);
        this.step = Math.round(this.min + b * this.toStep(a));
        this.checkStep();
    },
    checkStep: function() {
        if (this.previousChange != this.step) {
            this.previousChange = this.step;
            this.fireEvent("change", this.step);
        }
    },
    end: function() {
        if (this.previousEnd !== this.step) {
            this.previousEnd = this.step;
            this.fireEvent("complete", this.step + "");
        }
    },
    toStep: function(a) {
        var b = (a + this.options.offset) * this.stepSize / this.full * this.steps;
        return this.options.steps ? Math.round(b -= b % this.stepSize) : b;
    },
    toPosition: function(a) {
        return (this.full * Math.abs(this.min - a)) / (this.steps * this.stepSize) - this.options.offset;
    }
});
var Sortables = new Class({
    Implements: [Events, Options],
    options: {
        snap: 4,
        opacity: 1,
        clone: false,
        revert: false,
        handle: false,
        constrain: false,
        preventDefault: false
    },
    initialize: function(a, b) {
        this.setOptions(b);
        this.elements = [];
        this.lists = [];
        this.idle = true;
        this.addLists($$(document.id(a) || a));
        if (!this.options.clone) {
            this.options.revert = false;
        }
        if (this.options.revert) {
            this.effect = new Fx.Morph(null, $merge({
                duration: 250,
                link: "cancel"
            },
            this.options.revert));
        }
    },
    attach: function() {
        this.addLists(this.lists);
        return this;
    },
    detach: function() {
        this.lists = this.removeLists(this.lists);
        return this;
    },
    addItems: function() {
        Array.flatten(arguments).each(function(a) {
            this.elements.push(a);
            var b = a.retrieve("sortables:start", this.start.bindWithEvent(this, a)); (this.options.handle ? a.getElement(this.options.handle) || a: a).addEvent("mousedown", b);
        },
        this);
        return this;
    },
    addLists: function() {
        Array.flatten(arguments).each(function(a) {
            this.lists.push(a);
            this.addItems(a.getChildren());
        },
        this);
        return this;
    },
    removeItems: function() {
        return $$(Array.flatten(arguments).map(function(a) {
            this.elements.erase(a);
            var b = a.retrieve("sortables:start"); (this.options.handle ? a.getElement(this.options.handle) || a: a).removeEvent("mousedown", b);
            return a;
        },
        this));
    },
    removeLists: function() {
        return $$(Array.flatten(arguments).map(function(a) {
            this.lists.erase(a);
            this.removeItems(a.getChildren());
            return a;
        },
        this));
    },
    getClone: function(b, a) {
        if (!this.options.clone) {
            return new Element(a.tagName).inject(document.body);
        }
        if ($type(this.options.clone) == "function") {
            return this.options.clone.call(this, b, a, this.list);
        }
        var c = a.clone(true).setStyles({
            margin: "0px",
            position: "absolute",
            visibility: "hidden",
            width: a.getStyle("width")
        });
        if (c.get("html").test("radio")) {
            c.getElements("input[type=radio]").each(function(d, f) {
                d.set("name", "clone_" + f);
                if (d.get("checked")) {
                    a.getElements("input[type=radio]")[f].set("checked", true);
                }
            });
        }
        return c.inject(this.list).setPosition(a.getPosition(a.getOffsetParent()));
    },
    getDroppables: function() {
        var a = this.list.getChildren();
        if (!this.options.constrain) {
            a = this.lists.concat(a).erase(this.list);
        }
        return a.erase(this.clone).erase(this.element);
    },
    insert: function(c, b) {
        var a = "inside";
        if (this.lists.contains(b)) {
            this.list = b;
            this.drag.droppables = this.getDroppables();
        } else {
            a = this.element.getAllPrevious().contains(b) ? "before": "after";
        }
        this.element.inject(b, a);
        this.fireEvent("sort", [this.element, this.clone]);
    },
    start: function(b, a) {
        if (!this.idle || b.rightClick || ["button", "input"].contains(document.id(b.target).get("tag"))) {
            return;
        }
        this.idle = false;
        this.element = a;
        this.opacity = a.get("opacity");
        this.list = a.getParent();
        this.clone = this.getClone(b, a);
        this.drag = new Drag.Move(this.clone, {
            preventDefault: this.options.preventDefault,
            snap: this.options.snap,
            container: this.options.constrain && this.element.getParent(),
            droppables: this.getDroppables(),
            onSnap: function() {
                b.stop();
                this.clone.setStyle("visibility", "visible");
                this.element.set("opacity", this.options.opacity || 0);
                this.fireEvent("start", [this.element, this.clone]);
            }.bind(this),
            onEnter: this.insert.bind(this),
            onCancel: this.reset.bind(this),
            onComplete: this.end.bind(this)
        });
        this.clone.inject(this.element, "before");
        this.drag.start(b);
    },
    end: function() {
        this.drag.detach();
        this.element.set("opacity", this.opacity);
        if (this.effect) {
            var a = this.element.getStyles("width", "height");
            var b = this.clone.computePosition(this.element.getPosition(this.clone.getOffsetParent()));
            this.effect.element = this.clone;
            this.effect.start({
                top: b.top,
                left: b.left,
                width: a.width,
                height: a.height,
                opacity: 0.25
            }).chain(this.reset.bind(this));
        } else {
            this.reset();
        }
    },
    reset: function() {
        this.idle = true;
        this.clone.destroy();
        this.fireEvent("complete", this.element);
    },
    serialize: function() {
        var c = Array.link(arguments, {
            modifier: Function.type,
            index: $defined
        });
        var b = this.lists.map(function(d) {
            return d.getChildren().map(c.modifier || 
            function(f) {
                return f.get("id");
            },
            this);
        },
        this);
        var a = c.index;
        if (this.lists.length == 1) {
            a = 0;
        }
        return $chk(a) && a >= 0 && a < this.lists.length ? b[a] : b;
    }
});
Request.JSONP = new Class({
    Implements: [Chain, Events, Options, Log],
    options: {
        url: "",
        data: {},
        retries: 0,
        timeout: 0,
        link: "ignore",
        callbackKey: "callback",
        injectScript: document.head
    },
    initialize: function(a) {
        this.setOptions(a);
        if (this.options.log) {
            this.enableLog();
        }
        this.running = false;
        this.requests = 0;
        this.triesRemaining = [];
    },
    check: function() {
        if (!this.running) {
            return true;
        }
        switch (this.options.link) {
        case "cancel":
            this.cancel();
            return true;
        case "chain":
            this.chain(this.caller.bind(this, arguments));
            return false;
        }
        return false;
    },
    send: function(c) {
        if (!$chk(arguments[1]) && !this.check(c)) {
            return this;
        }
        var f = $type(c),
        a = this.options,
        b = $chk(arguments[1]) ? arguments[1] : this.requests++;
        if (f == "string" || f == "element") {
            c = {
                data: c
            };
        }
        c = $extend({
            data: a.data,
            url: a.url
        },
        c);
        if (!$chk(this.triesRemaining[b])) {
            this.triesRemaining[b] = this.options.retries;
        }
        var d = this.triesRemaining[b]; (function() {
            var g = this.getScript(c);
            this.log("JSONP retrieving script with url: " + g.get("src"));
            this.fireEvent("request", g);
            this.running = true; (function() {
                if (d) {
                    this.triesRemaining[b] = d - 1;
                    if (g) {
                        g.destroy();
                        this.send(c, b).fireEvent("retry", this.triesRemaining[b]);
                    }
                } else {
                    if (this.running && g && this.options.timeout) {
                        g.destroy();
                        this.cancel().fireEvent("failure");
                    }
                }
            }).delay(this.options.timeout, this);
        }).delay(Browser.Engine.trident ? 50: 0, this);
        return this;
    },
    cancel: function() {
        if (!this.running) {
            return this;
        }
        this.running = false;
        this.fireEvent("cancel");
        return this;
    },
    getScript: function(c) {
        var b = Request.JSONP.counter,
        d;
        Request.JSONP.counter++;
        switch ($type(c.data)) {
        case "element":
            d = document.id(c.data).toQueryString();
            break;
        case "object":
        case "hash":
            d = Hash.toQueryString(c.data);
        }
        var f = c.url + (c.url.test("\\?") ? "&": "?") + (c.callbackKey || this.options.callbackKey) + "=Request.JSONP.request_map.request_" + b + (d ? "&" + d: "");
        if (f.length > 2083) {
            this.log("JSONP " + f + " will fail in Internet Explorer, which enforces a 2083 bytes length limit on URIs");
        }
        var a = new Element("script", {
            type: "text/javascript",
            src: f
        });
        Request.JSONP.request_map["request_" + b] = function() {
            this.success(arguments, a);
        }.bind(this);
        return a.inject(this.options.injectScript);
    },
    success: function(b, a) {
        if (!this.running) {
            return false;
        }
        if (a) {
            a.destroy();
        }
        this.running = false;
        this.log("JSONP successfully retrieved: ", b);
        this.fireEvent("complete", b).fireEvent("success", b).callChain();
    }
});
Request.JSONP.counter = 0;
Request.JSONP.request_map = {};
Request.Queue = new Class({
    Implements: [Options, Events],
    Binds: ["attach", "request", "complete", "cancel", "success", "failure", "exception"],
    options: {
        stopOnFailure: true,
        autoAdvance: true,
        concurrent: 1,
        requests: {}
    },
    initialize: function(a) {
        if (a) {
            var b = a.requests;
            delete a.requests;
        }
        this.setOptions(a);
        this.requests = new Hash;
        this.queue = [];
        this.reqBinders = {};
        if (b) {
            this.addRequests(b);
        }
    },
    addRequest: function(a, b) {
        this.requests.set(a, b);
        this.attach(a, b);
        return this;
    },
    addRequests: function(a) {
        $each(a, 
        function(c, b) {
            this.addRequest(b, c);
        },
        this);
        return this;
    },
    getName: function(a) {
        return this.requests.keyOf(a);
    },
    attach: function(a, b) {
        if (b._groupSend) {
            return this;
        } ["request", "complete", "cancel", "success", "failure", "exception"].each(function(c) {
            if (!this.reqBinders[a]) {
                this.reqBinders[a] = {};
            }
            this.reqBinders[a][c] = function() {
                this["on" + c.capitalize()].apply(this, [a, b].extend(arguments));
            }.bind(this);
            b.addEvent(c, this.reqBinders[a][c]);
        },
        this);
        b._groupSend = b.send;
        b.send = function(c) {
            this.send(a, c);
            return b;
        }.bind(this);
        return this;
    },
    removeRequest: function(b) {
        var a = $type(b) == "object" ? this.getName(b) : b;
        if (!a && $type(a) != "string") {
            return this;
        }
        b = this.requests.get(a);
        if (!b) {
            return this;
        } ["request", "complete", "cancel", "success", "failure", "exception"].each(function(c) {
            b.removeEvent(c, this.reqBinders[a][c]);
        },
        this);
        b.send = b._groupSend;
        delete b._groupSend;
        return this;
    },
    getRunning: function() {
        return this.requests.filter(function(a) {
            return a.running;
        });
    },
    isRunning: function() {
        return !! (this.getRunning().getKeys().length);
    },
    send: function(b, a) {
        var c = function() {
            this.requests.get(b)._groupSend(a);
            this.queue.erase(c);
        }.bind(this);
        c.name = b;
        if (this.getRunning().getKeys().length >= this.options.concurrent || (this.error && this.options.stopOnFailure)) {
            this.queue.push(c);
        } else {
            c();
        }
        return this;
    },
    hasNext: function(a) {
        return (!a) ? !!this.queue.length: !!this.queue.filter(function(b) {
            return b.name == a;
        }).length;
    },
    resume: function() {
        this.error = false; (this.options.concurrent - this.getRunning().getKeys().length).times(this.runNext, this);
        return this;
    },
    runNext: function(a) {
        if (!this.queue.length) {
            return this;
        }
        if (!a) {
            this.queue[0]();
        } else {
            var b;
            this.queue.each(function(c) {
                if (!b && c.name == a) {
                    b = true;
                    c();
                }
            });
        }
        return this;
    },
    runAll: function() {
        this.queue.each(function(a) {
            a();
        });
        return this;
    },
    clear: function(a) {
        if (!a) {
            this.queue.empty();
        } else {
            this.queue = this.queue.map(function(b) {
                if (b.name != a) {
                    return b;
                } else {
                    return false;
                }
            }).filter(function(b) {
                return b;
            });
        }
        return this;
    },
    cancel: function(a) {
        this.requests.get(a).cancel();
        return this;
    },
    onRequest: function() {
        this.fireEvent("request", arguments);
    },
    onComplete: function() {
        this.fireEvent("complete", arguments);
        if (!this.queue.length) {
            this.fireEvent("end");
        }
    },
    onCancel: function() {
        if (this.options.autoAdvance && !this.error) {
            this.runNext();
        }
        this.fireEvent("cancel", arguments);
    },
    onSuccess: function() {
        if (this.options.autoAdvance && !this.error) {
            this.runNext();
        }
        this.fireEvent("success", arguments);
    },
    onFailure: function() {
        this.error = true;
        if (!this.options.stopOnFailure && this.options.autoAdvance) {
            this.runNext();
        }
        this.fireEvent("failure", arguments);
    },
    onException: function() {
        this.error = true;
        if (!this.options.stopOnFailure && this.options.autoAdvance) {
            this.runNext();
        }
        this.fireEvent("exception", arguments);
    }
});
Request.implement({
    options: {
        initialDelay: 5000,
        delay: 5000,
        limit: 60000
    },
    startTimer: function(b) {
        var a = function() {
            if (!this.running) {
                this.send({
                    data: b
                });
            }
        };
        this.timer = a.delay(this.options.initialDelay, this);
        this.lastDelay = this.options.initialDelay;
        this.completeCheck = function(c) {
            $clear(this.timer);
            this.lastDelay = (c) ? this.options.delay: (this.lastDelay + this.options.delay).min(this.options.limit);
            this.timer = a.delay(this.lastDelay, this);
        };
        return this.addEvent("complete", this.completeCheck);
    },
    stopTimer: function() {
        $clear(this.timer);
        return this.removeEvent("complete", this.completeCheck);
    }
});
var Asset = {
    assetArray: new Array(),
    javascript: function(source, properties) {
        if (Asset.assetArray.contains(source)) {
            if (properties.onload)
            properties.onload();
            return;
        }
        Asset.assetArray.include(source);
        properties = $extend({
            onload: $empty,
            document: document,
            check: $lambda(true)
        },
        properties);
        var script = new Element('script', {
            src: source,
            type: 'text/javascript'
        });
        var load = properties.onload.bind(script),
        check = properties.check,
        doc = properties.document;
        delete properties.onload;
        delete properties.check;
        delete properties.document;
        script.addEvents({
            load: load,
            readystatechange: function() {
                if (['loaded', 'complete'].contains(this.readyState)) load();
            }
        }).set(properties);
        if (Browser.Engine.webkit419) var checker = (function() {
            if (!$try(check)) return;
            $clear(checker);
            load();
        }).periodical(50);
        return script.inject(doc.head);
    },
    css: function(source, properties) {
        return new Element('link', $merge({
            rel: 'stylesheet',
            media: 'screen',
            type: 'text/css',
            href: source
        },
        properties)).inject(document.head);
    },
    image: function(source, properties) {
        if (Asset.assetArray.contains(source)) return;
        Asset.assetArray.include(source);
        properties = $merge({
            onload: $empty,
            onabort: $empty,
            onerror: $empty
        },
        properties);
        var image = new Image();
        var element = document.id(image) || new Element('img'); ['load', 'abort', 'error'].each(function(name) {
            var type = 'on' + name;
            var event = properties[type];
            delete properties[type];
            image[type] = function() {
                if (!image) return;
                if (!element.parentNode) {
                    element.width = image.width;
                    element.height = image.height;
                }
                image = image.onload = image.onabort = image.onerror = null;
                event.delay(1, element, element);
                element.fireEvent(name, element, 1);
            };
        });
        image.src = element.src = source;
        if (image && image.complete) image.onload.delay(1);
        return element.set(properties);
    },
    images: function(sources, options) {
        if (Asset.assetArray.contains(source)) return;
        Asset.assetArray.include(source);
        options = $merge({
            onComplete: $empty,
            onProgress: $empty,
            onError: $empty,
            properties: {}
        },
        options);
        sources = $splat(sources);
        var images = [];
        var counter = 0;
        return new Elements(sources.map(function(source) {
            return Asset.image(source, $extend(options.properties, {
                onload: function() {
                    options.onProgress.call(this, counter, sources.indexOf(source));
                    counter++;
                    if (counter == sources.length) options.onComplete();
                },
                onerror: function() {
                    options.onError.call(this, counter, sources.indexOf(source));
                    counter++;
                    if (counter == sources.length) options.onComplete();
                }
            }));
        }));
    }
};
var Color = new Native({
    initialize: function(b, c) {
        if (arguments.length >= 3) {
            c = "rgb";
            b = Array.slice(arguments, 0, 3);
        } else {
            if (typeof b == "string") {
                if (b.match(/rgb/)) {
                    b = b.rgbToHex().hexToRgb(true);
                } else {
                    if (b.match(/hsb/)) {
                        b = b.hsbToRgb();
                    } else {
                        b = b.hexToRgb(true);
                    }
                }
            }
        }
        c = c || "rgb";
        switch (c) {
        case "hsb":
            var a = b;
            b = b.hsbToRgb();
            b.hsb = a;
            break;
        case "hex":
            b = b.hexToRgb(true);
            break;
        }
        b.rgb = b.slice(0, 3);
        b.hsb = b.hsb || b.rgbToHsb();
        b.hex = b.rgbToHex();
        return $extend(b, this);
    }
});
Color.implement({
    mix: function() {
        var a = Array.slice(arguments);
        var c = ($type(a.getLast()) == "number") ? a.pop() : 50;
        var b = this.slice();
        a.each(function(d) {
            d = new Color(d);
            for (var f = 0; f < 3; f++) {
                b[f] = Math.round((b[f] / 100 * (100 - c)) + (d[f] / 100 * c));
            }
        });
        return new Color(b, "rgb");
    },
    invert: function() {
        return new Color(this.map(function(a) {
            return 255 - a;
        }));
    },
    setHue: function(a) {
        return new Color([a, this.hsb[1], this.hsb[2]], "hsb");
    },
    setSaturation: function(a) {
        return new Color([this.hsb[0], a, this.hsb[2]], "hsb");
    },
    setBrightness: function(a) {
        return new Color([this.hsb[0], this.hsb[1], a], "hsb");
    }
});
var $RGB = function(d, c, a) {
    return new Color([d, c, a], "rgb");
};
var $HSB = function(d, c, a) {
    return new Color([d, c, a], "hsb");
};
var $HEX = function(a) {
    return new Color(a, "hex");
};
Array.implement({
    rgbToHsb: function() {
        var b = this[0],
        c = this[1],
        k = this[2],
        h = 0;
        var j = Math.max(b, c, k),
        f = Math.min(b, c, k);
        var l = j - f;
        var i = j / 255,
        g = (j != 0) ? l / j: 0;
        if (g != 0) {
            var d = (j - b) / l;
            var a = (j - c) / l;
            var m = (j - k) / l;
            if (b == j) {
                h = m - a;
            } else {
                if (c == j) {
                    h = 2 + d - m;
                } else {
                    h = 4 + a - d;
                }
            }
            h /= 6;
            if (h < 0) {
                h++;
            }
        }
        return [Math.round(h * 360), Math.round(g * 100), Math.round(i * 100)];
    },
    hsbToRgb: function() {
        var c = Math.round(this[2] / 100 * 255);
        if (this[1] == 0) {
            return [c, c, c];
        } else {
            var a = this[0] % 360;
            var g = a % 60;
            var h = Math.round((this[2] * (100 - this[1])) / 10000 * 255);
            var d = Math.round((this[2] * (6000 - this[1] * g)) / 600000 * 255);
            var b = Math.round((this[2] * (6000 - this[1] * (60 - g))) / 600000 * 255);
            switch (Math.floor(a / 60)) {
            case 0:
                return [c, b, h];
            case 1:
                return [d, c, h];
            case 2:
                return [h, c, b];
            case 3:
                return [h, d, c];
            case 4:
                return [b, h, c];
            case 5:
                return [c, h, d];
            }
        }
        return false;
    }
});
String.implement({
    rgbToHsb: function() {
        var a = this.match(/\d{1,3}/g);
        return (a) ? a.rgbToHsb() : null;
    },
    hsbToRgb: function() {
        var a = this.match(/\d{1,3}/g);
        return (a) ? a.hsbToRgb() : null;
    }
});
var Group = new Class({
    initialize: function() {
        this.instances = Array.flatten(arguments);
        this.events = {};
        this.checker = {};
    },
    addEvent: function(b, a) {
        this.checker[b] = this.checker[b] || {};
        this.events[b] = this.events[b] || [];
        if (this.events[b].contains(a)) {
            return false;
        } else {
            this.events[b].push(a);
        }
        this.instances.each(function(c, d) {
            c.addEvent(b, this.check.bind(this, [b, c, d]));
        },
        this);
        return this;
    },
    check: function(c, a, b) {
        this.checker[c][b] = true;
        var d = this.instances.every(function(g, f) {
            return this.checker[c][f] || false;
        },
        this);
        if (!d) {
            return;
        }
        this.checker[c] = {};
        this.events[c].each(function(f) {
            f.call(this, this.instances, a);
        },
        this);
    }
});
Hash.Cookie = new Class({
    Extends: Cookie,
    options: {
        autoSave: true
    },
    initialize: function(b, a) {
        this.parent(b, a);
        this.load();
    },
    save: function() {
        var a = JSON.encode(this.hash);
        if (!a || a.length > 4096) {
            return false;
        }
        if (a == "{}") {
            this.dispose();
        } else {
            this.write(a);
        }
        return true;
    },
    load: function() {
        this.hash = new Hash(JSON.decode(this.read(), true));
        return this;
    }
});
Hash.each(Hash.prototype, 
function(b, a) {
    if (typeof b == "function") {
        Hash.Cookie.implement(a, 
        function() {
            var c = b.apply(this.hash, arguments);
            if (this.options.autoSave) {
                this.save();
            }
            return c;
        });
    }
});
var IframeShim = new Class({
    Implements: [Options, Events, Class.Occlude],
    options: {
        className: "iframeShim",
        src: 'javascript:false;document.write("");',
        display: false,
        zIndex: null,
        margin: 0,
        offset: {
            x: 0,
            y: 0
        },
        browsers: (Browser.Engine.trident4 || (Browser.Engine.gecko && !Browser.Engine.gecko19 && Browser.Platform.mac))
    },
    property: "IframeShim",
    initialize: function(b, a) {
        this.element = document.id(b);
        if (this.occlude()) {
            return this.occluded;
        }
        this.setOptions(a);
        this.makeShim();
        return this;
    },
    makeShim: function() {
        if (this.options.browsers) {
            var c = this.element.getStyle("zIndex").toInt();
            if (!c) {
                c = 1;
                var b = this.element.getStyle("position");
                if (b == "static" || !b) {
                    this.element.setStyle("position", "relative");
                }
                this.element.setStyle("zIndex", c);
            }
            c = ($chk(this.options.zIndex) && c > this.options.zIndex) ? this.options.zIndex: c - 1;
            if (c < 0) {
                c = 1;
            }
            this.shim = new Element("iframe", {
                src: this.options.src,
                scrolling: "no",
                frameborder: 0,
                styles: {
                    zIndex: c,
                    position: "absolute",
                    border: "none",
                    filter: "progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)"
                },
                "class": this.options.className
            }).store("IframeShim", this);
            var a = (function() {
                this.shim.inject(this.element, "after");
                this[this.options.display ? "show": "hide"]();
                this.fireEvent("inject");
            }).bind(this);
            if (!IframeShim.ready) {
                window.addEvent("load", a);
            } else {
                a();
            }
        } else {
            this.position = this.hide = this.show = this.dispose = $lambda(this);
        }
    },
    position: function() {
        if (!IframeShim.ready || !this.shim) {
            return this;
        }
        var a = this.element.measure(function() {
            return this.getSize();
        });
        if (this.options.margin != undefined) {
            a.x = a.x - (this.options.margin * 2);
            a.y = a.y - (this.options.margin * 2);
            this.options.offset.x += this.options.margin;
            this.options.offset.y += this.options.margin;
        }
        this.shim.set({
            width: a.x,
            height: a.y
        }).position({
            relativeTo: this.element,
            offset: this.options.offset
        });
        return this;
    },
    hide: function() {
        if (this.shim) {
            this.shim.setStyle("display", "none");
        }
        return this;
    },
    show: function() {
        if (this.shim) {
            this.shim.setStyle("display", "block");
        }
        return this.position();
    },
    dispose: function() {
        if (this.shim) {
            this.shim.dispose();
        }
        return this;
    },
    destroy: function() {
        if (this.shim) {
            this.shim.destroy();
        }
        return this;
    }
});
window.addEvent("load", 
function() {
    IframeShim.ready = true;
});
var HtmlTable = new Class({
    Implements: [Options, Events, Class.Occlude],
    options: {
        properties: {
            cellpadding: 0,
            cellspacing: 0,
            border: 0
        },
        rows: [],
        headers: [],
        footers: []
    },
    property: "HtmlTable",
    initialize: function() {
        var a = Array.link(arguments, {
            options: Object.type,
            table: Element.type
        });
        this.setOptions(a.options);
        this.element = a.table || new Element("table", this.options.properties);
        if (this.occlude()) {
            return this.occluded;
        }
        this.build();
    },
    build: function() {

        this.element.store("HtmlTable", this);
        this.body = document.id(this.element.tBodies[0]) || new Element("tbody").inject(this.element);
        $$(this.body.rows);
        if (this.options.headers.length) {
            this.setHeaders(this.options.headers);
        } else {
            this.thead = document.id(this.element.tHead);
        }
        if (this.thead) {
            this.head = document.id(this.thead.rows[0]);
        }
        if (this.options.footers.length) {
            this.setFooters(this.options.footers);
        }
        this.tfoot = document.id(this.element.tFoot);
        if (this.tfoot) {
            this.foot = document.id(this.tfoot.rows[0]);
        }
        this.options.rows.each(function(a) {
            this.push(a);
        },
        this); ["adopt", "inject", "wraps", "grab", "replaces", "dispose"].each(function(a) {
            this[a] = this.element[a].bind(this.element);
        },
        this);
    },
    toElement: function() {
        return this.element;
    },
    empty: function() {
        this.body.empty();
        return this;
    },
    set: function(d, a) {
        var c = (d == "headers") ? "tHead": "tFoot";
        this[c.toLowerCase()] = (document.id(this.element[c]) || new Element(c.toLowerCase()).inject(this.element, "top")).empty();
        var b = this.push(a, {},
        this[c.toLowerCase()], d == "headers" ? "th": "td");
        if (d == "headers") {
            this.head = document.id(this.thead.rows[0]);
        } else {
            this.foot = document.id(this.thead.rows[0]);
        }
        return b;
    },
    setHeaders: function(a) {
        this.set("headers", a);
        return this;
    },
    setFooters: function(a) {
        this.set("footers", a);
        return this;
    },
    push: function(f, b, d, a) {
        if ($type(f) == "element" && f.get("tag") == "tr") {
            f.inject(d || this.body);
            return {
                tr: f,
                tds: f.getChildren("td")
            };
        }
        var c = f.map(function(i) {
            var j = new Element(a || "td", i ? i.properties: {}),
            h = (i ? i.content: "") || i,
            g = document.id(h);
            if ($type(h) != "string" && g) {
                j.adopt(g);
            } else {
                j.set("html", h);
            }
            return j;
        });
        return {
            tr: new Element("tr", b).inject(d || this.body).adopt(c),
            tds: c
        };
    }
});
HtmlTable = Class.refactor(HtmlTable, {
    options: {
        classZebra: "table-tr-odd",
        zebra: true
    },
    initialize: function() {
        this.previous.apply(this, arguments);
        if (this.occluded) {
            return this.occluded;
        }
        if (this.options.zebra) {
            this.updateZebras();
        }
    },
    updateZebras: function() {
        Array.each(this.body.rows, this.zebra, this);
    },
    zebra: function(b, a) {
        return b[((a % 2) ? "remove": "add") + "Class"](this.options.classZebra);
    },
    push: function() {
        var a = this.previous.apply(this, arguments);
        if (this.options.zebra) {
            this.updateZebras();
        }
        return a;
    }
});
HtmlTable = Class.refactor(HtmlTable, {
    options: {
        sortIndex: 0,
        sortReverse: false,
        parsers: [],
        defaultParser: "string",
        classSortable: "table-sortable",
        classHeadSort: "table-th-sort",
        classHeadSortRev: "table-th-sort-rev",
        classNoSort: "table-th-nosort",
        classGroupHead: "table-tr-group-head",
        classGroup: "table-tr-group",
        classCellSort: "table-td-sort",
        classSortSpan: "table-th-sort-span",
        sortable: false
    },
    initialize: function() {
        this.previous.apply(this, arguments);
        if (this.occluded) {
            return this.occluded;
        }
        this.sorted = {
            index: null,
            dir: 1
        };
        this.bound = {
            headClick: this.headClick.bind(this)
        };
        this.sortSpans = new Elements();
        if (this.options.sortable) {
            this.enableSort();
            if (this.options.sortIndex != null) {
                this.sort(this.options.sortIndex, this.options.sortReverse);
            }
        }
    },
    attachSorts: function(a) {
        this.element.removeEvents("click:relay(th)");
        this.element[$pick(a, true) ? "addEvent": "removeEvent"]("click:relay(th)", this.bound.headClick);
    },
    setHeaders: function() {
        this.previous.apply(this, arguments);
        if (this.sortEnabled) {
            this.detectParsers();
        }
    },
    detectParsers: function(c) {
        if (!this.head) {
            return;
        }
        var a = this.options.parsers,
        b = this.body.rows;
        this.parsers = $$(this.head.cells).map(function(d, f) {
            if (!c && (d.hasClass(this.options.classNoSort) || d.retrieve("htmltable-parser"))) {
                return d.retrieve("htmltable-parser");
            }
            var g = new Element("div");
            $each(d.childNodes, 
            function(k) {
                g.adopt(k);
            });
            g.inject(d);
            var i = new Element("span", {
                html: "&#160;",
                "class": this.options.classSortSpan
            }).inject(g, "top");
            this.sortSpans.push(i);
            var j = a[f],
            h;
            switch ($type(j)) {
            case "function":
                j = {
                    convert: j
                };
                h = true;
                break;
            case "string":
                j = j;
                h = true;
                break;
            }
            if (!h) {
                HtmlTable.Parsers.some(function(o) {
                    var m = o.match;
                    if (!m) {
                        return false;
                    }
                    for (var n = 0, l = b.length; n < l; n++) {
                        var k = document.id(b[n].cells[f]);
                        var p = k ? k.get("html").clean() : "";
                        if (p && m.test(p)) {
                            j = o;
                            return true;
                        }
                    }
                });
            }
            if (!j) {
                j = this.options.defaultParser;
            }
            d.store("htmltable-parser", j);
            return j;
        },
        this);
    },
    headClick: function(c, b) {
        if (!this.head || b.hasClass(this.options.classNoSort)) {
            return;
        }
        var a = Array.indexOf(this.head.cells, b);
        this.sort(a);
        return false;
    },
    sort: function(g, k, n) {
        if (!this.head) {
            return;
        }
        n = !!(n);
        var m = this.options.classCellSort;
        var p = this.options.classGroup,
        u = this.options.classGroupHead;
        if (!n) {
            if (g != null) {
                if (this.sorted.index == g) {
                    this.sorted.reverse = !(this.sorted.reverse);
                } else {
                    if (this.sorted.index != null) {
                        this.sorted.reverse = false;
                        this.head.cells[this.sorted.index].removeClass(this.options.classHeadSort).removeClass(this.options.classHeadSortRev);
                    } else {
                        this.sorted.reverse = true;
                    }
                    this.sorted.index = g;
                }
            } else {
                g = this.sorted.index;
            }
            if (k != null) {
                this.sorted.reverse = k;
            }
            var d = document.id(this.head.cells[g]);
            if (d) {
                d.addClass(this.options.classHeadSort);
                if (this.sorted.reverse) {
                    d.addClass(this.options.classHeadSortRev);
                } else {
                    d.removeClass(this.options.classHeadSortRev);
                }
            }
            this.body.getElements("td").removeClass(this.options.classCellSort);
        }
        var c = this.parsers[g];
        if ($type(c) == "string") {
            c = HtmlTable.Parsers.get(c);
        }
        if (!c) {
            return;
        }
        if (!Browser.Engine.trident) {
            var b = this.body.getParent();
            this.body.dispose();
        }
        var t = Array.map(this.body.rows, 
        function(w, j) {
            var v = c.convert.call(document.id(w.cells[g]));
            return {
                position: j,
                value: v,
                toString: function() {
                    return v.toString();
                }
            };
        },
        this);
        t.reverse(true);
        t.sort(function(j, i) {
            if (j.value === i.value) {
                return 0;
            }
            return j.value > i.value ? 1: -1;
        });
        if (!this.sorted.reverse) {
            t.reverse(true);
        }
        var q = t.length,
        l = this.body;
        var o,
        s,
        a,
        h;
        while (q) {
            var r = t[--q];
            s = r.position;
            var f = l.rows[s];
            if (f.disabled) {
                continue;
            }
            if (!n) {
                if (h === r.value) {
                    f.removeClass(u).addClass(p);
                } else {
                    h = r.value;
                    f.removeClass(p).addClass(u);
                }
                if (this.options.zebra) {
                    this.zebra(f, q);
                }
                f.cells[g].addClass(m);
            }
            l.appendChild(f);
            for (o = 0; o < q; o++) {
                if (t[o].position > s) {
                    t[o].position--;
                }
            }
        }
        t = null;
        if (b) {
            b.grab(l);
        }
        return this.fireEvent("sort", [l, g]);
    },
    reSort: function() {
        if (this.sortEnabled) {
            this.sort.call(this, this.sorted.index, this.sorted.reverse);
        }
        return this;
    },
    enableSort: function() {
        this.element.addClass(this.options.classSortable);
        this.attachSorts(true);
        this.detectParsers();
        this.sortEnabled = true;
        return this;
    },
    disableSort: function() {
        this.element.removeClass(this.options.classSortable);
        this.attachSorts(false);
        this.sortSpans.each(function(a) {
            a.destroy();
        });
        this.sortSpans.empty();
        this.sortEnabled = false;
        return this;
    }
});
HtmlTable.Parsers = new Hash({
    date: {
        match: /^\d{2}[-\/ ]\d{2}[-\/ ]\d{2,4}$/,
        convert: function() {
            var a = Date.parse(this.get("text").stripTags());
            return $type(a) == "date" ? a.format("db") : "";
        },
        type: "date"
    },
    "input-checked": {
        match: / type="(radio|checkbox)" /,
        convert: function() {
            return this.getElement("input").checked;
        }
    },
    "input-value": {
        match: /<input/,
        convert: function() {
            return this.getElement("input").value;
        }
    },
    number: {
        match: /^\d+[^\d.,]*$/,
        convert: function() {
            return this.get("text").stripTags().toInt();
        },
        number: true
    },
    numberLax: {
        match: /^[^\d]+\d+$/,
        convert: function() {
            return this.get("text").replace(/[^-?^0-9]/, "").stripTags().toInt();
        },
        number: true
    },
    "float": {
        match: /^[\d]+\.[\d]+/,
        convert: function() {
            return this.get("text").replace(/[^-?^\d.]/, "").stripTags().toFloat();
        },
        number: true
    },
    floatLax: {
        match: /^[^\d]+[\d]+\.[\d]+$/,
        convert: function() {
            return this.get("text").replace(/[^-?^\d.]/, "").stripTags();
        },
        number: true
    },
    string: {
        match: null,
        convert: function() {
            return this.get("text").stripTags();
        }
    },
    title: {
        match: null,
        convert: function() {
            return this.title;
        }
    }
});
HtmlTable.defineParsers = function(a) {
    HtmlTable.Parsers = new Hash(a).combine(HtmlTable.Parsers);
};
HtmlTable = Class.refactor(HtmlTable, {
    options: {
        useKeyboard: true,
        classRowSelected: "table-tr-selected",
        classRowHovered: "table-tr-hovered",
        classSelectable: "table-selectable",
        shiftForMultiSelect: true,
        allowMultiSelect: true,
        selectable: false
    },
    initialize: function() {
        this.previous.apply(this, arguments);
        if (this.occluded) {
            return this.occluded;
        }
        this._selectedRows = new Elements();
        this._bound = {
            mouseleave: this._mouseleave.bind(this),
            clickRow: this._clickRow.bind(this)
        };
        if (this.options.selectable) {
            this.enableSelect();
        }
    },
    enableSelect: function() {
        this._selectEnabled = true;
        this._attachSelects();
        this.element.addClass(this.options.classSelectable);
    },
    disableSelect: function() {
        this._selectEnabled = false;
        this._attachSelects(false);
        this.element.removeClass(this.options.classSelectable);
    },
    push: function() {
        var a = this.previous.apply(this, arguments);
        this._updateSelects();
        return a;
    },
    toggleRow: function(a) {
        return this.isSelected(a) ? this.deselectRow.apply(this, arguments) : this.selectRow.apply(this, arguments);
    },
    selectRow: function(b, a) {
        if (this.isSelected(b) || (!a && !this.body.getChildren().contains(b))) {
            return;
        }
        if (!this.options.allowMultiSelect) {
            this.selectNone();
        }
        if (!this.isSelected(b)) {
            this._selectedRows.push(b);
            b.addClass(this.options.classRowSelected);
            this.fireEvent("rowFocus", [b, this._selectedRows]);
        }
        this._focused = b;
        document.clearSelection();
        return this;
    },
    isSelected: function(a) {
        return this._selectedRows.contains(a);
    },
    deselectRow: function(b, a) {
        if (!this.isSelected(b) || (!a && !this.body.getChildren().contains(b))) {
            return;
        }
        this._selectedRows.erase(b);
        b.removeClass(this.options.classRowSelected);
        this.fireEvent("rowUnfocus", [b, this._selectedRows]);
        return this;
    },
    selectAll: function(a) {
        if (!a && !this.options.allowMultiSelect) {
            return;
        }
        this.selectRange(0, this.body.rows.length, a);
        return this;
    },
    selectNone: function() {
        return this.selectAll(true);
    },
    selectRange: function(b, a, g) {
        if (!this.options.allowMultiSelect && !g) {
            return;
        }
        var h = g ? "deselectRow": "selectRow",
        f = $A(this.body.rows);
        if ($type(b) == "element") {
            b = f.indexOf(b);
        }
        if ($type(a) == "element") {
            a = f.indexOf(a);
        }
        a = a < f.length - 1 ? a: f.length - 1;
        if (a < b) {
            var d = b;
            b = a;
            a = d;
        }
        for (var c = b; c <= a; c++) {
            this[h](f[c], true);
        }
        return this;
    },
    deselectRange: function(b, a) {
        this.selectRange(b, a, true);
    },
    _enterRow: function(a) {
        if (this._hovered) {
            this._hovered = this._leaveRow(this._hovered);
        }
        this._hovered = a.addClass(this.options.classRowHovered);
    },
    _leaveRow: function(a) {
        a.removeClass(this.options.classRowHovered);
    },
    _updateSelects: function() {
        Array.each(this.body.rows, 
        function(a) {
            var b = a.retrieve("binders");
            if ((b && this._selectEnabled) || (!b && !this._selectEnabled)) {
                return;
            }
            if (!b) {
                b = {
                    mouseenter: this._enterRow.bind(this, [a]),
                    mouseleave: this._leaveRow.bind(this, [a])
                };
                a.store("binders", b).addEvents(b);
            } else {
                a.removeEvents(b);
            }
        },
        this);
    },
    _shiftFocus: function(b, a) {
        if (!this._focused) {
            return this.selectRow(this.body.rows[0], a);
        }
        var c = this._getRowByOffset(b);
        if (c === null || this._focused == this.body.rows[c]) {
            return this;
        }
        this.toggleRow(this.body.rows[c], a);
    },
    _clickRow: function(a, b) {
        var c = (a.shift || a.meta || a.control) && this.options.shiftForMultiSelect;
        if (!c && !(a.rightClick && this.isSelected(b) && this.options.allowMultiSelect)) {
            this.selectNone();
        }
        if (a.rightClick) {
            this.selectRow(b);
        } else {
            this.toggleRow(b);
        }
        if (a.shift) {
            this.selectRange(this._rangeStart || this.body.rows[0], b, this._rangeStart ? !this.isSelected(b) : true);
            this._focused = b;
        }
        this._rangeStart = b;
    },
    _getRowByOffset: function(b) {
        if (!this._focused) {
            return 0;
        }
        var a = Array.indexOf(this.body.rows, this._focused) + b;
        if (a < 0) {
            a = null;
        }
        if (a >= this.body.rows.length) {
            a = null;
        }
        return a;
    },
    _attachSelects: function(d) {
        d = $pick(d, true);
        var h = d ? "addEvents": "removeEvents";
        this.element[h]({
            mouseleave: this._bound.mouseleave
        });
        this.body[h]({
            "click:relay(tr)": this._bound.clickRow,
            "contextmenu:relay(tr)": this._bound.clickRow
        });
        if (this.options.useKeyboard || this.keyboard) {
            if (!this.keyboard) {
                var g,
                f;
                var c = function(j) {
                    var i = function(k) {
                        $clear(g);
                        k.preventDefault();
                        var l = this.body.rows[this._getRowByOffset(j)];
                        if (k.shift && l && this.isSelected(l)) {
                            this.deselectRow(this._focused);
                            this._focused = l;
                        } else {
                            if (l && (!this.options.allowMultiSelect || !k.shift)) {
                                this.selectNone();
                            }
                            this._shiftFocus(j, k);
                        }
                        if (f) {
                            g = i.delay(100, this, k);
                        } else {
                            g = (function() {
                                f = true;
                                i(k);
                            }).delay(400);
                        }
                    }.bind(this);
                    return i;
                }.bind(this);
                var b = function() {
                    $clear(g);
                    f = false;
                };
                this.keyboard = new Keyboard({
                    events: {
                        "keydown:shift+up": c( - 1),
                        "keydown:shift+down": c(1),
                        "keyup:shift+up": b,
                        "keyup:shift+down": b,
                        "keyup:up": b,
                        "keyup:down": b
                    },
                    active: true
                });
                var a = "";
                if (this.options.allowMultiSelect && this.options.shiftForMultiSelect && this.options.useKeyboard) {
                    a = " (Shift multi-selects).";
                }
                this.keyboard.addShortcuts({
                    "Select Previous Row": {
                        keys: "up",
                        shortcut: "up arrow",
                        handler: c( - 1),
                        description: "Select the previous row in the table." + a
                    },
                    "Select Next Row": {
                        keys: "down",
                        shortcut: "down arrow",
                        handler: c(1),
                        description: "Select the next row in the table." + a
                    }
                });
            }
            this.keyboard[d ? "activate": "deactivate"]();
        }
        this._updateSelects();
    },
    _mouseleave: function() {
        if (this._hovered) {
            this._leaveRow(this._hovered);
        }
    }
}); (function() {
    var a = this.Keyboard = new Class({
        Extends: Events,
        Implements: [Options, Log],
        options: {
            defaultEventType: "keydown",
            active: false,
            manager: null,
            events: {},
            nonParsedEvents: ["activate", "deactivate", "onactivate", "ondeactivate", "changed", "onchanged"]
        },
        initialize: function(g) {
            if (g && g.manager) {
                this.manager = g.manager;
                delete g.manager;
            }
            this.setOptions(g);
            this.setup();
        },
        setup: function() {
            this.addEvents(this.options.events);
            if (a.manager && !this.manager) {
                a.manager.manage(this);
            }
            if (this.options.active) {
                this.activate();
            }
        },
        handle: function(i, h) {
            if (i.preventKeyboardPropagation) {
                return;
            }
            var g = !!this.manager;
            if (g && this.activeKB) {
                this.activeKB.handle(i, h);
                if (i.preventKeyboardPropagation) {
                    return;
                }
            }
            this.fireEvent(h, i);
            if (!g && this.activeKB) {
                this.activeKB.handle(i, h);
            }
        },
        addEvent: function(i, h, g) {
            return this.parent(a.parse(i, this.options.defaultEventType, this.options.nonParsedEvents), h, g);
        },
        removeEvent: function(h, g) {
            return this.parent(a.parse(h, this.options.defaultEventType, this.options.nonParsedEvents), g);
        },
        toggleActive: function() {
            return this[this.active ? "deactivate": "activate"]();
        },
        activate: function(g) {
            if (g) {
                if (g.isActive()) {
                    return this;
                }
                if (this.activeKB && g != this.activeKB) {
                    this.previous = this.activeKB;
                    this.previous.fireEvent("deactivate");
                }
                this.activeKB = g.fireEvent("activate");
                a.manager.fireEvent("changed");
            } else {
                if (this.manager) {
                    this.manager.activate(this);
                }
            }
            return this;
        },
        isActive: function() {
            return this.manager ? this.manager.activeKB == this: a.manager == this;
        },
        deactivate: function(g) {
            if (g) {
                if (g === this.activeKB) {
                    this.activeKB = null;
                    g.fireEvent("deactivate");
                    a.manager.fireEvent("changed");
                }
            } else {
                if (this.manager) {
                    this.manager.deactivate(this);
                }
            }
            return this;
        },
        relinquish: function() {
            if (this.isActive() && this.manager && this.manager.previous) {
                this.manager.activate(this.manager.previous);
            }
        },
        manage: function(g) {
            if (g.manager && g.manager != a.manager && this != a.manager) {
                g.manager.drop(g);
            }
            this.instances.push(g);
            g.manager = this;
            if (!this.activeKB) {
                this.activate(g);
            }
        },
        _disable: function(g) {
            if (this.activeKB == g) {
                this.activeKB = null;
            }
        },
        drop: function(g) {
            this._disable(g);
            this.instances.erase(g);
            a.manager.manage(g);
            if (this.activeKB == g && this.previous && this.instances.contains(this.previous)) {
                this.activate(this.previous);
            }
        },
        instances: [],
        trace: function() {
            a.trace(this);
        },
        each: function(g) {
            a.each(this, g);
        }
    });
    var b = {};
    var c = ["shift", "control", "alt", "meta"];
    var f = /^(?:shift|control|ctrl|alt|meta)$/;
    a.parse = function(i, h, l) {
        if (l && l.contains(i.toLowerCase())) {
            return i;
        }
        i = i.toLowerCase().replace(/^(keyup|keydown):/, 
        function(n, m) {
            h = m;
            return "";
        });
        if (!b[i]) {
            var g,
            k = {};
            i.split("+").each(function(m) {
                if (f.test(m)) {
                    k[m] = true;
                } else {
                    g = m;
                }
            });
            k.control = k.control || k.ctrl;
            var j = [];
            c.each(function(m) {
                if (k[m]) {
                    j.push(m);
                }
            });
            if (g) {
                j.push(g);
            }
            b[i] = j.join("+");
        }
        return h + ":" + b[i];
    };
    a.each = function(g, h) {
        var i = g || a.manager;
        while (i) {
            h.run(i);
            i = i.activeKB;
        }
    };
    a.stop = function(g) {
        g.preventKeyboardPropagation = true;
    };
    a.manager = new a({
        active: true
    });
    a.trace = function(g) {
        g = g || a.manager;
        g.enableLog();
        g.log("the following items have focus: ");
        a.each(g, 
        function(h) {
            g.log(document.id(h.widget) || h.wiget || h);
        });
    };
    var d = function(h) {
        var g = [];
        c.each(function(i) {
            if (h[i]) {
                g.push(i);
            }
        });
        if (!f.test(h.key)) {
            g.push(h.key);
        }
        a.manager.handle(h, h.type + ":" + g.join("+"));
    };
    document.addEvents({
        keyup: d,
        keydown: d
    });
    Event.Keys.extend({
        shift: 16,
        control: 17,
        alt: 18,
        capslock: 20,
        pageup: 33,
        pagedown: 34,
        end: 35,
        home: 36,
        numlock: 144,
        scrolllock: 145,
        ";": 186,
        "=": 187,
        ",": 188,
        "-": Browser.Engine.gecko ? 109: 189,
        ".": 190,
        "/": 191,
        "`": 192,
        "[": 219,
        "\\": 220,
        "]": 221,
        "'": 222
    });
})();
Keyboard.prototype.options.nonParsedEvents.combine(["rebound", "onrebound"]);
Keyboard.implement({
    addShortcut: function(b, a) {
        this.shortcuts = this.shortcuts || [];
        this.shortcutIndex = this.shortcutIndex || {};
        a.getKeyboard = $lambda(this);
        a.name = b;
        this.shortcutIndex[b] = a;
        this.shortcuts.push(a);
        if (a.keys) {
            this.addEvent(a.keys, a.handler);
        }
        return this;
    },
    addShortcuts: function(b) {
        for (var a in b) {
            this.addShortcut(a, b[a]);
        }
        return this;
    },
    removeShortcut: function(b) {
        var a = this.getShortcut(b);
        if (a && a.keys) {
            this.removeEvent(a.keys, a.handler);
            delete this.shortcutIndex[b];
            this.shortcuts.erase(a);
        }
        return this;
    },
    removeShortcuts: function(a) {
        a.each(this.removeShortcut, this);
        return this;
    },
    getShortcuts: function() {
        return this.shortcuts || [];
    },
    getShortcut: function(a) {
        return (this.shortcutIndex || {})[a];
    }
});
Keyboard.rebind = function(b, a) {
    $splat(a).each(function(c) {
        c.getKeyboard().removeEvent(c.keys, c.handler);
        c.getKeyboard().addEvent(b, c.handler);
        c.keys = b;
        c.getKeyboard().fireEvent("rebound");
    });
};
Keyboard.getActiveShortcuts = function(b) {
    var a = [],
    c = [];
    Keyboard.each(b, [].push.bind(a));
    a.each(function(d) {
        c.extend(d.getShortcuts());
    });
    return c;
};
Keyboard.getShortcut = function(c, b, d) {
    d = d || {};
    var a = d.many ? [] : null,
    f = d.many ? 
    function(h) {
        var g = h.getShortcut(c);
        if (g) {
            a.push(g);
        }
    }: function(g) {
        if (!a) {
            a = g.getShortcut(c);
        }
    };
    Keyboard.each(b, f);
    return a;
};
Keyboard.getShortcuts = function(b, a) {
    return Keyboard.getShortcut(b, a, {
        many: true
    });
};
var Mask = new Class({
    Implements: [Options, Events],
    Binds: ["position"],
    options: {
        style: {},
        "class": "mask",
        maskMargins: false,
        useIframeShim: true,
        iframeShimOptions: {}
    },
    initialize: function(b, a) {
        this.target = document.id(b) || document.id(document.body);
        this.target.store("Mask", this);
        this.setOptions(a);
        this.render();
        this.inject();
    },
    render: function() {
        this.element = new Element("div", {
            "class": this.options["class"],
            id: this.options.id || "mask-" + $time(),
            styles: $merge(this.options.style, {
                display: "none"
            }),
            events: {
                click: function() {
                    this.fireEvent("click");
                    if (this.options.hideOnClick) {
                        this.hide();
                    }
                }.bind(this)
            }
        });
        this.hidden = true;
    },
    toElement: function() {
        return this.element;
    },
    inject: function(b, a) {
        a = a || this.options.inject ? this.options.inject.where: "" || this.target == document.body ? "inside": "after";
        b = b || this.options.inject ? this.options.inject.target: "" || this.target;
        this.element.inject(b, a);
        if (this.options.useIframeShim) {
            this.shim = new IframeShim(this.element, this.options.iframeShimOptions);
            this.addEvents({
                show: this.shim.show.bind(this.shim),
                hide: this.shim.hide.bind(this.shim),
                destroy: this.shim.destroy.bind(this.shim)
            });
        }
    },
    position: function() {
        this.resize(this.options.width, this.options.height);
        this.element.position({
            relativeTo: this.target,
            position: "topLeft",
            ignoreMargins: !this.options.maskMargins,
            ignoreScroll: this.target == document.body
        });
        return this;
    },
    resize: function(a, f) {
        var b = {
            styles: ["padding", "border"]
        };
        if (this.options.maskMargins) {
            b.styles.push("margin");
        }
        var d = this.target.getComputedSize(b);
        if (this.target == document.body) {
            var c = window.getScrollSize();
            if (d.totalHeight < c.y) {
                d.totalHeight = c.y;
            }
            if (d.totalWidth < c.x) {
                d.totalWidth = c.x;
            }
        }
        this.element.setStyles({
            width: $pick(a, d.totalWidth, d.x),
            height: $pick(f, d.totalHeight, d.y)
        });
        return this;
    },
    show: function() {
        if (!this.hidden) {
            return this;
        }
        window.addEvent("resize", this.position);
        this.position();
        this.showMask.apply(this, arguments);
        return this;
    },
    showMask: function() {
        this.element.setStyle("display", "block");
        this.hidden = false;
        this.fireEvent("show");
    },
    hide: function() {
        if (this.hidden) {
            return this;
        }
        window.removeEvent("resize", this.position);
        this.hideMask.apply(this, arguments);
        if (this.options.destroyOnHide) {
            return this.destroy();
        }
        return this;
    },
    hideMask: function() {
        this.element.setStyle("display", "none");
        this.hidden = true;
        this.fireEvent("hide");
    },
    toggle: function() {
        this[this.hidden ? "show": "hide"]();
    },
    destroy: function() {
        this.hide();
        this.element.destroy();
        this.fireEvent("destroy");
        this.target.eliminate("mask");
    }
});
Element.Properties.mask = {
    set: function(b) {
        var a = this.retrieve("mask");
        return this.eliminate("mask").store("mask:options", b);
    },
    get: function(a) {
        if (a || !this.retrieve("mask")) {
            if (this.retrieve("mask")) {
                this.retrieve("mask").destroy();
            }
            if (a || !this.retrieve("mask:options")) {
                this.set("mask", a);
            }
            this.store("mask", new Mask(this, this.retrieve("mask:options")));
        }
        return this.retrieve("mask");
    }
};
Element.implement({
    mask: function(a) {
        this.get("mask", a).show();
        return this;
    },
    unmask: function() {
        this.get("mask").hide();
        return this;
    }
});
var Scroller = new Class({
    Implements: [Events, Options],
    options: {
        area: 20,
        velocity: 1,
        onChange: function(a, b) {
            this.element.scrollTo(a, b);
        },
        fps: 50
    },
    initialize: function(b, a) {
        this.setOptions(a);
        this.element = document.id(b);
        this.docBody = document.id(this.element.getDocument().body);
        this.listener = ($type(this.element) != "element") ? this.docBody: this.element;
        this.timer = null;
        this.bound = {
            attach: this.attach.bind(this),
            detach: this.detach.bind(this),
            getCoords: this.getCoords.bind(this)
        };
    },
    start: function() {
        this.listener.addEvents({
            mouseenter: this.bound.attach,
            mouseleave: this.bound.detach
        });
    },
    stop: function() {
        this.listener.removeEvents({
            mouseenter: this.bound.attach,
            mouseleave: this.bound.detach
        });
        this.detach();
        this.timer = $clear(this.timer);
    },
    attach: function() {
        this.listener.addEvent("mousemove", this.bound.getCoords);
    },
    detach: function() {
        this.listener.removeEvent("mousemove", this.bound.getCoords);
        this.timer = $clear(this.timer);
    },
    getCoords: function(a) {
        this.page = (this.listener.get("tag") == "body") ? a.client: a.page;
        if (!this.timer) {
            this.timer = this.scroll.periodical(Math.round(1000 / this.options.fps), this);
        }
    },
    scroll: function() {
        var c = this.element.getSize(),
        a = this.element.getScroll(),
        i = this.element != this.docBody ? this.element.getOffsets() : {
            x: 0,
            y: 0
        },
        d = this.element.getScrollSize(),
        h = {
            x: 0,
            y: 0
        },
        f = this.options.area.top || this.options.area,
        b = this.options.area.bottom || this.options.area;
        for (var g in this.page) {
            if (this.page[g] < (f + i[g]) && a[g] != 0) {
                h[g] = (this.page[g] - f - i[g]) * this.options.velocity;
            } else {
                if (this.page[g] + b > (c[g] + i[g]) && a[g] + c[g] != d[g]) {
                    h[g] = (this.page[g] - c[g] + b - i[g]) * this.options.velocity;
                }
            }
            h[g] = h[g].round();
        }
        if (h.y || h.x) {
            this.fireEvent("change", [a.x + h.x, a.y + h.y]);
        }
    }
}); (function() {
    var a = function(c, b) {
        return (c) ? ($type(c) == "function" ? c(b) : b.get(c)) : "";
    };
    this.Tips = new Class({
        Implements: [Events, Options],
        options: {
            onShow: function() {
                this.tip.setStyle("display", "block");
            },
            onHide: function() {
                this.tip.setStyle("display", "none");
            },
            title: "title",
            text: function(b) {
                return b.get("rel") || b.get("href");
            },
            showDelay: 100,
            hideDelay: 100,
            className: "tip-wrap",
            offset: {
                x: 16,
                y: 16
            },
            windowPadding: {
                x: 0,
                y: 0
            },
            fixed: false
        },
        initialize: function() {
            var b = Array.link(arguments, {
                options: Object.type,
                elements: $defined
            });
            this.setOptions(b.options);
            if (b.elements) {
                this.attach(b.elements);
            }
            this.container = new Element("div", {
                "class": "tip"
            });
        },
        toElement: function() {
            if (this.tip) {
                return this.tip;
            }
            return this.tip = new Element("div", {
                "class": this.options.className,
                styles: {
                    position: "absolute",
                    top: 0,
                    left: 0
                }
            }).adopt(new Element("div", {
                "class": "tip-top"
            }), this.container, new Element("div", {
                "class": "tip-bottom"
            }));
        },
        attach: function(b) {
            $$(b).each(function(d) {
                var g = a(this.options.title, d),
                f = a(this.options.text, d);
                d.erase("title").store("tip:native", g).retrieve("tip:title", g);
                d.retrieve("tip:text", f);
                this.fireEvent("attach", [d]);
                var c = ["enter", "leave"];
                if (!this.options.fixed) {
                    c.push("move");
                }
                c.each(function(i) {
                    var h = d.retrieve("tip:" + i);
                    if (!h) {
                        h = this["element" + i.capitalize()].bindWithEvent(this, d);
                    }
                    d.store("tip:" + i, h).addEvent("mouse" + i, h);
                },
                this);
            },
            this);
            return this;
        },
        detach: function(b) {
            $$(b).each(function(d) { ["enter", "leave", "move"].each(function(f) {
                    d.removeEvent("mouse" + f, d.retrieve("tip:" + f)).eliminate("tip:" + f);
                });
                this.fireEvent("detach", [d]);
                if (this.options.title == "title") {
                    var c = d.retrieve("tip:native");
                    if (c) {
                        d.set("title", c);
                    }
                }
            },
            this);
            return this;
        },
        elementEnter: function(c, b) {
            this.container.empty(); ["title", "text"].each(function(f) {
                var d = b.retrieve("tip:" + f);
                if (d) {
                    this.fill(new Element("div", {
                        "class": "tip-" + f
                    }).inject(this.container), d);
                }
            },
            this);
            $clear(this.timer);
            this.timer = (function() {
                this.show(b);
                this.position((this.options.fixed) ? {
                    page: b.getPosition()
                }: c);
            }).delay(this.options.showDelay, this);
        },
        elementLeave: function(c, b) {
            $clear(this.timer);
            this.timer = this.hide.delay(this.options.hideDelay, this, b);
            this.fireForParent(c, b);
        },
        fireForParent: function(c, b) {
            b = b.getParent();
            if (!b || b == document.body) {
                return;
            }
            if (b.retrieve("tip:enter")) {
                b.fireEvent("mouseenter", c);
            } else {
                this.fireForParent(c, b);
            }
        },
        elementMove: function(c, b) {
            this.position(c);
        },
        position: function(f) {
            if (!this.tip) {
                document.id(this);
            }
            var c = window.getSize(),
            b = window.getScroll(),
            g = {
                x: this.tip.offsetWidth,
                y: this.tip.offsetHeight
            },
            d = {
                x: "left",
                y: "top"
            },
            h = {};
            for (var i in d) {
                h[d[i]] = f.page[i] + this.options.offset[i];
                if ((h[d[i]] + g[i] - b[i]) > c[i] - this.options.windowPadding[i]) {
                    h[d[i]] = f.page[i] - this.options.offset[i] - g[i];
                }
            }
            this.tip.setStyles(h);
        },
        fill: function(b, c) {
            if (typeof c == "string") {
                b.set("html", c);
            } else {
                b.adopt(c);
            }
        },
        show: function(b) {
            if (!this.tip) {
                document.id(this);
            }
            if (!this.tip.getParent()) {
                this.tip.inject(document.body);
            }
            this.fireEvent("show", [this.tip, b]);
        },
        hide: function(b) {
            if (!this.tip) {
                document.id(this);
            }
            this.fireEvent("hide", [this.tip, b]);
        }
    });
})();
var Spinner = new Class({
    Extends: Mask,
    options: {
        "class": "spinner",
        containerPosition: {},
        content: {
            "class": "spinner-content"
        },
        messageContainer: {
            "class": "spinner-msg"
        },
        img: {
            "class": "spinner-img"
        },
        fxOptions: {
            link: "chain"
        }
    },
    initialize: function() {
        this.parent.apply(this, arguments);
        this.target.store("spinner", this);
        var a = function() {
            this.active = false;
        }.bind(this);
        this.addEvents({
            hide: a,
            show: a
        });
    },
    render: function() {
        this.parent();
        this.element.set("id", this.options.id || "spinner-" + $time());
        this.content = document.id(this.options.content) || new Element("div", this.options.content);
        this.content.inject(this.element);
        if (this.options.message) {
            this.msg = document.id(this.options.message) || new Element("p", this.options.messageContainer).appendText(this.options.message);
            this.msg.inject(this.content);
        }
        if (this.options.img) {
            this.img = document.id(this.options.img) || new Element("div", this.options.img);
            this.img.inject(this.content);
        }
        this.element.set("tween", this.options.fxOptions);
    },
    show: function(a) {
        if (this.active) {
            return this.chain(this.show.bind(this));
        }
        if (!this.hidden) {
            this.callChain.delay(20, this);
            return this;
        }
        this.active = true;
        return this.parent(a);
    },
    showMask: function(a) {
        var b = function() {
            this.content.position($merge({
                relativeTo: this.element
            },
            this.options.containerPosition));
        }.bind(this);
        if (a) {
            this.parent();
            b();
        } else {
            this.element.setStyles({
                display: "block",
                opacity: 0
            }).tween("opacity", this.options.style.opacity || 0.9);
            b();
            this.hidden = false;
            this.fireEvent("show");
            this.callChain();
        }
    },
    hide: function(a) {
        if (this.active) {
            return this.chain(this.hide.bind(this));
        }
        if (this.hidden) {
            this.callChain.delay(20, this);
            return this;
        }
        this.active = true;
        return this.parent(a);
    },
    hideMask: function(a) {
        if (a) {
            return this.parent();
        }
        this.element.tween("opacity", 0).get("tween").chain(function() {
            this.element.setStyle("display", "none");
            this.hidden = true;
            this.fireEvent("hide");
            this.callChain();
        }.bind(this));
    },
    destroy: function() {
        this.content.destroy();
        this.parent();
        this.target.eliminate("spinner");
    }
});
Spinner.implement(new Chain);
Request = Class.refactor(Request, {
    options: {
        useSpinner: false,
        spinnerOptions: {},
        spinnerTarget: false
    },
    initialize: function(a) {
        this._send = this.send;
        this.send = function(b) {
            var c = this.getSpinner();
            if (c) {
                c.chain(this._send.bind(this, b)).show();
            } else {
                this._send(b);
            }
            return this;
        };
        this.previous(a);
    },
    getSpinner: function() {
        if (!this.spinner) {
            var a = document.id(this.options.spinnerTarget) || document.id(this.options.update);
            if (this.options.useSpinner && a) {
                this.spinner = a.get("spinner", this.options.spinnerOptions); ["onComplete", "onException", "onCancel"].each(function(b) {
                    this.addEvent(b, this.spinner.hide.bind(this.spinner));
                },
                this);
            }
        }
        return this.spinner;
    }
});
Element.Properties.spinner = {
    set: function(a) {
        var b = this.retrieve("spinner");
        return this.eliminate("spinner").store("spinner:options", a);
    },
    get: function(a) {
        if (a || !this.retrieve("spinner")) {
            if (this.retrieve("spinner")) {
                this.retrieve("spinner").destroy();
            }
            if (a || !this.retrieve("spinner:options")) {
                this.set("spinner", a);
            }
            new Spinner(this, this.retrieve("spinner:options"));
        }
        return this.retrieve("spinner");
    }
};
Element.implement({
    spin: function(a) {
        this.get("spinner", a).show();
        return this;
    },
    unspin: function() {
        var a = Array.link(arguments, {
            options: Object.type,
            callback: Function.type
        });
        this.get("spinner", a.options).hide(a.callback);
        return this;
    }
});
MooTools.lang.set("en-US", "Date", {
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    dateOrder: ["month", "date", "year"],
    shortDate: "%m/%d/%Y",
    shortTime: "%I:%M%p",
    AM: "AM",
    PM: "PM",
    ordinal: function(a) {
        return (a > 3 && a < 21) ? "th": ["th", "st", "nd", "rd", "th"][Math.min(a % 10, 4)];
    },
    lessThanMinuteAgo: "less than a minute ago",
    minuteAgo: "about a minute ago",
    minutesAgo: "{delta} minutes ago",
    hourAgo: "about an hour ago",
    hoursAgo: "about {delta} hours ago",
    dayAgo: "1 day ago",
    daysAgo: "{delta} days ago",
    weekAgo: "1 week ago",
    weeksAgo: "{delta} weeks ago",
    monthAgo: "1 month ago",
    monthsAgo: "{delta} months ago",
    yearAgo: "1 year ago",
    yearsAgo: "{delta} years ago",
    lessThanMinuteUntil: "less than a minute from now",
    minuteUntil: "about a minute from now",
    minutesUntil: "{delta} minutes from now",
    hourUntil: "about an hour from now",
    hoursUntil: "about {delta} hours from now",
    dayUntil: "1 day from now",
    daysUntil: "{delta} days from now",
    weekUntil: "1 week from now",
    weeksUntil: "{delta} weeks from now",
    monthUntil: "1 month from now",
    monthsUntil: "{delta} months from now",
    yearUntil: "1 year from now",
    yearsUntil: "{delta} years from now"
});
MooTools.lang.set("en-US", "Form.Validator", {
    required: "This field is required.",
    minLength: "Please enter at least {minLength} characters (you entered {length} characters).",
    maxLength: "Please enter no more than {maxLength} characters (you entered {length} characters).",
    integer: "Please enter an integer in this field. Numbers with decimals (e.g. 1.25) are not permitted.",
    numeric: 'Please enter only numeric values in this field (i.e. "1" or "1.1" or "-1" or "-1.1").',
    digits: "Please use numbers and punctuation only in this field (for example, a phone number with dashes or dots is permitted).",
    alpha: "Please use only letters (a-z) within this field. No spaces or other characters are allowed.",
    alphanum: "Please use only letters (a-z) or numbers (0-9) in this field. No spaces or other characters are allowed.",
    dateSuchAs: "Please enter a valid date such as {date}",
    dateInFormatMDY: 'Please enter a valid date such as MM/DD/YYYY (i.e. "12/31/1999")',
    email: 'Please enter a valid email address. For example "fred@domain.com".',
    url: "Please enter a valid URL such as http://www.google.com.",
    currencyDollar: "Please enter a valid $ amount. For example $100.00 .",
    oneRequired: "Please enter something for at least one of these inputs.",
    errorPrefix: "Error: ",
    warningPrefix: "Warning: ",
    noSpace: "There can be no spaces in this input.",
    reqChkByNode: "No items are selected.",
    requiredChk: "This field is required.",
    reqChkByName: "Please select a {label}.",
    match: "This field needs to match the {matchName} field",
    startDate: "the start date",
    endDate: "the end date",
    currendDate: "the current date",
    afterDate: "The date should be the same or after {label}.",
    beforeDate: "The date should be the same or before {label}.",
    startMonth: "Please select a start month",
    sameMonth: "These two dates must be in the same month - you must change one or the other.",
    creditcard: "The credit card number entered is invalid. Please check the number and try again. {length} digits entered."
});
MooTools.lang.set("ca-CA", "Date", {
    months: ["Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juli", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"],
    days: ["Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte"],
    dateOrder: ["date", "month", "year"],
    shortDate: "%d/%m/%Y",
    shortTime: "%H:%M",
    AM: "AM",
    PM: "PM",
    ordinal: "",
    lessThanMinuteAgo: "fa menys d`un minut",
    minuteAgo: "fa un minut",
    minutesAgo: "fa {delta} minuts",
    hourAgo: "fa un hora",
    hoursAgo: "fa unes {delta} hores",
    dayAgo: "fa un dia",
    daysAgo: "fa {delta} dies",
    lessThanMinuteUntil: "menys d`un minut des d`ara",
    minuteUntil: "un minut des d`ara",
    minutesUntil: "{delta} minuts des d`ara",
    hourUntil: "un hora des d`ara",
    hoursUntil: "unes {delta} hores des d`ara",
    dayUntil: "1 dia des d`ara",
    daysUntil: "{delta} dies des d`ara"
}); (function() {
    var a = function(f, d, c, b) {
        if (f == 1) {
            return d;
        } else {
            if (f == 2 || f == 3 || f == 4) {
                return c;
            } else {
                return b;
            }
        }
    };
    MooTools.lang.set("cs-CZ", "Date", {
        months: ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"],
        days: ["Neděle", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota"],
        dateOrder: ["date", "month", "year"],
        shortDate: "%d.%m.%Y",
        shortTime: "%H:%M",
        AM: "dop.",
        PM: "odp.",
        ordinal: ".",
        lessThanMinuteAgo: "před chvílí",
        minuteAgo: "přibližně před minutou",
        minutesAgo: function(b) {
            return "před {delta} " + a(b, "minutou", "minutami", "minutami");
        },
        hourAgo: "přibližně před hodinou",
        hoursAgo: function(b) {
            return "před {delta} " + a(b, "hodinou", "hodinami", "hodinami");
        },
        dayAgo: "před dnem",
        daysAgo: function(b) {
            return "před {delta} " + a(b, "dnem", "dny", "dny");
        },
        weekAgo: "před týdnem",
        weeksAgo: function(b) {
            return "před {delta} " + a(b, "týdnem", "týdny", "týdny");
        },
        monthAgo: "před měsícem",
        monthsAgo: function(b) {
            return "před {delta} " + a(b, "měsícem", "měsíci", "měsíci");
        },
        yearAgo: "před rokem",
        yearsAgo: function(b) {
            return "před {delta} " + a(b, "rokem", "lety", "lety");
        },
        lessThanMinuteUntil: "za chvíli",
        minuteUntil: "přibližně za minutu",
        minutesUntil: function(b) {
            return "za {delta} " + a(b, "minutu", "minuty", "minut");
        },
        hourUntil: "přibližně za hodinu",
        hoursUntil: function(b) {
            return "za {delta} " + a(b, "hodinu", "hodiny", "hodin");
        },
        dayUntil: "za den",
        daysUntil: function(b) {
            return "za {delta} " + a(b, "den", "dny", "dnů");
        },
        weekUntil: "za týden",
        weeksUntil: function(b) {
            return "za {delta} " + a(b, "týden", "týdny", "týdnů");
        },
        monthUntil: "za měsíc",
        monthsUntil: function(b) {
            return "za {delta} " + a(b, "měsíc", "měsíce", "měsíců");
        },
        yearUntil: "za rok",
        yearsUntil: function(b) {
            return "za {delta} " + a(b, "rok", "roky", "let");
        }
    });
})();
MooTools.lang.set("da-DK", "Date", {
    months: ["Januar", "Februa", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"],
    days: ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"],
    dateOrder: ["date", "month", "year"],
    shortDate: "%d-%m-%Y",
    shortTime: "%H:%M",
    AM: "AM",
    PM: "PM",
    ordinal: ".",
    lessThanMinuteAgo: "mindre end et minut siden",
    minuteAgo: "omkring et minut siden",
    minutesAgo: "{delta} minutter siden",
    hourAgo: "omkring en time siden",
    hoursAgo: "omkring {delta} timer siden",
    dayAgo: "1 dag siden",
    daysAgo: "{delta} dage siden",
    weekAgo: "1 uge siden",
    weeksAgo: "{delta} uger siden",
    monthAgo: "1 måned siden",
    monthsAgo: "{delta} måneder siden",
    yearAgo: "1 år siden",
    yearsAgo: "{delta} år siden",
    lessThanMinuteUntil: "mindre end et minut fra nu",
    minuteUntil: "omkring et minut fra nu",
    minutesUntil: "{delta} minutter fra nu",
    hourUntil: "omkring en time fra nu",
    hoursUntil: "omkring {delta} timer fra nu",
    dayUntil: "1 dag fra nu",
    daysUntil: "{delta} dage fra nu",
    weekUntil: "1 uge fra nu",
    weeksUntil: "{delta} uger fra nu",
    monthUntil: "1 måned fra nu",
    monthsUntil: "{delta} måneder fra nu",
    yearUntil: "1 år fra nu",
    yearsUntil: "{delta} år fra nu"
});
MooTools.lang.set("nl-NL", "Date", {
    months: ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"],
    days: ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"],
    dateOrder: ["date", "month", "year"],
    shortDate: "%d-%m-%Y",
    shortTime: "%H:%M",
    AM: "AM",
    PM: "PM",
    ordinal: "e",
    lessThanMinuteAgo: "minder dan een minuut geleden",
    minuteAgo: "ongeveer een minuut geleden",
    minutesAgo: "{delta} minuten geleden",
    hourAgo: "ongeveer een uur geleden",
    hoursAgo: "ongeveer {delta} uur geleden",
    dayAgo: "een dag geleden",
    daysAgo: "{delta} dagen geleden",
    weekAgo: "een week geleden",
    weeksAgo: "{delta} weken geleden",
    monthAgo: "een maand geleden",
    monthsAgo: "{delta} maanden geleden",
    yearAgo: "een jaar geleden",
    yearsAgo: "{delta} jaar geleden",
    lessThanMinuteUntil: "over minder dan een minuut",
    minuteUntil: "over ongeveer een minuut",
    minutesUntil: "over {delta} minuten",
    hourUntil: "over ongeveer een uur",
    hoursUntil: "over {delta} uur",
    dayUntil: "over ongeveer een dag",
    daysUntil: "over {delta} dagen",
    weekUntil: "over een week",
    weeksUntil: "over {delta} weken",
    monthUntil: "over een maand",
    monthsUntil: "over {delta} maanden",
    yearUntil: "over een jaar",
    yearsUntil: "over {delta} jaar"
});
MooTools.lang.set("en-GB", "Date", {
    dateOrder: ["date", "month", "year"],
    shortDate: "%d/%m/%Y",
    shortTime: "%H:%M"
}).set("cascade", ["en-US"]);
MooTools.lang.set("et-EE", "Date", {
    months: ["jaanuar", "veebruar", "märts", "aprill", "mai", "juuni", "juuli", "august", "september", "oktoober", "november", "detsember"],
    days: ["pühapäev", "esmaspäev", "teisipäev", "kolmapäev", "neljapäev", "reede", "laupäev"],
    dateOrder: ["month", "date", "year"],
    shortDate: "%m.%d.%Y",
    shortTime: "%H:%M",
    AM: "AM",
    PM: "PM",
    ordinal: "",
    lessThanMinuteAgo: "vähem kui minut aega tagasi",
    minuteAgo: "umbes minut aega tagasi",
    minutesAgo: "{delta} minutit tagasi",
    hourAgo: "umbes tund aega tagasi",
    hoursAgo: "umbes {delta} tundi tagasi",
    dayAgo: "1 päev tagasi",
    daysAgo: "{delta} päeva tagasi",
    weekAgo: "1 nädal tagasi",
    weeksAgo: "{delta} nädalat tagasi",
    monthAgo: "1 kuu tagasi",
    monthsAgo: "{delta} kuud tagasi",
    yearAgo: "1 aasta tagasi",
    yearsAgo: "{delta} aastat tagasi",
    lessThanMinuteUntil: "vähem kui minuti aja pärast",
    minuteUntil: "umbes minuti aja pärast",
    minutesUntil: "{delta} minuti pärast",
    hourUntil: "umbes tunni aja pärast",
    hoursUntil: "umbes {delta} tunni pärast",
    dayUntil: "1 päeva pärast",
    daysUntil: "{delta} päeva pärast",
    weekUntil: "1 nädala pärast",
    weeksUntil: "{delta} nädala pärast",
    monthUntil: "1 kuu pärast",
    monthsUntil: "{delta} kuu pärast",
    yearUntil: "1 aasta pärast",
    yearsUntil: "{delta} aasta pärast"
});
MooTools.lang.set("de-DE", "Date", {
    months: ["Januar", "Februar", "M&auml;rz", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
    days: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
    dateOrder: ["date", "month", "year"],
    shortDate: "%d.%m.%Y",
    shortTime: "%H:%M",
    AM: "vormittags",
    PM: "nachmittags",
    ordinal: ".",
    lessThanMinuteAgo: "Vor weniger als einer Minute",
    minuteAgo: "Vor einer Minute",
    minutesAgo: "Vor {delta} Minuten",
    hourAgo: "Vor einer Stunde",
    hoursAgo: "Vor {delta} Stunden",
    dayAgo: "Vor einem Tag",
    daysAgo: "Vor {delta} Tagen",
    weekAgo: "Vor einer Woche",
    weeksAgo: "Vor {delta} Wochen",
    monthAgo: "Vor einem Monat",
    monthsAgo: "Vor {delta} Monaten",
    yearAgo: "Vor einem Jahr",
    yearsAgo: "Vor {delta} Jahren",
    lessThanMinuteUntil: "In weniger als einer Minute",
    minuteUntil: "In einer Minute",
    minutesUntil: "In {delta} Minuten",
    hourUntil: "In ca. einer Stunde",
    hoursUntil: "In ca. {delta} Stunden",
    dayUntil: "In einem Tag",
    daysUntil: "In {delta} Tagen",
    weekUntil: "In einer Woche",
    weeksUntil: "In {delta} Wochen",
    monthUntil: "In einem Monat",
    monthsUntil: "In {delta} Monaten",
    yearUntil: "In einem Jahr",
    yearsUntil: "In {delta} Jahren"
});
MooTools.lang.set("de-CH", "cascade", ["de-DE"]);
MooTools.lang.set("fr-FR", "Date", {
    months: ["Janvier", "F&eacute;vrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Ao&ucirc;t", "Septembre", "Octobre", "Novembre", "D&eacute;cembre"],
    days: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
    dateOrder: ["date", "month", "year"],
    shortDate: "%d/%m/%Y",
    shortTime: "%H:%M",
    AM: "AM",
    PM: "PM",
    ordinal: function(a) {
        return (a > 1) ? "": "er";
    },
    lessThanMinuteAgo: "il y a moins d'une minute",
    minuteAgo: "il y a une minute",
    minutesAgo: "il y a {delta} minutes",
    hourAgo: "il y a une heure",
    hoursAgo: "il y a {delta} heures",
    dayAgo: "il y a un jour",
    daysAgo: "il y a {delta} jours",
    weekAgo: "il y a une semaine",
    weeksAgo: "il y a {delta} semaines",
    monthAgo: "il y a 1 mois",
    monthsAgo: "il y a {delta} mois",
    yearthAgo: "il y a 1 an",
    yearsAgo: "il y a {delta} ans",
    lessThanMinuteUntil: "dans moins d'une minute",
    minuteUntil: "dans une minute",
    minutesUntil: "dans {delta} minutes",
    hourUntil: "dans une heure",
    hoursUntil: "dans {delta} heures",
    dayUntil: "dans un jour",
    daysUntil: "dans {delta} jours",
    weekUntil: "dans 1 semaine",
    weeksUntil: "dans {delta} semaines",
    monthUntil: "dans 1 mois",
    monthsUntil: "dans {delta} mois",
    yearUntil: "dans 1 an",
    yearsUntil: "dans {delta} ans"
});
MooTools.lang.set("it-IT", "Date", {
    months: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
    days: ["Domenica", "Luned&igrave;", "Marted&igrave;", "Mercoled&igrave;", "Gioved&igrave;", "Venerd&igrave;", "Sabato"],
    dateOrder: ["date", "month", "year"],
    shortDate: "%d/%m/%Y",
    shortTime: "%H.%M",
    AM: "AM",
    PM: "PM",
    ordinal: "&ordm;",
    lessThanMinuteAgo: "meno di un minuto fa",
    minuteAgo: "circa un minuto fa",
    minutesAgo: "circa {delta} minuti fa",
    hourAgo: "circa un'ora fa",
    hoursAgo: "circa {delta} ore fa",
    dayAgo: "circa 1 giorno fa",
    daysAgo: "circa {delta} giorni fa",
    lessThanMinuteUntil: "tra meno di un minuto",
    minuteUntil: "tra circa un minuto",
    minutesUntil: "tra circa {delta} minuti",
    hourUntil: "tra circa un'ora",
    hoursUntil: "tra circa {delta} ore",
    dayUntil: "tra circa un giorno",
    daysUntil: "tra circa {delta} giorni"
});
MooTools.lang.set("no-NO", "Date", {
    dateOrder: ["date", "month", "year"],
    shortDate: "%d.%m.%Y",
    shortTime: "%H:%M",
    AM: "AM",
    PM: "PM",
    lessThanMinuteAgo: "kortere enn et minutt siden",
    minuteAgo: "omtrent et minutt siden",
    minutesAgo: "{delta} minutter siden",
    hourAgo: "omtrent en time siden",
    hoursAgo: "omtrent {delta} timer siden",
    dayAgo: "{delta} dag siden",
    daysAgo: "{delta} dager siden"
});
MooTools.lang.set("pl-PL", "Date", {
    months: ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"],
    days: ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"],
    dateOrder: ["year", "month", "date"],
    shortDate: "%Y-%m-%d",
    shortTime: "%H:%M",
    AM: "nad ranem",
    PM: "po południu",
    ordinal: function(a) {
        return (a > 3 && a < 21) ? "ty": ["ty", "szy", "gi", "ci", "ty"][Math.min(a % 10, 4)];
    },
    lessThanMinuteAgo: "mniej niż minute temu",
    minuteAgo: "około minutę temu",
    minutesAgo: "{delta} minut temu",
    hourAgo: "około godzinę temu",
    hoursAgo: "około {delta} godzin temu",
    dayAgo: "Wczoraj",
    daysAgo: "{delta} dni temu",
    lessThanMinuteUntil: "za niecałą minutę",
    minuteUntil: "za około minutę",
    minutesUntil: "za {delta} minut",
    hourUntil: "za około godzinę",
    hoursUntil: "za około {delta} godzin",
    dayUntil: "za 1 dzień",
    daysUntil: "za {delta} dni"
});
MooTools.lang.set("pt-BR", "Date", {
    months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
    days: ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"],
    dateOrder: ["date", "month", "year"],
    shortDate: "%d/%m/%Y",
    shortTime: "%H:%M",
    AM: "AM",
    PM: "PM",
    ordinal: "&ordm;",
    lessThanMinuteAgo: "há menos de um minuto",
    minuteAgo: "há cerca de um minuto",
    minutesAgo: "há {delta} minutos",
    hourAgo: "há cerca de uma hora",
    hoursAgo: "há cerca de {delta} horas",
    dayAgo: "há um dia",
    daysAgo: "há {delta} dias",
    weekAgo: "há uma semana",
    weeksAgo: "há {delta} semanas",
    monthAgo: "há um mês",
    monthsAgo: "há {delta} meses",
    yearAgo: "há um ano",
    yearsAgo: "há {delta} anos",
    lessThanMinuteUntil: "em menos de um minuto",
    minuteUntil: "em um minuto",
    minutesUntil: "em {delta} minutos",
    hourUntil: "em uma hora",
    hoursUntil: "em {delta} horas",
    dayUntil: "em um dia",
    daysUntil: "em {delta} dias",
    weekUntil: "em uma semana",
    weeksUntil: "em {delta} semanas",
    monthUntil: "em um mês",
    monthsUntil: "em {delta} meses",
    yearUntil: "em um ano",
    yearsUntil: "em {delta} anos"
}); (function() {
    var a = function(i, f, d, h, b) {
        var c = i % 10,
        g = i % 100;
        if (c == 1 && g != 11) {
            return f;
        } else {
            if ((c == 2 || c == 3 || c == 4) && !(g == 12 || g == 13 || g == 14)) {
                return d;
            } else {
                if (c == 0 || (c == 5 || c == 6 || c == 7 || c == 8 || c == 9) || (g == 11 || g == 12 || g == 13 || g == 14)) {
                    return h;
                } else {
                    return b;
                }
            }
        }
    };
    MooTools.lang.set("ru-RU-unicode", "Date", {
        months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        days: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
        dateOrder: ["date", "month", "year"],
        shortDate: "%d.%m.%Y",
        shortTime: "%H:%M",
        AM: "AM",
        PM: "PM",
        ordinal: "",
        lessThanMinuteAgo: "меньше минуты назад",
        minuteAgo: "минута назад",
        minutesAgo: function(b) {
            return "{delta} " + a(b, "минута", "минуты", "минут") + " назад";
        },
        hourAgo: "час назад",
        hoursAgo: function(b) {
            return "{delta} " + a(b, "час", "часа", "часов") + " назад";
        },
        dayAgo: "вчера",
        daysAgo: function(b) {
            return "{delta} " + a(b, "день", "дня", "дней") + " назад";
        },
        lessThanMinuteUntil: "меньше минуты назад",
        minuteUntil: "через минуту",
        minutesUntil: function(b) {
            return "через {delta} " + a(b, "час", "часа", "часов") + "";
        },
        hourUntil: "через час",
        hoursUntil: function(b) {
            return "через {delta} " + a(b, "час", "часа", "часов") + "";
        },
        dayUntil: "завтра",
        daysUntil: function(b) {
            return "через {delta} " + a(b, "день", "дня", "дней") + "";
        }
    });
})();
MooTools.lang.set("es-ES", "Date", {
    months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    days: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
    dateOrder: ["date", "month", "year"],
    shortDate: "%d/%m/%Y",
    shortTime: "%H:%M",
    AM: "AM",
    PM: "PM",
    ordinal: "",
    lessThanMinuteAgo: "hace menos de un minuto",
    minuteAgo: "hace un minuto",
    minutesAgo: "hace {delta} minutos",
    hourAgo: "hace una hora",
    hoursAgo: "hace unas {delta} horas",
    dayAgo: "hace un día",
    daysAgo: "hace {delta} días",
    weekAgo: "hace una semana",
    weeksAgo: "hace unas {delta} semanas",
    monthAgo: "hace un mes",
    monthsAgo: "hace {delta} meses",
    yearAgo: "hace un año",
    yearsAgo: "hace {delta} años",
    lessThanMinuteUntil: "menos de un minuto desde ahora",
    minuteUntil: "un minuto desde ahora",
    minutesUntil: "{delta} minutos desde ahora",
    hourUntil: "una hora desde ahora",
    hoursUntil: "unas {delta} horas desde ahora",
    dayUntil: "un día desde ahora",
    daysUntil: "{delta} días desde ahora",
    weekUntil: "una semana desde ahora",
    weeksUntil: "unas {delta} semanas desde ahora",
    monthUntil: "un mes desde ahora",
    monthsUntil: "{delta} meses desde ahora",
    yearUntil: "un año desde ahora",
    yearsUntil: "{delta} años desde ahora"
});
MooTools.lang.set("sv-SE", "Date", {
    months: ["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december"],
    days: ["söndag", "måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag"],
    dateOrder: ["year", "month", "date"],
    shortDate: "%Y-%m-%d",
    shortTime: "%H:%M",
    AM: "",
    PM: "",
    ordinal: "",
    lessThanMinuteAgo: "mindre än en minut sedan",
    minuteAgo: "ungefär en minut sedan",
    minutesAgo: "{delta} minuter sedan",
    hourAgo: "ungefär en timme sedan",
    hoursAgo: "ungefär {delta} timmar sedan",
    dayAgo: "1 dag sedan",
    daysAgo: "{delta} dagar sedan",
    lessThanMinuteUntil: "mindre än en minut sedan",
    minuteUntil: "ungefär en minut sedan",
    minutesUntil: "{delta} minuter sedan",
    hourUntil: "ungefär en timme sedan",
    hoursUntil: "ungefär {delta} timmar sedan",
    dayUntil: "1 dag sedan",
    daysUntil: "{delta} dagar sedan"
}); (function() {
    var a = function(k, f, c, j, b) {
        var i = (k / 10).toInt(),
        h = k % 10,
        g = (k / 100).toInt();
        if (i == 1 && k > 10) {
            return j;
        }
        if (h == 1) {
            return f;
        }
        if (h > 0 && h < 5) {
            return c;
        }
        return j;
    };
    MooTools.lang.set("uk-UA", "Date", {
        months: ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"],
        days: ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"],
        dateOrder: ["date", "month", "year"],
        shortDate: "%d/%m/%Y",
        shortTime: "%H:%M",
        AM: "до полудня",
        PM: "по полудню",
        ordinal: "",
        lessThanMinuteAgo: "меньше хвилини тому",
        minuteAgo: "хвилину тому",
        minutesAgo: function(b) {
            return "{delta} " + a(b, "хвилину", "хвилини", "хвилин") + " тому";
        },
        hourAgo: "годину тому",
        hoursAgo: function(b) {
            return "{delta} " + a(b, "годину", "години", "годин") + " тому";
        },
        dayAgo: "вчора",
        daysAgo: function(b) {
            return "{delta} " + a(b, "день", "дня", "днів") + " тому";
        },
        weekAgo: "тиждень тому",
        weeksAgo: function(b) {
            return "{delta} " + a(b, "тиждень", "тижні", "тижнів") + " тому";
        },
        monthAgo: "місяць тому",
        monthsAgo: function(b) {
            return "{delta} " + a(b, "місяць", "місяці", "місяців") + " тому";
        },
        yearAgo: "рік тому",
        yearsAgo: function(b) {
            return "{delta} " + a(b, "рік", "роки", "років") + " тому";
        },
        lessThanMinuteUntil: "за мить",
        minuteUntil: "через хвилину",
        minutesUntil: function(b) {
            return "через {delta} " + a(b, "хвилину", "хвилини", "хвилин");
        },
        hourUntil: "через годину",
        hoursUntil: function(b) {
            return "через {delta} " + a(b, "годину", "години", "годин");
        },
        dayUntil: "завтра",
        daysUntil: function(b) {
            return "через {delta} " + a(b, "день", "дня", "днів");
        },
        weekUntil: "через тиждень",
        weeksUntil: function(b) {
            return "через {delta} " + a(b, "тиждень", "тижні", "тижнів");
        },
        monthUntil: "через місяць",
        monthesUntil: function(b) {
            return "через {delta} " + a(b, "місяць", "місяці", "місяців");
        },
        yearUntil: "через рік",
        yearsUntil: function(b) {
            return "через {delta} " + a(b, "рік", "роки", "років");
        }
    });
})();
MooTools.lang.set("ar", "Form.Validator", {
    required: "هذا الحقل مطلوب.",
    minLength: "رجاءً إدخال {minLength}  أحرف على الأقل (تم إدخال {length} أحرف).",
    maxLength: "الرجاء عدم إدخال أكثر من {maxLength} أحرف (تم إدخال {length} أحرف).",
    integer: "الرجاء إدخال عدد صحيح في هذا الحقل. أي رقم ذو كسر عشري أو مئوي (مثال 1.25 ) غير مسموح.",
    numeric: 'الرجاء إدخال قيم رقمية في هذا الحقل (مثال "1" أو "1.1" أو "-1" أو "-1.1").',
    digits: "الرجاء أستخدام قيم رقمية وعلامات ترقيمية فقط في هذا الحقل (مثال, رقم هاتف مع نقطة أو شحطة)",
    alpha: "الرجاء أستخدام أحرف فقط (ا-ي) في هذا الحقل. أي فراغات أو علامات غير مسموحة.",
    alphanum: "الرجاء أستخدام أحرف فقط (ا-ي) أو أرقام (0-9) فقط في هذا الحقل. أي فراغات أو علامات غير مسموحة.",
    dateSuchAs: "الرجاء إدخال تاريخ صحيح كالتالي {date}",
    dateInFormatMDY: "الرجاء إدخال تاريخ صحيح (مثال, 31-12-1999)",
    email: "الرجاء إدخال بريد إلكتروني صحيح.",
    url: "الرجاء إدخال عنوان إلكتروني صحيح مثل http://www.google.com",
    currencyDollar: "الرجاء إدخال قيمة $ صحيحة.  مثال, 100.00$",
    oneRequired: "الرجاء إدخال قيمة في أحد هذه الحقول على الأقل.",
    errorPrefix: "خطأ: ",
    warningPrefix: "تحذير: "
});
MooTools.lang.set("ca-CA", "Form.Validator", {
    required: "Aquest camp es obligatori.",
    minLength: "Per favor introdueix al menys {minLength} caracters (has introduit {length} caracters).",
    maxLength: "Per favor introdueix no mes de {maxLength} caracters (has introduit {length} caracters).",
    integer: "Per favor introdueix un nombre enter en aquest camp. Nombres amb decimals (p.e. 1,25) no estan permesos.",
    numeric: 'Per favor introdueix sols valors numerics en aquest camp (p.e. "1" o "1,1" o "-1" o "-1,1").',
    digits: "Per favor usa sols numeros i puntuacio en aquest camp (per exemple, un nombre de telefon amb guions i punts no esta permes).",
    alpha: "Per favor utilitza lletres nomes (a-z) en aquest camp. No s´admiteixen espais ni altres caracters.",
    alphanum: "Per favor, utilitza nomes lletres (a-z) o numeros (0-9) en aquest camp. No s´admiteixen espais ni altres caracters.",
    dateSuchAs: "Per favor introdueix una data valida com {date}",
    dateInFormatMDY: 'Per favor introdueix una data valida com DD/MM/YYYY (p.e. "31/12/1999")',
    email: 'Per favor, introdueix una adreça de correu electronic valida. Per exemple,  "fred@domain.com".',
    url: "Per favor introdueix una URL valida com http://www.google.com.",
    currencyDollar: "Per favor introdueix una quantitat valida de €. Per exemple €100,00 .",
    oneRequired: "Per favor introdueix alguna cosa per al menys una d´aquestes entrades.",
    errorPrefix: "Error: ",
    warningPrefix: "Avis: ",

    noSpace: "No poden haver espais en aquesta entrada.",
    reqChkByNode: "No hi han elements seleccionats.",
    requiredChk: "Aquest camp es obligatori.",
    reqChkByName: "Per favor selecciona una {label}.",
    match: "Aquest camp necessita coincidir amb el camp {matchName}",
    startDate: "la data de inici",
    endDate: "la data de fi",
    currendDate: "la data actual",
    afterDate: "La data deu ser igual o posterior a {label}.",
    beforeDate: "La data deu ser igual o anterior a {label}.",
    startMonth: "Per favor selecciona un mes d´orige",
    sameMonth: "Aquestes dos dates deuen estar dins del mateix mes - deus canviar una o altra."
});
MooTools.lang.set("cs-CZ", "Form.Validator", {
    required: "Tato položka je povinná.",
    minLength: "Zadejte prosím alespoň {minLength} znaků (napsáno {length} znaků).",
    maxLength: "Zadejte prosím méně než {maxLength} znaků (nápsáno {length} znaků).",
    integer: "Zadejte prosím celé číslo. Desetinná čísla (např. 1.25) nejsou povolena.",
    numeric: 'Zadejte jen číselné hodnoty  (tj. "1" nebo "1.1" nebo "-1" nebo "-1.1").',
    digits: "Zadejte prosím pouze čísla a interpunkční znaménka(například telefonní číslo s pomlčkami nebo tečkami je povoleno).",
    alpha: "Zadejte prosím pouze písmena (a-z). Mezery nebo jiné znaky nejsou povoleny.",
    alphanum: "Zadejte prosím pouze písmena (a-z) nebo číslice (0-9). Mezery nebo jiné znaky nejsou povoleny.",
    dateSuchAs: "Zadejte prosím platné datum jako {date}",
    dateInFormatMDY: 'Zadejte prosím platné datum jako MM / DD / RRRR (tj. "12/31/1999")',
    email: 'Zadejte prosím platnou e-mailovou adresu. Například "fred@domain.com".',
    url: "Zadejte prosím platnou URL adresu jako http://www.google.com.",
    currencyDollar: "Zadejte prosím platnou částku. Například $100.00.",
    oneRequired: "Zadejte prosím alespoň jednu hodnotu pro tyto položky.",
    errorPrefix: "Chyba: ",
    warningPrefix: "Upozornění: ",
    noSpace: "V této položce nejsou povoleny mezery",
    reqChkByNode: "Nejsou vybrány žádné položky.",
    requiredChk: "Tato položka je vyžadována.",
    reqChkByName: "Prosím vyberte {label}.",
    match: "Tato položka se musí shodovat s položkou {matchName}",
    startDate: "datum zahájení",
    endDate: "datum ukončení",
    currendDate: "aktuální datum",
    afterDate: "Datum by mělo být stejné nebo větší než {label}.",
    beforeDate: "Datum by mělo být stejné nebo menší než {label}.",
    startMonth: "Vyberte počáteční měsíc.",
    sameMonth: "Tyto dva datumy musí být ve stejném měsíci - změňte jeden z nich.",
    creditcard: "Zadané číslo kreditní karty je neplatné. Prosím opravte ho. Bylo zadáno {length} čísel."
});
MooTools.lang.set("zh-CHS", "Form.Validator", {
    required: "此项必填。",
    minLength: "请至少输入 {minLength} 个字符 (已输入 {length} 个)。",
    maxLength: "最多只能输入 {maxLength} 个字符 (已输入 {length} 个)。",
    integer: '请输入一个整数，不能包含小数点。例如："1", "200"。',
    numeric: '请输入一个数字，例如："1", "1.1", "-1", "-1.1"。',
    digits: "请输入由数字和标点符号组成的内容。例如电话号码。",
    alpha: "请输入 A-Z 的 26 个字母，不能包含空格或任何其他字符。",
    alphanum: "请输入 A-Z 的 26 个字母或 0-9 的 10 个数字，不能包含空格或任何其他字符。",
    dateSuchAs: "请输入合法的日期格式，如：{date}。",
    dateInFormatMDY: '请输入合法的日期格式，例如：YYYY-MM-DD ("2010-12-31")。',
    email: '请输入合法的电子信箱地址，例如："fred@domain.com"。',
    url: "请输入合法的 Url 地址，例如：http://www.google.com。",
    currencyDollar: "请输入合法的货币符号，例如：￥100.0",
    oneRequired: "请至少选择一项。",
    errorPrefix: "错误：",
    warningPrefix: "警告：",
    noSpace: "不能包含空格。",
    reqChkByNode: "未选择任何内容。",
    requiredChk: "此项必填。",
    reqChkByName: "请选择 {label}.",
    match: "必须与{matchName}相匹配",
    startDate: "起始日期",
    endDate: "结束日期",
    currendDate: "当前日期",
    afterDate: "日期必须等于或晚于 {label}.",
    beforeDate: "日期必须早于或等于 {label}.",
    startMonth: "请选择起始月份",
    sameMonth: "您必须修改两个日期中的一个，以确保它们在同一月份。",
    creditcard: "您输入的信用卡号码不正确。当前已输入{length}个字符。"
});
MooTools.lang.set("zh-CHT", "Form.Validator", {
    required: "此項必填。 ",
    minLength: "請至少輸入{minLength} 個字符(已輸入{length} 個)。 ",
    maxLength: "最多只能輸入{maxLength} 個字符(已輸入{length} 個)。 ",
    integer: '請輸入一個整數，不能包含小數點。例如："1", "200"。 ',
    numeric: '請輸入一個數字，例如："1", "1.1", "-1", "-1.1"。 ',
    digits: "請輸入由數字和標點符號組成的內容。例如電話號碼。 ",
    alpha: "請輸入AZ 的26 個字母，不能包含空格或任何其他字符。 ",
    alphanum: "請輸入AZ 的26 個字母或0-9 的10 個數字，不能包含空格或任何其他字符。 ",
    dateSuchAs: "請輸入合法的日期格式，如：{date}。 ",
    dateInFormatMDY: '請輸入合法的日期格式，例如：YYYY-MM-DD ("2010-12-31")。 ',
    email: '請輸入合法的電子信箱地址，例如："fred@domain.com"。 ',
    url: "請輸入合法的Url 地址，例如：http://www.google.com。 ",
    currencyDollar: "請輸入合法的貨幣符號，例如：￥100.0",
    oneRequired: "請至少選擇一項。 ",
    errorPrefix: "錯誤：",
    warningPrefix: "警告：",
    noSpace: "不能包含空格。 ",
    reqChkByNode: "未選擇任何內容。 ",
    requiredChk: "此項必填。 ",
    reqChkByName: "請選擇 {label}.",
    match: "必須與{matchName}相匹配",
    startDate: "起始日期",
    endDate: "結束日期",
    currendDate: "當前日期",
    afterDate: "日期必須等於或晚於{label}.",
    beforeDate: "日期必須早於或等於{label}.",
    startMonth: "請選擇起始月份",
    sameMonth: "您必須修改兩個日期中的一個，以確保它們在同一月份。 ",
    creditcard: "您輸入的信用卡號碼不正確。當前已輸入{length}個字符。 "
});
Form.Validator.add("validate-currency-yuan", {
    errorMsg: function() {
        return Form.Validator.getMsg("currencyYuan");
    },
    test: function(a) {
        return Form.Validator.getValidator("IsEmpty").test(a) || (/^￥?\-?([1-9]{1}[0-9]{0,2}(\,[0-9]{3})*(\.[0-9]{0,2})?|[1-9]{1}\d*(\.[0-9]{0,2})?|0(\.[0-9]{0,2})?|(\.[0-9]{1,2})?)$/).test(a.get("value"));
    }
});
MooTools.lang.set("nl-NL", "Form.Validator", {
    required: "Dit veld is verplicht.",
    minLength: "Vul minimaal {minLength} karakters in (je hebt {length} karakters ingevoerd).",
    maxLength: "Vul niet meer dan {maxLength} karakters in (je hebt {length} karakters ingevoerd).",
    integer: "Vul een getal in. Getallen met decimalen (bijvoorbeeld 1.25) zijn niet toegestaan.",
    numeric: 'Vul alleen numerieke waarden in (bijvoorbeeld "1" of "1.1" of "-1" of "-1.1").',
    digits: "Vul alleen nummers en leestekens in (bijvoorbeeld een telefoonnummer met streepjes is toegestaan).",
    alpha: "Vul alleen letters in (a-z). Spaties en andere karakters zijn niet toegestaan.",
    alphanum: "Vul alleen letters (a-z) of nummers (0-9) in. Spaties en andere karakters zijn niet toegestaan.",
    dateSuchAs: "Vul een geldige datum in, zoals {date}",
    dateInFormatMDY: 'Vul een geldige datum, in het formaat MM/DD/YYYY (bijvoorbeeld "12/31/1999")',
    email: 'Vul een geldig e-mailadres in. Bijvoorbeeld "fred@domein.nl".',
    url: "Vul een geldige URL in, zoals http://www.google.nl.",
    currencyDollar: "Vul een geldig $ bedrag in. Bijvoorbeeld $100.00 .",
    oneRequired: "Vul iets in bij in ieder geval een van deze velden.",
    warningPrefix: "Waarschuwing: ",
    errorPrefix: "Fout: ",
    noSpace: "Spaties zijn niet toegestaan in dit veld.",
    reqChkByNode: "Er zijn geen items geselecteerd.",
    requiredChk: "Dit veld is verplicht.",
    reqChkByName: "Selecteer een {label}.",
    match: "Dit veld moet overeen komen met het {matchName} veld",
    startDate: "de begin datum",
    endDate: "de eind datum",
    currendDate: "de huidige datum",
    afterDate: "De datum moet hetzelfde of na {label} zijn.",
    beforeDate: "De datum moet hetzelfde of voor {label} zijn.",
    startMonth: "Selecteer een begin maand",
    sameMonth: "Deze twee data moeten in dezelfde maand zijn - u moet een van beide aanpassen.",
    creditcard: "Het ingevulde creditcard nummer is niet geldig. Controleer het nummer en probeer opnieuw. {length} getallen ingevuld."
});
MooTools.lang.set("et-EE", "Form.Validator", {
    required: "Väli peab olema täidetud.",
    minLength: "Palun sisestage vähemalt {minLength} tähte (te sisestasite {length} tähte).",
    maxLength: "Palun ärge sisestage rohkem kui {maxLength} tähte (te sisestasite {length} tähte).",
    integer: "Palun sisestage väljale täisarv. Kümnendarvud (näiteks 1.25) ei ole lubatud.",
    numeric: 'Palun sisestage ainult numbreid väljale (näiteks "1", "1.1", "-1" või "-1.1").',
    digits: "Palun kasutage ainult numbreid ja kirjavahemärke (telefoninumbri sisestamisel on lubatud kasutada kriipse ja punkte).",
    alpha: "Palun kasutage ainult tähti (a-z). Tühikud ja teised sümbolid on keelatud.",
    alphanum: "Palun kasutage ainult tähti (a-z) või numbreid (0-9). Tühikud ja teised sümbolid on keelatud.",
    dateSuchAs: "Palun sisestage kehtiv kuupäev kujul {date}",
    dateInFormatMDY: 'Palun sisestage kehtiv kuupäev kujul MM.DD.YYYY (näiteks: "12.31.1999").',
    email: 'Palun sisestage kehtiv e-maili aadress (näiteks: "fred@domain.com").',
    url: "Palun sisestage kehtiv URL (näiteks: http://www.google.com).",
    currencyDollar: "Palun sisestage kehtiv $ summa (näiteks: $100.00).",
    oneRequired: "Palun sisestage midagi vähemalt ühele antud väljadest.",
    errorPrefix: "Viga: ",
    warningPrefix: "Hoiatus: ",
    noSpace: "Väli ei tohi sisaldada tühikuid.",
    reqChkByNode: "Ükski väljadest pole valitud.",
    requiredChk: "Välja täitmine on vajalik.",
    reqChkByName: "Palun valige üks {label}.",
    match: "Väli peab sobima {matchName} väljaga",
    startDate: "algkuupäev",
    endDate: "lõppkuupäev",
    currendDate: "praegune kuupäev",
    afterDate: "Kuupäev peab olema võrdne või pärast {label}.",
    beforeDate: "Kuupäev peab olema võrdne või enne {label}.",
    startMonth: "Palun valige algkuupäev.",
    sameMonth: "Antud kaks kuupäeva peavad olema samas kuus - peate muutma ühte kuupäeva."
});
MooTools.lang.set("de-DE", "Form.Validator", {
    required: "Dieses Eingabefeld muss ausgef&uuml;llt werden.",
    minLength: "Geben Sie bitte mindestens {minLength} Zeichen ein (Sie haben nur {length} Zeichen eingegeben).",
    maxLength: "Geben Sie bitte nicht mehr als {maxLength} Zeichen ein (Sie haben {length} Zeichen eingegeben).",
    integer: "Geben Sie in diesem Eingabefeld bitte eine ganze Zahl ein. Dezimalzahlen (z.B. &quot;1.25&quot;) sind nicht erlaubt.",
    numeric: "Geben Sie in diesem Eingabefeld bitte nur Zahlenwerte (z.B. &quot;1&quot;, &quot;1.1&quot;, &quot;-1&quot; oder &quot;-1.1&quot;) ein.",
    digits: "Geben Sie in diesem Eingabefeld bitte nur Zahlen und Satzzeichen ein (z.B. eine Telefonnummer mit Bindestrichen und Punkten ist erlaubt).",
    alpha: "Geben Sie in diesem Eingabefeld bitte nur Buchstaben (a-z) ein. Leerzeichen und andere Zeichen sind nicht erlaubt.",
    alphanum: "Geben Sie in diesem Eingabefeld bitte nur Buchstaben (a-z) und Zahlen (0-9) ein. Leerzeichen oder andere Zeichen sind nicht erlaubt.",
    dateSuchAs: "Geben Sie bitte ein g&uuml;ltiges Datum ein (z.B. &quot;{date}&quot;).",
    dateInFormatMDY: "Geben Sie bitte ein g&uuml;ltiges Datum im Format TT.MM.JJJJ ein (z.B. &quot;31.12.1999&quot;).",
    email: "Geben Sie bitte eine g&uuml;ltige E-Mail-Adresse ein (z.B. &quot;max@mustermann.de&quot;).",
    url: "Geben Sie bitte eine g&uuml;ltige URL ein (z.B. &quot;http://www.google.de&quot;).",
    currencyDollar: "Geben Sie bitte einen g&uuml;ltigen Betrag in EURO ein (z.B. 100.00&#8364;).",
    oneRequired: "Bitte f&uuml;llen Sie mindestens ein Eingabefeld aus.",
    errorPrefix: "Fehler: ",
    warningPrefix: "Warnung: ",
    noSpace: "Es darf kein Leerzeichen in diesem Eingabefeld sein.",
    reqChkByNode: "Es wurden keine Elemente gew&auml;hlt.",
    requiredChk: "Dieses Feld muss ausgef&uuml;llt werden.",
    reqChkByName: "Bitte w&auml;hlen Sie ein {label}.",
    match: "Dieses Eingabefeld muss mit dem {matchName} Eingabefeld &uuml;bereinstimmen.",
    startDate: "Das Anfangsdatum",
    endDate: "Das Enddatum",
    currendDate: "Das aktuelle Datum",
    afterDate: "Das Datum sollte zur gleichen Zeit oder sp&auml;ter sein als {label}.",
    beforeDate: "Das Datum sollte zur gleichen Zeit oder fr&uuml;her sein als {label}.",
    startMonth: "W&auml;hlen Sie bitte einen Anfangsmonat",
    sameMonth: "Diese zwei Datumsangaben m&uuml;ssen im selben Monat sein - Sie m&uuml;ssen eines von beiden ver&auml;ndern.",
    creditcard: "Die eingegebene Kreditkartennummer ist ung&uuml;ltig. Bitte &uuml;berpr&uuml;fen Sie diese und versuchen Sie es erneut. {length} Zahlen eingegeben."
});
MooTools.lang.set("de-CH", "Form.Validator", {
    required: "Dieses Feld ist obligatorisch.",
    minLength: "Geben Sie bitte mindestens {minLength} Zeichen ein (Sie haben {length} Zeichen eingegeben).",
    maxLength: "Bitte geben Sie nicht mehr als {maxLength} Zeichen ein (Sie haben {length} Zeichen eingegeben).",
    integer: "Geben Sie bitte eine ganze Zahl ein. Dezimalzahlen (z.B. 1.25) sind nicht erlaubt.",
    numeric: "Geben Sie bitte nur Zahlenwerte in dieses Eingabefeld ein (z.B. &quot;1&quot;, &quot;1.1&quot;, &quot;-1&quot; oder &quot;-1.1&quot;).",
    digits: "Benutzen Sie bitte nur Zahlen und Satzzeichen in diesem Eingabefeld (erlaubt ist z.B. eine Telefonnummer mit Bindestrichen und Punkten).",
    alpha: "Benutzen Sie bitte nur Buchstaben (a-z) in diesem Feld. Leerzeichen und andere Zeichen sind nicht erlaubt.",
    alphanum: "Benutzen Sie bitte nur Buchstaben (a-z) und Zahlen (0-9) in diesem Eingabefeld. Leerzeichen und andere Zeichen sind nicht erlaubt.",
    dateSuchAs: "Geben Sie bitte ein g&uuml;ltiges Datum ein. Wie zum Beispiel {date}",
    dateInFormatMDY: "Geben Sie bitte ein g&uuml;ltiges Datum ein. Wie zum Beispiel TT.MM.JJJJ (z.B. &quot;31.12.1999&quot;)",
    email: "Geben Sie bitte eine g&uuml;ltige E-Mail Adresse ein. Wie zum Beispiel &quot;maria@bernasconi.ch&quot;.",
    url: "Geben Sie bitte eine g&uuml;ltige URL ein. Wie zum Beispiel http://www.google.ch.",
    currencyDollar: "Geben Sie bitte einen g&uuml;ltigen Betrag in Schweizer Franken ein. Wie zum Beispiel 100.00 CHF .",
    oneRequired: "Machen Sie f&uuml;r mindestens eines der Eingabefelder einen Eintrag.",
    errorPrefix: "Fehler: ",
    warningPrefix: "Warnung: ",
    noSpace: "In diesem Eingabefeld darf kein Leerzeichen sein.",
    reqChkByNode: "Es wurden keine Elemente gew&auml;hlt.",
    requiredChk: "Dieses Feld ist obligatorisch.",
    reqChkByName: "Bitte w&auml;hlen Sie ein {label}.",
    match: "Dieses Eingabefeld muss mit dem Feld {matchName} &uuml;bereinstimmen.",
    startDate: "Das Anfangsdatum",
    endDate: "Das Enddatum",
    currendDate: "Das aktuelle Datum",
    afterDate: "Das Datum sollte zur gleichen Zeit oder sp&auml;ter sein {label}.",
    beforeDate: "Das Datum sollte zur gleichen Zeit oder fr&uuml;her sein {label}.",
    startMonth: "W&auml;hlen Sie bitte einen Anfangsmonat",
    sameMonth: "Diese zwei Datumsangaben m&uuml;ssen im selben Monat sein - Sie m&uuml;ssen eine von beiden ver&auml;ndern.",
    creditcard: "Die eingegebene Kreditkartennummer ist ung&uuml;ltig. Bitte &uuml;berpr&uuml;fen Sie diese und versuchen Sie es erneut. {length} Zahlen eingegeben."
});
MooTools.lang.set("fr-FR", "Form.Validator", {
    required: "Ce champ est obligatoire.",
    minLength: "Veuillez saisir un minimum de {minLength} caract&egrave;re(s) (vous avez saisi {length} caract&egrave;re(s)).",
    maxLength: "Veuillez saisir un maximum de {maxLength} caract&egrave;re(s) (vous avez saisi {length} caract&egrave;re(s)).",
    integer: 'Veuillez saisir un nombre entier dans ce champ. Les nombres d&eacute;cimaux (ex : "1,25") ne sont pas autoris&eacute;s.',
    numeric: 'Veuillez saisir uniquement des chiffres dans ce champ (ex : "1" ou "1,1" ou "-1" ou "-1,1").',
    digits: "Veuillez saisir uniquement des chiffres et des signes de ponctuation dans ce champ (ex : un num&eacute;ro de t&eacute;l&eacute;phone avec des traits d'union est autoris&eacute;).",
    alpha: "Veuillez saisir uniquement des lettres (a-z) dans ce champ. Les espaces ou autres caract&egrave;res ne sont pas autoris&eacute;s.",
    alphanum: "Veuillez saisir uniquement des lettres (a-z) ou des chiffres (0-9) dans ce champ. Les espaces ou autres caract&egrave;res ne sont pas autoris&eacute;s.",
    dateSuchAs: "Veuillez saisir une date correcte comme {date}",
    dateInFormatMDY: 'Veuillez saisir une date correcte, au format JJ/MM/AAAA (ex : "31/11/1999").',
    email: 'Veuillez saisir une adresse de courrier &eacute;lectronique. Par example "fred@domaine.com".',
    url: "Veuillez saisir une URL, comme http://www.google.com.",
    currencyDollar: "Veuillez saisir une quantit&eacute; correcte. Par example 100,00&euro;.",
    oneRequired: "Veuillez s&eacute;lectionner au moins une de ces options.",
    errorPrefix: "Erreur : ",
    warningPrefix: "Attention : ",
    noSpace: "Ce champ n'accepte pas les espaces.",
    reqChkByNode: "Aucun &eacute;l&eacute;ment n'est s&eacute;lectionn&eacute;.",
    requiredChk: "Ce champ est obligatoire.",
    reqChkByName: "Veuillez s&eacute;lectionner un(e) {label}.",
    match: "Ce champ doit correspondre avec le champ {matchName}.",
    startDate: "date de d&eacute;but",
    endDate: "date de fin",
    currendDate: "date actuelle",
    afterDate: "La date doit &ecirc;tre identique ou post&eacute;rieure &agrave; {label}.",
    beforeDate: "La date doit &ecirc;tre identique ou ant&eacute;rieure &agrave; {label}.",
    startMonth: "Veuillez s&eacute;lectionner un mois de d&eacute;but.",
    sameMonth: "Ces deux dates doivent &ecirc;tre dans le m&ecirc;me mois - vous devez en modifier une."
});
MooTools.lang.set("it-IT", "Form.Validator", {
    required: "Il campo &egrave; obbligatorio.",
    minLength: "Inserire almeno {minLength} caratteri (ne sono stati inseriti {length}).",
    maxLength: "Inserire al massimo {maxLength} caratteri (ne sono stati inseriti {length}).",
    integer: "Inserire un numero intero. Non sono consentiti decimali (es.: 1.25).",
    numeric: 'Inserire solo valori numerici (es.: "1" oppure "1.1" oppure "-1" oppure "-1.1").',
    digits: "Inserire solo numeri e caratteri di punteggiatura. Per esempio &egrave; consentito un numero telefonico con trattini o punti.",
    alpha: "Inserire solo lettere (a-z). Non sono consentiti spazi o altri caratteri.",
    alphanum: "Inserire solo lettere (a-z) o numeri (0-9). Non sono consentiti spazi o altri caratteri.",
    dateSuchAs: "Inserire una data valida del tipo {date}",
    dateInFormatMDY: 'Inserire una data valida nel formato MM/GG/AAAA (es.: "12/31/1999")',
    email: 'Inserire un indirizzo email valido. Per esempio "nome@dominio.com".',
    url: 'Inserire un indirizzo valido. Per esempio "http://www.dominio.com".',
    currencyDollar: 'Inserire un importo valido. Per esempio "$100.00".',
    oneRequired: "Completare almeno uno dei campi richiesti.",
    errorPrefix: "Errore: ",
    warningPrefix: "Attenzione: ",
    noSpace: "Non sono consentiti spazi.",
    reqChkByNode: "Nessuna voce selezionata.",
    requiredChk: "Il campo &egrave; obbligatorio.",
    reqChkByName: "Selezionare un(a) {label}.",
    match: "Il valore deve corrispondere al campo {matchName}",
    startDate: "data d'inizio",
    endDate: "data di fine",
    currendDate: "data attuale",
    afterDate: "La data deve corrispondere o essere successiva al {label}.",
    beforeDate: "La data deve corrispondere o essere precedente al {label}.",
    startMonth: "Selezionare un mese d'inizio",
    sameMonth: "Le due date devono essere dello stesso mese - occorre modificarne una."
});
MooTools.lang.set("no-NO", "Form.Validator", {
    required: "Dette feltet er pÃ¥krevd.",
    minLength: "Vennligst skriv inn minst {minLength} tegn (du skrev {length} tegn).",
    maxLength: "Vennligst skriv inn maksimalt {maxLength} tegn (du skrev {length} tegn).",
    integer: "Vennligst skriv inn et tall i dette feltet. Tall med desimaler (for eksempel 1,25) er ikke tillat.",
    numeric: 'Vennligst skriv inn kun numeriske verdier i dette feltet (for eksempel "1", "1.1", "-1" eller "-1.1").',
    digits: "Vennligst bruk kun nummer og skilletegn i dette feltet.",
    alpha: "Vennligst bruk kun bokstaver (a-z) i dette feltet. Ingen mellomrom eller andre tegn er tillat.",
    alphanum: "Vennligst bruk kun bokstaver (a-z) eller nummer (0-9) i dette feltet. Ingen mellomrom eller andre tegn er tillat.",
    dateSuchAs: "Vennligst skriv inn en gyldig dato, som {date}",
    dateInFormatMDY: 'Vennligst skriv inn en gyldig dato, i formatet MM/DD/YYYY (for eksempel "12/31/1999")',
    email: 'Vennligst skriv inn en gyldig epost-adresse. For eksempel "espen@domene.no".',
    url: "Vennligst skriv inn en gyldig URL, for eksempel http://www.google.no.",
    currencyDollar: "Vennligst fyll ut et gyldig $ belÃ¸p. For eksempel $100.00 .",
    oneRequired: "Vennligst fyll ut noe i minst ett av disse feltene.",
    errorPrefix: "Feil: ",
    warningPrefix: "Advarsel: "
});
MooTools.lang.set("pl-PL", "Form.Validator", {
    required: "To pole jest wymagane.",
    minLength: "Wymagane jest przynajmniej {minLength} znaków (wpisanych zostało tylko {length}).",
    maxLength: "Dozwolone jest nie więcej niż {maxLength} znaków (wpisanych zostało {length})",
    integer: "To pole wymaga liczb całych. Liczby dziesiętne (np. 1.25) są niedozwolone.",
    numeric: 'Prosimy używać tylko numerycznych wartości w tym polu (np. "1", "1.1", "-1" lub "-1.1").',
    digits: "Prosimy używać liczb oraz zankow punktuacyjnych w typ polu (dla przykładu, przy numerze telefonu myślniki i kropki są dozwolone).",
    alpha: "Prosimy używać tylko liter (a-z) w tym polu. Spacje oraz inne znaki są niedozwolone.",
    alphanum: "Prosimy używać tylko liter (a-z) lub liczb (0-9) w tym polu. Spacje oraz inne znaki są niedozwolone.",
    dateSuchAs: "Prosimy podać prawidłową datę w formacie: {date}",
    dateInFormatMDY: 'Prosimy podać poprawną date w formacie DD.MM.RRRR (i.e. "12.01.2009")',
    email: 'Prosimy podać prawidłowy adres e-mail, np. "jan@domena.pl".',
    url: "Prosimy podać prawidłowy adres URL, np. http://www.google.pl.",
    currencyDollar: "Prosimy podać prawidłową sumę w PLN. Dla przykładu: 100.00 PLN.",
    oneRequired: "Prosimy wypełnić chociaż jedno z pól.",
    errorPrefix: "Błąd: ",
    warningPrefix: "Uwaga: ",
    noSpace: "W tym polu nie mogą znajdować się spacje.",
    reqChkByNode: "Brak zaznaczonych elementów.",
    requiredChk: "To pole jest wymagane.",
    reqChkByName: "Prosimy wybrać z {label}.",
    match: "To pole musi być takie samo jak {matchName}",
    startDate: "data początkowa",
    endDate: "data końcowa",
    currendDate: "aktualna data",
    afterDate: "Podana data poinna być taka sama lub po {label}.",
    beforeDate: "Podana data poinna być taka sama lub przed {label}.",
    startMonth: "Prosimy wybrać początkowy miesiąc.",
    sameMonth: "Te dwie daty muszą być w zakresie tego samego miesiąca - wymagana jest zmiana któregoś z pól."
});
MooTools.lang.set("pt-PT", "Form.Validator", {
    required: "Este campo é necessário.",
    minLength: "Digite pelo menos{minLength} caracteres (comprimento {length} caracteres).",
    maxLength: "Não insira mais de {maxLength} caracteres (comprimento {length} caracteres).",
    integer: "Digite um número inteiro neste domínio. Com números decimais (por exemplo, 1,25), não são permitidas.",
    numeric: 'Digite apenas valores numéricos neste domínio (p.ex., "1" ou "1.1" ou "-1" ou "-1,1").',
    digits: "Por favor, use números e pontuação apenas neste campo (p.ex., um número de telefone com traços ou pontos é permitida).",
    alpha: "Por favor use somente letras (a-z), com nesta área. Não utilize espaços nem outros caracteres são permitidos.",
    alphanum: "Use somente letras (a-z) ou números (0-9) neste campo. Não utilize espaços nem outros caracteres são permitidos.",
    dateSuchAs: "Digite uma data válida, como {date}",
    dateInFormatMDY: 'Digite uma data válida, como DD/MM/YYYY (p.ex. "31/12/1999")',
    email: 'Digite um endereço de email válido. Por exemplo "fred@domain.com".',
    url: "Digite uma URL válida, como http://www.google.com.",
    currencyDollar: "Digite um valor válido $. Por exemplo $ 100,00. ",
    oneRequired: "Digite algo para pelo menos um desses insumos.",
    errorPrefix: "Erro: ",
    warningPrefix: "Aviso: "
});
MooTools.lang.set("pt-BR", "Form.Validator", {
    required: "Este campo é obrigatório.",
    minLength: "Digite pelo menos {minLength} caracteres (tamanho atual: {length}).",
    maxLength: "Não digite mais de {maxLength} caracteres (tamanho atual: {length}).",
    integer: "Por favor digite apenas um número inteiro neste campo. Não são permitidos números decimais (por exemplo, 1,25).",
    numeric: 'Por favor digite apenas valores numéricos neste campo (por exemplo, "1" ou "1.1" ou "-1" ou "-1,1").',
    digits: "Por favor use apenas números e pontuação neste campo (por exemplo, um número de telefone com traços ou pontos é permitido).",
    alpha: "Por favor use somente letras (a-z). Espaço e outros caracteres não são permitidos.",
    alphanum: "Use somente letras (a-z) ou números (0-9) neste campo. Espaço e outros caracteres não são permitidos.",
    dateSuchAs: "Digite uma data válida, como {date}",
    dateInFormatMDY: 'Digite uma data válida, como DD/MM/YYYY (por exemplo, "31/12/1999")',
    email: 'Digite um endereço de email válido. Por exemplo "nome@dominio.com".',
    url: "Digite uma URL válida. Exemplo: http://www.google.com.",
    currencyDollar: "Digite um valor em dinheiro válido. Exemplo: R$100,00 .",
    oneRequired: "Digite algo para pelo menos um desses campos.",
    errorPrefix: "Erro: ",
    warningPrefix: "Aviso: ",
    noSpace: "Não é possível digitar espaços neste campo.",
    reqChkByNode: "Não foi selecionado nenhum item.",
    requiredChk: "Este campo é obrigatório.",
    reqChkByName: "Por favor digite um {label}.",
    match: "Este campo deve ser igual ao campo {matchName}.",
    startDate: "a data inicial",
    endDate: "a data final",
    currendDate: "a data atual",
    afterDate: "A data deve ser igual ou posterior a {label}.",
    beforeDate: "A data deve ser igual ou anterior a {label}.",
    startMonth: "Por favor selecione uma data inicial.",
    sameMonth: "Estas duas datas devem ter o mesmo mês - você deve modificar uma das duas.",
    creditcard: "O número do cartão de crédito informado é inválido. Por favor verifique o valor e tente novamente. {length} números informados."
});
MooTools.lang.set("ru-RU-unicode", "Form.Validator", {
    required: "Это поле обязательно к заполнению.",
    minLength: "Пожалуйста, введите хотя бы {minLength} символов (Вы ввели {length}).",
    maxLength: "Пожалуйста, введите не больше {maxLength} символов (Вы ввели {length}).",
    integer: "Пожалуйста, введите в это поле число. Дробные числа (например 1.25) тут не разрешены.",
    numeric: 'Пожалуйста, введите в это поле число (например "1" или "1.1", или "-1", или "-1.1").',
    digits: "В этом поле Вы можете использовать только цифры и знаки пунктуации (например, телефонный номер со знаками дефиса или с точками).",
    alpha: "В этом поле можно использовать только латинские буквы (a-z). Пробелы и другие символы запрещены.",
    alphanum: "В этом поле можно использовать только латинские буквы (a-z) и цифры (0-9). Пробелы и другие символы запрещены.",
    dateSuchAs: "Пожалуйста, введите корректную дату {date}",
    dateInFormatMDY: 'Пожалуйста, введите дату в формате ММ/ДД/ГГГГ (например "12/31/1999")',
    email: 'Пожалуйста, введите корректный емейл-адрес. Для примера "fred@domain.com".',
    url: "Пожалуйста, введите правильную ссылку вида http://www.google.com.",
    currencyDollar: "Пожалуйста, введите сумму в долларах. Например: $100.00 .",
    oneRequired: "Пожалуйста, выберите хоть что-нибудь в одном из этих полей.",
    errorPrefix: "Ошибка: ",
    warningPrefix: "Внимание: "
});
MooTools.lang.set("ru-RU", "Form.Validator", {
    required: "Ýòî ïîëå îáÿçàòåëüíî ê çàïîëíåíèþ.",
    minLength: "Ïîæàëóéñòà, ââåäèòå õîòÿ áû {minLength} ñèìâîëîâ (Âû ââåëè {length}).",
    maxLength: "Ïîæàëóéñòà, ââåäèòå íå áîëüøå {maxLength} ñèìâîëîâ (Âû ââåëè {length}).",
    integer: "Ïîæàëóéñòà, ââåäèòå â ýòî ïîëå ÷èñëî. Äðîáíûå ÷èñëà (íàïðèìåð 1.25) òóò íå ðàçðåøåíû.",
    numeric: 'Ïîæàëóéñòà, ââåäèòå â ýòî ïîëå ÷èñëî (íàïðèìåð "1" èëè "1.1", èëè "-1", èëè "-1.1").',
    digits: "Â ýòîì ïîëå Âû ìîæåòå èñïîëüçîâàòü òîëüêî öèôðû è çíàêè ïóíêòóàöèè (íàïðèìåð, òåëåôîííûé íîìåð ñî çíàêàìè äåôèñà èëè ñ òî÷êàìè).",
    alpha: "Â ýòîì ïîëå ìîæíî èñïîëüçîâàòü òîëüêî ëàòèíñêèå áóêâû (a-z). Ïðîáåëû è äðóãèå ñèìâîëû çàïðåùåíû.",
    alphanum: "Â ýòîì ïîëå ìîæíî èñïîëüçîâàòü òîëüêî ëàòèíñêèå áóêâû (a-z) è öèôðû (0-9). Ïðîáåëû è äðóãèå ñèìâîëû çàïðåùåíû.",
    dateSuchAs: "Ïîæàëóéñòà, ââåäèòå êîððåêòíóþ äàòó {date}",
    dateInFormatMDY: 'Ïîæàëóéñòà, ââåäèòå äàòó â ôîðìàòå ÌÌ/ÄÄ/ÃÃÃÃ (íàïðèìåð "12/31/1999")',
    email: 'Ïîæàëóéñòà, ââåäèòå êîððåêòíûé åìåéë-àäðåñ. Äëÿ ïðèìåðà "fred@domain.com".',
    url: "Ïîæàëóéñòà, ââåäèòå ïðàâèëüíóþ ññûëêó âèäà http://www.google.com.",
    currencyDollar: "Ïîæàëóéñòà, ââåäèòå ñóììó â äîëëàðàõ. Íàïðèìåð: $100.00 .",
    oneRequired: "Ïîæàëóéñòà, âûáåðèòå õîòü ÷òî-íèáóäü â îäíîì èç ýòèõ ïîëåé.",
    errorPrefix: "Îøèáêà: ",
    warningPrefix: "Âíèìàíèå: "
});
MooTools.lang.set("es-ES", "Form.Validator", {
    required: "Este campo es obligatorio.",
    minLength: "Por favor introduce al menos {minLength} caracteres (has introducido {length} caracteres).",
    maxLength: "Por favor introduce no m&aacute;s de {maxLength} caracteres (has introducido {length} caracteres).",
    integer: "Por favor introduce un n&uacute;mero entero en este campo. N&uacute;meros con decimales (p.e. 1,25) no se permiten.",
    numeric: 'Por favor introduce solo valores num&eacute;ricos en este campo (p.e. "1" o "1,1" o "-1" o "-1,1").',
    digits: "Por favor usa solo n&uacute;meros y puntuaci&oacute;n en este campo (por ejemplo, un n&uacute;mero de tel&eacute;fono con guiones y puntos no esta permitido).",
    alpha: "Por favor usa letras solo (a-z) en este campo. No se admiten espacios ni otros caracteres.",
    alphanum: "Por favor, usa solo letras (a-z) o n&uacute;meros (0-9) en este campo. No se admiten espacios ni otros caracteres.",
    dateSuchAs: "Por favor introduce una fecha v&aacute;lida como {date}",
    dateInFormatMDY: 'Por favor introduce una fecha v&aacute;lida como DD/MM/YYYY (p.e. "31/12/1999")',
    email: 'Por favor, introduce una direcci&oacute;n de email v&aacute;lida. Por ejemplo,  "fred@domain.com".',
    url: "Por favor introduce una URL v&aacute;lida como http://www.google.com.",
    currencyDollar: "Por favor introduce una cantidad v&aacute;lida de €. Por ejemplo €100,00 .",
    oneRequired: "Por favor introduce algo para por lo menos una de estas entradas.",
    errorPrefix: "Error: ",
    warningPrefix: "Aviso: ",
    noSpace: "No pueden haber espacios en esta entrada.",
    reqChkByNode: "No hay elementos seleccionados.",
    requiredChk: "Este campo es obligatorio.",
    reqChkByName: "Por favor selecciona una {label}.",
    match: "Este campo necesita coincidir con el campo {matchName}",
    startDate: "la fecha de inicio",
    endDate: "la fecha de fin",
    currendDate: "la fecha actual",
    afterDate: "La fecha debe ser igual o posterior a {label}.",
    beforeDate: "La fecha debe ser igual o anterior a {label}.",
    startMonth: "Por favor selecciona un mes de origen",
    sameMonth: "Estas dos fechas deben estar en el mismo mes - debes cambiar una u otra."
});
MooTools.lang.set("sv-SE", "Form.Validator", {
    required: "Fältet är obligatoriskt.",
    minLength: "Ange minst {minLength} tecken (du angav {length} tecken).",
    maxLength: "Ange högst {maxLength} tecken (du angav {length} tecken). ",
    integer: "Ange ett heltal i fältet. Tal med decimaler (t.ex. 1,25) är inte tillåtna.",
    numeric: 'Ange endast numeriska värden i detta fält (t.ex. "1" eller "1.1" eller "-1" eller "-1,1").',
    digits: "Använd endast siffror och skiljetecken i detta fält (till exempel ett telefonnummer med bindestreck tillåtet).",
    alpha: "Använd endast bokstäver (a-ö) i detta fält. Inga mellanslag eller andra tecken är tillåtna.",
    alphanum: "Använd endast bokstäver (a-ö) och siffror (0-9) i detta fält. Inga mellanslag eller andra tecken är tillåtna.",
    dateSuchAs: "Ange ett giltigt datum som t.ex. {date}",
    dateInFormatMDY: 'Ange ett giltigt datum som t.ex. YYYY-MM-DD (i.e. "1999-12-31")',
    email: 'Ange en giltig e-postadress. Till exempel "erik@domain.com".',
    url: "Ange en giltig webbadress som http://www.google.com.",
    currencyDollar: "Ange en giltig belopp. Exempelvis 100,00.",
    oneRequired: "Vänligen ange minst ett av dessa alternativ.",
    errorPrefix: "Fel: ",
    warningPrefix: "Varning: ",
    noSpace: "Det får inte finnas några mellanslag i detta fält.",
    reqChkByNode: "Inga objekt är valda.",
    requiredChk: "Detta är ett obligatoriskt fält.",
    reqChkByName: "Välj en {label}.",
    match: "Detta fält måste matcha {matchName}",
    startDate: "startdatumet",
    endDate: "slutdatum",
    currendDate: "dagens datum",
    afterDate: "Datumet bör vara samma eller senare än {label}.",
    beforeDate: "Datumet bör vara samma eller tidigare än {label}.",
    startMonth: "Välj en start månad",
    sameMonth: "Dessa två datum måste vara i samma månad - du måste ändra det ena eller det andra."
});
MooTools.lang.set("uk-UA", "Form.Validator", {
    required: "Це поле повинне бути заповненим.",
    minLength: "Введіть хоча б {minLength} символів (Ви ввели {length}).",
    maxLength: "Кількість символів не може бути більше {maxLength} (Ви ввели {length}).",
    integer: "Введіть в це поле число. Дробові числа (наприклад 1.25) не дозволені.",
    numeric: 'Введіть в це поле число (наприклад "1" або "1.1", або "-1", або "-1.1").',
    digits: "В цьому полі ви можете використовувати лише цифри і знаки пунктіації (наприклад, телефонний номер з знаками дефізу або з крапками).",
    alpha: "В цьому полі можна використовувати лише латинські літери (a-z). Пробіли і інші символи заборонені.",
    alphanum: "В цьому полі можна використовувати лише латинські літери (a-z) і цифри (0-9). Пробіли і інші символи заборонені.",
    dateSuchAs: "Введіть коректну дату {date}.",
    dateInFormatMDY: 'Введіть дату в форматі ММ/ДД/РРРР (наприклад "12/31/2009").',
    email: 'Введіть коректну адресу електронної пошти (наприклад "name@domain.com").',
    url: "Введіть коректне інтернет-посилання (наприклад http://www.google.com).",
    currencyDollar: 'Введіть суму в доларах (наприклад "$100.00").',
    oneRequired: "Заповніть одне з полів.",
    errorPrefix: "Помилка: ",
    warningPrefix: "Увага: "
});
Request.HTML = new Class({
    Extends: Request,
    options: {
        update: false,
        append: false,
        evalScripts: true,
        filter: false
    },
    processHTML: function(text) {
        var match = text.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
        text = (match) ? match[1] : text;
        var container = new Element('div');
        return $try(function() {
            var root = '<root>' + text + '</root>',
            doc;
            if (Browser.Engine.trident) {
                doc = new ActiveXObject('Microsoft.XMLDOM');
                doc.async = false;
                doc.loadXML(root);
            } else {
                doc = new DOMParser().parseFromString(root, 'text/xml');
            }
            root = doc.getElementsByTagName('root')[0];
            if (!root) return null;
            for (var i = 0, k = root.childNodes.length; i < k; i++) {
                var child = Element.clone(root.childNodes[i], true, true);
                if (child) container.grab(child);
            }
            return container;
        }) || container.set('html', text);
    },
    success: function(text) {
        var options = this.options,
        response = this.response;
        response.html = text.stripScripts(function(script) {
            response.javascript = script;
        });
        var tempEl = new Element('div');
        var scripts = text.match(/<script[^>]*>([\s\S]*?)<\/script>/gi);
        for (var i = 0; scripts && i < scripts.length; i++) {
            var script = scripts[i];
            if (script.indexOf('src') == -1) continue;
            tempEl.empty();
            tempEl.set('html', script.replace(/<script/gi, '<div').replace(/<\/script>/gi, '</div>'));
            new Request({
                url: tempEl.getElement('div').get('src'),
                async: false,
                evalResponse: true,
                method: 'get'
            }).send();
        }
        var temp = this.processHTML(response.html);
        response.tree = temp.childNodes;
        response.elements = temp.getElements('*');
        if (options.filter) response.tree = response.elements.filter(options.filter);
        if (options.update) document.id(options.update).empty().set('html', response.html);
        else if (options.append) document.id(options.append).adopt(temp.getChildren());
        if (options.evalScripts) $exec(response.javascript);
        this.onSuccess(response.tree, response.elements, response.html, response.javascript);
    }
});
if (document.documentElement.getBoundingClientRect) {
    Element.implement({
        getOffsets: function() {
            var bound = this.getBoundingClientRect(),
            html = $(this.getDocument().documentElement),
            htmlScroll = html.getScroll(),
            elemScrolls = this.getScrolls(),
            elemScroll = this.getScroll(),
            isFixed = (this.getComputedStyle('position') == 'fixed');
            return {
                x: bound.left.toInt() + elemScrolls.x - elemScroll.x + ((isFixed) ? 0: htmlScroll.x) - html.clientLeft,
                y: bound.top.toInt() + elemScrolls.y - elemScroll.y + ((isFixed) ? 0: htmlScroll.y) - html.clientTop
            };
        }
    });
}
if (!Mif) var Mif = {};
if (!Mif.ids) Mif.ids = {};
if (!Mif.id) Mif.id = function(id) {
    return Mif.ids[id];
}
Mif.Tree = new Class({
    Implements: [new Events, new Options],
    options: {
        types: {},
        forest: false,
        animateScroll: true,
        height: 18,
        expandTo: true,
        selectable: ['input']
    },
    initialize: function(options) {
        this.setOptions(options);
        $extend(this, {
            types: this.options.types,
            forest: this.options.forest,
            animateScroll: this.options.animateScroll,
            dfltType: this.options.dfltType,
            height: this.options.height,
            container: $(options.container),
            UID: 0,
            key: {},
            expanded: []
        });
        this.defaults = {
            name: '',
            cls: '',
            openIcon: 'mif-tree-empty-icon',
            closeIcon: 'mif-tree-empty-icon',
            loadable: false,
            hidden: false,
            selectClass: options.selectClass
        };
        this.dfltState = {
            open: false
        };
        this.$index = [];
        this.updateOpenState();
        if (this.options.expandTo) this.initExpandTo();
        Mif.Tree.UID++;
        this.DOMidPrefix = 'mif-tree-';
        this.wrapper = new Element('div').addClass('mif-tree-wrapper').injectInside(this.container);
        this.initEvents();
        this.initScroll();
        this.initSelection();
        this.initHover();
        this.addEvent('drawChildren', 
        function(parent) {
            var nodes = parent._toggle || [];
            for (var i = 0, l = nodes.length; i < l; i++) {
                nodes[i].drawToggle();
            }
            parent._toggle = [];
        });
        if (MooTools.version >= '1.2.2' && this.options.initialize) this.options.initialize.call(this);
    },
    initEvents: function() {
        this.wrapper.addEvents({
            mousemove: this.mouse.bindWithEvent(this),
            mouseover: this.mouse.bindWithEvent(this),
            mouseout: this.mouse.bindWithEvent(this),
            mouseleave: this.mouseleave.bind(this),
            mousedown: function(event) {
                this.fireEvent('mousedown');
                return this.stopSelection(event);
            }.bind(this),
            click: this.toggleClick.bindWithEvent(this),
            dblclick: this.toggleDblclick.bindWithEvent(this)
        });
        if (Browser.Engine.trident) {
            this.wrapper.addEvent('selectstart', this.stopSelection.bind(this));
        }
        this.container.addEvent('click', this.focus.bind(this));
        document.addEvent('click', this.blurOnClick.bind(this));
        document.addEvents({
            keydown: this.keyDown.bindWithEvent(this),
            keyup: this.keyUp.bindWithEvent(this)
        });
    },
    stopSelection: function(event) {
        var target = $(event.target);
        var selectable = this.options.selectable;
        for (var i = 0, l = selectable.length; i < l; i++) {
            if (target.match(selectable[i])) return true;
        }
        return false;
    },
    blurOnClick: function(event) {
        var target = event.target;
        while (target) {
            if (target == this.container) return;
            target = target.parentNode;
        }
        this.blur();
    },
    focus: function() {
        if (this.focused) return this;
        this.focused = true;
        this.container.addClass('mif-tree-focused');
        return this.fireEvent('focus');
    },
    blur: function() {
        if (!this.focused) return this;
        this.focused = false;
        this.container.removeClass('mif-tree-focused');
        return this.fireEvent('blur');
    },
    $getIndex: function() {
        this.$index = [];
        var node = this.forest ? this.root.getFirst() : this.root;
        var previous = node;
        while (node) {
            if (! (previous.hidden && previous.contains(node))) {
                if (!node.hidden) this.$index.push(node);
                previous = node;
            }
            node = node._getNextVisible();
        }
    },
    mouseleave: function() {
        this.mouse.coords = {
            x: null,
            y: null
        };
        this.mouse.target = false;
        this.mouse.node = false;
        if (this.hover) this.hover();
    },
    mouse: function(event) {
        this.mouse.coords = this.getCoords(event);
        var target = this.getTarget(event);
        this.mouse.target = target.target;
        this.mouse.node = target.node;
        var myNode = target.node;
        if (!myNode)
        return;
        if (event.type == "mouseover") {
            if (this.onMouseover) {
                this.onMouseover(myNode, event);
            }
        } else if (event.type == "mouseout") {
            if (this.onMouseout) {
                this.onMouseout(myNode, event);
            }
        }
    },
    getTarget: function(event) {
        var target = event.target,
        node;
        while (!/mif-tree/.test(target.className)) {
            target = target.parentNode;
        }
        var test = target.className.match(/mif-tree-(gadjet)-[^n]|mif-tree-(icon)|mif-tree-(name)|mif-tree-(checkbox)/);
        if (!test) {
            var y = this.mouse.coords.y;
            if (y == -1 || !this.$index) {
                node = false;
            } else {
                node = this.$index[((y) / this.height).toInt()];
            }
            return {
                node: node,
                target: 'node'
            };
        }
        for (var i = 5; i > 0; i--) {
            if (test[i]) {
                var type = test[i];
                break;
            }
        }
        return {
            node: Mif.Tree.Nodes[target.getAttribute('uid')],
            target: type
        };
    },
    getCoords: function(event) {
        var position = this.wrapper.getPosition();
        var x = event.client.x - position.x;
        var y = event.client.y - position.y;
        var wrapper = this.wrapper;
        if ((y - wrapper.scrollTop > wrapper.clientHeight) || (x - wrapper.scrollLeft > wrapper.clientWidth)) {
            y = -1;
        };
        return {
            x: x,
            y: y
        };
    },
    keyDown: function(event) {
        this.key = event;
        this.key.state = 'down';
        if (this.focused) this.fireEvent('keydown', [event]);
    },
    keyUp: function(event) {
        this.key = {};
        this.key.state = 'up';
        if (this.focused) this.fireEvent('keyup', [event]);
    },
    toggleDblclick: function(event) {
        var target = this.mouse.target;
        if (! (target == 'name' || target == 'icon')) return;
        this.mouse.node.toggle();
        try {
            if (this.onDbClick) {
                this.onDbClick(this.mouse.node);
            } else {}
        } catch(ex) {
            debug(ex.name + ";" + ex.message);
        }
    },
    toggleClick: function(event) {
        if (this.mouse.target == 'checkbox') return;
        if (this.mouse.target == 'name' || this.mouse.target == 'icon') {
            if (this.onClick && this.mouse.node)
            this.onClick(this.mouse.node);
            return;
        }
        if (this.mouse.node) {
            this.mouse.node.toggle();
        }
    },
    initScroll: function() {
        this.scroll = new Fx.Scroll(this.wrapper, {
            link: 'cancel'
        });
    },
    scrollTo: function(node) {
        var position = node.getVisiblePosition();
        var top = position * this.height;
        var up = top < this.wrapper.scrollTop;
        var down = top > (this.wrapper.scrollTop + this.wrapper.clientHeight - this.height);
        if (position == -1 || (!up && !down)) {
            this.scroll.fireEvent('complete');
            return false;
        }
        if (this.animateScroll) {
            this.scroll.start(this.wrapper.scrollLeft, top - (down ? this.wrapper.clientHeight - this.height: this.height));
        } else {
            this.scroll.set(this.wrapper.scrollLeft, top - (down ? this.wrapper.clientHeight - this.height: this.height));
            this.scroll.fireEvent('complete');
        }
    },
    updateOpenState: function() {
        this.addEvents({
            'drawChildren': function(parent) {
                var children = parent.children;
                for (var i = 0, l = children.length; i < l; i++) {
                    children[i].updateOpenState();
                }
            },
            'drawRoot': function() {
                this.root.updateOpenState();
            }
        });
    },
    expandTo: function(node) {
        if (!node) return this;
        var path = [];
        while (!node.isRoot() && !(this.forest && node.getParent().isRoot())) {
            node = node.getParent();
            if (!node) break;
            path.unshift(node);
        };
        path.each(function(el) {
            el.toggle(true)
        });
        return this;
    },
    initExpandTo: function() {
        this.addEvent('loadChildren', 
        function(parent) {
            if (!parent) return;
            var children = parent.children;
            for (var i = children.length; i--;) {
                var child = children[i];
                if (child.expandTo) this.expanded.push(child);
            }
        });
        function expand() {
            this.expanded.each(function(node) {
                this.expandTo(node);
            },
            this);
            this.expanded = [];
        };
        this.addEvents({
            'load': expand.bind(this),
            'loadNode': expand.bind(this)
        });
    }
});
Mif.Tree.UID = 0;
Mif.Tree.version = '1.2dev';
Array.implement({
    inject: function(added, current, where) {
        var pos = this.indexOf(current) + (where == 'before' ? 0: 1);
        for (var i = this.length - 1; i >= pos; i--) {
            this[i + 1] = this[i];
        }
        this[pos] = added;
        return this;
    }
});
Mif.Tree.implement({
    TreeNodesHash: {},
    getNodeById: function(id) {
        return this.TreeNodesHash[id];
    },
    getNodeLevelById: function(id, level) {
        var noteTemp = this.getNodeById(id);
        var pn = this.getNodeById(noteTemp.parentId);
        if (pn == null) {
            return level;
        } else {
            level = level + 1;
            return this.getNodeLevelById(pn.id, level);
        }
    },
    selectButNotFireById: function(id) {
        var preventFocus = true;
        if (!preventFocus && (Browser.Engine.gecko || Browser.Engine.webkit)) {
            this.wrapper.focus();
        }
        var a = this.getNodeById(id);
        if (!a) {
            return;
        }
        this.expandTo(a);
        var current = this.selected;
        if (current == a) return this;
        if (current) {
            current.select(false);
        }
        this.selected = a;
        a.select(true);
        return this;
    },
    checkNodesByIds: function(idsStr) {
        if (!idsStr || idsStr.trim() == "") {
            return;
        }
        var ids = idsStr.split(",");
        for (var i = 0; i < ids.length; i++) {
            var node = this.getNodeById(ids[i]);
            if (node) {
                this.expandTo(node);
                node['switch']();
            }
        }
    }
});
Mif.Tree.Node = new Class({
    Implements: [Events],
    initialize: function(structure, options) {
        $extend(this, structure);
        this.children = [];
        this.type = options.type || this.tree.dfltType;
        this.property = options.property || {};
        this.data = options.data;
        this.state = $extend($unlink(this.tree.dfltState), options.state);
        this.$calculate();
        this.UID = Mif.Tree.Node.UID++;
        Mif.Tree.Nodes[this.UID] = this;
        var id = this.id;
        if (id != null) Mif.ids[id] = this;
        this.tree.TreeNodesHash[this.id] = this;
        this.tree.fireEvent('nodeCreate', [this]);
        this._property = ['id', 'name', 'cls', 'openIcon', 'closeIcon', 'openIconUrl', 'closeIconUrl', 'hidden'];
    },
    $calculate: function() {
        $extend(this, $unlink(this.tree.defaults));
        this.type = $splat(this.type);
        this.type.each(function(type) {
            var props = this.tree.types[type];
            if (props) $extend(this, props);
        },
        this);
        $extend(this, this.property);
        return this;
    },
    getDOM: function(what) {
        var node = $(this.tree.DOMidPrefix + this.UID);
        if (what == 'node') return node;
        var wrapper = node.getFirst();
        if (what == 'wrapper') return wrapper;
        if (what == 'children') return wrapper.getNext();
        return wrapper.getElement('.mif-tree-' + what);
    },
    getGadjetType: function() {
        var a = (this.loadable && !this.isLoaded()) ? 'plus': (this.hasChildren() ? (this.isOpen() ? 'minus': 'plus') : 'none');
        if (a == "none" && this.isRoot()) a = "minus";
        return a;
    },
    toggle: function(state) {
        if (this.state.open == state || this.$loading || this.$toggling) return this;
        var parent = this.getParent();
        function toggle(type) {
            this.state.open = !this.state.open;
            if (type == 'drawed') {
                this.drawToggle();
            } else {
                parent._toggle = (parent._toggle || [])[this.state.open ? 'include': 'erase'](this)
            }
            this.fireEvent('toggle', [this.state.open]);
            this.tree.fireEvent('toggle', [this, this.state.open]);
            return this;
        }
        if (parent && !parent.$draw) {
            return toggle.apply(this, []);
        }
        if (this.loadable && !this.state.loaded) {
            if (!this.load_event) {
                this.load_event = true;
                this.addEvent('load', 
                function() {
                    this.toggle();
                }.bind(this));
            }
            return this.load();
        }
        if (!this.hasChildren()) return this;
        return toggle.apply(this, ['drawed']);
    },
    drawToggle: function() {
        this.tree.$getIndex();
        Mif.Tree.Draw.update(this);
    },
    recursive: function(fn, args) {
        args = $splat(args);
        if (fn.apply(this, args) !== false) {
            this.children.each(function(node) {
                if (node.recursive(fn, args) === false) {
                    return false;
                }
            });
        }
        return this;
    },
    isOpen: function() {
        return this.state.open;
    },
    isLoaded: function() {
        return this.state.loaded;
    },
    isLast: function() {
        if (this.parentNode == null || this.parentNode.children.getLast() == this) return true;
        return false;
    },
    isFirst: function() {
        if (this.parentNode == null || this.parentNode.children[0] == this) return true;
        return false;
    },
    isRoot: function() {
        return this.parentNode == null ? true: false;
    },
    getChildren: function() {
        return this.children;
    },
    hasChildren: function() {
        return this.children.length ? true: false;
    },
    index: function() {
        if (this.isRoot()) return 0;
        return this.parentNode.children.indexOf(this);
    },
    getNext: function() {
        if (this.isLast()) return null;
        return this.parentNode.children[this.index() + 1];
    },
    getPrevious: function() {
        if (this.isFirst()) return null;
        return this.parentNode.children[this.index() - 1];
    },
    getFirst: function() {
        if (!this.hasChildren()) return null;
        return this.children[0];
    },
    getLast: function() {
        if (!this.hasChildren()) return null;
        return this.children.getLast();
    },
    getParent: function() {
        return this.parentNode;
    },
    _getNextVisible: function() {
        var current = this;
        if (current.isRoot()) {
            if (!current.isOpen() || !current.hasChildren(true)) return false;
            return current.getFirst(true);
        } else {
            if (current.isOpen() && current.getFirst(true)) {
                return current.getFirst(true);
            } else {
                var parent = current;
                do {
                    current = parent.getNext(true);
                    if (current) return current;
                }
                while (parent = parent.parentNode);
                return false;
            }
        }
    },
    getPreviousVisible: function() {
        var index = this.tree.$index.indexOf(this);
        return index == 0 ? null: this.tree.$index[index - 1];
    },
    getNextVisible: function() {
        var index = this.tree.$index.indexOf(this);
        return index < this.tree.$index.length - 1 ? this.tree.$index[index + 1] : null;
    },
    getVisiblePosition: function() {
        return this.tree.$index.indexOf(this);
    },
    hasVisibleChildren: function() {
        if (!this.hasChildren()) return false;
        if (this.isOpen()) {
            var next = this.getNextVisible();
            if (!next) return false;
            if (next.parentNode != this) return false;
            return true;
        } else {
            var child = this.getFirst();
            while (child) {
                if (!child.hidden) return true;
                child = child.getNext();
            }
            return false;
        }
    },
    isLastVisible: function() {
        var next = this.getNext();
        while (next) {
            if (!next.hidden) return false;
            next = next.getNext();
        };
        return true;
    },
    contains: function(node) {
        while (node) {
            if (node == this) return true;
            node = node.parentNode;
        };
        return false;
    },
    addType: function(type) {
        return this.processType(type, 'add');
    },
    removeType: function(type) {
        return this.processType(type, 'remove');
    },
    setType: function(type) {
        return this.processType(type, 'set');
    },
    processType: function(type, action) {
        switch (action) {
        case 'add':
            this.type.include(type);
            break;
        case 'remove':
            this.type.erase(type);
            break;
        case 'set':
            this.type = type;
            break;
        }
        var current = {};
        this._property.each(function(p) {
            current[p] = this[p];
        },
        this);
        this.$calculate();
        this._property.each(function(p) {
            this.updateProperty(p, current[p], this[p]);
        },
        this);
        return this;
    },
    set: function(obj) {
        this.tree.fireEvent('beforeSet', [this, obj]);
        var property = obj.property || obj || {};
        for (var p in property) {
            var nv = property[p];
            var cv = this[p];
            this.updateProperty(p, cv, nv);
            this[p] = this.property[p] = nv;
        }
        this.tree.fireEvent('set', [this, obj]);
        return this;
    },
    updateProperty: function(p, cv, nv) {
        if (nv == cv) return this;
        if (p == 'id') {
            delete Mif.ids[cv];
            if (nv) Mif.ids[nv] = this;
            return this;
        }
        if (!Mif.Tree.Draw.isUpdatable(this)) return this;
        switch (p) {
        case 'name':
            this.getDOM('name').set('html', nv);
            return this;
        case 'cls':
            this.getDOM('wrapper').removeClass(cv).addClass(nv);
            return this;
        case 'openIcon':
        case 'closeIcon':
            this.getDOM('icon').removeClass(cv).addClass(nv);
            return this;
        case 'openIconUrl':
        case 'closeIconUrl':
            var icon = this.getDOM('icon');
            icon.setStyle('background-image', 'none');
            if (nv) icon.setStyle('background-image', 'url(' + nv + ')');
            return this;
        case 'hidden':
            this.getDOM('node').setStyle('display', nv ? 'none': 'block');
            var _previous = this.getPreviousVisible();
            var _next = this.getNextVisible();
            var parent = this.getParent();
            this[p] = this.property[p] = nv;
            this.tree.$getIndex();
            var previous = this.getPreviousVisible();
            var next = this.getNextVisible(); [_previous, _next, previous, next, parent].each(function(node) {
                Mif.Tree.Draw.update(node);
            });
            return this;
        }
    },
    updateOpenState: function() {
        if (this.state.open) {
            this.state.open = false;
            this.toggle();
        }
    }
});
Mif.Tree.Node.UID = 0;
Mif.Tree.Nodes = {};
Mif.Tree.implement({
    initHover: function() {
        this.defaults.hoverClass = '';
        this.wrapper.addEvent('mousemove', this.hover.bind(this));
        this.wrapper.addEvent('mouseout', this.hover.bind(this));
        this.defaultHoverState = {
            gadjet: false,
            checkbox: false,
            icon: false,
            name: false,
            node: false
        };
        this.hoverState = $unlink(this.defaultHoverState);
    },
    hover: function() {
        var cnode = this.mouse.node;
        var ctarget = this.mouse.target;
        $each(this.hoverState, 
        function(node, target, state) {
            try {
                if (node == cnode && (target == 'node' || target == ctarget)) return;
                if (node) {
                    Mif.Tree.Hover.out(node, target);
                    state[target] = false;
                    this.fireEvent('hover', [node, target, 'out']);
                }
                if (cnode && (target == 'node' || target == ctarget)) {
                    Mif.Tree.Hover.over(cnode, target);
                    state[target] = cnode;
                    this.fireEvent('hover', [cnode, target, 'over']);
                } else {
                    state[target] = false;
                }
            } catch(ex) {}
        },
        this);
    },
    updateHover: function() {
        this.hoverState = $unlink(this.defaultHoverState);
        this.hover();
    }
});
Mif.Tree.Hover = {
    over: function(node, target) {
        var wrapper = node.getDOM('wrapper');
        wrapper.addClass((node.hoverClass || 'mif-tree-hover') + '-' + target);
        if (node.state.selected) wrapper.addClass((node.hoverClass || 'mif-tree-hover') + '-selected-' + target);
    },
    out: function(node, target) {
        var wrapper = node.getDOM('wrapper');
        wrapper.removeClass((node.hoverClass || 'mif-tree-hover') + '-' + target).removeClass((node.hoverClass || 'mif-tree-hover') + '-selected-' + target);
    }
};
Mif.Tree.implement({
    initSelection: function() {
        this.defaults.selectClass = this.defaults.selectClass || '';
        this.wrapper.addEvent('mousedown', this.attachSelect.bindWithEvent(this));
    },
    attachSelect: function(event) {
        if (! ['icon', 'name', 'node'].contains(this.mouse.target)) return;
        var node = this.mouse.node;
        if (!node) return;
        this.select(node);
    },
    select: function(node) {
        if (!node) return this;
        var current = this.selected;
        if (current == node) {
            this.fireEvent('select', [node]).fireEvent('selectChange', [node, true]);
            return this;
        } else {
            if (current) {
                current.select(false);
                this.fireEvent('unSelect', [current]).fireEvent('selectChange', [current, false]);
            }
            this.selected = node;
            node.select(true);
            this.fireEvent('select', [node]).fireEvent('selectChange', [node, true]);
            return this;
        }
    },
    unselect: function() {
        var current = this.selected;
        if (!current) return this;
        this.selected = false;
        current.select(false);
        this.fireEvent('unSelect', [current]).fireEvent('selectChange', [current, false]);
        return this;
    },
    getSelected: function() {
        return this.selected;
    },
    isSelected: function(node) {
        return node.isSelected();
    }
});
Mif.Tree.Node.implement({
    select: function(state) {
        this.state.selected = state;
        if (!Mif.Tree.Draw.isUpdatable(this)) return;
        var wrapper = this.getDOM('wrapper');
        wrapper[(state ? 'add': 'remove') + 'Class'](this.selectClass || 'mif-tree-node-selected');
    },
    isSelected: function() {
        return this.state.selected;
    }
});
Mif.Tree.Load = {
    children: function(children, parent, tree) {
        for (var i = children.length; i--;) {
            var child = children[i];
            var subChildren = child.children;
            var node = new Mif.Tree.Node({
                tree: tree,
                parentNode: parent || undefined
            },
            child);
            if (tree.forest || parent != undefined) {
                parent.children.unshift(node);
            } else {
                tree.root = node;
            }
            if (subChildren && subChildren.length) {
                arguments.callee(subChildren, node, tree);
            }
        }
        if (parent) parent.state.loaded = true;
        tree.fireEvent('loadChildren', parent);
    }
};
Mif.Tree.implement({
    load: function(options) {
        var tree = this;
        this.loadOptions = this.loadOptions || $lambda({});
        function success(json) {
            if (tree.forest) {
                tree.root = new Mif.Tree.Node({
                    tree: tree,
                    parentNode: null
                },
                {});
                var parent = tree.root;
            } else {
                var parent = null;
            }
            Mif.Tree.Load.children(json, parent, tree);
            Mif.Tree.Draw[tree.forest ? 'forestRoot': 'root'](tree);
            tree.$getIndex();
            tree.fireEvent('load');
            return tree;
        }
        options = $extend($extend({
            isSuccess: $lambda(true),
            secure: true,
            onSuccess: success,
            method: 'get'
        },
        this.loadOptions()), options);
        if (options.json) return success(options.json);
        new Request.JSON(options).send();
        return this;
    }
});
Mif.Tree.Node.implement({
    load: function(options) {
        this.$loading = true;
        options = options || {};
        this.addType('loader');
        var self = this;
        function success(json) {
            Mif.Tree.Load.children(json, self, self.tree);
            delete self.$loading;
            self.state.loaded = true;
            self.removeType('loader');
            Mif.Tree.Draw.update(self);
            self.fireEvent('load');
            self.tree.fireEvent('loadNode', self);
            return self;
        }
        options = $extend($extend($extend({
            isSuccess: $lambda(true),
            secure: true,
            onSuccess: success,
            method: 'get'
        },
        this.tree.loadOptions(this)), this.loadOptions), options);
        if (options.json) return success(options.json);
        new Request.JSON(options).send();
        return this;
    }
});
Mif.Tree.Draw = {
    getHTML: function(node, html) {
        var prefix = node.tree.DOMidPrefix;
        if ($defined(node.state.checked)) {
            if (!node.hasCheckbox) node.state.checked = 'nochecked';
            var checkbox = '<span class="mif-tree-checkbox mif-tree-node-' + node.state.checked + '" uid="' + node.UID + '">' + Mif.Tree.Draw.zeroSpace + '</span>';
        } else {
            var checkbox = '';
        }
        html = html || [];
        var nodeClass = node.isLast() ? 'mif-tree-node-last': '';
        if (node.isRoot()) {
            nodeClass = 'mif-tree-node-last-root';
        }
        html.push('<div class="mif-tree-node ', (node.isLast() ? 'mif-tree-node-last': ''), '"' + (node.hidden ? ' style="display:none"': '') + ' id="', prefix, node.UID, '">', '<span class="', node.cls, ' mif-tree-node-wrapper', (node.state.selected ? ' mif-tree-node-selected': ''), '" uid="', node.UID, '">', '<span class="mif-tree-gadjet mif-tree-gadjet-', node.getGadjetType(), '" uid="', node.UID, '">', Mif.Tree.Draw.zeroSpace, '</span>', checkbox, '<span class="mif-tree-icon ', (node.closeIconUrl ? '" style="background-image: url(' + node.closeIconUrl + ')" ': node.closeIcon + '"'), ' uid="', node.UID, '">', Mif.Tree.Draw.zeroSpace, '</span>', '<span class="mif-tree-name" uid="', node.UID, '">', node.name, '</span>', '</span>', '<div class="mif-tree-children" style="display:none"></div>', '</div>');
        return html;
    },
    children: function(parent, container) {
        parent.open = true;
        parent.$draw = true;
        var html = [];
        var children = parent.children;
        for (var i = 0, l = children.length; i < l; i++) {
            this.getHTML(children[i], html);
        }
        container = container || parent.getDOM('children');
        container.set('html', html.join(''));
        parent.tree.fireEvent('drawChildren', [parent]);
    },
    root: function(tree) {
        var domRoot = this.node(tree.root);
        domRoot.injectInside(tree.wrapper);
        tree.$draw = true;
        tree.fireEvent('drawRoot');
    },
    forestRoot: function(tree) {
        var container = new Element('div').addClass('mif-tree-children-root').injectInside(tree.wrapper);
        Mif.Tree.Draw.children(tree.root, container);
    },
    node: function(node) {
        return new Element('div').set('html', this.getHTML(node).join('')).getFirst();
    },
    isUpdatable: function(node) {
        if ((!node || !node.tree) || (node.getParent() && !node.getParent().$draw) || (node.isRoot() && (!node.tree.$draw || node.tree.forest))) return false;
        return true;
    },
    update: function(node) {
        if (!this.isUpdatable(node)) return;
        if (!node.hasChildren()) node.state.open = false;
        node.getDOM('gadjet').className = 'mif-tree-gadjet mif-tree-gadjet-' + node.getGadjetType();
        if (node.closeIconUrl) {
            node.getDOM('icon').setStyle('background-image', 'url(' + (node.isOpen() ? node.openIconUrl: node.closeIconUrl) + ')');
        } else {
            node.getDOM('icon').className = 'mif-tree-icon ' + node[node.isOpen() ? 'openIcon': 'closeIcon'];
        }
        node.getDOM('node')[(node.isLastVisible() ? 'add': 'remove') + 'Class']('mif-tree-node-last');
        if (node.$loading) return;
        var children = node.getDOM('children');
        if (node.isOpen()) {
            if (!node.$draw) Mif.Tree.Draw.children(node);
            children.style.display = 'block';
        } else {
            children.style.display = 'none';
        }
        node.tree.fireEvent('updateNode', node);
        return node;
    },
    inject: function(node, element) {
        if (!this.isUpdatable(node)) return;
        element = element || node.getDOM('node') || this.node(node);
        var previous = node.getPrevious();
        if (previous) {
            element.injectAfter(previous.getDOM('node'));
            return;
        }
        var container;
        if (node.tree.forest && node.parentNode.isRoot()) {
            container = node.tree.wrapper.getElement('.mif-tree-children-root');
        } else if (node.tree.root == node) {
            container = node.tree.wrapper;
        } else {
            container = node.parentNode.getDOM('children');
        }
        element.injectTop(container);
    }
};
Mif.Tree.Draw.zeroSpace = Browser.Engine.trident ? '&shy;': (Browser.Engine.webkit ? '&#8203': '');
Mif.Tree.KeyNav = new Class({
    initialize: function(tree) {
        this.tree = tree;
        this.bound = {
            action: this.action.bind(this),
            attach: this.attach.bind(this),
            detach: this.detach.bind(this)
        }
        tree.addEvents({
            'focus': this.bound.attach,
            'blur': this.bound.detach
        });
    },
    attach: function() {
        var event = Browser.Engine.trident || Browser.Engine.webkit ? 'keydown': 'keypress';
        document.addEvent(event, this.bound.action);
    },
    detach: function() {
        var event = Browser.Engine.trident || Browser.Engine.webkit ? 'keydown': 'keypress';
        document.removeEvent(event, this.bound.action);
    },
    action: function(event) {
        if (! ['down', 'left', 'right', 'up', 'pgup', 'pgdown', 'end', 'home'].contains(event.key)) return;
        var tree = this.tree;
        if (!tree.selected) {
            tree.select(tree.forest ? tree.root.getFirst() : tree.root);
        } else {
            var current = tree.selected;
            switch (event.key) {
            case 'down':
                this.goForward(current);
                event.stop();
                break;
            case 'up':
                this.goBack(current);
                event.stop();
                break;
            case 'left':
                this.goLeft(current);
                event.stop();
                break;
            case 'right':
                this.goRight(current);
                event.stop();
                break;
            case 'home':
                this.goStart(current);
                event.stop();
                break;
            case 'end':
                this.goEnd(current);
                event.stop();
                break;
            case 'pgup':
                this.goPageUp(current);
                event.stop();
                break;
            case 'pgdown':
                this.goPageDown(current);
                event.stop();
                break;
            }
        }
        tree.scrollTo(tree.selected);
    },
    goForward: function(current) {
        var forward = current.getNextVisible();
        if (forward) this.tree.select(forward)
    },
    goBack: function(current) {
        var back = current.getPreviousVisible();
        if (back) this.tree.select(back);
    },
    goLeft: function(current) {
        if (current.isRoot()) {
            if (current.isOpen()) {
                current.toggle();
            } else {
                return false;
            }
        } else {
            if (current.hasChildren(true) && current.isOpen()) {
                current.toggle();
            } else {
                if (current.tree.forest && current.getParent().isRoot()) return false;
                return this.tree.select(current.getParent());
            }
        }
    },
    goRight: function(current) {
        if (!current.hasChildren(true) && !current.loadable) {
            return false;
        } else if (!current.isOpen()) {
            return current.toggle();
        } else {
            return this.tree.select(current.getFirst(true));
        }
    },
    goStart: function() {
        this.tree.select(this.tree.$index[0]);
    },
    goEnd: function() {
        this.tree.select(this.tree.$index.getLast());
    },
    goPageDown: function(current) {
        var tree = this.tree;
        var count = (tree.container.clientHeight / tree.height).toInt() - 1;
        var newIndex = Math.min(tree.$index.indexOf(current) + count, tree.$index.length - 1);
        tree.select(tree.$index[newIndex]);
    },
    goPageUp: function(current) {
        var tree = this.tree;
        var count = (tree.container.clientHeight / tree.height).toInt() - 1;
        var newIndex = Math.max(tree.$index.indexOf(current) - count, 0);
        tree.select(tree.$index[newIndex]);
    }
});
Event.Keys.extend({
    'pgdown': 34,
    'pgup': 33,
    'home': 36,
    'end': 35
});
Mif.Tree.implement({
    initSortable: function(sortFunction) {
        this.sortable = true;
        this.sortFunction = sortFunction || 
        function(node1, node2) {
            if (node1.name > node2.name) {
                return 1;
            } else if (node1.name < node2.name) {
                return - 1;
            } else {
                return 0;
            }
        };
        this.addEvent('loadChildren', 
        function(parent) {
            if (parent) parent.sort();
        });
        this.addEvent('structureChange', 
        function(from, to, where, type) {
            from.sort();
        });
        return this;
    }
});
Mif.Tree.Node.implement({
    sort: function(sortFunction) {
        this.children.sort(sortFunction || this.tree.sortFunction);
        return this;
    }
});
Mif.Tree.Node.implement({
    inject: function(node, where, element) {
        where = where || 'inside';
        var parent = this.parentNode;
        function getPreviousVisible(node) {
            var previous = node;
            while (previous) {
                previous = previous.getPrevious();
                if (!previous) return null;
                if (!previous.hidden) return previous;
            }
        }
        var previousVisible = getPreviousVisible(this);
        var type = element ? 'copy': 'move';
        switch (where) {
        case 'after':
        case 'before':
            if (node['get' + (where == 'after' ? 'Next': 'Previous')]() == this) return false;
            if (this.parentNode) {
                this.parentNode.children.erase(this);
            }
            this.parentNode = node.parentNode;
            this.parentNode.children.inject(this, node, where);
            break;
        case 'inside':
            if (node.tree && node.getLast() == this) return false;
            if (this.parentNode) {
                this.parentNode.children.erase(this);
            }
            if (node.tree) {
                if (!node.hasChildren()) {
                    node.$draw = true;
                    node.state.open = true;
                }
                node.children.push(this);
                this.parentNode = node;
            } else {
                node.root = this;
                this.parentNode = null;
                node.fireEvent('drawRoot');
            }
            break;
        }
        var tree = node.tree || node;
        if (this == this.tree.root) {
            this.tree.root = false;
        }
        if (this.tree != tree) {
            var oldTree = this.tree;
            this.recursive(function() {

                this.tree = tree;
            });
        };
        tree.fireEvent('structureChange', [this, node, where, type]);
        tree.$getIndex();
        if (oldTree) oldTree.$getIndex();
        Mif.Tree.Draw.inject(this, element); [node, this, parent, previousVisible, getPreviousVisible(this)].each(function(node) {
            Mif.Tree.Draw.update(node);
        });
        return this;
    },
    copy: function(node, where) {
        if (this.copyDenied) return;
        function copy(structure) {
            var node = structure.node;
            var tree = structure.tree;
            var options = $unlink({
                property: node.property,
                type: node.type,
                state: node.state,
                data: node.data
            });
            options.state.open = false;
            var nodeCopy = new Mif.Tree.Node({
                parentNode: structure.parentNode,
                children: [],
                tree: tree
            },
            options);
            node.children.each(function(child) {
                var childCopy = copy({
                    node: child,
                    parentNode: nodeCopy,
                    tree: tree
                });
                nodeCopy.children.push(childCopy);
            });
            return nodeCopy;
        };
        var nodeCopy = copy({
            node: this,
            parentNode: null,
            tree: node.tree
        });
        return nodeCopy.inject(node, where, Mif.Tree.Draw.node(nodeCopy));
    },
    remove: function() {
        if (this.removeDenied) return;
        this.tree.fireEvent('remove', [this]);
        var parent = this.parentNode,
        previousVisible = this.getPreviousVisible();
        if (parent) {
            parent.children.erase(this);
        } else if (!this.tree.forest) {
            this.tree.root = null;
        }
        this.tree.selected = false;
        this.getDOM('node').destroy();
        this.tree.$getIndex();
        Mif.Tree.Draw.update(parent);
        Mif.Tree.Draw.update(previousVisible);
        this.recursive(function() {
            if (this.id) delete Mif.ids[this.id];
        });
        this.tree.mouse.node = false;
        this.tree.updateHover();
    }
});
Mif.Tree.implement({
    move: function(from, to, where) {
        if (from.inject(to, where)) {
            this.fireEvent('move', [from, to, where]);
        }
        return this;
    },
    copy: function(from, to, where) {
        var copy = from.copy(to, where);
        if (copy) {
            this.fireEvent('copy', [from, to, where, copy]);
        }
        return this;
    },
    remove: function(node) {
        node.remove();
        return this;
    },
    add: function(node, current, where) {
        if (! (node instanceof Mif.Tree.Node)) {
            node = new Mif.Tree.Node({
                parentNode: null,
                tree: this
            },
            node);
        };
        node.inject(current, where, Mif.Tree.Draw.node(node));
        this.fireEvent('add', [node, current, where]);
        return this;
    }
});
Mif.Tree.Drag = new Class({
    Implements: [new Events, new Options],
    Extends: Drag,
    options: {
        group: 'tree',
        droppables: [],
        snap: 4,
        animate: true,
        open: 600,
        scrollDelay: 100,
        scrollSpeed: 100,
        modifier: 'control',
        startPlace: ['icon', 'name'],
        allowContainerDrop: true
    },
    initialize: function(tree, options) {
        tree.drag = this;
        this.setOptions(options);
        $extend(this, {
            tree: tree,
            snap: this.options.snap,
            groups: [],
            droppables: [],
            action: this.options.action
        });
        this.addToGroups(this.options.group);
        this.setDroppables(this.options.droppables);
        $extend(tree.defaults, {
            dropDenied: [],
            dragDisabled: false
        });
        tree.addEvent('drawRoot', 
        function() {
            tree.root.dropDenied.combine(['before', 'after']);
        });
        this.pointer = new Element('div').addClass('mif-tree-pointer').injectInside(tree.wrapper);
        this.current = Mif.Tree.Drag.current;
        this.target = Mif.Tree.Drag.target;
        this.where = Mif.Tree.Drag.where;
        this.element = [this.current, this.target, this.where];
        this.document = tree.wrapper.getDocument();
        this.selection = (Browser.Engine.trident) ? 'selectstart': 'mousedown';
        this.bound = {
            start: this.start.bind(this),
            check: this.check.bind(this),
            drag: this.drag.bind(this),
            stop: this.stop.bind(this),
            cancel: this.cancel.bind(this),
            eventStop: $lambda(false),
            leave: this.leave.bind(this),
            enter: this.enter.bind(this),
            keydown: this.keydown.bind(this)
        };
        this.attach();
        this.addEvent('start', 
        function() {
            Mif.Tree.Drag.dropZone = this;
            this.tree.unselect();
            document.addEvent('keydown', this.bound.keydown);
            this.setDroppables();
            this.droppables.each(function(item) {
                item.getElement().addEvents({
                    mouseleave: this.bound.leave,
                    mouseenter: this.bound.enter
                });
            },
            this);
            Mif.Tree.Drag.current.getDOM('name').addClass('mif-tree-drag-current');
            this.addGhost();
        },
        true);
        this.addEvent('complete', 
        function() {
            document.removeEvent('keydown', this.bound.keydown);
            this.droppables.each(function(item) {
                item.getElement().removeEvent('mouseleave', this.bound.leave).removeEvent('mouseenter', this.bound.enter);
            },
            this);
            Mif.Tree.Drag.current.getDOM('name').removeClass('mif-tree-drag-current');
            var dropZone = Mif.Tree.Drag.dropZone;
            if (!dropZone || dropZone.where == 'notAllowed') {
                Mif.Tree.Drag.startZone.onstop();
                Mif.Tree.Drag.startZone.emptydrop();
                return;
            }
            if (dropZone.onstop) dropZone.onstop();
            dropZone.beforeDrop();
        });
    },
    getElement: function() {
        return this.tree.wrapper;
    },
    addToGroups: function(groups) {
        groups = $splat(groups);
        this.groups.combine(groups);
        groups.each(function(group) {
            Mif.Tree.Drag.groups[group] = (Mif.Tree.Drag.groups[group] || []).include(this);
        },
        this);
    },
    setDroppables: function(droppables) {
        this.droppables.combine($splat(droppables));
        this.groups.each(function(group) {
            this.droppables.combine(Mif.Tree.Drag.groups[group]);
        },
        this);
    },
    attach: function() {
        this.tree.wrapper.addEvent('mousedown', this.bound.start);
        return this;
    },
    detach: function() {
        this.tree.wrapper.removeEvent('mousedown', this.bound.start);
        return this;
    },
    dragTargetSelect: function() {
        function addDragTarget() {
            this.current.getDOM('name').addClass('mif-tree-drag-current');
        }
        function removeDragTarget() {
            this.current.getDOM('name').removeClass('mif-tree-drag-current');
        }
        this.addEvent('start', addDragTarget.bind(this));
        this.addEvent('beforeComplete', removeDragTarget.bind(this));
    },
    leave: function(event) {
        var dropZone = Mif.Tree.Drag.dropZone;
        if (dropZone) {
            dropZone.where = 'notAllowed';
            Mif.Tree.Drag.ghost.firstChild.className = 'mif-tree-ghost-icon mif-tree-ghost-' + dropZone.where;
            if (dropZone.onleave) dropZone.onleave();
            Mif.Tree.Drag.dropZone = false;
        }
        var relatedZone = this.getZone(event.relatedTarget);
        if (relatedZone) this.enter(null, relatedZone);
    },
    onleave: function() {
        this.tree.unselect();
        this.clean();
        $clear(this.scrolling);
        this.scrolling = null;
        this.target = false;
    },
    enter: function(event, zone) {
        if (event) zone = this.getZone(event.target);
        var dropZone = Mif.Tree.Drag.dropZone;
        if (dropZone && dropZone.onleave) dropZone.onleave();
        Mif.Tree.Drag.dropZone = zone;
        zone.current = Mif.Tree.Drag.current;
        if (zone.onenter) zone.onenter();
    },
    onenter: function() {
        this.onleave()
    },
    getZone: function(target) {
        if (!target) return false;
        var parent = $(target);
        do {
            for (var l = this.droppables.length; l--;) {
                var zone = this.droppables[l];
                if (parent == zone.getElement()) {
                    return zone;
                }
            }
            parent = parent.getParent();
        }
        while (parent);
        return false;
    },
    keydown: function(event) {
        if (event.key == 'esc') {
            var zone = Mif.Tree.Drag.dropZone;
            if (zone) zone.where = 'notAllowed';
            this.stop(event);
        }
    },
    autoScroll: function() {
        var y = this.y;
        if (y == -1) return;
        var wrapper = this.tree.wrapper;
        var top = y - wrapper.scrollTop;
        var bottom = wrapper.offsetHeight - top;
        var sign = 0;
        if (top < this.tree.height) {
            var delta = top;
            sign = 1;
        } else if (bottom < this.tree.height) {
            var delta = bottom;
            sign = -1;
        }
        if (sign && !this.scrolling) {
            this.scrolling = function(node) {
                if (y != this.y) {
                    y = this.y;
                    delta = (sign == 1 ? (y - wrapper.scrollTop) : (wrapper.offsetHeight - y + wrapper.scrollTop)) || 1;
                }
                wrapper.scrollTop = wrapper.scrollTop - sign * this.options.scrollSpeed / delta;
            }.periodical(this.options.scrollDelay, this, [sign])
        }
        if (!sign) {
            $clear(this.scrolling);
            this.scrolling = null;
        }
    },
    start: function(event) {
        if (this.options.preventDefault) event.preventDefault();
        this.fireEvent('beforeStart', this.element);
        var target = this.tree.mouse.target;
        if (!target) return;
        this.current = $splat(this.options.startPlace).contains(target) ? this.tree.mouse.node: false;
        if (!this.current || this.current.dragDisabled) {
            return;
        }
        Mif.Tree.Drag.current = this.current;
        Mif.Tree.Drag.startZone = this;
        this.mouse = {
            start: event.page
        };
        this.document.addEvents({
            mousemove: this.bound.check,
            mouseup: this.bound.cancel
        });
        this.document.addEvent(this.selection, this.bound.eventStop);
    },
    drag: function(event) {
        Mif.Tree.Drag.ghost.position({
            x: event.page.x + 20,
            y: event.page.y + 20
        });
        var dropZone = Mif.Tree.Drag.dropZone;
        if (!dropZone || !dropZone.ondrag) return;
        Mif.Tree.Drag.dropZone.ondrag(event);
    },
    ondrag: function(event) {
        this.autoScroll();
        if (!this.checkTarget()) return;
        this.clean();
        var where = this.where;
        var target = this.target;
        var ghostType = where;
        if (where == 'after' && target && (target.getNext()) || where == 'before' && (target.getPrevious())) {
            ghostType = 'between';
        }
        Mif.Tree.Drag.ghost.firstChild.className = 'mif-tree-ghost-icon mif-tree-ghost-' + ghostType;
        if (where == 'notAllowed') {
            this.tree.unselect();
            return;
        }
        if (target && target.tree) this.tree.select(target);
        if (where == 'inside') {
            if (target.tree && !target.isOpen() && !this.openTimer && (target.loadable || target.hasChildren())) {
                this.wrapper = target.getDOM('wrapper').setStyle('cursor', 'progress');
                this.openTimer = function() {
                    target.toggle();
                    this.clean();
                }.delay(this.options.open, this);
            }
        } else {
            var wrapper = this.tree.wrapper;
            var top = this.index * this.tree.height;
            if (where == 'after') top += this.tree.height;
            this.pointer.setStyles({
                left: wrapper.scrollLeft,
                top: top,
                width: wrapper.clientWidth
            });
        }
    },
    clean: function() {
        this.pointer.style.width = 0;
        if (this.openTimer) {
            $clear(this.openTimer);
            this.openTimer = false;
            this.wrapper.style.cursor = 'inherit';
            this.wrapper = false;
        }
    },
    addGhost: function() {
        var wrapper = this.current.getDOM('wrapper');
        var ghost = new Element('span').addClass('mif-tree-ghost');
        ghost.adopt(Mif.Tree.Draw.node(this.current).getFirst()).injectInside(document.body).addClass('mif-tree-ghost-notAllowed').setStyle('position', 'absolute');
        new Element('span').set('html', Mif.Tree.Draw.zeroSpace).injectTop(ghost);
        ghost.getLast().getFirst().className = '';
        Mif.Tree.Drag.ghost = ghost;
    },
    checkTarget: function() {
        this.y = this.tree.mouse.coords.y;
        var target = this.tree.mouse.node;
        if (!target) {
            if (this.options.allowContainerDrop && (this.tree.forest || !this.tree.root)) {
                this.target = this.tree.$index.getLast();
                this.index = this.tree.$index.length - 1;
                if (this.index == -1) {
                    this.where = 'inside';
                    this.target = this.tree.root || this.tree;
                } else {
                    this.where = 'after';
                }
            } else {
                this.target = false;
                this.where = 'notAllowed';
            }
            this.fireEvent('drag');
            return true;
        };
        if (this.current.contains(target)) {
            this.target = target;
            this.where = 'notAllowed';
            this.fireEvent('drag');
            return true;
        };
        this.index = Math.floor(this.y / this.tree.height);
        var delta = this.y - this.index * this.tree.height;
        var deny = target.dropDenied;
        if (this.tree.sortable) {
            deny.include('before').include('after');
        };
        var where;
        if (!deny.contains('inside') && delta > (this.tree.height / 4) && delta < (3 / 4 * this.tree.height)) {
            where = 'inside';
        } else {
            if (delta < this.tree.height / 2) {
                if (deny.contains('before')) {
                    if (deny.contains('inside')) {
                        where = deny.contains('after') ? 'notAllowed': 'after';
                    } else {
                        where = 'inside';
                    }
                } else {
                    where = 'before';
                }
            } else {
                if (deny.contains('after')) {
                    if (deny.contains('inside')) {
                        where = deny.contains('before') ? 'notAllowed': 'before';
                    } else {
                        where = 'inside';
                    }
                } else {
                    where = 'after';
                }
            }
        };
        if (this.where == where && this.target == target) return false;
        this.where = where;
        this.target = target;
        this.fireEvent('drag');
        return true;
    },
    emptydrop: function() {
        var current = this.current,
        target = this.target,
        where = this.where;
        var scroll = this.tree.scroll;
        var complete = function() {
            scroll.removeEvent('complete', complete);
            if (this.options.animate) {
                var wrapper = current.getDOM('wrapper');
                var position = wrapper.getPosition();
                Mif.Tree.Drag.ghost.set('morph', {
                    duration: 'short',
                    onComplete: function() {
                        Mif.Tree.Drag.ghost.dispose();
                        this.fireEvent('emptydrop', this.element);
                    }.bind(this)
                });
                Mif.Tree.Drag.ghost.morph({
                    left: position.x,
                    top: position.y
                });
                return;
            };
            Mif.Tree.Drag.ghost.dispose();
            this.fireEvent('emptydrop', this.element);
            return;
        }.bind(this);
        scroll.addEvent('complete', complete);
        this.tree.select(this.current);
        this.tree.scrollTo(this.current);
    },
    beforeDrop: function() {
        if (this.options.beforeDrop) {
            this.options.beforeDrop.apply(this, [this.current, this.target, this.where]);
        } else {
            this.drop();
        }
    },
    drop: function() {
        var current = this.current,
        target = this.target,
        where = this.where;
        Mif.Tree.Drag.ghost.dispose();
        var action = this.action || (this.tree.key[this.options.modifier] ? 'copy': 'move');
        if (this.where == 'inside' && target.tree && !target.isOpen()) {
            if (target.tree) target.toggle();
            if (target.$loading) {
                var onLoad = function() {
                    this.tree[action](current, target, where);
                    this.tree.select(current).scrollTo(current);
                    this.fireEvent('drop', [current, target, where]);
                    target.removeEvent('load', onLoad);
                };
                target.addEvent('load', onLoad);
                return;
            };
        };
        this.tree[action](current, target, where);
        this.tree.select(current).scrollTo(current);
        this.fireEvent('drop', [current, target, where]);
    },
    onstop: function() {
        this.clean();
        $clear(this.scrolling);
    }
});
Mif.Tree.Drag.groups = {};
Mif.Tree.Drag.Element = new Class({
    Implements: [Options, Events],
    initialize: function(element, options) {
        this.element = $(element);
        this.setOptions(options);
    },
    getElement: function() {
        return this.element;
    },
    onleave: function() {
        this.where = 'notAllowed';
        Mif.Tree.Drag.ghost.firstChild.className = 'mif-tree-ghost-icon mif-tree-ghost-' + this.where;
    },
    onenter: function() {
        this.where = 'inside';
        Mif.Tree.Drag.ghost.firstChild.className = 'mif-tree-ghost-icon mif-tree-ghost-' + this.where;
    },
    beforeDrop: function() {
        if (this.options.beforeDrop) {
            this.options.beforeDrop.apply(this, [this.current, this.trarget, this.where]);
        } else {
            this.drop();
        }
    },
    drop: function() {
        Mif.Tree.Drag.ghost.dispose();
        this.fireEvent('drop', Mif.Tree.Drag.current);
    }
});
Mif.Tree.implement({
    initCheckbox: function(type) {
        this.checkboxType = type || 'simple';
        this.dfltState.checked = 'unchecked';
        this.defaults.hasCheckbox = true;
        this.wrapper.addEvent('click', this.checkboxClick.bind(this));
        if (this.checkboxType == 'simple') return;
        this.addEvent('loadChildren', 
        function(node) {
            if (!node || node.state.checked == 'unchecked') return;
            node.recursive(function() {
                this.state.checked = 'checked';
            });
        });
    },
    checkboxClick: function(event) {
        if (this.mouse.target != 'checkbox') {
            return;
        }
        this.mouse.node['switch']();
        if (this.onClickCheckbox) {
            this.onClickCheckbox();
        }
    },
    getChecked: function(includePartially) {
        var checked = [];
        this.root.recursive(function() {
            var condition = includePartially ? this.state.checked !== 'unchecked': this.state.checked == 'checked';
            if (this.hasCheckbox && condition) checked.push(this);
        });
        return checked;
    }
});
Mif.Tree.Node.implement({
    'switch': function(state) {
        if (this.state.checked == state || !this.hasCheckbox) return;
        var type = this.tree.checkboxType;
        var checked = (this.state.checked == 'checked') ? 'unchecked': 'checked';
        this.tree.fireEvent(checked == 'checked' ? 'check': 'unCheck', this);
        this.tree.fireEvent('switch', [this, (checked == 'checked' ? true: false)]);
        var setState = function(node, state) {
            if (!node.hasCheckbox) return;
            var oldState = node.state.checked;
            node.state.checked = state;
            if ((!node.parentNode && node.tree.$draw) || (node.parentNode && node.parentNode.$draw)) {
                node.getDOM('checkbox').removeClass('mif-tree-node-' + oldState).addClass('mif-tree-node-' + state);
            }
        };
        if (type == 'simple') {
            setState(this, checked);
            return false;
        };
        this.recursive(function() {
            setState(this, checked);
        });
        function setParentCheckbox(node) {
            if (!node.hasCheckbox) return;
            if (!node.parentNode || (node.tree.forest && !node.parentNode.parentNode)) return;
            var parent = node.parentNode;
            var state = '';
            var children = parent.children;
            for (var i = children.length; i--; i > 0) {
                var child = children[i];
                if (!child.hasCheckbox) continue;
                var childState = child.state.checked;
                if (childState == 'partially') {
                    state = 'partially';
                    break;
                } else if (childState == 'checked') {
                    if (state == 'unchecked') {
                        state = 'partially';
                        break;
                    }
                    state = 'checked';
                } else {
                    if (state == 'checked') {
                        state = 'partially';
                        break;
                    } else {
                        state = 'unchecked';
                    }
                }
            }
            if (parent.state.checked == state) {
                return;
            };
            setState(parent, state);
            setParentCheckbox(parent);
        };
        setParentCheckbox(this);
    }
});
Mif.Tree.implement({
    attachRenameEvents: function() {
        this.wrapper.addEvents({
            click: function(event) {
                if ($(event.target).get('tag') == 'input') return;
                this.beforeRenameComplete();
            }.bind(this),
            keydown: function(event) {
                if (event.key == 'enter') {
                    this.beforeRenameComplete();
                }
                if (event.key == 'esc') {
                    this.renameCancel();
                }
            }.bind(this)
        });
    },
    disableEvents: function() {
        if (!this.eventStorage) this.eventStorage = new Element('div');
        this.eventStorage.cloneEvents(this.wrapper);
        this.wrapper.removeEvents();
    },
    enableEvents: function() {
        this.wrapper.removeEvents();
        this.wrapper.cloneEvents(this.eventStorage);
    },
    getInput: function() {
        if (!this.input) {
            this.input = new Element('input').addClass('mif-tree-rename');
            this.input.addEvent('focus', 
            function() {
                this.select()
            });
            Mif.Tree.Rename.autoExpand(this.input);
        }
        return this.input;
    },
    startRename: function(node) {
        this.unselect();
        this.disableEvents();
        this.attachRenameEvents();
        var input = this.getInput();
        input.value = node.name;
        this.renameName = node.getDOM('name');
        this.renameNode = node;
        input.setStyle('width', this.renameName.offsetWidth + 15);
        input.replaces(this.renameName);
        input.focus();
    },
    finishRename: function() {
        this.renameName.replaces(this.getInput());
    },
    beforeRenameComplete: function() {
        if (this.options.beforeRename) {
            var newName = this.getInput().value;
            var node = this.renameNode;
            this.options.beforeRename.apply(this, [node, node.name, newName]);
        } else {
            this.renameComplete();
        }
    },
    renameComplete: function() {
        this.enableEvents();
        this.finishRename();
        var node = this.renameNode;
        var oldName = node.name;
        node.set({
            property: {
                name: this.getInput().value
            }
        });
        this.fireEvent('rename', [node, node.name, oldName]);
        this.select(node);
    },
    renameCancel: function() {
        this.enableEvents();
        this.finishRename();
        this.select(this.renameNode);
    }
});
Mif.Tree.Node.implement({
    rename: function() {
        if (this.property.renameDenied) return;
        this.tree.startRename(this);
    }
});
Mif.Tree.Rename = {
    autoExpand: function(input) {
        var span = new Element('span').addClass('mif-tree-rename').setStyles({
            position: 'absolute',
            left: -2000,
            top: 0,
            padding: 0
        }).injectInside(document.body);
        input.addEvent('keydown', 
        function(event) { (function() {
                input.setStyle('width', Math.max(20, span.set('html', input.value.replace(/\s/g, '&nbsp;')).offsetWidth + 15));
            }).delay(10);
        });
    }
};
var hexcase = 0;
var b64pad = "";
var chrsz = 8;
function hex_sha1(s) {
    return binb2hex(core_sha1(str2binb(s), s.length * chrsz));
}
function b64_sha1(s) {
    return binb2b64(core_sha1(str2binb(s), s.length * chrsz));
}
function str_sha1(s) {
    return binb2str(core_sha1(str2binb(s), s.length * chrsz));
}
function hex_hmac_sha1(key, data) {
    return binb2hex(core_hmac_sha1(key, data));
}
function b64_hmac_sha1(key, data) {
    return binb2b64(core_hmac_sha1(key, data));
}
function str_hmac_sha1(key, data) {
    return binb2str(core_hmac_sha1(key, data));
}
function sha1_vm_test()
 {
    return hex_sha1("abc") == "a9993e364706816aba3e25717850c26c9cd0d89d";
}
function core_sha1(x, len)
 {
    x[len >> 5] |= 0x80 << (24 - len % 32);
    x[((len + 64 >> 9) << 4) + 15] = len;
    var w = Array(80);
    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;
    var e = -1009589776;
    for (var i = 0; i < x.length; i += 16)
    {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;
        var olde = e;
        for (var j = 0; j < 80; j++)
        {
            if (j < 16) w[j] = x[i + j];
            else w[j] = rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
            var t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)), safe_add(safe_add(e, w[j]), sha1_kt(j)));
            e = d;
            d = c;
            c = rol(b, 30);
            b = a;
            a = t;
        }
        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd);
        e = safe_add(e, olde);
    }
    return Array(a, b, c, d, e);
}
function sha1_ft(t, b, c, d)
 {
    if (t < 20) return (b & c) | ((~b) & d);
    if (t < 40) return b ^ c ^ d;

    if (t < 60) return (b & c) | (b & d) | (c & d);
    return b ^ c ^ d;
}
function sha1_kt(t)
 {
    return (t < 20) ? 1518500249: (t < 40) ? 1859775393: (t < 60) ? -1894007588: -899497514;
}
function core_hmac_sha1(key, data)
 {
    var bkey = str2binb(key);
    if (bkey.length > 16) bkey = core_sha1(bkey, key.length * chrsz);
    var ipad = Array(16),
    opad = Array(16);
    for (var i = 0; i < 16; i++)
    {
        ipad[i] = bkey[i] ^ 0x36363636;
        opad[i] = bkey[i] ^ 0x5C5C5C5C;
    }
    var hash = core_sha1(ipad.concat(str2binb(data)), 512 + data.length * chrsz);
    return core_sha1(opad.concat(hash), 512 + 160);
}
function safe_add(x, y)
 {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
}
function rol(num, cnt)
 {
    return (num << cnt) | (num >>> (32 - cnt));
}
function str2binb(str)
 {
    var bin = Array();
    var mask = (1 << chrsz) - 1;
    for (var i = 0; i < str.length * chrsz; i += chrsz)
    bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (32 - chrsz - i % 32);
    return bin;
}
function binb2str(bin)
 {
    var str = "";
    var mask = (1 << chrsz) - 1;
    for (var i = 0; i < bin.length * 32; i += chrsz)
    str += String.fromCharCode((bin[i >> 5] >>> (32 - chrsz - i % 32)) & mask);
    return str;
}
function binb2hex(binarray)
 {
    var hex_tab = hexcase ? "0123456789ABCDEF": "0123456789abcdef";
    var str = "";
    for (var i = 0; i < binarray.length * 4; i++)
    {
        str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) + 
        hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);
    }
    return str;
}
function binb2b64(binarray)
 {
    var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var str = "";
    for (var i = 0; i < binarray.length * 4; i += 3)
    {
        var triplet = (((binarray[i >> 2] >> 8 * (3 - i % 4)) & 0xFF) << 16) | (((binarray[i + 1 >> 2] >> 8 * (3 - (i + 1) % 4)) & 0xFF) << 8) | ((binarray[i + 2 >> 2] >> 8 * (3 - (i + 2) % 4)) & 0xFF);
        for (var j = 0; j < 4; j++)
        {
            if (i * 8 + j * 6 > binarray.length * 32) str += b64pad;
            else str += tab.charAt((triplet >> 6 * (3 - j)) & 0x3F);
        }
    }
    return str;
}
if (dwr == null) var dwr = {};
if (dwr.engine == null) dwr.engine = {};
if (DWREngine == null) var DWREngine = dwr.engine;
dwr.engine.setErrorHandler = function(handler) {
    dwr.engine._errorHandler = handler;
};
dwr.engine.setWarningHandler = function(handler) {
    dwr.engine._warningHandler = handler;
};
dwr.engine.setTextHtmlHandler = function(handler) {
    dwr.engine._textHtmlHandler = handler;
};
dwr.engine.setTimeout = function(timeout) {
    dwr.engine._timeout = timeout;
};
dwr.engine.setPreHook = function(handler) {
    dwr.engine._preHook = handler;
};
dwr.engine.setPostHook = function(handler) {
    dwr.engine._postHook = handler;
};
dwr.engine.setHeaders = function(headers) {
    dwr.engine._headers = headers;
};
dwr.engine.setParameters = function(parameters) {
    dwr.engine._parameters = parameters;
};
dwr.engine.XMLHttpRequest = 1;
dwr.engine.IFrame = 2;
dwr.engine.ScriptTag = 3;
dwr.engine.setRpcType = function(newType) {
    if (newType != dwr.engine.XMLHttpRequest && newType != dwr.engine.IFrame && newType != dwr.engine.ScriptTag) {
        dwr.engine._handleError(null, {
            name: "dwr.engine.invalidRpcType",
            message: "RpcType must be one of dwr.engine.XMLHttpRequest or dwr.engine.IFrame or dwr.engine.ScriptTag"
        });
        return;
    }
    dwr.engine._rpcType = newType;
};
dwr.engine.setHttpMethod = function(httpMethod) {
    if (httpMethod != "GET" && httpMethod != "POST") {
        dwr.engine._handleError(null, {
            name: "dwr.engine.invalidHttpMethod",
            message: "Remoting method must be one of GET or POST"
        });
        return;
    }
    dwr.engine._httpMethod = httpMethod;
};
dwr.engine.setOrdered = function(ordered) {
    dwr.engine._ordered = ordered;
};
dwr.engine.setAsync = function(async) {
    dwr.engine._async = async;
};
dwr.engine.setActiveReverseAjax = function(activeReverseAjax) {
    if (activeReverseAjax) {
        if (dwr.engine._activeReverseAjax) return;
        dwr.engine._activeReverseAjax = true;
        dwr.engine._poll();
    }
    else {
        if (dwr.engine._activeReverseAjax && dwr.engine._pollReq) dwr.engine._pollReq.abort();
        dwr.engine._activeReverseAjax = false;
    }
};
dwr.engine.defaultErrorHandler = function(message, ex) {
    dwr.engine._debug("Error: " + ex.name + ", " + ex.message, true);
    if (message == null || message == "") alert("A server error has occured.");
    else if (message.indexOf("0x80040111") != -1) dwr.engine._debug(message);
    else alert(message);
};
dwr.engine.defaultWarningHandler = function(message, ex) {
    dwr.engine._debug(message);
};
dwr.engine.beginBatch = function() {
    if (dwr.engine._batch) {
        dwr.engine._handleError(null, {
            name: "dwr.engine.batchBegun",
            message: "Batch already begun"
        });
        return;
    }
    dwr.engine._batch = dwr.engine._createBatch();
};
dwr.engine.endBatch = function(options) {
    var batch = dwr.engine._batch;
    if (batch == null) {
        dwr.engine._handleError(null, {
            name: "dwr.engine.batchNotBegun",
            message: "No batch in progress"
        });
        return;
    }
    dwr.engine._batch = null;
    if (batch.map.callCount == 0) return;
    if (options) dwr.engine._mergeBatch(batch, options);
    if (dwr.engine._ordered && dwr.engine._batchesLength != 0) {
        dwr.engine._batchQueue[dwr.engine._batchQueue.length] = batch;
    }
    else {
        dwr.engine._sendData(batch);
    }
};
dwr.engine.setPollMethod = function(type) {
    dwr.engine.setPollType(type);
};
dwr.engine.setMethod = function(type) {
    dwr.engine.setRpcType(type);
};
dwr.engine.setVerb = function(verb) {
    dwr.engine.setHttpMethod(verb);
};
dwr.engine.setPollType = function() {
    dwr.engine._debug("Manually setting the Poll Type is not supported");
};
dwr.engine._origScriptSessionId = "${scriptSessionId}";
dwr.engine._sessionCookieName = "${sessionCookieName}";
dwr.engine._allowGetForSafariButMakeForgeryEasier = "${allowGetForSafariButMakeForgeryEasier}";
dwr.engine._scriptTagProtection = "${scriptTagProtection}";
dwr.engine._defaultPath = "${defaultPath}";
dwr.engine._pollWithXhr = "${pollWithXhr}";
dwr.engine._scriptSessionId = null;
dwr.engine._getScriptSessionId = function() {
    if (dwr.engine._scriptSessionId == null) {
        dwr.engine._scriptSessionId = dwr.engine._origScriptSessionId + Math.floor(Math.random() * 1000);
    }
    return dwr.engine._scriptSessionId;
};
dwr.engine._errorHandler = dwr.engine.defaultErrorHandler;
dwr.engine._warningHandler = dwr.engine.defaultWarningHandler;
dwr.engine._preHook = null;
dwr.engine._postHook = null;
dwr.engine._batches = {};
dwr.engine._batchesLength = 0;
dwr.engine._batchQueue = [];
dwr.engine._rpcType = dwr.engine.XMLHttpRequest;
dwr.engine._httpMethod = "POST";
dwr.engine._ordered = false;
dwr.engine._async = true;
dwr.engine._batch = null;
dwr.engine._timeout = 0;
dwr.engine._DOMDocument = ["Msxml2.DOMDocument.6.0", "Msxml2.DOMDocument.5.0", "Msxml2.DOMDocument.4.0", "Msxml2.DOMDocument.3.0", "MSXML2.DOMDocument", "MSXML.DOMDocument", "Microsoft.XMLDOM"];
dwr.engine._XMLHTTP = ["Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.5.0", "Msxml2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"];
dwr.engine._activeReverseAjax = false;
dwr.engine._outstandingIFrames = [];
dwr.engine._pollReq = null;
dwr.engine._pollCometInterval = 200;
dwr.engine._pollRetries = 0;
dwr.engine._maxPollRetries = 0;
dwr.engine._textHtmlHandler = null;
dwr.engine._headers = null;
dwr.engine._parameters = null;
dwr.engine._postSeperator = "\n";
dwr.engine._defaultInterceptor = function(data) {
    return data;
};
dwr.engine._urlRewriteHandler = dwr.engine._defaultInterceptor;
dwr.engine._contentRewriteHandler = dwr.engine._defaultInterceptor;
dwr.engine._replyRewriteHandler = dwr.engine._defaultInterceptor;
dwr.engine._nextBatchId = 0;
dwr.engine._propnames = ["rpcType", "httpMethod", "async", "timeout", "errorHandler", "warningHandler", "textHtmlHandler"];
dwr.engine._partialResponseNo = 0;
dwr.engine._partialResponseYes = 1;
dwr.engine._partialResponseFlush = 2;
dwr.engine._unloading = false;
dwr.engine._execute = function(path, scriptName, methodName, vararg_params) {
    var singleShot = false;
    if (dwr.engine._batch == null) {
        dwr.engine.beginBatch();
        singleShot = true;
    }
    var batch = dwr.engine._batch;
    var args = [];
    for (var i = 0; i < arguments.length - 3; i++) {
        args[i] = arguments[i + 3];
    }
    if (batch.path == null) {
        batch.path = path;
    }
    else {
        if (batch.path != path) {
            dwr.engine._handleError(batch, {
                name: "dwr.engine.multipleServlets",
                message: "Can't batch requests to multiple DWR Servlets."
            });
            return;
        }
    }
    var callData;
    var lastArg = args[args.length - 1];
    if (typeof lastArg == "function" || lastArg == null) callData = {
        callback: args.pop()
    };
    else callData = args.pop();
    dwr.engine._mergeBatch(batch, callData);
    batch.handlers[batch.map.callCount] = {
        exceptionHandler: callData.exceptionHandler,
        callback: callData.callback
    };
    var prefix = "c" + batch.map.callCount + "-";
    batch.map[prefix + "scriptName"] = scriptName;
    batch.map[prefix + "methodName"] = methodName;
    batch.map[prefix + "id"] = batch.map.callCount;
    var refctx = [];
    for (i = 0; i < args.length; i++) {
        dwr.engine._serializeAll(batch, refctx, args[i], prefix + "param" + i);
    }
    batch.map.callCount++;
    if (singleShot) dwr.engine.endBatch();
};
dwr.engine._poll = function() {
    if (!dwr.engine._activeReverseAjax) return;
    var batch = dwr.engine._createBatch();
    batch.map.id = 0;
    batch.map.callCount = 1;
    batch.isPoll = true;
    if (dwr.engine._pollWithXhr == "true") {
        batch.rpcType = dwr.engine.XMLHttpRequest;
        batch.map.partialResponse = dwr.engine._partialResponseNo;
    }
    else {
        if (navigator.userAgent.indexOf("Gecko/") != -1) {
            batch.rpcType = dwr.engine.XMLHttpRequest;
            batch.map.partialResponse = dwr.engine._partialResponseYes;
        }
        else {
            batch.rpcType = dwr.engine.XMLHttpRequest;
            batch.map.partialResponse = dwr.engine._partialResponseNo;
        }
    }
    batch.httpMethod = "POST";
    batch.async = true;
    batch.timeout = 0;
    batch.path = dwr.engine._defaultPath;
    batch.preHooks = [];
    batch.postHooks = [];
    batch.errorHandler = dwr.engine._pollErrorHandler;
    batch.warningHandler = dwr.engine._pollErrorHandler;
    batch.handlers[0] = {
        callback: function(pause) {
            dwr.engine._pollRetries = 0;
            setTimeout(dwr.engine._poll, pause);
        }
    };
    dwr.engine._sendData(batch);
    if (batch.rpcType == dwr.engine.XMLHttpRequest && batch.map.partialResponse == dwr.engine._partialResponseYes) {
        dwr.engine._checkCometPoll();
    }
};
dwr.engine._pollErrorHandler = function(msg, ex) {
    dwr.engine._pollRetries++;
    dwr.engine._debug("Reverse Ajax poll failed (pollRetries=" + dwr.engine._pollRetries + "): " + ex.name + " : " + ex.message);
    if (dwr.engine._pollRetries < dwr.engine._maxPollRetries) {
        setTimeout(dwr.engine._poll, 10000);
    }
    else {
        dwr.engine._activeReverseAjax = false;
        dwr.engine._debug("Giving up.");
    }
};
dwr.engine._createBatch = function() {
    var batch = {
        map: {
            callCount: 0,
            page: window.location.pathname + window.location.search,
            httpSessionId: dwr.engine._getJSessionId(),
            scriptSessionId: dwr.engine._getScriptSessionId()
        },
        charsProcessed: 0,
        paramCount: 0,
        parameters: {},
        headers: {},
        isPoll: false,
        handlers: {},
        preHooks: [],
        postHooks: [],
        rpcType: dwr.engine._rpcType,
        httpMethod: dwr.engine._httpMethod,
        async: dwr.engine._async,
        timeout: dwr.engine._timeout,
        errorHandler: dwr.engine._errorHandler,
        warningHandler: dwr.engine._warningHandler,
        textHtmlHandler: dwr.engine._textHtmlHandler
    };
    if (dwr.engine._preHook) batch.preHooks.push(dwr.engine._preHook);
    if (dwr.engine._postHook) batch.postHooks.push(dwr.engine._postHook);
    var propname,
    data;
    if (dwr.engine._headers) {
        for (propname in dwr.engine._headers) {
            data = dwr.engine._headers[propname];
            if (typeof data != "function") batch.headers[propname] = data;
        }
    }
    if (dwr.engine._parameters) {
        for (propname in dwr.engine._parameters) {
            data = dwr.engine._parameters[propname];
            if (typeof data != "function") batch.parameters[propname] = data;
        }
    }
    return batch;
};
dwr.engine._mergeBatch = function(batch, overrides) {
    var propname,
    data;
    for (var i = 0; i < dwr.engine._propnames.length; i++) {
        propname = dwr.engine._propnames[i];
        if (overrides[propname] != null) batch[propname] = overrides[propname];
    }
    if (overrides.preHook != null) batch.preHooks.unshift(overrides.preHook);
    if (overrides.postHook != null) batch.postHooks.push(overrides.postHook);
    if (overrides.headers) {
        for (propname in overrides.headers) {
            data = overrides.headers[propname];
            if (typeof data != "function") batch.headers[propname] = data;
        }
    }
    if (overrides.parameters) {
        for (propname in overrides.parameters) {
            data = overrides.parameters[propname];
            if (typeof data != "function") batch.map["p-" + propname] = "" + data;
        }
    }
};
dwr.engine._getJSessionId = function() {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) == ' ') cookie = cookie.substring(1, cookie.length);
        if (cookie.indexOf(dwr.engine._sessionCookieName + "=") == 0) {
            return cookie.substring(dwr.engine._sessionCookieName.length + 1, cookie.length);
        }
    }
    return "";
};
dwr.engine._checkCometPoll = function() {
    for (var i = 0; i < dwr.engine._outstandingIFrames.length; i++) {
        var text = "";
        var iframe = dwr.engine._outstandingIFrames[i];
        try {
            text = dwr.engine._getTextFromCometIFrame(iframe);
        }
        catch(ex) {
            dwr.engine._handleWarning(iframe.batch, ex);
        }
        if (text != "") dwr.engine._processCometResponse(text, iframe.batch);
    }
    if (dwr.engine._pollReq) {
        var req = dwr.engine._pollReq;
        var text = req.responseText;
        if (text != null) dwr.engine._processCometResponse(text, req.batch);
    }
    if (dwr.engine._outstandingIFrames.length > 0 || dwr.engine._pollReq) {
        setTimeout(dwr.engine._checkCometPoll, dwr.engine._pollCometInterval);
    }
};
dwr.engine._getTextFromCometIFrame = function(frameEle) {
    var body = frameEle.contentWindow.document.body;
    if (body == null) return "";
    var text = body.innerHTML;
    if (text.indexOf("<PRE>") == 0 || text.indexOf("<pre>") == 0) {
        text = text.substring(5, text.length - 7);
    }
    return text;
};
dwr.engine._processCometResponse = function(response, batch) {
    if (batch.charsProcessed == response.length) return;
    if (response.length == 0) {
        batch.charsProcessed = 0;
        return;
    }
    var firstStartTag = response.indexOf("//#DWR-START#", batch.charsProcessed);
    if (firstStartTag == -1) {
        batch.charsProcessed = response.length;
        return;
    }
    var lastEndTag = response.lastIndexOf("//#DWR-END#");
    if (lastEndTag == -1) {
        return;
    }
    if (response.charCodeAt(lastEndTag + 11) == 13 && response.charCodeAt(lastEndTag + 12) == 10) {
        batch.charsProcessed = lastEndTag + 13;
    }
    else {
        batch.charsProcessed = lastEndTag + 11;
    }
    var exec = response.substring(firstStartTag + 13, lastEndTag);
    dwr.engine._receivedBatch = batch;
    dwr.engine._eval(exec);
    dwr.engine._receivedBatch = null;
};
dwr.engine._sendData = function(batch) {
    batch.map.batchId = dwr.engine._nextBatchId;
    dwr.engine._nextBatchId++;
    dwr.engine._batches[batch.map.batchId] = batch;
    dwr.engine._batchesLength++;
    batch.completed = false;
    for (var i = 0; i < batch.preHooks.length; i++) {
        batch.preHooks[i]();
    }
    batch.preHooks = null;
    if (batch.timeout && batch.timeout != 0) {
        batch.timeoutId = setTimeout(function() {
            dwr.engine._abortRequest(batch);
        },
        batch.timeout);
    }
    if (batch.rpcType == dwr.engine.XMLHttpRequest) {
        if (window.XMLHttpRequest) {
            batch.req = new XMLHttpRequest();
        }
        else if (window.ActiveXObject && !(navigator.userAgent.indexOf("Mac") >= 0 && navigator.userAgent.indexOf("MSIE") >= 0)) {
            batch.req = dwr.engine._newActiveXObject(dwr.engine._XMLHTTP);
        }
    }
    var prop,
    request;
    if (batch.req) {
        if (batch.async) {
            batch.req.onreadystatechange = function() {
                if (typeof dwr != 'undefined') dwr.engine._stateChange(batch);
            };
        }
        if (batch.isPoll) {
            dwr.engine._pollReq = batch.req;
            if (! (document.all && !window.opera)) batch.req.batch = batch;
        }
        var indexSafari = navigator.userAgent.indexOf("Safari/");
        if (indexSafari >= 0) {
            var version = navigator.userAgent.substring(indexSafari + 7);
            if (parseInt(version, 10) < 400) {
                if (dwr.engine._allowGetForSafariButMakeForgeryEasier == "true") batch.httpMethod = "GET";
                else dwr.engine._handleWarning(batch, {
                    name: "dwr.engine.oldSafari",
                    message: "Safari GET support disabled. See getahead.org/dwr/server/servlet and allowGetForSafariButMakeForgeryEasier."
                });
            }
        }
        batch.mode = batch.isPoll ? dwr.engine._ModePlainPoll: dwr.engine._ModePlainCall;
        request = dwr.engine._constructRequest(batch);
        try {
            batch.req.open(batch.httpMethod, request.url, batch.async);
            try {
                for (prop in batch.headers) {
                    var value = batch.headers[prop];
                    if (typeof value == "string") batch.req.setRequestHeader(prop, value);
                }
                if (!batch.headers["Content-Type"]) batch.req.setRequestHeader("Content-Type", "text/plain");
            }
            catch(ex) {
                dwr.engine._handleWarning(batch, ex);
            }
            batch.req.send(request.body);
            if (!batch.async) dwr.engine._stateChange(batch);
        }
        catch(ex) {
            dwr.engine._handleError(batch, ex);
        }
    }
    else if (batch.rpcType != dwr.engine.ScriptTag) {
        var idname = batch.isPoll ? "dwr-if-poll-" + batch.map.batchId: "dwr-if-" + batch.map.batchId;
        batch.div = document.createElement("div");
        document.body.appendChild(batch.div);
        batch.div.innerHTML = "<iframe src='javascript:void(0)' frameborder='0' style='width:0px;height:0px;border:0;' id='" + idname + "' name='" + idname + "' onload='dwr.engine._iframeLoadingComplete (" + batch.map.batchId + ");'></iframe>";
        batch.document = document;
        batch.iframe = batch.document.getElementById(idname);
        batch.iframe.batch = batch;
        batch.mode = batch.isPoll ? dwr.engine._ModeHtmlPoll: dwr.engine._ModeHtmlCall;
        if (batch.isPoll) dwr.engine._outstandingIFrames.push(batch.iframe);
        request = dwr.engine._constructRequest(batch);
        if (batch.httpMethod == "GET") {
            batch.iframe.setAttribute("src", request.url);
        }
        else {
            batch.form = batch.document.createElement("form");
            batch.form.setAttribute("id", "dwr-form");
            batch.form.setAttribute("action", request.url);
            batch.form.setAttribute("style", "display:none;");
            batch.form.setAttribute("target", idname);
            batch.form.target = idname;
            batch.form.setAttribute("method", batch.httpMethod);
            for (prop in batch.map) {
                var value = batch.map[prop];
                if (typeof value != "function") {
                    var formInput = batch.document.createElement("input");
                    formInput.setAttribute("type", "hidden");
                    formInput.setAttribute("name", prop);
                    formInput.setAttribute("value", value);
                    batch.form.appendChild(formInput);
                }
            }
            batch.document.body.appendChild(batch.form);
            batch.form.submit();
        }
    }
    else {
        batch.httpMethod = "GET";
        batch.mode = batch.isPoll ? dwr.engine._ModePlainPoll: dwr.engine._ModePlainCall;
        request = dwr.engine._constructRequest(batch);
        batch.script = document.createElement("script");
        batch.script.id = "dwr-st-" + batch.map["c0-id"];
        batch.script.src = request.url;
        document.body.appendChild(batch.script);
    }
};
dwr.engine._ModePlainCall = "/call/plaincall/";
dwr.engine._ModeHtmlCall = "/call/htmlcall/";
dwr.engine._ModePlainPoll = "/call/plainpoll/";
dwr.engine._ModeHtmlPoll = "/call/htmlpoll/";
dwr.engine._constructRequest = function(batch) {
    var request = {
        url: batch.path + batch.mode,
        body: null
    };
    if (batch.isPoll == true) {
        request.url += "ReverseAjax.dwr";
    }
    else if (batch.map.callCount == 1) {
        request.url += batch.map["c0-scriptName"] + "." + batch.map["c0-methodName"] + ".dwr";
    }
    else {
        request.url += "Multiple." + batch.map.callCount + ".dwr";
    }
    var sessionMatch = location.href.match(/jsessionid=([^?]+)/);
    if (sessionMatch != null) {
        request.url += ";jsessionid=" + sessionMatch[1];
    }
    var prop;
    if (batch.httpMethod == "GET") {
        batch.map.callCount = "" + batch.map.callCount;
        request.url += "?";
        for (prop in batch.map) {
            if (typeof batch.map[prop] != "function") {
                request.url += encodeURIComponent(prop) + "=" + encodeURIComponent(batch.map[prop]) + "&";
            }
        }
        request.url = request.url.substring(0, request.url.length - 1);
    }
    else {
        request.url += "?t=" + new Date().getTime();
        request.body = "";
        if (document.all && !window.opera) {
            var buf = [];
            for (prop in batch.map) {
                if (typeof batch.map[prop] != "function") {
                    buf.push(prop + "=" + batch.map[prop] + dwr.engine._postSeperator);
                }
            }
            request.body = buf.join("");
        }
        else {
            for (prop in batch.map) {
                if (typeof batch.map[prop] != "function") {
                    request.body += prop + "=" + batch.map[prop] + dwr.engine._postSeperator;
                }
            }
        }
        request.body = dwr.engine._contentRewriteHandler(request.body);
    }
    request.url = dwr.engine._urlRewriteHandler(request.url);
    return request;
};
dwr.engine._stateChange = function(batch) {
    var toEval;
    if (batch.completed) {
        dwr.engine._debug("Error: _stateChange() with batch.completed");
        return;
    }
    var req = batch.req;
    try {
        if (req.readyState != 4) return;
    }
    catch(ex) {
        dwr.engine._handleWarning(batch, ex);
        dwr.engine._clearUp(batch);
        return;
    }
    if (dwr.engine._unloading) {
        dwr.engine._debug("Ignoring reply from server as page is unloading.");
        return;
    }
    try {
        var reply = req.responseText;
        reply = dwr.engine._replyRewriteHandler(reply);
        var status = req.status;
        if (reply == null || reply == "") {
            dwr.engine._handleWarning(batch, {
                name: "dwr.engine.missingData",
                message: "No data received from server"
            });
        }
        else if (status != 200) {
            dwr.engine._handleError(batch, {
                name: "dwr.engine.http." + status,
                message: req.statusText
            });
        }
        else {
            var contentType = req.getResponseHeader("Content-Type");
            if (!contentType.match(/^text\/plain/) && !contentType.match(/^text\/javascript/)) {
                if (contentType.match(/^text\/html/) && typeof batch.textHtmlHandler == "function") {
                    batch.textHtmlHandler({
                        status: status,
                        responseText: reply,
                        contentType: contentType
                    });
                }
                else {
                    dwr.engine._handleWarning(batch, {
                        name: "dwr.engine.invalidMimeType",
                        message: "Invalid content type: '" + contentType + "'"
                    });
                }
            }
            else {
                if (batch.isPoll && batch.map.partialResponse == dwr.engine._partialResponseYes) {
                    dwr.engine._processCometResponse(reply, batch);
                }
                else {
                    if (reply.search("//#DWR") == -1) {
                        dwr.engine._handleWarning(batch, {
                            name: "dwr.engine.invalidReply",
                            message: "Invalid reply from server"
                        });
                    }
                    else {
                        toEval = reply;
                    }
                }
            }
        }
    }
    catch(ex) {
        dwr.engine._handleWarning(batch, ex);
    }
    dwr.engine._callPostHooks(batch);
    dwr.engine._receivedBatch = batch;
    if (toEval != null) toEval = toEval.replace(dwr.engine._scriptTagProtection, "");
    dwr.engine._eval(toEval);
    dwr.engine._receivedBatch = null;
    dwr.engine._validateBatch(batch);
    if (!batch.completed) dwr.engine._clearUp(batch);
};
dwr.engine._validateBatch = function(batch) {
    if (!batch.completed) {
        for (var i = 0; i < batch.map.callCount; i++) {
            if (batch.handlers[i] != null) {
                dwr.engine._handleWarning(batch, {
                    name: "dwr.engine.incompleteReply",
                    message: "Incomplete reply from server"
                });
                break;
            }
        }
    }
}
dwr.engine._iframeLoadingComplete = function(batchId) {
    var batch = dwr.engine._batches[batchId];
    if (batch) dwr.engine._validateBatch(batch);
}
dwr.engine._remoteHandleCallback = function(batchId, callId, reply) {
    var batch = dwr.engine._batches[batchId];
    if (batch == null) {
        dwr.engine._debug("Warning: batch == null in remoteHandleCallback for batchId=" + batchId, true);
        return;
    }
    try {
        var handlers = batch.handlers[callId];
        batch.handlers[callId] = null;
        if (!handlers) {
            dwr.engine._debug("Warning: Missing handlers. callId=" + callId, true);
        }
        else if (typeof handlers.callback == "function") handlers.callback(reply);
    }
    catch(ex) {
        dwr.engine._handleError(batch, ex);
    }
};
dwr.engine._remoteHandleException = function(batchId, callId, ex) {
    var batch = dwr.engine._batches[batchId];
    if (batch == null) {
        dwr.engine._debug("Warning: null batch in remoteHandleException", true);
        return;
    }
    var handlers = batch.handlers[callId];
    batch.handlers[callId] = null;
    if (handlers == null) {
        dwr.engine._debug("Warning: null handlers in remoteHandleException", true);
        return;
    }
    if (ex.message == undefined) ex.message = "";
    if (typeof handlers.exceptionHandler == "function") handlers.exceptionHandler(ex.message, ex);
    else if (typeof batch.errorHandler == "function") batch.errorHandler(ex.message, ex);
};
dwr.engine._remoteHandleBatchException = function(ex, batchId) {
    var searchBatch = (dwr.engine._receivedBatch == null && batchId != null);
    if (searchBatch) {
        dwr.engine._receivedBatch = dwr.engine._batches[batchId];
    }
    if (ex.message == undefined) ex.message = "";
    dwr.engine._handleError(dwr.engine._receivedBatch, ex);
    if (searchBatch) {
        dwr.engine._receivedBatch = null;
        dwr.engine._clearUp(dwr.engine._batches[batchId]);
    }
};
dwr.engine._remotePollCometDisabled = function(ex, batchId) {
    dwr.engine.setActiveReverseAjax(false);
    var searchBatch = (dwr.engine._receivedBatch == null && batchId != null);
    if (searchBatch) {
        dwr.engine._receivedBatch = dwr.engine._batches[batchId];
    }
    if (ex.message == undefined) ex.message = "";
    dwr.engine._handleError(dwr.engine._receivedBatch, ex);
    if (searchBatch) {
        dwr.engine._receivedBatch = null;
        dwr.engine._clearUp(dwr.engine._batches[batchId]);
    }
};
dwr.engine._remoteBeginIFrameResponse = function(iframe, batchId) {
    if (iframe != null) dwr.engine._receivedBatch = iframe.batch;
    dwr.engine._callPostHooks(dwr.engine._receivedBatch);
};
dwr.engine._remoteEndIFrameResponse = function(batchId) {
    dwr.engine._clearUp(dwr.engine._receivedBatch);
    dwr.engine._receivedBatch = null;
};
dwr.engine._eval = function(script) {
    if (script == null) return null;
    if (script == "") {
        dwr.engine._debug("Warning: blank script", true);
        return null;
    }
    return eval(script);
};
dwr.engine._abortRequest = function(batch) {
    if (batch && !batch.completed) {
        dwr.engine._clearUp(batch);
        if (batch.req) batch.req.abort();
        dwr.engine._handleError(batch, {
            name: "dwr.engine.timeout",
            message: "Timeout"
        });
    }
};
dwr.engine._callPostHooks = function(batch) {
    if (batch.postHooks) {
        for (var i = 0; i < batch.postHooks.length; i++) {
            batch.postHooks[i]();
        }
        batch.postHooks = null;
    }
};
dwr.engine._clearUp = function(batch) {
    if (!batch) {
        dwr.engine._debug("Warning: null batch in dwr.engine._clearUp()", true);
        return;
    }
    if (batch.completed) {
        dwr.engine._debug("Warning: Double complete", true);
        return;
    }
    if (batch.div) batch.div.parentNode.removeChild(batch.div);
    if (batch.iframe) {
        for (var i = 0; i < dwr.engine._outstandingIFrames.length; i++) {
            if (dwr.engine._outstandingIFrames[i] == batch.iframe) {
                dwr.engine._outstandingIFrames.splice(i, 1);
            }
        }
        batch.iframe.parentNode.removeChild(batch.iframe);
    }
    if (batch.form) batch.form.parentNode.removeChild(batch.form);
    if (batch.req) {
        if (batch.req == dwr.engine._pollReq) dwr.engine._pollReq = null;
        delete batch.req;
    }
    if (batch.timeoutId != null) {
        clearTimeout(batch.timeoutId);
        delete batch.timeoutId;
    }
    if (batch.map && (batch.map.batchId || batch.map.batchId == 0)) {
        delete dwr.engine._batches[batch.map.batchId];
        dwr.engine._batchesLength--;
    }
    batch.completed = true;
    if (dwr.engine._batchQueue.length != 0) {
        var sendbatch = dwr.engine._batchQueue.shift();
        dwr.engine._sendData(sendbatch);
    }
};
dwr.engine._unloader = function() {
    dwr.engine._unloading = true;
    dwr.engine._batchQueue.length = 0;
    for (var batchId in dwr.engine._batches) {
        var batch = dwr.engine._batches[batchId];
        if (batch && batch.map) {
            if (batch.req) {
                batch.req.abort();
            }
            dwr.engine._clearUp(batch);
        }
    }
};
if (window.addEventListener) window.addEventListener('unload', dwr.engine._unloader, false);
else if (window.attachEvent) window.attachEvent('onunload', dwr.engine._unloader);
dwr.engine._handleError = function(batch, ex) {
    if (typeof ex == "string") ex = {
        name: "unknown",
        message: ex
    };
    if (ex.message == null) ex.message = "";
    if (ex.name == null) ex.name = "unknown";
    if (batch && typeof batch.errorHandler == "function") batch.errorHandler(ex.message, ex);
    else if (dwr.engine._errorHandler) dwr.engine._errorHandler(ex.message, ex);
    if (batch) dwr.engine._clearUp(batch);
};
dwr.engine._handleWarning = function(batch, ex) {
    if (typeof ex == "string") ex = {
        name: "unknown",
        message: ex
    };
    if (ex.message == null) ex.message = "";
    if (ex.name == null) ex.name = "unknown";
    if (batch && typeof batch.warningHandler == "function") batch.warningHandler(ex.message, ex);
    else if (dwr.engine._warningHandler) dwr.engine._warningHandler(ex.message, ex);
    if (batch) dwr.engine._clearUp(batch);
};
dwr.engine._serializeAll = function(batch, referto, data, name) {
    if (data == null) {
        batch.map[name] = "null:null";
        return;
    }
    switch (typeof data) {
    case "boolean":
        batch.map[name] = "boolean:" + data;
        break;
    case "number":
        batch.map[name] = "number:" + data;
        break;
    case "string":
        batch.map[name] = "string:" + encodeURIComponent(data);
        break;
    case "object":
        var objstr = Object.prototype.toString.call(data);
        if (objstr == "[object String]") batch.map[name] = "String:" + encodeURIComponent(data);
        else if (objstr == "[object Boolean]") batch.map[name] = "Boolean:" + data;
        else if (objstr == "[object Number]") batch.map[name] = "Number:" + data;
        else if (objstr == "[object Date]") batch.map[name] = "Date:" + data.getTime();
        else if (objstr == "[object Array]") batch.map[name] = dwr.engine._serializeArray(batch, referto, data, name);
        else batch.map[name] = dwr.engine._serializeObject(batch, referto, data, name);
        break;
    case "function":
        break;
    default:
        dwr.engine._handleWarning(null, {
            name: "dwr.engine.unexpectedType",
            message: "Unexpected type: " + typeof data + ", attempting default converter."
        });
        batch.map[name] = "default:" + data;
        break;
    }
};
dwr.engine._lookup = function(referto, data, name) {
    var lookup;
    for (var i = 0; i < referto.length; i++) {
        if (referto[i].data == data) {
            lookup = referto[i];
            break;
        }
    }
    if (lookup) return "reference:" + lookup.name;
    referto.push({
        data: data,
        name: name
    });
    return null;
};
dwr.engine._serializeObject = function(batch, referto, data, name) {
    var ref = dwr.engine._lookup(referto, data, name);
    if (ref) return ref;
    if (data.nodeName && data.nodeType) {
        return dwr.engine._serializeXml(batch, referto, data, name);
    }
    var reply = "Object_" + dwr.engine._getObjectClassName(data) + ":{";
    var element;
    for (element in data) {
        if (typeof data[element] != "function") {
            batch.paramCount++;
            var childName = "c" + dwr.engine._batch.map.callCount + "-e" + batch.paramCount;
            dwr.engine._serializeAll(batch, referto, data[element], childName);
            reply += encodeURIComponent(element) + ":reference:" + childName + ", ";
        }
    }
    if (reply.substring(reply.length - 2) == ", ") {
        reply = reply.substring(0, reply.length - 2);
    }
    reply += "}";
    return reply;
};
dwr.engine._errorClasses = {
    "Error": Error,
    "EvalError": EvalError,
    "RangeError": RangeError,
    "ReferenceError": ReferenceError,
    "SyntaxError": SyntaxError,
    "TypeError": TypeError,
    "URIError": URIError
};
dwr.engine._getObjectClassName = function(obj) {
    if (obj && obj.constructor && obj.constructor.toString)
    {
        var str = obj.constructor.toString();
        var regexpmatch = str.match(/function\s+(\w+)/);
        if (regexpmatch && regexpmatch.length == 2) {
            return regexpmatch[1];
        }
    }
    if (obj && obj.constructor) {
        for (var errorname in dwr.engine._errorClasses) {
            if (obj.constructor == dwr.engine._errorClasses[errorname]) return errorname;
        }
    }
    if (obj) {
        var str = Object.prototype.toString.call(obj);
        var regexpmatch = str.match(/\[object\s+(\w+)/);
        if (regexpmatch && regexpmatch.length == 2) {
            return regexpmatch[1];
        }
    }
    return "Object";
};
dwr.engine._serializeXml = function(batch, referto, data, name) {
    var ref = dwr.engine._lookup(referto, data, name);
    if (ref) return ref;
    var output;
    if (window.XMLSerializer) output = new XMLSerializer().serializeToString(data);
    else if (data.toXml) output = data.toXml;
    else output = data.innerHTML;
    return "XML:" + encodeURIComponent(output);
};
dwr.engine._serializeArray = function(batch, referto, data, name) {
    var ref = dwr.engine._lookup(referto, data, name);
    if (ref) return ref;
    if (document.all && !window.opera) {
        var buf = ["Array:["];
        for (var i = 0; i < data.length; i++) {
            if (i != 0) buf.push(",");
            batch.paramCount++;
            var childName = "c" + dwr.engine._batch.map.callCount + "-e" + batch.paramCount;
            dwr.engine._serializeAll(batch, referto, data[i], childName);
            buf.push("reference:");
            buf.push(childName);
        }
        buf.push("]");
        reply = buf.join("");
    }
    else {
        var reply = "Array:[";
        for (var i = 0; i < data.length; i++) {
            if (i != 0) reply += ",";
            batch.paramCount++;
            var childName = "c" + dwr.engine._batch.map.callCount + "-e" + batch.paramCount;
            dwr.engine._serializeAll(batch, referto, data[i], childName);
            reply += "reference:";
            reply += childName;
        }
        reply += "]";
    }
    return reply;
};
dwr.engine._unserializeDocument = function(xml) {
    var dom;
    if (window.DOMParser) {
        var parser = new DOMParser();
        dom = parser.parseFromString(xml, "text/xml");
        if (!dom.documentElement || dom.documentElement.tagName == "parsererror") {
            var message = dom.documentElement.firstChild.data;
            message += "\n" + dom.documentElement.firstChild.nextSibling.firstChild.data;
            throw message;
        }
        return dom;
    }
    else if (window.ActiveXObject) {
        dom = dwr.engine._newActiveXObject(dwr.engine._DOMDocument);
        dom.loadXML(xml);
        return dom;
    }
    else {
        var div = document.createElement("div");
        div.innerHTML = xml;
        return div;
    }
};
dwr.engine._newActiveXObject = function(axarray) {
    var returnValue;
    for (var i = 0; i < axarray.length; i++) {
        try {
            returnValue = new ActiveXObject(axarray[i]);
            break;
        }
        catch(ex) {}
    }
    return returnValue;
};
dwr.engine._debug = function(message, stacktrace) {
    var written = false;
    try {
        if (window.console) {
            if (stacktrace && window.console.trace) window.console.trace();
            window.console.log(message);
            written = true;
        }
        else if (window.opera && window.opera.postError) {
            window.opera.postError(message);
            written = true;
        }
    }
    catch(ex) {}
    if (!written) {
        var debug = document.getElementById("dwr-debug");
        if (debug) {
            var contents = message + "<br/>" + debug.innerHTML;
            if (contents.length > 2048) contents = contents.substring(0, 2048);
            debug.innerHTML = contents;
        }
    }
};