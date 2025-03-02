import React from 'react'
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Rocket,
    Settings,
    FileDown,
    Shield,
    Code,
    HeadphonesIcon,
} from "lucide-react";


const primaryFeatures = [
    {
        title: "AI-Powered Scraping",
        description: "Leverage advanced machine learning algorithms to extract data efficiently from any website with minimal setup time.",
        icon: <Rocket className="h-10 w-10 text-rose-500" />,
        badge: "Popular",
    },
    {
        title: "Customizable Data Extraction",
        description: "Set precise parameters and filters to scrape only the data you need, reducing noise and improving quality.",
        icon: <Settings className="h-10 w-10 text-rose-500" />,
        badge: null,
    },
    {
        title: "One-Click Export",
        description: "Download your scraped data instantly in multiple formats including CSV, JSON, Excel, and Google Sheets integration.",
        icon: <FileDown className="h-10 w-10 text-rose-500" />,
        badge: null,
    },
    {
        title: "Secure & Reliable",
        description: "Built with enterprise-grade security features to ensure safe, ethical, and compliant data extraction practices.",
        icon: <Shield className="h-10 w-10 text-rose-500" />,
        badge: "Enterprise",
    },
    {
        title: "No Coding Required",
        description: "Intuitive visual interface that allows anyone to scrape data without programming knowledge or technical skills.",
        icon: <Code className="h-10 w-10 text-rose-500" />,
        badge: null,
    },
    {
        title: "24/7 Customer Support",
        description: "Our dedicated support team is available round the clock to assist you with any questions or technical issues.",
        icon: <HeadphonesIcon className="h-10 w-10 text-rose-500" />,
        badge: null,
    },
];

const Features = () => {
    return (
        <div className="container px-4 py-20 font-mono max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <Badge variant="outline" className="mb-2">Features</Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need for data extraction</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Smart Scrape combines powerful technology with an intuitive interface to make web scraping
                    accessible to everyone, from beginners to data professionals.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {primaryFeatures.map((feature, index) => (
                    <Card key={index} className="border border-border/40 bg-card/50 backdrop-blur-sm hover:shadow-md hover:shadow-rose-500/5 transition-all duration-300 overflow-hidden group">
                        <div className="absolute top-0 right-0 h-20 w-20 bg-gradient-to-bl from-rose-500/10 to-transparent rounded-bl-full" />
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <div className="p-2 rounded-lg bg-background/80 mb-4">
                                    {feature.icon}
                                </div>
                                {feature.badge && (
                                    <Badge variant="destructive">{feature.badge}</Badge>
                                )}
                            </div>
                            <CardTitle className="text-xl group-hover:text-rose-500 transition-colors">
                                {feature.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground text-sm">{feature.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default Features