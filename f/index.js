const {isFunction} = require('@taufik-nurrohman/is');
const {toCount} = require('@taufik-nurrohman/to');

function _toIterator(v) {
    return v[Symbol.iterator]();
}

const forEachArray = function (array, at) {
    for (let i = 0, j = toCount(array), v; i < j; ++i) {
        v = at.call(array, array[i], i);
        if (-1 === v) {
            array.splice(i--, 1);
            --j;
            continue;
        } else if (0 === v) {
            break;
        }
    }
    return array;
};

const forEachMap = function (map, at) {
    let items = _toIterator(map),
        item = items.next();
    while (!item.done) {
        let [k, v] = item.value;
        v = at.call(map, v, k);
        if (-1 === v) {
            letValueInMap(k, map);
        } else if (0 === v) {
            break;
        }
        item = items.next();
    }
    return map;
};

const forEachObject = function (object, at) {
    let v;
    for (let k in object) {
        if (!Object.hasOwn(object, k)) {
            continue;
        }
        v = at.call(object, object[k], k);
        if (-1 === v) {
            delete object[k];
            continue;
        } else if (0 === v) {
            break;
        }
    }
    return object;
};

const forEachSet = function (set, at) {
    let items = _toIterator(set),
        item = items.next();
    while (!item.done) {
        let k, v = item.value;
        v = at.call(set, v, k = v);
        if (-1 === v) {
            letValueInMap(k, set);
        } else if (0 === v) {
            break;
        }
        item = items.next();
    }
    return set;
};

const getPrototype = of => of.prototype;

const getReference = key => getValueInMap(key, references) || null;

const getValueInMap = (k, map) => map.get(k);

const hasKeyInMap = (k, map) => map.has(k);

const letReference = k => letValueInMap(k, references);

const letValueInMap = (k, map) => map.delete(k);

const onAnimationsEnd = (node, task) => {
    return (isFunction(node.getAnimations) ? Promise.all(node.getAnimations().map(v => v.finished)).then(task) : task()), node;
};

const setObjectAttributes = function (of, attributes, asStaticAttributes) {
    if (!asStaticAttributes) {
        of = getPrototype(of);
    }
    return forEachObject(attributes, (v, k) => {
        Object.defineProperty(of, k, v);
    }), of;
};

const setObjectMethods = function (of, methods, asStaticMethods) {
    if (!asStaticMethods) {
        of = getPrototype(of);
    }
    return forEachObject(methods, (v, k) => {
        of[k] = v;
    }), of;
};

const setPrototype = (of, value) => (of.prototype = value);

const setReference = (key, value) => setValueInMap(key, value, references);

const setValueInMap = (k, v, map) => map.set(k, v);

const toKeyFirstFromMap = map => toKeysFromMap(map).shift();

const toKeyLastFromMap = map => toKeysFromMap(map).pop();

const toKeysFromMap = function (map) {
    let r = [];
    return forEachMap(map, (v, k) => {
        r.push(k);
    }), r;
};

const toValueFirstFromMap = map => toValuesFromMap(map).shift();

const toValueLastFromMap = map => toValuesFromMap(map).pop();

const toValuesFromMap = function (map) {
    let r = [];
    return forEachMap(map, v => {
        r.push(v);
    }), r;
};

const references = new WeakMap;

Object.assign(exports, {
    forEachArray,
    forEachMap,
    forEachObject,
    forEachSet,
    getPrototype,
    getReference,
    getValueInMap,
    hasKeyInMap,
    letReference,
    letValueInMap,
    onAnimationsEnd,
    setObjectAttributes,
    setObjectMethods,
    setPrototype,
    setReference,
    setValueInMap,
    toKeyFirstFromMap,
    toKeyLastFromMap,
    toKeysFromMap,
    toValueFirstFromMap,
    toValueLastFromMap,
    toValuesFromMap
});