==============================
デプロイ - CDK -
==============================

作業環境 - ローカル -
==============================
* 64bit版 Windows 11 Pro
* Visual Studio Code 1.96.2 (Default Terminal: Git Bash)
* Git 2.47.1.windows.2
* AWS CLI 2.22.19.0
* nvm 1.2.2
* node v22.12.0
* npm v10.9.0
* typescript Version 5.7.2
* aws-cdk v2.174.0

フォルダ構成
==============================
* `こちら <./folder.md>`_ を参照

前提条件
==============================
* *AdministratorAccess* がアタッチされているIAMユーザーのアクセスキーID/シークレットアクセスキーを作成していること
* 実作業は *cdk-app* フォルダ配下で実施すること
* 以下コマンドを実行し、*admin* プロファイルを作成していること (デフォルトリージョンは *ap-northeast-1* )

.. code-block:: bash

  aws configure --profile admin

事前作業(1)
==============================
1. *nvm-windows* ( Windows版 *Node.js* バージョンマネージャー)インストール
---------------------------------------------------------------------------------------
* `GitHub <https://github.com/coreybutler/nvm-windows>`_ から *nvm-setup.exe* をダウンロード
* デフォルト設定でインストール

1. *node.js* (LTS版) インストール
---------------------------------
.. code-block:: bash

  nvm install lts

3. LTS版の使用
---------------------------------
.. code-block:: bash

  nvm use 22.12.0

.. note::

  * バージョン `nvm list` でインストール済みの値を指定

4. *Typescript* のグローバルインストール
---------------------------------------
.. code-block:: bash

  npm install -g typescript

.. note::

  * 以下のようなエラーが出た場合

  .. code-block:: bash

    error code UNABLE_TO_GET_ISSUER_CERT_LOCALL
    error errno UNABLE_TO_GET_ISSUER_CERT_LOCALLY
    error request to https://registry.npmjs.org/typescript failed, reason: unable to get local issuer certificate

5. *aws-cdk* のグローバルインストール
---------------------------------------
.. code-block:: bash

  npm install -g aws-cdk

.. note::

  * *nvm* で管理している *node.js* のパッケージは「 *~/AppData/Roaming/nvm/{nodeバージョン番号}/* 」に格納されている
  * *npm* によってグローバルインストールしたパッケージは「 *~/AppData/Roaming/nvm/{nodeバージョン番号}/node_modules/* 」に格納されている
  * グローバルパッケージは *node* のバージョン毎に管理されているため、 *node* のバージョンを切り替えた際は再度グローバルパッケージをインストールする必要がある

事前作業(2)
==============================
1. 依存関係のインストール
------------------------------
.. code-block:: bash

  npm install

2. CDKデプロイメント事前準備
------------------------------
.. code-block:: bash

  cdk bootstrap --profile admin

実作業 - ローカル -
==============================
1. デプロイ
---------------
.. code-block:: bash

  cdk deploy --profile admin


後片付け - ローカル -
==============================
1. 復旧ポイント削除
-----------------------
* AWS Backup Vaultに存在する復旧ポイントを削除

2. 環境削除
---------------
.. code-block:: bash

  cdk destroy --profile admin

参考資料
===============================
リファレンス
-------------------------------
* https://docs.aws.amazon.com/cdk/api/v2/

ブログ
-------------------------------
* https://qiita.com/izumi_0x01/items/b969628628e4d39f1052
* https://qiita.com/nezumori/items/504b26d26f3e6e3009e3
