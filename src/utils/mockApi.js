// Mock API for simulating ML analysis with realistic technical data

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Email Analysis
export const analyzeEmail = async (emailText) => {
  await delay(2000);

  const isHighRisk = emailText.toLowerCase().includes('urgent') ||
    emailText.toLowerCase().includes('verify') ||
    emailText.toLowerCase().includes('suspended') ||
    emailText.toLowerCase().includes('click here');

  const isSuspicious = !isHighRisk && (
    emailText.toLowerCase().includes('account') ||
    emailText.toLowerCase().includes('password') ||
    emailText.toLowerCase().includes('confirm')
  );

  const riskLevel = isHighRisk ? "HIGH RISK" : (isSuspicious ? "SUSPICIOUS" : "SAFE");
  const confidence = isHighRisk ? 87 : (isSuspicious ? 64 : 12);

  return {
    riskLevel,
    confidence,
    explanations: [
      {
        category: "Domain Analysis",
        findings: isHighRisk ? [
          "Suspicious sender domain detected (paypa1.com vs paypal.com)",
          "Domain age: 8 days (high risk threshold: < 30 days)",
          "SSL certificate: Self-signed (untrusted)",
          "WHOIS privacy protection enabled"
        ] : isSuspicious ? [
          "Sender domain age: 45 days (moderate risk)",
          "SSL certificate: Valid but recently issued",
          "Domain registrar: Low-reputation provider"
        ] : [
          "Verified sender domain (established 8+ years)",
          "Valid SSL certificate from trusted CA",
          "Domain reputation score: 94/100"
        ]
      },
      {
        category: "Linguistic Analysis",
        findings: isHighRisk ? [
          "Urgent financial language detected (confidence: 89%)",
          "Emotional manipulation score: 7.8/10",
          "Grammar anomaly index: 0.72",
          "Pressure tactic indicators: 5 detected"
        ] : isSuspicious ? [
          "Moderate urgency language (confidence: 58%)",
          "Emotional manipulation score: 4.2/10",
          "Grammar quality: Acceptable"
        ] : [
          "Professional tone detected (confidence: 92%)",
          "Emotional manipulation score: 1.1/10",
          "Grammar quality: Excellent"
        ]
      },
      {
        category: "Pattern Matching",
        findings: isHighRisk ? [
          "Known phishing template similarity: 84%",
          "Malicious link pattern detected",
          "Sender name/email mismatch probability: 91%",
          "Spoofing indicators: 3 found"
        ] : isSuspicious ? [
          "Generic template similarity: 42%",
          "Link destination analysis: Moderate risk",
          "Sender verification: Partial match"
        ] : [
          "No known phishing patterns detected",
          "Link destinations verified and safe",
          "Sender authentication: DKIM/SPF passed"
        ]
      }
    ],
    highlights: isHighRisk ? [
      {
        text: "urgent action required",
        reason: "Urgency Indicator (confidence: 89%)",
        severity: "high"
      },
      {
        text: "verify your account",
        reason: "Phishing Pattern Match (score: 8.2/10)",
        severity: "high"
      },
      {
        text: "click here immediately",
        reason: "Pressure Tactic (confidence: 92%)",
        severity: "medium"
      }
    ] : isSuspicious ? [
      {
        text: "confirm your information",
        reason: "Data Collection Pattern (confidence: 64%)",
        severity: "medium"
      }
    ] : [],
    featureScores: isHighRisk ? {
      "Domain Risk": 85,
      "Linguistic Anomaly": 72,
      "Urgency Level": 91,
      "Pattern Similarity": 68,
      "Sender Reputation": 15
    } : isSuspicious ? {
      "Domain Risk": 52,
      "Linguistic Anomaly": 38,
      "Urgency Level": 45,
      "Pattern Similarity": 31,
      "Sender Reputation": 48
    } : {
      "Domain Risk": 8,
      "Linguistic Anomaly": 12,
      "Urgency Level": 5,
      "Pattern Similarity": 3,
      "Sender Reputation": 94
    },
    modelInfo: {
      confidence,
      confidenceInterval: isHighRisk ? "82-94%" : (isSuspicious ? "58-71%" : "8-18%"),
      model: "VeritasAI-v2.3",
      analysisTime: "1.8s"
    },
    timestamp: new Date().toISOString()
  };
};

