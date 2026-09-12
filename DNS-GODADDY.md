# GoDaddy DNS 綁定 pearlwaterless-taiwan.com → GitHub Pages

倉庫：https://github.com/akirafudo0515/pearlwaterless  
GitHub Pages 設定：https://github.com/akirafudo0515/pearlwaterless/settings/pages

## 一、GoDaddy 要加的 DNS（必做）

登入 GoDaddy → **我的產品** → 網域 `pearlwaterless-taiwan.com` → **DNS** / **管理 DNS**。

### 1. 先刪除會衝突的舊紀錄
- `@`（根網域）上舊的 **A**、**AAAA**、**CNAME**、**Forwarding**（轉址）
- `www` 上舊的 **CNAME** / **A**
- 若有「網域轉址 / Domain Forwarding」請先關閉（會擋 GitHub）

### 2. 根網域 `@`：新增 4 筆 A 紀錄

| 類型 | 名稱 | 值 | TTL |
|------|------|-----|-----|
| A | `@` | `185.199.108.153` | 600 或 1 小時 |
| A | `@` | `185.199.109.153` | 600 或 1 小時 |
| A | `@` | `185.199.110.153` | 600 或 1 小時 |
| A | `@` | `185.199.111.153` | 600 或 1 小時 |

### 3. www：新增 1 筆 CNAME

| 類型 | 名稱 | 值 | TTL |
|------|------|-----|-----|
| CNAME | `www` | `akirafudo0515.github.io` | 600 或 1 小時 |

> 注意：CNAME 值請填 `akirafudo0515.github.io`（後面通常**不要**自己加點；GoDaddy 有時會自動處理）

## 二、GitHub Pages 自訂網域（必做）

1. 開啟：https://github.com/akirafudo0515/pearlwaterless/settings/pages  
2. **Custom domain** 填：`pearlwaterless-taiwan.com` → Save  
3. 等 DNS 檢查變綠勾  
4. 勾選 **Enforce HTTPS**（證書開好後才可勾）

倉庫根目錄已有 `CNAME` 檔（內容為 `pearlwaterless-taiwan.com`），與上述設定一致。

## 三、生效時間
- 通常 **10 分鐘～數小時**；最長可能 24–48 小時  
- 測試：開 https://pearlwaterless-taiwan.com/ 與 https://www.pearlwaterless-taiwan.com/

## 四、常見問題
- 開不起來：GoDaddy 仍開著「轉址」或 `@` 沒有完整 4 筆 A  
- HTTPS 紅字：先等 DNS 全對，再回 GitHub 勾 Enforce HTTPS  
- www 可以、根網域不行：檢查 4 筆 A 是否齊全  
