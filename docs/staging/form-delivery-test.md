# Contact form delivery test

Both website forms post straight to FormSubmit, which emails capitalsitesottawa@gmail.com. The hosting
move doesn't change that path; a real send is the only proof that enquiries still arrive.

**Approved 2026-11-27: two submissions** (one contact, one audit), marked TEST, fictional details, our own
business address as the sender, run against the real Netlify deployment.

## What gets sent

| Form | Page | Fields sent |
|---|---|---|
| Contact | `/contact?service=fix` | name `TEST - CapitalSites delivery check` · business_name `TEST (please ignore)` · email `capitalsitesottawa@gmail.com` · current_website (blank) · package `Website Fix` · service `fix` · message `TEST ONLY: end-to-end delivery check … sent <time> from <site>. No action needed.` |
| Audit | `/audit` | name `TEST - CapitalSites delivery check` · email `capitalsitesottawa@gmail.com` · website_url `https://www.capitalsites.ca` |

Hidden fields stay exactly as on the site: `_captcha=false`, `_subject`, `_template=table`,
`_next=https://www.capitalsites.ca/thanks`, empty `_honey`. No autoresponse is configured, so nobody
receives anything except the business inbox.

## How

Dry run (sends nothing):

```bash
NODE_PATH=<playwright install> node scripts/qa/form-delivery-test.cjs https://<name>.netlify.app
```

The approved real send (2 emails):

```bash
NODE_PATH=<playwright install> node scripts/qa/form-delivery-test.cjs https://<name>.netlify.app --send
```

## Pass criteria

1. After each send the browser ends on `https://www.capitalsites.ca/thanks` ("Thanks. It's sent.").
   Before the DNS switch that page is served by Vercel; after it, by Netlify. Same page either way.
2. Two emails arrive at capitalsitesottawa@gmail.com: **New Project Inquiry - CapitalSites** and
   **New Website Audit Request - CapitalSites**, in FormSubmit's table layout, with every field above.
3. Note the arrival time against the send time the script prints; check Inbox, Spam and Promotions.

FormSubmit may treat a new website address as a new form and send an "activate form" email instead of
the submission. If that happens, it is FormSubmit's first-use check, not a hosting fault: report it, and
re-send only with the owner's approval.
