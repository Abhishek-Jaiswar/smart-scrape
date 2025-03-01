"use client"

import React from 'react'
import Link from 'next/link'
import {
  ArrowUpRight,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Zap
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Logo from '@/components/Logo'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "/" },
        { name: "Billing", href: "/dashboard/billing" },
        { name: "Documentation", href: "/docs" },
        { name: "Release Notes", href: "#" },
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#" },
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Help Center", href: "/help-center" },
        { name: "Support", href: "/help-center" },
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy", href: "#" },
        { name: "Terms", href: "#" },
        { name: "Security", href: "#" },
        { name: "Compliance", href: "#" },
      ]
    },
  ]

  const socialLinks = [
    { icon: <Twitter className="h-5 w-5" />, href: "#", label: "Twitter" },
    { icon: <Linkedin className="h-5 w-5" />, href: "#", label: "LinkedIn" },
    { icon: <Github className="h-5 w-5" />, href: "#", label: "GitHub" },
    { icon: <Instagram className="h-5 w-5" />, href: "#", label: "Instagram" },
  ]

  return (
    <footer className="relative border-t border-border bg-background">
      {/* Decorative gradient elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-chart-1/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-chart-2/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 relative">
          {/* Brand column */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="flex items-center mb-6">
              <Logo />
            </div>

            <p className="text-muted-foreground mb-6 max-w-md">
              Transforming the way businesses collect and analyze web data with intelligent,
              automated scraping solutions that drive insights and growth.
            </p>

            {/* Contact information */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center text-sm text-muted-foreground">
                <Mail className="h-4 w-4 mr-2 text-chart-1" />
                <a href="mailto:abhishekndxw@gmail.com" className="hover:text-primary transition-colors">
                  abhishekndxw@gmail.com
                </a>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Github className="h-4 w-4 mr-2 text-chart-1" />
                <Link href={'github.com/Abhishek-jasiwar'} className=' cursor-pointer hover:text-primary/80'>github.com/Abhishek-jasiwar</Link>
              </div>
              <div className="flex items-start text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2 mt-0.5 text-chart-1" />
                <span>Malad, Mumbai, India</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex space-x-4 mt-auto">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className={cn(
                    "p-2 rounded-full border border-border",
                    "text-muted-foreground hover:text-primary hover:border-primary",
                    "transition-all duration-200 ease-in-out"
                  )}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerLinks.map((column, idx) => (
              <div key={idx}>
                <h3 className="font-medium text-foreground mb-4">{column.title}</h3>
                <ul className="space-y-3">
                  {column.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="py-8 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-lg font-medium mb-2">Stay up to date</h3>
              <p className="text-sm text-muted-foreground">
                Get the latest news and updates from SmartScrape delivered to your inbox.
              </p>
            </div>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-l-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-r-md hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {currentYear} SmartScrape. All rights reserved.
          </p>

          <div className="flex items-center">
            <div
              className="group flex items-center"
            >
              <span className="text-sm text-muted-foreground mr-1 group-hover:text-primary transition-colors">
                Built with care
              </span>
              <ArrowUpRight className="h-3.5 w-3.5 text-chart-1 group-hover:text-primary transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer