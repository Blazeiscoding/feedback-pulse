import Link from "next/link";
import { ArrowRight, MessageSquare, BarChart3, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-black text-zinc-900 dark:text-zinc-100">
      {/* Navigation */}
      <header className="px-6 h-16 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2 font-bold text-xl">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
            <MessageSquare size={18} />
          </div>
          <span>Feedback Pulse</span>
        </div>
        <nav className="flex items-center gap-4">
          <Link 
            href="/signin" 
            className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Sign In
          </Link>
          <Link 
            href="/dashboard" 
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-full transition-colors"
          >
            Get Started
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-24 px-6 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              v1.0 is now live
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-500">
              Collect feedback <br />
              <span className="text-blue-600">effortlessly.</span>
            </h1>
            
            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              The simplest way to gather user feedback, analyze sentiment with AI, and improve your product based on real data.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link 
                href="/dashboard" 
                className="h-12 px-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center gap-2 transition-all hover:scale-105"
              >
                Start for free <ArrowRight size={18} />
              </Link>
              <Link 
                href="/test-widget.html" 
                className="h-12 px-8 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 font-medium flex items-center gap-2 transition-colors"
              >
                View Demo
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 px-6 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<MessageSquare className="text-blue-600" />}
              title="Easy Integration"
              description="Add our lightweight widget to any website with just a few lines of code."
            />
            <FeatureCard 
              icon={<BarChart3 className="text-purple-600" />}
              title="AI Insights"
              description="Automatically analyze sentiment and categorize feedback using advanced AI models."
            />
            <FeatureCard 
              icon={<Shield className="text-green-600" />}
              title="Secure & Private"
              description="Your data is encrypted and secure. We prioritize user privacy and data protection."
            />
          </div>
        </section>
      </main>

      <footer className="py-8 px-6 border-t border-zinc-200 dark:border-zinc-800 text-center text-zinc-500 text-sm">
        <p>© {new Date().getFullYear()} Feedback Pulse. All rights reserved.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow">
      <div className="w-12 h-12 rounded-xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-zinc-600 dark:text-zinc-400">{description}</p>
    </div>
  );
}
