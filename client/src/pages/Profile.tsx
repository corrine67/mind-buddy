import { useAuth } from "@/_core/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, LogOut, Bell, Heart, Shield, HelpCircle } from "lucide-react";

export default function Profile() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="app-shell">
      <div className="app-content">
        <div className="container max-w-sm space-y-6 py-6">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Your Profile</h1>
            <p className="text-sm text-muted-foreground">Manage your account and settings</p>
          </div>

          {/* User Info */}
          <Card className="card-gradient border-sky-200 space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-blue-400">
                <User size={32} className="text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold">john</h2>
                <p className="text-sm text-muted-foreground">{user?.email || "No email"}</p>
              </div>
            </div>
          </Card>

          {/* Wellness Stats */}
          <Card className="card-gradient border-sky-200 space-y-3">
            <h2 className="font-semibold">Wellness Stats</h2>
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-lg bg-border p-3 text-center">
                <p className="text-2xl font-bold text-accent">42</p>
                <p className="text-xs text-muted-foreground">Check-ins</p>
              </div>
              <div className="rounded-lg bg-border p-3 text-center">
                <p className="text-2xl font-bold text-accent">5</p>
                <p className="text-xs text-muted-foreground">Day Streak</p>
              </div>
              <div className="rounded-lg bg-border p-3 text-center">
                <p className="text-2xl font-bold text-accent">72</p>
                <p className="text-xs text-muted-foreground">Wellness %</p>
              </div>
            </div>
          </Card>

          {/* Settings */}
          <div className="space-y-2">
            <h2 className="text-sm font-semibold">Settings</h2>

            <Card className="card-interactive flex items-center justify-between border-sky-200">
              <div className="flex items-center gap-3">
                <Bell size={20} className="text-sky-500" />
                <span className="text-sm font-medium">Notifications</span>
              </div>
              <span className="text-xs text-muted-foreground">Enabled</span>
            </Card>

            <Card className="card-interactive flex items-center justify-between border-sky-200">
              <div className="flex items-center gap-3">
                <Heart size={20} className="text-sky-500" />
                <span className="text-sm font-medium">Trusted Contacts</span>
              </div>
              <span className="text-xs text-muted-foreground">2 added</span>
            </Card>

            <Card className="card-interactive flex items-center justify-between border-sky-200">
              <div className="flex items-center gap-3">
                <Shield size={20} className="text-sky-500" />
                <span className="text-sm font-medium">Privacy</span>
              </div>
              <span className="text-xs text-muted-foreground">Manage</span>
            </Card>

            <Card className="card-interactive flex items-center justify-between border-sky-200">
              <div className="flex items-center gap-3">
                <HelpCircle size={20} className="text-sky-500" />
                <span className="text-sm font-medium">Help & Support</span>
              </div>
              <span className="text-xs text-muted-foreground">Learn more</span>
            </Card>
          </div>

          {/* Logout */}
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10"
          >
            <LogOut size={16} className="mr-2" />
            Sign Out
          </Button>

          {/* Footer */}
          <div className="text-center text-xs text-muted-foreground">
            <p>Mind Buddy v1.0.0</p>
            <p>Your mental wellness companion</p>
          </div>
        </div>
      </div>
    </div>
  );
}
