===============
デプロイ - CloudFormation -
===============

作業環境 - ローカル -
===============
* Windows 11 Pro
* Visual Studio Code 1.96.2 (Default Terminal: Git Bash)
* Git 2.45.0.windows.1
* AWS CLI 2.22.19.0

前提条件
===============
* *AdministratorAccess* がアタッチされているIAMユーザーのアクセスキーID/シークレットアクセスキーを作成していること
* 以下コマンドを実行し、*admin* プロファイルを作成していること (デフォルトリージョンは*ap-northeast-1*)

.. code-block:: bash

  aws configure --profile admin

実作業 - ローカル -
===============
1. CFnテンプレート&Lambdaコード用S3バケット作成

.. code-block:: bash

  AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query 'Account' --output text --profile admin)
  aws s3 mb s3://ep01-$AWS_ACCOUNT_ID --profile admin

後片付け - ローカル -
===============