// Message Analysis
export const analyzeMessage = async (messageText) => {
  await delay(2000);

  const isHighRisk = messageText.toLowerCase().includes('money') ||
    messageText.toLowerCase().includes('wire') ||
    messageText.toLowerCase().includes('gift card') ||
    messageText.toLowerCase().includes('urgent');

  const isSuspicious = !isHighRisk && (
    messageText.toLowerCase().includes('help') ||
    messageText.toLowerCase().includes('need') ||
    messageText.toLowerCase().includes('please')
  );

  const riskLevel = isHighRisk ? "HIGH RISK" : (isSuspicious ? "SUSPICIOUS" : "SAFE");
  const confidence = isHighRisk ? 91 : (isSuspicious ? 58 : 9);

  return {
    riskLevel,
    confidence,
    explanations: [
      {
        category: "Behavioral Analysis",
        findings: isHighRisk ? [
          "Emotional manipulation score: 8.2/10",
          "Urgency indicators: 5 detected",
          "Financial request pattern: High confidence (94%)",
          "Relationship exploitation tactics identified"
        ] : isSuspicious ? [
          "Emotional manipulation score: 4.5/10",
          "Urgency indicators: 2 detected",
          "Request pattern: Moderate concern"
        ] : [
          "Emotional manipulation score: 1.3/10",
          "No urgency indicators detected",
          "Normal conversation pattern"
        ]
      },
      {
        category: "Linguistic Patterns",
        findings: isHighRisk ? [
          "Impersonation likelihood: 76%",
          "Grammar consistency: Anomalous (score: 6.8/10)",
          "Sentiment analysis: Aggressive/Urgent",
          "Vocabulary mismatch with claimed identity: 82%"
        ] : isSuspicious ? [
          "Impersonation likelihood: 34%",
          "Grammar consistency: Acceptable",
          "Sentiment analysis: Neutral"
        ] : [
          "Impersonation likelihood: 4%",
          "Grammar consistency: Normal",
          "Sentiment analysis: Friendly/Professional"
        ]
      },
      {
        category: "Threat Classification",
        findings: isHighRisk ? [
          "Category: Financial scam (Romance/Emergency)",
          "Confidence: 87%",
          "Known scam pattern match: 79%",
          "Social engineering tactics: 4 identified"
        ] : isSuspicious ? [
          "Category: Potential solicitation",
          "Confidence: 58%",
          "Pattern match: Inconclusive"
        ] : [
          "Category: Legitimate communication",
          "Confidence: 91%",
          "No threat patterns detected"
        ]
      }
    ],
    highlights: isHighRisk ? [
      {
        text: "need money urgently",
        reason: "Financial Scam Indicator (confidence: 94%)",
        severity: "high"
      },
      {
        text: "wire transfer",
        reason: "High-Risk Payment Method (score: 9.1/10)",
        severity: "high"
      },
      {
        text: "don't tell anyone",
        reason: "Secrecy Tactic (confidence: 88%)",
        severity: "high"
      }
    ] : isSuspicious ? [
      {
        text: "can you help me",
        reason: "Request Pattern (confidence: 58%)",
        severity: "medium"
      }
    ] : [],
    featureScores: isHighRisk ? {
      "Emotional Manipulation": 82,
      "Urgency Level": 88,
      "Financial Request": 94,
      "Impersonation Risk": 76,
      "Grammar Anomaly": 68
    } : isSuspicious ? {
      "Emotional Manipulation": 45,
      "Urgency Level": 32,
      "Financial Request": 18,
      "Impersonation Risk": 34,
      "Grammar Anomaly": 22
    } : {
      "Emotional Manipulation": 13,
      "Urgency Level": 5,
      "Financial Request": 2,
      "Impersonation Risk": 4,
      "Grammar Anomaly": 8
    },
    modelInfo: {
      confidence,
      confidenceInterval: isHighRisk ? "86-96%" : (isSuspicious ? "51-66%" : "5-15%"),
      model: "VeritasAI-v2.3",
      analysisTime: "1.6s"
    },
    timestamp: new Date().toISOString()
  };
};

