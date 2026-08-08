---
title: "Secure Boot有効にするとロック画面に行けなくなる場合の対処"
date: 2026-08-08 21:50:00 +0900
description: "VALORANTのVAN9003対策としてCSMをDisabled、Secure BootをEnabledにしたところ、マザーボードのロゴ表示後に暗転してWindowsのロック画面まで進まなくなった場合の対処法。実際にBIOSアップデートで解決した手順を紹介します。"
permalink: /notes/secure-boot-black-screen-fix/
tags:
  - Windows
  - Secure Boot
  - VALORANT
  - BIOS
---

## VAN9003が出てきた

久しぶりにVALORANTをプレイしようとしたら、起動時に「VAN9003」というエラーが出ました。

調べてみると、よく出てくる対処法はだいたい次の2つです。

- CSMを `Disabled` にする
- Secure Bootを `Enabled` にする

今回表示された画面にも、VanguardでプレイするにはUEFI Secure Bootを有効にする必要がある、という内容が出ていました。

<figure class="article-figure">
  <img src="{{ '/assets/images/secure-boot-black-screen-fix/van9003.png' | relative_url }}" alt="VAN9003: This version of Vanguard requires UEFI secure boot to be enabled in order to play." loading="lazy">
  <figcaption>今回表示されたVAN9003のエラー画面</figcaption>
</figure>

なので、自分のPCでもBIOSからCSMをDisabled、Secure BootをEnabledに変更してみました。

## CSMをDisabled、Secure BootをEnabledにしたら画面が真っ暗になった

ところが、設定を保存して再起動すると、マザーボードメーカーのロゴまでは普通に表示されるのに、そのあと画面が真っ暗になりました。

しばらく待ってもWindowsのロック画面が出てきません。キーボードを押しても変化なし。最初はかなり焦りました。

CSMやSecure Bootについて検索すると、「CSMを無効化してSecure Bootを有効化してください」という説明はたくさん見つかります。ただ、自分のように「その設定をした結果、Windowsのロック画面まで進めなくなった」ケースの情報はあまり見つかりませんでした。

この記事は、同じところで詰まった人向けのメモです。

## この記事の対象者

次のような状態になった人に向けて書いています。

- VALORANT起動時にVAN9003が表示された
- 対策としてCSMをDisabledにした
- Secure BootをEnabledにした
- 再起動するとマザーボードのロゴまでは表示される
- その後、画面が暗転してWindowsのロック画面まで進まない

特に、「CSMをDisabled、Secure BootをEnabledにすればよい」という一般的な対処法をすでに試したものの、それでは解決しなかった人向けです。

## 結論：自分の場合はBIOSアップデートで解決した

<div class="callout">
  <p><strong>自分の場合は、マザーボードのBIOSを最新版へアップデートしたところ解決しました。</strong></p>
  <p>ただし、Secure Boot有効化後に画面が映らなくなる原因は複数考えられます。すべての環境でBIOSアップデートによって解決するとは限りません。</p>
</div>

「BIOSが古いことが原因の一つとして考えられる」くらいに見てください。この症状ならBIOSが古い可能性が高い、と断定するつもりはありません。

自分の環境では、BIOS更新後に次の順番で確認したところ、Windowsが正常に起動するようになりました。

1. BIOSをアップデートする
2. いったんWindowsが通常起動することを確認する
3. CSMをDisabledにする
4. もう一度Windowsが通常起動することを確認する
5. Secure BootをEnabledにする
6. Windowsがロック画面まで進むことを確認する

一気に設定を変えるのではなく、1つずつ確認したのが大事だったと思います。

## 用意するもの

### USBメモリ

BIOSアップデート用のUSBメモリを用意します。

基本的には32GB以下のUSBメモリがおすすめです。BIOS更新ではFAT32形式が必要になることが多く、32GB以下ならWindowsの標準機能でもFAT32を選びやすいからです。

64GBや128GBのUSBメモリしかない場合でも、後で説明するように、先頭に32GB以下のFAT32パーティションを作れば使えることがあります。

<div class="callout callout--warning">
  <p><strong>USBメモリをフォーマットすると、中のデータは消えます。</strong></p>
  <p>必要なファイルが入っている場合は、先に必ずバックアップしてください。</p>
