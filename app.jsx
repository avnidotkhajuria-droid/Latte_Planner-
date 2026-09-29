/* LattePlanner · source. Edit this, then rebuild app.js:
   npx esbuild src/app.jsx --loader:.jsx=jsx --minify --target=es2019 --outfile=app.js */

const { useState, useEffect, useMemo, useRef, useCallback, createContext, useContext } = React;

/* =============== icons =============== */
const I = {
  home:["M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"],
  calendar:["M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5z","M4 9.5h16","M8.5 2.5v3","M15.5 2.5v3"],
  sun:["M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z","M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"],
  book:["M4 19.5v-14A2.5 2.5 0 0 1 6.5 3H20v14H6.5A2.5 2.5 0 0 0 4 19.5 2.5 2.5 0 0 0 6.5 22H20"],
  wallet:["M3 7a2 2 0 0 1 2-2h12v3","M3 7v11a2 2 0 0 0 2 2h15V8H5a2 2 0 0 1-2-1","M16.5 14h.01"],
  pen:["M12 20h9","M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"],
  sliders:["M4 6h9M17 6h3M4 12h3M11 12h9M4 18h11M19 18h1","M15 4v4M9 10v4M17 16v4"],
  search:["M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14z","M20 20l-3.5-3.5"],
  plus:["M12 5v14M5 12h14"],
  check:["M5 12.5l4.5 4.5L19 7.5"],
  cloud:["M7 18h10a4 4 0 0 0 .5-7.97A6 6 0 0 0 6.1 11 3.5 3.5 0 0 0 7 18z"],
  rain:["M7 15h10a4 4 0 0 0 .5-7.97A6 6 0 0 0 6.1 8 3.5 3.5 0 0 0 7 15z","M9 21l1-2.5M13 21l1-2.5M17 20l.7-1.8"],
  coffee:["M4 8h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z","M17 9.5h1.5a2.5 2.5 0 0 1 0 5H17","M8 2.5c0 1 1 1 1 2s-1 1-1 2M12 2.5c0 1 1 1 1 2s-1 1-1 2","M5 21h11"],
  food:["M3 11h18a9 9 0 0 1-18 0z","M8 7.5c0-1.5 1-2 1-3.5M12 7.5c0-1.5 1-2 1-3.5M16 7.5c0-1.5 1-2 1-3.5"],
  bus:["M5 5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v12H5z","M5 11h14","M8 20v-3M16 20v-3","M8 14.5h.01M16 14.5h.01"],
  pencil:["M14.5 4.5l5 5L9 20H4v-5z","M12.5 6.5l5 5"],
  trash:["M4 7h16","M9 7V4h6v3","M6 7l1 13h10l1-13"],
  image:["M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z","M4 16l5-5 4 4 2-2 5 5","M15.5 8.5h.01"],
  clip:["M20 11.5l-8.2 8.2a5 5 0 0 1-7.1-7.1l8.5-8.5a3.3 3.3 0 0 1 4.7 4.7l-8.3 8.3a1.7 1.7 0 0 1-2.4-2.4l7.6-7.6"],
  smile:["M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z","M8.5 14c1 1.3 2.2 2 3.5 2s2.5-.7 3.5-2","M9 9.5h.01M15 9.5h.01"],
  play:["M8 5.5v13l11-6.5z"],
  pause:["M8.5 5v14M15.5 5v14"],
  reset:["M4 12a8 8 0 1 0 2.5-5.8","M4 4v4h4"],
  chevL:["M15 5l-7 7 7 7"], chevR:["M9 5l7 7-7 7"],
  clock:["M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z","M12 7v5l3 2"],
  heart:["M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"],
  moon:["M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"],
  sunrise:["M3 18h18","M7 18a5 5 0 0 1 10 0","M12 5v4M5.6 10.6 7 12M18.4 10.6 17 12"],
  drop:["M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"],
  leaf:["M5 19c0-8 5-14 15-14 0 10-6 15-14 15","M5 19l7-7"],
  sparkle:["M12 3v5M12 16v5M3 12h5M16 12h5","M6.5 6.5l2 2M15.5 15.5l2 2M6.5 17.5l2-2M15.5 8.5l2-2"],
  pin:["M12 21s7-6 7-12a7 7 0 0 0-14 0c0 6 7 12 7 12z","M12 7a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"],
  phone:["M6 3h4l1.5 4.5L9 9a11 11 0 0 0 6 6l1.5-2.5L21 14v4a2 2 0 0 1-2 2A17 17 0 0 1 4 5a2 2 0 0 1 2-2z"],
  code:["M8 7l-5 5 5 5M16 7l5 5-5 5"],
  flask:["M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.7 3h10.6a2 2 0 0 0 1.7-3l-5-9V3","M7.5 15h9"],
  cap:["M2 9l10-5 10 5-10 5z","M6 11v5c2 2 10 2 12 0v-5"],
  bed:["M3 18V8M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5","M7 11.5h.01"],
  volume:["M4 9h4l5-4v14l-5-4H4z","M16.5 9a4 4 0 0 1 0 6M19 6.5a7.5 7.5 0 0 1 0 11"],
  x:["M6 6l12 12M18 6L6 18"],
  gift:["M4 11h16v9H4z","M3 7.5h18V11H3z","M12 7.5V20","M12 7.5C10.5 4.5 7 4.5 7 6.2s3 1.3 5 1.3c2 0 5 .4 5-1.3S13.5 4.5 12 7.5"],
  star:["M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"],
  flag:["M5 21V4M5 4h11l-2 4 2 4H5"],
  bookOpen:["M2 5c3-1 7-1 10 1 3-2 7-2 10-1v14c-3-1-7-1-10 1-3-2-7-2-10-1z","M12 6v14"],
  cup:["M6 8h11v6a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5z","M17 10h1a2 2 0 0 1 0 4h-1"],
  note:["M5 4h14v11l-5 5H5z","M14 20v-5h5"],
  shirt:["M8 3 3 6l2 4 3-1v12h8V9l3 1 2-4-5-3a4 4 0 0 1-8 0z"],
  camera:["M4 8h3l2-3h6l2 3h3v11H4z","M12 10a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z"],
  repeat:["M17 2l3 3-3 3","M4 11V9a4 4 0 0 1 4-4h12","M7 22l-3-3 3-3","M20 13v2a4 4 0 0 1-4 4H4"],
  chart:["M4 20V11M10 20V5M16 20v-6M3 20h18"],
  user:["M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z","M4 21c1-4 4-6 8-6s7 2 8 6"],
  news:["M4 5h13v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z","M17 8h3v11a2 2 0 0 1-2 2","M7 9h7M7 13h7M7 17h4"],
  music:["M9 18V5l11-2v13","M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0z","M20 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"],
  palette:["M12 3a9 9 0 1 0 0 18c1.1 0 1.5-.8 1.5-1.6 0-1.3-1-1.4-1-2.6 0-.9.7-1.6 1.6-1.6H16a5 5 0 0 0 5-5c0-3.9-4-7.2-9-7.2z","M7.5 11h.01M10 7.5h.01M14.5 7.5h.01"],
  external:["M14 4h6v6","M20 4l-9 9","M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"],
  copy:["M9 9h11v11H9z","M5 15H4V4h11v1"],
  list:["M9 6h11M9 12h11M9 18h11","M4 6h.01M4 12h.01M4 18h.01"],
  award:["M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12z","M8.5 14l-1.5 7 5-3 5 3-1.5-7"],
  target:["M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z","M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z","M12 12h.01"],
  briefcase:["M4 8h16v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z","M9 8V5h6v3","M4 13h16"],
  fire:["M12 21c-4 0-7-2.7-7-6.5 0-3 2-5 3.5-6.5.3 1.8 1.3 3 2.5 3.5C10.5 8 12 5 14.5 3c.2 3 3.5 5.5 3.5 10.5 0 4.3-2.7 7.5-6 7.5z"],
  bed2:["M3 18V8M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5","M7 11.5h.01"],
  users:["M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z","M2.5 20c.6-3.4 3.3-5.5 6.5-5.5s5.9 2.1 6.5 5.5","M16 4.5a3.5 3.5 0 0 1 0 6.5M18 14.8c2 .7 3.2 2.5 3.5 5.2"],
};
function Icon({ n, s = 18, sw = 1.7, style }) {
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={style}>
    {(I[n] || []).map((d, i) => <path key={i} d={d} />)}
  </svg>;
}

/* =============== helpers =============== */
const pad = n => String(n).padStart(2, "0");
const isoOf = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parseISO = s => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
const startToday = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
const todayISO = () => isoOf(new Date());
const daysUntil = s => Math.round((parseISO(s) - startToday()) / 864e5);
const fmtDay = s => parseISO(s).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
const fmtLong = s => parseISO(s).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });
const rupee = n => "₹" + Math.round(n).toLocaleString("en-IN");
const toMin = t => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
const fmt12 = t => { let [h, m] = t.split(":").map(Number); const ap = h >= 12 ? "pm" : "am"; h = h % 12 || 12; return `${h}:${pad(m)} ${ap}`; };
const uid = () => Math.random().toString(36).slice(2, 9);
function relDays(s) {
  const d = daysUntil(s);
  if (d < 0) return { text: `${-d}d ago`, cls: "calm" };
  if (d === 0) return { text: "Today", cls: "hot" };
  if (d === 1) return { text: "Tomorrow", cls: "hot" };
  if (d <= 3) return { text: `In ${d} days`, cls: "hot" };
  if (d <= 7) return { text: `In ${d} days`, cls: "warm" };
  return { text: `In ${d} days`, cls: "calm" };
}
/* ============ Standalone backend: Firebase (Google sign-in + Firestore) ============ */
const CFG = window.LATTE_CONFIG || {};
const FB_ON = !!(CFG.firebase && CFG.firebase.apiKey && window.firebase);
if (FB_ON) {
  try {
    firebase.initializeApp(CFG.firebase);
    firebase.firestore().enablePersistence({ synchronizeTabs: true }).catch(() => {});
  } catch (e) { console.warn("Firebase init failed", e); }
}
const userCol = (uid, name) => firebase.firestore().collection("users").doc(uid).collection(name);
/* Saves every piece of the planner in this browser AND in the signed-in user's Firestore space.
   Newest copy wins; changes from other devices arrive live. */
const Sync = (() => {
  let col = null, ready = false, unsub = null; const cloud = {}, subs = {}, timers = {};
  const LOCAL_ONLY = new Set(["draft"]);
  const listeners = new Set();
  const fire = (k) => (subs[k] || []).forEach(fn => fn(cloud[k] || null));
  const parse = d => { try { return d && d.at ? { v: JSON.parse(d.j), at: d.at } : null; } catch (e) { return null; } };
  return {
    sub(key, fn) { (subs[key] = subs[key] || new Set()).add(fn); if (ready) fn(cloud[key] || null); return () => subs[key].delete(fn); },
    onStatus(fn) { listeners.add(fn); return () => listeners.delete(fn); },
    get ready() { return ready; },
    async start(user) {
      try {
        col = userCol(user.uid, "state");
        const snap = await col.get();
        snap.forEach(doc => { const p = parse(doc.data()); if (p) cloud[doc.id] = p; });
        ready = true;
        Object.keys(subs).forEach(fire);
        listeners.forEach(fn => fn(true));
        unsub = col.onSnapshot(s => s.docChanges().forEach(ch => {
          if (ch.type === "removed") return;
          const p = parse(ch.doc.data()); if (!p) return;
          const cur = cloud[ch.doc.id]; if (cur && cur.at >= p.at) return;
          cloud[ch.doc.id] = p; fire(ch.doc.id);
        }), () => {});
      } catch (e) { console.warn("Sync failed", e); }
    },
    stop() { if (unsub) unsub(); unsub = null; col = null; ready = false; listeners.forEach(fn => fn(false)); },
    push(key, v, at) {
      if (!ready || LOCAL_ONLY.has(key)) return;
      clearTimeout(timers[key]);
      timers[key] = setTimeout(() => {
        let j; try { j = JSON.stringify(v); } catch (e) { return; }
        if (j.length > 900000) { console.warn("Too big to sync:", key); return; }
        cloud[key] = { v, at };
        col.doc(key).set({ j, at }).catch(e => console.warn("Save failed", key, e));
      }, 1000);
    },
    /* write a whole backup at once (import) */
    async writeAll(data) {
      const at = Date.now();
      Object.entries(data).forEach(([k, v]) => { try { localStorage.setItem("latte:" + k, JSON.stringify(v)); localStorage.setItem("latte@" + k, String(at)); } catch (e) {} });
      if (ready && col) await Promise.all(Object.entries(data).filter(([k]) => !LOCAL_ONLY.has(k)).map(([k, v]) => col.doc(k).set({ j: JSON.stringify(v), at })));
    },
  };
})();
function usePersist(key, init) {
  const [st, setSt] = useState(() => {
    try {
      const s = localStorage.getItem("latte:" + key);
      if (s) return { v: JSON.parse(s), at: +localStorage.getItem("latte@" + key) || 0 };
    } catch (e) {}
    return { v: typeof init === "function" ? init() : init, at: 0 };
  });
  useEffect(() => Sync.sub(key, remote => setSt(cur => {
    if (remote && remote.at > cur.at) return { v: remote.v, at: remote.at, fromCloud: true };
    if (cur.at > (remote ? remote.at : 0)) Sync.push(key, cur.v, cur.at);
    return cur;
  })), [key]);
  useEffect(() => {
    try { localStorage.setItem("latte:" + key, JSON.stringify(st.v)); localStorage.setItem("latte@" + key, String(st.at)); } catch (e) {}
    if (!st.fromCloud && st.at > 0) Sync.push(key, st.v, st.at);
  }, [st]);
  const set = useCallback(u => setSt(cur => {
    const v = typeof u === "function" ? u(cur.v) : u;
    return v === cur.v ? cur : { v, at: Date.now() };
  }), []);
  return [st.v, set];
}
/* ---- backup: export / import ---- */
function collectLocalData() {
  const data = {};
  try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k && k.startsWith("latte:") && !["latte:draft", "latte:localMode", "latte:spotify", "latte:sp-verifier", "latte:sp-state"].includes(k)) { try { data[k.slice(6)] = JSON.parse(localStorage.getItem(k)); } catch (e) {} } } } catch (e) {}
  return data;
}
function downloadFile(name, text) {
  const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([text], { type: "application/json" })); a.download = name;
  document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
}
async function importBackup(file) {
  const obj = JSON.parse(await file.text());
  const data = obj && obj.data && typeof obj.data === "object" ? obj.data : obj;
  if (!data || typeof data !== "object" || !data.profile) throw new Error("This doesn't look like a LattePlanner backup.");
  await Sync.writeAll(data);
  return Object.keys(data).length;
}
/* ---- images: compressed; stored in Firestore when signed in so they follow you ---- */
function fileToImage(file) {
  return new Promise((res, rej) => { const r = new FileReader(); r.onload = () => { const img = new Image(); img.onload = () => res(img); img.onerror = rej; img.src = r.result; }; r.onerror = rej; r.readAsDataURL(file); });
}
const imgCache = {};
async function storeImage(file, { max = 1000, square = false, inline = false } = {}) {
  const img = await fileToImage(file);
  const c = document.createElement("canvas");
  if (square) { const side = Math.min(img.width, img.height), out = Math.min(max, side); c.width = c.height = out; c.getContext("2d").drawImage(img, (img.width - side) / 2, (img.height - side) / 2, side, side, 0, 0, out, out); }
  else { const k = Math.min(1, max / Math.max(img.width, img.height)); c.width = Math.round(img.width * k); c.height = Math.round(img.height * k); c.getContext("2d").drawImage(img, 0, 0, c.width, c.height); }
  const data = c.toDataURL("image/jpeg", 0.75);
  const user = FB_ON && firebase.auth().currentUser;
  if (!inline && user) {
    try { const id = uid() + uid(); await userCol(user.uid, "images").doc(id).set({ d: data, at: Date.now() }); imgCache["img:" + id] = data; return "img:" + id; } catch (e) {}
  }
  return data;
}
function Img({ src, alt = "", ...p }) {
  const isRef = typeof src === "string" && src.startsWith("img:");
  const [u, setU] = useState(isRef ? imgCache[src] || null : src);
  useEffect(() => {
    if (!isRef) { setU(src); return; }
    if (imgCache[src]) { setU(imgCache[src]); return; }
    const user = FB_ON && firebase.auth().currentUser; if (!user) return;
    userCol(user.uid, "images").doc(src.slice(4)).get().then(d => { if (d.exists) { imgCache[src] = d.data().d; setU(d.data().d); } }).catch(() => {});
  }, [src]);
  return u ? <img src={u} alt={alt} {...p} /> : <div className="img-ph" aria-hidden="true"></div>;
}

/* =============== mock data: JUIT, B.Tech CSE, first year (odd semester) =============== */
let COURSES = [
  { id: "phy", credits: 4,  name: "Engineering Physics-I", short: "Physics", color: "#C98F86", soft: "#F8E6E1", att: 18, held: 22, prof: "Dr. Neha Sharma" },
  { id: "math", credits: 4, name: "Engineering Mathematics-I", short: "Maths", color: "#7F9870", soft: "#E8EEE0", att: 21, held: 24, prof: "Dr. R. K. Verma" },
  { id: "sdf", credits: 4,  name: "Software Development Fundamentals-I", short: "SDF · C & DS", color: "#A27B62", soft: "#F3E8DA", att: 23, held: 25, prof: "Dr. Amit Thakur" },
  { id: "bes", credits: 4,  name: "Basic Electrical Sciences", short: "Electrical", color: "#9C8878", soft: "#F0EAE4", att: 14, held: 19, prof: "Dr. P. Chauhan" },
  { id: "lsc", credits: 2,  name: "Life Skills & Communication", short: "Life Skills", color: "#A88598", soft: "#F3E8EE", att: 9, held: 10, prof: "Ms. Kritika Negi" },
];
const courseById = id => COURSES.find(c => c.id === id);

const L = (t, e, course, kind, room) => ({ t, e, course, kind, room });
const E = (t, e, title, icon, note) => ({ t, e, title, icon, note });
let TIMETABLE = {
  1: [L("09:00","09:50","phy","Lecture","LT-1"), L("10:00","10:50","math","Tutorial","TR-4"), L("11:00","11:50","sdf","Lecture","LT-3"), E("12:50","13:40","Lunch at the mess","food","Rajma chawal day"), L("14:00","15:50","sdf","Lab","CL-2"), E("16:15","17:15","Study hour at the LRC","bookOpen","Physics numericals"), E("17:30","18:30","Coding club · intro to Git","code","CSE seminar hall")],
  2: [L("09:00","09:50","bes","Lecture","LT-2"), L("10:00","10:50","phy","Lecture","LT-1"), L("11:00","11:50","math","Lecture","LT-1"), E("12:50","13:40","Lunch at the mess","food",""), L("14:00","15:50","phy","Lab","Physics Lab 1"), E("18:00","19:00","Badminton with Riya","heart","Sports complex")],
  3: [L("09:00","09:50","math","Lecture","LT-1"), L("10:00","10:50","sdf","Lecture","LT-3"), L("11:00","11:50","lsc","Workshop","Seminar Hall"), E("12:50","13:40","Lunch at the mess","food",""), L("14:00","14:50","bes","Tutorial","TR-2"), E("16:15","17:15","Study hour at the LRC","bookOpen","")],
  4: [L("09:00","09:50","sdf","Lecture","LT-3"), L("10:00","10:50","bes","Lecture","LT-2"), L("11:00","11:50","math","Lecture","LT-1"), E("12:50","13:40","Lunch at the mess","food",""), L("14:00","14:50","lsc","Lecture","LT-4")],
  5: [L("09:00","09:50","phy","Tutorial","TR-1"), L("10:00","10:50","math","Lecture","LT-1"), L("11:00","11:50","sdf","Tutorial","TR-3"), E("12:50","13:40","Lunch at the mess","food","Chole bhature!"), L("14:00","15:50","bes","Lab","Electrical Lab")],
  6: [E("10:00","11:00","Slow brunch & laundry","coffee",""), E("15:00","18:00","Walk to the Waknaghat market","pin","With the hostel girls")],
  0: [E("10:30","11:00","Call home","phone",""), E("16:00","18:00","Weekly reset & planning","pen","")],
};
Object.entries(TIMETABLE).forEach(([d, arr]) => arr.forEach((s, i) => { s.id = `${d}-${i}`; }));
const slotsFor = dow => (TIMETABLE[dow] || []).filter(s => !s.course || courseById(s.course)).slice().sort((a, b) => toMin(a.t) - toMin(b.t));
const slotById = id => { for (const d of Object.keys(TIMETABLE)) { const s = (TIMETABLE[d] || []).find(x => x.id === id); if (s) return s; } return null; };

