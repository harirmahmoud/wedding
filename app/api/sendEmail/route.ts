import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const {  subject,text } = await request.json();
    const transporter = nodemailer.createTransport({
        service:"gmail",
      
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.PASS
      },
      tls:{
        rejectUnauthorized:false
      }
    });

    await transporter.sendMail({
      from:process.env.EMAIL_FROM,
      to:process.env.EMAIL_to,
      subject,
      text
    });

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Invalid request body' },
      { status: 400 }
    );
  } }