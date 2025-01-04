==============================
デプロイ - CloudFormation -
==============================

作業環境 - ローカル -
==============================
* Windows 11 Pro
* Visual Studio Code 1.96.2 (Default Terminal: Git Bash)
* Git 2.45.0.windows.1
* AWS CLI 2.22.19.0

前提条件
==============================
* *AdministratorAccess* がアタッチされているIAMユーザーのアクセスキーID/シークレットアクセスキーを作成していること
* 以下コマンドを実行し、*admin* プロファイルを作成していること (デフォルトリージョンは *ap-northeast-1* )

.. code-block:: bash

  aws configure --profile admin

実作業 - ローカル -
==============================
1. CFnテンプレート&Lambdaコード用S3バケット作成
------------------------------
.. code-block:: bash

  DATE=$(date '+%Y%m%d')
  aws s3 mb s3://ep01-$DATE --profile admin

1. Python3の文字エンコーディング設定を *UTF-8* に変更
------------------------------
.. code-block:: bash

  PYTHONUTF8=1
  export PYTHONUTF8

.. note::

  * AWS CLIは *Python3* を内部的に使用している
  * Windowsの文字コードは *cp932(Shift_JIS)* を使っている
  * `aws cloudformation package` 実行時のyamlファイル出力時に、 *cp932* に伴うエラーが発生する

3. アーティファクト(Lambda関数コード)をS3にアップロード
------------------------------
.. code-block:: bash

  aws cloudformation package \
  --template-file ltupdate.yaml \
  --s3-bucket ep01-$DATE \
  --output-template-file ltupdate-out.yaml --profile admin


後片付け - ローカル -
==============================
1. CFnテンプレート&Lambdaコード用S3バケット削除
------------------------------
.. code-block:: bash

  aws s3 rm s3://ep01-$DATE/ --recursive --profile admin
  aws s3 rb s3://ep01-$DATE --profile admin
