/**
 * --- INSTRUCTIONS FOR GOOGLE FORM INTEGRATION ---
 *
 * 1. Create a Google Form:
 *    - Go to forms.google.com.
 *    - Create a new form. Add fields for the customer to fill out, such as "Customer Name" and "Delivery Address".
 *    - Add two additional "Short answer" questions that the app will fill automatically:
 *      - Order Details
 *      - Total Price
 *
 * 2. Get the Form URL and Field IDs:
 *    - To get the Form URL: Click the "Send" button, go to the link tab (🔗), and copy the link.
 *      Paste the main part of the URL below (everything before "?usp=sharing").
 *      IT MUST LOOK LIKE: "https://docs.google.com/forms/d/e/1FAIpQLSdfEXAMPLE/viewform"
 *
 *    - To get the Field IDs: Click the three-dot menu (⋮) and select "Get pre-filled link".
 *    - Enter sample text ONLY in the "Order Details" and "Total Price" fields you created.
 *    - Click "Get link" and copy the generated URL.
 *    - From the copied URL, find the parts that look like `entry.123456789=...`. The number is the ID for that field.
 *    - Paste the corresponding numbers for `orderDetails` and `totalPrice` below.
 *
 * The app will open this form in a new tab with the order details and total price already filled in.
 * The customer will then enter their name and address and submit the form to complete the order.
 */

// --- PASTE YOUR VALUES FROM YOUR GOOGLE FORM BELOW ---
// IMPORTANT: Replace the placeholder URL and entry IDs with your actual Google Form values.
// The URL below is a placeholder and WILL NOT work.

// Example: "https://docs.google.com/forms/d/e/1FAIpQLSdfEXAMPLE/viewform"
export const GOOGLE_FORM_URL = "https://form.svhrt.com/68d2c4d2d3fc5cf9b4e16d9b";

// Example: { orderDetails: 'entry.123456789', totalPrice: 'entry.987654321' }
export const GOOGLE_FORM_FIELD_IDS = {
    orderDetails: 'entry.1000003',
    totalPrice: 'entry.1000004',
};