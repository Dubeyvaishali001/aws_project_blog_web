import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('BlogPosts01')

def lambda_handler(event, context):
    # Scan table to fetch all posts
    response = table.scan()
    posts = response.get('Items', [])
    
    return {
        'statusCode': 200,
        'body': json.dumps(posts)
    }