const HOLIDAYS = [
  { date: "2026-10-02", title: "Gandhi Jayanti", type: "holiday" },
  { date: "2026-10-20", title: "Dussehra", type: "holiday" },
  { date: "2026-11-08", title: "Diwali", type: "holiday" },
  { date: "2026-11-24", title: "Guru Nanak Jayanti", type: "holiday" },
  { date: "2026-12-25", title: "Christmas", type: "holiday" },
];
let BIRTHDAYS = [
  { date: "2026-09-30", title: "Kabir's birthday", type: "birthday" },
  { date: "2026-10-03", title: "Riya's birthday (roommate)", type: "birthday" },
  { date: "2026-10-14", title: "Mom's birthday", type: "birthday" },
  { date: "2026-11-02", title: "Dadi's birthday", type: "birthday" },
];
const DEFAULT_BDAYS = BIRTHDAYS.map((b, i) => ({ id: "b" + i, title: b.title.replace(/'s birthday.*$/, ""), date: b.date }));
let EXAMS = [
  { id: "x0", tentative: true, title: "SDF lab evaluation", course: "sdf", date: "2026-10-01", time: "2:00 pm", venue: "CL-2", kind: "Lab" },
  { id: "x5", tentative: true, title: "Physics lab viva", course: "phy", date: "2026-10-06", time: "2:00 pm", venue: "Physics Lab 1", kind: "Lab" },
  { id: "x1", tentative: true, title: "T1 · Engineering Physics-I", course: "phy", date: "2026-10-07", time: "9:30 am", venue: "LT-1", kind: "Mid-term" },
  { id: "x2", tentative: true, title: "T1 · Engineering Mathematics-I", course: "math", date: "2026-10-08", time: "9:30 am", venue: "LT-1", kind: "Mid-term" },
  { id: "x3", tentative: true, title: "T1 · Software Development Fundamentals-I", course: "sdf", date: "2026-10-09", time: "9:30 am", venue: "LT-3", kind: "Mid-term" },
  { id: "x4", tentative: true, title: "T1 · Basic Electrical Sciences", course: "bes", date: "2026-10-10", time: "9:30 am", venue: "LT-2", kind: "Mid-term" },
];
const TASKS = [
  { id: "t1", title: "Physics lab record · Exp. 4, Newton's rings", course: "phy", due: "2026-09-30", type: "deadline", done: false },
  { id: "t9", title: "Buy graph paper & a new lab coat", course: "", due: "2026-09-29", type: "task", done: true },
  { id: "t2", title: "Practise pointers & arrays for the lab eval", course: "sdf", due: "2026-10-01", type: "task", done: false },
  { id: "t8", title: "Return 'Let Us C' to the LRC", course: "", due: "2026-10-02", type: "task", done: false },
  { id: "t3", title: "Maths assignment 3 · Rolle's & Mean Value Theorem", course: "math", due: "2026-10-03", type: "deadline", done: false },
  { id: "t6", title: "Write 10 pattern programs in C", course: "sdf", due: "2026-10-04", type: "task", done: false },
  { id: "t4", title: "BES tutorial sheet 4 · Thevenin & Norton", course: "bes", due: "2026-10-05", type: "deadline", done: false },
  { id: "t5", title: "Revise Physics units 1–2 for T1", course: "phy", due: "2026-10-06", type: "task", done: false },
  { id: "t7", title: "Life Skills reflective essay", course: "lsc", due: "2026-10-12", type: "deadline", done: false },
];
let UNITS = {
  phy: ["Interference", "Diffraction", "Polarisation", "Lasers & optical fibres", "Intro to quantum mechanics"],
  math: ["Matrices & rank", "Eigenvalues & eigenvectors", "Differential calculus", "Mean value theorems", "Multiple integrals"],
  sdf: ["Intro to C & control flow", "Loops & functions", "Arrays & strings", "Pointers", "Structures & linked lists"],
  bes: ["DC circuits", "Network theorems", "AC fundamentals", "Transformers", "Semiconductor diodes"],
  lsc: ["Self-awareness", "Listening & speaking", "Presentations", "Teamwork"],
};
const DEFAULT_COURSES = COURSES.map(({ soft, ...c }) => c);
const DEFAULT_TT = JSON.parse(JSON.stringify(TIMETABLE));
const DEFAULT_EXAMS = EXAMS.slice();
const DEFAULT_UNITS = JSON.parse(JSON.stringify(UNITS));
const UNITS_DONE = { "phy-0": 1, "phy-1": 1, "math-0": 1, "math-1": 1, "math-2": 1, "sdf-0": 1, "sdf-1": 1, "sdf-2": 1, "bes-0": 1, "bes-1": 1, "lsc-0": 1, "lsc-1": 1 };
const NOTEBOOKS = [
  { id: "n1", course: "phy", title: "Interference · class notes", body: "Young's double slit\nβ = λD / d\nConditions for sustained interference: coherent sources, same amplitude…" },
  { id: "n2", course: "phy", title: "Lab formulas", body: "Newton's rings: D²ₙ₊ₚ − D²ₙ = 4pλR" },
  { id: "n3", course: "sdf", title: "Pointer doodles", body: "int *p = &a;\n*p → value at address\np++ moves by sizeof(int)" },
  { id: "n4", course: "math", title: "Eigen cheat sheet", body: "det(A − λI) = 0\nSum of eigenvalues = trace(A)" },
];
const CATS = [
  { id: "Food", icon: "food", color: "#D99F95", soft: "#F8E6E1" },
  { id: "Coffee", icon: "coffee", color: "#A27B62", soft: "#F3E8DA" },
  { id: "Transport", icon: "bus", color: "#8FA67F", soft: "#E8EEE0" },
  { id: "Supplies", icon: "pencil", color: "#B592A7", soft: "#F3E8EE" },
  { id: "Other", icon: "wallet", color: "#8E9AAF", soft: "#ECEEF3" },
];
const mix = (c, pct = 24) => `color-mix(in srgb, ${c} ${pct}%, var(--paper))`;
COURSES.forEach(c => { c.soft = mix(c.color); });
CATS.forEach(c => { c.soft = mix(c.color); });
const catById = id => CATS.find(c => c.id === id) || CATS[0];
const TXNS = [
  { id: "s1", date: "2026-09-27", note: "Maggi & chai at the canteen", cat: "Food", amt: 70 },
  { id: "s2", date: "2026-09-27", note: "Cold coffee, Nescafé kiosk", cat: "Coffee", amt: 60 },
  { id: "s3", date: "2026-09-26", note: "Bus to Solan", cat: "Transport", amt: 40 },
  { id: "s4", date: "2026-09-26", note: "Spiral notebooks × 3", cat: "Supplies", amt: 180 },
  { id: "s5", date: "2026-09-25", note: "Domino's, split three ways", cat: "Food", amt: 245 },
  { id: "s6", date: "2026-09-24", note: "Bus to Shimla & back", cat: "Transport", amt: 140 },
  { id: "s7", date: "2026-09-23", note: "Lab coat", cat: "Supplies", amt: 350 },
  { id: "s8", date: "2026-09-22", note: "Cappuccino at a café in Solan", cat: "Coffee", amt: 140 },
  { id: "s9", date: "2026-09-20", note: "Momos at Waknaghat market", cat: "Food", amt: 90 },
  { id: "s10", date: "2026-09-18", note: "Calculator batteries", cat: "Supplies", amt: 60 },
  { id: "s11", date: "2026-09-15", note: "Birthday cake, shared", cat: "Food", amt: 200 },
  { id: "s12", date: "2026-09-14", note: "Shared cab to Kalka station", cat: "Transport", amt: 300 },
  { id: "s13", date: "2026-09-10", note: "Instant coffee jar for the room", cat: "Coffee", amt: 250 },
  { id: "s14", date: "2026-09-06", note: "Snacks & toiletries", cat: "Food", amt: 620 },
  { id: "s15", date: "2026-09-03", note: "HC Verma, Vol. 1", cat: "Supplies", amt: 520 },
];
const MOODS = [
  { id: "calm", color: "#B7C6AB" }, { id: "happy", color: "#EFC7A8" }, { id: "cozy", color: "#D9B89C" },
  { id: "proud", color: "#E7BEB6" }, { id: "tired", color: "#C9BDB3" }, { id: "anxious", color: "#C9AFBF" },
];
const JOURNAL = [
  { id: "j1", date: "2026-09-26", mood: "cozy", scene: "hills", text: "Rain on the tin roof all evening. Finished the pointers lab before anyone else in my batch, which felt like a small win. Made Maggi with Riya and watched the clouds sit on the hills." },
  { id: "j2", date: "2026-09-21", mood: "tired", text: "Long day. The maths tutorial went over my head, but I asked Sir after class and it finally made sense. Note to self: asking is allowed." },
  { id: "j3", date: "2026-09-15", mood: "happy", scene: "town", text: "First Shimla trip with the hostel girls. Mall Road, too many momos, a very cold bus back." },
  { id: "j4", date: "2026-09-08", mood: "calm", scene: "cup", text: "Found a quiet corner on the LRC's second floor. Might be my spot now." },
];
const DUMPS = [
  { id: "d1", text: "Start a 30-day C practice streak after T1", tone: "pink", date: "2026-09-27" },
  { id: "d2", text: "Kasauli day trip before Dussehra?", tone: "sage", date: "2026-09-25" },
  { id: "d3", text: "App idea: mess menu + ratings for JUIT", tone: "latte", date: "2026-09-22" },
  { id: "d4", text: "Fairy lights and a tiny money plant for the room", tone: "pink", date: "2026-09-19" },
  { id: "d5", text: "Ask seniors for SDF previous year papers", tone: "sage", date: "2026-09-17" },
];
const INTENTIONS = [
  { id: "i1", text: "Finish the Newton's rings lab record", done: false },
  { id: "i2", text: "Solve 15 pointer questions before dinner", done: false },
  { id: "i3", text: "Drink water & sleep by 11", done: false },
];
const ROUTINES = [
  { id: "morning", title: "Morning Routine", sub: "Wake gently, no phone for the first 20 minutes", icon: "sunrise", tone: ["#F8E6E1", "#C4827A"], steps: [
    ["m1", "06:45", "Wake up slowly", "sunrise", "5 min"], ["m2", "06:50", "Warm water & open the curtains", "drop", "5 min"],
    ["m3", "07:00", "Stretch on the yoga mat", "leaf", "15 min"], ["m4", "07:20", "Shower & skincare", "sparkle", "25 min"],
    ["m5", "07:50", "Breakfast at the mess", "food", "25 min"], ["m6", "08:20", "Pack bag, glance at today's plan", "book", "10 min"]] },
  { id: "college", title: "College Routine", sub: "Academic block, labs and the LRC", icon: "cap", tone: ["#E8EEE0", "#6F875F"], steps: [
    ["c1", "08:45", "Walk to the academic block", "pin", "10 min"], ["c2", "09:00", "Morning lectures", "cap", "3 hrs"],
    ["c3", "12:50", "Lunch & a short rest", "food", "50 min"], ["c4", "14:00", "Lab or tutorial", "flask", "2 hrs"],
    ["c5", "16:15", "Study hour at the LRC", "bookOpen", "1 hr"]] },
  { id: "evening", title: "Evening Routine", sub: "Slow down, reconnect, reset for tomorrow", icon: "moon", tone: ["#F3E8DA", "#9A7560"], steps: [
    ["e1", "17:30", "Chai & a walk around campus", "coffee", "30 min"], ["e2", "18:30", "Call home", "phone", "20 min"],
    ["e3", "19:30", "Dinner with the hostel girls", "food", "40 min"], ["e4", "20:30", "Revise today's notes", "pen", "50 min"],
    ["e5", "21:40", "Journal, if I feel like it", "heart", "15 min"], ["e6", "22:15", "Skincare & a few pages of a book", "moon", "30 min"],
    ["e7", "23:00", "Lights out", "bed", "8 hrs"]] },
];
const DAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const WEEK_ORDER = [1, 2, 3, 4, 5, 6, 0];
const ROUTINE_BLOCKS = ROUTINES.map(({ steps, ...b }) => b);
const PLANS = [
  { id: "normal", label: "Normal day", icon: "sun", blocks: {} },
  { id: "exam", label: "Exam day", icon: "cap", blocks: { college: "Exam time", evening: "Evening & next exam" } },
  { id: "holiday", label: "Holiday", icon: "coffee", blocks: { college: "Daytime" } },
  { id: "late", label: "Late-night work", icon: "moon", blocks: { evening: "Evening & late work" } },
];
const planOf = st => st.plan || "normal";
const stepInPlan = (st, plan) => st.plan === "any" || planOf(st) === plan;
const DEFAULT_STEPS = [
  ...ROUTINES.flatMap(b => b.steps.map(([id, time, title, icon, dur]) => ({ id, block: b.id, time, title, icon, dur, days: null }))),
  { id: "w1", block: "evening", time: "17:00", title: "Take laundry to the dhobi", icon: "shirt", dur: "20 min", days: [3, 6] },
  { id: "w2", block: "morning", time: "08:10", title: "Water the money plant", icon: "leaf", dur: "2 min", days: [1, 4] },
  { id: "w3", block: "evening", time: "21:00", title: "Tidy the desk & plan the week", icon: "sparkle", dur: "20 min", days: [0] },
];
const ICON_CHOICES = ["sunrise", "drop", "leaf", "sparkle", "food", "coffee", "cup", "book", "bookOpen", "pen", "cap", "flask", "code", "pin", "phone", "users", "heart", "smile", "shirt", "moon", "bed", "star", "clock", "wallet"];
function daysLabel(days) {
  if (!days || days.length === 7) return "Every day";
  if (!days.length) return "";
  const k = [...days].sort().join();
  if (k === "1,2,3,4,5") return "Weekdays";
  if (k === "0,6") return "Weekends";
  return WEEK_ORDER.filter(d => days.includes(d)).map(d => DAY_SHORT[d]).join(" & ").replace(/ & (?=.* & )/g, ", ");
}
function nextOn(days) {
  const dow = new Date().getDay();
  for (let i = 0; i < 7; i++) if (days.includes((dow + i) % 7)) return i === 0 ? "today" : i === 1 ? "tomorrow" : DAY_SHORT[(dow + i) % 7];
  return "never";
}
const pastDays = n => Array.from({ length: n }, (_, i) => { const d = startToday(); d.setDate(d.getDate() - (n - 1 - i)); return isoOf(d); });
const seedPast = vals => Object.fromEntries(vals.map((v, i) => { const d = startToday(); d.setDate(d.getDate() - (vals.length - i)); return [isoOf(d), v]; }));
const ROUTINE_SEED = seedPast([0.72, 0.9, 0.61, 0.95, 0.83, 0.55]);
const FOCUS_SEED = { ...seedPast([3, 1, 4, 2, 0, 3]), [todayISO()]: 2 };
const QUOTES = [
  "Small steps every day still count as moving forward.",
  "You don't have to do it all today. Just the next gentle thing.",
  "Rest is part of the syllabus too.",
  "Progress, not perfection. One unit at a time.",
  "Be as patient with yourself as you are with your code compiling.",
  "Bloom where you're planted, even on a hillside campus.",
  "A calm mind learns faster than a hurried one.",
];
const THEMES = {
  latte:    { name: "Latte",     accent: ["#E7BEB6", "#C4827A", "#8E5249"], second: ["#B7C6AB", "#6F875F"], bg: "#FAF5EE", cream: "#F6EEE3", d: ["#1E1815", "#29211D", "#231C19"] },
  matcha:   { name: "Matcha",    accent: ["#BCCDA8", "#6E8B5A", "#4B6340"], second: ["#E7BEB6", "#C4827A"], bg: "#F6F6EE", cream: "#EEF0E3", d: ["#171B15", "#21271E", "#1C2119"] },
  lavender: { name: "Lavender",  accent: ["#D5C3DB", "#9A7AA6", "#6C4F79"], second: ["#B7C6AB", "#6F875F"], bg: "#F8F4F5", cream: "#F1EAEF", d: ["#1B1719", "#262024", "#201B1F"] },
  caramel:  { name: "Caramel",   accent: ["#E8C8A2", "#B07A45", "#7D5025"], second: ["#B7C6AB", "#6F875F"], bg: "#FBF5EC", cream: "#F5EADB", d: ["#1F1813", "#2B221B", "#241C16"] },
  earlgrey: { name: "Earl Grey", accent: ["#BFCAD8", "#6F86A0", "#4A5E75"], second: ["#E7BEB6", "#C4827A"], bg: "#F6F5F2", cream: "#EDEDE8", d: ["#171A1D", "#21252A", "#1C1F23"] },
};
function applyTheme(id, dark) {
  const t = THEMES[id] || THEMES.latte, st = document.documentElement.style;
  const base = dark ? {
    "--bg": t.d[0], "--paper": t.d[1], "--cream": t.d[2],
    "--latte": `color-mix(in srgb, ${t.d[1]} 62%, #9C8474)`, "--latte-2": `color-mix(in srgb, ${t.d[1]} 84%, #9C8474)`, "--line": `color-mix(in srgb, ${t.d[1]} 82%, #7A675B)`,
    "--mocha": "#D8BAA3", "--coffee": "#F3E8DE", "--muted": "#C5B5A9", "--faint": "#958579",
    "--pink": t.accent[0], "--pink-3": t.accent[0], "--accent-ink": t.accent[0], "--sage": t.second[0], "--sage-3": t.second[0],
    "--taupe": "#8E7D71", "--mauve": "#C9AFBF", "--warn": "#F2AB9E", "--btn": "#EEDDD0", "--on-btn": "#2A1F1A", "--on-accent": "#231B17",
    "--shadow": "0 1px 2px rgba(0,0,0,.3),0 14px 34px -16px rgba(0,0,0,.65)", "--shadow-lift": "0 2px 4px rgba(0,0,0,.3),0 22px 42px -18px rgba(0,0,0,.75)",
  } : {
    "--bg": t.bg, "--paper": "#FFFDF9", "--cream": t.cream, "--latte": "#E9D8C4", "--latte-2": "#F3E8DA", "--line": "#EFE4D7",
    "--mocha": "#9A7560", "--coffee": "#5B443A", "--muted": "#7C6A60", "--faint": "#A89789",
    "--pink": t.accent[0], "--pink-3": t.accent[1], "--accent-ink": t.accent[2], "--sage": t.second[0], "--sage-3": t.second[1],
    "--taupe": "#B5A597", "--mauve": "#C9AFBF", "--warn": "#9B544A", "--btn": "#5B443A", "--on-btn": "#FFF8F1", "--on-accent": "#FFFFFF",
    "--shadow": "0 1px 2px rgba(110,80,60,.05),0 14px 34px -16px rgba(110,80,60,.24)", "--shadow-lift": "0 2px 4px rgba(110,80,60,.06),0 22px 42px -18px rgba(110,80,60,.34)",
  };
  Object.entries(base).forEach(([k, v]) => st.setProperty(k, v));
  st.setProperty("color-scheme", dark ? "dark" : "light");
}
const dISO = off => { const d = startToday(); d.setDate(d.getDate() + off); return isoOf(d); };
const TODOS = [
  { id: "td1", text: "Reply in the class group about lab partners", date: dISO(-1), from: dISO(-2), due: false, done: false },
  { id: "td2", text: "Submit the mess feedback form", date: dISO(-1), from: dISO(-1), due: true, done: false },
  { id: "td3", text: "Print pages for the Physics lab record", date: dISO(0), from: dISO(0), due: true, done: false },
  { id: "td4", text: "Buy Maggi, fruit and a pen refill", date: dISO(0), from: dISO(0), due: false, done: false },
  { id: "td5", text: "Refill water bottle before class", date: dISO(0), from: dISO(0), due: false, done: true },
  { id: "td6", text: "Ask Riya for yesterday's SDF notes", date: dISO(1), from: dISO(1), due: false, done: false },
];
function rollTodos(list) {
  const t = todayISO(); let changed = false;
  const out = list.map(x => { if (!x.done && !x.due && x.date < t) { changed = true; return { ...x, date: t }; } return x; });
  return changed ? out : list;
}
const MIX_MOODS = [
  { id: "calm", color: "#B7C6AB" }, { id: "happy", color: "#EFC7A8" }, { id: "cozy", color: "#D9B89C" }, { id: "focused", color: "#A9B8C9" },
  { id: "proud", color: "#E7BEB6" }, { id: "tired", color: "#C9BDB3" }, { id: "anxious", color: "#C9AFBF" }, { id: "homesick", color: "#D8C3A5" },
];
const FALLBACK_MIXES = {
  calm: [["Weightless", "Marconi Union"], ["Kho Gaye Hum Kahan", "Jasleen Royal, Prateek Kuhad"], ["Holocene", "Bon Iver"], ["cold/mess", "Prateek Kuhad"], ["Clair de Lune", "Claude Debussy"], ["Bloom", "The Paper Kites"]],
  happy: [["Ilahi", "Arijit Singh"], ["Here Comes the Sun", "The Beatles"], ["Badtameez Dil", "Benny Dayal"], ["Walking on Sunshine", "Katrina & The Waves"], ["Good as Hell", "Lizzo"], ["Dynamite", "BTS"]],
  cozy: [["Coffee", "beabadoobee"], ["Tum Se Hi", "Mohit Chauhan"], ["Banana Pancakes", "Jack Johnson"], ["Iktara", "Kavita Seth"], ["Put Your Records On", "Corinne Bailey Rae"], ["Sunday Morning", "Maroon 5"]],
  focused: [["Experience", "Ludovico Einaudi"], ["Gymnopédie No. 1", "Erik Satie"], ["Nuvole Bianche", "Ludovico Einaudi"], ["Comptine d'un autre été", "Yann Tiersen"], ["Time", "Hans Zimmer"], ["Intro", "The xx"]],
  proud: [["Zinda", "Siddharth Mahadevan"], ["Unstoppable", "Sia"], ["Kar Har Maidaan Fateh", "Sukhwinder Singh, Shreya Ghoshal"], ["Hall of Fame", "The Script"], ["Lakshya", "Shankar Mahadevan"], ["Titanium", "David Guetta, Sia"]],
  tired: [["Agar Tum Saath Ho", "Alka Yagnik, Arijit Singh"], ["Fix You", "Coldplay"], ["Night Changes", "One Direction"], ["Let Her Go", "Passenger"], ["Riptide", "Vance Joy"], ["Kun Faya Kun", "A.R. Rahman, Javed Ali, Mohit Chauhan"]],
  anxious: [["Weightless", "Marconi Union"], ["Three Little Birds", "Bob Marley & The Wailers"], ["Kun Faya Kun", "A.R. Rahman, Javed Ali, Mohit Chauhan"], ["Rivers and Roads", "The Head and the Heart"], ["Keep Your Head Up", "Andy Grammer"], ["Clair de Lune", "Claude Debussy"]],
  homesick: [["Maa", "Shankar Mahadevan"], ["Home", "Phillip Phillips"], ["Phir Se Ud Chala", "Mohit Chauhan"], ["Photograph", "Ed Sheeran"], ["Yeh Honsla", "Shafqat Amanat Ali"], ["Iktara", "Kavita Seth"]],
};
const NEWS_SOURCES = [
  ["The Hindu", "https://www.thehindu.com"], ["Indian Express", "https://indianexpress.com"], ["BBC News", "https://www.bbc.com/news"],
  ["The Verge", "https://www.theverge.com"], ["Tribune · Himachal", "https://www.tribuneindia.com/news/himachal"], ["Hacker News", "https://news.ycombinator.com"],
];
const spotifyUrl = (title, artist) => "https://open.spotify.com/search/" + encodeURIComponent(`${title} ${artist}`);

/* confetti */
let CONFETTI_ON = true;
const Confetti = (() => {
  let cv = null, ctx = null, parts = [], raf = 0;
  const resize = () => { if (!cv) return; const d = window.devicePixelRatio || 1; cv.width = innerWidth * d; cv.height = innerHeight * d; ctx.setTransform(d, 0, 0, d, 0, 0); };
  const ensure = () => { if (cv) return; cv = document.createElement("canvas"); cv.className = "confetti"; cv.setAttribute("aria-hidden", "true"); document.body.appendChild(cv); ctx = cv.getContext("2d"); resize(); window.addEventListener("resize", resize); };
  const palette = () => { const cs = getComputedStyle(document.documentElement); return ["--pink", "--pink-3", "--sage", "--sage-3", "--mauve", "--mocha", "--taupe"].map(v => cs.getPropertyValue(v).trim()).filter(c => c.startsWith("#")); };
  const heart = (s) => { ctx.beginPath(); ctx.moveTo(0, s * .3); ctx.bezierCurveTo(-s, -s * .5, -s * .4, -s * 1.1, 0, -s * .45); ctx.bezierCurveTo(s * .4, -s * 1.1, s, -s * .5, 0, s * .3); ctx.fill(); };
  const loop = () => {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    parts = parts.filter(p => p.life < p.max);
    for (const p of parts) {
      p.vx *= 0.985; p.vy = p.vy * 0.985 + p.g; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life++;
      ctx.save(); ctx.globalAlpha = Math.max(0, 1 - p.life / p.max); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = p.c;
      if (p.shape === "heart") heart(p.w * .9); else if (p.shape === "dot") { ctx.beginPath(); ctx.arc(0, 0, p.w / 2, 0, 7); ctx.fill(); }
      else { ctx.beginPath(); ctx.roundRect ? ctx.roundRect(-p.w / 2, -p.h / 2, p.w, p.h, 2) : ctx.rect(-p.w / 2, -p.h / 2, p.w, p.h); ctx.fill(); }
      ctx.restore();
    }
    raf = parts.length ? requestAnimationFrame(loop) : 0;
  };
  return {
    burst(x, y, n = 36) {
      if (!CONFETTI_ON || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      try {
        ensure(); const cols = palette(); if (!cols.length) cols.push("#E7BEB6", "#B7C6AB", "#C9AFBF");
        for (let i = 0; i < n; i++) {
          const a = Math.random() * Math.PI * 2, sp = 3 + Math.random() * 7;
          parts.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 4, g: 0.24, rot: Math.random() * 6, vr: (Math.random() - .5) * .3,
            w: 5 + Math.random() * 5, h: 8 + Math.random() * 6, c: cols[i % cols.length], shape: Math.random() < .22 ? "heart" : Math.random() < .5 ? "dot" : "rect", life: 0, max: 60 + Math.random() * 45 });
        }
        if (!raf) raf = requestAnimationFrame(loop);
      } catch (e) {}
    },
  };
})();
const celebrate = el => { if (!el || !el.getBoundingClientRect) return; const r = el.getBoundingClientRect(); Confetti.burst(r.left + r.width / 2, r.top + r.height / 2); };

const DEFAULT_PROFILE = {
  name: "Aria", target: 80, budget: 7000, focus: "25/5", photo: "", theme: "latte", mode: "light", confetti: true, semester: "Sem 1 · Odd 2026", waterGoal: 8, cycle: true, setupDone: false,
  tagline: "Learning to code, one cup of coffee at a time",
  programme: "B.Tech Computer Science & Engineering", year: "1st year · Odd semester",
  college: "JUIT, Waknaghat", hostel: "Girls' Hostel, Room 214", birthday: "2008-03-14",
};

/* =============== ambient sound (Web Audio, generated) =============== */
const Sound = (() => {
  let ctx = null; const bufs = {}; const layers = {};
  const getCtx = () => { if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)(); if (ctx.state === "suspended") ctx.resume(); return ctx; };
  const noise = (c, color) => {
    if (bufs[color]) return bufs[color];
    const len = c.sampleRate * 4, b = c.createBuffer(1, len, c.sampleRate), d = b.getChannelData(0);
    let last = 0, b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      if (color === "brown") { last = (last + 0.02 * w) / 1.02; d[i] = last * 3.5; }
      else { b0 = 0.997 * b0 + w * 0.029591; b1 = 0.985 * b1 + w * 0.032534; b2 = 0.95 * b2 + w * 0.048056; d[i] = (b0 + b1 + b2 + w * 0.1848) * 0.35; }
    }
    return (bufs[color] = b);
  };
  const src = (c, color) => { const s = c.createBufferSource(); s.buffer = noise(c, color); s.loop = true; s.start(); return s; };
  const filt = (c, type, f, q = 0.7) => { const x = c.createBiquadFilter(); x.type = type; x.frequency.value = f; x.Q.value = q; return x; };
  function start(kind, vol) {
    const c = getCtx(); const master = c.createGain(); master.gain.value = 0; master.connect(c.destination);
    master.gain.setTargetAtTime(vol, c.currentTime, 0.5);
    const nodes = []; let timer = null;
    if (kind === "rain") {
      const a = src(c, "pink"), g = c.createGain(); g.gain.value = 0.9;
      a.connect(filt(c, "highpass", 450)).connect(filt(c, "lowpass", 6500)).connect(g).connect(master);
      const b = src(c, "brown"), g2 = c.createGain(); g2.gain.value = 0.55; b.connect(g2).connect(master);
      nodes.push(a, b);
    } else {
      const a = src(c, "brown"), g = c.createGain(); g.gain.value = 0.9;
      a.connect(filt(c, "bandpass", 380, 0.6)).connect(g).connect(master);
      const lfo = c.createOscillator(), lg = c.createGain(); lfo.frequency.value = 0.18; lg.gain.value = 0.3; lfo.connect(lg).connect(g.gain); lfo.start();
      const b = src(c, "pink"), g2 = c.createGain(); g2.gain.value = 0.12; b.connect(filt(c, "bandpass", 1300, 1.2)).connect(g2).connect(master);
      nodes.push(a, b, lfo);
      const clink = () => {
        const t = c.currentTime, o = c.createOscillator(), og = c.createGain();
        o.type = "sine"; o.frequency.value = 2400 + Math.random() * 1800;
        og.gain.setValueAtTime(0.0001, t); og.gain.exponentialRampToValueAtTime(0.05, t + 0.005); og.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);
        o.connect(og).connect(master); o.start(t); o.stop(t + 0.4);
        timer = setTimeout(clink, 1500 + Math.random() * 4500);
      };
      timer = setTimeout(clink, 1200);
    }
    layers[kind] = {
      setVol: v => master.gain.setTargetAtTime(v, c.currentTime, 0.2),
      stop: () => { clearTimeout(timer); master.gain.setTargetAtTime(0, c.currentTime, 0.25); setTimeout(() => { nodes.forEach(n => { try { n.stop(); } catch (e) {} }); master.disconnect(); }, 1200); },
    };
  }
  return {
    toggle(kind, on, vol) { try { if (on) { if (!layers[kind]) start(kind, vol); } else if (layers[kind]) { layers[kind].stop(); delete layers[kind]; } } catch (e) {} },
    vol(v) { Object.values(layers).forEach(l => l.setVol(v)); },
    chime() {
      try { const c = getCtx(); [660, 990, 1320].forEach((f, i) => { const o = c.createOscillator(), g = c.createGain(), t = c.currentTime + i * 0.18;
        o.frequency.value = f; g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.12, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + 1.1);
        o.connect(g).connect(c.destination); o.start(t); o.stop(t + 1.2); }); } catch (e) {}
    },
  };
})();

/* =============== store =============== */
const Store = createContext(null);
const useStore = () => useContext(Store);

/* =============== small components =============== */
function Check({ on, onChange, label, round }) {
  return <button type="button" role="checkbox" aria-checked={!!on} aria-label={label} className={`chk ${round ? "round" : ""} ${on ? "on" : ""}`} onClick={e => { if (!on) celebrate(e.currentTarget); onChange(e); }}>
    <Icon n="check" s={14} sw={2.6} />
  </button>;
}
function Tag({ course }) {
  const c = courseById(course);
  if (!c) return <span className="tag" style={{ background: "var(--taupe-2)", color: "var(--muted)" }}><i style={{ background: "var(--taupe)" }}></i>Personal</span>;
  return <span className="tag" style={{ background: c.soft, color: c.color }}><i style={{ background: c.color }}></i>{c.short}</span>;
}
function Modal({ title, onClose, children, wide }) {
  useEffect(() => { const k = e => e.key === "Escape" && onClose(); window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k); }, [onClose]);
  return <div className="overlay" onMouseDown={e => e.target === e.currentTarget && onClose()}>
    <div className={`modal ${wide ? "wide" : ""}`} role="dialog" aria-modal="true" aria-label={title}>
      <div className="modal-h"><h2>{title}</h2><button className="icon-btn" onClick={onClose} aria-label="Close"><Icon n="x" /></button></div>
      {children}
    </div>
  </div>;
}
function Ring({ pct, color, size = 108, stroke = 10, track = "var(--latte-2)", children }) {
  const r = (size - stroke) / 2, C = 2 * Math.PI * r;
  return <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
    <circle cx={size / 2} cy={size / 2} r={r} fill="none" style={{ stroke: track }} strokeWidth={stroke} />
    <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} strokeLinecap="round"
      strokeDasharray={`${C * Math.min(pct, 100) / 100} ${C}`} transform={`rotate(-90 ${size / 2} ${size / 2})`} style={{ stroke: color, transition: "stroke-dasharray .8s cubic-bezier(.22,.8,.3,1)" }} />
    {children}
  </svg>;
}
function Scene({ kind }) {
  if (kind === "hills") return <svg viewBox="0 0 200 150" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="sk1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#F4D9D2" /><stop offset="1" stopColor="#FBF1E8" /></linearGradient></defs>
    <rect width="200" height="150" fill="url(#sk1)" /><circle cx="140" cy="52" r="18" fill="#F1C3B8" />
    <path d="M0 95 C40 70 70 80 100 92 S160 70 200 84 V150 H0z" fill="#CFD8C4" /><path d="M0 112 C50 92 90 104 130 110 S180 98 200 104 V150 H0z" fill="#B3C3A6" />
    <path d="M0 130 C60 118 120 126 200 120 V150 H0z" fill="#95AB88" />
    {[30, 42, 150, 162, 172].map((x, i) => <path key={i} d={`M${x} ${118 - i % 2 * 4} l6 -16 l6 16z`} fill="#7F9870" />)}
    <path d="M20 40 h26 M26 46 h18" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity=".8" /></svg>;
  if (kind === "town") return <svg viewBox="0 0 200 150" preserveAspectRatio="xMidYMid slice"><rect width="200" height="150" fill="#EFE3D4" />
    <path d="M0 150 L0 90 C60 60 140 70 200 55 V150z" fill="#D8C6B2" />
    {[[20, 92], [48, 84], [76, 78], [104, 72], [132, 66], [160, 62], [36, 112], [70, 104], [104, 98], [140, 92], [172, 88]].map(([x, y], i) =>
      <g key={i}><rect x={x} y={y} width="20" height="16" rx="2" fill={["#F8E6E1", "#FFFDF9", "#E8EEE0", "#F3E8EE"][i % 4]} /><path d={`M${x - 2} ${y} l12 -9 l12 9z`} fill={["#C98F86", "#A27B62", "#8FA67F", "#B592A7"][i % 4]} /></g>)}
    <path d="M150 28 h30 M158 35 h18" stroke="#fff" strokeWidth="5" strokeLinecap="round" /></svg>;
  if (kind === "cup") return <svg viewBox="0 0 200 150" preserveAspectRatio="xMidYMid slice"><rect width="200" height="150" fill="#F3E8DA" /><rect y="104" width="200" height="46" fill="#E2CDB6" />
    <ellipse cx="100" cy="112" rx="46" ry="8" fill="#D2B99F" /><path d="M68 70 h60 v18 a26 26 0 0 1 -26 26 h-8 a26 26 0 0 1 -26 -26z" fill="#FFFDF9" />
    <path d="M128 76 h6 a10 10 0 0 1 0 20 h-8" fill="none" stroke="#FFFDF9" strokeWidth="6" /><ellipse cx="98" cy="70" rx="30" ry="5" fill="#A27B62" />
    <path d="M88 60 c-6 -8 6 -12 0 -22 M104 58 c-6 -8 6 -12 0 -22" stroke="#C9B4A0" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M92 90 c0 -5 8 -5 8 0 c0 -5 8 -5 8 0 c0 6 -8 10 -8 10 s-8 -4 -8 -10z" fill="#E7BEB6" /></svg>;
  return null;
}

function Avatar({ cls = "" }) {
  const { profile } = useStore();
  return <div className={`avatar ${cls}`}>{profile.photo ? <img src={profile.photo} alt={profile.name} /> : (profile.name || "A").trim().charAt(0).toUpperCase()}</div>;
}

/* =============== shell =============== */
const PAGES = [
  { id: "dashboard", label: "Dashboard", icon: "home", group: "Today" },
  { id: "calendar", label: "Calendar & Tasks", icon: "calendar", group: "Today" },
  { id: "routines", label: "Routines", icon: "sun", group: "Today" },
  { id: "academics", label: "Academics", icon: "book", group: "Study" },
  { id: "grades", label: "Grades & CGPA", icon: "award", group: "Study" },
  { id: "exams", label: "Exam Prep", icon: "target", group: "Study" },
  { id: "code", label: "Coding Practice", icon: "code", group: "Study" },
  { id: "wellness", label: "Wellness", icon: "leaf", group: "Life" },
  { id: "mess", label: "Mess Menu", icon: "food", group: "Life" },
  { id: "finance", label: "Finance", icon: "wallet", group: "Life" },
  { id: "journal", label: "Journal", icon: "pen", group: "Life" },
  { id: "music", label: "Mood Mix", icon: "music", group: "Life" },
  { id: "news", label: "Morning Paper", icon: "news", group: "Life" },
  { id: "portfolio", label: "Portfolio", icon: "briefcase", group: "You" },
  { id: "settings", label: "Settings", icon: "sliders", group: "You" },
];
const HIDDEN_PAGES = ["profile", "setup"];

function Sidebar() {
  const { page, go, profile } = useStore();
  return <aside className="sidebar">
    <div className="brand"><Icon n="cup" s={22} /> LattePlanner</div>
    <button className={`me ${page === "profile" ? "on" : ""}`} onClick={() => go("profile")} aria-label="Open your profile and progress report">
      <Avatar />
      <div style={{ minWidth: 0 }}><b>{profile.name}</b><small>View profile & progress</small></div>
      <span className="go"><Icon n="chevR" s={16} /></span>
    </button>
    <nav className="nav" aria-label="Main">
      {["Today", "Study", "Life", "You"].map(g => <React.Fragment key={g}>
        <span className="nav-label">{g}</span>
        {PAGES.filter(p => p.group === g).map(p => <button key={p.id} className={page === p.id ? "on" : ""} onClick={() => go(p.id)} aria-current={page === p.id ? "page" : undefined}>
          <Icon n={p.icon} /> {p.label}</button>)}
      </React.Fragment>)}
    </nav>
  </aside>;
}

const WMO = c => c === 0 ? "Clear" : c <= 2 ? "Partly cloudy" : c === 3 ? "Cloudy" : c <= 48 ? "Misty" : c <= 57 ? "Drizzle" : c <= 67 ? "Rain" : c <= 77 ? "Snow" : c <= 82 ? "Showers" : c <= 86 ? "Snow showers" : "Thunderstorm";
function Weather() {
  const [w, setW] = useState(() => { try { return JSON.parse(localStorage.getItem("lp-wx")); } catch (e) { return null; } });
  useEffect(() => {
    const get = () => fetch("https://api.open-meteo.com/v1/forecast?latitude=30.98&longitude=77.08&current=temperature_2m,weather_code&timezone=Asia%2FKolkata")
      .then(r => r.json()).then(j => { if (j && j.current) { const x = { t: Math.round(j.current.temperature_2m), c: j.current.weather_code }; setW(x); try { localStorage.setItem("lp-wx", JSON.stringify(x)); } catch (e) {} } }).catch(() => {});
    get(); const iv = setInterval(get, 30 * 60000); return () => clearInterval(iv);
  }, []);
  return <div className="chip-info wx" title="Waknaghat, Solan"><Icon n={w && w.c >= 51 ? "rain" : "cloud"} s={18} /><b className="num">{w ? w.t + "°" : "—"}</b><span className="muted">{w ? WMO(w.c) : "Weather"} · Waknaghat</span></div>;
}
function Topbar() {
  const { go, tasks, journal, txns, dumps, steps, todos, setQuick } = useStore();
  const [now, setNow] = useState(new Date());
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 15000); return () => clearInterval(t); }, []);
  const results = useMemo(() => {
    const s = q.trim().toLowerCase(); if (s.length < 2) return [];
    const r = [];
    COURSES.forEach(c => (c.name + " " + c.short).toLowerCase().includes(s) && r.push({ icon: "book", label: c.name, where: "Academics", page: "academics" }));
    todos.forEach(t => t.text.toLowerCase().includes(s) && r.push({ icon: "list", label: t.text, where: "To-do · " + (t.date === todayISO() ? "today" : fmtDay(t.date)), page: "dashboard" }));
    tasks.forEach(t => t.title.toLowerCase().includes(s) && r.push({ icon: "flag", label: t.title, where: "Tasks · " + fmtDay(t.due), page: "calendar" }));
    EXAMS.forEach(x => x.title.toLowerCase().includes(s) && r.push({ icon: "cap", label: x.title, where: "Datesheet · " + fmtDay(x.date), page: "academics" }));
    steps.forEach(st => st.title.toLowerCase().includes(s) && r.push({ icon: st.icon, label: st.title, where: "Routines · " + fmt12(st.time) + (st.days ? " · " + daysLabel(st.days) : ""), page: "routines" }));
    "profile progress report picture photo name".includes(s) && r.push({ icon: "user", label: "Profile & progress report", where: "Profile", page: "profile" });
    txns.forEach(t => t.note.toLowerCase().includes(s) && r.push({ icon: catById(t.cat).icon, label: t.note, where: "Finance · " + rupee(t.amt), page: "finance" }));
    journal.forEach(j => j.text.toLowerCase().includes(s) && r.push({ icon: "pen", label: j.text.slice(0, 60) + "…", where: "Journal · " + fmtDay(j.date), page: "journal" }));
    dumps.forEach(d => d.text.toLowerCase().includes(s) && r.push({ icon: "note", label: d.text, where: "Brain dump", page: "journal" }));
    return r.slice(0, 8);
  }, [q, tasks, journal, txns, dumps, steps, todos]);
  const time = now.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" });
  return <header className="topbar">
    <button className="top-avatar" onClick={() => go("profile")} aria-label="Your profile"><Avatar /></button>
    <div className="search">
      <Icon n="search" />
      <input id="global-search" type="search" placeholder="Search tasks, notes, subjects…" value={q} aria-label="Search"
        onChange={e => { setQ(e.target.value); setOpen(true); }} onFocus={() => setOpen(true)} onBlur={() => setTimeout(() => setOpen(false), 180)} />
      {open && q.trim().length >= 2 && <div className="results">
        {results.length ? results.map((r, i) => <button key={i} onMouseDown={e => e.preventDefault()} onClick={() => { go(r.page); setQ(""); setOpen(false); }}>
          <Icon n={r.icon} s={16} /> <span>{r.label}</span><small>{r.where}</small></button>)
          : <div className="none">Nothing matches “{q}” yet.</div>}
      </div>}
    </div>
    <div className="spacer"></div>
    <div className="chip-info time num"><Icon n="clock" s={17} /><b>{time}</b></div>
    <Weather />
    <button className="fab" aria-label="Quick add" onClick={() => setQuick("todo")}><Icon n="plus" s={24} sw={2.2} /></button>
  </header>;
}

