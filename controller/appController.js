const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
require('dotenv').config();

// const { EMAIL, PASSWORD } = require('../env.js')
const EMAIL= process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;
const SENDER_NAME= process.env.SENDER;

/** send mail from real gmail account */
const send_email = (req, res) => {


    const { recipient_email, recipient_name, busNumber, date, problems, comment, travleDate, approvalStatus } = req.body;

    let config = {
        service : 'gmail',
        auth : {
            user: EMAIL,
            pass: PASSWORD
        }
    }

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
        theme: "default",
        product : {
            name: SENDER_NAME,
            link : 'https://mailgen.js/'
        }
    })
// "Problems" : `${problems.join('\n')}`,
let all_problems ="";
problems.forEach(  (problem )=> { all_problems+= `<p>${problem}</p>\n`;  });

 let dataList = [
    {
        "Bus" : busNumber,
        "Kontrolldatum" : date,
        "Resedatum": travleDate,
        "Status": approvalStatus
    }
];

 if( approvalStatus === "ej godkänd" ){
    dataList = [
        {
            "Bus" : busNumber,
            "Kontrolldatum" : date,
            "Resedatum": travleDate, 
            "Problem" : all_problems,
            "Beskrivning": comment,
            "Status": approvalStatus
        }
    ];

 }
 let response = {
    body: {
        name : recipient_name,
        intro: "Din bussrapport har kommit!",
        table : {
            data : dataList
        },
        outro: "Tack på förhand!"
    }
}
  
    let mail = MailGenerator.generate(response);

    let message = {
        from : EMAIL,
        to : recipient_email,
        subject: "Rapport om bussproblem",
        html: mail
    }

    transporter.sendMail(message).then(() => {
        return res.status(201).json({
            msg: "you should receive an email"
        })
    }).catch(error => {
        return res.status(500).json({ error })
    })

}


module.exports = {
    send_email
}