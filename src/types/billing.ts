import {
  BadgeSwissFrancIcon,
  BellElectric,
  LucideIcon,
  LucideTarget,
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
      "Access to basic workflows",
      "Email support",
      "Valid for 30 days",
    ],
    icon: BadgeSwissFrancIcon,
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
      "Priority email support",
      "Early access to new features",
      "Valid for 90 days",
    ],
    icon: BellElectric,
    bestValue: true,
  },
  {
    id: PackageId.LARGE,
    name: "Large Package",
    label: "10,000 Credits",
    description: "Best for teams & power users, unlimited possibilities!",
    credits: 10000,
    price: 1999,
    discountedPrice: 1749,
    features: [
      "Premium support (24/7)",
      "Exclusive workflow optimizations",
      "Valid for 180 days",
      "Custom integration support",
    ],
    icon: LucideTarget,
  },
];

export const getCreditsPackage = (id: PackageId): CreditsPackage | undefined =>
  CreditsPackage.find((pack) => pack.id === id);