/* =============== page 1: dashboard =============== */
function Dashboard() {
  const { profile, intentions, setIntentions, go } = useStore();
  const h = new Date().getHours();
  const greet = h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
  const doy = Math.floor((startToday() - new Date(startToday().getFullYear(), 0, 0)) / 864e5);
  return <div className="page">
    <div className="hello">
      <div>
        <p className="eyebrow">{fmtLong(todayISO())}</p>
        <h1>{greet}, {profile.name} <span style={{ color: "var(--pink-3)" }}>♡</span></h1>
        <p className="quote">“{QUOTES[doy % QUOTES.length]}”</p>
      </div>
      <Glance />
    </div>
    <SetupBanner />
    <div className="dash">
      <div className="col">
        <section className="card intent-card">
          <div className="card-h"><Icon n="heart" style={{ color: "var(--pink-3)" }} /><h2 className="grow">Top 3 intentions</h2>
            <span className="muted" style={{ fontSize: 13 }}>{intentions.filter(i => i.done).length}/3 honoured</span></div>
          <div className="intent">
            {intentions.map((it, i) => <div key={it.id} className={`intent-row ${it.done ? "is-done" : ""}`}>
              <span className="n">{i + 1}</span>
              <Check on={it.done} label={`Mark intention ${i + 1} done`} round onChange={() => setIntentions(intentions.map(x => x.id === it.id ? { ...x, done: !x.done } : x))} />
              <input id={`intent-${it.id}`} className="done-text" value={it.text} placeholder="Something that matters today…" aria-label={`Intention ${i + 1}`}
                onChange={e => setIntentions(intentions.map(x => x.id === it.id ? { ...x, text: e.target.value } : x))} />
            </div>)}
          </div>
        </section>
        <DailyTodos />
        <Timeline />
      </div>
      <div className="col">
        <ExamBanner />
        <FocusCorner />
        <WellnessMini />
        <MessMini />
        <NewsMini />
        <section className="card">
          <div className="card-h"><Icon n="flag" style={{ color: "var(--mocha)" }} /><h2 className="grow">Coming up</h2>
            <button className="btn soft" style={{ height: 34, padding: "0 14px" }} onClick={() => go("calendar")}>All tasks</button></div>
          <UpNext limit={5} />
        </section>
      </div>
    </div>
  </div>;
}
function Glance() {
  const { attendance, txns, profile } = useStore();
  const t1 = EXAMS.slice().sort((a, b) => a.date.localeCompare(b.date)).find(x => daysUntil(x.date) >= 0);
  const withData = COURSES.filter(c => attendance[c.id].held > 0);
  const avg = withData.length ? Math.round(withData.reduce((a, c) => a + attendance[c.id].pct, 0) / withData.length) : null;
  const spent = txns.filter(t => t.date.slice(0, 7) === todayISO().slice(0, 7)).reduce((a, t) => a + t.amt, 0);
  return <div className="glance">
    {t1 && <span><Icon n="cap" s={16} />{t1.kind === "Mid-term" && /^T\d/.test(t1.title) ? t1.title.split(" ·")[0] : "Next exam"} in <b className="num">{daysUntil(t1.date) === 0 ? "today" : daysUntil(t1.date) + (daysUntil(t1.date) === 1 ? " day" : " days")}</b></span>}
    {avg != null && <span><Icon n="check" s={16} /><b className="num">{avg}%</b> avg attendance</span>}
    <span><Icon n="wallet" s={16} /><b className="num">{rupee(profile.budget - spent)}</b> left this month</span>
  </div>;
}
function Timeline() {
  const { checks, setChecks, attendance, userEvents, profile, steps, routinePlan } = useStore();
  const today = todayISO(), dow = new Date().getDay();
  const nowMin = new Date().getHours() * 60 + new Date().getMinutes();
  const slots = [...slotsFor(dow), ...userEvents.filter(e => e.date === today && e.time).map(e => ({ id: "u-" + e.id, t: e.time, e: e.time, title: e.title, icon: "star", note: "Added by you" })),
    ...steps.filter(st => st.days && st.days.includes(dow) && stepInPlan(st, routinePlan[today] || "normal")).map(st => ({ id: "r-" + st.id, t: st.time, e: st.time, title: st.title, icon: st.icon, note: "Routine · " + daysLabel(st.days) }))]
    .sort((a, b) => toMin(a.t) - toMin(b.t));
  const allDay = [...HOLIDAYS, ...BIRTHDAYS, ...userEvents.filter(e => !e.time)].filter(e => e.date === today);
  const classes = slots.filter(s => s.course).length;
  const stOf = v => !v ? null : typeof v === "object" ? v.s : (v === true || v === "p") ? "p" : v;
  const marked = slots.filter(s => s.course && stOf(checks[`${today}|${s.id}`]) === "p").length;
  return <section className="card">
    <div className="card-h"><Icon n="clock" style={{ color: "var(--mocha)" }} /><h2 className="grow">Today's timeline</h2>
      {classes > 0 && <span className="muted" style={{ fontSize: 13 }}>{marked}/{classes} lectures attended</span>}</div>
    {allDay.length > 0 && <div className="allday">{allDay.map((e, i) => <span key={i} className="tag" style={{ background: e.type === "birthday" ? "var(--pink-2)" : "var(--sage-2)", color: "var(--coffee)", padding: "6px 12px" }}>
      <Icon n={e.type === "birthday" ? "gift" : "star"} s={14} /> {e.title}</span>)}</div>}
    {slots.length === 0 && <div className="empty">No classes today. Rest is productive too ♡</div>}
    <div className="tl">
      {slots.map(s => {
        const st = toMin(s.t), en = toMin(s.e);
        const state = nowMin >= st && nowMin <= en ? "now" : nowMin > en ? "past" : "";
        const c = s.course && courseById(s.course);
        const key = `${today}|${s.id}`;
        const a = c && attendance[c.id];
        return <div key={s.id} className={`tl-row ${state}`}>
          <div className="tl-time num">{fmt12(s.t).replace(" ", " ")}</div>
          <div className="tl-dot"></div>
          <div className={`tl-body ${c ? "cls" : ""}`} style={c && stOf(checks[key]) === "p" ? { background: "var(--sage-2)" } : c && stOf(checks[key]) === "a" ? { background: "var(--pink-2)" } : null}>
            <span className="ic" style={{ background: c ? c.soft : "var(--latte-2)", color: c ? c.color : "var(--mocha)" }}><Icon n={c ? (s.kind === "Lab" ? "flask" : "cap") : s.icon} /></span>
            <div className="tl-main">
              <b>{c ? c.short : s.title}
                {c && a.held > 0 && <span className="att-chip num" style={{ background: a.pct >= profile.target ? "var(--sage-2)" : "var(--pink-2)", color: a.pct >= profile.target ? "var(--sage-3)" : "var(--warn)" }} title="Attendance so far">{a.pct}%</span>}
                {state === "now" && <span className="now-chip">Now</span>}</b>
              <small>{c ? `${s.kind} · ${s.room} · ${fmt12(s.t)}–${fmt12(s.e)}` : [s.note, `${fmt12(s.t)}${s.e !== s.t ? "–" + fmt12(s.e) : ""}`].filter(Boolean).join(" · ")}</small>
            </div>
            {c && <div className="mark">
              <label className="present"><Check on={stOf(checks[key]) === "p"} label={`Mark present for ${c.short}`} onChange={() => setChecks({ ...checks, [key]: stOf(checks[key]) === "p" ? undefined : { s: "p", c: c.id } })} />Present</label>
              <button className={`absent ${stOf(checks[key]) === "a" ? "on" : ""}`} aria-pressed={stOf(checks[key]) === "a"} onClick={() => setChecks({ ...checks, [key]: stOf(checks[key]) === "a" ? undefined : { s: "a", c: c.id } })}>{stOf(checks[key]) === "a" ? "Missed" : "Missed?"}</button>
            </div>}
          </div>
        </div>;
      })}
    </div>
  </section>;
}
function FocusCorner() {
  const { profile, notify, focusLog, setFocusLog } = useStore();
  const MODES = { "25/5": [25, 5], "50/10": [50, 10] };
  const [mode, setMode] = useState(profile.focus || "25/5");
  const [phase, setPhase] = useState("focus");
  const [left, setLeft] = useState(MODES[mode][0] * 60);
  const [running, setRunning] = useState(false);
  const [subject, setSubject] = useState(() => (COURSES[0] || {}).id || "");
  const done = focusLog[todayISO()] || 0;
  const setDone = n => setFocusLog(f => ({ ...f, [todayISO()]: n }));
  const [snd, setSnd] = useState({ rain: false, cafe: false });
  const [vol, setVol] = useState(0.5);
  const total = MODES[mode][phase === "focus" ? 0 : 1] * 60;
  useEffect(() => { if (!running) return; const t = setInterval(() => setLeft(l => Math.max(0, l - 1)), 1000); return () => clearInterval(t); }, [running]);
  useEffect(() => {
    if (left > 0 || !running) return;
    setRunning(false); Sound.chime();
    if (phase === "focus") { setDone(done + 1); setPhase("break"); setLeft(MODES[mode][1] * 60); notify("Focus session done. Take a soft break ♡"); }
    else { setPhase("focus"); setLeft(MODES[mode][0] * 60); notify("Break's over. Ready when you are."); }
  }, [left]);
  useEffect(() => () => { Sound.toggle("rain", false); Sound.toggle("cafe", false); }, []);
  const pick = m => { setMode(m); setPhase("focus"); setRunning(false); setLeft(MODES[m][0] * 60); };
  const toggleSnd = k => { const on = !snd[k]; setSnd({ ...snd, [k]: on }); Sound.toggle(k, on, vol); };
  const pct = (1 - left / total) * 100;
  return <section className="card focus">
    <div className="card-h"><Icon n="coffee" style={{ color: "var(--mocha)" }} /><h2 className="grow">Cozy focus corner</h2></div>
    <div className="focus-top">
      <div className="seg" role="tablist">{Object.keys(MODES).map(m => <button key={m} className={mode === m ? "on" : ""} onClick={() => pick(m)}>{m}</button>)}</div>
      <select id="focus-subject" className="input" style={{ flex: 1, minWidth: 130, height: 38, borderRadius: 999 }} value={subject} onChange={e => setSubject(e.target.value)} aria-label="Subject">
        {COURSES.map(c => <option key={c.id} value={c.id}>{c.short}</option>)}
      </select>
    </div>
    <div className="timer">
      <Ring pct={pct} color={phase === "focus" ? "var(--pink-3)" : "var(--sage-3)"} size={210} stroke={9} track="var(--line)" />
      <div><div className="t num">{pad(Math.floor(left / 60))}:{pad(left % 60)}</div><span className="p">{phase === "focus" ? ((courseById(subject) || {}).short || "Focus") : "Break"}</span></div>
    </div>
    <div className="timer-ctrl">
      <button className="round-soft" aria-label="Reset" onClick={() => { setRunning(false); setLeft(total); }}><Icon n="reset" /></button>
      <button className="play" aria-label={running ? "Pause" : "Start"} onClick={() => setRunning(!running)}><Icon n={running ? "pause" : "play"} s={22} /></button>
      <button className="round-soft" aria-label="Skip to next phase" onClick={() => { setLeft(0); setRunning(true); }}><Icon n="chevR" /></button>
    </div>
    <div className="ambient">
      <div className="amb-row">
        {[["rain", "Rain", "rain"], ["cafe", "Coffee shop", "coffee"]].map(([k, label, ic]) =>
          <button key={k} className={`amb ${snd[k] ? "on" : ""}`} aria-pressed={snd[k]} onClick={() => toggleSnd(k)}><Icon n={ic} s={16} />{label}<span className="eq"><i></i><i></i><i></i></span></button>)}
      </div>
      <div className="vol"><Icon n="volume" s={16} /><input id="amb-vol" type="range" min="0" max="1" step="0.05" value={vol} aria-label="Ambient volume" onChange={e => { setVol(+e.target.value); Sound.vol(+e.target.value); }} /></div>
    </div>
    <div className="sessions">{Array.from({ length: Math.max(4, done) }, (_, i) => <i key={i} className={i < done ? "f" : ""}></i>)}<span style={{ marginLeft: 6 }}>{done} sessions today</span></div>
  </section>;
}
function UpNext({ limit }) {
  const { tasks, setTasks } = useStore();
  const items = [
    ...tasks.filter(t => !t.done && daysUntil(t.due) >= 0).map(t => ({ ...t, date: t.due, isTask: true })),
    ...EXAMS.filter(x => daysUntil(x.date) >= 0).map(x => ({ ...x, isTask: false })),
  ].sort((a, b) => a.date.localeCompare(b.date)).slice(0, limit);
  if (!items.length) return <div className="empty">All clear. Enjoy the breathing room.</div>;
  return <div className="upnext">{items.map(it => {
    const d = parseISO(it.date), r = relDays(it.date);
    return <div key={it.id} className="up-row">
      <div className="d"><b className="num">{d.getDate()}</b><small>{d.toLocaleDateString("en-IN", { month: "short" })}</small></div>
      <div className="grow"><b title={it.title}>{it.title}</b><Tag course={it.course} /></div>
      <span className={`urg ${r.cls}`}>{r.text}</span>
      {it.isTask && <Check on={false} label={`Complete ${it.title}`} onChange={() => setTasks(tasks.map(t => t.id === it.id ? { ...t, done: true } : t))} />}
    </div>;
  })}</div>;
}

function DailyTodos() {
  const { todos, setTodos, notify } = useStore();
  const [text, setText] = useState(""); const [due, setDue] = useState(false); const [when, setWhen] = useState(0);
  const today = todayISO(), tomorrow = dISO(1);
  const list = todos.filter(t => t.date === today).sort((a, b) => (a.done - b.done) || (b.due - a.due));
  const missed = todos.filter(t => t.due && !t.done && t.date < today).sort((a, b) => a.date.localeCompare(b.date));
  const later = todos.filter(t => t.date > today && !t.done);
  const doneN = list.filter(t => t.done).length;
  const add = e => {
    e.preventDefault(); if (!text.trim()) return;
    const d = dISO(when);
    setTodos([...todos, { id: uid(), text: text.trim(), date: d, from: d, due, done: false }]);
    setText(""); setDue(false); notify(when ? "Added for tomorrow" : "Added to today ♡");
  };
  const upd = (id, patch) => setTodos(todos.map(t => t.id === id ? { ...t, ...patch } : t));
  const carriedLabel = t => { const n = Math.round((parseISO(t.date) - parseISO(t.from)) / 864e5); return n === 1 ? "from yesterday" : `from ${parseISO(t.from).toLocaleDateString("en-IN", { weekday: "short" })}`; };
  return <section className="card">
    <div className="card-h"><Icon n="list" style={{ color: "var(--mocha)" }} /><h2 className="grow">Today's to-dos</h2><span className="muted" style={{ fontSize: 13 }}>{doneN}/{list.length} done</span></div>
    <form className="todo-add" onSubmit={add}>
      <input id="todo-new" className="input" placeholder="Add a little to-do…" value={text} onChange={e => setText(e.target.value)} aria-label="New to-do" />
      <button type="button" className={`chip-toggle ${due ? "on" : ""}`} aria-pressed={due} onClick={() => setDue(!due)} title="Deadline: it stays on its day instead of moving forward"><Icon n="flag" s={14} />Deadline</button>
      <div className="seg"><button type="button" className={when === 0 ? "on" : ""} onClick={() => setWhen(0)}>Today</button><button type="button" className={when === 1 ? "on" : ""} onClick={() => setWhen(1)}>Tomorrow</button></div>
      <button className="btn primary" type="submit" style={{ height: 44 }} aria-label="Add to-do"><Icon n="plus" s={16} /></button>
    </form>
    {list.map(t => <div key={t.id} className={`todo ${t.done ? "is-done" : ""}`}>
      <Check round on={t.done} label={`Complete ${t.text}`} onChange={() => upd(t.id, { done: !t.done, doneOn: !t.done ? today : null })} />
      <div className="grow"><span className="done-text">{t.text}</span>
        {(t.due || t.from < t.date) && <div className="meta">
          {t.due && <span className="due"><Icon n="flag" s={11} />Due today</span>}
          {t.from < t.date && <span className="carry"><Icon n="repeat" s={11} />Carried over {carriedLabel(t)}</span>}</div>}
      </div>
      <button className="icon-btn del" aria-label={`Delete ${t.text}`} onClick={() => setTodos(todos.filter(x => x.id !== t.id))}><Icon n="x" s={15} /></button>
    </div>)}
    {!list.length && <div className="empty">Nothing on today's list yet. Add something small.</div>}
    {missed.length > 0 && <div className="missed">
      <b style={{ fontSize: 13.5, color: "var(--warn)" }}>Missed deadlines</b>
      {missed.map(t => <div key={t.id} className="missed-row">
        <span>{t.text} <span className="muted" style={{ fontSize: 12.5 }}>· was due {fmtDay(t.date)}</span></span>
        <button className="btn soft" style={{ height: 32, padding: "0 12px", fontSize: 13 }} onClick={() => { upd(t.id, { date: today }); notify("Moved to today"); }}>Do it today</button>
        <button className="btn soft" style={{ height: 32, padding: "0 12px", fontSize: 13 }} onClick={e => { celebrate(e.currentTarget); upd(t.id, { done: true, doneOn: today }); }}>Done late</button>
        <button className="icon-btn" aria-label={`Remove ${t.text}`} onClick={() => setTodos(todos.filter(x => x.id !== t.id))}><Icon n="x" s={15} /></button>
      </div>)}
    </div>}
    <p className="rule"><Icon n="repeat" s={14} /><span>Unfinished to-dos move to the next day on their own. Ones marked <b>Deadline</b> stay on their day.{later.length ? ` ${later.length} planned for later.` : ""}</span></p>
  </section>;
}
function NewsMini() {
  const { news, go } = useStore();
  const d = news.doc; const items = d && Array.isArray(d.sections) ? d.sections.map(sec => sec.items && sec.items[0] && { ...sec.items[0], sec: sec.title }).filter(Boolean).slice(0, 4) : [];
  if (news.status !== "ok" || !items.length) return null;
  return <section className="card">
    <div className="card-h"><Icon n="news" style={{ color: "var(--mocha)" }} /><h2 className="grow">Morning paper</h2>
      <button className="btn soft" style={{ height: 34, padding: "0 14px" }} onClick={() => go("news")}>Read</button></div>
    <div className="news-mini">{items.map((it, i) => <a key={i} href={it.url} target="_blank" rel="noopener noreferrer"><small>{it.sec}</small><b>{it.headline}</b></a>)}</div>
  </section>;
}

/* =============== page 2: calendar & tasks =============== */
const TYPE = {
  holiday: { label: "Holiday", color: "#7F9870", bg: "var(--sage-2)", icon: "star" },
  birthday: { label: "Birthday", color: "#C4827A", bg: "var(--pink-2)", icon: "gift" },
  deadline: { label: "Deadline", color: "#9A7560", bg: "var(--latte-2)", icon: "flag" },
  exam: { label: "Exam / lab", color: "#A88598", bg: "var(--mauve-2)", icon: "cap" },
  event: { label: "Event", color: "#9C8878", bg: "var(--taupe-2)", icon: "heart" },
};
function CalendarPage() {
  const { tasks, setTasks, userEvents, todos, notify } = useStore();
  const [cursor, setCursor] = useState(() => { const d = startToday(); d.setDate(1); return d; });
  const [sel, setSel] = useState(todayISO());
  const [filter, setFilter] = useState("all");
  const [editing, setEditing] = useState(null);
  const [draft, setDraft] = useState({ title: "", course: (COURSES[0] || {}).id || "", due: todayISO(), type: "task" });
  const events = useMemo(() => [
    ...HOLIDAYS, ...BIRTHDAYS,
    ...EXAMS.map(x => ({ date: x.date, title: x.title, type: "exam" })),
    ...tasks.filter(t => t.type === "deadline").map(t => ({ date: t.due, title: t.title, type: "deadline", done: t.done })),
    ...userEvents.map(e => ({ date: e.date, title: e.title, type: "event" })),
  ], [tasks, userEvents]);
  const byDate = useMemo(() => { const m = {}; events.forEach(e => (m[e.date] = m[e.date] || []).push(e)); return m; }, [events]);
  const first = new Date(cursor), startDow = (first.getDay() + 6) % 7;
  const cells = Array.from({ length: 42 }, (_, i) => { const d = new Date(first); d.setDate(1 - startDow + i); return d; });
  const month = cursor.getMonth();
  const shift = n => { const d = new Date(cursor); d.setMonth(d.getMonth() + n); setCursor(d); };
  const selEvents = byDate[sel] || [];
  const selTasks = tasks.filter(t => t.due === sel && t.type !== "deadline");

  let list = [
    ...tasks.map(t => ({ ...t, kind: t.type })),
    ...HOLIDAYS.filter(h => daysUntil(h.date) >= -1).map(h => ({ id: "h" + h.date, title: h.title, due: h.date, kind: "holiday" })),
  ];
  if (filter === "deadlines") list = list.filter(t => t.kind === "deadline");
  if (filter === "holidays") list = list.filter(t => t.kind === "holiday");
  list.sort((a, b) => (a.done ? 1 : 0) - (b.done ? 1 : 0) || a.due.localeCompare(b.due));

  const add = e => {
    e.preventDefault(); if (!draft.title.trim()) return;
    setTasks([...tasks, { id: uid(), title: draft.title.trim(), course: draft.course, due: draft.due, type: draft.type, done: false }]);
    setDraft({ ...draft, title: "" }); notify("Task added ♡");
  };
  return <div className="page">
    <div className="page-head"><div><p className="eyebrow">Plan softly</p><h1>Calendar & tasks</h1><p>Holidays, birthdays and deadlines in one gentle view. Pick a day to see what's on it.</p></div></div>
    <div className="cal-wrap">
      <section className="card">
        <div className="card-h">
          <h2 className="grow">{cursor.toLocaleDateString("en-IN", { month: "long", year: "numeric" })}</h2>
          <div className="cal-nav">
            <button className="icon-btn" aria-label="Previous month" onClick={() => shift(-1)}><Icon n="chevL" /></button>
            <button className="btn soft" style={{ height: 34, padding: "0 14px" }} onClick={() => { const d = startToday(); d.setDate(1); setCursor(d); setSel(todayISO()); }}>Today</button>
            <button className="icon-btn" aria-label="Next month" onClick={() => shift(1)}><Icon n="chevR" /></button>
          </div>
        </div>
        <div className="cal-grid">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => <div key={d} className="cal-dow">{d}</div>)}
          {cells.map(d => {
            const iso = isoOf(d), ev = byDate[iso] || [];
            const cls = ["day", d.getMonth() !== month && "out", iso === todayISO() && "today", iso === sel && "sel",
              ev.some(e => e.type === "holiday") && "hol", ev.some(e => e.type === "birthday") && !ev.some(e => e.type === "holiday") && "bday"].filter(Boolean).join(" ");
            return <button key={iso} className={cls} onClick={() => setSel(iso)} aria-label={`${fmtLong(iso)}${ev.length ? ", " + ev.length + " items" : ""}`}>
              <span className="dn num">{d.getDate()}</span>
              {ev.length > 0 && <span className="lbl">{ev[0].title}</span>}
              <span className="dots">{ev.slice(0, 4).map((e, i) => <i key={i} style={{ background: TYPE[e.type].color }}></i>)}</span>
            </button>;
          })}
        </div>
        <div className="legend">{Object.values(TYPE).map(t => <span key={t.label}><i style={{ background: t.color }}></i>{t.label}</span>)}</div>
      </section>
      <section className="card">
        <p className="eyebrow">{sel === todayISO() ? "Today" : parseISO(sel).toLocaleDateString("en-IN", { weekday: "long" })}</p>
        <h2 style={{ marginBottom: 16 }}>{parseISO(sel).toLocaleDateString("en-IN", { day: "numeric", month: "long" })}</h2>
        <div className="dayp-list">
          {selEvents.map((e, i) => <div key={i} className="dayp-item" style={{ background: TYPE[e.type].bg }}>
            <span className="ic" style={{ color: TYPE[e.type].color }}><Icon n={TYPE[e.type].icon} /></span>
            <div><b style={{ fontWeight: 600 }}>{e.title}</b><div className="muted" style={{ fontSize: 12.5 }}>{TYPE[e.type].label}</div></div></div>)}
          {selTasks.map(t => <div key={t.id} className="dayp-item" style={{ background: "var(--bg)" }}>
            <span className="ic" style={{ color: "var(--mocha)" }}><Icon n="check" /></span>
            <div><b style={{ fontWeight: 600 }}>{t.title}</b><div className="muted" style={{ fontSize: 12.5 }}>Task{t.done ? " · done" : ""}</div></div></div>)}
          {todos.filter(t => t.date === sel).map(t => <div key={t.id} className="dayp-item" style={{ background: "var(--bg)" }}>
            <span className="ic" style={{ color: t.due ? "var(--warn)" : "var(--mocha)" }}><Icon n={t.due ? "flag" : "list"} /></span>
            <div><b style={{ fontWeight: 600 }}>{t.text}</b><div className="muted" style={{ fontSize: 12.5 }}>To-do{t.due ? " · deadline" : ""}{t.done ? " · done" : ""}</div></div></div>)}
          {!selEvents.length && !selTasks.length && !todos.some(t => t.date === sel) && <div className="empty">A quiet day. Nothing planned yet.</div>}
        </div>
      </section>
    </div>
    <section className="card">
      <div className="card-h" style={{ flexWrap: "wrap" }}>
        <h2 className="grow">Master task list</h2>
        <div className="seg">{[["all", "All"], ["deadlines", "Deadlines"], ["holidays", "Holidays"]].map(([k, l]) =>
          <button key={k} className={filter === k ? "on" : ""} onClick={() => setFilter(k)}>{l}</button>)}</div>
      </div>
      <form className="addrow" onSubmit={add}>
        <input id="new-task" className="input" placeholder="Add a task…" value={draft.title} onChange={e => setDraft({ ...draft, title: e.target.value })} aria-label="Task title" />
        <select id="new-task-course" className="input" value={draft.course} onChange={e => setDraft({ ...draft, course: e.target.value })} aria-label="Subject">
          {COURSES.map(c => <option key={c.id} value={c.id}>{c.short}</option>)}<option value="">Personal</option></select>
        <input id="new-task-due" className="input" type="date" value={draft.due} onChange={e => setDraft({ ...draft, due: e.target.value })} aria-label="Due date" />
        <button className="btn primary" type="submit" style={{ height: 44 }}><Icon n="plus" s={16} />Add</button>
      </form>
      <div className="tasks">
        {list.map(t => {
          if (t.kind === "holiday") return <div key={t.id} className="task">
            <span style={{ width: 24, display: "grid", placeItems: "center", color: TYPE.holiday.color }}><Icon n="star" /></span>
            <div className="grow"><b>{t.title}</b><div className="meta"><span className="tag" style={{ background: "var(--sage-2)", color: "var(--sage-3)" }}>Holiday</span><span className="muted" style={{ fontSize: 13 }}>{fmtLong(t.due)}</span></div></div>
            <span className={`urg calm`}>{relDays(t.due).text}</span></div>;
          if (editing === t.id) return <EditTask key={t.id} t={t} onDone={() => setEditing(null)} />;
          const r = relDays(t.due);
          return <div key={t.id} className={`task ${t.done ? "is-done" : ""}`}>
            <Check on={t.done} label={`Complete ${t.title}`} onChange={() => setTasks(tasks.map(x => x.id === t.id ? { ...x, done: !x.done } : x))} />
            <div className="grow"><b className="done-text">{t.title}</b>
              <div className="meta"><Tag course={t.course} />{t.kind === "deadline" && <span className="tag" style={{ background: "var(--latte-2)", color: "var(--mocha)" }}><Icon n="flag" s={12} />Deadline</span>}
                <span className="muted num" style={{ fontSize: 13 }}>Due {fmtDay(t.due)}</span></div></div>
            {!t.done && <span className={`urg ${r.cls}`}>{r.text}</span>}
            <button className="icon-btn" aria-label={`Edit ${t.title}`} onClick={() => setEditing(t.id)}><Icon n="pencil" s={16} /></button>
          </div>;
        })}
      </div>
    </section>
  </div>;
}
function EditTask({ t, onDone }) {
  const { tasks, setTasks } = useStore();
  const [d, setD] = useState({ title: t.title, due: t.due, course: t.course });
  return <form className="task" onSubmit={e => { e.preventDefault(); setTasks(tasks.map(x => x.id === t.id ? { ...x, ...d } : x)); onDone(); }}>
    <div className="task-edit">
      <input id={`edit-title-${t.id}`} className="input" value={d.title} onChange={e => setD({ ...d, title: e.target.value })} aria-label="Title" autoFocus />
      <select id={`edit-course-${t.id}`} className="input" value={d.course} onChange={e => setD({ ...d, course: e.target.value })} aria-label="Subject">{COURSES.map(c => <option key={c.id} value={c.id}>{c.short}</option>)}<option value="">Personal</option></select>
      <input id={`edit-due-${t.id}`} className="input" type="date" value={d.due} onChange={e => setD({ ...d, due: e.target.value })} aria-label="Due date" />
      <div style={{ display: "flex", gap: 6 }}>
        <button className="btn primary" type="submit" style={{ height: 44 }}>Save</button>
        <button className="icon-btn" type="button" aria-label="Delete task" style={{ width: 44, height: 44 }} onClick={() => { setTasks(tasks.filter(x => x.id !== t.id)); onDone(); }}><Icon n="trash" s={17} /></button>
      </div>
    </div>
  </form>;
}

