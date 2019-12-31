import boto3
client = boto3.client('ec2')
REGION = 'us-east-1' # region to launch instance.
EC2 = boto3.client('ec2', region_name=REGION)
def fleetCancel(event, context):
    response = client.cancel_spot_fleet_requests(
        SpotFleetRequestIds=[
            '<< The Spot Fleet Request IDs separated by comma. Eg: sfr-869c4bf2-a73f-4d56-a061-cacdbf10ca9e >>',
        ],
        TerminateInstances=True,
    )
    
    print(response)