// Link Analysis
export const analyzeLink = async (linkUrl) => {
  await delay(2000);

  const isHighRisk = linkUrl.toLowerCase().includes('paypa1') ||
    linkUrl.toLowerCase().includes('amaz0n') ||
    linkUrl.toLowerCase().includes('.tk') ||
    linkUrl.toLowerCase().includes('bit.ly');

  const isSuspicious = !isHighRisk && (
    linkUrl.toLowerCase().includes('login') ||
    linkUrl.toLowerCase().includes('verify') ||
    linkUrl.toLowerCase().includes('secure')
  );

  const riskLevel = isHighRisk ? "HIGH RISK" : (isSuspicious ? "SUSPICIOUS" : "SAFE");
  const confidence = isHighRisk ? 93 : (isSuspicious ? 61 : 7);

  return {
    riskLevel,
    confidence,
    explanations: [
      {
        category: "Domain Intelligence",
        findings: isHighRisk ? [
          "Typosquatting detected (resembles known brand)",
          "Domain registered: 12 days ago",
          "Registrar: High-risk jurisdiction (offshore)",
          "WHOIS privacy protection: Enabled"
        ] : isSuspicious ? [
          "Domain age: 3 months (moderate risk)",
          "Registrar: Low-reputation provider",
          "SSL certificate: Valid but recently issued"
        ] : [
          "Established domain (registered 6+ years)",
          "Reputable registrar and hosting",
          "Valid SSL certificate from trusted CA"
        ]
      },
      {
        category: "Network Analysis",
        findings: isHighRisk ? [
          "Hidden redirect chain: 3 hops detected",
          "Final destination: Blacklisted IP (185.220.101.x)",
          "SSL certificate: Self-signed (untrusted)",
          "Hosting provider: Known for malicious activity"
        ] : isSuspicious ? [
          "Redirect chain: 1 hop detected",
          "Final destination: Unknown reputation",
          "SSL certificate: Valid"
        ] : [
          "Direct link (no redirects)",
          "Destination IP: Clean reputation",
          "Secure HTTPS connection verified"
        ]
      },
      {
        category: "Reputation Score",
        findings: isHighRisk ? [
          "Domain reputation: 12/100 (critical)",
          "Historical phishing reports: 47 incidents",
          "Blacklist status: Listed on 3 security databases",
          "Similar domain attacks: 23 reported"
        ] : isSuspicious ? [
          "Domain reputation: 48/100 (moderate)",
          "Historical reports: 2 incidents",
          "Blacklist status: Clean"
        ] : [
          "Domain reputation: 96/100 (excellent)",
          "Historical reports: 0 incidents",
          "Verified legitimate business"
        ]
      }
    ],
    highlights: isHighRisk ? [
      {
        text: linkUrl,
        reason: "Typosquatting Domain (confidence: 96%)",
        severity: "high"
      }
    ] : isSuspicious ? [
      {
        text: linkUrl,
        reason: "Suspicious URL Pattern (confidence: 61%)",
        severity: "medium"
      }
    ] : [],
    featureScores: isHighRisk ? {
      "Domain Risk": 94,
      "Network Threat": 87,
      "Reputation Score": 12,
      "SSL Validity": 8,
      "Redirect Risk": 91
    } : isSuspicious ? {
      "Domain Risk": 52,
      "Network Threat": 38,
      "Reputation Score": 48,
      "SSL Validity": 72,
      "Redirect Risk": 28
    } : {
      "Domain Risk": 4,
      "Network Threat": 2,
      "Reputation Score": 96,
      "SSL Validity": 98,
      "Redirect Risk": 0
    },
    modelInfo: {
      confidence,
      confidenceInterval: isHighRisk ? "89-97%" : (isSuspicious ? "54-69%" : "3-12%"),
      model: "VeritasAI-v2.3",
      analysisTime: "2.1s"
    },
    timestamp: new Date().toISOString()
  };
};

