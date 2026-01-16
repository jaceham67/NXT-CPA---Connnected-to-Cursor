# MailerLite Integration Setup Guide

## What You Need:
1. Your MailerLite form ID (found in your MailerLite dashboard)
2. Your MailerLite website ID (usually found in Settings > Integrations)

## Steps to Get Your MailerLite Form ID:

1. Log in to your MailerLite account
2. Go to **Forms** in the left sidebar
3. Click on your newsletter form (or create a new one)
4. Click **Get code** or **Embed** button
5. Copy the form ID - it will look like a number (e.g., `123456789`) or you'll see it in the embed code

## MailerLite Form Embed Code Format:

MailerLite typically provides code in one of these formats:

### Option 1: JavaScript Embed (Recommended)
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

### Option 2: Iframe Embed
```html
<iframe src="https://landing.mailerlite.com/webforms/landing/q7x8y9z" style="border: none; width: 100%; height: 100px;"></iframe>
```

### Option 3: Custom HTML Form with MailerLite Endpoint
You can also use a custom form with MailerLite's endpoint URL.

## What I Need From You:

**Please provide ONE of the following:**

1. **Your MailerLite Form ID** (number like `123456789`)
2. **Your MailerLite Form Embed Code** (the complete code MailerLite gives you)
3. **Your MailerLite API endpoint URL** (if using custom form submission)

Once you provide this, I'll update all newsletter forms on your website to use MailerLite instead of Formspree.

