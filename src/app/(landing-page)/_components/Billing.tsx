"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { CreditsPackage } from "@/types/billing"
import { CircleCheckIcon, CoinsIcon, CreditCardIcon, SparklesIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { PurchaseCredits } from "../../../../actions/biling/purchaseCredits"

const Billing = () => {
    const mutation = useMutation({
        mutationFn: PurchaseCredits,
        onSuccess: () => {
            toast.success("Purchase complete! Enjoy your credits!", { id: "purchase" })
        },
        onError: () => {
            toast.error("Something went wrong with your purchase", { id: "purchase" })
        },
    })

    return (
        <Card className=" font-mono !border-none !shadow-none max-w-7xl mx-auto rounded-xl overflow-hidden bg-transparent">
            <CardHeader className="pb-4 ">
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-primary/10">
                        <CoinsIcon className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                        <CardTitle className="text-2xl font-bold">Amazing Credit based purchasing system</CardTitle>
                        <CardDescription>Select a package that suits your needs and boost your experience</CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {CreditsPackage.map((pack) => {
                        const best = pack.bestValue
                        const discount = Math.round((1 - pack.discountedPrice! / pack.price) * 100)

                        return (
                            <div key={pack.id} className={cn("relative group h-full", best ? "z-10" : "")}>
                                <div
                                    className={cn(
                                        "absolute inset-0 rounded-xl transition-all duration-300",
                                        best
                                            ? "bg-gradient-to-b from-primary/20 to-primary/5 dark:from-primary/30 dark:to-primary/10 shadow-lg"
                                            : "bg-card shadow-md group-hover:shadow-lg",
                                    )}
                                />

                                {best && (
                                    <div className="absolute -top-3 inset-x-0 flex justify-center z-10">
                                        <Badge className="px-3 py-1 bg-primary text-primary-foreground font-medium rounded-full shadow-md">
                                            <SparklesIcon className="w-3.5 h-3.5 mr-1" />
                                            Most Popular
                                        </Badge>
                                    </div>
                                )}

                                <div
                                    className={cn(
                                        "relative z-10 h-full flex flex-col p-6 rounded-xl",
                                        best ? "ring-2 ring-primary z-0" : "ring-1 ring-border group-hover:ring-primary/50",
                                    )}
                                >
                                    <div className="mb-6 flex items-center gap-3">
                                        <div className="p-2 rounded-full bg-primary/10">
                                            <pack.icon size={22} className="text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold">{pack.name}</h3>
                                            <p className="text-muted-foreground text-sm">{pack.description}</p>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <div className="flex items-baseline gap-2">
                                            <p className="text-3xl font-bold">₹{pack.discountedPrice}</p>
                                            <div>
                                                <p className="text-muted-foreground line-through text-sm">₹{pack.price}</p>
                                                <p className="text-xs text-primary font-medium">Save {discount}%</p>
                                            </div>
                                        </div>
                                        <p className="text-lg font-semibold mt-1">{pack.label}</p>
                                    </div>

                                    <div className="space-y-3 mb-6 flex-grow">
                                        {pack.features.map((feature, index) => (
                                            <div key={index} className="flex items-start gap-2">
                                                <CircleCheckIcon
                                                    size={18}
                                                    className="text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0"
                                                />
                                                <p className="text-muted-foreground font-medium text-sm">{feature}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <Button
                                        onClick={() => mutation.mutate(pack.id)}
                                        disabled={mutation.isPending}
                                        variant={best ? "default" : "outline"}
                                        className={cn(
                                            "w-full font-semibold transition-all duration-300",
                                            best ? "bg-primary hover:bg-primary/90" : "",
                                        )}
                                    >
                                        {mutation.isPending ? (
                                            <div className="flex items-center gap-2">
                                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                                <span>Processing...</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <CreditCardIcon size={18} />
                                                <span>Purchase Now</span>
                                            </div>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </CardContent>

            <CardFooter className="border-t p-6 flex justify-center">
                <p className="text-sm text-muted-foreground">
                    Need help choosing?{" "}
                    <a href="#" className="text-primary hover:underline">
                        Contact our support team
                    </a>
                </p>
            </CardFooter>
        </Card>
    )
}

export default Billing

