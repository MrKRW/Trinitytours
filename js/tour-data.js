const tourData = {
  beach: {
    title: "Sun-Kissed Shores Escape",
    category: "Beach",
    duration: "7 Nights & 8 Days",
    price: "$1,200",
    rating: "5.0",
    image: "images/beach.png",
    description: "Experience the ultimate tropical getaway along Sri Lanka's pristine coastline. This relaxing journey takes you to the island's most beautiful beaches, where golden sands meet the crystal-clear waters of the Indian Ocean.",
    highlights: ["Relax on Mirissa Beach", "Snorkeling in Unawatuna", "Whale watching expedition", "Sunset coastal cruise"],
    itinerary: [
      { day: "Day 1", title: "Arrival & Negombo", description: "Arrive at Bandaranaike International Airport. Transfer to a beachfront hotel in Negombo to relax after your flight." },
      { day: "Day 2-3", title: "Unawatuna Sands", description: "Travel down the southern coast to Unawatuna. Spend two days swimming in the turquoise bay, visiting the Japanese Peace Pagoda, and enjoying fresh seafood." },
      { day: "Day 4-5", title: "Mirissa & Whales", description: "Head to Mirissa. Wake up early for an unforgettable whale and dolphin watching safari. Spend the afternoons surfing or lounging on Secret Beach." },
      { day: "Day 6-7", title: "Bentota Watersports", description: "Journey to Bentota for thrilling watersports. Take a scenic boat safari on the Madu River and visit a local turtle hatchery." },
      { day: "Day 8", title: "Departure", description: "Transfer back to the airport for your onward journey, taking golden memories with you." }
    ]
  },
  culture: {
    title: "Ancient Kingdoms Heritage Tour",
    category: "Culture & Heritage",
    duration: "8 Nights & 9 Days",
    price: "$1,400",
    rating: "4.9",
    image: "images/sigiriya.png",
    description: "Step back in time and explore the majestic ruins, sacred temples, and royal cities of Sri Lanka's cultural triangle. Uncover the rich history of an island shaped by ancient civilizations.",
    highlights: ["Climb the iconic Sigiriya Rock Fortress", "Explore Polonnaruwa's ancient ruins", "Visit the Temple of the Sacred Tooth Relic", "Walk through historic Galle Fort"],
    itinerary: [
      { day: "Day 1", title: "Arrival & Colombo", description: "Arrive in Sri Lanka. Transfer to your hotel in Colombo and enjoy a brief city tour exploring colonial architecture." },
      { day: "Day 2", title: "Anuradhapura", description: "Travel to the first ancient capital, Anuradhapura. Marvel at the giant stupas and the sacred Sri Maha Bodhi tree." },
      { day: "Day 3", title: "Sigiriya & Dambulla", description: "Climb the magnificent Sigiriya Rock Fortress in the morning. Later, explore the intricate murals of the Dambulla Cave Temple." },
      { day: "Day 4", title: "Polonnaruwa", description: "Discover the well-preserved ruins of Polonnaruwa by bicycle, including the Royal Palace and the Gal Vihara." },
      { day: "Day 5-6", title: "Kandy", description: "Journey to Kandy. Visit the revered Temple of the Tooth and enjoy a traditional Kandyan cultural dance performance." },
      { day: "Day 7", title: "Galle Fort", description: "Travel south to explore the UNESCO World Heritage site of Galle Fort. Walk along the ramparts at sunset." },
      { day: "Day 8-9", title: "Leisure & Departure", description: "Enjoy a final morning in Galle before transferring to the airport for your departure." }
    ]
  },
  nature: {
    title: "Emerald Nature Trail",
    category: "Nature",
    duration: "9 Nights & 10 Days",
    price: "$1,550",
    rating: "5.0",
    image: "images/tea.png",
    description: "Immerse yourself in the lush, green heart of Sri Lanka. From rolling tea plantations to misty mountain peaks and cascading waterfalls, this tour is a paradise for nature lovers.",
    highlights: ["Train ride through the central highlands", "Trek through Horton Plains", "Visit working tea estates", "Discover hidden waterfalls"],
    itinerary: [
      { day: "Day 1", title: "Arrival to Kandy", description: "Arrive and transfer straight to Kandy. Enjoy the cool evening breeze by Kandy Lake." },
      { day: "Day 2", title: "Botanical Gardens", description: "Stroll through the stunning Royal Botanical Gardens of Peradeniya, home to thousands of exotic plant species." },
      { day: "Day 3-4", title: "Nuwara Eliya", description: "Take the incredibly scenic train journey to Nuwara Eliya. Visit a working tea factory and pluck your own tea leaves." },
      { day: "Day 5", title: "Horton Plains", description: "Early morning trek in Horton Plains National Park. See Baker's Falls and the sheer drop of World's End." },
      { day: "Day 6-7", title: "Ella", description: "Travel to the laid-back village of Ella. Hike up Little Adam's Peak and witness the engineering marvel of the Nine Arch Bridge." },
      { day: "Day 8-9", title: "Sinharaja Rainforest", description: "Head south to Sinharaja Forest Reserve, a biodiversity hotspot. Enjoy a guided nature walk to spot endemic birds and flora." },
      { day: "Day 10", title: "Departure", description: "Transfer to the airport for your flight home, refreshed by nature." }
    ]
  },
  wildlife: {
    title: "Untamed Wildlife Safari",
    category: "Wildlife",
    duration: "8 Nights & 9 Days",
    price: "$1,650",
    rating: "4.8",
    image: "images/wildlife.png",
    description: "Embark on an exhilarating safari adventure across Sri Lanka's premier national parks. Track leopards, observe massive elephant herds, and witness incredible biodiversity in its natural habitat.",
    highlights: ["Leopard tracking in Yala", "The great Elephant Gathering in Minneriya", "Bird watching in Bundala", "Exclusive jeep safaris"],
    itinerary: [
      { day: "Day 1", title: "Arrival", description: "Arrive at the airport and transfer to a comfortable lodge near your first national park." },
      { day: "Day 2", title: "Wilpattu National Park", description: "Enjoy a full-day jeep safari in Wilpattu, known for its dense forests and natural lakes, looking for elusive leopards and sloth bears." },
      { day: "Day 3-4", title: "Minneriya", description: "Travel to Minneriya. Witness 'The Gathering'—the largest seasonal meeting of Asian elephants in the world." },
      { day: "Day 5-6", title: "Yala National Park", description: "Head south to Yala. Take multiple game drives in Sri Lanka's most famous park, boasting one of the highest leopard densities in the world." },
      { day: "Day 7", title: "Bundala National Park", description: "Visit the wetlands of Bundala, a haven for migratory birds and massive crocodiles." },
      { day: "Day 8", title: "Coastal Relaxation", description: "Wind down from the thrilling safaris with a relaxing day at a nearby southern beach." },
      { day: "Day 9", title: "Departure", description: "Transfer to the airport for departure." }
    ]
  },
  adventure: {
    title: "Thrill-Seeker's Retreat",
    category: "Adventure",
    duration: "8 Nights & 9 Days",
    price: "$1,450",
    rating: "4.9",
    image: "images/nine_arch.png",
    description: "Get your adrenaline pumping on this action-packed tour. White water rafting, mountain hiking, and exploring deep caves—this itinerary is designed for the bold and adventurous.",
    highlights: ["White water rafting in Kitulgala", "Night climb of Adam's Peak", "Surfing in the southern coast", "Mountain biking through tea trails"],
    itinerary: [
      { day: "Day 1", title: "Arrival & Kitulgala", description: "Arrive and transfer immediately to Kitulgala, the adventure capital of Sri Lanka." },
      { day: "Day 2", title: "White Water Rafting", description: "Experience thrilling Grade III rapids on the Kelani River, followed by a jungle trek to hidden rock pools." },
      { day: "Day 3-4", title: "Adam's Peak", description: "Travel to Dalhousie. Begin your night ascent of Adam's Peak to reach the summit just in time for a breathtaking sunrise." },
      { day: "Day 5", title: "Ella Rock Hike", description: "Rest and recover as you travel to Ella. In the late afternoon, tackle the challenging but rewarding hike up Ella Rock." },
      { day: "Day 6", title: "Waterfall Abseiling", description: "Push your limits with a supervised waterfall abseiling experience near Ravana Falls." },
      { day: "Day 7-8", title: "Surfing in Weligama", description: "Head to the coast for two days of surfing. Whether you're a beginner or a pro, the waves at Weligama are perfect." },
      { day: "Day 9", title: "Departure", description: "Transfer to the airport, taking an adrenaline-filled sense of accomplishment with you." }
    ]
  }
};
