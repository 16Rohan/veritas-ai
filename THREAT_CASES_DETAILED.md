# Cyber Awareness Module - Threat Intelligence Cases

## Overview
8 realistic, up-to-date cybersecurity threat scenarios curated for the VeritasAI platform. Each case is based on actual fraud patterns reported in 2024-2026 and includes technical details, indicators of compromise, and prevention strategies.

---

## THREAT #1: Fake Internship Portal - Credential Harvesting Campaign

**Category:** Phishing | **Severity:** 🔴 HIGH | **Date:** 2026-02-12

### Summary
Threat actors create convincing replicas of popular internship platforms to harvest login credentials and personal information from job seekers.

### How It Works (Technical Breakdown)
1. Attackers register domains with typosquatting (e.g., 'internshipo.com' vs 'internship.com')
2. SSL certificates obtained to appear legitimate
3. Form submissions logged to attacker server
4. DNS analysis reveals non-standard hosting providers
5. Email headers contain suspicious SPF/DKIM signatures
6. JavaScript steals clipboard content and device info

### Indicators of Compromise (IoCs)
- Domain registered within 72 hours
- Slight spelling variations in domain name
- Missing or invalid SSL certificate authority
- Form redirects to unknown IP after submission
- Email sender from free mail service (gmail, yahoo)
- Unusual WHOIS privacy settings

### Prevention Checklist
- ✓ Always verify URL carefully before entering credentials
- ✓ Check domain spelling character-by-character
- ✓ Use browser extensions that warn about suspicious URLs
- ✓ Enable two-factor authentication on all platforms
- ✓ Never click links in unsolicited emails - navigate directly
- ✓ Check company career page for official portal links
- ✓ Look for HTTPS and valid certificate details
- ✓ Use password manager - they won't auto-fill on fake domains

---

## THREAT #2: UPI Refund Scam - Reverse Payment Fraud

**Category:** Financial Fraud | **Severity:** 🔴 HIGH | **Date:** 2026-02-10

### Summary
Attackers pose as payment app support, convincing victims that they've been accidentally paid excess funds. Victims are tricked into sending money back through UPI.

### How It Works (Technical Breakdown)
1. Scammer sends fake transaction screenshots showing over-payment
2. Gains trust through WhatsApp or SMS messaging
3. Requests refund to be sent through UPI to "correction account"
4. The "refund" is actually the victim's own money
5. Transaction IDs are fabricated with authentic-looking format
6. Screenshots use AI-generated or modified images with inconsistent UI elements
7. Confirmation emails sent from spoofed addresses

### Indicators of Compromise (IoCs)
- Unsolicited contact via WhatsApp or SMS (not official app)
- Request to complete transaction quickly
- Fake screenshot with timestamp inconsistencies
- Unknown UPI handle in refund request
- Pressure to act immediately or lose account access
- Multiple contact attempts from different numbers
- Payment app UI inconsistencies in screenshots

### Prevention Checklist
- ✓ Payment apps never request refunds via UPI
- ✓ Refunds only happen through app wallet/official process
- ✓ Contact official customer support via app, never external links
- ✓ Never send money to unknown accounts even if told you owe it
- ✓ Verify transactions directly in your official app
- ✓ Report suspicious messages immediately
- ✓ Use separate device to verify payments
- ✓ Ask for official ticket number before any action

---

## THREAT #3: Credential Harvesting via Malicious Shortened Links

**Category:** Phishing | **Severity:** 🟡 MEDIUM | **Date:** 2026-02-09

### Summary
Attackers use URL shortening services to obscure malicious links in emails and social media, redirecting victims to fake login pages.

### How It Works (Technical Breakdown)
1. Shortened URLs (bit.ly, tinyurl) mask true destination
2. Multi-hop redirects chain through legitimate sites
3. Final domain uses homograph attacks (visually similar unicode characters)
4. Phishing page clones legitimate site design
5. Form data captured and stored in attacker database
6. Attacker may resell credentials on dark web
7. JavaScript tracks user behavior and device info

### Indicators of Compromise (IoCs)
- Multiple URL redirects (use curl -L to trace)
- Domain registrar recently established
- Certificate issued for generic or misspelled domain
- Page source contains credential submission to external server
- JavaScript detects clipboard content
- Unusual domain reputation (low/new)
- Shortened URL analytics show phishing behavior

