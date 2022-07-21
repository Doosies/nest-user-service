import { Injectable } from '@nestjs/common';
import Mail from 'nodemailer/lib/mailer';
import * as nodemailer from 'nodemailer';

interface EmailOptinos {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class EmailService {
  private traspoter: Mail;

  constructor() {
    this.traspoter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'song961003.mail.master@gmail.com',
        pass: 'usvygdibhxsmgpkf'
      }
    });
  }

  async sendMemberJoinVerification(
    emailAddress: string,
    signupVerifyToken: string
  ) {
    const baseUrl = 'http://localhost:3000';

    const url = `${baseUrl}/users/email-verify?signupVerifyToken=${signupVerifyToken}`;
    const mailOptions: EmailOptinos = {
      to: emailAddress,
      subject: '가입 인증 메일',
      html: `
        가입확인 버튼을 누르시면 가입 인증이 완료욉니다.<br/>
        <form action="${url}" method="POST">
          <button>가입확인</button>
        </form>
      `
    };

    return await this.traspoter.sendMail(mailOptions);
  }
}
