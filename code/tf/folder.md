# フォルダ構成

- フォルダ構成は以下の通り

```
`-- tf
    |-- folder.md
    |-- README.rst
    |-- envs
    |   |-- backend.tf                   tfstateファイル管理設定ファイル
    |   |-- locals.tf                    ローカル変数定義ファイル
    |   |-- main.tf                      リソース定義ファイル
    |   |-- provider.tf                  プロバイダー設定ファイル
    |   |-- src
    |   |   `-- handlers
    |   |       `-- ltupdate
    |   |           `-- lt-update.py     Lamda関数
    |   `-- version.tf                   プロバイダー&Terraformバージョン管理ファイル
    `-- modules
        |-- awsbackup                   AWS Backupモジュール
        |   |-- main.tf                  リソース定義ファイル
        |   |-- output.tf                リソース戻り値定義ファイル
        |   `-- variable.tf              変数定義ファイル
        |-- ec2                         EC2モジュール
        |   |-- data.tf                  外部データソース定義ファイル
        |   |-- main.tf                  リソース定義ファイル
        |   |-- output.tf                リソース戻り値定義ファイル
        |   `-- variable.tf              変数定義ファイル
        |-- iam                         IAMモジュール
        |   |-- data.tf                  外部データソース定義ファイル
        |   |-- main.tf                  リソース定義ファイル
        |   |-- output.tf                リソース戻り値定義ファイル
        |   `-- variable.tf              変数定義ファイル
        |-- kms                         KMSモジュール
        |   |-- main.tf                  リソース定義ファイル
        |   |-- output.tf                リソース戻り値定義ファイル
        |   `-- variable.tf              変数定義ファイル
        |-- lambda_eventbridge          Lambda＆EventBridgeモジュール
        |   |-- data.tf                  外部データソース定義ファイル
        |   |-- main.tf                  リソース定義ファイル
        |   |-- output.tf                リソース戻り値定義ファイル
        |   `-- variable.tf              変数定義ファイル
        `-- vpc_subnet                  VPC＆Subnetモジュール
            |-- main.tf                  リソース定義ファイル
            |-- output.tf                リソース戻り値定義ファイル
            `-- variable.tf              変数定義ファイル
```
