# フォルダ構成

- フォルダ構成は以下の通り

```
cdk-app
|-- README.rst
|-- bin
|   `-- cdk-app.ts                        CDK App定義ファイル
|-- lib
|   |-- assets
|   |-- construct                         コンストラクト
|   |   |-- awsbackup.ts                    Backup Vault作成
|   |   |-- ec2.ts                          EC2関連、起動テンプレート作成
|   |   |-- iam.ts                          IAMロール、ポリシー作成
|   |   |-- kms.ts                          KMS CMK作成
|   |   |-- network.ts                      VPC、Subnet作成
|   |   `-- observe.ts                      EventBridgeルール、Lambda、ロググループ作成
|   |-- json
|   |   `-- policy
|   |       `-- iam-policy-ltupdate.json  起動テンプレート更新用IAMポリシーファイル
|   |-- lambda
|   |   `-- lt-update.py                  Lambda関数コード
|   `-- stack
|       `-- cdk-app-stack.ts              CDK Stack定義ファイル
`-- parameter.ts                          環境リソース設定値定義ファイル
```
