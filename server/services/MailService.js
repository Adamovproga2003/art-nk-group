const SibApiV3Sdk = require('sib-api-v3-sdk');

class MailService {
    constructor() {
        const apiClient = SibApiV3Sdk.ApiClient.instance;

        apiClient.authentications['api-key'].apiKey = process.env.SEND_IN_BLUE_API_KEY;

        this.sendMailApi = new SibApiV3Sdk.TransactionalEmailsApi();
    }

    sendEmail = (receiverName, receiverEmail, senderName, subject, htmlContent, onSuccess, onError) => {
        console.log(process.env.EMAIL_FROM)
        const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
        sendSmtpEmail.to = [{ name: receiverName, email: receiverEmail }];
        sendSmtpEmail.sender = { name: senderName, email: process.env.EMAIL_FROM }
        sendSmtpEmail.subject = subject;
        sendSmtpEmail.htmlContent = htmlContent;
        this.sendMailApi.sendTransacEmail(sendSmtpEmail).then(
            data => {
                onSuccess(data);
            },
            error => {
                console.error(error);
                onError(error);
            }
        )
    }
}

const mailServiceInstance = new MailService();

module.exports.mailServiceInstance = mailServiceInstance;