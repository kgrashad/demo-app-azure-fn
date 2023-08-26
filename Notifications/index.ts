import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    context.res = {
        body: [
            {
                messageId: '2',
                notification: {
                    body: 'Eid al-Adha is approaching! RSVP by Monday to reserve your spot for the community Eid prayer and festivities.',
                    title: 'Eid al-Adha Celebrations',
                },
                sentTime: 1692617163289
            },
            {
                messageId: '3',
                notification: {
                    body: 'Alhamdulillah, we have completed the renovation of the prayer area.',
                    title: 'Reopening!',
                },
                sentTime: 1692789963289
            },
        ],
        headers: {
            'Content-Type': 'application/json'
        }
    };
};

export default httpTrigger;