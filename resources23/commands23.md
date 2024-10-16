`npx serverless deploy --aws-profile ped_aws`
serverless version ===== 2.72.4

serverless 4.4.6
- we need some sort of license
- nodejs runtime also must be v18+ (coz earlier versions deprecated)

<!------------------------------------------------------------------------------->

`get_all_users`
curl https://bo8w6hifed.execute-api.us-east-1.amazonaws.com/dev/user

`create_user`

curl -X POST https://bo8w6hifed.execute-api.us-east-1.amazonaws.com/dev/user \
    -d '{"email":"luka23@gmail.com", "firstName":"luka", "lastName": "modirc"}'

aws lambda invoke \
    --payload '{ "body": { "email": "bellingham23@gmail.com", "firstName": "jude", "lastName": "bellingham" } }' \
    --function-name RestApi23-dev-createUser23 \
    --cli-binary-format raw-in-base64-out \
    --profile ped_aws --region us-east-1 \
    amrica23.json
    

aws lambda invoke \
    --payload '{ "body": { "email": "joselue@gmail.com", "firstName": "joselu", "lastName": "rm_striker" } }' \
    --function-name RestApi23-dev-createUser23 \
    --cli-binary-format raw-in-base64-out \
    --profile ped_aws --region us-east-1 \
    /dev/stdout
