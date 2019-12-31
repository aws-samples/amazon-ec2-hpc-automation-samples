""" Lambda to launch ec2-instances """
import boto3
client = boto3.client('ec2')
REGION = 'us-east-1' # region to launch instance.
EC2 = boto3.client('ec2', region_name=REGION)
def lambda_to_ec2(event, context):
    response = EC2.request_spot_fleet(
        SpotFleetRequestConfig={
            'IamFleetRole': ‘<<IAM role created for Spot Instances. This should let them access S3 and cloudwatch>>’,
            'LaunchTemplateConfigs': [
              {
                'LaunchTemplateSpecification': {
                   'LaunchTemplateId': '<<ID of the Launch template created in EC2>>',
                #  'LaunchTemplateName': '<<Name of the Launch Template created>>',
                  'Version': '1'
                },
                'Overrides': [
                  {
                    'AvailabilityZone': 'us-east-1b',
                    'InstanceType':  'c4.large' ,
                    'SpotPrice': '0.4',
                    'SubnetId': '<<SUBNET ID in which you want to deploy the Spot Instances.>>'
                  },
                 
                ]
              },
              
            ],
            'SpotPrice': '0.4',
            'TargetCapacity': 1
        },
    )
    print(response)
