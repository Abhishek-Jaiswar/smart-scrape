import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const HelpCenter = () => {
  const categories = [
    { name: "Account", icon: "👤" },
    { name: "Billing", icon: "💳" },
    { name: "Features", icon: "✨" },
    { name: "Docs", icon: "📚" },
    { name: "Feedback", icon: "💬" },
    { name: "Changelogs", icon: "📝" },
  ]

  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="bg-gradient-to-br from-rose-50 to-neutral-50 dark:from-rose-900/20 dark:to-neutral-900/20 border-none shadow">
        <CardHeader className="pb-0">
          <CardTitle className="text-4xl font-bold text-neutral-800 dark:text-neutral-100">
            👋 Welcome to the Help Center
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-neutral-600 dark:text-neutral-300 mt-4 max-w-3xl">
            We're here to assist you. Whether you have questions, feedback, or need support, our team is ready to help.
            Your input is valuable and helps us improve.
          </p>
          <div className="mt-8 relative max-w-2xl">
            <Input type="text" placeholder="Search for help..." className="pl-10 py-6 text-lg" />
            <Search className="absolute top-3 left-3 text-neutral-400" size={24} />
            <Button className="absolute right-2 top-2 bg-rose-500 hover:bg-rose-600 text-white">Search</Button>
          </div>
        </CardContent>
      </Card>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.name} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl font-semibold text-neutral-700 dark:text-neutral-200">
                <span className="mr-2 text-3xl">{category.icon}</span>
                {category.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-600 dark:text-neutral-400">
                Find help with {category.name.toLowerCase()} related topics and frequently asked questions.
              </p>
              <Button
                variant="link"
                className="mt-4 p-0 text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300"
              >
                Explore {category.name} →
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-12 bg-neutral-50 dark:bg-neutral-900/50">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100">
            Can't find what you're looking for?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-neutral-600 dark:text-neutral-300 mb-4">
            Our support team is always here to help. Reach out to us directly.
          </p>
          <Button className="bg-neutral-800 hover:bg-neutral-900 text-white dark:bg-neutral-200 dark:text-neutral-900 dark:hover:bg-neutral-100">
            Contact Support
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default HelpCenter