/* =============== page 3: routines =============== */
function Swipe({ on, onToggle, label }) {
  const ref = useRef(null); const st = useRef(null);
  const [dx, setDx] = useState(null);
  const max = () => (ref.current ? ref.current.offsetWidth - 40 : 98);
  const down = e => { st.current = { x: e.clientX, moved: false }; ref.current.setPointerCapture(e.pointerId); };
  const move = e => { if (!st.current || on) return; const d = Math.max(0, Math.min(max(), e.clientX - st.current.x)); if (d > 4) st.current.moved = true; setDx(d); };
  const up = () => { if (!st.current) return; const s = st.current; st.current = null;
    if (!s.moved) { if (!on) celebrate(ref.current); onToggle(); } else if (!on && dx > max() * 0.6) { celebrate(ref.current); onToggle(); } setDx(null); };
  const x = dx != null ? dx : on ? max() : 0;
  return <div ref={ref} className={`swipe ${on ? "on" : ""} ${dx != null ? "dragging" : ""}`} role="switch" aria-checked={on} aria-label={label} tabIndex={0}
    onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={() => { st.current = null; setDx(null); }}
    onKeyDown={e => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); if (!on) celebrate(ref.current); onToggle(); } }}>
    <div className="fill" style={{ transform: `scaleX(${on ? 1 : (x + 36) / (max() + 36)})`, opacity: on || dx ? 1 : 0 }}></div>
    <span className="lbl">{on ? "done ♡" : "slide to finish"}</span>
    <div className="knob" style={{ transform: `translateX(${x}px)` }}><Icon n={on ? "check" : "chevR"} s={16} sw={2.2} /></div>
  </div>;
}
function RoutinesPage() {
  const { routineDone, setRoutineDone, steps: allSteps, routinePlan, setRoutinePlan } = useStore();
  const [edit, setEdit] = useState(false);
  const [modal, setModal] = useState(null);
  const today = todayISO(), dow = new Date().getDay(); const done = routineDone[today] || {};
  const plan = routinePlan[today] || "normal";
  const P = PLANS.find(x => x.id === plan) || PLANS[0];
  const steps = allSteps.filter(st => stepInPlan(st, plan));
  const examToday = EXAMS.some(x => x.date === today && !/lab|viva/i.test(x.kind || ""));
  const isOn = st => !st.days || st.days.includes(dow);
  const byTime = (x, y) => toMin(x.time) - toMin(y.time);
  const todays = steps.filter(isOn).sort(byTime);
  const n = todays.filter(st => done[st.id]).length, total = todays.length;
  const pct = total ? n / total * 100 : 0;
  const nowMin = new Date().getHours() * 60 + new Date().getMinutes();
  const nextId = (todays.find(st => toMin(st.time) > nowMin) || {}).id;
  const weekly = steps.filter(st => st.days).sort(byTime);
  const toggle = id => setRoutineDone(r => { const d = r[today] || {}; return { ...r, [today]: { ...d, [id]: !d[id] } }; });
  return <div className="page">
    <div className="page-head">
      <div><p className="eyebrow">{fmtLong(today)}</p><h1>Daily routines</h1>
        <p>{edit ? "Tap any step to change it, or add new ones. A step can repeat every day or only on the days you pick." : "One continuous, gentle flow for the day. Slide a pill to finish a step, or tap it."}</p></div>
      <button className={`btn ${edit ? "primary" : "soft"}`} onClick={() => setEdit(!edit)}><Icon n={edit ? "check" : "pencil"} s={16} />{edit ? "Done editing" : "Edit routine"}</button>
    </div>
    <section className="card">
      <div className="card-h" style={{ marginBottom: 10, flexWrap: "wrap" }}><h2 className="grow">{edit ? "Editing plan" : "Today's plan"}</h2>
        {examToday && plan !== "exam" && <button className="btn pink" style={{ height: 36 }} onClick={() => setRoutinePlan({ ...routinePlan, [today]: "exam" })}><Icon n="cap" s={15} />Exam today: switch to Exam day</button>}</div>
      <div className="mood-pick">{PLANS.map(x => <button key={x.id} className={plan === x.id ? "on" : ""} aria-pressed={plan === x.id} onClick={() => setRoutinePlan({ ...routinePlan, [today]: x.id })}><Icon n={x.icon} s={15} />{x.label}</button>)}</div>
      <p className="card-note" style={{ marginTop: 10 }}>{plan === "normal" ? "Your everyday routine." : plan === "exam" ? "Calm, early and focused: revision in the morning, rest after the paper, next subject in the evening." : plan === "holiday" ? "A slower day: sleep in a little, catch up on laundry and study, leave time for yourself." : "For assignment nights: a short nap, two focused work blocks and a later bedtime. Tomorrow goes back to normal."} Choosing a plan only changes today.</p>
    </section>
    <section className="card">
      <div className="flow-head">
        <Ring pct={pct} color="var(--pink-3)" size={64} stroke={7}><text x="32" y="37" textAnchor="middle" fontSize="15" fontWeight="700" style={{ fill: "var(--coffee)" }} fontFamily="Nunito">{Math.round(pct)}%</text></Ring>
        <div style={{ flex: 1, minWidth: 200 }}><h2>{n} of {total} steps done today</h2><p className="muted" style={{ fontSize: 14 }}>{total && n === total ? "Every step done. Be proud of today ♡" : "No pressure. Skipped steps just roll into tomorrow."}</p></div>
        <div className="bar" style={{ maxWidth: 360 }}><i style={{ width: `${pct}%` }}></i></div>
      </div>
    </section>
    <section className="card">
      <div className="card-h" style={{ flexWrap: "wrap" }}><Icon n="repeat" style={{ color: "var(--sage-3)" }} /><h2 className="grow">Weekly & occasional</h2>
        <button className="btn soft" style={{ height: 36, padding: "0 14px" }} onClick={() => setModal({ new: true, block: "evening", days: [3, 6], plan: "any" })}><Icon n="plus" s={15} />Add a weekly step</button></div>
      {weekly.length ? <div className="weekly">{weekly.map(st => <div key={st.id} className="weekly-row">
        <span className="ic"><Icon n={st.icon} /></span>
        <div className="grow"><b>{st.title}</b><small>{daysLabel(st.days)} · {fmt12(st.time)} · {st.dur} · next {nextOn(st.days)}</small></div>
        <div className="wk-days" aria-label={daysLabel(st.days)}>{WEEK_ORDER.map(d => <i key={d} className={`${st.days.includes(d) ? "on" : ""} ${d === dow ? "today" : ""}`}>{DAY_SHORT[d][0]}</i>)}</div>
        <button className="icon-btn" aria-label={`Edit ${st.title}`} onClick={() => setModal(st)}><Icon n="pencil" s={16} /></button>
      </div>)}</div> : <div className="empty">Things like laundry or watering plants can go here, on just the days they happen.</div>}
    </section>
    <div className="flow">
      {ROUTINE_BLOCKS.map(b => {
        const list = steps.filter(st => st.block === b.id && (edit || isOn(st))).sort(byTime);
        const active = list.filter(isOn); const bd = active.filter(st => done[st.id]).length;
        return <div key={b.id}>
          <div className="block-h">
            <span className="st"></span>
            <span className="badge" style={{ background: mix(b.tone[1]), color: b.tone[1] }}><Icon n={b.icon} s={20} /></span>
            <div className="txt"><h2>{P.blocks[b.id] || b.title} <span className="muted" style={{ fontFamily: "var(--body)", fontSize: 14, fontWeight: 700 }}>· {bd}/{active.length}</span></h2><small>{list[0] ? fmt12(list[0].time) + " · " : ""}{P.blocks[b.id] ? "" : b.sub}</small></div>
          </div>
          {list.map(st => { const on = isOn(st); return <React.Fragment key={st.id}>
            {!edit && st.id === nextId && <div className="nowline" aria-hidden="true"><span className="num">NOW</span><i></i><em></em></div>}
            <div className={`step ${!edit && done[st.id] ? "done" : ""} ${!on ? "off" : ""}`}>
              <span className="st num">{fmt12(st.time)}</span>
              <span className="sd"><Icon n={!edit && done[st.id] ? "check" : st.icon} s={16} sw={!edit && done[st.id] ? 2.4 : 1.7} /></span>
              <div className={`step-card ${edit ? "editable" : ""}`} onClick={edit ? () => setModal(st) : undefined}
                role={edit ? "button" : undefined} tabIndex={edit ? 0 : undefined} onKeyDown={edit ? e => e.key === "Enter" && setModal(st) : undefined}>
                <div className="grow"><b className="done-text" style={!edit && done[st.id] ? { color: "var(--faint)" } : null}>{st.title}{st.days && <span className="rep"><Icon n="repeat" s={11} />{daysLabel(st.days)}</span>}</b>
                  <small>{st.dur}{!on ? " · not today" : ""}</small></div>
                {edit ? <span className="edit-hint"><Icon n="pencil" s={16} /></span> : <Swipe on={!!done[st.id]} onToggle={() => toggle(st.id)} label={`Complete ${st.title}`} />}
              </div>
            </div>
          </React.Fragment>; })}
          {!list.length && !edit && <div className="step"><span></span><span></span><p className="muted" style={{ marginLeft: 12, fontSize: 14 }}>Nothing here today.</p></div>}
          {edit && <div className="step"><span></span><span></span>
            <button className="add-step" onClick={() => setModal({ new: true, block: b.id, plan })}><Icon n="plus" s={16} sw={2.2} />Add a step to your {b.title.replace(" Routine", "").toLowerCase()}</button></div>}
        </div>;
      })}
    </div>
    {modal && <StepModal step={modal} plan={plan} onClose={() => setModal(null)} />}
  </div>;
}
function StepModal({ step, onClose, plan = "normal" }) {
  const { steps, setSteps, notify } = useStore();
  const isNew = !!step.new;
  const [f, setF] = useState(() => isNew
    ? { title: "", time: step.block === "morning" ? "07:30" : step.block === "college" ? "13:00" : "18:00", dur: "15 min", block: step.block || "morning", icon: "star", days: step.days || null, plan: step.plan || plan }
    : { ...step });
  const [err, setErr] = useState("");
  const set = (k, v) => { setF(x => ({ ...x, [k]: v })); setErr(""); };
  const toggleDay = d => { const cur = f.days || []; set("days", cur.includes(d) ? cur.filter(x => x !== d) : [...cur, d]); };
  const save = e => {
    e.preventDefault();
    if (!f.title.trim()) return setErr("Give this step a name.");
    if (!f.time) return setErr("Pick a time for this step.");
    if (f.days && !f.days.length) return setErr("Pick at least one day, or switch to Every day.");
    const { new: _n, ...clean } = { ...f, title: f.title.trim() };
    if (isNew) setSteps([...steps, { ...clean, id: uid() }]); else setSteps(steps.map(x => x.id === step.id ? clean : x));
    notify(isNew ? "Step added ♡" : "Step updated"); onClose();
  };
  return <Modal title={isNew ? "New routine step" : "Edit step"} onClose={onClose}>
    <form onSubmit={save} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <label className="field">What is it?<input id="step-title" className="input" value={f.title} onChange={e => set("title", e.target.value)} placeholder="e.g. Take laundry to the dhobi" autoFocus /></label>
      <div className="row2">
        <label className="field">Time<input id="step-time" type="time" className="input" value={f.time} onChange={e => set("time", e.target.value)} /></label>
        <label className="field">How long<input id="step-dur" className="input" value={f.dur} onChange={e => set("dur", e.target.value)} placeholder="20 min" /></label>
      </div>
      <label className="field">Which plan<select id="step-plan" className="input" value={f.plan || "normal"} onChange={e => set("plan", e.target.value)}>{PLANS.map(x => <option key={x.id} value={x.id}>{x.label} only</option>)}<option value="any">Every plan</option></select></label>
      <label className="field">Part of the day<select id="step-block" className="input" value={f.block} onChange={e => set("block", e.target.value)}>{ROUTINE_BLOCKS.map(b => <option key={b.id} value={b.id}>{b.title}</option>)}</select></label>
      <div className="field">How often
        <div className="seg" style={{ alignSelf: "flex-start" }}>
          <button type="button" className={!f.days ? "on" : ""} onClick={() => set("days", null)}>Every day</button>
          <button type="button" className={f.days ? "on" : ""} onClick={() => set("days", f.days || [3, 6])}>Only some days</button>
        </div>
        {f.days && <>
          <div className="daypick">{WEEK_ORDER.map(d => <button type="button" key={d} className={f.days.includes(d) ? "on" : ""} aria-pressed={f.days.includes(d)} onClick={() => toggleDay(d)}>{DAY_SHORT[d]}</button>)}</div>
          <div className="presets">
            <button type="button" className="tool" onClick={() => set("days", [3, 6])}>Twice a week · Wed & Sat</button>
            <button type="button" className="tool" onClick={() => set("days", [1, 2, 3, 4, 5])}>Weekdays</button>
            <button type="button" className="tool" onClick={() => set("days", [0, 6])}>Weekends</button>
            <button type="button" className="tool" onClick={() => set("days", [0])}>Once a week · Sun</button>
          </div>
          <span style={{ fontWeight: 500 }}>{f.days.length ? `Shows up on ${daysLabel(f.days)}.` : "No days picked yet."}</span>
        </>}
      </div>
      <div className="field">Icon<div className="iconpick">{ICON_CHOICES.map(ic => <button type="button" key={ic} className={f.icon === ic ? "on" : ""} onClick={() => set("icon", ic)} aria-label={ic} aria-pressed={f.icon === ic}><Icon n={ic} /></button>)}</div></div>
      {err && <p className="form-err" role="alert">{err}</p>}
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", flexWrap: "wrap" }}>
        {!isNew && <button type="button" className="btn soft" onClick={() => { setSteps(steps.filter(x => x.id !== step.id)); notify("Step removed"); onClose(); }}><Icon n="trash" s={16} />Delete step</button>}
        <button type="submit" className="btn primary"><Icon n="check" s={16} />{isNew ? "Add step" : "Save changes"}</button>
      </div>
    </form>
  </Modal>;
}

/* =============== profile & progress report =============== */
function VBars({ data, max, color, suffix = "" }) {
  return <div className="vbars">{data.map((d, i) => <div key={i} className="vbar">
    <b className="num">{d.value}{suffix}</b>
    <div className="colm"><i style={{ height: `${max ? Math.min(100, d.value / max * 100) : 0}%`, background: color, opacity: i === data.length - 1 ? 1 : 0.55 }}></i></div>
    <small>{d.label}</small>
  </div>)}</div>;
}
function HBar({ label, value, color, marker }) {
  return <div className="hbar"><span title={label}>{label}</span>
    <div className="track"><i style={{ width: `${Math.min(100, value)}%`, background: color }}></i>{marker != null && <em style={{ left: `${marker}%` }}></em>}</div>
    <b className="num">{value}%</b></div>;
}
function ProfilePage() {
  const S2 = useStore();
  const { profile, setProfile, attendance, tasks, units, steps, routineDone, focusLog, txns, journal, notify, go } = useStore();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(profile);
  const [err, setErr] = useState("");
  const fileRef = useRef(null);
  const onPhoto = e => {
    const f = e.target.files[0]; e.target.value = ""; if (!f) return;
    storeImage(f, { max: 400, square: true, inline: true }).then(url => { setProfile(p => ({ ...p, photo: url })); notify("Picture updated ♡"); })
      .catch(() => notify("That file couldn't be read as a picture"));
  };
  const saveProfile = e => {
    e.preventDefault();
    if (!draft.name.trim()) return setErr("Your name can't be empty.");
    setProfile({ ...draft, name: draft.name.trim() }); setEditing(false); notify("Profile saved ♡");
  };
  const field = (k, label, extra = {}) => <label className={`field ${extra.full ? "full" : ""}`}>{label}
    <input id={`prof-${k}`} className="input" type={extra.type || "text"} value={draft[k] || ""} onChange={e => { setDraft({ ...draft, [k]: e.target.value }); setErr(""); }} placeholder={extra.ph || ""} /></label>;

  /* numbers for the report */
  const T = profile.target, today = todayISO(), week = pastDays(7);
  const dayLabel = d => d === today ? "Today" : DAY_SHORT[parseISO(d).getDay()];
  const dayPct = d => {
    const dw = parseISO(d).getDay(), act = steps.filter(x => (!x.days || x.days.includes(dw)) && stepInPlan(x, S2.routinePlan[d] || "normal")), rec = routineDone[d];
    if (rec) return act.length ? act.filter(x => rec[x.id]).length / act.length : 0;
    return ROUTINE_SEED[d] != null ? ROUTINE_SEED[d] : 0;
  };
  const seeded = week.some(d => d !== today && !routineDone[d] && ROUTINE_SEED[d] != null);
  const rSeries = week.map(d => ({ label: dayLabel(d), value: Math.round(dayPct(d) * 100) }));
  const fSeries = week.map(d => ({ label: dayLabel(d), value: focusLog[d] || 0 }));
  const rAvg = Math.round(rSeries.reduce((a, x) => a + x.value, 0) / 7);
  const fTotal = fSeries.reduce((a, x) => a + x.value, 0);
  const mins = profile.focus === "50/10" ? 50 : 25;
  const att = COURSES.map(c => ({ c, ...attendance[c.id] })).filter(x => x.held > 0).sort((x, y) => y.pct - x.pct);
  const avgAtt = att.length ? Math.round(att.reduce((a, x) => a + x.pct, 0) / att.length) : 0;
  const low = att.filter(x => x.att / x.held < T / 100);
  const syl = COURSES.map(c => ({ c, pct: (UNITS[c.id] || []).length ? Math.round(UNITS[c.id].filter((_, i) => units[`${c.id}-${i}`]).length / UNITS[c.id].length * 100) : 0 }));
  const uTotal = Object.values(UNITS).reduce((a, u) => a + u.length, 0), uDone = COURSES.reduce((a, c) => a + (UNITS[c.id] || []).filter((_, i) => units[`${c.id}-${i}`]).length, 0);
  const behind = [...syl].sort((x, y) => x.pct - y.pct)[0];
  const tDone = tasks.filter(t => t.done).length, overdue = tasks.filter(t => !t.done && daysUntil(t.due) < 0).length;
  const month = today.slice(0, 7), mt = txns.filter(t => t.date.slice(0, 7) === month), spent = mt.reduce((a, t) => a + t.amt, 0);
  const byCat = CATS.map(c => ({ ...c, amt: mt.filter(t => t.cat === c.id).reduce((a, t) => a + t.amt, 0) })).sort((x, y) => y.amt - x.amt);
  const jMonth = journal.filter(j => j.date.slice(0, 7) === month);
  const moods = MOODS.map(m => ({ ...m, n: jMonth.filter(j => j.mood === m.id).length })).filter(m => m.n);
  const nextExam = EXAMS.slice().sort((a, b) => a.date.localeCompare(b.date)).find(x => daysUntil(x.date) >= 0);
  const need = x => Math.ceil((T / 100 * x.held - x.att) / (1 - T / 100));
  const notes = [
    att.length ? `${att[0].c.short} has your best attendance at ${att[0].pct}%.` : `Add your subjects in Setup to see attendance here.`,
    low.length ? low.map(x => `${x.c.short} is at ${x.pct}%, so attend the next ${need(x)} classes to get back to ${T}%.`).join(" ") : `Every subject is at or above your ${T}% target.`,
    behind ? `${behind.c.short} has the most syllabus left, with ${behind.pct}% covered${nextExam ? ` and exams starting in ${daysUntil(nextExam.date)} days` : ""}.` : "",
    `You kept ${rAvg}% of your routine over the last 7 days and finished ${fTotal} focus sessions.`,
    spent <= profile.budget ? `${rupee(profile.budget - spent)} of pocket money is left this month, and ${byCat[0].id.toLowerCase()} is the biggest spend.` : `You're ${rupee(spent - profile.budget)} over this month's budget.`,
  ];
  return <div className="page">
    <section className="card prof-hero">
      <div className="big-av">
        <Avatar cls="big" />
        <button className="cam" onClick={() => fileRef.current.click()} aria-label={profile.photo ? "Change picture" : "Add picture"}><Icon n="camera" s={18} /></button>
        <input ref={fileRef} id="profile-photo" type="file" accept="image/*" hidden onChange={onPhoto} />
      </div>
      <div className="prof-main">
        {!editing ? <>
          <p className="eyebrow">Your profile</p>
          <h1>{profile.name}</h1>
          {profile.tagline && <p className="quote">“{profile.tagline}”</p>}
          <div className="prof-chips">
            {profile.programme && <span><Icon n="cap" s={15} />{profile.programme}</span>}
            {profile.year && <span><Icon n="calendar" s={15} />{profile.year}</span>}
            {profile.college && <span><Icon n="pin" s={15} />{profile.college}</span>}
            {profile.hostel && <span><Icon n="home" s={15} />{profile.hostel}</span>}
            {profile.birthday && <span><Icon n="gift" s={15} />Birthday {parseISO(profile.birthday).toLocaleDateString("en-IN", { day: "numeric", month: "long" })}</span>}
          </div>
          <div className="prof-actions">
            <button className="btn primary" onClick={() => { setDraft(profile); setEditing(true); }}><Icon n="pencil" s={16} />Edit profile</button>
            <button className="btn soft" onClick={() => fileRef.current.click()}><Icon n="camera" s={16} />{profile.photo ? "Change picture" : "Add picture"}</button>
            {profile.photo && <button className="btn soft" onClick={() => { setProfile(p => ({ ...p, photo: "" })); notify("Picture removed"); }}><Icon n="trash" s={16} />Remove picture</button>}
          </div>
        </> : <form className="prof-form" onSubmit={saveProfile}>
          <h2 className="full">Edit profile</h2>
          {field("name", "Name")}
          {field("birthday", "Birthday", { type: "date" })}
          {field("tagline", "A line about you", { full: true, ph: "Learning to code, one cup at a time" })}
          {field("programme", "Programme")}
          {field("year", "Year / semester")}
          {field("college", "College")}
          {field("hostel", "Hostel & room")}
          {err && <p className="form-err full" role="alert">{err}</p>}
          <div className="full" style={{ display: "flex", gap: 10, justifyContent: "flex-end", flexWrap: "wrap" }}>
            <button type="button" className="btn soft" onClick={() => { setEditing(false); setErr(""); }}>Cancel</button>
            <button type="submit" className="btn primary"><Icon n="check" s={16} />Save profile</button>
          </div>
        </form>}
      </div>
    </section>

    <div className="page-head"><div><p className="eyebrow">{fmtDay(week[0])} – {fmtDay(week[6])}</p><h1 style={{ fontSize: 30 }}>Progress report</h1><p>How the last seven days went, measured gently.</p></div></div>
    <div className="kpis">
      <div className="kpi"><small>Average attendance</small><b className="num">{avgAtt}%</b><em className={low.length ? "warn" : ""}>{low.length ? `${low.length} below ${T}%` : `all above ${T}%`}</em></div>
      <div className="kpi"><small>Syllabus covered</small><b className="num">{Math.round(uDone / uTotal * 100)}%</b><em>{uDone} of {uTotal} units</em></div>
      <div className="kpi"><small>Tasks done</small><b className="num">{tDone}/{tasks.length}</b><em className={overdue ? "warn" : ""}>{overdue ? `${overdue} overdue` : "nothing overdue"}</em></div>
      <div className="kpi"><small>Focus, last 7 days</small><b className="num">{fTotal}</b><em>sessions · about {Math.round(fTotal * mins / 60 * 2) / 2} hrs</em></div>
      <div className="kpi"><small>Routine kept</small><b className="num">{rAvg}%</b><em>7-day average</em></div>
    </div>
    <section className="card summary">
      <div className="card-h"><Icon n="heart" style={{ color: "var(--pink-3)" }} /><h2 className="grow">This week in a few lines</h2></div>
      <ul>{notes.map((t, i) => <li key={i}>{t}</li>)}</ul>
    </section>
    <div className="report">
      <section className="card">
        <div className="card-h"><Icon n="sun" style={{ color: "var(--pink-3)" }} /><h2 className="grow">Routine consistency</h2><button className="btn soft" style={{ height: 32, padding: "0 12px", fontSize: 13 }} onClick={() => go("routines")}>Routines</button></div>
        <VBars data={rSeries} max={100} suffix="%" color="var(--pink-3)" />
        {seeded && <p className="caption">Earlier days show example numbers until you've used the planner for a full week.</p>}
      </section>
      <section className="card">
        <div className="card-h"><Icon n="coffee" style={{ color: "var(--sage-3)" }} /><h2 className="grow">Focus sessions</h2></div>
        <VBars data={fSeries} max={Math.max(4, ...fSeries.map(x => x.value))} color="var(--sage-3)" />
        <p className="caption">Each session is {mins} minutes of focus.</p>
      </section>
      <section className="card">
        <div className="card-h"><Icon n="check" style={{ color: "var(--sage-3)" }} /><h2 className="grow">Attendance by subject</h2><span className="muted" style={{ fontSize: 12.5 }}>line = {T}% target</span></div>
        {att.map(x => <HBar key={x.c.id} label={x.c.short} value={x.pct} color={x.att / x.held < T / 100 ? "var(--warn)" : x.c.color} marker={T} />)}
      </section>
      <section className="card">
        <div className="card-h"><Icon n="book" style={{ color: "var(--mocha)" }} /><h2 className="grow">Syllabus by subject</h2><button className="btn soft" style={{ height: 32, padding: "0 12px", fontSize: 13 }} onClick={() => go("academics")}>Academics</button></div>
        {syl.map(x => <HBar key={x.c.id} label={x.c.short} value={x.pct} color={x.c.color} />)}
      </section>
      <section className="card">
        <div className="card-h"><Icon n="wallet" style={{ color: "var(--mocha)" }} /><h2 className="grow">Money this month</h2></div>
        <HBar label="Budget used" value={Math.round(spent / profile.budget * 100)} color={spent > profile.budget ? "#C4827A" : "#A27B62"} />
        <div style={{ marginTop: 8 }}>{byCat.map(c => <HBar key={c.id} label={c.id} value={spent ? Math.round(c.amt / spent * 100) : 0} color={c.color} />)}</div>
        <p className="caption">{rupee(spent)} spent of {rupee(profile.budget)}.</p>
      </section>
      <section className="card">
        <div className="card-h"><Icon n="pen" style={{ color: "var(--pink-3)" }} /><h2 className="grow">Journal</h2><button className="btn soft" style={{ height: 32, padding: "0 12px", fontSize: 13 }} onClick={() => go("journal")}>Write</button></div>
        <p style={{ fontFamily: "var(--display)", fontSize: 30, lineHeight: 1.2 }} className="num">{jMonth.length} <span className="muted" style={{ fontFamily: "var(--body)", fontSize: 14 }}>{jMonth.length === 1 ? "page" : "pages"} written this month</span></p>
        {moods.length ? <div className="mood-row">{moods.map(m => <span key={m.id} className="mood"><i style={{ background: m.color }}></i>{m.id} · {m.n}</span>)}</div>
          : <p className="caption">Add a mood to an entry to see how your month has felt.</p>}
      </section>
      <section className="card">
        <div className="card-h"><Icon n="code" style={{ color: "var(--sage-3)" }} /><h2 className="grow">Coding & sleep</h2></div>
        {(() => { const probs = (S2.code.problems || []); const wk = probs.filter(p => week.includes(p.date)).length; const st = codeStreak(probs);
          const sl = week.map(d => sleepHours(S2.sleepLog[d])).filter(h => h > 0); const avg = sl.length ? sl.reduce((a, b) => a + b, 0) / sl.length : 0;
          const g = semesterGPA({ ...DEFAULT_GRADES, ...S2.grades }); const cg = cgpaOf({ ...DEFAULT_GRADES, ...S2.grades }, g);
          return <div className="list-gap">
            <div className="check-row" style={{ justifyContent: "space-between" }}><span>Problems solved this week</span><b className="num">{wk}</b></div>
            <div className="check-row" style={{ justifyContent: "space-between" }}><span>Coding streak</span><b className="num">{st.cur} days</b></div>
            <div className="check-row" style={{ justifyContent: "space-between" }}><span>Average sleep</span><b className="num">{avg ? fmtHrs(avg) : "not logged"}</b></div>
            <div className="check-row" style={{ justifyContent: "space-between" }}><span>Projected SGPA · CGPA</span><b className="num">{g.sgpa != null ? g.sgpa.toFixed(2) : "—"} · {cg != null ? cg.toFixed(2) : "—"}</b></div>
          </div>; })()}
      </section>
    </div>
    <Reflection />
  </div>;
}

/* =============== page 4: academics =============== */
function AcademicsPage() {
  const { attendance, profile, tasks, setTasks, units, setUnits, notebooks, setNotebook } = useStore();
  const T = profile.target / 100;
  const rows = [
    ...EXAMS.filter(x => daysUntil(x.date) >= 0).map(x => ({ ...x, what: x.kind })),
    ...tasks.filter(t => t.type === "deadline" && !t.done && daysUntil(t.due) >= 0).map(t => ({ id: t.id, title: t.title, course: t.course, date: t.due, time: "11:59 pm", venue: "Submit to faculty", what: "Assignment" })),
  ].sort((a, b) => a.date.localeCompare(b.date));
  return <div className="page">
    <div className="page-head"><div><p className="eyebrow">Odd semester · 2026</p><h1>Academics hub</h1><p>Attendance, the T1 datesheet and every subject's syllabus in one place.</p></div></div>
    <section className="card">
      <div className="card-h"><Icon n="check" style={{ color: "var(--sage-3)" }} /><h2 className="grow">Attendance guard</h2><span className="muted" style={{ fontSize: 13 }}>Your target: {profile.target}%</span></div>
      <div className="rings">{COURSES.map(c => {
        const a = attendance[c.id]; const ok = !a.held || a.att / a.held >= T;
        const bunk = Math.floor(a.att / T - a.held); const need = Math.ceil((T * a.held - a.att) / (1 - T));
        return <div key={c.id} className="ring">
          <Ring pct={a.pct} color={c.color} track={c.soft}><text x="54" y="58" textAnchor="middle" fontSize="21" fontWeight="600" style={{ fill: "var(--coffee)" }} fontFamily="Fraunces, Georgia, serif">{a.held ? a.pct + "%" : "—"}</text><text x="54" y="74" textAnchor="middle" fontSize="10" style={{ fill: "var(--muted)" }} fontFamily="Nunito">{a.att}/{a.held}</text></Ring>
          <b>{c.short}</b>
          <span className={`urg ${ok ? "calm" : "hot"}`}>{!a.held ? "No classes yet" : ok ? (bunk > 0 ? `Can miss ${bunk}` : "Right on target") : `Attend next ${need}`}</span>
        </div>;
      })}</div>
    </section>
    <section className="card">
      <div className="card-h"><Icon n="cap" style={{ color: "var(--mocha)" }} /><h2 className="grow">Datesheet & deadlines</h2><span className="muted" style={{ fontSize: 13 }}>Sorted by urgency</span></div>
      <div className="table-wrap"><table>
        <thead><tr><th>What</th><th>Subject</th><th>Date</th><th>Time & venue</th><th>Status</th></tr></thead>
        <tbody>{rows.map(r => { const u = relDays(r.date); return <tr key={r.id} className={u.cls === "hot" ? "hot" : ""}>
          <td><b style={{ fontWeight: 700 }}>{r.title}</b><div className="muted" style={{ fontSize: 12.5 }}>{r.what}</div></td>
          <td><Tag course={r.course} /></td>
          <td className="num" style={{ whiteSpace: "nowrap" }}>{parseISO(r.date).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}</td>
          <td className="muted">{r.time} · {r.venue}</td>
          <td><span className={`urg ${u.cls}`}>{u.text}</span></td></tr>; })}</tbody>
      </table></div>
    </section>
    <div>
      <div className="card-h"><h2 className="grow">Subject hubs</h2></div>
      <div className="hubs">{COURSES.map(c => {
        const us = UNITS[c.id] || []; const dn = us.filter((_, i) => units[`${c.id}-${i}`]).length;
        const todos = tasks.filter(t => t.course === c.id && !t.done).slice(0, 3);
        const nbs = notebooks.filter(n => n.course === c.id);
        return <section key={c.id} className="card hub">
          <div className="hub-h"><span className="ini" style={{ background: c.soft, color: c.color }}>{c.short[0]}</span>
            <div style={{ minWidth: 0 }}><h3>{c.name}</h3><small>{c.prof}</small></div></div>
          <div>
            <div className="sub"><span>Syllabus</span><span className="num">{dn}/{us.length} units</span></div>
            <div className="mini-bar"><i style={{ width: `${dn / us.length * 100}%`, background: c.color }}></i></div>
            {us.map((u, i) => { const k = `${c.id}-${i}`; return <div key={k} className={`unit ${units[k] ? "is-done" : ""}`}>
              <Check on={units[k]} label={`Unit ${i + 1} ${u}`} onChange={() => setUnits({ ...units, [k]: !units[k] })} />
              <span className="done-text"><span className="muted">Unit {i + 1} · </span>{u}</span></div>; })}
          </div>
          <div>
            <div className="sub"><span>To-dos</span></div>
            {todos.length ? todos.map(t => <div key={t.id} className="unit"><Check round on={false} label={`Complete ${t.title}`} onChange={() => setTasks(tasks.map(x => x.id === t.id ? { ...x, done: true } : x))} /><span style={{ flex: 1 }}>{t.title}</span><span className={`urg ${relDays(t.due).cls}`}>{fmtDay(t.due)}</span></div>)
              : <p className="muted" style={{ fontSize: 14 }}>Nothing pending here ♡</p>}
          </div>
          <div>
            <div className="sub"><span>Notebooks</span></div>
            {nbs.length > 0 && <div className="nb-list">{nbs.map(n => <button key={n.id} className="nb" onClick={() => setNotebook(n)}><Icon n="note" s={14} />{n.title}</button>)}</div>}
            <button className="create-nb" onClick={() => setNotebook({ id: null, course: c.id, title: "", body: "" })}><span><Icon n="plus" s={16} sw={2.2} /></span>Create New Notebook</button>
          </div>
        </section>;
      })}</div>
    </div>
  </div>;
}
function NotebookModal({ nb, onClose }) {
  const { notebooks, setNotebooks, notify } = useStore();
  const [t, setT] = useState(nb.title); const [b, setB] = useState(nb.body);
  const c = courseById(nb.course);
  const save = () => {
    const title = t.trim() || "Untitled notes";
    if (nb.id) setNotebooks(notebooks.map(n => n.id === nb.id ? { ...n, title, body: b } : n));
    else setNotebooks([...notebooks, { id: uid(), course: nb.course, title, body: b }]);
    notify("Notebook saved ♡"); onClose();
  };
  return <Modal title={nb.id ? "Notebook" : "New notebook"} onClose={onClose} wide>
    <div style={{ display: "flex", gap: 10, alignItems: "center" }}><Tag course={nb.course} /><span className="muted" style={{ fontSize: 13 }}>{c.name}</span></div>
    <input id="nb-title" className="input" placeholder="Give it a name…" value={t} onChange={e => setT(e.target.value)} style={{ fontFamily: "var(--display)", fontSize: 19, height: 50 }} aria-label="Notebook title" />
    <textarea id="nb-body" className="nb-paper" value={b} onChange={e => setB(e.target.value)} placeholder="Start typing your notes…" aria-label="Notes" style={{ outline: "none", resize: "vertical", width: "100%" }} />
    <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
      {nb.id && <button className="btn soft" onClick={() => { setNotebooks(notebooks.filter(n => n.id !== nb.id)); onClose(); }}><Icon n="trash" s={16} />Delete</button>}
      <button className="btn primary" onClick={save}><Icon n="check" s={16} />Save notebook</button>
    </div>
  </Modal>;
}

/* =============== page 5: finance =============== */
function FinancePage() {
  const { txns, setTxns, profile, setProfile, setQuick } = useStore();
  const [cat, setCat] = useState(null);
  const month = todayISO().slice(0, 7);
  const mt = txns.filter(t => t.date.slice(0, 7) === month);
  const by = Object.fromEntries(CATS.map(c => [c.id, mt.filter(t => t.cat === c.id).reduce((a, t) => a + t.amt, 0)]));
  const spent = Object.values(by).reduce((a, b) => a + b, 0);
  const budget = profile.budget, left = budget - spent;
  const now = new Date(); const daysLeft = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate() - now.getDate() + 1;
  const R = 112, SW = 26, C = 2 * Math.PI * R, scale = Math.max(budget, spent), gap = 5;
  let off = 0;
  const segs = CATS.map(c => { const len = by[c.id] / scale * C; const s = { c, len, off }; off += len; return s; });
  const pos = [{ left: "2%", top: "4%" }, { right: "2%", top: "4%" }, { right: "2%", bottom: "2%" }, { left: "2%", bottom: "2%" }, { left: "calc(50% - 28px)", bottom: "-4%" }];
  const list = (cat ? txns.filter(t => t.cat === cat) : txns).slice().sort((a, b) => b.date.localeCompare(a.date));
  return <div className="page">
    <div className="page-head"><div><p className="eyebrow">{now.toLocaleDateString("en-IN", { month: "long", year: "numeric" })}</p><h1>Finance</h1><p>Pocket money, kept kind. Tap a category to see where it went.</p></div></div>
    <div className="fin">
      <section className="card">
        <div className="donut">
          <svg viewBox="0 0 300 300" role="img" aria-label={`${rupee(left)} left of ${rupee(budget)}`}>
            <circle cx="150" cy="150" r={R} fill="none" style={{ stroke: "var(--latte-2)" }} strokeWidth={SW} />
            {segs.map(({ c, len, off }) => len > 0 && <circle key={c.id} cx="150" cy="150" r={R} fill="none" stroke={c.color} strokeWidth={SW} strokeLinecap="round"
              strokeDasharray={`${Math.max(len - gap - SW * 0.0, 0.1)} ${C}`} strokeDashoffset={-off - gap / 2} transform="rotate(-90 150 150)"
              opacity={cat && cat !== c.id ? 0.3 : 1} style={{ transition: "opacity .3s" }} />)}
          </svg>
          <div className="center"><div><small>{left >= 0 ? "left to spend" : "over budget"}</small><b className="num">{rupee(Math.abs(left))}</b><small>of {rupee(budget)}</small></div></div>
          {CATS.map((c, i) => <button key={c.id} className={`bub ${cat === c.id ? "on" : ""}`} style={{ ...pos[i], color: c.color }} onClick={() => setCat(cat === c.id ? null : c.id)} aria-pressed={cat === c.id}>
            <span className="b" style={{ background: c.soft }}><Icon n={c.icon} s={22} /></span><small>{c.id}</small><em className="num">{rupee(by[c.id])}</em></button>)}
        </div>
      </section>
      <section className="card">
        <div className="stats">
          <div className="stat"><small>Spent</small><b className="num">{rupee(spent)}</b></div>
          <div className="stat"><small>Days left</small><b className="num">{daysLeft}</b></div>
          <div className="stat"><small>Per day</small><b className="num">{rupee(Math.max(0, left) / daysLeft)}</b></div>
        </div>
        <div className="stat" style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 150 }}><small>Cash in hand · for off-campus</small><b className="num">{rupee(+profile.cash || 0)}</b></div>
          <input className="input mini num" style={{ width: 110 }} type="number" min="0" value={profile.cash ?? 0} aria-label="Cash in hand" onChange={e => setProfile({ ...profile, cash: Math.max(0, +e.target.value || 0) })} />
        </div>
        <div className="cat-bars">{CATS.map(c => <div key={c.id} className="cat-bar">
          <span style={{ color: c.color }}><Icon n={c.icon} /></span>
          <div><div style={{ display: "flex", justifyContent: "space-between" }}><b style={{ fontWeight: 600 }}>{c.id}</b><span className="muted num">{spent ? Math.round(by[c.id] / spent * 100) : 0}%</span></div>
            <div className="mini-bar"><i style={{ width: `${spent ? by[c.id] / spent * 100 : 0}%`, background: c.color }}></i></div></div>
          <b className="num" style={{ fontWeight: 700 }}>{rupee(by[c.id])}</b></div>)}</div>
        <button className="btn primary add-exp" onClick={() => setQuick("expense")}><Icon n="plus" s={18} sw={2.2} />Add Expense</button>
      </section>
    </div>
    <section className="card">
      <div className="card-h" style={{ flexWrap: "wrap" }}><h2 className="grow">Recent expenses</h2>
        {cat && <button className="btn soft" style={{ height: 34, padding: "0 14px" }} onClick={() => setCat(null)}>{cat} <Icon n="x" s={14} /></button>}</div>
      <div>{list.map(t => { const c = catById(t.cat); return <div key={t.id} className="txn">
        <span className="ic" style={{ background: c.soft, color: c.color }}><Icon n={c.icon} /></span>
        <div className="grow"><b>{t.note}</b><span className="muted" style={{ fontSize: 13 }}>{c.id} · {fmtDay(t.date)}</span></div>
        <span className="amt num">−{rupee(t.amt)}</span>
        <button className="icon-btn" aria-label={`Delete ${t.note}`} onClick={() => setTxns(txns.filter(x => x.id !== t.id))}><Icon n="trash" s={16} /></button>
      </div>; })}
        {!list.length && <div className="empty">No expenses here yet.</div>}</div>
    </section>
  </div>;
}

