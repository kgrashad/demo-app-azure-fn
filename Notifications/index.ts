import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { CosmosClient, CosmosClientOptions } from "@azure/cosmos";

const endpoint = process.env["CosmosEndpoint"];
const key = process.env["CosmosKey"];
const databaseId = process.env["DatabaseId"] ?? 'DemoApp';
const containerId = process.env["NotificationsContainerId"] ?? 'Notifications';
const client = new CosmosClient({ endpoint, key } as CosmosClientOptions);
const container = client.database(databaseId).container(containerId);

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');

    const querySpec = {
        query: "SELECT * FROM c"
    };

    const { resources: items } = await container.items.query(querySpec).fetchAll();

    context.res = {
        body: items,
        headers: {
            'Content-Type': 'application/json'
        }
    };
};


export default httpTrigger;