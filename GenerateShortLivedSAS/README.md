This is a simple Azure Function that receives a blob fileName and generates a blob link with a short lived SAS token.

### Getting Started

#### Storage
1. Create Azure Storage account following the official Azure guide.
1. Create a private container
1. Upload some static files to this container
1. Copy the account key. You will need it later.

#### Azure Function
1. Create an Azure Function following the official Azure guide.
1. Set the following settings in Azure Function Application settings found under Settings > Configurations
    1. StorageAccount: \<value copied from above\>
    1. StorageKey: \<value copied from above\>
    1. StorageContainerName: \<the name of the container you created>

#### Setting up development environment
1. Clone this repository
1. Run the following command to fetch the settings locally: ``func azure functionapp fetch-app-settings demo-app-azure-fn``
1. Run the following command to build and run the function: ```npm run start```
1. You can also deploy any code changes back to Azure using the Visual Code Azure Function Plugin
1. Copy the function url from ``Azure Portal > Function > Get Function Url`` and paste it in the ReactNative backend hook file.