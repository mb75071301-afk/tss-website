# TSS 台灣超級摩托車聯賽 官網

台灣最高規格二輪爭先賽事官方網站,由 CTMSA 中華賽車會認證。

## 技術架構

- **前端**:React 19 + Vite 7 + TypeScript
- **樣式**:TailwindCSS 4 + shadcn/ui
- **動畫**:Framer Motion
- **路由**:Wouter(檔案在 `client/src/App.tsx`)
- **資料**:靜態 JSON(`client/src/data/tss_data.json`)
- **部署**:Cloudflare Pages(靜態)

這是純前端靜態站,沒有後端、沒有資料庫。所有車隊、車手、場地最速等
資料都存在 `client/src/data/tss_data.json`。

## 本地開發

```bash
npm install
npm run dev       # 開發模式,預設 http://localhost:5173
npm run build     # 產出到 dist/
npm run preview   # 預覽 build 產物
```

## 部署

推送到 GitHub 後,由 Cloudflare Pages 自動部署:

- **Build command**:`npm run build`
- **Build output directory**:`dist`
- **Node version**:22

SPA 路由處理檔:`client/public/_redirects`(build 時會複製到 `dist/_redirects`)。

## 資料更新

所有網站內容在 `client/src/data/tss_data.json`。要新增車手或車隊,
編輯這個檔案,commit 後 Cloudflare Pages 會自動重新部署。
