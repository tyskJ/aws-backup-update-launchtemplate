# ╔══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
# ║ Ep.001 Launch Template Update Solution - Terraform main.tf resource                                                                              ║
# ╠═════════════════════════╤═══════════════════════════════════╤════════════════════════════════════════════════════════════════════════════════════╣
# ║ lg_lambda               │ aws_cloudwatch_log_group          │ LogGroup for Lambda Function.                                                      ║
# ║ lambda_function         │ aws_lambda_function               │ Lambda Function.                                                                   ║
# ║ event_rule              │ aws_cloudwatch_event_rule         │ EventBridge Rule.                                                                  ║
# ║ event_target            │ aws_cloudwatch_event_target       │ EventBridge Rule Target.                                                           ║
# ║ invoke_permission       │ aws_lambda_permission             │ Permission for invoke Lambda from eventbridge.                                     ║
# ╚═════════════════════════╧═══════════════════════════════════╧════════════════════════════════════════════════════════════════════════════════════╝

resource "aws_cloudwatch_log_group" "lg_lambda" {
  name              = "lg-ltupdate"
  retention_in_days = 1
  tags = {
    Name = "ltupdate"
  }
}

resource "aws_lambda_function" "lambda_function" {
  filename         = data.archive_file.lambda_code.output_path
  function_name    = "ltupdate"
  role             = var.lambda_role_arn
  handler          = "lt-update.lambda_handler"
  source_code_hash = data.archive_file.lambda_code.output_base64sha256
  runtime          = "python3.12"
  logging_config {
    log_format = "JSON"
    log_group  = aws_cloudwatch_log_group.lg_lambda.name
  }
  tags = {
    Name = "ltupdate"
  }
}

resource "aws_cloudwatch_event_rule" "event_rule" {
  name        = "ltupdate-rule"
  description = "AWS Backup Job State Change is completed."
  event_pattern = jsonencode({
    "source"      = ["aws.backup"]
    "detail-type" = ["Backup Job State Change"]
    "detail" = {
      "state" = ["COMPLETED"]
    }
  })
  tags = {
    Name = "ltupdate-rule"
  }
}

resource "aws_cloudwatch_event_target" "event_target" {
  rule = aws_cloudwatch_event_rule.event_rule.name
  arn  = aws_lambda_function.lambda_function.arn
}

resource "aws_lambda_permission" "invoke_permission" {
  statement_id  = "AllowExecutionFromEventBridgeRule"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda_function.function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.event_rule.arn
}
