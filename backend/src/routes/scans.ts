import { Router, Request, Response } from "express";
import { supabaseAdmin } from "../lib/supabase";
import { authMiddleware } from "../lib/auth-middleware";

const router = Router();

const TABLE = process.env.SCAN_TABLE || "scans";

interface LogScanRequest extends Request {
  body: {
    phishing_id?: string | null;
    scan_type: string;
    risk_level: number; // 1 = safe, 2 = suspicious, 3 = high
    confidence: number;
    threat_type: string;
  };
}

// POST /api/scans/log
// Records a single scan result for the authenticated user.
router.post(
  "/log",
  authMiddleware,
  async (req: LogScanRequest, res: Response): Promise<void> => {
    try {
      const user = req.user;
      if (!user || !user.id) {
        res.status(401).json({ error: "Unauthenticated" });
        return;
      }

      const { phishing_id, scan_type, risk_level, confidence, threat_type } =
        req.body || {};

      if (!scan_type || typeof risk_level !== "number" || !threat_type) {
        res.status(400).json({ error: "Missing required scan fields" });
        return;
      }

      const now = new Date().toISOString();

      const { error } = await supabaseAdmin.from(TABLE).insert([
        {
          user_id: user.id,
          phishing_id: phishing_id || null,
          scan_type,
          risk_level,
          confidence,
          threat_type,
          scan_date: now,
          created_at: now,
        },
      ]);

      if (error) {
        console.error("Error logging scan:", error);
        res.status(500).json({ error: "Failed to log scan" });
        return;
      }

      res.status(201).json({ message: "Scan logged successfully" });
    } catch (err) {
      console.error("Log scan error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default router;

