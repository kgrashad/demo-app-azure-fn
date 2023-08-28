import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { BlobSASPermissions, BlobServiceClient, StorageSharedKeyCredential, generateBlobSASQueryParameters } from "@azure/storage-blob";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const account = process.env["StorageAccount"] ?? '';
    const accountKey = process.env["StorageKey"] ?? '';
    const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
    const blobServiceClient = new BlobServiceClient(
        `https://${account}.blob.core.windows.net`,
        sharedKeyCredential
    );

    const containerName = process.env["StorageContainerName"] ?? 'demo-app-files';
    const blobName = req.query.fileName;

    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlobClient(blobName);

    // Generate SAS token
    const expiresOn = new Date();
    expiresOn.setMinutes(expiresOn.getMinutes() + 5); // Expires in 5 minutes
    const permissions = BlobSASPermissions.parse("r"); // Read-only permissions

    const sasQueryParams = generateBlobSASQueryParameters(
        {
            containerName,
            blobName,
            permissions,
            expiresOn,
        },
        sharedKeyCredential
    ).toString();

    // Create SAS URL
    const sasUrl = `${blobClient.url}?${sasQueryParams}`;

    context.res = {
        status: 200,
        body: {
            sasUrl
        },
        headers: {
            "Content-Type": "application/json"
        }
    };
};

export default httpTrigger;