</div>

### マザーボードの正確な型番

BIOSファイルはマザーボードごとに違います。似た名前の製品でも別物なので、型番はかなり大事です。

たとえば、次の2つは名前が似ていますが別製品です。

- B550 Steel Legend
- B550M Steel Legend

また、GIGABYTEなどのメーカーではRevisionが分かれていることがあります。Rev. 1.0 / Rev. 1.1 のような違いがある場合は、そこまで含めて確認してください。

## BIOSアップデート前の注意

ここは読み飛ばさないほうがいいです。

<div class="callout callout--danger">
  <p><strong>BIOSアップデートは慎重に行ってください。</strong></p>
  <ul>
    <li>アップデート中はPCの電源を切らない</li>
    <li>アップデート中にUSBメモリを抜かない</li>
    <li>正しいマザーボード用BIOSであることを必ず確認する</li>
    <li>この記事はノートPCではなく、デスクトップ用マザーボードを想定しています</li>
    <li>BIOSの画面や機能名はメーカー・機種・BIOSバージョンによって異なります</li>
    <li>BitLocker / デバイス暗号化を使っている環境では、BIOS変更後に回復キーを求められる可能性があります</li>
    <li>この記事は筆者の環境で解決した例であり、すべてのPCで同じ結果になる保証はありません</li>
  </ul>
</div>

BitLockerやデバイス暗号化を使っている場合は、事前に回復キーを確認しておくと安心です。

それから、BIOSアップデート後に設定が初期化されることがあります。自分で変更している設定があるなら、スマホで写真を撮るなどして記録しておくのがおすすめです。

たとえば、次のような設定です。

- XMP / EXPO
- ファン設定
- 起動順序
- 仮想化
- Resizable BAR
- その他、自分で変更しているBIOS設定

## USBメモリをFAT32でフォーマットする

ここではWindows 11を想定して説明します。

### 32GB以下の場合

32GB以下のUSBメモリなら、エクスプローラーからFAT32でフォーマットできることが多いです。

手順はこんな感じです。

1. USBメモリをPCに挿す
2. エクスプローラーを開く
3. 「PC」を開く
4. 対象のUSBメモリを右クリックする
5. 「フォーマット」を選ぶ
6. ファイルシステムを `FAT32` にする
7. 「クイックフォーマット」にチェックが入っていることを確認する
8. 「開始」を押す

基本的にはクイックフォーマットで問題ありません。

ただし、ドライブを間違えると別のデータを消してしまいます。USBメモリのドライブ文字と容量を確認してから実行してください。

### 64GB・128GBなどの場合

64GBや128GBのUSBメモリだと、Windows標準のフォーマット画面にFAT32が出てこないことがあります。

マザーボードによっては大容量USBメモリをそのまま認識してくれることもありますが、BIOS更新用としては、小さめのFAT32パーティションを用意するほうが無難です。

まずはWindows標準の「ディスクの管理」で作れるか確認します。

1. スタートボタンを右クリックする
2. 「ディスクの管理」を開く
3. USBメモリのディスクを探す
4. 必要なら既存のボリュームを削除する
5. 先頭に32GB以下の新しいシンプルボリュームを作る
6. ファイルシステムをFAT32にしてフォーマットする

環境によっては、ディスクの管理でもFAT32を選べない場合があります。その場合は `diskpart` を使う方法もあります。

<div class="callout callout--danger">
  <p><strong>diskpartは操作を間違えると、別のドライブを消してしまう可能性があります。</strong></p>
  <p>特に <code>select disk</code> の番号を間違えないでください。少しでも不安なら、無理にdiskpartを使わず、32GB以下のUSBメモリを用意したほうが安全です。</p>
</div>

流れだけ書くと、次のようになります。

```text
diskpart
list disk
select disk X
clean
create partition primary size=32768
format fs=fat32 quick
assign
exit
```

`select disk X` の `X` は、自分のUSBメモリのディスク番号です。ここを間違えると本当に危ないので、容量を見て、USBメモリで間違いないか確認してから進めてください。

## マザーボードの型番を確認する

Windows上から確認するなら、「システム情報」を使うのが簡単です。

