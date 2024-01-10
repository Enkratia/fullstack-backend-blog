export const emailActivation = `
<!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office" lang="ru">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light dark" />
  <meta name="supported-color-schemes" content="light dark" />
  <title>Finsweet</title>
  <style type="text/css">
    table {
      border-spacing: 0;
      mso-cellspacing: 0;
      mso-padding-alt: 0;
    }

    td {
      padding: 0;
    }

    #outlook a {
      padding: 0;
    }

    a {
      text-decoration: none;
      color: #e8fbfa;
      font-size: 16px;
    }

    @media screen and (max-width: 599.98px) {}

    @media screen and (max-width: 399.98px) {
      .mobile-padding {
        padding-right: 10px !important;
        padding-left: 10px !important;
      }

      .mobile-col-padding {
        padding-right: 0 !important;
        padding-left: 0 !important;
      }

      .two-columns .column {
        width: 100% !important;
        max-width: 100% !important;
      }

      .two-columns .column img {
        width: 100% !important;
        max-width: 100% !important;
      }

      .three-columns .column {
        width: 100% !important;
        max-width: 100% !important;
      }

      .three-columns .column img {
        width: 100% !important;
        max-width: 100% !important;
      }
    }

    /* Custom Dark Mode Colors */
    :root {
      color-scheme: light dark;
      supported-color-schemes: light dark;
    }

    @media (prefers-color-scheme: dark) {

      table,
      td {
        background-color: #06080B !important;
      }

      h1,
      h2,
      h3,
      p {
        color: #ffffff !important;
      }
    }
  </style>

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
</head>

<body style="Margin:0;padding:0;min-width:100%;background-color:#dde0e1;">

  <!--[if (gte mso 9)|(IE)]>
      <style type="text/css">
         body {background-color: #dde0e1!important;}
         body, table, td, p, a {font-family: Verdana, sans-serif, Helvetica!important;}
      </style>
   <![endif]-->

  <center style="width: 100%;table-layout:fixed;background-color: #dde0e1;padding-top: 40px;padding-bottom: 40px;">
    <div style="max-width: 600px;background-color: #fafdfe;box-shadow: 0 0 10px rgba(0, 0, 0, .2);">

      <!-- Preheader (remove comment) -->
      <div
        style="font-size: 0px;color: #fafdfe;line-height: 1px;mso-line-height-rule:exactly;display: none;max-width: 0px;max-height: 0px;opacity: 0;overflow: hidden;mso-hide:all;">
        Стартовое описание
      </div>
      <!-- End Preheader (remove comment) -->

      <!--[if (gte mso 9)|(IE)]>
        <table width="600" align="center" border="0" cellspacing="0" cellpadding="0" role="presentation"
          style="color: #000000;">
        <tr>
        <td>
      <![endif]-->

      <table align="center" border="0" cellspacing="0" cellpadding="0" role="presentation"
        style="color:#000000;font-family: Verdana, sans-serif, Helvetica;background-color: #fafdfe;Margin:0;padding:0;width: 100%;max-width: 600px;">

        <!-- Hello -->
        <tr>
          <td style="padding: 24px;">
            <table border="0" cellspacing="0" cellpadding="0" role="presentation" style="max-width: 600px;width: 100%;">

              <!-- Logo -->
              <tr>
                <td>
                  <table align="center" border="0" cellspacing="0" cellpadding="0" role="presentation"
                    style="width: 100%;">
                    <tr>
                      <td style="padding: 19px 0 19px 0;text-align: center;">
                        <a href="{{siteUrl}}" target="_blank" style="text-align: center;">
                          <img src="https://i.ibb.co/dWTW9Tx/logo.png" alt="Finsweet_logo" border="0" width="120" />
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <!-- End-Logo -->

              <tr>
                <td style="padding: 0 0 25px 0;">
                  <div style="width: 100%;height: 1px;background-color: #f3f3f3;"></div>
                </td>
              </tr>

              <tr>
                <td style="padding: 0 0 20px 0;">
                  <h1
                    style="margin: 0;font-size: 30px;font-style: normal;font-weight: 400;line-height: 1;color: #000000;">
                    Hello!
                  </h1>
                </td>
              </tr>

              <tr>
                <td style="padding: 0 0 5px 0;">
                  <p style="margin: 0;font-size: 16px;">
                    You have indicated your email <a href="{{email}}" target="_blank"
                      style="text-decoration: none;color: #3366BB;font-size: 16px;">{{email}}</a>
                    on Finsweet.
                  </p>
                </td>
              </tr>

              <tr>
                <td style="padding: 0 0 20px 0;">
                  <p style="margin: 0;font-size: 16px;">
                    To confirm please follow this link:
                  </p>
                </td>
              </tr>

              <tr>
                <td style="padding: 0 0 25px 0;">
                  <a href="{{activationUrl}}" target="_blank"
                    style="text-decoration: none;color: #3366BB;font-size: 16px;">{{activationUrl}}</a>
                </td>
              </tr>

              <tr>
                <td style="padding: 0 0 25px 0;">
                  <p style="margin: 0;font-size: 16px;">
                    If you don't register with Finsweet, feel free to ignore this email. Chances are, someone entered
                    your email address in error.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- End Hello -->

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
