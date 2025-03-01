import {
  BadgeSwissFrancIcon,
  LucideIcon,
  RocketIcon,
  ZapIcon,
} from "lucide-react";

export enum PackageId {
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  LARGE = "LARGE",
}

export type CreditsPackage = {
  id: PackageId;
  name: string;
  label: string;
  credits: number;
  price: number;
  discountedPrice?: number;
  description: string;
  features: string[];
  icon: LucideIcon;
  bestValue?: boolean;
  priceId: string;
};

export const CreditsPackage: CreditsPackage[] = [
  {
    id: PackageId.SMALL,
    name: "Small Package",
    label: "1,000 Credits",
    description: "Run workflows up to 10 times with this starter package.",
    credits: 1000,
    price: 299,
    discountedPrice: 249,
    features: [
      "Valid for 30 days",
      "Basic support",
      "Standard processing speed",
      "Access to basic features",
    ],
    icon: BadgeSwissFrancIcon,
    priceId: process.env.STRIPE_SMALL_PACKAGE_ID!,
  },
  {
    id: PackageId.MEDIUM,
    name: "Medium Package",
    label: "5,000 Credits",
    description: "Boost your productivity with up to 50 workflows.",
    credits: 5000,
    price: 999,
    discountedPrice: 849,
    features: [
      "Valid for 60 days",
      "Priority support",
      "Faster processing speed",
      "Access to premium features",
      "Detailed analytics",
    ],
    icon: ZapIcon,
    bestValue: true,
    priceId: process.env.STRIPE_MEDIUM_PACKAGE_ID!,
  },
  {
    id: PackageId.LARGE,
    name: "Large Package",
    label: "10,000 Credits",
    description: "For power users",
    credits: 10000,
    price: 1999,
    discountedPrice: 1749,
    features: [
      "Valid for 90 days",
      "24/7 dedicated support",
      "Highest processing priority",
      "Access to all features",
      "Advanced analytics",
      "Custom integrations",
    ],
    icon: RocketIcon,
    priceId: process.env.STRIPE_LARGE_PACKAGE_ID!,
  },
];

export const getCreditsPackage = (id: PackageId): CreditsPackage | undefined =>
  CreditsPackage.find((pack) => pack.id === id);
