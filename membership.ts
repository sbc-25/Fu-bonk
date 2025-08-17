export interface MembershipTier {
  id: string
  name: string
  icon: string
  color: string
  bonkRequired: number
  benefits: string[]
  multiplier: number
}

export interface UserMembership {
  tier: MembershipTier
  joinedAt: Date
  bonkSpent: number
  name: string
  icon: string
  color: string
}

export class MembershipService {
  private static readonly STORAGE_KEY = "bonk_membership"

  static readonly TIERS: MembershipTier[] = [
    {
      id: "bronze",
      name: "Bronze Fan",
      icon: "🥉",
      color: "bg-amber-600",
      bonkRequired: 0,
      benefits: ["Basic rewards", "Community access"],
      multiplier: 1.0,
    },
    {
      id: "silver",
      name: "Silver Supporter",
      icon: "🥈",
      color: "bg-gray-400",
      bonkRequired: 5000,
      benefits: ["1.2x rewards", "Exclusive content", "Priority support"],
      multiplier: 1.2,
    },
    {
      id: "gold",
      name: "Gold Legend",
      icon: "🥇",
      color: "bg-yellow-500",
      bonkRequired: 15000,
      benefits: ["1.5x rewards", "VIP access", "Special NFTs"],
      multiplier: 1.5,
    },
    {
      id: "diamond",
      name: "Diamond Elite",
      icon: "💎",
      color: "bg-blue-500",
      bonkRequired: 50000,
      benefits: ["2x rewards", "Exclusive events", "Custom badges"],
      multiplier: 2.0,
    },
  ]

  static getUserMembership(): UserMembership | null {
    if (typeof window === "undefined") return null

    const stored = localStorage.getItem(this.STORAGE_KEY)
    if (!stored) {
      // Default to bronze tier
      const bronzeTier = this.TIERS[0]
      const membership: UserMembership = {
        tier: bronzeTier,
        joinedAt: new Date(),
        bonkSpent: 0,
        name: bronzeTier.name,
        icon: bronzeTier.icon,
        color: bronzeTier.color,
      }
      this.saveMembership(membership)
      return membership
    }

    const membership = JSON.parse(stored)
    return {
      ...membership,
      joinedAt: new Date(membership.joinedAt),
    }
  }

  static upgradeMembership(bonkSpent: number): UserMembership | null {
    const currentMembership = this.getUserMembership()
    if (!currentMembership) return null

    const newTotalSpent = currentMembership.bonkSpent + bonkSpent
    const newTier = this.getTierByBonkSpent(newTotalSpent)

    const updatedMembership: UserMembership = {
      ...currentMembership,
      tier: newTier,
      bonkSpent: newTotalSpent,
      name: newTier.name,
      icon: newTier.icon,
      color: newTier.color,
    }

    this.saveMembership(updatedMembership)
    return updatedMembership
  }

  private static getTierByBonkSpent(bonkSpent: number): MembershipTier {
    return (
      this.TIERS.slice()
        .reverse()
        .find((tier) => bonkSpent >= tier.bonkRequired) || this.TIERS[0]
    )
  }

  private static saveMembership(membership: UserMembership): void {
    if (typeof window === "undefined") return

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(membership))
  }
}
