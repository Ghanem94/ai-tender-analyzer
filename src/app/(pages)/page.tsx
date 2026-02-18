import { Navbar } from "@/components/shared/Navbar"
import { Footer } from "@/components/shared/Footer"
import { Hero } from "@/components/landing/Hero"
import { Features } from "@/components/landing/Features"
import { HowItWorks } from "@/components/landing/HowItWorks"
import { Pricing } from "@/components/landing/Pricing"
import { FAQ } from "@/components/landing/FAQ"
import { AIAgentBubble } from "@/components/shared/ai-agent-bubble"

export default function LandingPage() {
    return (
        <div className="flex min-h-screen flex-col relative">
            <Navbar />
            <main className="flex-1">
                <Hero />
                <Features />
                <HowItWorks />
                <Pricing />
                <FAQ />
            </main>
            <Footer />
            <AIAgentBubble />
        </div>
    )
}
