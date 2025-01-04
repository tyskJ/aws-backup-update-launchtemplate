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
* 以下コマンドを実行し、*admin* プロファイルを作成していること

.. code-block:: bash

  aws configure --profile admin

実作業 - ローカル -
===============
1. CFnテンプレート&Lambdaコード用S3バケット作成

.. code-block:: bash

  docker compose exec mypython pandoc -f markdown -t html -o md_to_html.html markdown.md
  docker compose exec mypython pandoc -f markdown -t docx -o md_to_docx.docx markdown.md

後片付け - ローカル -
===============

