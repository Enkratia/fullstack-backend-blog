export const subscriptionPost = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="ru" style="color-scheme: light dark; supported-color-schemes: light dark;" xml:lang="ru">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light dark" />
  <meta name="supported-color-schemes" content="light dark" />
  <title>Finsweet</title>
  

  <!--[if (gte mso 9)|(IE)]>
    <style type="text/css">
      table {border-collapse: collapse !important;}
    </style>
  <![endif]-->

  <!--[if (gte mso 9)|(IE)]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
<style>@media screen and (max-width: 399.98px) {
  .mobile-padding {
    padding-right: 10px !important; padding-left: 10px !important;
  }
  .mobile-col-padding {
    padding-right: 0 !important; padding-left: 0 !important;
  }
  .two-columns .column {
    width: 100% !important; max-width: 100% !important;
  }
  .two-columns .column img {
    width: 100% !important; max-width: 100% !important;
  }
  .three-columns .column {
    width: 100% !important; max-width: 100% !important;
  }
  .three-columns .column img {
    width: 100% !important; max-width: 100% !important;
  }
}
@media (prefers-color-scheme: dark) {
  table {
    background-color: #06080B !important;
  }
  td {
    background-color: #06080B !important;
  }
  h1 {
    color: #fffff1 !important;
  }
  h2 {
    color: #fffff1 !important;
  }
  h3 {
    color: #fffff1 !important;
  }
  p {
    color: #fffff1 !important;
  }
}
</style></head>

