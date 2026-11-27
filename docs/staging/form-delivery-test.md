# Contact form delivery test (waiting for your approval)

Both website forms post straight to FormSubmit, which emails capitalsitesottawa@gmail.com. The hosting
move doesn't change that path, but a real end-to-end send is the only proof that enquiries still arrive.
**Nothing below has been sent.** The dry run has been run; it blocks the request inside the browser.

## What gets sent (clearly marked TEST)

| Form | Page | Fields sent |
|---|---|---|
| Contact | `/contact?service=fix` | name `TEST - CapitalSites delivery check` · business_name `TEST (please ignore)` · email `delivery-test@example.com` · current_website (blank) · package `Website Fix` · service `fix` · message `TEST ONLY: end-to-end delivery check … sent <time> from <site>. No action needed.` |
| Audit | `/audit` | name `TEST - CapitalSites delivery check` · email `delivery-test@example.com` · website_url `https://www.capitalsites.ca` |

Hidden fields stay exactly as they are on the site: `_captcha=false`, `_subject`, `_template=table`,
`_next=https://www.capitalsites.ca/thanks`, and the empty `_honey` trap. The reply-to address is a
reserved `example.com` address, so nobody else receives anything.

## When

- **Test B (the one that matters): right after the DNS switch**, against `https://www.capitalsites.ca`.
  Same domain as today, so FormSubmit should treat it exactly like a normal enquiry.
- Test A (optional): on `https://<name>.netlify.app` before the switch. FormSubmit may ask you to
  confirm a new website address the first time it sees one; if an "activate form" email arrives for the
  netlify.app address, that's FormSubmit, not a fault. Test B is the real check.

Each test sends **2 emails** (one per form).

## How

Dry run (sends nothing; already passing on the live site and the local Netlify build):

```bash
NODE_PATH=<playwright install> node scripts/qa/form-delivery-test.cjs https://www.capitalsites.ca
```

Real send, only after you approve it:

```bash
NODE_PATH=<playwright install> node scripts/qa/form-delivery-test.cjs https://www.capitalsites.ca --send
```

Or by hand: open `/contact?service=fix` and `/audit`, enter the TEST values above, press send.

## Pass criteria

1. After each send the browser lands on `https://www.capitalsites.ca/thanks`.
2. Two emails arrive at capitalsitesottawa@gmail.com: subjects **New Project Inquiry - CapitalSites**
   and **New Website Audit Request - CapitalSites**, in FormSubmit's table layout, with every field
   above (including `service: fix` and `package: Website Fix`).
3. They arrive within 15 minutes of the send time the script prints. Check Inbox and Spam; if they're in
   Spam, mark them "Not spam" so real enquiries don't follow.
4. Nothing arrives at any other address.

If an email doesn't arrive within 15 minutes: check Spam and Promotions, then FormSubmit's
confirmation emails. If it's still missing, switch DNS back (see `netlify-migration.md`, Rollback) and
tell me. Delete the two TEST emails afterwards.
