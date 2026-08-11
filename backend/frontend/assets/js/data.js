/* ============================================================
   HIIL CAFE — Demo Data Layer
   This simulates the backend using localStorage so the whole
   system (menu, cart, orders, kitchen, reservations, admin) is
   fully interactive in the browser with zero setup.
   In production this is replaced by real API calls to the
   Express + MySQL backend in /backend — see README.md.
   ============================================================ */

const HIIL = (() => {
  const KEY = 'hiil_cafe_db_v2';

  function todayPlus(days){
    const d = new Date(); d.setDate(d.getDate()+days);
    return d.toISOString().slice(0,10);
  }

  const defaultSiteContent = {
    heroEyebrow: "Hargeisa's Table for Every Occasion",
    heroTitle: "Welcome to ",
    heroSubtitle: "A clear, modern dining experience for coffee, lunch, dinner, and private gatherings. Our team makes every visit feel simple, warm, and memorable.",
    heroPrimaryCta: "Explore Menu",
    heroSecondaryCta: "Reserve VIP Table",
    stats: [
      { value: '12+', label: 'Years Serving' },
      { value: '4.9', label: 'Guest Rating' },
      { value: '60+', label: 'Signature Dishes' },
      { value: '6', label: 'Private Rooms' }
    ],
    missionTitle: "Our mission",
    missionText: "To make every visit feel welcoming, simple, and memorable — from a quick coffee to a private celebration.",
    contactTitle: "Visit Us",
    contact: {
      location: 'Haleelo Tawer, Hargeisa, Somaliland',
      hours: '06:00 – 00:00 Daily',
      phone: '+252 633 338801',
      whatsapp: '+252 63 888 3301',
      email: 'hiilcafe@gmail.com'
    },
    footerDescription: 'Modern dining, timeless hospitality. Haleelo Tawer, Hargeisa.'
  };

  const seed = () => ({
    siteContent: defaultSiteContent,
    menu: [
      { id:'m1', name:'American Breakfast', cat:'Breakfast', price:7.5, img:'https://d2vsf1hynzxim7.cloudfront.net/production/media/24723/conversions/American-Breakfast-default.webp', desc:'Classic breakfast plate with hearty sides and warm bread.', popular:true, isNew:false, discount:0, available:true, rating:4.8 },
      { id:'m2', name:'Cheesy French Toast', cat:'Breakfast', price:6.0, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmkd53LeOlpcTwVfcF_qSfK648r7qcPnI6AYXSDe23qNLQtgWD9MaXk0iP&s=10', desc:'Golden French toast topped with a creamy cheesy finish.', popular:true, isNew:false, discount:0, available:true, rating:4.7 },
      { id:'m3', name:'Chicken Caesar Croissant', cat:'Breakfast', price:6.0, img:'https://www.restaurantnews.com/wp-content/uploads/2026/05/la-Madeleine-Chicken-Caesar-Salade-Stuffed-Croissant-feature.jpg', desc:'Flaky croissant filled with chicken Caesar goodness.', popular:false, isNew:false, discount:0, available:true, rating:4.6 },
      { id:'m4', name:'Cooked Eggs', cat:'Breakfast', price:6.0, img:'https://www.simplyquinoa.com/wp-content/uploads/2021/05/how-to-make-soft-boiled-eggs-4.jpg', desc:'Perfectly cooked eggs served fresh and simple.', popular:false, isNew:false, discount:0, available:true, rating:4.5 },
      { id:'m5', name:'Cooked Green Peas', cat:'Breakfast', price:4.0, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMkp2l0drUVSHAw3yFdISU95RwSBPisOsIevjMjPiZEmam-jDJ_BhzYyIs&s=10', desc:'Tender green peas served as a fresh side.', popular:false, isNew:false, discount:0, available:true, rating:4.4 },
      { id:'m6', name:'Egg and Cheese Wrap', cat:'Breakfast', price:5.0, img:'https://www.couponclippingcook.com/wp-content/uploads/2021/01/4-Kale-Feta-and-Egg-Wrap.jpg', desc:'Soft wrap filled with scrambled egg and melted cheese.', popular:true, isNew:false, discount:0, available:true, rating:4.6 },
      { id:'m7', name:'Egg and Cheese Croissant Sandwich', cat:'Breakfast', price:6.0, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdRKvL7AdPV_1z7y3JMQFRhG8Ty4zy5qDrSAC82W_CXPBGwqJ5UgIqj94&s=10', desc:'Buttery croissant layered with eggs and cheese.', popular:true, isNew:false, discount:0, available:true, rating:4.7 },
      { id:'m8', name:'French Toast', cat:'Breakfast', price:6.0, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_9yqt-OBK9Og8Y0FBCg87pfFGIk1MFBpLM8N_GVDFuA&s=10', desc:'Classic brunch favorite served warm and fluffy.', popular:false, isNew:false, discount:0, available:true, rating:4.6 },
      { id:'m9', name:'Pancakes', cat:'Breakfast', price:4.0, img:'https://www.allrecipes.com/thmb/TvmI_Fszqlu7ITqqhtj8l_JWqZo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/21014-Good-old-Fashioned-Pancakes-primary-4x3-c991bb30cf5a4078b61e3808b7ebcda8.jpg', desc:'Soft golden pancakes with a comforting finish.', popular:true, isNew:false, discount:0, available:true, rating:4.7 },
      { id:'m10', name:'Shakshouka', cat:'Breakfast', price:5.0, img:'https://fivi.gg/cdn/shop/articles/shakshuka_1200x.jpg?v=1751294547', desc:'Poached eggs in a rich spiced tomato sauce.', popular:true, isNew:false, discount:0, available:true, rating:4.8 },
      { id:'m11', name:'Waffles', cat:'Breakfast', price:4.0, img:'https://images.getrecipekit.com/20240227013017-shutterstock_180241331-min.jpg?aspect_ratio=1:1&quality=90&', desc:'Crisp waffles made for a sweet breakfast treat.', popular:false, isNew:false, discount:0, available:true, rating:4.6 },
      { id:'m12', name:'Brownie Cakes', cat:'Cakes', price:2.5, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsHTSGGBvtwHpA9R_MWeCJLjPLGn6Bm5e0etObZpL1DWMlZPKcj1o04YAo&s=10', desc:'Fudgy brownie cake with rich chocolate flavor.', popular:false, isNew:false, discount:0, available:true, rating:4.5 },
      { id:'m13', name:'Cookies', cat:'Cakes', price:0.3, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5cUHir1JfewN130MVBq6zQn9E4G-90cUSF9WLNgVGkiUK0G2A9mQZ0HzI&s=10', desc:'Simple baked cookies for a quick sweet bite.', popular:false, isNew:false, discount:0, available:true, rating:4.4 },
      { id:'m14', name:'Lotus Cheesecake', cat:'Cakes', price:3.0, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW3f7U06SmyMrLgxqIbkgzPKJSPMlwUkeMf1tDFBPPnLFj_bJjOVSGyEU&s=10', desc:'Creamy cheesecake with a rich lotus flavor.', popular:false, isNew:false, discount:0, available:true, rating:4.7 },
      { id:'m15', name:'Oreo Cheesecake', cat:'Cakes', price:2.5, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp1NNULXWKBM14c2npDX6mUKbYkeE1YzTGGDPEw-634g&s=10', desc:'Silky cheesecake layered with Oreo crunch.', popular:false, isNew:false, discount:0, available:true, rating:4.6 },
      { id:'m16', name:'Red Velvet Cake', cat:'Cakes', price:3.0, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT79UowGp2ZkfmLZ3tQuYYXTTKk7BfSeWTtm5oUS-klO9cMhXtyugKXH-M&s=10', desc:'Soft red velvet cake with a smooth finish.', popular:false, isNew:false, discount:0, available:true, rating:4.7 },
      { id:'m17', name:'Tiramisu Cake', cat:'Cakes', price:3.0, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCUEyj_ddaqwVtDtOvL8HcqjE-ihpZ9DDWi94wYTfEDOEyGutrXdVhb_4&s=10', desc:'Coffee-kissed sponge with creamy mascarpone layers.', popular:false, isNew:false, discount:0, available:true, rating:4.8 },
      { id:'m18', name:'Turkish Cake', cat:'Cakes', price:3.0, img:'https://www.thewickednoodle.com/wp-content/uploads/2021/08/turkish-cake-5.jpg', desc:'Soft and fragrant cake with classic Turkish flavor.', popular:false, isNew:false, discount:0, available:true, rating:4.5 },
      { id:'m19', name:'Black Forest Cake', cat:'Cakes', price:3.0, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT01CeDKJ3EqcMHun6gJUOorRBZKTYO0OKUpy3SN0LqlYfx4VJ-dkdUpNI&s=10', desc:'Chocolate sponge layered with cream and cherries.', popular:false, isNew:false, discount:0, available:true, rating:4.7 },
      { id:'m20', name:'Chocolate Éclair', cat:'Cakes', price:3.0, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO-POcT6qDzxO9PFJcnYqSoJUQhHEeX8fuFfMqoOEdYiEIHJtykUmuFESn&s=10', desc:'Buttery pastry filled with rich chocolate cream.', popular:false, isNew:false, discount:0, available:true, rating:4.6 },
      { id:'m21', name:'Sizzling Brownie Cake', cat:'Cakes', price:3.0, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqJXJvnPqnvWPD3ACzVVLlyVfUFWRArx8Oc8yVs8Xh6oCboNfQylte-ngF&s=10', desc:'Warm brownie cake served with a sizzling finish.', popular:false, isNew:false, discount:0, available:true, rating:4.7 },
      { id:'m22', name:'Classic Hot Chocolate', cat:'Chocolate', price:2.0, img:'https://www.dysphagiacare.ca/sites/g/files/lpfasj961/files/2024-01/CLASSIC-HOT-CHOCOLATE-073.png', desc:'Rich hot chocolate made for cozy moments.', popular:false, isNew:false, discount:0, available:true, rating:4.6 },
      { id:'m23', name:'Cold Hot Chocolate', cat:'Chocolate', price:3.0, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPsX4s60ctc48ATlV-jpg_VgPcA51kCagLYq5spj9kqCBcpQdtqhjchNoj&s=10', desc:'Chilled chocolate drink with a smooth finish.', popular:false, isNew:false, discount:0, available:true, rating:4.5 },
      { id:'m24', name:'Mineral Water', cat:'Cold Drinks', price:0.8, img:'https://plantbasedwithamy.com/wp-content/uploads/2020/06/pexels-pixabay-416528-1024x731.jpg.webp', desc:'Refreshing bottled mineral water.', popular:false, isNew:false, discount:0, available:true, rating:4.4 },
      { id:'m25', name:'Strawberry Juice', cat:'Cold Drinks', price:3.0, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdewcQdApIeY2ZAdhCcoSdnflYrcUtqrXwXThFJocg_NLquFnYZJfIRJY&s=10', desc:'Sweet strawberry juice served chilled.', popular:false, isNew:false, discount:0, available:true, rating:4.6 },
      { id:'m26', name:'Almond Croissant', cat:'Croissants', price:1.5, img:'https://oliphantandpomeroy.co.uk/wp-content/uploads/2024/04/Almond-Croissant-flat-lay.webp', desc:'Flaky croissant with toasted almond flavor.', popular:false, isNew:false, discount:0, available:true, rating:4.6 },
      { id:'m27', name:'Chocolate Croissant', cat:'Croissants', price:1.5, img:'https://dinnerthendessert.com/wp-content/uploads/2025/07/Pain-au-Chocolat-Chocolate-Croissants-29-320x320.jpg', desc:'Buttery croissant filled with chocolate.', popular:false, isNew:false, discount:0, available:true, rating:4.7 },
      { id:'m28', name:'Plain Croissant', cat:'Croissants', price:1.0, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwKNVaUpD15pi9NAYh8TGMWcFqV0saZB2DizbEuJm3uUvyeGFKue0OAyA&s=10', desc:'Classic butter croissant baked to perfection.', popular:false, isNew:false, discount:0, available:true, rating:4.5 },
      { id:'m29', name:'Turkish Coffee', cat:'Coffee', price:1.0, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8z1ydsd5M8DG-Y5Rr1XamxakEaS8iFIHIofkJqvfbVi9gustdGRK_Ql4&s=10', desc:'Strong and aromatic traditional Turkish coffee.', popular:false, isNew:false, discount:0, available:true, rating:4.6 },
      { id:'m30', name:'Fruit Tart', cat:'Dessert', price:3.5, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_ooMmq1l2et7hKgkvC3NHQWgJXfptHDbhESWpaVfHwnxYktPWIEpvvWk&s=10', desc:'Buttery pastry filled with fresh fruit.', popular:false, isNew:false, discount:0, available:true, rating:4.7 },
      { id:'m31', name:'Fruit Salad', cat:'Dessert', price:3.0, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs8NAnqvkD4knL6B26aFln4mad5Lz53e8NLMsSXJwrUA&s=10', desc:'Fresh fruit platter with vibrant seasonal pieces.', popular:false, isNew:false, discount:0, available:true, rating:4.6 },
      { id:'m32', name:'Espresso', cat:'Dessert', price:2.0, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_Dvh2_NcyZOR_qeyi-pIgqypz871t3brdHEpAYpGnOky27nKhHnlYmgma&s=10', desc:'Small, bold espresso shot for a quick pick-me-up.', popular:false, isNew:false, discount:0, available:true, rating:4.5 },
      { id:'m33', name:'Cortado', cat:'Dessert', price:2.0, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZUu0YIQqjc4AO6Moh7jhyrIV0HUIvbCOugPP7NMHbVXF6GQ1bUkRuvOs&s=10', desc:'Balanced espresso with a splash of milk.', popular:false, isNew:false, discount:0, available:true, rating:4.5 },
      { id:'m34', name:'Macchiato', cat:'Dessert', price:2.0, img:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Macchiato_%287199366530%29.jpg/1280px-Macchiato_%287199366530%29.jpg', desc:'Espresso marked with a touch of foam.', popular:false, isNew:false, discount:0, available:true, rating:4.5 },
      { id:'m35', name:'Caramel Latte', cat:'Flavored Lattes', price:2.7, img:'https://www.scrumptiously.com/wp-content/uploads/2024/08/IcedCaramelLatte.webp', desc:'Smooth latte finished with caramel sweetness.', popular:false, isNew:false, discount:0, available:true, rating:4.7 },
      { id:'m36', name:'Coconut Latte', cat:'Flavored Lattes', price:2.7, img:'https://cdn.shopify.com/s/files/1/0606/6864/1369/files/Iced_Coconut_Dream_Latte_480x480.jpg?v=1725652629', desc:'Creamy latte with a rich coconut note.', popular:false, isNew:false, discount:0, available:true, rating:4.6 },
      { id:'m37', name:'Mocha Latte', cat:'Flavored Lattes', price:2.7, img:'https://sweetlycakes.com/wp-content/uploads/2023/06/icedmochalatte-6.jpg', desc:'Chocolatey latte with a silky finish.', popular:false, isNew:false, discount:0, available:true, rating:4.7 },
      { id:'m38', name:'Vanilla Latte', cat:'Flavored Lattes', price:2.7, img:'https://heartbeetkitchen.com/foodblog/wp-content/uploads/2025/03/iced-vanilla-latte-2.jpg', desc:'Soft vanilla latte with balanced espresso.', popular:false, isNew:false, discount:0, available:true, rating:4.7 },
      { id:'m39', name:'White Chocolate Mocha', cat:'Flavored Lattes', price:3.0, img:'https://www.healthylifetrainer.com/wp-content/uploads/2024/01/Iced-White-Chocolate-Mocha-00.jpg', desc:'Sweet white chocolate mocha with cozy flavor.', popular:false, isNew:false, discount:0, available:true, rating:4.8 },
      { id:'m40', name:'Iced Spanish Latte', cat:'Flavored Lattes', price:2.5, img:'https://cozycornercharm.com/wp-content/uploads/2026/05/iced-spanish-latte-3.jpg', desc:'Chilled latte with a smooth Spanish-style profile.', popular:false, isNew:false, discount:0, available:true, rating:4.6 },
      { id:'m41', name:'Blueberry and Cream Frappe', cat:'Frappes', price:3.5, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE6VnXLeJsN7Xbxywh7yRGbqFIGSq1fX8xhMCDaJX5cweyJgONIpX1TTcu&s=10', desc:'Creamy frappe with blueberry sweetness.', popular:false, isNew:false, discount:0, available:true, rating:4.6 },
      { id:'m42', name:'Chocolate Frappe', cat:'Frappes', price:3.5, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv1pY5Q-FAw0arjROvEQFlTXGzuM3mmX8_39_vuY8tNSZINb-LWLUR-i4&s=10', desc:'Smooth chocolate frappe with a rich texture.', popular:false, isNew:false, discount:0, available:true, rating:4.7 },
      { id:'m43', name:'Coffee Frappe', cat:'Frappes', price:3.5, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi4WsIJIR-WFpJO1jhtpRY_PP9ToT2crkY1AjXYFI0KbXbggkYHxZyrQY&s=10', desc:'Iced coffee frappe with bold flavor.', popular:false, isNew:false, discount:0, available:true, rating:4.7 },
      { id:'m44', name:'Lotus Biscoff Frappe', cat:'Frappes', price:3.5, img:'https://homegrownhappiness.com/wp-content/uploads/2023/06/biscoff-milkshake-.jpg', desc:'Creamy frappe with sweet lotus spice.', popular:false, isNew:false, discount:0, available:true, rating:4.7 },
      { id:'m45', name:'Mocha Frappe', cat:'Frappes', price:3.5, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHEb9jMwH5yK-JnSBpvsx0-QWLV8vSvhErzA1G5anWq7u4xuOY8VYH8NHm&s=10', desc:'Chocolate and coffee blended into a frappe.', popular:false, isNew:false, discount:0, available:true, rating:4.7 },
      { id:'m46', name:'Oreo Frappe', cat:'Frappes', price:3.5, img:'https://www.mcdonalds.at/wp-content/uploads/2021/09/web-neu-1500x1500-mccafe-oreo-frappe-regular-1.png', desc:'Crunchy Oreo frappe served cold.', popular:false, isNew:false, discount:0, available:true, rating:4.6 },
      { id:'m47', name:'Strawberry Cream Frappe', cat:'Frappes', price:3.5, img:'https://ibevconcepts.com/cdn/shop/articles/iStock-1209099477-modified-2635b875-c879-4945-bfcf-4046b5675f0b-741800_7af08caf-04c7-48a4-a1f6-1500e0a39cd2-9150853.jpg?v=1783547858', desc:'Sweet strawberry frappe with cream.', popular:false, isNew:false, discount:0, available:true, rating:4.7 },
      { id:'m48', name:'Vanilla Frappe', cat:'Frappes', price:3.5, img:'https://www.1883.com/app/uploads/2022/02/vanilla-frappe_recipe.jpg', desc:'Classic vanilla frappe with a smooth finish.', popular:false, isNew:false, discount:0, available:true, rating:4.6 },
      { id:'m49', name:'Apple Juice', cat:'Fresh Juices', price:3.5, img:'https://www.alphafoodie.com/wp-content/uploads/2021/11/Apple-Juice-Square.jpeg', desc:'Fresh apple juice with bright flavor.', popular:false, isNew:false, discount:0, available:true, rating:4.5 },
      { id:'m50', name:'Breakfast Juice', cat:'Fresh Juices', price:2.0, img:'https://elisetriestocook.com/wp-content/uploads/2023/10/freshly-squeezed-orange-juice-featured-image.jpg', desc:'Morning blend of fresh citrus and juice.', popular:false, isNew:false, discount:0, available:true, rating:4.5 },
      { id:'m51', name:'Mango Sunrise', cat:'Fresh Juices', price:2.5, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjONWnrzhIzgGJmwkSib6rdmek2HyLiTl1QwlyrT1gnUL2iGMl9Bi0O-A&s=10', desc:'Bright mango juice with a tropical finish.', popular:false, isNew:false, discount:0, available:true, rating:4.6 },
      { id:'m52', name:'Mixed Juice', cat:'Fresh Juices', price:3.0, img:'https://gonaji.com/wp-content/uploads/2025/03/Juices.webp', desc:'Refreshing mix of seasonal juices.', popular:false, isNew:false, discount:0, available:true, rating:4.5 },
      { id:'m53', name:'Papaya Juice', cat:'Fresh Juices', price:2.0, img:'https://arbecatering.com/wp-content/uploads/2024/09/Papaya-image.jpg', desc:'Sweet papaya juice served cold.', popular:false, isNew:false, discount:0, available:true, rating:4.5 },
      { id:'m54', name:'Pineapple Splash Juice', cat:'Fresh Juices', price:2.0, img:'https://img.magnific.com/premium-vector/pineapple-juice-glass_98292-5111.jpg?semt=ais_hybrid&w=740&q=80', desc:'Fresh pineapple juice with a lively taste.', popular:false, isNew:false, discount:0, available:true, rating:4.6 },
      { id:'m55', name:'Watermelon Cooler', cat:'Fresh Juices', price:2.0, img:'https://plantbasedonabudget.com/wp-content/uploads/2021/08/Watermelon-Cooler-Plant-Based-on-a-Budget-5.jpg', desc:'Cool watermelon juice for a refreshing sip.', popular:false, isNew:false, discount:0, available:true, rating:4.6 },
      { id:'m56', name:'Green Tea', cat:'Herbal Tea', price:1.0, img:'https://hips.hearstapps.com/hmg-prod/images/green-tea-superfoods-royalty-free-image-1772220722.pjpeg?crop=0.668xw:1.00xh;0.167xw,0&resize=1200:*', desc:'Light green tea with fresh aroma.', popular:false, isNew:false, discount:0, available:true, rating:4.4 },
      { id:'m57', name:'Hibiscus Tea', cat:'Herbal Tea', price:1.0, img:'https://veganlovlie.com/wp-content/uploads/lemongrass-hibiscus-tea-02.jpg', desc:'Bright hibiscus tea served warm.', popular:false, isNew:false, discount:0, available:true, rating:4.5 },
      { id:'m58', name:'Mint Tea', cat:'Herbal Tea', price:1.0, img:'https://minimalistbaker.com/wp-content/uploads/2023/02/Mint-Tea-SQUARE.jpg', desc:'Refreshing mint tea made for relaxation.', popular:false, isNew:false, discount:0, available:true, rating:4.5 },
      { id:'m59', name:'One Scoop Ice Cream', cat:'Ice Creams', price:1.0, img:'https://images.unsplash.com/photo-1570197788417-0e82375c9371?q=80&w=800', desc:'A single scoop of creamy ice cream.', popular:false, isNew:false, discount:0, available:true, rating:4.4 },
      { id:'m60', name:'Iced Americano', cat:'Iced Coffee', price:2.7, img:'https://mocktail.net/wp-content/uploads/2022/03/homemade-Iced-Americano-recipe_1ig.jpg', desc:'Chilled Americano with a bold espresso kick.', popular:false, isNew:false, discount:0, available:true, rating:4.6 },
      { id:'m61', name:'Iced Latte', cat:'Iced Coffee', price:2.7, img:'https://www.brighteyedbaker.com/wp-content/uploads/2024/03/Spanish-Iced-Latte.jpg', desc:'Cool latte with mellow espresso flavor.', popular:false, isNew:false, discount:0, available:true, rating:4.7 },
      { id:'m62', name:'Iced Caramel Latte', cat:'Iced Coffee', price:2.7, img:'https://www.forkinthekitchen.com/wp-content/uploads/2022/09/220629.iced_.latte_.caramel-9182.jpg', desc:'Iced latte with caramel sweetness.', popular:false, isNew:false, discount:0, available:true, rating:4.7 },
      { id:'m63', name:'Iced Caramel Macchiato', cat:'Iced Coffee', price:2.5, img:'https://lifestyleofafoodie.com/wp-content/uploads/2022/07/Starbucks-caramel-macchiato-latte-9-of-14.jpg', desc:'Smooth caramel macchiato served over ice.', popular:false, isNew:false, discount:0, available:true, rating:4.7 },
      { id:'m64', name:'Iced Coconut Latte', cat:'Iced Coffee', price:2.75, img:'https://images.ctfassets.net/v601h1fyjgba/4YyXiuOIo8upLQAEJeNtcE/f3fe3824ec63949c67b425b326439bbe/15697_Keurig_CafeCreations_Honey_Coconut_Latte_Iced_COMP_Hi.jpg', desc:'Creamy coconut latte served ice-cold.', popular:false, isNew:false, discount:0, available:true, rating:4.7 },
      { id:'m65', name:'Iced French Vanilla Latte', cat:'Iced Coffee', price:2.5, img:'https://www.forkinthekitchen.com/wp-content/uploads/2022/08/220629.iced_.latte_.vanilla-9009.jpg', desc:'Refreshing vanilla latte with iced espresso.', popular:false, isNew:false, discount:0, available:true, rating:4.6 },
      { id:'m66', name:'Black Tea', cat:'International', price:1.0, img:'https://www.sharmispassions.com/wp-content/uploads/2021/05/black-tea-recipe2.jpg', desc:'Classic black tea served hot or iced.', popular:false, isNew:false, discount:0, available:true, rating:4.4 },
      { id:'m67', name:'Breakfast Tea', cat:'International', price:0.01, img:'https://images.unsplash.com/photo-1497636577773-f1231844b336?q=80&w=800', desc:'Gentle tea ideal for the morning.', popular:false, isNew:false, discount:0, available:true, rating:4.3 },
      { id:'m68', name:'Camel Tea', cat:'International', price:1.8, img:'https://preview.redd.it/im-drinking-camel-milk-tea-in-africa-now-while-on-vacation-v0-a6vz5foywrh61.jpg?width=1080&crop=smart&auto=webp&s=db4af09b49a9356edf5f544c8879e57464e53275', desc:'Traditional tea with distinctive local flavor.', popular:false, isNew:false, discount:0, available:true, rating:4.5 },
      { id:'m69', name:'Chai Tea', cat:'International', price:2.5, img:'https://www.chilitochoc.com/wp-content/uploads/2024/11/authentic-masala-chai.jpg', desc:'Spiced tea with a bold aromatic blend.', popular:false, isNew:false, discount:0, available:true, rating:4.7 },
      { id:'m70', name:'Dako Jabie', cat:'International', price:1.2, img:'https://p16-common-sign.tiktokcdn-us.com/tos-useast8-p-0068-tx2/oEDI2aMRWATl0DSfAjCWAEgIftfIQqA8ASgb7Q~tplv-tiktokx-origin.image?dr=9636&x-expires=1784498400&x-signature=VO2awqUVtqBSCg%2BMdIvz7du3A6k%3D&t=4d5b0474&ps=13740610&shp=81f88b70&shcp=55bbe6a9&idc=useast8', desc:'A unique local tea blend served fresh.', popular:false, isNew:false, discount:0, available:true, rating:4.4 },
      { id:'m71', name:'Ginger Lemon Tea', cat:'International', price:1.0, img:'https://cdn.loveandlemons.com/wp-content/uploads/2025/02/ginger-tea.jpg', desc:'Warm tea balancing ginger and lemon.', popular:false, isNew:false, discount:0, available:true, rating:4.5 },
      { id:'m72', name:'Green Mint Tea', cat:'International', price:2.0, img:'https://www.kitchentreaty.com/wp-content/uploads/2024/09/fresh-mint-tea-5.jpg', desc:'Fresh mint and green tea in one cup.', popular:false, isNew:false, discount:0, available:true, rating:4.6 },
      { id:'m73', name:'Karak Tea', cat:'International', price:1.0, img:'https://foodess.com/wp-content/uploads/2024/02/Karak-Chai-4.jpg', desc:'Rich and comforting karak tea.', popular:false, isNew:false, discount:0, available:true, rating:4.6 },
      { id:'m74', name:'Lemon Tea', cat:'International', price:1.0, img:'https://www.sharmispassions.com/wp-content/uploads/2011/04/LemonTea1.jpg', desc:'Bright lemon tea for a calm moment.', popular:false, isNew:false, discount:0, available:true, rating:4.4 },
      { id:'m75', name:'Spanish Tea', cat:'International', price:1.0, img:'https://whstheshield.com/wp-content/uploads/2021/09/yz3vqbodojti3kfbyqex-1024x683.jpg', desc:'Classic tea with Spanish-style charm.', popular:false, isNew:false, discount:0, available:true, rating:4.4 },
      { id:'m76', name:'Chicken Nuggets', cat:'Kids Menu', price:6.0, img:'https://www.allrecipes.com/thmb/Dw_WFOvCds43ksPxkrE60qxcwSk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-8849-HomemadeChickenNuggets-beauty-4x3-ca915ee936054272af1b506181923c7f.jpg', desc:'Crispy chicken nuggets made for younger guests.', popular:false, isNew:false, discount:0, available:true, rating:4.6 },
      { id:'m77', name:'Blueberry Lemonade', cat:'Lemonade', price:2.7, img:'https://damndelicious.net/wp-content/uploads/2014/05/IMG_8952edit.jpg', desc:'Sweet lemonade with a blueberry twist.', popular:false, isNew:false, discount:0, available:true, rating:4.5 },
      { id:'m78', name:'Classic Lemonade', cat:'Lemonade', price:2.7, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGOajisfELWjLRN1zp5igM4DpHWmlEsfkrrxf1fHtrgbCRiGcuyr0BVHA&s=10', desc:'Refreshing lemonade with bright citrus flavor.', popular:false, isNew:false, discount:0, available:true, rating:4.5 },
      { id:'m79', name:'Passion Fruit Lemonade', cat:'Lemonade', price:2.7, img:'https://www.loveandoliveoil.com/wp-content/uploads/2014/11/passion-fruit-meyer-lemonadePLAIN.jpg', desc:'Tart lemonade with passion fruit flair.', popular:false, isNew:false, discount:0, available:true, rating:4.6 },
      { id:'m80', name:'Strawberry Lemonade', cat:'Lemonade', price:2.7, img:'https://damndelicious.net/wp-content/uploads/2014/04/IMG_5889edit.jpg', desc:'Sweet strawberry lemonade served fresh.', popular:false, isNew:false, discount:0, available:true, rating:4.6 },
      { id:'m81', name:'Cambabur', cat:'Local Breakfast', price:4.0, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvmA96CV8WtbsMui8cXXyPM2R45M5KjV3Cmi4QPcK6IJ0g7C08CwwsTbY&s=10', desc:'Traditional local breakfast favorite.', popular:false, isNew:false, discount:0, available:true, rating:4.5 },
      { id:'m82', name:'Fuul Mudamas', cat:'Local Breakfast', price:2.0, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_yL98I2iJGi1E0CZY7zyyKOGZmlWkhgbN-vm_RupXLwL0PQx1fzfcIrmr&s=10', desc:'Hearty fava beans served in a traditional way.', popular:false, isNew:false, discount:0, available:true, rating:4.4 },
      { id:'m83', name:'Liver [Beer]', cat:'Local Breakfast', price:4.0, img:'https://i.ytimg.com/vi/-Lweb5YWHR4/sddefault.jpg', desc:'Traditional local-style liver dish.', popular:false, isNew:false, discount:0, available:true, rating:4.4 },
      { id:'m84', name:'Muqmad', cat:'Local Breakfast', price:6.0, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJHerltsbyhXpjth4hGvJhoa4ofEGnXB3WVh3ScTcdkqUIDz3lnU92Rig&s=10', desc:'Special local breakfast dish with bold flavor.', popular:false, isNew:false, discount:0, available:true, rating:4.5 },
      { id:'m85', name:'Suqaar', cat:'Local Breakfast', price:4.0, img:'https://i0.wp.com/hebssweetly.com/wp-content/uploads/2021/03/suqaarIG-1.jpg?resize=864%2C1080', desc:'A savory local favorite served hot.', popular:false, isNew:false, discount:0, available:true, rating:4.5 },
      { id:'m86', name:'Beef Chops', cat:'Main Course', price:10.0, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPDaHifFlvlCc00C9AyXvwjZyTtF0yyW4-_TCkjtqTFtN4PFp6_tIY_kA&s=10', desc:'Juicy beef chops served with flavor-packed sides.', popular:false, isNew:false, discount:0, available:true, rating:4.8 },
      { id:'m87', name:'Chicken Curry', cat:'Main Course', price:9.0, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDh1By_zlDssRsgTHkvqjm1ouyyCA4bzt4CtwKabx7Al5W34QfjhPo960&s=10', desc:'Rich chicken curry with a fragrant spice blend.', popular:false, isNew:false, discount:0, available:true, rating:4.8 },
      { id:'m88', name:'Chicken Tikka Masala', cat:'Main Course', price:10.0, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLpRxMsgNQH7GxnrFy1i19jAe4zk2f9p5zmrNSc-LRJWqTUX_77u6y-NU&s=10', desc:'Creamy tikka masala with tender chicken.', popular:false, isNew:false, discount:0, available:true, rating:4.8 },
      { id:'m89', name:'French Fries', cat:'Main Course', price:3.0, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2uFjLohbzv-rdEhsLv3IqPDDOjejPpiR11MyGc-P_R62xnHCePEaQqMw&s=10', desc:'Crisp fries served as a perfect side.', popular:false, isNew:false, discount:0, available:true, rating:4.5 },
      { id:'m90', name:'Gout Mutton Handi', cat:'Main Course', price:11.0, img:'https://i0.wp.com/www.mellownspicy.com/wp-content/uploads/2017/10/Handi-Mutton-5.jpg?resize=533%2C800&ssl=1', desc:'Slow-cooked mutton handi with bold spices.', popular:false, isNew:false, discount:0, available:true, rating:4.9 },
      { id:'m91', name:'Goat Stir Fry', cat:'Main Course', price:8.0, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7G4iTn22anmzbkQAqythABKZNEw9ug1PGhLryW4LviFn41QKhOfzQzYiO&s=10', desc:'Stir-fried goat with a savory finish.', popular:false, isNew:false, discount:0, available:true, rating:4.6 },
      { id:'m92', name:'Grilled Chicken Breakfast', cat:'Main Course', price:10.0, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGbGBUe2zGvTOQ-0zkDU25PKedfOOtEt90kF2OPR36m4dS2vytUeHmpyE&s=10', desc:'A hearty grilled chicken plate with breakfast flair.', popular:false, isNew:false, discount:0, available:true, rating:4.7 },
      { id:'m93', name:'Steak and Mashed', cat:'Main Course', price:10.0, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhauLhJJ1Nla3EZf3I3sQw1OC9JfoDp9zrtp1Qng6nDy3TwrUdBKzfp8U&s=10', desc:'Tender steak with creamy mashed potatoes.', popular:false, isNew:false, discount:0, available:true, rating:4.8 },
      { id:'m94', name:'Surf and Turf', cat:'Main Course', price:14.0, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2e5LId4ewemUNxKgySE7mYaz_hRlgIwVt5b_mofNAHZsxTK_-maiZcs8Y&s=10', desc:'A satisfying mix of seafood and steak.', popular:false, isNew:false, discount:0, available:true, rating:4.9 },
      { id:'m95', name:'Iced Mango Matcha', cat:'Matcha Creations', price:4.0, img:'https://copinaco.com/cdn/shop/articles/20230329184043-mangomatchalatte_480x480_089fcec7-f547-4e54-9def-9e8ad713c4a6-508437.jpg?v=1711575762', desc:'Cool matcha with bright mango flavor.', popular:false, isNew:false, discount:0, available:true, rating:4.6 },
      { id:'m96', name:'Iced Matcha Vanilla Latte', cat:'Matcha Creations', price:4.0, img:'https://health-bar.com/cdn/shop/articles/Health-bar-iced-matcha-vanilla_2bb30ea8-5372-4e52-b615368271e6.jpg?v=1773156871', desc:'Creamy matcha latte with vanilla sweetness.', popular:false, isNew:false, discount:0, available:true, rating:4.7 },
      { id:'m97', name:'Iced Spanish Matcha', cat:'Matcha Creations', price:4.0, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH4YTTmwPpAFrtqh7D-rbXGb31g1rLQq6Dxp5_5NYKdnK4_YbpXlz2Qdrb&s=10', desc:'Iced matcha with a Spanish-inspired finish.', popular:false, isNew:false, discount:0, available:true, rating:4.6 },
      { id:'m98', name:'Iced Strawberry Matcha Latte', cat:'Matcha Creations', price:4.0, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZLnekTW5ewVJZxRGdu8bdC8Oyi2xVduue8yBTYmBI3s4hlBZ-zz_u3V8&s=10', desc:'Sweet strawberry matcha latte served cold.', popular:false, isNew:false, discount:0, available:true, rating:4.7 },
      { id:'m99', name:'Avocado Milkshake', cat:'Milkshakes', price:3.0, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNiuvpkTJaj9empo2fZ_8t2pb6toDfc1Y_l1R7Q49678aTndkGiuJX0L8&s=10', desc:'Creamy avocado shake with a mellow finish.', popular:false, isNew:false, discount:0, available:true, rating:4.5 },
      { id:'m100', name:'Blueberry Milkshake', cat:'Milkshakes', price:4.0, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX6YXMwAXuoJeZykHJYjIVOB7cLI0vMg_zakzvcgKQRGNCvX2VCgiiIPk&s=10', desc:'Rich blueberry milkshake with a creamy body.', popular:false, isNew:false, discount:0, available:true, rating:4.6 },
      { id:'m101', name:'Caramel Milkshake', cat:'Milkshakes', price:4.0, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOAez9FLTBQB8ZTumQ_mShEf_GXrrYZ89mCT_kF0hkk3_8HhJfzkFJg_4&s=10', desc:'Velvety milkshake with caramel sweetness.', popular:false, isNew:false, discount:0, available:true, rating:4.6 },
      { id:'m102', name:'Lotus Biscoff Milkshake', cat:'Milkshakes', price:3.5, img:'https://homegrownhappiness.com/wp-content/uploads/2023/06/biscoff-milkshake-.jpg', desc:'Creamy milkshake with lotus spice.', popular:false, isNew:false, discount:0, available:true, rating:4.7 },
      { id:'m103', name:'Mango Milkshake', cat:'Milkshakes', price:4.0, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbqUoUXn1rBaakZ1SzLUQHPW-H2ZsiNcEaESDfWagLkRK8Mc93ss2BUeBo&s=10', desc:'Tropical mango shake served cold.', popular:false, isNew:false, discount:0, available:true, rating:4.6 },
      { id:'m104', name:'Matcha Milkshake', cat:'Milkshakes', price:4.0, img:'https://www.sweetsteep.com/wp-content/uploads/2024/03/matcha-milkshake-735x1103.jpg', desc:'Smooth matcha milkshake with a fresh finish.', popular:false, isNew:false, discount:0, available:true, rating:4.7 },
      { id:'m105', name:'Oreo Crunch Milkshake', cat:'Milkshakes', price:3.5, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOVRUtSx4CDJUPBeBJZPvfPCt0cP78b8BJsNrtMDOxJUe8wh1BAo_wJFqQ&s=10', desc:'Creamy shake with Oreo crunch.', popular:false, isNew:false, discount:0, available:true, rating:4.6 },
      { id:'m106', name:'Strawberry Cream Shake', cat:'Milkshakes', price:3.5, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaYKyadoTxw7h22O5U0Gsh90KohJTFjrzVzo-GS-FvFTt-UdKM41gjydiw&s=10', desc:'Sweet strawberry shake with cream.', popular:false, isNew:false, discount:0, available:true, rating:4.6 },
      { id:'m107', name:'Vanilla Milkshake', cat:'Milkshakes', price:4.0, img:'https://liliebakery.fr/wp-content/uploads/2023/06/Milkshake-vanille-Lilie-Bakery.jpg', desc:'Classic vanilla milkshake with a smooth body.', popular:false, isNew:false, discount:0, available:true, rating:4.6 },
      { id:'m108', name:'Alfredo Chicken Pasta', cat:'Pasta', price:10.0, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP0hb9ALReMbtqTYpJkBW248gydMAlJJkeFUMjCa6pU-0FS6yhJxgvUBFd&s=10', desc:'Creamy pasta topped with seasoned chicken.', popular:false, isNew:false, discount:0, available:true, rating:4.7 },
      { id:'m109', name:'Alfredo Chicken Penne', cat:'Pasta', price:10.0, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrMfN7lworMKguOJbclRD3SFTgCUBu_j8UvQZ2OcRwqZiSn_XW5et4s2ZH&s=10', desc:'Penne pasta finished with creamy alfredo chicken.', popular:false, isNew:false, discount:0, available:true, rating:4.7 },
      { id:'m110', name:'Creamy Pesto Pasta', cat:'Pasta', price:7.0, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS38n75CiSu7ZFrIdmqPiTHP2MaKR8o8hDucw51XjkAAKiJwIsXSXfGU-I&s=10', desc:'Pasta tossed with pesto and creamy richness.', popular:false, isNew:false, discount:0, available:true, rating:4.7 },
      { id:'m111', name:'Pasta Bolognese', cat:'Pasta', price:10.0, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkeoGaSUTYzFEbtToDl964jBs0-SlgzlqZegqmE-hnxKLk3cEUikqy8Rhj&s=10', desc:'Classic bolognese sauce over pasta.', popular:false, isNew:false, discount:0, available:true, rating:4.8 },
      { id:'m112', name:'Pasta Primavera', cat:'Pasta', price:7.0, img:'https://www.feastingathome.com/wp-content/uploads/2026/03/Pasta-Primavera-9.jpg', desc:'Fresh vegetables blended into a light pasta.', popular:false, isNew:false, discount:0, available:true, rating:4.6 },
      { id:'m113', name:'Pasta Pomodoro', cat:'Pasta', price:5.0, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsekE7g87xSojlUAU58cCQzl7x8SfPcYmty60Gyr7lujWysS9_S63LL-9j&s=10', desc:'Simple tomato pasta with classic flavor.', popular:false, isNew:false, discount:0, available:true, rating:4.5 },
      { id:'m114', name:'Tuna Marinara Pasta', cat:'Pasta', price:8.0, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdOVUx0AfFlod4XwgMYvWvAEkmQ51pnmxyATfnxQOW3tQvTMo93BEIlxSB&s=10', desc:'Pasta with tuna and a savory marinara sauce.', popular:false, isNew:false, discount:0, available:true, rating:4.6 },
      { id:'m115', name:'Beef BBQ Pizza 30cm', cat:'Pizza', price:10.0, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI2UC_wNaVp9aA8Bw06JKrkYNEBJeLcbSMOt01R5KajcZU39FLE_MmBVP0&s=10', desc:'Baked pizza with smoky BBQ beef topping.', popular:false, isNew:false, discount:0, available:true, rating:4.8 },
      { id:'m116', name:'Chicken Buffalo Pizza', cat:'Pizza', price:10.0, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9YSnnrcsOZTqrNqY2xqiNsLZkwoJBZ0nSyddbvi0uUBoldqOsoS9YuVc&s=10', desc:'Spicy buffalo chicken pizza with bold flavor.', popular:false, isNew:false, discount:0, available:true, rating:4.7 },
      { id:'m117', name:'Margherita Pizza 30cm', cat:'Pizza', price:7.0, img:'https://i0.wp.com/kristineskitchenblog.com/wp-content/uploads/2024/07/pizza-margherita-21.jpg?fit=1400%2C2100&ssl=1', desc:'Classic margherita pizza with fresh basil.', popular:false, isNew:false, discount:0, available:true, rating:4.8 },
      { id:'m118', name:'Vegetarian Pizza', cat:'Pizza', price:8.0, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQinwLfJkQLle1YKD4mn2JPjwde99W6TznytP_taYh_cjOXwCOVC3sANFV0&s=10', desc:'Vegetable-packed pizza with a rich crust.', popular:false, isNew:false, discount:0, available:true, rating:4.6 },
      { id:'m119', name:'Fish Crisps', cat:'Seafood', price:8.0, img:'https://www.snixykitchen.com/wp-content/uploads/2025/03/Gluten-Free-Fried-Fish-13.jpg', desc:'Crunchy fried fish with a savory crust.', popular:false, isNew:false, discount:0, available:true, rating:4.7 },
      { id:'m120', name:'Fish Curry', cat:'Seafood', price:9.0, img:'https://mycookingcanvas.com/wp-content/uploads/2020/08/3E39271F-3C8D-484C-A2E4-731752CFBA28.jpeg', desc:'Flavorful fish curry served with comfort.', popular:false, isNew:false, discount:0, available:true, rating:4.7 },
      { id:'m121', name:'Grilled Shrimps', cat:'Seafood', price:12.0, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmqP1JCkg9VY3dyo7M8OvoQ8769YsLvgGvAL3NLAUdJJh_7X1hU_t-TPlv&s=10', desc:'Tender grilled shrimp with a light seasoning.', popular:false, isNew:false, discount:0, available:true, rating:4.8 },
      { id:'m122', name:'Grilled Tilapia Fillet', cat:'Seafood', price:10.0, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhwwuTg8409_F2QNLzrLLtpYIJ1KCI81SKTscjU2JlFQ&s=10', desc:'Fresh grilled tilapia fillet with citrus notes.', popular:false, isNew:false, discount:0, available:true, rating:4.7 },
      { id:'m123', name:'Avocado Smoothie', cat:'Smoothies', price:3.5, img:'https://theforkedspoon.com/wp-content/uploads/2019/06/avocado-smoothie-in-glass-with-avocado.jpg', desc:'Creamy avocado smoothie with a tropical feel.', popular:false, isNew:false, discount:0, available:true, rating:4.6 },
      { id:'m124', name:'Banana Smoothie', cat:'Smoothies', price:3.5, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYvSIGvxhZiDuyr4rJoBpW4TFuFzV7xc1FpLYqmkqYNuB2V1k5s1QjvDE&s=10', desc:'Smooth banana blend with a mellow sweetness.', popular:false, isNew:false, discount:0, available:true, rating:4.5 },
      { id:'m125', name:'Mango Smoothie', cat:'Smoothies', price:3.5, img:'https://www.purelykaylie.com/wp-content/uploads/2021/07/mango-banana-smoothie-3.jpg', desc:'Tropical mango smoothie served cold.', popular:false, isNew:false, discount:0, available:true, rating:4.6 },
      { id:'m126', name:'Strawberry Smoothie', cat:'Smoothies', price:3.5, img:'https://thedeliciousplate.com/wp-content/uploads/2024/06/Strawberry-banana-apple-smoothie-6.jpg', desc:'Sweet strawberry smoothie with a berry finish.', popular:false, isNew:false, discount:0, available:true, rating:4.6 },
      { id:'m127', name:'Dawa Tea', cat:'Somali & Traditional', price:2.0, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1zMXnWpsQzWo_Dyg3q2InMsyW1yx7ruMtCGcjinpD5i29LAULERJlOYI&s=10', desc:'Traditional Somali tea with comforting flavor.', popular:false, isNew:false, discount:0, available:true, rating:4.5 },
      { id:'m128', name:'Somali Tea', cat:'Somali & Traditional', price:1.0, img:'https://barosomali.com/wp-content/uploads/2024/10/1000023476.jpg', desc:'Classic Somali tea served warm.', popular:false, isNew:false, discount:0, available:true, rating:4.4 },
      { id:'m129', name:'Blueberry Mojito', cat:'Mojito', price:3.5, img:'https://thecrumbykitchen.com/wp-content/uploads/2019/07/Blueberry-Mojito-4.jpg', desc:'Minty mojito with blueberry sweetness.', popular:false, isNew:false, discount:0, available:true, rating:4.6 },
      { id:'m130', name:'Classic Mojito', cat:'Mojito', price:3.5, img:'https://www.saveur.com/uploads/2007/02/SAVEUR_Mojito_1149-Edit-scaled.jpg?format=auto&optimize=high&width=1440', desc:'Refreshing mojito with fresh mint and lime.', popular:false, isNew:false, discount:0, available:true, rating:4.7 },
      { id:'m131', name:'Kiwi Mojito', cat:'Mojito', price:3.5, img:'https://www.laylita.com/recipes/wp-content/uploads/2016/07/Kiwi-mojito.jpg', desc:'Bright kiwi mojito with citrus sparkle.', popular:false, isNew:false, discount:0, available:true, rating:4.6 },
      { id:'m132', name:'Passion Mojito', cat:'Mojito', price:3.5, img:'https://cookienameddesire.com/wp-content/uploads/2016/05/passion-fruit-mojito-recipe-photo-1.jpg', desc:'Tropical passion fruit mojito.', popular:false, isNew:false, discount:0, available:true, rating:4.6 },
      { id:'m133', name:'Extra Vegetables', cat:'Starters & Salad', price:3.0, img:'https://smartinthekitchen.com/wp-content/uploads/2021/05/Untitled-27.png', desc:'Fresh vegetable starter with a garden feel.', popular:false, isNew:false, discount:0, available:true, rating:4.4 },
      { id:'m134', name:'Garden Mixed Green Salad', cat:'Starters & Salad', price:6.0, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaayRLFAdGdlUCqwNmNpJbc0b91DNllpK8bVIfQSrh334pgpSB8yFxi2Ki&s=10', desc:'Mixed greens drizzled with a light dressing.', popular:false, isNew:false, discount:0, available:true, rating:4.6 },
      { id:'m135', name:'Hiil Mezze Platter', cat:'Starters & Salad', price:3.0, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLK4dX7SEeSSRj9jLeq-xHNMq-0zfo1vnVdv1hwIISf0bbuUiKd9PS_4Aw&s=10', desc:'A sharing platter of mezze favorites.', popular:false, isNew:false, discount:0, available:true, rating:4.6 },
      { id:'m136', name:'Tuna Salad', cat:'Starters & Salad', price:6.0, img:'https://eatthegains.com/wp-content/uploads/2020/09/Healthy-Tuna-Salad-6.jpg', desc:'Fresh salad topped with tuna and herbs.', popular:false, isNew:false, discount:0, available:true, rating:4.6 },
      { id:'m137', name:'Hibiscus Iced Tea', cat:'Iced Tea', price:2.7, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpxFM5rvskFis79zHFcIsLTaWtSv40dedAylMpODdq0A&s=10', desc:'Cold hibiscus tea with a floral finish.', popular:false, isNew:false, discount:0, available:true, rating:4.5 },
      { id:'m138', name:'Iced Lemon Tea', cat:'Iced Tea', price:2.7, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStzhWMjY3eCCoSkeFiIj1DHfvOIuDyOsHDeqN-kSg2rw&s=10', desc:'Refreshing iced tea with lemon sparkle.', popular:false, isNew:false, discount:0, available:true, rating:4.5 },
      { id:'m139', name:'Strawberry Peach Iced Tea', cat:'Iced Tea', price:2.5, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSF7ktf-yezZv2vJsSa2nE-ng69nNHlAkULKbqorNtheIoekzk7xoqsscx&s=10', desc:'Sweet peach tea with strawberry depth.', popular:false, isNew:false, discount:0, available:true, rating:4.6 },
      { id:'m140', name:'Beef BBQ and Cheese Wrap', cat:'Sandwiches', price:6.0, img:'https://www.dontgobaconmyheart.co.uk/wp-content/uploads/2020/03/cheeseburger-wraps.jpg', desc:'Wrap packed with beef, BBQ sauce and melted cheese.', popular:false, isNew:false, discount:0, available:true, rating:4.7 },
      { id:'m141', name:'Chicken Caesar Baguette', cat:'Sandwiches', price:7.0, img:'https://hips.hearstapps.com/hmg-prod/images/chicken-caesar-baguettes-643088630243c.jpg?crop=0.859xw:0.573xh;0.0897xw,0.157xh&resize=1200:*', desc:'Crisp baguette filled with chicken Caesar goodness.', popular:false, isNew:false, discount:0, available:true, rating:4.7 },
      { id:'m142', name:'Chicken and Cheese Wrap', cat:'Sandwiches', price:6.0, img:'https://spicedblog.com/wp-content/uploads/2025/08/Cheesy-Chicken-Wraps1.jpg', desc:'Warm wrap with chicken and melted cheese.', popular:false, isNew:false, discount:0, available:true, rating:4.7 },
      { id:'m143', name:'Chicken Shawarma', cat:'Sandwiches', price:6.0, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHTMgkUZ-huJtwEGwttDU3Xyuha5vOyJ-OO_DvstxstbMCMhELRXpeDy8&s=10', desc:'Classic shawarma wrap with seasoned chicken.', popular:false, isNew:false, discount:0, available:true, rating:4.7 },
      { id:'m144', name:'Steak and Cheese Baguette', cat:'Sandwiches', price:7.0, img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYlCIXCFMuQUxtgiO3F5WmpgLJCea_8Ql1zH2iaedIUkSpxUe1RSsGGOc&s=10', desc:'Baguette packed with steak and melted cheese.', popular:false, isNew:false, discount:0, available:true, rating:4.8 },
    ],
    tables: Array.from({length:12}).map((_,i)=>({
      id:'t'+(i+1), number:i+1, status: i%5===0?'occupied': i%4===0?'reserved': i%7===0?'cleaning':'available',
      guests: i%5===0? 3+ (i%3): null, area: i<8?'Main Hall': (i<10?'VIP':'Family')
    })),
    orders: [
      { id:'o_demo_1', no:'HC-1001', table:'2', items:[{ id:'m1', name:'Golden Saffron Latte', qty:2, price:4.5 }, { id:'m16', name:'Garlic Parmesan Fries', qty:1, price:4.8 }], total:13.8, status:'Served', createdAt: Date.now()-1000*60*60*24*2 },
      { id:'o_demo_2', no:'HC-1002', table:'5', items:[{ id:'m2', name:'Smoked Beef Burger', qty:2, price:9.5 }, { id:'m20', name:'Hot Cinnamon Cappuccino', qty:1, price:4.2 }], total:23.2, status:'Preparing', createdAt: Date.now()-1000*60*15 },
    ],
    reservations: [
      { id:'r1', name:'Amina Yusuf', phone:'+252 63 400 1122', date: todayPlus(1), time:'19:30', guests:4, area:'VIP Room', notes:'Birthday cake requested', status:'confirmed' },
      { id:'r2', name:'Khalid Warsame', phone:'+252 63 411 8890', date: todayPlus(0), time:'13:00', guests:2, area:'Main Hall', notes:'', status:'confirmed' },
      { id:'r3', name:'Sara Ahmed', phone:'+252 63 422 7745', date: todayPlus(3), time:'20:00', guests:6, area:'Family Area', notes:'Celebration dinner', status:'confirmed' },
    ],
    customers: [
      { id:'c1', name:'Amina Yusuf', phone:'+252 63 400 1122', visits:14, points:860, favorite:'Golden Saffron Latte', status:'VIP Gold' },
      { id:'c2', name:'Khalid Warsame', phone:'+252 63 411 8890', visits:6, points:310, favorite:'Smoked Beef Burger', status:'Silver' },
      { id:'c3', name:'Sara Ahmed', phone:'+252 63 422 7745', visits:2, points:60, favorite:'Spiced Chai Tea', status:'Member' },
    ],
    employees: [
      { id:'e1', name:'Faarax Nur', role:'Chef', status:'On Shift', phone:'+252 63 500 1010' },
      { id:'e2', name:'Hodan Elmi', role:'Waiter', status:'On Shift', phone:'+252 63 500 1020' },
      { id:'e3', name:'Yusuf Cali', role:'Cashier', status:'Off', phone:'+252 63 500 1030' },
      { id:'e4', name:'Deeqa Maxamed', role:'Manager', status:'On Shift', phone:'+252 63 500 1040' },
    ],
    inventory: [
      { id:'i1', name:'Coffee Beans (Arabica)', unit:'kg', qty:4, min:8, supplier:'Highland Roasters' },
      { id:'i2', name:'Beef Patties', unit:'pcs', qty:40, min:20, supplier:'Golden Meats Co.' },
      { id:'i3', name:'Fresh Mango', unit:'kg', qty:2, min:5, supplier:'Green Valley Farms' },
      { id:'i4', name:'Mozzarella', unit:'kg', qty:12, min:6, supplier:'Dairy Fresh Ltd' },
      { id:'i5', name:'Whole Seabass', unit:'pcs', qty:0, min:10, supplier:'Coastal Seafood' },
    ],
    discounts: [
      { id:'d1', name:'Weekend Special', type:'percentage', value:15, active:true },
      { id:'d2', name:'Happy Hour (4–6PM)', type:'percentage', value:20, active:true },
      { id:'d3', name:'Eid Celebration', type:'percentage', value:25, active:false },
    ],
    settings: {
      name:'HIIL CAFE', currency:'USD', tax:5, theme:'dark', language:'en',
      hours:'08:00 AM – 11:30 PM Daily', phone:'+252 63 888 3301', whatsapp:'+252 63 888 3301',
      email:'hello@hiilcafe.com', address:'Airport Road, Hargeisa, Somaliland'
    },
    nextOrderNo: 1042,
  });

  function load(){
    try{
      const raw = localStorage.getItem(KEY);
      const baseSeed = seed();
      if(!raw){ localStorage.setItem(KEY, JSON.stringify(baseSeed)); return baseSeed; }
      const parsed = JSON.parse(raw);
      return {
        ...baseSeed,
        ...parsed,
        menu: parsed.menu || baseSeed.menu,
        tables: parsed.tables || baseSeed.tables,
        orders: parsed.orders || [],
        reservations: parsed.reservations || [],
        customers: parsed.customers || [],
        employees: parsed.employees || [],
        inventory: parsed.inventory || [],
        discounts: parsed.discounts || [],
        settings: { ...baseSeed.settings, ...(parsed.settings || {}) },
        siteContent: { ...baseSeed.siteContent, ...(parsed.siteContent || {}) },
      };
    }catch(e){ const s = seed(); localStorage.setItem(KEY, JSON.stringify(s)); return s; }
  }
  function save(db){ localStorage.setItem(KEY, JSON.stringify(db)); }
  function reset(){ const s = seed(); save(s); return s; }

  async function notifyManager(subject, message){
    try {
      await fetch('http://localhost:4000/api/notifications/manager', {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({ subject, message })
      });
    } catch (err) {
      console.warn('Manager notification skipped', err);
    }
  }

  // ---- cart (session-only, separate key) ----
  const CART_KEY = 'hiil_cafe_cart_v1';
  function getCart(){ try{ return JSON.parse(localStorage.getItem(CART_KEY))||[]; }catch(e){ return []; } }
  function saveCart(c){ localStorage.setItem(CART_KEY, JSON.stringify(c)); window.dispatchEvent(new Event('hiil-cart-updated')); }
  function addToCart(item, qty=1){
    const cart = getCart();
    const existing = cart.find(c=>c.id===item.id);
    if(existing){ existing.qty += qty; } else { cart.push({ id:item.id, name:item.name, price:item.price, img:item.img, qty }); }
    saveCart(cart);
  }
  function updateCartQty(id, qty){
    let cart = getCart();
    if(qty<=0){ cart = cart.filter(c=>c.id!==id); } else { cart.forEach(c=>{ if(c.id===id) c.qty=qty; }); }
    saveCart(cart);
  }
  function clearCart(){ saveCart([]); }
  function cartTotal(){ return getCart().reduce((s,c)=>s+c.price*c.qty,0); }

  // ---- favorites ----
  const FAV_KEY = 'hiil_cafe_favs_v1';
  function getFavs(){ try{ return JSON.parse(localStorage.getItem(FAV_KEY))||[]; }catch(e){ return []; } }
  function toggleFav(id){
    let favs = getFavs();
    if(favs.includes(id)) favs = favs.filter(f=>f!==id); else favs.push(id);
    localStorage.setItem(FAV_KEY, JSON.stringify(favs));
    return favs;
  }

  function exportBackup(){
    const db = load();
    const blob = new Blob([JSON.stringify(db, null, 2)], { type:'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'hiil-cafe-backup.json'; a.click();
    URL.revokeObjectURL(url);
    toast('Backup downloaded');
  }

  async function importBackup(file){
    if(!file) return false;
    try {
      const text = await file.text();
      const imported = JSON.parse(text);
      const merged = {
        ...seed(),
        ...imported,
        menu: imported.menu || seed().menu,
        tables: imported.tables || seed().tables,
        orders: imported.orders || [],
        reservations: imported.reservations || [],
        customers: imported.customers || [],
        employees: imported.employees || [],
        inventory: imported.inventory || [],
        discounts: imported.discounts || [],
        settings: { ...seed().settings, ...(imported.settings || {}) },
      };
      save(merged);
      toast('Backup restored');
      return true;
    } catch (err) {
      toast('Unable to restore backup', 'err');
      return false;
    }
  }

  return { load, save, reset, getCart, saveCart, addToCart, updateCartQty, clearCart, cartTotal, getFavs, toggleFav, exportBackup, importBackup, notifyManager };
})();

/* ============================================================
   UI helpers shared across pages
   ============================================================ */
function toast(msg, type='ok'){
  let wrap = document.getElementById('toast-wrap');
  if(!wrap){ wrap = document.createElement('div'); wrap.id='toast-wrap'; document.body.appendChild(wrap); }
  const el = document.createElement('div');
  el.className = 'toast ' + type;
  el.textContent = msg;
  wrap.appendChild(el);
  setTimeout(()=>{ el.style.opacity='0'; el.style.transform='translateX(30px)'; el.style.transition='all .4s'; setTimeout(()=>el.remove(),400); }, 2600);
}

function initRevealOnScroll(){
  const els = document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){ els.forEach(el=>el.classList.add('in')); return; }
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold:0.15 });
  els.forEach(el=>io.observe(el));
}

function initNavScroll(){
  const nav = document.querySelector('.site-nav');
  if(!nav) return;
  const onScroll = () => { nav.classList.toggle('scrolled', window.scrollY > 30); };
  window.addEventListener('scroll', onScroll); onScroll();
}

function initHeroParticles(container, count=18){
  if(!container) return;
  for(let i=0;i<count;i++){
    const p = document.createElement('span');
    p.className='particle';
    const size = 2+Math.random()*4;
    p.style.width=size+'px'; p.style.height=size+'px';
    p.style.left = Math.random()*100+'%';
    p.style.bottom = '-20px';
    p.style.animationDuration = (10+Math.random()*14)+'s';
    p.style.animationDelay = (Math.random()*10)+'s';
    container.appendChild(p);
  }
}

function initLoader(){
  window.addEventListener('load', ()=>{
    const l = document.getElementById('loader');
    if(l) setTimeout(()=>l.classList.add('hide'), 350);
  });
}

function initThemeToggle(){
  const btns = document.querySelectorAll('[data-theme-toggle]');
  if(!btns.length) return;
  const setButtonLabel = (btn, theme) => {
    const icon = document.createElement('i');
    icon.className = theme === 'light' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
    btn.replaceChildren(icon, document.createTextNode(theme === 'light' ? ' Dark' : ' Light'));
  };
  const applyTheme = (theme) => {
    const resolvedTheme = theme === 'light' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', resolvedTheme);
    document.body.classList.toggle('light-theme', resolvedTheme === 'light');
    btns.forEach((btn) => setButtonLabel(btn, resolvedTheme));
  };
  const saved = localStorage.getItem('hiil_theme') || 'dark';
  applyTheme(saved);
  btns.forEach((btn) => btn.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    localStorage.setItem('hiil_theme', next);
    applyTheme(next);
  }));
}

function threadDividerSVG(){
  return `<svg viewBox="0 0 1200 34" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="0" y1="17" x2="1200" y2="17" stroke="#c9a227" stroke-width="1" stroke-dasharray="2 10" opacity="0.55"/>
    <circle cx="600" cy="17" r="4" fill="#e6c65c"/>
    <circle cx="600" cy="17" r="9" fill="none" stroke="#c9a227" stroke-width="1" opacity="0.6"/>
  </svg>`;
}
document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('.thread-divider').forEach(d=> d.innerHTML = threadDividerSVG());
  initThemeToggle();
});

window.addEventListener('load', ()=>{
  initThemeToggle();
});

function fmtMoney(n, cur='$'){ return cur + Number(n).toFixed(2); }
function timeAgo(ts){
  const s = Math.floor((Date.now()-ts)/1000);
  if(s<60) return s+'s ago';
  if(s<3600) return Math.floor(s/60)+'m ago';
  return Math.floor(s/3600)+'h ago';
}
