==============================
デプロイ - Terraform -
==============================

作業環境 - ローカル -
==============================
* 64bit版 Windows 11 Pro
* Visual Studio Code 1.96.2 (Default Terminal: Git Bash)
* Git 2.45.0.windows.1
* tenv v4.1.0
* Terraform v1.10.3

前提条件
==============================
* *AdministratorAccess* がアタッチされているIAMユーザーのアクセスキーID/シークレットアクセスキーを作成していること
* 実作業は *environments* フォルダ配下で実施すること
* 以下コマンドを実行し、*admin* プロファイルを作成していること (デフォルトリージョンは *ap-northeast-1* )

.. code-block:: bash

  aws configure --profile admin

事前作業(1)
==============================
1. *tenv* (Terraformバージョンマネージャー)リリースバイナリダウンロード
--------------------------------------------------------------------
* `GitHub <https://github.com/tofuutils/tenv/releases>` から64bit版バイナリ( *tenv_v4.1.0_Windows_x86_64.zip* )をダウンロード

2. バイナリデータを任意のフォルダに解凍
-------------------------------------
.. code-block:: bash

  mkdir -p ~/tofuutils/tenv/
  unzip -d ~/tofuutils/tenv/ ~/Downloads/tenv_v4.1.0_Windows_x86_64.zip
  rm ~/Downloads/tenv_v4.1.0_Windows_x86_64.zip

3. ディレクトリにPATHを通す
-------------------------------------
.. code-block:: bash

  export PATH=$PATH:$HOME/tofuutils/tenv/
  touch ~/.bashrc # .bashrcがない場合実行
  sed -i '$aexport PATH=$PATH:$HOME/tofuutils/tenv/' ~/.bashrc

4. *Terraform* 最新版インストール
--------------------------------------
.. code-block:: bash

  tenv tf install latest # ~/.tenv/Terraform/バージョン番号/に保存される

5. *v.1.10.3* を使用
--------------------------------------
.. code-block:: bash

  tenv tf list # インストールしたバージョンを確認
  tenv tf use v1.10.3

事前作業(2)
==============================
1. *tfstate* 用S3バケット作成
-------------------------------
.. code-block:: bash

  aws s3 mb s3://ep01-tf-2025 --profile admin

実作業 - ローカル -
==============================
1. *Terraform* 初期化
----------------------
.. code-block:: bash

  terraform init


後片付け - ローカル -
==============================
1. 環境削除
--------------
.. code-block:: bash

  terraform destroy

2. *tfstate* 用S3バケット削除
------------------------------
.. code-block:: bash

  aws s3 rm s3://ep01-tf-2025 --recursive --profile admin
  aws s3 rb s3://ep01-tf-2025 --profile admin



参考資料
===============================
リファレンス
-------------------------------
* https://registry.terraform.io/providers/hashicorp/aws/latest/docs
* https://www.toptal.com/developers/gitignore
* https://spacelift.io/blog/terraform-best-practices

ブログ
-------------------------------
* https://dev.classmethod.jp/articles/use-daily-backup-of-asg-instance-for-golden-image/
* https://dev.classmethod.jp/articles/try-tenv-terraform-version-manager/
* https://speakerdeck.com/yuukiyo/terraform-aws-best-practices?slide=16
