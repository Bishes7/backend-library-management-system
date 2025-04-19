export const userActivationLinkTemplate = ({ email, name, url }) => {
  return {
    from: `"Local Library" <${process.env.SMTP_EMAIL}>`, // sender address
    to: email, // list of receivers
    subject: "Activate your account", // Subject line
    text: `Hello ${name}, Follow the link to activate your account ${url} `, // plain text body
    html: `
    <p>Hello ${name}</p>
    <br/>
<br/>
<p>Your account has been created. Click the button below to activate your account</p>
<br/>
<br/>
<a href = ${url}>
<button style = "background:blue; color:white; padding:5px">Activate Now</button> </a>

<br/>
<br/>

Regards
B&B Enterprises
    
    `, // html body
  };
};

export const userActivatedTemplate = ({ email, name }) => {
  return {
    from: `"Local Library" <${process.env.SMTP_EMAIL}>`, // sender address
    to: email, // list of receivers
    subject: "Account- Activated", // Subject line
    text: `Hello ${name}, Your account has been activated`, // plain text body
    html: `
    <p>Hello ${name}</p>
    <br/>
<br/>
<p>You account is activated, Login now </p>
<br/>
<br/>


Regards
B&B Enterprises
    
    `, // html body
  };
};
