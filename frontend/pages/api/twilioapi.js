import twilio from 'twilio';

export default async function handler(req, res) {
    try {
      const { country, state, lga, first_name, last_name, phone, OTP } = req.body;

      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const client = twilio(accountSid, authToken);
       
        await client.messages.create({
        body:`Hi ${first_name} ${last_name}! You are welcome to the Sigma Nigeria portal. Your state is ${state} state and your Local Government Area is ${lga}. 
        Kindly input the OTP code received to proceed to the next step to vote for your preferred candidate. 
        Your OTP code is ${OTP}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: `${phone}`,
      });
      res.status(200).json({ message: 'Message sent successfully' });
      console.log( country, state, lga, first_name, last_name, phone, OTP );
    } catch (error) {
      console.error("Twilio API Error:", error);
      res.status(500).json({ error: 'An error occurred while sending the message' });
    }
}
