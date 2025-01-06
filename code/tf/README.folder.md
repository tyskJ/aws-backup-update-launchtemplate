# フォルダ構成

- フォルダ構成は以下の通り

```
`-- tf
    |-- README.folder.md
    |-- README.rst
    |-- envs
    |   |-- backend.tf
    |   |-- locals.tf
    |   |-- main.tf
    |   |-- provider.tf
    |   |-- src
    |   |   `-- handlers
    |   |       `-- ltupdate
    |   |           |-- lt-update.py
    |   |           `-- lt-update.zip
    |   `-- version.tf
    `-- modules
        |-- awsbackup
        |   |-- main.tf
        |   |-- outputs.tf
        |   `-- variables.tf
        |-- ec2
        |   |-- data.tf
        |   |-- main.tf
        |   |-- outputs.tf
        |   `-- variables.tf
        |-- iam
        |   |-- data.tf
        |   |-- main.tf
        |   |-- outputs.tf
        |   `-- variables.tf
        |-- kms
        |   |-- main.tf
        |   |-- outputs.tf
        |   `-- variables.tf
        |-- lambda_eventbridge
        |   |-- data.tf
        |   |-- main.tf
        |   |-- outputs.tf
        |   `-- variables.tf
        `-- vpc_subnet
            |-- main.tf
            |-- outputs.tf
            `-- variables.tf
```
