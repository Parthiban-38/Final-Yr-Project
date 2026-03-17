const cropRules = [

  // 🌧 HIGH WATER CROPS
  { name: "Paddy (Rice)", condition: (t,m)=>m>75, data:{fertilizer:"Urea + DAP", irrigation:"Standing water", tips:"Best for flooded fields"} },
  { name: "Sugarcane", condition: (t,m)=>m>70 && t>20, data:{fertilizer:"High nitrogen", irrigation:"Frequent irrigation", tips:"Long duration crop"} },
  { name: "Banana", condition: (t,m)=>m>65 && t>25, data:{fertilizer:"NPK + organic", irrigation:"Drip irrigation", tips:"Warm climate"} },
  { name: "Jute", condition: (t,m)=>m>75 && t>25, data:{fertilizer:"Nitrogen fertilizer", irrigation:"High water", tips:"Humid climate"} },

  // 🌿 MEDIUM WATER CROPS
  { name: "Wheat", condition:(t,m)=>m>40 && m<=70 && t<25, data:{fertilizer:"Nitrogen rich", irrigation:"Moderate", tips:"Cool climate"} },
  { name: "Maize", condition:(t,m)=>m>40 && m<=70 && t>20, data:{fertilizer:"NPK", irrigation:"Tasseling stage", tips:"Needs sunlight"} },
  { name: "Barley", condition:(t,m)=>m>35 && t<25, data:{fertilizer:"Nitrogen", irrigation:"Low-moderate", tips:"Short duration"} },
  { name: "Soybean", condition:(t,m)=>m>45 && t>20, data:{fertilizer:"Rhizobium + NPK", irrigation:"Moderate", tips:"Good for rotation"} },
  { name: "Mustard", condition:(t,m)=>m>30 && t<25, data:{fertilizer:"Sulfur + NPK", irrigation:"Low", tips:"Winter crop"} },
  { name: "Sunflower", condition:(t,m)=>m>35 && t>20, data:{fertilizer:"Phosphorus rich", irrigation:"Moderate", tips:"Oilseed crop"} },
  { name: "Cotton", condition:(t,m)=>m>35 && t>25, data:{fertilizer:"Potassium rich", irrigation:"Moderate", tips:"Avoid waterlogging"} },
  { name: "Groundnut", condition:(t,m)=>m>30 && m<=55, data:{fertilizer:"Calcium + P", irrigation:"Light", tips:"Well-drained soil"} },

  // 🥦 VEGETABLES
  { name: "Tomato", condition:(t,m)=>t>=20 && t<=30, data:{fertilizer:"NPK", irrigation:"Drip", tips:"Use staking"} },
  { name: "Potato", condition:(t,m)=>t<25 && m>40, data:{fertilizer:"Potassium rich", irrigation:"Regular", tips:"Cool climate"} },
  { name: "Onion", condition:(t,m)=>m>40 && t>20, data:{fertilizer:"Nitrogen", irrigation:"Moderate", tips:"Dry after maturity"} },
  { name: "Brinjal", condition:(t,m)=>t>25, data:{fertilizer:"Organic + NPK", irrigation:"Moderate", tips:"Warm crop"} },
  { name: "Cabbage", condition:(t,m)=>t<25, data:{fertilizer:"Nitrogen rich", irrigation:"Regular", tips:"Cool climate"} },
  { name: "Cauliflower", condition:(t,m)=>t<25, data:{fertilizer:"Balanced NPK", irrigation:"Moderate", tips:"Winter crop"} },
  { name: "Carrot", condition:(t,m)=>t<25, data:{fertilizer:"Potassium", irrigation:"Light", tips:"Loose soil"} },
  { name: "Beans", condition:(t,m)=>m>40, data:{fertilizer:"Phosphorus", irrigation:"Moderate", tips:"Climbing support"} },
  { name: "Okra (Lady Finger)", condition:(t,m)=>t>25, data:{fertilizer:"Nitrogen", irrigation:"Moderate", tips:"Warm season"} },

  // 🌱 LOW WATER / DRY CROPS
  { name: "Ragi", condition:(t,m)=>m<=40 && t>25, data:{fertilizer:"Organic", irrigation:"Low", tips:"Drought resistant"} },
  { name: "Bajra (Kambu)", condition:(t,m)=>m<=35, data:{fertilizer:"Farmyard manure", irrigation:"Minimal", tips:"Dry land crop"} },
  { name: "Jowar", condition:(t,m)=>m<=40, data:{fertilizer:"Nitrogen", irrigation:"Low", tips:"Heat resistant"} },
  { name: "Toor Dal", condition:(t,m)=>m<=45, data:{fertilizer:"Phosphorus", irrigation:"Low", tips:"Pulse crop"} },
  { name: "Urad Dal", condition:(t,m)=>m<=45, data:{fertilizer:"Organic", irrigation:"Low", tips:"Short duration"} },
  { name: "Moong Dal", condition:(t,m)=>m<=45, data:{fertilizer:"Nitrogen fixing", irrigation:"Low", tips:"Fast growing"} },
  { name: "Chickpea (Gram)", condition:(t,m)=>t<25, data:{fertilizer:"Phosphorus", irrigation:"Low", tips:"Winter crop"} },

  // 🍎 FRUITS
  { name: "Mango", condition:(t,m)=>t>25 && m>40, data:{fertilizer:"Organic + NPK", irrigation:"Moderate", tips:"Seasonal fruit"} },
  { name: "Papaya", condition:(t,m)=>t>25 && m>50, data:{fertilizer:"NPK", irrigation:"Regular", tips:"Fast growth"} },
  { name: "Guava", condition:(t,m)=>t>20, data:{fertilizer:"Organic manure", irrigation:"Moderate", tips:"Hardy plant"} },

  // 🌴 PLANTATION
  { name: "Coconut", condition:(t,m)=>t>25 && m>60, data:{fertilizer:"Organic + NPK", irrigation:"Regular", tips:"Tropical"} },
  { name: "Tea", condition:(t,m)=>m>70, data:{fertilizer:"Nitrogen", irrigation:"High rainfall", tips:"Hill regions"} },
  { name: "Coffee", condition:(t,m)=>m>60, data:{fertilizer:"Compost", irrigation:"Moderate", tips:"Shade crop"} },
  { name: "Rubber", condition:(t,m)=>m>70 && t>25, data:{fertilizer:"Balanced NPK", irrigation:"High rainfall", tips:"Humid climate"} }
];