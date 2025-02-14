import * as functions from 'firebase-functions/v2';
import admin from "firebase-admin";
import {Resend} from "resend";
import { setGlobalOptions } from "firebase-functions/v2";
import { defineSecret } from "firebase-functions/params";
setGlobalOptions({ region: 'europe-north1' });

admin.initializeApp();

const RESEND_API_KEY = defineSecret("RESEND_API_KEY");

/**
 * Utility function to send an email using Resend
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} html - Email body in HTML format
 */
async function sendEmail(to, subject, html) {

  try {
    const resendApiKey = RESEND_API_KEY.value();
    if (!resendApiKey) throw new Error('Missing API key for Resend');

    const resend = new Resend(resendApiKey);

    return resend.emails.send({
      from: "onboarding@resend.dev",
      to,
      subject,
      html,
    });
  } catch (error) {
    console.log("Error sending emails", error)
  }
  
}

export const processOrder = functions.https.onCall({secrets: [RESEND_API_KEY]}, async (data) => {

  try {
        const { orderDetails, userEmail, userName } =data.data;

        if(orderDetails.extra_field) {
            return {success: false}
        }

        // Customer Order Confirmation Email
        const customerEmailHTML = `
          <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h2 style="color: #0056b3; margin-bottom: 10px;">Hei ${userName},</h2>
            <p style="font-size: 16px; line-height: 1.5;">Kiitos tilauksestanne! Tässä tilausvahvistuksenne:</p>
            
            <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
              <tr>
                <td style="padding: 8px; font-weight: bold;">Tulostin:</td>
                <td style="padding: 8px;">${orderDetails.printerPackage}</td>
              </tr>
              <tr style="background-color: #f9f9f9;">
                <td style="padding: 8px; font-weight: bold;">Tulostimien määrä:</td>
                <td style="padding: 8px;">${orderDetails.printerQuantity}</td>
              </tr>
               <tr>
                <td style="padding: 8px; font-weight: bold;">Tilauksen hinta</td>
                <td style="padding: 8px;">${orderDetails.printerPrice * orderDetails.printerQuantity} €/kk</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold;">Ylläpitosopimuksen kesto:</td>
                <td style="padding: 8px;">${orderDetails.contractLength || "N/A"} kuukautta</td>
              </tr>
            </table>
            
            <p style="font-size: 14px; color: #555; margin-top: 20px;">Ystävällisin terveisin,<br><strong>EasyBee</strong></p>
          </div>
        `;
         

// Internal Order Notification Email (To You)
const internalOrderHTML = `
  <h2 style="font-family: Arial, sans-serif; color: black;">Uusi tilaus saapunut</h2>
  <div style="font-family: Arial, sans-serif; font-size: 14px; color: black;">
    <table style="width: 100%; border-collapse: collapse; border: 1px solid #ddd;">

      <tr style="background-color: #4CAF50; color: white; text-align: center; font-weight: bold;">
        <td colspan="2" style="padding: 10px; border: 1px solid #ddd;">Asiakastiedot</td>
      </tr>
      <tr><td style="font-weight: bold; background-color: #f1f1f1; padding: 10px; border: 1px solid #ddd;">Asiakasyrityksen nimi:</td>
        <td style="padding: 10px; border: 1px solid #ddd; color: black;">${orderDetails.companyName || "N/A"}</td></tr>
      <tr><td style="font-weight: bold; background-color: #f1f1f1; padding: 10px; border: 1px solid #ddd;">Asiakasyrityksen y-tunnus:</td>
        <td style="padding: 10px; border: 1px solid #ddd; color: black;">${orderDetails.businessId || "N/A"}</td></tr>
      <tr><td style="font-weight: bold; background-color: #f1f1f1; padding: 10px; border: 1px solid #ddd;">Asiakasyhteyshenkilön nimi:</td>
        <td style="padding: 10px; border: 1px solid #ddd; color: black;">${orderDetails.customerName || "N/A"}</td></tr>

        <tr><td style="font-weight: bold; background-color: #f1f1f1; padding: 10px; border: 1px solid #ddd;">Osoite:</td>
          <td style="padding: 10px; border: 1px solid #ddd; color: black;">${orderDetails.address}, ${orderDetails.city}, ${orderDetails.postalCode}</td></tr>
        <tr><td style="font-weight: bold; background-color: #f1f1f1; padding: 10px; border: 1px solid #ddd;">Email:</td>
          <td style="padding: 10px; border: 1px solid #ddd; color: black;">${orderDetails.email}</td></tr>
        <tr><td style="font-weight: bold; background-color: #f1f1f1; padding: 10px; border: 1px solid #ddd;">Puhelin:</td>
          <td style="padding: 10px; border: 1px solid #ddd; color: black;">${orderDetails.phone}</td></tr>

      <tr style="background-color: #4CAF50; color: white; text-align: center; font-weight: bold;">
        <td colspan="2" style="padding: 10px; border: 1px solid #ddd;">Tilaustiedot</td>
      </tr>
      <tr><td style="font-weight: bold; background-color: #f1f1f1; padding: 10px; border: 1px solid #ddd;">Tulostin:</td>
        <td style="padding: 10px; border: 1px solid #ddd; color: black;">${orderDetails.printerPackage || "N/A"}</td></tr>
      <tr><td style="font-weight: bold; background-color: #f1f1f1; padding: 10px; border: 1px solid #ddd;">Tulostimien määrä:</td>
        <td style="padding: 10px; border: 1px solid #ddd; color: black;">${orderDetails.printerQuantity || "N/A"}</td></tr>
      
        <tr><td style="font-weight: bold; background-color: #f1f1f1; padding: 10px; border: 1px solid #ddd;">Ylläpitosopimuksen kesto:</td>
          <td style="padding: 10px; border: 1px solid #ddd; color: black;">${orderDetails.contractLength || "N/A"} kuukautta</td></tr>


      <tr style="background-color: #4CAF50; color: white; text-align: center; font-weight: bold;">
        <td colspan="2" style="padding: 10px; border: 1px solid #ddd;">Tekniset tiedot</td>
      </tr>
      <tr><td style="font-weight: bold; background-color: #f1f1f1; padding: 10px; border: 1px solid #ddd;">IP:</td>
        <td style="padding: 10px; border: 1px solid #ddd; color: black;">${orderDetails.ipAddress || "N/A"}</td></tr>
      <tr><td style="font-weight: bold; background-color: #f1f1f1; padding: 10px; border: 1px solid #ddd;">Maski:</td>
        <td style="padding: 10px; border: 1px solid #ddd; color: black;">${orderDetails.mask || "N/A"}</td></tr>

        <tr><td style="font-weight: bold; background-color: #f1f1f1; padding: 10px; border: 1px solid #ddd;">Yhdyskäytävä / Gateway:</td>
          <td style="padding: 10px; border: 1px solid #ddd; color: black;">${orderDetails.gateway || "N/A"}</td></tr>
        <tr><td style="font-weight: bold; background-color: #f1f1f1; padding: 10px; border: 1px solid #ddd;">DNS-osoite:</td>
          <td style="padding: 10px; border: 1px solid #ddd; color: black;">${orderDetails.dnsAddress || "N/A"}</td></tr>
        <tr><td style="font-weight: bold; background-color: #f1f1f1; padding: 10px; border: 1px solid #ddd;">HOST-nimi:</td>
          <td style="padding: 10px; border: 1px solid #ddd; color: black;">${orderDetails.hostName || "N/A"}</td></tr>
        <tr><td style="font-weight: bold; background-color: #f1f1f1; padding: 10px; border: 1px solid #ddd;">Sähköpostipalvelimen osoite:</td>
          <td style="padding: 10px; border: 1px solid #ddd; color: black;">${orderDetails.emailServerAddress || "N/A"}</td></tr>
        <tr><td style="font-weight: bold; background-color: #f1f1f1; padding: 10px; border: 1px solid #ddd;">Proxy serverin osoite:</td>
          <td style="padding: 10px; border: 1px solid #ddd; color: black;">${orderDetails.proxyServerAddress || "N/A"}</td></tr>
        <tr><td style="font-weight: bold; background-color: #f1f1f1; padding: 10px; border: 1px solid #ddd;">Proxy portti:</td>
          <td style="padding: 10px; border: 1px solid #ddd; color: black;">${orderDetails.proxyPort || "N/A"}</td></tr>
    </table>
  </div>
`;

 // Billing Email (To Billing Team) / Laskutus
     const billingEmailHTML = `
     <h2>Laskutustiedot</h2>
     <p><strong>Yrityksen nimi:</strong> ${orderDetails.companyName || "N/A"}</p>
     <p><strong>Yrityksen Y-tunnus:</strong> ${orderDetails.businessId || "N/A"}</p>
     <p><strong>Asiakas:</strong> ${userName}</p>
     <p><strong>Sähköposti:</strong> ${userEmail}</p>
     <p><strong>Sopimuksen kesto:</strong> ${orderDetails.contractLength}</p>
     <p>Laskutus laskutus laskutus laskutus laskutus</p>
   `; 

// To stop error of "not being used" when not in testing while in prod
console.log(internalOrderHTML.length, billingEmailHTML.length)


    // Send all emails concurrently
    // TODO: resend only allows 2 email resends per second
    await Promise.all([
      sendEmail(userEmail, `Tilausvahvistus - Kiitos, ${userName}!`, customerEmailHTML),
      //sendEmail(userEmail, `Uusi tilaus saapunut  - ${orderDetails.companyName}`, internalOrderHTML),
      // sendEmail(userEmail, "Uusi laskutus", billingEmailHTML),
    ]);

        /*    
        companyName: "",
            businessId: "",
            customerName: "",
            address: "",
            city: "",
            postalCode: "",
            email: "",
            phone: "",
            printerPackage: "C133i",
            printerQuantity: 1,
            contractLength: "",
            ipAddress: "",
            mask: "",
            gateway: "",
            dnsAddress: "",
            hostName: "",
            emailServerAdress: "",
            email2: "",
            proxyServerAdress: "",
            proxyPort: "", */

        // Return success response to the caller
        return { success: true };
      } catch (error) {
        console.error('Error prosessing orders:', error);
        return { success: false, error: error.message };
      }
    });
