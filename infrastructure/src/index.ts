import * as azure from "@pulumi/azure";
import { AppService, Plan } from "@pulumi/azure/appservice";

import { k8sCluster } from "./cluster";

export let cluster = k8sCluster.name;
export let kubeconfig = k8sCluster.kubeConfigRaw;