/* =============== page 6: journal =============== */
function JournalPage() {
  const { journal, setJournal, dumps, setDumps, notify } = useStore();
  const [text, setText] = usePersist("draft", "");
  const [mood, setMood] = useState(null);
  const [showMood, setShowMood] = useState(false);
  const [img, setImg] = useState(null);
  const [files, setFiles] = useState([]);
  const [view, setView] = useState("all");
  const [dump, setDump] = useState("");
  const imgRef = useRef(null), fileRef = useRef(null);
  const onImg = async e => { const f = e.target.files[0]; e.target.value = ""; if (!f) return; try { setImg(await storeImage(f, { max: 1200 })); } catch (err) { notify("That file couldn't be read as a picture"); } };
  const onFile = e => { setFiles([...files, ...Array.from(e.target.files).map(f => f.name)]); e.target.value = ""; };
  const keep = () => {
    setJournal([{ id: uid(), date: todayISO(), mood, text: text.trim(), img, files }, ...journal]);
    setText(""); setMood(null); setImg(null); setFiles([]); setShowMood(false); notify("Tucked into your journal ♡");
  };
  const addDump = e => { e.preventDefault(); if (!dump.trim()) return; setDumps([{ id: uid(), text: dump.trim(), tone: ["pink", "sage", "latte"][dumps.length % 3], date: todayISO() }, ...dumps]); setDump(""); };
  const tones = { pink: "var(--pink-2)", sage: "var(--sage-2)", latte: "var(--latte-2)" };
  const rot = [-2, 1.6, -1, 2.2, -1.6, 1];
  const items = [
    ...(view !== "dump" ? journal.map(j => ({ ...j, k: "entry" })) : []),
    ...(view !== "entries" ? dumps.map(d => ({ ...d, k: "dump" })) : []),
  ].sort((a, b) => b.date.localeCompare(a.date));
  const moodColor = m => (MOODS.find(x => x.id === m) || {}).color || "var(--latte)";
  return <div className="page">
    <div className="page-head"><div><p className="eyebrow">{fmtLong(todayISO())}</p><h1>Journal & brain dump</h1><p>No prompts, no streaks. A soft place to put things down.</p></div></div>
    <section className="entry">
      <textarea id="journal-text" value={text} onChange={e => setText(e.target.value)} placeholder="Write if you feel like it..." aria-label="Journal entry" />
      {(img || files.length > 0) && <div className="attach">
        {img && <Img src={img} alt="Attached" />}
        {files.map((f, i) => <span key={i} className="file-chip"><Icon n="clip" s={13} />{f}</span>)}</div>}
      {showMood && <div className="moods">{MOODS.map(m => <button key={m.id} className={`mood ${mood === m.id ? "on" : ""}`} onClick={() => { setMood(mood === m.id ? null : m.id); setShowMood(false); }}><i style={{ background: m.color }}></i>{m.id}</button>)}</div>}
      <div className="entry-tools">
        <input ref={imgRef} type="file" accept="image/*" hidden onChange={onImg} id="journal-img" />
        <input ref={fileRef} type="file" multiple hidden onChange={onFile} id="journal-file" />
        <button className={`tool ${img ? "set" : ""}`} onClick={() => imgRef.current.click()}><Icon n="image" s={16} />Attach Image</button>
        <button className={`tool ${files.length ? "set" : ""}`} onClick={() => fileRef.current.click()}><Icon n="clip" s={16} />Add File</button>
        <button className={`tool ${mood ? "set" : ""}`} onClick={() => setShowMood(!showMood)} aria-expanded={showMood}>
          {mood ? <i style={{ width: 10, height: 10, borderRadius: "50%", background: moodColor(mood), display: "inline-block" }}></i> : <Icon n="smile" s={16} />}{mood ? `Feeling ${mood}` : "Add Mood"}</button>
        <span className="spacer"></span>
        <button className="btn primary" disabled={!text.trim() && !img} onClick={keep}><Icon n="heart" s={16} />Keep this page</button>
      </div>
    </section>
    <div className="page-head" style={{ alignItems: "center" }}>
      <div><h2>The archive</h2></div>
      <form className="dump-add" onSubmit={addDump}><input id="dump-input" className="input" style={{ borderRadius: 999 }} placeholder="Drop a random thought…" value={dump} onChange={e => setDump(e.target.value)} aria-label="Brain dump" /><button className="btn pink" type="submit" style={{ height: 44 }}><Icon n="plus" s={16} />Dump</button></form>
      <div className="seg">{[["all", "All"], ["entries", "Entries"], ["dump", "Brain dump"]].map(([k, l]) => <button key={k} className={view === k ? "on" : ""} onClick={() => setView(k)}>{l}</button>)}</div>
    </div>
    <div className="archive">{items.map((it, i) => {
      const del = <button className="icon-btn x" aria-label="Delete" onClick={() => it.k === "entry" ? setJournal(journal.filter(j => j.id !== it.id)) : setDumps(dumps.filter(d => d.id !== it.id))}><Icon n="x" s={15} /></button>;
      if (it.k === "dump") return <div key={it.id} className="arch-item" style={{ transform: `rotate(${rot[i % 6]}deg)` }}>{del}
        <div className="sticky" style={{ background: tones[it.tone] }}><p>{it.text}</p><small>Brain dump · {fmtDay(it.date)}</small></div></div>;
      if (it.img || it.scene) return <div key={it.id} className="arch-item" style={{ transform: `rotate(${rot[i % 6]}deg)` }}>{del}
        <div className="polaroid"><div className="ph">{it.img ? <Img src={it.img} alt="" /> : <Scene kind={it.scene} />}</div>
          <p className="cap">{it.text.length > 110 ? it.text.slice(0, 110) + "…" : it.text}</p>
          <div className="foot"><span>{fmtLong(it.date)}</span>{it.mood && <span className="tag" style={{ background: "var(--bg)", color: "var(--coffee)" }}><i style={{ background: moodColor(it.mood) }}></i>{it.mood}</span>}</div></div></div>;
      return <div key={it.id} className="arch-item">{del}
        <div className="notecard"><div className="foot" style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 12, color: "var(--muted)" }}>
          <span>{fmtLong(it.date)}</span>{it.mood && <span className="tag" style={{ background: "var(--bg)", color: "var(--coffee)" }}><i style={{ background: moodColor(it.mood) }}></i>{it.mood}</span>}</div>
          <p>{it.text}</p>{it.files && it.files.length > 0 && <div className="attach">{it.files.map((f, j) => <span key={j} className="file-chip"><Icon n="clip" s={13} />{f}</span>)}</div>}</div></div>;
    })}</div>
  </div>;
}

/* =============== mood mix (Spotify Web API, straight from your browser) =============== */
const SP = (() => {
  const KEY = "latte:spotify", VER = "latte:sp-verifier", STATE = "latte:sp-state";
  const clientId = CFG.spotifyClientId || "";
  const redirect = () => location.origin + location.pathname;
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; } };
  const save = t => { try { t ? localStorage.setItem(KEY, JSON.stringify(t)) : localStorage.removeItem(KEY); } catch (e) {} };
  const rand = n => { const a = new Uint8Array(n); crypto.getRandomValues(a); return Array.from(a, x => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"[x % 62]).join(""); };
  const b64url = buf => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  const tokenReq = async body => {
    const r = await fetch("https://accounts.spotify.com/api/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(body) });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(j.error_description || j.error || "Spotify sign-in failed");
    const old = load() || {};
    const t = { access: j.access_token, refresh: j.refresh_token || old.refresh, exp: Date.now() + (j.expires_in || 3600) * 1000 };
    save(t); return t;
  };
  return {
    enabled: !!clientId,
    connected: () => !!(load() && load().refresh),
    async login() {
      const verifier = rand(64), state = rand(16);
      localStorage.setItem(VER, verifier); localStorage.setItem(STATE, state);
      const challenge = b64url(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier)));
      const q = new URLSearchParams({ client_id: clientId, response_type: "code", redirect_uri: redirect(), code_challenge_method: "S256", code_challenge: challenge, state,
        scope: "playlist-modify-private playlist-modify-public user-library-modify" });
      location.href = "https://accounts.spotify.com/authorize?" + q;
    },
    async handleRedirect() {
      const q = new URLSearchParams(location.search);
      if (!q.get("code") && !q.get("error")) return false;
      const ok = q.get("state") && q.get("state") === localStorage.getItem(STATE);
      try { if (ok && q.get("code")) await tokenReq({ grant_type: "authorization_code", code: q.get("code"), redirect_uri: redirect(), client_id: clientId, code_verifier: localStorage.getItem(VER) || "" }); }
      finally { history.replaceState(null, "", redirect() + "#music"); localStorage.removeItem(VER); localStorage.removeItem(STATE); }
      return true;
    },
    logout() { save(null); },
    async api(path, opts = {}, retry = true) {
      let t = load(); if (!t) throw new Error("Connect Spotify first.");
      if (!t.access || t.exp < Date.now() + 60000) t = await tokenReq({ grant_type: "refresh_token", refresh_token: t.refresh, client_id: clientId });
      const r = await fetch("https://api.spotify.com/v1" + path, { ...opts, headers: { Authorization: "Bearer " + t.access, "Content-Type": "application/json", ...(opts.headers || {}) } });
      if (r.status === 401 && retry) { save({ ...t, exp: 0 }); return this.api(path, opts, false); }
      if (r.status === 204) return null;
      const j = await r.json().catch(() => null);
      if (!r.ok) throw new Error((j && j.error && j.error.message) || `Spotify said ${r.status}`);
      return j;
    },
  };
})();
const MOOD_WORDS = { calm: "calm acoustic chill", happy: "happy feel good", cozy: "cozy acoustic warm", focused: "study focus", proud: "motivational anthem", tired: "soft mellow", anxious: "soothing peaceful", homesick: "nostalgic home" };
const LANG_WORDS = { Hindi: "hindi", English: "", Punjabi: "punjabi", "Lo-fi": "lofi", Instrumental: "instrumental", "K-pop": "k-pop" };
function MusicPage() {
  const { notify } = useStore();
  const [mood, setMood] = useState("cozy");
  const [langs, setLangs] = useState(["Hindi"]);
  const [extra, setExtra] = useState("");
  const [busy, setBusy] = useState("");
  const [err, setErr] = useState("");
  const [res, setRes] = useState(null);
  const [saved, setSaved] = useState({});
  const [made, setMade] = usePersist("madePlaylists", []);
  const [conn, setConn] = useState(SP.connected());
  const query = () => [MOOD_WORDS[mood] || mood, ...langs.map(l => LANG_WORDS[l]).filter(Boolean), extra.trim().slice(0, 60)].filter(Boolean).join(" ");
  const find = async () => {
    setErr(""); setBusy("search");
    try {
      const q = query();
      const j = await SP.api(`/search?type=track,playlist&limit=20&market=IN&q=${encodeURIComponent(q)}`);
      const tracks = ((j && j.tracks && j.tracks.items) || []).filter(Boolean).map(t => ({ id: t.id, uri: t.uri, name: t.name, by: (t.artists || []).map(a => a.name).join(", "), img: t.album && t.album.images && (t.album.images[2] || t.album.images[0] || {}).url, url: t.external_urls && t.external_urls.spotify }));
      const lists = ((j && j.playlists && j.playlists.items) || []).filter(Boolean).slice(0, 4).map(p => ({ id: p.id, name: p.name, by: p.owner && p.owner.display_name, img: p.images && p.images[0] && p.images[0].url, url: p.external_urls && p.external_urls.spotify }));
      setRes({ q, tracks, lists });
      if (!tracks.length) setErr("Spotify didn't find songs for that. Try different words.");
    } catch (e) { setErr(e.message); }
    finally { setBusy(""); }
  };
  const makePlaylist = async e => {
    if (!res || !res.tracks.length) return;
    setErr(""); setBusy("make"); const el = e.currentTarget;
    try {
      const me = await SP.api("/me");
      const name = `${mood[0].toUpperCase() + mood.slice(1)} mix · ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short" })}`;
      const pl = await SP.api(`/users/${encodeURIComponent(me.id)}/playlists`, { method: "POST", body: JSON.stringify({ name, public: false, description: `Made with LattePlanner for a ${mood} moment` }) });
      await SP.api(`/playlists/${pl.id}/tracks`, { method: "POST", body: JSON.stringify({ uris: res.tracks.map(t => t.uri).slice(0, 30) }) });
      setMade([{ id: pl.id, mood, name, url: pl.external_urls && pl.external_urls.spotify, at: Date.now() }, ...made].slice(0, 20));
      celebrate(el); notify("Playlist saved to your Spotify ♡");
    } catch (e2) { setErr(e2.message); }
    finally { setBusy(""); }
  };
  const save = async (t, el) => {
    try { await SP.api(`/me/tracks?ids=${t.id}`, { method: "PUT" }); setSaved(s => ({ ...s, [t.id]: true })); celebrate(el); notify("Saved to your Liked Songs"); }
    catch (e) { setErr(e.message); }
  };
  const toggleLang = l => setLangs(langs.includes(l) ? langs.filter(x => x !== l) : [...langs, l]);
  const starter = FALLBACK_MIXES[mood] || FALLBACK_MIXES.cozy;
  return <div className="page">
    <div className="page-head"><div><p className="eyebrow">Music for how you feel</p><h1>Mood mix</h1><p>Pick a mood and Spotify finds songs for it. Save the ones you like, or turn the whole mix into a playlist in your account.</p></div></div>
    <div className="mix-wrap">
      <div className="col">
        <section className="card">
          <div className="field" style={{ marginBottom: 16 }}>How are you feeling?
            <div className="mood-pick">{MIX_MOODS.map(m => <button key={m.id} className={mood === m.id ? "on" : ""} aria-pressed={mood === m.id} onClick={() => setMood(m.id)}><i style={{ background: m.color }}></i>{m.id}</button>)}</div></div>
          <div className="field" style={{ marginBottom: 16 }}>Languages & styles
            <div className="mood-pick">{Object.keys(LANG_WORDS).map(l => <button key={l} className={langs.includes(l) ? "on" : ""} aria-pressed={langs.includes(l)} onClick={() => toggleLang(l)}>{l}</button>)}</div></div>
          <label className="field" style={{ marginBottom: 16 }}>A few extra words (optional)
            <input id="mix-extra" className="input" value={extra} onChange={e => setExtra(e.target.value)} placeholder="e.g. rain, arijit, piano" /></label>
          {!SP.enabled ? <p className="card-note">Spotify isn't set up on this site yet. Add your Spotify Client ID to config.js (see the setup guide). Starter picks are on the right meanwhile.</p>
            : !conn ? <button className="btn primary" onClick={() => SP.login()}><Icon n="music" s={16} />Connect Spotify</button>
            : <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
              <button className="btn primary" onClick={find} disabled={!!busy}><Icon n="search" s={16} />{busy === "search" ? "Searching…" : "Find songs"}</button>
              {res && res.tracks.length > 0 && <button className="btn soft" onClick={makePlaylist} disabled={!!busy}><Icon n="plus" s={16} />{busy === "make" ? "Saving…" : "Save as a playlist"}</button>}
              <button className="btn soft" style={{ marginLeft: "auto" }} onClick={() => { SP.logout(); setConn(false); }}>Disconnect</button>
            </div>}
          {err && <p className="form-err" style={{ marginTop: 12 }} role="alert">{err}</p>}
        </section>
        {made.length > 0 && <section className="card">
          <div className="card-h"><Icon n="heart" style={{ color: "var(--pink-3)" }} /><h2 className="grow">Your playlists</h2></div>
          {made.slice(0, 8).map(m => <div key={m.id} className="song">
            <span className="res-tile" style={{ background: mix((MIX_MOODS.find(x => x.id === m.mood) || MIX_MOODS[0]).color, 55) }}><Icon n="music" s={18} /></span>
            <div className="grow"><b>{m.name}</b><small>{m.mood}</small></div>
            {m.url && <a className="sp" href={m.url} target="_blank" rel="noopener noreferrer"><Icon n="play" s={12} />Open</a>}
          </div>)}
        </section>}
      </div>
      <section className="card">
        {busy === "search" ? <div className="mix-head"><div className="vinyl spin"></div><div className="think">Looking for {mood} music<span className="dots-anim"><i></i><i></i><i></i></span></div></div>
        : res && res.tracks.length ? <>
          <div className="mix-head"><div className="vinyl"></div><div style={{ flex: 1, minWidth: 0 }}><p className="eyebrow">From Spotify</p><h2 style={{ fontSize: 22 }}>{res.q}</h2></div></div>
          {res.tracks.map(t => <div key={t.id} className="song">
            {t.img ? <img className="res-tile" src={t.img} alt="" /> : <span className="res-tile" style={{ background: "var(--latte-2)" }}><Icon n="music" s={18} /></span>}
            <div className="grow"><b>{t.name}</b><small>{t.by}</small></div>
            <button className="icon-btn" aria-label={saved[t.id] ? "Saved" : `Save ${t.name}`} disabled={saved[t.id]} onClick={e => save(t, e.currentTarget)} style={saved[t.id] ? { color: "var(--pink-3)" } : null}><Icon n="heart" s={17} /></button>
            {t.url && <a className="sp" href={t.url} target="_blank" rel="noopener noreferrer"><Icon n="play" s={12} />Open</a>}
          </div>)}
          {res.lists.length > 0 && <><p className="eyebrow" style={{ marginTop: 16 }}>Playlists for this mood</p>
            {res.lists.map(p => <div key={p.id} className="song">
              {p.img ? <img className="res-tile" src={p.img} alt="" /> : <span className="res-tile" style={{ background: "var(--latte-2)" }}><Icon n="list" s={18} /></span>}
              <div className="grow"><b>{p.name}</b><small>playlist{p.by ? " · " + p.by : ""}</small></div>
              {p.url && <a className="sp" href={p.url} target="_blank" rel="noopener noreferrer"><Icon n="play" s={12} />Open</a>}</div>)}</>}
        </> : <>
          <div className="mix-head"><div className="vinyl"></div><div><p className="eyebrow">Starter picks · {mood}</p><h2>A few songs for this mood</h2></div></div>
          {starter.map(([title, artist], i) => <div key={i} className="song">
            <span className="n num">{i + 1}</span>
            <div className="grow"><b>{title}</b><small>{artist}</small></div>
            <a className="sp" href={spotifyUrl(title, artist)} target="_blank" rel="noopener noreferrer"><Icon n="play" s={12} />Spotify</a>
          </div>)}
        </>}
      </section>
    </div>
  </div>;
}

