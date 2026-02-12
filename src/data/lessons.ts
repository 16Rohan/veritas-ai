
export interface Lesson {
    id: number;
    day: string;
    title: string;
    scenario: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    teachingPoint: string;
}

export const lessons: Lesson[] = [
    {
        id: 1,
        day: "Monday",
        title: "The Urgent Email (Classic Phishing)",
        scenario: "It's Monday morning. You log in to 47 unread emails. One stands out:\n\nSubject: Payroll Error — Action Required Within 2 Hours\nFrom: hr-support@company-payroll.net\n\n“Dear John,\nA discrepancy has been detected in your salary processing.\nPlease verify your employee credentials immediately to avoid payment hold.”\n\nThere’s a button: “Resolve Now.”\n\nYou know payroll usually comes from @company.com, but you are expecting reimbursement this week.",
        question: "What should you do?",
        options: [
            "Click the link and quickly log in to confirm",
            "Ignore it completely",
            "Check sender domain carefully and contact HR through official channel",
            "Forward it to colleagues asking if they received it"
        ],
        correctIndex: 2,
        explanation: "The sender domain 'company-payroll.net' is an external impersonation of your real company domain. The urgency ('Within 2 Hours') is a classic psychological trigger to bypass critical thinking. Always verify through a separate, official channel.",
        teachingPoint: "Domain impersonation + urgency trigger."
    },
    {
        id: 2,
        day: "Tuesday",
        title: "The Suspicious Link (Smishing)",
        scenario: "Tuesday afternoon. You receive a text message:\n\n“Your package delivery failed. Reschedule here:\nhttp://quicktrack-delivery.co/update”\n\nYou are actually waiting for an Amazon order. The site preview looks convincing, but the URL is slightly off.",
        question: "What is the safest action?",
        options: [
            "Open the link to check details",
            "Copy the link into a browser instead",
            "Visit the courier’s official website manually",
            "Reply STOP to the message"
        ],
        correctIndex: 2,
        explanation: "Attackers try to align with your expectations (like a package delivery). Clicking the link could install malware or lead to a credential harvesting site. Manually navigating to the official site guarantees you are interacting with the real service.",
        teachingPoint: "Attackers rely on expectation alignment."
    },
    {
        id: 3,
        day: "Wednesday",
        title: "The Social Engineering Call (Pretexting)",
        scenario: "Wednesday. You get a Teams call from someone claiming to be IT Support.\n\n“We detected unusual login behavior. We need you to install a security patch. I’ll guide you.”\n\nThe caller already knows your department, manager’s name, and office extension. They ask you to download a remote tool.",
        question: "What should you do?",
        options: [
            "Follow instructions — they know internal details",
            "Ask them to send a ticket through official IT portal",
            "Install but monitor activity",
            "Hang up immediately and do nothing further"
        ],
        correctIndex: 1,
        explanation: "Attackers often gather OSINT (Open Source Intelligence) or use data from breaches to build credibility. 'Verify then trust' is the rule. An official ticket request validates their identity through established organizational protocols.",
        teachingPoint: "Attackers weaponize partial truth to build credibility."
    },
    {
        id: 4,
        day: "Thursday",
        title: "The Fake News Trap (Info Manipulation)",
        scenario: "Thursday evening. You see an article trending on social media:\n\n“Major Bank Collapse Imminent — Withdraw Funds Immediately”\n\nIt cites “internal leaked documents” and colleagues are discussing moving money. The article is from 'financialworldbreaking.news'. There is no mainstream coverage yet.",
        question: "How should you respond?",
        options: [
            "Share it to warn friends",
            "Withdraw funds just in case",
            "Verify using trusted financial news sources",
            "Assume suppression by mainstream media"
        ],
        correctIndex: 2,
        explanation: "Disinformation campaigns exploit fear and herd mentality to cause real-world damage (like a bank run). Always cross-reference sensational claims with established, high-reputation news sources before acting or sharing.",
        teachingPoint: "Misinformation exploits fear amplification and herd reaction."
    },
    {
        id: 5,
        day: "Friday",
        title: "The AI Impersonation Attack",
        scenario: "Friday. You receive a voice note on WhatsApp that sounds exactly like your manager.\n\n“John, I’m in a meeting. Need you to urgently process this vendor payment. I’ve mailed details. Handle ASAP.”\n\nThe email contains the correct signature and formatting, but a NEW bank account number. The tone pushes urgency and confidentiality.",
        question: "What should you do?",
        options: [
            "Process payment — voice confirms authenticity",
            "Reply asking for later confirmation",
            "Call manager through known number to verify",
            "Assume it’s legitimate internal change"
        ],
        correctIndex: 2,
        explanation: "AI can now clone voices with high accuracy (Deepfakes). When a request involves money or sensitive data—especially with a change in procedure (new bank account)—verify it through a *different* communication channel (known phone number) to defeat the spoof.",
        teachingPoint: "Deepfake + business email compromise hybrid."
    }
];
