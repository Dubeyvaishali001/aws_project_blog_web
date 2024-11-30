# aws_project_blog_web


first create an iam role for lambda your project and attach s3fullaccesspermission and dynamodbfullaccess
then go to s3 and create a bucket make public add your html,css,js there 
then host statically
got o dynamo db and crete a table and 
go to lambda and create one function for creating post one for fteching and add exist iam role which created earlier 
paste .py files in your lambda functions
go to api gateway and create api with two methods get and post and deploy
copy api deploymnet code nad paste intpo your js file and again upload to your s3 bucket 
then use s3 bucket url to run the site 
Thank you........
