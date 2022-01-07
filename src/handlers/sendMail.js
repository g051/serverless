import AWS from 'aws-sdk';

const ses = new AWS.SES({ region: 'ap-southeast-1' });

async function sendMail(event, context) {
  const record = event.Records[0];
  console.log('record processing', record);

  const { subject, body, recipient } = JSON.parse(record.body);
  const params = {
    Source: 'yadongguo@yahoo.com.sg',
    Destination: {
      ToAddresses: [recipient],
    },
    Message: {
      Body: {
        Text: {
          Data: body,
        },
      },
      Subject: {
        Data: subject,
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