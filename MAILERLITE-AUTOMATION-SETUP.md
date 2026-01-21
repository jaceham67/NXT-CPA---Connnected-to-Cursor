# MailerLite Setup: Automatic Welcome Emails

## Goal: Send an automatic email immediately when someone subscribes

This requires two steps:
1. **Set up an Automation in MailerLite** (to send the welcome email)
2. **Integrate MailerLite form on your website**

---

## Step 1: Create Welcome Email Automation in MailerLite

### A. Create a Welcome Email Template
1. Log in to MailerLite
2. Go to **Campaigns** → **Email Templates**
3. Click **Create Email** → **Email**
4. Design your welcome email with content like:
   - "Welcome to NXT CPA!"
   - "Thank you for subscribing to our weekly internship newsletter"
   - "You'll receive tips, opportunities, and insights every week"
5. Save the email template

### B. Create an Automation Workflow
1. Go to **Automation** → **Create Automation**
2. Choose **"When someone subscribes to a group"** or **"When subscriber is added to a group"**
3. Select your newsletter/group (the one connected to your form)
4. Add the **"Send email"** action
5. Select your welcome email template
6. Set timing: **Immediately** (0 days, 0 hours, 0 minutes)
7. Activate the automation

**OR Use MailerLite's Built-in Welcome Email:**
1. Go to **Forms** → Select your form
2. Click **Settings** or **Form Settings**
3. Look for **"Welcome email"** or **"Auto-responder"** option
4. Enable it and customize the message
5. Save

---

## Step 2: Get Your MailerLite Form Embed Code

### Option A: Use MailerLite's Embedded Form (Easiest - Automatically Sends Welcome Email)

1. Go to **Forms** in MailerLite dashboard
2. Click on your newsletter form (or create a new one)
3. Click **Get code** or **Embed**
4. Choose **"Embedded form"** or **"Popup/Popup form"**
5. Copy the **HTML code** (it will look like this):

```html
<div id="mlb2-1234567890" style="width:100%;margin:0 auto;">
  <form class="ml-block-form" action="https://static.mailerlite.com/webforms/submit/q7x8y9z" method="post" data-code="q7x8y9z" target="_blank">
    <div class="ml-form-formContent">
      <div class="ml-form-fieldRow ml-last-item">
        <div class="ml-field-group ml-field-email ml-validate-email ml-validate-required">
          <input type="email" class="form-control" data-inputmask="" name="fields[email]" placeholder="Email" autocomplete="email">
        </div>
      </div>
      <button type="submit" class="primary">Subscribe</button>
    </div>
    <input type="hidden" name="ml-submit" value="1">
    <input type="hidden" name="anticsrf" value="true">
  </form>
</div>
<script async src="https://static.mailerlite.com/js/w/webforms.min.js?v123456" type="text/javascript"></script>
```

### Option B: Use MailerLite API (More Control, Requires API Key)

1. Go to **Integrations** → **Developer API**
2. Generate an API key
3. Get your Group ID (found in Groups → Settings)
4. I can help you integrate this if you provide:
   - API Key
   - Group ID

---

## Step 3: Replace Forms on Your Website

Once you have the MailerLite form embed code, I can replace all your Formspree forms with MailerLite forms. The embedded forms will automatically:
- ✅ Add subscribers to your MailerLite group
- ✅ Trigger your welcome email automation
- ✅ Send the welcome email immediately

---

## Quick Checklist:

- [ ] Created welcome email template in MailerLite
- [ ] Set up automation workflow (or enabled built-in welcome email)
- [ ] Got MailerLite form embed code
- [ ] Share the embed code with me to integrate into website

---

## Need Help?

**To get immediate welcome emails, you need:**

1. **MailerLite Form Embed Code** - Copy this from Forms → Get code
   OR
2. **MailerLite API Key + Group ID** - If you want custom integration

Once you share either of these, I'll update your website forms to use MailerLite, and subscribers will automatically receive welcome emails immediately upon signup!

