import FYSCloud from "https://cdn.fys.cloud/fyscloud/0.0.4/fyscloud.es6.min.js";
//local environment, change database to your own
FYSCloud.API.configure({
	url: "https://api.fys.cloud",
	apiKey: "fys_is101_2.ZkYZIDcFQuh8EKxc",
	database: "fys_is101_2_live",
	environment: "live",
});

// url is to connect to correct filesystem corresponding to environment
export const environmentUrl = "https://is101-2.fys.cloud";