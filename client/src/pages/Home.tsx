import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { Heart, Smile, Frown, Meh, AlertCircle } from "lucide-react";
import { useState } from "react";

const MOOD_OPTIONS = [
  { emoji: "😄", label: "Great", value: 5, color: "text-green-400" },
  { emoji: "🙂", label: "Good", value: 4, color: "text-cyan-400" },
  { emoji: "😐", label: "Okay", value: 3, color: "text-yellow-400" },
  { emoji: "😔", label: "Bad", value: 2, color: "text-orange-400" },
  { emoji: "😢", label: "Terrible", value: 1, color: "text-red-400" },
];

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [notes, setNotes] = useState("");

  if (!isAuthenticated) {
    return (
      <div className="app-shell flex items-center justify-center">
        <div className="container max-w-sm space-y-6 text-center">
          <div className="gradient-sky-blue rounded-2xl p-8">
            <Heart className="mx-auto mb-4 h-16 w-16 text-white" />
            <h1 className="text-3xl font-bold text-white">Mind Buddy</h1>
            <p className="mt-2 text-blue-100">Your AI companion for mental wellness</p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-semibold">Welcome to your wellness journey</h2>
            <p className="text-sm text-muted-foreground">
              Get AI-powered emotional support, track your mood, and connect with a supportive community.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-gray-600">Recent login:</p>
            <div className="rounded-lg bg-sky-50 p-3 border border-sky-200">
              <p className="font-semibold text-gray-900">john</p>
              <p className="text-xs text-gray-600">john@gmail.com</p>
            </div>
          </div>

          <a href={getLoginUrl()}>
            <Button size="lg" className="w-full bg-gradient-to-r from-sky-500 to-blue-400 text-white hover:shadow-lg hover:shadow-sky-400/30">
              Sign In with Manus
            </Button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <div className="app-content">
        <div className="container max-w-sm space-y-6 py-6">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">How are you feeling today?</h1>
            <p className="text-sm text-muted-foreground">Check in with your emotions</p>
          </div>

          {/* Mood Selection */}
          <Card className="card-gradient space-y-4 border-sky-200">
            <div className="grid grid-cols-5 gap-2">
              {MOOD_OPTIONS.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => setSelectedMood(mood.value)}
                  className={`flex flex-col items-center gap-1 rounded-lg p-3 transition-all duration-200 ${
                    selectedMood === mood.value
                      ? "bg-sky-100 border-2 border-sky-500"
                      : "border border-sky-200 hover:border-sky-400"
                  }`}
                >
                  <span className="text-3xl">{mood.emoji}</span>
                  <span className="text-xs font-medium">{mood.label}</span>
                </button>
              ))}
            </div>
          </Card>

          {/* Notes Input */}
          {selectedMood && (
            <Card className="card-gradient space-y-3 border-sky-200">
              <label className="text-sm font-medium">Add notes (optional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm placeholder-muted-foreground focus:border-accent focus:outline-none"
                rows={3}
              />
              <Button className="w-full bg-gradient-to-r from-sky-500 to-blue-400 text-white hover:shadow-lg hover:shadow-sky-400/30">
                Save Mood Check-in
              </Button>
            </Card>
          )}

          {/* Quick Actions */}
          <div className="space-y-3">
            <h2 className="text-sm font-semibold">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              <a href="/chat" className="card-interactive flex items-center gap-2 text-center">
                <MessageCircle className="h-5 w-5 text-sky-500" />
                <span className="text-sm font-medium">Chat with AI</span>
              </a>
              <a href="/dashboard" className="card-interactive flex items-center gap-2 text-center">
                <BarChart3 className="h-5 w-5 text-sky-500" />
                <span className="text-sm font-medium">View Insights</span>
              </a>
            </div>
          </div>

          {/* Crisis Alert */}
          <Card className="border-red-300 bg-red-50 p-4">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-400" />
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-red-400">Need immediate help?</h3>
                <p className="text-xs text-red-300/80">
                  If you're in crisis, please contact emergency services or a crisis hotline.
                </p>
            <Button variant="outline" size="sm" className="mt-2 border-red-300 text-red-600 hover:bg-red-100">
              Find Help
            </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

import { MessageCircle, BarChart3 } from "lucide-react";
