import * as azure from "@pulumi/azure";
import { AppService, Plan } from "@pulumi/azure/appservice";

const resourceGroupName = new azure.core.ResourceGroup("Reminder", {
    location: "westus2",
});

import * as helm from "@pulumi/kubernetes/helm";
import * as k8s from "@pulumi/kubernetes";
import { k8sCluster, k8sProvider } from "./cluster";


// const lco: helm.v2.LocalChartOpts = {
//     path: './charts/remindr',
// };
const appChart: helm.v2.ChartOpts = {
    chart: 'bitnami/node',
    values: {
        // image: {
        //     repository: 'ehazlett/docker-demo' 
        // },
        service: {
            type: 'LoadBalancer'
        }
    }
}

const remindrChart = new helm.v2.Chart(
    "remindr",
    appChart,
    { providers: { kubernetes: k8sProvider } }
);

export let cluster = k8sCluster.name;
//export let kubeConfig = k8sCluster.kubeConfigRaw;
export let serviceIP = remindrChart
    .getResourceProperty("v1/Service", "remindr-node", "status")
    .apply(status => status.loadBalancer.ingress[0].ip);