1. `Win + R` を押す
2. `msinfo32` と入力してEnter
3. 「システム情報」を開く
4. 「ベースボード製造元」を確認する
5. 「ベースボード製品」を確認する

ここでマザーボードのメーカーと型番が表示されます。

ただし、一部のPCでは正確な型番が出ないこともあります。その場合は、次のようなところから確認してください。

- マザーボード本体に印刷されている型番
- 購入履歴
- マザーボードの箱
- メーカー製品ページ
- PC購入時の構成表

BIOSファイルを探すときは、似た型番やRevision違いに注意です。

## BIOSをダウンロードする

BIOSは必ずメーカー公式サイトからダウンロードします。非公式サイトやよく分からないミラーサイトは使わないほうがいいです。

2026年8月8日時点で確認した主要メーカーの公式ページは次の通りです。

- ASRock BIOSサポート: [https://www.asrock.com/support/index.jp.asp?cat=BIOS](https://www.asrock.com/support/index.jp.asp?cat=BIOS)
- ASUS Download Center: [https://www.asus.com/support/download-center/](https://www.asus.com/support/download-center/)
- MSI BIOSアップデート案内: [https://www.msi.com/support/technical_details/MB_BIOS_Update](https://www.msi.com/support/technical_details/MB_BIOS_Update)
- GIGABYTE Download Center: [https://www.gigabyte.com/Support/Consumer/Download](https://www.gigabyte.com/Support/Consumer/Download)

### ASRockの場合

ここからはASRockを例にします。

ASRockの場合は、だいたい次の流れでBIOSを探します。

1. ASRock公式サイトを開く
2. 使用しているマザーボードの型番を検索する
3. 製品ページを開く
4. 「サポート」または「Support」を開く
5. 「BIOS」を開く
6. BIOS一覧から使用するバージョンを確認する
7. 「Global」などのダウンロードリンクからファイルをダウンロードする

ここで注意したいのは、「一番新しいものを何も確認せず入れる」という進め方をしないことです。

BIOS一覧の説明欄や注意事項を見て、次の点を確認してください。

- 特定バージョンを先に入れる必要がないか
- 特定CPUで非推奨になっていないか
- Bridge BIOSなど途中バージョンが必要ではないか
- Beta BIOSではないか

基本的には安定版の最新BIOSが候補になりますが、メーカーの注意事項を最優先にします。

### ASUS・MSI・GIGABYTEの場合

ASUS、MSI、GIGABYTEでも考え方は同じです。

自分のマザーボードの正確な型番を公式サイトで検索し、製品ページのサポートやダウンロードからBIOSを探します。

GIGABYTEのようにRevisionが分かれている場合は、同じ製品名でもRev. 1.0 / Rev. 1.1などでページやBIOSが分かれることがあります。ここは間違えやすいので、必ず確認してください。

メーカーによってBIOS更新方法やファイル名変更のルールも違います。ASRock以外の場合は、自分のメーカーの手順を必ず確認してください。

## BIOSファイルをUSBメモリに入れる

ダウンロードしたBIOSファイルは、ZIP形式になっていることが多いです。

Windowsなら、ZIPファイルを右クリックして「すべて展開」を選べば解凍できます。

ASRock Instant Flashの場合は、解凍後に入っているBIOSファイルをUSBメモリの直下へコピーします。

悪い例:

```text
USB:\BIOS\update\ファイル
```

良い例:

```text
USB:\BIOSファイル
```

切り取りでも動くとは思いますが、元データを残せるので、ここではコピーをおすすめします。

なお、この部分はASRock Instant Flashを前提にした手順です。メーカーや更新方式によっては、ファイル名変更や専用ツールが必要になる場合があります。

## ASRock Instant FlashでBIOSをアップデートする

USBメモリの準備ができたら、ASRock Instant FlashでBIOSを更新します。

流れは次の通りです。

1. USBメモリをPCに接続した状態でWindowsをシャットダウンする
2. PCの電源を入れる
3. 起動直後に `F2` または `Delete` キーを何度か押してUEFI / BIOSへ入る
4. BIOSの「Tool」タブを開く
5. 「Instant Flash」を選択する
6. USB内の対応BIOSファイルが検出されることを確認する
7. 正しいファイル・バージョンであることを再確認する
8. アップデートを開始する
9. 100%になるまで絶対に電源を切らない
10. 指示が表示されたらEnterなどで再起動する

BIOSバージョンやマザーボードによって、画面や項目名は少し違います。自分の画面と完全に一致しなくても、焦らず近い項目を探してください。

## BIOS更新後にCSMをDisabledにする

BIOS更新が終わった直後に、いきなりSecure Bootまで変更するのは避けました。

今回のような症状だと、どの設定が原因で止まったのか分からなくなると困ります。なので、自分は1項目ずつ変更して、そのたびにWindowsが起動するか確認しました。

まずBIOSアップデートが完了したら、設定を大きく変えずに一度Windowsを通常起動します。

## Windowsが起動することを確認する

BIOSアップデート後、Windowsのロック画面まで正常に表示されることを確認します。

ここで問題なく起動できたら、次にCSMを変更します。

1. 再起動してBIOSへ入る
2. CSMを `Disabled` へ変更する
3. Save & Exitで保存して再起動する
4. Windowsのロック画面まで正常に表示されることを確認する

この時点で問題が出るなら、Secure Bootの前にCSM変更で止まった可能性を考えられます。

## Secure BootをEnabledにする

CSMをDisabledにしてもWindowsが起動することを確認できたら、次にSecure BootをEnabledへ変更します。

1. もう一度再起動してBIOSへ入る
2. Secure Bootを `Enabled` へ変更する
3. Save & Exitで保存して再起動する
4. Windowsのロック画面まで正常に表示されることを確認する

CSM無効化とSecure Boot有効化を一度に変更せず、1項目ずつ変更して、そのたびにWindowsが起動するか確認するのがおすすめです。

問題が発生した場合に、どの設定変更が原因だったのか切り分けやすくなります。

## Secure BootをEnabledにできない場合

機種によっては、Secure BootをEnabledにするだけでは有効にならない場合があります。

たとえば、次のような設定が関係することがあります。

- Secure Boot Mode
- Standard / Custom
- Install Default Secure Boot Keys
- Key Management

ただ、このあたりはマザーボードごとの差がかなり大きいです。ここでは特定の操作を一律に指示しません。

自分のマザーボードのマニュアルや、メーカー公式のSecure Boot設定方法を確認してください。

特にSecure Boot Keyの登録・削除は、不用意に操作しないほうがいいです。よく分からないまま触るより、まずは公式マニュアルを読むのが安全です。

## Secure Bootが有効になったかWindowsから確認する

Windowsが起動したら、本当にSecure Bootが有効になっているか確認します。

1. `Win + R` を押す
2. `msinfo32` と入力してEnter
3. 「システム情報」を開く
4. 「BIOS モード」が `UEFI` になっていることを確認する
5. 「セキュア ブートの状態」が `有効` になっていることを確認する

ここまで確認できれば、Secure Boot有効化は完了です。

## VALORANTを起動して確認

最後にVALORANTを起動して、VAN9003が表示されなくなっているか確認します。

自分の環境では、BIOSアップデート後にCSMとSecure Bootを1つずつ変更して確認したことで、Windowsも起動するようになり、VALORANTもプレイできるようになりました。

ただし、VAN9003にはSecure Boot以外の原因が関係する場合もあります。これで必ずすべてのVAN9003が直る、とは考えないほうがいいです。

## まとめ

自分の場合は、BIOSをアップデートしたあと、CSMとSecure Bootを一つずつ設定することで無事にWindowsを起動できるようになり、VALORANTもプレイできるようになりました。

Secure Bootを有効にした瞬間にWindowsが起動しなくなると、かなり焦ります。マザーボードのロゴまでは出るのに、そのあと暗転してロック画面まで行かないので、最初は何が起きたのか分かりませんでした。

同じ症状で困っている方は、BIOSが古いことも原因の一つとして考えつつ、まずは自分のマザーボードの正確な型番を確認して、メーカー公式の手順を見ながら進めてみてください。

BIOSアップデート中に電源を切らないこと、そして自分のマザーボードに合ったBIOSファイルを使用することだけは特に注意してください。

皆さん、焦らずゆっくり頑張ってください。
