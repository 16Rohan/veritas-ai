import { authService } from "./authService";

const API_BASE_URL = "http://localhost:5000/api";

const getAuthHeaders = () => {
  const token = authService.getToken();
  if (!token) {
    throw new Error("Not authenticated");
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const getDashboardStats = async () => {
  const headers = getAuthHeaders();

  const [summaryRes, recentRes, byTypeRes, timeseriesRes] = await Promise.all([
    fetch(`${API_BASE_URL}/dashboard/summary`, { headers }),
    fetch(`${API_BASE_URL}/dashboard/recent?limit=25`, { headers }),
    fetch(`${API_BASE_URL}/dashboard/by-type`, { headers }),
    fetch(`${API_BASE_URL}/dashboard/timeseries?days=7`, { headers }),
  ]);

  if (!summaryRes.ok) {
    throw new Error("Failed to load summary data");
  }
  if (!recentRes.ok) {
    throw new Error("Failed to load recent scans");
  }
  if (!byTypeRes.ok) {
    throw new Error("Failed to load type breakdown");
  }
  if (!timeseriesRes.ok) {
    throw new Error("Failed to load time-series data");
  }

  const summaryJson = await summaryRes.json();
  const recentJson = await recentRes.json();
  const byTypeJson = await byTypeRes.json();
  const timeseriesJson = await timeseriesRes.json();

  const summary = {
    totalScans: summaryJson.totalScans || 0,
    highRisk: summaryJson.highRisk || 0,
    suspicious: summaryJson.suspicious || 0,
    safe: summaryJson.safe || 0,
  };

  const byType = byTypeJson.byType || {};
  const scansByType = Object.entries(byType).map(([name, value]) => ({
    name,
    value: (value && typeof value.count === "number" ? value.count : 0),
  }));

  const totalThreatCount = Object.values(byType).reduce(
    (sum, value) => sum + (value && typeof value.count === "number" ? value.count : 0),
    0
  );

  const topThreats = Object.entries(byType)
    .map(([name, value]) => {
      const count = value && typeof value.count === "number" ? value.count : 0;
      const percentage = totalThreatCount ? Math.round((count / totalThreatCount) * 100) : 0;
      return { type: name, count, percentage };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const recentItems = Array.isArray(recentJson.items) ? recentJson.items : [];
  const recentScans = recentItems.map((item) => {
    const riskLevelNumeric = typeof item.risk_level === "number" ? item.risk_level : undefined;
    let riskLevel = "SAFE";
    if (riskLevelNumeric === 3) {
      riskLevel = "HIGH RISK";
    } else if (riskLevelNumeric === 2) {
      riskLevel = "SUSPICIOUS";
    } else if (riskLevelNumeric === 1) {
      riskLevel = "SAFE";
    }

    const rawDate = item.scan_date || item.created_at;
    const date = rawDate ? new Date(rawDate).toLocaleString() : "";

    return {
      id: item.id,
      type: item.scan_type || item.threat_type || "Scan",
      riskLevel,
      confidence: Math.round(Number(item.confidence) || 0),
      date,
      preview: item.threat_type || "",
    };
  });

  const points = Array.isArray(timeseriesJson.points) ? timeseriesJson.points : [];
  const riskTrend = points.map((point) => ({
    date: point.date,
    highRisk: point.highRisk || 0,
    suspicious: point.suspicious || 0,
    safe: point.safe || 0,
  }));

  return {
    summary,
    scansByType,
    riskTrend,
    recentScans,
    topThreats,
  };
};