/* =============== morning paper =============== */
function NewsPage() {
  const { news } = useStore();
  const d = news.doc;
  const sections = d && Array.isArray(d.sections) ? d.sections.filter(x => x && Array.isArray(x.items) && x.items.length) : [];
  const fresh = d && d.date === todayISO();
  const updated = d && d.updatedAt ? new Date(d.updatedAt) : null;
  return <div className="page">
    <div className="paper-head">
      <div><p className="eyebrow">{fmtLong(todayISO())}</p><h1>The Morning Paper</h1></div>
      <div className="ed">{updated ? <>Updated {updated.toLocaleString("en-IN", { weekday: "short", hour: "numeric", minute: "2-digit" })}<br />{fresh ? "Today's edition" : "Today's edition arrives around 6:45 am"}</> : "Fresh headlines every morning"}</div>
    </div>
    {news.status === "loading" && <div className="empty">Fetching today's paper…</div>}
    {news.status === "unavailable" && <div className="empty">Couldn't load today's paper. Check your connection; the sources below are one tap away.</div>}
    {news.status === "ok" && !sections.length && <div className="empty">No edition yet. The first one arrives tomorrow morning.</div>}
    {sections.length > 0 && <div className="news-grid">{sections.map((sec, si) => <section key={si} className="card news-sec">
      <h2>{sec.title}</h2>
      {sec.items.slice(0, 5).map((it, i) => <a key={i} className={`story ${si === 0 && i === 0 ? "lead" : ""}`} href={it.url} target="_blank" rel="noopener noreferrer">
        <b>{it.headline}</b>{it.summary && <p>{it.summary}</p>}<small><Icon n="external" s={12} />{it.source || "Read"}</small></a>)}
    </section>)}</div>}
    <section className="card">
      <div className="card-h"><h2 className="grow">Read more</h2></div>
      <div className="src-links">{NEWS_SOURCES.map(([n, u]) => <a key={u} href={u} target="_blank" rel="noopener noreferrer"><Icon n="external" s={13} />{n}</a>)}</div>
    </section>
  </div>;
}

/* =============== shared defaults for the new sections =============== */
const SUBJECT_COLORS = ["#C98F86", "#7F9870", "#A27B62", "#9C8878", "#A88598", "#6F86A0", "#B07A45", "#8C9A5B"];
const addMin = (t, m) => { const x = toMin(t || "09:00") + m; return `${pad(Math.floor(x / 60) % 24)}:${pad(x % 60)}`; };
const DEFAULT_GRADES = {
  comps: [["T1", 15], ["T2", 25], ["T3", 35], ["TA", 25]],
  bands: [[90, "A+", 10], [80, "A", 9], [70, "B+", 8], [60, "B", 7], [50, "C+", 6], [45, "C", 5], [40, "D", 4], [0, "F", 0]],
  marks: {}, target: {}, past: [], goal: 8.5,
};
const DEFAULT_PLAN = { start: null, hWd: 3, hWe: 5, examIds: [], items: [] };
const ROADMAP = [
  { id: "basics", name: "C basics & I/O", target: 10 }, { id: "loops", name: "Loops & patterns", target: 10 },
  { id: "arrays", name: "Arrays", target: 15 }, { id: "strings", name: "Strings", target: 12 },
  { id: "pointers", name: "Pointers & memory", target: 8 }, { id: "recursion", name: "Recursion", target: 10 },
  { id: "sorting", name: "Sorting & searching", target: 12 }, { id: "linked", name: "Linked lists", target: 12 },
  { id: "stack", name: "Stacks & queues", target: 10 }, { id: "hashing", name: "Hashing", target: 8 },
  { id: "trees", name: "Trees", target: 12 }, { id: "graphs", name: "Graphs", target: 10 }, { id: "dp", name: "Dynamic programming", target: 12 },
];
const DEFAULT_CODE = { goal: 2, problems: [], comfy: {} };
const MEALS = [["b", "Breakfast"], ["l", "Lunch"], ["s", "Snacks"], ["d", "Dinner"]];
const DEFAULT_MESS = {
  sample: true,
  times: { b: ["07:30", "09:00"], l: ["12:30", "14:00"], s: ["17:00", "17:45"], d: ["19:30", "21:00"] },
  menu: {
    1: { b: "Aloo paratha, curd, tea", l: "Rajma, jeera rice, roti, salad", s: "Samosa, tea", d: "Mix veg, dal tadka, roti, rice" },
    2: { b: "Poha, boiled eggs, tea", l: "Kadhi pakoda, rice, roti", s: "Bread pakoda, tea", d: "Paneer butter masala, roti, rice, kheer" },
    3: { b: "Idli, sambar, chutney", l: "Chole, rice, roti, salad", s: "Maggi, tea", d: "Egg curry / aloo matar, roti, rice" },
    4: { b: "Upma, banana, tea", l: "Dal makhani, rice, roti", s: "Biscuits, tea", d: "Kadai veg, dal, roti, rice" },
    5: { b: "Chole bhature, tea", l: "Aloo gobhi, dal, rice, roti", s: "Pav bhaji", d: "Chicken curry / shahi paneer, roti, rice" },
    6: { b: "Sandwich, cornflakes, milk", l: "Veg biryani, raita", s: "Pakode, tea", d: "Dal, bhindi, roti, rice" },
    0: { b: "Puri, aloo sabzi, halwa", l: "Paneer, pulao, roti", s: "Cake, coffee", d: "Khichdi, papad, curd" },
  },
  ratings: {},
};
const DEFAULT_PORTFOLIO = {
  projects: [{ id: "p1", title: "LattePlanner", line: "A cozy all-in-one student dashboard", desc: "Planner with attendance tracking, routines, a focus timer, budgeting and a journal.", stack: ["React", "HTML", "CSS"], status: "Building", github: "", demo: "", start: "2026-09" }],
  skills: [{ id: "k1", name: "C", cat: "Languages", level: 2 }, { id: "k2", name: "HTML & CSS", cat: "Languages", level: 2 }, { id: "k3", name: "Git & GitHub", cat: "Tools", level: 1 }, { id: "k4", name: "Public speaking", cat: "People skills", level: 2 }],
  wins: [],
};
const EMPTY_PORTFOLIO = { projects: [], skills: [], wins: [] };
const SmallBtn = ({ children, ...p }) => <button className="btn soft" style={{ height: 34, padding: "0 14px", fontSize: 13.5 }} {...p}>{children}</button>;

/* =============== dashboard helpers =============== */
function SetupBanner() {
  const { profile, go } = useStore();
  if (profile.setupDone) return null;
  return <div className="banner">
    <span className="ic" style={{ width: 46, height: 46, borderRadius: 16, background: "var(--paper)", display: "grid", placeItems: "center", color: "var(--pink-3)" }}><Icon n="sparkle" s={22} /></span>
    <div className="grow"><b>You're looking at example data</b><span className="muted" style={{ fontSize: 14 }}>Add your real subjects, timetable and exam dates, then clear the examples. It takes about ten minutes.</span></div>
    <button className="btn primary" onClick={() => go("setup")}><Icon n="chevR" s={16} />Set up my semester</button>
  </div>;
}
function ExamBanner() {
  const { examPlan, examDone, go } = useStore();
  const sched = useMemo(() => examPlan.start && examPlan.items.length ? schedulePlan(examPlan) : null, [examPlan, EXAMS]);
  if (!sched) return null;
  const today = todayISO();
  const todays = [...(sched.days[today] || []), ...Object.keys(sched.days).filter(d => d < today).flatMap(d => sched.days[d])].filter(x => !examDone[x.key] && x.type !== "examday");
  const lastExam = Math.max(...examPlan.examIds.map(id => { const e = EXAMS.find(x => x.id === id); return e ? daysUntil(e.date) : -1; }));
  if (lastExam < 0) return null;
  const mins = todays.reduce((a, x) => a + x.mins, 0);
  return <section className="card" style={{ background: "linear-gradient(150deg,var(--paper) 40%,var(--pink-2))" }}>
    <div className="card-h"><Icon n="target" style={{ color: "var(--pink-3)" }} /><h2 className="grow">Exam prep today</h2><SmallBtn onClick={() => go("exams")}>Open plan</SmallBtn></div>
    {todays.length ? <>
      <p className="muted" style={{ fontSize: 14, marginBottom: 8 }}>{todays.length} blocks · about {Math.round(mins / 60 * 2) / 2} hours</p>
      {todays.slice(0, 3).map(x => <div key={x.key} className="plan-item"><Icon n="check" s={14} /><div className="grow"><b>{x.short}: {x.label}</b></div></div>)}
    </> : <p className="muted">Nothing planned for today. Rest counts too ♡</p>}
  </section>;
}
function WellnessMini() {
  const { waterLog, setWaterLog, sleepLog, profile, cycle, go } = useStore();
  const today = todayISO(), n = waterLog[today] || 0, goal = profile.waterGoal || 8;
  const sl = sleepLog[today];
  const cy = profile.cycle !== false ? cycleInfo(cycle) : null;
  return <section className="card">
    <div className="card-h"><Icon n="leaf" style={{ color: "var(--sage-3)" }} /><h2 className="grow">Wellness</h2><SmallBtn onClick={() => go("wellness")}>Open</SmallBtn></div>
    <div className="list-gap">
      <div className="check-row" style={{ justifyContent: "space-between" }}>
        <span><Icon n="drop" s={16} style={{ color: "var(--sage-3)", verticalAlign: -3 }} /> Water <span className="num">{n}/{goal}</span> glasses</span>
        <span style={{ display: "flex", gap: 6 }}>
          <button className="icon-btn" aria-label="One glass less" onClick={() => setWaterLog({ ...waterLog, [today]: Math.max(0, n - 1) })}><Icon n="x" s={14} /></button>
          <button className="btn primary" style={{ height: 34, padding: "0 14px" }} onClick={e => { if (n + 1 === goal) celebrate(e.currentTarget); setWaterLog({ ...waterLog, [today]: n + 1 }); }}><Icon n="plus" s={14} />Glass</button>
        </span>
      </div>
      <div className="mini-bar" style={{ margin: 0 }}><i style={{ width: `${Math.min(100, n / goal * 100)}%`, background: "var(--sage-3)" }}></i></div>
      <div className="check-row" style={{ justifyContent: "space-between" }}>
        <span><Icon n="moon" s={16} style={{ color: "var(--mocha)", verticalAlign: -3 }} /> Sleep last night</span>
        {sl ? <b className="num">{fmtHrs(sleepHours(sl))}</b> : <SmallBtn onClick={() => go("wellness")}>Log it</SmallBtn>}
      </div>
      {cy && cy.day && <div className="check-row" style={{ justifyContent: "space-between" }}>
        <span><Icon n="sparkle" s={16} style={{ color: "var(--pink-3)", verticalAlign: -3 }} /> Cycle day {cy.day}</span>
        <span className="pill">{cy.phase}</span></div>}
    </div>
  </section>;
}
function MessMini() {
  const { mess, go } = useStore();
  const dow = new Date().getDay(), nowM = new Date().getHours() * 60 + new Date().getMinutes();
  const m = mess.menu[dow] || {};
  const next = MEALS.find(([k]) => toMin(mess.times[k][1]) >= nowM);
  if (!next) return null;
  const [k, label] = next, isNow = nowM >= toMin(mess.times[k][0]);
  return <section className="card">
    <div className="card-h"><Icon n="food" style={{ color: "var(--mocha)" }} /><h2 className="grow">At the mess</h2><SmallBtn onClick={() => go("mess")}>Week</SmallBtn></div>
    <p className="eyebrow">{isNow ? "Now" : "Next"} · {label} · {fmt12(mess.times[k][0])}</p>
    <p style={{ fontFamily: "var(--display)", fontSize: 18, marginTop: 4 }}>{m[k] || "Not added yet"}</p>
  </section>;
}

/* =============== setup =============== */
let SETUP_TAB = "subjects";
function SetupPage() {
  const [tab, setTab] = useState(SETUP_TAB);
  useEffect(() => () => { SETUP_TAB = "subjects"; }, []);
  const tabs = [["subjects", "1 · Subjects"], ["timetable", "2 · Timetable"], ["exams", "3 · Exams"], ["people", "4 · Birthdays"], ["fresh", "5 · Start fresh"]];
  return <div className="page">
    <div className="page-head"><div><p className="eyebrow">Make it yours</p><h1>Set up your semester</h1><p>Work through the five steps in order. Everything saves as you type and can be changed any time from Settings.</p></div></div>
    <div className="tabs" role="tablist">{tabs.map(([k, l]) => <button key={k} role="tab" aria-selected={tab === k} className={tab === k ? "on" : ""} onClick={() => setTab(k)}>{l}</button>)}</div>
    {tab === "subjects" && <SubjectsEditor />}
    {tab === "timetable" && <TimetableEditor />}
    {tab === "exams" && <ExamsEditor />}
    {tab === "people" && <BirthdaysEditor />}
    {tab === "fresh" && <FreshStart />}
    {tab !== "fresh" && <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <button className="btn primary" onClick={() => { const i = tabs.findIndex(t => t[0] === tab); setTab(tabs[i + 1][0]); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Next step<Icon n="chevR" s={16} /></button></div>}
  </div>;
}
function SubjectsEditor() {
  const { courses, setCourses, unitsMap, setUnitsMap } = useStore();
  const [del, setDel] = useState(null);
  const upd = (id, patch) => setCourses(courses.map(c => c.id === id ? { ...c, ...patch } : c));
  const add = () => { const id = "c" + uid(); setCourses([...courses, { id, name: "", short: "", color: SUBJECT_COLORS[courses.length % SUBJECT_COLORS.length], prof: "", credits: 3, att: 0, held: 0 }]); setUnitsMap({ ...unitsMap, [id]: [] }); };
  return <div className="list-gap">
    <p className="card-note">Add every subject, labs included. “Attended” and “held” are the classes before today. From tomorrow the timeline counts them for you.</p>
    {courses.map(c => <section key={c.id} className="card">
      <div className="edit-grid">
        <label className="field">Subject name<input id={`sn-${c.id}`} className="input" value={c.name} placeholder="Engineering Physics-I" onChange={e => upd(c.id, { name: e.target.value })} /></label>
        <label className="field">Short name<input id={`ss-${c.id}`} className="input" value={c.short} maxLength={20} placeholder="Physics" onChange={e => upd(c.id, { short: e.target.value })} /></label>
        <label className="field">Teacher<input id={`sp-${c.id}`} className="input" value={c.prof || ""} onChange={e => upd(c.id, { prof: e.target.value })} /></label>
        <label className="field">Credits<input id={`sc-${c.id}`} className="input num" type="number" min="0" max="10" step="0.5" value={c.credits ?? ""} onChange={e => upd(c.id, { credits: e.target.value === "" ? "" : +e.target.value })} /></label>
        <label className="field">Classes attended so far<input id={`sa-${c.id}`} className="input num" type="number" min="0" value={c.att ?? 0} onChange={e => upd(c.id, { att: Math.max(0, +e.target.value || 0) })} /></label>
        <label className="field">Classes held so far<input id={`sh-${c.id}`} className="input num" type="number" min="0" value={c.held ?? 0} onChange={e => upd(c.id, { held: Math.max(0, +e.target.value || 0) })} /></label>
        <label className="field">Lab or practical?<span className="check-row" style={{ padding: 0 }}><Check on={!!c.lab} label="This is a lab" onChange={() => upd(c.id, { lab: !c.lab })} />{c.lab ? "Yes, graded as one lab mark" : "No, it has T1/T2/T3/TA"}</span></label>
        <div className="field">Colour<div className="color-pick">{SUBJECT_COLORS.map(col => <button key={col} className={c.color === col ? "on" : ""} style={{ background: col }} aria-label={`Colour ${col}`} onClick={() => upd(c.id, { color: col })}></button>)}</div></div>
        <label className="field full">Units, one per line<textarea id={`su-${c.id}`} className="input" rows="4" value={(unitsMap[c.id] || []).join("\n")} placeholder={"Interference\nDiffraction\nPolarisation"} onChange={e => setUnitsMap({ ...unitsMap, [c.id]: e.target.value.split("\n") })} /></label>
      </div>
      {+c.att > +c.held && <p className="form-err" style={{ marginTop: 8 }}>Attended can't be more than held.</p>}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
        <button className="btn soft" onClick={() => { if (del === c.id) { setCourses(courses.filter(x => x.id !== c.id)); setDel(null); } else setDel(c.id); }}><Icon n="trash" s={15} />{del === c.id ? "Tap again to remove" : "Remove subject"}</button>
      </div>
    </section>)}
    <button className="create-nb" onClick={add}><span><Icon n="plus" s={16} sw={2.2} /></span>Add a subject</button>
  </div>;
}
function TimetableEditor() {
  const { timetable, setTimetable, courses } = useStore();
  const [day, setDay] = useState(1);
  const [copyTo, setCopyTo] = useState("");
  const raw = timetable[day] || [];
  const list = raw.slice().sort((a, b) => toMin(a.t) - toMin(b.t));
  const setList = arr => setTimetable({ ...timetable, [day]: arr });
  const upd = (id, patch) => setList(raw.map(s => s.id === id ? { ...s, ...patch } : s));
  const last = list[list.length - 1];
  const nextT = last ? addMin(last.e, 10) : "09:00";
  return <div className="list-gap">
    <p className="card-note">Add each day's classes and anything else that repeats weekly (lunch, club meetings). Marking attendance works from these.</p>
    <div className="tabs">{WEEK_ORDER.map(d => <button key={d} className={day === d ? "on" : ""} onClick={() => setDay(d)}>{DAY_SHORT[d]} <span className="num" style={{ opacity: .6 }}>{(timetable[d] || []).length || ""}</span></button>)}</div>
    <section className="card list-gap">
      {!list.length && <div className="empty">Nothing on {DAY_SHORT[day]} yet.</div>}
      {list.map(s => <div key={s.id} className="row-edit">
        <label className="field">Starts<input className="input" type="time" value={s.t} onChange={e => upd(s.id, { t: e.target.value })} /></label>
        <label className="field">Ends<input className="input" type="time" value={s.e} onChange={e => upd(s.id, { e: e.target.value })} /></label>
        {s.course !== undefined ? <>
          <label className="field">Subject<select className="input" value={s.course} onChange={e => upd(s.id, { course: e.target.value })}>{courses.map(c => <option key={c.id} value={c.id}>{c.short || c.name || "Untitled"}</option>)}</select></label>
          <label className="field">Type<select className="input" value={s.kind} onChange={e => upd(s.id, { kind: e.target.value })}>{["Lecture", "Tutorial", "Lab", "Workshop"].map(k => <option key={k}>{k}</option>)}</select></label>
          <label className="field">Room<input className="input" value={s.room || ""} placeholder="LT-1" onChange={e => upd(s.id, { room: e.target.value })} /></label>
        </> : <>
          <label className="field">What<input className="input" value={s.title || ""} placeholder="Lunch at the mess" onChange={e => upd(s.id, { title: e.target.value })} /></label>
          <label className="field">Note<input className="input" value={s.note || ""} onChange={e => upd(s.id, { note: e.target.value })} /></label>
        </>}
        <button className="icon-btn" style={{ marginBottom: 4 }} aria-label="Remove" onClick={() => setList(raw.filter(x => x.id !== s.id))}><Icon n="trash" s={16} /></button>
      </div>)}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button className="btn primary" disabled={!courses.length} onClick={() => setList([...raw, { id: uid(), t: nextT, e: addMin(nextT, 50), course: courses[0] ? courses[0].id : "", kind: "Lecture", room: "" }])}><Icon n="plus" s={15} />Add a class</button>
        <button className="btn soft" onClick={() => setList([...raw, { id: uid(), t: nextT, e: addMin(nextT, 60), title: "", icon: "star", note: "" }])}><Icon n="plus" s={15} />Add something else</button>
        {list.length > 0 && <span style={{ display: "flex", gap: 6, alignItems: "center", marginLeft: "auto" }}>
          <select className="input" style={{ width: "auto", height: 40 }} value={copyTo} onChange={e => setCopyTo(e.target.value)} aria-label="Copy to day"><option value="">Copy this day to…</option>{WEEK_ORDER.filter(d => d !== day).map(d => <option key={d} value={d}>{DAY_SHORT[d]}</option>)}</select>
          <button className="btn soft" disabled={copyTo === ""} onClick={() => { setTimetable({ ...timetable, [copyTo]: raw.map(s => ({ ...s, id: uid() })) }); setCopyTo(""); }}>Copy</button></span>}
      </div>
    </section>
  </div>;
}
function ExamsEditor() {
  const { exams, setExams, courses } = useStore();
  const [bulk, setBulk] = useState({ kind: "Mid-term", prefix: "T1", start: dISO(10), gap: 1 });
  const upd = (id, patch) => setExams(exams.map(x => x.id === id ? { ...x, ...patch } : x));
  const addAll = () => {
    let d = parseISO(bulk.start); const out = [];
    courses.filter(c => c.id).forEach(c => {
      while (d.getDay() === 0) d.setDate(d.getDate() + 1);
      out.push({ id: uid(), title: `${bulk.prefix ? bulk.prefix + " · " : ""}${c.name || c.short}`, course: c.id, date: isoOf(d), time: "9:30 am", venue: "", kind: bulk.kind, tentative: true });
      d = new Date(d); d.setDate(d.getDate() + Math.max(1, +bulk.gap || 1));
    });
    setExams([...exams, ...out]);
  };
  const list = exams.slice().sort((a, b) => (a.date || "").localeCompare(b.date || ""));
  return <div className="list-gap">
    <p className="card-note">Tentative dates are fine. Tick “tentative” and change them when the official datesheet comes out. Exam Prep reshuffles your plan automatically.</p>
    <section className="card">
      <h3 style={{ marginBottom: 10 }}>Add a whole exam round at once</h3>
      <div className="row-edit" style={{ background: "transparent", padding: 0 }}>
        <label className="field">Name<input className="input" value={bulk.prefix} onChange={e => setBulk({ ...bulk, prefix: e.target.value })} placeholder="T2" /></label>
        <label className="field">Type<select className="input" value={bulk.kind} onChange={e => setBulk({ ...bulk, kind: e.target.value })}>{["Mid-term", "End-term", "Quiz", "Lab", "Viva"].map(k => <option key={k}>{k}</option>)}</select></label>
        <label className="field">First exam on<input className="input" type="date" value={bulk.start} onChange={e => setBulk({ ...bulk, start: e.target.value })} /></label>
        <label className="field">Days between<input className="input num" type="number" min="1" max="7" value={bulk.gap} onChange={e => setBulk({ ...bulk, gap: e.target.value })} /></label>
        <button className="btn primary" style={{ height: 44 }} disabled={!courses.length} onClick={addAll}>Add for every subject</button>
      </div>
    </section>
    <section className="card list-gap">
      {!list.length && <div className="empty">No exams yet.</div>}
      {list.map(x => <div key={x.id} className="row-edit" style={daysUntil(x.date || todayISO()) < 0 ? { opacity: .55 } : null}>
        <label className="field">Title<input className="input" value={x.title || ""} placeholder="T1 · Physics" onChange={e => upd(x.id, { title: e.target.value })} /></label>
        <label className="field">Subject<select className="input" value={x.course} onChange={e => upd(x.id, { course: e.target.value })}><option value="">None</option>{courses.map(c => <option key={c.id} value={c.id}>{c.short || c.name}</option>)}</select></label>
        <label className="field">Type<select className="input" value={x.kind} onChange={e => upd(x.id, { kind: e.target.value })}>{["Mid-term", "End-term", "Quiz", "Lab", "Viva"].map(k => <option key={k}>{k}</option>)}</select></label>
        <label className="field">Date<input className="input" type="date" value={x.date} onChange={e => upd(x.id, { date: e.target.value })} /></label>
        <label className="field">Time & room<input className="input" value={[x.time, x.venue].filter(Boolean).join(" · ")} placeholder="9:30 am · LT-1" onChange={e => { const [t, ...v] = e.target.value.split("·"); upd(x.id, { time: (t || "").trim(), venue: v.join("·").trim() }); }} /></label>
        <span style={{ display: "flex", gap: 4, alignItems: "center", marginBottom: 4 }}>
          <button className={`chip-toggle ${x.tentative ? "on" : ""}`} style={{ height: 38 }} aria-pressed={!!x.tentative} onClick={() => upd(x.id, { tentative: !x.tentative })}>Tentative</button>
          <button className="icon-btn" aria-label="Remove exam" onClick={() => setExams(exams.filter(y => y.id !== x.id))}><Icon n="trash" s={16} /></button></span>
      </div>)}
      <div><button className="btn soft" onClick={() => setExams([...exams, { id: uid(), title: "", course: courses[0] ? courses[0].id : "", date: dISO(7), time: "9:30 am", venue: "", kind: "Quiz", tentative: true }])}><Icon n="plus" s={15} />Add one exam</button></div>
    </section>
  </div>;
}
function BirthdaysEditor() {
  const { bdays, setBdays } = useStore();
  const upd = (id, patch) => setBdays(bdays.map(b => b.id === id ? { ...b, ...patch } : b));
  return <div className="list-gap">
    <p className="card-note">Birthdays repeat every year on your calendar. The year you pick doesn't matter.</p>
    <section className="card list-gap">
      {!bdays.length && <div className="empty">No birthdays yet.</div>}
      {bdays.map(b => <div key={b.id} className="row-edit">
        <label className="field">Name<input className="input" value={b.title} placeholder="Riya" onChange={e => upd(b.id, { title: e.target.value })} /></label>
        <label className="field">Birthday<input className="input" type="date" value={b.date} onChange={e => upd(b.id, { date: e.target.value })} /></label>
        <button className="icon-btn" style={{ marginBottom: 4 }} aria-label="Remove" onClick={() => setBdays(bdays.filter(x => x.id !== b.id))}><Icon n="trash" s={16} /></button>
      </div>)}
      <div><button className="btn soft" onClick={() => setBdays([...bdays, { id: uid(), title: "", date: todayISO() }])}><Icon n="plus" s={15} />Add a birthday</button></div>
    </section>
  </div>;
}
function FreshStart() {
  const S = useStore();
  const OPTS = [["tasks", "Example tasks, deadlines & events"], ["money", "Example expenses"], ["journal", "Example journal pages & brain dump"], ["todos", "Example to-dos and intentions"],
    ["notes", "Example notebooks"], ["syllabus", "Syllabus ticks"], ["attendance", "Attendance marks from the timeline"], ["history", "Example focus, routine and exam-plan history"], ["portfolio", "Example portfolio entries"]];
  const [sel, setSel] = useState(Object.fromEntries(OPTS.map(([k]) => [k, true])));
  const [confirm, setConfirm] = useState(false);
  const run = e => {
    if (!confirm) { setConfirm(true); return; }
    if (sel.tasks) { S.setTasks([]); S.setUserEvents([]); }
    if (sel.money) S.setTxns([]);
    if (sel.journal) { S.setJournal([]); S.setDumps([]); }
    if (sel.todos) { S.setTodos([]); S.setIntentions(INTENTIONS.map(i => ({ ...i, text: "", done: false }))); }
    if (sel.notes) S.setNotebooks([]);
    if (sel.syllabus) S.setUnits({});
    if (sel.attendance) S.setChecks({});
    if (sel.history) { S.setFocusLog({}); S.setRoutineDone({}); S.setExamPlan(DEFAULT_PLAN); S.setExamDone({}); }
    if (sel.portfolio) S.setPortfolio(EMPTY_PORTFOLIO);
    S.setMess({ ...S.mess, ratings: {} });
    S.setProfile({ ...S.profile, setupDone: true, setupAt: todayISO() });
    celebrate(e.currentTarget); S.notify("All yours now ♡ Have a lovely first day"); S.go("dashboard");
  };
  return <section className="card list-gap">
    <h2>Clear the examples</h2>
    <p className="card-note">Your subjects, timetable, exams, birthdays, routine, mess menu, theme and settings stay exactly as they are.</p>
    {OPTS.map(([k, l]) => <label key={k} className="check-row"><Check on={sel[k]} label={l} onChange={() => { setSel({ ...sel, [k]: !sel[k] }); setConfirm(false); }} />{l}</label>)}
    <div><button className="btn primary" onClick={run}><Icon n="sparkle" s={16} />{confirm ? "Tap again to clear and start" : "Clear selected and start fresh"}</button></div>
  </section>;
}

/* =============== grades =============== */
function gradeFor(pct, bands) { for (const b of bands) if (pct >= b[0]) return b; return bands[bands.length - 1]; }
function subjectCalc(cid, g) {
  const m = g.marks[cid] || {}; let got = 0, max = 0, remMax = 0;
  const course = courseById(cid);
  if (course && course.lab) {
    const fin = m.final ? g.bands.find(b => b[1] === m.final) : null;
    const v = m.pct === "" || m.pct == null || isNaN(+m.pct) ? null : Math.min(100, +m.pct);
    return { got: v || 0, max: v != null ? 100 : 0, remMax: v != null ? 0 : 100, pct: v, proj: fin || (v != null ? gradeFor(v, g.bands) : null), isFinal: !!fin, lab: true };
  }
  g.comps.forEach(([k, w]) => { const v = m[k]; if (v === "" || v == null || isNaN(+v)) remMax += +w; else { got += Math.min(+v, +w); max += +w; } });
  const pct = max ? got / max * 100 : null;
  const fin = m.final ? g.bands.find(b => b[1] === m.final) : null;
  return { got, max, remMax, pct, proj: fin || (pct != null ? gradeFor(pct, g.bands) : null), isFinal: !!fin };
}
function semesterGPA(g) {
  let pts = 0, cr = 0, n = 0;
  COURSES.forEach(c => { const r = subjectCalc(c.id, g); const credits = +c.credits || 0; if (r.proj && credits > 0) { pts += r.proj[2] * credits; cr += credits; n++; } });
  return { sgpa: cr ? pts / cr : null, credits: cr, n };
}
function cgpaOf(g, cur) {
  const all = [...g.past.filter(p => +p.credits > 0 && p.sgpa !== "").map(p => ({ s: +p.sgpa, c: +p.credits })), ...(cur && cur.sgpa != null ? [{ s: cur.sgpa, c: cur.credits }] : [])];
  const c = all.reduce((a, x) => a + x.c, 0); return c ? all.reduce((a, x) => a + x.s * x.c, 0) / c : null;
}
function GradesPage() {
  const { grades, setGrades, profile, notify } = useStore();
  const g = { ...DEFAULT_GRADES, ...grades };
  const [scheme, setScheme] = useState(false);
  const set = patch => setGrades({ ...g, ...patch });
  const setMark = (cid, k, v) => set({ marks: { ...g.marks, [cid]: { ...(g.marks[cid] || {}), [k]: v } } });
  const cur = semesterGPA(g), cg = cgpaOf(g, cur);
  const total = g.comps.reduce((a, [, w]) => a + (+w || 0), 0);
  const series = [...g.past.map(p => ({ label: p.name || "Sem", value: +p.sgpa || 0 })), ...(cur.sgpa != null ? [{ label: "Now", value: Math.round(cur.sgpa * 100) / 100 }] : [])];
  const need = (cid, r) => {
    const tname = g.target[cid] || "A"; const b = g.bands.find(x => x[1] === tname) || g.bands[1];
    if (r.isFinal) return { t: "Final grade entered", cls: "ok" };
    if (r.lab) return r.pct != null ? { t: r.proj[1] === tname || r.proj[0] >= b[0] ? `${tname} is secured` : `Below ${tname} so far`, cls: r.proj[0] >= b[0] ? "ok" : "warn" } : { t: "Add lab marks when you get them", cls: "" };
    if (!r.remMax) return { t: "All marks in", cls: "ok" };
    const n = b[0] / 100 * total - r.got;
    if (n <= 0) return { t: `${tname} is secured`, cls: "ok" };
    if (n > r.remMax) return { t: `${tname} is out of reach now`, cls: "warn" };
    return { t: `${Math.ceil(n)} of ${r.remMax} left for ${tname} (${Math.round(n / r.remMax * 100)}%)`, cls: n / r.remMax > .8 ? "warn" : "" };
  };
  return <div className="page">
    <div className="page-head"><div><p className="eyebrow">{profile.semester}</p><h1>Grades & CGPA</h1><p>Enter marks as they come in. Your projected grade updates on its own, and you can see what you need in the remaining exams.</p></div>
      <SmallBtn onClick={() => setScheme(!scheme)}><Icon n="sliders" s={15} />{scheme ? "Hide marking scheme" : "Marking scheme"}</SmallBtn></div>
    <div className="kpis">
      <div className="kpi"><small>Projected SGPA</small><b className="num">{cur.sgpa != null ? cur.sgpa.toFixed(2) : "—"}</b><em>{cur.n ? `from ${cur.n} of ${COURSES.length} subjects` : "add marks to see it"}</em></div>
      <div className="kpi"><small>CGPA</small><b className="num">{cg != null ? cg.toFixed(2) : "—"}</b><em>{g.past.length ? `${g.past.length} past semester${g.past.length > 1 ? "s" : ""} + now` : "this semester so far"}</em></div>
      <div className="kpi"><small>Goal</small><b className="num"><input className="input mini" style={{ fontFamily: "var(--display)", fontSize: 24, height: 40, width: 90 }} type="number" step="0.1" min="0" max="10" value={g.goal} onChange={e => set({ goal: e.target.value })} aria-label="CGPA goal" /></b><em>{cg != null && +g.goal ? (cg >= +g.goal ? "on track ♡" : `${(+g.goal - cg).toFixed(2)} to go`) : "your target CGPA"}</em></div>
    </div>
    {scheme && <section className="card list-gap">
      <h2>Marking scheme</h2>
      <p className="card-note">These are placeholders, so match them to your college's rules. Components should add up to 100 (now {total}).</p>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>{g.comps.map(([k, w], i) => <span key={i} className="row-edit" style={{ gridTemplateColumns: "90px 80px auto" }}>
        <input className="input" value={k} aria-label="Component name" onChange={e => set({ comps: g.comps.map((c, j) => j === i ? [e.target.value, c[1]] : c) })} />
        <input className="input num" type="number" value={w} aria-label="Marks" onChange={e => set({ comps: g.comps.map((c, j) => j === i ? [c[0], +e.target.value || 0] : c) })} />
        <button className="icon-btn" aria-label="Remove component" onClick={() => set({ comps: g.comps.filter((_, j) => j !== i) })}><Icon n="x" s={14} /></button></span>)}
        <SmallBtn onClick={() => set({ comps: [...g.comps, ["Lab", 10]] })}><Icon n="plus" s={14} />Component</SmallBtn></div>
      <h3>Grade bands</h3>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{g.bands.map(([min, name, gp], i) => <span key={i} className="row-edit" style={{ gridTemplateColumns: "64px 60px 56px" }}>
        <input className="input num" type="number" value={min} aria-label="Minimum %" onChange={e => set({ bands: g.bands.map((b, j) => j === i ? [+e.target.value || 0, b[1], b[2]] : b) })} />
        <input className="input" value={name} aria-label="Grade" onChange={e => set({ bands: g.bands.map((b, j) => j === i ? [b[0], e.target.value, b[2]] : b) })} />
        <input className="input num" type="number" value={gp} aria-label="Points" onChange={e => set({ bands: g.bands.map((b, j) => j === i ? [b[0], b[1], +e.target.value || 0] : b) })} /></span>)}</div>
      <p className="card-note">Each band: minimum %, grade, grade points.</p>
    </section>}
    <section className="card">
      <div className="card-h"><h2 className="grow">This semester</h2></div>
      {!COURSES.length ? <div className="empty">Add your subjects in Setup first.</div> : <div className="table-wrap"><table>
        <thead><tr><th>Subject</th><th>Credits</th>{g.comps.map(([k, w]) => <th key={k}>{k} <span style={{ opacity: .6 }}>/{w}</span></th>)}<th>So far</th><th>Grade</th><th>Aim for</th><th>What you need</th></tr></thead>
        <tbody>{COURSES.map(c => { const r = subjectCalc(c.id, g), nd = need(c.id, r); return <tr key={c.id}>
          <td><b style={{ fontWeight: 700 }}>{c.short || c.name}</b></td>
          <td className="num">{c.credits || "—"}</td>
          {c.lab ? <td colSpan={g.comps.length}><span className="muted" style={{ fontSize: 13 }}>Lab marks </span><input className="input mini num" type="number" min="0" max="100" value={(g.marks[c.id] || {}).pct ?? ""} aria-label={`${c.short} lab marks out of 100`} onChange={e => setMark(c.id, "pct", e.target.value === "" ? "" : Math.max(0, Math.min(100, +e.target.value)))} /><span className="muted" style={{ fontSize: 13 }}> / 100</span></td>
          : g.comps.map(([k, w]) => <td key={k}><input className="input mini num" type="number" min="0" max={w} step="0.5" value={(g.marks[c.id] || {})[k] ?? ""} aria-label={`${c.short} ${k}`}
            onChange={e => setMark(c.id, k, e.target.value === "" ? "" : Math.max(0, Math.min(+w, +e.target.value)))} /></td>)}
          <td className="num">{r.lab ? (r.pct != null ? r.pct + "%" : "—") : r.max ? `${r.got}/${r.max}` : "—"}</td>
          <td>{r.proj ? <span className="grade" title={r.isFinal ? "Final grade" : "Projected at your current rate"}>{r.proj[1]}</span> : "—"}</td>
          <td><select className="input" style={{ height: 38, width: 76 }} value={g.target[c.id] || "A"} aria-label="Target grade" onChange={e => set({ target: { ...g.target, [c.id]: e.target.value } })}>{g.bands.map(b => <option key={b[1]}>{b[1]}</option>)}</select></td>
          <td><span className={`pill ${nd.cls}`}>{nd.t}</span></td>
        </tr>; })}</tbody>
      </table></div>}
      <p className="card-note" style={{ marginTop: 10 }}>Got your final grades? Choose them here instead: {COURSES.map(c => <select key={c.id} className="input" style={{ height: 32, width: "auto", margin: "4px 6px 0 0", display: "inline-block" }} value={(g.marks[c.id] || {}).final || ""} aria-label={`${c.short} final grade`} onChange={e => setMark(c.id, "final", e.target.value)}><option value="">{c.short}: —</option>{g.bands.map(b => <option key={b[1]} value={b[1]}>{c.short}: {b[1]}</option>)}</select>)}</p>
    </section>
    <div className="grid2">
      <section className="card">
        <div className="card-h"><h2 className="grow">Semester by semester</h2></div>
        {series.length ? <VBars data={series} max={10} color="var(--pink-3)" /> : <div className="empty">Your SGPA chart grows here.</div>}
      </section>
      <section className="card list-gap">
        <div className="card-h" style={{ marginBottom: 0 }}><h2 className="grow">Past semesters</h2>
          <SmallBtn disabled={cur.sgpa == null} onClick={() => { set({ past: [...g.past, { id: uid(), name: profile.semester.split(" ·")[0], sgpa: Math.round(cur.sgpa * 100) / 100, credits: cur.credits }] }); notify("Semester saved to your CGPA"); }}>Save this semester</SmallBtn></div>
        {g.past.map(p => <div key={p.id} className="row-edit" style={{ gridTemplateColumns: "1fr 90px 90px auto" }}>
          <input className="input" value={p.name} aria-label="Semester" onChange={e => set({ past: g.past.map(x => x.id === p.id ? { ...x, name: e.target.value } : x) })} />
          <input className="input num" type="number" step="0.01" value={p.sgpa} aria-label="SGPA" onChange={e => set({ past: g.past.map(x => x.id === p.id ? { ...x, sgpa: e.target.value } : x) })} />
          <input className="input num" type="number" value={p.credits} aria-label="Credits" onChange={e => set({ past: g.past.map(x => x.id === p.id ? { ...x, credits: e.target.value } : x) })} />
          <button className="icon-btn" aria-label="Remove" onClick={() => set({ past: g.past.filter(x => x.id !== p.id) })}><Icon n="trash" s={15} /></button></div>)}
        <p className="card-note">Name · SGPA · credits. Save this semester once final grades are in; next semester starts clean.</p>
        <div><SmallBtn onClick={() => set({ past: [...g.past, { id: uid(), name: "Sem", sgpa: "", credits: "" }] })}><Icon n="plus" s={14} />Add a semester by hand</SmallBtn></div>
      </section>
    </div>
  </div>;
}

/* =============== exam prep =============== */
function examItems(e, units) {
  const c = courseById(e.course); const short = c ? c.short : (e.title || "Exam");
  const out = [];
  if (/lab|viva|practical/i.test(e.kind || "")) {
    out.push({ key: `${e.id}|lab1`, label: "Revise experiments: aim, formula, readings, result", hint: "One page per experiment", mins: 45 });
    out.push({ key: `${e.id}|lab2`, label: "Practise viva questions out loud", hint: "Ask a friend to quiz you", mins: 40 });
    out.push({ key: `${e.id}|lab3`, label: "Complete and check your lab record", hint: "Get pending signatures", mins: 40 });
  } else {
    const us = c ? (UNITS[c.id] || []) : []; const learn = [], rev = [];
    us.forEach((u, i) => {
      if (units[`${c.id}-${i}`]) rev.push({ key: `${e.id}|R${i}`, label: `Revise Unit ${i + 1} · ${u}`, hint: "Skim notes, then redo two examples from class", mins: 40 });
      else learn.push({ key: `${e.id}|L${i}`, label: `Study Unit ${i + 1} · ${u}`, hint: "Notes or a lecture video first, then 4–5 practice questions", mins: 90, unit: `${c.id}-${i}` });
    });
    if (!us.length) learn.push({ key: `${e.id}|G`, label: "Go through all your class notes", hint: "Circle anything you're unsure about", mins: 90 });
    if (e.kind === "Quiz") out.push(...learn.map(x => ({ ...x, mins: 45 })), ...rev.map(x => ({ ...x, mins: 25 })));
    else out.push(...learn, ...rev,
      { key: `${e.id}|S`, label: "Make a one-page formula and key-points sheet", hint: "You'll use it for the final revision", mins: 30 },
      { key: `${e.id}|P`, label: "Solve a previous year paper, timed", hint: "Check answers and note weak spots", mins: 75 });
  }
  return out.map(x => ({ ...x, examId: e.id, course: e.course, short }));
}
function schedulePlan(plan) {
  const exams = plan.examIds.map(id => EXAMS.find(x => x.id === id)).filter(Boolean);
  const days = {}; const overflow = [];
  if (!exams.length || !plan.start) return { days, overflow, exams };
  const byExam = {}; exams.forEach(e => { byExam[e.id] = plan.items.filter(x => x.examId === e.id); });
  const last = exams.reduce((a, e) => e.date > a ? e.date : a, plan.start);
  const used = {};
  const put = (d, it) => { (days[d] = days[d] || []).push(it); used[d] = (used[d] || 0) + it.mins; };
  exams.forEach(e => {
    const before = dISOFrom(e.date, -1);
    if (before >= plan.start) put(before, { key: `${e.id}|F`, label: "Final revision with your formula sheet and weak spots", hint: "Then sleep early", mins: 60, examId: e.id, course: e.course, short: (courseById(e.course) || {}).short || e.title, type: "final" });
    put(e.date, { key: `${e.id}|D`, label: `${e.title}${e.time ? " at " + e.time : ""}`, hint: "Light 30-minute recap, good breakfast, admit card, calculator, two pens", mins: 0, examId: e.id, course: e.course, short: (courseById(e.course) || {}).short || e.title, type: "examday" });
  });
  const queues = Object.fromEntries(exams.map(e => [e.id, byExam[e.id].slice()]));
  for (let d = plan.start; d < last; d = dISOFrom(d, 1)) {
    const dow = parseISO(d).getDay(); const cap = ((dow === 0 || dow === 6) ? +plan.hWe : +plan.hWd) * 60;
    let guard = 0;
    while ((used[d] || 0) < cap && guard++ < 40) {
      const cands = exams.filter(e => queues[e.id].length && e.date > d);
      if (!cands.length) break;
      const score = e => { const left = Math.max(1, Math.round((parseISO(e.date) - parseISO(d)) / 864e5)); return queues[e.id].reduce((a, x) => a + x.mins, 0) / left; };
      const pick = cands.sort((a, b) => score(b) - score(a))[0];
      const it = queues[pick.id][0];
      if ((used[d] || 0) > 0 && (used[d] || 0) + it.mins > cap + 20) break;
      queues[pick.id].shift(); put(d, it);
    }
  }
  exams.forEach(e => overflow.push(...queues[e.id]));
  Object.values(days).forEach(list => list.sort((a, b) => (a.type === "examday" ? -1 : 0) - (b.type === "examday" ? -1 : 0)));
  return { days, overflow, exams };
}
const dISOFrom = (iso, off) => { const d = parseISO(iso); d.setDate(d.getDate() + off); return isoOf(d); };
const fmtMins = m => m >= 60 ? `${Math.floor(m / 60)}h${m % 60 ? " " + (m % 60) + "m" : ""}` : `${m}m`;
function ExamPage() {
  const S = useStore();
  const { examPlan: plan, setExamPlan, examDone, setExamDone, units, setUnits, todos, setTodos, notify, go } = S;
  const today = todayISO();
  const upcoming = EXAMS.filter(x => daysUntil(x.date) >= 0).sort((a, b) => a.date.localeCompare(b.date));
  const firstDate = upcoming[0] && upcoming[0].date;
  const defaultSel = upcoming.filter(x => firstDate && daysUntil(x.date) - daysUntil(firstDate) <= 21).map(x => x.id);
  const [sel, setSel] = useState(plan.examIds.length ? plan.examIds.filter(id => upcoming.some(x => x.id === id)) : defaultSel);
  const [hWd, setHWd] = useState(plan.hWd); const [hWe, setHWe] = useState(plan.hWe);
  const sched = useMemo(() => plan.start && plan.items.length ? schedulePlan(plan) : null, [plan, EXAMS]);
  const make = e => {
    const chosen = sel.map(id => EXAMS.find(x => x.id === id)).filter(Boolean);
    const items = chosen.flatMap(x => examItems(x, units)).filter(x => !examDone[x.key]);
    setExamPlan({ start: today, hWd, hWe, examIds: chosen.map(x => x.id), items });
    celebrate(e.currentTarget); notify("Your plan is ready ♡");
  };
  const toggle = (it, el) => {
    const on = !examDone[it.key]; if (on) celebrate(el);
    setExamDone({ ...examDone, [it.key]: on });
    if (on && it.unit) setUnits({ ...units, [it.unit]: true });
  };
  const todayList = sched ? [...Object.keys(sched.days).filter(d => d < today).flatMap(d => sched.days[d].filter(x => x.type !== "examday" && !examDone[x.key]).map(x => ({ ...x, catch: true }))), ...(sched.days[today] || [])] : [];
  const addToTodos = () => {
    const have = new Set(todos.map(t => t.text));
    const add = todayList.filter(x => x.type !== "examday" && !examDone[x.key]).map(x => `${x.short}: ${x.label}`).filter(t => !have.has(t)).map(text => ({ id: uid(), text, date: today, from: today, due: false, done: false }));
    setTodos([...todos, ...add]); notify(add.length ? `${add.length} added to today's to-dos` : "Already on your to-dos");
  };
  const total = sched ? Object.values(sched.days).flat().filter(x => x.type !== "examday").length : 0;
  const doneN = sched ? Object.values(sched.days).flat().filter(x => x.type !== "examday" && examDone[x.key]).length : 0;
  const Item = ({ it }) => it.type === "examday" ? <div className="plan-item"><Icon n="cap" s={16} style={{ color: "var(--warn)", marginTop: 2 }} /><div className="grow"><b>{it.label}</b><small>{it.hint}</small></div></div>
    : <div className={`plan-item ${examDone[it.key] ? "is-done" : ""}`}><Check on={!!examDone[it.key]} label={it.label} onChange={e => toggle(it, e.currentTarget)} />
      <div className="grow"><b className="done-text">{it.short}: {it.label}</b><small>{it.hint} · {fmtMins(it.mins)}{it.catch ? " · catch-up" : ""}</small></div></div>;
  const TIPS = ["Start each session with 10 minutes of recalling the last one from memory", "Do the hardest unit when you feel freshest, usually mornings",
    "Swap one scrolling break for a 10-minute walk", "Explain a tricky concept out loud as if teaching a friend", "Keep 7–8 hours of sleep. Late nights cost more marks than they add",
    "Pack admit card, calculator and pens the night before each exam"];
  return <div className="page">
    <div className="page-head"><div><p className="eyebrow">Exam prep</p><h1>Your study plan</h1><p>Pick the exams, say how many hours you can study, and the plan spreads your unfinished units, revision and past papers across the days left. Unfinished blocks roll into the next day.</p></div>
      <SmallBtn onClick={() => { SETUP_TAB = "exams"; go("setup"); }}><Icon n="calendar" s={15} />Edit exam dates</SmallBtn></div>
    <section className="card list-gap">
      <h2>Which exams?</h2>
      {!upcoming.length ? <div className="empty">No upcoming exams. Add tentative dates in Setup, even rough ones are fine.</div>
        : <div className="mood-pick">{upcoming.map(x => <button key={x.id} className={sel.includes(x.id) ? "on" : ""} aria-pressed={sel.includes(x.id)} onClick={() => setSel(sel.includes(x.id) ? sel.filter(y => y !== x.id) : [...sel, x.id])}>
          {x.title} · {fmtDay(x.date)}{x.tentative ? " (tentative)" : ""}</button>)}</div>}
      <div className="edit-grid">
        <label className="field">Study hours on weekdays: {hWd}<input type="range" min="1" max="8" value={hWd} onChange={e => setHWd(+e.target.value)} /></label>
        <label className="field">Study hours on weekends: {hWe}<input type="range" min="1" max="10" value={hWe} onChange={e => setHWe(+e.target.value)} /></label>
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button className="btn primary" disabled={!sel.length} onClick={make}><Icon n="sparkle" s={16} />{plan.start ? "Re-plan from today" : "Make my plan"}</button>
        {plan.start && <SmallBtn onClick={() => setExamPlan(DEFAULT_PLAN)}>Stop exam mode</SmallBtn>}
      </div>
      <p className="card-note">Units you've ticked in Academics become quick revision. Ticking a “Study Unit” block ticks that unit in your syllabus too.</p>
    </section>
    {sched && <>
      <div className="kpis">
        {sched.exams.map(x => <div key={x.id} className="kpi"><small>{x.title}</small><b className="num">{daysUntil(x.date) <= 0 ? (daysUntil(x.date) === 0 ? "Today" : "Done") : daysUntil(x.date) + "d"}</b><em>{fmtDay(x.date)}{x.tentative ? " · tentative" : ""}</em></div>)}
        <div className="kpi"><small>Plan progress</small><b className="num">{total ? Math.round(doneN / total * 100) : 0}%</b><em>{doneN} of {total} blocks</em></div>
      </div>
      {sched.overflow.length > 0 && <div className="missed"><b style={{ color: "var(--warn)" }}>{sched.overflow.length} blocks don't fit before the exams</b>
        <span className="card-note">Add an hour a day, or focus on these first: {sched.overflow.slice(0, 4).map(x => `${x.short} ${x.label.replace(/^Study /, "")}`).join("; ")}.</span></div>}
      <div className="grid2">
        <section className="card">
          <div className="card-h"><Icon n="target" style={{ color: "var(--pink-3)" }} /><h2 className="grow">Today</h2><SmallBtn onClick={addToTodos}>Add to my to-dos</SmallBtn></div>
          {todayList.length ? todayList.map(it => <Item key={it.key} it={it} />) : <div className="empty">Nothing planned today. Rest is part of the plan ♡</div>}
        </section>
        <section className="card">
          <div className="card-h"><Icon n="heart" style={{ color: "var(--sage-3)" }} /><h2 className="grow">Things that help</h2></div>
          <ul className="summary" style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>{TIPS.map(t => <li key={t} style={{ display: "flex", gap: 10 }}><Icon n="leaf" s={15} style={{ color: "var(--sage-3)", flex: "none", marginTop: 3 }} />{t}</li>)}</ul>
        </section>
      </div>
      <section className="card">
        <div className="card-h"><h2 className="grow">Day by day</h2></div>
        <div className="day-plan">{Object.keys(sched.days).filter(d => d > today).sort().map(d => { const list = sched.days[d]; const exam = list.some(x => x.type === "examday"); const mins = list.reduce((a, x) => a + x.mins, 0);
          return <div key={d} className={`plan-day ${exam ? "exam" : ""}`}><h3>{parseISO(d).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "short" })}<span className="pill">{exam ? "Exam day" : fmtMins(mins)}</span></h3>{list.map(it => <Item key={it.key} it={it} />)}</div>; })}</div>
      </section>
    </>}
  </div>;
}

