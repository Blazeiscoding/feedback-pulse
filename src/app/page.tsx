import Link from "next/link";
import { ArrowRight, MessageSquare, BarChart3, Shield, Sparkles, Code, Zap, ChevronRight, Github } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 dark:bg-yellow-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-blob animation-delay-4000" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-blob animation-delay-6000" />
      </div>

      {/* Navigation */}
      <header className="px-6 h-16 flex items-center justify-between border-b border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-md bg-white/70 dark:bg-black/70 sticky top-0 z-50">
        <div className="flex items-center gap-2 font-bold text-xl">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
            <MessageSquare size={18} />
          </div>
          <span>Feedback Pulse</span>
        </div>
        <nav className="flex items-center gap-4">
          <Link 
            href="https://github.com/Blazeiscoding/feedback-pulse"
            target="_blank"
            className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1"
          >
            <Github size={16} />
            <span className="hidden sm:inline">GitHub</span>
          </Link>
          <Link 
            href="/signin" 
            className="text-sm font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Sign In
          </Link>
          <Link 
            href="/dashboard" 
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm font-medium rounded-full transition-all hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105"
          >
            Get Started
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-24 md:py-32 px-6 text-center relative">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium border border-blue-100 dark:border-blue-800/50 shadow-sm">
              <Sparkles size={14} className="animate-pulse" />
              <span>Now with AI-powered sentiment analysis</span>
              <ChevronRight size={14} />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-900 dark:from-white dark:via-zinc-300 dark:to-white">
                Collect feedback
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 animate-gradient">
                effortlessly.
              </span>
            </h1>
            
            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              The simplest way to gather user feedback, analyze sentiment with AI, and improve your product based on real data.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link 
                href="/dashboard" 
                className="group h-14 px-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium flex items-center gap-2 transition-all hover:scale-105 shadow-xl shadow-blue-500/25"
              >
                Start for free 
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/test-widget.html" 
                className="h-14 px-8 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 font-medium flex items-center gap-2 transition-all hover:scale-105 backdrop-blur-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Live Demo
              </Link>
            </div>

            {/* Code Preview */}
            <div className="pt-12 max-w-xl mx-auto">
              <div className="rounded-xl bg-zinc-900 dark:bg-zinc-950 p-4 shadow-2xl border border-zinc-800 text-left">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-xs text-zinc-500 ml-2">index.html</span>
                </div>
                <code className="text-sm text-zinc-300 font-mono">
                  <span className="text-zinc-500">&lt;!-- Add to your website --&gt;</span>
                  <br />
                  <span className="text-pink-400">&lt;script</span>
                  <br />
                  <span className="text-purple-400 ml-4">src</span>
                  <span className="text-zinc-400">=</span>
                  <span className="text-green-400">&quot;/widget.js&quot;</span>
                  <br />
                  <span className="text-purple-400 ml-4">data-project</span>
                  <span className="text-zinc-400">=</span>
                  <span className="text-green-400">&quot;YOUR_KEY&quot;</span>
                  <span className="text-pink-400">&gt;&lt;/script&gt;</span>
                </code>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-6 border-y border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-sm bg-white/50 dark:bg-black/50">
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
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Everything you need to collect feedback
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                A complete toolkit for understanding your users and building better products.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <FeatureCard 
                icon={<Code className="text-blue-600" />}
                title="Easy Integration"
                description="Add our lightweight widget to any website with just a single line of code. No complex setup required."
                gradient="from-blue-500/10 to-cyan-500/10"
              />
              <FeatureCard 
                icon={<Sparkles className="text-purple-600" />}
                title="AI Insights"
                description="Automatically analyze sentiment and categorize feedback using Google's Gemini AI."
                gradient="from-purple-500/10 to-pink-500/10"
              />
              <FeatureCard 
                icon={<Shield className="text-green-600" />}
                title="Secure & Private"
                description="Your data is encrypted and secure. We prioritize user privacy and data protection."
                gradient="from-green-500/10 to-emerald-500/10"
              />
              <FeatureCard 
                icon={<Zap className="text-yellow-600" />}
                title="Real-time Updates"
                description="See feedback as it comes in. Instant notifications keep you connected to your users."
                gradient="from-yellow-500/10 to-orange-500/10"
              />
              <FeatureCard 
                icon={<BarChart3 className="text-rose-600" />}
                title="Analytics Dashboard"
                description="Beautiful dashboard to visualize trends, track feedback volume, and identify patterns."
                gradient="from-rose-500/10 to-red-500/10"
              />
              <FeatureCard 
                icon={<MessageSquare className="text-indigo-600" />}
                title="Multiple Project Support"
                description="Manage feedback from multiple websites or products from a single dashboard."
                gradient="from-indigo-500/10 to-violet-500/10"
              />
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-24 px-6 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900/50 dark:to-black">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Get started in 3 simple steps
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                From setup to receiving feedback in under 5 minutes.
              </p>
            </div>
            <div className="space-y-8">
              <StepItem 
                number="1"
                title="Create your project"
                description="Sign up and create a new project. You'll instantly get a unique project key."
              />
              <StepItem 
                number="2"
                title="Add the widget"
                description="Copy and paste the script tag into your website's HTML. That's it!"
              />
              <StepItem 
                number="3"
                title="Collect feedback"
                description="Users can now submit feedback through a sleek widget. View and analyze it in your dashboard."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-12 md:p-16 shadow-2xl shadow-blue-500/25 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
              <div className="relative">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to understand your users?
                </h2>
                <p className="text-blue-100 mb-8 max-w-xl mx-auto">
                  Join developers who use Feedback Pulse to build better products. Free to use, no credit card required.
                </p>
                <Link 
                  href="/signup" 
                  className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-white text-blue-600 font-semibold hover:bg-blue-50 transition-all hover:scale-105 shadow-xl"
                >
                  Get started for free
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 px-6 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white">
              <MessageSquare size={12} />
            </div>
            <span>Feedback Pulse</span>
          </div>
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} Feedback Pulse. Built with ❤️ by{" "}
            <Link href="https://github.com/Blazeiscoding" target="_blank" className="hover:text-blue-600 transition-colors">
              Nikhil Rathore
            </Link>
          </p>
          <div className="flex items-center gap-4">
            <Link 
              href="https://github.com/Blazeiscoding/feedback-pulse" 
              target="_blank"
              className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
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
      <div className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
        {value}
      </div>
      <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{label}</div>
    </div>
  );
}

function FeatureCard({ 
  icon, 
  title, 
  description,
  gradient 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  gradient: string;
}) {
  return (
    <div className={`group p-6 rounded-2xl bg-gradient-to-br ${gradient} border border-zinc-200/50 dark:border-zinc-800/50 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all hover:shadow-xl hover:-translate-y-1`}>
      <div className="w-12 h-12 rounded-xl bg-white dark:bg-zinc-900 shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{description}</p>
    </div>
  );
}

function StepItem({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="flex gap-6 items-start">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-lg shadow-blue-500/25">
        {number}
      </div>
      <div className="pt-2">
        <h3 className="text-xl font-bold mb-1">{title}</h3>
        <p className="text-zinc-600 dark:text-zinc-400">{description}</p>
      </div>
    </div>
  );
}
