echo STARTING
az login --service-principal -u $ARM_CLIENT_ID -p $ARM_CLIENT_SECRET --tenant $ARM_TENANT_ID
echo $ARM_SUBSCRIPTION_ID
cd /infrasource
# rm key.rsa
# rm key.rsa.pub
pulumi stack select andreujuanc/remindr/various
# pulumi config set azure:environment public
# pulumi config set password --secret $CLUSTER_PASSWORD
# ssh-keygen -t rsa -f key.rsa
# pulumi config set sshPublicKey < key.rsa.pub
pulumi up