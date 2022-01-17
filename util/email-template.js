class emailTemplate {
    static newsLetter(to, name, emailData, imageFile) {
        const generatedEmail = `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
        <head>
            <!--[if gte mso 9]>
            <xml>
                <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
                </o:OfficeDocumentSettings>
            </xml>
            <![endif]-->
            <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="format-detection" content="date=no" />
            <meta name="format-detection" content="address=no" />
            <meta name="format-detection" content="telephone=no" />
            <meta name="x-apple-disable-message-reformatting" />
            <!--[if !mso]><!-->
            <link href="https://fonts.googleapis.com/css?family=Merriweather:400,400i,700,700i" rel="stylesheet" />
            <!--<![endif]-->
            <title>Bond</title>
            <!--[if gte mso 9]>
            <style type="text/css" media="all">
                sup { font-size: 100% !important; }
            </style>
            <![endif]-->
            
        
            <style type="text/css" media="screen">
                /* Linked Styles */
                body { padding:0 !important; margin:0 !important; display:block !important; min-width:100% !important; width:100% !important; background:#1a2532; -webkit-text-size-adjust:none }
                a { color:#000001; text-decoration:none }
                p { padding:0 !important; margin:0 !important } 
                img { -ms-interpolation-mode: bicubic; /* Allow smoother rendering of resized image in Internet Explorer */ }
                .mcnPreviewText { display: none !important; }
        
                        
                /* Mobile styles */
                @media only screen and (max-device-width: 480px), only screen and (max-width: 480px) {
                    .mobile-shell { width: 100% !important; min-width: 100% !important; }
                    .bg { background-size: 100% auto !important; -webkit-background-size: 100% auto !important; }
                    
                    .text-header,
                    .m-center { text-align: center !important; }
                    
                    .center { margin: 0 auto !important; }
                    .container { padding: 20px 10px !important }
                    
                    .td { width: 100% !important; min-width: 100% !important; }
        
                    .m-br-15 { height: 15px !important; }
                    .p30-15 { padding: 30px 15px !important; }
                    .p0-15-30 { padding: 0px 15px 30px 15px !important; }
                    .mpb30 { padding-bottom: 30px !important; }
        
                    .m-td,
                    .m-hide { display: none !important; width: 0 !important; height: 0 !important; font-size: 0 !important; line-height: 0 !important; min-height: 0 !important; }
        
                    .m-block { display: block !important; }
        
                    .fluid-img img { width: 100% !important; max-width: 100% !important; height: auto !important; }
        
                    .column,
                    .column-dir,
                    .column-top,
                    .column-empty,
                    .column-empty2,
                    .column-dir-top { float: left !important; width: 100% !important; display: block !important; }
        
                    .column-empty { padding-bottom: 30px !important; }
                    .column-empty2 { padding-bottom: 10px !important; }
        
                    .content-spacing { width: 15px !important; }
                }
            </style>
        </head>
        <body class="body" style="padding:0 !important; margin:0 !important; display:block !important; min-width:100% !important; width:100% !important; background:#1a2532; -webkit-text-size-adjust:none;">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#ebe3db">
                <tr>
                    <td align="center" valign="top">
                        <table width="650" border="0" cellspacing="0" cellpadding="0" class="mobile-shell">
                            <tr>
                                <td class="td container" style="width:650px; min-width:650px; font-size:0pt; line-height:0pt; margin:0; font-weight:normal; padding:55px 0px;">
                                    <!-- Header -->
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td class="p30-15 tbrr" style="padding: 30px; border-radius:12px 12px 0px 0px;" bgcolor="#ffffff">
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <th class="column-top" width="145" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                <tr>
                                                                    <td class="img m-center" style="font-size:0pt; line-height:0pt; text-align:left;">
                                                                        <img src="http://18.140.7.221:3002/images/logo.png" width="166" height="39" border="0" alt="" />
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </th>
                                                        <th class="column-empty2" width="1" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;"></th>
                                                        
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                    <!-- END Header -->
        
                                    <!-- Hero Image -->
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td class="fluid-img" style="font-size:0pt; line-height:0pt; text-align:left;">
                                                <img src="http://18.140.7.221:3002/upload/${imageFile.filename}" border="0" width="650" height="366" alt="" />
                                            </td>
                                        </tr>
                                    </table>
                                    <!-- END Hero Image -->
        
                                    <!-- Intro -->
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff">
                                        <tr>
                                            <td style="padding-bottom: 10px;">
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td class="p30-15" style="padding: 60px 30px;">
                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                <tr>
                                                                    <td class="h1 pb25" style="color:#444444; font-family:'Merriweather', Georgia,serif; font-size:35px; line-height:42px; text-align:center; padding-bottom:25px;">Hi ${name},</td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="text-center pb25" style="color:#666666; font-family:Arial,sans-serif; font-size:16px; line-height:30px; text-align:center; padding-bottom:25px;">${emailData.body}
                                                                    </td>
                                                                </tr>
                                                                
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                    <!-- END Intro -->
        
                                    
        
                                    <!-- Footer -->
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td class="p30-15 bbrr" style="padding: 50px 30px; border-radius:0px 0px 12px 12px;" bgcolor="#ffffff">
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td align="center" style="padding-bottom: 30px;">
                                                            <table border="0" cellspacing="0" cellpadding="0">
                                                                <tr>
                                                                    <td class="img" width="55" style="font-size:0pt; line-height:0pt; text-align:left;">
                                                                        <a href="#" target="_blank">
                                                                            <img src="http://18.140.7.221:3002/images/t2_facebook.jpg" width="34" height="34" border="0" alt="" />
                                                                        </a>
                                                                    </td>
                                                                    <td class="img" width="55" style="font-size:0pt; line-height:0pt; text-align:left;">
                                                                        <a href="#" target="_blank">
                                                                            <img src="http://18.140.7.221:3002/images/t2_twitter.jpg" width="34" height="34" border="0" alt="" />
                                                                        </a>
                                                                    </td>
                                                                    <td class="img" width="55" style="font-size:0pt; line-height:0pt; text-align:left;">
                                                                        <a href="https://instagram.com/bond.jkt?utm_medium=copy_link" target="_blank">
                                                                            <img src="http://18.140.7.221:3002/images/t2_instagram.jpg" width="34" height="34" border="0" alt="">
                                                                        </a>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-footer1 pb10" style="color:#999999; font-family:Arial,sans-serif; font-size:14px; line-height:20px; text-align:center; padding-bottom:10px;">Bond Jakarta</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-footer2" style="color:#999999; font-family:Arial,sans-serif; font-size:12px; line-height:26px; text-align:center;">Jl. Suryo No.28, Kec. Kby. Baru, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12180</td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="text-footer3" style="padding: 40px 15px 0px; color:#425f8e; font-family:Arial,sans-serif; font-size:12px; line-height:26px; text-align:center;">
                                                <a href="#" target="_blank" class="link-blue-u" style="color:#425f8e; text-decoration:underline;"><span class="link-blue-u" style="color:#425f8e; text-decoration:underline;">Unsubscribe</span></a> from this mailing list.
                                            </td>
                                        </tr>
                                    </table>
                                    <!-- END Footer -->
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        `
        return generatedEmail
    }
}

module.exports = {emailTemplate}