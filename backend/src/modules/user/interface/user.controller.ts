import { Request, Response } from 'express';

export class SignUpController {
  login(req: Request, res: Response) {
    console.log(req.body);
    
    const { userName, password } = req.body;

    if (userName === 'goadler' && password === 'Amg4w4i-') {
      res.status(200).json({ message: 'Login successful!' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  }
}

// Include the SendinBlue library
var SibApiV3Sdk = require('sib-api-v3-sdk');
var defaultClient = SibApiV3Sdk.ApiClient.instance;

// Set your API key
var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = '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';

// Create an instance of the EmailCampaignsApi
var apiInstance = new SibApiV3Sdk.EmailCampaignsApi();

// Create an instance of CreateEmailCampaign
var emailCampaigns = new SibApiV3Sdk.CreateEmailCampaign();

// Define the campaign settings
emailCampaigns.name = "Campaign sent via the API";
emailCampaigns.subject = "My subject";
emailCampaigns.sender = {"name": "From name", "email": "gokuladler@gmail.com"};
emailCampaigns.type = "classic";

// Set the content that will be sent
emailCampaigns.htmlContent = 'Congratulations! You successfully sent this example campaign via the SendinBlue API.';

// Add recipient email addresses
emailCampaigns.recipients = {"listIds": [], "emailIds": ["gokul_adler@outlook.com"]};

// Make the API call to create and send the email campaign immediately
apiInstance.createEmailCampaign(emailCampaigns).then(function(data: any) {
  console.log('API called successfully. Returned data: ' + JSON.stringify(data));
}).catch(function(error: any) {
  console.error('Error creating campaign: ' + error);
});