/* =============== coding =============== */
function codeStreak(problems) {
  const days = new Set(problems.map(p => p.date)); let cur = 0, d = todayISO();
  if (!days.has(d)) d = dISOFrom(d, -1);
  while (days.has(d)) { cur++; d = dISOFrom(d, -1); }
  const sorted = [...days].sort(); let best = 0, run = 0, prev = null;
  sorted.forEach(x => { run = prev && dISOFrom(prev, 1) === x ? run + 1 : 1; best = Math.max(best, run); prev = x; });
  return { cur, best };
}
function CodePage() {
  const { code, setCode, notify } = useStore();
  const c = { ...DEFAULT_CODE, ...code };
  const [f, setF] = useState({ title: "", platform: "LeetCode", diff: "Easy", topic: "arrays", link: "", note: "" });
  const today = todayISO();
  const todayN = c.problems.filter(p => p.date === today).length;
  const st = codeStreak(c.problems);
  const log = e => {
    e.preventDefault(); if (!f.title.trim()) return;
    setCode({ ...c, problems: [{ id: uid(), ...f, title: f.title.trim(), date: today }, ...c.problems] });
    if (todayN + 1 === +c.goal) { celebrate(e.currentTarget.querySelector("button[type=submit]")); notify("Daily goal done ♡"); } else notify("Logged ♡");
    setF({ ...f, title: "", link: "", note: "" });
  };
  const counts = {}; c.problems.forEach(p => { counts[p.date] = (counts[p.date] || 0) + 1; });
  const weeks = 18; const start = dISOFrom(today, -(weeks * 7 - 1) - new Date().getDay());
  const cells = Array.from({ length: weeks * 7 }, (_, i) => dISOFrom(start, i));
  const byDiff = ["Easy", "Medium", "Hard"].map(d => [d, c.problems.filter(p => p.diff === d).length]);
  return <div className="page">
    <div className="page-head"><div><p className="eyebrow">Consistency beats intensity</p><h1>Coding practice</h1><p>Log each problem you solve. A small daily habit from first year adds up to placement-ready by third year.</p></div></div>
    <div className="kpis">
      <div className="kpi"><small>Current streak</small><b className="num"><Icon n="fire" s={22} style={{ color: "var(--pink-3)", verticalAlign: -2 }} /> {st.cur}</b><em>best {st.best} days</em></div>
      <div className="kpi"><small>Today</small><b className="num">{todayN}/{c.goal}</b><em><label>daily goal <input className="input mini" style={{ height: 26, width: 50, display: "inline-block" }} type="number" min="1" max="20" value={c.goal} onChange={e => setCode({ ...c, goal: Math.max(1, +e.target.value || 1) })} aria-label="Daily goal" /></label></em></div>
      <div className="kpi"><small>Total solved</small><b className="num">{c.problems.length}</b><em>{byDiff.map(([d, n]) => `${n} ${d.toLowerCase()}`).join(" · ")}</em></div>
    </div>
    <div className="grid2">
      <section className="card">
        <div className="card-h"><h2 className="grow">Log a problem</h2></div>
        <form className="list-gap" onSubmit={log}>
          <input id="cp-title" className="input" placeholder="Problem name, e.g. Two Sum" value={f.title} onChange={e => setF({ ...f, title: e.target.value })} />
          <div className="edit-grid">
            <label className="field">Platform<select className="input" value={f.platform} onChange={e => setF({ ...f, platform: e.target.value })}>{["LeetCode", "GeeksforGeeks", "CodeChef", "Codeforces", "HackerRank", "Class / lab", "Other"].map(x => <option key={x}>{x}</option>)}</select></label>
            <label className="field">Topic<select className="input" value={f.topic} onChange={e => setF({ ...f, topic: e.target.value })}>{ROADMAP.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}</select></label>
          </div>
          <div className="seg" style={{ alignSelf: "flex-start" }}>{["Easy", "Medium", "Hard"].map(d => <button type="button" key={d} className={f.diff === d ? "on" : ""} onClick={() => setF({ ...f, diff: d })}>{d}</button>)}</div>
          <input className="input" placeholder="Link (optional)" value={f.link} onChange={e => setF({ ...f, link: e.target.value })} />
          <input className="input" placeholder="What did you learn? (optional)" value={f.note} onChange={e => setF({ ...f, note: e.target.value })} />
          <div><button type="submit" className="btn primary"><Icon n="plus" s={16} />Log it</button></div>
        </form>
      </section>
      <section className="card">
        <div className="card-h"><h2 className="grow">Last {weeks} weeks</h2></div>
        <div className="heat" aria-label="Practice heatmap">{cells.map(d => { const n = counts[d] || 0; return <i key={d} title={`${fmtDay(d)}: ${n}`} style={d > today ? { opacity: .25 } : n ? { background: `color-mix(in srgb, var(--sage-3) ${Math.min(100, 30 + n * 22)}%, var(--latte-2))` } : null}></i>; })}</div>
        <p className="caption">Each square is a day. Darker means more problems.</p>
      </section>
    </div>
    <section className="card">
      <div className="card-h"><h2 className="grow">DSA roadmap</h2><span className="muted" style={{ fontSize: 13 }}>Top to bottom is a good order</span></div>
      <div className="grid2" style={{ gap: "4px 28px" }}>{ROADMAP.map(t => { const n = c.problems.filter(p => p.topic === t.id).length; return <div key={t.id} className={`unit ${c.comfy[t.id] ? "is-done" : ""}`}>
        <Check on={!!c.comfy[t.id]} label={`Comfortable with ${t.name}`} onChange={() => setCode({ ...c, comfy: { ...c.comfy, [t.id]: !c.comfy[t.id] } })} />
        <span style={{ flex: 1 }} className="done-text">{t.name}</span>
        <span style={{ width: 90 }}><div className="mini-bar" style={{ margin: 0 }}><i style={{ width: `${Math.min(100, n / t.target * 100)}%`, background: "var(--sage-3)" }}></i></div></span>
        <span className="num muted" style={{ fontSize: 12.5, width: 42, textAlign: "right" }}>{n}/{t.target}</span></div>; })}</div>
    </section>
    <section className="card">
      <div className="card-h"><h2 className="grow">Recent</h2></div>
      {!c.problems.length && <div className="empty">Your first problem goes here. Start with an easy one tomorrow ♡</div>}
      {c.problems.slice(0, 15).map(p => <div key={p.id} className="txn">
        <span className="ic" style={{ background: "var(--sage-2)", color: "var(--sage-3)" }}><Icon n="code" /></span>
        <div className="grow"><b>{p.link ? <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>{p.title}</a> : p.title}</b><span className="muted" style={{ fontSize: 13 }}>{p.platform} · {(ROADMAP.find(t => t.id === p.topic) || {}).name} · {fmtDay(p.date)}{p.note ? ` · ${p.note}` : ""}</span></div>
        <span className={`pill ${p.diff === "Hard" ? "warn" : p.diff === "Easy" ? "ok" : ""}`}>{p.diff}</span>
        <button className="icon-btn" aria-label={`Delete ${p.title}`} onClick={() => setCode({ ...c, problems: c.problems.filter(x => x.id !== p.id) })}><Icon n="trash" s={15} /></button>
      </div>)}
    </section>
  </div>;
}

/* =============== wellness =============== */
function sleepHours(s) { if (!s || !s.bed || !s.wake) return 0; let m = toMin(s.wake) - toMin(s.bed); if (m <= 0) m += 1440; return m / 60; }
const fmtHrs = h => `${Math.floor(h)}h ${pad(Math.round((h % 1) * 60))}m`;
function cycleInfo(cy) {
  const ps = (cy.periods || []).filter(p => p.start).slice().sort((a, b) => a.start.localeCompare(b.start));
  if (!ps.length) return { day: null, avgCycle: 28, avgLen: 5, next: null, phase: "", ps };
  const gaps = []; for (let i = 1; i < ps.length; i++) gaps.push(Math.round((parseISO(ps[i].start) - parseISO(ps[i - 1].start)) / 864e5));
  const good = gaps.filter(g => g >= 18 && g <= 45).slice(-6);
  const avgCycle = good.length ? Math.round(good.reduce((a, b) => a + b, 0) / good.length) : 28;
  const lens = ps.filter(p => p.end).map(p => Math.round((parseISO(p.end) - parseISO(p.start)) / 864e5) + 1).filter(x => x > 0 && x < 12).slice(-6);
  const avgLen = lens.length ? Math.round(lens.reduce((a, b) => a + b, 0) / lens.length) : 5;
  const last = ps[ps.length - 1];
  const day = Math.round((startToday() - parseISO(last.start)) / 864e5) + 1;
  let next = dISOFrom(last.start, avgCycle); while (next < todayISO() && day > avgCycle + 10) next = dISOFrom(next, avgCycle);
  const ovu = avgCycle - 14;
  const onPeriod = !last.end ? day <= 10 : todayISO() <= last.end;
  const phase = onPeriod ? "Period" : day < ovu - 2 ? "Follicular" : day <= ovu + 1 ? "Ovulation window" : day <= avgCycle ? "Luteal" : "Period may be late";
  return { day, avgCycle, avgLen, next, phase, ps, last, onPeriod, ovu };
}
const PHASE_TIPS = {
  "Period": "Go gentle: warm water, a hot-water bag for cramps, iron-rich food like dal, spinach and jaggery.",
  "Follicular": "Energy usually rises now, a good time for tough topics and new habits.",
  "Ovulation window": "Often a high-energy, social stretch. Great for presentations and group work.",
  "Luteal": "You might feel slower or moodier. Plan lighter evenings and keep snacks handy.",
  "Period may be late": "Cycles shift with stress, travel and sleep. If it's often late or you're worried, talk to a doctor.",
};
const SYMPTOMS = ["Cramps", "Headache", "Bloating", "Acne", "Tender", "Low mood", "Tired", "Cravings", "Back pain"];
function WellnessPage() {
  const { waterLog, setWaterLog, sleepLog, setSleepLog, cycle, setCycle, profile, setProfile, notify } = useStore();
  const today = todayISO(), goal = profile.waterGoal || 8, n = waterLog[today] || 0;
  const [sl, setSl] = useState(sleepLog[today] || { bed: "23:00", wake: "06:45", feel: "okay" });
  const week = pastDays(7);
  const lbl = d => d === today ? "Today" : DAY_SHORT[parseISO(d).getDay()];
  const sleepWeek = week.map(d => ({ label: lbl(d), value: Math.round(sleepHours(sleepLog[d]) * 10) / 10 }));
  const logged = sleepWeek.filter(x => x.value > 0);
  const avgSleep = logged.length ? logged.reduce((a, x) => a + x.value, 0) / logged.length : 0;
  const cy = cycleInfo(cycle);
  const tLog = (cycle.logs || {})[today] || {};
  const setLog = patch => setCycle({ ...cycle, logs: { ...(cycle.logs || {}), [today]: { ...tLog, ...patch } } });
  const [past, setPast] = useState({ start: "", end: "" });
  const strip = Array.from({ length: 35 }, (_, i) => dISOFrom(today, i - 14));
  const isPer = d => cy.ps.some(p => d >= p.start && d <= (p.end || (p === cy.last ? dISOFrom(p.start, cy.avgLen - 1) : p.start)));
  const isPred = d => cy.next && d >= cy.next && d <= dISOFrom(cy.next, cy.avgLen - 1) && !isPer(d);
  const isFert = d => cy.last && (() => { const k = Math.round((parseISO(d) - parseISO(cy.last.start)) / 864e5) + 1; return k >= cy.ovu - 4 && k <= cy.ovu + 1; })();
  return <div className="page">
    <div className="page-head"><div><p className="eyebrow">Take care of you</p><h1>Wellness</h1><p>Small check-ins, no judging. Everything here is private to you.</p></div></div>
    <div className="grid2">
      <section className="card">
        <div className="card-h"><Icon n="drop" style={{ color: "var(--sage-3)" }} /><h2 className="grow">Water</h2></div>
        <div style={{ display: "flex", gap: 22, alignItems: "center", flexWrap: "wrap" }}>
          <div className="glass" aria-hidden="true"><i style={{ height: `${Math.min(100, n / goal * 100)}%` }}></i></div>
          <div className="list-gap" style={{ flex: 1, minWidth: 160 }}>
            <span className="big-num num">{n}<span className="muted" style={{ fontSize: 20 }}> / {goal} glasses</span></span>
            <span className="muted" style={{ fontSize: 13.5 }}>{n >= goal ? "Goal reached, well done ♡" : `${goal - n} to go · about ${(n * 0.25).toFixed(2)} L so far`}</span>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn primary" onClick={e => { if (n + 1 === goal) celebrate(e.currentTarget); setWaterLog({ ...waterLog, [today]: n + 1 }); }}><Icon n="plus" s={16} />A glass</button>
              <button className="btn soft" disabled={!n} onClick={() => setWaterLog({ ...waterLog, [today]: Math.max(0, n - 1) })}>Undo</button></div>
            <label className="field">Daily goal: {goal} glasses<input type="range" min="4" max="14" value={goal} onChange={e => setProfile({ ...profile, waterGoal: +e.target.value })} /></label>
          </div>
        </div>
        <div style={{ marginTop: 16 }}><VBars data={week.map(d => ({ label: lbl(d), value: waterLog[d] || 0 }))} max={Math.max(goal, ...week.map(d => waterLog[d] || 0))} color="var(--sage-3)" /></div>
      </section>
      <section className="card">
        <div className="card-h"><Icon n="moon" style={{ color: "var(--mocha)" }} /><h2 className="grow">Sleep</h2>{avgSleep > 0 && <span className="pill">avg {fmtHrs(avgSleep)}</span>}</div>
        <p className="eyebrow" style={{ marginBottom: 8 }}>Last night</p>
        <div className="edit-grid">
          <label className="field">Went to bed<input className="input" type="time" value={sl.bed} onChange={e => setSl({ ...sl, bed: e.target.value })} /></label>
          <label className="field">Woke up<input className="input" type="time" value={sl.wake} onChange={e => setSl({ ...sl, wake: e.target.value })} /></label>
        </div>
        <div className="seg" style={{ margin: "12px 0" }}>{[["rested", "Rested"], ["okay", "Okay"], ["tired", "Tired"]].map(([k, l]) => <button key={k} className={sl.feel === k ? "on" : ""} onClick={() => setSl({ ...sl, feel: k })}>{l}</button>)}</div>
        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <button className="btn primary" onClick={e => { setSleepLog({ ...sleepLog, [today]: sl }); if (sleepHours(sl) >= 7) celebrate(e.currentTarget); notify(`Logged ${fmtHrs(sleepHours(sl))} of sleep`); }}><Icon n="check" s={16} />{sleepLog[today] ? "Update" : "Save"} · {fmtHrs(sleepHours(sl))}</button>
          {sleepHours(sl) < 7 && <span className="card-note">Under 7 hours. An early night tonight would help.</span>}
        </div>
        <div style={{ marginTop: 16 }}><VBars data={sleepWeek} max={10} color="var(--mocha)" /></div>
      </section>
    </div>
    {profile.cycle !== false ? <section className="card list-gap">
      <div className="card-h" style={{ marginBottom: 0 }}><Icon n="sparkle" style={{ color: "var(--pink-3)" }} /><h2 className="grow">Cycle</h2>
        <SmallBtn onClick={() => setProfile({ ...profile, cycle: false })}>Hide</SmallBtn></div>
      {cy.day ? <div className="kpis">
        <div className="kpi"><small>Cycle day</small><b className="num">{cy.day}</b><em>{cy.phase}</em></div>
        <div className="kpi"><small>Next period, around</small><b className="num" style={{ fontSize: 24 }}>{cy.next ? fmtDay(cy.next) : "—"}</b><em>{cy.next ? (daysUntil(cy.next) > 0 ? `in ${daysUntil(cy.next)} days` : daysUntil(cy.next) === 0 ? "today" : `${-daysUntil(cy.next)} days ago`) : ""}</em></div>
        <div className="kpi"><small>Your averages</small><b className="num" style={{ fontSize: 24 }}>{cy.avgCycle}d · {cy.avgLen}d</b><em>cycle · period{cy.ps.length < 3 ? " · improves as you log" : ""}</em></div>
      </div> : <p className="card-note">Log when your period starts and the tracker learns your cycle. Adding a couple of past periods makes predictions better straight away.</p>}
      {cy.phase && PHASE_TIPS[cy.phase] && <p style={{ fontSize: 14.5 }}><Icon n="leaf" s={14} style={{ color: "var(--sage-3)", verticalAlign: -2 }} /> {PHASE_TIPS[cy.phase]}</p>}
      <div className="strip" aria-label="Cycle calendar">{strip.map(d => <span key={d} className={[isPer(d) && "per", isPred(d) && "pred", !isPer(d) && !isPred(d) && isFert(d) && "fert", d === today && "today"].filter(Boolean).join(" ")} title={fmtDay(d)}><small>{DAY_SHORT[parseISO(d).getDay()][0]}</small>{parseISO(d).getDate()}</span>)}</div>
      <div className="legend" style={{ marginTop: 0 }}><span><i style={{ background: "var(--pink)" }}></i>Period</span><span><i style={{ border: "1.5px dashed var(--pink-3)" }}></i>Predicted</span><span><i style={{ background: "var(--sage-2)" }}></i>Likely fertile days</span></div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {!cy.onPeriod ? <button className="btn primary" onClick={() => { setCycle({ ...cycle, periods: [...(cycle.periods || []), { id: uid(), start: today, end: "" }] }); notify("Logged. Be gentle with yourself today ♡"); }}>My period started today</button>
          : <button className="btn primary" onClick={() => setCycle({ ...cycle, periods: cycle.periods.map(p => p.id === cy.last.id ? { ...p, end: today } : p) })}>My period ended today</button>}
      </div>
      {cy.onPeriod && <div className="field">Flow today<div className="seg" style={{ alignSelf: "flex-start" }}>{["Spotting", "Light", "Medium", "Heavy"].map(fl => <button key={fl} className={tLog.flow === fl ? "on" : ""} onClick={() => setLog({ flow: tLog.flow === fl ? "" : fl })}>{fl}</button>)}</div></div>}
      <div className="field">How's your body today?<div className="mood-pick">{SYMPTOMS.map(sy => { const on = (tLog.sym || []).includes(sy); return <button key={sy} className={on ? "on" : ""} aria-pressed={on} onClick={() => setLog({ sym: on ? tLog.sym.filter(x => x !== sy) : [...(tLog.sym || []), sy] })}>{sy}</button>; })}</div></div>
      <details><summary style={{ cursor: "pointer", fontWeight: 700, color: "var(--muted)" }}>Add a past period</summary>
        <div className="row-edit" style={{ marginTop: 10 }}>
          <label className="field">Started<input className="input" type="date" max={today} value={past.start} onChange={e => setPast({ ...past, start: e.target.value })} /></label>
          <label className="field">Ended<input className="input" type="date" max={today} value={past.end} onChange={e => setPast({ ...past, end: e.target.value })} /></label>
          <button className="btn primary" style={{ height: 44 }} disabled={!past.start || (past.end && past.end < past.start)} onClick={() => { setCycle({ ...cycle, periods: [...(cycle.periods || []), { id: uid(), ...past }] }); setPast({ start: "", end: "" }); notify("Added"); }}>Add</button>
        </div>
        {cy.ps.length > 0 && <div style={{ marginTop: 10 }}>{cy.ps.slice().reverse().map(p => <div key={p.id || p.start} className="check-row" style={{ justifyContent: "space-between", fontWeight: 500 }}><span>{fmtDay(p.start)} – {p.end ? fmtDay(p.end) : "ongoing"}</span>
          <button className="icon-btn" aria-label="Remove" onClick={() => setCycle({ ...cycle, periods: cycle.periods.filter(x => x !== p && x.id !== p.id) })}><Icon n="trash" s={14} /></button></div>)}</div>}
      </details>
      <p className="card-note">Predictions are estimates from your own history. They aren't medical advice or a form of contraception. If something feels off, talk to a doctor.</p>
    </section> : <section className="card"><div className="toggle">Cycle tracker is hidden<SmallBtn onClick={() => setProfile({ ...profile, cycle: true })}>Show it</SmallBtn></div></section>}
  </div>;
}

/* =============== mess menu =============== */
function MessPage() {
  const { mess, setMess } = useStore();
  const [edit, setEdit] = useState(null);
  const dow = new Date().getDay(), today = todayISO(), nowM = new Date().getHours() * 60 + new Date().getMinutes();
  const m = mess.menu[dow] || {};
  const setCell = (d, k, v) => setMess({ ...mess, sample: false, menu: { ...mess.menu, [d]: { ...(mess.menu[d] || {}), [k]: v } } });
  const rate = (k, v) => setMess({ ...mess, ratings: { ...mess.ratings, [`${today}|${k}`]: mess.ratings[`${today}|${k}`] === v ? 0 : v } });
  const loved = {}; Object.entries(mess.ratings || {}).forEach(([key, v]) => { if (v === 3) { const [d, k] = key.split("|"); const dd = parseISO(d).getDay(); const dish = (mess.menu[dd] || {})[k]; if (dish) loved[dish] = (loved[dish] || 0) + 1; } });
  const fav = Object.entries(loved).sort((a, b) => b[1] - a[1]).slice(0, 3);
  return <div className="page">
    <div className="page-head"><div><p className="eyebrow">{DAY_LONG[dow]}</p><h1>Mess menu</h1><p>{mess.sample ? "This is a sample menu. Tap any meal in the week below to change it to your mess's real one." : "Tap any meal in the week to change it."}</p></div></div>
    <div className="grid2">
      <section className="card list-gap">
        <h2>Today</h2>
        {MEALS.map(([k, label]) => { const [a, b] = mess.times[k]; const now = nowM >= toMin(a) && nowM <= toMin(b); const r = mess.ratings[`${today}|${k}`] || 0;
          return <div key={k} className={`meal ${now ? "now" : ""}`}>
            <span className="ic" style={{ width: 38, height: 38, borderRadius: 12, background: "var(--paper)", display: "grid", placeItems: "center", color: "var(--mocha)", flex: "none" }}><Icon n={k === "s" ? "coffee" : "food"} s={18} /></span>
            <div className="grow"><b>{label} {now && <span className="now-chip">Now</span>}</b><span className="muted" style={{ fontSize: 12.5 }}>{fmt12(a)} – {fmt12(b)}</span>
              <p style={{ marginTop: 4 }}>{m[k] || "Not added yet"}</p>
              <div className="rate">{[[3, "Loved it"], [2, "Okay"], [1, "Skipped"]].map(([v, l]) => <button key={v} className={r === v ? "on" : ""} onClick={() => rate(k, v)}>{l}</button>)}</div></div>
          </div>; })}
      </section>
      <section className="card list-gap">
        <h2>Meal times</h2>
        {MEALS.map(([k, label]) => <div key={k} className="row-edit" style={{ gridTemplateColumns: "90px 1fr 1fr" }}><b style={{ alignSelf: "center" }}>{label}</b>
          <input className="input" type="time" value={mess.times[k][0]} aria-label={`${label} starts`} onChange={e => setMess({ ...mess, times: { ...mess.times, [k]: [e.target.value, mess.times[k][1]] } })} />
          <input className="input" type="time" value={mess.times[k][1]} aria-label={`${label} ends`} onChange={e => setMess({ ...mess, times: { ...mess.times, [k]: [mess.times[k][0], e.target.value] } })} /></div>)}
        {fav.length > 0 && <><h3>Your favourites</h3>{fav.map(([dish, n]) => <p key={dish} style={{ fontSize: 14 }}><Icon n="heart" s={13} style={{ color: "var(--pink-3)", verticalAlign: -1 }} /> {dish} <span className="muted">· loved {n}×</span></p>)}</>}
      </section>
    </div>
    <section className="card">
      <div className="card-h"><h2 className="grow">This week</h2></div>
      <div className="table-wrap"><table className="menu-table">
        <thead><tr><th></th>{WEEK_ORDER.map(d => <th key={d} className={d === dow ? "today" : ""}>{DAY_SHORT[d]}</th>)}</tr></thead>
        <tbody>{MEALS.map(([k, label]) => <tr key={k}><td style={{ cursor: "default" }}><b>{label}</b></td>
          {WEEK_ORDER.map(d => { const id = `${d}-${k}`; return <td key={d} className={d === dow ? "today" : ""} onClick={() => setEdit(id)}>
            {edit === id ? <textarea autoFocus value={(mess.menu[d] || {})[k] || ""} onChange={e => setCell(d, k, e.target.value)} onBlur={() => setEdit(null)} aria-label={`${DAY_SHORT[d]} ${label}`} />
              : <span style={{ fontSize: 13 }}>{(mess.menu[d] || {})[k] || <span className="muted">+ add</span>}</span>}</td>; })}</tr>)}</tbody>
      </table></div>
    </section>
  </div>;
}

