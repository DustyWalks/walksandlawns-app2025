import { storage } from "./storage";

async function seed() {
  console.log("Seeding database...");

  try {
    // Seed service types
    const serviceTypes = [
      {
        name: "Snow Removal",
        description: "Professional snow clearing for driveways and walkways",
        season: "winter",
        isBaseService: true,
      },
      {
        name: "Lawn Mowing",
        description: "Weekly professional lawn mowing and edging",
        season: "summer",
        isBaseService: true,
      },
      {
        name: "Spring Cleanup",
        description: "Complete yard cleanup and spring preparation",
        season: "spring",
        isBaseService: true,
      },
      {
        name: "Fall Cleanup",
        description: "Leaf removal and winter preparation",
        season: "fall",
        isBaseService: true,
      },
    ];

    for (const serviceType of serviceTypes) {
      await storage.createServiceType(serviceType);
      console.log(`Created service type: ${serviceType.name}`);
    }

    // Seed add-ons
    const addons = [
      {
        name: "Premium Snow Removal",
        description: "Priority service with salt and sand application",
        priceMonthly: "49.00",
        priceOneTime: null,
        isRecurring: true,
      },
      {
        name: "Lawn Aeration",
        description: "Seasonal core aeration for healthier grass",
        priceMonthly: null,
        priceOneTime: "89.00",
        isRecurring: false,
      },
      {
        name: "Fertilization Program",
        description: "4-step seasonal fertilization plan",
        priceMonthly: "39.00",
        priceOneTime: null,
        isRecurring: true,
      },
      {
        name: "Additional Lawn/Walk",
        description: "Add coverage for extra property areas",
        priceMonthly: "69.00",
        priceOneTime: null,
        isRecurring: true,
      },
    ];

    for (const addon of addons) {
      await storage.createAddOn(addon);
      console.log(`Created add-on: ${addon.name}`);
    }

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }

  process.exit(0);
}

seed();
