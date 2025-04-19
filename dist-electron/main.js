import { app as n, BrowserWindow as i } from "electron";
import { fileURLToPath as l } from "node:url";
import o from "node:path";
const s = o.dirname(l(import.meta.url));
process.env.APP_ROOT = o.join(s, "..");
const t = process.env.VITE_DEV_SERVER_URL, m = o.join(process.env.APP_ROOT, "dist-electron"), r = o.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = t ? o.join(process.env.APP_ROOT, "public") : r;
let e;
function a() {
  e = new i({
    width: 1920,
    // 원하는 너비
    height: 1080,
    // 원하는 높이
    frame: !1,
    // 프레임 제거
    titleBarStyle: "hidden",
    // 타이틀 바 숨기기
    transparent: !0,
    // 배경 투명하게 (선택사항)
    // fullscreenable: true,
    icon: o.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: o.join(s, "preload.mjs")
    }
  }), e.webContents.on("did-finish-load", () => {
    e == null || e.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), t ? e.loadURL(t) : e.loadFile(o.join(r, "index.html"));
}
n.on("window-all-closed", () => {
  process.platform !== "darwin" && (n.quit(), e = null);
});
n.on("activate", () => {
  i.getAllWindows().length === 0 && a();
});
n.whenReady().then(a);
export {
  m as MAIN_DIST,
  r as RENDERER_DIST,
  t as VITE_DEV_SERVER_URL
};
