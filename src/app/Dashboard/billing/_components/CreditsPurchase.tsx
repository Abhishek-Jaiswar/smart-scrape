"use client"

import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CreditsPackage, PackageId } from "@/types/billing";
import { CircleCheckIcon, CoinsIcon, CreditCardIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { PurchaseCredits } from "../../../../../actions/biling/purchaseCredits";
import { useState } from "react";

const CreditsPurchase = () => {
    const [selectedPackage, setSelectePackage] = useState(PackageId.MEDIUM)
    const mutation = useMutation({
        mutationFn: PurchaseCredits,
        onSuccess: () => {

        },
        onError: () => {

        }

    })

    return (
        <Card className="shadow-lg border rounded-xl p-6 bg-white">
            <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-2 text-gray-900">
                    <CoinsIcon className="w-6 h-6 text-primary" />
                    Purchase Credits
                </CardTitle>
                <CardDescription className="text-gray-600">
                    Select the number of credits you want to purchase and proceed to checkout.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {CreditsPackage.map((pack) => {
                        const best = pack.bestValue;
                        return (
                            <div
                                key={pack.id}
                                className={cn(
                                    `relative shadow-md border rounded-xl transition-all duration-300 p-6 hover:shadow-xl`,
                                    best && "border-2 border-primary bg-white"
                                )}
                            >
                                {best && (
                                    <Badge className="absolute -top-2 left-[8.5rem] bg-primary text-white rounded-full ">
                                        Most Popular
                                    </Badge>
                                )}
                                <CardHeader className="h-[120px] flex flex-col items-center text-center">
                                    <div className="flex items-center gap-2">
                                        <pack.icon size={30} className="text-primary" />
                                        <CardTitle className="text-xl font-bold">{pack.name}</CardTitle>
                                    </div>
                                    <CardDescription className="text-gray-700">{pack.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="text-center h-[200px]">
                                    <div className="flex flex-col items-center">
                                        <div className="flex items-end gap-2">
                                            <p className="font-bold text-gray-400 line-through text-lg">₹{pack.price}/-</p>
                                            <p className="text-2xl font-bold text-gray-900">₹{pack.discountedPrice}/-</p>
                                        </div>
                                        <p className="text-lg font-bold text-gray-800">{pack.label}</p>
                                    </div>
                                    <div className="mt-4 space-y-2">
                                        {pack.features.map((feature, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <CircleCheckIcon size={20} className="text-green-500" />
                                                <p className="text-gray-700 text-sm font-medium">{feature}</p>
                                            </div>
                                        ))}
                                    </div>

                                </CardContent>
                                <CardFooter>
                                    <Button
                                        onClick={() => {
                                            mutation.mutate(pack.id)
                                        }}
                                        className="w-full mt-4 font-semibold transition-all duration-300 hover:scale-105">
                                        <CreditCardIcon scale={25} />
                                        Purchase credits
                                    </Button>
                                </CardFooter>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
};

export default CreditsPurchase;
