/* =========================================================
   AFS content. Edit prices, outlets, plans and FAQs here.
   ========================================================= */
window.AFS = {
  contact: { phone: '9893395419', wa: '919893395419', email: 'amishkafood@gmail.com' },

  /* Hours used for the live open/closed badge (24h clock, India time) */
  hours: { open: 7, close: 22 },

  /* Menu. Add a `price` to any item to show a price tag (₹10 is shown for the signature chai). */
  menu: [
    { id: 'tea', name: 'Tea', img: 'assets/images/cat-tea.jpg', alt: 'A cup of gud ki chai on a saucer', items: [
      { name: 'Gud ki Chai', price: 10, popular: true, desc: 'Our signature. Jaggery-sweet chai brewed in brass, served in a ceramic cup.' },
      { name: 'Green Tea', desc: 'Light, clean and refreshing.' },
      { name: 'Black Tea', desc: 'Strong and simple, the way it should be.' } ] },
    { id: 'coffee', name: 'Coffee', img: 'assets/images/cat-coffee.jpg', alt: 'A mug of hot coffee', items: [
      { name: 'Hot Coffee', desc: 'A warm mug for slow mornings and long evenings.' } ] },
    { id: 'pizza', name: 'Pizza', img: 'assets/images/cat-pizza.jpg', alt: 'A whole pizza', items: [
      { name: 'Pizza', desc: 'Baked in our oven, hot and cheesy.' },
      { name: 'Patties', desc: 'From the same oven. Golden, crisp and filling.' } ] },
    { id: 'maggi', name: 'Maggi', img: 'assets/images/cat-maggi.jpg', alt: 'A steaming bowl of Maggi noodles', items: [
      { name: 'Maggi', desc: 'The all-time comfort bowl, served hot.' } ] },
    { id: 'sandwich', name: 'Sandwich', img: 'assets/images/cat-sandwich.jpg', alt: 'Grilled sandwiches cut into triangles', items: [
      { name: 'Grilled Sandwich', desc: 'Toasted on our griller until golden.' } ] }
  ],

  outlets: [
    { name: 'Ujjain', note: 'AFS outlet', q: 'Amishka Food Service Ujjain' },
    { name: 'Belkhadu', note: 'AFS outlet', q: 'Amishka Food Service Belkhadu' },
    { name: 'Patan', note: 'AFS outlet', q: 'Amishka Food Service Patan' },
    { name: 'Ranjhi', note: 'AFS outlet', q: 'Amishka Food Service Ranjhi' },
    { name: 'Katangi Bypass', note: 'Head office, Jabalpur', q: 'Amishka Food Service Katangi Bypass Road Jabalpur', head: true }
  ],

  plans: [
    { id: 'starter', short: 'Starter', price: 61000, tag: 'A light start: tea material, complete training and ongoing support.', count: '7 inclusions',
      groups: [
        { t: 'To start with', items: ['Tea material'] },
        { t: 'Your business', items: ['100% your ownership', '100% your profit'] },
        { t: 'Training and support', items: ['Entire support', '5 days of complete training', 'Monthly support for increasing sales, menu updation, increasing profits and operation knowledge, whenever required', '24x7 support, always available'] }
      ] },
    { id: 'outlet', short: 'Complete Outlet', price: 171000, tag: 'A complete chai outlet: branding, counters, chai utensils and seating.', count: '21 items',
      groups: [
        { t: 'Branding and signage', items: ['3D acrylic board (10 × 4 ft)', 'Lollipop board (3 × 3 ft)', 'Flex in front area', 'Statue', 'Menu card'] },
        { t: 'Counters and cooking', items: ['Stainless steel cash counter (1.5 W × 2 H × 2 L ft)', 'Stainless steel service counter (1.5 W × 2 H × 4 L ft)', '2 gas burner bhatti (1.5 × 3 ft)'] },
        { t: 'The chai station', items: ['Brass utensils', 'SS containers for tea', 'Milton thermos', 'Tea skimmer', 'Ladle', 'Ceramic tea cups', '2 service trays', 'Digital timer watch', 'Lighter', 'Duster', 'Stock tea and jaggery'] },
        { t: 'Seating', items: ['1 heavy-duty plastic table', '4 heavy-duty plastic chairs'] }
      ] },
    { id: 'cafe', short: 'Chai & Food Café', price: 301000, tag: 'The full AFS café: adds the pizza oven, sandwich griller, fridge and extra seating.', count: '37 items',
      groups: [
        { t: 'Branding and signage', items: ['3D acrylic board (10 × 4 ft)', 'Lollipop board (3 × 3 ft)', 'Flex in front area', '₹10 Gud ki Chai standee', 'Food menu standee', 'Offer standee', 'Staff T-shirt', 'Statue', 'Menu card'] },
        { t: 'Counters and cleaning', items: ['Stainless steel cash counter', 'Stainless steel service counter', 'Stainless steel wash basin'] },
        { t: 'Chai and drinks', items: ['2 gas burner bhatti', 'Brass utensils for jaggery tea', '3 stainless steel utensils for green tea, black tea and coffee', 'Ceramic tea cups', 'Tea skimmer', 'Ladle', 'Milton thermos', '2 stainless steel service trays', 'Cup tray stand', 'Empty cup tray stand', 'Lighter', 'Duster', 'Stock tea and jaggery'] },
        { t: 'Food and kitchen', items: ['Pizza and patties oven', 'Sandwich griller', '1 refrigerator (chiller + freezer)', 'Pizza making accessories (cutter, screen, spatula)', 'Griller accessories (butter holder, butter brush, sandwich cutter, spatula, steel tray)', 'Digital timer watch', 'Electronic weighing machine', 'Small kitchen equipment'] },
        { t: 'Seating and ambience', items: ['Round table stand', 'Music box and sound system', '2 heavy-duty plastic tables', '8 heavy-duty plastic chairs'] }
      ] }
  ],

  faq: [
    ['Who owns the outlet and the profit?', 'You do. AFS plans are built on 100% your ownership and 100% your profit.'],
    ['Do I get training and support?', 'Yes. The AFS plan includes 5 days of complete training, monthly support on sales, menu updates, profits and operations, and 24x7 support.'],
    ['What does the ₹3,01,000 plan include?', 'It covers branding, counters, a chai station, pizza and sandwich equipment, a fridge and seating: 37 items in total. Open the plan above to see the full list.'],
    ['Where are the current outlets?', 'AFS currently runs 5 franchise outlets: Ujjain, Belkhadu, Patan, Ranjhi and Katangi Bypass.'],
    ['How do I get started?', 'Send an enquiry with the form, or call 9893395419. We will talk through the plans and help you pick the right one.']
  ]
};
