import boto3

ec2 = boto3.client('ec2')


# Backupキーが存在するか判定する関数
def check_backup_tag(tags):
    # Keyが'Backup'のタグを探す
    backup_tag = next((tag for tag in tags if tag['Key'] == 'Backup'), None)
    # タグ存在有無判定
    if backup_tag:
        print(f"Found Backup tag: {backup_tag['Value']}")
        return backup_tag['Value']
    else:
        print("No Backup tag found.")
        return None


# 起動テンプレートIDを取得する関数
def get_launchtemplate_id(tag_value):
    try:
        # 起動テンプレート情報取得
        lt = ec2.describe_launch_templates(
            Filters=[
                {
                    'Name': 'tag:Backup',
                    'Values': [
                        tag_value
                    ]
                }
            ]
        )
        # 起動テンプレートID取得
        lt_id = lt['LaunchTemplates'][0]['LaunchTemplateId']
        print(f"Found Launch Template ID: {lt_id}")
        return lt_id
    except Exception:
        print(f"No launch template found with tag 'Backup' and value '{tag_value}'.")
        return None


def lambda_handler(event, context):
    try:
        # イベントからAMI ARNを取得
        ami_arn = event['resources'][0]

        # ARNからAMI IDを取得
        ami_id = ami_arn.split('/')[-1]
        print(f"Extracted AMI ID: {ami_id}")

        # AMIのタグを取得
        response = ec2.describe_images(ImageIds=[ami_id])
        tags = response['Images'][0]['Tags']

        # AMIにBackupキーが含まれるか判定
        exist_tag = check_backup_tag(tags)
        # Backupキーがなければ処理終了
        if exist_tag is None:
            print("Terminating process due to missing Backup tag.")
            return {"status": "terminated", "reason": "Missing Backup tag"}

        # 起動テンプレートID取得
        lt_id = get_launchtemplate_id(exist_tag)
        # 起動テンプレートIDを取得できなければ処理終了
        if lt_id is None:
            print("Terminating process due to missing lt ID.")
            return {"status": "terminated", "reason": "Missing lt ID"}

        # 現バージョンの説明文を取得
        description_response = ec2.describe_launch_template_versions(
            LaunchTemplateId=lt_id
        )
        description = (description_response['LaunchTemplateVersions'][0]
                       .get('VersionDescription', '')
                       )

        # 新しいバージョンの起動テンプレートを作成
        create_response = ec2.create_launch_template_version(
            LaunchTemplateId=lt_id,
            SourceVersion='$Latest',
            VersionDescription=description,
            LaunchTemplateData={
                'ImageId': ami_id
            }
        )
        print(f"Created new launch template version: "
              f"{create_response['LaunchTemplateVersion']['VersionNumber']}")

        # 作成した起動テンプレートをデフォルトバージョンに設定
        modify_response = ec2.modify_launch_template(
            LaunchTemplateId=lt_id,
            DefaultVersion='$Latest'
        )
        default_version = modify_response['LaunchTemplate']['DefaultVersionNumber']
        print(f"Set new default version: {default_version}")

        # 最新の2つ前のバージョンを削除
        latest_version = modify_response['LaunchTemplate']['LatestVersionNumber']
        previous_version = int(latest_version) - 2
        if previous_version < 1:
            print(f"No valid versions to delete. Calculated previous_version: {previous_version}")
        else:
            # 既存のバージョンを確認
            try:
                version_response = ec2.describe_launch_template_versions(
                    LaunchTemplateId=lt_id,
                    Versions=[str(previous_version)]
                )
                if version_response['LaunchTemplateVersions']:
                    ec2.delete_launch_template_versions(
                        LaunchTemplateId=lt_id,
                        Versions=[str(previous_version)]
                    )
                    print(f"Deleted old version: {previous_version}")
                else:
                    print(f"Version {previous_version} does not exist, skipping deletion.")
            except Exception as e:
                print(f"Error while checking or deleting version {previous_version}: {e}")

        # 正常終了メッセージ
        print("Process completed successfully.")
        return {"status": "success", "message": "Process completed successfully",
                "new_default_version": default_version}

    except Exception as e:
        print(f"Error in Lambda handler: {e}")
        return {"status": "error", "reason": str(e)}
