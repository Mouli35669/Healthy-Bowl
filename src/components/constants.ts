
import type { Plan, MenuItem } from '../types';

// --- CUSTOMIZABLE PLANS ---
// Add, remove, or edit plans in this array.
// To change an image, update the `imageUrl` property.

// --- CUSTOMIZABLE MENU ---
// Update the menu items for each day of the week here.
// constants.ts
// constants.ts

export const DAILY_MENU = [
  {
    day: "Monday",
    items: [
      { name: "Apple", description: "Crisp, juicy, and naturally sweet, perfect for a refreshing crunch." },
      { name: "Banana", description: "Creamy and naturally sweet, an instant energy-boosting treat." },
      { name: "Pomegranate", description: "Bursting with juicy, jewel-like arils, offering a tangy-sweet antioxidant punch." },
      { name: "Moong Sprouts", description: "Delightfully crisp and packed with nutrients, a vibrant addition to any meal." },
      { name: "Boiled Sweet Corn", description: "Sweet, tender, and incredibly satisfying, a burst of sunshine in every bite." },
    ]
  },
  {
    day: "Tuesday",
    items: [
      { name: "Papaya", description: "Velvety smooth and subtly sweet, a tropical delight known for digestive benefits." },
      { name: "Grapes", description: "Plump, juicy, and refreshing, these sweet spheres are a perfect healthy indulgence." },
      { name: "Orange", description: "Zesty and incredibly juicy, a burst of vitamin C that brightens your day." },
      { name: "Chana Sprouts", description: "Crunchy and protein-rich, these nutritious sprouts offer a delightful earthy flavor." },
      { name: "Boiled Egg", description: "A perfectly cooked, protein-packed essential, offering sustained energy and satisfaction." },
    ]
  },
  {
    day: "Wednesday",
    items: [
      { name: "Watermelon", description: "Supremely refreshing and incredibly juicy, the ultimate hydrator for a hot day." },
      { name: "Kiwi", description: "Tangy-sweet and vibrantly green, this fuzzy fruit is a delightful vitamin C powerhouse." },
      { name: "Pineapple", description: "Tropical and tantalizingly sweet with a juicy, tangy bite, an enzyme-rich treat." },
      { name: "Mixed Sprouts", description: "A vibrant medley of crisp, nutrient-dense sprouts, delivering diverse textures and health benefits." },
      { name: "Dates & Nuts", description: "A naturally sweet and wholesome combination, providing sustained energy and delightful crunch." },
    ]
  },
  {
    day: "Thursday",
    items: [
      { name: "Muskmelon", description: "Sweet, subtly fragrant, and wonderfully hydrating, a refreshing taste of summer." },
      { name: "Apple", description: "Crisp, juicy, and naturally sweet, perfect for a refreshing crunch." },
      { name: "Grapes", description: "Plump, juicy, and refreshing, these sweet spheres are a perfect healthy indulgence." },
      { name: "Moong Sprouts", description: "Delightfully crisp and packed with nutrients, a vibrant addition to any meal." },
      { name: "Boiled Peanuts", description: "Savory and tender, these warm peanuts offer a unique, comforting snack experience." },
    ]
  },
  {
    day: "Friday",
    items: [
      { name: "Pomegranate", description: "Bursting with juicy, jewel-like arils, offering a tangy-sweet antioxidant punch." },
      { name: "Papaya", description: "Velvety smooth and subtly sweet, a tropical delight known for digestive benefits." },
      { name: "Banana", description: "Creamy and naturally sweet, an instant energy-boosting treat." },
      { name: "Chana Sprouts", description: "Crunchy and protein-rich, these nutritious sprouts offer a delightful earthy flavor." },
      { name: "Boiled Sweet Corn", description: "Sweet, tender, and incredibly satisfying, a burst of sunshine in every bite." },
    ]
  },
  {
    day: "Saturday",
    items: [
      { name: "Mixed Fruit Salad", description: "A colorful, refreshing medley of seasonal fruits, bursting with natural sweetness and vitamins." },
      { name: "Mixed Sprouts", description: "A vibrant medley of crisp, nutrient-dense sprouts, delivering diverse textures and health benefits." },
      { name: "Boiled Egg", description: "A perfectly cooked, protein-packed essential, offering sustained energy and satisfaction." },
      { name: "Dates & Nuts", description: "A naturally sweet and wholesome combination, providing sustained energy and delightful crunch." },
    ]
  },
];


// --- CUSTOMIZABLE LOYALTY/REWARD VALUES ---
export const REWARD_POINTS = 1250;
export const REFERRAL_CODE = 'HEALTHY_BOWL_2024';