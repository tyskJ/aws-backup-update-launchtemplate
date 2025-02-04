==============================
デプロイ - CloudFormation -
==============================

作業環境 - ローカル -
==============================
* 64bit版 Windows 11 Pro
* Visual Studio Code 1.96.2 (Default Terminal: Git Bash)
* Git 2.47.1.windows.2
* AWS CLI 2.22.19.0

前提条件
==============================
* *AdministratorAccess* がアタッチされているIAMユーザーのアクセスキーID/シークレットアクセスキーを作成していること
* 実作業は *cfn* フォルダ配下で実施すること
* 以下コマンドを実行し、*admin* プロファイルを作成していること (デフォルトリージョンは *ap-northeast-1* )

.. code-block:: bash

  aws configure --profile admin

実作業 - ローカル -
==============================
1. CFnテンプレート&Lambdaコード用S3バケット作成
----------------------------------------------
.. code-block:: bash

  DATE=$(date '+%Y%m%d')
  aws s3 mb s3://ep001-cfn-$DATE --profile admin

2. Python3の文字エンコーディング設定を *UTF-8* に変更
----------------------------------------------------
.. code-block:: bash

  PYTHONUTF8=1
  export PYTHONUTF8

.. note::

  * AWS CLIは *Python3* を内部的に使用
  * Windowsの文字コードは *cp932(Shift_JIS)* を使用
  * `aws cloudformation package` 実行時のyamlファイル出力時に、 *cp932* に伴うエラーが発生
  * *Python3* がファイルを出力する際の文字コードを環境変数にて *UTF-8* に指定

3. アーティファクト(Lambda関数コード)をS3にアップロード
----------------------------------------------------
.. code-block:: bash

  aws cloudformation package \
  --template-file ltupdate.yaml \
  --s3-bucket ep001-cfn-$DATE \
  --output-template-file ltupdate-out.yaml --profile admin

4. CloudFormation Stackデプロイ
-------------------------------
.. code-block:: bash

  aws cloudformation deploy \
  --template-file ltupdate-out.yaml \
  --stack-name EP01STACK \
  --s3-bucket ep001-cfn-$DATE \
  --s3-prefix cfn \
  --capabilities CAPABILITY_NAMED_IAM --profile admin


後片付け - ローカル -
==============================
1. 復旧ポイント削除
-----------------------
* AWS Backup Vaultに存在する復旧ポイントを削除

2. CloudFormation Stack削除
------------------------------
.. code-block:: bash

  aws cloudformation delete-stack \
  --stack-name EP01STACK --profile admin

3. CFnテンプレート&Lambdaコード用S3バケット削除
----------------------------------------------
.. code-block:: bash

  aws s3 rm s3://ep001-cfn-$DATE/ --recursive --profile admin
  aws s3 rb s3://ep001-cfn-$DATE --profile admin

参考資料
===============================
リファレンス
-------------------------------
* `AWS CLI Command Reference <https://awscli.amazonaws.com/v2/documentation/api/latest/reference/index.html>`_
* `AWS CloudFormation ユーザーガイド <https://docs.aws.amazon.com/ja_jp/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html>`_

ブログ
-------------------------------
* `PythonでUTF-8エンコーディングを正しく扱う方法 <https://www.python.digibeatrix.com/archives/990>`_
* `Serverless Application ModelのCodeUriプロパティとデプロイメントパッケージの関係を理解する <https://dev.classmethod.jp/articles/understanding-codeuri-property-and-deployment-package-in-serverless-application-model/#toc->`_
* `特定タグが設定されたAMIが作成された時に自動で起動テンプレートを更新する <https://dev.classmethod.jp/articles/use-daily-backup-of-asg-instance-for-golden-image/>`_
