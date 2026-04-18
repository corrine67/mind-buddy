import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, AlertCircle, Zap, Target } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const moodData = [
  { date: "Mon", mood: 3 },
  { date: "Tue", mood: 3.5 },
  { date: "Wed", mood: 4 },
  { date: "Thu", mood: 3.8 },
  { date: "Fri", mood: 4.2 },
  { date: "Sat", mood: 4.5 },
  { date: "Sun", mood: 4 },
];

type BurnoutLevel = "low" | "moderate" | "high";

function getBurnoutColor(level: BurnoutLevel): string {
  switch (level) {
    case "high":
      return "border-red-500/30 bg-red-500/10";
    case "moderate":
      return "border-yellow-500/30 bg-yellow-500/10";
    case "low":
      return "border-green-500/30 bg-green-500/10";
  }
}

function getBurnoutIconColor(level: BurnoutLevel): string {
  switch (level) {
    case "high":
      return "text-red-400";
    case "moderate":
      return "text-yellow-400";
    case "low":
      return "text-green-400";
  }
}

function getBurnoutMessage(level: BurnoutLevel): string {
  switch (level) {
    case "high":
      return "You're showing signs of burnout. Consider taking a break and reaching out for support.";
    case "moderate":
      return "You're at moderate risk. Keep up with your wellness habits and self-care.";
    case "low":
      return "Great job! You're managing stress well. Keep it up!";
  }
}

export default function Dashboard() {
  const wellnessScore = 72;
  const burnoutRisk: BurnoutLevel = "moderate";
  const streakDays = 5;

  return (
    <div className="app-shell">
      <div className="app-content">
        <div className="container max-w-sm space-y-6 py-6">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Your Wellness Dashboard</h1>
            <p className="text-sm text-muted-foreground">This week's insights and trends</p>
          </div>

          {/* Wellness Score */}
          <Card className="card-gradient border-purple-700/30 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Weekly Wellness Score</p>
                <p className="text-4xl font-bold">{wellnessScore}</p>
              </div>
              <div className="text-right">
                <div className="text-5xl font-bold text-accent">{wellnessScore}%</div>
              </div>
            </div>
            <div className="h-2 w-full rounded-full bg-border">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-400"
                style={{ width: `${wellnessScore}%` }}
              />
            </div>
          </Card>

          {/* Mood Trend */}
          <Card className="card-gradient border-purple-700/30 space-y-3">
            <h2 className="flex items-center gap-2 text-sm font-semibold">
              <TrendingUp size={16} className="text-accent" />
              Mood Trend
            </h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={moodData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" domain={[0, 5]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(30, 20, 50, 0.9)",
                    border: "1px solid rgba(200, 100, 255, 0.3)",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="mood"
                  stroke="#00d9ff"
                  strokeWidth={2}
                  dot={{ fill: "#a855f7", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Burnout Risk */}
          <Card className={`space-y-3 border-2 p-4 ${getBurnoutColor(burnoutRisk)}`}>
            <div className="flex items-center gap-2">
              <AlertCircle size={20} className={getBurnoutIconColor(burnoutRisk)} />
              <h2 className="font-semibold">
                Burnout Risk: {burnoutRisk.charAt(0).toUpperCase() + burnoutRisk.slice(1)}
              </h2>
            </div>
            <p className="text-sm opacity-80">{getBurnoutMessage(burnoutRisk)}</p>
          </Card>

          {/* Habit Streak */}
          <Card className="card-gradient border-purple-700/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap size={20} className="text-accent" />
                <h2 className="font-semibold">Current Streak</h2>
              </div>
              <span className="text-2xl font-bold text-accent">{streakDays} days</span>
            </div>
            <p className="text-sm text-muted-foreground">Keep up your wellness habits!</p>
            <Button className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:shadow-lg hover:shadow-cyan-500/20">
              View All Habits
            </Button>
          </Card>

          {/* AI Insights */}
          <Card className="card-gradient border-purple-700/30 space-y-3">
            <div className="flex items-center gap-2">
              <Target size={20} className="text-accent" />
              <h2 className="font-semibold">AI Insights</h2>
            </div>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Pattern:</strong> Your mood improves on weekends. Consider scheduling more relaxation time during the week.
              </p>
              <p>
                <strong>Recommendation:</strong> Try the breathing exercise in your daily routine. It may help reduce stress.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
