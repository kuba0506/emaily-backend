const config = require('../../config');

module.exports = (survey) => {
    return `
        <html>
            <body>
                <div style="text-align: center">
                    <h3>${survey.title || 'I\'d like your input!'}</h3>
                    <p>Please answer the following question.</p>
                    <p>${survey.body}</p>
                    <div>
                        <a href="${config.redirectDomain}/api/surveys/thanks">Yes</a>
                    </div>
                    <div>
                        <a href="${config.redirectDomain}/api/surveys/thanks">No</a>
                    </div>
                </div>
            </body>
        </html>
    `;
};