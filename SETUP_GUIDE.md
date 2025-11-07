# GitHub セットアップガイド

このガイドでは、障害者雇用実習計画書システムをGitHubで管理し、GitHub Pagesで公開する方法を説明します。

## 📋 目次

1. [GitHubリポジトリの作成](#githubリポジトリの作成)
2. [ファイルのアップロード](#ファイルのアップロード)
3. [GitHub Pagesの設定](#github-pagesの設定)
4. [カスタムドメインの設定](#カスタムドメインの設定-オプション)
5. [トラブルシューティング](#トラブルシューティング)

---

## GitHubリポジトリの作成

### 1. GitHubにログイン
[GitHub.com](https://github.com) にアクセスしてログインします。

### 2. 新しいリポジトリを作成
1. 右上の「+」アイコンをクリック
2. 「New repository」を選択
3. 以下の情報を入力:
   - **Repository name**: `internship-form-system`（任意の名前）
   - **Description**: 「障害者雇用実習計画書システム」
   - **Public/Private**: お好みで選択
   - **Initialize this repository with**: チェックなし

4. 「Create repository」をクリック

---

## ファイルのアップロード

### 方法1: Web インターフェース（簡単）

1. 作成したリポジトリページで「uploading an existing file」をクリック
2. すべてのファイルをドラッグ＆ドロップ:
   - `index.html`
   - `upload.html`
   - `styles.css`
   - `script.js`
   - `README.md`
   - `.gitignore`
3. コミットメッセージを入力: 「Initial commit」
4. 「Commit changes」をクリック

### 方法2: Git コマンド（推奨）

ターミナルまたはコマンドプロンプトで以下を実行:

```bash
# プロジェクトディレクトリに移動
cd internship-form-system

# Gitリポジトリを初期化
git init

# すべてのファイルをステージング
git add .

# コミット
git commit -m "feat: 障害者雇用実習計画書システムの初回実装"

# リモートリポジトリを追加
git remote add origin https://github.com/あなたのユーザー名/internship-form-system.git

# プッシュ
git push -u origin main
```

---

## GitHub Pagesの設定

### 1. リポジトリの設定ページを開く
1. リポジトリページで「Settings」タブをクリック
2. 左サイドバーから「Pages」を選択

### 2. ソースの設定
1. **Source** セクションで:
   - Branch: `main`（または `master`）
   - Folder: `/（root）`
2. 「Save」ボタンをクリック

### 3. 公開URLの確認
数分後、ページ上部に以下のメッセージが表示されます:

```
Your site is published at https://あなたのユーザー名.github.io/internship-form-system/
```

このURLをブラウザで開くと、システムが表示されます。

---

## 動作確認

公開URLにアクセスして以下を確認:

- ✅ ページが正しく表示される
- ✅ Word文書アップロード機能が動作する
- ✅ PDF出力ができる
- ✅ データ保存と読み込みが機能する
- ✅ レスポンシブデザインが適用されている

---

## カスタムドメインの設定（オプション）

独自ドメインを使用する場合:

### 1. DNS設定
ドメインレジストラで以下のレコードを追加:

```
A レコード:
@ 185.199.108.153
@ 185.199.109.153
@ 185.199.110.153
@ 185.199.111.153

CNAME レコード:
www あなたのユーザー名.github.io
```

### 2. GitHub Pagesでドメインを設定
1. Settings → Pages
2. Custom domain に独自ドメインを入力
3. 「Save」をクリック
4. 「Enforce HTTPS」にチェック

---

## アップデートの手順

ファイルを更新した場合:

### Webインターフェース
1. GitHubリポジトリページで該当ファイルを開く
2. 鉛筆アイコン（Edit）をクリック
3. 変更を加える
4. 「Commit changes」をクリック

### Gitコマンド
```bash
# ファイルを編集後
git add .
git commit -m "update: 変更内容の説明"
git push
```

GitHub Pagesは自動的に更新されます（1-2分程度）。

---

## トラブルシューティング

### ページが404エラーになる
- **原因**: GitHub Pagesの設定が完了していない
- **解決**: Settings → Pages で設定を確認し、数分待つ

### スタイルが適用されない
- **原因**: ファイルパスの問題
- **解決**: 
  - `index.html` 内のリンクが相対パスになっているか確認
  - ブラウザのキャッシュをクリア

### Word文書アップロードが動作しない
- **原因**: HTTPSが必要な機能
- **解決**: 
  - GitHub Pages（HTTPS）で使用する
  - ローカルではWebサーバーを起動

### ローカルでテストしたい
以下のコマンドでローカルサーバーを起動:

```bash
# Python 3
python -m http.server 8000

# Node.js（http-serverがインストール済みの場合）
npx http-server -p 8000
```

ブラウザで `http://localhost:8000` にアクセス。

---

## セキュリティとプライバシー

### 公開リポジトリでの注意点
- ✅ 個人情報や機密情報を含めない
- ✅ APIキーや認証情報を含めない
- ✅ `.gitignore` で不要なファイルを除外

### プライベートリポジトリでの使用
GitHub Pagesはプライベートリポジトリでも使用可能です（GitHub Pro以上）。

---

## よくある質問

### Q: GitHub Pagesは無料ですか？
**A**: はい、パブリックリポジトリでは完全無料です。

### Q: HTTPSは必須ですか？
**A**: GitHub Pagesは自動的にHTTPSを提供します。

### Q: 商用利用は可能ですか？
**A**: はい、GitHubの規約に従う限り可能です。

### Q: カスタムドメインは必須ですか？
**A**: いいえ、`username.github.io/repo-name` の形式のURLで十分です。

---

## 追加リソース

- [GitHub Pages ドキュメント](https://docs.github.com/ja/pages)
- [Git の基本](https://git-scm.com/book/ja/v2)
- [Markdown ガイド](https://guides.github.com/features/mastering-markdown/)

---

## サポート

問題が発生した場合:

1. [GitHub Community](https://github.community/) で質問
2. [Stack Overflow](https://stackoverflow.com/questions/tagged/github-pages)

---

**セットアップが完了したら、システムを使い始めることができます！** 🎉
