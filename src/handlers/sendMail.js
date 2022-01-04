import AWS from 'aws-sdk';

const ses = new AWS.SES({ region: 'ap-southeast-1' });

async function sendMail(event, context) {
  const params = {
    Source: 'yadongguo@yahoo.com.sg',
    Destination: {
      ToAddresses: ['yadongguo@yahoo.com.sg'],
    },
    Message: {
      Body: {
        Text: {
          Data: 'Hello from Codingly!',
        },
      },
      Subject: {
        Data: 'Test Mail',
      },
    },
  };

  try {
    const result = await ses.sendEmail(params).promise();
    console.log(result);
    return result;
  } catch (e) {
    console.error(e);
  }
}

export const handler = sendMail;