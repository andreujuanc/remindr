const azure = require("@pulumi/azure")

const resourceGroupName = new azure.core.ResourceGroup("my-group", {
    location: "westus2",
});
