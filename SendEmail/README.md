This is a simple Azure Function that includes a single endpoint to send Contact Us Emails.

### Getting Started

#### Azure Function
1. Create an Azure Function following the official Azure guide.
1. Set the following settings in Azure Function Application settings found under Settings > Configurations
    1. FromEmail: "Value of the from email"
    1. FromPassword: "Value of the from password"
    1. ToEmail: "Value of the to email"

#### Setting up development environment
1. Clone this repository
1. Run the following command to fetch the settings locally: ``func azure functionapp fetch-app-settings demo-app-azure-fn``
1. Run the following command to build and run the function: ```npm run start```
1. You can also deploy any code changes back to Azure using the Visual Code Azure Function Plugin
1. Copy the function url from ``Azure Portal > Function > Get Function Url`` and paste it in the ReactNative backend hook file.