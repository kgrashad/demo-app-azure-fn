This is a simple Azure Function that includes a single endpoint to fetch notifications from a Cosmos DB.

### Getting Started

#### Cosmos DB
1. Create a Cosmos NoSQL DB following the official Azure guide.
1. Create a Container inside it called 'Notifications'
1. Add a few notification messages under Items
1. Note down Cosmos DB endpoint and key as we will need them later

#### Azure Function
1. Create an Azure Function following the official Azure guide.
1. Set the following settings in Azure Function Application settings found under Settings > Configurations
    1. CosmosEndpoint: \<value copied from above\>
    1. CosmosKey: \<value copied from above\>
    1. DatabaseId: \<the name of the db you created>
    1. NotificationsContainerId: \<the name of the notifications container\>

#### Setting up development environment
1. Clone this repository
1. Run the following command to fetch the settings locally: ``func azure functionapp fetch-app-settings <FunctionAppName>``
1. Run the following command to build and run the function: ```npm run start```
1. You can also deploy any code changes back to Azure using the Visual Code Azure Function Plugin
1. Copy the function url from ``Azure Portal > Function > Get Function Url`` and paste it in the ReactNative backend hook file.