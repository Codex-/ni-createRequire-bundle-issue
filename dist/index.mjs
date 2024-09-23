import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

// node_modules/.pnpm/@antfu+ni@0.23.0/node_modules/@antfu/ni/dist/shared/ni.7b6d0b44.mjs
import fs, { promises, existsSync } from "node:fs";
import path, { join as join$1, dirname as dirname$1, resolve as resolve$1 } from "node:path";
import process$1 from "node:process";
import { createRequire } from "node:module";
import { spawn } from "child_process";
import require$$1$2, { normalize, delimiter as delimiter$2, resolve, dirname } from "path";
import { cwd } from "process";
import { PassThrough } from "stream";
import me from "readline";
import require$$0 from "os";
import require$$1 from "tty";
import require$$2 from "events";
import os$1 from "node:os";
import require$$0$1 from "fs";
import require$$1$1 from "fs/promises";
import fsPromises from "node:fs/promises";
var AGENTS = [
  "npm",
  "yarn",
  "yarn@berry",
  "pnpm",
  "pnpm@6",
  "bun"
];
var LOCKS = {
  "bun.lockb": "bun",
  "pnpm-lock.yaml": "pnpm",
  "yarn.lock": "yarn",
  "package-lock.json": "npm",
  "npm-shrinkwrap.json": "npm"
};
var INSTALL_PAGE = {
  "bun": "https://bun.sh",
  "pnpm": "https://pnpm.io/installation",
  "pnpm@6": "https://pnpm.io/6.x/installation",
  "yarn": "https://classic.yarnpkg.com/en/docs/install",
  "yarn@berry": "https://yarnpkg.com/getting-started/install",
  "npm": "https://docs.npmjs.com/cli/v8/configuring-npm/install"
};
function npmRun(agent) {
  return (args) => {
    if (args.length > 1) {
      return [agent, "run", args[0], "--", ...args.slice(1)];
    } else {
      return [agent, "run", args[0]];
    }
  };
}
var yarn = {
  "agent": ["yarn", 0],
  "run": ["yarn", "run", 0],
  "install": ["yarn", "install", 0],
  "frozen": ["yarn", "install", "--frozen-lockfile"],
  "global": ["yarn", "global", "add", 0],
  "add": ["yarn", "add", 0],
  "upgrade": ["yarn", "upgrade", 0],
  "upgrade-interactive": ["yarn", "upgrade-interactive", 0],
  "execute": ["npx", 0],
  "uninstall": ["yarn", "remove", 0],
  "global_uninstall": ["yarn", "global", "remove", 0]
};
var pnpm = {
  "agent": ["pnpm", 0],
  "run": ["pnpm", "run", 0],
  "install": ["pnpm", "i", 0],
  "frozen": ["pnpm", "i", "--frozen-lockfile"],
  "global": ["pnpm", "add", "-g", 0],
  "add": ["pnpm", "add", 0],
  "upgrade": ["pnpm", "update", 0],
  "upgrade-interactive": ["pnpm", "update", "-i", 0],
  "execute": ["pnpm", "dlx", 0],
  "uninstall": ["pnpm", "remove", 0],
  "global_uninstall": ["pnpm", "remove", "--global", 0]
};
var bun = {
  "agent": ["bun", 0],
  "run": ["bun", "run", 0],
  "install": ["bun", "install", 0],
  "frozen": ["bun", "install", "--frozen-lockfile"],
  "global": ["bun", "add", "-g", 0],
  "add": ["bun", "add", 0],
  "upgrade": ["bun", "update", 0],
  "upgrade-interactive": ["bun", "update", 0],
  "execute": ["bun", "x", 0],
  "uninstall": ["bun", "remove", 0],
  "global_uninstall": ["bun", "remove", "-g", 0]
};
var COMMANDS = {
  "npm": {
    "agent": ["npm", 0],
    "run": npmRun("npm"),
    "install": ["npm", "i", 0],
    "frozen": ["npm", "ci"],
    "global": ["npm", "i", "-g", 0],
    "add": ["npm", "i", 0],
    "upgrade": ["npm", "update", 0],
    "upgrade-interactive": null,
    "execute": ["npx", 0],
    "uninstall": ["npm", "uninstall", 0],
    "global_uninstall": ["npm", "uninstall", "-g", 0]
  },
  "yarn": yarn,
  "yarn@berry": {
    ...yarn,
    "frozen": ["yarn", "install", "--immutable"],
    "upgrade": ["yarn", "up", 0],
    "upgrade-interactive": ["yarn", "up", "-i", 0],
    "execute": ["yarn", "dlx", 0],
    // Yarn 2+ removed 'global', see https://github.com/yarnpkg/berry/issues/821
    "global": ["npm", "i", "-g", 0],
    "global_uninstall": ["npm", "uninstall", "-g", 0]
  },
  "pnpm": pnpm,
  // pnpm v6.x or below
  "pnpm@6": {
    ...pnpm,
    run: npmRun("pnpm")
  },
  "bun": bun
};
function constructCommand(value, args) {
  if (value == null)
    return null;
  const list = typeof value === "function" ? value(args) : value.flatMap((v) => {
    if (typeof v === "number")
      return args;
    return [v];
  });
  return {
    command: list[0],
    args: list.slice(1)
  };
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x2) {
  return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
}
var { hasOwnProperty } = Object.prototype;
var encode = (obj, opt = {}) => {
  if (typeof opt === "string") {
    opt = { section: opt };
  }
  opt.align = opt.align === true;
  opt.newline = opt.newline === true;
  opt.sort = opt.sort === true;
  opt.whitespace = opt.whitespace === true || opt.align === true;
  opt.platform = opt.platform || typeof process !== "undefined" && process.platform;
  opt.bracketedArray = opt.bracketedArray !== false;
  const eol = opt.platform === "win32" ? "\r\n" : "\n";
  const separator = opt.whitespace ? " = " : "=";
  const children = [];
  const keys = opt.sort ? Object.keys(obj).sort() : Object.keys(obj);
  let padToChars = 0;
  if (opt.align) {
    padToChars = safe(
      keys.filter((k) => obj[k] === null || Array.isArray(obj[k]) || typeof obj[k] !== "object").map((k) => Array.isArray(obj[k]) ? `${k}[]` : k).concat([""]).reduce((a, b) => safe(a).length >= safe(b).length ? a : b)
    ).length;
  }
  let out = "";
  const arraySuffix = opt.bracketedArray ? "[]" : "";
  for (const k of keys) {
    const val = obj[k];
    if (val && Array.isArray(val)) {
      for (const item2 of val) {
        out += safe(`${k}${arraySuffix}`).padEnd(padToChars, " ") + separator + safe(item2) + eol;
      }
    } else if (val && typeof val === "object") {
      children.push(k);
    } else {
      out += safe(k).padEnd(padToChars, " ") + separator + safe(val) + eol;
    }
  }
  if (opt.section && out.length) {
    out = "[" + safe(opt.section) + "]" + (opt.newline ? eol + eol : eol) + out;
  }
  for (const k of children) {
    const nk = splitSections(k, ".").join("\\.");
    const section = (opt.section ? opt.section + "." : "") + nk;
    const child = encode(obj[k], {
      ...opt,
      section
    });
    if (out.length && child.length) {
      out += eol;
    }
    out += child;
  }
  return out;
};
function splitSections(str, separator) {
  var lastMatchIndex = 0;
  var lastSeparatorIndex = 0;
  var nextIndex = 0;
  var sections = [];
  do {
    nextIndex = str.indexOf(separator, lastMatchIndex);
    if (nextIndex !== -1) {
      lastMatchIndex = nextIndex + separator.length;
      if (nextIndex > 0 && str[nextIndex - 1] === "\\") {
        continue;
      }
      sections.push(str.slice(lastSeparatorIndex, nextIndex));
      lastSeparatorIndex = nextIndex + separator.length;
    }
  } while (nextIndex !== -1);
  sections.push(str.slice(lastSeparatorIndex));
  return sections;
}
var decode = (str, opt = {}) => {
  opt.bracketedArray = opt.bracketedArray !== false;
  const out = /* @__PURE__ */ Object.create(null);
  let p = out;
  let section = null;
  const re = /^\[([^\]]*)\]\s*$|^([^=]+)(=(.*))?$/i;
  const lines2 = str.split(/[\r\n]+/g);
  const duplicates = {};
  for (const line of lines2) {
    if (!line || line.match(/^\s*[;#]/) || line.match(/^\s*$/)) {
      continue;
    }
    const match = line.match(re);
    if (!match) {
      continue;
    }
    if (match[1] !== void 0) {
      section = unsafe(match[1]);
      if (section === "__proto__") {
        p = /* @__PURE__ */ Object.create(null);
        continue;
      }
      p = out[section] = out[section] || /* @__PURE__ */ Object.create(null);
      continue;
    }
    const keyRaw = unsafe(match[2]);
    let isArray;
    if (opt.bracketedArray) {
      isArray = keyRaw.length > 2 && keyRaw.slice(-2) === "[]";
    } else {
      duplicates[keyRaw] = (duplicates?.[keyRaw] || 0) + 1;
      isArray = duplicates[keyRaw] > 1;
    }
    const key = isArray && keyRaw.endsWith("[]") ? keyRaw.slice(0, -2) : keyRaw;
    if (key === "__proto__") {
      continue;
    }
    const valueRaw = match[3] ? unsafe(match[4]) : true;
    const value = valueRaw === "true" || valueRaw === "false" || valueRaw === "null" ? JSON.parse(valueRaw) : valueRaw;
    if (isArray) {
      if (!hasOwnProperty.call(p, key)) {
        p[key] = [];
      } else if (!Array.isArray(p[key])) {
        p[key] = [p[key]];
      }
    }
    if (Array.isArray(p[key])) {
      p[key].push(value);
    } else {
      p[key] = value;
    }
  }
  const remove2 = [];
  for (const k of Object.keys(out)) {
    if (!hasOwnProperty.call(out, k) || typeof out[k] !== "object" || Array.isArray(out[k])) {
      continue;
    }
    const parts = splitSections(k, ".");
    p = out;
    const l2 = parts.pop();
    const nl = l2.replace(/\\\./g, ".");
    for (const part of parts) {
      if (part === "__proto__") {
        continue;
      }
      if (!hasOwnProperty.call(p, part) || typeof p[part] !== "object") {
        p[part] = /* @__PURE__ */ Object.create(null);
      }
      p = p[part];
    }
    if (p === out && nl === l2) {
      continue;
    }
    p[nl] = out[k];
    remove2.push(k);
  }
  for (const del of remove2) {
    delete out[del];
  }
  return out;
};
var isQuoted = (val) => {
  return val.startsWith('"') && val.endsWith('"') || val.startsWith("'") && val.endsWith("'");
};
var safe = (val) => {
  if (typeof val !== "string" || val.match(/[=\r\n]/) || val.match(/^\[/) || val.length > 1 && isQuoted(val) || val !== val.trim()) {
    return JSON.stringify(val);
  }
  return val.split(";").join("\\;").split("#").join("\\#");
};
var unsafe = (val) => {
  val = (val || "").trim();
  if (isQuoted(val)) {
    if (val.charAt(0) === "'") {
      val = val.slice(1, -1);
    }
    try {
      val = JSON.parse(val);
    } catch {
    }
  } else {
    let esc = false;
    let unesc = "";
    for (let i = 0, l2 = val.length; i < l2; i++) {
      const c = val.charAt(i);
      if (esc) {
        if ("\\;#".indexOf(c) !== -1) {
          unesc += c;
        } else {
          unesc += "\\" + c;
        }
        esc = false;
      } else if (";#".indexOf(c) !== -1) {
        break;
      } else if (c === "\\") {
        esc = true;
      } else {
        unesc += c;
      }
    }
    if (esc) {
      unesc += "\\";
    }
    return unesc.trim();
  }
  return val;
};
var ini = {
  parse: decode,
  decode,
  stringify: encode,
  encode,
  safe,
  unsafe
};
var ini$1 = /* @__PURE__ */ getDefaultExportFromCjs(ini);
async function detect$1({ cwd: cwd2, onUnknown } = {}) {
  for (const directory of lookup(cwd2)) {
    for (const lock of Object.keys(LOCKS)) {
      if (await fileExists(path.join(directory, lock))) {
        const name = LOCKS[lock];
        const result2 = await parsePackageJson(path.join(directory, "package.json"), onUnknown);
        if (result2)
          return result2;
        else
          return { name, agent: name };
      }
    }
    const result = await parsePackageJson(path.join(directory, "package.json"), onUnknown);
    if (result)
      return result;
  }
  return null;
}
function* lookup(cwd2 = process$1.cwd()) {
  let directory = path.resolve(cwd2);
  const { root } = path.parse(directory);
  while (directory && directory !== root) {
    yield directory;
    directory = path.dirname(directory);
  }
}
async function parsePackageJson(filepath, onUnknown) {
  if (!filepath || !await fileExists(filepath))
    return null;
  try {
    const pkg = JSON.parse(fs.readFileSync(filepath, "utf8"));
    let agent;
    if (typeof pkg.packageManager === "string") {
      const [name, ver] = pkg.packageManager.replace(/^\^/, "").split("@");
      let version = ver;
      if (name === "yarn" && Number.parseInt(ver) > 1) {
        agent = "yarn@berry";
        version = "berry";
        return { name, agent, version };
      } else if (name === "pnpm" && Number.parseInt(ver) < 7) {
        agent = "pnpm@6";
        return { name, agent, version };
      } else if (AGENTS.includes(name)) {
        agent = name;
        return { name, agent, version };
      } else {
        return onUnknown?.(pkg.packageManager) ?? null;
      }
    }
  } catch {
  }
  return null;
}
async function fileExists(filePath) {
  try {
    const stats = await fsPromises.stat(filePath);
    if (stats.isFile()) {
      return true;
    }
  } catch {
  }
  return false;
}
var require2 = createRequire(import.meta.url);
var St = Object.create;
var $$1 = Object.defineProperty;
var kt = Object.getOwnPropertyDescriptor;
var Tt = Object.getOwnPropertyNames;
var At = Object.getPrototypeOf;
var Rt = Object.prototype.hasOwnProperty;
var h = /* @__PURE__ */ ((t) => typeof require2 < "u" ? require2 : typeof Proxy < "u" ? new Proxy(t, {
  get: (e, n) => (typeof require2 < "u" ? require2 : e)[n]
}) : t)(function(t) {
  if (typeof require2 < "u") return require2.apply(this, arguments);
  throw Error('Dynamic require of "' + t + '" is not supported');
});
var l = (t, e) => () => (e || t((e = { exports: {} }).exports, e), e.exports);
var $t = (t, e, n, r) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let s of Tt(e))
      !Rt.call(t, s) && s !== n && $$1(t, s, { get: () => e[s], enumerable: !(r = kt(e, s)) || r.enumerable });
  return t;
};
var Nt = (t, e, n) => (n = t != null ? St(At(t)) : {}, $t(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  e || !t || !t.__esModule ? $$1(n, "default", { value: t, enumerable: true }) : n,
  t
));
var W = l((Se, H) => {
  H.exports = z;
  z.sync = Wt;
  var j = h("fs");
  function Ht(t, e) {
    var n = e.pathExt !== void 0 ? e.pathExt : process.env.PATHEXT;
    if (!n || (n = n.split(";"), n.indexOf("") !== -1))
      return true;
    for (var r = 0; r < n.length; r++) {
      var s = n[r].toLowerCase();
      if (s && t.substr(-s.length).toLowerCase() === s)
        return true;
    }
    return false;
  }
  function F(t, e, n) {
    return !t.isSymbolicLink() && !t.isFile() ? false : Ht(e, n);
  }
  function z(t, e, n) {
    j.stat(t, function(r, s) {
      n(r, r ? false : F(s, t, e));
    });
  }
  function Wt(t, e) {
    return F(j.statSync(t), t, e);
  }
});
var X = l((ke, B) => {
  B.exports = K;
  K.sync = Dt;
  var D = h("fs");
  function K(t, e, n) {
    D.stat(t, function(r, s) {
      n(r, r ? false : M(s, e));
    });
  }
  function Dt(t, e) {
    return M(D.statSync(t), e);
  }
  function M(t, e) {
    return t.isFile() && Kt(t, e);
  }
  function Kt(t, e) {
    var n = t.mode, r = t.uid, s = t.gid, o = e.uid !== void 0 ? e.uid : process.getuid && process.getuid(), i = e.gid !== void 0 ? e.gid : process.getgid && process.getgid(), u = parseInt("100", 8), c = parseInt("010", 8), a = parseInt("001", 8), f = u | c, p = n & a || n & c && s === i || n & u && r === o || n & f && o === 0;
    return p;
  }
});
var U = l((Ae, G) => {
  h("fs");
  var v;
  process.platform === "win32" || global.TESTING_WINDOWS ? v = W() : v = X();
  G.exports = y;
  y.sync = Mt;
  function y(t, e, n) {
    if (typeof e == "function" && (n = e, e = {}), !n) {
      if (typeof Promise != "function")
        throw new TypeError("callback not provided");
      return new Promise(function(r, s) {
        y(t, e || {}, function(o, i) {
          o ? s(o) : r(i);
        });
      });
    }
    v(t, e || {}, function(r, s) {
      r && (r.code === "EACCES" || e && e.ignoreErrors) && (r = null, s = false), n(r, s);
    });
  }
  function Mt(t, e) {
    try {
      return v.sync(t, e || {});
    } catch (n) {
      if (e && e.ignoreErrors || n.code === "EACCES")
        return false;
      throw n;
    }
  }
});
var et = l((Re, tt) => {
  var g = process.platform === "win32" || process.env.OSTYPE === "cygwin" || process.env.OSTYPE === "msys", Y = h("path"), Bt = g ? ";" : ":", V = U(), J = (t) => Object.assign(new Error(`not found: ${t}`), { code: "ENOENT" }), Q = (t, e) => {
    let n = e.colon || Bt, r = t.match(/\//) || g && t.match(/\\/) ? [""] : [
      // windows always checks the cwd first
      ...g ? [process.cwd()] : [],
      ...(e.path || process.env.PATH || /* istanbul ignore next: very unusual */
      "").split(n)
    ], s = g ? e.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM" : "", o = g ? s.split(n) : [""];
    return g && t.indexOf(".") !== -1 && o[0] !== "" && o.unshift(""), {
      pathEnv: r,
      pathExt: o,
      pathExtExe: s
    };
  }, Z = (t, e, n) => {
    typeof e == "function" && (n = e, e = {}), e || (e = {});
    let { pathEnv: r, pathExt: s, pathExtExe: o } = Q(t, e), i = [], u = (a) => new Promise((f, p) => {
      if (a === r.length)
        return e.all && i.length ? f(i) : p(J(t));
      let d = r[a], w = /^".*"$/.test(d) ? d.slice(1, -1) : d, m = Y.join(w, t), b = !w && /^\.[\\\/]/.test(t) ? t.slice(0, 2) + m : m;
      f(c(b, a, 0));
    }), c = (a, f, p) => new Promise((d, w) => {
      if (p === s.length)
        return d(u(f + 1));
      let m = s[p];
      V(a + m, { pathExt: o }, (b, Ot) => {
        if (!b && Ot)
          if (e.all)
            i.push(a + m);
          else
            return d(a + m);
        return d(c(a, f, p + 1));
      });
    });
    return n ? u(0).then((a) => n(null, a), n) : u(0);
  }, Xt = (t, e) => {
    e = e || {};
    let { pathEnv: n, pathExt: r, pathExtExe: s } = Q(t, e), o = [];
    for (let i = 0; i < n.length; i++) {
      let u = n[i], c = /^".*"$/.test(u) ? u.slice(1, -1) : u, a = Y.join(c, t), f = !c && /^\.[\\\/]/.test(t) ? t.slice(0, 2) + a : a;
      for (let p = 0; p < r.length; p++) {
        let d = f + r[p];
        try {
          if (V.sync(d, { pathExt: s }))
            if (e.all)
              o.push(d);
            else
              return d;
        } catch {
        }
      }
    }
    if (e.all && o.length)
      return o;
    if (e.nothrow)
      return null;
    throw J(t);
  };
  tt.exports = Z;
  Z.sync = Xt;
});
var rt = l(($e, _) => {
  var nt = (t = {}) => {
    let e = t.env || process.env;
    return (t.platform || process.platform) !== "win32" ? "PATH" : Object.keys(e).reverse().find((r) => r.toUpperCase() === "PATH") || "Path";
  };
  _.exports = nt;
  _.exports.default = nt;
});
var ct = l((Ne, it) => {
  var st = h("path"), Gt = et(), Ut = rt();
  function ot(t, e) {
    let n = t.options.env || process.env, r = process.cwd(), s = t.options.cwd != null, o = s && process.chdir !== void 0 && !process.chdir.disabled;
    if (o)
      try {
        process.chdir(t.options.cwd);
      } catch {
      }
    let i;
    try {
      i = Gt.sync(t.command, {
        path: n[Ut({ env: n })],
        pathExt: e ? st.delimiter : void 0
      });
    } catch {
    } finally {
      o && process.chdir(r);
    }
    return i && (i = st.resolve(s ? t.options.cwd : "", i)), i;
  }
  function Yt(t) {
    return ot(t) || ot(t, true);
  }
  it.exports = Yt;
});
var at = l((qe, C) => {
  var P = /([()\][%!^"`<>&|;, *?])/g;
  function Vt(t) {
    return t = t.replace(P, "^$1"), t;
  }
  function Jt(t, e) {
    return t = `${t}`, t = t.replace(/(\\*)"/g, '$1$1\\"'), t = t.replace(/(\\*)$/, "$1$1"), t = `"${t}"`, t = t.replace(P, "^$1"), e && (t = t.replace(P, "^$1")), t;
  }
  C.exports.command = Vt;
  C.exports.argument = Jt;
});
var lt = l((Ie, ut) => {
  ut.exports = /^#!(.*)/;
});
var dt = l((Le, pt) => {
  var Qt = lt();
  pt.exports = (t = "") => {
    let e = t.match(Qt);
    if (!e)
      return null;
    let [n, r] = e[0].replace(/#! ?/, "").split(" "), s = n.split("/").pop();
    return s === "env" ? r : r ? `${s} ${r}` : s;
  };
});
var ht = l((je, ft) => {
  var O = h("fs"), Zt = dt();
  function te(t) {
    let n = Buffer.alloc(150), r;
    try {
      r = O.openSync(t, "r"), O.readSync(r, n, 0, 150, 0), O.closeSync(r);
    } catch {
    }
    return Zt(n.toString());
  }
  ft.exports = te;
});
var wt = l((Fe, Et) => {
  var ee = h("path"), mt = ct(), gt = at(), ne = ht(), re = process.platform === "win32", se = /\.(?:com|exe)$/i, oe = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
  function ie(t) {
    t.file = mt(t);
    let e = t.file && ne(t.file);
    return e ? (t.args.unshift(t.file), t.command = e, mt(t)) : t.file;
  }
  function ce(t) {
    if (!re)
      return t;
    let e = ie(t), n = !se.test(e);
    if (t.options.forceShell || n) {
      let r = oe.test(e);
      t.command = ee.normalize(t.command), t.command = gt.command(t.command), t.args = t.args.map((o) => gt.argument(o, r));
      let s = [t.command].concat(t.args).join(" ");
      t.args = ["/d", "/s", "/c", `"${s}"`], t.command = process.env.comspec || "cmd.exe", t.options.windowsVerbatimArguments = true;
    }
    return t;
  }
  function ae(t, e, n) {
    e && !Array.isArray(e) && (n = e, e = null), e = e ? e.slice(0) : [], n = Object.assign({}, n);
    let r = {
      command: t,
      args: e,
      options: n,
      file: void 0,
      original: {
        command: t,
        args: e
      }
    };
    return n.shell ? r : ce(r);
  }
  Et.exports = ae;
});
var bt = l((ze, vt) => {
  var S = process.platform === "win32";
  function k(t, e) {
    return Object.assign(new Error(`${e} ${t.command} ENOENT`), {
      code: "ENOENT",
      errno: "ENOENT",
      syscall: `${e} ${t.command}`,
      path: t.command,
      spawnargs: t.args
    });
  }
  function ue(t, e) {
    if (!S)
      return;
    let n = t.emit;
    t.emit = function(r, s) {
      if (r === "exit") {
        let o = xt(s, e);
        if (o)
          return n.call(t, "error", o);
      }
      return n.apply(t, arguments);
    };
  }
  function xt(t, e) {
    return S && t === 1 && !e.file ? k(e.original, "spawn") : null;
  }
  function le(t, e) {
    return S && t === 1 && !e.file ? k(e.original, "spawnSync") : null;
  }
  vt.exports = {
    hookChildProcess: ue,
    verifyENOENT: xt,
    verifyENOENTSync: le,
    notFoundError: k
  };
});
var Pt = l((He, E) => {
  var yt = h("child_process"), T = wt(), A = bt();
  function _t(t, e, n) {
    let r = T(t, e, n), s = yt.spawn(r.command, r.args, r.options);
    return A.hookChildProcess(s, r), s;
  }
  function pe(t, e, n) {
    let r = T(t, e, n), s = yt.spawnSync(r.command, r.args, r.options);
    return s.error = s.error || A.verifyENOENTSync(s.status, r), s;
  }
  E.exports = _t;
  E.exports.spawn = _t;
  E.exports.sync = pe;
  E.exports._parse = T;
  E.exports._enoent = A;
});
var Lt = /^path$/i;
var q = { key: "PATH", value: "" };
function jt(t) {
  for (let e in t) {
    if (!Object.prototype.hasOwnProperty.call(t, e) || !Lt.test(e))
      continue;
    let n = t[e];
    return n ? { key: e, value: n } : q;
  }
  return q;
}
function Ft(t, e) {
  let n = e.value.split(delimiter$2), r = t, s;
  do
    n.push(resolve(r, "node_modules", ".bin")), s = r, r = dirname(r);
  while (r !== s);
  return { key: e.key, value: n.join(delimiter$2) };
}
function I(t, e) {
  let n = {
    ...process.env,
    ...e
  }, r = Ft(t, jt(n));
  return n[r.key] = r.value, n;
}
var L = (t) => {
  let e = t.length, n = new PassThrough(), r = () => {
    --e === 0 && n.emit("end");
  };
  for (let s of t)
    s.pipe(n, { end: false }), s.on("end", r);
  return n;
};
var Ct = Nt(Pt(), 1);
var x = class extends Error {
  result;
  output;
  get exitCode() {
    if (this.result.exitCode !== null)
      return this.result.exitCode;
  }
  constructor(e, n) {
    super(`Process exited with non-zero status (${e.exitCode})`), this.result = e, this.output = n;
  }
};
var ge = {
  timeout: void 0,
  persist: false
};
var Ee = {
  windowsHide: true
};
function we(t, e) {
  return {
    command: normalize(t),
    args: e ?? []
  };
}
function xe(t) {
  let e = new AbortController();
  for (let n of t) {
    if (n.aborted)
      return e.abort(), n;
    let r = () => {
      e.abort(n.reason);
    };
    n.addEventListener("abort", r, {
      signal: e.signal
    });
  }
  return e.signal;
}
var R = class {
  _process;
  _aborted = false;
  _options;
  _command;
  _args;
  _resolveClose;
  _processClosed;
  _thrownError;
  get process() {
    return this._process;
  }
  get pid() {
    return this._process?.pid;
  }
  get exitCode() {
    if (this._process && this._process.exitCode !== null)
      return this._process.exitCode;
  }
  constructor(e, n, r) {
    this._options = {
      ...ge,
      ...r
    }, this._command = e, this._args = n ?? [], this._processClosed = new Promise((s) => {
      this._resolveClose = s;
    });
  }
  kill(e) {
    return this._process?.kill(e) === true;
  }
  get aborted() {
    return this._aborted;
  }
  get killed() {
    return this._process?.killed === true;
  }
  pipe(e, n, r) {
    return be(e, n, {
      ...r,
      stdin: this
    });
  }
  async *[Symbol.asyncIterator]() {
    let e = this._process;
    if (!e)
      return;
    let n = [];
    this._streamErr && n.push(this._streamErr), this._streamOut && n.push(this._streamOut);
    let r = L(n), s = me.createInterface({
      input: r
    });
    for await (let o of s)
      yield o.toString();
    if (await this._processClosed, e.removeAllListeners(), this._thrownError)
      throw this._thrownError;
    if (this._options?.throwOnError && this.exitCode !== 0 && this.exitCode !== void 0)
      throw new x(this);
  }
  async _waitForOutput() {
    let e = this._process;
    if (!e)
      throw new Error("No process was started");
    let n = "", r = "";
    if (this._streamErr)
      for await (let o of this._streamErr)
        n += o.toString();
    if (this._streamOut)
      for await (let o of this._streamOut)
        r += o.toString();
    if (await this._processClosed, this._options?.stdin && await this._options.stdin, e.removeAllListeners(), this._thrownError)
      throw this._thrownError;
    let s = {
      stderr: n,
      stdout: r
    };
    if (this._options.throwOnError && this.exitCode !== 0 && this.exitCode !== void 0)
      throw new x(this, s);
    return s;
  }
  then(e, n) {
    return this._waitForOutput().then(e, n);
  }
  _streamOut;
  _streamErr;
  spawn() {
    let e = cwd(), n = this._options, r = {
      ...Ee,
      ...n.nodeOptions
    }, s = [];
    this._resetState(), n.timeout !== void 0 && s.push(AbortSignal.timeout(n.timeout)), n.signal !== void 0 && s.push(n.signal), n.persist === true && (r.detached = true), s.length > 0 && (r.signal = xe(s)), r.env = I(e, r.env);
    let { command: o, args: i } = we(this._command, this._args), u = (0, Ct._parse)(o, i, r), c = spawn(
      u.command,
      u.args,
      u.options
    );
    if (c.stderr && (this._streamErr = c.stderr), c.stdout && (this._streamOut = c.stdout), this._process = c, c.once("error", this._onError), c.once("close", this._onClose), n.stdin !== void 0 && c.stdin && n.stdin.process) {
      let { stdout: a } = n.stdin.process;
      a && a.pipe(c.stdin);
    }
  }
  _resetState() {
    this._aborted = false, this._processClosed = new Promise((e) => {
      this._resolveClose = e;
    }), this._thrownError = void 0;
  }
  _onError = (e) => {
    if (e.name === "AbortError" && (!(e.cause instanceof Error) || e.cause.name !== "TimeoutError")) {
      this._aborted = true;
      return;
    }
    this._thrownError = e;
  };
  _onClose = () => {
    this._resolveClose && this._resolveClose();
  };
};
var ve = (t, e, n) => {
  let r = new R(t, e, n);
  return r.spawn(), r;
};
var be = ve;
var ESC$1 = "\x1B[";
var OSC = "\x1B]";
var BEL = "\x07";
var SEP = ";";
var isTerminalApp = process.env.TERM_PROGRAM === "Apple_Terminal";
var ansiEscapes = {};
ansiEscapes.cursorTo = (x2, y) => {
  if (typeof x2 !== "number") {
    throw new TypeError("The `x` argument is required");
  }
  if (typeof y !== "number") {
    return ESC$1 + (x2 + 1) + "G";
  }
  return ESC$1 + (y + 1) + ";" + (x2 + 1) + "H";
};
ansiEscapes.cursorMove = (x2, y) => {
  if (typeof x2 !== "number") {
    throw new TypeError("The `x` argument is required");
  }
  let returnValue = "";
  if (x2 < 0) {
    returnValue += ESC$1 + -x2 + "D";
  } else if (x2 > 0) {
    returnValue += ESC$1 + x2 + "C";
  }
  if (y < 0) {
    returnValue += ESC$1 + -y + "A";
  } else if (y > 0) {
    returnValue += ESC$1 + y + "B";
  }
  return returnValue;
};
ansiEscapes.cursorUp = (count = 1) => ESC$1 + count + "A";
ansiEscapes.cursorDown = (count = 1) => ESC$1 + count + "B";
ansiEscapes.cursorForward = (count = 1) => ESC$1 + count + "C";
ansiEscapes.cursorBackward = (count = 1) => ESC$1 + count + "D";
ansiEscapes.cursorLeft = ESC$1 + "G";
ansiEscapes.cursorSavePosition = isTerminalApp ? "\x1B7" : ESC$1 + "s";
ansiEscapes.cursorRestorePosition = isTerminalApp ? "\x1B8" : ESC$1 + "u";
ansiEscapes.cursorGetPosition = ESC$1 + "6n";
ansiEscapes.cursorNextLine = ESC$1 + "E";
ansiEscapes.cursorPrevLine = ESC$1 + "F";
ansiEscapes.cursorHide = ESC$1 + "?25l";
ansiEscapes.cursorShow = ESC$1 + "?25h";
ansiEscapes.eraseLines = (count) => {
  let clear2 = "";
  for (let i = 0; i < count; i++) {
    clear2 += ansiEscapes.eraseLine + (i < count - 1 ? ansiEscapes.cursorUp() : "");
  }
  if (count) {
    clear2 += ansiEscapes.cursorLeft;
  }
  return clear2;
};
ansiEscapes.eraseEndLine = ESC$1 + "K";
ansiEscapes.eraseStartLine = ESC$1 + "1K";
ansiEscapes.eraseLine = ESC$1 + "2K";
ansiEscapes.eraseDown = ESC$1 + "J";
ansiEscapes.eraseUp = ESC$1 + "1J";
ansiEscapes.eraseScreen = ESC$1 + "2J";
ansiEscapes.scrollUp = ESC$1 + "S";
ansiEscapes.scrollDown = ESC$1 + "T";
ansiEscapes.clearScreen = "\x1Bc";
ansiEscapes.clearTerminal = process.platform === "win32" ? `${ansiEscapes.eraseScreen}${ESC$1}0f` : (
  // 1. Erases the screen (Only done in case `2` is not supported)
  // 2. Erases the whole screen including scrollback buffer
  // 3. Moves cursor to the top-left position
  // More info: https://www.real-world-systems.com/docs/ANSIcode.html
  `${ansiEscapes.eraseScreen}${ESC$1}3J${ESC$1}H`
);
ansiEscapes.beep = BEL;
ansiEscapes.link = (text2, url) => {
  return [
    OSC,
    "8",
    SEP,
    SEP,
    url,
    BEL,
    text2,
    OSC,
    "8",
    SEP,
    SEP,
    BEL
  ].join("");
};
ansiEscapes.image = (buffer, options2 = {}) => {
  let returnValue = `${OSC}1337;File=inline=1`;
  if (options2.width) {
    returnValue += `;width=${options2.width}`;
  }
  if (options2.height) {
    returnValue += `;height=${options2.height}`;
  }
  if (options2.preserveAspectRatio === false) {
    returnValue += ";preserveAspectRatio=0";
  }
  return returnValue + ":" + buffer.toString("base64") + BEL;
};
ansiEscapes.iTerm = {
  setCwd: (cwd2 = process.cwd()) => `${OSC}50;CurrentDir=${cwd2}${BEL}`,
  annotation: (message, options2 = {}) => {
    let returnValue = `${OSC}1337;`;
    const hasX = typeof options2.x !== "undefined";
    const hasY = typeof options2.y !== "undefined";
    if ((hasX || hasY) && !(hasX && hasY && typeof options2.length !== "undefined")) {
      throw new Error("`x`, `y` and `length` must be defined when `x` or `y` is defined");
    }
    message = message.replace(/\|/g, "");
    returnValue += options2.isHidden ? "AddHiddenAnnotation=" : "AddAnnotation=";
    if (options2.length > 0) {
      returnValue += (hasX ? [message, options2.length, options2.x, options2.y] : [options2.length, message]).join("|");
    } else {
      returnValue += message;
    }
    return returnValue + BEL;
  }
};
var hasFlag$2 = (flag, argv2 = process.argv) => {
  const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
  const position = argv2.indexOf(prefix + flag);
  const terminatorPosition = argv2.indexOf("--");
  return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
};
var os = require$$0;
var tty = require$$1;
var hasFlag$1 = hasFlag$2;
var { env: env$1 } = process;
var forceColor;
if (hasFlag$1("no-color") || hasFlag$1("no-colors") || hasFlag$1("color=false") || hasFlag$1("color=never")) {
  forceColor = 0;
} else if (hasFlag$1("color") || hasFlag$1("colors") || hasFlag$1("color=true") || hasFlag$1("color=always")) {
  forceColor = 1;
}
if ("FORCE_COLOR" in env$1) {
  if (env$1.FORCE_COLOR === "true") {
    forceColor = 1;
  } else if (env$1.FORCE_COLOR === "false") {
    forceColor = 0;
  } else {
    forceColor = env$1.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env$1.FORCE_COLOR, 10), 3);
  }
}
function translateLevel(level) {
  if (level === 0) {
    return false;
  }
  return {
    level,
    hasBasic: true,
    has256: level >= 2,
    has16m: level >= 3
  };
}
function supportsColor$1(haveStream, streamIsTTY) {
  if (forceColor === 0) {
    return 0;
  }
  if (hasFlag$1("color=16m") || hasFlag$1("color=full") || hasFlag$1("color=truecolor")) {
    return 3;
  }
  if (hasFlag$1("color=256")) {
    return 2;
  }
  if (haveStream && !streamIsTTY && forceColor === void 0) {
    return 0;
  }
  const min = forceColor || 0;
  if (env$1.TERM === "dumb") {
    return min;
  }
  if (process.platform === "win32") {
    const osRelease = os.release().split(".");
    if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
      return Number(osRelease[2]) >= 14931 ? 3 : 2;
    }
    return 1;
  }
  if ("CI" in env$1) {
    if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((sign) => sign in env$1) || env$1.CI_NAME === "codeship") {
      return 1;
    }
    return min;
  }
  if ("TEAMCITY_VERSION" in env$1) {
    return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env$1.TEAMCITY_VERSION) ? 1 : 0;
  }
  if (env$1.COLORTERM === "truecolor") {
    return 3;
  }
  if ("TERM_PROGRAM" in env$1) {
    const version = parseInt((env$1.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
    switch (env$1.TERM_PROGRAM) {
      case "iTerm.app":
        return version >= 3 ? 3 : 2;
      case "Apple_Terminal":
        return 2;
    }
  }
  if (/-256(color)?$/i.test(env$1.TERM)) {
    return 2;
  }
  if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env$1.TERM)) {
    return 1;
  }
  if ("COLORTERM" in env$1) {
    return 1;
  }
  return min;
}
function getSupportLevel(stream) {
  const level = supportsColor$1(stream, stream && stream.isTTY);
  return translateLevel(level);
}
var supportsColor_1 = {
  supportsColor: getSupportLevel,
  stdout: translateLevel(supportsColor$1(true, tty.isatty(1))),
  stderr: translateLevel(supportsColor$1(true, tty.isatty(2)))
};
var supportsColor = supportsColor_1;
var hasFlag = hasFlag$2;
function parseVersion(versionString) {
  if (/^\d{3,4}$/.test(versionString)) {
    const m = /(\d{1,2})(\d{2})/.exec(versionString);
    return {
      major: 0,
      minor: parseInt(m[1], 10),
      patch: parseInt(m[2], 10)
    };
  }
  const versions = (versionString || "").split(".").map((n) => parseInt(n, 10));
  return {
    major: versions[0],
    minor: versions[1],
    patch: versions[2]
  };
}
function supportsHyperlink(stream) {
  const { env: env2 } = process;
  if ("FORCE_HYPERLINK" in env2) {
    return !(env2.FORCE_HYPERLINK.length > 0 && parseInt(env2.FORCE_HYPERLINK, 10) === 0);
  }
  if (hasFlag("no-hyperlink") || hasFlag("no-hyperlinks") || hasFlag("hyperlink=false") || hasFlag("hyperlink=never")) {
    return false;
  }
  if (hasFlag("hyperlink=true") || hasFlag("hyperlink=always")) {
    return true;
  }
  if (!supportsColor.supportsColor(stream)) {
    return false;
  }
  if (stream && !stream.isTTY) {
    return false;
  }
  if (process.platform === "win32") {
    return false;
  }
  if ("NETLIFY" in env2) {
    return true;
  }
  if ("CI" in env2) {
    return false;
  }
  if ("TEAMCITY_VERSION" in env2) {
    return false;
  }
  if ("TERM_PROGRAM" in env2) {
    const version = parseVersion(env2.TERM_PROGRAM_VERSION);
    switch (env2.TERM_PROGRAM) {
      case "iTerm.app":
        if (version.major === 3) {
          return version.minor >= 1;
        }
        return version.major > 3;
    }
  }
  if ("VTE_VERSION" in env2) {
    if (env2.VTE_VERSION === "0.50.0") {
      return false;
    }
    const version = parseVersion(env2.VTE_VERSION);
    return version.major > 0 || version.minor >= 50;
  }
  return false;
}
var supportsHyperlinks = {
  supportsHyperlink,
  stdout: supportsHyperlink(process.stdout),
  stderr: supportsHyperlink(process.stderr)
};
var supportsHyperlinks$1 = /* @__PURE__ */ getDefaultExportFromCjs(supportsHyperlinks);
function terminalLink(text2, url, { target = "stdout", ...options2 } = {}) {
  if (!supportsHyperlinks$1[target]) {
    if (options2.fallback === false) {
      return text2;
    }
    return typeof options2.fallback === "function" ? options2.fallback(text2, url) : `${text2} (\u200B${url}\u200B)`;
  }
  return ansiEscapes.link(text2, url);
}
terminalLink.isSupported = supportsHyperlinks$1.stdout;
terminalLink.stderr = (text2, url, options2 = {}) => terminalLink(text2, url, { target: "stderr", ...options2 });
terminalLink.stderr.isSupported = supportsHyperlinks$1.stderr;
var prompts$3 = {};
var FORCE_COLOR;
var NODE_DISABLE_COLORS;
var NO_COLOR;
var TERM;
var isTTY = true;
if (typeof process !== "undefined") {
  ({ FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM } = process.env || {});
  isTTY = process.stdout && process.stdout.isTTY;
}
var $ = {
  enabled: !NODE_DISABLE_COLORS && NO_COLOR == null && TERM !== "dumb" && (FORCE_COLOR != null && FORCE_COLOR !== "0" || isTTY),
  // modifiers
  reset: init(0, 0),
  bold: init(1, 22),
  dim: init(2, 22),
  italic: init(3, 23),
  underline: init(4, 24),
  inverse: init(7, 27),
  hidden: init(8, 28),
  strikethrough: init(9, 29),
  // colors
  black: init(30, 39),
  red: init(31, 39),
  green: init(32, 39),
  yellow: init(33, 39),
  blue: init(34, 39),
  magenta: init(35, 39),
  cyan: init(36, 39),
  white: init(37, 39),
  gray: init(90, 39),
  grey: init(90, 39),
  // background colors
  bgBlack: init(40, 49),
  bgRed: init(41, 49),
  bgGreen: init(42, 49),
  bgYellow: init(43, 49),
  bgBlue: init(44, 49),
  bgMagenta: init(45, 49),
  bgCyan: init(46, 49),
  bgWhite: init(47, 49)
};
function run$1(arr, str) {
  let i = 0, tmp, beg = "", end = "";
  for (; i < arr.length; i++) {
    tmp = arr[i];
    beg += tmp.open;
    end += tmp.close;
    if (!!~str.indexOf(tmp.close)) {
      str = str.replace(tmp.rgx, tmp.close + tmp.open);
    }
  }
  return beg + str + end;
}
function chain(has, keys) {
  let ctx = { has, keys };
  ctx.reset = $.reset.bind(ctx);
  ctx.bold = $.bold.bind(ctx);
  ctx.dim = $.dim.bind(ctx);
  ctx.italic = $.italic.bind(ctx);
  ctx.underline = $.underline.bind(ctx);
  ctx.inverse = $.inverse.bind(ctx);
  ctx.hidden = $.hidden.bind(ctx);
  ctx.strikethrough = $.strikethrough.bind(ctx);
  ctx.black = $.black.bind(ctx);
  ctx.red = $.red.bind(ctx);
  ctx.green = $.green.bind(ctx);
  ctx.yellow = $.yellow.bind(ctx);
  ctx.blue = $.blue.bind(ctx);
  ctx.magenta = $.magenta.bind(ctx);
  ctx.cyan = $.cyan.bind(ctx);
  ctx.white = $.white.bind(ctx);
  ctx.gray = $.gray.bind(ctx);
  ctx.grey = $.grey.bind(ctx);
  ctx.bgBlack = $.bgBlack.bind(ctx);
  ctx.bgRed = $.bgRed.bind(ctx);
  ctx.bgGreen = $.bgGreen.bind(ctx);
  ctx.bgYellow = $.bgYellow.bind(ctx);
  ctx.bgBlue = $.bgBlue.bind(ctx);
  ctx.bgMagenta = $.bgMagenta.bind(ctx);
  ctx.bgCyan = $.bgCyan.bind(ctx);
  ctx.bgWhite = $.bgWhite.bind(ctx);
  return ctx;
}
function init(open, close) {
  let blk = {
    open: `\x1B[${open}m`,
    close: `\x1B[${close}m`,
    rgx: new RegExp(`\\x1b\\[${close}m`, "g")
  };
  return function(txt) {
    if (this !== void 0 && this.has !== void 0) {
      !!~this.has.indexOf(open) || (this.has.push(open), this.keys.push(blk));
      return txt === void 0 ? this : $.enabled ? run$1(this.keys, txt + "") : txt + "";
    }
    return txt === void 0 ? chain([open], [blk]) : $.enabled ? run$1([blk], txt + "") : txt + "";
  };
}
var kleur = $;
var action$1 = (key, isSelect) => {
  if (key.meta && key.name !== "escape") return;
  if (key.ctrl) {
    if (key.name === "a") return "first";
    if (key.name === "c") return "abort";
    if (key.name === "d") return "abort";
    if (key.name === "e") return "last";
    if (key.name === "g") return "reset";
    if (key.name === "n") return "down";
    if (key.name === "p") return "up";
    return;
  }
  if (isSelect) {
    if (key.name === "j") return "down";
    if (key.name === "k") return "up";
  }
  if (key.name === "return") return "submit";
  if (key.name === "enter") return "submit";
  if (key.name === "backspace") return "delete";
  if (key.name === "delete") return "deleteForward";
  if (key.name === "abort") return "abort";
  if (key.name === "escape") return "exit";
  if (key.name === "tab") return "next";
  if (key.name === "pagedown") return "nextPage";
  if (key.name === "pageup") return "prevPage";
  if (key.name === "home") return "home";
  if (key.name === "end") return "end";
  if (key.name === "up") return "up";
  if (key.name === "down") return "down";
  if (key.name === "right") return "right";
  if (key.name === "left") return "left";
  return false;
};
var strip$2 = (str) => {
  const pattern = [
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PRZcf-ntqry=><~]))"
  ].join("|");
  const RGX = new RegExp(pattern, "g");
  return typeof str === "string" ? str.replace(RGX, "") : str;
};
var ESC = "\x1B";
var CSI = `${ESC}[`;
var beep$1 = "\x07";
var cursor$b = {
  to(x2, y) {
    if (!y) return `${CSI}${x2 + 1}G`;
    return `${CSI}${y + 1};${x2 + 1}H`;
  },
  move(x2, y) {
    let ret = "";
    if (x2 < 0) ret += `${CSI}${-x2}D`;
    else if (x2 > 0) ret += `${CSI}${x2}C`;
    if (y < 0) ret += `${CSI}${-y}A`;
    else if (y > 0) ret += `${CSI}${y}B`;
    return ret;
  },
  up: (count = 1) => `${CSI}${count}A`,
  down: (count = 1) => `${CSI}${count}B`,
  forward: (count = 1) => `${CSI}${count}C`,
  backward: (count = 1) => `${CSI}${count}D`,
  nextLine: (count = 1) => `${CSI}E`.repeat(count),
  prevLine: (count = 1) => `${CSI}F`.repeat(count),
  left: `${CSI}G`,
  hide: `${CSI}?25l`,
  show: `${CSI}?25h`,
  save: `${ESC}7`,
  restore: `${ESC}8`
};
var scroll = {
  up: (count = 1) => `${CSI}S`.repeat(count),
  down: (count = 1) => `${CSI}T`.repeat(count)
};
var erase$7 = {
  screen: `${CSI}2J`,
  up: (count = 1) => `${CSI}1J`.repeat(count),
  down: (count = 1) => `${CSI}J`.repeat(count),
  line: `${CSI}2K`,
  lineEnd: `${CSI}K`,
  lineStart: `${CSI}1K`,
  lines(count) {
    let clear2 = "";
    for (let i = 0; i < count; i++)
      clear2 += this.line + (i < count - 1 ? cursor$b.up() : "");
    if (count)
      clear2 += cursor$b.left;
    return clear2;
  }
};
var src = { cursor: cursor$b, scroll, erase: erase$7, beep: beep$1 };
var strip$1 = strip$2;
var { erase: erase$6, cursor: cursor$a } = src;
var width = (str) => [...strip$1(str)].length;
var clear$9 = function(prompt2, perLine) {
  if (!perLine) return erase$6.line + cursor$a.to(0);
  let rows = 0;
  const lines2 = prompt2.split(/\r?\n/);
  for (let line of lines2) {
    rows += 1 + Math.floor(Math.max(width(line) - 1, 0) / perLine);
  }
  return erase$6.lines(rows);
};
var main = {
  arrowUp: "\u2191",
  arrowDown: "\u2193",
  arrowLeft: "\u2190",
  arrowRight: "\u2192",
  radioOn: "\u25C9",
  radioOff: "\u25EF",
  tick: "\u2714",
  cross: "\u2716",
  ellipsis: "\u2026",
  pointerSmall: "\u203A",
  line: "\u2500",
  pointer: "\u276F"
};
var win = {
  arrowUp: main.arrowUp,
  arrowDown: main.arrowDown,
  arrowLeft: main.arrowLeft,
  arrowRight: main.arrowRight,
  radioOn: "(*)",
  radioOff: "( )",
  tick: "\u221A",
  cross: "\xD7",
  ellipsis: "...",
  pointerSmall: "\xBB",
  line: "\u2500",
  pointer: ">"
};
var figures$8 = process.platform === "win32" ? win : main;
var figures_1 = figures$8;
var c$1 = kleur;
var figures$7 = figures_1;
var styles = Object.freeze({
  password: { scale: 1, render: (input) => "*".repeat(input.length) },
  emoji: { scale: 2, render: (input) => "\u{1F603}".repeat(input.length) },
  invisible: { scale: 0, render: (input) => "" },
  default: { scale: 1, render: (input) => `${input}` }
});
var render = (type) => styles[type] || styles.default;
var symbols = Object.freeze({
  aborted: c$1.red(figures$7.cross),
  done: c$1.green(figures$7.tick),
  exited: c$1.yellow(figures$7.cross),
  default: c$1.cyan("?")
});
var symbol = (done, aborted, exited) => aborted ? symbols.aborted : exited ? symbols.exited : done ? symbols.done : symbols.default;
var delimiter$1 = (completing) => c$1.gray(completing ? figures$7.ellipsis : figures$7.pointerSmall);
var item = (expandable, expanded) => c$1.gray(expandable ? expanded ? figures$7.pointerSmall : "+" : figures$7.line);
var style$9 = {
  styles,
  render,
  symbols,
  symbol,
  delimiter: delimiter$1,
  item
};
var strip = strip$2;
var lines$2 = function(msg, perLine) {
  let lines2 = String(strip(msg) || "").split(/\r?\n/);
  if (!perLine) return lines2.length;
  return lines2.map((l2) => Math.ceil(l2.length / perLine)).reduce((a, b) => a + b);
};
var wrap$3 = (msg, opts = {}) => {
  const tab = Number.isSafeInteger(parseInt(opts.margin)) ? new Array(parseInt(opts.margin)).fill(" ").join("") : opts.margin || "";
  const width2 = opts.width;
  return (msg || "").split(/\r?\n/g).map((line) => line.split(/\s+/g).reduce((arr, w) => {
    if (w.length + tab.length >= width2 || arr[arr.length - 1].length + w.length + 1 < width2)
      arr[arr.length - 1] += ` ${w}`;
    else arr.push(`${tab}${w}`);
    return arr;
  }, [tab]).join("\n")).join("\n");
};
var entriesToDisplay$3 = (cursor2, total, maxVisible) => {
  maxVisible = maxVisible || total;
  let startIndex = Math.min(total - maxVisible, cursor2 - Math.floor(maxVisible / 2));
  if (startIndex < 0) startIndex = 0;
  let endIndex = Math.min(startIndex + maxVisible, total);
  return { startIndex, endIndex };
};
var util = {
  action: action$1,
  clear: clear$9,
  style: style$9,
  strip: strip$2,
  figures: figures_1,
  lines: lines$2,
  wrap: wrap$3,
  entriesToDisplay: entriesToDisplay$3
};
var readline = me;
var { action } = util;
var EventEmitter = require$$2;
var { beep, cursor: cursor$9 } = src;
var color$9 = kleur;
var Prompt$8 = class Prompt extends EventEmitter {
  constructor(opts = {}) {
    super();
    this.firstRender = true;
    this.in = opts.stdin || process.stdin;
    this.out = opts.stdout || process.stdout;
    this.onRender = (opts.onRender || (() => void 0)).bind(this);
    const rl = readline.createInterface({ input: this.in, escapeCodeTimeout: 50 });
    readline.emitKeypressEvents(this.in, rl);
    if (this.in.isTTY) this.in.setRawMode(true);
    const isSelect = ["SelectPrompt", "MultiselectPrompt"].indexOf(this.constructor.name) > -1;
    const keypress = (str, key) => {
      let a = action(key, isSelect);
      if (a === false) {
        this._ && this._(str, key);
      } else if (typeof this[a] === "function") {
        this[a](key);
      } else {
        this.bell();
      }
    };
    this.close = () => {
      this.out.write(cursor$9.show);
      this.in.removeListener("keypress", keypress);
      if (this.in.isTTY) this.in.setRawMode(false);
      rl.close();
      this.emit(this.aborted ? "abort" : this.exited ? "exit" : "submit", this.value);
      this.closed = true;
    };
    this.in.on("keypress", keypress);
  }
  fire() {
    this.emit("state", {
      value: this.value,
      aborted: !!this.aborted,
      exited: !!this.exited
    });
  }
  bell() {
    this.out.write(beep);
  }
  render() {
    this.onRender(color$9);
    if (this.firstRender) this.firstRender = false;
  }
};
var prompt$1 = Prompt$8;
var color$8 = kleur;
var Prompt$7 = prompt$1;
var { erase: erase$5, cursor: cursor$8 } = src;
var { style: style$8, clear: clear$8, lines: lines$1, figures: figures$6 } = util;
var TextPrompt = class extends Prompt$7 {
  constructor(opts = {}) {
    super(opts);
    this.transform = style$8.render(opts.style);
    this.scale = this.transform.scale;
    this.msg = opts.message;
    this.initial = opts.initial || ``;
    this.validator = opts.validate || (() => true);
    this.value = ``;
    this.errorMsg = opts.error || `Please Enter A Valid Value`;
    this.cursor = Number(!!this.initial);
    this.cursorOffset = 0;
    this.clear = clear$8(``, this.out.columns);
    this.render();
  }
  set value(v) {
    if (!v && this.initial) {
      this.placeholder = true;
      this.rendered = color$8.gray(this.transform.render(this.initial));
    } else {
      this.placeholder = false;
      this.rendered = this.transform.render(v);
    }
    this._value = v;
    this.fire();
  }
  get value() {
    return this._value;
  }
  reset() {
    this.value = ``;
    this.cursor = Number(!!this.initial);
    this.cursorOffset = 0;
    this.fire();
    this.render();
  }
  exit() {
    this.abort();
  }
  abort() {
    this.value = this.value || this.initial;
    this.done = this.aborted = true;
    this.error = false;
    this.red = false;
    this.fire();
    this.render();
    this.out.write("\n");
    this.close();
  }
  async validate() {
    let valid = await this.validator(this.value);
    if (typeof valid === `string`) {
      this.errorMsg = valid;
      valid = false;
    }
    this.error = !valid;
  }
  async submit() {
    this.value = this.value || this.initial;
    this.cursorOffset = 0;
    this.cursor = this.rendered.length;
    await this.validate();
    if (this.error) {
      this.red = true;
      this.fire();
      this.render();
      return;
    }
    this.done = true;
    this.aborted = false;
    this.fire();
    this.render();
    this.out.write("\n");
    this.close();
  }
  next() {
    if (!this.placeholder) return this.bell();
    this.value = this.initial;
    this.cursor = this.rendered.length;
    this.fire();
    this.render();
  }
  moveCursor(n) {
    if (this.placeholder) return;
    this.cursor = this.cursor + n;
    this.cursorOffset += n;
  }
  _(c, key) {
    let s1 = this.value.slice(0, this.cursor);
    let s2 = this.value.slice(this.cursor);
    this.value = `${s1}${c}${s2}`;
    this.red = false;
    this.cursor = this.placeholder ? 0 : s1.length + 1;
    this.render();
  }
  delete() {
    if (this.isCursorAtStart()) return this.bell();
    let s1 = this.value.slice(0, this.cursor - 1);
    let s2 = this.value.slice(this.cursor);
    this.value = `${s1}${s2}`;
    this.red = false;
    if (this.isCursorAtStart()) {
      this.cursorOffset = 0;
    } else {
      this.cursorOffset++;
      this.moveCursor(-1);
    }
    this.render();
  }
  deleteForward() {
    if (this.cursor * this.scale >= this.rendered.length || this.placeholder) return this.bell();
    let s1 = this.value.slice(0, this.cursor);
    let s2 = this.value.slice(this.cursor + 1);
    this.value = `${s1}${s2}`;
    this.red = false;
    if (this.isCursorAtEnd()) {
      this.cursorOffset = 0;
    } else {
      this.cursorOffset++;
    }
    this.render();
  }
  first() {
    this.cursor = 0;
    this.render();
  }
  last() {
    this.cursor = this.value.length;
    this.render();
  }
  left() {
    if (this.cursor <= 0 || this.placeholder) return this.bell();
    this.moveCursor(-1);
    this.render();
  }
  right() {
    if (this.cursor * this.scale >= this.rendered.length || this.placeholder) return this.bell();
    this.moveCursor(1);
    this.render();
  }
  isCursorAtStart() {
    return this.cursor === 0 || this.placeholder && this.cursor === 1;
  }
  isCursorAtEnd() {
    return this.cursor === this.rendered.length || this.placeholder && this.cursor === this.rendered.length + 1;
  }
  render() {
    if (this.closed) return;
    if (!this.firstRender) {
      if (this.outputError)
        this.out.write(cursor$8.down(lines$1(this.outputError, this.out.columns) - 1) + clear$8(this.outputError, this.out.columns));
      this.out.write(clear$8(this.outputText, this.out.columns));
    }
    super.render();
    this.outputError = "";
    this.outputText = [
      style$8.symbol(this.done, this.aborted),
      color$8.bold(this.msg),
      style$8.delimiter(this.done),
      this.red ? color$8.red(this.rendered) : this.rendered
    ].join(` `);
    if (this.error) {
      this.outputError += this.errorMsg.split(`
`).reduce((a, l2, i) => a + `
${i ? " " : figures$6.pointerSmall} ${color$8.red().italic(l2)}`, ``);
    }
    this.out.write(erase$5.line + cursor$8.to(0) + this.outputText + cursor$8.save + this.outputError + cursor$8.restore + cursor$8.move(this.cursorOffset, 0));
  }
};
var text = TextPrompt;
var color$7 = kleur;
var Prompt$6 = prompt$1;
var { style: style$7, clear: clear$7, figures: figures$5, wrap: wrap$2, entriesToDisplay: entriesToDisplay$2 } = util;
var { cursor: cursor$7 } = src;
var SelectPrompt = class extends Prompt$6 {
  constructor(opts = {}) {
    super(opts);
    this.msg = opts.message;
    this.hint = opts.hint || "- Use arrow-keys. Return to submit.";
    this.warn = opts.warn || "- This option is disabled";
    this.cursor = opts.initial || 0;
    this.choices = opts.choices.map((ch, idx) => {
      if (typeof ch === "string")
        ch = { title: ch, value: idx };
      return {
        title: ch && (ch.title || ch.value || ch),
        value: ch && (ch.value === void 0 ? idx : ch.value),
        description: ch && ch.description,
        selected: ch && ch.selected,
        disabled: ch && ch.disabled
      };
    });
    this.optionsPerPage = opts.optionsPerPage || 10;
    this.value = (this.choices[this.cursor] || {}).value;
    this.clear = clear$7("", this.out.columns);
    this.render();
  }
  moveCursor(n) {
    this.cursor = n;
    this.value = this.choices[n].value;
    this.fire();
  }
  reset() {
    this.moveCursor(0);
    this.fire();
    this.render();
  }
  exit() {
    this.abort();
  }
  abort() {
    this.done = this.aborted = true;
    this.fire();
    this.render();
    this.out.write("\n");
    this.close();
  }
  submit() {
    if (!this.selection.disabled) {
      this.done = true;
      this.aborted = false;
      this.fire();
      this.render();
      this.out.write("\n");
      this.close();
    } else
      this.bell();
  }
  first() {
    this.moveCursor(0);
    this.render();
  }
  last() {
    this.moveCursor(this.choices.length - 1);
    this.render();
  }
  up() {
    if (this.cursor === 0) {
      this.moveCursor(this.choices.length - 1);
    } else {
      this.moveCursor(this.cursor - 1);
    }
    this.render();
  }
  down() {
    if (this.cursor === this.choices.length - 1) {
      this.moveCursor(0);
    } else {
      this.moveCursor(this.cursor + 1);
    }
    this.render();
  }
  next() {
    this.moveCursor((this.cursor + 1) % this.choices.length);
    this.render();
  }
  _(c, key) {
    if (c === " ") return this.submit();
  }
  get selection() {
    return this.choices[this.cursor];
  }
  render() {
    if (this.closed) return;
    if (this.firstRender) this.out.write(cursor$7.hide);
    else this.out.write(clear$7(this.outputText, this.out.columns));
    super.render();
    let { startIndex, endIndex } = entriesToDisplay$2(this.cursor, this.choices.length, this.optionsPerPage);
    this.outputText = [
      style$7.symbol(this.done, this.aborted),
      color$7.bold(this.msg),
      style$7.delimiter(false),
      this.done ? this.selection.title : this.selection.disabled ? color$7.yellow(this.warn) : color$7.gray(this.hint)
    ].join(" ");
    if (!this.done) {
      this.outputText += "\n";
      for (let i = startIndex; i < endIndex; i++) {
        let title, prefix, desc = "", v = this.choices[i];
        if (i === startIndex && startIndex > 0) {
          prefix = figures$5.arrowUp;
        } else if (i === endIndex - 1 && endIndex < this.choices.length) {
          prefix = figures$5.arrowDown;
        } else {
          prefix = " ";
        }
        if (v.disabled) {
          title = this.cursor === i ? color$7.gray().underline(v.title) : color$7.strikethrough().gray(v.title);
          prefix = (this.cursor === i ? color$7.bold().gray(figures$5.pointer) + " " : "  ") + prefix;
        } else {
          title = this.cursor === i ? color$7.cyan().underline(v.title) : v.title;
          prefix = (this.cursor === i ? color$7.cyan(figures$5.pointer) + " " : "  ") + prefix;
          if (v.description && this.cursor === i) {
            desc = ` - ${v.description}`;
            if (prefix.length + title.length + desc.length >= this.out.columns || v.description.split(/\r?\n/).length > 1) {
              desc = "\n" + wrap$2(v.description, { margin: 3, width: this.out.columns });
            }
          }
        }
        this.outputText += `${prefix} ${title}${color$7.gray(desc)}
`;
      }
    }
    this.out.write(this.outputText);
  }
};
var select = SelectPrompt;
var color$6 = kleur;
var Prompt$5 = prompt$1;
var { style: style$6, clear: clear$6 } = util;
var { cursor: cursor$6, erase: erase$4 } = src;
var TogglePrompt = class extends Prompt$5 {
  constructor(opts = {}) {
    super(opts);
    this.msg = opts.message;
    this.value = !!opts.initial;
    this.active = opts.active || "on";
    this.inactive = opts.inactive || "off";
    this.initialValue = this.value;
    this.render();
  }
  reset() {
    this.value = this.initialValue;
    this.fire();
    this.render();
  }
  exit() {
    this.abort();
  }
  abort() {
    this.done = this.aborted = true;
    this.fire();
    this.render();
    this.out.write("\n");
    this.close();
  }
  submit() {
    this.done = true;
    this.aborted = false;
    this.fire();
    this.render();
    this.out.write("\n");
    this.close();
  }
  deactivate() {
    if (this.value === false) return this.bell();
    this.value = false;
    this.render();
  }
  activate() {
    if (this.value === true) return this.bell();
    this.value = true;
    this.render();
  }
  delete() {
    this.deactivate();
  }
  left() {
    this.deactivate();
  }
  right() {
    this.activate();
  }
  down() {
    this.deactivate();
  }
  up() {
    this.activate();
  }
  next() {
    this.value = !this.value;
    this.fire();
    this.render();
  }
  _(c, key) {
    if (c === " ") {
      this.value = !this.value;
    } else if (c === "1") {
      this.value = true;
    } else if (c === "0") {
      this.value = false;
    } else return this.bell();
    this.render();
  }
  render() {
    if (this.closed) return;
    if (this.firstRender) this.out.write(cursor$6.hide);
    else this.out.write(clear$6(this.outputText, this.out.columns));
    super.render();
    this.outputText = [
      style$6.symbol(this.done, this.aborted),
      color$6.bold(this.msg),
      style$6.delimiter(this.done),
      this.value ? this.inactive : color$6.cyan().underline(this.inactive),
      color$6.gray("/"),
      this.value ? color$6.cyan().underline(this.active) : this.active
    ].join(" ");
    this.out.write(erase$4.line + cursor$6.to(0) + this.outputText);
  }
};
var toggle = TogglePrompt;
var DatePart$9 = class DatePart {
  constructor({ token, date: date2, parts, locales }) {
    this.token = token;
    this.date = date2 || /* @__PURE__ */ new Date();
    this.parts = parts || [this];
    this.locales = locales || {};
  }
  up() {
  }
  down() {
  }
  next() {
    const currentIdx = this.parts.indexOf(this);
    return this.parts.find((part, idx) => idx > currentIdx && part instanceof DatePart);
  }
  setTo(val) {
  }
  prev() {
    let parts = [].concat(this.parts).reverse();
    const currentIdx = parts.indexOf(this);
    return parts.find((part, idx) => idx > currentIdx && part instanceof DatePart);
  }
  toString() {
    return String(this.date);
  }
};
var datepart = DatePart$9;
var DatePart$8 = datepart;
var Meridiem$1 = class Meridiem extends DatePart$8 {
  constructor(opts = {}) {
    super(opts);
  }
  up() {
    this.date.setHours((this.date.getHours() + 12) % 24);
  }
  down() {
    this.up();
  }
  toString() {
    let meridiem2 = this.date.getHours() > 12 ? "pm" : "am";
    return /\A/.test(this.token) ? meridiem2.toUpperCase() : meridiem2;
  }
};
var meridiem = Meridiem$1;
var DatePart$7 = datepart;
var pos = (n) => {
  n = n % 10;
  return n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th";
};
var Day$1 = class Day extends DatePart$7 {
  constructor(opts = {}) {
    super(opts);
  }
  up() {
    this.date.setDate(this.date.getDate() + 1);
  }
  down() {
    this.date.setDate(this.date.getDate() - 1);
  }
  setTo(val) {
    this.date.setDate(parseInt(val.substr(-2)));
  }
  toString() {
    let date2 = this.date.getDate();
    let day2 = this.date.getDay();
    return this.token === "DD" ? String(date2).padStart(2, "0") : this.token === "Do" ? date2 + pos(date2) : this.token === "d" ? day2 + 1 : this.token === "ddd" ? this.locales.weekdaysShort[day2] : this.token === "dddd" ? this.locales.weekdays[day2] : date2;
  }
};
var day = Day$1;
var DatePart$6 = datepart;
var Hours$1 = class Hours extends DatePart$6 {
  constructor(opts = {}) {
    super(opts);
  }
  up() {
    this.date.setHours(this.date.getHours() + 1);
  }
  down() {
    this.date.setHours(this.date.getHours() - 1);
  }
  setTo(val) {
    this.date.setHours(parseInt(val.substr(-2)));
  }
  toString() {
    let hours2 = this.date.getHours();
    if (/h/.test(this.token))
      hours2 = hours2 % 12 || 12;
    return this.token.length > 1 ? String(hours2).padStart(2, "0") : hours2;
  }
};
var hours = Hours$1;
var DatePart$5 = datepart;
var Milliseconds$1 = class Milliseconds extends DatePart$5 {
  constructor(opts = {}) {
    super(opts);
  }
  up() {
    this.date.setMilliseconds(this.date.getMilliseconds() + 1);
  }
  down() {
    this.date.setMilliseconds(this.date.getMilliseconds() - 1);
  }
  setTo(val) {
    this.date.setMilliseconds(parseInt(val.substr(-this.token.length)));
  }
  toString() {
    return String(this.date.getMilliseconds()).padStart(4, "0").substr(0, this.token.length);
  }
};
var milliseconds = Milliseconds$1;
var DatePart$4 = datepart;
var Minutes$1 = class Minutes extends DatePart$4 {
  constructor(opts = {}) {
    super(opts);
  }
  up() {
    this.date.setMinutes(this.date.getMinutes() + 1);
  }
  down() {
    this.date.setMinutes(this.date.getMinutes() - 1);
  }
  setTo(val) {
    this.date.setMinutes(parseInt(val.substr(-2)));
  }
  toString() {
    let m = this.date.getMinutes();
    return this.token.length > 1 ? String(m).padStart(2, "0") : m;
  }
};
var minutes = Minutes$1;
var DatePart$3 = datepart;
var Month$1 = class Month extends DatePart$3 {
  constructor(opts = {}) {
    super(opts);
  }
  up() {
    this.date.setMonth(this.date.getMonth() + 1);
  }
  down() {
    this.date.setMonth(this.date.getMonth() - 1);
  }
  setTo(val) {
    val = parseInt(val.substr(-2)) - 1;
    this.date.setMonth(val < 0 ? 0 : val);
  }
  toString() {
    let month2 = this.date.getMonth();
    let tl = this.token.length;
    return tl === 2 ? String(month2 + 1).padStart(2, "0") : tl === 3 ? this.locales.monthsShort[month2] : tl === 4 ? this.locales.months[month2] : String(month2 + 1);
  }
};
var month = Month$1;
var DatePart$2 = datepart;
var Seconds$1 = class Seconds extends DatePart$2 {
  constructor(opts = {}) {
    super(opts);
  }
  up() {
    this.date.setSeconds(this.date.getSeconds() + 1);
  }
  down() {
    this.date.setSeconds(this.date.getSeconds() - 1);
  }
  setTo(val) {
    this.date.setSeconds(parseInt(val.substr(-2)));
  }
  toString() {
    let s = this.date.getSeconds();
    return this.token.length > 1 ? String(s).padStart(2, "0") : s;
  }
};
var seconds = Seconds$1;
var DatePart$1 = datepart;
var Year$1 = class Year extends DatePart$1 {
  constructor(opts = {}) {
    super(opts);
  }
  up() {
    this.date.setFullYear(this.date.getFullYear() + 1);
  }
  down() {
    this.date.setFullYear(this.date.getFullYear() - 1);
  }
  setTo(val) {
    this.date.setFullYear(val.substr(-4));
  }
  toString() {
    let year2 = String(this.date.getFullYear()).padStart(4, "0");
    return this.token.length === 2 ? year2.substr(-2) : year2;
  }
};
var year = Year$1;
var dateparts = {
  DatePart: datepart,
  Meridiem: meridiem,
  Day: day,
  Hours: hours,
  Milliseconds: milliseconds,
  Minutes: minutes,
  Month: month,
  Seconds: seconds,
  Year: year
};
var color$5 = kleur;
var Prompt$4 = prompt$1;
var { style: style$5, clear: clear$5, figures: figures$4 } = util;
var { erase: erase$3, cursor: cursor$5 } = src;
var { DatePart: DatePart2, Meridiem: Meridiem2, Day: Day2, Hours: Hours2, Milliseconds: Milliseconds2, Minutes: Minutes2, Month: Month2, Seconds: Seconds2, Year: Year2 } = dateparts;
var regex = /\\(.)|"((?:\\["\\]|[^"])+)"|(D[Do]?|d{3,4}|d)|(M{1,4})|(YY(?:YY)?)|([aA])|([Hh]{1,2})|(m{1,2})|(s{1,2})|(S{1,4})|./g;
var regexGroups = {
  1: ({ token }) => token.replace(/\\(.)/g, "$1"),
  2: (opts) => new Day2(opts),
  // Day // TODO
  3: (opts) => new Month2(opts),
  // Month
  4: (opts) => new Year2(opts),
  // Year
  5: (opts) => new Meridiem2(opts),
  // AM/PM // TODO (special)
  6: (opts) => new Hours2(opts),
  // Hours
  7: (opts) => new Minutes2(opts),
  // Minutes
  8: (opts) => new Seconds2(opts),
  // Seconds
  9: (opts) => new Milliseconds2(opts)
  // Fractional seconds
};
var dfltLocales = {
  months: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
  monthsShort: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
  weekdays: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
  weekdaysShort: "Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(",")
};
var DatePrompt = class extends Prompt$4 {
  constructor(opts = {}) {
    super(opts);
    this.msg = opts.message;
    this.cursor = 0;
    this.typed = "";
    this.locales = Object.assign(dfltLocales, opts.locales);
    this._date = opts.initial || /* @__PURE__ */ new Date();
    this.errorMsg = opts.error || "Please Enter A Valid Value";
    this.validator = opts.validate || (() => true);
    this.mask = opts.mask || "YYYY-MM-DD HH:mm:ss";
    this.clear = clear$5("", this.out.columns);
    this.render();
  }
  get value() {
    return this.date;
  }
  get date() {
    return this._date;
  }
  set date(date2) {
    if (date2) this._date.setTime(date2.getTime());
  }
  set mask(mask) {
    let result;
    this.parts = [];
    while (result = regex.exec(mask)) {
      let match = result.shift();
      let idx = result.findIndex((gr) => gr != null);
      this.parts.push(idx in regexGroups ? regexGroups[idx]({ token: result[idx] || match, date: this.date, parts: this.parts, locales: this.locales }) : result[idx] || match);
    }
    let parts = this.parts.reduce((arr, i) => {
      if (typeof i === "string" && typeof arr[arr.length - 1] === "string")
        arr[arr.length - 1] += i;
      else arr.push(i);
      return arr;
    }, []);
    this.parts.splice(0);
    this.parts.push(...parts);
    this.reset();
  }
  moveCursor(n) {
    this.typed = "";
    this.cursor = n;
    this.fire();
  }
  reset() {
    this.moveCursor(this.parts.findIndex((p) => p instanceof DatePart2));
    this.fire();
    this.render();
  }
  exit() {
    this.abort();
  }
  abort() {
    this.done = this.aborted = true;
    this.error = false;
    this.fire();
    this.render();
    this.out.write("\n");
    this.close();
  }
  async validate() {
    let valid = await this.validator(this.value);
    if (typeof valid === "string") {
      this.errorMsg = valid;
      valid = false;
    }
    this.error = !valid;
  }
  async submit() {
    await this.validate();
    if (this.error) {
      this.color = "red";
      this.fire();
      this.render();
      return;
    }
    this.done = true;
    this.aborted = false;
    this.fire();
    this.render();
    this.out.write("\n");
    this.close();
  }
  up() {
    this.typed = "";
    this.parts[this.cursor].up();
    this.render();
  }
  down() {
    this.typed = "";
    this.parts[this.cursor].down();
    this.render();
  }
  left() {
    let prev = this.parts[this.cursor].prev();
    if (prev == null) return this.bell();
    this.moveCursor(this.parts.indexOf(prev));
    this.render();
  }
  right() {
    let next = this.parts[this.cursor].next();
    if (next == null) return this.bell();
    this.moveCursor(this.parts.indexOf(next));
    this.render();
  }
  next() {
    let next = this.parts[this.cursor].next();
    this.moveCursor(next ? this.parts.indexOf(next) : this.parts.findIndex((part) => part instanceof DatePart2));
    this.render();
  }
  _(c) {
    if (/\d/.test(c)) {
      this.typed += c;
      this.parts[this.cursor].setTo(this.typed);
      this.render();
    }
  }
  render() {
    if (this.closed) return;
    if (this.firstRender) this.out.write(cursor$5.hide);
    else this.out.write(clear$5(this.outputText, this.out.columns));
    super.render();
    this.outputText = [
      style$5.symbol(this.done, this.aborted),
      color$5.bold(this.msg),
      style$5.delimiter(false),
      this.parts.reduce((arr, p, idx) => arr.concat(idx === this.cursor && !this.done ? color$5.cyan().underline(p.toString()) : p), []).join("")
    ].join(" ");
    if (this.error) {
      this.outputText += this.errorMsg.split("\n").reduce(
        (a, l2, i) => a + `
${i ? ` ` : figures$4.pointerSmall} ${color$5.red().italic(l2)}`,
        ``
      );
    }
    this.out.write(erase$3.line + cursor$5.to(0) + this.outputText);
  }
};
var date = DatePrompt;
var color$4 = kleur;
var Prompt$3 = prompt$1;
var { cursor: cursor$4, erase: erase$2 } = src;
var { style: style$4, figures: figures$3, clear: clear$4, lines } = util;
var isNumber = /[0-9]/;
var isDef = (any) => any !== void 0;
var round = (number2, precision) => {
  let factor = Math.pow(10, precision);
  return Math.round(number2 * factor) / factor;
};
var NumberPrompt = class extends Prompt$3 {
  constructor(opts = {}) {
    super(opts);
    this.transform = style$4.render(opts.style);
    this.msg = opts.message;
    this.initial = isDef(opts.initial) ? opts.initial : "";
    this.float = !!opts.float;
    this.round = opts.round || 2;
    this.inc = opts.increment || 1;
    this.min = isDef(opts.min) ? opts.min : -Infinity;
    this.max = isDef(opts.max) ? opts.max : Infinity;
    this.errorMsg = opts.error || `Please Enter A Valid Value`;
    this.validator = opts.validate || (() => true);
    this.color = `cyan`;
    this.value = ``;
    this.typed = ``;
    this.lastHit = 0;
    this.render();
  }
  set value(v) {
    if (!v && v !== 0) {
      this.placeholder = true;
      this.rendered = color$4.gray(this.transform.render(`${this.initial}`));
      this._value = ``;
    } else {
      this.placeholder = false;
      this.rendered = this.transform.render(`${round(v, this.round)}`);
      this._value = round(v, this.round);
    }
    this.fire();
  }
  get value() {
    return this._value;
  }
  parse(x2) {
    return this.float ? parseFloat(x2) : parseInt(x2);
  }
  valid(c) {
    return c === `-` || c === `.` && this.float || isNumber.test(c);
  }
  reset() {
    this.typed = ``;
    this.value = ``;
    this.fire();
    this.render();
  }
  exit() {
    this.abort();
  }
  abort() {
    let x2 = this.value;
    this.value = x2 !== `` ? x2 : this.initial;
    this.done = this.aborted = true;
    this.error = false;
    this.fire();
    this.render();
    this.out.write(`
`);
    this.close();
  }
  async validate() {
    let valid = await this.validator(this.value);
    if (typeof valid === `string`) {
      this.errorMsg = valid;
      valid = false;
    }
    this.error = !valid;
  }
  async submit() {
    await this.validate();
    if (this.error) {
      this.color = `red`;
      this.fire();
      this.render();
      return;
    }
    let x2 = this.value;
    this.value = x2 !== `` ? x2 : this.initial;
    this.done = true;
    this.aborted = false;
    this.error = false;
    this.fire();
    this.render();
    this.out.write(`
`);
    this.close();
  }
  up() {
    this.typed = ``;
    if (this.value === "") {
      this.value = this.min - this.inc;
    }
    if (this.value >= this.max) return this.bell();
    this.value += this.inc;
    this.color = `cyan`;
    this.fire();
    this.render();
  }
  down() {
    this.typed = ``;
    if (this.value === "") {
      this.value = this.min + this.inc;
    }
    if (this.value <= this.min) return this.bell();
    this.value -= this.inc;
    this.color = `cyan`;
    this.fire();
    this.render();
  }
  delete() {
    let val = this.value.toString();
    if (val.length === 0) return this.bell();
    this.value = this.parse(val = val.slice(0, -1)) || ``;
    if (this.value !== "" && this.value < this.min) {
      this.value = this.min;
    }
    this.color = `cyan`;
    this.fire();
    this.render();
  }
  next() {
    this.value = this.initial;
    this.fire();
    this.render();
  }
  _(c, key) {
    if (!this.valid(c)) return this.bell();
    const now = Date.now();
    if (now - this.lastHit > 1e3) this.typed = ``;
    this.typed += c;
    this.lastHit = now;
    this.color = `cyan`;
    if (c === `.`) return this.fire();
    this.value = Math.min(this.parse(this.typed), this.max);
    if (this.value > this.max) this.value = this.max;
    if (this.value < this.min) this.value = this.min;
    this.fire();
    this.render();
  }
  render() {
    if (this.closed) return;
    if (!this.firstRender) {
      if (this.outputError)
        this.out.write(cursor$4.down(lines(this.outputError, this.out.columns) - 1) + clear$4(this.outputError, this.out.columns));
      this.out.write(clear$4(this.outputText, this.out.columns));
    }
    super.render();
    this.outputError = "";
    this.outputText = [
      style$4.symbol(this.done, this.aborted),
      color$4.bold(this.msg),
      style$4.delimiter(this.done),
      !this.done || !this.done && !this.placeholder ? color$4[this.color]().underline(this.rendered) : this.rendered
    ].join(` `);
    if (this.error) {
      this.outputError += this.errorMsg.split(`
`).reduce((a, l2, i) => a + `
${i ? ` ` : figures$3.pointerSmall} ${color$4.red().italic(l2)}`, ``);
    }
    this.out.write(erase$2.line + cursor$4.to(0) + this.outputText + cursor$4.save + this.outputError + cursor$4.restore);
  }
};
var number = NumberPrompt;
var color$3 = kleur;
var { cursor: cursor$3 } = src;
var Prompt$2 = prompt$1;
var { clear: clear$3, figures: figures$2, style: style$3, wrap: wrap$1, entriesToDisplay: entriesToDisplay$1 } = util;
var MultiselectPrompt$1 = class MultiselectPrompt extends Prompt$2 {
  constructor(opts = {}) {
    super(opts);
    this.msg = opts.message;
    this.cursor = opts.cursor || 0;
    this.scrollIndex = opts.cursor || 0;
    this.hint = opts.hint || "";
    this.warn = opts.warn || "- This option is disabled -";
    this.minSelected = opts.min;
    this.showMinError = false;
    this.maxChoices = opts.max;
    this.instructions = opts.instructions;
    this.optionsPerPage = opts.optionsPerPage || 10;
    this.value = opts.choices.map((ch, idx) => {
      if (typeof ch === "string")
        ch = { title: ch, value: idx };
      return {
        title: ch && (ch.title || ch.value || ch),
        description: ch && ch.description,
        value: ch && (ch.value === void 0 ? idx : ch.value),
        selected: ch && ch.selected,
        disabled: ch && ch.disabled
      };
    });
    this.clear = clear$3("", this.out.columns);
    if (!opts.overrideRender) {
      this.render();
    }
  }
  reset() {
    this.value.map((v) => !v.selected);
    this.cursor = 0;
    this.fire();
    this.render();
  }
  selected() {
    return this.value.filter((v) => v.selected);
  }
  exit() {
    this.abort();
  }
  abort() {
    this.done = this.aborted = true;
    this.fire();
    this.render();
    this.out.write("\n");
    this.close();
  }
  submit() {
    const selected = this.value.filter((e) => e.selected);
    if (this.minSelected && selected.length < this.minSelected) {
      this.showMinError = true;
      this.render();
    } else {
      this.done = true;
      this.aborted = false;
      this.fire();
      this.render();
      this.out.write("\n");
      this.close();
    }
  }
  first() {
    this.cursor = 0;
    this.render();
  }
  last() {
    this.cursor = this.value.length - 1;
    this.render();
  }
  next() {
    this.cursor = (this.cursor + 1) % this.value.length;
    this.render();
  }
  up() {
    if (this.cursor === 0) {
      this.cursor = this.value.length - 1;
    } else {
      this.cursor--;
    }
    this.render();
  }
  down() {
    if (this.cursor === this.value.length - 1) {
      this.cursor = 0;
    } else {
      this.cursor++;
    }
    this.render();
  }
  left() {
    this.value[this.cursor].selected = false;
    this.render();
  }
  right() {
    if (this.value.filter((e) => e.selected).length >= this.maxChoices) return this.bell();
    this.value[this.cursor].selected = true;
    this.render();
  }
  handleSpaceToggle() {
    const v = this.value[this.cursor];
    if (v.selected) {
      v.selected = false;
      this.render();
    } else if (v.disabled || this.value.filter((e) => e.selected).length >= this.maxChoices) {
      return this.bell();
    } else {
      v.selected = true;
      this.render();
    }
  }
  toggleAll() {
    if (this.maxChoices !== void 0 || this.value[this.cursor].disabled) {
      return this.bell();
    }
    const newSelected = !this.value[this.cursor].selected;
    this.value.filter((v) => !v.disabled).forEach((v) => v.selected = newSelected);
    this.render();
  }
  _(c, key) {
    if (c === " ") {
      this.handleSpaceToggle();
    } else if (c === "a") {
      this.toggleAll();
    } else {
      return this.bell();
    }
  }
  renderInstructions() {
    if (this.instructions === void 0 || this.instructions) {
      if (typeof this.instructions === "string") {
        return this.instructions;
      }
      return `
Instructions:
    ${figures$2.arrowUp}/${figures$2.arrowDown}: Highlight option
    ${figures$2.arrowLeft}/${figures$2.arrowRight}/[space]: Toggle selection
` + (this.maxChoices === void 0 ? `    a: Toggle all
` : "") + `    enter/return: Complete answer`;
    }
    return "";
  }
  renderOption(cursor2, v, i, arrowIndicator) {
    const prefix = (v.selected ? color$3.green(figures$2.radioOn) : figures$2.radioOff) + " " + arrowIndicator + " ";
    let title, desc;
    if (v.disabled) {
      title = cursor2 === i ? color$3.gray().underline(v.title) : color$3.strikethrough().gray(v.title);
    } else {
      title = cursor2 === i ? color$3.cyan().underline(v.title) : v.title;
      if (cursor2 === i && v.description) {
        desc = ` - ${v.description}`;
        if (prefix.length + title.length + desc.length >= this.out.columns || v.description.split(/\r?\n/).length > 1) {
          desc = "\n" + wrap$1(v.description, { margin: prefix.length, width: this.out.columns });
        }
      }
    }
    return prefix + title + color$3.gray(desc || "");
  }
  // shared with autocompleteMultiselect
  paginateOptions(options2) {
    if (options2.length === 0) {
      return color$3.red("No matches for this query.");
    }
    let { startIndex, endIndex } = entriesToDisplay$1(this.cursor, options2.length, this.optionsPerPage);
    let prefix, styledOptions = [];
    for (let i = startIndex; i < endIndex; i++) {
      if (i === startIndex && startIndex > 0) {
        prefix = figures$2.arrowUp;
      } else if (i === endIndex - 1 && endIndex < options2.length) {
        prefix = figures$2.arrowDown;
      } else {
        prefix = " ";
      }
      styledOptions.push(this.renderOption(this.cursor, options2[i], i, prefix));
    }
    return "\n" + styledOptions.join("\n");
  }
  // shared with autocomleteMultiselect
  renderOptions(options2) {
    if (!this.done) {
      return this.paginateOptions(options2);
    }
    return "";
  }
  renderDoneOrInstructions() {
    if (this.done) {
      return this.value.filter((e) => e.selected).map((v) => v.title).join(", ");
    }
    const output = [color$3.gray(this.hint), this.renderInstructions()];
    if (this.value[this.cursor].disabled) {
      output.push(color$3.yellow(this.warn));
    }
    return output.join(" ");
  }
  render() {
    if (this.closed) return;
    if (this.firstRender) this.out.write(cursor$3.hide);
    super.render();
    let prompt2 = [
      style$3.symbol(this.done, this.aborted),
      color$3.bold(this.msg),
      style$3.delimiter(false),
      this.renderDoneOrInstructions()
    ].join(" ");
    if (this.showMinError) {
      prompt2 += color$3.red(`You must select a minimum of ${this.minSelected} choices.`);
      this.showMinError = false;
    }
    prompt2 += this.renderOptions(this.value);
    this.out.write(this.clear + prompt2);
    this.clear = clear$3(prompt2, this.out.columns);
  }
};
var multiselect = MultiselectPrompt$1;
var color$2 = kleur;
var Prompt$1 = prompt$1;
var { erase: erase$1, cursor: cursor$2 } = src;
var { style: style$2, clear: clear$2, figures: figures$1, wrap, entriesToDisplay } = util;
var getVal = (arr, i) => arr[i] && (arr[i].value || arr[i].title || arr[i]);
var getTitle = (arr, i) => arr[i] && (arr[i].title || arr[i].value || arr[i]);
var getIndex = (arr, valOrTitle) => {
  const index = arr.findIndex((el) => el.value === valOrTitle || el.title === valOrTitle);
  return index > -1 ? index : void 0;
};
var AutocompletePrompt = class extends Prompt$1 {
  constructor(opts = {}) {
    super(opts);
    this.msg = opts.message;
    this.suggest = opts.suggest;
    this.choices = opts.choices;
    this.initial = typeof opts.initial === "number" ? opts.initial : getIndex(opts.choices, opts.initial);
    this.select = this.initial || opts.cursor || 0;
    this.i18n = { noMatches: opts.noMatches || "no matches found" };
    this.fallback = opts.fallback || this.initial;
    this.clearFirst = opts.clearFirst || false;
    this.suggestions = [];
    this.input = "";
    this.limit = opts.limit || 10;
    this.cursor = 0;
    this.transform = style$2.render(opts.style);
    this.scale = this.transform.scale;
    this.render = this.render.bind(this);
    this.complete = this.complete.bind(this);
    this.clear = clear$2("", this.out.columns);
    this.complete(this.render);
    this.render();
  }
  set fallback(fb) {
    this._fb = Number.isSafeInteger(parseInt(fb)) ? parseInt(fb) : fb;
  }
  get fallback() {
    let choice;
    if (typeof this._fb === "number")
      choice = this.choices[this._fb];
    else if (typeof this._fb === "string")
      choice = { title: this._fb };
    return choice || this._fb || { title: this.i18n.noMatches };
  }
  moveSelect(i) {
    this.select = i;
    if (this.suggestions.length > 0)
      this.value = getVal(this.suggestions, i);
    else this.value = this.fallback.value;
    this.fire();
  }
  async complete(cb) {
    const p = this.completing = this.suggest(this.input, this.choices);
    const suggestions = await p;
    if (this.completing !== p) return;
    this.suggestions = suggestions.map((s, i, arr) => ({ title: getTitle(arr, i), value: getVal(arr, i), description: s.description }));
    this.completing = false;
    const l2 = Math.max(suggestions.length - 1, 0);
    this.moveSelect(Math.min(l2, this.select));
    cb && cb();
  }
  reset() {
    this.input = "";
    this.complete(() => {
      this.moveSelect(this.initial !== void 0 ? this.initial : 0);
      this.render();
    });
    this.render();
  }
  exit() {
    if (this.clearFirst && this.input.length > 0) {
      this.reset();
    } else {
      this.done = this.exited = true;
      this.aborted = false;
      this.fire();
      this.render();
      this.out.write("\n");
      this.close();
    }
  }
  abort() {
    this.done = this.aborted = true;
    this.exited = false;
    this.fire();
    this.render();
    this.out.write("\n");
    this.close();
  }
  submit() {
    this.done = true;
    this.aborted = this.exited = false;
    this.fire();
    this.render();
    this.out.write("\n");
    this.close();
  }
  _(c, key) {
    let s1 = this.input.slice(0, this.cursor);
    let s2 = this.input.slice(this.cursor);
    this.input = `${s1}${c}${s2}`;
    this.cursor = s1.length + 1;
    this.complete(this.render);
    this.render();
  }
  delete() {
    if (this.cursor === 0) return this.bell();
    let s1 = this.input.slice(0, this.cursor - 1);
    let s2 = this.input.slice(this.cursor);
    this.input = `${s1}${s2}`;
    this.complete(this.render);
    this.cursor = this.cursor - 1;
    this.render();
  }
  deleteForward() {
    if (this.cursor * this.scale >= this.rendered.length) return this.bell();
    let s1 = this.input.slice(0, this.cursor);
    let s2 = this.input.slice(this.cursor + 1);
    this.input = `${s1}${s2}`;
    this.complete(this.render);
    this.render();
  }
  first() {
    this.moveSelect(0);
    this.render();
  }
  last() {
    this.moveSelect(this.suggestions.length - 1);
    this.render();
  }
  up() {
    if (this.select === 0) {
      this.moveSelect(this.suggestions.length - 1);
    } else {
      this.moveSelect(this.select - 1);
    }
    this.render();
  }
  down() {
    if (this.select === this.suggestions.length - 1) {
      this.moveSelect(0);
    } else {
      this.moveSelect(this.select + 1);
    }
    this.render();
  }
  next() {
    if (this.select === this.suggestions.length - 1) {
      this.moveSelect(0);
    } else this.moveSelect(this.select + 1);
    this.render();
  }
  nextPage() {
    this.moveSelect(Math.min(this.select + this.limit, this.suggestions.length - 1));
    this.render();
  }
  prevPage() {
    this.moveSelect(Math.max(this.select - this.limit, 0));
    this.render();
  }
  left() {
    if (this.cursor <= 0) return this.bell();
    this.cursor = this.cursor - 1;
    this.render();
  }
  right() {
    if (this.cursor * this.scale >= this.rendered.length) return this.bell();
    this.cursor = this.cursor + 1;
    this.render();
  }
  renderOption(v, hovered, isStart, isEnd) {
    let desc;
    let prefix = isStart ? figures$1.arrowUp : isEnd ? figures$1.arrowDown : " ";
    let title = hovered ? color$2.cyan().underline(v.title) : v.title;
    prefix = (hovered ? color$2.cyan(figures$1.pointer) + " " : "  ") + prefix;
    if (v.description) {
      desc = ` - ${v.description}`;
      if (prefix.length + title.length + desc.length >= this.out.columns || v.description.split(/\r?\n/).length > 1) {
        desc = "\n" + wrap(v.description, { margin: 3, width: this.out.columns });
      }
    }
    return prefix + " " + title + color$2.gray(desc || "");
  }
  render() {
    if (this.closed) return;
    if (this.firstRender) this.out.write(cursor$2.hide);
    else this.out.write(clear$2(this.outputText, this.out.columns));
    super.render();
    let { startIndex, endIndex } = entriesToDisplay(this.select, this.choices.length, this.limit);
    this.outputText = [
      style$2.symbol(this.done, this.aborted, this.exited),
      color$2.bold(this.msg),
      style$2.delimiter(this.completing),
      this.done && this.suggestions[this.select] ? this.suggestions[this.select].title : this.rendered = this.transform.render(this.input)
    ].join(" ");
    if (!this.done) {
      const suggestions = this.suggestions.slice(startIndex, endIndex).map((item2, i) => this.renderOption(
        item2,
        this.select === i + startIndex,
        i === 0 && startIndex > 0,
        i + startIndex === endIndex - 1 && endIndex < this.choices.length
      )).join("\n");
      this.outputText += `
` + (suggestions || color$2.gray(this.fallback.title));
    }
    this.out.write(erase$1.line + cursor$2.to(0) + this.outputText);
  }
};
var autocomplete = AutocompletePrompt;
var color$1 = kleur;
var { cursor: cursor$1 } = src;
var MultiselectPrompt2 = multiselect;
var { clear: clear$1, style: style$1, figures } = util;
var AutocompleteMultiselectPrompt = class extends MultiselectPrompt2 {
  constructor(opts = {}) {
    opts.overrideRender = true;
    super(opts);
    this.inputValue = "";
    this.clear = clear$1("", this.out.columns);
    this.filteredOptions = this.value;
    this.render();
  }
  last() {
    this.cursor = this.filteredOptions.length - 1;
    this.render();
  }
  next() {
    this.cursor = (this.cursor + 1) % this.filteredOptions.length;
    this.render();
  }
  up() {
    if (this.cursor === 0) {
      this.cursor = this.filteredOptions.length - 1;
    } else {
      this.cursor--;
    }
    this.render();
  }
  down() {
    if (this.cursor === this.filteredOptions.length - 1) {
      this.cursor = 0;
    } else {
      this.cursor++;
    }
    this.render();
  }
  left() {
    this.filteredOptions[this.cursor].selected = false;
    this.render();
  }
  right() {
    if (this.value.filter((e) => e.selected).length >= this.maxChoices) return this.bell();
    this.filteredOptions[this.cursor].selected = true;
    this.render();
  }
  delete() {
    if (this.inputValue.length) {
      this.inputValue = this.inputValue.substr(0, this.inputValue.length - 1);
      this.updateFilteredOptions();
    }
  }
  updateFilteredOptions() {
    const currentHighlight = this.filteredOptions[this.cursor];
    this.filteredOptions = this.value.filter((v) => {
      if (this.inputValue) {
        if (typeof v.title === "string") {
          if (v.title.toLowerCase().includes(this.inputValue.toLowerCase())) {
            return true;
          }
        }
        if (typeof v.value === "string") {
          if (v.value.toLowerCase().includes(this.inputValue.toLowerCase())) {
            return true;
          }
        }
        return false;
      }
      return true;
    });
    const newHighlightIndex = this.filteredOptions.findIndex((v) => v === currentHighlight);
    this.cursor = newHighlightIndex < 0 ? 0 : newHighlightIndex;
    this.render();
  }
  handleSpaceToggle() {
    const v = this.filteredOptions[this.cursor];
    if (v.selected) {
      v.selected = false;
      this.render();
    } else if (v.disabled || this.value.filter((e) => e.selected).length >= this.maxChoices) {
      return this.bell();
    } else {
      v.selected = true;
      this.render();
    }
  }
  handleInputChange(c) {
    this.inputValue = this.inputValue + c;
    this.updateFilteredOptions();
  }
  _(c, key) {
    if (c === " ") {
      this.handleSpaceToggle();
    } else {
      this.handleInputChange(c);
    }
  }
  renderInstructions() {
    if (this.instructions === void 0 || this.instructions) {
      if (typeof this.instructions === "string") {
        return this.instructions;
      }
      return `
Instructions:
    ${figures.arrowUp}/${figures.arrowDown}: Highlight option
    ${figures.arrowLeft}/${figures.arrowRight}/[space]: Toggle selection
    [a,b,c]/delete: Filter choices
    enter/return: Complete answer
`;
    }
    return "";
  }
  renderCurrentInput() {
    return `
Filtered results for: ${this.inputValue ? this.inputValue : color$1.gray("Enter something to filter")}
`;
  }
  renderOption(cursor2, v, i, arrowIndicator) {
    const prefix = (v.selected ? color$1.green(figures.radioOn) : figures.radioOff) + " " + arrowIndicator + " ";
    let title;
    if (v.disabled) title = cursor2 === i ? color$1.gray().underline(v.title) : color$1.strikethrough().gray(v.title);
    else title = cursor2 === i ? color$1.cyan().underline(v.title) : v.title;
    return prefix + title;
  }
  renderDoneOrInstructions() {
    if (this.done) {
      return this.value.filter((e) => e.selected).map((v) => v.title).join(", ");
    }
    const output = [color$1.gray(this.hint), this.renderInstructions(), this.renderCurrentInput()];
    if (this.filteredOptions.length && this.filteredOptions[this.cursor].disabled) {
      output.push(color$1.yellow(this.warn));
    }
    return output.join(" ");
  }
  render() {
    if (this.closed) return;
    if (this.firstRender) this.out.write(cursor$1.hide);
    super.render();
    let prompt2 = [
      style$1.symbol(this.done, this.aborted),
      color$1.bold(this.msg),
      style$1.delimiter(false),
      this.renderDoneOrInstructions()
    ].join(" ");
    if (this.showMinError) {
      prompt2 += color$1.red(`You must select a minimum of ${this.minSelected} choices.`);
      this.showMinError = false;
    }
    prompt2 += this.renderOptions(this.filteredOptions);
    this.out.write(this.clear + prompt2);
    this.clear = clear$1(prompt2, this.out.columns);
  }
};
var autocompleteMultiselect = AutocompleteMultiselectPrompt;
var color = kleur;
var Prompt2 = prompt$1;
var { style, clear } = util;
var { erase, cursor } = src;
var ConfirmPrompt = class extends Prompt2 {
  constructor(opts = {}) {
    super(opts);
    this.msg = opts.message;
    this.value = opts.initial;
    this.initialValue = !!opts.initial;
    this.yesMsg = opts.yes || "yes";
    this.yesOption = opts.yesOption || "(Y/n)";
    this.noMsg = opts.no || "no";
    this.noOption = opts.noOption || "(y/N)";
    this.render();
  }
  reset() {
    this.value = this.initialValue;
    this.fire();
    this.render();
  }
  exit() {
    this.abort();
  }
  abort() {
    this.done = this.aborted = true;
    this.fire();
    this.render();
    this.out.write("\n");
    this.close();
  }
  submit() {
    this.value = this.value || false;
    this.done = true;
    this.aborted = false;
    this.fire();
    this.render();
    this.out.write("\n");
    this.close();
  }
  _(c, key) {
    if (c.toLowerCase() === "y") {
      this.value = true;
      return this.submit();
    }
    if (c.toLowerCase() === "n") {
      this.value = false;
      return this.submit();
    }
    return this.bell();
  }
  render() {
    if (this.closed) return;
    if (this.firstRender) this.out.write(cursor.hide);
    else this.out.write(clear(this.outputText, this.out.columns));
    super.render();
    this.outputText = [
      style.symbol(this.done, this.aborted),
      color.bold(this.msg),
      style.delimiter(this.done),
      this.done ? this.value ? this.yesMsg : this.noMsg : color.gray(this.initialValue ? this.yesOption : this.noOption)
    ].join(" ");
    this.out.write(erase.line + cursor.to(0) + this.outputText);
  }
};
var confirm = ConfirmPrompt;
var elements = {
  TextPrompt: text,
  SelectPrompt: select,
  TogglePrompt: toggle,
  DatePrompt: date,
  NumberPrompt: number,
  MultiselectPrompt: multiselect,
  AutocompletePrompt: autocomplete,
  AutocompleteMultiselectPrompt: autocompleteMultiselect,
  ConfirmPrompt: confirm
};
(function(exports) {
  const $2 = exports;
  const el = elements;
  const noop2 = (v) => v;
  function toPrompt(type, args, opts = {}) {
    return new Promise((res, rej) => {
      const p = new el[type](args);
      const onAbort = opts.onAbort || noop2;
      const onSubmit = opts.onSubmit || noop2;
      const onExit = opts.onExit || noop2;
      p.on("state", args.onState || noop2);
      p.on("submit", (x2) => res(onSubmit(x2)));
      p.on("exit", (x2) => res(onExit(x2)));
      p.on("abort", (x2) => rej(onAbort(x2)));
    });
  }
  $2.text = (args) => toPrompt("TextPrompt", args);
  $2.password = (args) => {
    args.style = "password";
    return $2.text(args);
  };
  $2.invisible = (args) => {
    args.style = "invisible";
    return $2.text(args);
  };
  $2.number = (args) => toPrompt("NumberPrompt", args);
  $2.date = (args) => toPrompt("DatePrompt", args);
  $2.confirm = (args) => toPrompt("ConfirmPrompt", args);
  $2.list = (args) => {
    const sep2 = args.separator || ",";
    return toPrompt("TextPrompt", args, {
      onSubmit: (str) => str.split(sep2).map((s) => s.trim())
    });
  };
  $2.toggle = (args) => toPrompt("TogglePrompt", args);
  $2.select = (args) => toPrompt("SelectPrompt", args);
  $2.multiselect = (args) => {
    args.choices = [].concat(args.choices || []);
    const toSelected = (items) => items.filter((item2) => item2.selected).map((item2) => item2.value);
    return toPrompt("MultiselectPrompt", args, {
      onAbort: toSelected,
      onSubmit: toSelected
    });
  };
  $2.autocompleteMultiselect = (args) => {
    args.choices = [].concat(args.choices || []);
    const toSelected = (items) => items.filter((item2) => item2.selected).map((item2) => item2.value);
    return toPrompt("AutocompleteMultiselectPrompt", args, {
      onAbort: toSelected,
      onSubmit: toSelected
    });
  };
  const byTitle = (input, choices) => Promise.resolve(
    choices.filter((item2) => item2.title.slice(0, input.length).toLowerCase() === input.toLowerCase())
  );
  $2.autocomplete = (args) => {
    args.suggest = args.suggest || byTitle;
    args.choices = [].concat(args.choices || []);
    return toPrompt("AutocompletePrompt", args);
  };
})(prompts$3);
var prompts$2 = prompts$3;
var passOn = ["suggest", "format", "onState", "validate", "onRender", "type"];
var noop = () => {
};
async function prompt(questions = [], { onSubmit = noop, onCancel = noop } = {}) {
  const answers = {};
  const override2 = prompt._override || {};
  questions = [].concat(questions);
  let answer, question, quit, name, type, lastPrompt;
  const getFormattedAnswer = async (question2, answer2, skipValidation = false) => {
    if (!skipValidation && question2.validate && question2.validate(answer2) !== true) {
      return;
    }
    return question2.format ? await question2.format(answer2, answers) : answer2;
  };
  for (question of questions) {
    ({ name, type } = question);
    if (typeof type === "function") {
      type = await type(answer, { ...answers }, question);
      question["type"] = type;
    }
    if (!type) continue;
    for (let key in question) {
      if (passOn.includes(key)) continue;
      let value = question[key];
      question[key] = typeof value === "function" ? await value(answer, { ...answers }, lastPrompt) : value;
    }
    lastPrompt = question;
    if (typeof question.message !== "string") {
      throw new Error("prompt message is required");
    }
    ({ name, type } = question);
    if (prompts$2[type] === void 0) {
      throw new Error(`prompt type (${type}) is not defined`);
    }
    if (override2[question.name] !== void 0) {
      answer = await getFormattedAnswer(question, override2[question.name]);
      if (answer !== void 0) {
        answers[name] = answer;
        continue;
      }
    }
    try {
      answer = prompt._injected ? getInjectedAnswer(prompt._injected, question.initial) : await prompts$2[type](question);
      answers[name] = answer = await getFormattedAnswer(question, answer, true);
      quit = await onSubmit(question, answer, answers);
    } catch (err) {
      quit = !await onCancel(question, answers);
    }
    if (quit) return answers;
  }
  return answers;
}
function getInjectedAnswer(injected, deafultValue) {
  const answer = injected.shift();
  if (answer instanceof Error) {
    throw answer;
  }
  return answer === void 0 ? deafultValue : answer;
}
function inject(answers) {
  prompt._injected = (prompt._injected || []).concat(answers);
}
function override(answers) {
  prompt._override = Object.assign({}, answers);
}
var lib$1 = Object.assign(prompt, { prompt, prompts: prompts$2, inject, override });
var prompts = lib$1;
var prompts$1 = /* @__PURE__ */ getDefaultExportFromCjs(prompts);
var cjs = {};
var posix$1 = {};
Object.defineProperty(posix$1, "__esModule", { value: true });
posix$1.sync = posix$1.isexe = void 0;
var fs_1$1 = require$$0$1;
var promises_1$1 = require$$1$1;
var isexe$2 = async (path2, options2 = {}) => {
  const { ignoreErrors = false } = options2;
  try {
    return checkStat$1(await (0, promises_1$1.stat)(path2), options2);
  } catch (e) {
    const er = e;
    if (ignoreErrors || er.code === "EACCES")
      return false;
    throw er;
  }
};
posix$1.isexe = isexe$2;
var sync$1 = (path2, options2 = {}) => {
  const { ignoreErrors = false } = options2;
  try {
    return checkStat$1((0, fs_1$1.statSync)(path2), options2);
  } catch (e) {
    const er = e;
    if (ignoreErrors || er.code === "EACCES")
      return false;
    throw er;
  }
};
posix$1.sync = sync$1;
var checkStat$1 = (stat, options2) => stat.isFile() && checkMode(stat, options2);
var checkMode = (stat, options2) => {
  const myUid = options2.uid ?? process.getuid?.();
  const myGroups = options2.groups ?? process.getgroups?.() ?? [];
  const myGid = options2.gid ?? process.getgid?.() ?? myGroups[0];
  if (myUid === void 0 || myGid === void 0) {
    throw new Error("cannot get uid or gid");
  }
  const groups = /* @__PURE__ */ new Set([myGid, ...myGroups]);
  const mod = stat.mode;
  const uid = stat.uid;
  const gid = stat.gid;
  const u = parseInt("100", 8);
  const g = parseInt("010", 8);
  const o = parseInt("001", 8);
  const ug = u | g;
  return !!(mod & o || mod & g && groups.has(gid) || mod & u && uid === myUid || mod & ug && myUid === 0);
};
var win32 = {};
Object.defineProperty(win32, "__esModule", { value: true });
win32.sync = win32.isexe = void 0;
var fs_1 = require$$0$1;
var promises_1 = require$$1$1;
var isexe$1 = async (path2, options2 = {}) => {
  const { ignoreErrors = false } = options2;
  try {
    return checkStat(await (0, promises_1.stat)(path2), path2, options2);
  } catch (e) {
    const er = e;
    if (ignoreErrors || er.code === "EACCES")
      return false;
    throw er;
  }
};
win32.isexe = isexe$1;
var sync = (path2, options2 = {}) => {
  const { ignoreErrors = false } = options2;
  try {
    return checkStat((0, fs_1.statSync)(path2), path2, options2);
  } catch (e) {
    const er = e;
    if (ignoreErrors || er.code === "EACCES")
      return false;
    throw er;
  }
};
win32.sync = sync;
var checkPathExt = (path2, options2) => {
  const { pathExt = process.env.PATHEXT || "" } = options2;
  const peSplit = pathExt.split(";");
  if (peSplit.indexOf("") !== -1) {
    return true;
  }
  for (let i = 0; i < peSplit.length; i++) {
    const p = peSplit[i].toLowerCase();
    const ext = path2.substring(path2.length - p.length).toLowerCase();
    if (p && ext === p) {
      return true;
    }
  }
  return false;
};
var checkStat = (stat, path2, options2) => stat.isFile() && checkPathExt(path2, options2);
var options = {};
Object.defineProperty(options, "__esModule", { value: true });
(function(exports) {
  var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === void 0) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() {
        return m[k];
      } };
    }
    Object.defineProperty(o, k2, desc);
  } : function(o, m, k, k2) {
    if (k2 === void 0) k2 = k;
    o[k2] = m[k];
  });
  var __setModuleDefault = commonjsGlobal && commonjsGlobal.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
  } : function(o, v) {
    o["default"] = v;
  });
  var __importStar = commonjsGlobal && commonjsGlobal.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
  };
  var __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function(m, exports2) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.sync = exports.isexe = exports.posix = exports.win32 = void 0;
  const posix2 = __importStar(posix$1);
  exports.posix = posix2;
  const win32$1 = __importStar(win32);
  exports.win32 = win32$1;
  __exportStar(options, exports);
  const platform = process.env._ISEXE_TEST_PLATFORM_ || process.platform;
  const impl = platform === "win32" ? win32$1 : posix2;
  exports.isexe = impl.isexe;
  exports.sync = impl.sync;
})(cjs);
var { isexe, sync: isexeSync } = cjs;
var { join, delimiter, sep, posix } = require$$1$2;
var isWindows = process.platform === "win32";
var rSlash = new RegExp(`[${posix.sep}${sep === posix.sep ? "" : sep}]`.replace(/(\\)/g, "\\$1"));
var rRel = new RegExp(`^\\.${rSlash.source}`);
var getNotFoundError = (cmd) => Object.assign(new Error(`not found: ${cmd}`), { code: "ENOENT" });
var getPathInfo = (cmd, {
  path: optPath = process.env.PATH,
  pathExt: optPathExt = process.env.PATHEXT,
  delimiter: optDelimiter = delimiter
}) => {
  const pathEnv = cmd.match(rSlash) ? [""] : [
    // windows always checks the cwd first
    ...isWindows ? [process.cwd()] : [],
    ...(optPath || /* istanbul ignore next: very unusual */
    "").split(optDelimiter)
  ];
  if (isWindows) {
    const pathExtExe = optPathExt || [".EXE", ".CMD", ".BAT", ".COM"].join(optDelimiter);
    const pathExt = pathExtExe.split(optDelimiter).flatMap((item2) => [item2, item2.toLowerCase()]);
    if (cmd.includes(".") && pathExt[0] !== "") {
      pathExt.unshift("");
    }
    return { pathEnv, pathExt, pathExtExe };
  }
  return { pathEnv, pathExt: [""] };
};
var getPathPart = (raw, cmd) => {
  const pathPart = /^".*"$/.test(raw) ? raw.slice(1, -1) : raw;
  const prefix = !pathPart && rRel.test(cmd) ? cmd.slice(0, 2) : "";
  return prefix + join(pathPart, cmd);
};
var which = async (cmd, opt = {}) => {
  const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt);
  const found = [];
  for (const envPart of pathEnv) {
    const p = getPathPart(envPart, cmd);
    for (const ext of pathExt) {
      const withExt = p + ext;
      const is = await isexe(withExt, { pathExt: pathExtExe, ignoreErrors: true });
      if (is) {
        if (!opt.all) {
          return withExt;
        }
        found.push(withExt);
      }
    }
  }
  if (opt.all && found.length) {
    return found;
  }
  if (opt.nothrow) {
    return null;
  }
  throw getNotFoundError(cmd);
};
var whichSync = (cmd, opt = {}) => {
  const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt);
  const found = [];
  for (const pathEnvPart of pathEnv) {
    const p = getPathPart(pathEnvPart, cmd);
    for (const ext of pathExt) {
      const withExt = p + ext;
      const is = isexeSync(withExt, { pathExt: pathExtExe, ignoreErrors: true });
      if (is) {
        if (!opt.all) {
          return withExt;
        }
        found.push(withExt);
      }
    }
  }
  if (opt.all && found.length) {
    return found;
  }
  if (opt.nothrow) {
    return null;
  }
  throw getNotFoundError(cmd);
};
var lib = which;
which.sync = whichSync;
var which$1 = /* @__PURE__ */ getDefaultExportFromCjs(lib);
function commonjsRequire(path2) {
  throw new Error('Could not dynamically require "' + path2 + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var picocolors = { exports: {} };
var argv = process.argv || [];
var env = process.env;
var isColorSupported = !("NO_COLOR" in env || argv.includes("--no-color")) && ("FORCE_COLOR" in env || argv.includes("--color") || process.platform === "win32" || commonjsRequire != null && require$$1.isatty(1) && env.TERM !== "dumb" || "CI" in env);
var formatter = (open, close, replace = open) => (input) => {
  let string = "" + input;
  let index = string.indexOf(close, open.length);
  return ~index ? open + replaceClose(string, close, replace, index) + close : open + string + close;
};
var replaceClose = (string, close, replace, index) => {
  let result = "";
  let cursor2 = 0;
  do {
    result += string.substring(cursor2, index) + replace;
    cursor2 = index + close.length;
    index = string.indexOf(close, cursor2);
  } while (~index);
  return result + string.substring(cursor2);
};
var createColors = (enabled = isColorSupported) => {
  let init2 = enabled ? formatter : () => String;
  return {
    isColorSupported: enabled,
    reset: init2("\x1B[0m", "\x1B[0m"),
    bold: init2("\x1B[1m", "\x1B[22m", "\x1B[22m\x1B[1m"),
    dim: init2("\x1B[2m", "\x1B[22m", "\x1B[22m\x1B[2m"),
    italic: init2("\x1B[3m", "\x1B[23m"),
    underline: init2("\x1B[4m", "\x1B[24m"),
    inverse: init2("\x1B[7m", "\x1B[27m"),
    hidden: init2("\x1B[8m", "\x1B[28m"),
    strikethrough: init2("\x1B[9m", "\x1B[29m"),
    black: init2("\x1B[30m", "\x1B[39m"),
    red: init2("\x1B[31m", "\x1B[39m"),
    green: init2("\x1B[32m", "\x1B[39m"),
    yellow: init2("\x1B[33m", "\x1B[39m"),
    blue: init2("\x1B[34m", "\x1B[39m"),
    magenta: init2("\x1B[35m", "\x1B[39m"),
    cyan: init2("\x1B[36m", "\x1B[39m"),
    white: init2("\x1B[37m", "\x1B[39m"),
    gray: init2("\x1B[90m", "\x1B[39m"),
    bgBlack: init2("\x1B[40m", "\x1B[49m"),
    bgRed: init2("\x1B[41m", "\x1B[49m"),
    bgGreen: init2("\x1B[42m", "\x1B[49m"),
    bgYellow: init2("\x1B[43m", "\x1B[49m"),
    bgBlue: init2("\x1B[44m", "\x1B[49m"),
    bgMagenta: init2("\x1B[45m", "\x1B[49m"),
    bgCyan: init2("\x1B[46m", "\x1B[49m"),
    bgWhite: init2("\x1B[47m", "\x1B[49m")
  };
};
picocolors.exports = createColors();
picocolors.exports.createColors = createColors;
var picocolorsExports = picocolors.exports;
var CLI_TEMP_DIR = join$1(os$1.tmpdir(), "antfu-ni");
function exclude(arr, ...v) {
  return arr.slice().filter((item2) => !v.includes(item2));
}
function cmdExists(cmd) {
  return which$1.sync(cmd, { nothrow: true }) !== null;
}
async function detect({ autoInstall, programmatic, cwd: cwd2 } = {}) {
  const {
    name,
    agent,
    version
  } = await detect$1({
    cwd: cwd2,
    onUnknown: (packageManager) => {
      if (!programmatic) {
        console.warn("[ni] Unknown packageManager:", packageManager);
      }
      return void 0;
    }
  }) || {};
  if (name && !cmdExists(name) && !programmatic) {
    if (!autoInstall) {
      console.warn(`[ni] Detected ${name} but it doesn't seem to be installed.
`);
      if (process$1.env.CI)
        process$1.exit(1);
      const link = terminalLink(name, INSTALL_PAGE[name]);
      const { tryInstall } = await prompts$1({
        name: "tryInstall",
        type: "confirm",
        message: `Would you like to globally install ${link}?`
      });
      if (!tryInstall)
        process$1.exit(1);
    }
    await ve(
      "npm",
      ["i", "-g", `${name}${version ? `@${version}` : ""}`],
      {
        nodeOptions: {
          stdio: "inherit",
          cwd: cwd2
        },
        throwOnError: true
      }
    );
  }
  return agent;
}
var customRcPath = process$1.env.NI_CONFIG_FILE;
var home = process$1.platform === "win32" ? process$1.env.USERPROFILE : process$1.env.HOME;
var defaultRcPath = path.join(home || "~/", ".nirc");
var rcPath = customRcPath || defaultRcPath;
var defaultConfig = {
  defaultAgent: "prompt",
  globalAgent: "npm"
};
var config;
async function getConfig() {
  if (!config) {
    config = Object.assign(
      {},
      defaultConfig,
      fs.existsSync(rcPath) ? ini$1.parse(fs.readFileSync(rcPath, "utf-8")) : null
    );
    if (process$1.env.NI_DEFAULT_AGENT)
      config.defaultAgent = process$1.env.NI_DEFAULT_AGENT;
    if (process$1.env.NI_GLOBAL_AGENT)
      config.globalAgent = process$1.env.NI_GLOBAL_AGENT;
    const agent = await detect({ programmatic: true });
    if (agent)
      config.defaultAgent = agent;
  }
  return config;
}
async function getDefaultAgent(programmatic) {
  const { defaultAgent } = await getConfig();
  if (defaultAgent === "prompt" && (programmatic || process$1.env.CI))
    return "npm";
  return defaultAgent;
}
async function getGlobalAgent() {
  const { globalAgent } = await getConfig();
  return globalAgent;
}
var UnsupportedCommand = class extends Error {
  constructor({ agent, command }) {
    super(`Command "${command}" is not support by agent "${agent}"`);
  }
};
function getCommand(agent, command, args = []) {
  if (!COMMANDS[agent])
    throw new Error(`Unsupported agent "${agent}"`);
  if (!COMMANDS[agent][command])
    throw new UnsupportedCommand({ agent, command });
  return constructCommand(COMMANDS[agent][command], args);
}
var parseNr = (agent, args) => {
  if (args.length === 0)
    args.push("start");
  let hasIfPresent = false;
  if (args.includes("--if-present")) {
    args = exclude(args, "--if-present");
    hasIfPresent = true;
  }
  const cmd = getCommand(agent, "run", args);
  if (!cmd)
    return cmd;
  if (hasIfPresent)
    cmd.args.splice(1, 0, "--if-present");
  return cmd;
};
async function getCliCommand(fn, args, options2 = {}, cwd2 = options2.cwd ?? process$1.cwd()) {
  const isGlobal = args.includes("-g");
  if (isGlobal)
    return await fn(await getGlobalAgent(), args);
  let agent = await detect({ ...options2, cwd: cwd2 }) || await getDefaultAgent(options2.programmatic);
  if (agent === "prompt") {
    agent = (await prompts$1({
      name: "agent",
      type: "select",
      message: "Choose the agent",
      choices: AGENTS.filter((i) => !i.includes("@")).map((value) => ({ title: value, value }))
    })).agent;
    if (!agent)
      return;
  }
  return await fn(agent, args, {
    programmatic: options2.programmatic,
    hasLock: Boolean(agent),
    cwd: cwd2
  });
}

// src/main.ts
async function buildRunKnipCommand(buildScriptName) {
  const cmd = await getCliCommand(
    parseNr,
    [buildScriptName, "--reporter json"],
    {
      programmatic: true
    }
  );
  if (!cmd) {
    throw new Error("Unable to generate command for package manager");
  }
  const command = `${cmd.command} ${cmd.args.join(" ")}`;
  return command;
}
export {
  buildRunKnipCommand
};