### Prevention Checklist
- ✓ Hover over shortened links to see full URL first
- ✓ Use URL preview tools to expand safely
- ✓ Never log in from shortened link redirects
- ✓ Check for HTTPS and valid certificate
- ✓ Use password managers - won't auto-fill on fake domains
- ✓ Look for certificate issuer legitimacy
- ✓ Be suspicious of generic domain names
- ✓ Report phishing URLs to Google Safe Browsing

---

## THREAT #4: QR Code Fraud - Invoice Payment Interception

**Category:** Financial Fraud | **Severity:** 🔴 HIGH | **Date:** 2026-02-08

### Summary
Attackers intercept business invoices and replace QR codes with malicious ones, redirecting payments to attacker-controlled accounts.

### How It Works (Technical Breakdown)
1. Attackers compromise email or print servers
2. Modify PDF invoices before delivery to customers
3. Replace legitimate QR code with malicious one
4. QR points to payment gateway under attacker control
5. Payment page mimics legitimate gateway perfectly
6. Real company branding used for authenticity
7. Multiple fake confirmation emails sent to appear legitimate
8. Money forwarded through money mule accounts

### Indicators of Compromise (IoCs)
- QR code recently modified on invoice
- Invoice metadata shows unexpected editor
- Payment gateway URL doesn't match company domain
- Confirmation email from free email service
- Payment recipient account newly created
- QR code doesn't match company standards
- Unusual payment terms or amounts
- No official company contact before payment

### Prevention Checklist
- ✓ Verify QR codes with second method (phone call)
- ✓ Scan QR codes only from trusted sources
- ✓ Check payment receipts match expected recipient
- ✓ Use separate device to verify payments
- ✓ Implement invoice verification protocols with vendors
- ✓ Call vendor using number from previous invoices
- ✓ Compare new invoice to previous ones for consistency
- ✓ Enable payment confirmation with finance team

---

## THREAT #5: AI-Generated Impersonation via Deepfake Video Call

**Category:** Social Engineering | **Severity:** 🔴 HIGH | **Date:** 2026-02-07

### Summary
Attackers use AI video synthesis technology to create deepfake video calls impersonating executives, requesting urgent fund transfers or data access.

### How It Works (Technical Breakdown)
1. Deepfake models trained on public video of executive
2. Real-time video synthesis uses GPU acceleration
3. Audio cloned from recorded speeches
4. Zoom/Teams vulnerability exploited to spoof caller ID
5. Background and clothing replicate office environment
6. Slight delays in response indicate AI processing
7. Sophisticated lip-sync prevents easy detection
8. Creates urgency for immediate action

### Indicators of Compromise (IoCs)
- Unusual request from 'executive' via video for first time
- Audio slightly out of sync with lip movement
- Background suspiciously perfect or repeated
- Eyes don't blink naturally
- Request requires secrecy or bypassing procedures
- Caller asks to disable recording
- Unusual technical glitches mid-call
- Request contradicts normal business workflow

### Prevention Checklist
- ✓ Establish code words with executives for verification
- ✓ Never execute large transfers based on video alone
- ✓ Use separate verification channel (in-person, phone)
- ✓ Check for deepfake indicators: eye blinking, lag
- ✓ Implement multi-stakeholder approval workflow
- ✓ Record and review unusual requests
- ✓ Call executive back on known number to verify
- ✓ Enable video verification on all calls

---

## THREAT #6: Fake Security Update - Malware Distribution Vector

**Category:** Malware | **Severity:** 🔴 HIGH | **Date:** 2026-02-06

### Summary
Pop-ups claiming system security vulnerability trick users into downloading malware disguised as critical security patches.

### How It Works (Technical Breakdown)
1. JavaScript injection on compromised sites triggers urgent pop-up
2. Executable file bundled with legitimate-looking installer
3. Registry modifications persist malware across restarts
4. Remote access trojan establishes C2 connection
5. Browser injection captures credentials
6. System resources consumed for crypto-mining
7. Spyware captures keystrokes and screenshots
8. Spreads to network computers

