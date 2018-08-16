const sendGrid = require('sendgrid');
const helper = sendGrid.mail;
const config = require('../config');

class Mailer extends helper.Mail {
    constructor({ subject, recipients }, template) {
        super();

        // sendGrid configuration
        this.sgApi = sendGrid(config.sendGridKey); // object to communicate with sendGrid 
        this.from_email = new helper.Email('no-reply@emaily.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', template);
        this.recipients = this.formatAddresses(recipients); // initial formatting

        // transformations
        this.addContent(this.body); // helper.Mail built-in fn, register body property
        this.addClickTracking(); // helper fn
        this.addRecipients(); // helper fn
    }

    formatAddresses(recipients) {
        return recipients.map(({ email }) => new helper.Email(email));
    }

    addClickTracking() {
        // sendGrid API
        // helper variables
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    addRecipients() {
        const personalize = new helper.Personalization();

        this.recipients.forEach(recipient => personalize.addTo(recipient));
        this.addPersonalization(personalize);
    }

    async send() {
        try {
            const request = this.sgApi.emptyRequest({
                method: 'POST',
                path: '/v3/mail/send',
                body: this.toJSON() // sendGrid fn
            });
    
            const response = await this.sgApi.API(request);
    
            return response;
        } catch(e) {
            console.log(`Error: ${e}`)
        }
    }
}

module.exports = Mailer;