/* =============== portfolio =============== */
function PortfolioPage() {
  const { portfolio, setPortfolio, notify } = useStore();
  const pf = { ...EMPTY_PORTFOLIO, ...portfolio };
  const [proj, setProj] = useState(null);
  const [sk, setSk] = useState({ name: "", cat: "Languages" });
  const [win, setWin] = useState(null);
  const set = patch => setPortfolio({ ...pf, ...patch });
  const saveProj = () => {
    if (!proj.title.trim()) return;
    const clean = { ...proj, title: proj.title.trim(), stack: typeof proj.stack === "string" ? proj.stack.split(",").map(x => x.trim()).filter(Boolean) : proj.stack };
    set({ projects: proj.id ? pf.projects.map(p => p.id === proj.id ? clean : p) : [{ ...clean, id: uid() }, ...pf.projects] }); setProj(null); notify("Project saved ♡");
  };
  const resume = () => [
    "PROJECTS", ...pf.projects.map(p => `• ${p.title}${p.stack && p.stack.length ? " (" + p.stack.join(", ") + ")" : ""}: ${p.line || p.desc || ""}${p.github ? " · " + p.github : ""}`),
    "", "SKILLS", ...["Languages", "Tools", "Core CS", "People skills"].map(c => { const l = pf.skills.filter(s => s.cat === c).map(s => s.name); return l.length ? `${c}: ${l.join(", ")}` : null; }).filter(Boolean),
    "", "ACHIEVEMENTS", ...pf.wins.map(w => `• ${w.title}${w.org ? ", " + w.org : ""}${w.date ? " (" + w.date + ")" : ""}`),
  ].join("\n");
  const copy = async () => { try { await navigator.clipboard.writeText(resume()); notify("Copied. Paste it into your resume"); } catch (e) { notify("Couldn't copy here"); } };
  const IDEAS = ["A C program that manages your hostel expenses", "Your “mess menu + ratings” app idea", "A personal website with your projects", "A quiz game in C for your SDF lab"];
  return <div className="page">
    <div className="page-head"><div><p className="eyebrow">Your story, as it happens</p><h1>Projects & skills</h1><p>Add things as you do them. By internship season, your resume is already written.</p></div>
      <SmallBtn onClick={copy}><Icon n="copy" s={15} />Copy for my resume</SmallBtn></div>
    <section>
      <div className="card-h"><h2 className="grow">Projects</h2><button className="btn primary" onClick={() => setProj({ title: "", line: "", desc: "", stack: "", status: "Idea", github: "", demo: "", start: todayISO().slice(0, 7) })}><Icon n="plus" s={16} />Add a project</button></div>
      {!pf.projects.length && <div className="empty">Nothing yet. Ideas to start: {IDEAS.join(" · ")}.</div>}
      <div className="hubs">{pf.projects.map(p => <section key={p.id} className="card proj">
        <div className="top"><div className="grow"><h3>{p.title}</h3><p className="muted" style={{ fontSize: 13.5 }}>{p.line}</p></div><span className={`pill ${p.status === "Done" ? "ok" : ""}`}>{p.status}</span></div>
        {p.desc && <p style={{ fontSize: 14 }}>{p.desc}</p>}
        {p.stack && p.stack.length > 0 && <div className="stack">{p.stack.map(t => <span key={t}>{t}</span>)}</div>}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          {p.github && <a className="nb" href={p.github} target="_blank" rel="noopener noreferrer"><Icon n="code" s={14} />Code</a>}
          {p.demo && <a className="nb" href={p.demo} target="_blank" rel="noopener noreferrer"><Icon n="external" s={14} />Live</a>}
          <span style={{ marginLeft: "auto" }}><button className="icon-btn" aria-label={`Edit ${p.title}`} onClick={() => setProj({ ...p, stack: (p.stack || []).join(", ") })}><Icon n="pencil" s={15} /></button></span>
        </div>
      </section>)}</div>
    </section>
    <div className="grid2">
      <section className="card">
        <div className="card-h"><h2 className="grow">Skills</h2></div>
        {pf.skills.map(k => <div key={k.id} className="skill">
          <span style={{ flex: 1, fontWeight: 600 }}>{k.name} <span className="muted" style={{ fontSize: 12, fontWeight: 500 }}>· {k.cat}</span></span>
          <span className="dots5" aria-label={`Level ${k.level} of 5`}>{[1, 2, 3, 4, 5].map(l => <button key={l} className={l <= k.level ? "on" : ""} aria-label={`Level ${l}`} onClick={() => set({ skills: pf.skills.map(x => x.id === k.id ? { ...x, level: l } : x) })}></button>)}</span>
          <button className="icon-btn" aria-label={`Remove ${k.name}`} onClick={() => set({ skills: pf.skills.filter(x => x.id !== k.id) })}><Icon n="x" s={14} /></button>
        </div>)}
        <form className="todo-add" style={{ marginTop: 12 }} onSubmit={e => { e.preventDefault(); if (!sk.name.trim()) return; set({ skills: [...pf.skills, { id: uid(), name: sk.name.trim(), cat: sk.cat, level: 1 }] }); setSk({ ...sk, name: "" }); }}>
          <input className="input" placeholder="Add a skill, e.g. Python" value={sk.name} onChange={e => setSk({ ...sk, name: e.target.value })} />
          <select className="input" style={{ width: "auto", borderRadius: 999 }} value={sk.cat} onChange={e => setSk({ ...sk, cat: e.target.value })} aria-label="Category">{["Languages", "Tools", "Core CS", "People skills"].map(c => <option key={c}>{c}</option>)}</select>
          <button className="btn primary" type="submit" style={{ height: 44 }} aria-label="Add skill"><Icon n="plus" s={16} /></button>
        </form>
      </section>
      <section className="card">
        <div className="card-h"><h2 className="grow">Achievements & certificates</h2><SmallBtn onClick={() => setWin({ title: "", type: "Hackathon", org: "", date: todayISO().slice(0, 7), link: "" })}><Icon n="plus" s={14} />Add</SmallBtn></div>
        {!pf.wins.length && <div className="empty">Hackathons, club roles, courses and certificates go here.</div>}
        {pf.wins.map(w => <div key={w.id} className="txn">
          <span className="ic" style={{ background: "var(--pink-2)", color: "var(--pink-3)" }}><Icon n="award" /></span>
          <div className="grow"><b>{w.link ? <a href={w.link} target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>{w.title}</a> : w.title}</b><span className="muted" style={{ fontSize: 13 }}>{[w.type, w.org, w.date].filter(Boolean).join(" · ")}</span></div>
          <button className="icon-btn" aria-label={`Remove ${w.title}`} onClick={() => set({ wins: pf.wins.filter(x => x.id !== w.id) })}><Icon n="trash" s={15} /></button>
        </div>)}
      </section>
    </div>
    {proj && <Modal title={proj.id ? "Edit project" : "New project"} onClose={() => setProj(null)} wide>
      <div className="edit-grid">
        <label className="field">Name<input className="input" autoFocus value={proj.title} onChange={e => setProj({ ...proj, title: e.target.value })} /></label>
        <label className="field">Status<select className="input" value={proj.status} onChange={e => setProj({ ...proj, status: e.target.value })}>{["Idea", "Building", "Done"].map(x => <option key={x}>{x}</option>)}</select></label>
        <label className="field full">One line about it<input className="input" value={proj.line} onChange={e => setProj({ ...proj, line: e.target.value })} placeholder="What it does, in one line" /></label>
        <label className="field full">Details<textarea className="input" rows="3" value={proj.desc} onChange={e => setProj({ ...proj, desc: e.target.value })} placeholder="What you built, what you learned, anything you're proud of" /></label>
        <label className="field full">Tech used, comma separated<input className="input" value={proj.stack} onChange={e => setProj({ ...proj, stack: e.target.value })} placeholder="C, Python, React" /></label>
        <label className="field">GitHub link<input className="input" value={proj.github} onChange={e => setProj({ ...proj, github: e.target.value })} /></label>
        <label className="field">Live link<input className="input" value={proj.demo} onChange={e => setProj({ ...proj, demo: e.target.value })} /></label>
      </div>
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        {proj.id && <button className="btn soft" onClick={() => { set({ projects: pf.projects.filter(p => p.id !== proj.id) }); setProj(null); }}><Icon n="trash" s={15} />Delete</button>}
        <button className="btn primary" onClick={saveProj}><Icon n="check" s={16} />Save project</button></div>
    </Modal>}
    {win && <Modal title="New achievement" onClose={() => setWin(null)}>
      <label className="field">What<input className="input" autoFocus value={win.title} onChange={e => setWin({ ...win, title: e.target.value })} placeholder="Gemini hackathon, JUIT" /></label>
      <div className="row2">
        <label className="field">Type<select className="input" value={win.type} onChange={e => setWin({ ...win, type: e.target.value })}>{["Hackathon", "Certificate", "Course", "Club role", "Award", "Other"].map(x => <option key={x}>{x}</option>)}</select></label>
        <label className="field">When<input className="input" type="month" value={win.date} onChange={e => setWin({ ...win, date: e.target.value })} /></label></div>
      <label className="field">Organiser (optional)<input className="input" value={win.org} onChange={e => setWin({ ...win, org: e.target.value })} /></label>
      <label className="field">Link (optional)<input className="input" value={win.link} onChange={e => setWin({ ...win, link: e.target.value })} /></label>
      <button className="btn primary" style={{ alignSelf: "flex-end" }} onClick={e => { if (!win.title.trim()) return; celebrate(e.currentTarget); set({ wins: [{ ...win, id: uid(), title: win.title.trim() }, ...pf.wins] }); setWin(null); }}><Icon n="check" s={16} />Save</button>
    </Modal>}
  </div>;
}

/* =============== semester reflection (profile) =============== */
function Reflection() {
  const S = useStore();
  const { profile, reflections, setReflections, attendance, grades, code, portfolio, journal, notify } = S;
  const sem = profile.semester || "This semester";
  const cur = reflections.find(r => r.sem === sem && !r.closed) || { id: null, sem, well: "", hard: "", change: "", proud: "", word: "", rating: 0 };
  const save = patch => {
    const next = { ...cur, ...patch, updatedAt: Date.now() };
    if (cur.id) setReflections(reflections.map(r => r.id === cur.id ? next : r)); else setReflections([{ ...next, id: uid() }, ...reflections]);
  };
  const snapshot = e => {
    const g = semesterGPA({ ...DEFAULT_GRADES, ...grades });
    const wd = COURSES.filter(c => attendance[c.id].held > 0);
    const avg = wd.length ? Math.round(wd.reduce((a, c) => a + attendance[c.id].pct, 0) / wd.length) : null;
    const stats = { attendance: avg, sgpa: g.sgpa != null ? Math.round(g.sgpa * 100) / 100 : null, problems: (code.problems || []).length, projects: (portfolio.projects || []).length, pages: journal.length };
    save({ stats, closed: true, closedAt: todayISO() }); celebrate(e.currentTarget); notify("Semester tucked away ♡");
  };
  const past = reflections.filter(r => r.closed);
  const Q = [["well", "What went well?", "The things you're glad about"], ["hard", "What was hard?", "It's okay to write it down"], ["change", "What will you do differently next semester?", "One or two small changes"], ["proud", "A moment you're proud of", "Big or tiny"]];
  return <section className="card list-gap refl">
    <div className="card-h" style={{ marginBottom: 0 }}><Icon n="heart" style={{ color: "var(--pink-3)" }} /><h2 className="grow">Semester reflection · {sem}</h2></div>
    <p className="card-note">Fill this in slowly over the semester. At the end, save it with a snapshot of your numbers, then change the semester name in Settings to start the next one.</p>
    {Q.map(([k, q, ph]) => <label key={k} className="field">{q}<textarea className="input" rows="3" value={cur[k] || ""} placeholder={ph} onChange={e => save({ [k]: e.target.value })} /></label>)}
    <div className="edit-grid">
      <label className="field">This semester in one word<input className="input" value={cur.word || ""} placeholder="Growing" onChange={e => save({ word: e.target.value })} /></label>
      <div className="field">How was it overall?<span className="hearts">{[1, 2, 3, 4, 5].map(n => <button key={n} className={n <= (cur.rating || 0) ? "on" : ""} aria-label={`${n} of 5`} onClick={() => save({ rating: n })}><Icon n="heart" s={22} /></button>)}</span></div>
    </div>
    <div><button className="btn primary" disabled={!cur.id} onClick={snapshot}><Icon n="bookOpen" s={16} />Close this semester & save a snapshot</button></div>
    {past.length > 0 && <><h3 style={{ marginTop: 8 }}>Past semesters</h3>
      {past.map(r => <details key={r.id} className="plan-day"><summary style={{ cursor: "pointer", fontWeight: 700 }}>{r.sem}{r.word ? ` · “${r.word}”` : ""} <span className="muted" style={{ fontWeight: 500 }}>{r.rating ? "♡".repeat(r.rating) : ""}</span></summary>
        {r.stats && <div className="stack" style={{ margin: "10px 0" }}>{r.stats.sgpa != null && <span>SGPA {r.stats.sgpa}</span>}{r.stats.attendance != null && <span>{r.stats.attendance}% attendance</span>}<span>{r.stats.problems} problems</span><span>{r.stats.projects} projects</span><span>{r.stats.pages} journal pages</span></div>}
        {Q.map(([k, q]) => r[k] ? <p key={k} style={{ fontSize: 14, marginTop: 6 }}><b>{q}</b><br />{r[k]}</p> : null)}
      </details>)}</>}
  </section>;
}
const DAY_LONG = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/* =============== settings =============== */
function SettingsPage() {
  const { profile, setProfile, reset, go, synced, user, notify } = useStore();
  const [confirm, setConfirm] = useState(false);
  return <div className="page">
    <div className="page-head"><div><p className="eyebrow">Make it yours</p><h1>Settings</h1><p>Changes save as you make them.</p></div></div>
    <div className="set-grid">
      <section className="card"><h2>Your semester</h2>
        <label className="field">Semester name<input id="set-sem" className="input" value={profile.semester} onChange={e => setProfile({ ...profile, semester: e.target.value })} placeholder="Sem 2 · Even 2027" /></label>
        <p className="muted" style={{ fontSize: 13.5 }}>Change this when a new semester starts. Your reflection and grades follow it.</p>
        <button className="btn primary" style={{ alignSelf: "flex-start" }} onClick={() => go("setup")}><Icon n="calendar" s={16} />Subjects, timetable & exams</button>
        <p className="pill" style={{ alignSelf: "flex-start" }}>{synced ? "✓ Synced across your devices" : FB_ON ? "Saved on this device only" : "Saved in this browser"}</p></section>
      <section className="card"><h2>Account & backup</h2>
        {user ? <p style={{ fontSize: 14 }}>Signed in as <b>{user.email}</b>. Everything syncs to your other devices.</p> : <p className="muted" style={{ fontSize: 14 }}>Not signed in, so your planner lives in this browser only.</p>}
        {FB_ON && (user ? <button className="btn soft" style={{ alignSelf: "flex-start" }} onClick={() => firebase.auth().signOut()}>Sign out</button>
          : <button className="btn primary" style={{ alignSelf: "flex-start" }} onClick={() => { try { localStorage.removeItem("latte:localMode"); } catch (e) {} location.reload(); }}>Sign in to sync</button>)}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button className="btn soft" onClick={() => downloadFile(`latteplanner-backup-${todayISO()}.json`, JSON.stringify({ app: "LattePlanner", version: 1, exportedAt: todayISO(), data: collectLocalData() }))}><Icon n="copy" s={15} />Download a backup</button>
          <label className="btn soft" style={{ cursor: "pointer" }}><Icon n="plus" s={15} />Import a backup<input type="file" accept="application/json,.json" hidden onChange={async e => { const f = e.target.files[0]; e.target.value = ""; if (!f) return; try { const n = await importBackup(f); notify(`Imported ${n} sections. Reloading…`); setTimeout(() => location.reload(), 900); } catch (err) { notify(err.message || "Couldn't import that file"); } }} /></label>
        </div>
        <p className="card-note">Importing replaces what's here with the file's contents.</p></section>
      <section className="card"><h2>Profile</h2>
        <label className="field">Your name<input id="set-name" className="input" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} /></label>
        <p className="muted" style={{ fontSize: 13.5 }}>Shown in the sidebar and your morning greeting.</p>
        <button className="btn soft" style={{ alignSelf: "flex-start" }} onClick={() => go("profile")}><Icon n="user" s={16} />Picture, details & progress</button></section>
      <section className="card"><h2>Appearance</h2>
        <div className="field">Colour theme
          <div className="swatches">{Object.entries(THEMES).map(([id, t]) => <button key={id} className={`swatch ${profile.theme === id ? "on" : ""}`} aria-pressed={profile.theme === id} onClick={() => setProfile({ ...profile, theme: id })}>
            <span className="dots3"><i style={{ background: t.accent[1] }}></i><i style={{ background: t.accent[0] }}></i><i style={{ background: t.second[0] }}></i></span>{t.name}</button>)}</div></div>
        <div className="field">Mode
          <div className="seg" style={{ alignSelf: "flex-start" }}>{[["light", "Light"], ["dark", "Dark"], ["system", "Match device"]].map(([k, l]) => <button key={k} className={profile.mode === k ? "on" : ""} onClick={() => setProfile({ ...profile, mode: k })}>{l}</button>)}</div></div>
        <label className="toggle">Confetti when I finish things
          <button className={`switch ${profile.confetti !== false ? "on" : ""}`} role="switch" aria-checked={profile.confetti !== false} aria-label="Confetti" onClick={e => { const on = profile.confetti === false; setProfile({ ...profile, confetti: on }); if (on) { CONFETTI_ON = true; celebrate(e.currentTarget); } }}></button></label>
      </section>
      <section className="card"><h2>Attendance target</h2>
        <div className="range-row"><input id="set-target" type="range" min="60" max="95" step="5" value={profile.target} onChange={e => setProfile({ ...profile, target: +e.target.value })} aria-label="Attendance target" /><b className="num">{profile.target}%</b></div>
        <p className="muted" style={{ fontSize: 13.5 }}>Used by the attendance guard to work out how many classes you can miss or need to attend.</p></section>
      <section className="card"><h2>Monthly budget</h2>
        <label className="field">Pocket money for the month (₹)<input id="set-budget" className="input num" type="number" min="0" step="500" value={profile.budget} onChange={e => setProfile({ ...profile, budget: Math.max(0, +e.target.value || 0) })} /></label></section>
      <section className="card"><h2>Focus sessions</h2>
        <div className="seg" style={{ alignSelf: "flex-start" }}>{["25/5", "50/10"].map(m => <button key={m} className={profile.focus === m ? "on" : ""} onClick={() => setProfile({ ...profile, focus: m })}>{m}</button>)}</div>
        <p className="muted" style={{ fontSize: 13.5 }}>Default length when the focus corner opens.</p></section>
      <section className="card"><h2>Start fresh</h2>
        <p className="muted" style={{ fontSize: 13.5 }}>Replaces everything, including your own subjects and entries, with the example semester. Use “Set up my semester” instead if you only want to clear the examples.</p>
        <button className="btn pink" style={{ alignSelf: "flex-start" }} onClick={() => { if (confirm) { reset(); setConfirm(false); } else setConfirm(true); }}>
          <Icon n="reset" s={16} />{confirm ? "Tap again to confirm" : "Reset example data"}</button></section>
    </div>
  </div>;
}

/* =============== quick add =============== */
function QuickAdd({ tab, onClose }) {
  const { tasks, setTasks, txns, setTxns, userEvents, setUserEvents, dumps, setDumps, todos, setTodos, notify } = useStore();
  const [t, setT] = useState(tab);
  const [f, setF] = useState({ title: "", course: (COURSES[0] || {}).id || "", date: todayISO(), time: "", type: "task", amt: "", cat: "Food", due: false });
  const set = (k, v) => setF({ ...f, [k]: v });
  const submit = e => {
    e.preventDefault();
    if (t === "todo") { if (!f.title.trim()) return; setTodos([...todos, { id: uid(), text: f.title.trim(), date: f.date, from: f.date, due: f.due, done: false }]); notify(f.date === todayISO() ? "Added to today ♡" : "To-do planned for " + fmtDay(f.date)); }
    if (t === "task") { if (!f.title.trim()) return; setTasks([...tasks, { id: uid(), title: f.title.trim(), course: f.course, due: f.date, type: f.type, done: false }]); notify("Task added ♡"); }
    if (t === "expense") { const a = Math.round(+f.amt); if (!a || a <= 0) return; setTxns([{ id: uid(), date: f.date, note: f.title.trim() || f.cat, cat: f.cat, amt: a }, ...txns]); notify(`${rupee(a)} added to ${f.cat}`); }
    if (t === "event") { if (!f.title.trim()) return; setUserEvents([...userEvents, { id: uid(), title: f.title.trim(), date: f.date, time: f.time }]); notify("Event added to your calendar"); }
    if (t === "thought") { if (!f.title.trim()) return; setDumps([{ id: uid(), text: f.title.trim(), tone: ["pink", "sage", "latte"][dumps.length % 3], date: todayISO() }, ...dumps]); notify("Thought saved to your brain dump"); }
    onClose();
  };
  const ph = { todo: "Something small for the day…", task: "What needs doing?", expense: "What was it for? (optional)", event: "What's happening?", thought: "Whatever's on your mind…" };
  return <Modal title="Quick add" onClose={onClose}>
    <div className="seg" style={{ alignSelf: "flex-start", flexWrap: "wrap" }}>{[["todo", "To-do"], ["task", "Task"], ["expense", "Expense"], ["event", "Event"], ["thought", "Thought"]].map(([k, l]) =>
      <button key={k} className={t === k ? "on" : ""} onClick={() => setT(k)}>{l}</button>)}</div>
    <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {t === "expense" && <label className="field">Amount (₹)<input id="qa-amt" className="input num" type="number" min="1" inputMode="numeric" value={f.amt} onChange={e => set("amt", e.target.value)} autoFocus placeholder="120" style={{ fontSize: 22, height: 54, fontFamily: "var(--display)" }} /></label>}
      <label className="field">{t === "expense" ? "Note" : t === "thought" ? "Thought" : "Title"}
        {t === "thought" ? <textarea id="qa-title" className="input" rows="3" value={f.title} onChange={e => set("title", e.target.value)} placeholder={ph[t]} autoFocus />
          : <input id="qa-title" className="input" value={f.title} onChange={e => set("title", e.target.value)} placeholder={ph[t]} autoFocus={t !== "expense"} />}</label>
      {t === "expense" && <div className="cat-pick">{CATS.map(c => <button type="button" key={c.id} className={f.cat === c.id ? "on" : ""} onClick={() => set("cat", c.id)}><span style={{ color: c.color }}><Icon n={c.icon} s={16} /></span>{c.id}</button>)}</div>}
      {t === "task" && <div className="row2">
        <label className="field">Subject<select id="qa-course" className="input" value={f.course} onChange={e => set("course", e.target.value)}>{COURSES.map(c => <option key={c.id} value={c.id}>{c.short}</option>)}<option value="">Personal</option></select></label>
        <label className="field">Kind<select id="qa-type" className="input" value={f.type} onChange={e => set("type", e.target.value)}><option value="task">Task</option><option value="deadline">Deadline</option></select></label></div>}
      {t !== "thought" && <div className="row2">
        <label className="field">{t === "task" ? "Due" : t === "todo" ? "Day" : "Date"}<input id="qa-date" className="input" type="date" value={f.date} onChange={e => set("date", e.target.value)} /></label>
        {t === "todo" && <label className="toggle" style={{ alignSelf: "end", height: 44 }}>It's a deadline for that day<button type="button" className={`switch ${f.due ? "on" : ""}`} role="switch" aria-checked={f.due} aria-label="Deadline" onClick={() => set("due", !f.due)}></button></label>}
        {t === "event" && <label className="field">Time (optional)<input id="qa-time" className="input" type="time" value={f.time} onChange={e => set("time", e.target.value)} /></label>}</div>}
      <button className="btn primary" type="submit" style={{ alignSelf: "flex-end" }}><Icon n="plus" s={16} />Add {t}</button>
    </form>
  </Modal>;
}

/* =============== app =============== */
function App({ user }) {
  const [page, setPage] = useState(() => { const h = (location.hash || "").slice(1); return PAGES.some(p => p.id === h) || HIDDEN_PAGES.includes(h) ? h : "dashboard"; });
  const go = p => { setPage(p); try { window.scrollTo({ top: 0, behavior: "smooth" }); } catch (e) {} };
  const [rawProfile, setProfile] = usePersist("profile", DEFAULT_PROFILE);
  const profile = useMemo(() => ({ ...DEFAULT_PROFILE, ...rawProfile }), [rawProfile]);
  const [steps, setSteps] = usePersist("steps", DEFAULT_STEPS);
  const [focusLog, setFocusLog] = usePersist("focusLog", FOCUS_SEED);
  const [todos, setTodos] = usePersist("todos", () => rollTodos(TODOS));
  useEffect(() => { const tick = () => setTodos(l => rollTodos(l)); tick(); const iv = setInterval(tick, 60000); return () => clearInterval(iv); }, []);
  CONFETTI_ON = profile.confetti !== false;
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      const host = document.documentElement.getAttribute("data-theme");
      const dark = profile.mode === "dark" || (profile.mode === "system" && (host ? host === "dark" : mq.matches));
      applyTheme(profile.theme, dark);
    };
    apply();
    mq.addEventListener ? mq.addEventListener("change", apply) : mq.addListener(apply);
    const mo = new MutationObserver(apply); mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => { mq.removeEventListener ? mq.removeEventListener("change", apply) : mq.removeListener(apply); mo.disconnect(); };
  }, [profile.theme, profile.mode]);
  const [news, setNews] = useState({ status: "loading", doc: null });
  useEffect(() => {
    let dead = false;
    fetch("news.json?v=" + Math.floor(Date.now() / 600000), { cache: "no-store" }).then(r => r.ok ? r.json() : null)
      .then(d => { if (!dead) setNews(d ? { status: "ok", doc: d } : { status: "unavailable", doc: null }); })
      .catch(() => { if (!dead) setNews({ status: "unavailable", doc: null }); });
    return () => { dead = true; };
  }, []);
  const [checks, setChecks] = usePersist("checks", {});
  const [intentions, setIntentions] = usePersist("intentions", INTENTIONS);
  const [tasks, setTasks] = usePersist("tasks", TASKS);
  const [userEvents, setUserEvents] = usePersist("events", []);
  const [txns, setTxns] = usePersist("txns", TXNS);
  const [journal, setJournal] = usePersist("journal", JOURNAL);
  const [dumps, setDumps] = usePersist("dumps", DUMPS);
  const [units, setUnits] = usePersist("units", UNITS_DONE);
  const [notebooks, setNotebooks] = usePersist("notebooks", NOTEBOOKS);
  const [routineDone, setRoutineDone] = usePersist("routine", {});
  const [courses, setCourses] = usePersist("courses", DEFAULT_COURSES);
  const [timetable, setTimetable] = usePersist("timetable", DEFAULT_TT);
  const [exams, setExams] = usePersist("exams", DEFAULT_EXAMS);
  const [unitsMap, setUnitsMap] = usePersist("unitsMap", DEFAULT_UNITS);
  const [bdays, setBdays] = usePersist("bdays", DEFAULT_BDAYS);
  const [grades, setGrades] = usePersist("grades", DEFAULT_GRADES);
  const [examPlan, setExamPlan] = usePersist("examPlan", DEFAULT_PLAN);
  const [examDone, setExamDone] = usePersist("examDone", {});
  const [code, setCode] = usePersist("code", DEFAULT_CODE);
  const [waterLog, setWaterLog] = usePersist("waterLog", {});
  const [sleepLog, setSleepLog] = usePersist("sleepLog", {});
  const [cycle, setCycle] = usePersist("cycle", { periods: [], logs: {} });
  const [mess, setMess] = usePersist("mess", DEFAULT_MESS);
  const [portfolio, setPortfolio] = usePersist("portfolio", DEFAULT_PORTFOLIO);
  const [reflections, setReflections] = usePersist("reflections", []);
  const [routinePlan, setRoutinePlan] = usePersist("routinePlan", {});
  const [synced, setSynced] = useState(Sync.ready);
  useEffect(() => Sync.onStatus(setSynced), []);
  /* live semester data used across the app */
  COURSES = courses.map(c => ({ ...c, soft: mix(c.color || "#A27B62") }));
  TIMETABLE = timetable;
  UNITS = Object.fromEntries(courses.map(c => [c.id, (unitsMap[c.id] || []).map(u => String(u).trim()).filter(Boolean)]));
  EXAMS = exams.filter(x => x && x.date).map(x => ({ ...x, title: (x.title || "").trim() || `${x.kind || "Exam"} · ${(courses.find(c => c.id === x.course) || {}).name || "Exam"}` }));
  { const y = new Date().getFullYear(); BIRTHDAYS = bdays.filter(b => b.date && b.title).flatMap(b => [y, y + 1].map(yy => ({ date: `${yy}${b.date.slice(4)}`, title: `${b.title}'s birthday`, type: "birthday" }))); }
  const [quick, setQuick] = useState(null);
  const [notebook, setNotebook] = useState(null);
  const [toast, setToast] = useState(null);
  const notify = msg => setToast({ msg, k: Date.now() });
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(null), 2400); return () => clearTimeout(t); }, [toast]);

  const today = todayISO();
  const attendance = useMemo(() => {
    const extra = {};
    Object.keys(checks).forEach(k => {
      const v = checks[k]; if (!v) return;
      let course = null, st = null;
      if (typeof v === "object") { course = v.c; st = v.s; }
      else { const sl = slotById(k.split("|")[1]); course = sl && sl.course; st = (v === true || v === "p") ? "p" : v === "a" ? "a" : null; }
      if (!course || !st) return;
      const e = extra[course] = extra[course] || { p: 0, a: 0 }; e[st] = (e[st] || 0) + 1;
    });
    return Object.fromEntries(COURSES.map(c => { const x = extra[c.id] || { p: 0, a: 0 }, att = (+c.att || 0) + x.p, held = (+c.held || 0) + x.p + x.a; return [c.id, { att, held, pct: held ? Math.round(att / held * 100) : 100 }]; }));
  }, [checks, today, courses]);

  const reset = () => {
    setProfile(DEFAULT_PROFILE); setChecks({}); setIntentions(INTENTIONS); setTasks(TASKS); setUserEvents([]); setTxns(TXNS);
    setJournal(JOURNAL); setDumps(DUMPS); setUnits(UNITS_DONE); setNotebooks(NOTEBOOKS); setRoutineDone({}); setSteps(DEFAULT_STEPS);
    setCourses(DEFAULT_COURSES); setTimetable(DEFAULT_TT); setExams(DEFAULT_EXAMS); setUnitsMap(DEFAULT_UNITS); setBdays(DEFAULT_BDAYS); setGrades(DEFAULT_GRADES); setExamPlan(DEFAULT_PLAN); setExamDone({});
    setCode(DEFAULT_CODE); setWaterLog({}); setSleepLog({}); setCycle({ periods: [], logs: {} }); setMess(DEFAULT_MESS); setPortfolio(DEFAULT_PORTFOLIO); setReflections([]); setFocusLog(FOCUS_SEED); setTodos(rollTodos(TODOS));
    notify("Fresh start ♡");
  };
  const store = { page, go, profile, setProfile, checks, setChecks, intentions, setIntentions, tasks, setTasks, userEvents, setUserEvents, txns, setTxns,
    journal, setJournal, dumps, setDumps, units, setUnits, notebooks, setNotebooks, routineDone, setRoutineDone,
    courses, setCourses, timetable, setTimetable, exams, setExams, unitsMap, setUnitsMap, bdays, setBdays, grades, setGrades, examPlan, setExamPlan, examDone, setExamDone,
    code, setCode, waterLog, setWaterLog, sleepLog, setSleepLog, cycle, setCycle, mess, setMess, portfolio, setPortfolio, reflections, setReflections, synced, routinePlan, setRoutinePlan,
    attendance, setQuick, setNotebook, notify, reset, user, steps, setSteps, focusLog, setFocusLog, todos, setTodos, news };
  const Page = { dashboard: Dashboard, calendar: CalendarPage, routines: RoutinesPage, academics: AcademicsPage, finance: FinancePage, journal: JournalPage, settings: SettingsPage, profile: ProfilePage, music: MusicPage, news: NewsPage, setup: SetupPage, grades: GradesPage, exams: ExamPage, code: CodePage, wellness: WellnessPage, mess: MessPage, portfolio: PortfolioPage }[page] || Dashboard;
  return <Store.Provider value={store}>
    <div className="app">
      <Sidebar />
      <main>
        <Topbar />
        <Page key={page} />
      </main>
    </div>
    <nav className="mobile-nav" aria-label="Main">{PAGES.map(p => <button key={p.id} className={page === p.id ? "on" : ""} onClick={() => go(p.id)} aria-label={p.label}><Icon n={p.icon} s={20} /></button>)}</nav>
    {quick && <QuickAdd tab={quick} onClose={() => setQuick(null)} />}
    {notebook && <NotebookModal nb={notebook} onClose={() => setNotebook(null)} />}
    {toast && <div className="toast" key={toast.k} role="status"><Icon n="heart" s={16} />{toast.msg}</div>}
  </Store.Provider>;
}

/* =============== sign-in gate =============== */
function Login({ onLocal }) {
  const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);
  const google = async () => {
    setErr(""); setBusy(true);
    const provider = new firebase.auth.GoogleAuthProvider();
    try { await firebase.auth().signInWithPopup(provider); }
    catch (e) {
      if (e && (e.code === "auth/popup-blocked" || e.code === "auth/operation-not-supported-in-this-environment")) { try { await firebase.auth().signInWithRedirect(provider); return; } catch (e2) { setErr(e2.message); } }
      else if (e && e.code !== "auth/popup-closed-by-user" && e.code !== "auth/cancelled-popup-request") setErr(e.code === "auth/unauthorized-domain" ? "This website isn't allowed to sign in yet. Add it under Firebase → Authentication → Settings → Authorised domains." : (e.message || "Couldn't sign in"));
    } finally { setBusy(false); }
  };
  return <div className="login">
    <div className="login-card">
      <div className="brand" style={{ justifyContent: "center", fontSize: 24 }}><Icon n="cup" s={28} /> LattePlanner</div>
      <h1 style={{ textAlign: "center" }}>Welcome back ♡</h1>
      <p className="muted" style={{ textAlign: "center" }}>Sign in to keep your planner in sync on your phone and laptop.</p>
      <button className="btn primary" style={{ width: "100%", justifyContent: "center", height: 52 }} onClick={google} disabled={busy}>
        <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>
        {busy ? "Signing in…" : "Continue with Google"}</button>
      {err && <p className="form-err" role="alert">{err}</p>}
      <button className="btn soft" style={{ width: "100%", justifyContent: "center" }} onClick={onLocal}>Use on this device only</button>
      <p className="card-note" style={{ textAlign: "center" }}>Without signing in, everything stays in this browser and won't appear on your other devices.</p>
    </div>
  </div>;
}
function Root() {
  const [user, setUser] = useState(FB_ON ? undefined : null);
  const [local, setLocal] = useState(() => { try { return localStorage.getItem("latte:localMode") === "1"; } catch (e) { return false; } });
  useEffect(() => {
    if (!FB_ON) return;
    return firebase.auth().onAuthStateChanged(u => {
      if (u) { Sync.start(u).then(() => setUser(u)); }
      else { Sync.stop(); setUser(null); }
    });
  }, []);
  if (user === undefined) return <div className="boot">Brewing your planner…</div>;
  if (FB_ON && !user && !local) return <Login onLocal={() => { try { localStorage.setItem("latte:localMode", "1"); } catch (e) {} setLocal(true); }} />;
  return <App user={user} />;
}
(async () => {
  try { await SP.handleRedirect(); } catch (e) { console.warn(e); }
  ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
})();

