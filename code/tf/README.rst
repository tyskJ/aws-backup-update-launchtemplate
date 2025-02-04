==============================
デプロイ - Terraform -
==============================

作業環境 - ローカル -
==============================
* 64bit版 Windows 11 Pro
* Visual Studio Code 1.96.2 (Default Terminal: Git Bash)
* Git 2.47.1.windows.2
* tenv v4.1.0
* Terraform v1.10.3

フォルダ構成
==============================
* `こちら <./folder.md>`_ を参照

前提条件
==============================
* *AdministratorAccess* がアタッチされているIAMユーザーのアクセスキーID/シークレットアクセスキーを作成していること
* 実作業は *envs* フォルダ配下で実施すること
* 以下コマンドを実行し、*admin* プロファイルを作成していること (デフォルトリージョンは *ap-northeast-1* )

.. code-block:: bash

  aws configure --profile admin

事前作業(1)
==============================
1. 各種モジュールインストール
---------------------------------------------------------------------------------------
* `GitHub <https://github.com/tyskJ/common-environment-setup>`_ を参照

事前作業(2)
==============================
1. *tfstate* 用S3バケット作成
-------------------------------
.. code-block:: bash

  aws s3 mb s3://ep001-tf-2025 --profile admin

.. note::

  * バケット名は全世界で一意である必要があるため、作成に失敗した場合は任意の名前に変更
  * 変更した場合は、「 *envs/backend.tf* 」ファイル内のバケット名も修正

実作業 - ローカル -
==============================
1. *Terraform* 初期化
----------------------
.. code-block:: bash

  terraform init

2. 事前確認
----------------------
.. code-block:: bash

  terraform plan

3. デプロイ
----------------------
.. code-block:: bash

  terraform apply -auto-approve

後片付け - ローカル -
==============================
1. 復旧ポイント削除
-----------------------
* AWS Backup Vaultに存在する復旧ポイントを削除

2. 環境削除
--------------
.. code-block:: bash

  terraform destroy

3. *tfstate* 用S3バケット削除
------------------------------
.. code-block:: bash

  aws s3 rm s3://ep001-tf-2025/ --recursive --profile admin
  aws s3 rb s3://ep001-tf-2025 --profile admin

.. note::

  * *事前作業(2)* で作成したバケット名に合わせること

参考資料
===============================
リファレンス
-------------------------------
* `Terraform Registry <https://registry.terraform.io/providers/hashicorp/aws/latest/docs>`_
* `gitignore.io <https://www.toptal.com/developers/gitignore>`_
* `20 Terraform Best Practices to Improve your TF workflow <https://spacelift.io/blog/terraform-best-practices>`_

ブログ
-------------------------------
* `特定タグが設定されたAMIが作成された時に自動で起動テンプレートを更新する <https://dev.classmethod.jp/articles/use-daily-backup-of-asg-instance-for-golden-image/>`_
* `Terraform ベストプラクティスを整理してみました。 <https://dev.classmethod.jp/articles/terraform-bset-practice-jp/>`_
* `「それ、どこに出しても恥ずかしくないTerraformコードになってるか？」 / Terraform AWS Best Practices <https://speakerdeck.com/yuukiyo/terraform-aws-best-practices?slide=16>`
* `Terraform連載 第5回：module(モジュール)の紹介 <https://www.ntt-tx.co.jp/column/iac/231204/>`_
* `Terraformでローカルファイルを操作する方法　 ～よくある使い方3選～ <https://tech.nri-net.com/entry/how_to_operate_local_files_with_terraform>`_
* `Amazon Linux 2023 の 最新 AMI ID は Parameter Store から取得しよう！ <https://dev.classmethod.jp/articles/retrieve-latest-ami-id-of-amazonlinux-2023/>`_
