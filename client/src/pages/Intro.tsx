import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import { Heart, MessageCircle, Users, BarChart3, Shield } from "lucide-react";

export default function Intro() {
  return (
    <div className="app-shell flex flex-col items-center justify-center bg-white">
      <div className="container max-w-sm flex flex-col items-center justify-center min-h-screen space-y-8 py-12">
        {/* Logo */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-blue-500">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663439477588/dTJigbuqXSHYDK7QaDSYKE/mindbuddy-logo-XLy2HSDUed8RK4FjpjXQrD.webp"
              alt="Mind Buddy Logo"
              className="h-20 w-20"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Mind Buddy</h1>
          <p className="text-center text-lg text-gray-600">Your AI Companion for Mental Wellness</p>
        </div>

        {/* Features */}
        <div className="w-full space-y-3">
          <div className="flex items-center gap-3 rounded-lg bg-sky-50 p-4 border border-sky-200">
            <MessageCircle className="h-6 w-6 flex-shrink-0 text-sky-500" />
            <div>
              <p className="font-semibold text-gray-900">AI Chat Support</p>
              <p className="text-xs text-gray-600">Talk to your empathetic AI companion</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg bg-sky-50 p-4 border border-sky-200">
            <Heart className="h-6 w-6 flex-shrink-0 text-sky-500" />
            <div>
              <p className="font-semibold text-gray-900">Mood Tracking</p>
              <p className="text-xs text-gray-600">Check in daily and track your emotions</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg bg-sky-50 p-4 border border-sky-200">
            <Users className="h-6 w-6 flex-shrink-0 text-sky-500" />
            <div>
              <p className="font-semibold text-gray-900">Community Support</p>
              <p className="text-xs text-gray-600">Connect with others anonymously</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg bg-sky-50 p-4 border border-sky-200">
            <BarChart3 className="h-6 w-6 flex-shrink-0 text-sky-500" />
            <div>
              <p className="font-semibold text-gray-900">Wellness Insights</p>
              <p className="text-xs text-gray-600">Get personalized recommendations</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg bg-sky-50 p-4 border border-sky-200">
            <Shield className="h-6 w-6 flex-shrink-0 text-sky-500" />
            <div>
              <p className="font-semibold text-gray-900">Crisis Support</p>
              <p className="text-xs text-gray-600">Immediate help when you need it</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="w-full space-y-3 pt-4">
          <p className="text-center text-sm text-gray-600">
            Your mental health matters. Let's take care of it together.
          </p>
          <a href={getLoginUrl()} className="block">
            <Button size="lg" className="w-full bg-gradient-to-r from-sky-500 to-blue-400 text-white hover:shadow-lg hover:shadow-sky-400/30">
              Get Started
            </Button>
          </a>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 pt-4">
          <p>Secure • Private • Supportive</p>
        </div>
      </div>
    </div>
  );
}
