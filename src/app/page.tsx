import React from "react";
import Link from "next/link";
import { ArrowRight, MessageSquare, BarChart3, Shield, Sparkles, Code, Zap, Github } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
      
      {/* Navigation */}
      <header className="px-6 h-16 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center gap-2 font-semibold text-lg tracking-tight">
          <div className="flex items-center justify-center text-zinc-900 dark:text-white">
            <MessageSquare size={20} className="fill-current" />
          </div>
          <span>Feedback Pulse</span>
        </div>
        <nav className="flex items-center gap-6">
          <Link 
            href="https://github.com/Blazeiscoding/feedback-pulse"
            target="_blank"
            className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors flex items-center gap-2"
          >
            <Github size={16} />
            <span className="hidden sm:inline">GitHub</span>
          </Link>
          <Link 
            href="/signin" 
            className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors"
          >
            Sign In
          </Link>
          <Link 
            href="/dashboard" 
            className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-900 text-sm font-medium rounded-full transition-colors"
          >
            Get Started
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-24 md:py-32 px-6 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 text-sm font-medium border border-zinc-200 dark:border-zinc-800">
              <Sparkles size={14} />
              <span>Now with AI-powered sentiment analysis</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Collect feedback,
              <br />
              <span className="text-zinc-500 dark:text-zinc-400">
                effortlessly.
              </span>
            </h1>
            
            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              The simplest way to gather user feedback, analyze sentiment with AI, and improve your product based on real data.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link 
                href="/dashboard" 
                className="h-12 px-6 rounded-full bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-900 font-medium flex items-center gap-2 transition-transform hover:-translate-y-0.5"
              >
                Start for free 
                <ArrowRight size={16} />
              </Link>
              <Link 
                href="/test-widget.html" 
                className="h-12 px-6 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 font-medium flex items-center gap-2 transition-colors text-zinc-600 dark:text-zinc-300"
              >
                Live Demo
              </Link>
            </div>

            {/* Code Preview */}
            <div className="pt-16 max-w-xl mx-auto">
              <div className="rounded-lg bg-zinc-50 dark:bg-zinc-900 p-4 border border-zinc-200 dark:border-zinc-800 text-left overflow-hidden">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                </div>
                <code className="text-sm font-mono block overflow-x-auto">
                  <span className="text-zinc-400 dark:text-zinc-500 display-block mb-1">&lt;!-- Add to your website --&gt;</span>
                  <div className="text-zinc-800 dark:text-zinc-200">
                    <span className="text-blue-600 dark:text-blue-400">&lt;script</span>
                    <span className="ml-2 text-purple-600 dark:text-purple-400">src</span>
                    <span className="text-zinc-400 dark:text-zinc-600">=</span>
                    <span className="text-green-600 dark:text-green-400">&quot;/widget.js&quot;</span>
                    <span className="ml-2 text-purple-600 dark:text-purple-400">data-project</span>
                    <span className="text-zinc-400 dark:text-zinc-600">=</span>
                    <span className="text-green-600 dark:text-green-400">&quot;YOUR_KEY&quot;</span>
                    <span className="text-blue-600 dark:text-blue-400">&gt;&lt;/script&gt;</span>
                  </div>
                </code>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-6 border-y border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/50">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatItem value="1 line" label="of code to integrate" />
            <StatItem value="<5kb" label="widget size" />
            <StatItem value="∞" label="feedback entries" />
            <StatItem value="100%" label="free to use" />
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Everything you need
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-lg">
                A complete toolkit for understanding your users.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Code size={20} />}
                title="Easy Integration"
                description="Add our lightweight widget to any website with just a single line of code. No complex setup involved."
              />
              <FeatureCard 
                icon={<Sparkles size={20} />}
                title="AI Insights"
                description="Automatically analyze sentiment and categorize feedback using advanced AI models."
              />
              <FeatureCard 
                icon={<Shield size={20} />}
                title="Secure & Private"
                description="Your data is encrypted and secure. We prioritize user privacy and data protection above all."
              />
              <FeatureCard 
                icon={<Zap size={20} />}
                title="Real-time Updates"
                description="See feedback as it comes in. Instant notifications keep you connected to your users."
              />
              <FeatureCard 
                icon={<BarChart3 size={20} />}
                title="Analytics Dashboard"
                description="Minimal dashboard to visualize trends, track feedback volume, and identify patterns."
              />
              <FeatureCard 
                icon={<MessageSquare size={20} />}
                title="Multiple Projects"
                description="Manage feedback from multiple websites or products from a single unified view."
              />
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-24 px-6 bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-zinc-800">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4 text-zinc-900 dark:text-white">
                Get started in minutes
              </h2>
            </div>
            <div className="space-y-12">
              <StepItem 
                number="01"
                title="Create your project"
                description="Sign up and create a new project. You'll instantly get a unique project key to use."
              />
              <StepItem 
                number="02"
                title="Add the widget"
                description="Copy and paste the script tag into your website's HTML. No dependencies required."
              />
              <StepItem 
                number="03"
                title="Collect feedback"
                description="Users can now submit feedback through a sleek widget. View it all in your dashboard."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Ready to understand your users?
            </h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400">
              Join developers who use Feedback Pulse to build better products.
            </p>
            <div>
              <Link 
                href="/signup" 
                className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-900 font-semibold transition-transform hover:-translate-y-0.5"
              >
                Get started for free
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 px-6 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 font-semibold">
            <MessageSquare size={16} />
            <span>Feedback Pulse</span>
          </div>
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} Feedback Pulse. Built by{" "}
            <Link href="https://github.com/Blazeiscoding" target="_blank" className="hover:text-zinc-900 dark:hover:text-zinc-300 underline underline-offset-4 decoration-zinc-300">
              Nikhil Rathore
            </Link>
          </p>
          <div className="flex items-center gap-4">
            <Link 
              href="https://github.com/Blazeiscoding/feedback-pulse" 
              target="_blank"
              className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              <Github size={20} />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold text-zinc-900 dark:text-white">
        {value}
      </div>
      <div className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 font-medium">{label}</div>
    </div>
  );
}

function FeatureCard({ 
  icon, 
  title, 
  description
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) {
  return (
    <div className="p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
      <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4 text-zinc-900 dark:text-zinc-100">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2 text-zinc-900 dark:text-white">{title}</h3>
      <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">{description}</p>
    </div>
  );
}

function StepItem({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="flex gap-6 items-start">
      <div className="text-4xl font-bold text-zinc-300 dark:text-zinc-700">
        {number}
      </div>
      <div className="pt-2">
        <h3 className="text-lg font-semibold mb-2 text-zinc-900 dark:text-white">{title}</h3>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
