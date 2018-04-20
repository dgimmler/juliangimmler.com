var contentfulManagement = require('contentful-management');

const CONFIG = {
  space: '<space id>',
  accessMgmtToken: '<access token>'
};


var mgmtClient = contentfulManagement.createClient({
    accessToken: CONFIG.accessMgmtToken
});

exports.handler = async (event) => {
    var responseBody = {};

    try{
        return mgmtClient.getSpace(CONFIG.space).then((space) => {
            return (space.createEntry('email',{
                fields: {
                    name: {
                        'en-US': event.name
                    },
                    email: {
                        'en-US': event.email
                    },
                    subject: {
                        'en-US': event.subject
                    },
                    body: {
                        'en-US': event.message
                    }
                }
            })
            .then((entry) => {
                return(entry.publish()
                    .then(response => {
                      responseBody = response;

                      return {
                        "statusCode": 200,
                        "headers": {
                          "Access-Control-Allow-Origin": "*"
                        },
                        "body": JSON.stringify(responseBody)
                      }
                    })
                );
            }))
        })
    } catch(err){
      responseBody = {
        "Reason" : "Something went wrong...",
        "ErrorMessage" : err,
        "Event" : event
      };

      return {
        "statusCode": 200,
        "headers": {
          "Access-Control-Allow-Origin": "*"
        },
        "body": JSON.stringify(responseBody)
      }
    }
};