// News Analysis
export const analyzeNews = async (newsText) => {
  await delay(2000);

  const isHighRisk = newsText.toLowerCase().includes('shocking') ||
    newsText.toLowerCase().includes('you won\'t believe') ||
    newsText.toLowerCase().includes('doctors hate') ||
    newsText.toLowerCase().includes('secret');

  const isSuspicious = !isHighRisk && (
    newsText.toLowerCase().includes('breaking') ||
    newsText.toLowerCase().includes('exclusive') ||
    newsText.toLowerCase().includes('revealed')
  );

  const riskLevel = isHighRisk ? "HIGH RISK" : (isSuspicious ? "SUSPICIOUS" : "SAFE");
  const confidence = isHighRisk ? 89 : (isSuspicious ? 67 : 11);

  return {
    riskLevel,
    confidence,
    explanations: [
      {
        category: "Content Analysis",
        findings: isHighRisk ? [
          "Sensationalist headline score: 8.9/10",
          "Emotional manipulation index: 0.81",
          "Factual claim count: 12 unverified",
          "Clickbait language patterns: 7 detected"
        ] : isSuspicious ? [
          "Sensationalist headline score: 5.2/10",
          "Emotional manipulation index: 0.42",
          "Factual claim count: 4 unverified"
        ] : [
          "Sensationalist headline score: 1.8/10",
          "Emotional manipulation index: 0.12",
          "Factual claims: 8/9 verified"
        ]
      },
      {
        category: "Source Verification",
        findings: isHighRisk ? [
          "Domain reputation: 23/100 (very low)",
          "Known fake news site: Yes (flagged by 4 fact-checkers)",
          "Credible source citations: 0 found",
          "Author credentials: Unverifiable"
        ] : isSuspicious ? [
          "Domain reputation: 54/100 (moderate)",
          "Known fake news site: No",
          "Credible source citations: 1 found",
          "Author credentials: Limited verification"
        ] : [
          "Domain reputation: 91/100 (high)",
          "Established news organization (founded 1982)",
          "Credible source citations: 5 found",
          "Author credentials: Verified journalist"
        ]
      },
      {
        category: "Pattern Recognition",
        findings: isHighRisk ? [
          "Clickbait probability: 92%",
          "Bias score: Extreme (9.1/10)",
          "Fact-to-opinion ratio: 0.12 (very low)",
          "Misinformation pattern match: 84%"
        ] : isSuspicious ? [
          "Clickbait probability: 48%",
          "Bias score: Moderate (5.3/10)",
          "Fact-to-opinion ratio: 0.58"
        ] : [
          "Clickbait probability: 8%",
          "Bias score: Minimal (2.1/10)",
          "Fact-to-opinion ratio: 0.87 (high)"
        ]
      }
    ],
    highlights: isHighRisk ? [
      {
        text: "shocking discovery",
        reason: "Sensationalist Language (confidence: 91%)",
        severity: "high"
      },
      {
        text: "doctors don't want you to know",
        reason: "Conspiracy Pattern (score: 8.7/10)",
        severity: "high"
      },
      {
        text: "miracle cure",
        reason: "Medical Misinformation (confidence: 94%)",
        severity: "high"
      }
    ] : isSuspicious ? [
      {
        text: "breaking news",
        reason: "Urgency Language (confidence: 67%)",
        severity: "medium"
      }
    ] : [],
    featureScores: isHighRisk ? {
      "Sensationalism": 89,
      "Source Credibility": 23,
      "Fact Verification": 18,
      "Bias Level": 91,
      "Clickbait Score": 92
    } : isSuspicious ? {
      "Sensationalism": 52,
      "Source Credibility": 54,
      "Fact Verification": 48,
      "Bias Level": 53,
      "Clickbait Score": 48
    } : {
      "Sensationalism": 18,
      "Source Credibility": 91,
      "Fact Verification": 87,
      "Bias Level": 21,
      "Clickbait Score": 8
    },
    modelInfo: {
      confidence,
      confidenceInterval: isHighRisk ? "84-94%" : (isSuspicious ? "61-74%" : "7-17%"),
      model: "VeritasAI-v2.3",
      analysisTime: "2.3s"
    },
    timestamp: new Date().toISOString()
  };
};

// Dashboard Statistics
export const getDashboardStats = async () => {
  await delay(500);

  return {
    summary: {
      totalScans: 1247,
      highRisk: 342,
      suspicious: 189,
      safe: 716
    },
    scansByType: [
      { name: 'Email', value: 412 },
      { name: 'Message', value: 298 },
      { name: 'Link', value: 356 },
      { name: 'News', value: 181 }
    ],
    riskTrend: [
      { date: 'Mon', highRisk: 12, suspicious: 8, safe: 25 },
      { date: 'Tue', highRisk: 18, suspicious: 11, safe: 31 },
      { date: 'Wed', highRisk: 15, suspicious: 9, safe: 28 },
      { date: 'Thu', highRisk: 22, suspicious: 14, safe: 34 },
      { date: 'Fri', highRisk: 19, suspicious: 12, safe: 29 },
      { date: 'Sat', highRisk: 8, suspicious: 5, safe: 18 },
      { date: 'Sun', highRisk: 6, suspicious: 4, safe: 15 }
    ],
    recentScans: [
      {
        id: 1,
        type: 'Email',
        riskLevel: 'HIGH RISK',
        confidence: 87,
        date: '2024-01-15 14:32',
        preview: 'Urgent: Verify your account...'
      },
      {
        id: 2,
        type: 'Link',
        riskLevel: 'SUSPICIOUS',
        confidence: 64,
        date: '2024-01-15 13:18',
        preview: 'https://paypa1-secure.tk/login'
      },
      {
        id: 3,
        type: 'Message',
        riskLevel: 'SAFE',
        confidence: 9,
        date: '2024-01-15 12:45',
        preview: 'Hey, are we still meeting...'
      },
      {
        id: 4,
        type: 'News',
        riskLevel: 'HIGH RISK',
        confidence: 91,
        date: '2024-01-15 11:22',
        preview: 'Shocking discovery doctors...'
      },
      {
        id: 5,
        type: 'Email',
        riskLevel: 'SAFE',
        confidence: 12,
        date: '2024-01-15 10:08',
        preview: 'Meeting agenda for tomorrow'
      }
    ],
    topThreats: [
      { type: 'Phishing Emails', percentage: 34, count: 116 },
      { type: 'Malicious Links', percentage: 28, count: 96 },
      { type: 'Financial Scams', percentage: 19, count: 65 },
      { type: 'Fake News', percentage: 12, count: 41 },
      { type: 'Impersonation', percentage: 7, count: 24 }
    ]
  };
};