<body style="min-width: 100%; margin: 0; padding: 0;" bgcolor="#dde0e1">

  <!--[if (gte mso 9)|(IE)]>
      <style type="text/css">
         body {background-color: #dde0e1!important;}
         body, table, td, p, a {font-family: Verdana, sans-serif, Helvetica!important;}
         a {text-decoration: none;}
      </style>
   <![endif]-->

  <center style="width: 100%; table-layout: fixed; background-color: #dde0e1; padding-top: 40px; padding-bottom: 40px;">
    <div style="max-width: 600px; background-color: #fafdfe; box-shadow: 0 0 10px rgba(0, 0, 0, .2);">

      <!--[if (gte mso 9)|(IE)]>
        <table width="600" align="center" border="0" cellspacing="0" cellpadding="0" role="presentation"
          style="color: #000001;">
        <tr>
        <td>
      <![endif]-->

      <table align="center" border="0" cellspacing="0" cellpadding="0" role="presentation" style="color: #000001; font-family: Verdana, sans-serif, Helvetica; width: 100%; max-width: 600px; border-spacing: 0; mso-cellspacing: 0; mso-padding-alt: 0; margin: 0; padding: 0;" bgcolor="#fafdfe">

        <!-- Logo -->
        <tr>
          <td style="padding: 0;">
            <table align="center" border="0" cellspacing="0" cellpadding="0" role="presentation" style="width: 100%; border-spacing: 0; mso-cellspacing: 0; mso-padding-alt: 0;">
              <tr>
                <td style="padding: 24px;" align="center">
                  <a href="{{siteUrl}}" target="_blank" style="text-align: center; display: inline-block; text-decoration: none; color: #e8fbfa; font-size: 16px;">
                    <img src="https://i.ibb.co/dWTW9Tx/logo.png" alt="Finsweet_logo" border="0" width="120" />
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- End-Logo -->

        <!-- Hero -->
        <tr>
          <td style="padding: 0 24px 0px;">
            <table border="0" cellspacing="0" cellpadding="0" role="presentation" style="max-width: 600px; width: 100%; border-spacing: 0; mso-cellspacing: 0; mso-padding-alt: 0;">
              <tr>
                <td style="font-size: 0; padding: 0 0 25px;">
                  <div style="border-top-width: 1px; border-top-color: #f3f3f3; border-top-style: solid;"> </div>
                </td>
              </tr>

              <tr>
                <td style="padding: 0 0 30px;">
                  <h1 style="font-size: 30px; font-family: Georgia, Arial, sans-serif; font-style: normal; font-weight: 600; line-height: 1; color: #000001; margin: 0;" align="center">
                    Featured post
                  </h1>
                </td>
              </tr>

              <tr>
                <td style="padding: 0 0 25px;">
                  <img src="{{imageUrl}}" alt="Post_picture" border="0" width="552" style="width: 100%; max-width: 552px;" />
                </td>
              </tr>

              <tr>
                <td style="padding: 0 0 20px;">
                  <h2 style="font-size: 26px; font-family: Helvetica, Arial, sans-serif; font-style: normal; font-weight: 600; line-height: 1; color: #000001; margin: 0;" align="center">
                    {{title}}
                  </h2>
                </td>
              </tr>

              <tr>
                <td style="text-aliagn: center; padding: 0 0 20px;">
                  <p style="font-size: 16px; font-style: normal; font-weight: 400; line-height: 25px; color: #1C1E23; margin: 0;" align="center">
                    {{description}}</p>
                </td>
              </tr>

              <tr>
                <td align="center" style="padding: 0 0 50px;">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-spacing: 0; mso-cellspacing: 0; mso-padding-alt: 0;">
                    <tr>
                      <td align="center" style="border-radius: 20px; padding: 0;" bgcolor="#ffac00">
                        <a href="{{readMoreUrl}}" style="background-color: #ffac00; border-radius: 20px; color: #fffff1; font-family: Helvetica, Arial, sans-serif; display: block; font-size: 14px; font-weight: 600; font-style: normal; text-decoration: none; min-width: 28px; text-align: center; letter-spacing: 0px; padding: 10px 30px; border: 2px solid #ffac00;" target="_blank">
                          READ MORE
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- End Hero -->

        <!-- Footer -->
        <tr>
          <td style="font-size: 0; padding: 0 24px 24px;">
            <table align="center" border="0" cellspacing="0" cellpadding="0" role="presentation" style="width: 100%; border-spacing: 0; mso-cellspacing: 0; mso-padding-alt: 0;">
              <tr>
                <td style="padding: 0 0 24px;">
                  <div style="border-top-width: 1px; border-top-color: #f3f3f3; border-top-style: solid;"> </div>
                </td>
              </tr>

              <tr>
                <td align="center" style="font-size: 0; padding: 0 0 25px;" class="fourth-columns mobile-padding">
                  <!--[if (gte mso 9)|(IE)]>
                    <table border="0" cellspacing="0" cellpadding="0" role="presentation">
                    <tr>
                    <td>
                  <![endif]-->
                  <table border="0" cellspacing="0" cellpadding="0" role="presentation" style="vertical-align: middle; width: 100%; max-width: 26px; display: inline-block; border-spacing: 0; mso-cellspacing: 0; mso-padding-alt: 0;" class="column">
                    <tr>
                      <td style="padding: 4px;">
                        <table border="0" cellspacing="0" cellpadding="0" role="presentation" style="border-spacing: 0; mso-cellspacing: 0; mso-padding-alt: 0;">
                          <tr>
                            <td style="padding: 0;">
                              <a href="{{facebookLinkUrl}}" target="_blank" style="text-decoration: none; color: #e8fbfa; font-size: 16px;">
                                <img src="{{facebookImageUrl}}" alt="Facebook" border="0" width="18" style="max-width: 18px;" />
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  <!--[if (gte mso 9)|(IE)]>
                    </td>
                    <td>
                  <![endif]-->
                  <table border="0" cellspacing="0" cellpadding="0" role="presentation" style="vertical-align: middle; width: 100%; max-width: 26px; display: inline-block; border-spacing: 0; mso-cellspacing: 0; mso-padding-alt: 0;" class="column">
                    <tr>
                      <td style="padding: 4px;">
                        <table border="0" cellspacing="0" cellpadding="0" role="presentation" style="border-spacing: 0; mso-cellspacing: 0; mso-padding-alt: 0;">
                          <tr>
                            <td style="padding: 0;">
                              <a href="{{twitterLinkUrl}}" target="_blank" style="text-decoration: none; color: #e8fbfa; font-size: 16px;">
                                <img src="{{twitterImageUrl}}" alt="Facebook" border="0" width="18" style="max-width: 18px;" />
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  <!--[if (gte mso 9)|(IE)]>
                    </td>
                    <td>
                  <![endif]-->
                  <table border="0" cellspacing="0" cellpadding="0" role="presentation" style="vertical-align: middle; width: 100%; max-width: 26px; display: inline-block; border-spacing: 0; mso-cellspacing: 0; mso-padding-alt: 0;" class="column">
                    <tr>
                      <td style="padding: 4px;">
                        <table border="0" cellspacing="0" cellpadding="0" role="presentation" style="border-spacing: 0; mso-cellspacing: 0; mso-padding-alt: 0;">
                          <tr>
                            <td style="padding: 0;">
                              <a href="{{instagramLinkUrl}}" target="_blank" style="text-decoration: none; color: #e8fbfa; font-size: 16px;">
                                <img src="{{instagramImageUrl}}" alt="Facebook" border="0" width="18" style="max-width: 18px;" />
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  <!--[if (gte mso 9)|(IE)]>
                    </td>
                    <td>
                  <![endif]-->
                  <table border="0" cellspacing="0" cellpadding="0" role="presentation" style="vertical-align: middle; width: 100%; max-width: 26px; display: inline-block; border-spacing: 0; mso-cellspacing: 0; mso-padding-alt: 0;" class="column">
                    <tr>
                      <td style="padding: 4px;">
                        <table border="0" cellspacing="0" cellpadding="0" role="presentation" style="border-spacing: 0; mso-cellspacing: 0; mso-padding-alt: 0;">
                          <tr>
                            <td style="padding: 0;">
                              <a href="{{linkedinLinkUrl}}" target="_blank" style="text-decoration: none; color: #e8fbfa; font-size: 16px;">
                                <img src="{{linkedinImageUrl}}" alt="Facebook" border="0" width="18" style="max-width: 18px;" />
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  <!--[if (gte mso 9)|(IE)]>
                    </td>
                    </tr>
                    </table>
                  <![endif]-->
                </td>
              </tr>

              <tr>
                <td style="text-aliagn: center; padding: 0 0 5px;">
                  <p style="font-size: 12px; font-style: normal; font-weight: 400; line-height: 25px; color: #1C1E23; margin: 0;" align="center">
                    You signed up for this email when you created subscription on Finsweeet</p>
                </td>
              </tr>

              <tr>
                <td style="padding: 0;" align="center">
                  <a style="text-decoration: underline; display: inline-block; text-align: center; color: #000001; font-size: 12px;" href="{{unsubscriptionLinkUrl}}">unsubscribe</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- End Footer -->

      </table>

      <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
      <![endif]-->

    </div>
  </center>

</body>

</html>
`;