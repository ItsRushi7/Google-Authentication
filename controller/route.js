const dotenv = require('dotenv')
const { OAuth2Client } = require('google-auth-library');


dotenv.config()

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID); // Store your client ID in an environment variable

async function Google_Authentication(req,res) {
     const { credential } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that the ID token is intended for
    });
    const payload = ticket.getPayload();
    const googleId = payload['sub'];
    const email = payload['email'];
    const name = payload['name'];
    const picture = payload['picture'];

    // For this basic example, let's just store the user info in the session
    req.session.googleId = googleId;
    req.session.email = email;
    req.session.name = name;
    req.session.picture = picture;
    req.session.loggedIn = true;

    return res.status(200).json({ message: 'Google sign-in successful' });

  } catch (error) {
    console.error('Error verifying Google ID token:', error);
    return res.status(401).json({ error: 'Invalid Google ID token' });
  }
}

async function Check_Details(req,res) {
//     if (req.session.loggedIn) {
//     res.json({
//       googleId: req.session.googleId,
//       email: req.session.email,
//       name: req.session.name,
//       picture: req.session.picture,
//     });
//   } else {
//     res.status(401).json({ message: 'Not logged in' });
//   }

res.render('home')
}

function main(req,res) {
    res.render('login')
}

module.exports = {
    Google_Authentication,
    Check_Details,
    main
}