### Indicators of Compromise (IoCs)
- Pop-up appears on untrusted website
- Update executable has suspicious name or location
- File size larger than expected for update
- Unexpected system slowness after installation
- Network traffic to unknown IP addresses
- New browser toolbar or homepage changes
- Antivirus alerts after installation
- Task manager shows unknown processes

### Prevention Checklist
- ✓ Only download updates from official websites
- ✓ Never click 'Update' on suspicious pop-ups
- ✓ Use OS built-in update mechanisms
- ✓ Keep antivirus software updated
- ✓ Disable auto-run for external media
- ✓ Be skeptical of urgent security warnings
- ✓ Verify update legitimacy in official channels
- ✓ Monitor system performance after updates

---

## THREAT #7: LinkedIn Profile Cloning - Identity Theft & Recruitment Fraud

**Category:** Social Engineering | **Severity:** 🟡 MEDIUM | **Date:** 2026-02-05

### Summary
Attackers clone legitimate LinkedIn profiles to build trust, then offer fake job opportunities requiring payment or credential submission.

### How It Works (Technical Breakdown)
1. Cloned profile copies photos and basic info from real person
2. Account uses slightly different username (john.smith.recruiter vs john.smith)
3. Messages sent to expand network with similar profiles
4. Job posting redirects to phishing form
5. Payment requests via wire transfer or gift cards
6. Stolen credentials sold on dark web
7. Identity used for further social engineering
8. Employment verification sites spoofed

### Indicators of Compromise (IoCs)
- Recent account creation or profile reactivation
- Limited connection history or activity
- Typo or variation in recruiter name
- Job posting with unrealistic salary
- Rapid progression to payment request
- Unusual connection requests from similar profiles
- Grammar/spelling errors in job description
- Request for upfront payment or personal info

### Prevention Checklist
- ✓ Verify recruiter identity on company website
- ✓ Never pay for job applications
- ✓ Never pay for background checks
- ✓ Cross-check recruiter on company directory
- ✓ Legitimate recruiters use company email
- ✓ Research company independently
- ✓ Verify through official HR department
- ✓ Trust your instincts about unusual offers

---

## THREAT #8: SMS Spoofing - Bank Impersonation for 2FA Bypass

**Category:** Phishing | **Severity:** 🔴 HIGH | **Date:** 2026-02-04

### Summary
Attackers send SMS messages spoofing bank numbers, tricking users into revealing OTP codes or one-time passwords.

### How It Works (Technical Breakdown)
1. SMS gateway allows sender ID spoofing
2. Message content perfectly mimics bank notification
3. Link points to phishing site identical to bank portal
4. OTP harvesting page captures code before victim realizes
5. Gateway uses carrier network vulnerabilities
6. Multiple attempts with varied phone numbers
7. AI-generated voice calls may follow SMS
8. Account emptied within minutes

### Indicators of Compromise (IoCs)
- Unusual urgency or threat in message
- Shortened URL or suspicious link in SMS
- Sender ID appears like bank but slightly off
- Message content has grammatical errors
- Request for action outside normal procedures
- OTP requested after you didn't initiate transaction
- SMS from unusual time or frequency
- Bank later denies sending message

### Prevention Checklist
- ✓ Banks never ask for OTP via SMS
- ✓ They only verify your entry in app
- ✓ Never share OTP with anyone, even bank
- ✓ Call bank using back of card number to verify
- ✓ Enable transaction alerts on accounts
- ✓ Use app-based 2FA instead of SMS
- ✓ Be suspicious of urgent messages
- ✓ Verify through official app, not links

---

## Quick Statistics

| Category | Count | Severity Distribution |
|----------|-------|----------------------|
| Phishing | 3 | 2 HIGH, 1 MEDIUM |
| Malware | 1 | 1 HIGH |
| Social Engineering | 2 | 2 HIGH |
| Financial Fraud | 2 | 2 HIGH |
| **Total** | **8** | **7 HIGH, 1 MEDIUM** |

## How to Use This Data

1. **Educational**: Share with team for security awareness
2. **Detection**: Use IoCs as signatures for detection tools
3. **Response**: Use prevention tips for incident response
4. **Training**: Use cases for security training programs
5. **Compliance**: Reference for security policy updates

All cases are based on verified real-world attack patterns documented in 2024-2026.
