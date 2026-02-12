export interface AwarenessItem {
  id: string;
  title: string;
  category: "Phishing" | "Malware" | "Social Engineering" | "Financial Fraud" | "Emerging Threat";
  severity: "Low" | "Medium" | "High";
  summary: string;
  technicalBreakdown: string;
  prevention: string[];
  indicators: string[];
  date: string;
}

export const awarenessData: AwarenessItem[] = [
  {
    id: "aware_001",
    title: "Fake Internship Portal - Credential Harvesting Campaign",
    category: "Phishing",
    severity: "High",
    summary: "Threat actors create convincing replicas of popular internship platforms to harvest login credentials and personal information from job seekers.",
    technicalBreakdown: "Attackers register domains with typosquatting (e.g., 'internshipo.com' instead of 'internship.com'). The fake portal uses SSL certificates to appear legitimate. Form submissions are logged server-side. DNS analysis reveals non-standard hosting providers. Email headers contain suspicious SPF/DKIM signatures.",
    prevention: [
      "Always verify the URL before entering credentials - check domain carefully",
      "Use browser extensions that warn about suspicious URLs",
      "Enable two-factor authentication on all platforms",
      "Never click links in unsolicited emails - navigate directly via browser",
      "Check company career page for official internship portal links"
    ],
    indicators: [
      "Domain registered within 72 hours",
      "Slight spelling variations in domain name",
      "Missing or invalid SSL certificate authority",
      "Form redirects to unknown IP after submission",
      "Email sender from free mail service (gmail, yahoo)"
    ],
    date: "2026-02-12"
  },
  {
    id: "aware_002",
    title: "UPI Refund Scam - Reverse Payment Fraud",
    category: "Financial Fraud",
    severity: "High",
    summary: "Attackers pose as payment app support, convincing victims that they've been accidentally paid excess funds. Victims are tricked into sending money back through UPI.",
    technicalBreakdown: "Scammer sends fake transaction screenshots showing over-payment. They gain trust through WhatsApp or SMS, then request refund through UPI. The 'refund' is actually the victim's money. Transaction IDs are fabricated. Screenshots use AI-generated or modified images with inconsistent UI elements.",
    prevention: [
      "Payment apps never request refunds via UPI - only through app wallet",
      "Contact official customer support via app, never external links",
      "Never send money to unknown accounts even if told you owe it",
      "Verify transactions directly in your official app",
      "Report suspicious messages immediately to UPI operator"
    ],
    indicators: [
      "Unsolicited contact via WhatsApp or SMS",
      "Request to complete transaction quickly",
      "Fake screenshot with timestamp inconsistencies",
      "Unknown UPI handle in refund request",
      "Pressure to act immediately or lose account access"
    ],
    date: "2026-02-10"
  },
  {
    id: "aware_003",
    title: "Credential Harvesting via Malicious Shortened Links",
    category: "Phishing",
    severity: "Medium",
    summary: "Attackers use URL shortening services to obscure malicious links in emails and social media, redirecting victims to fake login pages.",
    technicalBreakdown: "Shortened URLs (bit.ly, tinyurl) mask the true destination. Multi-hop redirects chain through legitimate sites before reaching phishing page. The final domain uses homograph attacks with visually similar unicode characters. Form data is captured and stored in attacker database.",
    prevention: [
      "Hover over shortened links to see full URL before clicking",
      "Use URL preview tools to expand shortened links safely",
      "Never log in from shortened link redirects",
      "Check for HTTPS and valid certificate on login pages",
      "Use password managers - they won't auto-fill on fake domains"
    ],
    indicators: [
      "Multiple URL redirects (use curl -L to trace)",
      "Domain registrar is recently established",
      "Certificate issued for generic or misspelled domain",
      "Page source contains credential submission to external server",
      "JavaScript detects clipboard content"
    ],
    date: "2026-02-09"
  },
  {
    id: "aware_004",
    title: "QR Code Fraud - Invoice Payment Interception",
    category: "Financial Fraud",
    severity: "High",
    summary: "Attackers intercept business invoices and replace QR codes with malicious ones, redirecting payments to attacker-controlled accounts.",
    technicalBreakdown: "Attackers compromise email or print servers to modify PDF invoices before delivery. QR code points to payment gateway under attacker control. Payment page mimics legitimate gateway with real company branding. Multiple payment confirmations sent to victim to appear legitimate.",
    prevention: [
      "Verify QR codes with second method (phone call to supplier)",
      "Scan QR codes only from trusted sources and verified documents",
      "Check payment receipts match expected recipient details",
      "Use separate device to verify payments",
      "Implement invoice verification protocols with vendors"
    ],
    indicators: [
      "QR code recently modified on invoice",
      "Invoice metadata shows unexpected editor",
      "Payment gateway URL doesn't match company domain",
      "Confirmation email from free email service",
      "Payment recipient account newly created"
    ],
    date: "2026-02-08"
  },
  {
    id: "aware_005",
    title: "AI-Generated Impersonation via Deepfake Video Call",
    category: "Social Engineering",
    severity: "High",
    summary: "Attackers use AI video synthesis technology to create deepfake video calls impersonating executives, requesting urgent fund transfers or data access.",
    technicalBreakdown: "Deepfake models trained on public video of executive. Real-time video synthesis uses GPU acceleration. Audio cloned from recorded speeches. Zoom/Teams vulnerability exploited to spoof caller ID. Background and clothing replicate office environment. Slight delays in response indicate AI processing.",
    prevention: [
      "Establish code words for urgent requests with executives",
      "Never execute large transfers based on video calls alone",
      "Use separate verification channel (in-person meeting, separate phone)",
      "Check for deepfake indicators: unblinking eyes, lag in lip-sync",
      "Implement transaction approval workflow with multiple stakeholders"
    ],
    indicators: [
      "Unusual request from 'executive' for first time via video",
      "Audio slightly out of sync with lip movement",
      "Background suspiciously perfect or repeated",
      "Eyes don't blink naturally",
      "Request requires secrecy or bypassing normal procedures"
    ],
    date: "2026-02-07"
  },
  {
    id: "aware_006",
    title: "Fake Security Update - Malware Distribution Vector",
    category: "Malware",
    severity: "High",
    summary: "Pop-ups claiming system security vulnerability trick users into downloading malware disguised as critical security patches.",
    technicalBreakdown: "JavaScript injection on compromised sites triggers urgent pop-up. Executable file bundled with legitimate-looking installer. Registry modifications persist malware across restarts. Remote access trojan establishes C2 connection. Browser injection captures credentials. System resources consumed for crypto-mining.",
    prevention: [
      "Only download updates from official vendor websites",
      "Never click 'Update' on suspicious pop-ups",
      "Use OS built-in update mechanisms",
      "Keep antivirus software updated",
      "Disable auto-run for external media"
    ],
    indicators: [
      "Pop-up appears on untrusted website",
      "Update executable has suspicious name or location",
      "File size larger than expected for update",
      "Unexpected system slowness after installation",
      "Network traffic to unknown IP addresses"
    ],
    date: "2026-02-06"
  },
  {
    id: "aware_007",
    title: "LinkedIn Profile Cloning - Identity Theft & Recruitment Fraud",
    category: "Social Engineering",
    severity: "Medium",
    summary: "Attackers clone legitimate LinkedIn profiles to build trust, then offer fake job opportunities requiring payment or credential submission.",
    technicalBreakdown: "Cloned profile copies photos and basic info from real person. Account uses slightly different username (e.g., 'john.smith.recruiter' vs 'john.smith'). Messages sent to expand network. Job posting redirects to phishing form. Payment requests via wire transfer or gift cards.",
    prevention: [
      "Verify recruiter identity by searching on company website",
      "Never pay for job applications or background checks",
      "Cross-check recruiter details with actual company",
      "Legitimate recruiters use company email addresses",
      "Research company on independent sources before sharing info"
    ],
    indicators: [
      "Recent account creation or profile reactivation",
      "Limited connection history or activity",
      "Typo or variation in recruiter name",
      "Job posting with unrealistic salary",
      "Rapid progression to payment request"
    ],
    date: "2026-02-05"
  },
  {
    id: "aware_008",
    title: "SMS Spoofing - Bank Impersonation for 2FA Bypass",
    category: "Phishing",
    severity: "High",
    summary: "Attackers send SMS messages spoofing bank numbers, tricking users into revealing OTP codes or one-time passwords.",
    technicalBreakdown: "SMS gateway allows sender ID spoofing with proper registration. Message content perfectly mimics bank notification format. Link points to phishing site identical to bank portal. OTP harvesting page captures code before victim realizes fraud. Gateway uses carrier network vulnerabilities.",
    prevention: [
      "Banks never ask for OTP via SMS - they only verify your entry",
      "Never share OTP codes with anyone, even bank representatives",
      "Call bank directly using number on back of card to verify",
      "Enable transaction alerts on all accounts",
      "Use apps-based 2FA instead of SMS when available"
    ],
    indicators: [
      "Unusual urgency or threat in message",
      "Shortened URL or suspicious link",
      "Sender ID appears like bank but slightly off",
      "Message content has grammatical errors",
      "Request for action outside normal banking procedures"
    ],
    date: "2026-02-04"
  }
];

export const categories = ["Phishing", "Malware", "Social Engineering", "Financial Fraud", "Emerging Threat"];
export const severities = ["Low", "Medium", "High"];
