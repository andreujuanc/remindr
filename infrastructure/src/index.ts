import * as azure from "@pulumi/azure";
import { AppService, Plan } from "@pulumi/azure/appservice";

const resourceGroupName = new azure.core.ResourceGroup("Reminder", {
    location: "westus2",
});

import * as helm from "@pulumi/kubernetes/helm";
import * as k8s from "@pulumi/kubernetes";
import { k8sCluster, k8sProvider } from "./cluster";

const apache = new helm.v2.Chart(
    "apache",
    {
        repo: "bitnami",
        chart: "apache",
        version: "1.0.0"
    },
    { providers: { kubernetes: k8sProvider } }
);

export let cluster = k8sCluster.name;
export let kubeConfig = k8sCluster.kubeConfigRaw;
export let serviceIP = apache
    .getResourceProperty("v1/Service", "apache-apache", "status")
.apply(status => status.loadBalancer.ingress[0].ip);