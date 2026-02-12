import { Router, Request, Response } from "express";
import { supabaseAdmin } from "../lib/supabase";
import { authMiddleware } from "../lib/auth-middleware";

const router = Router();

// Table name can be overridden via env for flexibility
const TABLE = process.env.SCAN_TABLE || "scans";

interface ScanRow {
  id?: string;
  phishing_id?: string;
  user_id: string;
  scan_type?: string;
  risk_level?: number;
  confidence: number;
  scan_date: string; // ISO string / timestamptz
  threat_type: string;
  created_at?: string;
  [key: string]: any;
}

// Helper: ensure we always have a user id on authed routes
const requireUserId = (req: Request): string => {
  if (!req.user || !req.user.id) {
    throw new Error("Missing authenticated user");
  }
  return req.user.id;
};

// GET /api/dashboard/summary
// Returns per-user counts, average confidence and a small breakdown by threat_type
router.get(
  "/summary",
  authMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = requireUserId(req);

      // Total count for this user
      const { count, error: countError } = await supabaseAdmin
        .from(TABLE)
        .select("*", { head: true, count: "exact" })
        .eq("user_id", userId);

      if (countError) {
        console.error("Error fetching summary count:", countError);
        res.status(500).json({ error: "Failed to fetch summary count" });
        return;
      }

      // Fetch a reasonable sample of recent rows for client-side aggregation
      const { data: rows, error } = await supabaseAdmin
        .from(TABLE)
        .select("confidence,scan_date,threat_type,created_at,risk_level")
        .eq("user_id", userId)
        .order("scan_date", { ascending: false })
        .limit(1000);

      if (error) {
        console.error("Error fetching rows for summary:", error);
        res.status(500).json({ error: "Failed to fetch scan rows" });
        return;
      }

      const total = typeof count === "number" ? count : (rows || []).length;

      // compute avg confidence and counts by threat_type
      let avgConfidence = 0;
      let highRisk = 0;
      let suspicious = 0;
      let safe = 0;
      const byType: Record<string, { count: number; avgConfidence: number }> =
        {};

      if (rows && rows.length) {
        let sum = 0;
        for (const r of rows) {
          const c = Number(r.confidence) || 0;
          sum += c;
          const type = r.threat_type || "unknown";
          if (!byType[type]) byType[type] = { count: 0, avgConfidence: 0 };
          byType[type].count += 1;
          byType[type].avgConfidence += c;

          // Risk-level breakdown based strictly on numeric risk_level:
          // 3 = high, 2 = suspicious, 1 = safe. Anything else is treated as safe.
          const level = typeof r.risk_level === "number" ? r.risk_level : 1;
          if (level === 3) {
            highRisk += 1;
          } else if (level === 2) {
            suspicious += 1;
          } else {
            safe += 1;
          }
        }
        avgConfidence = sum / rows.length;
        // finalize averages
        for (const k of Object.keys(byType)) {
          byType[k].avgConfidence = byType[k].count
            ? byType[k].avgConfidence / byType[k].count
            : 0;
        }
      }

      res
        .status(200)
        .json({ totalScans: total, avgConfidence, byType, highRisk, suspicious, safe });
    } catch (err) {
      console.error("Summary error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// GET /api/dashboard/recent?limit=20
// Returns recent scans for the authenticated user
router.get(
  "/recent",
  authMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = requireUserId(req);
      const limit = Math.min(1000, Number(req.query.limit) || 20);
      const { data, error } = await supabaseAdmin
        .from(TABLE)
        .select("*")
        .eq("user_id", userId)
        .order("scan_date", { ascending: false })
        .limit(limit);

      if (error) {
        console.error("Error fetching recent scans:", error);
        res.status(500).json({ error: "Failed to fetch recent scans" });
        return;
      }

      res.status(200).json({ items: data || [] });
    } catch (err) {
      console.error("Recent error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// GET /api/dashboard/by-type
// Returns per-user counts and average confidence grouped by threat_type
router.get(
  "/by-type",
  authMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = requireUserId(req);

      const { data, error } = await supabaseAdmin
        .from(TABLE)
        .select("scan_type,confidence")
        .eq("user_id", userId)
        .order("scan_type", { ascending: true })
        .limit(5000);

      if (error) {
        console.error("Error fetching by-type:", error);
        res.status(500).json({ error: "Failed to fetch by-type data" });
        return;
      }

      const groups: Record<string, { count: number; avgConfidence: number }> =
        {};
      if (data) {
        for (const r of data) {
          const t = r.scan_type || "unknown";
          if (!groups[t]) groups[t] = { count: 0, avgConfidence: 0 };
          groups[t].count += 1;
          groups[t].avgConfidence += Number(r.confidence) || 0;
        }
        for (const k of Object.keys(groups)) {
          groups[k].avgConfidence = groups[k].count
            ? groups[k].avgConfidence / groups[k].count
            : 0;
        }
      }

      res.status(200).json({ byType: groups });
    } catch (err) {
      console.error("By-type error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// GET /api/dashboard/timeseries?days=30
// Returns per-user daily buckets with risk-level counts for the last N days
router.get(
  "/timeseries",
  authMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = requireUserId(req);
      const days = Math.min(365, Number(req.query.days) || 30);
      const fromDate = new Date();
      fromDate.setDate(fromDate.getDate() - days);

      const { data, error } = await supabaseAdmin
        .from(TABLE)
        .select("scan_date,confidence,risk_level")
        .eq("user_id", userId)
        .gte("scan_date", fromDate.toISOString())
        .order("scan_date", { ascending: true })
        .limit(10000)
        .returns<ScanRow[]>();

      if (error) {
        console.error("Error fetching timeseries:", error);
        res.status(500).json({ error: "Failed to fetch timeseries data" });
        return;
      }

      // bucket by day (YYYY-MM-DD)
      const buckets: Record<
        string,
        { count: number; sum: number; highRisk: number; suspicious: number; safe: number }
      > = {};

      // Pre-fill buckets for the requested range to ensure continuous graph
      for (let i = 0; i < days; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().slice(0, 10);
        buckets[dateStr] = { count: 0, sum: 0, highRisk: 0, suspicious: 0, safe: 0 };
      }
      if (data) {
        for (const r of data) {
          const d = new Date(r.scan_date).toISOString().slice(0, 10);
          if (!buckets[d]) {
            buckets[d] = { count: 0, sum: 0, highRisk: 0, suspicious: 0, safe: 0 };
          }

          const bucket = buckets[d];
          const confidence = Number(r.confidence) || 0;
          bucket.count += 1;
          bucket.sum += confidence;

          const level = typeof r.risk_level === "number" ? r.risk_level : 1;
          if (level === 3) {
            bucket.highRisk += 1;
          } else if (level === 2) {
            bucket.suspicious += 1;
          } else {
            bucket.safe += 1;
          }
        }
      }

      const points = Object.keys(buckets)
        .sort()
        .map((date) => {
          const bucket = buckets[date];
          return {
            date,
            count: bucket.count,
            avgConfidence: bucket.count ? bucket.sum / bucket.count : 0,
            highRisk: bucket.highRisk,
            suspicious: bucket.suspicious,
            safe: bucket.safe,
          };
        });

      res.status(200).json({ points });
    } catch (err) {
      console.error("Timeseries error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default router;
