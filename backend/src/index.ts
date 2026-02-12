import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import dashboardRoutes from "./routes/dashboard";
import scansRoutes from "./routes/scans";

dotenv.config();

// Supabase configuration – kept here so it’s easy to find.
// In production you should move these into environment variables instead
// of committing them to source control.
export const SUPABASE_URL = "https://qjmirmenxsmxlqtcihkh.supabase.co";
export const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqbWlybWVueHNteGxxdGNpaGtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4NTU2MTEsImV4cCI6MjA4NjQzMTYxMX0.ohMCmSXRXIB_0TZ6QJTqxE_j7EM84nGxwHeY3agZqKE";
export const SUPABASE_ADMIN_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqbWlybWVueHNteGxxdGNpaGtoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDg1NTYxMSwiZXhwIjoyMDg2NDMxNjExfQ.n3NN_MkFpADrvd-aDPkynIJFf3WVWwdcqo02XlIKs04";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
// Allow all origins during development so the frontend
// can always reach the API without CORS issues.
app.use(cors());

// Root endpoint
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "VeritasAI Backend API",
    version: "1.0.0",
    endpoints: {
      health: "/api/health",
      auth: {
        signup: "POST /api/auth/signup",
        signin: "POST /api/auth/signin",
        verify: "GET /api/auth/verify",
        me: "GET /api/auth/me",
      },
      dashboard: {
        summary: "GET /api/dashboard/summary",
        recent: "GET /api/dashboard/recent",
        byType: "GET /api/dashboard/by-type",
        timeseries: "GET /api/dashboard/timeseries",
      },
    },
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/scans", scansRoutes);

// Health check
app.get("/api/health", (req: Request, res: Response) => {
  res.status(200).json({ message: "Server is running" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
